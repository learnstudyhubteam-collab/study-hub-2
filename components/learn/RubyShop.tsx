'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Shield, Gem, Brain } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  userId: string
  currentRubies: number
  currentFreezes: number
  currentBonusSessions: number
  isPaid: boolean
}

interface ShopItem {
  id: string
  label: string
  desc: string
  cost: number
  icon: typeof Shield
  color: string
  bg: string
  border: string
  freezeCount: number
  bonusSessions: number
  paidNote?: string
}

const ITEMS: ShopItem[] = [
  {
    id: 'streak_freeze_1',
    label: 'Streak Freeze',
    desc: 'Protects your streak for one missed day. Used automatically.',
    cost: 50,
    icon: Shield,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    freezeCount: 1,
    bonusSessions: 0,
  },
  {
    id: 'streak_freeze_3',
    label: 'Streak Freeze × 3',
    desc: 'Stock up — 3 freezes at a discount.',
    cost: 130,
    icon: Shield,
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    freezeCount: 3,
    bonusSessions: 0,
  },
  {
    id: 'bonus_ai_session',
    label: 'Bonus AI Tutor Session',
    desc: 'Permanently raises your monthly AI session allowance by +1. Stacks!',
    cost: 100,
    icon: Brain,
    color: 'text-fuchsia-500',
    bg: 'bg-fuchsia-50',
    border: 'border-fuchsia-200',
    freezeCount: 0,
    bonusSessions: 1,
    paidNote: 'Plus & Pro already have unlimited sessions',
  },
]

export default function RubyShop({ userId, currentRubies, currentFreezes, currentBonusSessions, isPaid }: Props) {
  const router = useRouter()
  const [rubies, setRubies] = useState(currentRubies)
  const [freezes, setFreezes] = useState(currentFreezes)
  const [bonusSessions, setBonusSessions] = useState(currentBonusSessions)
  const [buying, setBuying] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  async function buy(item: ShopItem) {
    if (rubies < item.cost) return
    setBuying(item.id)

    const supabase = createClient()
    const newRubies = rubies - item.cost
    const newFreezes = freezes + item.freezeCount
    const newBonus = bonusSessions + item.bonusSessions

    const { error } = await supabase
      .from('profiles')
      .update({
        rubies: newRubies,
        streak_freeze_count: newFreezes,
        bonus_ai_sessions: newBonus,
      })
      .eq('id', userId)

    if (error) {
      setToast({ msg: 'Purchase failed — try again.', ok: false })
    } else {
      setRubies(newRubies)
      setFreezes(newFreezes)
      setBonusSessions(newBonus)
      setToast({
        msg: item.bonusSessions > 0
          ? `Bought ${item.label}! You now get ${5 + newBonus} AI sessions every month.`
          : `Bought ${item.label}! You now have ${newFreezes} freeze${newFreezes !== 1 ? 's' : ''}.`,
        ok: true,
      })
      router.refresh()
    }

    setBuying(null)
    setTimeout(() => setToast(null), 3500)
  }

  return (
    <div className="space-y-4">
      {toast && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium ${toast.ok ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {toast.msg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ITEMS.map((item) => {
          const canAfford = rubies >= item.cost
          const notUseful = item.bonusSessions > 0 && isPaid
          const Icon = item.icon
          return (
            <div key={item.id} className={`glass rounded-2xl p-5 border ${item.border} space-y-4`}>
              <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{item.label}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                {item.bonusSessions > 0 && bonusSessions > 0 && !isPaid && (
                  <p className="text-[11px] text-fuchsia-600 font-semibold mt-1">
                    Your allowance: {5 + bonusSessions} sessions/month
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Gem className="w-4 h-4 text-red-500" />
                  <span className="font-bold text-gray-900">{item.cost}</span>
                  <span className="text-xs text-gray-400">rubies</span>
                </div>
                {notUseful ? (
                  <span className="text-xs text-gray-400 font-medium">{item.paidNote}</span>
                ) : (
                  <button
                    onClick={() => buy(item)}
                    disabled={!canAfford || buying === item.id}
                    className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-colors ${
                      canAfford
                        ? 'bg-electric text-white hover:bg-electric/90'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {buying === item.id ? 'Buying…' : canAfford ? 'Buy' : 'Need more rubies'}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-gray-400">
          Earn rubies by completing lessons in{' '}
          <Link href="/learn" className="text-electric font-medium hover:underline">
            Learn Mode
          </Link>
        </p>
      </div>
    </div>
  )
}
