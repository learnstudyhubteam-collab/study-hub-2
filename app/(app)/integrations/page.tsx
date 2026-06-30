'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from '@/lib/toast'
import {
  Link2, X, Upload, Check, ChevronRight, RefreshCw,
  Sparkles, Info, GraduationCap, BarChart2, Zap, BookOpen, School, Globe2,
  Users, Monitor, Layout, Brain, FlipHorizontal, MessageSquare, AlertTriangle, Trash2,
} from 'lucide-react'

type ConnectorId =
  | 'synergy' | 'ixl' | 'performance_matters'
  | 'canvas' | 'powerschool' | 'google_classroom'
  | 'schoology' | 'teams' | 'blackboard'
  | 'khan_academy' | 'quizlet' | 'edmodo'

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

interface ImportRecord {
  count: number
  date: string
}

const CONNECTORS: Connector[] = [
  {
    id: 'synergy',
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
    csvTemplate: `Assignment,Category,Score,Out Of\nHomework 1,Homework,95,100\nQuiz 1,Quiz,18,20\nMidterm Exam,Test,84,100`,
    instructions: [
      'Log in to your StudentVue portal at your school district\'s website.',
      'Go to Grade Book and select the class you want to import.',
      'Click "Export" (or manually copy the assignment rows to a spreadsheet).',
      'Save as CSV with columns: Assignment, Category, Score, Out Of',
      'Paste that CSV below on the next step.',
    ],
  },
  {
    id: 'ixl',
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
    csvTemplate: `Skill,Domain,Score\nAddition within 20,Math,87\nReading comprehension,Language Arts,92\nFractions,Math,78`,
    instructions: [
      'Open IXL and navigate to your skill list for any subject.',
      'Find the SmartScore (0–100) for each skill you want to import.',
      'For each skill, note the Skill name, Domain (subject), and your SmartScore.',
      'Paste the data in CSV format on the next step (Skill, Domain, Score).',
    ],
  },
  {
    id: 'performance_matters',
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
    csvTemplate: `Test Name,Subject,Score,Possible Score\nUnit 1 Benchmark,Math,42,50\nReading Assessment,ELA,38,45`,
    instructions: [
      'Log into Performance Matters with your school credentials.',
      'Navigate to "My Results" or "Assessment History".',
      'View each test result and note the Test Name, Subject, your Score, and Possible Score.',
      'Paste in CSV format on the next step (Test Name, Subject, Score, Possible Score).',
    ],
  },
  {
    id: 'canvas',
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
    csvTemplate: `Course,Assignment,Score,Points Possible\nAP Biology,Cell Division Quiz,47,50\nAP Biology,Lab Report 1,92,100`,
    instructions: [
      'Log into Canvas at your school\'s URL.',
      'Click on the course you want to import.',
      'Go to Grades and click the "Export" button (CSV).',
      'Open the CSV, keep the Course, Assignment, Score, and Points Possible columns.',
      'Paste the cleaned CSV on the next step.',
    ],
  },
  {
    id: 'powerschool',
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
    csvTemplate: `Class,Assignment,Score,Total Points\nEnglish 10,Essay Draft 1,87,100\nPre-Calc,Chapter 5 Test,76,100`,
    instructions: [
      'Log into your PowerSchool Student portal.',
      'Navigate to Grades & Attendance.',
      'Click on a class to see assignments.',
      'Copy assignment rows to a spreadsheet: Class, Assignment, Score, Total Points.',
      'Paste the CSV on the next step.',
    ],
  },
  {
    id: 'google_classroom',
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
    csvTemplate: `Assignment,Class,Points Earned,Points Possible\nNewton\'s Laws Quiz,Physics,48,50\nPhotosynthesis Essay,Biology,90,100`,
    instructions: [
      'Open Google Classroom and navigate to your class.',
      'Click Classwork, then "View your work".',
      'Note each returned assignment: name, class, points earned, points possible.',
      'Create a CSV with those four columns.',
      'Paste it on the next step.',
    ],
  },
  {
    id: 'schoology',
    name: 'Schoology',
    shortName: 'Schoology',
    description: 'Import your grades and assignment scores from your school\'s Schoology LMS.',
    gradient: 'from-sky-500 to-blue-600',
    glow: 'shadow-sky-200',
    chipBg: 'bg-sky-50',
    chipText: 'text-sky-700',
    chipBorder: 'border-sky-200',
    category: 'Grades + Assignments',
    Icon: Layout,
    subjectNeeded: false,
    isNew: true,
    csvTemplate: `Course,Assignment,Score,Max Points\nAlgebra II,Unit 3 Quiz,88,100\nUS History,Essay #2,45,50\nBiology,Lab Report,92,100`,
    instructions: [
      'Log into Schoology at your school\'s portal.',
      'Go to Grades in the left sidebar.',
      'Click on a course to view assignment scores.',
      'Copy the assignment names, scores, and max points into a spreadsheet.',
      'Format as CSV: Course, Assignment, Score, Max Points and paste below.',
    ],
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    shortName: 'MS Teams',
    description: 'Pull returned assignment grades from Microsoft Teams for Education into your tracker.',
    gradient: 'from-violet-600 to-purple-600',
    glow: 'shadow-violet-200',
    chipBg: 'bg-violet-50',
    chipText: 'text-violet-700',
    chipBorder: 'border-violet-200',
    category: 'Grades + Assignments',
    Icon: Monitor,
    subjectNeeded: false,
    isNew: true,
    csvTemplate: `Class,Assignment,Points Earned,Points Possible\nMath 101,Chapter 4 HW,19,20\nEnglish Lit,Book Report,88,100\nChemistry,Lab Write-up,76,80`,
    instructions: [
      'Open Microsoft Teams and go to the Teams tab.',
      'Click on a class team, then go to the Assignments tab.',
      'Click "Grades" to see all returned assignments.',
      'Copy assignment names, class, points earned, and points possible.',
      'Format as CSV: Class, Assignment, Points Earned, Points Possible.',
    ],
  },
  {
    id: 'blackboard',
    name: 'Blackboard',
    shortName: 'Blackboard',
    description: 'Import assignment grades and test scores from your Blackboard course portal.',
    gradient: 'from-gray-700 to-gray-900',
    glow: 'shadow-gray-300',
    chipBg: 'bg-gray-100',
    chipText: 'text-gray-700',
    chipBorder: 'border-gray-300',
    category: 'Grades + Assignments',
    Icon: Users,
    subjectNeeded: false,
    isNew: true,
    csvTemplate: `Course,Assignment,Grade,Points Possible\nIntro to Psychology,Midterm Exam,83,100\nIntro to Psychology,Discussion Post 1,9,10\nCalculus I,Problem Set 3,47,50`,
    instructions: [
      'Log into Blackboard at your institution\'s URL.',
      'Click on a course from My Courses.',
      'Navigate to My Grades in the course menu.',
      'Copy each graded item: course name, assignment name, your grade, and points possible.',
      'Format as CSV: Course, Assignment, Grade, Points Possible.',
    ],
  },
  {
    id: 'khan_academy',
    name: 'Khan Academy',
    shortName: 'Khan Academy',
    description: 'Import your Khan Academy mastery scores and exercise progress into your grades.',
    gradient: 'from-green-600 to-teal-600',
    glow: 'shadow-green-200',
    chipBg: 'bg-green-50',
    chipText: 'text-green-700',
    chipBorder: 'border-green-200',
    category: 'Skills & Scores',
    Icon: Brain,
    subjectNeeded: false,
    isNew: true,
    csvTemplate: `Exercise,Course,Mastery\nAdding fractions,Math,85\nCell biology basics,Science,92\nPersuasive writing,English,78`,
    instructions: [
      'Log into Khan Academy and go to your profile.',
      'Click on "Progress" to view your mastery by subject.',
      'For each exercise or unit, note the Exercise name, Course, and Mastery percentage.',
      'Format as CSV: Exercise, Course, Mastery (0–100).',
      'Mastery will be recorded as a score out of 100.',
    ],
  },
  {
    id: 'quizlet',
    name: 'Quizlet',
    shortName: 'Quizlet',
    description: 'Track your Quizlet test and Learn mode scores to measure flashcard study progress.',
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'shadow-blue-200',
    chipBg: 'bg-blue-50',
    chipText: 'text-blue-700',
    chipBorder: 'border-blue-200',
    category: 'Study Scores',
    Icon: FlipHorizontal,
    subjectNeeded: false,
    isNew: true,
    csvTemplate: `Set Name,Subject,Score,Cards Total\nChapter 5 Vocab,Spanish,18,20\nCell Organelles,Biology,14,15\nCivil War Dates,History,9,10`,
    instructions: [
      'Open Quizlet and go to a set you\'ve studied.',
      'Click on your most recent Test or Learn session result.',
      'Note the Set Name, Subject (tag or folder), Score, and total Cards.',
      'Format as CSV: Set Name, Subject, Score, Cards Total.',
      'Score will be recorded as Score/Cards Total.',
    ],
  },
  {
    id: 'edmodo',
    name: 'Edmodo',
    shortName: 'Edmodo',
    description: 'Import quiz scores and assignment grades from your Edmodo class gradebook.',
    gradient: 'from-blue-700 to-indigo-700',
    glow: 'shadow-blue-200',
    chipBg: 'bg-blue-50',
    chipText: 'text-blue-700',
    chipBorder: 'border-blue-200',
    category: 'Grades + Assignments',
    Icon: MessageSquare,
    subjectNeeded: false,
    isNew: true,
    csvTemplate: `Assignment,Class,Score,Total Points\nChapter Quiz 3,Science 8,22,25\nVocab Test,English 8,47,50\nMapwork,Geography,38,40`,
    instructions: [
      'Log into Edmodo and navigate to your class.',
      'Click on the Gradebook tab.',
      'Review your returned assignments and quiz scores.',
      'Copy each: Assignment name, Class, your Score, and Total Points.',
      'Format as CSV: Assignment, Class, Score, Total Points.',
    ],
  },
]

