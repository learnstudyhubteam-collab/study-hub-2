import { createClient, createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// Item costs/effects live server-side; the profiles trigger blocks
// client-side writes to rubies/freezes/bonus sessions entirely.
const ITEMS: Record<string, { cost: number; freezes: number; bonusSessions: number }> = {
  streak_freeze_1: { cost: 50, freezes: 1, bonusSessions: 0 },
  streak_freeze_3: { cost: 130, freezes: 3, bonusSessions: 0 },
  bonus_ai_session: { cost: 100, freezes: 0, bonusSessions: 1 },
}

export async function POST(req: Request) {
  const { itemId } = await req.json().catch(() => ({}))
  const item = ITEMS[itemId as string]
  if (!item) return Response.json({ error: 'Unknown item' }, { status: 400 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const admin = await createAdminClient()
  const { data: profile, error: readErr } = await admin
    .from('profiles')
    .select('rubies, streak_freeze_count, bonus_ai_sessions')
    .eq('id', user.id)
    .single()

  if (readErr || !profile) {
    return Response.json({ error: 'Profile not found' }, { status: 500 })
  }
  if ((profile.rubies ?? 0) < item.cost) {
    return Response.json({ error: 'Not enough rubies' }, { status: 400 })
  }

  const updated = {
    rubies: (profile.rubies ?? 0) - item.cost,
    streak_freeze_count: (profile.streak_freeze_count ?? 0) + item.freezes,
    bonus_ai_sessions: (profile.bonus_ai_sessions ?? 0) + item.bonusSessions,
  }

  // Guard against double-spend races: only apply if rubies are unchanged
  const { data: applied, error: updateErr } = await admin
    .from('profiles')
    .update(updated)
    .eq('id', user.id)
    .eq('rubies', profile.rubies)
    .select('rubies, streak_freeze_count, bonus_ai_sessions')
    .single()

  if (updateErr || !applied) {
    return Response.json({ error: 'Purchase conflict — try again' }, { status: 409 })
  }

  return Response.json(applied)
}
