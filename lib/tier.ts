import { createClient } from '@/lib/supabase/server'
import { AI_MODELS } from '@/lib/models'

export type SubscriptionStatus = 'free' | 'active' | 'canceled' | 'past_due'

export async function getUserSubscriptionStatus(): Promise<SubscriptionStatus> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return 'free'

  const { data } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  return (data?.subscription_status as SubscriptionStatus) ?? 'free'
}

export function isPro(status: SubscriptionStatus): boolean {
  return status === 'active'
}

export function getModelForStatus(status: SubscriptionStatus): string {
  return isPro(status) ? AI_MODELS.pro : AI_MODELS.free
}
