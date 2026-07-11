import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { subjects } from '@/lib/learn-content'
import { Flame, Gem, BookOpen, Star, Target } from 'lucide-react'
import ScrollReveal from '@/components/ui/scroll-reveal'

export const dynamic = 'force-dynamic'

const levelLabel: Record<number, string> = { 1: 'Foundations', 2: 'Intermediate', 3: 'Advanced' }
const levelColor: Record<number, string> = {
  1: 'text-blue-600',
  2: 'text-violet-600',
  3: 'text-emerald-600',
}

export default async function LearnPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: profile }, { data: progressRows }, { data: streakData }] = await Promise.all([
    supabase.from('profiles').select('full_name, rubies, streak_freeze_count').eq('id', user.id).single(),
    supabase.from('learn_progress').select('subject, xp, lessons_completed, level, placement_done').eq('user_id', user.id),
    supabase.from('study_activity').select('activity_date').eq('user_id', user.id).order('activity_date', { ascending: false }).limit(30),
  ])

  const progressMap = Object.fromEntries((progressRows ?? []).map((p) => [p.subject, p]))

  let streak = 0
  if (streakData && streakData.length > 0) {
    const check = new Date()
    for (const row of streakData) {
      const d = check.toISOString().split('T')[0]
      if (row.activity_date === d) { streak++; check.setDate(check.getDate() - 1) }
      else break
    }
  }

  const totalXP = (progressRows ?? []).reduce((sum, p) => sum + p.xp, 0)
  const totalLessons = (progressRows ?? []).reduce((sum, p) => sum + p.lessons_completed, 0)

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-electric" />
              <span className="text-xs font-bold text-electric uppercase tracking-widest">Learn Mode</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">What are you learning today?</h1>
            <p className="text-sm text-gray-500 mt-0.5">Complete lessons to earn rubies and keep your streak alive.</p>
          </div>
          <Link href="/shop" className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 transition-colors">
            <Gem className="w-4 h-4 text-red-500" />
            <span className="text-sm font-bold text-red-600">{(profile?.rubies ?? 0).toLocaleString()}</span>
          </Link>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Day Streak', value: streak, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: 'Rubies', value: profile?.rubies ?? 0, icon: Gem, color: 'text-red-500', bg: 'bg-red-50' },
            { label: 'Total XP', value: totalXP, icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
            { label: 'Lessons Done', value: totalLessons, icon: BookOpen, color: 'text-electric', bg: 'bg-blue-50' },
          ].map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="glass rounded-2xl p-4 space-y-2">
                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <Icon className={`w-4.5 h-4.5 ${s.color}`} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{s.value.toLocaleString()}</p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            )
          })}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {subjects.map((subject) => {
            const prog = progressMap[subject.id]
            const xp = prog?.xp ?? 0
            const done = prog?.lessons_completed ?? 0
            const total = subject.lessons.length
            const pct = total > 0 ? Math.round((done / total) * 100) : 0
            const placementDone = prog?.placement_done ?? false
            const userLevel = prog?.level ?? 1
            const needsPlacement = subject.hasPlacement && !placementDone

            return (
              <Link
                key={subject.id}
                href={needsPlacement ? `/learn/${subject.id}/placement` : `/learn/${subject.id}`}
                className={`glass rounded-2xl p-5 border ${subject.border} hover:shadow-md hover:-translate-y-0.5 transition-all group space-y-4`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${subject.bg} flex items-center justify-center text-2xl`}>
                    {subject.emoji}
                  </div>
                  {needsPlacement ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                      <Target className="w-3 h-3" /> Place me
                    </span>
                  ) : done === total && total > 0 ? (
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Complete</span>
                  ) : placementDone ? (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 ${levelColor[userLevel]}`}>
                      {levelLabel[userLevel]}
                    </span>
                  ) : null}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{subject.label}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {needsPlacement ? 'Take placement test to start' : `${done}/${total} lessons · ${xp} XP`}
                  </p>
                </div>
                {!needsPlacement && (
                  <div className="space-y-1.5">
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${pct === 100 ? 'bg-emerald-500' : 'bg-electric'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-400">{pct}% complete</p>
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </ScrollReveal>
    </div>
  )
}
