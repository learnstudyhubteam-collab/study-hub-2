'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from '@/lib/toast'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Layers, Plus, X, Zap, RotateCcw, Check, ChevronLeft, ChevronRight, Sparkles, RefreshCw } from 'lucide-react'
import type { FlashcardDeck, FlashcardCard } from '@/types'

function FlipCard({ card }: { card: FlashcardCard }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div
      className="perspective-1000 cursor-pointer group"
      style={{ minHeight: '180px' }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 ${flipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d', minHeight: '180px' }}
      >
        {/* Front */}
        <div className="absolute inset-0 glass rounded-2xl p-5 flex flex-col justify-between backface-hidden shadow-glass hover:shadow-glass-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-electric uppercase tracking-widest">Question</span>
            <RefreshCw className="w-3.5 h-3.5 text-gray-300 group-hover:text-electric transition-colors" />
          </div>
          <p className="text-sm font-semibold text-gray-900 leading-relaxed flex-1 flex items-center">
            {card.front}
          </p>
          <p className="text-[10px] text-gray-400 mt-3">Tap to flip</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 glass-blue rounded-2xl p-5 flex flex-col justify-between backface-hidden rotate-y-180 shadow-glass-blue">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-electric uppercase tracking-widest">Answer</span>
            <RefreshCw className="w-3.5 h-3.5 text-electric/50" />
          </div>
          <p className="text-sm font-semibold text-gray-800 leading-relaxed flex-1 flex items-center">
            {card.back}
          </p>
          {card.times_seen > 0 && (
            <div className="flex items-center gap-1.5 mt-3">
              <Check className="w-3 h-3 text-electric" />
              <p className="text-[10px] text-gray-500">{card.times_correct}/{card.times_seen} correct</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface PageProps {
  params: Promise<{ deckId: string }>
}

type ViewMode = 'list' | 'quiz' | 'results'

interface QuizResult { card: FlashcardCard; correct: boolean }

export default function DeckPage({ params }: PageProps) {
  const { deckId } = use(params)
  const [deck, setDeck] = useState<FlashcardDeck | null>(null)
  const [cards, setCards] = useState<FlashcardCard[]>([])
  const [quizCards, setQuizCards] = useState<FlashcardCard[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [addingCard, setAddingCard] = useState(false)
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [generating, setGenerating] = useState(false)
  const [genTopic, setGenTopic] = useState('')
  const [flipped, setFlipped] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
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
      } else if (res.status === 403) {
        toast(newCards?.error ?? 'AI generation requires a Scholar or Sage plan.', 'error')
      } else if (newCards?.error) {
        toast(newCards.error, 'error')
      }
    } finally {
      setGenerating(false)
    }
  }

  function startQuiz(subset?: FlashcardCard[]) {
    const deck = subset ?? cards
    setQuizCards(deck)
    setQuizResults([])
    setQuizIndex(0)
    setFlipped(false)
    setViewMode('quiz')
  }

  async function markResult(correct: boolean) {
    const card = quizCards[quizIndex]
    await supabase.from('flashcard_cards').update({
      times_seen: card.times_seen + 1,
      times_correct: correct ? card.times_correct + 1 : card.times_correct,
      last_reviewed_at: new Date().toISOString(),
    }).eq('id', card.id)
    const newResults = [...quizResults, { card, correct }]
    setQuizResults(newResults)
    setFlipped(false)
    if (quizIndex + 1 < quizCards.length) {
      setQuizIndex((i) => i + 1)
    } else {
      setViewMode('results')
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

  /* ── Results Screen ────────────────────────────────── */
  if (viewMode === 'results') {
    const correct = quizResults.filter((r) => r.correct).length
    const total = quizResults.length
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0
    const missed = quizResults.filter((r) => !r.correct).map((r) => r.card)
    const grade = pct >= 90 ? { label: 'Excellent! 🏆', color: 'text-emerald-600' }
      : pct >= 70 ? { label: 'Good work! 👍', color: 'text-blue-600' }
      : pct >= 50 ? { label: 'Keep practicing', color: 'text-amber-600' }
      : { label: 'Need more review', color: 'text-rose-600' }

    return (
      <div className="max-w-xl mx-auto space-y-5 animate-fade-up">
        <div className="glass-card p-8 text-center">
          {/* Circle score */}
          <div className="relative w-28 h-28 mx-auto mb-5">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#F3F4F6" strokeWidth="10" />
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke={pct >= 70 ? '#0066FF' : pct >= 50 ? '#F59E0B' : '#EF4444'}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - pct / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-extrabold text-gray-900">{pct}%</span>
            </div>
          </div>
          <h2 className={`text-xl font-bold mb-1 ${grade.color}`}>{grade.label}</h2>
          <p className="text-gray-500 text-sm">{correct} of {total} cards correct</p>
        </div>

        {/* Missed cards */}
        {missed.length > 0 && (
          <div className="glass-card p-5">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Cards to review ({missed.length})</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {missed.map((c) => (
                <div key={c.id} className="glass rounded-xl px-3 py-2">
                  <p className="text-xs font-semibold text-gray-700 mb-0.5">{c.front}</p>
                  <p className="text-xs text-gray-500">{c.back}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {missed.length > 0 && (
            <button
              onClick={() => startQuiz(missed)}
              className="flex-1 glass text-gray-700 font-semibold py-3 rounded-2xl text-sm hover:bg-electric/5 transition-colors"
            >
              Retry missed ({missed.length})
            </button>
          )}
          <button
            onClick={() => startQuiz()}
            className="flex-1 btn-electric text-white py-3 rounded-2xl font-semibold text-sm"
          >
            Study again
          </button>
        </div>
        <button
          onClick={() => setViewMode('list')}
          className="w-full text-sm text-gray-400 hover:text-gray-700 transition-colors py-1"
        >
          ← Back to deck
        </button>
      </div>
    )
  }

  /* ── Quiz Mode ─────────────────────────────────────── */
  if (viewMode === 'quiz' && quizCards.length > 0) {
    const card = quizCards[quizIndex]
    const progress = (quizIndex / quizCards.length) * 100

    return (
      <div className="max-w-xl mx-auto space-y-6 animate-fade-up">
        {/* Quiz header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => { setViewMode('list'); setQuizIndex(0); setFlipped(false); setQuizResults([]) }}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Exit quiz
          </button>
          <span className="text-sm font-semibold text-gray-500">
            {quizIndex + 1} <span className="text-gray-300">/</span> {quizCards.length}
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
              onClick={() => startQuiz()}
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

      {/* Cards grid — real flip cards */}
      {cards.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <FlipCard key={card.id} card={card} />
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
