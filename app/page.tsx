import Link from 'next/link'
import { Zap, BookOpen, Layers, Brain, PenLine, ArrowRight, Check, Sparkles } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    title: 'Flashcards & Quizzes',
    description:
      'AI-generated flashcards on any topic. Spaced-repetition keeps knowledge fresh long-term.',
  },
  {
    icon: Brain,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    title: 'Step-by-Step Solving',
    description:
      'Work through problems together. Socratic mode nudges with hints; direct mode shows full walkthroughs.',
  },
  {
    icon: PenLine,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    title: 'Writing Feedback',
    description:
      'Structured feedback on argument, clarity, and mechanics — without rewriting your work.',
  },
  {
    icon: Sparkles,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    title: 'Adaptive Explanations',
    description:
      'One-line summaries to deep dives with analogies. The AI adapts to your level automatically.',
  },
]

const pricing = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started.',
    model: 'Claude Haiku (fast)',
    modelNote: 'Standard AI model',
    features: [
      'Unlimited study sessions',
      'Flashcard creation & quizzes',
      'All four study modes',
      'AI flashcard generation',
    ],
    cta: 'Get started free',
    href: '/signup',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$15',
    period: 'per month',
    description: 'For serious learners.',
    model: 'Claude Sonnet (advanced)',
    modelNote: 'Most capable AI model',
    features: [
      'Everything in Free',
      'Advanced AI model (Claude Sonnet)',
      'Deeper, more nuanced answers',
      'Priority support',
    ],
    cta: 'Start with Pro',
    href: '/signup',
    highlight: true,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* ── Nav ──────────────────────────────────────── */}
      <nav className="glass-strong sticky top-0 z-50 border-b border-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-electric-gradient flex items-center justify-center shadow-electric group-hover:shadow-electric-lg transition-all duration-300">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-lg font-bold text-gradient">Study Hub</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors px-3 py-2 rounded-xl hover:bg-black/5">
              Sign in
            </Link>
            <Link href="/signup" className="btn-electric text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5">
              Get started free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 glass-blue text-electric text-xs font-bold px-4 py-2 rounded-full mb-8">
            <Zap className="w-3.5 h-3.5" fill="currentColor" />
            Powered by Claude AI
            <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-gray-900 mb-6"
          >
            Study smarter with{' '}
            <span className="text-gradient">your own AI tutor</span>
          </h1>

          <p className="animate-fade-up delay-200 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Learn any subject — math, science, history, languages, test prep, anything.
            Flashcards, quizzes, walkthroughs, and feedback, all in one beautiful place.
          </p>

          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link href="/signup" className="btn-electric text-white px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2">
              Start studying for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="btn-glass px-8 py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2">
              Sign in
            </Link>
          </div>

          {/* Mock Chat UI */}
          <div className="animate-fade-up delay-400 relative mx-auto max-w-lg">
            <div className="glass rounded-3xl p-1 shadow-[0_24px_60px_rgba(0,102,255,0.12)]">
              <div className="rounded-2xl overflow-hidden bg-white/40">
                {/* Chat header */}
                <div className="glass-strong border-b border-white/60 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-electric-gradient flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" fill="white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">Quantum Entanglement</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full glass-blue text-electric">Pro model</span>
                </div>
                {/* Messages */}
                <div className="p-4 space-y-3">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-electric/10 flex items-center justify-center shrink-0">
                      <Zap className="w-3 h-3 text-electric" />
                    </div>
                    <div className="glass text-xs text-gray-700 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%] leading-relaxed">
                      Great topic! Quantum entanglement is one of the most fascinating phenomena in physics. Let&apos;s start with the core idea: when two particles become entangled, their states are correlated no matter how far apart they are. What aspect would you like to explore first?
                    </div>
                  </div>
                  <div className="flex gap-2 flex-row-reverse">
                    <div className="w-7 h-7 rounded-full bg-electric flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">U</span>
                    </div>
                    <div className="btn-electric text-xs text-white rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%] leading-relaxed">
                      How does measuring one particle instantly affect the other?
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-electric/10 flex items-center justify-center shrink-0">
                      <Zap className="w-3 h-3 text-electric" />
                    </div>
                    <div className="glass text-xs text-gray-700 rounded-2xl rounded-tl-sm px-3 py-2 leading-relaxed">
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-electric/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-electric/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-electric/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-electric/10 blur-3xl" />
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to learn effectively
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Four powerful learning modes that adapt to how you study best.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="glass-card p-6 group"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`w-11 h-11 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── AI Model Comparison ───────────────────────── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="glass-blue rounded-3xl p-8 text-center">
            <div className="inline-flex items-center gap-2 bg-electric/10 text-electric text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              <Brain className="w-3.5 h-3.5" />
              AI Models
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Better plan = smarter AI
            </h2>
            <p className="text-gray-500 mb-8">
              Both plans include an AI tutor. Pro unlocks our most capable model for deeper understanding.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <div className="glass rounded-2xl p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Free</p>
                <p className="font-bold text-gray-900 mb-1">Claude Haiku</p>
                <p className="text-sm text-gray-500">Fast, capable AI tutor. Great for most topics and study sessions.</p>
              </div>
              <div className="glass rounded-2xl p-5 ring-2 ring-electric/30 relative overflow-hidden">
                <div className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full glass-blue text-electric">
                  Pro
                </div>
                <p className="text-xs font-bold text-electric uppercase tracking-wide mb-3">Pro</p>
                <p className="font-bold text-gray-900 mb-1">Claude Sonnet</p>
                <p className="text-sm text-gray-500">Our most advanced model. Deeper reasoning, nuanced explanations, superior at complex topics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Simple, honest pricing
            </h2>
            <p className="text-gray-500 text-lg">Free to start. Upgrade when you want more.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight
                    ? 'bg-electric-gradient shadow-electric-xl text-white'
                    : 'glass hover:shadow-glass-hover'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute inset-0 bg-glass-shine pointer-events-none" />
                )}
                <div className="relative">
                  <div className="mb-6">
                    <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${plan.highlight ? 'text-blue-200' : 'text-electric'}`}>
                      {plan.name}
                    </p>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-4xl font-extrabold">{plan.price}</span>
                      <span className={`text-sm ${plan.highlight ? 'text-blue-200' : 'text-gray-400'}`}>
                        /{plan.period}
                      </span>
                    </div>
                    <p className={`text-sm ${plan.highlight ? 'text-blue-100' : 'text-gray-500'}`}>
                      {plan.description}
                    </p>
                  </div>

                  {/* AI model badge */}
                  <div className={`flex items-center gap-2 rounded-xl px-3 py-2 mb-6 ${plan.highlight ? 'bg-white/15' : 'glass-blue'}`}>
                    <Brain className={`w-4 h-4 ${plan.highlight ? 'text-blue-200' : 'text-electric'}`} />
                    <div>
                      <p className={`text-xs font-bold ${plan.highlight ? 'text-white' : 'text-electric'}`}>{plan.model}</p>
                      <p className={`text-xs ${plan.highlight ? 'text-blue-200' : 'text-gray-500'}`}>{plan.modelNote}</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-blue-200' : 'text-electric'}`}
                          strokeWidth={2.5}
                        />
                        <span className={plan.highlight ? 'text-white' : 'text-gray-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.href}
                    className={`block text-center py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${
                      plan.highlight
                        ? 'bg-white text-electric hover:bg-blue-50 shadow-lg'
                        : 'btn-electric text-white'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-white/60 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-electric-gradient flex items-center justify-center shadow-electric">
              <Zap className="w-3.5 h-3.5 text-white" fill="white" />
            </div>
            <span className="text-sm font-bold text-gradient">Study Hub</span>
          </Link>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Study Hub. Built to help people learn.
          </p>
        </div>
      </footer>
    </div>
  )
}
