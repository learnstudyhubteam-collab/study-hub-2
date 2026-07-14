import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  Monitor, Circle, BookOpen, Layers, Clock, Users,
  ExternalLink, Shield, GraduationCap, Wifi, WifiOff,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/scroll-reveal'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type SessionWithProfile = {
  id: string
  topic: string
  mode: string
  subject: string | null
  updated_at: string
  user_id: string
  profiles: { full_name: string | null; email: string; school: string | null } | null
}

export default async function ScreenMonitorPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'teacher' && profile?.role !== 'admin') redirect('/dashboard')

  const now = new Date()
  const todayStr = now.toISOString().split('T')[0]
  const fifteenMinAgo = new Date(now.getTime() - 15 * 60 * 1000).toISOString()
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString()

  const [{ data: recentSessions }, { data: activeToday }] = await Promise.all([
    supabase
      .from('study_sessions')
      .select('id, topic, mode, subject, updated_at, user_id, profiles(full_name, email, school)')
      .gte('updated_at', oneHourAgo)
      .order('updated_at', { ascending: false })
      .limit(50),
    supabase
      .from('study_activity')
      .select('user_id, activity_date')
      .eq('activity_date', todayStr),
  ])

  const sessions = (recentSessions ?? []) as unknown as SessionWithProfile[]

  function getStatus(updatedAt: string): 'active' | 'idle' | 'away' {
    const diff = now.getTime() - new Date(updatedAt).getTime()
    if (diff < 5 * 60 * 1000) return 'active'
    if (diff < 15 * 60 * 1000) return 'idle'
    return 'away'
  }

  const statusConfig = {
    active: { label: 'Active', color: 'text-emerald-600', bg: 'bg-emerald-100', dot: 'bg-emerald-500' },
    idle: { label: 'Idle', color: 'text-amber-600', bg: 'bg-amber-100', dot: 'bg-amber-400' },
    away: { label: 'Away', color: 'text-gray-500', bg: 'bg-gray-100', dot: 'bg-gray-400' },
  }

  const modeLabel: Record<string, string> = {
    direct: 'Direct Explanation',
    socratic: 'Socratic',
    step_by_step: 'Step-by-Step',
    feedback: 'Review My Work',
  }

  const activeCount = sessions.filter((s) => getStatus(s.updated_at) === 'active').length
  const idleCount = sessions.filter((s) => getStatus(s.updated_at) === 'idle').length

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {profile?.role === 'admin'
                ? <Shield className="w-4 h-4 text-red-500" />
                : <GraduationCap className="w-4 h-4 text-violet-500" />
              }
              <span className={`text-xs font-bold uppercase tracking-widest ${profile?.role === 'admin' ? 'text-red-500' : 'text-violet-500'}`}>
                {profile?.role === 'admin' ? 'Admin' : 'Teacher'} · Activity Monitor
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Student Activity Monitor</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Real-time view of what students are studying on Tutor AI
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700">Live</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal delay={0.05}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Active Now', value: activeCount, icon: Wifi, color: 'text-emerald-500 bg-emerald-50' },
            { label: 'Idle (15m)', value: idleCount, icon: Clock, color: 'text-amber-500 bg-amber-50' },
            { label: 'Sessions Today', value: activeToday?.length ?? 0, icon: BookOpen, color: 'text-blue-500 bg-blue-50' },
            { label: 'Total Tracked', value: sessions.length, icon: Users, color: 'text-gray-500 bg-gray-50' },
          ].map((s) => {
            const [iconColor, iconBg] = s.color.split(' ')
            const Icon = s.icon
            return (
              <div key={s.label} className="glass rounded-2xl p-4 space-y-2">
                <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
                  <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            )
          })}
        </div>
      </ScrollReveal>

      {/* Live sessions */}
      <ScrollReveal delay={0.1}>
        <div className="glass rounded-2xl p-5 space-y-4">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Monitor className="w-4 h-4 text-violet-500" />
            Live Study Sessions
            <span className="ml-auto text-xs text-gray-400 font-normal">
              Refreshes on page load · Last {new Date().toLocaleTimeString()}
            </span>
          </h2>

          {sessions.length === 0 ? (
            <div className="py-12 text-center">
              <WifiOff className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 font-medium">No active sessions in the last hour</p>
              <p className="text-sm text-gray-300 mt-1">Students appear here when they use the AI tutor</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-2 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Student</th>
                    <th className="text-left px-2 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Studying</th>
                    <th className="text-left px-2 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Mode</th>
                    <th className="text-left px-2 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject</th>
                    <th className="text-left px-2 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Active</th>
                    <th className="text-left px-2 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sessions.map((s) => {
                    const status = getStatus(s.updated_at)
                    const cfg = statusConfig[status]
                    const minutesAgo = Math.floor((now.getTime() - new Date(s.updated_at).getTime()) / 60000)
                    return (
                      <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-2 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-electric/10 flex items-center justify-center shrink-0">
                              <span className="text-[10px] font-bold text-electric">
                                {((s.profiles?.full_name ?? s.profiles?.email ?? '?')[0]).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-xs">
                                {s.profiles?.full_name ?? 'Unknown'}
                              </p>
                              <p className="text-[10px] text-gray-400">{s.profiles?.school ?? '—'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-3">
                          <p className="text-xs text-gray-800 font-medium max-w-[180px] truncate">{s.topic}</p>
                        </td>
                        <td className="px-2 py-3">
                          <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                            {modeLabel[s.mode] ?? s.mode}
                          </span>
                        </td>
                        <td className="px-2 py-3 text-xs text-gray-500">{s.subject ?? '—'}</td>
                        <td className="px-2 py-3 text-xs text-gray-400">
                          {minutesAgo === 0 ? 'Just now' : `${minutesAgo}m ago`}
                        </td>
                        <td className="px-2 py-3">
                          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${cfg.bg}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${status === 'active' ? 'animate-pulse' : ''}`} />
                            <span className={`text-[10px] font-semibold ${cfg.color}`}>{cfg.label}</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </ScrollReveal>

      {/* Lightspeed integration info */}
      <ScrollReveal delay={0.15}>
        <div className="glass rounded-2xl p-5 space-y-4 border border-violet-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
              <Monitor className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Lightspeed Classroom Integration</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                For full device-level screen visibility (not just Tutor AI activity), integrate
                Lightspeed Classroom — an MDM-based tool that lets teachers see and control
                student screens across all apps, not just this one.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                step: '1',
                title: 'Get Lightspeed',
                desc: 'Your school IT admin needs to deploy the Lightspeed Classroom agent on student devices via MDM (Jamf, Mosyle, Intune, etc.).',
              },
              {
                step: '2',
                title: 'Teacher Console',
                desc: 'Once deployed, log in to classroom.lightspeedsystems.com with your school account to view and manage student screens.',
              },
              {
                step: '3',
                title: 'Use Both',
                desc: 'Use this page to see what students are studying inside Tutor AI, and Lightspeed for full OS-level visibility across all apps.',
              },
            ].map((item) => (
              <div key={item.step} className="p-4 rounded-xl bg-violet-50 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-violet-200 flex items-center justify-center">
                  <span className="text-xs font-bold text-violet-700">{item.step}</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-1">
            <a
              href="https://www.lightspeedsystems.com/solutions/classroom-management/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-violet-600 font-medium hover:underline"
            >
              Learn about Lightspeed Classroom <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-400">Requires school IT admin setup</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