// ── Parsers ──────────────────────────────────────────────────────────────────

function parseCsv(text: string): string[][] {
  return text.trim().split('\n').filter((l) => l.trim()).map((l) =>
    l.split(',').map((s) => s.trim().replace(/^"|"$/g, ''))
  )
}

function parseSynergy(text: string, subject: string): ParsedEntry[] {
  const rows = parseCsv(text)
  const start = rows[0]?.[0]?.toLowerCase().includes('assignment') ? 1 : 0
  return rows.slice(start).flatMap((cols) => {
    if (cols.length < 4) return []
    const [name, category, scoreStr, outOfStr] = cols
    const score = parseFloat(scoreStr), max = parseFloat(outOfStr)
    if (!name || isNaN(score) || isNaN(max) || max === 0) return []
    return [{ assignment_name: name, subject, score, max_score: max, category: category || undefined }]
  })
}

function parseIXL(text: string): ParsedEntry[] {
  const rows = parseCsv(text)
  const start = rows[0]?.[0]?.toLowerCase().includes('skill') ? 1 : 0
  return rows.slice(start).flatMap((cols) => {
    if (cols.length < 3) return []
    const [skill, domain, scoreStr] = cols
    const score = parseFloat(scoreStr)
    if (!skill || isNaN(score)) return []
    return [{ assignment_name: skill, subject: domain || 'IXL', score, max_score: 100 }]
  })
}

