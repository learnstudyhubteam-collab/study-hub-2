'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ClipboardList, Plus, X, Check, Clock, AlertCircle, ChevronDown } from 'lucide-react'
import type { Assignment, AssignmentStatus, AssignmentPriority } from '@/types'
import { toast } from '@/lib/toast'

const statusColors: Record<AssignmentStatus, string> = {
  pending: 'bg-amber-500/10 text-amber-600',
  in_progress: 'bg-blue-500/10 text-blue-600',
  completed: 'bg-emerald-500/10 text-emerald-600',
  overdue: 'bg-red-500/10 text-red-600',
}

const statusLabels: Record<AssignmentStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  overdue: 'Overdue',
}

const priorityColors: Record<AssignmentPriority, string> = {
  low: 'bg-gray-100 text-gray-500',
  medium: 'bg-amber-100 text-amber-600',
  high: 'bg-red-100 text-red-600',
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

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-electric" /> Assignments
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Track your work and deadlines</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-electric text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add assignment
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'in_progress', 'completed', 'overdue'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${filter === s ? 'bg-electric text-white shadow-electric' : 'glass text-gray-500 hover:text-gray-900'}`}
          >
            {s === 'all' ? 'All' : statusLabels[s]} {counts[s] > 0 && <span className="ml-1 opacity-70">({counts[s]})</span>}
          </button>
        ))}
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
          {[1,2,3].map((i) => <div key={i} className="glass rounded-2xl h-20 animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center mx-auto mb-3">
            <ClipboardList className="w-7 h-7 text-electric" />
          </div>
          <p className="text-gray-500 text-sm">No assignments here yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <div key={a.id} className="glass-card p-4 flex items-start gap-3">
              <button
                onClick={() => updateStatus(a.id, a.status === 'completed' ? 'pending' : 'completed')}
                className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${a.status === 'completed' ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-electric'}`}
              >
                {a.status === 'completed' && <Check className="w-3 h-3 text-white" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-semibold ${a.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>{a.title}</p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityColors[a.priority]}`}>{a.priority}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[a.status]}`}>{statusLabels[a.status]}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  {a.subject && <span className="text-xs text-electric">{a.subject}</span>}
                  {a.due_date && (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {new Date(a.due_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {a.description && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{a.description}</p>}
              </div>
              <div className="flex items-center gap-1">
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
          ))}
        </div>
      )}
    </div>
  )
}
