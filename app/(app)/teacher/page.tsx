'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  GraduationCap, Users, ClipboardList, FileText, Plus, Copy, Check,
  X, Sparkles, Upload, ChevronRight, BookOpen, UserPlus, AlertTriangle,
  Settings, Calendar, Share2, BarChart3,
} from 'lucide-react'
import Link from 'next/link'

interface ClassRow {
  id: string
  name: string
  subject: string | null
  section: string | null
  invite_code: string
  teacher_id: string
  created_at: string
  memberCount?: number
}

interface LightspeedStudent {
  firstName: string
  lastName: string
  email: string
  grade: string
  className: string
  period: string
}

export default function TeacherPage() {
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState<ClassRow[]>([])
  const [stats, setStats] = useState({ classes: 0, students: 0, assignments: 0, guides: 0 })

  // Post assignment modal
  const [showPostAssignment, setShowPostAssignment] = useState(false)
  const [assignTitle, setAssignTitle] = useState('')
  const [assignSubject, setAssignSubject] = useState('')
  const [assignClassId, setAssignClassId] = useState('')
  const [assignDueDate, setAssignDueDate] = useState('')
  const [assignDesc, setAssignDesc] = useState('')
  const [assignPriority, setAssignPriority] = useState('medium')
  const [postingAssignment, setPostingAssignment] = useState(false)
  const [assignError, setAssignError] = useState<string | null>(null)
  const [assignSuccess, setAssignSuccess] = useState(false)

  // Lightspeed import
  const [showLightspeed, setShowLightspeed] = useState(false)
  const [lsCSV, setLsCSV] = useState('')
  const [lsStudents, setLsStudents] = useState<LightspeedStudent[]>([])
  const [lsParsed, setLsParsed] = useState(false)
  const [lsImporting, setLsImporting] = useState(false)
  const [lsResult, setLsResult] = useState<string | null>(null)

  // Copy invite codes
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    setRole(profile?.role ?? null)

    if (profile?.role !== 'teacher' && profile?.role !== 'admin') {
      setLoading(false)
      return
    }

    const { data: classData } = await supabase
      .from('classes')
      .select('*')
      .eq('teacher_id', user.id)
      .order('created_at', { ascending: false })

    const classList = (classData ?? []) as ClassRow[]

    // Load per-class member counts
    if (classList.length > 0) {
      const { data: members } = await supabase
        .from('class_members')
        .select('class_id')
        .in('class_id', classList.map((c) => c.id))

      const counts: Record<string, number> = {}
      for (const m of members ?? []) {
        counts[m.class_id] = (counts[m.class_id] ?? 0) + 1
      }
      classList.forEach((c) => { c.memberCount = counts[c.id] ?? 0 })
    }

    // Assignments posted to classes in last 30 days
    const since = new Date()
    since.setDate(since.getDate() - 30)
    const { count: assignCount } = await supabase
      .from('assignments')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .not('class_id', 'is', null)
      .gte('created_at', since.toISOString())

    const { count: guideCount } = await supabase
      .from('study_guides')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)

    const totalStudents = classList.reduce((s, c) => s + (c.memberCount ?? 0), 0)

    setClasses(classList)
    setStats({
      classes: classList.length,
      students: totalStudents,
      assignments: assignCount ?? 0,
      guides: guideCount ?? 0,
    })
    setLoading(false)
  }

  async function postAssignment(e: React.FormEvent) {
    e.preventDefault()
    setPostingAssignment(true)
    setAssignError(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setPostingAssignment(false); return }

    const { error } = await supabase.from('assignments').insert({
      user_id: user.id,
      class_id: assignClassId || null,
      title: assignTitle,
      subject: assignSubject || null,
      description: assignDesc || null,
      due_date: assignDueDate || null,
      priority: assignPriority,
      status: 'pending',
    })

    if (error) { setAssignError(error.message); setPostingAssignment(false); return }

    setStats((s) => ({ ...s, assignments: s.assignments + 1 }))
    setAssignTitle(''); setAssignSubject(''); setAssignClassId('')
    setAssignDueDate(''); setAssignDesc(''); setAssignPriority('medium')
    setAssignSuccess(true)
    setPostingAssignment(false)
    setTimeout(() => { setShowPostAssignment(false); setAssignSuccess(false) }, 1200)
  }

  function parseLightspeedCSV() {
    const lines = lsCSV.trim().split('\n').filter((l) => l.trim())
    if (lines.length < 2) return
    const headerLine = lines[0].toLowerCase()
    const hasHeader = headerLine.includes('name') || headerLine.includes('email') || headerLine.includes('student')
    const startIdx = hasHeader ? 1 : 0

    const students: LightspeedStudent[] = []
    for (let i = startIdx; i < lines.length; i++) {
      const cols = lines[i].split(',').map((s) => s.trim().replace(/^"|"$/g, ''))
      if (cols.length < 4) continue

      let firstName = '', lastName = '', email = '', grade = '', className = '', period = ''

      if (cols.length >= 6) {
        ;[firstName, lastName, email, grade, className, period] = cols
      } else if (cols.length >= 5) {
        ;[firstName, lastName, email, grade, className] = cols
      } else {
        const parts = cols[0].split(' ')
        firstName = parts[0]; lastName = parts.slice(1).join(' ')
        ;[, email, grade, className] = cols
      }

      if (!email.includes('@')) continue
      students.push({ firstName, lastName, email, grade, className, period })
    }

    setLsStudents(students)
    setLsParsed(true)
  }

  async function importLightspeedRoster() {
    setLsImporting(true); setLsResult(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLsImporting(false); return }

    const byClass: Record<string, LightspeedStudent[]> = {}
    for (const s of lsStudents) {
      const key = s.className || 'Imported Class'
      byClass[key] = [...(byClass[key] ?? []), s]
    }

    let classesCreated = 0

    for (const [className, students] of Object.entries(byClass)) {
      const { data: existing } = await supabase
        .from('classes')
        .select('id, invite_code')
        .eq('teacher_id', user.id)
        .ilike('name', className)
        .maybeSingle()

      if (!existing?.id) {
        const { data: newClass } = await supabase
          .from('classes')
          .insert({
            teacher_id: user.id,
            name: className,
            subject: students[0]?.grade ? `Grade ${students[0].grade}` : null,
          })
          .select('id, invite_code, name, subject, section, created_at')
          .single()
        if (newClass) {
          classesCreated++
          setClasses((prev) => [{
            ...newClass,
            teacher_id: user.id,
            memberCount: 0,
          } as ClassRow, ...prev])
        }
      }
    }

    const totalStudents = lsStudents.length
    setLsResult(
      `Done — ${classesCreated} new class${classesCreated !== 1 ? 'es' : ''} created for ${totalStudents} students. ` +
      `Share the invite codes below with your students so they can join.`
    )
    setLsImporting(false)
    load()
  }

  function copyCode(code: string, id: string) {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Group Lightspeed students by class for preview
  const lsByClass = lsStudents.reduce((acc, s) => {
    const k = s.className || 'Unknown Class'
    acc[k] = [...(acc[k] ?? []), s]
    return acc
  }, {} as Record<string, LightspeedStudent[]>)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-10 h-10 rounded-2xl bg-electric-gradient animate-pulse shadow-electric" />
      </div>
    )
  }

  if (role !== 'teacher' && role !== 'admin') {
    return (
      <div className="space-y-6 animate-fade-up">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-500" />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Teacher Hub</span>
          </h1>
        </div>
        <div className="glass rounded-2xl p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7 text-amber-500" />
          </div>
          <h2 className="font-bold text-gray-900 mb-2">Teacher access required</h2>
          <p className="text-gray-500 text-sm mb-5">
            This area is for teachers and administrators. Set your role in Settings to unlock it.
          </p>
          <Link
            href="/settings"
            className="btn-electric text-white px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-1.5"
          >
            <Settings className="w-4 h-4" /> Go to Settings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-500" />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Teacher Hub</span>
          </h1>
          <p className="text-indigo-400 text-sm mt-0.5 font-medium">Manage classes, assignments, and students</p>
        </div>
        <button
          onClick={() => setShowPostAssignment(true)}
          className="btn-electric text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Post Assignment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'My Classes', value: stats.classes, icon: GraduationCap, gradient: 'from-indigo-500 to-blue-600', shadow: 'shadow-indigo-200' },
          { label: 'Total Students', value: stats.students, icon: Users, gradient: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-200' },
          { label: 'Assignments (30d)', value: stats.assignments, icon: ClipboardList, gradient: 'from-amber-400 to-orange-500', shadow: 'shadow-amber-200' },
          { label: 'Study Guides', value: stats.guides, icon: FileText, gradient: 'from-rose-500 to-pink-500', shadow: 'shadow-rose-200' },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="glass-card p-4">
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 shadow-md ${stat.shadow}`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-2xl font-black text-gray-900 leading-none">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-3">
        <Link href="/classes" className="glass-card p-4 flex items-center gap-3 hover:shadow-lg transition-shadow group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-indigo-200">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900">Create Class</p>
            <p className="text-xs text-gray-400">Set up a new classroom</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-electric transition-colors" />
        </Link>

        <Link href="/guides" className="glass-card p-4 flex items-center gap-3 hover:shadow-lg transition-shadow group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-rose-200">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900">Generate Guide</p>
            <p className="text-xs text-gray-400">AI curriculum-aligned notes</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-electric transition-colors" />
        </Link>

        <button
          onClick={() => setShowLightspeed(true)}
          className="glass-card p-4 flex items-center gap-3 hover:shadow-lg transition-shadow group text-left w-full"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-cyan-200">
            <Upload className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900">Lightspeed Import</p>
            <p className="text-xs text-gray-400">Import rosters from Lightspeed</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-electric transition-colors" />
        </button>
      </div>

      {/* My Classes */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
            <GraduationCap className="w-4 h-4 text-indigo-500" /> My Classes
          </h2>
          <Link href="/classes" className="text-xs text-electric font-semibold hover:underline flex items-center gap-1">
            Manage all <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {classes.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-3">
              <GraduationCap className="w-6 h-6 text-indigo-500" />
            </div>
            <p className="text-sm text-gray-500 mb-3">No classes yet.</p>
            <Link href="/classes" className="btn-electric text-white text-xs font-semibold px-4 py-2 rounded-xl inline-flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Create your first class
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {classes.map((cls) => (
              <div key={cls.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/60 bg-white/30 hover:bg-white/50 transition-all">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shrink-0 shadow-md shadow-indigo-200">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{cls.name}</p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    {cls.subject && <span className="text-xs text-electric">{cls.subject}</span>}
                    {cls.section && <span className="text-xs text-gray-400">{cls.section}</span>}
                    <span className="text-xs text-gray-400 flex items-center gap-0.5">
                      <Users className="w-3 h-3" /> {cls.memberCount ?? 0}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => copyCode(cls.invite_code, cls.id)}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-electric/10 text-electric hover:bg-electric/20 transition-colors flex items-center gap-1"
                    title="Copy invite code"
                  >
                    {copiedId === cls.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {cls.invite_code}
                  </button>
                  <button
                    onClick={() => { setAssignClassId(cls.id); setShowPostAssignment(true) }}
                    className="text-xs px-2.5 py-1 rounded-lg glass hover:bg-electric/10 hover:text-electric text-gray-500 transition-colors border border-white/40"
                  >
                    + Assign
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips for teachers */}
      <div className="glass rounded-2xl p-5 border border-indigo-100">
        <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-indigo-500" /> Teaching Tips
        </h2>
        <ul className="space-y-2 text-xs text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold mt-0.5">→</span>
            Share a class <strong className="text-gray-800">invite code</strong> with students so they can join and see class assignments.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold mt-0.5">→</span>
            Use <strong className="text-gray-800">Study Guides</strong> to generate curriculum-aligned reference notes and share them with your class.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold mt-0.5">→</span>
            <strong className="text-gray-800">Lightspeed Import</strong> lets you bulk-create classes from your Lightspeed Classroom roster export.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold mt-0.5">→</span>
            Students can see assignments you post to a class inside their <Link href="/assignments" className="text-electric hover:underline">Assignments</Link> page.
          </li>
        </ul>
      </div>

      {/* Post Assignment Modal */}
      {showPostAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="glass rounded-3xl p-7 w-full max-w-md shadow-glass-hover animate-fade-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-electric" /> Post Assignment
              </h2>
              <button onClick={() => { setShowPostAssignment(false); setAssignError(null) }} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={postAssignment} className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Assignment title</label>
                <input
                  required
                  placeholder="e.g. Chapter 5 Review Questions"
                  value={assignTitle}
                  onChange={(e) => setAssignTitle(e.target.value)}
                  className="input-glass w-full px-4 py-2.5 rounded-xl text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Subject</label>
                  <input placeholder="e.g. Math" value={assignSubject} onChange={(e) => setAssignSubject(e.target.value)} className="input-glass w-full px-3 py-2 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Priority</label>
                  <select value={assignPriority} onChange={(e) => setAssignPriority(e.target.value)} className="input-glass w-full px-3 py-2 rounded-xl text-sm">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Class (optional)</label>
                  <select value={assignClassId} onChange={(e) => setAssignClassId(e.target.value)} className="input-glass w-full px-3 py-2 rounded-xl text-sm">
                    <option value="">Personal only</option>
                    {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Due date</label>
                  <input type="date" value={assignDueDate} onChange={(e) => setAssignDueDate(e.target.value)} className="input-glass w-full px-3 py-2 rounded-xl text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Description / instructions</label>
                <textarea
                  placeholder="What should students do? Any rubric info?"
                  value={assignDesc}
                  onChange={(e) => setAssignDesc(e.target.value)}
                  rows={3}
                  className="input-glass w-full px-4 py-2.5 rounded-xl text-sm resize-none"
                />
              </div>
              {assignError && <p className="text-sm text-red-500 glass rounded-xl px-3 py-2">{assignError}</p>}
              <button
                type="submit"
                disabled={postingAssignment || !assignTitle.trim()}
                className="btn-electric text-white w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {assignSuccess ? (
                  <><Check className="w-4 h-4" /> Posted!</>
                ) : postingAssignment ? (
                  <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Posting…</>
                ) : (
                  <><ClipboardList className="w-4 h-4" /> Post Assignment</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Lightspeed Import Modal */}
      {showLightspeed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="glass rounded-3xl p-7 w-full max-w-lg shadow-glass-hover animate-fade-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-cyan-500" /> Lightspeed Classroom Import
              </h2>
              <button
                onClick={() => { setShowLightspeed(false); setLsParsed(false); setLsCSV(''); setLsStudents([]); setLsResult(null) }}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!lsParsed ? (
              <div className="space-y-4">
                <div className="glass rounded-xl p-4 border border-cyan-100 space-y-2">
                  <p className="font-semibold text-gray-900 text-sm flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-500" /> How to export from Lightspeed Classroom
                  </p>
                  <ol className="list-decimal ml-4 space-y-1 text-xs text-gray-500">
                    <li>Sign in to <strong>Lightspeed Classroom</strong> as a teacher.</li>
                    <li>Open your class and go to <strong>Roster</strong> or <strong>Student Management</strong>.</li>
                    <li>Click <strong>Export → CSV</strong>.</li>
                    <li>Open the CSV and paste all content below.</li>
                  </ol>
                  <p className="text-[11px] text-gray-400 pt-1">
                    Expected columns: <code className="bg-gray-100 px-1 rounded text-[10px]">First Name, Last Name, Email, Grade, Class, Period</code>
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Paste Lightspeed CSV</label>
                  <textarea
                    placeholder={`First Name,Last Name,Email,Grade,Class,Period\nJane,Smith,jane@school.edu,10,AP Biology,3\nAlex,Jones,alex@school.edu,10,AP Biology,3`}
                    value={lsCSV}
                    onChange={(e) => setLsCSV(e.target.value)}
                    rows={9}
                    className="input-glass w-full px-4 py-3 rounded-xl text-sm resize-none font-mono"
                  />
                </div>
                <button
                  onClick={parseLightspeedCSV}
                  disabled={!lsCSV.trim()}
                  className="btn-electric text-white w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Parse Roster
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-emerald-700 glass rounded-xl px-4 py-2.5 border border-emerald-100">
                  <Check className="w-4 h-4 text-emerald-500" />
                  Found <strong>{lsStudents.length}</strong> student{lsStudents.length !== 1 ? 's' : ''} across <strong>{Object.keys(lsByClass).length}</strong> class{Object.keys(lsByClass).length !== 1 ? 'es' : ''}
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {Object.entries(lsByClass).map(([className, students]) => (
                    <div key={className} className="glass rounded-xl p-3">
                      <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-2">
                        <GraduationCap className="w-3.5 h-3.5 text-indigo-500" /> {className}
                        <span className="text-xs font-normal text-gray-400">({students.length} students)</span>
                      </p>
                      <div className="space-y-0.5">
                        {students.slice(0, 3).map((s, i) => (
                          <p key={i} className="text-xs text-gray-500">
                            {s.firstName} {s.lastName} — <span className="text-gray-400">{s.email}</span>
                          </p>
                        ))}
                        {students.length > 3 && <p className="text-xs text-gray-400">+{students.length - 3} more…</p>}
                      </div>
                    </div>
                  ))}
                </div>

                {lsResult && (
                  <div className="glass rounded-xl px-4 py-3 border border-emerald-100 text-sm text-emerald-700">
                    <Check className="w-4 h-4 inline mr-1.5" />{lsResult}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => { setLsParsed(false); setLsStudents([]); setLsResult(null) }}
                    className="flex-1 glass py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={importLightspeedRoster}
                    disabled={lsImporting || !!lsResult}
                    className="flex-1 btn-electric text-white py-2.5 rounded-xl font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {lsImporting ? (
                      <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Importing…</>
                    ) : lsResult ? (
                      <><Check className="w-4 h-4" /> Done</>
                    ) : (
                      <><UserPlus className="w-4 h-4" /> Create Classes + Get Invite Codes</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
