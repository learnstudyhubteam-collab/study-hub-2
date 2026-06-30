-- Add level + placement tracking to learn_progress
ALTER TABLE public.learn_progress
  ADD COLUMN IF NOT EXISTS level INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS placement_done BOOLEAN NOT NULL DEFAULT FALSE;
