'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Calculator, Plus, X, TrendingUp } from 'lucide-react'
import type { GradeEntry } from '@/types'
import { toast } from '@/lib/toast'

function getLetterGrade(pct: number) {
  if (pct >= 90) return { letter: 'A', color: 'text-emerald-600' }
  if (pct >= 80) return { letter: 'B', color: 'text-blue-600' }
  if (pct >= 70) return { letter: 'C', color: 'text-amber-600' }
  if (pct >= 60) return { letter: 'D', color: 'text-orange-600' }
  return { letter: 'F', color: 'text-red-600' }
}

function getGPA(pct: number) {
  if (pct >= 93) return 4.0
  if (pct >= 90) return 3.7
  if (pct >= 87) return 3.3
  if (pct >= 83) return 3.0
  if (pct >= 80) return 2.7
  if (pct >= 77) return 2.3
  if (pct >= 73) return 2.0
  if (pct >= 70) return 1.7
  if (pct >= 67) return 1.3
  if (pct >= 63) return 1.0
  if (pct >= 60) return 0.7
  return 0.0
}

export default function GradesPage() {
  const [entries, setEntries] = useState<GradeEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filterSubject, setFilterSubject] = useState<string>('all')

  const [subject, setSubject] = useState('')
  const [assignmentName, setAssignmentName] = useState('')
  const [score, setScore] = useState('')
  const [maxScore, setMaxScore] = useState('100')
  const [weight, setWeight] = useState('1')
  const [category, setCategory] = useState('')

  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('grade_entries').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    setEntries((data ?? []) as GradeEntry[])
    setLoading(false)
  }

  async function addEntry(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(false); return }
    const { data, error: err } = await supabase.from('grade_entries').insert({
      user_id: user.id, subject, assignment_name: assignmentName,
      score: parseFloat(score), max_score: parseFloat(maxScore),
      weight: parseFloat(weight) || 1, category: category || null,
    }).select('*').single()
    if (err) { setError(err.message); setSaving(false); return }
    setEntries((p) => [data as GradeEntry, ...p])
    setAssignmentName(''); setScore(''); setMaxScore('100'); setWeight('1'); setCategory('')
    setShowCreate(false); setSaving(false)
    toast('Grade entry added!', 'success')
  }

  async function deleteEntry(id: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('grade_entries').delete().eq('id', id).eq('user_id', user.id)
    setEntries((p) => p.filter((e) => e.id !== id))
    toast('Entry removed', 'info')
  }

  const subjects = [...new Set(entries.map((e) => e.subject))]
  const filtered = filterSubject === 'all' ? entries : entries.filter((e) => e.subject === filterSubject)

  const weightedAvg = filtered.length > 0
    ? filtered.reduce((sum, e) => sum + (e.score / e.max_score) * 100 * e.weight, 0) / filtered.reduce((sum, e) => sum + e.weight, 0)
    : null

  const letterGrade = weightedAvg !== null ? getLetterGrade(weightedAvg) : null
  const gpa = weightedAvg !== null ? getGPA(weightedAvg) : null

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-electric" /> Grades
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Track your grades and GPA</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-electric text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add grade
        </button>
      </div>

      {/* Average card */}
      {weightedAvg !== null && (
        <div className="glass-blue rounded-2xl p-5 flex items-center gap-6">
          <div className="text-center">
            <p className={`text-5xl font-black ${letterGrade?.color}`}>{letterGrade?.letter}</p>
            <p className="text-xs text-gray-400 mt-1">Letter</p>
          </div>
          <div className="w-px h-12 bg-white/40" />
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">{weightedAvg.toFixed(1)}%</p>
            <p className="text-xs text-gray-400 mt-1">Weighted avg</p>
          </div>
          <div className="w-px h-12 bg-white/40" />
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">{gpa?.toFixed(1)}</p>
            <p className="text-xs text-gray-400 mt-1">GPA</p>
          </div>
          <div className="ml-auto">
            <TrendingUp className="w-8 h-8 text-electric/30" />
          </div>
        </div>
      )}

      {/* Subject filter */}
      {subjects.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilterSubject('all')} className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${filterSubject === 'all' ? 'bg-electric text-white shadow-electric' : 'glass text-gray-500 hover:text-gray-900'}`}>
            All subjects
          </button>
          {subjects.map((s) => (
            <button key={s} onClick={() => setFilterSubject(s)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${filterSubject === s ? 'bg-electric text-white shadow-electric' : 'glass text-gray-500 hover:text-gray-900'}`}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Add modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="glass rounded-3xl p-7 w-full max-w-md shadow-glass-hover animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">Add grade entry</h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={addEntry} className="space-y-3">
              <input required placeholder="Subject (e.g. Math)" value={subject} onChange={(e) => setSubject(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              <input required placeholder="Assignment name" value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Score</label>
                  <input required type="number" min="0" step="0.1" placeholder="85" value={score} onChange={(e) => setScore(e.target.value)} className="input-glass w-full px-3 py-2 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Max score</label>
                  <input required type="number" min="1" step="0.1" value={maxScore} onChange={(e) => setMaxScore(e.target.value)} className="input-glass w-full px-3 py-2 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Weight</label>
                  <input type="number" min="0.1" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} className="input-glass w-full px-3 py-2 rounded-xl text-sm" />
                </div>
              </div>
              <input placeholder="Category (e.g. Homework, Test)" value={category} onChange={(e) => setCategory(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={saving || !subject.trim() || !assignmentName.trim() || !score} className="btn-electric text-white w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60">
                {saving ? 'Saving…' : 'Add grade'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Grades list */}
      {loading ? (
        <div className="space-y-2">{[1,2,3].map((i) => <div key={i} className="glass rounded-2xl h-16 animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center mx-auto mb-3">
            <Calculator className="w-7 h-7 text-electric" />
          </div>
          <p className="text-gray-500 text-sm">No grades yet. Add your first entry.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((e) => {
            const pct = (e.score / e.max_score) * 100
            const { letter, color } = getLetterGrade(pct)
            return (
              <div key={e.id} className="glass-card p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${color} bg-current/10`} style={{ backgroundColor: 'transparent' }}>
                  <span className={color}>{letter}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{e.assignment_name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-electric">{e.subject}</span>
                    {e.category && <span className="text-xs text-gray-400">{e.category}</span>}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">{e.score}/{e.max_score}</p>
                  <p className="text-xs text-gray-400">{pct.toFixed(1)}%{e.weight !== 1 && ` · ×${e.weight}`}</p>
                </div>
                <button onClick={() => deleteEntry(e.id)} className="text-gray-300 hover:text-red-400 transition-colors ml-1">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
