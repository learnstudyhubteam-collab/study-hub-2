import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getUserSubscriptionStatus, isPro } from '@/lib/tier'
import Navbar from '@/components/layout/navbar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const status = await getUserSubscriptionStatus()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isPro={isPro(status)} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  )
}
