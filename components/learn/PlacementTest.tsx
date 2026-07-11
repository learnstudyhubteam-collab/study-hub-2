'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Subject, Question } from '@/lib/learn-content'
import { CheckCircle2, XCircle, ChevronLeft } from 'lucide-react'

type Props = {
  subject: Subject
  userId: string
}

function scoreToLevel(score: number): 1 | 2 | 3 {
  if (score >= 67) return 3
  if (score >= 34) return 2
  return 1
}

const levelLabels: Record<number, { label: string; desc: string; color: string }> = {
  1: { label: 'Foundations', desc: 'Start with the core concepts — build a strong base.', color: 'text-blue-600' },
  2: { label: 'Intermediate', desc: 'You have solid basics — time to level up.', color: 'text-violet-600' },
  3: { label: 'Advanced', desc: 'You know your stuff — challenge yourself with harder material.', color: 'text-emerald-600' },
}

export default function PlacementTest({ subject, userId }: Props) {
  const router = useRouter()
  const questions = subject.placementQuestions
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [saving, setSaving] = useState(false)
  const [assignedLevel, setAssignedLevel] = useState<1 | 2 | 3>(1)

  const q = questions[current]
  const isLast = current === questions.length - 1
  const isCorrect = selected === q?.correct

  async function handleFinish(finalCorrect: number) {
    const score = Math.round((finalCorrect / questions.length) * 100)
    const level = scoreToLevel(score)
    setAssignedLevel(level)
    setFinished(true)
    setSaving(true)

    const supabase = createClient()
    await supabase.from('learn_progress').upsert(
      {
        user_id: userId,
        subject: subject.id,
        level,
        placement_done: true,
        xp: 0,
        lessons_completed: 0,
      },
      { onConflict: 'user_id,subject' }
    )
    await supabase.from('study_activities').upsert(
      { user_id: userId, activity_date: new Date().toISOString().split('T')[0] },
      { onConflict: 'user_id,activity_date' }
    )
    setSaving(false)
  }

  function handleCheck() {
    if (selected === null) return
    setChecked(true)
  }

  function handleNext() {
    const nowCorrect = correctCount + (isCorrect ? 1 : 0)
    if (isLast) {
      handleFinish(nowCorrect)
    } else {
      setCorrectCount(nowCorrect)
      setCurrent((c) => c + 1)
      setSelected(null)
      setChecked(false)
    }
  }

  if (finished) {
    const info = levelLabels[assignedLevel]
    return (
      <div className="max-w-lg mx-auto py-12 text-center space-y-6">
        <div className="text-6xl">🎯</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Placement Complete!</h2>
          <p className="text-gray-500 mt-1">{subject.label}</p>
        </div>
        <div className="glass rounded-2xl p-6 space-y-3">
          <p className="text-sm text-gray-500">Your level</p>
          <p className={`text-3xl font-black ${info.color}`}>{info.label}</p>
          <p className="text-sm text-gray-600">{info.desc}</p>
        </div>
        <button
          disabled={saving}
          onClick={() => router.push(`/learn/${subject.id}`)}
          className="px-8 py-3 rounded-xl bg-electric text-white font-semibold hover:bg-electric/90 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving…' : `Start ${subject.label} Lessons →`}
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push(`/learn/${subject.id}`)}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-gray-400 font-medium">{subject.label} · Placement Test</p>
          <div className="mt-1.5 h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-electric transition-all duration-500"
              style={{ width: `${(current / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <span className="text-xs text-gray-400 font-medium">{current + 1}/{questions.length}</span>
      </div>

      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 uppercase tracking-wide">
            Placement
          </span>
          <span className="text-xs text-gray-400">Question {current + 1}</span>
        </div>

        <h2 className="text-lg font-bold text-gray-900 leading-snug">{q.question}</h2>

        <div className="space-y-2.5">
          {q.choices.map((choice, idx) => {
            let cls = 'border border-gray-200 bg-white text-gray-800 hover:border-electric hover:bg-electric/5'
            if (checked) {
              if (idx === q.correct) cls = 'border-2 border-emerald-500 bg-emerald-50 text-emerald-800'
              else if (idx === selected && idx !== q.correct) cls = 'border-2 border-red-400 bg-red-50 text-red-700'
              else cls = 'border border-gray-100 bg-gray-50 text-gray-400'
            } else if (selected === idx) {
              cls = 'border-2 border-electric bg-electric/10 text-electric'
            }
            return (
              <button
                key={idx}
                onClick={() => !checked && setSelected(idx)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${cls} flex items-center gap-3`}
              >
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs shrink-0 font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                {choice}
                {checked && idx === q.correct && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto shrink-0" />}
                {checked && idx === selected && idx !== q.correct && <XCircle className="w-4 h-4 text-red-400 ml-auto shrink-0" />}
              </button>
            )
          })}
        </div>

        {checked && (
          <div className={`rounded-xl p-4 text-sm ${isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
            <p className="font-semibold mb-1">{isCorrect ? '✓ Correct!' : '✗ Not quite'}</p>
            <p>{q.explanation}</p>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        {!checked ? (
          <button
            onClick={handleCheck}
            disabled={selected === null}
            className="px-8 py-2.5 rounded-xl bg-electric text-white text-sm font-semibold disabled:opacity-40 hover:bg-electric/90 transition-colors"
          >
            Check
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-2.5 rounded-xl bg-electric text-white text-sm font-semibold hover:bg-electric/90 transition-colors"
          >
            {isLast ? 'See Results' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  )
}
