import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import {
  AlertTriangle, ArrowLeft, Clock, BookOpen, Users,
  ChevronRight, GraduationCap, Shield, Calendar,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/scroll-reveal'

export const dynamic = 'force-dynamic'

const SELECT = 'id, title, subject, due_date, priority, status, class_id, user_id, profiles(full_name, email, school), classes(name, subject)'

type OverdueAssignment = {
  id: string
  title: string
  subject: string | null
  due_date: string | null
  priority: string
  status: string
  class_id: string | null
  user_id: string
  profiles: { full_name: string | null; email: string; school: string | null } | null
  classes: { name: string; subject: string | null } | null
}

export default async function OverduePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'teacher' && profile?.role !== 'admin') redirect('/dashboard')

  const isAdmin = profile?.role === 'admin'
  const now = new Date().toISOString()

  let classIds: string[] = []
  if (!isAdmin) {
    const { data: myClasses } = await supabase
      .from('classes')
      .select('id')
      .eq('teacher_id', user.id)
    classIds = (myClasses ?? []).map((c) => c.id)
    if (classIds.length === 0) return <EmptyState role={profile?.role} />
  }

  // Build two separate queries — no .clone() needed
  const buildBase = () =>
    supabase
      .from('assignments')
      .select(SELECT)
      .order('due_date', { ascending: true })

  const applyScope = (q: ReturnType<typeof buildBase>) =>
    isAdmin ? q : q.in('class_id', classIds)

  const [{ data: overdue }, { data: pendingLate }] = await Promise.all([
    applyScope(buildBase()).eq('status', 'overdue').limit(100),
    applyScope(buildBase())
      .in('status', ['pending', 'in_progress'])
      .not('due_date', 'is', null)
      .lte('due_date', now)
      .limit(100),
  ])

  const overdueItems = (overdue ?? []) as unknown as OverdueAssignment[]
  const pendingItems = (pendingLate ?? []) as unknown as OverdueAssignment[]

  // Combine, deduplicate, sort oldest first
  const seen = new Set<string>()
  const allAtRisk: OverdueAssignment[] = []
  for (const item of [...overdueItems, ...pendingItems]) {
    if (!seen.has(item.id)) {
      seen.add(item.id)
      allAtRisk.push(item)
    }
  }
  allAtRisk.sort((a, b) => {
    if (!a.due_date) return 1
    if (!b.due_date) return -1
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
  })

  // Group by student, sorted by most overdue
  const byStudent: Record<string, { name: string; email: string; school: string | null; items: OverdueAssignment[] }> = {}
  for (const item of allAtRisk) {
    const uid = item.user_id
    if (!byStudent[uid]) {
      byStudent[uid] = {
        name: item.profiles?.full_name ?? 'Unknown Student',
        email: item.profiles?.email ?? '',
        school: item.profiles?.school ?? null,
        items: [],
      }
    }
    byStudent[uid].items.push(item)
  }
  const studentList = Object.entries(byStudent).sort((a, b) => b[1].items.length - a[1].items.length)

  const daysOverdue = (dateStr: string | null) => {
    if (!dateStr) return null
    return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24))
  }

  const priorityDot: Record<string, string> = {
    high: 'bg-red-500',
    medium: 'bg-amber-400',
    low: 'bg-gray-300',
  }

  const priorityBadge: Record<string, string> = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-gray-100 text-gray-500',
  }

  const overdayColor = (days: number) =>
    days > 7 ? 'text-red-600' : days > 3 ? 'text-orange-500' : 'text-amber-500'

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal>
        <div className="flex items-start justify-between">
          <div>
            <Link
              href={isAdmin ? '/admin' : '/teacher'}
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-3"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {isAdmin ? 'Admin' : 'Teacher'} Dashboard
            </Link>
            <div className="flex items-center gap-2 mb-1">
              {isAdmin
                ? <Shield className="w-4 h-4 text-red-500" />
                : <GraduationCap className="w-4 h-4 text-violet-500" />
              }
              <span className={`text-xs font-bold uppercase tracking-widest ${isAdmin ? 'text-red-500' : 'text-violet-500'}`}>
                {isAdmin ? 'Admin' : 'Teacher'} · Overdue Tracker
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              Overdue & At-Risk Items
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {allAtRisk.length} item{allAtRisk.length !== 1 ? 's' : ''} overdue across {studentList.length} student{studentList.length !== 1 ? 's' : ''}
              {isAdmin ? ' (platform-wide)' : ' (your classes)'}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Summary stats */}
      <ScrollReveal delay={0.05}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Overdue', value: allAtRisk.length, icon: AlertTriangle, color: 'text-red-500 bg-red-50' },
            { label: 'Students Affected', value: studentList.length, icon: Users, color: 'text-orange-500 bg-orange-50' },
            { label: 'High Priority', value: allAtRisk.filter((a) => a.priority === 'high').length, icon: Clock, color: 'text-red-600 bg-red-50' },
            {
              label: 'Oldest (days)',
              value: allAtRisk.length > 0 ? Math.max(0, ...allAtRisk.map((a) => daysOverdue(a.due_date) ?? 0)) : 0,
              icon: Calendar,
              color: 'text-gray-500 bg-gray-50',
            },
          ].map((s) => {
            const [iconColor, iconBg] = s.color.split(' ')
            const Icon = s.icon
            return (
              <div key={s.label} className="glass rounded-2xl p-4 space-y-2">
                <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            )
          })}
        </div>
      </ScrollReveal>

      {allAtRisk.length === 0 ? (
        <ScrollReveal delay={0.1}>
          <div className="glass rounded-2xl p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-7 h-7 text-emerald-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">All caught up!</h2>
            <p className="text-sm text-gray-400">No overdue assignments found.</p>
          </div>
        </ScrollReveal>
      ) : (
        <>
          {/* Per-student accordion */}
          <ScrollReveal delay={0.1}>
            <div className="glass rounded-2xl p-5 space-y-4">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-red-500" />
                By Student
                <span className="ml-auto text-xs font-normal text-gray-400">Most overdue first</span>
              </h2>
              <div className="space-y-3">
                {studentList.map(([uid, student]) => (
                  <details key={uid} className="group rounded-2xl border border-gray-100 overflow-hidden">
                    <summary className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50/70 transition-colors select-none list-none">
                      <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-red-500">
                          {student.name[0]?.toUpperCase() ?? '?'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-400">
                          {student.email}{student.school ? ` · ${student.school}` : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-700">
                          {student.items.length} overdue
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90" />
                      </div>
                    </summary>
                    <div className="border-t border-gray-100 divide-y divide-gray-50">
                      {student.items.map((item) => {
                        const days = daysOverdue(item.due_date)
                        return (
                          <div key={item.id} className="flex items-center gap-3 px-4 py-3 bg-white">
                            <div className={`w-2 h-2 rounded-full shrink-0 ${priorityDot[item.priority] ?? 'bg-gray-300'}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{item.title}</p>
                              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                {item.subject && (
                                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">
                                    {item.subject}
                                  </span>
                                )}
                                {item.classes?.name && (
                                  <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">
                                    {item.classes.name}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right shrink-0 space-y-1">
                              {days !== null && (
                                <p className={`text-xs font-bold ${overdayColor(days)}`}>
                                  {days === 0 ? 'Due today' : `${days}d overdue`}
                                </p>
                              )}
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${priorityBadge[item.priority] ?? 'bg-gray-100 text-gray-500'}`}>
                                {item.priority}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Flat table */}
          <ScrollReveal delay={0.15}>
            <div className="glass rounded-2xl p-5 space-y-4">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                All Overdue Items
                <span className="ml-auto text-xs font-normal text-gray-400">Oldest first</span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Assignment', 'Student', 'Class', 'Due', 'Overdue', 'Priority'].map((h) => (
                        <th key={h} className="text-left px-2 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {allAtRisk.map((item) => {
                      const days = daysOverdue(item.due_date)
                      return (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-2 py-3">
                            <p className="font-medium text-gray-900 max-w-[160px] truncate">{item.title}</p>
                            {item.subject && <p className="text-xs text-gray-400 mt-0.5">{item.subject}</p>}
                          </td>
                          <td className="px-2 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                                <span className="text-[10px] font-bold text-red-500">
                                  {(item.profiles?.full_name ?? '?')[0]?.toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-900">{item.profiles?.full_name ?? 'Unknown'}</p>
                                {isAdmin && item.profiles?.school && (
                                  <p className="text-[10px] text-gray-400">{item.profiles.school}</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-3 text-xs text-gray-500">{item.classes?.name ?? '—'}</td>
                          <td className="px-2 py-3 text-xs text-gray-500">
                            {item.due_date ? new Date(item.due_date).toLocaleDateString() : '—'}
                          </td>
                          <td className="px-2 py-3">
                            {days !== null ? (
                              <span className={`text-xs font-bold ${overdayColor(days)}`}>
                                {days === 0 ? 'Today' : `${days}d`}
                              </span>
                            ) : '—'}
                          </td>
                          <td className="px-2 py-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityBadge[item.priority] ?? 'bg-gray-100 text-gray-500'}`}>
                              {item.priority}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </>
      )}
    </div>
  )
}

function EmptyState({ role }: { role?: string | null }) {
  return (
    <div className="space-y-6">
      <Link
        href={role === 'admin' ? '/admin' : '/teacher'}
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
      <div className="glass rounded-2xl p-12 text-center">
        <GraduationCap className="w-10 h-10 text-gray-200 mx-auto mb-3" />
        <h2 className="text-lg font-semibold text-gray-900 mb-1">No classes yet</h2>
        <p className="text-sm text-gray-400 mb-4">Create a class first to track student assignments.</p>
        <Link
          href="/classes"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl btn-electric text-white text-sm font-medium"
        >
          Go to Classes
        </Link>
      </div>
    </div>
  )
}
