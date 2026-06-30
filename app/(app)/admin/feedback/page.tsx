import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ChevronLeft, MessageSquareHeart } from 'lucide-react'
import ScrollReveal from '@/components/ui/scroll-reveal'

export const dynamic = 'force-dynamic'

export default async function AdminFeedbackPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  const { data: items } = await supabase
    .from('feedback')
    .select('id, category, message, rating, created_at, user_id, profiles(full_name, email, role)')
    .order('created_at', { ascending: false })
    .limit(100)

  const catColors: Record<string, string> = {
    bug: 'bg-red-100 text-red-700',
    suggestion: 'bg-blue-100 text-blue-700',
    praise: 'bg-emerald-100 text-emerald-700',
    general: 'bg-gray-100 text-gray-600',
  }

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div>
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-4">
            <ChevronLeft className="w-4 h-4" /> Admin
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquareHeart className="w-5 h-5 text-pink-500" />
            <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">Admin · Feedback</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">User Feedback</h1>
          <p className="text-sm text-gray-500 mt-0.5">{items?.length ?? 0} total submissions</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <div className="glass rounded-2xl divide-y divide-gray-100">
          {(items ?? []).length === 0 && (
            <div className="py-12 text-center">
              <MessageSquareHeart className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400">No feedback yet</p>
            </div>
          )}
          {(items ?? []).map((f: any) => (
            <div key={f.id} className="p-4 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${catColors[f.category] ?? 'bg-gray-100 text-gray-500'}`}>
                  {f.category}
                </span>
                {f.rating && <span className="text-xs text-yellow-500">{'★'.repeat(f.rating)}</span>}
                <span className="text-xs text-gray-500 font-medium">{f.profiles?.full_name ?? f.profiles?.email ?? 'Unknown'}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${f.profiles?.role === 'teacher' ? 'bg-violet-100 text-violet-700' : f.profiles?.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                  {f.profiles?.role ?? 'student'}
                </span>
                <span className="text-[10px] text-gray-400 ml-auto">{new Date(f.created_at).toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-700">{f.message}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  )
}