function parsePM(text: string): ParsedEntry[] {
  const rows = parseCsv(text)
  const start = rows[0]?.[0]?.toLowerCase().includes('test') ? 1 : 0
  return rows.slice(start).flatMap((cols) => {
    if (cols.length < 4) return []
    const [name, subj, scoreStr, possibleStr] = cols
    const score = parseFloat(scoreStr), max = parseFloat(possibleStr)
    if (!name || isNaN(score) || isNaN(max) || max === 0) return []
    return [{ assignment_name: name, subject: subj || 'Assessment', score, max_score: max }]
  })
}

function parseCanvas(text: string): ParsedEntry[] {
  const rows = parseCsv(text)
  const start = rows[0]?.[0]?.toLowerCase().includes('course') ? 1 : 0
  return rows.slice(start).flatMap((cols) => {
    if (cols.length < 4) return []
    const [course, name, scoreStr, possibleStr] = cols
    const score = parseFloat(scoreStr), max = parseFloat(possibleStr)
    if (!name || isNaN(score) || isNaN(max) || max === 0) return []
    const subject = course.trim() || null
    if (!subject) return []
    return [{ assignment_name: name, subject, score, max_score: max }]
  })
}

function parsePowerSchool(text: string): ParsedEntry[] {
  const rows = parseCsv(text)
  const start = rows[0]?.[0]?.toLowerCase().includes('class') ? 1 : 0
  return rows.slice(start).flatMap((cols) => {
    if (cols.length < 4) return []
    const [cls, name, scoreStr, totalStr] = cols
    const score = parseFloat(scoreStr), max = parseFloat(totalStr)
    if (!name || isNaN(score) || isNaN(max) || max === 0) return []
    const subject = cls.trim() || null
    if (!subject) return []
    return [{ assignment_name: name, subject, score, max_score: max }]
  })
}

