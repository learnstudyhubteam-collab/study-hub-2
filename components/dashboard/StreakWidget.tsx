'use client'

import { Flame, Calendar } from 'lucide-react'

interface Day { date: string; active: boolean }

interface Props {
  streak: number
  totalDays: number
  last7: Day[]
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Returns Mon–Sun of the current week, marking active/future/today
function buildWeek(last7: { date: string; active: boolean }[]) {
  const activeSet = new Set(last7.map((d) => d.date))
  const today = new Date()
  const todayKey = today.toISOString().split('T')[0]

  // Find Monday of the current week (Mon = 1, so offset by (day - 1 + 7) % 7)
  const dayOfWeek = today.getDay() // 0=Sun…6=Sat
  const mondayOffset = (dayOfWeek + 6) % 7 // days since Monday
  const monday = new Date(today)
  monday.setDate(today.getDate() - mondayOffset)

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const key = d.toISOString().split('T')[0]
    return {
      date: key,
      active: activeSet.has(key),
      isFuture: key > todayKey,
      isToday: key === todayKey,
    }
  })
}

export default function StreakWidget({ streak, totalDays, last7 }: Props) {
  return (
    <div className="glass rounded-2xl p-5 flex flex-col gap-4">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
          <Flame className="w-4 h-4 text-orange-500" />
          Study Streak
        </h2>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Calendar className="w-3.5 h-3.5" />
          {totalDays} day{totalDays !== 1 ? 's' : ''} total
        </div>
      </div>

      {/* Streak number */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-2xl transition-all ${
            streak > 0
              ? 'bg-gradient-to-br from-orange-400 to-rose-500 text-white shadow-lg shadow-orange-200'
              : 'bg-gray-100 text-gray-400'
          }`}>
            {streak}
          </div>
          {streak >= 7 && (
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-[10px]">
              🔥
            </div>
          )}
        </div>
        <div>
          <p className="font-bold text-gray-900 text-lg leading-tight">
            {streak === 0 ? 'No streak yet' : `${streak}-day streak`}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {streak === 0
              ? 'Study today to start one!'
              : streak >= 30
              ? 'Incredible consistency! 🏆'
              : streak >= 7
              ? 'On fire! Keep it up!'
              : 'Great work, keep going!'}
          </p>
        </div>
      </div>

      {/* This week */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">This week</p>
        <div className="grid grid-cols-7 gap-1">
          {buildWeek(last7).map(({ date, active, isFuture, isToday }) => (
            <div key={date} className="flex flex-col items-center gap-1">
              <div
                className={`w-full aspect-square rounded-lg transition-all ${
                  isFuture
                    ? 'bg-gray-50 border border-dashed border-gray-200'
                    : active
                    ? 'bg-gradient-to-br from-orange-400 to-rose-500 shadow-sm shadow-orange-200'
                    : 'bg-gray-100'
                }`}
              />
              <span className={`text-[9px] font-medium ${isToday ? 'text-orange-500 font-bold' : 'text-gray-400'}`}>
                {isToday ? 'Today' : DAY_LABELS[new Date(date + 'T12:00:00').getDay()]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
