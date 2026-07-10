'use client'

import { useState } from 'react'
import { Zap, Brain, Check, X, Shield } from 'lucide-react'
import CheckoutButton from '@/app/(app)/billing/CheckoutButton'

export default function PlanGrid() {
  const [interval, setInterval] = useState<'month' | 'year'>('month')
  const annual = interval === 'year'

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-gray-900 flex items-center gap-2">
          <Zap className="w-4 h-4 text-electric" />
          Choose a plan
        </h2>

        {/* Monthly / Annual toggle */}
        <div className="glass rounded-xl p-1 flex items-center gap-1">
          <button
            onClick={() => setInterval('month')}
            className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all ${
              !annual ? 'btn-electric text-white' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setInterval('year')}
            className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              annual ? 'btn-electric text-white' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Annual
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
              annual ? 'bg-white/25 text-white' : 'bg-emerald-100 text-emerald-600'
            }`}>
              Save 35%+
            </span>
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {/* Free */}
        <div className="glass rounded-2xl p-5 flex flex-col">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Free</p>
          <p className="text-2xl font-extrabold text-gray-900">$0</p>
          <p className="text-xs text-gray-400 mb-4">forever</p>
          <div className="glass rounded-xl p-2.5 mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-gray-400 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-gray-700">Claude Haiku</p>
              <p className="text-xs text-gray-400">Standard model</p>
            </div>
          </div>
          <ul className="space-y-2 flex-1">
            {[
              { text: '5 AI sessions / month', ok: true },
              { text: '25 AI messages / day', ok: true },
              { text: '2 flashcard decks', ok: true },
              { text: 'Assignment & grade tracker', ok: true },
              { text: 'Classes & study groups', ok: true },
              { text: 'AI flashcard generation', ok: false },
              { text: 'AI study guides & schedules', ok: false },
            ].map((f) => (
              <li key={f.text} className="flex items-center gap-2 text-xs text-gray-500">
                {f.ok
                  ? <Check className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  : <X className="w-3.5 h-3.5 text-red-300 shrink-0" />}
                <span className={f.ok ? '' : 'opacity-50'}>{f.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 glass rounded-xl py-2.5 text-center text-xs font-semibold text-gray-400">
            Current plan
          </div>
        </div>

        {/* Plus */}
        <div className="rounded-2xl p-5 flex flex-col border-2 border-violet-400/30 bg-violet-500/5 relative">
          <p className="text-xs font-bold text-violet-500 uppercase tracking-wide mb-2">Plus</p>
          <div className="flex items-baseline gap-1.5">
            <p className="text-2xl font-extrabold text-gray-900">{annual ? '$59' : '$8'}</p>
            {annual && <p className="text-xs text-gray-400 line-through">$96</p>}
          </div>
          <p className="text-xs text-gray-400 mb-4">
            {annual ? 'per year — like $4.92/mo' : 'per month'}
          </p>
          <div className="bg-violet-500/10 rounded-xl p-2.5 mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-violet-500 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-gray-800">Claude Haiku</p>
              <p className="text-xs text-violet-500">Unlimited sessions</p>
            </div>
          </div>
          <ul className="space-y-2 flex-1">
            {[
              'Unlimited AI sessions',
              '300 AI messages / day',
              'Unlimited flashcard decks',
              'AI flashcard generation',
              'AI study guides',
              'AI study schedule',
              'All tracker features',
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                <Check className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <CheckoutButton
            plan="plus"
            interval={interval}
            label={annual ? 'Get Plus annual' : 'Upgrade to Plus'}
            className="mt-4 bg-violet-500 hover:bg-violet-600 text-white"
          />
        </div>

        {/* Pro */}
        <div className="bg-electric-gradient rounded-2xl p-5 flex flex-col relative overflow-hidden shadow-electric-lg text-white">
          <div className="absolute inset-0 bg-glass-shine pointer-events-none" />
          <div className="relative flex flex-col flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-blue-200 uppercase tracking-wide">Pro</p>
              <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">Best value</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <p className="text-2xl font-extrabold">{annual ? '$119' : '$15'}</p>
              {annual && <p className="text-xs text-blue-200 line-through">$180</p>}
            </div>
            <p className="text-xs text-blue-200 mb-4">
              {annual ? 'per year — like $9.92/mo' : 'per month'}
            </p>
            <div className="bg-white/20 rounded-xl p-2.5 mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-200 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Claude Sonnet</p>
                <p className="text-xs text-blue-200">Advanced AI model</p>
              </div>
            </div>
            <ul className="space-y-2 flex-1">
              {[
                'Everything in Plus',
                'Unlimited daily messages',
                'Claude Sonnet AI (2× smarter)',
                'Deeper explanations',
                'Complex problem solving',
                'Priority support',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-white">
                  <Check className="w-3.5 h-3.5 text-blue-200 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <CheckoutButton
              plan="pro"
              interval={interval}
              label={annual ? 'Get Pro annual' : 'Upgrade to Pro'}
              className="mt-4 bg-white text-electric hover:bg-blue-50"
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
        <Shield className="w-3.5 h-3.5" />
        Cancel anytime · Secure payment via Stripe
      </p>
    </div>
  )
}