function parseGoogleClassroom(text: string): ParsedEntry[] {
  const rows = parseCsv(text)
  const start = rows[0]?.[0]?.toLowerCase().includes('assignment') ? 1 : 0
  return rows.slice(start).flatMap((cols) => {
    if (cols.length < 4) return []
    const [name, cls, scoreStr, possibleStr] = cols
    const score = parseFloat(scoreStr), max = parseFloat(possibleStr)
    if (!name || isNaN(score) || isNaN(max) || max === 0) return []
    const subject = cls.trim() || null
    if (!subject) return []
    return [{ assignment_name: name, subject, score, max_score: max }]
  })
}

function parseSchooogy(text: string): ParsedEntry[] {
  const rows = parseCsv(text)
  const start = rows[0]?.[0]?.toLowerCase().includes('course') ? 1 : 0
  return rows.slice(start).flatMap((cols) => {
    if (cols.length < 4) return []
    const [course, name, scoreStr, maxStr] = cols
    const score = parseFloat(scoreStr), max = parseFloat(maxStr)
    if (!name || isNaN(score) || isNaN(max) || max === 0) return []
    const subject = course.trim() || null
    if (!subject) return []
    return [{ assignment_name: name, subject, score, max_score: max }]
  })
}

function parseTeams(text: string): ParsedEntry[] {
  const rows = parseCsv(text)
  const start = rows[0]?.[0]?.toLowerCase().includes('class') ? 1 : 0
  return rows.slice(start).flatMap((cols) => {
    if (cols.length < 4) return []
    const [cls, name, scoreStr, possibleStr] = cols
    const score = parseFloat(scoreStr), max = parseFloat(possibleStr)
    if (!name || isNaN(score) || isNaN(max) || max === 0) return []
    const subject = cls.trim() || null
    if (!subject) return []
    return [{ assignment_name: name, subject, score, max_score: max }]
  })
}

function parseBlackboard(text: string): ParsedEntry[] {
  const rows = parseCsv(text)
  const start = rows[0]?.[0]?.toLowerCase().includes('course') ? 1 : 0
  return rows.slice(start).flatMap((cols) => {
    if (cols.length < 4) return []
    const [course, name, gradeStr, possibleStr] = cols
    const score = parseFloat(gradeStr), max = parseFloat(possibleStr)
    if (!name || isNaN(score) || isNaN(max) || max === 0) return []
    const subject = course.trim() || null
    if (!subject) return []
    return [{ assignment_name: name, subject, score, max_score: max }]
  })
}

function parseKhanAcademy(text: string): ParsedEntry[] {
  const rows = parseCsv(text)
  const start = rows[0]?.[0]?.toLowerCase().includes('exercise') ? 1 : 0
  return rows.slice(start).flatMap((cols) => {
    if (cols.length < 3) return []
    const [exercise, course, masteryStr] = cols
    const score = parseFloat(masteryStr)
    if (!exercise || isNaN(score)) return []
    return [{ assignment_name: exercise, subject: course || 'Khan Academy', score, max_score: 100 }]
  })
}

function parseQuizlet(text: string): ParsedEntry[] {
  const rows = parseCsv(text)
  const start = rows[0]?.[0]?.toLowerCase().includes('set') ? 1 : 0
  return rows.slice(start).flatMap((cols) => {
    if (cols.length < 4) return []
    const [setName, subject, scoreStr, totalStr] = cols
    const score = parseFloat(scoreStr), max = parseFloat(totalStr)
    if (!setName || isNaN(score) || isNaN(max) || max === 0) return []
    return [{ assignment_name: setName, subject: subject || 'Quizlet', score, max_score: max }]
  })
}

