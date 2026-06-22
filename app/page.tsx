import Link from 'next/link'

const features = [
  {
    icon: '🃏',
    title: 'Flashcards & Quizzes',
    description:
      'Generate flashcards from any topic or your own notes. Spaced-repetition review keeps what you learned fresh.',
  },
  {
    icon: '🧩',
    title: 'Step-by-Step Problem Solving',
    description:
      'Work through problems together. Socratic mode nudges you with hints; direct mode shows full walkthroughs.',
  },
  {
    icon: '✍️',
    title: 'Writing & Essay Feedback',
    description:
      "Get structured feedback on argument, clarity, and mechanics — without having your work rewritten for you.",
  },
  {
    icon: '💡',
    title: 'Concept Explanations',
    description:
      'One-line summaries to deep dives with analogies. Explanations adapt to your level automatically.',
  },
]

const pricing = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Great for getting started.',
    features: [
      'AI tutor (standard model)',
      'Unlimited study sessions',
      'Flashcard creation',
      'All study modes',
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
    features: [
      'AI tutor (advanced model)',
      'Everything in Free',
      'Ad-free experience',
      'Priority support',
    ],
    cta: 'Start with Pro',
    href: '/signup',
    highlight: true,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-brand-600">Study Hub</span>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
          <span>✨</span>
          <span>Powered by Claude AI</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Study smarter with
          <br />
          <span className="text-brand-600">your own AI tutor</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Study Hub helps you learn any subject — math, science, history,
          languages, test prep, anything. Flashcards, quizzes, walkthroughs, and
          feedback, all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="bg-brand-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-brand-700 transition-colors"
          >
            Start studying for free
          </Link>
          <Link
            href="/login"
            className="border border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Everything you need to learn effectively
          </h2>
          <p className="text-gray-500 text-center mb-14 max-w-xl mx-auto">
            Four learning modes that adapt to how you study best.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-gray-500 text-center mb-14">
            Free to start, upgrade when you want more.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border ${
                  plan.highlight
                    ? 'border-brand-500 bg-brand-600 text-white shadow-lg shadow-brand-100'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="mb-6">
                  <p
                    className={`text-sm font-semibold uppercase tracking-wide mb-1 ${
                      plan.highlight ? 'text-brand-200' : 'text-brand-600'
                    }`}
                  >
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span
                      className={`text-sm ${plan.highlight ? 'text-brand-200' : 'text-gray-500'}`}
                    >
                      /{plan.period}
                    </span>
                  </div>
                  <p
                    className={`text-sm mt-2 ${plan.highlight ? 'text-brand-100' : 'text-gray-500'}`}
                  >
                    {plan.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <span>{plan.highlight ? '✓' : '✓'}</span>
                      <span className={plan.highlight ? 'text-white' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block text-center py-3 rounded-xl font-semibold transition-colors ${
                    plan.highlight
                      ? 'bg-white text-brand-600 hover:bg-brand-50'
                      : 'bg-brand-600 text-white hover:bg-brand-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Study Hub. Built to help people learn.
        </div>
      </footer>
    </div>
  )
}
