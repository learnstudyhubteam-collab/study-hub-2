-- ============================================================
-- Tutor AI — Admin & Teacher Features
-- ============================================================

-- Add role and school fields to profiles if not present
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'student'
    CHECK (role IN ('student', 'teacher', 'admin')),
  ADD COLUMN IF NOT EXISTS school TEXT,
  ADD COLUMN IF NOT EXISTS grade_level TEXT,
  ADD COLUMN IF NOT EXISTS county TEXT,
  ADD COLUMN IF NOT EXISTS classes TEXT[],
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

-- Announcements (admin/teacher posts to school/class)
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  pinned BOOLEAN NOT NULL DEFAULT FALSE,
  audience TEXT NOT NULL DEFAULT 'all'
    CHECK (audience IN ('all', 'class', 'teachers', 'admins')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS announcements_author_id_idx ON public.announcements(author_id);
CREATE INDEX IF NOT EXISTS announcements_class_id_idx ON public.announcements(class_id);
CREATE INDEX IF NOT EXISTS announcements_created_at_idx ON public.announcements(created_at DESC);

-- Attendance records
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'present'
    CHECK (status IN ('present', 'absent', 'late', 'excused')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (class_id, student_id, date)
);

CREATE INDEX IF NOT EXISTS attendance_class_id_idx ON public.attendance(class_id);
CREATE INDEX IF NOT EXISTS attendance_student_id_idx ON public.attendance(student_id);
CREATE INDEX IF NOT EXISTS attendance_date_idx ON public.attendance(date DESC);

-- RLS for announcements
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Announcements readable by authenticated users"
  ON public.announcements FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Announcements writable by teachers and admins"
  ON public.announcements FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Announcements updatable by author"
  ON public.announcements FOR UPDATE
  USING (auth.uid() = author_id);

CREATE POLICY "Announcements deletable by author"
  ON public.announcements FOR DELETE
  USING (auth.uid() = author_id);

-- RLS for attendance
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Attendance readable by teacher or student"
  ON public.attendance FOR SELECT
  USING (auth.uid() = student_id OR auth.uid() = teacher_id);

CREATE POLICY "Attendance writable by teacher"
  ON public.attendance FOR INSERT
  WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Attendance updatable by teacher"
  ON public.attendance FOR UPDATE
  USING (auth.uid() = teacher_id);

CREATE POLICY "Attendance deletable by teacher"
  ON public.attendance FOR DELETE
  USING (auth.uid() = teacher_id);
