'use client'

import { useState } from 'react'
import React from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from '@/lib/toast'
import {
  Link2, X, Upload, Check, ChevronRight, RefreshCw,
  Sparkles, Info, GraduationCap, BarChart2, Zap, BookOpen, School, Globe2, Shield,
} from 'lucide-react'

type ConnectorId = 'synergy' | 'ixl' | 'performance_matters' | 'canvas' | 'powerschool' | 'google_classroom' | 'lightspeed'
type ModalStep = 'instructions' | 'paste' | 'preview'

interface ParsedEntry {
  assignment_name: string
  subject: string
  score: number
  max_score: number
  category?: string
}

interface Connector {
  id: ConnectorId
  name: string
  shortName: string
  description: string
  gradient: string
  glow: string
  chipBg: string
  chipText: string
  chipBorder: string
  category: string
  Icon: React.ComponentType<{ className?: string }>
  subjectNeeded: boolean
  isNew?: boolean
  csvTemplate: string
  instructions: string[]
}

const CONNECTORS: Connector[] = [
  {
    id: 'synergy' as ConnectorId,
    name: 'Synergy StudentVue',
    shortName: 'Synergy',
    description: 'Import grades and assignments directly from your school district\'s Synergy / StudentVue gradebook.',
    gradient: 'from-teal-500 to-cyan-500',
    glow: 'shadow-teal-200',
    chipBg: 'bg-teal-50',
    chipText: 'text-teal-700',
    chipBorder: 'border-teal-200',
    category: 'Grades + Assignments',
    Icon: GraduationCap,
    subjectNeeded: true,
    csvTemplate: `Assignment,Category,Score,Out Of
Homework 1,Homework,95,100
Quiz 1,Quiz,18,20
Midterm Exam,Test,84,100`,
    instructions: [
      'Log in to your StudentVue portal at your school district\'s website.',
      'Go to Grade Book and select the class you want to import.',
      'Click "Export" (or manually copy the assignment rows to a spreadsheet).',
      'Save as CSV with columns: Assignment, Category, Score, Out Of',
      'Paste that CSV below on the next step.',
    ],
  },
  {
    id: 'ixl' as ConnectorId,
    name: 'IXL Learning',
    shortName: 'IXL',
    description: 'Sync your IXL SmartScores and skill progress directly into your grades tracker.',
    gradient: 'from-blue-600 to-indigo-600',
    glow: 'shadow-blue-200',
    chipBg: 'bg-blue-50',
    chipText: 'text-blue-700',
    chipBorder: 'border-blue-200',
    category: 'Skills & Scores',
    Icon: Zap,
    subjectNeeded: false,
    csvTemplate: `Skill,Domain,Score
Addition within 20,Math,87
Reading comprehension,Language Arts,92
Fractions,Math,78
Sentence structure,Language Arts,81`,
    instructions: [
      'Open IXL and navigate to your skill list for any subject.',
      'Find the SmartScore (0–100) for each skill you want to import.',
      'For each skill, note the Skill name, Domain (subject), and your SmartScore.',
      'Paste the data in CSV format on the next step (Skill, Domain, Score).',
    ],
  },
  {
    id: 'performance_matters' as ConnectorId,
    name: 'Performance Matters',
    shortName: 'Perf. Matters',
    description: 'Import your benchmark and assessment test results from Performance Matters.',
    gradient: 'from-purple-600 to-pink-500',
    glow: 'shadow-purple-200',
    chipBg: 'bg-purple-50',
    chipText: 'text-purple-700',
    chipBorder: 'border-purple-200',
    category: 'Assessments',
    Icon: BarChart2,
    subjectNeeded: false,
    csvTemplate: `Test Name,Subject,Score,Possible Score
Unit 1 Benchmark,Math,42,50
Reading Assessment,ELA,38,45
Science Quiz 2,Science,28,35`,
    instructions: [
      'Log into Performance Matters with your school credentials.',
      'Navigate to "My Results" or "Assessment History".',
      'View each test result and note the Test Name, Subject, your Score, and Possible Score.',
      'Paste in CSV format on the next step (Test Name, Subject, Score, Possible Score).',
    ],
  },
  {
    id: 'canvas' as ConnectorId,
    name: 'Canvas LMS',
    shortName: 'Canvas',
    description: 'Import grades and assignments from your school\'s Canvas learning management system.',
    gradient: 'from-rose-500 to-pink-500',
    glow: 'shadow-rose-200',
    chipBg: 'bg-rose-50',
    chipText: 'text-rose-700',
    chipBorder: 'border-rose-200',
    category: 'Grades + Assignments',
    Icon: BookOpen,
    subjectNeeded: false,
    isNew: true,
    csvTemplate: `Course,Assignment,Score,Points Possible
AP Biology,Cell Division Quiz,47,50
AP Biology,Lab Report 1,92,100
Algebra II,Homework 3,18,20`,
    instructions: [
      'Log into Canvas at your school\'s URL.',
      'Click on the course you want to import.',
      'Go to Grades and click the "Export" button (CSV).',
      'Open the CSV, keep the Course, Assignment, Score, and Points Possible columns.',
      'Paste the cleaned CSV on the next step.',
    ],
  },
  {
    id: 'powerschool' as ConnectorId,
    name: 'PowerSchool',
    shortName: 'PowerSchool',
    description: 'Pull in your assignments and scores from PowerSchool\'s student portal.',
    gradient: 'from-orange-500 to-amber-500',
    glow: 'shadow-orange-200',
    chipBg: 'bg-orange-50',
    chipText: 'text-orange-700',
    chipBorder: 'border-orange-200',
    category: 'Grades + Assignments',
    Icon: School,
    subjectNeeded: false,
    isNew: true,
    csvTemplate: `Class,Assignment,Score,Total Points
English 10,Essay Draft 1,87,100
English 10,Vocab Quiz,19,20
Pre-Calc,Chapter 5 Test,76,100`,
    instructions: [
      'Log into your PowerSchool Student portal.',
      'Navigate to Grades & Attendance.',
      'Click on a class to see assignments.',
      'Copy assignment rows to a spreadsheet: Class, Assignment, Score, Total Points.',
      'Paste the CSV on the next step.',
    ],
  },
  {
    id: 'google_classroom' as ConnectorId,
    name: 'Google Classroom',
    shortName: 'Classroom',
    description: 'Import your returned assignments and scores from Google Classroom.',
    gradient: 'from-green-500 to-emerald-500',
    glow: 'shadow-green-200',
    chipBg: 'bg-green-50',
    chipText: 'text-green-700',
    chipBorder: 'border-green-200',
    category: 'Grades + Assignments',
    Icon: Globe2,
    subjectNeeded: false,
    isNew: true,
    csvTemplate: `Assignment,Class,Points Earned,Points Possible
Newton's Laws Quiz,Physics,48,50
Photosynthesis Essay,Biology,90,100
Quadratics HW,Algebra II,20,20`,
    instructions: [
      'Open Google Classroom and navigate to your class.',
      'Click Classwork, then "View your work".',
      'Note each returned assignment: name, class, points earned, points possible.',
      'Create a CSV with those four columns.',
      'Paste it on the next step.',
    ],
  },
  {
    id: 'lightspeed' as ConnectorId,
    name: 'Lightspeed Relay',
    shortName: 'Lightspeed',
    description: 'Import student activity scores and course data from Lightspeed Relay\'s student reporting dashboard.',
    gradient: 'from-sky-500 to-cyan-600',
    glow: 'shadow-sky-200',
    chipBg: 'bg-sky-50',
    chipText: 'text-sky-700',
    chipBorder: 'border-sky-200',
    category: 'Activity + Scores',
    Icon: Shield,
    subjectNeeded: false,
    isNew: true,
    csvTemplate: `Course,Activity,Score,Total
Algebra II,Khan Academy - Quadratics,85,100
AP Biology,Quizlet Study Set,72,100
US History,Reading Assessment,91,100`,
    instructions: [
      'Log into Lightspeed Relay as a student or ask your teacher/admin for your report.',
      'Go to Student Activity or Course Reports.',
      'Export the report as CSV (or copy the activity rows).',
      'Keep columns: Course, Activity, Score, Total.',
      'Paste the CSV on the next step.',
    ],
  },
]

