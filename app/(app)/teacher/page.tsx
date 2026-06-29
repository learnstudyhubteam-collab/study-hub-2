import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import {
  GraduationCap, Users, ClipboardList, BarChart3, Monitor,
  Plus, ChevronRight, BookOpen, Clock, CheckCircle, AlertTriangle, TrendingUp, ExternalLink,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/scroll-reveal'

export const dynamic = 'force-dynamic'

export default async function TeacherDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name, school')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'teacher' && profile?.role !== 'admin') redirect('/dashboard')

  const now = new Date()
  const todayStr = now.toISOString().split('T')[0]

  const [
    { data: myClasses },
    { data: classAssignments },
    { data: pendingSubmissions },
  ] = await Promise.all([
    supabase
      .from('classes')
      .select('id, name, subject, section, invite_code, created_at')
      .eq('teacher_id', user.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('assignments')
      .select('id, title, subject, due_date, status, class_id, priority')
      .eq('user_id', user.id)
      .order('due_date', { ascending: true })
      .limit(20),
    supabase
      .from('assignments')
      .select('id, title, status, class_id, due_date')
      .in('status', ['pending', 'in_progress'])
      .order('due_date', { ascending: true })
      .limit(10),
  ])

  const classIds = (myClasses ?? []).map((c) => c.id)

  const [{ data: students }, { data: recentActivity }] = await Promise.all([
    classIds.length > 0
      ? supabase
          .from('class_members')
          .select('user_id, joined_at, class_id')
          .in('class_id', classIds)
      : { data: [] as any[] },
    classIds.length > 0
      ? supabase
          .from('study_activities')
          .select('user_id, activity_date')
          .eq('activity_date', todayStr)
          .limit(50)
      : { data: [] as any[] },
  ])

  const uniqueStudents = new Set((students ?? []).map((s) => s.user_id)).size
  const overdueCount = (classAssignments ?? []).filter((a) => a.status === 'overdue').length
  const completedCount = (classAssignments ?? []).filter((a) => a.status === 'completed').length

  const statusColor: Record<string, string> = {
    completed: 'bg-emerald-100 text-emerald-700',
    in_progress: 'bg-blue-100 text-blue-700',
    pending: 'bg-gray-100 text-gray-600',
    overdue: 'bg-red-100 text-red-700',
  }

  const priorityDot: Record<string, string> = {
    high: 'bg-red-400',
    medium: 'bg-amber-400',
    low: 'bg-gray-300',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-5 h-5 text-violet-500" />
              <span className="text-xs font-bold text-violet-500 uppercase tracking-widest">Teacher Portal</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {profile?.full_name?.split(' ')[0] ?? 'Teacher'}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {profile?.school ?? 'Your School'} · Teacher
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
              href="/classes"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Class
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal delay={0.05}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'My Classes', value: myClasses?.length ?? 0, icon: GraduationCap, color: 'text-violet-500 bg-violet-50', href: '/classes' },
            { label: 'Total Students', value: uniqueStudents, icon: Users, color: 'text-blue-500 bg-blue-50', href: '/classes' },
            { label: 'Active Today', value: recentActivity?.length ?? 0, icon: TrendingUp, color: 'text-emerald-500 bg-emerald-50', href: '/monitor' },
            { label: 'Overdue Items', value: overdueCount, icon: AlertTriangle, color: 'text-red-500 bg-red-50', href: '/overdue' },
          ].map((s) => {
            const [iconColor, iconBg] = s.color.split(' ')
            const Icon = s.icon
            const isOverdue = s.label === 'Overdue Items'
            return (
              <Link key={s.label} href={s.href} className={`glass rounded-2xl p-4 space-y-2 block transition-all hover:shadow-md hover:-translate-y-0.5 ${isOverdue && overdueCount > 0 ? 'border border-red-200 bg-red-50/30' : ''}`}>
                <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
                  <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
                </div>
                <p className={`text-2xl font-bold ${isOverdue && overdueCount > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                  {s.value}
                </p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </Link>
            )
          })}
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Classes */}
        <ScrollReveal delay={0.1}>
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-violet-500" />
                My Classes
              </h2>
              <Link href="/classes" className="text-xs text-electric font-medium flex items-center gap-1 hover:underline">
                Manage <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {(myClasses ?? []).map((cls) => {
                const classStudentCount = (students ?? []).filter((s) => s.class_id === cls.id).length
                return (
                  <Link
                    key={cls.id}
                    href={`/classes/${cls.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-violet-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{cls.name}</p>
                      <p className="text-xs text-gray-400">
                        {cls.subject ?? 'No subject'} · {classStudentCount} student{classStudentCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-mono font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                        {cls.invite_code}
                      </p>
                    </div>
                  </Link>
                )
              })}
              {!myClasses?.length && (
                <div className="py-8 text-center">
                  <GraduationCap className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No classes yet</p>
                  <Link href="/classes" className="mt-2 inline-flex items-center gap-1 text-sm text-electric font-medium">
                    <Plus className="w-4 h-4" /> Create a class
                  </Link>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Assignments */}
        <ScrollReveal delay={0.15}>
          <div className="glass rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-emerald-500" />
                Class Assignments
              </h2>
              <Link href="/assignments" className="text-xs text-electric font-medium flex items-center gap-1 hover:underline">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {(classAssignments ?? []).slice(0, 8).map((a) => (
                <div key={a.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${priorityDot[a.priority] ?? 'bg-gray-300'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{a.title}</p>
                    {a.due_date && (
                      <p className="text-xs text-gray-400">
                        Due {new Date(a.due_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor[a.status] ?? 'bg-gray-100 text-gray-500'}`}>
                    {a.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
              {!classAssignments?.length && (
                <p className="text-sm text-gray-400 py-4 text-center">No assignments posted</p>
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
            Teacher Tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Screen Monitor', desc: 'Watch student activity', icon: Monitor, href: '/monitor', color: 'text-violet-500 bg-violet-50' },
              { label: 'Overdue Items', desc: `${overdueCount} item${overdueCount !== 1 ? 's' : ''} need attention`, icon: AlertTriangle, href: '/overdue', color: 'text-red-500 bg-red-50' },
              { label: 'My Classes', desc: 'Manage class rosters', icon: GraduationCap, href: '/classes', color: 'text-blue-500 bg-blue-50' },
              { label: 'Grades', desc: 'View grade entries', icon: BarChart3, href: '/grades', color: 'text-orange-500 bg-orange-50' },
            ].map((action) => {
              const Icon = action.icon
              const [iconColor, iconBg] = action.color.split(' ')
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all"
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
