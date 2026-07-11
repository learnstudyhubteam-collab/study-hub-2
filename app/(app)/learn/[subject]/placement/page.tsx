import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getSubject } from '@/lib/learn-content'
import PlacementTest from '@/components/learn/PlacementTest'

export const dynamic = 'force-dynamic'

export default async function PlacementPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: subjectId } = await params
  const subject = getSubject(subjectId)
  if (!subject || !subject.hasPlacement || subject.placementQuestions.length === 0) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: prog } = await supabase
    .from('learn_progress')
    .select('placement_done, level')
    .eq('user_id', user.id)
    .eq('subject', subjectId)
    .single()

  if (prog?.placement_done) redirect(`/learn/${subjectId}`)

  return <PlacementTest subject={subject} userId={user.id} />
}
