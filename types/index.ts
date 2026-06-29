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

export type AssignmentStatus = 'pending' | 'in_progress' | 'completed' | 'overdue'
export type AssignmentPriority = 'low' | 'medium' | 'high'

export interface Assignment {
  id: string
  user_id: string
  class_id: string | null
  title: string
  description: string | null
  subject: string | null
  due_date: string | null
  status: AssignmentStatus
  priority: AssignmentPriority
  grade: number | null
  max_grade: number | null
  created_at: string
  updated_at: string
}

export interface Exam {
  id: string
  user_id: string
  class_id: string | null
  title: string
  subject: string | null
  exam_date: string
  notes: string | null
  created_at: string
}

export interface GradeEntry {
  id: string
  user_id: string
  class_id: string | null
  subject: string
  assignment_name: string
  score: number
  max_score: number
  weight: number
  category: string | null
  created_at: string
}

export interface StudySchedule {
  id: string
  user_id: string
  title: string
  content: string
  subjects: string[]
  exam_date: string | null
  hours_per_day: number
  created_at: string
}

export interface StudyGroup {
  id: string
  name: string
  subject: string | null
  description: string | null
  invite_code: string
  created_by: string
  created_at: string
  member_count?: number
}

export interface StudyGuide {
  id: string
  user_id: string
  class_id: string | null
  title: string
  subject: string | null
  content: string
  created_at: string
  updated_at: string
}

export interface ClassRow {
  id: string
  name: string
  subject: string | null
  section: string | null
  description: string | null
  invite_code: string
  teacher_id: string
  created_at: string
}

export interface GroupMessage {
  id: string
  group_id: string
  user_id: string
  content: string
  sender_name: string
  created_at: string
}

export interface StudyActivity {
  user_id: string
  activity_date: string
}
