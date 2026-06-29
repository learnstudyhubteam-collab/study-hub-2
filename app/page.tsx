import Link from 'next/link'
import {
  Zap, BookOpen, Layers, Brain, PenLine, ArrowRight, Check, Sparkles, Star,
  Users, GraduationCap, ClipboardList, CalendarClock, FileText, Flame, X,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/scroll-reveal'

const aiFeatures = [
  {
    icon: Brain,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    title: 'AI Tutor',
    description: 'Four study modes: direct answers, Socratic hints, step-by-step walkthroughs, and writing feedback.',
  },
  {
    icon: Layers,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    title: 'Flashcards + Quiz Mode',
    description: 'Create decks manually or generate them with AI. Quiz mode tracks what you know and what needs work.',
  },
  {
    icon: FileText,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    title: 'AI Study Guides',
    description: 'Generate comprehensive reference guides on any topic, instantly. Great for exam prep.',
  },
  {
    icon: CalendarClock,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    title: 'Study Schedule Generator',
    description: 'Tell it your subjects, exam date, and hours per day — it builds you a personalised daily plan.',
  },
]

const platformFeatures = [
  {
    icon: GraduationCap,
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
    title: 'Classes',
    description: 'Teachers create classes and post assignments. Students join with an invite code — like Google Classroom.',
  },
  {
    icon: Users,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
    title: 'Study Groups + Chat',
    description: 'Form peer study groups with real-time chat. Share an invite code to bring in classmates.',
  },
  {
    icon: ClipboardList,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    title: 'Assignment Tracker',
    description: 'Track every deadline, subject, and priority. See what\'s pending, in-progress, or overdue at a glance.',
  },
  {
    icon: BookOpen,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    title: 'Grade Calculator',
    description: 'Log scores and weights across categories. Instant GPA and weighted average. Know exactly where you stand.',
  },
]

const pricing = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to get started.',
    model: 'Claude Haiku',
    modelNote: 'Fast, capable AI',
    features: [
      '5 AI tutor sessions / month',
      'Up to 2 flashcard decks',
      'Classes, groups & assignments',
      'Grade calculator & exam tracker',
      'Study streak tracking',
    ],
    limits: [] as string[],
    cta: 'Get started free',
    href: '/signup',
    highlight: false,
    badge: null,
  },
  {
    name: 'Plus',
    price: '$8',
    period: 'per month',
    description: 'Unlimited AI for focused learners.',
    model: 'Claude Haiku',
    modelNote: 'Fast, capable AI — unlimited',
    features: [
      'Unlimited AI tutor sessions',
      'Unlimited flashcard decks',
      'AI study schedule generator',
      'AI study guide creator',
      'AI flashcard generation',
    ],
    limits: [] as string[],
    cta: 'Start Plus',
    href: '/signup',
    highlight: false,
    badge: 'Most popular',
  },
  {
    name: 'Pro',
    price: '$15',
    period: 'per month',
    description: 'Our most powerful AI for serious students.',
    model: 'Claude Sonnet',
    modelNote: 'Most capable AI model',
    features: [
      'Everything in Plus',
      'Advanced Claude Sonnet AI',
      'Deeper reasoning & explanations',
      'Superior at complex topics',
      'Priority support',
    ],
    limits: [] as string[],
    cta: 'Start Pro',
    href: '/signup',
    highlight: true,
    badge: null,
  },
]

