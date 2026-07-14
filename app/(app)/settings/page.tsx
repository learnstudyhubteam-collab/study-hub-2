'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Settings, User, GraduationCap, Check, MapPin, BookOpen, Building2 } from 'lucide-react'

type Role = 'student' | 'teacher' | 'admin'

interface LocalProfile {
  id: string
  full_name: string | null
  role: Role | null
  school: string | null
  grade_level: string | null
  county: string | null
  classes: string[] | null
}

// Administrator is not self-serve: admins are promoted by an existing
// admin from /admin/users (the profiles trigger enforces this server-side)
const ROLES: { value: Role; label: string; desc: string }[] = [
  { value: 'student', label: 'Student', desc: 'Track grades, assignments & study sessions' },
  { value: 'teacher', label: 'Teacher', desc: 'Create classes, assign work & monitor progress' },
]

const GRADE_LEVELS = [
  'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade',
  '5th Grade', '6th Grade', '7th Grade', '8th Grade',
  '9th Grade (Freshman)', '10th Grade (Sophomore)', '11th Grade (Junior)', '12th Grade (Senior)',
  'College Freshman', 'College Sophomore', 'College Junior', 'College Senior', 'Graduate',
]

export default function SettingsPage() {
  const [profile, setProfile] = useState<LocalProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<Role>('student')
  const [school, setSchool] = useState('')
  const [gradeLevel, setGradeLevel] = useState('')
  const [county, setCounty] = useState('')
  const [classesInput, setClassesInput] = useState('')

  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, role, school, grade_level, county, classes')
      .eq('id', user.id)
      .single()
    if (data) {
      const p = data as LocalProfile
      setProfile(p)
      setFullName(p.full_name ?? '')
      setRole((p.role ?? 'student') as Role)
      setSchool(p.school ?? '')
      setGradeLevel(p.grade_level ?? '')
      setCounty(p.county ?? '')
      setClassesInput((p.classes ?? []).join(', '))
    }
    setLoading(false)
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const classes = classesInput.split(',').map((s) => s.trim()).filter(Boolean)
    await supabase.from('profiles').update({
      full_name: fullName || null,
      // Admins keep their role; role changes for others go through /admin/users
      ...(profile?.role === 'admin' ? {} : { role }),
      school: school || null,
      grade_level: gradeLevel || null,
      county: county || null,
      classes: classes.length > 0 ? classes : null,
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
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <Settings className="w-6 h-6 text-slate-500" />
          <span className="bg-gradient-to-r from-slate-700 to-blue-600 bg-clip-text text-transparent">Settings</span>
        </h1>
        <p className="text-slate-500 text-sm mt-0.5 font-medium">Manage your profile and preferences</p>
      </div>

      <form onSubmit={save} className="space-y-5">
        {/* Profile */}
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
            <label className="text-xs text-gray-500 mb-1 block">School / Institution</label>
            <input
              placeholder="e.g. Lincoln High School, MIT"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="input-glass w-full px-4 py-2.5 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Grade level</label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="input-glass w-full px-4 py-2.5 rounded-xl text-sm"
            >
              <option value="">Select grade level…</option>
              {GRADE_LEVELS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="glass rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-rose-500" /> Location
            <span className="text-[10px] font-normal text-gray-400 ml-1">Used to personalize your study schedule</span>
          </h2>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">County / District</label>
            <input
              placeholder="e.g. Fairfax County, Los Angeles USD"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              className="input-glass w-full px-4 py-2.5 rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Classes — students & teachers */}
        {role !== 'admin' && (
          <div className="glass rounded-2xl p-5 space-y-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4 text-violet-500" />
              {role === 'teacher' ? 'Subjects You Teach' : 'Your Classes'}
              <span className="text-[10px] font-normal text-gray-400 ml-1">Powers the &quot;Generate from profile&quot; button</span>
            </h2>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                {role === 'teacher' ? 'Subjects (comma-separated)' : 'Classes / subjects (comma-separated)'}
              </label>
              <input
                placeholder={role === 'teacher' ? 'e.g. Algebra II, AP Biology, US History' : 'e.g. Algebra II, AP Biology, English 10'}
                value={classesInput}
                onChange={(e) => setClassesInput(e.target.value)}
                className="input-glass w-full px-4 py-2.5 rounded-xl text-sm"
              />
              <p className="text-[11px] text-gray-400 mt-1.5">
                {classesInput.split(',').filter((s) => s.trim()).length > 0
                  ? `${classesInput.split(',').filter((s) => s.trim()).length} class${classesInput.split(',').filter((s) => s.trim()).length !== 1 ? 'es' : ''} saved`
                  : 'Add your classes to get personalised study plans'}
              </p>
            </div>
          </div>
        )}

        {/* Role */}
        <div className="glass rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
            <GraduationCap className="w-4 h-4 text-electric" /> Role
          </h2>
          {profile?.role === 'admin' && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-50 border border-blue-200">
              <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
              <p className="text-sm font-semibold text-blue-700">You&apos;re a district administrator</p>
            </div>
          )}
          <div className="grid grid-cols-1 gap-2.5">
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3 ${
                  role === r.value
                    ? 'border-electric bg-electric/5'
                    : 'border-transparent glass hover:border-electric/30'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  role === r.value ? 'bg-electric text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {r.value === 'admin' ? <Building2 className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                </div>
                <div>
                  <p className={`text-sm font-bold ${role === r.value ? 'text-electric' : 'text-gray-700'}`}>{r.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
                </div>
                {role === r.value && (
                  <div className="ml-auto w-5 h-5 rounded-full bg-electric flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Teacher tips */}
        {role === 'teacher' && (
          <div className="glass rounded-2xl p-5 border border-violet-100">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-violet-500" /> Teacher Features
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-start gap-2"><span className="text-violet-500 font-bold mt-0.5">→</span> Go to <strong>Classes</strong> to create class rooms and share invite codes with students.</li>
              <li className="flex items-start gap-2"><span className="text-violet-500 font-bold mt-0.5">→</span> Use <strong>Assignments</strong> to post work — students in your class can see and track it.</li>
              <li className="flex items-start gap-2"><span className="text-violet-500 font-bold mt-0.5">→</span> Create <strong>Study Groups</strong> for collaborative study sessions with an invite code.</li>
              <li className="flex items-start gap-2"><span className="text-violet-500 font-bold mt-0.5">→</span> Use <strong>Study Guides</strong> to share AI-generated notes with your class.</li>
            </ul>
          </div>
        )}

        {/* Admin/District tips */}
        {role === 'admin' && (
          <div className="glass rounded-2xl p-5 border border-blue-100">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-blue-500" /> District Administrator
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">→</span> Contact <strong>learn.studyhub.team@gmail.com</strong> to set up district-wide bulk enrollment.</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">→</span> Ask about <strong>district plans</strong> with centralized billing, admin dashboards, and SSO.</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">→</span> Teachers in your district can sign up individually with the school email domain.</li>
            </ul>
          </div>
        )}

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
