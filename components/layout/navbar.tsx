'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

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
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/study', label: 'Study' },
    { href: '/flashcards', label: 'Flashcards' },
  ]

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="text-lg font-bold text-brand-600">
            Study Hub
          </Link>
          <div className="hidden sm:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith(link.href)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isPro && (
            <Link
              href="/billing"
              className="hidden sm:inline-flex text-xs font-semibold bg-gradient-to-r from-brand-600 to-purple-600 text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Upgrade to Pro
            </Link>
          )}
          {isPro && (
            <span className="hidden sm:inline-flex text-xs font-semibold bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full">
              Pro
            </span>
          )}
          <Link
            href="/billing"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Billing
          </Link>
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}
