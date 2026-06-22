'use client'

import { useState } from 'react'
import { Zap } from 'lucide-react'

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
    else setLoading(false)
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="btn-electric w-full text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-sm disabled:opacity-60"
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <Zap className="w-4 h-4" fill="white" />
      )}
      {loading ? 'Redirecting…' : 'Upgrade to Pro — $15/month'}
    </button>
  )
}
