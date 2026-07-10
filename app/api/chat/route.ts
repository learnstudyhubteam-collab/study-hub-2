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
    if ((count ?? 0) >= limits.aiSessionsPerMonth) {
      return Response.json(
        { error: `Free plan allows ${limits.aiSessionsPerMonth} AI sessions per month. Upgrade to continue.` },
        { status: 403 }
      )
    }
  }

  // Enforce daily message limit (cost control + upgrade prompt)
  if (limits.aiMessagesPerDay !== null) {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    const { count: msgCount } = await supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('role', 'user')
      .gte('created_at', startOfDay.toISOString())
    if ((msgCount ?? 0) >= limits.aiMessagesPerDay) {
      return Response.json(
        {
          error: plan === 'free'
            ? `You've used all ${limits.aiMessagesPerDay} free messages for today. Upgrade to Plus for a much higher limit, or come back tomorrow.`
            : `Daily message limit reached (${limits.aiMessagesPerDay}). It resets at midnight — or upgrade to Pro for unlimited messages.`,
        },
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