function parseSynergy(text: string, subject: string): ParsedEntry[] {
  const lines = text.trim().split('\n').filter((l) => l.trim())
  const startIdx = lines[0]?.toLowerCase().includes('assignment') ? 1 : 0
  const results: ParsedEntry[] = []
  for (let i = startIdx; i < lines.length; i++) {
    const cols = lines[i].split(',').map((s) => s.trim().replace(/^"|"$/g, ''))
    if (cols.length < 4) continue
    const [name, category, scoreStr, outOfStr] = cols
    const score = parseFloat(scoreStr)
    const max = parseFloat(outOfStr)
    if (!name || isNaN(score) || isNaN(max) || max === 0) continue
    results.push({ assignment_name: name, subject, score, max_score: max, category: category || undefined })
  }
  return results
}

function parseIXL(text: string): ParsedEntry[] {
  const lines = text.trim().split('\n').filter((l) => l.trim())
  const startIdx = lines[0]?.toLowerCase().includes('skill') ? 1 : 0
  const results: ParsedEntry[] = []
  for (let i = startIdx; i < lines.length; i++) {
    const cols = lines[i].split(',').map((s) => s.trim().replace(/^"|"$/g, ''))
    if (cols.length < 3) continue
    const [skill, domain, scoreStr] = cols
    const score = parseFloat(scoreStr)
    if (!skill || isNaN(score)) continue
    results.push({ assignment_name: skill, subject: domain || 'IXL', score, max_score: 100 })
  }
  return results
}

