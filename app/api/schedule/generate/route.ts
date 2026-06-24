import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { createClient } from '@/lib/supabase/server'
import { getModelForPlan, PLAN_LIMITS } from '@/lib/tier'
import type { SubscriptionPlan } from '@/lib/tier'

export async function POST(req: Request) {
  const { subjects, examDate, hoursPerDay, title, extraContext } = await req.json()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { data: profile } = await supabase
    .from('profiles').select('subscription_plan, subscription_status').eq('id', user.id).single()

  const status = profile?.subscription_status ?? 'free'
  const plan = (status === 'active' ? (profile?.subscription_plan ?? 'free') : 'free') as SubscriptionPlan
  const limits = PLAN_LIMITS[plan]

  if (!limits.aiScheduleGen) {
    return Response.json({ error: 'AI schedule generation requires a Plus or Pro plan.' }, { status: 403 })
  }

  const modelId = getModelForPlan(plan)
  const subjectsStr = Array.isArray(subjects) ? subjects.join(', ') : subjects
  const daysUntilExam = examDate
    ? Math.ceil((new Date(examDate).getTime() - Date.now()) / 86400000)
    : null

  const { text } = await generateText({
    model: anthropic(modelId),
    prompt: `Create a detailed, personalized study schedule.

Subjects: ${subjectsStr}
${examDate ? `Goal/Exam Date: ${examDate} (${daysUntilExam} days away)` : ''}
Available study time: ${hoursPerDay} hours per day
${extraContext ? `Extra context: ${extraContext}` : ''}

Create a day-by-day study plan that:
1. Distributes subjects evenly based on difficulty and available time
2. Includes specific topics/chapters to cover each day
3. Allocates more time to weaker areas if mentioned
4. Includes short breaks (Pomodoro-style)
5. Has a review period before the exam/goal date

Format it clearly with days as headers, specific time blocks, and brief topic descriptions.
Be practical and motivating. Include study tips specific to the subjects listed.`,
  })

  const { data, error } = await supabase.from('study_schedules').insert({
    user_id: user.id,
    title: title || `Study Schedule: ${subjectsStr}`,
    content: text,
    subjects: Array.isArray(subjects) ? subjects : [subjects],
    exam_date: examDate || null,
    hours_per_day: hoursPerDay || 2,
  }).select('*').single()

  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json(data)
}
