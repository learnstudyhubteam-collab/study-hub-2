import { NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { sendDailyDigest } from '@/lib/email'

export const dynamic = 'force-dynamic'

interface ExamRow { user_id: string; title: string; subject: string | null; exam_date: string }
interface AssignmentRow { user_id: string; title: string; subject: string | null; due_date: string; priority: string }

async function handleDailyDigest(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Service role: a cron has no user session, so RLS would hide every row
  const supabase = await createAdminClient()

  // ── Streak freezes: consume one for anyone who missed yesterday ──
  // A freeze backfills the missed day so the streak chain stays intact
  // (this is the behavior the Ruby Shop promises).
  const freezesUsed: string[] = []
  {
    const day = (offset: number) =>
      new Date(Date.now() - offset * 86400000).toISOString().split('T')[0]
    const yesterday = day(1)
    const dayBefore = day(2)

    const { data: recent } = await supabase
      .from('study_activity')
      .select('user_id, activity_date')
      .in('activity_date', [yesterday, dayBefore])

    const active = new Map<string, Set<string>>()
    for (const row of recent ?? []) {
      if (!active.has(row.user_id)) active.set(row.user_id, new Set())
      active.get(row.user_id)!.add(row.activity_date)
    }

    const missedIds = [...active.entries()]
      .filter(([, dates]) => dates.has(dayBefore) && !dates.has(yesterday))
      .map(([id]) => id)

    if (missedIds.length > 0) {
      const { data: holders } = await supabase
        .from('profiles')
        .select('id, streak_freeze_count')
        .in('id', missedIds)
        .gt('streak_freeze_count', 0)

      for (const holder of holders ?? []) {
        const { error: insertErr } = await supabase
          .from('study_activity')
          .upsert({ user_id: holder.id, activity_date: yesterday }, { onConflict: 'user_id,activity_date' })
        if (!insertErr) {
          await supabase
            .from('profiles')
            .update({ streak_freeze_count: holder.streak_freeze_count - 1 })
            .eq('id', holder.id)
          freezesUsed.push(holder.id)
        }
      }
    }
  }

  const now = new Date()
  const in3Days = new Date(now)
  in3Days.setDate(in3Days.getDate() + 3)

  const [{ data: exams }, { data: assignments }] = await Promise.all([
    supabase
      .from('exams')
      .select('user_id, title, subject, exam_date')
      .gte('exam_date', now.toISOString())
      .lte('exam_date', in3Days.toISOString()),
    supabase
      .from('assignments')
      .select('user_id, title, subject, due_date, priority')
      .neq('status', 'completed')
      .gte('due_date', now.toISOString())
      .lte('due_date', in3Days.toISOString()),
  ])

  if (!exams?.length && !assignments?.length) return Response.json({ sent: 0, freezesUsed: freezesUsed.length })

  const userMap = new Map<string, { exams: ExamRow[]; assignments: AssignmentRow[] }>()

  for (const e of (exams ?? []) as ExamRow[]) {
    if (!userMap.has(e.user_id)) userMap.set(e.user_id, { exams: [], assignments: [] })
    userMap.get(e.user_id)!.exams.push(e)
  }
  for (const a of (assignments ?? []) as AssignmentRow[]) {
    if (!userMap.has(a.user_id)) userMap.set(a.user_id, { exams: [], assignments: [] })
    userMap.get(a.user_id)!.assignments.push(a)
  }

  if (userMap.size === 0) return Response.json({ sent: 0, freezesUsed: freezesUsed.length })

  const userIds = [...userMap.keys()]
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, email, full_name')
    .in('id', userIds)

  let sent = 0
  const errors: string[] = []

  for (const profile of profiles ?? []) {
    if (!profile.email) continue
    const userData = userMap.get(profile.id)
    if (!userData) continue
    try {
      await sendDailyDigest({
        to: profile.email,
        name: profile.full_name ?? '',
        exams: userData.exams,
        assignments: userData.assignments,
      })
      sent++
    } catch (err) {
      errors.push(`${profile.email}: ${err instanceof Error ? err.message : 'unknown'}`)
    }
  }

  return Response.json({ sent, errors, freezesUsed: freezesUsed.length })
}

// Vercel crons invoke with GET; keep POST for manual triggering
export async function GET(req: NextRequest) {
  return handleDailyDigest(req)
}

export async function POST(req: NextRequest) {
  return handleDailyDigest(req)
}
