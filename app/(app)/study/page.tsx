'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import ModeSelector from '@/components/chat/ModeSelector'
import { BookOpen, Tag, Zap } from 'lucide-react'
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
    <div className="max-w-xl mx-auto animate-fade-up">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-electric-gradient flex items-center justify-center shadow-electric">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Start a study session</h1>
            <p className="text-gray-500 text-sm">Enter your topic and choose how you want to study.</p>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-7 shadow-glass">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Zap className="w-3.5 h-3.5 text-electric" />
              <label className="text-sm font-semibold text-gray-700">What do you want to study?</label>
            </div>
            <input
              placeholder="e.g. Photosynthesis, The French Revolution, Quadratic equations…"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="input-glass w-full px-4 py-3 rounded-xl text-sm text-gray-900 placeholder:text-gray-400/80"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Tag className="w-3.5 h-3.5 text-gray-400" />
              <label className="text-sm font-semibold text-gray-700">Subject <span className="font-normal text-gray-400">(optional)</span></label>
            </div>
            <input
              placeholder="e.g. Biology, History, Math"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="input-glass w-full px-4 py-3 rounded-xl text-sm text-gray-900 placeholder:text-gray-400/80"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Study mode</label>
            <ModeSelector value={mode} onChange={setMode} />
          </div>

          {error && (
            <p className="text-sm text-red-600 glass rounded-xl px-3 py-2 border border-red-200/50">
              {error}
            </p>
          )}

          <Button type="submit" loading={loading} size="lg" className="w-full" disabled={!topic.trim()}>
            <Zap className="w-4 h-4" fill="white" />
            Start session
          </Button>
        </form>
      </div>
    </div>
  )
}
