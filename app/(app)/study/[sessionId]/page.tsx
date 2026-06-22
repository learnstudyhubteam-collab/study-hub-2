import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getUserSubscriptionStatus, isPro } from '@/lib/tier'
import ChatInterface from '@/components/chat/ChatInterface'
import type { Message } from '@/types'

interface PageProps {
  params: Promise<{ sessionId: string }>
}

export default async function StudySessionPage({ params }: PageProps) {
  const { sessionId } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: session }, { data: messages }, status] = await Promise.all([
    supabase
      .from('study_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('user_id', user.id)
      .single(),
    supabase
      .from('messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true }),
    getUserSubscriptionStatus(),
  ])

  if (!session) notFound()

  return (
    <div className="-mt-8 -mx-4 sm:-mx-6 h-[calc(100vh-3.5rem)] flex flex-col">
      <ChatInterface
        sessionId={sessionId}
        topic={session.topic}
        initialMessages={(messages ?? []) as Message[]}
        isPro={isPro(status)}
      />
    </div>
  )
}
