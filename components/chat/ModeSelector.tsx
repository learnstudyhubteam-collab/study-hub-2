import { StudyMode } from '@/types'

const modes: { value: StudyMode; label: string; description: string; icon: string }[] = [
  {
    value: 'direct',
    label: 'Direct explanation',
    description: 'Clear walkthrough, then check understanding',
    icon: '📖',
  },
  {
    value: 'socratic',
    label: 'Quiz / Socratic',
    description: 'Guiding questions, arrive at the answer yourself',
    icon: '🤔',
  },
  {
    value: 'step_by_step',
    label: 'Step-by-step',
    description: 'Work through problems together, one step at a time',
    icon: '🧩',
  },
  {
    value: 'feedback',
    label: 'Review my work',
    description: 'Get critique on an existing draft or answer',
    icon: '✍️',
  },
]

interface ModeSelectorProps {
  value: StudyMode
  onChange: (mode: StudyMode) => void
}

export default function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {modes.map((mode) => (
        <button
          key={mode.value}
          type="button"
          onClick={() => onChange(mode.value)}
          className={`text-left p-3 rounded-xl border-2 transition-all ${
            value === mode.value
              ? 'border-brand-500 bg-brand-50'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{mode.icon}</span>
            <span
              className={`text-sm font-medium ${
                value === mode.value ? 'text-brand-700' : 'text-gray-800'
              }`}
            >
              {mode.label}
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-snug">{mode.description}</p>
        </button>
      ))}
    </div>
  )
}
