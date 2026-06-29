'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface NavItem {
  label: string
  path: string
  icon: string
  keywords: string[]
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: '🏠', keywords: ['home', 'overview'] },
  { label: 'AI Chat', path: '/chat', icon: '🤖', keywords: ['ai', 'tutor', 'chat', 'claude'] },
  { label: 'Flashcards', path: '/flashcards', icon: '🃏', keywords: ['cards', 'study', 'flip'] },
  { label: 'Assignments', path: '/assignments', icon: '📋', keywords: ['homework', 'tasks', 'todos'] },
  { label: 'Exams', path: '/exams', icon: '📅', keywords: ['test', 'countdown', 'schedule'] },
  { label: 'Grades', path: '/grades', icon: '📊', keywords: ['gpa', 'marks', 'calculator'] },
  { label: 'Study Schedule', path: '/schedule', icon: '🗓️', keywords: ['calendar', 'plan', 'timetable'] },
  { label: 'Study Guides', path: '/guides', icon: '📖', keywords: ['notes', 'summary', 'ai guide'] },
  { label: 'Study Groups', path: '/groups', icon: '👥', keywords: ['collaborate', 'group', 'chat'] },
  { label: 'Classes', path: '/classes', icon: '🏫', keywords: ['classroom', 'teacher', 'student'] },
  { label: 'Settings', path: '/settings', icon: '⚙️', keywords: ['profile', 'account', 'preferences'] },
  { label: 'Billing & Plans', path: '/billing', icon: '💳', keywords: ['subscription', 'upgrade', 'plus', 'pro'] },
]

function fuzzyMatch(query: string, item: NavItem): boolean {
  if (!query) return true
  const q = query.toLowerCase()
  const searchable = [item.label, ...item.keywords].join(' ').toLowerCase()
  return searchable.includes(q)
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const filtered = NAV_ITEMS.filter(item => fuzzyMatch(query, item))

  useEffect(() => {
    setSelected(0)
  }, [query])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  function navigate(path: string) {
    setOpen(false)
    router.push(path)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected(s => Math.min(s + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected(s => Math.max(s - 1, 0))
    } else if (e.key === 'Enter') {
      if (filtered[selected]) navigate(filtered[selected].path)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-start justify-center pt-[15vh] px-4"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <span className="text-white/40 text-lg">⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Navigate to..."
            className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-base"
          />
          <kbd className="text-[10px] text-white/30 border border-white/10 rounded px-1.5 py-0.5">ESC</kbd>
        </div>

        <div className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <p className="text-center text-white/30 text-sm py-6">No results found</p>
          ) : (
            filtered.map((item, i) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setSelected(i)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                  i === selected ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <span className="text-xl w-7 flex-shrink-0 text-center">{item.icon}</span>
                <span className="text-sm font-medium text-white/90">{item.label}</span>
                <span className="ml-auto text-xs text-white/30">{item.path}</span>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 border-t border-white/10 flex items-center gap-4 text-[11px] text-white/25">
          <span><kbd className="font-mono">↑↓</kbd> navigate</span>
          <span><kbd className="font-mono">↵</kbd> open</span>
          <span><kbd className="font-mono">⌘K</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
