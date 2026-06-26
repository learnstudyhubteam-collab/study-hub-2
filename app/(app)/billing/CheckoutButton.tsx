'use client'

import { useState } from 'react'
import { Zap } from 'lucide-react'

interface Props {
  plan: 'plus' | 'pro'
  label: string
  className?: string
}

export default function CheckoutButton({ plan, label, className = '' }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      if (!res.ok) throw new Error(await res.text())
      const { url } = await res.json()
      if (url) window.location.href = url
      else setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className={`w-full font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-sm disabled:opacity-60 transition-all ${className}`}
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <Zap className="w-4 h-4" fill="currentColor" />
      )}
      {loading ? 'Redirecting…' : label}
    </button>
  )
}
