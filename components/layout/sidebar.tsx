'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Zap, LayoutDashboard, BookOpen, Layers, CreditCard, LogOut,
  GraduationCap, ClipboardList, Calculator, Clock, CalendarClock,
  Users, FileText, Menu, X, Sparkles, Settings,
} from 'lucide-react'
import { useState } from 'react'

interface SidebarProps { isPro?: boolean }

const navGroups = [
  {
    label: 'General',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/classes', label: 'Classes', icon: GraduationCap },
    ],
  },
  {
    label: 'AI Tutor',
    items: [
      { href: '/study', label: 'AI Chat', icon: BookOpen },
      { href: '/guides', label: 'Study Guides', icon: FileText },
      { href: '/schedule', label: 'Study Schedule', icon: CalendarClock },
    ],
  },
  {
    label: 'Tracker',
    items: [
      { href: '/assignments', label: 'Assignments', icon: ClipboardList },
      { href: '/grades', label: 'Grades', icon: Calculator },
      { href: '/exams', label: 'Exam Countdown', icon: Clock },
    ],
  },
  {
    label: 'Collaborate',
    items: [
      { href: '/groups', label: 'Study Groups', icon: Users },
      { href: '/flashcards', label: 'Flashcards', icon: Layers },
    ],
  },
]

export default function Sidebar({ isPro = false }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/40">
        <Link href="/dashboard" className="flex items-center gap-2.5 group" onClick={() => setMobileOpen(false)}>
          <div className="w-8 h-8 rounded-xl bg-electric-gradient flex items-center justify-center shadow-electric group-hover:shadow-electric-lg transition-all">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="text-base font-bold text-gradient">Study Hub</span>
        </Link>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-hide">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-1.5">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/')
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-electric/10 text-electric shadow-[inset_0_0_0_1px_rgba(0,102,255,0.15)]'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-electric' : ''}`} />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/40 space-y-1">
        {isPro ? (
          <Link
            href="/billing"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-electric bg-electric/8 hover:bg-electric/12 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Pro plan active
          </Link>
        ) : (
          <Link
            href="/billing"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold btn-electric text-white"
          >
            <Zap className="w-4 h-4" fill="white" />
            Upgrade to Pro
          </Link>
        )}
        <Link
          href="/billing"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-all"
        >
          <CreditCard className="w-4 h-4" />
          Billing
        </Link>
        <Link
          href="/settings"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-all"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 glass-strong border-r border-white/60 min-h-screen sticky top-0">
        <NavContent />
      </aside>

      {/* Mobile header bar */}
      <div className="lg:hidden glass-strong border-b border-white/60 sticky top-0 z-50 px-4 h-14 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-electric-gradient flex items-center justify-center shadow-electric">
            <Zap className="w-3.5 h-3.5 text-white" fill="white" />
          </div>
          <span className="text-sm font-bold text-gradient">Study Hub</span>
        </Link>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="p-2 rounded-xl text-gray-500 hover:bg-black/5 transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="w-64 glass-strong border-r border-white/60 h-full overflow-y-auto">
            <NavContent />
          </div>
          <div className="flex-1 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  )
}
