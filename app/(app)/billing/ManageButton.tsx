'use client'

import { useState } from 'react'

export default function ManageButton() {
  const [loading, setLoading] = useState(false)

  async function handleManage() {
    setLoading(true)
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
    else setLoading(false)
  }

  return (
    <button
      onClick={handleManage}
      disabled={loading}
      className="btn-glass text-electric font-semibold text-sm px-4 py-2 rounded-xl disabled:opacity-60"
    >
      {loading ? 'Loading…' : 'Manage subscription'}
    </button>
  )
}
