'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Users, Plus, LogIn, X, Copy, Check, MessageSquare } from 'lucide-react'
import type { StudyGroup } from '@/types'

export default function GroupsPage() {
  const [groups, setGroups] = useState<StudyGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [joinCode, setJoinCode] = useState('')

  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: memberships } = await supabase.from('study_group_members').select('group_id').eq('user_id', user.id)
    if (memberships && memberships.length > 0) {
      const ids = memberships.map((m) => m.group_id)
      const { data } = await supabase.from('study_groups').select('*').in('id', ids)
      setGroups((data ?? []) as StudyGroup[])
    }
    setLoading(false)
  }

  async function createGroup(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data, error: err } = await supabase.from('study_groups').insert({
      name, subject: subject || null, description: description || null, created_by: user.id,
    }).select('*').single()
    if (err) { setError(err.message); setSaving(false); return }
    await supabase.from('study_group_members').insert({ group_id: data.id, user_id: user.id })
    setGroups((p) => [data as StudyGroup, ...p])
    setName(''); setSubject(''); setDescription('')
    setShowCreate(false); setSaving(false)
  }

  async function joinGroup(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: grp } = await supabase.from('study_groups').select('*').eq('invite_code', joinCode.trim().toUpperCase()).single()
    if (!grp) { setError('Group not found. Check the invite code.'); setSaving(false); return }
    const { error: err } = await supabase.from('study_group_members').insert({ group_id: grp.id, user_id: user.id })
    if (err && !err.message.includes('unique')) { setError(err.message); setSaving(false); return }
    if (!groups.find((g) => g.id === grp.id)) setGroups((p) => [...p, grp as StudyGroup])
    setJoinCode(''); setShowJoin(false); setSaving(false)
  }

  function copyCode(code: string, id: string) {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const subjectColors: Record<string, string> = {
    Math: 'bg-blue-500/10 text-blue-600',
    Science: 'bg-emerald-500/10 text-emerald-600',
    English: 'bg-violet-500/10 text-violet-600',
    default: 'bg-electric/10 text-electric',
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-electric" /> Study Groups
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Collaborate with classmates</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowJoin(true)} className="glass text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:bg-black/5 transition-colors">
            <LogIn className="w-4 h-4" /> Join
          </button>
          <button onClick={() => setShowCreate(true)} className="btn-electric text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Create
          </button>
        </div>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="glass rounded-3xl p-7 w-full max-w-md shadow-glass-hover animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">Create a study group</h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={createGroup} className="space-y-3">
              <input required placeholder="Group name" value={name} onChange={(e) => setName(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              <input placeholder="Subject (optional)" value={subject} onChange={(e) => setSubject(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              <textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm resize-none" />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={saving || !name.trim()} className="btn-electric text-white w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60">
                {saving ? 'Creating…' : 'Create group'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Join modal */}
      {showJoin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="glass rounded-3xl p-7 w-full max-w-sm shadow-glass-hover animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">Join a group</h2>
              <button onClick={() => setShowJoin(false)} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={joinGroup} className="space-y-3">
              <input required placeholder="Enter invite code" value={joinCode} onChange={(e) => setJoinCode(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm uppercase tracking-widest" />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={saving || !joinCode.trim()} className="btn-electric text-white w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60">
                {saving ? 'Joining…' : 'Join group'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Groups grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map((i) => <div key={i} className="glass rounded-2xl h-36 animate-pulse" />)}
        </div>
      ) : groups.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center mx-auto mb-3">
            <Users className="w-7 h-7 text-electric" />
          </div>
          <p className="text-gray-500 text-sm">Create or join a study group to collaborate with classmates.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((grp) => (
            <div key={grp.id} className="glass-card p-5 h-full">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${subjectColors[grp.subject ?? ''] ?? subjectColors.default}`}>
                  <Users className="w-5 h-5" />
                </div>
                <button
                  onClick={() => copyCode(grp.invite_code, grp.id)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-electric transition-colors glass rounded-lg px-2 py-1"
                >
                  {copiedId === grp.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {grp.invite_code}
                </button>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-0.5">{grp.name}</h3>
              {grp.subject && <p className="text-xs text-electric">{grp.subject}</p>}
              {grp.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{grp.description}</p>}
              <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                <MessageSquare className="w-3 h-3" />
                Share the code to invite members
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
