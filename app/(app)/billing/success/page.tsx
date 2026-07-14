import Link from 'next/link'
import { Crown, Zap, ArrowRight } from 'lucide-react'

export default function BillingSuccessPage() {
  return (
    <div className="max-w-sm mx-auto text-center py-16 animate-fade-up">
      <div className="glass rounded-3xl p-10 shadow-glass">
        {/* Icon */}
        <div className="relative inline-flex mb-6">
          <div className="w-20 h-20 rounded-3xl bg-electric-gradient flex items-center justify-center shadow-electric-xl animate-float">
            <Crown className="w-9 h-9 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
          You&apos;re on Pro! 🎉
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-3">
          Your subscription is active. You now have access to{' '}
          <strong className="text-electric">a more powerful AI engine</strong> with deeper reasoning.
        </p>

        <div className="glass-blue rounded-2xl p-4 mb-7 text-left">
          <p className="text-xs font-bold text-electric uppercase tracking-widest mb-2">What you unlocked</p>
          <ul className="space-y-1.5">
            {[
              'A smarter AI engine — deeper, more nuanced help',
              'Richer explanations and reasoning',
              'Better performance on complex topics',
            ].map((item) => (
              <li key={item} className="text-xs text-gray-700 flex items-start gap-2">
                <span className="text-electric mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/dashboard"
          className="btn-electric text-white px-6 py-3 rounded-2xl font-bold text-sm inline-flex items-center gap-2"
        >
          Go to dashboard
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
