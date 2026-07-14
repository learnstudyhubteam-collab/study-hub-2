import { createClient } from '@/lib/supabase/server'
import { getUserSubscriptionStatus, getUserPlan } from '@/lib/tier'
import CheckoutButton from './CheckoutButton'
import ManageButton from './ManageButton'
import PlanGrid from '@/components/billing/PlanGrid'
import { Zap, Brain, Crown, Sparkles } from 'lucide-react'

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
    free: { name: 'Spark', price: '$0', period: 'forever', color: 'text-gray-900', bg: 'glass' },
    plus: { name: 'Scholar', price: '$7.99', period: 'per month', color: 'text-violet-600', bg: 'bg-violet-500/8' },
    pro: { name: 'Sage', price: '$19.99', period: 'per month', color: 'text-electric', bg: 'bg-electric/8' },
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
              Tutor AI {current.name}
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
              {currentPlan === 'pro' ? 'Sage Engine' : currentPlan === 'plus' ? 'Scholar Engine' : 'Spark Engine'}
            </p>
            <p className={`text-xs ${isActive ? 'text-white/60' : 'text-gray-500'}`}>
              {currentPlan === 'pro'
                ? 'Our most powerful AI — deepest reasoning, richest explanations'
                : currentPlan === 'plus'
                ? 'Advanced reasoning AI — unlimited sessions'
                : 'Fast everyday tutor — 5 sessions/month'}
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
      {!isActive && <PlanGrid />}

      {/* Show upgrade option if on Plus */}
      {isActive && currentPlan === 'plus' && (
        <div className="glass rounded-2xl p-5 space-y-3">
          <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <Crown className="w-4 h-4 text-electric" /> Upgrade to Sage for our most powerful AI
          </h2>
          <p className="text-xs text-gray-500">The Sage Engine gives the deepest reasoning and richest explanations — best for AP, SAT, and the hardest subjects.</p>
          <CheckoutButton plan="pro" label="Upgrade to Sage — $19.99/month" className="btn-electric text-white" />
        </div>
      )}
    </div>
  )
}