function parsePM(text: string): ParsedEntry[] {
  const lines = text.trim().split('\n').filter((l) => l.trim())
  const startIdx = lines[0]?.toLowerCase().includes('test') ? 1 : 0
  const results: ParsedEntry[] = []
  for (let i = startIdx; i < lines.length; i++) {
    const cols = lines[i].split(',').map((s) => s.trim().replace(/^"|"$/g, ''))
    if (cols.length < 4) continue
    const [name, subj, scoreStr, possibleStr] = cols
    const score = parseFloat(scoreStr)
    const max = parseFloat(possibleStr)
    if (!name || isNaN(score) || isNaN(max) || max === 0) continue
    results.push({ assignment_name: name, subject: subj || 'Assessment', score, max_score: max })
  }
  return results
}

function parseCanvas(text: string): ParsedEntry[] {
  const lines = text.trim().split('\n').filter((l) => l.trim())
  const startIdx = lines[0]?.toLowerCase().includes('course') ? 1 : 0
  const results: ParsedEntry[] = []
  for (let i = startIdx; i < lines.length; i++) {
    const cols = lines[i].split(',').map((s) => s.trim().replace(/^"|"$/g, ''))
    if (cols.length < 4) continue
    const [course, name, scoreStr, possibleStr] = cols
    const score = parseFloat(scoreStr)
    const max = parseFloat(possibleStr)
    if (!name || isNaN(score) || isNaN(max) || max === 0) continue
    results.push({ assignment_name: name, subject: course || 'Canvas', score, max_score: max })
  }
  return results
}

function parsePowerSchool(text: string): ParsedEntry[] {
  const lines = text.trim().split('\n').filter((l) => l.trim())
  const startIdx = lines[0]?.toLowerCase().includes('class') ? 1 : 0
  const results: ParsedEntry[] = []
  for (let i = startIdx; i < lines.length; i++) {
    const cols = lines[i].split(',').map((s) => s.trim().replace(/^"|"$/g, ''))
    if (cols.length < 4) continue
    const [cls, name, scoreStr, totalStr] = cols
    const score = parseFloat(scoreStr)
    const max = parseFloat(totalStr)
    if (!name || isNaN(score) || isNaN(max) || max === 0) continue
    results.push({ assignment_name: name, subject: cls || 'PowerSchool', score, max_score: max })
  }
  return results
}

