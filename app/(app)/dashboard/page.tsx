import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getUserPlan } from '@/lib/tier'
import { logActivity, getStreakData } from '@/lib/activity'
import UpgradeBanner from '@/components/billing/UpgradeBanner'
import StreakWidget from '@/components/dashboard/StreakWidget'
import ScrollReveal from '@/components/ui/scroll-reveal'
import { BookOpen, Layers, Zap, ArrowRight, Clock, ChevronRight, AlertTriangle, CalendarClock } from 'lucide-react'
import type { StudySession, FlashcardDeck } from '@/types'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const plan = await getUserPlan()
  const proUser = plan === 'plus' || plan === 'pro'

  // Log today's activity (upsert — safe to call on every load)
  await logActivity(supabase, user!.id)

  const now = new Date()
  const todayEnd = new Date(now)
  todayEnd.setHours(23, 59, 59, 999)
  const tomorrowEnd = new Date(now)
  tomorrowEnd.setDate(tomorrowEnd.getDate() + 1)
  tomorrowEnd.setHours(23, 59, 59, 999)

  const [{ data: sessions }, { data: decks }, { data: profile }, streakData, { data: urgentAssignments }, { data: urgentExams }] = await Promise.all([
    supabase
      .from('study_sessions')
      .select('*')
      .eq('user_id', user!.id)
      .order('updated_at', { ascending: false })
      .limit(5),
    supabase
      .from('flashcard_decks')
      .select('id, title, subject, created_at, updated_at')
      .eq('user_id', user!.id)
      .order('updated_at', { ascending: false })
      .limit(4),
    supabase.from('profiles').select('full_name').eq('id', user!.id).single(),
    getStreakData(supabase, user!.id),
    supabase
      .from('assignments')
      .select('id, title, subject, due_date, priority')
      .eq('user_id', user!.id)
      .neq('status', 'completed')
      .lte('due_date', tomorrowEnd.toISOString())
      .order('due_date', { ascending: true })
      .limit(5),
    supabase
      .from('exams')
      .select('id, title, subject, exam_date')
      .eq('user_id', user!.id)
      .gte('exam_date', now.toISOString())
      .lte('exam_date', tomorrowEnd.toISOString())
      .order('exam_date', { ascending: true })
      .limit(3),
  ])

  const firstName = profile?.full_name?.split(' ')[0] ?? 'there'

  const modeLabels: Record<string, string> = {
    direct: 'Direct',
    socratic: 'Socratic',
    step_by_step: 'Step-by-step',
    feedback: 'Feedback',
  }

  const modeColors: Record<string, string> = {
    direct: 'bg-blue-100 text-blue-600',
    socratic: 'bg-violet-100 text-violet-600',
    step_by_step: 'bg-emerald-100 text-emerald-600',
    feedback: 'bg-amber-100 text-amber-600',
  }

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-up">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Hey, {firstName} 👋
          </h1>
          <p className="text-gray-500 mt-1 text-sm">What would you like to study today?</p>
        </div>
        <Link
          href="/study"
          className="btn-electric text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5" fill="white" />
          New session
        </Link>
      </div>

      {/* Upgrade banner */}
      {!proUser && (
        <ScrollReveal direction="up" delay={80}>
          <UpgradeBanner />
        </ScrollReveal>
      )}

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          {
            href: '/study',
            icon: BookOpen,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            title: 'Start a study session',
            desc: 'Pick a topic and mode',
          },
          {
            href: '/flashcards',
            icon: Layers,
            color: 'text-violet-500',
            bg: 'bg-violet-500/10',
            title: 'My flashcard decks',
            desc: 'Review and quiz yourself',
          },
          {
            href: '/billing',
            icon: Zap,
            color: proUser ? 'text-electric' : 'text-amber-500',
            bg: proUser ? 'bg-electric/10' : 'bg-amber-500/10',
            title: proUser ? 'Pro plan active' : 'Upgrade to Pro',
            desc: proUser ? 'Advanced Claude Sonnet AI' : 'Unlock Claude Sonnet AI',
          },
        ].map((action, i) => {
          const Icon = action.icon
          return (
            <ScrollReveal key={action.href} direction="up" delay={i * 80}>
            <Link href={action.href}>
              <div className="glass-card p-5 h-full group glow-border">
                <div className={`w-10 h-10 rounded-xl ${action.bg} ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{action.title}</h3>
                <p className="text-xs text-gray-500">{action.desc}</p>
              </div>
            </Link>
            </ScrollReveal>
          )
        })}
      </div>

      {/* Streak */}
      <ScrollReveal direction="up" delay={120}>
        <StreakWidget streak={streakData.streak} totalDays={streakData.totalDays} last7={streakData.last7} />
      </ScrollReveal>

      {/* Today's Deadlines */}
      {((urgentAssignments && urgentAssignments.length > 0) || (urgentExams && urgentExams.length > 0)) && (
        <ScrollReveal direction="up" delay={140}>
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Due today &amp; tomorrow
              </h2>
              <Link href="/assignments" className="text-xs text-electric font-semibold hover:text-electric-dark transition-colors flex items-center gap-0.5">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <ul className="space-y-2">
              {(urgentExams ?? []).map((exam) => {
                const isToday = new Date(exam.exam_date) <= todayEnd
                return (
                  <li key={exam.id}>
                    <Link href="/exams" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-red-500/5 transition-colors group">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isToday ? 'bg-red-500/15' : 'bg-amber-500/10'}`}>
                        <CalendarClock className={`w-4 h-4 ${isToday ? 'text-red-500' : 'text-amber-500'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{exam.title}</p>
                        {exam.subject && <p className="text-xs text-gray-400">{exam.subject}</p>}
                      </div>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${isToday ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                        {isToday ? 'Today' : 'Tomorrow'}
                      </span>
                    </Link>
                  </li>
                )
              })}
              {(urgentAssignments ?? []).map((assignment) => {
                const isOverdue = new Date(assignment.due_date) < now
                const isToday = !isOverdue && new Date(assignment.due_date) <= todayEnd
                return (
                  <li key={assignment.id}>
                    <Link href="/assignments" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-500/5 transition-colors group">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isOverdue ? 'bg-red-500/15' : isToday ? 'bg-amber-500/10' : 'bg-blue-500/10'}`}>
                        <Clock className={`w-4 h-4 ${isOverdue ? 'text-red-500' : isToday ? 'text-amber-500' : 'text-blue-500'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{assignment.title}</p>
                        {assignment.subject && <p className="text-xs text-gray-400">{assignment.subject}</p>}
                      </div>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${isOverdue ? 'bg-red-100 text-red-600' : isToday ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                        {isOverdue ? 'Overdue' : isToday ? 'Today' : 'Tomorrow'}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </ScrollReveal>
      )}

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recent sessions */}
        <ScrollReveal direction="left" delay={0}>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-electric" />
              Recent sessions
            </h2>
            <Link href="/study" className="text-xs text-electric font-semibold hover:text-electric-dark transition-colors flex items-center gap-0.5">
              New <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {sessions && sessions.length > 0 ? (
            <ul className="space-y-1">
              {(sessions as StudySession[]).map((session) => (
                <li key={session.id}>
                  <Link
                    href={`/study/${session.id}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-electric/5 transition-all duration-200 group"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{session.topic}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${modeColors[session.mode] || 'bg-gray-100 text-gray-500'}`}>
                          {modeLabels[session.mode]}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(session.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-electric group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-2xl bg-electric/10 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-electric" />
              </div>
              <p className="text-sm text-gray-500 mb-1">No sessions yet</p>
              <Link href="/study" className="text-xs text-electric font-semibold hover:underline">
                Start your first one →
              </Link>
            </div>
          )}
        </div>
        </ScrollReveal>

        {/* Flashcard decks */}
        <ScrollReveal direction="right" delay={100}>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-electric" />
              Flashcard decks
            </h2>
            <Link href="/flashcards" className="text-xs text-electric font-semibold hover:text-electric-dark transition-colors flex items-center gap-0.5">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {decks && decks.length > 0 ? (
            <ul className="space-y-1">
              {(decks as FlashcardDeck[]).map((deck) => (
                <li key={deck.id}>
                  <Link
                    href={`/flashcards/${deck.id}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-electric/5 transition-all duration-200 group"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{deck.title}</p>
                      {deck.subject && (
                        <p className="text-xs text-electric mt-0.5">{deck.subject}</p>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-electric group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-3">
                <Layers className="w-6 h-6 text-violet-500" />
              </div>
              <p className="text-sm text-gray-500 mb-1">No decks yet</p>
              <Link href="/flashcards" className="text-xs text-electric font-semibold hover:underline">
                Create your first deck →
              </Link>
            </div>
          )}
        </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
