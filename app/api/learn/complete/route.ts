import { createClient, createAdminClient } from '@/lib/supabase/server'
import { getSubject, getLesson } from '@/lib/learn-content'

export const dynamic = 'force-dynamic'

// Lesson rewards are computed server-side from the lesson definition so
// clients can't forge XP/ruby amounts. Rubies/streaks are written with the
// service role because the profiles trigger blocks client-side changes.
export async function POST(req: Request) {
  const { subjectId, lessonId, score } = await req.json().catch(() => ({}))

  const subject = getSubject(subjectId)
  const lesson = getLesson(subjectId, lessonId)
  if (!subject || !lesson) {
    return Response.json({ error: 'Unknown lesson' }, { status: 400 })
  }
  const safeScore = Math.round(Number(score))
  if (!Number.isFinite(safeScore) || safeScore < 0 || safeScore > 100) {
    return Response.json({ error: 'Invalid score' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const admin = await createAdminClient()

  // Rewards only on first completion; replays record nothing
  const { data: existing } = await admin
    .from('learn_completions')
    .select('id')
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .maybeSingle()

  const today = new Date().toISOString().split('T')[0]

  if (existing) {
    await admin.from('study_activity').upsert(
      { user_id: user.id, activity_date: today },
      { onConflict: 'user_id,activity_date' }
    )
    return Response.json({ xp: 0, rubies: 0, score: safeScore, alreadyCompleted: true })
  }

  const xpEarned = lesson.xp
  const rubiesEarned = safeScore >= 60 ? lesson.rubies : 0

  const { error: completionErr } = await admin.from('learn_completions').insert({
    user_id: user.id,
    subject: subject.id,
    lesson_id: lessonId,
    score: safeScore,
    xp_earned: xpEarned,
    rubies_earned: rubiesEarned,
  })
  if (completionErr) {
    return Response.json({ error: completionErr.message }, { status: 500 })
  }

  // Accumulate progress (the old client-side upsert overwrote xp instead of adding)
  const { data: progress } = await admin
    .from('learn_progress')
    .select('xp, lessons_completed')
    .eq('user_id', user.id)
    .eq('subject', subject.id)
    .maybeSingle()

  await Promise.all([
    admin.from('learn_progress').upsert(
      {
        user_id: user.id,
        subject: subject.id,
        xp: (progress?.xp ?? 0) + xpEarned,
        lessons_completed: (progress?.lessons_completed ?? 0) + 1,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,subject' }
    ),
    rubiesEarned > 0
      ? admin
          .from('profiles')
          .select('rubies')
          .eq('id', user.id)
          .single()
          .then(({ data }) =>
            admin
              .from('profiles')
              .update({ rubies: (data?.rubies ?? 0) + rubiesEarned })
              .eq('id', user.id)
          )
      : Promise.resolve(),
    admin.from('study_activity').upsert(
      { user_id: user.id, activity_date: today },
      { onConflict: 'user_id,activity_date' }
    ),
  ])

  return Response.json({ xp: xpEarned, rubies: rubiesEarned, score: safeScore, alreadyCompleted: false })
}
