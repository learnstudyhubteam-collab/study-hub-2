import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import FeedbackForm from '@/components/FeedbackForm'
import ScrollReveal from '@/components/ui/scroll-reveal'
import { MessageSquareHeart } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function FeedbackPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  const { data: previous } = await supabase
    .from('feedback')
    .select('category, message, rating, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <ScrollReveal>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquareHeart className="w-4 h-4 text-pink-500" />
            <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">Feedback</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Share Your Thoughts</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Your feedback helps us improve Tutor AI for everyone.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <FeedbackForm userId={user.id} role={profile?.role ?? 'student'} />
      </ScrollReveal>

      {(previous ?? []).length > 0 && (
        <ScrollReveal delay={0.1}>
          <div className="glass rounded-2xl p-5 space-y-3">
            <h2 className="font-semibold text-gray-700 text-sm">Your recent submissions</h2>
            {(previous ?? []).map((f, i) => (
              <div key={i} className="p-3 rounded-xl bg-gray-50 space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    f.category === 'bug' ? 'bg-red-100 text-red-700'
                    : f.category === 'suggestion' ? 'bg-blue-100 text-blue-700'
                    : f.category === 'praise' ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-200 text-gray-600'
                  }`}>
                    {f.category}
                  </span>
                  {f.rating && <span className="text-xs text-yellow-500">{'★'.repeat(f.rating)}</span>}
                  <span className="text-[10px] text-gray-400 ml-auto">{new Date(f.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{f.message}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}
    </div>
  )
}
