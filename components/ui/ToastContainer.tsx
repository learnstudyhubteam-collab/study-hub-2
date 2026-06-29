'use client'

import { useEffect, useState } from 'react'
import type { ToastPayload, ToastType } from '@/lib/toast'

const ICONS: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
}

const COLORS: Record<ToastType, string> = {
  success: 'from-emerald-500/20 to-emerald-500/10 border-emerald-500/30 text-emerald-300',
  error: 'from-red-500/20 to-red-500/10 border-red-500/30 text-red-300',
  info: 'from-blue-500/20 to-blue-500/10 border-blue-500/30 text-blue-300',
  warning: 'from-amber-500/20 to-amber-500/10 border-amber-500/30 text-amber-300',
}

const ICON_COLORS: Record<ToastType, string> = {
  success: 'bg-emerald-500/20 text-emerald-400',
  error: 'bg-red-500/20 text-red-400',
  info: 'bg-blue-500/20 text-blue-400',
  warning: 'bg-amber-500/20 text-amber-400',
}

interface ToastItem extends ToastPayload {
  exiting: boolean
}

const MAX_TOASTS = 3
const AUTO_DISMISS_MS = 3500
const EXIT_DURATION_MS = 300

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    function handleToast(e: Event) {
      const { id, message, type } = (e as CustomEvent<ToastPayload>).detail
      setToasts(prev => {
        const next = [...prev, { id, message, type, exiting: false }]
        return next.slice(-MAX_TOASTS)
      })

      setTimeout(() => {
        setToasts(prev =>
          prev.map(t => (t.id === id ? { ...t, exiting: true } : t))
        )
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id))
        }, EXIT_DURATION_MS)
      }, AUTO_DISMISS_MS)
    }

    window.addEventListener('studyhub:toast', handleToast)
    return () => window.removeEventListener('studyhub:toast', handleToast)
  }, [])

  function dismiss(id: string) {
    setToasts(prev => prev.map(t => (t.id === id ? { ...t, exiting: true } : t)))
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), EXIT_DURATION_MS)
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 max-sm:right-0 max-sm:bottom-20 max-sm:w-full max-sm:px-4 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`
            pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border
            bg-gradient-to-br backdrop-blur-xl shadow-2xl
            ${COLORS[toast.type]}
            transition-all duration-300 ease-out
            ${toast.exiting ? 'opacity-0 translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100'}
            max-sm:w-full
          `}
          style={{ minWidth: 280, maxWidth: 380 }}
        >
          <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${ICON_COLORS[toast.type]}`}>
            {ICONS[toast.type]}
          </span>
          <p className="flex-1 text-sm font-medium text-white/90 leading-snug">{toast.message}</p>
          <button
            onClick={() => dismiss(toast.id)}
            className="flex-shrink-0 text-white/40 hover:text-white/80 transition-colors text-lg leading-none mt-0.5"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
