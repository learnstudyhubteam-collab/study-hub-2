'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Building2, Users, GraduationCap, BarChart3, Upload, UserPlus,
  Check, X, AlertTriangle, Settings, ChevronRight, Shield,
  BookOpen, Mail, Copy, FileText, Sparkles, ClipboardList,
} from 'lucide-react'
import Link from 'next/link'

interface DistrictStats {
  total: number
  teachers: number
  students: number
  admins: number
  activePlans: number
  classCount: number
  newThisWeek: number
  district: string
}

interface EnrollResult {
  email: string
  status: 'invited' | 'error'
  error?: string
}

interface ParsedEnrollUser {
  email: string
  full_name: string
  role: string
  school: string
  grade_level: string
}

export default function AdminPage() {
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DistrictStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(false)

  // Bulk enrollment
  const [enrollCSV, setEnrollCSV] = useState('')
  const [parsedUsers, setParsedUsers] = useState<ParsedEnrollUser[]>([])
  const [csvParsed, setCsvParsed] = useState(false)
  const [enrolling, setEnrolling] = useState(false)
  const [enrollResults, setEnrollResults] = useState<EnrollResult[] | null>(null)

  // Lightspeed MDM
  const [showLightspeedMDM, setShowLightspeedMDM] = useState(false)
  const [mdmCSV, setMdmCSV] = useState('')
  const [mdmParsed, setMdmParsed] = useState<ParsedEnrollUser[] | null>(null)
  const [mdmImporting, setMdmImporting] = useState(false)
  const [mdmResult, setMdmResult] = useState<string | null>(null)

  const [copied, setCopied] = useState(false)

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
    setLoading(false)

    if (profile?.role === 'admin') {
      setStatsLoading(true)
      try {
        const res = await fetch('/api/admin/stats')
        if (res.ok) setStats(await res.json())
      } catch {
        // stats unavailable
      }
      setStatsLoading(false)
    }
  }

  function parseEnrollCSV() {
    const lines = enrollCSV.trim().split('\n').filter((l) => l.trim())
    if (!lines.length) return
    const headerLine = lines[0].toLowerCase()
    const hasHeader = headerLine.includes('email') || headerLine.includes('name') || headerLine.includes('role')
    const startIdx = hasHeader ? 1 : 0

    const users: ParsedEnrollUser[] = []
    for (let i = startIdx; i < lines.length; i++) {
      const cols = lines[i].split(',').map((s) => s.trim().replace(/^"|"$/g, ''))
      // Format: Email, Full Name, Role, School, Grade
      const [email = '', full_name = '', role = 'student', school = '', grade_level = ''] = cols
      if (!email.includes('@')) continue
      users.push({ email, full_name, role: role || 'student', school, grade_level })
    }

    setParsedUsers(users)
    setCsvParsed(true)
  }

  async function sendEnrollment() {
    setEnrolling(true); setEnrollResults(null)
    try {
      const res = await fetch('/api/admin/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: parsedUsers }),
      })
      const data = await res.json()
      setEnrollResults(data.results ?? [])
    } catch {
      setEnrollResults([{ email: '', status: 'error', error: 'Failed to send invitations' }])
    }
    setEnrolling(false)
  }

  function parseMDMCSV() {
    const lines = mdmCSV.trim().split('\n').filter((l) => l.trim())
    if (!lines.length) return
    const header = lines[0].toLowerCase()
    const hasHeader = header.includes('email') || header.includes('name')
    const startIdx = hasHeader ? 1 : 0

    const users: ParsedEnrollUser[] = []
    for (let i = startIdx; i < lines.length; i++) {
      const cols = lines[i].split(',').map((s) => s.trim().replace(/^"|"$/g, ''))
      // Lightspeed MDM export: Device Name, Student Name, Student Email, Grade, School
      // or just: Name, Email, Grade, School, Role
      let email = '', full_name = '', grade_level = '', school = '', role = 'student'

      if (cols.length >= 5 && cols[2].includes('@')) {
        // Device Name, Student Name, Student Email, Grade, School
        ;[, full_name, email, grade_level, school] = cols
      } else if (cols.length >= 4 && cols[1].includes('@')) {
        ;[full_name, email, grade_level, school] = cols
      } else if (cols.length >= 2 && cols[0].includes('@')) {
        ;[email, full_name, grade_level, school] = cols
      } else if (cols.length >= 3) {
        // Name, Email, Grade
        ;[full_name, email, grade_level] = cols
      }

      if (!email.includes('@')) continue
      users.push({ email, full_name, role, school, grade_level })
    }

    setMdmParsed(users)
  }

  async function importMDM() {
    if (!mdmParsed) return
    setMdmImporting(true); setMdmResult(null)
    try {
      const res = await fetch('/api/admin/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: mdmParsed }),
      })
      const data = await res.json()
      setMdmResult(`Sent ${data.invited} invitation${data.invited !== 1 ? 's' : ''}${data.failed > 0 ? `, ${data.failed} failed` : ''}.`)
    } catch {
      setMdmResult('Failed to send invitations.')
    }
    setMdmImporting(false)
  }

  function copyEmailTemplate() {
    const template = `Subject: Join your school on Tutor AI

Hi,

Your school district has set up Tutor AI for students and teachers.

Please sign up at: ${process.env.NEXT_PUBLIC_APP_URL ?? 'https://tutorai.app'}/signup

Tutor AI is an AI-powered learning platform with:
• Personalized AI tutoring across all subjects
• Study guides aligned to your state curriculum
• Assignment tracking, flashcards, and study groups

Questions? Reply to this email.

— Your School Admin`
    navigator.clipboard.writeText(template)
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

  if (role !== 'admin') {
    return (
      <div className="space-y-6 animate-fade-up">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Admin Dashboard</span>
          </h1>
        </div>
        <div className="glass rounded-2xl p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7 text-amber-500" />
          </div>
          <h2 className="font-bold text-gray-900 mb-2">Administrator access required</h2>
          <p className="text-gray-500 text-sm mb-5">
            Set your role to <strong>Administrator</strong> in Settings to access the district dashboard.
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

  const invitedCount = (enrollResults ?? []).filter((r) => r.status === 'invited').length
  const failedCount = (enrollResults ?? []).filter((r) => r.status === 'error').length

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Admin Dashboard</span>
          </h1>
          <p className="text-blue-400 text-sm mt-0.5 font-medium">
            {stats?.district ? `District: ${stats.district}` : 'District administrator tools'}
          </p>
        </div>
        <Link
          href="/settings"
          className="glass px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-black/5 transition-colors flex items-center gap-1.5"
        >
          <Settings className="w-4 h-4" /> Settings
        </Link>
      </div>

      {/* District Stats */}
      {statsLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1,2,3,4].map((i) => <div key={i} className="glass rounded-2xl h-24 animate-pulse" />)}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Users', value: stats.total, icon: Users, gradient: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-200' },
            { label: 'Teachers', value: stats.teachers, icon: GraduationCap, gradient: 'from-indigo-500 to-violet-600', shadow: 'shadow-indigo-200' },
            { label: 'Students', value: stats.students, icon: BookOpen, gradient: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-200' },
            { label: 'Active Plans', value: stats.activePlans, icon: Sparkles, gradient: 'from-amber-400 to-orange-500', shadow: 'shadow-amber-200' },
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
      ) : (
        <div className="glass rounded-2xl p-4 border border-amber-100 text-sm text-amber-700 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          District stats unavailable — the <code className="text-xs bg-amber-50 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> environment variable may not be set.
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-3">
        <button
          onClick={() => { setCsvParsed(false); setEnrollCSV(''); setParsedUsers([]); setEnrollResults(null) }}
          className="glass-card p-4 flex items-center gap-3 hover:shadow-lg transition-shadow group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-blue-200">
            <UserPlus className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900">Bulk Enrollment</p>
            <p className="text-xs text-gray-400">Invite users via CSV</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-electric" />
        </button>

        <button
          onClick={() => setShowLightspeedMDM(true)}
          className="glass-card p-4 flex items-center gap-3 hover:shadow-lg transition-shadow group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-cyan-200">
            <Upload className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900">Lightspeed MDM</p>
            <p className="text-xs text-gray-400">Import district roster</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-electric" />
        </button>

        <button
          onClick={copyEmailTemplate}
          className="glass-card p-4 flex items-center gap-3 hover:shadow-lg transition-shadow group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-violet-200">
            {copied ? <Check className="w-4 h-4 text-white" /> : <Mail className="w-4 h-4 text-white" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900">{copied ? 'Copied!' : 'Email Template'}</p>
            <p className="text-xs text-gray-400">Copy district invite email</p>
          </div>
          <Copy className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-electric" />
        </button>
      </div>

      {/* Bulk Enrollment */}
      <div className="glass rounded-2xl p-5">
        <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-4">
          <UserPlus className="w-4 h-4 text-blue-500" /> Bulk Enrollment via CSV
        </h2>

        {!csvParsed ? (
          <div className="space-y-3">
            <div className="glass rounded-xl p-3 border border-blue-100 text-xs text-gray-500 space-y-1">
              <p className="font-semibold text-gray-700">CSV format: <code className="bg-gray-100 px-1 rounded">Email, Full Name, Role, School, Grade</code></p>
              <p>Role options: <code className="bg-gray-100 px-1 rounded">student</code>, <code className="bg-gray-100 px-1 rounded">teacher</code>, <code className="bg-gray-100 px-1 rounded">admin</code></p>
              <p>Each user will receive a signup invitation email.</p>
            </div>
            <textarea
              placeholder={`Email,Full Name,Role,School,Grade\njane@school.edu,Jane Smith,student,Lincoln High,10th Grade (Sophomore)\njohn@school.edu,John Doe,teacher,Lincoln High,\nadmin@school.edu,Sarah Lee,admin,Lincoln High,`}
              value={enrollCSV}
              onChange={(e) => setEnrollCSV(e.target.value)}
              rows={7}
              className="input-glass w-full px-4 py-3 rounded-xl text-sm resize-none font-mono"
            />
            <button
              onClick={parseEnrollCSV}
              disabled={!enrollCSV.trim()}
              className="btn-electric text-white px-5 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-60 flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> Parse CSV
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-emerald-700 glass rounded-xl px-4 py-2.5 border border-emerald-100">
              <Check className="w-4 h-4 text-emerald-500" />
              {parsedUsers.length} user{parsedUsers.length !== 1 ? 's' : ''} ready to invite
            </div>

            <div className="max-h-52 overflow-y-auto space-y-1.5">
              {parsedUsers.map((u, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl glass border border-white/50">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    u.role === 'teacher' ? 'bg-indigo-100 text-indigo-600' :
                    u.role === 'admin' ? 'bg-blue-100 text-blue-600' :
                    'bg-emerald-100 text-emerald-600'
                  }`}>
                    {u.role === 'teacher' ? 'T' : u.role === 'admin' ? 'A' : 'S'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{u.full_name || u.email}</p>
                    <p className="text-xs text-gray-400 truncate">{u.email} {u.grade_level ? `· ${u.grade_level}` : ''}</p>
                  </div>
                </div>
              ))}
            </div>

            {enrollResults && (
              <div className={`glass rounded-xl px-4 py-3 border text-sm ${failedCount > 0 ? 'border-amber-100 text-amber-700' : 'border-emerald-100 text-emerald-700'}`}>
                <p>{invitedCount} invitation{invitedCount !== 1 ? 's' : ''} sent successfully{failedCount > 0 ? `, ${failedCount} failed` : ''}.</p>
                {(enrollResults ?? []).filter((r) => r.status === 'error').map((r, i) => (
                  <p key={i} className="text-xs text-red-500 mt-1">{r.email}: {r.error}</p>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => { setCsvParsed(false); setParsedUsers([]); setEnrollResults(null) }}
                className="glass px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={sendEnrollment}
                disabled={enrolling || !!enrollResults}
                className="flex-1 btn-electric text-white py-2.5 rounded-xl font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {enrolling ? (
                  <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                ) : enrollResults ? (
                  <><Check className="w-4 h-4" /> Done</>
                ) : (
                  <><Mail className="w-4 h-4" /> Send {parsedUsers.length} Invitation{parsedUsers.length !== 1 ? 's' : ''}</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* District Pro Plan */}
      <div className="glass rounded-2xl p-5 border border-blue-100">
        <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-blue-500" /> District Pro Plan
        </h2>
        <ul className="space-y-2 text-xs text-gray-600 mb-4">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold mt-0.5">→</span>
            <strong className="text-gray-800">Centralized billing</strong> — one invoice for your entire district instead of individual subscriptions.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold mt-0.5">→</span>
            <strong className="text-gray-800">Admin dashboard</strong> with district-wide analytics, usage reports, and teacher progress.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold mt-0.5">→</span>
            <strong className="text-gray-800">SSO / Google Workspace</strong> integration for frictionless login with existing school accounts.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold mt-0.5">→</span>
            <strong className="text-gray-800">Lightspeed MDM integration</strong> with automatic roster sync and device policy compliance.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold mt-0.5">→</span>
            <strong className="text-gray-800">Priority support</strong> with a dedicated Customer Success Manager.
          </li>
        </ul>
        <a
          href="mailto:learn.studyhub.team@gmail.com?subject=District Pro Plan Inquiry"
          className="btn-electric text-white text-xs font-semibold px-5 py-2.5 rounded-xl inline-flex items-center gap-1.5"
        >
          <Mail className="w-3.5 h-3.5" /> Contact us about District Pro
        </a>
      </div>

      {/* Lightspeed MDM Modal */}
      {showLightspeedMDM && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="glass rounded-3xl p-7 w-full max-w-lg shadow-glass-hover animate-fade-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-cyan-500" /> Lightspeed MDM District Import
              </h2>
              <button
                onClick={() => { setShowLightspeedMDM(false); setMdmCSV(''); setMdmParsed(null); setMdmResult(null) }}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-xl p-4 border border-cyan-100 space-y-2 text-sm">
                <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-500" /> Export from Lightspeed MDM
                </p>
                <ol className="list-decimal ml-4 space-y-1 text-xs text-gray-500">
                  <li>Sign in to <strong>Lightspeed MDM</strong> (Systems Manager) as a district admin.</li>
                  <li>Go to <strong>Devices → Users</strong> or <strong>Enrollment → Students</strong>.</li>
                  <li>Select all users and click <strong>Export → CSV</strong>.</li>
                  <li>Paste the CSV below — we'll detect the column order automatically.</li>
                </ol>
                <p className="text-[11px] text-gray-400 mt-1">
                  Supported formats: <code className="bg-gray-100 px-1 rounded text-[10px]">Name, Email, Grade, School</code> or <code className="bg-gray-100 px-1 rounded text-[10px]">Device, Student Name, Email, Grade, School</code>
                </p>
              </div>

              <textarea
                placeholder={`Name,Email,Grade,School\nJane Smith,jane@school.edu,10,Lincoln High\nJohn Doe,john@school.edu,11,Lincoln High`}
                value={mdmCSV}
                onChange={(e) => { setMdmCSV(e.target.value); setMdmParsed(null); setMdmResult(null) }}
                rows={8}
                className="input-glass w-full px-4 py-3 rounded-xl text-sm resize-none font-mono"
              />

              {!mdmParsed ? (
                <button
                  onClick={parseMDMCSV}
                  disabled={!mdmCSV.trim()}
                  className="btn-electric text-white w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Parse &amp; Preview
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-emerald-700 glass rounded-xl px-4 py-2.5 border border-emerald-100">
                    <Check className="w-4 h-4 text-emerald-500" />
                    {mdmParsed.length} user{mdmParsed.length !== 1 ? 's' : ''} parsed — sending invitations
                  </div>

                  <div className="max-h-36 overflow-y-auto space-y-1">
                    {mdmParsed.slice(0, 8).map((u, i) => (
                      <p key={i} className="text-xs text-gray-500">
                        {u.full_name || u.email} — <span className="text-gray-400">{u.email}</span>
                        {u.grade_level ? ` · ${u.grade_level}` : ''}
                      </p>
                    ))}
                    {mdmParsed.length > 8 && <p className="text-xs text-gray-400">+{mdmParsed.length - 8} more…</p>}
                  </div>

                  {mdmResult && (
                    <div className="glass rounded-xl px-4 py-3 border border-emerald-100 text-sm text-emerald-700">
                      <Check className="w-4 h-4 inline mr-1.5" />{mdmResult}
                    </div>
                  )}

                  <button
                    onClick={importMDM}
                    disabled={mdmImporting || !!mdmResult}
                    className="btn-electric text-white w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {mdmImporting ? (
                      <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending invitations…</>
                    ) : mdmResult ? (
                      <><Check className="w-4 h-4" /> Done</>
                    ) : (
                      <><Mail className="w-4 h-4" /> Send {mdmParsed.length} Invitation{mdmParsed.length !== 1 ? 's' : ''}</>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
