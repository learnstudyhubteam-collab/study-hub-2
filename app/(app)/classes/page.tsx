'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { GraduationCap, Plus, Users, BookOpen, Copy, Check, LogIn, X } from 'lucide-react'
import Link from 'next/link'

interface ClassRow {
  id: string
  name: string
  subject: string | null
  section: string | null
  invite_code: string
  teacher_id: string
  member_count?: number
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassRow[]>([])
  const [role, setRole] = useState<'student' | 'teacher'>('student')
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [section, setSection] = useState('')
  const [description, setDescription] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    const userRole = (profile?.role ?? 'student') as 'student' | 'teacher'
    setRole(userRole)

    if (userRole === 'teacher') {
      const { data } = await supabase.from('classes').select('*').eq('teacher_id', user.id).order('created_at', { ascending: false })
      setClasses((data ?? []) as ClassRow[])
    } else {
      const { data: memberships } = await supabase.from('class_members').select('class_id').eq('user_id', user.id)
      if (memberships && memberships.length > 0) {
        const ids = memberships.map((m) => m.class_id)
        const { data } = await supabase.from('classes').select('*').in('id', ids)
        setClasses((data ?? []) as ClassRow[])
      }
    }
    setLoading(false)
  }

  async function createClass(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data, error: err } = await supabase.from('classes').insert({ teacher_id: user.id, name, subject: subject || null, section: section || null, description: description || null }).select('*').single()
    if (err) { setError(err.message); setSaving(false); return }
    setClasses((p) => [data as ClassRow, ...p])
    setName(''); setSubject(''); setSection(''); setDescription(''); setShowCreate(false); setSaving(false)
  }

  async function joinClass(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: cls } = await supabase.from('classes').select('*').eq('invite_code', joinCode.trim().toUpperCase()).single()
    if (!cls) { setError('Class not found. Check the invite code.'); setSaving(false); return }
    const { error: err } = await supabase.from('class_members').insert({ class_id: cls.id, user_id: user.id })
    if (err && !err.message.includes('unique')) { setError(err.message); setSaving(false); return }
    setClasses((p) => [...p, cls as ClassRow])
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
    History: 'bg-amber-500/10 text-amber-600',
    default: 'bg-electric/10 text-electric',
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-electric" /> Classes
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">{role === 'teacher' ? 'Manage your classes and students' : 'Your enrolled classes'}</p>
        </div>
        <div className="flex gap-2">
          {role === 'teacher' ? (
            <button onClick={() => setShowCreate(true)} className="btn-electric text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Create class
            </button>
          ) : (
            <button onClick={() => setShowJoin(true)} className="btn-electric text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5">
              <LogIn className="w-4 h-4" /> Join class
            </button>
          )}
        </div>
      </div>

      {/* Role notice */}
      <div className="glass-blue rounded-2xl px-4 py-3 text-sm text-gray-600 flex items-center gap-2">
        <GraduationCap className="w-4 h-4 text-electric shrink-0" />
        You&apos;re registered as a <strong className="text-electric">{role}</strong>.
        {role === 'student' && ' Ask your teacher for their invite code to join a class.'}
        <Link href="/settings" className="ml-auto text-xs text-electric font-semibold hover:underline shrink-0">Change role</Link>
      </div>

      {/* Create class modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="glass rounded-3xl p-7 w-full max-w-md shadow-glass-hover animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">Create a class</h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={createClass} className="space-y-3">
              <input required placeholder="Class name (e.g. AP Biology)" value={name} onChange={(e) => setName(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              <input placeholder="Section / period (optional)" value={section} onChange={(e) => setSection(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm" />
              <textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm resize-none" />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={saving || !name.trim()} className="btn-electric text-white w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60">
                {saving ? 'Creating…' : 'Create class'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Join class modal */}
      {showJoin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="glass rounded-3xl p-7 w-full max-w-sm shadow-glass-hover animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">Join a class</h2>
              <button onClick={() => setShowJoin(false)} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={joinClass} className="space-y-3">
              <input required placeholder="Enter invite code (e.g. AB12CD)" value={joinCode} onChange={(e) => setJoinCode(e.target.value)} className="input-glass w-full px-4 py-2.5 rounded-xl text-sm uppercase tracking-widest" />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={saving || !joinCode.trim()} className="btn-electric text-white w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60">
                {saving ? 'Joining…' : 'Join class'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Classes grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map((i) => <div key={i} className="glass rounded-2xl h-36 animate-pulse" />)}
        </div>
      ) : classes.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-7 h-7 text-electric" />
          </div>
          <p className="text-gray-500 text-sm">
            {role === 'teacher' ? 'Create your first class to get started.' : 'Join a class using an invite code from your teacher.'}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls) => (
            <Link key={cls.id} href={`/classes/${cls.id}`}>
              <div className="glass-card p-5 h-full group">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${subjectColors[cls.subject ?? ''] ?? subjectColors.default}`}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  {role === 'teacher' && (
                    <button
                      onClick={(e) => { e.preventDefault(); copyCode(cls.invite_code, cls.id) }}
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-electric transition-colors glass rounded-lg px-2 py-1"
                    >
                      {copiedId === cls.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      {cls.invite_code}
                    </button>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-0.5">{cls.name}</h3>
                {cls.subject && <p className="text-xs text-electric">{cls.subject}{cls.section ? ` · ${cls.section}` : ''}</p>}
                <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                  <Users className="w-3 h-3" />
                  {role === 'teacher' ? 'Tap to manage' : 'Tap to view'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