function parseGoogleClassroom(text: string): ParsedEntry[] {
  const lines = text.trim().split('\n').filter((l) => l.trim())
  const startIdx = lines[0]?.toLowerCase().includes('assignment') ? 1 : 0
  const results: ParsedEntry[] = []
  for (let i = startIdx; i < lines.length; i++) {
    const cols = lines[i].split(',').map((s) => s.trim().replace(/^"|"$/g, ''))
    if (cols.length < 4) continue
    const [name, cls, scoreStr, possibleStr] = cols
    const score = parseFloat(scoreStr)
    const max = parseFloat(possibleStr)
    if (!name || isNaN(score) || isNaN(max) || max === 0) continue
    results.push({ assignment_name: name, subject: cls || 'Google Classroom', score, max_score: max })
  }
  return results
}

function parseLightspeed(text: string): ParsedEntry[] {
  const lines = text.trim().split('\n').filter((l) => l.trim())
  const startIdx = lines[0]?.toLowerCase().includes('course') ? 1 : 0
  const results: ParsedEntry[] = []
  for (let i = startIdx; i < lines.length; i++) {
    const cols = lines[i].split(',').map((s) => s.trim().replace(/^"|"$/g, ''))
    if (cols.length < 4) continue
    const [course, activity, scoreStr, totalStr] = cols
    const score = parseFloat(scoreStr)
    const max = parseFloat(totalStr)
    if (!activity || isNaN(score) || isNaN(max) || max === 0) continue
    results.push({ assignment_name: activity, subject: course || 'Lightspeed', score, max_score: max })
  }
  return results
}

function letterFor(pct: number) {
  if (pct >= 90) return { letter: 'A', color: 'text-emerald-600', bg: 'bg-emerald-100' }
  if (pct >= 80) return { letter: 'B', color: 'text-blue-600', bg: 'bg-blue-100' }
  if (pct >= 70) return { letter: 'C', color: 'text-amber-600', bg: 'bg-amber-100' }
  if (pct >= 60) return { letter: 'D', color: 'text-orange-600', bg: 'bg-orange-100' }
  return { letter: 'F', color: 'text-red-600', bg: 'bg-red-100' }
}

type ImportRecord = { count: number; date: string }

