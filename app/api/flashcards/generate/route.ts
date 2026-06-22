import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { createClient } from '@/lib/supabase/server'
import { getModelForStatus } from '@/lib/tier'
import type { SubscriptionStatus } from '@/types'

export async function POST(req: Request) {
  const { topic, deckId } = await req.json()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  // Verify deck belongs to user
  const { data: deck } = await supabase
    .from('flashcard_decks')
    .select('id')
    .eq('id', deckId)
    .eq('user_id', user.id)
    .single()
  if (!deck) return new Response('Not found', { status: 404 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  const modelId = getModelForStatus(
    (profile?.subscription_status as SubscriptionStatus) ?? 'free'
  )

  const { text } = await generateText({
    model: anthropic(modelId),
    prompt: `Generate 8 high-quality flashcards for studying: "${topic}".

Return ONLY a JSON array, no other text. Each item must have "front" (question) and "back" (answer) fields.
Keep questions specific and testable. Keep answers concise but complete.

Example format:
[{"front": "What is X?", "back": "X is..."},...]`,
  })

  let cards: { front: string; back: string }[] = []
  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) cards = JSON.parse(jsonMatch[0])
  } catch {
    return Response.json({ error: 'Failed to parse AI response' }, { status: 500 })
  }

  const rows = cards.map((c) => ({
    deck_id: deckId,
    user_id: user.id,
    front: c.front,
    back: c.back,
  }))

  const { data: inserted } = await supabase.from('flashcard_cards').insert(rows).select('*')

  return Response.json(inserted ?? [])
}
