'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Zap, BookOpen, Layers, Brain, Users, GraduationCap, ClipboardList, CalendarClock, FileText, ArrowRight, Check, X } from 'lucide-react'

const STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to Tutor AI 🎉',
    subtitle: "You're all set. Let's show you around in 30 seconds.",
  },
  {
    id: 'features',
    title: 'Everything in one place',
    subtitle: 'Here\'s what you can do:',
  },
  {
    id: 'role',
    title: 'What best describes you?',
    subtitle: 'We\'ll tailor your experience accordingly.',
  },
]

const FEATURES = [
  { icon: Brain, color: 'text-violet-500', bg: 'bg-violet-500/10', title: 'AI Tutor', desc: 'Chat through any topic, get hints, step-by-step walkthroughs.' },
  { icon: Layers, color: 'text-blue-500', bg: 'bg-blue-500/10', title: 'Flashcards + Quiz', desc: 'Create decks manually or generate them with AI. Quiz yourself.' },
  { icon: ClipboardList, color: 'text-emerald-500', bg: 'bg-emerald-500/10', title: 'Assignment Tracker', desc: 'Track deadlines, status, and priority across all subjects.' },
  { icon: CalendarClock, color: 'text-amber-500', bg: 'bg-amber-500/10', title: 'Study Schedule', desc: 'AI generates a personalised daily plan around your exam dates.' },
  { icon: FileText, color: 'text-rose-500', bg: 'bg-rose-500/10', title: 'Study Guides', desc: 'AI writes comprehensive reference guides on any topic.' },
  { icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-500/10', title: 'Study Groups', desc: 'Create or join groups and chat with classmates in real time.' },
  { icon: GraduationCap, color: 'text-teal-500', bg: 'bg-teal-500/10', title: 'Classes', desc: 'Teachers post assignments. Students join with an invite code.' },
  { icon: BookOpen, color: 'text-orange-500', bg: 'bg-orange-500/10', title: 'Grade Calculator', desc: 'Track scores, GPA, and weighted averages across subjects.' },
]

const ROLES = [
  { value: 'student', label: 'Student', emoji: '🎒', desc: 'I want to learn, track assignments, and study smarter.' },
  { value: 'teacher', label: 'Teacher', emoji: '📋', desc: 'I want to create classes and assign work to students.' },
]

interface Props {
  show: boolean
}

export default function OnboardingModal({ show }: Props) {
  const [open, setOpen] = useState(show)
  const [step, setStep] = useState(0)
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student')
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  if (!open) return null

  async function finish() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('profiles').update({ onboarding_completed: true, role: selectedRole }).eq('id', user.id)
    }
    setOpen(false)
    setSaving(false)
  }

  function dismiss() {
    // Mark completed without saving role (user can change in settings)
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) supabase.from('profiles').update({ onboarding_completed: true }).eq('id', user.id)
    })
    setOpen(false)
  }

  const isLast = step === STEPS.length - 1

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/25 backdrop-blur-sm animate-fade-up">
      <div className="glass rounded-3xl w-full max-w-lg shadow-glass-hover overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-electric-gradient transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div className="p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-bold text-gray-900 text-lg leading-snug">{STEPS[step].title}</h2>
              <p className="text-sm text-gray-500 mt-1">{STEPS[step].subtitle}</p>
            </div>
            <button onClick={dismiss} className="text-gray-300 hover:text-gray-600 transition-colors p-1 -mr-1 -mt-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step content */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="flex flex-col items-center py-4">
                <div className="w-20 h-20 rounded-3xl bg-electric-gradient flex items-center justify-center shadow-electric mb-5">
                  <Zap className="w-10 h-10 text-white" fill="white" />
                </div>
                <p className="text-center text-gray-600 text-sm leading-relaxed max-w-xs">
                  Tutor AI combines an <strong className="text-gray-900">AI tutor</strong>, <strong className="text-gray-900">flashcards</strong>, <strong className="text-gray-900">assignment tracking</strong>, and <strong className="text-gray-900">classroom tools</strong> — all in one place.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: '🤖', label: 'AI Tutor' },
                  { icon: '📚', label: 'Flashcards' },
                  { icon: '📅', label: 'Planner' },
                ].map((f) => (
                  <div key={f.label} className="glass rounded-2xl p-3 text-center">
                    <p className="text-2xl mb-1">{f.icon}</p>
                    <p className="text-xs font-semibold text-gray-700">{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {FEATURES.map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.title} className="glass rounded-2xl p-3 flex gap-2.5">
                    <div className={`w-8 h-8 rounded-xl ${f.bg} ${f.color} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 mb-0.5">{f.title}</p>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setSelectedRole(r.value as 'student' | 'teacher')}
                  className={`w-full text-left rounded-2xl p-4 border-2 transition-all ${
                    selectedRole === r.value
                      ? 'border-electric bg-electric/5'
                      : 'border-transparent glass'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{r.emoji}</span>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{r.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedRole === r.value ? 'border-electric bg-electric' : 'border-gray-200'
                    }`}>
                      {selectedRole === r.value && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                  </div>
                </button>
              ))}
              <p className="text-[11px] text-gray-400 text-center pt-1">You can change this anytime in Settings.</p>
            </div>
          )}

          {/* Footer buttons */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="glass text-gray-700 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-black/5 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={isLast ? finish : () => setStep((s) => s + 1)}
              disabled={saving}
              className="flex-1 btn-electric text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              {saving ? 'Saving…' : isLast ? (
                <><Check className="w-4 h-4" /> Get started</>
              ) : (
                <>Next <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
