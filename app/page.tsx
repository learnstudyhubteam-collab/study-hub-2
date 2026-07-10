import Link from 'next/link'
import {
  Zap, BookOpen, Layers, Brain, ArrowRight, Check, Star,
  Users, GraduationCap, ClipboardList, CalendarClock, FileText, Flame, X,
  MapPin, DollarSign, Clock, Building2, Mail, Shield,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/scroll-reveal'
import DemoTutor from '@/components/landing/DemoTutor'

const aiFeatures = [
  {
    icon: Brain,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    title: 'AI Tutor',
    description: 'Four study modes: direct answers, Socratic hints, step-by-step walkthroughs, and writing feedback.',
  },
  {
    icon: MapPin,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    title: 'Curriculum-Aligned Guides',
    description: 'Study guides matched to YOUR state\'s standards — Virginia SOL, Texas TEKS, Florida BEST, Common Core, and more.',
  },
  {
    icon: Layers,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    title: 'Flashcards + Quiz Mode',
    description: 'Create decks manually or generate them with AI. Quiz mode tracks what you know and what needs work.',
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
    title: 'Grade Import & Calculator',
    description: 'Import grades from Canvas, PowerSchool, Google Classroom, and more. Instant weighted averages.',
  },
]

const pricing = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    annualNote: null,
    description: 'Everything you need to get started.',
    model: 'Claude Haiku',
    modelNote: 'Fast, capable AI',
    features: [
      '5 AI tutor sessions / month',
      '25 AI messages / day',
      'Up to 2 flashcard decks',
      'Classes, groups & assignments',
      'Grade calculator & exam tracker',
    ],
    cta: 'Get started free',
    href: '/signup',
    highlight: false,
    badge: null,
  },
  {
    name: 'Plus',
    price: '$8',
    period: 'per month',
    annualNote: 'or $59/year (save 38%)',
    description: 'Unlimited AI for focused learners.',
    model: 'Claude Haiku',
    modelNote: 'Unlimited sessions',
    features: [
      'Unlimited AI tutor sessions',
      '300 AI messages / day',
      'Unlimited flashcard decks',
      'AI study schedules & guides',
      'AI flashcard generation',
    ],
    cta: 'Start Plus',
    href: '/signup',
    highlight: false,
    badge: 'Most popular',
  },
  {
    name: 'Pro',
    price: '$15',
    period: 'per month',
    annualNote: 'or $119/year (save 34%)',
    description: 'Our most powerful AI for serious students.',
    model: 'Claude Sonnet',
    modelNote: 'Most capable AI model',
    features: [
      'Everything in Plus',
      'Unlimited daily messages',
      'Advanced Claude Sonnet AI',
      'Deeper reasoning & explanations',
      'Priority support',
    ],
    cta: 'Start Pro',
    href: '/signup',
    highlight: true,
    badge: null,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      {/* ── Nav ──────────────────────────────────────── */}
      <nav className="glass-strong sticky top-0 z-50 border-b border-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-electric-gradient flex items-center justify-center shadow-electric group-hover:shadow-electric-lg transition-all duration-300 group-hover:scale-110">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-lg font-bold text-gradient">Tutor AI</span>
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
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />

        <div className="text-center max-w-3xl mx-auto">
          <div className="animate-fade-up inline-flex items-center gap-2 glass-blue text-electric text-xs font-bold px-4 py-2 rounded-full mb-8">
            <Zap className="w-3.5 h-3.5" fill="currentColor" />
            Powered by Claude AI
            <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
          </div>

          <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-gray-900 mb-6">
            Your personal tutor.{' '}
            <span className="text-gradient-animated">Always on.</span>
          </h1>

          <p className="animate-fade-up delay-200 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Unlimited AI tutoring, flashcards, curriculum-aligned study guides, and everything
            else students need — for less than the cost of a single hour with a private tutor.
          </p>

          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link href="/signup" className="btn-electric btn-pulse text-white px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2">
              Start studying for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#demo" className="btn-glass px-8 py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2">
              Try the tutor first ↓
            </a>
          </div>

          <div className="animate-fade-up delay-400 flex flex-wrap items-center justify-center gap-4 mb-16 text-xs text-gray-400">
            {['Free forever', 'No credit card required', 'Any subject'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-electric" strokeWidth={2.5} />
                {t}
              </span>
            ))}
          </div>

          {/* Live demo tutor */}
          <div id="demo" className="animate-fade-up delay-400 relative mx-auto max-w-lg scroll-mt-24">
            <div className="absolute -top-4 -left-8 sm:-left-16 float-badge rounded-2xl px-3.5 py-2.5 animate-float items-center gap-2 z-10 hidden sm:flex">
              <div className="w-7 h-7 rounded-lg bg-orange-500/15 flex items-center justify-center">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">7-day streak 🔥</p>
                <p className="text-[10px] text-gray-400">keep it going!</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-8 sm:-right-14 float-badge rounded-2xl px-3.5 py-2.5 animate-float items-center gap-2 z-10 hidden sm:flex" style={{ animationDelay: '-3s' }}>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <Star className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Quiz complete</p>
                <p className="text-[10px] text-gray-400">18/20 correct</p>
              </div>
            </div>

            <DemoTutor />
            <div className="absolute inset-0 -z-10 rounded-3xl bg-electric/12 blur-3xl" />
          </div>
        </div>
      </section>

      {/* ── Parents / value comparison ───────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                <DollarSign className="w-3.5 h-3.5" /> For Parents
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Private tutoring costs $60/hour.
                <br className="hidden sm:block" />
                <span className="text-gradient">This is $8/month.</span>
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-lg">
                Help with homework at 10pm. Exam prep on Sunday morning. Your student gets a
                patient tutor whenever they need one — not just Tuesdays at 4.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: Clock,
                title: 'Private tutor',
                price: '$240–480/mo',
                sub: '1–2 hours per week',
                points: ['Fixed weekly schedule', 'One subject at a time', 'Unavailable at 10pm before the test'],
                dim: true,
              },
              {
                icon: Brain,
                title: 'Generic AI chatbot',
                price: '$20/mo',
                sub: 'General-purpose',
                points: ['Just answers — doesn\'t teach', 'No flashcards, schedules, or tracking', 'Not aligned to school curriculum'],
                dim: true,
              },
              {
                icon: Zap,
                title: 'Tutor AI',
                price: 'From $0/mo',
                sub: 'Built for school',
                points: ['Available 24/7, every subject', 'Teaches with hints & steps, not just answers', 'Aligned to your state\'s curriculum'],
                dim: false,
              },
            ].map((c, i) => {
              const Icon = c.icon
              return (
                <ScrollReveal key={c.title} direction="up" delay={i * 90}>
                  <div className={`rounded-3xl p-6 h-full flex flex-col ${
                    c.dim
                      ? 'glass opacity-80'
                      : 'bg-electric-gradient text-white shadow-electric-xl relative overflow-hidden'
                  }`}>
                    {!c.dim && <div className="absolute inset-0 bg-glass-shine pointer-events-none" />}
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${
                        c.dim ? 'bg-gray-500/10 text-gray-500' : 'bg-white/20 text-white'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className={`font-bold mb-1 ${c.dim ? 'text-gray-700' : 'text-white'}`}>{c.title}</h3>
                      <p className={`text-2xl font-extrabold mb-0.5 ${c.dim ? 'text-gray-900' : 'text-white'}`}>{c.price}</p>
                      <p className={`text-xs mb-4 ${c.dim ? 'text-gray-400' : 'text-blue-200'}`}>{c.sub}</p>
                      <ul className="space-y-2">
                        {c.points.map((p) => (
                          <li key={p} className={`flex items-start gap-2 text-xs leading-relaxed ${c.dim ? 'text-gray-500' : 'text-blue-50'}`}>
                            {c.dim
                              ? <X className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gray-300" />
                              : <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-200" strokeWidth={2.5} />}
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

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

      {/* ── Curriculum callout ───────────────────────── */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="scale">
            <div className="glass rounded-3xl p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
              <div className="flex flex-col sm:flex-row items-start gap-6 relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-rose-200 shrink-0">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    The only AI tutor that knows <span className="text-gradient">your state&apos;s curriculum</span>
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    Tell Tutor AI your county and grade, and every study guide aligns to what you&apos;re
                    actually tested on — Virginia SOL, Texas TEKS &amp; STAAR, Florida BEST &amp; FAST,
                    New York Regents, Common Core, NGSS, and standards for all 50 states. Practice
                    questions even mirror your state test&apos;s format.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Virginia SOL', 'Texas TEKS', 'Florida BEST', 'NY Regents', 'Common Core', 'NGSS', '+ 45 more states'].map((s) => (
                      <span key={s} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
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

      {/* ── Teachers & Schools ───────────────────────── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="scale">
            <div className="glass-blue rounded-3xl p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 shrink-0">
                  <Building2 className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Built for teachers &amp; districts too</h2>
                  <div className="grid sm:grid-cols-3 gap-4 mb-5">
                    {[
                      { title: 'Teacher Hub', desc: 'Create classes, post assignments, share invite codes, import rosters.' },
                      { title: 'Admin Dashboard', desc: 'District stats, bulk enrollment via CSV, Lightspeed MDM import.' },
                      { title: 'District Pro', desc: 'Centralized billing, SSO, and dedicated support for schools.' },
                    ].map((f) => (
                      <div key={f.title}>
                        <p className="text-sm font-bold text-gray-900 mb-1">{f.title}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    href="mailto:learn.studyhub.team@gmail.com?subject=District Inquiry"
                    className="inline-flex items-center gap-1.5 text-sm text-electric font-semibold hover:underline"
                  >
                    <Mail className="w-4 h-4" /> Talk to us about your school or district →
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
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

      {/* ── Pricing ──────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Simple, honest pricing
              </h2>
              <p className="text-gray-500 text-lg">Free to start. Upgrade when you want more. Save 35%+ with annual billing.</p>
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
                        {plan.annualNote && (
                          <p className={`text-xs font-semibold mb-1 ${plan.highlight ? 'text-blue-100' : 'text-emerald-600'}`}>
                            {plan.annualNote}
                          </p>
                        )}
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
                          <li className="flex items-start gap-2.5 text-sm">
                            <X className="w-4 h-4 shrink-0 mt-0.5 text-gray-300" />
                            <span className="text-gray-400">AI schedule &amp; guide generation</span>
                          </li>
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

      {/* ── Final CTA ────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="scale">
            <div className="bg-electric-gradient rounded-3xl p-10 text-center text-white relative overflow-hidden shadow-electric-xl">
              <div className="absolute inset-0 bg-glass-shine pointer-events-none" />
              <div className="relative">
                <h2 className="text-3xl font-extrabold mb-3">Start learning smarter tonight</h2>
                <p className="text-blue-100 mb-7 max-w-md mx-auto">
                  Free forever plan. No credit card. Your first AI tutoring session is 60 seconds away.
                </p>
                <Link
                  href="/signup"
                  className="bg-white text-electric font-bold px-8 py-4 rounded-2xl inline-flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Create your free account <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <ScrollReveal direction="fade">
        <footer className="border-t border-white/60 py-10 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-electric-gradient flex items-center justify-center shadow-electric">
                  <Zap className="w-3.5 h-3.5 text-white" fill="white" />
                </div>
                <span className="text-sm font-bold text-gradient">Tutor AI</span>
              </Link>
              <div className="flex items-center gap-5 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms</Link>
                <a href="mailto:learn.studyhub.team@gmail.com" className="hover:text-gray-700 transition-colors">Support</a>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
              <p>© {new Date().getFullYear()} Tutor AI. Built to help people learn.</p>
              <p className="flex items-center gap-1">
                <Shield className="w-3 h-3" /> Payments secured by Stripe
              </p>
            </div>
          </div>
        </footer>
      </ScrollReveal>
    </div>
  )
}
