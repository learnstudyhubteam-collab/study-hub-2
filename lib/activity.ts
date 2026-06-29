import type { SupabaseClient } from '@supabase/supabase-js'

export async function logActivity(supabase: SupabaseClient, userId: string) {
  const today = new Date().toISOString().split('T')[0]
  await supabase
    .from('study_activity')
    .upsert({ user_id: userId, activity_date: today }, { onConflict: 'user_id,activity_date', ignoreDuplicates: true })
}

export async function getStreakData(supabase: SupabaseClient, userId: string) {
  const { data } = await supabase
    .from('study_activity')
    .select('activity_date')
    .eq('user_id', userId)
    .order('activity_date', { ascending: false })
    .limit(365)

  if (!data || data.length === 0) return { streak: 0, totalDays: 0, last7: [] }

  const dates = new Set(data.map((r) => r.activity_date as string))
  const today = new Date()

  // Build last 7 days presence map
  const last7: { date: string; active: boolean }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0]
    last7.push({ date: key, active: dates.has(key) })
  }

  // Calculate streak — count consecutive days ending today or yesterday
  let streak = 0
  const check = new Date(today)
  // If today not yet active, start from yesterday
  if (!dates.has(check.toISOString().split('T')[0])) {
    check.setDate(check.getDate() - 1)
  }
  while (dates.has(check.toISOString().split('T')[0])) {
    streak++
    check.setDate(check.getDate() - 1)
  }

  return { streak, totalDays: data.length, last7 }
}
