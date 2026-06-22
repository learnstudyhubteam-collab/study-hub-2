import { StudyMode } from '@/types'
import { BookOpen, HelpCircle, Layers, PenLine } from 'lucide-react'

const modes: {
  value: StudyMode
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bg: string
  activeBg: string
}[] = [
  {
    value: 'direct',
    label: 'Direct explanation',
    description: 'Clear walkthrough, then check understanding',
    icon: BookOpen,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    activeBg: 'bg-blue-500/10 border-blue-500/30',
  },
  {
    value: 'socratic',
    label: 'Quiz / Socratic',
    description: 'Guiding questions — arrive at the answer yourself',
    icon: HelpCircle,
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    activeBg: 'bg-violet-500/10 border-violet-500/30',
  },
  {
    value: 'step_by_step',
    label: 'Step-by-step',
    description: 'Work through problems together, one step at a time',
    icon: Layers,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    activeBg: 'bg-emerald-500/10 border-emerald-500/30',
  },
  {
    value: 'feedback',
    label: 'Review my work',
    description: 'Get critique on an existing draft or answer',
    icon: PenLine,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    activeBg: 'bg-amber-500/10 border-amber-500/30',
  },
]

interface ModeSelectorProps {
  value: StudyMode
  onChange: (mode: StudyMode) => void
}

export default function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {modes.map((mode) => {
        const Icon = mode.icon
        const active = value === mode.value
        return (
          <button
            key={mode.value}
            type="button"
            onClick={() => onChange(mode.value)}
            className={`
              text-left p-3.5 rounded-2xl border-2 transition-all duration-200
              ${active
                ? `${mode.activeBg} shadow-sm`
                : 'border-white/60 glass hover:border-electric/20 hover:-translate-y-0.5'
              }
            `}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-7 h-7 rounded-xl ${active ? '' : mode.bg} flex items-center justify-center ${mode.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className={`text-sm font-semibold ${active ? 'text-gray-900' : 'text-gray-700'}`}>
                {mode.label}
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-snug pl-9">{mode.description}</p>
          </button>
        )
      })}
    </div>
  )
}
