'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { FileText, Sparkles, X, ChevronDown, Trash2, BookOpen } from 'lucide-react'
import type { StudyGuide } from '@/types'

export default function GuidesPage() {
  const [guides, setGuides] = useState<StudyGuide[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [topic, setTopic] = useState('')
  const [subject, setSubject] = useState('')
  const [gradeLevel, setGradeLevel] = useState('')
  const [extraContext, setExtraContext] = useState('')

  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('study_guides').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    setGuides((data ?? []) as StudyGuide[])
    setLoading(false)
  }

  async function generateGuide(e: React.FormEvent) {
    e.preventDefault()
    setGenerating(true); setError(null)
    try {
      const res = await fetch('/api/guides/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, subject: subject || null, gradeLevel: gradeLevel || null, extraContext }),
      })
      if (!res.ok) throw new Error(await res.text())
      const guide = await res.json() as StudyGuide
      setGuides((p) => [guide, ...p])
      setTopic(''); setSubject(''); setGradeLevel(''); setExtraContext('')
      setShowCreate(false); setExpanded(guide.id)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to generate guide')
    } finally {
      setGenerating(false)
    }
  }

  async function deleteGuide(id: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('study_guides').delete().eq('id', id).eq('user_id', user.id)
    setGuides((p) => p.filter((g) => g.id !== id))
    if (expanded === id) setExpanded(null)
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-electric" /> Study Guides
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">AI-generated comprehensive study guides</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-electric text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Generate guide
        </button>
      </div>

      {/* Generate modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="glass rounded-3xl p-7 w-full max-w-md shadow-glass-hover animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-electric" /> Generate study guide
              </h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={generateGuide} className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Topic</label>
                <input required placeholder="e.g. Photosynthesis, The French Revolution, Calculus derivatives" value={topic} onChange={(e) => setTopic(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Subject</label>
                  <input placeholder="Biology, Math…" value={subject} onChange={(e) => setSubject(e.target.value)} className="input-glass w-full px-3 py-2 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Grade level</label>
                  <input placeholder="High school, AP, College" value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} className="input-glass w-full px-3 py-2 rounded-xl text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Extra context (optional)</label>
                <textarea placeholder="e.g. Focus on light-dependent reactions. Include diagrams as text art." value={extraContext} onChange={(e) => setExtraContext(e.target.value)} rows={2} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm resize-none" />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={generating || !topic.trim()} className="btn-electric text-white w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2">
                {generating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating…
                  </>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Generate guide</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Guides list */}
      {loading ? (
        <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="glass rounded-2xl h-20 animate-pulse" />)}</div>
      ) : guides.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-7 h-7 text-electric" />
          </div>
          <p className="text-gray-500 text-sm mb-3">Generate a comprehensive AI study guide for any topic.</p>
          <button onClick={() => setShowCreate(true)} className="btn-electric text-white text-sm font-semibold px-5 py-2.5 rounded-xl inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Generate your first guide
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {guides.map((g) => (
            <div key={g.id} className="glass-card overflow-hidden">
              <div
                className="p-4 flex items-center gap-3 cursor-pointer hover:bg-electric/5 transition-colors"
                onClick={() => setExpanded(expanded === g.id ? null : g.id)}
              >
                <FileText className="w-5 h-5 text-electric shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{g.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{new Date(g.created_at).toLocaleDateString()}</span>
                    {g.subject && <span className="text-xs text-electric">{g.subject}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={(e) => { e.stopPropagation(); deleteGuide(g.id) }} className="text-gray-300 hover:text-red-400 transition-colors p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expanded === g.id ? 'rotate-180' : ''}`} />
                </div>
              </div>
              {expanded === g.id && (
                <div className="px-5 pb-6 border-t border-white/40">
                  <div className="pt-4 whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">{g.content}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
