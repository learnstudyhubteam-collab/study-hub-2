import { createClient } from '@/lib/supabase/server'
import { getUserSubscriptionStatus, isPro } from '@/lib/tier'
import CheckoutButton from './CheckoutButton'
import ManageButton from './ManageButton'
import { Zap, Brain, Check, Crown, Shield } from 'lucide-react'

export default async function BillingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const status = await getUserSubscriptionStatus()
  const pro = isPro(status)

  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id, subscription_status')
    .eq('id', user!.id)
    .single()

  return (
    <div className="max-w-xl mx-auto space-y-7 animate-fade-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Billing</h1>
        <p className="text-gray-500 mt-1 text-sm">Manage your plan and subscription.</p>
      </div>

      {/* Current plan card */}
      <div className={`rounded-3xl p-6 relative overflow-hidden ${
        pro
          ? 'bg-electric-gradient shadow-electric-xl text-white'
          : 'glass shadow-glass'
      }`}>
        {pro && <div className="absolute inset-0 bg-glass-shine pointer-events-none" />}
        <div className="relative flex items-start justify-between">
          <div>
            <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${pro ? 'text-blue-200' : 'text-gray-400'}`}>
              Current plan
            </p>
            <p className={`text-2xl font-extrabold ${pro ? 'text-white' : 'text-gray-900'}`}>
              {pro ? 'Study Hub Pro' : 'Free'}
            </p>
            {pro && <p className="text-blue-200 text-sm mt-1">$15 / month</p>}
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            pro ? 'bg-white/20' : 'bg-electric/10'
          }`}>
            {pro ? (
              <Crown className="w-6 h-6 text-white" />
            ) : (
              <Zap className="w-6 h-6 text-electric" />
            )}
          </div>
        </div>

        {/* AI model info */}
        <div className={`mt-4 rounded-2xl p-3 flex items-center gap-3 ${
          pro ? 'bg-white/15' : 'glass-blue'
        }`}>
          <Brain className={`w-5 h-5 shrink-0 ${pro ? 'text-blue-200' : 'text-electric'}`} />
          <div>
            <p className={`text-sm font-bold ${pro ? 'text-white' : 'text-gray-900'}`}>
              {pro ? 'Claude Sonnet' : 'Claude Haiku'}
            </p>
            <p className={`text-xs ${pro ? 'text-blue-200' : 'text-gray-500'}`}>
              {pro ? 'Most capable model — deeper reasoning, richer explanations' : 'Fast, capable standard model'}
            </p>
          </div>
        </div>

        {pro && profile?.stripe_customer_id && (
          <div className="relative mt-4">
            <ManageButton />
          </div>
        )}
      </div>

      {/* Upgrade section (free users only) */}
      {!pro && (
        <div className="space-y-5">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-electric" />
            Upgrade to Pro
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Free */}
            <div className="glass rounded-2xl p-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Free</p>
              <p className="text-2xl font-extrabold text-gray-900 mb-1">$0</p>
              <p className="text-xs text-gray-400 mb-4">forever</p>
              <div className="glass rounded-xl p-2.5 mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-700">Claude Haiku</p>
                  <p className="text-xs text-gray-400">Standard model</p>
                </div>
              </div>
              <ul className="space-y-2">
                {['Unlimited sessions', 'Flashcard creation', 'All study modes', 'AI card generation'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <Check className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div className="bg-electric-gradient rounded-2xl p-5 relative overflow-hidden shadow-electric-lg text-white">
              <div className="absolute inset-0 bg-glass-shine pointer-events-none" />
              <div className="relative">
                <p className="text-xs font-bold text-blue-200 uppercase tracking-wide mb-2">Pro</p>
                <p className="text-2xl font-extrabold mb-1">$15</p>
                <p className="text-xs text-blue-200 mb-4">per month</p>
                <div className="bg-white/20 rounded-xl p-2.5 mb-4 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-200 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-white">Claude Sonnet</p>
                    <p className="text-xs text-blue-200">Advanced model</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {['Everything in Free', 'Advanced AI model', 'Deeper explanations', 'Priority support'].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-white">
                      <Check className="w-3.5 h-3.5 text-blue-200 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <CheckoutButton />

          <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            Cancel anytime · Secure payment via Stripe
          </p>
        </div>
      )}
    </div>
  )
}