export default function IntegrationsPage() {
  const [activeId, setActiveId] = useState<ConnectorId | null>(null)
  const [step, setStep] = useState<ModalStep>('instructions')
  const [csvText, setCsvText] = useState('')
  const [subject, setSubject] = useState('')
  const [parsed, setParsed] = useState<ParsedEntry[]>([])
  const [importing, setImporting] = useState(false)
  const [history, setHistory] = useState<Partial<Record<ConnectorId, ImportRecord>>>({})

  const supabase = createClient()
  const connector = CONNECTORS.find((c) => c.id === activeId)

  function openConnector(id: ConnectorId) {
    setActiveId(id)
    setStep('instructions')
    setCsvText('')
    setParsed([])
    setSubject('')
  }

  function closeModal() {
    setActiveId(null)
    setCsvText('')
    setParsed([])
    setSubject('')
  }

  function handleParse() {
    if (!connector || !csvText.trim()) return
    let entries: ParsedEntry[] = []
    if (connector.id === 'synergy') entries = parseSynergy(csvText, subject || 'General')
    else if (connector.id === 'ixl') entries = parseIXL(csvText)
    else if (connector.id === 'performance_matters') entries = parsePM(csvText)
    else if (connector.id === 'canvas') entries = parseCanvas(csvText)
    else if (connector.id === 'powerschool') entries = parsePowerSchool(csvText)
    else if (connector.id === 'google_classroom') entries = parseGoogleClassroom(csvText)
    else if (connector.id === 'lightspeed') entries = parseLightspeed(csvText)
    if (entries.length === 0) {
      toast('No valid entries found — double-check the format.', 'error')
      return
    }
    setParsed(entries)
    setStep('preview')
  }

  async function handleImport() {
    if (!parsed.length || !activeId) return
    setImporting(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setImporting(false); return }
    const rows = parsed.map((p) => ({
      user_id: user.id,
      subject: p.subject,
      assignment_name: p.assignment_name,
      score: p.score,
      max_score: p.max_score,
      weight: 1,
      category: p.category ?? null,
    }))
    const { error } = await supabase.from('grade_entries').insert(rows)
    setImporting(false)
    if (error) { toast('Import failed: ' + error.message, 'error'); return }
    setHistory((prev) => ({ ...prev, [activeId]: { count: parsed.length, date: new Date().toLocaleDateString() } }))
    toast(`Imported ${parsed.length} grade entr${parsed.length === 1 ? 'y' : 'ies'} from ${connector?.shortName}!`, 'success')
    closeModal()
  }

  const STEPS: ModalStep[] = ['instructions', 'paste', 'preview']

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-7 text-white shadow-2xl">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-pink-400/20 blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-white/5 blur-3xl rounded-full" />
        </div>
        <div className="relative flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Link2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Integrations</span>
            </div>
            <h1 className="text-3xl font-black mb-2 leading-tight">
              Connect Your<br />School Platforms
            </h1>
            <p className="text-white/70 text-sm max-w-sm leading-relaxed">
              Import grades from Synergy, IXL, Performance Matters, Canvas, PowerSchool, and Google Classroom — all in one dashboard.
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1.5 mt-2 shrink-0">
            {CONNECTORS.map((c) => (
              <div key={c.id} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                <c.Icon className="w-3.5 h-3.5 text-white/80" />
                <span className="text-xs text-white/80 font-medium">{c.shortName}</span>
                {history[c.id] && <Check className="w-3 h-3 text-green-300" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Connector cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CONNECTORS.map((conn) => {
          const rec = history[conn.id]
          const Icon = conn.Icon
          return (
            <div key={conn.id} className="glass-card overflow-hidden flex flex-col">
              {/* Gradient top bar */}
              <div className={`relative h-28 bg-gradient-to-br ${conn.gradient} overflow-hidden flex items-end p-4`}>
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/15 blur-xl" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-black/10 blur-lg" />
                </div>
                <div className="relative flex items-center justify-between w-full">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {conn.isNew && !rec && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full px-2.5 py-0.5 shadow-sm">
                        <Sparkles className="w-2.5 h-2.5 text-white" />
                        <span className="text-[10px] font-bold text-white">New</span>
                      </div>
                    )}
                    {rec && (
                      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1">
                        <Check className="w-3 h-3 text-white" />
                        <span className="text-[10px] font-bold text-white">Imported</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-sm mb-1">{conn.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{conn.description}</p>

                <div className={`self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${conn.chipBg} ${conn.chipText} ${conn.chipBorder} mb-4`}>
                  <Sparkles className="w-2.5 h-2.5" />
                  {conn.category}
                </div>

                {rec && (
                  <p className="text-[11px] text-gray-400 mb-3">
                    Last imported <span className="font-semibold text-gray-600">{rec.count}</span> entries · {rec.date}
                  </p>
                )}

                <div className="mt-auto">
                  <button
                    onClick={() => openConnector(conn.id)}
                    className="w-full btn-electric text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {rec ? 'Import Again' : 'Import Data'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Info note */}
      <div className="glass rounded-2xl p-5 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-4 h-4 text-blue-500" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 text-sm mb-1">How these integrations work</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Synergy, IXL, Performance Matters, Canvas, PowerSchool, and Google Classroom don&apos;t offer
            public student APIs, so Study Hub uses a guided CSV import flow. You copy your data from each
            platform, paste it here, and Study Hub saves it to your Grades tracker automatically.
          </p>
        </div>
      </div>

      {/* Import modal */}
      {activeId && connector && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="glass rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-up max-h-[90vh] flex flex-col">
            {/* Modal gradient header */}
            <div className={`bg-gradient-to-r ${connector.gradient} p-5 text-white shrink-0`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                    <connector.Icon className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">{connector.name}</span>
                </div>
                <button onClick={closeModal} className="text-white/70 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Step pills */}
              <div className="flex items-center gap-1.5">
                {STEPS.map((s, i) => {
                  const currentIdx = STEPS.indexOf(step)
                  const isDone = i < currentIdx
                  const isActive = s === step
                  return (
                    <div key={s} className="flex items-center gap-1.5">
                      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                        isActive ? 'bg-white text-gray-700' : isDone ? 'bg-white/30 text-white' : 'bg-white/10 text-white/50'
                      }`}>
                        {isDone ? <Check className="w-3 h-3" /> : <span>{i + 1}</span>}
                        <span className="hidden sm:inline">{s === 'instructions' ? 'Guide' : s === 'paste' ? 'Paste' : 'Review'}</span>
                      </div>
                      {i < 2 && <div className="w-4 h-px bg-white/20" />}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Modal scrollable body */}
            <div className="p-6 overflow-y-auto scrollbar-thin flex-1">
              {step === 'instructions' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-0.5">How to export your data</h3>
                    <p className="text-xs text-gray-500">Follow these steps in {connector.name}:</p>
                  </div>
                  <ol className="space-y-3">
                    {connector.instructions.map((line, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 text-white bg-gradient-to-br ${connector.gradient}`}>
                          {i + 1}
                        </div>
                        <p className="text-sm text-gray-700 leading-snug">{line}</p>
                      </li>
                    ))}
                  </ol>
                  <div className="rounded-xl bg-gray-50 border border-gray-200 p-3">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Expected CSV format</p>
                    <pre className="text-xs text-gray-600 font-mono leading-relaxed whitespace-pre-wrap">{connector.csvTemplate}</pre>
                  </div>
                  <button
                    onClick={() => setStep('paste')}
                    className="w-full btn-electric text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 'paste' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-0.5">Paste your CSV data</h3>
                    <p className="text-xs text-gray-500">Copy from {connector.name} and paste below</p>
                  </div>

                  {connector.subjectNeeded && (
                    <div>
                      <label className="text-xs font-semibold text-gray-600 block mb-1">
                        Class / Subject Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Algebra II, AP Biology"
                        className="input-glass w-full px-4 py-2.5 rounded-xl text-sm"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">CSV Data</label>
                    <textarea
                      value={csvText}
                      onChange={(e) => setCsvText(e.target.value)}
                      rows={8}
                      placeholder={connector.csvTemplate}
                      className="input-glass w-full px-4 py-2.5 rounded-xl text-sm font-mono resize-none leading-relaxed"
                    />
                  </div>

                  <div className="flex gap-2.5">
                    <button onClick={() => setStep('instructions')} className="btn-glass px-5 py-2.5 rounded-xl text-sm font-semibold flex-1">
                      Back
                    </button>
                    <button
                      onClick={handleParse}
                      disabled={!csvText.trim() || (connector.subjectNeeded && !subject.trim())}
                      className="btn-electric text-white py-2.5 rounded-xl text-sm font-semibold flex-1 disabled:opacity-50"
                    >
                      Parse Data
                    </button>
                  </div>
                </div>
              )}

              {step === 'preview' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-0.5">Review {parsed.length} entr{parsed.length === 1 ? 'y' : 'ies'}</h3>
                    <p className="text-xs text-gray-500">These will be added to your Grades page</p>
                  </div>

                  <div className="space-y-1.5 max-h-64 overflow-y-auto scrollbar-thin pr-1">
                    {parsed.map((entry, i) => {
                      const pct = (entry.score / entry.max_score) * 100
                      const g = letterFor(pct)
                      return (
                        <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${g.bg} ${g.color}`}>
                            {g.letter}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-900 truncate">{entry.assignment_name}</p>
                            <p className="text-[10px] text-gray-400">
                              {entry.subject}{entry.category ? ` · ${entry.category}` : ''}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs font-semibold text-gray-700">{entry.score}/{entry.max_score}</p>
                            <p className="text-[10px] text-gray-400">{pct.toFixed(0)}%</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex gap-2.5">
                    <button onClick={() => setStep('paste')} className="btn-glass px-5 py-2.5 rounded-xl text-sm font-semibold flex-1">
                      Back
                    </button>
                    <button
                      onClick={handleImport}
                      disabled={importing}
                      className="btn-electric text-white py-2.5 rounded-xl text-sm font-semibold flex-1 flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      {importing ? (
                        <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Importing…</>
                      ) : (
                        <><Check className="w-3.5 h-3.5" /> Import {parsed.length} entr{parsed.length === 1 ? 'y' : 'ies'}</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
