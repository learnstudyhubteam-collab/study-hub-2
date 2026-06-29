'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Calculator, Plus, X, TrendingUp, BarChart2, Link2, ArrowRight } from 'lucide-react'
import type { GradeEntry } from '@/types'
import { toast } from '@/lib/toast'
import Link from 'next/link'

function getLetterGrade(pct: number) {
  if (pct >= 90) return { letter: 'A', color: 'text-emerald-600', bg: 'bg-emerald-500', badgeBg: 'bg-emerald-100', barColor: 'bg-gradient-to-r from-emerald-400 to-emerald-500' }
  if (pct >= 80) return { letter: 'B', color: 'text-blue-600', bg: 'bg-blue-500', badgeBg: 'bg-blue-100', barColor: 'bg-gradient-to-r from-blue-400 to-blue-500' }
  if (pct >= 70) return { letter: 'C', color: 'text-amber-600', bg: 'bg-amber-500', badgeBg: 'bg-amber-100', barColor: 'bg-gradient-to-r from-amber-400 to-amber-500' }
  if (pct >= 60) return { letter: 'D', color: 'text-orange-600', bg: 'bg-orange-500', badgeBg: 'bg-orange-100', barColor: 'bg-gradient-to-r from-orange-400 to-orange-500' }
  return { letter: 'F', color: 'text-red-600', bg: 'bg-red-500', badgeBg: 'bg-red-100', barColor: 'bg-gradient-to-r from-red-400 to-red-500' }
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

const SUBJECT_COLORS = [
  'bg-blue-100 text-blue-700 border-blue-200',
  'bg-violet-100 text-violet-700 border-violet-200',
  'bg-teal-100 text-teal-700 border-teal-200',
  'bg-pink-100 text-pink-700 border-pink-200',
  'bg-amber-100 text-amber-700 border-amber-200',
  'bg-emerald-100 text-emerald-700 border-emerald-200',
  'bg-orange-100 text-orange-700 border-orange-200',
  'bg-indigo-100 text-indigo-700 border-indigo-200',
]

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
  const subjectColorMap = Object.fromEntries(subjects.map((s, i) => [s, SUBJECT_COLORS[i % SUBJECT_COLORS.length]]))
  const filtered = filterSubject === 'all' ? entries : entries.filter((e) => e.subject === filterSubject)

  const weightedAvg = filtered.length > 0
    ? filtered.reduce((sum, e) => sum + (e.score / e.max_score) * 100 * e.weight, 0) / filtered.reduce((sum, e) => sum + e.weight, 0)
    : null

  const letterGrade = weightedAvg !== null ? getLetterGrade(weightedAvg) : null
  const gpa = weightedAvg !== null ? getGPA(weightedAvg) : null

  // Per-subject averages for the overview bar
  const subjectAverages = subjects.map((s) => {
    const sEntries = entries.filter((e) => e.subject === s)
    const avg = sEntries.reduce((sum, e) => sum + (e.score / e.max_score) * 100 * e.weight, 0) /
      sEntries.reduce((sum, e) => sum + e.weight, 0)
    const g = getLetterGrade(avg)
    return { subject: s, avg, letter: g.letter, color: g.color, barColor: g.barColor }
  })

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            Grades
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Track your grades and GPA</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/integrations" className="btn-glass px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 text-electric">
            <Link2 className="w-3.5 h-3.5" /> Import
          </Link>
          <button onClick={() => setShowCreate(true)} className="btn-electric text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Add grade
          </button>
        </div>
      </div>

      {/* Summary card — only when entries exist */}
      {weightedAvg !== null && letterGrade && (
        <div className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-lg`}
          style={{ background: `linear-gradient(135deg, ${weightedAvg >= 90 ? '#10b981,#059669' : weightedAvg >= 80 ? '#3b82f6,#2563eb' : weightedAvg >= 70 ? '#f59e0b,#d97706' : weightedAvg >= 60 ? '#f97316,#ea580c' : '#ef4444,#dc2626'})` }}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-black/10 blur-xl" />
          </div>
          <div className="relative flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <p className="text-6xl font-black leading-none">{letterGrade.letter}</p>
              <p className="text-xs text-white/70 mt-1 font-medium">Letter Grade</p>
            </div>
            <div className="w-px h-14 bg-white/20 hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl font-bold">{weightedAvg.toFixed(1)}%</p>
              <p className="text-xs text-white/70 mt-1 font-medium">Weighted Avg</p>
            </div>
            <div className="w-px h-14 bg-white/20 hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl font-bold">{gpa?.toFixed(1)}</p>
              <p className="text-xs text-white/70 mt-1 font-medium">GPA</p>
            </div>
            <div className="ml-auto hidden sm:block">
              <TrendingUp className="w-10 h-10 text-white/20" />
            </div>
          </div>
        </div>
      )}

      {/* Subject averages strip */}
      {subjectAverages.length > 1 && (
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 className="w-4 h-4 text-gray-400" />
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">By Subject</p>
          </div>
          <div className="space-y-2">
            {subjectAverages.map(({ subject: s, avg, letter, color, barColor }) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${color} ${subjectColorMap[s]?.split(' ')[0]}`}>
                  {letter}
                </div>
                <p className="text-xs font-medium text-gray-700 w-28 truncate shrink-0">{s}</p>
                <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${Math.min(avg, 100)}%` }} />
                </div>
                <span className="text-xs font-semibold text-gray-500 w-10 text-right shrink-0">{avg.toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subject filter pills */}
      {subjects.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilterSubject('all')} className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${filterSubject === 'all' ? 'bg-electric text-white shadow-electric border-transparent' : 'glass text-gray-500 hover:text-gray-900 border-white/60'}`}>
            All subjects
          </button>
          {subjects.map((s) => {
            const isActive = filterSubject === s
            const colorClass = subjectColorMap[s] ?? ''
            return (
              <button key={s} onClick={() => setFilterSubject(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${isActive ? `${colorClass} shadow-sm` : 'glass text-gray-500 hover:text-gray-900 border-white/60'}`}>
                {s}
              </button>
            )
          })}
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
        <div className="space-y-2">{[1, 2, 3].map((i) => <div key={i} className="glass rounded-2xl h-16 animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-200">
            <Calculator className="w-7 h-7 text-white" />
          </div>
          <p className="text-gray-500 text-sm mb-2">No grades yet.</p>
          <p className="text-xs text-gray-400">
            Add a grade manually or{' '}
            <Link href="/integrations" className="text-electric font-semibold hover:underline">
              import from Synergy or IXL <ArrowRight className="w-3 h-3 inline" />
            </Link>
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((e) => {
            const pct = (e.score / e.max_score) * 100
            const g = getLetterGrade(pct)
            const subjectColor = subjectColorMap[e.subject] ?? SUBJECT_COLORS[0]
            return (
              <div key={e.id} className="glass-card overflow-hidden">
                <div className="p-4 flex items-center gap-3">
                  {/* Letter badge */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${g.badgeBg} ${g.color}`}>
                    {g.letter}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{e.assignment_name}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${subjectColor}`}>{e.subject}</span>
                      {e.category && <span className="text-xs text-gray-400">{e.category}</span>}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-900">{e.score}/{e.max_score}</p>
                    <p className="text-xs text-gray-400">{pct.toFixed(1)}%{e.weight !== 1 && ` · ×${e.weight}`}</p>
                  </div>
                  <button onClick={() => deleteEntry(e.id)} className="text-gray-300 hover:text-red-400 transition-colors ml-1 shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Progress bar */}
                <div className="h-1 bg-gray-100">
                  <div className={`h-full ${g.barColor} transition-all`} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
