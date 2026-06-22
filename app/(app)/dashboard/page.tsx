import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getUserSubscriptionStatus, isPro } from '@/lib/tier'
import Card from '@/components/ui/card'
import UpgradeBanner from '@/components/billing/UpgradeBanner'
import type { StudySession, FlashcardDeck } from '@/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const status = await getUserSubscriptionStatus()
  const proUser = isPro(status)

  const [{ data: sessions }, { data: decks }, { data: profile }] = await Promise.all([
    supabase
      .from('study_sessions')
      .select('*')
      .eq('user_id', user!.id)
      .order('updated_at', { ascending: false })
      .limit(5),
    supabase
      .from('flashcard_decks')
      .select('id, title, subject, created_at, updated_at')
      .eq('user_id', user!.id)
      .order('updated_at', { ascending: false })
      .limit(4),
    supabase.from('profiles').select('full_name').eq('id', user!.id).single(),
  ])

  const firstName = profile?.full_name?.split(' ')[0] ?? 'there'

  const modeLabels: Record<string, string> = {
    direct: 'Direct',
    socratic: 'Socratic',
    step_by_step: 'Step-by-step',
    feedback: 'Feedback',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hey, {firstName} 👋</h1>
          <p className="text-gray-500 mt-1">What would you like to study today?</p>
        </div>
        <Link
          href="/study"
          className="bg-brand-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-700 transition-colors"
        >
          + New session
        </Link>
      </div>

      {/* Upgrade banner */}
      {!proUser && <UpgradeBanner />}

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { href: '/study', icon: '🎓', title: 'Start a study session', desc: 'Pick a topic and mode' },
          { href: '/flashcards', icon: '🃏', title: 'My flashcard decks', desc: 'Review and quiz yourself' },
          { href: '/billing', icon: proUser ? '⭐' : '🚀', title: proUser ? 'Pro plan active' : 'Upgrade to Pro', desc: proUser ? 'Advanced AI model' : '$15/month for better AI' },
        ].map((action) => (
          <Link key={action.href} href={action.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <span className="text-2xl">{action.icon}</span>
              <h3 className="font-semibold text-gray-900 mt-3 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-500">{action.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent sessions */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent sessions</h2>
            <Link href="/study" className="text-sm text-brand-600 hover:underline">
              New +
            </Link>
          </div>
          {sessions && sessions.length > 0 ? (
            <ul className="space-y-2">
              {(sessions as StudySession[]).map((session) => (
                <li key={session.id}>
                  <Link
                    href={`/study/${session.id}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{session.topic}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{modeLabels[session.mode]} · {new Date(session.updated_at).toLocaleDateString()}</p>
                    </div>
                    <span className="text-gray-300 group-hover:text-gray-500 ml-3">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p className="text-3xl mb-2">📚</p>
              <p className="text-sm">No sessions yet. <Link href="/study" className="text-brand-600 hover:underline">Start one →</Link></p>
            </div>
          )}
        </Card>

        {/* Flashcard decks */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Flashcard decks</h2>
            <Link href="/flashcards" className="text-sm text-brand-600 hover:underline">
              View all
            </Link>
          </div>
          {decks && decks.length > 0 ? (
            <ul className="space-y-2">
              {(decks as FlashcardDeck[]).map((deck) => (
                <li key={deck.id}>
                  <Link
                    href={`/flashcards/${deck.id}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{deck.title}</p>
                      {deck.subject && <p className="text-xs text-gray-400 mt-0.5">{deck.subject}</p>}
                    </div>
                    <span className="text-gray-300 group-hover:text-gray-500 ml-3">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p className="text-3xl mb-2">🃏</p>
              <p className="text-sm">No decks yet. <Link href="/flashcards" className="text-brand-600 hover:underline">Create one →</Link></p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
