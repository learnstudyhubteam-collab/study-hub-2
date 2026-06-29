import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getUserPlan } from '@/lib/tier'
import Sidebar from '@/components/layout/sidebar'
import OnboardingModal from '@/components/onboarding/OnboardingModal'
import ToastContainer from '@/components/ui/ToastContainer'
import CommandPalette from '@/components/ui/CommandPalette'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [plan, { data: profile }] = await Promise.all([
    getUserPlan(),
    supabase.from('profiles').select('onboarding_completed, role').eq('id', user.id).single(),
  ])

  const needsOnboarding = !profile?.onboarding_completed
  const role = (profile?.role ?? 'student') as 'student' | 'teacher' | 'admin'

  return (
    <div className="min-h-screen flex">
      <Sidebar plan={plan} role={role} />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-4 sm:px-6 py-8 max-w-5xl w-full mx-auto pb-24 lg:pb-8">
          {children}
        </main>
      </div>
      <OnboardingModal show={needsOnboarding} />
      <ToastContainer />
      <CommandPalette />
    </div>
  )
}
