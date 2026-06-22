'use client'

import { useChat } from 'ai/react'
import { useRef, useEffect } from 'react'
import type { Message as DBMessage } from '@/types'
import { Zap, Send, ArrowUpRight } from 'lucide-react'

interface ChatInterfaceProps {
  sessionId: string
  topic: string
  initialMessages: DBMessage[]
  isPro: boolean
}

function MessageBubble({ role, content }: { role: string; content: string }) {
  const isUser = role === 'user'
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 transition-transform group-hover:scale-105 ${
          isUser
            ? 'bg-electric-gradient shadow-electric'
            : 'glass border border-white/80 shadow-sm'
        }`}
      >
        {isUser ? (
          <span className="text-white font-bold text-xs">U</span>
        ) : (
          <Zap className="w-4 h-4 text-electric" fill="currentColor" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`
          max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
          transition-all duration-200
          ${isUser
            ? 'btn-electric text-white rounded-tr-sm'
            : 'glass text-gray-800 rounded-tl-sm'
          }
        `}
      >
        {content}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-xl glass border border-white/80 shadow-sm flex items-center justify-center">
        <Zap className="w-4 h-4 text-electric" fill="currentColor" />
      </div>
      <div className="glass px-4 py-3 rounded-2xl rounded-tl-sm">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="w-2 h-2 bg-electric/60 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ChatInterface({
  sessionId,
  topic,
  initialMessages,
  isPro,
}: ChatInterfaceProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    body: { sessionId },
    initialMessages: initialMessages.map((m) => ({
      id: m.id,
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="glass-strong border-b border-white/60 px-5 py-3 flex items-center justify-between shrink-0">
        <div className="min-w-0">
          <h2 className="font-bold text-gray-900 text-sm truncate">{topic}</h2>
          {!isPro ? (
            <p className="text-xs text-gray-400 mt-0.5">
              Standard AI (Claude Haiku) ·{' '}
              <a href="/billing" className="text-electric hover:text-electric-dark font-medium transition-colors">
                Upgrade for Claude Sonnet <ArrowUpRight className="w-3 h-3 inline" />
              </a>
            </p>
          ) : (
            <p className="text-xs text-electric mt-0.5 font-medium">Claude Sonnet (Pro model)</p>
          )}
        </div>
        {isPro && (
          <div className="flex items-center gap-1.5 glass-blue text-electric text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ml-3">
            <Zap className="w-3 h-3" fill="currentColor" />
            Pro
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5 scrollbar-thin">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <div className="w-16 h-16 rounded-3xl bg-electric-gradient flex items-center justify-center shadow-electric-lg mb-4 animate-float">
              <Zap className="w-8 h-8 text-white" fill="white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Ready to study</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Ask anything about <strong className="text-electric">{topic}</strong>. Your AI tutor is ready.
            </p>
          </div>
        )}
        {messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} content={m.content} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && (
          <p className="text-center text-sm text-red-500 glass px-4 py-2 rounded-xl border border-red-200/50">
            Something went wrong. Please try again.
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="glass-strong border-t border-white/60 px-4 py-3 flex gap-2.5 shrink-0"
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question or paste notes…"
          disabled={isLoading}
          className="flex-1 input-glass px-4 py-2.5 rounded-xl text-sm placeholder:text-gray-400/80 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="btn-electric text-white w-10 h-10 rounded-xl flex items-center justify-center shrink-0 disabled:opacity-40"
        >
          {isLoading ? (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>
    </div>
  )
}
