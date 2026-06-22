import Link from 'next/link'
import { Zap, ArrowRight, Brain } from 'lucide-react'

export default function UpgradeBanner() {
  return (
    <div className="bg-electric-gradient rounded-2xl p-5 text-white relative overflow-hidden shadow-electric-lg">
      <div className="absolute inset-0 bg-glass-shine pointer-events-none" />
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-white">Unlock Claude Sonnet AI</p>
            <p className="text-sm text-blue-100 mt-0.5">
              Upgrade to Pro for our most capable model — deeper reasoning, richer explanations.
            </p>
          </div>
        </div>
        <Link
          href="/billing"
          className="shrink-0 bg-white text-electric text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Zap className="w-3.5 h-3.5" fill="currentColor" />
          Upgrade — $15/mo
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
