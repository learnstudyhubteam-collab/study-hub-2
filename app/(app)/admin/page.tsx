import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import {
  Users, Shield, School, Megaphone, BarChart3, TrendingUp,
  BookOpen, GraduationCap, AlertTriangle, CheckCircle, Clock,
  ChevronRight, Plus, Settings, Monitor, MessageSquareHeart,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/scroll-reveal'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name, school')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/dashboard')

  const now = new Date()
  const todayStr = now.toISOString().split('T')[0]
  const weekAgo = new Date(now)
  weekAgo.setDate(weekAgo.getDate() - 7)

  const [
    { count: totalUsers },
    { count: totalTeachers },
    { count: totalStudents },
    { count: totalClasses },
    { data: recentUsers },
    { data: announcements },
    { data: activeToday },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'teacher'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
    supabase.from('classes').select('*', { count: 'exact', head: true }),
    supabase
      .from('profiles')
      .select('id, full_name, email, role, school, created_at')
      .order('created_at', { ascending: false })
      .limit(10),
    supabase
      .from('announcements')
      .select('id, title, body, pinned, audience, created_at, author_id')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('study_activities')
      .select('user_id')
      .eq('activity_date', todayStr),
  ])

  const { count: overdueCount } = await supabase
    .from('assignments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'overdue')

  const stats = [
    { label: 'Total Users', value: totalUsers ?? 0, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', href: '/admin/users' },
    { label: 'Teachers', value: totalTeachers ?? 0, icon: GraduationCap, color: 'text-violet-500', bg: 'bg-violet-50', href: '/admin/users' },
    { label: 'Students', value: totalStudents ?? 0, icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-50', href: '/admin/users' },
    { label: 'Active Classes', value: totalClasses ?? 0, icon: School, color: 'text-orange-500', bg: 'bg-orange-50', href: '/classes' },
    { label: 'Active Today', value: activeToday?.length ?? 0, icon: TrendingUp, color: 'text-cyan-500', bg: 'bg-cyan-50', href: '/monitor' },
    { label: 'Overdue Items', value: overdueCount ?? 0, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50', href: '/overdue' },
  ]

  const roleColors: Record<string, string> = {
    admin: 'bg-red-100 text-red-700',
    teacher: 'bg-violet-100 text-violet-700',
    student: 'bg-blue-100 text-blue-700',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-red-500" />
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Admin Panel</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {profile?.full_name?.split(' ')[0] ?? 'Admin'}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {profile?.school ?? 'School'} · Administrator
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/monitor"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
            >
              <Monitor className="w-4 h-4" />
              Screen Monitor
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Users className="w-4 h-4" />
              Manage Users
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Stats grid */}
      <ScrollReveal delay={0.05}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map((s) => {
            const Icon = s.icon
            const isOverdue = s.label === 'Overdue Items'
            return (
              <Link key={s.label} href={s.href} className={`glass rounded-2xl p-4 space-y-2 transition-all hover:shadow-md hover:-translate-y-0.5 ${isOverdue && (overdueCount ?? 0) > 0 ? 'border border-red-200 bg-red-50/30' : ''}`}>
                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <Icon className={`w-4.5 h-4.5 ${s.color}`} />
                </div>
                <p className={`text-2xl font-bold ${isOverdue && (overdueCount ?? 0) > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                  {s.value.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </Link>
            )
          })}
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <ScrollReveal delay={0.1}>
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                Recent Sign-ups
              </h2>
              <Link href="/admin/users" className="text-xs text-electric font-medium flex items-center gap-1 hover:underline">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {(recentUsers ?? []).map((u) => (
                <div key={u.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-electric/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-electric">
                      {(u.full_name ?? u.email ?? '?')[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{u.full_name ?? 'Unnamed'}</p>
                    <p className="text-xs text-gray-400 truncate">{u.email}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${roleColors[u.role ?? 'student'] ?? 'bg-gray-100 text-gray-500'}`}>
                    {u.role ?? 'student'}
                  </span>
                </div>
              ))}
              {!recentUsers?.length && (
                <p className="text-sm text-gray-400 py-4 text-center">No users yet</p>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Announcements */}
        <ScrollReveal delay={0.15}>
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-orange-500" />
                Announcements
              </h2>
              <Link
                href="/admin/announcements/new"
                className="flex items-center gap-1 text-xs text-electric font-medium hover:underline"
              >
                <Plus className="w-3 h-3" /> New
              </Link>
            </div>
            <div className="space-y-2">
              {(announcements ?? []).map((a) => (
                <div key={a.id} className="p-3 rounded-xl bg-gray-50 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">{a.title}</p>
                    {a.pinned && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-600 shrink-0">
                        Pinned
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{a.body}</p>
                  <p className="text-[10px] text-gray-400">
                    {new Date(a.created_at).toLocaleDateString()} · {a.audience}
                  </p>
                </div>
              ))}
              {!announcements?.length && (
                <div className="py-8 text-center">
                  <Megaphone className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No announcements yet</p>
                  <Link
                    href="/admin/announcements/new"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-electric font-medium"
                  >
                    <Plus className="w-4 h-4" /> Post one
                  </Link>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Quick actions */}
      <ScrollReveal delay={0.2}>
        <div className="glass rounded-2xl p-5 space-y-4">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-electric" />
            Admin Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { label: 'User Management', desc: 'View, edit, or remove users', icon: Users, href: '/admin/users', color: 'text-blue-500 bg-blue-50' },
              { label: 'Screen Monitor', desc: 'Watch student activity live', icon: Monitor, href: '/monitor', color: 'text-violet-500 bg-violet-50' },
              { label: 'Overdue Items', desc: `${overdueCount ?? 0} overdue platform-wide`, icon: AlertTriangle, href: '/overdue', color: 'text-red-500 bg-red-50' },
              { label: 'Announcements', desc: 'Broadcast to all users', icon: Megaphone, href: '/admin/announcements/new', color: 'text-orange-500 bg-orange-50' },
              { label: 'User Feedback', desc: 'Read what users are saying', icon: MessageSquareHeart, href: '/admin/feedback', color: 'text-pink-500 bg-pink-50' },
            ].map((action) => {
              const Icon = action.icon
              const [iconColor, iconBg] = action.color.split(' ')
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all group"
                >
                  <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{action.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </ScrollReveal>

    </div>
  )
}
