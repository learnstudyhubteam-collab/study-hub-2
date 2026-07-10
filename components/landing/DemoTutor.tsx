'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Zap, Send, Sparkles, ArrowRight, Lock } from 'lucide-react'

interface DemoMessage {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED = [
  'Explain photosynthesis simply',
  'Help me factor x² + 5x + 6',
  'Why did the Roman Empire fall?',
]

export default function DemoTutor() {
  const [messages, setMessages] = useState<DemoMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [remaining, setRemaining] = useState(3)
  const [limitHit, setLimitHit] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  async function ask(question: string) {
    if (!question.trim() || loading || limitHit) return
    setError(null)
    setLoading(true)
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: question.trim() }])

    try {
      const res = await fetch('/api/demo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const data = await res.json()

      if (res.status === 429 || data.error === 'demo_limit') {
        setLimitHit(true)
        setRemaining(0)
      } else if (!res.ok) {
        setError(data.error ?? 'Something went wrong — try again.')
        setMessages((m) => m.slice(0, -1))
      } else {
        setMessages((m) => [...m, { role: 'assistant', content: data.answer }])
        setRemaining(data.remaining ?? 0)
        if ((data.remaining ?? 0) <= 0) setLimitHit(true)
      }
    } catch {
      setError('Network error — try again.')
      setMessages((m) => m.slice(0, -1))
    }
    setLoading(false)
  }

  return (
    <div className="glass rounded-3xl p-1 shadow-[0_24px_60px_rgba(0,102,255,0.14)] text-left">
      <div className="rounded-2xl overflow-hidden bg-white/40">
        {/* Header */}
        <div className="glass-strong border-b border-white/60 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-electric-gradient flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" fill="white" />
            </div>
            <span className="text-sm font-semibold text-gray-800">Try the AI tutor</span>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full glass-blue text-electric">
            {limitHit ? 'Demo complete' : `${remaining} free question${remaining !== 1 ? 's' : ''} left`}
          </span>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="p-4 space-y-3 min-h-[180px] max-h-[320px] overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 mb-3">Ask anything — no account needed.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => ask(q)}
                    className="text-xs px-3 py-1.5 rounded-full glass-blue text-electric font-medium hover:bg-electric/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {m.role === 'assistant' ? (
                <div className="w-7 h-7 rounded-full bg-electric/10 flex items-center justify-center shrink-0">
                  <Zap className="w-3 h-3 text-electric" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-electric flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">U</span>
                </div>
              )}
              <div
                className={`text-xs rounded-2xl px-3 py-2 max-w-[85%] leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'btn-electric text-white rounded-tr-sm'
                    : 'glass text-gray-700 rounded-tl-sm'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-electric/10 flex items-center justify-center shrink-0">
                <Zap className="w-3 h-3 text-electric" />
              </div>
              <div className="glass text-xs rounded-2xl rounded-tl-sm px-3 py-2.5">
                <span className="flex gap-1 items-center">
                  <span className="w-2 h-2 bg-electric/60 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-electric/60 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-electric/60 rounded-full typing-dot" />
                </span>
              </div>
            </div>
          )}

          {error && <p className="text-xs text-red-500 text-center">{error}</p>}

          {limitHit && (
            <div className="glass-blue rounded-2xl p-4 text-center space-y-2 border border-electric/20">
              <div className="w-9 h-9 rounded-xl bg-electric-gradient flex items-center justify-center mx-auto shadow-electric">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm font-bold text-gray-900">Like what you see?</p>
              <p className="text-xs text-gray-500">
                Create a free account for 5 full tutoring sessions a month — plus flashcards, study guides, and more.
              </p>
              <Link
                href="/signup"
                className="btn-electric text-white text-xs font-bold px-5 py-2.5 rounded-xl inline-flex items-center gap-1.5 mt-1"
              >
                Continue free <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-white/60 p-3">
          <form
            onSubmit={(e) => { e.preventDefault(); ask(input) }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading || limitHit}
              maxLength={500}
              placeholder={limitHit ? 'Sign up free to keep going…' : 'Ask a study question…'}
              className="input-glass flex-1 px-4 py-2.5 rounded-xl text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || limitHit || !input.trim()}
              className="btn-electric text-white px-4 rounded-xl disabled:opacity-40 flex items-center justify-center"
              aria-label="Send"
            >
              {limitHit ? <Lock className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
