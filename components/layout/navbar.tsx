'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Zap, LayoutDashboard, BookOpen, Layers, CreditCard, LogOut } from 'lucide-react'

interface NavbarProps {
  isPro?: boolean
}

export default function Navbar({ isPro = false }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/study', label: 'Study', icon: BookOpen },
    { href: '/flashcards', label: 'Flashcards', icon: Layers },
  ]

  return (
    <nav className="sticky top-0 z-50 glass-strong border-b border-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-7">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-electric-gradient flex items-center justify-center shadow-electric group-hover:shadow-electric-lg transition-shadow">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-base font-bold text-gradient">Study Hub</span>
          </Link>

          {/* Nav links */}
          <div className="hidden sm:flex items-center gap-1">
            {links.map((link) => {
              const active = pathname.startsWith(link.href)
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${active
                      ? 'bg-electric/10 text-electric shadow-[0_0_0_1px_rgba(0,102,255,0.15)]'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
                    }
                  `}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {isPro ? (
            <Link
              href="/billing"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-electric/10 text-electric border border-electric/20"
            >
              <Zap className="w-3 h-3" fill="currentColor" />
              Pro
            </Link>
          ) : (
            <Link
              href="/billing"
              className="hidden sm:inline-flex items-center gap-1.5 btn-electric text-white text-xs font-semibold px-3 py-1.5 rounded-xl"
            >
              <Zap className="w-3 h-3" fill="white" />
              Upgrade
            </Link>
          )}

          <Link
            href="/billing"
            className="sm:hidden text-gray-400 hover:text-gray-700 p-1.5 rounded-lg transition-colors"
            aria-label="Billing"
          >
            <CreditCard className="w-4 h-4" />
          </Link>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 p-1.5 rounded-xl transition-all hover:bg-black/5"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Sign out</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
