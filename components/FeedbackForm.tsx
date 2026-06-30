'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Send, Star } from 'lucide-react'

type Props = { userId: string; role: string }

const CATEGORIES = [
  { id: 'bug', label: '🐛 Bug Report', desc: 'Something is broken' },
  { id: 'suggestion', label: '💡 Suggestion', desc: 'Idea to improve the app' },
  { id: 'praise', label: '❤️ Praise', desc: 'Something you love' },
  { id: 'general', label: '💬 General', desc: 'Anything else' },
]

export default function FeedbackForm({ userId, role }: Props) {
  const router = useRouter()
  const [category, setCategory] = useState<string>('general')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState<number>(0)
  const [hover, setHover] = useState<number>(0)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    setSubmitting(true)

    const supabase = createClient()
    await supabase.from('feedback').insert({
      user_id: userId,
      category,
      message: message.trim(),
      rating: rating || null,
    })

    setDone(true)
    setSubmitting(false)
    setMessage('')
    setRating(0)
    router.refresh()
  }

  if (done) {
    return (
      <div className="glass rounded-2xl p-8 text-center space-y-4">
        <div className="text-4xl">🎉</div>
        <h2 className="font-bold text-gray-900 text-lg">Thank you!</h2>
        <p className="text-sm text-gray-500">Your feedback has been received. We read every submission.</p>
        <button
          onClick={() => setDone(false)}
          className="px-6 py-2 rounded-xl bg-electric text-white text-sm font-semibold hover:bg-electric/90 transition-colors"
        >
          Submit another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-5 space-y-5">
      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">What kind of feedback?</label>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`text-left p-3 rounded-xl border text-sm transition-all ${
                category === c.id
                  ? 'border-electric bg-electric/10 text-electric'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <p className="font-medium">{c.label}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{c.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Overall rating (optional)</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n === rating ? 0 : n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={`w-7 h-7 transition-colors ${
                  n <= (hover || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="text-xs text-gray-400 ml-2">{['', 'Poor', 'Fair', 'Good', 'Great', 'Amazing!'][rating]}</span>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Your feedback {role !== 'student' && <span className="text-xs font-normal text-gray-400">({role} view)</span>}
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what's on your mind..."
          rows={5}
          required
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-electric focus:bg-white resize-none transition-colors"
        />
        <p className="text-[11px] text-gray-400 text-right">{message.length} / 1000</p>
      </div>

      <button
        type="submit"
        disabled={submitting || !message.trim()}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-electric text-white font-semibold text-sm hover:bg-electric/90 disabled:opacity-40 transition-colors"
      >
        <Send className="w-4 h-4" />
        {submitting ? 'Sending…' : 'Send Feedback'}
      </button>
    </form>
  )
}
