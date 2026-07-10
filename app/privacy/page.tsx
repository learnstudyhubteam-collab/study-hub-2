import Link from 'next/link'
import { Zap, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy — Tutor AI',
  description: 'How Tutor AI collects, uses, and protects your data.',
}

export default function PrivacyPage() {
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
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-sm text-gray-400">Last updated: July 10, 2026</p>
          </div>

          <section className="space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed">
              Tutor AI (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides an AI-powered learning platform for
              students, teachers, and school administrators. This Privacy Policy explains what information we
              collect, how we use it, and the choices you have. By using Tutor AI, you agree to this policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">1. Information We Collect</h2>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed list-disc ml-5">
              <li><strong>Account information:</strong> name, email address, password (stored as a secure hash), and profile details you choose to add (school, grade level, county/district, classes, role).</li>
              <li><strong>Learning content:</strong> your study session messages, flashcards, study guides, schedules, assignments, grades you enter, and study group messages.</li>
              <li><strong>Imported data:</strong> grades or scores you paste from third-party services (such as Canvas, PowerSchool, or Google Classroom). We only receive what you paste — we never connect to those services with your credentials.</li>
              <li><strong>Payment information:</strong> processed entirely by Stripe. We never see or store your card number. We store only your Stripe customer ID and subscription status.</li>
              <li><strong>Usage information:</strong> basic activity data such as study streaks and session dates.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">2. How We Use Your Information</h2>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed list-disc ml-5">
              <li>To provide the service — tutoring sessions, flashcards, guides, schedules, and classroom features.</li>
              <li>To personalize AI-generated content (for example, aligning study guides to your state&apos;s curriculum based on the county you provide).</li>
              <li>To process subscriptions and payments through Stripe.</li>
              <li>To send service emails such as deadline reminders (you can opt out).</li>
              <li>To keep the platform safe, prevent abuse, and enforce usage limits.</li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>We do not sell your personal information.</strong> We do not use your learning content to
              advertise to you.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">3. AI Processing</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Tutor AI uses Anthropic&apos;s Claude models to power tutoring, study guides, schedules, and flashcard
              generation. When you use an AI feature, the relevant content (such as your question or subjects)
              is sent to Anthropic&apos;s API for processing. Per Anthropic&apos;s API terms, data sent through the API
              is not used to train their models.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">4. Students and Children&apos;s Privacy</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Tutor AI is designed for learners of many ages, including students under 13 when their school,
              teacher, or parent provides consent. If you are under 13, you may only use Tutor AI with the
              consent of a parent, guardian, or school acting with parental consent (consistent with COPPA).
              For school deployments, we act as a service provider to the school and handle student records
              consistent with FERPA. We collect only the information needed to provide the service, and
              parents or schools may request review or deletion of a student&apos;s data at any time by
              contacting us.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">5. Sharing</h2>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed list-disc ml-5">
              <li><strong>Service providers:</strong> Supabase (database and authentication), Anthropic (AI processing), Stripe (payments), Vercel (hosting), and Resend (email). Each receives only what is needed to perform its function.</li>
              <li><strong>Within the product:</strong> content you post to a class or study group is visible to its members. Your name is visible to classmates in shared spaces.</li>
              <li><strong>Legal:</strong> we may disclose information if required by law or to protect the safety of users.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">6. Data Retention and Deletion</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We keep your data while your account is active. You may delete individual content (sessions,
              decks, guides, schedules) at any time inside the app. To delete your entire account and
              associated data, email us at{' '}
              <a href="mailto:learn.studyhub.team@gmail.com" className="text-electric hover:underline">learn.studyhub.team@gmail.com</a>{' '}
              and we will process the request within 30 days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">7. Security</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Data is encrypted in transit (TLS) and at rest. Access to user data is restricted through
              row-level security policies, meaning users can only access their own records and content shared
              with them. No method of transmission or storage is 100% secure, but we work to protect your
              information using industry-standard practices.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">8. Your Rights</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Depending on where you live, you may have rights to access, correct, export, or delete your
              personal information. To exercise any of these rights, contact us at the email below. We will
              respond within 30 days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">9. Changes to This Policy</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We may update this policy as the product evolves. If we make material changes, we will notify
              you by email or an in-app notice before the changes take effect.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">10. Contact</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Questions about privacy? Email{' '}
              <a href="mailto:learn.studyhub.team@gmail.com" className="text-electric hover:underline">learn.studyhub.team@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
