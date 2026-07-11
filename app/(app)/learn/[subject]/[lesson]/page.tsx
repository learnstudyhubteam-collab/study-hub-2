import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getSubject, getLesson } from '@/lib/learn-content'
import LessonQuiz from '@/components/learn/LessonQuiz'

export const dynamic = 'force-dynamic'

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

  const { data: existing } = await supabase
    .from('learn_completions')
    .select('score, xp_earned, rubies_earned')
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .single()

  return (
    <LessonQuiz
      subject={subject}
      lesson={lesson}
      userId={user.id}
      alreadyCompleted={existing ?? null}
    />
  )
}
