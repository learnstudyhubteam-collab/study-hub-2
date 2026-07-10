import Link from 'next/link'
import { Zap, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service — Tutor AI',
  description: 'The terms that govern your use of Tutor AI.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <nav className="glass-strong sticky top-0 z-50 border-b border-white/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-electric-gradient flex items-center justify-center shadow-electric">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-lg font-bold text-gradient">Tutor AI</span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="glass rounded-3xl p-8 sm:p-10 space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-sm text-gray-400">Last updated: July 10, 2026</p>
          </div>

          <section className="space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed">
              These Terms of Service (&quot;Terms&quot;) govern your use of Tutor AI (the &quot;Service&quot;). By creating an
              account or using the Service, you agree to these Terms. If you are under 18, you confirm that a
              parent, guardian, or school has approved your use of the Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">1. The Service</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Tutor AI provides AI-powered tutoring, study tools (flashcards, study guides, schedules),
              academic tracking (assignments, grades, exams), and collaboration features (classes and study
              groups). AI-generated content is produced by machine learning models and may contain errors —
              always verify important information, and never rely on the Service as your sole source for
              graded work, medical, legal, or safety decisions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">2. Accounts</h2>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed list-disc ml-5">
              <li>You must provide accurate information and keep your password secure.</li>
              <li>You are responsible for activity under your account.</li>
              <li>One person per account. Don&apos;t share accounts or resell access.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">3. Acceptable Use</h2>
            <p className="text-sm text-gray-600 leading-relaxed">You agree not to:</p>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed list-disc ml-5">
              <li>Use the Service to cheat on exams or violate your school&apos;s academic integrity policies. Tutor AI is a learning tool — how you use it must comply with your school&apos;s rules.</li>
              <li>Harass, bully, or harm others in study groups, classes, or chat.</li>
              <li>Attempt to bypass usage limits, security measures, or access other users&apos; data.</li>
              <li>Use the Service to generate harmful, illegal, or infringing content.</li>
              <li>Scrape, reverse engineer, or resell the Service.</li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed">
              We may suspend or terminate accounts that violate these rules.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">4. Subscriptions and Billing</h2>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed list-disc ml-5">
              <li>Paid plans (Plus, Pro) are billed through Stripe on a recurring basis until canceled.</li>
              <li>You can cancel anytime from the Billing page; access continues until the end of the paid period.</li>
              <li>Prices may change with at least 30 days&apos; notice before your next renewal.</li>
              <li>Except where required by law, payments are non-refundable, but contact us if something went wrong — we&apos;re reasonable.</li>
              <li>Free plan limits (such as sessions per month and messages per day) may be adjusted to keep the Service sustainable.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">5. Your Content</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              You own the content you create (notes, flashcards, messages, imported grades). You grant us a
              limited license to store, process, and display it as needed to run the Service — including
              sending it to our AI provider to generate responses. Content you post to a class or study group
              is visible to its members.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">6. Schools and Districts</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              When a school or district provisions accounts, the school is responsible for obtaining any
              required parental consents and remains the owner of student education records as defined by
              FERPA. District-specific terms may be agreed in a separate written agreement, which controls if
              it conflicts with these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">7. Disclaimers</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that
              AI-generated content is accurate, complete, or aligned with any specific curriculum or exam. To
              the maximum extent permitted by law, our total liability for any claim related to the Service is
              limited to the amount you paid us in the 12 months before the claim.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">8. Termination</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              You may stop using the Service or request account deletion at any time. We may suspend or
              terminate access for violations of these Terms, with notice where practical. Sections 5, 7, and
              9 survive termination.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">9. General</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              These Terms are the entire agreement between you and Tutor AI regarding the Service. If any
              provision is found unenforceable, the rest remains in effect. We may update these Terms; material
              changes will be announced by email or in-app notice before they take effect, and continued use
              after that constitutes acceptance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">10. Contact</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Questions about these Terms? Email{' '}
              <a href="mailto:learn.studyhub.team@gmail.com" className="text-electric hover:underline">learn.studyhub.team@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