function parseEdmodo(text: string): ParsedEntry[] {
  const rows = parseCsv(text)
  const start = rows[0]?.[0]?.toLowerCase().includes('assignment') ? 1 : 0
  return rows.slice(start).flatMap((cols) => {
    if (cols.length < 4) return []
    const [name, cls, scoreStr, totalStr] = cols
    const score = parseFloat(scoreStr), max = parseFloat(totalStr)
    if (!name || isNaN(score) || isNaN(max) || max === 0) return []
    const subject = cls.trim() || null
    if (!subject) return []
    return [{ assignment_name: name, subject, score, max_score: max }]
  })
}

function runParser(id: ConnectorId, text: string, subject: string): ParsedEntry[] {
  switch (id) {
    case 'synergy': return parseSynergy(text, subject)
    case 'ixl': return parseIXL(text)
    case 'performance_matters': return parsePM(text)
    case 'canvas': return parseCanvas(text)
    case 'powerschool': return parsePowerSchool(text)
    case 'google_classroom': return parseGoogleClassroom(text)
    case 'schoology': return parseSchooogy(text)
    case 'teams': return parseTeams(text)
    case 'blackboard': return parseBlackboard(text)
    case 'khan_academy': return parseKhanAcademy(text)
    case 'quizlet': return parseQuizlet(text)
    case 'edmodo': return parseEdmodo(text)
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const HISTORY_KEY = 'tutor_ai_import_history'

function loadHistory(): Partial<Record<ConnectorId, ImportRecord>> {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function saveHistory(h: Partial<Record<ConnectorId, ImportRecord>>) {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h)) } catch { /* ignore */ }
}

