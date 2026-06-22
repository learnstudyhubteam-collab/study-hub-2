'use client'

import { useState } from 'react'
import Button from '@/components/ui/button'

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
    <Button variant="secondary" size="sm" onClick={handleManage} loading={loading}>
      Manage subscription
    </Button>
  )
}
