export type SubscriptionStatus = 'free' | 'active' | 'canceled' | 'past_due'
export type StudyMode = 'direct' | 'socratic' | 'step_by_step' | 'feedback'
export type MessageRole = 'user' | 'assistant'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  subscription_status: SubscriptionStatus
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  created_at: string
  updated_at: string
}

export interface StudySession {
  id: string
  user_id: string
  topic: string
  mode: StudyMode
  subject: string | null
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  session_id: string
  user_id: string
  role: MessageRole
  content: string
  created_at: string
}

export interface FlashcardDeck {
  id: string
  user_id: string
  title: string
  subject: string | null
  created_at: string
  updated_at: string
  card_count?: number
}

export interface FlashcardCard {
  id: string
  deck_id: string
  user_id: string
  front: string
  back: string
  times_seen: number
  times_correct: number
  last_reviewed_at: string | null
  next_review_at: string | null
  created_at: string
}

export interface QuizResult {
  id: string
  session_id: string
  user_id: string
  card_id: string | null
  question: string
  user_answer: string | null
  correct_answer: string | null
  is_correct: boolean
  created_at: string
}
