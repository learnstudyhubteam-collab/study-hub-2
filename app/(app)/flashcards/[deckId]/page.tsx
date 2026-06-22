'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Input from '@/components/ui/input'
import type { FlashcardDeck, FlashcardCard } from '@/types'

interface PageProps {
  params: Promise<{ deckId: string }>
}

type ViewMode = 'list' | 'quiz'

export default function DeckPage({ params }: PageProps) {
  const { deckId } = use(params)
  const [deck, setDeck] = useState<FlashcardDeck | null>(null)
  const [cards, setCards] = useState<FlashcardCard[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [addingCard, setAddingCard] = useState(false)
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [generating, setGenerating] = useState(false)
  const [genTopic, setGenTopic] = useState('')
  const [flipped, setFlipped] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadDeck()
  }, [deckId])

  async function loadDeck() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [{ data: deckData }, { data: cardsData }] = await Promise.all([
      supabase.from('flashcard_decks').select('*').eq('id', deckId).eq('user_id', user.id).single(),
      supabase.from('flashcard_cards').select('*').eq('deck_id', deckId).order('created_at'),
    ])

    if (!deckData) { router.push('/flashcards'); return }
    setDeck(deckData as FlashcardDeck)
    setCards((cardsData ?? []) as FlashcardCard[])
    setLoading(false)
  }

  async function addCard(e: React.FormEvent) {
    e.preventDefault()
    if (!front.trim() || !back.trim()) return
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase.from('flashcard_cards')
      .insert({ deck_id: deckId, user_id: user.id, front: front.trim(), back: back.trim() })
      .select('*').single()
    if (data) {
      setCards((prev) => [...prev, data as FlashcardCard])
      setFront(''); setBack(''); setAddingCard(false)
    }
  }

  async function generateCards(e: React.FormEvent) {
    e.preventDefault()
    if (!genTopic.trim()) return
    setGenerating(true)
    try {
      const res = await fetch('/api/flashcards/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: genTopic, deckId }),
      })
      const newCards = await res.json()
      if (Array.isArray(newCards)) {
        setCards((prev) => [...prev, ...newCards])
        setGenTopic('')
      }
    } finally {
      setGenerating(false)
    }
  }

  async function markResult(correct: boolean) {
    const card = cards[quizIndex]
    await supabase.from('flashcard_cards').update({
      times_seen: card.times_seen + 1,
      times_correct: correct ? card.times_correct + 1 : card.times_correct,
      last_reviewed_at: new Date().toISOString(),
    }).eq('id', card.id)
    setFlipped(false)
    if (quizIndex + 1 < cards.length) {
      setQuizIndex((i) => i + 1)
    } else {
      setViewMode('list')
      setQuizIndex(0)
      loadDeck()
    }
  }

  if (loading) return <div className="text-center py-16 text-gray-400">Loading…</div>
  if (!deck) return null

  if (viewMode === 'quiz' && cards.length > 0) {
    const card = cards[quizIndex]
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">{deck.title} — Quiz</h2>
          <span className="text-sm text-gray-400">{quizIndex + 1} / {cards.length}</span>
        </div>
        <div
          className="min-h-[200px] bg-white border border-gray-200 rounded-2xl p-8 flex items-center justify-center cursor-pointer shadow-sm hover:shadow transition-shadow"
          onClick={() => setFlipped(!flipped)}
        >
          <p className="text-lg text-center text-gray-800">
            {flipped ? card.back : card.front}
          </p>
        </div>
        <p className="text-center text-sm text-gray-400">
          {flipped ? 'Rate yourself' : 'Tap to reveal answer'}
        </p>
        {flipped && (
          <div className="flex gap-3">
            <Button variant="danger" className="flex-1" onClick={() => markResult(false)}>
              ✗ Missed it
            </Button>
            <Button variant="primary" className="flex-1" onClick={() => markResult(true)}>
              ✓ Got it
            </Button>
          </div>
        )}
        {!flipped && (
          <Button variant="secondary" className="w-full" onClick={() => { setViewMode('list'); setQuizIndex(0) }}>
            Exit quiz
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{deck.title}</h1>
          {deck.subject && <p className="text-brand-600 text-sm mt-1">{deck.subject}</p>}
          <p className="text-gray-400 text-sm mt-1">{cards.length} cards</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setAddingCard(!addingCard)}>
            + Add card
          </Button>
          {cards.length > 0 && (
            <Button onClick={() => { setViewMode('quiz'); setQuizIndex(0); setFlipped(false) }}>
              Study ▶
            </Button>
          )}
        </div>
      </div>

      {/* Add card form */}
      {addingCard && (
        <Card>
          <form onSubmit={addCard} className="space-y-4">
            <h3 className="font-semibold text-gray-900">Add a card</h3>
            <Input label="Front (question)" value={front} onChange={(e) => setFront(e.target.value)} required />
            <Input label="Back (answer)" value={back} onChange={(e) => setBack(e.target.value)} required />
            <div className="flex gap-2">
              <Button type="submit">Add</Button>
              <Button type="button" variant="secondary" onClick={() => setAddingCard(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

      {/* AI generate */}
      <Card>
        <form onSubmit={generateCards} className="flex gap-3 items-end">
          <div className="flex-1">
            <Input
              label="Generate cards with AI"
              placeholder="e.g. The water cycle, Spanish verbs, WWII dates"
              value={genTopic}
              onChange={(e) => setGenTopic(e.target.value)}
            />
          </div>
          <Button type="submit" loading={generating} disabled={!genTopic.trim()}>
            Generate
          </Button>
        </form>
      </Card>

      {/* Cards list */}
      {cards.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-3">
          {cards.map((card) => (
            <Card key={card.id} className="!p-4">
              <p className="text-sm font-medium text-gray-900 mb-2">{card.front}</p>
              <p className="text-sm text-gray-500 border-t border-gray-100 pt-2">{card.back}</p>
              {card.times_seen > 0 && (
                <p className="text-xs text-gray-400 mt-2">
                  {card.times_correct}/{card.times_seen} correct
                </p>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-3xl mb-2">📝</p>
          <p className="text-sm">No cards yet. Add some manually or generate them with AI.</p>
        </div>
      )}
    </div>
  )
}
