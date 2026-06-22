'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Input from '@/components/ui/input'
import type { FlashcardDeck } from '@/types'

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
    }
    setCreating(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Flashcard decks</h1>
          <p className="text-gray-500 mt-1">Create decks and study with spaced repetition.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New deck'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <form onSubmit={createDeck} className="space-y-4">
            <h3 className="font-semibold text-gray-900">Create a new deck</h3>
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
            <Button type="submit" loading={creating}>
              Create deck
            </Button>
          </form>
        </Card>
      )}

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : decks.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map((deck) => (
            <Link key={deck.id} href={`/flashcards/${deck.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="text-2xl mb-3">🃏</div>
                <h3 className="font-semibold text-gray-900 truncate">{deck.title}</h3>
                {deck.subject && (
                  <p className="text-sm text-brand-600 mt-1">{deck.subject}</p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  Updated {new Date(deck.updated_at).toLocaleDateString()}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🃏</p>
          <p className="font-medium text-gray-600">No decks yet</p>
          <p className="text-sm mt-1">Create your first deck to start reviewing.</p>
        </div>
      )}
    </div>
  )
}
