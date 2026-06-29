'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CalendarClock, Plus, Sparkles, X, ChevronDown, Trash2, User } from 'lucide-react'
import type { StudySchedule } from '@/types'
import Link from 'next/link'

interface UserProfile {
  classes: string[] | null
  grade_level: string | null
  county: string | null
}

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<StudySchedule[]>([])
  const [profile, setProfile] = useState<UserProfile | null>(null)
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
    const [{ data: sched }, { data: prof }] = await Promise.all([
      supabase.from('study_schedules').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      supabase.from('profiles').select('classes, grade_level, county').eq('id', user.id).single(),
    ])
    setSchedules((sched ?? []) as StudySchedule[])
    if (prof) setProfile(prof as UserProfile)
    setLoading(false)
  }

  function openFromProfile() {
    if (!profile) return
    setSubjectsInput((profile.classes ?? []).join(', '))
    const ctx: string[] = []
    if (profile.county) ctx.push(`School district/county: ${profile.county}`)
    if (profile.grade_level) ctx.push(`Grade level: ${profile.grade_level}`)
    if (ctx.length > 0) ctx.push('Consider local school calendar, pacing guides, and standardized tests for this area.')
    setExtraContext(ctx.join('\n'))
    setTitle('')
    setShowCreate(true)
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

  const hasProfile = (profile?.classes ?? []).length > 0

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <CalendarClock className="w-6 h-6 text-sky-500" />
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Study Schedule</span>
          </h1>
          <p className="text-sky-500 text-sm mt-0.5 font-medium">AI-generated personalised study plans</p>
        </div>
        <button onClick={() => { setSubjectsInput(''); setExtraContext(''); setTitle(''); setShowCreate(true) }} className="btn-electric text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Generate
        </button>
      </div>

      {/* Profile quick-generate banner */}
      {!loading && hasProfile && schedules.length === 0 && (
        <div className="glass rounded-2xl p-5 border border-violet-100 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-sm mb-0.5">Generate from your profile</p>
            <p className="text-xs text-gray-500 mb-3">
              You have {(profile?.classes ?? []).length} class{(profile?.classes ?? []).length !== 1 ? 'es' : ''} saved
              {profile?.county ? ` in ${profile.county}` : ''}.
              Generate a personalised schedule in one click.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {(profile?.classes ?? []).slice(0, 5).map((c) => (
                <span key={c} className="px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 text-[11px] font-semibold border border-violet-100">{c}</span>
              ))}
              {(profile?.classes ?? []).length > 5 && (
                <span className="px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 text-[11px] font-semibold border border-gray-100">+{(profile?.classes ?? []).length - 5} more</span>
              )}
            </div>
            <button
              onClick={openFromProfile}
              className="btn-electric text-white text-xs font-semibold px-4 py-2 rounded-xl inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Generate from my classes
            </button>
          </div>
        </div>
      )}

      {/* Profile quick-generate strip (when schedules already exist) */}
      {!loading && hasProfile && schedules.length > 0 && (
        <button
          onClick={openFromProfile}
          className="w-full glass rounded-2xl p-4 border border-violet-100 hover:border-violet-200 hover:bg-violet-50/30 transition-all text-left flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 group-hover:text-violet-700 transition-colors">Generate from my profile</p>
            <p className="text-xs text-gray-400 truncate">
              {(profile?.classes ?? []).join(', ')}
            </p>
          </div>
          <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
        </button>
      )}

      {/* Generate modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="glass rounded-3xl p-7 w-full max-w-md shadow-glass-hover animate-fade-up max-h-[90vh] overflow-y-auto">
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
                <textarea placeholder="e.g. I'm weakest in calculus, strong in bio. Include breaks." value={extraContext} onChange={(e) => setExtraContext(e.target.value)} rows={3} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm resize-none" />
              </div>
              {error && <p className="text-sm text-red-500 glass rounded-xl px-3 py-2">{error}</p>}
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
          <p className="text-gray-500 text-sm mb-1">No study schedules yet.</p>
          {!hasProfile && (
            <p className="text-xs text-gray-400 mb-3">
              Add your classes in{' '}
              <Link href="/settings" className="text-electric font-semibold hover:underline">Settings</Link>{' '}
              to enable one-click generation.
            </p>
          )}
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
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
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
                  <div className="pt-4">
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
