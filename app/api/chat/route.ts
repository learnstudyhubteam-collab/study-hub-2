import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { createClient } from '@/lib/supabase/server'
import { getModelForPlan, PLAN_LIMITS } from '@/lib/tier'
import { SYSTEM_PROMPT } from '@/lib/system-prompt'
import type { SubscriptionPlan } from '@/lib/tier'

export async function POST(req: Request) {
  const { messages, sessionId } = await req.json()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { data: session } = await supabase
    .from('study_sessions')
    .select('id, topic, mode')
    .eq('id', sessionId)
    .eq('user_id', user.id)
    .single()
  if (!session) return new Response('Not found', { status: 404 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_plan, subscription_status')
    .eq('id', user.id)
    .single()

  const status = profile?.subscription_status ?? 'free'
  const plan = (status === 'active' ? (profile?.subscription_plan ?? 'free') : 'free') as SubscriptionPlan
  const limits = PLAN_LIMITS[plan]

  // Enforce free-tier session limit
  if (limits.aiSessionsPerMonth !== null) {
    const startOfMonth = new Date()
    startOfMonth.setDate(1); startOfMonth.setHours(0, 0, 0, 0)
    const { count } = await supabase
      .from('study_sessions')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', startOfMonth.toISOString())
    if ((count ?? 0) > limits.aiSessionsPerMonth) {
      return Response.json(
        { error: `Free plan allows ${limits.aiSessionsPerMonth} AI sessions per month. Upgrade to continue.` },
        { status: 403 }
      )
    }
  }

  const modelId = getModelForPlan(plan)

  const lastMessage = messages[messages.length - 1]
  if (lastMessage?.role === 'user') {
    await supabase.from('messages').insert({
      session_id: sessionId,
      user_id: user.id,
      role: 'user',
      content: lastMessage.content,
    })
  }

  const result = streamText({
    model: anthropic(modelId),
    system: `${SYSTEM_PROMPT}\n\nCurrent session topic: ${session.topic}\nSelected mode: ${session.mode.replace('_', ' ')}`,
    messages,
    onFinish: async ({ text }) => {
      await supabase.from('messages').insert({
        session_id: sessionId,
        user_id: user.id,
        role: 'assistant',
        content: text,
      })
      await supabase
        .from('study_sessions')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', sessionId)
    },
  })

  return result.toDataStreamResponse()
}
