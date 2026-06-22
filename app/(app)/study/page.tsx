'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import ModeSelector from '@/components/chat/ModeSelector'
import type { StudyMode } from '@/types'

export default function NewStudySessionPage() {
  const [topic, setTopic] = useState('')
  const [subject, setSubject] = useState('')
  const [mode, setMode] = useState<StudyMode>('direct')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!topic.trim()) return
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data, error } = await supabase
      .from('study_sessions')
      .insert({
        user_id: user.id,
        topic: topic.trim(),
        subject: subject.trim() || null,
        mode,
      })
      .select('id')
      .single()

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push(`/study/${data.id}`)
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Start a study session</h1>
      <p className="text-gray-500 mb-8">Enter your topic and choose how you want to study.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="What do you want to study?"
          placeholder="e.g. Photosynthesis, The French Revolution, Quadratic equations…"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
        <Input
          label="Subject (optional)"
          placeholder="e.g. Biology, History, Math"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Study mode</label>
          <ModeSelector value={mode} onChange={setMode} />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" loading={loading} size="lg" className="w-full">
          Start session →
        </Button>
      </form>
    </div>
  )
}
