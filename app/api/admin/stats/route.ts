import { createClient, createAdminClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, county, school')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return Response.json({ error: 'Admin access required' }, { status: 403 })
  }

  const admin = await createAdminClient()

  // Count users in same county/school district
  const county = profile.county
  const school = profile.school

  let query = admin.from('profiles').select('id, role, subscription_plan, subscription_status, created_at', { count: 'exact' })
  if (county) query = query.ilike('county', `%${county.split(',')[0].trim()}%`)
  else if (school) query = query.ilike('school', `%${school.split(',')[0].trim()}%`)

  const { data: districtUsers, count: totalCount } = await query

  const teachers = (districtUsers ?? []).filter((u) => u.role === 'teacher').length
  const admins = (districtUsers ?? []).filter((u) => u.role === 'admin').length
  const students = (districtUsers ?? []).filter((u) => !u.role || u.role === 'student').length
  const activePlans = (districtUsers ?? []).filter(
    (u) => u.subscription_status === 'active'
  ).length

  // Count classes in district (approximate via teacher user_ids)
  const teacherIds = (districtUsers ?? []).filter((u) => u.role === 'teacher').map((u) => u.id)
  let classCount = 0
  if (teacherIds.length > 0) {
    const { count } = await admin
      .from('classes')
      .select('id', { count: 'exact', head: true })
      .in('teacher_id', teacherIds)
    classCount = count ?? 0
  }

  // New users this week
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const newThisWeek = (districtUsers ?? []).filter(
    (u) => new Date(u.created_at) >= weekAgo
  ).length

  return Response.json({
    total: totalCount ?? 0,
    teachers,
    students,
    admins,
    activePlans,
    classCount,
    newThisWeek,
    district: county ?? school ?? 'Your District',
  })
}