function letterFor(pct: number) {
  if (pct >= 90) return { letter: 'A', color: 'text-emerald-600', bg: 'bg-emerald-100' }
  if (pct >= 80) return { letter: 'B', color: 'text-blue-600', bg: 'bg-blue-100' }
  if (pct >= 70) return { letter: 'C', color: 'text-amber-600', bg: 'bg-amber-100' }
  if (pct >= 60) return { letter: 'D', color: 'text-orange-600', bg: 'bg-orange-100' }
  return { letter: 'F', color: 'text-red-600', bg: 'bg-red-100' }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function IntegrationsPage() {
  const [activeId, setActiveId] = useState<ConnectorId | null>(null)
  const [step, setStep] = useState<ModalStep>('instructions')
  const [csvText, setCsvText] = useState('')
  const [subject, setSubject] = useState('')
  const [parsed, setParsed] = useState<ParsedEntry[]>([])
  const [duplicates, setDuplicates] = useState<Set<string>>(new Set())
  const [importing, setImporting] = useState(false)
  const [history, setHistory] = useState<Partial<Record<ConnectorId, ImportRecord>>>({})

  useEffect(() => { setHistory(loadHistory()) }, [])

  const supabase = createClient()
  const connector = CONNECTORS.find((c) => c.id === activeId)

  function openConnector(id: ConnectorId) {
    setActiveId(id)
    setStep('instructions')
    setCsvText('')
    setParsed([])
    setDuplicates(new Set())
    setSubject('')
  }

  function closeModal() {
    setActiveId(null)
    setCsvText('')
    setParsed([])
    setDuplicates(new Set())
    setSubject('')
  }

  async function handleParse() {
    if (!connector || !csvText.trim()) return
    const entries = runParser(connector.id, csvText, subject || 'General')
    if (entries.length === 0) {
      toast('No valid entries found — double-check the format.', 'error')
      return
    }

    // Duplicate detection: fetch existing assignment names for this user
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const names = entries.map((e) => e.assignment_name)
      const { data: existing } = await supabase
        .from('grade_entries')
        .select('assignment_name, subject')
        .eq('user_id', user.id)
        .in('assignment_name', names)
      const dupSet = new Set<string>(
        (existing ?? []).map((r) => `${r.assignment_name}||${r.subject}`)
      )
      setDuplicates(dupSet)
    }

    setParsed(entries)
    setStep('preview')
  }

  async function handleImport(skipDupes: boolean) {
    if (!parsed.length || !activeId) return
    setImporting(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setImporting(false); return }

    const rows = parsed
      .filter((p) => skipDupes ? !duplicates.has(`${p.assignment_name}||${p.subject}`) : true)
      .map((p) => ({
        user_id: user.id,
        subject: p.subject,
        assignment_name: p.assignment_name,
        score: p.score,
        max_score: p.max_score,
        weight: 1,
        category: p.category ?? null,
      }))

    if (rows.length === 0) {
      toast('All entries already exist — nothing new to import.', 'error')
      setImporting(false)
      return
    }

    const { error } = await supabase.from('grade_entries').insert(rows)
    setImporting(false)
    if (error) { toast('Import failed: ' + error.message, 'error'); return }

    const newHistory = { ...history, [activeId]: { count: rows.length, date: new Date().toLocaleDateString() } }
    setHistory(newHistory)
    saveHistory(newHistory)
    toast(`Imported ${rows.length} grade entr${rows.length === 1 ? 'y' : 'ies'} from ${connector?.shortName}!`, 'success')
    closeModal()
  }

  function clearHistory(id: ConnectorId) {
    const newHistory = { ...history }
    delete newHistory[id]
    setHistory(newHistory)
    saveHistory(newHistory)
  }

  const STEPS: ModalStep[] = ['instructions', 'paste', 'preview']
  const dupCount = parsed.filter((p) => duplicates.has(`${p.assignment_name}||${p.subject}`)).length
  const newCount = parsed.length - dupCount

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-7 text-white shadow-2xl">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-pink-400/20 blur-2xl" />
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
              Import grades from 12 platforms — Synergy, Canvas, PowerSchool, Google Classroom, Schoology, Teams, Blackboard, Khan Academy, Quizlet, and more.
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1.5 mt-2 shrink-0 max-h-64 overflow-y-auto">
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
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] text-gray-400">
                      Last: <span className="font-semibold text-gray-600">{rec.count}</span> entries · {rec.date}
                    </p>
                    <button
                      onClick={() => clearHistory(conn.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                      title="Clear import history"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
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
            None of these platforms offer public student APIs, so Tutor AI uses a guided CSV import flow.
            You copy your data from each platform, paste it here, and Tutor AI saves it to your Grades tracker automatically.
            Duplicate entries are detected automatically — you can skip or overwrite them at import time.
            Import history is saved in your browser so you always know what&apos;s been imported.
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

                  {dupCount > 0 && (
                    <div className="flex items-start gap-2.5 rounded-xl bg-amber-50 border border-amber-200 p-3">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700">
                        <span className="font-semibold">{dupCount} duplicate{dupCount !== 1 ? 's' : ''} detected</span> — entries with the same name already exist in your grades. You can skip them or import anyway.
                      </p>
                    </div>
                  )}

                  <div className="space-y-1.5 max-h-56 overflow-y-auto scrollbar-thin pr-1">
                    {parsed.map((entry, i) => {
                      const pct = (entry.score / entry.max_score) * 100
                      const g = letterFor(pct)
                      const isDup = duplicates.has(`${entry.assignment_name}||${entry.subject}`)
                      return (
                        <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${isDup ? 'bg-amber-50 border-amber-200 opacity-70' : 'bg-gray-50 border-gray-100'}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${g.bg} ${g.color}`}>
                            {g.letter}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-900 truncate">{entry.assignment_name}</p>
                            <p className="text-[10px] text-gray-400">
                              {entry.subject}{entry.category ? ` · ${entry.category}` : ''}{isDup ? ' · duplicate' : ''}
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
                    {dupCount > 0 ? (
                      <div className="flex flex-col gap-2 flex-1">
                        <button
                          onClick={() => handleImport(true)}
                          disabled={importing || newCount === 0}
                          className="btn-electric text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50"
                        >
                          {importing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                          Import {newCount} new only
                        </button>
                        <button
                          onClick={() => handleImport(false)}
                          disabled={importing}
                          className="btn-glass py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50 text-gray-500"
                        >
                          Import all {parsed.length} (include duplicates)
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleImport(false)}
                        disabled={importing}
                        className="btn-electric text-white py-2.5 rounded-xl text-sm font-semibold flex-1 flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        {importing ? (
                          <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Importing…</>
                        ) : (
                          <><Check className="w-3.5 h-3.5" /> Import {parsed.length} entr{parsed.length === 1 ? 'y' : 'ies'}</>
                        )}
                      </button>
                    )}
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