const stats = [
  { value: '8', label: 'Platform features' },
  { value: '4', label: 'Study modes' },
  { value: 'AI', label: 'Powered' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* ── Nav ──────────────────────────────────────── */}
      <nav className="glass-strong sticky top-0 z-50 border-b border-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-electric-gradient flex items-center justify-center shadow-electric group-hover:shadow-electric-lg transition-all duration-300 group-hover:scale-110">
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
          <div className="animate-fade-up inline-flex items-center gap-2 glass-blue text-electric text-xs font-bold px-4 py-2 rounded-full mb-8">
            <Zap className="w-3.5 h-3.5" fill="currentColor" />
            Powered by Claude AI
            <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
          </div>

          <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-gray-900 mb-6">
            The complete{' '}
            <span className="text-gradient">AI study platform</span>
          </h1>

          <p className="animate-fade-up delay-200 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            AI tutor, flashcards, assignment tracking, grade calculator, study groups, classes, and more — everything you need to learn smarter, all in one place.
          </p>

          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link href="/signup" className="btn-electric btn-pulse text-white px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2">
              Start studying for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="btn-glass px-8 py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2">
              Sign in
            </Link>
          </div>

          <div className="animate-fade-up delay-400 flex flex-wrap items-center justify-center gap-4 mb-16 text-xs text-gray-400">
            {['Free forever', 'No credit card required', 'Any subject'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-electric" strokeWidth={2.5} />
                {t}
              </span>
            ))}
          </div>

          {/* Mock Chat UI */}
          <div className="animate-fade-up delay-400 relative mx-auto max-w-lg">
            <div className="absolute -top-4 -left-8 sm:-left-16 float-badge rounded-2xl px-3.5 py-2.5 animate-float flex items-center gap-2 z-10 hidden sm:flex">
              <div className="w-7 h-7 rounded-lg bg-orange-500/15 flex items-center justify-center">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">7-day streak 🔥</p>
                <p className="text-[10px] text-gray-400">keep it going!</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-8 sm:-right-14 float-badge rounded-2xl px-3.5 py-2.5 animate-float flex items-center gap-2 z-10 hidden sm:flex" style={{ animationDelay: '-3s' }}>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <Star className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Quiz complete</p>
                <p className="text-[10px] text-gray-400">18/20 correct</p>
              </div>
            </div>

            <div className="glass rounded-3xl p-1 shadow-[0_24px_60px_rgba(0,102,255,0.14)]">
              <div className="rounded-2xl overflow-hidden bg-white/40">
                <div className="glass-strong border-b border-white/60 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-electric-gradient flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" fill="white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">Quantum Entanglement</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full glass-blue text-electric">Pro model</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-electric/10 flex items-center justify-center shrink-0">
                      <Zap className="w-3 h-3 text-electric" />
                    </div>
                    <div className="glass text-xs text-gray-700 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%] leading-relaxed">
                      Great topic! When two particles become entangled, their states are correlated no matter how far apart they are. What aspect would you like to explore first?
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
                      <span className="flex gap-1 items-center">
                        <span className="w-2 h-2 bg-electric/60 rounded-full typing-dot" />
                        <span className="w-2 h-2 bg-electric/60 rounded-full typing-dot" />
                        <span className="w-2 h-2 bg-electric/60 rounded-full typing-dot" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 -z-10 rounded-3xl bg-electric/12 blur-3xl" />
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────── */}
      <ScrollReveal direction="up" delay={0}>
        <section className="py-8 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-2xl px-6 py-4 grid grid-cols-3 divide-x divide-white/40">
              {stats.map((s) => (
                <div key={s.label} className="text-center px-4">
                  <p className="text-2xl sm:text-3xl font-extrabold text-gradient">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── AI Features ──────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 glass-blue text-electric text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                <Brain className="w-3.5 h-3.5" /> AI Learning Tools
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                An AI tutor that actually teaches
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-lg">
                Not just answers — four learning modes that build real understanding.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {aiFeatures.map((f, i) => {
              const Icon = f.icon
              return (
                <ScrollReveal key={f.title} direction="up" delay={i * 90}>
                  <div className="glass-card p-6 group glow-border h-full">
                    <div className={`w-11 h-11 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Platform Features ────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-transparent to-blue-50/30">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 glass-blue text-electric text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                <GraduationCap className="w-3.5 h-3.5" /> Platform Tools
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Everything else students need
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-lg">
                Not just AI — a complete study platform built for real school life.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {platformFeatures.map((f, i) => {
              const Icon = f.icon
              return (
                <ScrollReveal key={f.title} direction="up" delay={i * 90}>
                  <div className="glass-card p-6 group glow-border h-full">
                    <div className={`w-11 h-11 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Streak callout ───────────────────────────── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="scale">
            <div className="glass rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-orange-200 shrink-0">
                🔥
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Build a study streak</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Every day you study, your streak grows. The dashboard tracks your last 7 days so you can see your consistency at a glance — and get motivated to keep the chain unbroken.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── AI Model Comparison ───────────────────────── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="scale">
            <div className="glass-blue rounded-3xl p-8 text-center">
              <div className="inline-flex items-center gap-2 bg-electric/10 text-electric text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                <Brain className="w-3.5 h-3.5" />
                AI Models
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Better plan = smarter AI
              </h2>
              <p className="text-gray-500 mb-8">
                Free and Plus use Claude Haiku — fast and capable. Pro upgrades to Claude Sonnet for deeper reasoning.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                <div className="glass rounded-2xl p-5">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Free &amp; Plus</p>
                  <p className="font-bold text-gray-900 mb-1">Claude Haiku</p>
                  <p className="text-sm text-gray-500">Fast, capable AI tutor. Great for most topics and study sessions.</p>
                </div>
                <div className="glass rounded-2xl p-5 ring-2 ring-electric/30 relative overflow-hidden">
                  <div className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full glass-blue text-electric">Pro</div>
                  <p className="text-xs font-bold text-electric uppercase tracking-wide mb-3">Pro</p>
                  <p className="font-bold text-gray-900 mb-1">Claude Sonnet</p>
                  <p className="text-sm text-gray-500">Our most advanced model. Deeper reasoning, nuanced explanations, superior at complex topics.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Simple, honest pricing
              </h2>
              <p className="text-gray-500 text-lg">Free to start. Upgrade when you want more.</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricing.map((plan, i) => (
              <ScrollReveal key={plan.name} direction="up" delay={i * 80}>
                <div className="relative h-full">
                  {plan.badge && (
                    <div className="absolute -top-3 left-0 right-0 flex justify-center z-10">
                      <span className="bg-electric text-white text-xs font-bold px-3 py-1 rounded-full shadow-electric">
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <div className={`rounded-3xl p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 h-full flex flex-col ${
                    plan.highlight
                      ? 'bg-electric-gradient shadow-electric-xl text-white'
                      : 'glass hover:shadow-glass-hover'
                  } ${plan.badge ? 'ring-2 ring-electric' : ''}`}>
                    {plan.highlight && <div className="absolute inset-0 bg-glass-shine pointer-events-none" />}
                    <div className="relative flex-1">
                      <div className="mb-5">
                        <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${plan.highlight ? 'text-blue-200' : 'text-electric'}`}>
                          {plan.name}
                        </p>
                        <div className="flex items-baseline gap-1 mb-1">
                          <span className="text-3xl font-extrabold">{plan.price}</span>
                          <span className={`text-sm ${plan.highlight ? 'text-blue-200' : 'text-gray-400'}`}>
                            /{plan.period}
                          </span>
                        </div>
                        <p className={`text-sm ${plan.highlight ? 'text-blue-100' : 'text-gray-500'}`}>
                          {plan.description}
                        </p>
                      </div>

                      <div className={`flex items-center gap-2 rounded-xl px-3 py-2 mb-5 ${plan.highlight ? 'bg-white/15' : 'glass-blue'}`}>
                        <Brain className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-blue-200' : 'text-electric'}`} />
                        <div>
                          <p className={`text-xs font-bold ${plan.highlight ? 'text-white' : 'text-electric'}`}>{plan.model}</p>
                          <p className={`text-xs ${plan.highlight ? 'text-blue-200' : 'text-gray-500'}`}>{plan.modelNote}</p>
                        </div>
                      </div>

                      <ul className="space-y-2.5 mb-7">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5 text-sm">
                            <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-blue-200' : 'text-electric'}`} strokeWidth={2.5} />
                            <span className={plan.highlight ? 'text-white' : 'text-gray-700'}>{feature}</span>
                          </li>
                        ))}
                        {plan.name === 'Free' && (
                          <>
                            <li className="flex items-start gap-2.5 text-sm">
                              <X className="w-4 h-4 shrink-0 mt-0.5 text-gray-300" />
                              <span className="text-gray-400">AI schedule &amp; guide generation</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>

                    <Link
                      href={plan.href}
                      className={`block text-center py-3 rounded-2xl font-bold text-sm transition-all duration-200 ${
                        plan.highlight
                          ? 'bg-white text-electric hover:bg-blue-50 shadow-lg'
                          : 'btn-electric text-white'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <ScrollReveal direction="fade">
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
      </ScrollReveal>
    </div>
  )
}
