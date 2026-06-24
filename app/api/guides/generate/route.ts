import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { createClient } from '@/lib/supabase/server'
import { getModelForPlan, PLAN_LIMITS } from '@/lib/tier'
import type { SubscriptionPlan } from '@/lib/tier'

export async function POST(req: Request) {
  const { topic, subject, gradeLevel, extraContext } = await req.json()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { data: profile } = await supabase
    .from('profiles').select('subscription_plan, subscription_status').eq('id', user.id).single()

  const status = profile?.subscription_status ?? 'free'
  const plan = (status === 'active' ? (profile?.subscription_plan ?? 'free') : 'free') as SubscriptionPlan
  const limits = PLAN_LIMITS[plan]

  if (!limits.aiGuideGen) {
    return Response.json({ error: 'AI study guide generation requires a Plus or Pro plan.' }, { status: 403 })
  }

  const modelId = getModelForPlan(plan)

  const { text } = await generateText({
    model: anthropic(modelId),
    prompt: `Create a comprehensive study guide for the following topic.

Topic: ${topic}
${subject ? `Subject: ${subject}` : ''}
${gradeLevel ? `Level: ${gradeLevel}` : ''}
${extraContext ? `Additional instructions: ${extraContext}` : ''}

Structure the guide with these sections:
1. Overview & Key Concepts (brief intro)
2. Core Content (main body — explain concepts clearly with examples)
3. Important Terms & Definitions (glossary)
4. Common Misconceptions & Tips
5. Practice Questions (5 questions with answers)
6. Summary & Key Takeaways

Make it comprehensive but easy to read. Use clear headings, bullet points, and examples.
Tailor the complexity to the specified grade level if provided.`,
  })

  const { data, error } = await supabase.from('study_guides').insert({
    user_id: user.id,
    title: topic,
    content: text,
    subject: subject || null,
  }).select('*').single()

  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json(data)
}
