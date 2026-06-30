import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { getSubject } from '@/lib/learn-content'
import { ChevronLeft, Lock, CheckCircle2, Star, Gem } from 'lucide-react'
import ScrollReveal from '@/components/ui/scroll-reveal'

export const dynamic = 'force-dynamic'

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: subjectId } = await params
  const subject = getSubject(subjectId)
  if (!subject) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: completions } = await supabase
    .from('learn_completions')
    .select('lesson_id, score, xp_earned, rubies_earned')
    .eq('user_id', user.id)
    .eq('subject', subjectId)

  const completionMap = Object.fromEntries((completions ?? []).map((c) => [c.lesson_id, c]))
  const totalXP = (completions ?? []).reduce((s, c) => s + c.xp_earned, 0)
  const totalRubies = (completions ?? []).reduce((s, c) => s + c.rubies_earned, 0)

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <ScrollReveal>
        <div>
          <Link href="/learn" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-4">
            <ChevronLeft className="w-4 h-4" /> Back to Subjects
          </Link>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl ${subject.bg} flex items-center justify-center text-3xl`}>
              {subject.emoji}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{subject.label}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs text-yellow-600 font-semibold">
                  <Star className="w-3.5 h-3.5" /> {totalXP} XP earned
                </span>
                <span className="flex items-center gap-1 text-xs text-red-600 font-semibold">
                  <Gem className="w-3.5 h-3.5" /> {totalRubies} rubies earned
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Lesson path */}
      <div className="space-y-3">
        {subject.lessons.map((lesson, idx) => {
          const done = !!completionMap[lesson.id]
          const locked = idx > 0 && !completionMap[subject.lessons[idx - 1].id]
          const score = completionMap[lesson.id]?.score

          return (
            <ScrollReveal key={lesson.id} delay={idx * 0.05}>
              {locked ? (
                <div className="glass rounded-2xl p-5 opacity-50 cursor-not-allowed flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-500">{lesson.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{lesson.description}</p>
                    <p className="text-xs text-gray-400 mt-1">Complete previous lesson to unlock</p>
                  </div>
                </div>
              ) : (
                <Link
                  href={`/learn/${subjectId}/${lesson.id}`}
                  className={`glass rounded-2xl p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all border ${done ? 'border-emerald-200 bg-emerald-50/30' : subject.border}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${done ? 'bg-emerald-100' : subject.bg}`}>
                    {done
                      ? <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      : <span className="text-xl font-bold text-gray-500">{idx + 1}</span>
                    }
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${done ? 'text-emerald-700' : 'text-gray-900'}`}>{lesson.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{lesson.description}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 text-[10px] text-yellow-600 font-semibold">
                        <Star className="w-3 h-3" /> +{lesson.xp} XP
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-red-600 font-semibold">
                        <Gem className="w-3 h-3" /> +{lesson.rubies} rubies
                      </span>
                      <span className="text-[10px] text-gray-400">{lesson.questions.length} questions</span>
                    </div>
                  </div>
                  {done && score !== undefined && (
                    <div className="text-right shrink-0">
                      <p className="text-lg font-bold text-emerald-600">{score}%</p>
                      <p className="text-[10px] text-emerald-500">Score</p>
                    </div>
                  )}
                  {!done && (
                    <div className={`text-xs font-semibold px-3 py-1.5 rounded-xl ${subject.bg} ${subject.color}`}>
                      Start →
                    </div>
                  )}
                </Link>
              )}
            </ScrollReveal>
          )
        })}
      </div>
    </div>
  )
}
