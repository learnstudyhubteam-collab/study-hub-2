import { createClient } from '@/lib/supabase/server'
import { getUserSubscriptionStatus, isPro } from '@/lib/tier'
import Card from '@/components/ui/card'
import CheckoutButton from './CheckoutButton'
import ManageButton from './ManageButton'

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
    <div className="max-w-xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-500 mt-1">Manage your subscription.</p>
      </div>

      {/* Current plan */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Current plan</p>
            <p className="text-xl font-bold text-gray-900">{pro ? 'Study Hub Pro' : 'Free'}</p>
            {pro && <p className="text-sm text-brand-600 mt-1">$15 / month</p>}
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${pro ? 'bg-brand-50' : 'bg-gray-100'}`}>
            {pro ? '⭐' : '🆓'}
          </div>
        </div>
        {pro && profile?.stripe_customer_id && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <ManageButton />
          </div>
        )}
      </Card>

      {/* Plans comparison */}
      {!pro && (
        <div className="space-y-4">
          <h2 className="font-semibold text-gray-900">Upgrade to Pro</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Free */}
            <Card>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Free</p>
              <p className="text-2xl font-bold text-gray-900 mb-4">$0</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span>✓</span> Standard AI model</li>
                <li className="flex gap-2"><span>✓</span> Unlimited sessions</li>
                <li className="flex gap-2"><span>✓</span> Flashcards</li>
                <li className="flex gap-2"><span>✓</span> All study modes</li>
              </ul>
            </Card>
            {/* Pro */}
            <Card className="border-2 border-brand-500">
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-2">Pro</p>
              <p className="text-2xl font-bold text-gray-900 mb-4">$15<span className="text-sm font-normal text-gray-500">/mo</span></p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-brand-600">✓</span> <strong>Advanced AI model</strong></li>
                <li className="flex gap-2"><span className="text-brand-600">✓</span> Everything in Free</li>
                <li className="flex gap-2"><span className="text-brand-600">✓</span> Ad-free (when ads launch)</li>
                <li className="flex gap-2"><span className="text-brand-600">✓</span> Priority support</li>
              </ul>
            </Card>
          </div>
          <CheckoutButton />
        </div>
      )}
    </div>
  )
}
