import { createClient } from '@/lib/supabase/server'
import { getUserSubscriptionStatus, getUserPlan } from '@/lib/tier'
import CheckoutButton from './CheckoutButton'
import ManageButton from './ManageButton'
import { Zap, Brain, Check, Crown, Shield, Sparkles, X } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const status = await getUserSubscriptionStatus()
  const plan = await getUserPlan()

  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id, subscription_status, subscription_plan')
    .eq('id', user!.id)
    .single()

  const isActive = status === 'active'
  const currentPlan = isActive ? plan : 'free'

  const planDetails = {
    free: { name: 'Free', price: '$0', period: 'forever', color: 'text-gray-900', bg: 'glass' },
    plus: { name: 'Plus', price: '$8', period: 'per month', color: 'text-violet-600', bg: 'bg-violet-500/8' },
    pro: { name: 'Pro', price: '$15', period: 'per month', color: 'text-electric', bg: 'bg-electric/8' },
  }

  const current = planDetails[currentPlan]

  return (
    <div className="max-w-3xl mx-auto space-y-7 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Billing</h1>
        <p className="text-gray-500 mt-1 text-sm">Manage your plan and subscription.</p>
      </div>

      {/* Current plan */}
      <div className={`rounded-3xl p-6 relative overflow-hidden ${
        currentPlan === 'pro'
          ? 'bg-electric-gradient shadow-electric-xl text-white'
          : currentPlan === 'plus'
          ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg text-white'
          : 'glass shadow-glass'
      }`}>
        {(currentPlan === 'pro' || currentPlan === 'plus') && (
          <div className="absolute inset-0 bg-glass-shine pointer-events-none" />
        )}
        <div className="relative flex items-start justify-between">
          <div>
            <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isActive ? 'text-white/60' : 'text-gray-400'}`}>
              Current plan
            </p>
            <p className={`text-2xl font-extrabold ${isActive ? 'text-white' : 'text-gray-900'}`}>
              Study Hub {current.name}
            </p>
            {isActive && <p className="text-white/70 text-sm mt-1">{current.price} / month</p>}
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-electric/10'}`}>
            {currentPlan === 'pro' ? (
              <Crown className="w-6 h-6 text-white" />
            ) : currentPlan === 'plus' ? (
              <Sparkles className="w-6 h-6 text-white" />
            ) : (
              <Zap className="w-6 h-6 text-electric" />
            )}
          </div>
        </div>

        <div className={`mt-4 rounded-2xl p-3 flex items-center gap-3 ${isActive ? 'bg-white/15' : 'glass-blue'}`}>
          <Brain className={`w-5 h-5 shrink-0 ${isActive ? 'text-white/80' : 'text-electric'}`} />
          <div>
            <p className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-900'}`}>
              {currentPlan === 'pro' ? 'Claude Sonnet' : 'Claude Haiku'}
            </p>
            <p className={`text-xs ${isActive ? 'text-white/60' : 'text-gray-500'}`}>
              {currentPlan === 'pro'
                ? 'Most capable model — deeper reasoning, richer explanations'
                : currentPlan === 'plus'
                ? 'Fast, capable model — unlimited access'
                : 'Fast, capable model — 5 sessions/month'}
            </p>
          </div>
        </div>

        {isActive && profile?.stripe_customer_id && (
          <div className="relative mt-4">
            <ManageButton />
          </div>
        )}
      </div>

      {/* Plans comparison */}
      {!isActive && (
        <div className="space-y-5">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-electric" />
            Choose a plan
          </h2>

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
                  { text: '2 flashcard decks', ok: true },
                  { text: 'Assignment & grade tracker', ok: true },
                  { text: 'Classes & study groups', ok: true },
                  { text: 'AI flashcard generation', ok: false },
                  { text: 'AI study guides', ok: false },
                  { text: 'AI study schedule', ok: false },
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
              <p className="text-2xl font-extrabold text-gray-900">$8</p>
              <p className="text-xs text-gray-400 mb-4">per month</p>
              <div className="bg-violet-500/10 rounded-xl p-2.5 mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-violet-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-800">Claude Haiku</p>
                  <p className="text-xs text-violet-500">Unlimited access</p>
                </div>
              </div>
              <ul className="space-y-2 flex-1">
                {[
                  'Unlimited AI sessions',
                  'Unlimited flashcard decks',
                  'AI flashcard generation',
                  'AI study guides',
                  'AI study schedule',
                  'All tracker features',
                  'Classes & study groups',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <Check className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <CheckoutButton
                plan="plus"
                label="Upgrade to Plus"
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
                <p className="text-2xl font-extrabold">$15</p>
                <p className="text-xs text-blue-200 mb-4">per month</p>
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
                  label="Upgrade to Pro"
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
      )}

      {/* Show upgrade option if on Plus */}
      {isActive && currentPlan === 'plus' && (
        <div className="glass rounded-2xl p-5 space-y-3">
          <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <Crown className="w-4 h-4 text-electric" /> Upgrade to Pro for Claude Sonnet
          </h2>
          <p className="text-xs text-gray-500">Get access to the most capable Claude model with deeper reasoning and richer explanations.</p>
          <CheckoutButton plan="pro" label="Upgrade to Pro — $15/month" className="btn-electric text-white" />
        </div>
      )}
    </div>
  )
}
