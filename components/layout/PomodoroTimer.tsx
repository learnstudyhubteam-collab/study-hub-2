'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type Phase = 'work' | 'break'

const PHASES: Record<Phase, number> = {
  work: 25 * 60,
  break: 5 * 60,
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function PomodoroTimer() {
  const [phase, setPhase] = useState<Phase>('work')
  const [secondsLeft, setSecondsLeft] = useState(PHASES.work)
  const [running, setRunning] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const originalTitle = useRef<string>('')

  const tick = useCallback(() => {
    setSecondsLeft(s => {
      if (s <= 1) {
        setRunning(false)
        setPhase(prev => {
          const next: Phase = prev === 'work' ? 'break' : 'work'
          if (next === 'break') setSessions(n => n + 1)
          setSecondsLeft(PHASES[next])
          return next
        })
        if (typeof window !== 'undefined') {
          new Notification(phase === 'work' ? 'Break time! 🎉' : 'Back to work! 💪', {
            body: phase === 'work' ? 'Take a 5-minute break.' : 'Start your next 25-minute session.',
            icon: '/icons/icon-192.png',
          })
        }
        return 0
      }
      return s - 1
    })
  }, [phase])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, tick])

  useEffect(() => {
    if (!running) {
      if (originalTitle.current) document.title = originalTitle.current
      return
    }
    if (!originalTitle.current) originalTitle.current = document.title
    const label = phase === 'work' ? '🎯 Focus' : '☕ Break'
    document.title = `${formatTime(secondsLeft)} ${label} — Study Hub`
  }, [running, secondsLeft, phase])

  function toggle() {
    if (!running && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
    setRunning(r => !r)
  }

  function reset() {
    setRunning(false)
    setSecondsLeft(PHASES[phase])
  }

  function switchPhase(p: Phase) {
    setRunning(false)
    setPhase(p)
    setSecondsLeft(PHASES[p])
  }

  const progress = 1 - secondsLeft / PHASES[phase]
  const circumference = 2 * Math.PI * 20
  const dashOffset = circumference * (1 - progress)

  return (
    <div className="mx-3 mb-3">
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
      >
        <span className="text-base">{phase === 'work' ? '🎯' : '☕'}</span>
        <span className="flex-1 text-xs font-medium text-white/70">
          {running ? `${formatTime(secondsLeft)} ${phase === 'work' ? 'Focus' : 'Break'}` : 'Pomodoro Timer'}
        </span>
        {running && (
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
        )}
        <span className="text-white/30 text-xs">{expanded ? '▴' : '▾'}</span>
      </button>

      {expanded && (
        <div className="mt-2 px-3 py-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-3">
          <div className="flex gap-1 text-xs">
            {(['work', 'break'] as Phase[]).map(p => (
              <button
                key={p}
                onClick={() => switchPhase(p)}
                className={`px-3 py-1 rounded-full transition-colors ${
                  phase === p ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/50 hover:bg-white/15'
                }`}
              >
                {p === 'work' ? 'Focus 25m' : 'Break 5m'}
              </button>
            ))}
          </div>

          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
              <circle
                cx="24" cy="24" r="20" fill="none"
                stroke={phase === 'work' ? '#3b82f6' : '#10b981'}
                strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-mono font-bold text-white">{formatTime(secondsLeft)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={toggle}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                running
                  ? 'bg-white/10 text-white/70 hover:bg-white/20'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
            >
              {running ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={reset}
              className="px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors"
            >
              Reset
            </button>
          </div>

          {sessions > 0 && (
            <p className="text-[11px] text-white/30">{sessions} session{sessions !== 1 ? 's' : ''} completed today</p>
          )}
        </div>
      )}
    </div>
  )
}
