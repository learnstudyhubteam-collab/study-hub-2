import { NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { sendStreakSaver } from '@/lib/email'

export const dynamic = 'force-dynamic'

function dateStr(d: Date) {
  return d.toISOString().split('T')[0]
}

async function handleStreakReminders(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Service role: a cron has no user session, so RLS would hide every row
  const supabase = await createAdminClient()

  const now = new Date()
  const today = dateStr(now)
  const yesterday = dateStr(new Date(now.getTime() - 86400000))
  const windowStart = dateStr(new Date(now.getTime() - 60 * 86400000))

  const { data: activity, error } = await supabase
    .from('study_activity')
    .select('user_id, activity_date')
    .gte('activity_date', windowStart)
    .order('activity_date', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })

  // Group activity dates per user
  const byUser = new Map<string, Set<string>>()
  for (const row of activity ?? []) {
    if (!byUser.has(row.user_id)) byUser.set(row.user_id, new Set())
    byUser.get(row.user_id)!.add(row.activity_date)
  }

  // A user needs saving if they studied yesterday (streak alive), haven't
  // studied today, and their consecutive-day streak ending yesterday is >= 2
  const atRisk: { userId: string; streak: number }[] = []
  for (const [userId, dates] of byUser) {
    if (dates.has(today) || !dates.has(yesterday)) continue
    let streak = 0
    const cursor = new Date(now.getTime() - 86400000)
    while (dates.has(dateStr(cursor))) {
      streak++
      cursor.setDate(cursor.getDate() - 1)
    }
    if (streak >= 2) atRisk.push({ userId, streak })
  }

  if (atRisk.length === 0) return Response.json({ sent: 0, atRisk: 0 })

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, email, full_name, streak_freeze_count')
    .in('id', atRisk.map((u) => u.userId))

  let sent = 0
  const errors: string[] = []

  for (const { userId, streak } of atRisk) {
    const profile = (profiles ?? []).find((p) => p.id === userId)
    if (!profile?.email) continue
    try {
      await sendStreakSaver({
        to: profile.email,
        name: profile.full_name ?? '',
        streak,
        freezes: profile.streak_freeze_count ?? 0,
      })
      sent++
    } catch (err) {
      errors.push(`${profile.email}: ${err instanceof Error ? err.message : 'unknown'}`)
    }
  }

  return Response.json({ sent, atRisk: atRisk.length, errors })
}

// Vercel crons invoke with GET; keep POST for manual triggering
export async function GET(req: NextRequest) {
  return handleStreakReminders(req)
}

export async function POST(req: NextRequest) {
  return handleStreakReminders(req)
}
