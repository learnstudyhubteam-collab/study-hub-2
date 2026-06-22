import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { createClient } from '@/lib/supabase/server'
import { getModelForStatus } from '@/lib/tier'
import { SYSTEM_PROMPT } from '@/lib/system-prompt'
import type { SubscriptionStatus } from '@/types'

export async function POST(req: Request) {
  const { messages, sessionId } = await req.json()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return new Response('Unauthorized', { status: 401 })

  // Verify session belongs to user
  const { data: session } = await supabase
    .from('study_sessions')
    .select('id, topic, mode')
    .eq('id', sessionId)
    .eq('user_id', user.id)
    .single()

  if (!session) return new Response('Not found', { status: 404 })

  // Get subscription status for model routing
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  const modelId = getModelForStatus(
    (profile?.subscription_status as SubscriptionStatus) ?? 'free'
  )

  // Save the incoming user message
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
