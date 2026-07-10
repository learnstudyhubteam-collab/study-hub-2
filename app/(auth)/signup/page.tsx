'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Zap, Mail, Lock, User, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    const { data: session } = await supabase.auth.getSession()
    if (session.session) {
      router.push('/dashboard')
      router.refresh()
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm text-center animate-fade-up">
          <div className="glass rounded-3xl p-10 shadow-glass">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Check your email</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We sent a confirmation link to{' '}
              <strong className="text-gray-700">{email}</strong>. Click it to activate your account.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center gap-1.5 text-electric text-sm font-semibold hover:text-electric-dark transition-colors"
            >
              ← Back to sign in
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm animate-fade-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-electric-gradient flex items-center justify-center shadow-electric-lg group-hover:shadow-electric-xl transition-all duration-300 group-hover:-translate-y-0.5">
              <Zap className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-2xl font-extrabold text-gradient">Tutor AI</span>
          </Link>
          <p className="text-gray-400 mt-2 text-sm">Create your free account</p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-7 shadow-glass">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              type="text"
              placeholder="Your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 glass rounded-xl px-3 py-2.5 border border-red-200/50">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Create free account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-electric font-semibold hover:text-electric-dark transition-colors">
              Sign in →
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Free forever · No credit card required
        </p>
        <p className="text-center text-xs text-gray-400 mt-2">
          By signing up you agree to our{' '}
          <Link href="/terms" className="text-electric hover:underline">Terms</Link> and{' '}
          <Link href="/privacy" className="text-electric hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
