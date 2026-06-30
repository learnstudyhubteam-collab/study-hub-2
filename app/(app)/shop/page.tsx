import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import RubyShop from '@/components/learn/RubyShop'
import { Gem, Flame } from 'lucide-react'
import ScrollReveal from '@/components/ui/scroll-reveal'

export const dynamic = 'force-dynamic'

export default async function ShopPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('rubies, streak_freeze_count, full_name')
    .eq('id', user.id)
    .single()

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <ScrollReveal>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Gem className="w-4 h-4 text-red-500" />
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Ruby Shop</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Spend Your Rubies</h1>
          <p className="text-sm text-gray-500 mt-0.5">Earn rubies by completing lessons. Spend them to protect your streak.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <div className="flex items-center gap-4 p-5 glass rounded-2xl">
          <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
            <Gem className="w-7 h-7 text-red-500" />
          </div>
          <div>
            <p className="text-3xl font-black text-gray-900">{(profile?.rubies ?? 0).toLocaleString()}</p>
            <p className="text-sm text-gray-500">Rubies available</p>
          </div>
          <div className="ml-auto flex items-center gap-3 px-4 py-2.5 rounded-xl bg-orange-50 border border-orange-200">
            <Flame className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-lg font-bold text-orange-700">{profile?.streak_freeze_count ?? 0}</p>
              <p className="text-xs text-orange-500">Streak Freezes</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <RubyShop
          userId={user.id}
          currentRubies={profile?.rubies ?? 0}
          currentFreezes={profile?.streak_freeze_count ?? 0}
        />
      </ScrollReveal>
    </div>
  )
}
