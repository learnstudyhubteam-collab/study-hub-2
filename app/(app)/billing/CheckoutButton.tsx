'use client'

import { useState } from 'react'
import Button from '@/components/ui/button'

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
    <Button size="lg" className="w-full" onClick={handleUpgrade} loading={loading}>
      Upgrade to Pro — $15/month
    </Button>
  )
}
