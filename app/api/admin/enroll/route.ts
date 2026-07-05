import { createClient, createAdminClient } from '@/lib/supabase/server'

interface EnrollUser {
  email: string
  full_name?: string
  role?: string
  school?: string
  grade_level?: string
  county?: string
}

export async function POST(req: Request) {
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

  const { users }: { users: EnrollUser[] } = await req.json()
  if (!Array.isArray(users) || users.length === 0) {
    return Response.json({ error: 'No users provided' }, { status: 400 })
  }
  if (users.length > 100) {
    return Response.json({ error: 'Max 100 users per batch' }, { status: 400 })
  }

  const admin = await createAdminClient()
  const results: { email: string; status: 'invited' | 'error'; error?: string }[] = []

  for (const u of users) {
    if (!u.email || !u.email.includes('@')) {
      results.push({ email: u.email ?? '', status: 'error', error: 'Invalid email' })
      continue
    }
    try {
      const { error } = await admin.auth.admin.inviteUserByEmail(u.email, {
        data: {
          full_name: u.full_name ?? '',
          role: u.role ?? 'student',
          school: u.school ?? profile?.school ?? '',
          grade_level: u.grade_level ?? '',
          county: u.county ?? profile?.county ?? '',
        },
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? ''}/auth/callback`,
      })
      if (error) {
        results.push({ email: u.email, status: 'error', error: error.message })
      } else {
        results.push({ email: u.email, status: 'invited' })
      }
    } catch (err: unknown) {
      results.push({ email: u.email, status: 'error', error: err instanceof Error ? err.message : 'Unknown error' })
    }
  }

  const invited = results.filter((r) => r.status === 'invited').length
  const failed = results.filter((r) => r.status === 'error').length

  return Response.json({ results, invited, failed })
}
