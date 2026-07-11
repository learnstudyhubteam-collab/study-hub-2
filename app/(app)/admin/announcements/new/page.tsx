'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Megaphone, ArrowLeft, Pin } from 'lucide-react'
import Link from 'next/link'

export default function NewAnnouncementPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [audience, setAudience] = useState('all')
  const [pinned, setPinned] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    setSaving(true)
    setError('')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Not authenticated'); setSaving(false); return }
    const { error: err } = await supabase.from('announcements').insert({
      author_id: user.id,
      title: title.trim(),
      body: body.trim(),
      audience,
      pinned,
    })
    if (err) { setError(err.message); setSaving(false); return }
    router.push('/admin')
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Admin
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Megaphone className="w-6 h-6 text-orange-500" />
          New Announcement
        </h1>
        <p className="text-sm text-gray-500 mt-1">Broadcast a message to users on the platform</p>
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. School closure tomorrow"
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Message</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write the full announcement here..."
            rows={5}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric resize-none"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Audience</label>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric bg-white"
          >
            <option value="all">Everyone</option>
            <option value="teachers">Teachers only</option>
            <option value="class">Class-specific</option>
            <option value="admins">Admins only</option>
          </select>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-electric focus:ring-electric"
          />
          <div className="flex items-center gap-1.5">
            <Pin className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">Pin this announcement</span>
          </div>
        </label>

        {error && <p className="text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2">{error}</p>}

        <button
          type="submit"
          disabled={saving || !title.trim() || !body.trim()}
          className="w-full py-2.5 rounded-xl btn-electric text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {saving ? 'Posting...' : 'Post Announcement'}
        </button>
      </form>
    </div>
  )
}
