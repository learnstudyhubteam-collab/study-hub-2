'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Layers, Plus, X, Calendar } from 'lucide-react'
import type { FlashcardDeck } from '@/types'
import { toast } from '@/lib/toast'

export default function FlashcardsPage() {
  const [decks, setDecks] = useState<FlashcardDeck[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')

  const supabase = createClient()

  useEffect(() => {
    loadDecks()
  }, [])

  async function loadDecks() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('flashcard_decks')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    setDecks((data ?? []) as FlashcardDeck[])
    setLoading(false)
  }

  async function createDeck(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setCreating(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('flashcard_decks')
      .insert({ user_id: user.id, title: title.trim(), subject: subject.trim() || null })
      .select('*')
      .single()

    if (data) {
      setDecks((prev) => [data as FlashcardDeck, ...prev])
      setTitle('')
      setSubject('')
      setShowForm(false)
      toast('Deck created!', 'success')
    }
    setCreating(false)
  }

  const subjectColors: Record<string, string> = {
    math: 'text-blue-600 bg-blue-50',
    science: 'text-emerald-600 bg-emerald-50',
    history: 'text-amber-600 bg-amber-50',
    languages: 'text-violet-600 bg-violet-50',
    biology: 'text-emerald-600 bg-emerald-50',
    physics: 'text-blue-600 bg-blue-50',
    chemistry: 'text-rose-600 bg-rose-50',
  }

  function getSubjectColor(subject: string | null) {
    if (!subject) return 'text-gray-500 bg-gray-100'
    const key = subject.toLowerCase()
    return subjectColors[key] ?? 'text-electric bg-electric/10'
  }

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-violet-500/10 flex items-center justify-center">
            <Layers className="w-5 h-5 text-violet-500" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Flashcard decks</h1>
            <p className="text-gray-500 text-sm">Create decks and study with spaced repetition.</p>
          </div>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? 'secondary' : 'primary'}
          className="flex items-center gap-1.5"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'New deck'}
        </Button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="glass rounded-2xl p-6 animate-fade-up border border-electric/15">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-electric" />
            Create a new deck
          </h3>
          <form onSubmit={createDeck} className="space-y-4">
            <Input
              label="Deck title"
              placeholder="e.g. Spanish Vocabulary, Cell Biology…"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              label="Subject (optional)"
              placeholder="e.g. Languages, Biology"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Button type="submit" loading={creating} disabled={!title.trim()}>
              Create deck
            </Button>
          </form>
        </div>
      )}

      {/* Decks grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 glass rounded-2xl animate-pulse opacity-60" />
          ))}
        </div>
      ) : decks.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map((deck, i) => (
            <Link key={deck.id} href={`/flashcards/${deck.id}`}>
              <div
                className="glass-card p-5 h-full group"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Layers className="w-5 h-5 text-violet-500" />
                </div>
                <h3 className="font-bold text-gray-900 truncate mb-1">{deck.title}</h3>
                {deck.subject && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${getSubjectColor(deck.subject)}`}>
                    {deck.subject}
                  </span>
                )}
                <div className="flex items-center gap-1 mt-3">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <p className="text-xs text-gray-400">
                    {new Date(deck.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-3xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
            <Layers className="w-8 h-8 text-violet-500" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">No decks yet</h3>
          <p className="text-sm text-gray-500 mb-4">Create your first deck to start reviewing.</p>
          <Button onClick={() => setShowForm(true)} className="inline-flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            Create a deck
          </Button>
        </div>
      )}
    </div>
  )
}
