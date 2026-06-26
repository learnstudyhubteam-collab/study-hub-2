'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CalendarClock, Plus, Sparkles, X, ChevronDown, Trash2 } from 'lucide-react'
import type { StudySchedule } from '@/types'

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<StudySchedule[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [subjectsInput, setSubjectsInput] = useState('')
  const [examDate, setExamDate] = useState('')
  const [hoursPerDay, setHoursPerDay] = useState('2')
  const [title, setTitle] = useState('')
  const [extraContext, setExtraContext] = useState('')

  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('study_schedules').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    setSchedules((data ?? []) as StudySchedule[])
    setLoading(false)
  }

  async function generateSchedule(e: React.FormEvent) {
    e.preventDefault()
    setGenerating(true); setError(null)
    try {
      const res = await fetch('/api/schedule/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjects: subjectsInput.split(',').map((s) => s.trim()).filter(Boolean),
          examDate: examDate || null,
          hoursPerDay: parseFloat(hoursPerDay) || 2,
          title: title || 'My Study Schedule',
          extraContext,
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      const schedule = await res.json() as StudySchedule
      setSchedules((p) => [schedule, ...p])
      setSubjectsInput(''); setExamDate(''); setHoursPerDay('2'); setTitle(''); setExtraContext('')
      setShowCreate(false); setExpanded(schedule.id)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to generate schedule')
    } finally {
      setGenerating(false)
    }
  }

  async function deleteSchedule(id: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('study_schedules').delete().eq('id', id).eq('user_id', user.id)
    setSchedules((p) => p.filter((s) => s.id !== id))
    if (expanded === id) setExpanded(null)
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <CalendarClock className="w-6 h-6 text-electric" /> Study Schedule
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">AI-generated personalized study plans</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-electric text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Generate
        </button>
      </div>

      {/* Generate modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="glass rounded-3xl p-7 w-full max-w-md shadow-glass-hover animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-electric" /> Generate study schedule
              </h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={generateSchedule} className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Schedule title</label>
                <input placeholder="e.g. Finals Week Schedule" value={title} onChange={(e) => setTitle(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Subjects (comma-separated)</label>
                <input required placeholder="Math, Physics, History" value={subjectsInput} onChange={(e) => setSubjectsInput(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Exam / goal date</label>
                  <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="input-glass w-full px-3 py-2 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Hours per day</label>
                  <input type="number" min="0.5" max="12" step="0.5" value={hoursPerDay} onChange={(e) => setHoursPerDay(e.target.value)} className="input-glass w-full px-3 py-2 rounded-xl text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Extra context (optional)</label>
                <textarea placeholder="e.g. I'm weakest in calculus, strong in bio. Include breaks." value={extraContext} onChange={(e) => setExtraContext(e.target.value)} rows={2} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm resize-none" />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={generating || !subjectsInput.trim()} className="btn-electric text-white w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2">
                {generating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating…
                  </>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Generate schedule</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Schedules */}
      {loading ? (
        <div className="space-y-3">{[1,2].map((i) => <div key={i} className="glass rounded-2xl h-20 animate-pulse" />)}</div>
      ) : schedules.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center mx-auto mb-3">
            <CalendarClock className="w-7 h-7 text-electric" />
          </div>
          <p className="text-gray-500 text-sm mb-3">Generate your first AI study schedule.</p>
          <button onClick={() => setShowCreate(true)} className="btn-electric text-white text-sm font-semibold px-5 py-2.5 rounded-xl inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Generate schedule
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {schedules.map((s) => (
            <div key={s.id} className="glass-card overflow-hidden">
              <div
                className="p-4 flex items-center gap-3 cursor-pointer hover:bg-electric/5 transition-colors"
                onClick={() => setExpanded(expanded === s.id ? null : s.id)}
              >
                <CalendarClock className="w-5 h-5 text-electric shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{s.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{new Date(s.created_at).toLocaleDateString()}</span>
                    {s.subjects?.length > 0 && (
                      <span className="text-xs text-electric">{s.subjects.join(', ')}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={(e) => { e.stopPropagation(); deleteSchedule(s.id) }} className="text-gray-300 hover:text-red-400 transition-colors p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expanded === s.id ? 'rotate-180' : ''}`} />
                </div>
              </div>
              {expanded === s.id && (
                <div className="px-4 pb-5 border-t border-white/40">
                  <div className="pt-4 prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">{s.content}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
