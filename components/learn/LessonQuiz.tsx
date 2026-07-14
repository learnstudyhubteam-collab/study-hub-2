'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Subject, Lesson } from '@/lib/learn-content'
import { CheckCircle2, XCircle, ChevronLeft, Gem, Star, Flame, RotateCcw } from 'lucide-react'

type Props = {
  subject: Subject
  lesson: Lesson
  userId: string
  alreadyCompleted: { score: number; xp_earned: number; rubies_earned: number } | null
}

export default function LessonQuiz({ subject, lesson, userId, alreadyCompleted }: Props) {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [saving, setSaving] = useState(false)
  const [rewards, setRewards] = useState<{ xp: number; rubies: number; score: number } | null>(null)

  const q = lesson.questions[current]
  const isCorrect = selected === q.correct
  const isLast = current === lesson.questions.length - 1

  function handleSelect(idx: number) {
    if (checked) return
    setSelected(idx)
  }

  function handleCheck() {
    if (selected === null) return
    setChecked(true)
    if (selected === q.correct) setCorrectCount((c) => c + 1)
  }

  async function handleNext() {
    if (isLast) {
      const finalCorrect = correctCount + (selected === q.correct ? 1 : 0)
      const score = Math.round((finalCorrect / lesson.questions.length) * 100)

      setSaving(true)
      setFinished(true)
      // Optimistic display; the server computes the authoritative rewards
      setRewards({
        xp: alreadyCompleted ? 0 : lesson.xp,
        rubies: alreadyCompleted ? 0 : (score >= 60 ? lesson.rubies : 0),
        score,
      })

      try {
        const res = await fetch('/api/learn/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subjectId: subject.id, lessonId: lesson.id, score }),
        })
        if (res.ok) {
          const data = await res.json()
          setRewards({ xp: data.xp, rubies: data.rubies, score: data.score })
        }
      } catch {
        // Rewards display stays optimistic; server will reconcile on next load
      }
      setSaving(false)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setChecked(false)
    }
  }

  if (finished && rewards) {
    const passed = rewards.score >= 60
    return (
      <div className="max-w-lg mx-auto py-12 text-center space-y-6">
        <div className="text-6xl">{passed ? '🎉' : '📚'}</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{passed ? 'Lesson Complete!' : 'Keep Practicing!'}</h2>
          <p className="text-gray-500 mt-1">{lesson.title}</p>
        </div>

        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="text-5xl font-black text-gray-900">{rewards.score}%</div>
          <p className="text-sm text-gray-500">
            {correctCount + (selected === q.correct ? 0 : 0)}/{lesson.questions.length} correct
          </p>

          {!alreadyCompleted ? (
            <div className="flex items-center justify-center gap-6 pt-2">
              {rewards.xp > 0 && (
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-500" />
                  </div>
                  <span className="text-lg font-bold text-yellow-600">+{rewards.xp}</span>
                  <span className="text-xs text-gray-400">XP</span>
                </div>
              )}
              {rewards.rubies > 0 && (
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                    <Gem className="w-6 h-6 text-red-500" />
                  </div>
                  <span className="text-lg font-bold text-red-600">+{rewards.rubies}</span>
                  <span className="text-xs text-gray-400">Rubies</span>
                </div>
              )}
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-orange-500" />
                </div>
                <span className="text-lg font-bold text-orange-600">+1</span>
                <span className="text-xs text-gray-400">Streak</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">You already completed this lesson — no rewards for replays.</p>
          )}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              setCurrent(0); setSelected(null); setChecked(false)
              setCorrectCount(0); setFinished(false); setRewards(null)
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Retry
          </button>
          <button
            onClick={() => router.push(`/learn/${subject.id}`)}
            className="px-6 py-2 rounded-xl bg-electric text-white text-sm font-semibold hover:bg-electric/90 transition-colors"
          >
            Back to {subject.label}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push(`/learn/${subject.id}`)}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-gray-400 font-medium">{subject.label} · {lesson.title}</p>
          <div className="mt-1.5 h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-electric transition-all duration-500"
              style={{ width: `${((current) / lesson.questions.length) * 100}%` }}
            />
          </div>
        </div>
        <span className="text-xs text-gray-400 font-medium">{current + 1}/{lesson.questions.length}</span>
      </div>

      {/* Question */}
      <div className="glass rounded-2xl p-6 space-y-6">
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
                onClick={() => handleSelect(idx)}
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

        {/* Explanation */}
        {checked && (
          <div className={`rounded-xl p-4 text-sm ${isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
            <p className="font-semibold mb-1">{isCorrect ? '✓ Correct!' : '✗ Not quite'}</p>
            <p>{q.explanation}</p>
          </div>
        )}
      </div>

      {/* Action button */}
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
            disabled={saving}
            className="px-8 py-2.5 rounded-xl bg-electric text-white text-sm font-semibold hover:bg-electric/90 transition-colors"
          >
            {isLast ? (saving ? 'Saving…' : 'Finish') : 'Next →'}
          </button>
        )}
      </div>
    </div>
  )
}
