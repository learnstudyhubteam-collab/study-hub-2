-- ============================================================
-- Tutor AI — Learn Mode + Feedback
-- ============================================================

-- Add rubies and streak freeze to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS rubies INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS streak_freeze_count INTEGER NOT NULL DEFAULT 0;

-- Feedback submissions
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL DEFAULT 'general'
    CHECK (category IN ('bug', 'suggestion', 'praise', 'general')),
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert own feedback" ON public.feedback FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read own feedback" ON public.feedback FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can read all feedback" ON public.feedback FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Learn progress per subject
CREATE TABLE IF NOT EXISTS public.learn_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  xp INTEGER NOT NULL DEFAULT 0,
  lessons_completed INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, subject)
);

ALTER TABLE public.learn_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own learn progress" ON public.learn_progress
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Individual lesson completions (prevents replaying same lesson for rubies)
CREATE TABLE IF NOT EXISTS public.learn_completions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  rubies_earned INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, lesson_id)
);

ALTER TABLE public.learn_completions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own completions" ON public.learn_completions
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
