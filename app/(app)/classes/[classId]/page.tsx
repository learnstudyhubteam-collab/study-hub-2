'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  GraduationCap, Users, ClipboardList, BookOpen, ArrowLeft,
  Plus, X, Copy, Check, Clock
} from 'lucide-react'
import Link from 'next/link'
import type { ClassRow, Assignment, AssignmentStatus, AssignmentPriority } from '@/types'

interface Member {
  user_id: string
  joined_at: string
  profiles: { full_name: string | null; email: string | null } | null
}

interface PageProps { params: Promise<{ classId: string }> }

export default function ClassDetailPage({ params }: PageProps) {
  const { classId } = use(params)
  const [cls, setCls] = useState<ClassRow | null>(null)
  const [role, setRole] = useState<'student' | 'teacher'>('student')
  const [members, setMembers] = useState<Member[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'stream' | 'classwork' | 'people'>('stream')
  const [showCreateAssignment, setShowCreateAssignment] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<AssignmentPriority>('medium')

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => { load() }, [classId])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [{ data: profile }, { data: classData }, { data: membersData }, { data: assignmentsData }] = await Promise.all([
      supabase.from('profiles').select('role').eq('id', user.id).single(),
      supabase.from('classes').select('*').eq('id', classId).single(),
      supabase.from('class_members').select('user_id, joined_at, profiles(full_name, email)').eq('class_id', classId),
      supabase.from('assignments').select('*').eq('class_id', classId).order('due_date', { ascending: true, nullsFirst: false }),
    ])

    if (!classData) { router.push('/classes'); return }
    setRole((profile?.role ?? 'student') as 'student' | 'teacher')
    setCls(classData as ClassRow)
    setMembers((membersData ?? []) as unknown as Member[])
    setAssignments((assignmentsData ?? []) as Assignment[])
    setLoading(false)
  }

  async function createAssignment(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(false); return }
    const { data, error: err } = await supabase.from('assignments').insert({
      user_id: user.id, class_id: classId, title,
      description: description || null, due_date: dueDate || null,
      priority, status: 'pending', subject: cls?.subject || null,
    }).select('*').single()
    if (err) { setError(err.message); setSaving(false); return }
    setAssignments((p) => [...p, data as Assignment])
    setTitle(''); setDescription(''); setDueDate(''); setPriority('medium')
    setShowCreateAssignment(false); setSaving(false)
  }

  async function updateAssignmentStatus(id: string, status: AssignmentStatus) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('assignments').update({ status }).eq('id', id).eq('user_id', user.id)
    setAssignments((p) => p.map((a) => a.id === id ? { ...a, status } : a))
  }

  function copyInviteCode() {
    if (!cls) return
    navigator.clipboard.writeText(cls.invite_code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-10 h-10 rounded-2xl bg-electric-gradient animate-pulse shadow-electric" />
      </div>
    )
  }
  if (!cls) return null

  const statusColors: Record<AssignmentStatus, string> = {
    pending: 'bg-amber-500/10 text-amber-600',
    in_progress: 'bg-blue-500/10 text-blue-600',
    completed: 'bg-emerald-500/10 text-emerald-600',
    overdue: 'bg-red-500/10 text-red-600',
  }

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div>
        <Link href="/classes" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-3 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> All classes
        </Link>
        <div className="glass-blue rounded-2xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">{cls.name}</h1>
              {cls.subject && <p className="text-electric font-semibold mt-0.5">{cls.subject}{cls.section ? ` · ${cls.section}` : ''}</p>}
              {cls.description && <p className="text-sm text-gray-500 mt-2">{cls.description}</p>}
            </div>
            {role === 'teacher' && (
              <button
                onClick={copyInviteCode}
                className="flex items-center gap-1.5 glass px-3 py-2 rounded-xl text-sm text-gray-600 hover:text-electric transition-colors shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {cls.invite_code}
              </button>
            )}
          </div>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{members.length} student{members.length !== 1 ? 's' : ''}</span>
            <span className="flex items-center gap-1"><ClipboardList className="w-3.5 h-3.5" />{assignments.length} assignment{assignments.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 glass p-1 rounded-2xl">
        {(['stream', 'classwork', 'people'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${activeTab === tab ? 'bg-electric text-white shadow-electric' : 'text-gray-500 hover:text-gray-900'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stream tab */}
      {activeTab === 'stream' && (
        <div className="space-y-4">
          <div className="glass-blue rounded-2xl p-5 text-center">
            <GraduationCap className="w-10 h-10 text-electric mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              {role === 'teacher'
                ? <>Share your invite code <strong className="text-electric">{cls.invite_code}</strong> for students to join.</>
                : `You're enrolled in ${cls.name}.`}
            </p>
          </div>
          {assignments.slice(0, 3).map((a) => (
            <div key={a.id} className="glass-card p-4 flex items-center gap-3">
              <ClipboardList className="w-4 h-4 text-electric shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{a.title}</p>
                {a.due_date && <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(a.due_date).toLocaleDateString()}</p>}
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[a.status]}`}>{a.status}</span>
            </div>
          ))}
        </div>
      )}

      {/* Classwork tab */}
      {activeTab === 'classwork' && (
        <div className="space-y-4">
          {role === 'teacher' && (
            <button onClick={() => setShowCreateAssignment(true)} className="btn-electric text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Create assignment
            </button>
          )}
          {assignments.length === 0 ? (
            <div className="text-center py-12">
              <ClipboardList className="w-10 h-10 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No assignments yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {assignments.map((a) => (
                <div key={a.id} className="glass-card p-4 flex items-start gap-3">
                  <ClipboardList className="w-4 h-4 text-electric mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{a.title}</p>
                    {a.description && <p className="text-xs text-gray-500 mt-0.5">{a.description}</p>}
                    {a.due_date && <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />Due {new Date(a.due_date).toLocaleDateString()}</p>}
                  </div>
                  {role === 'student' && (
                    <select
                      value={a.status}
                      onChange={(e) => updateAssignmentStatus(a.id, e.target.value as AssignmentStatus)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-full border-none cursor-pointer ${statusColors[a.status]}`}
                    >
                      {(['pending', 'in_progress', 'completed'] as AssignmentStatus[]).map((s) => (
                        <option key={s} value={s}>{s.replace('_', ' ')}</option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* People tab */}
      {activeTab === 'people' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Teacher</h3>
            <div className="glass-card p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-electric-gradient flex items-center justify-center text-white text-xs font-bold">T</div>
              <p className="text-sm font-semibold text-gray-700">Class teacher</p>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Students ({members.length})</h3>
            {members.length === 0 ? (
              <p className="text-sm text-gray-400 px-1">No students enrolled yet.</p>
            ) : (
              <div className="space-y-2">
                {members.map((m) => (
                  <div key={m.user_id} className="glass-card p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-600 text-xs font-bold">
                      {(m.profiles?.full_name?.[0] ?? m.profiles?.email?.[0] ?? '?').toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{m.profiles?.full_name ?? 'Student'}</p>
                      {m.profiles?.email && <p className="text-xs text-gray-400">{m.profiles.email}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create assignment modal */}
      {showCreateAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="glass rounded-3xl p-7 w-full max-w-md shadow-glass-hover animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">Create assignment</h2>
              <button onClick={() => setShowCreateAssignment(false)} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={createAssignment} className="space-y-3">
              <input required placeholder="Assignment title" value={title} onChange={(e) => setTitle(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              <textarea placeholder="Instructions (optional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm resize-none" />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Due date</label>
                  <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="input-glass w-full px-3 py-2 rounded-xl text-sm" />
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
                {saving ? 'Creating…' : 'Create assignment'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
