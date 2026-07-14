import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getUserPlan } from '@/lib/tier'
import { getSubject, getLesson } from '@/lib/learn-content'
import LessonQuiz from '@/components/learn/LessonQuiz'
import { Lock, Sparkles, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

const FREE_LESSONS_PER_DAY = 2

export default async function LessonPage({
  params,
}: {
  params: Promise<{ subject: string; lesson: string }>
}) {
  const { subject: subjectId, lesson: lessonId } = await params
  const subject = getSubject(subjectId)
  const lesson = getLesson(subjectId, lessonId)
  if (!subject || !lesson) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const [plan, { data: existing }, { count: todayCount }] = await Promise.all([
    getUserPlan(),
    supabase
      .from('learn_completions')
      .select('score, xp_earned, rubies_earned')
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)
      .single(),
    supabase
      .from('learn_completions')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('completed_at', startOfDay.toISOString()),
  ])

  // Free users get FREE_LESSONS_PER_DAY new lessons per day.
  // Replaying an already-completed lesson never counts against the cap.
  const capReached =
    plan === 'free' && !existing && (todayCount ?? 0) >= FREE_LESSONS_PER_DAY

  if (capReached) {
    return (
      <div className="max-w-lg mx-auto py-12 animate-fade-up">
        <div className="glass rounded-3xl p-8 text-center space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto shadow-lg shadow-violet-200">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 mb-2">
              You&apos;ve finished today&apos;s free lessons 🎉
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              Nice work — you completed {FREE_LESSONS_PER_DAY} lessons today. Free accounts
              get {FREE_LESSONS_PER_DAY} new lessons a day. Upgrade to Scholar for unlimited
              lessons, or come back tomorrow to keep your streak going.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/billing"
              className="btn-electric text-white px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" /> Unlock unlimited — $7.99/mo
            </Link>
            <Link
              href="/learn"
              className="glass px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <Clock className="w-4 h-4" /> Back to Learn Mode
            </Link>
          </div>
          <p className="text-xs text-gray-400">
            Tip: replaying lessons you&apos;ve already completed is always free.
          </p>
        </div>
      </div>
    )
  }

  return (
    <LessonQuiz
      subject={subject}
      lesson={lesson}
      userId={user.id}
      alreadyCompleted={existing ?? null}
    />
  )
}
