'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Layers, Plus, X, Zap, RotateCcw, Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-10 h-10 rounded-2xl bg-electric-gradient animate-pulse shadow-electric" />
      </div>
    )
  }
  if (!deck) return null

  /* ── Quiz Mode ─────────────────────────────────────── */
  if (viewMode === 'quiz' && cards.length > 0) {
    const card = cards[quizIndex]
    const progress = ((quizIndex) / cards.length) * 100

    return (
      <div className="max-w-xl mx-auto space-y-6 animate-fade-up">
        {/* Quiz header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => { setViewMode('list'); setQuizIndex(0); setFlipped(false) }}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Exit quiz
          </button>
          <span className="text-sm font-semibold text-gray-500">
            {quizIndex + 1} <span className="text-gray-300">/</span> {cards.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-electric-gradient rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Flip card */}
        <div className="perspective-1000">
          <div
            className={`relative transition-all duration-500 cursor-pointer ${flipped ? 'rotate-y-180' : ''}`}
            style={{ transformStyle: 'preserve-3d', minHeight: '220px' }}
            onClick={() => setFlipped(!flipped)}
          >
            {/* Front */}
            <div className="absolute inset-0 glass rounded-3xl p-8 flex items-center justify-center backface-hidden shadow-glass">
              <div className="text-center">
                <p className="text-xs font-bold text-electric uppercase tracking-widest mb-4">Question</p>
                <p className="text-lg font-semibold text-gray-900">{card.front}</p>
                <p className="text-xs text-gray-400 mt-6 flex items-center justify-center gap-1">
                  <RotateCcw className="w-3 h-3" /> Tap to reveal answer
                </p>
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 glass-blue rounded-3xl p-8 flex items-center justify-center backface-hidden rotate-y-180 shadow-glass-blue"
            >
              <div className="text-center">
                <p className="text-xs font-bold text-electric uppercase tracking-widest mb-4">Answer</p>
                <p className="text-lg font-semibold text-gray-900">{card.back}</p>
              </div>
            </div>
          </div>
        </div>

        {flipped ? (
          <div className="flex gap-3">
            <button
              onClick={() => markResult(false)}
              className="flex-1 py-3 rounded-2xl border-2 border-red-200 bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-100 transition-colors"
            >
              ✗ Missed it
            </button>
            <button
              onClick={() => markResult(true)}
              className="flex-1 btn-electric text-white py-3 rounded-2xl font-semibold text-sm"
            >
              ✓ Got it
            </button>
          </div>
        ) : (
          <button
            onClick={() => setFlipped(true)}
            className="w-full btn-electric text-white py-3.5 rounded-2xl font-semibold text-sm"
          >
            Reveal answer
          </button>
        )}
      </div>
    )
  }

  /* ── List Mode ─────────────────────────────────────── */
  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-gray-900">{deck.title}</h1>
            {deck.subject && (
              <span className="text-xs font-semibold text-electric glass-blue px-2 py-0.5 rounded-lg">
                {deck.subject}
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm">{cards.length} card{cards.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setAddingCard(!addingCard)}
            className="flex items-center gap-1.5"
          >
            {addingCard ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {addingCard ? 'Cancel' : 'Add card'}
          </Button>
          {cards.length > 0 && (
            <Button
              onClick={() => { setViewMode('quiz'); setQuizIndex(0); setFlipped(false) }}
              className="flex items-center gap-1.5"
            >
              <ChevronRight className="w-4 h-4" />
              Study
            </Button>
          )}
        </div>
      </div>

      {/* Add card form */}
      {addingCard && (
        <div className="glass rounded-2xl p-5 border border-electric/15 animate-fade-up">
          <h3 className="font-bold text-gray-900 mb-4">Add a card</h3>
          <form onSubmit={addCard} className="space-y-4">
            <Input label="Front (question)" value={front} onChange={(e) => setFront(e.target.value)} required />
            <Input label="Back (answer)" value={back} onChange={(e) => setBack(e.target.value)} required />
            <div className="flex gap-2">
              <Button type="submit" disabled={!front.trim() || !back.trim()}>
                <Plus className="w-4 h-4" />
                Add card
              </Button>
              <Button type="button" variant="secondary" onClick={() => setAddingCard(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {/* AI Generate */}
      <div className="glass-blue rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-electric" />
          <p className="font-semibold text-gray-900 text-sm">Generate cards with AI</p>
        </div>
        <form onSubmit={generateCards} className="flex gap-2.5">
          <input
            placeholder="e.g. The water cycle, Spanish verbs, WWII dates"
            value={genTopic}
            onChange={(e) => setGenTopic(e.target.value)}
            className="flex-1 input-glass px-4 py-2.5 rounded-xl text-sm placeholder:text-gray-400/80"
          />
          <Button type="submit" loading={generating} disabled={!genTopic.trim()}>
            <Zap className="w-4 h-4" fill="white" />
            Generate
          </Button>
        </form>
      </div>

      {/* Cards grid */}
      {cards.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-3">
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="glass rounded-2xl p-5 group hover:border-electric/20 transition-all duration-200 border border-white/85"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <p className="text-sm font-semibold text-gray-900 mb-2">{card.front}</p>
              <div className="border-t border-gray-100/80 pt-2">
                <p className="text-sm text-gray-500">{card.back}</p>
              </div>
              {card.times_seen > 0 && (
                <div className="flex items-center gap-1.5 mt-3">
                  <Check className="w-3 h-3 text-electric" />
                  <p className="text-xs text-gray-400">
                    {card.times_correct}/{card.times_seen} correct
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-3">
            <Layers className="w-7 h-7 text-violet-500" />
          </div>
          <p className="text-sm text-gray-500">No cards yet. Add some manually or generate them with AI above.</p>
        </div>
      )}
    </div>
  )
}
