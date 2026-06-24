'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Settings, User, GraduationCap, Check } from 'lucide-react'

interface Profile {
  id: string
  full_name: string | null
  role: 'student' | 'teacher' | null
  school: string | null
  grade_level: string | null
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<'student' | 'teacher'>('student')
  const [school, setSchool] = useState('')
  const [gradeLevel, setGradeLevel] = useState('')

  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('profiles').select('id, full_name, role, school, grade_level').eq('id', user.id).single()
    if (data) {
      setProfile(data as Profile)
      setFullName(data.full_name ?? '')
      setRole((data.role ?? 'student') as 'student' | 'teacher')
      setSchool((data as any).school ?? '')
      setGradeLevel((data as any).grade_level ?? '')
    }
    setLoading(false)
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('profiles').update({
      full_name: fullName || null,
      role,
      school: school || null,
      grade_level: gradeLevel || null,
    }).eq('id', user.id)
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-10 h-10 rounded-2xl bg-electric-gradient animate-pulse shadow-electric" />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-up max-w-lg">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-electric" /> Settings
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage your profile and preferences</p>
      </div>

      <form onSubmit={save} className="space-y-5">
        {/* Profile section */}
        <div className="glass rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-electric" /> Profile
          </h2>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Full name</label>
            <input
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input-glass w-full px-4 py-2.5 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">School</label>
            <input
              placeholder="Your school or institution"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="input-glass w-full px-4 py-2.5 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Grade level</label>
            <input
              placeholder="e.g. 10th grade, Freshman, College Junior"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="input-glass w-full px-4 py-2.5 rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Role section */}
        <div className="glass rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
            <GraduationCap className="w-4 h-4 text-electric" /> Role
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {(['student', 'teacher'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`p-4 rounded-2xl border-2 transition-all text-left ${role === r ? 'border-electric bg-electric/5' : 'border-transparent glass hover:border-electric/30'}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${role === r ? 'bg-electric text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <GraduationCap className="w-4 h-4" />
                </div>
                <p className={`text-sm font-bold capitalize ${role === r ? 'text-electric' : 'text-gray-700'}`}>{r}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {r === 'student' ? 'Join classes, track work' : 'Create classes, assign work'}
                </p>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn-electric text-white w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {saved ? (
            <><Check className="w-4 h-4" /> Saved!</>
          ) : saving ? (
            <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
          ) : (
            'Save changes'
          )}
        </button>
      </form>
    </div>
  )
}
