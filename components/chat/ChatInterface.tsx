'use client'

import { useChat } from 'ai/react'
import { useRef, useEffect } from 'react'
import type { Message as DBMessage } from '@/types'
import Button from '@/components/ui/button'

interface ChatInterfaceProps {
  sessionId: string
  topic: string
  initialMessages: DBMessage[]
  isPro: boolean
}

function MessageBubble({ role, content }: { role: string; content: string }) {
  const isUser = role === 'user'
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
          isUser ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600'
        }`}
      >
        {isUser ? 'You' : 'AI'}
      </div>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-brand-600 text-white rounded-tr-none'
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
        }`}
      >
        {content}
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

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
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
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 bg-white flex items-center justify-between shrink-0">
        <div>
          <h2 className="font-semibold text-gray-900 text-sm truncate max-w-xs">{topic}</h2>
          {!isPro && (
            <p className="text-xs text-gray-400 mt-0.5">
              Standard model — <a href="/billing" className="text-brand-600 hover:underline">upgrade for Pro</a>
            </p>
          )}
        </div>
        {isPro && (
          <span className="text-xs bg-brand-50 text-brand-700 font-semibold px-2 py-1 rounded-full">
            Pro model
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-hide">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 text-sm mt-8">
            <p className="text-2xl mb-2">👋</p>
            <p>Start chatting! Ask anything about <strong className="text-gray-600">{topic}</strong>.</p>
          </div>
        )}
        {messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} content={m.content} />
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">AI</div>
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
        {error && (
          <p className="text-center text-sm text-red-500">
            Something went wrong. Please try again.
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 border-t border-gray-100 bg-white flex gap-2 shrink-0"
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question or paste notes…"
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:bg-gray-50"
        />
        <Button type="submit" disabled={!input.trim() || isLoading} loading={isLoading}>
          Send
        </Button>
      </form>
    </div>
  )
}
