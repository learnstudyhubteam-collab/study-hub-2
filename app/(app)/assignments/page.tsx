'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ClipboardList, Plus, X, Check, Clock, ChevronDown } from 'lucide-react'
import type { Assignment, AssignmentStatus, AssignmentPriority } from '@/types'
import { toast } from '@/lib/toast'

const statusColors: Record<AssignmentStatus, string> = {
  pending: 'bg-amber-100 text-amber-700 border border-amber-200',
  in_progress: 'bg-blue-100 text-blue-700 border border-blue-200',
  completed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  overdue: 'bg-red-100 text-red-700 border border-red-200',
}

const statusLabels: Record<AssignmentStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  overdue: 'Overdue',
}

// Left border color + background tint per priority
const priorityStyles: Record<AssignmentPriority, { border: string; tint: string; badge: string }> = {
  high: { border: 'border-l-red-400', tint: 'hover:bg-red-500/3', badge: 'bg-red-100 text-red-700 border border-red-200' },
  medium: { border: 'border-l-amber-400', tint: 'hover:bg-amber-500/3', badge: 'bg-amber-100 text-amber-700 border border-amber-200' },
  low: { border: 'border-l-gray-300', tint: 'hover:bg-gray-500/3', badge: 'bg-gray-100 text-gray-600 border border-gray-200' },
}

const countBadgeColors: Record<AssignmentStatus | 'all', string> = {
  all: 'bg-gray-100 text-gray-600',
  pending: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-emerald-100 text-emerald-700',
  overdue: 'bg-red-100 text-red-700',
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [filter, setFilter] = useState<AssignmentStatus | 'all'>('all')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<AssignmentPriority>('medium')

  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('assignments').select('*').eq('user_id', user.id).order('due_date', { ascending: true, nullsFirst: false })
    setAssignments((data ?? []) as Assignment[])
    setLoading(false)
  }

  async function createAssignment(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(false); return }
    const { data, error: err } = await supabase.from('assignments').insert({
      user_id: user.id, title, subject: subject || null, description: description || null,
      due_date: dueDate || null, priority, status: 'pending',
    }).select('*').single()
    if (err) { setError(err.message); setSaving(false); return }
    setAssignments((p) => [...p, data as Assignment])
    setTitle(''); setSubject(''); setDescription(''); setDueDate(''); setPriority('medium')
    setShowCreate(false); setSaving(false)
    toast('Assignment added!', 'success')
  }

  async function updateStatus(id: string, status: AssignmentStatus) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('assignments').update({ status }).eq('id', id).eq('user_id', user.id)
    setAssignments((p) => p.map((a) => a.id === id ? { ...a, status } : a))
    if (status === 'completed') toast('Assignment completed! 🎉', 'success')
  }

  async function deleteAssignment(id: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('assignments').delete().eq('id', id).eq('user_id', user.id)
    setAssignments((p) => p.filter((a) => a.id !== id))
    toast('Assignment removed', 'info')
  }

  const filtered = filter === 'all' ? assignments : assignments.filter((a) => a.status === filter)

  const counts = {
    all: assignments.length,
    pending: assignments.filter((a) => a.status === 'pending').length,
    in_progress: assignments.filter((a) => a.status === 'in_progress').length,
    completed: assignments.filter((a) => a.status === 'completed').length,
    overdue: assignments.filter((a) => a.status === 'overdue').length,
  }

  const completionPct = assignments.length > 0
    ? Math.round((counts.completed / assignments.length) * 100)
    : null

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-200">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-violet-600 to-purple-700 bg-clip-text text-transparent">Assignments</span>
          </h1>
          <p className="text-violet-400 text-sm mt-0.5 font-medium">Track your work and deadlines</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-electric text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add assignment
        </button>
      </div>

      {/* Progress strip */}
      {completionPct !== null && assignments.length > 0 && (
        <div className="glass rounded-2xl p-4 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1.5">
              <span>{counts.completed} of {assignments.length} completed</span>
              <span className="text-emerald-600">{completionPct}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-700"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>
          {counts.overdue > 0 && (
            <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold text-red-600">{counts.overdue} overdue</span>
            </div>
          )}
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'in_progress', 'completed', 'overdue'] as const).map((s) => {
          const isActive = filter === s
          const badgeColor = countBadgeColors[s]
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isActive ? 'bg-electric text-white shadow-electric' : 'glass text-gray-500 hover:text-gray-900'
              }`}
            >
              {s === 'all' ? 'All' : statusLabels[s]}
              {counts[s] > 0 && (
                <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${isActive ? 'bg-white/20 text-white' : badgeColor}`}>
                  {counts[s]}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="glass rounded-3xl p-7 w-full max-w-md shadow-glass-hover animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">Add assignment</h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={createAssignment} className="space-y-3">
              <input required placeholder="Assignment title" value={title} onChange={(e) => setTitle(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              <textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm resize-none" />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Due date</label>
                  <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="input-glass w-full px-3 py-2 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Priority</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value as AssignmentPriority)} className="input-glass w-full px-3 py-2 rounded-xl text-sm">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={saving || !title.trim()} className="btn-electric text-white w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60">
                {saving ? 'Adding…' : 'Add assignment'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Assignments list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="glass rounded-2xl h-20 animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-violet-200">
            <ClipboardList className="w-7 h-7 text-white" />
          </div>
          <p className="text-gray-500 text-sm">No assignments here yet.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((a) => {
            const ps = priorityStyles[a.priority]
            return (
              <div key={a.id} className={`glass-card overflow-hidden border-l-4 ${ps.border} ${ps.tint}`}>
                <div className="p-4 flex items-start gap-3">
                  {/* Complete toggle */}
                  <button
                    onClick={() => updateStatus(a.id, a.status === 'completed' ? 'pending' : 'completed')}
                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${a.status === 'completed' ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-electric'}`}
                  >
                    {a.status === 'completed' && <Check className="w-3 h-3 text-white" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <p className={`text-sm font-semibold ${a.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>{a.title}</p>
                      <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ps.badge}`}>{a.priority}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[a.status]}`}>{statusLabels[a.status]}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      {a.subject && (
                        <span className="text-xs font-medium text-electric bg-electric/8 px-2 py-0.5 rounded-full">{a.subject}</span>
                      )}
                      {a.due_date && (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {new Date(a.due_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    {a.description && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{a.description}</p>}
                  </div>

                  {/* Status selector + delete */}
                  <div className="flex items-center gap-1 shrink-0">
                    <select
                      value={a.status}
                      onChange={(e) => updateStatus(a.id, e.target.value as AssignmentStatus)}
                      className="text-xs text-gray-500 bg-transparent border-none outline-none cursor-pointer"
                    >
                      {(['pending', 'in_progress', 'completed', 'overdue'] as AssignmentStatus[]).map((s) => (
                        <option key={s} value={s}>{statusLabels[s]}</option>
                      ))}
                    </select>
                    <button onClick={() => deleteAssignment(a.id)} className="text-gray-300 hover:text-red-400 transition-colors ml-1">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
