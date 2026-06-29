'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Clock, Plus, X, AlertTriangle, CalendarCheck } from 'lucide-react'
import type { Exam } from '@/types'
import { toast } from '@/lib/toast'

function Countdown({ examDate }: { examDate: string }) {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = new Date(examDate).getTime() - now
  if (diff <= 0) return <span className="text-red-500 font-bold text-sm">Exam passed</span>

  const days = Math.floor(diff / 86400000)
  const hrs = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  const secs = Math.floor((diff % 60000) / 1000)

  const urgency = days < 1 ? 'text-red-500' : days < 3 ? 'text-amber-500' : 'text-electric'

  return (
    <div className="flex items-center gap-2 mt-2">
      {[{ val: days, label: 'd' }, { val: hrs, label: 'h' }, { val: mins, label: 'm' }, { val: secs, label: 's' }].map(({ val, label }) => (
        <div key={label} className="text-center">
          <div className={`glass text-center px-2 py-1 rounded-lg min-w-[2.5rem] font-mono font-bold text-sm ${urgency}`}>
            {String(val).padStart(2, '0')}
          </div>
          <p className="text-[9px] text-gray-400 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  )
}

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [examDate, setExamDate] = useState('')
  const [notes, setNotes] = useState('')

  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('exams').select('*').eq('user_id', user.id).order('exam_date', { ascending: true })
    setExams((data ?? []) as Exam[])
    setLoading(false)
  }

  async function createExam(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(false); return }
    const { data, error: err } = await supabase.from('exams').insert({
      user_id: user.id, title, subject: subject || null, exam_date: examDate, notes: notes || null,
    }).select('*').single()
    if (err) { setError(err.message); setSaving(false); return }
    setExams((p) => [...p, data as Exam].sort((a, b) => new Date(a.exam_date).getTime() - new Date(b.exam_date).getTime()))
    setTitle(''); setSubject(''); setExamDate(''); setNotes('')
    setShowCreate(false); setSaving(false)
    toast('Exam added to countdown!', 'success')
  }

  async function deleteExam(id: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('exams').delete().eq('id', id).eq('user_id', user.id)
    setExams((p) => p.filter((e) => e.id !== id))
    toast('Exam removed', 'info')
  }

  const upcoming = exams.filter((e) => new Date(e.exam_date) >= new Date())
  const past = exams.filter((e) => new Date(e.exam_date) < new Date())

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <Clock className="w-6 h-6 text-rose-500" />
            <span className="bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">Exam Countdown</span>
          </h1>
          <p className="text-rose-400 text-sm mt-0.5 font-medium">Never miss an exam again</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-electric text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add exam
        </button>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="glass rounded-3xl p-7 w-full max-w-md shadow-glass-hover animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">Add exam</h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={createExam} className="space-y-3">
              <input required placeholder="Exam name (e.g. AP Chemistry Midterm)" value={title} onChange={(e) => setTitle(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Exam date & time</label>
                <input required type="datetime-local" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              </div>
              <textarea placeholder="Notes (topics to review, room number, etc.)" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm resize-none" />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={saving || !title.trim() || !examDate} className="btn-electric text-white w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60">
                {saving ? 'Saving…' : 'Add exam'}
              </button>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid sm:grid-cols-2 gap-4">{[1,2].map((i) => <div key={i} className="glass rounded-2xl h-36 animate-pulse" />)}</div>
      ) : (
        <>
          {upcoming.length === 0 && past.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-7 h-7 text-electric" />
              </div>
              <p className="text-gray-500 text-sm">No exams added yet. Stay ahead of the curve!</p>
            </div>
          ) : (
            <>
              {upcoming.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Upcoming</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {upcoming.map((exam) => {
                      const daysLeft = Math.ceil((new Date(exam.exam_date).getTime() - Date.now()) / 86400000)
                      const isUrgent = daysLeft <= 3
                      return (
                        <div key={exam.id} className={`glass-card p-5 relative ${isUrgent ? 'border border-red-200/60' : ''}`}>
                          {isUrgent && (
                            <div className="absolute top-3 right-3">
                              <AlertTriangle className="w-4 h-4 text-red-400" />
                            </div>
                          )}
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-bold text-gray-900 text-sm pr-6">{exam.title}</h3>
                            <button onClick={() => deleteExam(exam.id)} className="text-gray-300 hover:text-red-400 transition-colors shrink-0">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {exam.subject && <p className="text-xs text-electric mb-1">{exam.subject}</p>}
                          <p className="text-xs text-gray-400">{new Date(exam.exam_date).toLocaleString()}</p>
                          <Countdown examDate={exam.exam_date} />
                          {exam.notes && <p className="text-xs text-gray-500 mt-2 line-clamp-2">{exam.notes}</p>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {past.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Past</h2>
                  <div className="space-y-2">
                    {past.map((exam) => (
                      <div key={exam.id} className="glass-card p-3 flex items-center gap-3 opacity-50">
                        <CalendarCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-700 truncate">{exam.title}</p>
                          <p className="text-xs text-gray-400">{new Date(exam.exam_date).toLocaleDateString()}</p>
                        </div>
                        <button onClick={() => deleteExam(exam.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
