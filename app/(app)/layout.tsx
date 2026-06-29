import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getUserPlan } from '@/lib/tier'
import Sidebar from '@/components/layout/sidebar'
import OnboardingModal from '@/components/onboarding/OnboardingModal'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [plan, { data: profile }] = await Promise.all([
    getUserPlan(),
    supabase.from('profiles').select('onboarding_completed').eq('id', user.id).single(),
  ])

  const needsOnboarding = !profile?.onboarding_completed

  return (
    <div className="min-h-screen flex">
      <Sidebar plan={plan} />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-4 sm:px-6 py-8 max-w-5xl w-full mx-auto">
          {children}
        </main>
      </div>
      <OnboardingModal show={needsOnboarding} />
    </div>
  )
}
