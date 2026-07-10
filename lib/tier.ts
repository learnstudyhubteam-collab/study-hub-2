import { createClient } from '@/lib/supabase/server'
import { AI_MODELS } from '@/lib/models'

export type SubscriptionStatus = 'free' | 'active' | 'canceled' | 'past_due'
export type SubscriptionPlan = 'free' | 'plus' | 'pro'

export interface PlanLimits {
  aiSessionsPerMonth: number | null  // null = unlimited
  aiMessagesPerDay: number | null    // null = unlimited
  flashcardDecks: number | null
  aiScheduleGen: boolean
  aiGuideGen: boolean
  aiFlashcardGen: boolean
}

export const PLAN_LIMITS: Record<SubscriptionPlan, PlanLimits> = {
  free: {
    aiSessionsPerMonth: 5,
    aiMessagesPerDay: 25,
    flashcardDecks: 2,
    aiScheduleGen: false,
    aiGuideGen: false,
    aiFlashcardGen: false,
  },
  plus: {
    aiSessionsPerMonth: null,
    aiMessagesPerDay: 300,
    flashcardDecks: null,
    aiScheduleGen: true,
    aiGuideGen: true,
    aiFlashcardGen: true,
  },
  pro: {
    aiSessionsPerMonth: null,
    aiMessagesPerDay: null,
    flashcardDecks: null,
    aiScheduleGen: true,
    aiGuideGen: true,
    aiFlashcardGen: true,
  },
}

export async function getUserSubscriptionStatus(): Promise<SubscriptionStatus> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return 'free'

  const { data } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  return (data?.subscription_status as SubscriptionStatus) ?? 'free'
}

export async function getUserPlan(): Promise<SubscriptionPlan> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return 'free'

  const { data } = await supabase
    .from('profiles')
    .select('subscription_plan, subscription_status')
    .eq('id', user.id)
    .single()

  const status = (data?.subscription_status as SubscriptionStatus) ?? 'free'
  if (status !== 'active') return 'free'
  return (data?.subscription_plan as SubscriptionPlan) ?? 'free'
}

export function isPro(status: SubscriptionStatus): boolean {
  return status === 'active'
}

export function isPaidPlan(plan: SubscriptionPlan): boolean {
  return plan === 'plus' || plan === 'pro'
}

export function getModelForPlan(plan: SubscriptionPlan): string {
  return AI_MODELS[plan] ?? AI_MODELS.free
}

/** @deprecated use getModelForPlan */
export function getModelForStatus(status: SubscriptionStatus): string {
  return isPro(status) ? AI_MODELS.pro : AI_MODELS.free
}
