'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Zap, LayoutDashboard, BookOpen, Layers, CreditCard, LogOut,
  GraduationCap, ClipboardList, Calculator, Clock, CalendarClock,
  Users, FileText, Menu, X, Sparkles, Settings, Command, Link2, Sigma,
  Shield, Monitor, Megaphone, BarChart3, AlertTriangle,
  Trophy, Gem, MessageSquareHeart,
} from 'lucide-react'
import { useState } from 'react'
import PomodoroTimer from '@/components/layout/PomodoroTimer'

import type { SubscriptionPlan } from '@/lib/tier'
interface SidebarProps { plan?: SubscriptionPlan; role?: 'student' | 'teacher' | 'admin' }

const studentNavGroups = [
  {
    label: 'General',
    color: 'text-blue-500',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/classes', label: 'Classes', icon: GraduationCap },
    ],
  },
  {
    label: 'AI Tutor',
    color: 'text-violet-500',
    items: [
      { href: '/study', label: 'AI Chat', icon: BookOpen },
      { href: '/guides', label: 'Study Guides', icon: FileText },
      { href: '/schedule', label: 'Study Schedule', icon: CalendarClock },
    ],
  },
  {
    label: 'Tracker',
    color: 'text-emerald-500',
    items: [
      { href: '/assignments', label: 'Assignments', icon: ClipboardList },
      { href: '/grades', label: 'Grades', icon: Calculator },
      { href: '/exams', label: 'Exam Countdown', icon: Clock },
      { href: '/integrations', label: 'Integrations', icon: Link2 },
    ],
  },
  {
    label: 'Collaborate',
    color: 'text-cyan-500',
    items: [
      { href: '/groups', label: 'Study Groups', icon: Users },
      { href: '/flashcards', label: 'Flashcards', icon: Layers },
    ],
  },
  {
    label: 'Learn',
    color: 'text-pink-500',
    items: [
      { href: '/learn', label: 'Learn Mode', icon: Trophy },
      { href: '/shop', label: 'Ruby Shop', icon: Gem },
      { href: '/feedback', label: 'Feedback', icon: MessageSquareHeart },
    ],
  },
  {
    label: 'Tools',
    color: 'text-orange-500',
    items: [
      { href: '/calculator', label: 'Calculator', icon: Sigma },
    ],
  },
]

const teacherNavGroups = [
  {
    label: 'Teacher',
    color: 'text-violet-500',
    items: [
      { href: '/teacher', label: 'Teacher Dashboard', icon: GraduationCap },
      { href: '/monitor', label: 'Screen Monitor', icon: Monitor },
      { href: '/overdue', label: 'Overdue Items', icon: AlertTriangle },
    ],
  },
  {
    label: 'Classroom',
    color: 'text-blue-500',
    items: [
      { href: '/classes', label: 'My Classes', icon: BookOpen },
      { href: '/assignments', label: 'Assignments', icon: ClipboardList },
      { href: '/grades', label: 'Grades', icon: BarChart3 },
    ],
  },
  {
    label: 'Students',
    color: 'text-emerald-500',
    items: [
      { href: '/groups', label: 'Study Groups', icon: Users },
      { href: '/exams', label: 'Exams', icon: Clock },
    ],
  },
  {
    label: 'Learn',
    color: 'text-pink-500',
    items: [
      { href: '/learn', label: 'Learn Mode', icon: Trophy },
      { href: '/shop', label: 'Ruby Shop', icon: Gem },
      { href: '/feedback', label: 'Feedback', icon: MessageSquareHeart },
    ],
  },
  {
    label: 'Tools',
    color: 'text-orange-500',
    items: [
      { href: '/calculator', label: 'Calculator', icon: Sigma },
    ],
  },
]

const adminNavGroups = [
  {
    label: 'Admin',
    color: 'text-red-500',
    items: [
      { href: '/admin', label: 'Admin Dashboard', icon: Shield },
      { href: '/admin/users', label: 'User Management', icon: Users },
      { href: '/monitor', label: 'Screen Monitor', icon: Monitor },
      { href: '/overdue', label: 'Overdue Items', icon: AlertTriangle },
    ],
  },
  {
    label: 'School',
    color: 'text-violet-500',
    items: [
      { href: '/admin/announcements/new', label: 'Announcements', icon: Megaphone },
      { href: '/classes', label: 'All Classes', icon: GraduationCap },
      { href: '/assignments', label: 'Assignments', icon: ClipboardList },
    ],
  },
  {
    label: 'Learn',
    color: 'text-pink-500',
    items: [
      { href: '/learn', label: 'Learn Mode', icon: Trophy },
      { href: '/shop', label: 'Ruby Shop', icon: Gem },
      { href: '/admin/feedback', label: 'View Feedback', icon: MessageSquareHeart },
    ],
  },
  {
    label: 'Tools',
    color: 'text-orange-500',
    items: [
      { href: '/calculator', label: 'Calculator', icon: Sigma },
    ],
  },
]

const mobileBottomTabs = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/study', label: 'AI Chat', icon: BookOpen },
  { href: '/flashcards', label: 'Cards', icon: Layers },
  { href: '/assignments', label: 'Tasks', icon: ClipboardList },
  { href: '/settings', label: 'More', icon: Menu },
]

function openCommandPalette() {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }))
}

export default function Sidebar({ plan = 'free', role = 'student' }: SidebarProps) {
  const isPaid = plan === 'plus' || plan === 'pro'
  const navGroups = role === 'admin' ? adminNavGroups : role === 'teacher' ? teacherNavGroups : studentNavGroups
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
          <div>
            <span className="text-base font-bold text-gradient">Tutor AI</span>
            {role !== 'student' && (
              <div className={`text-[9px] font-bold uppercase tracking-widest leading-none ${role === 'admin' ? 'text-red-500' : 'text-violet-500'}`}>
                {role}
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Cmd+K trigger */}
      <div className="px-3 pt-3">
        <button
          onClick={openCommandPalette}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-black/5 hover:bg-black/8 border border-white/30 text-sm text-gray-400 transition-colors"
        >
          <Command className="w-3.5 h-3.5" />
          <span className="flex-1 text-left text-xs">Quick navigate...</span>
          <kbd className="text-[10px] bg-white/50 border border-white/40 rounded px-1 py-0.5 text-gray-400">⌘K</kbd>
        </button>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-hide">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className={`text-[10px] font-bold ${group.color} uppercase tracking-widest px-2 mb-1.5`}>
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

      {/* Pomodoro Timer */}
      <PomodoroTimer />

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/40 space-y-1">
        {isPaid ? (
          <Link
            href="/billing"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-electric bg-electric/8 hover:bg-electric/12 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            {plan === 'pro' ? 'Pro plan active' : 'Plus plan active'}
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
          <span className="text-sm font-bold text-gradient">Tutor AI</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={openCommandPalette}
            className="p-2 rounded-xl text-gray-500 hover:bg-black/5 transition-colors"
            aria-label="Command palette"
          >
            <Command className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="p-2 rounded-xl text-gray-500 hover:bg-black/5 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
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

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass-strong border-t border-white/60 flex items-stretch h-16 safe-area-pb">
        {mobileBottomTabs.map((tab) => {
          const active = tab.href === '/settings'
            ? pathname === tab.href
            : pathname === tab.href || pathname.startsWith(tab.href + '/')
          const Icon = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
                active ? 'text-electric' : 'text-gray-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
