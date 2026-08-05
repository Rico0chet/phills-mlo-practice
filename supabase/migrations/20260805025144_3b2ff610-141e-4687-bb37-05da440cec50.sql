ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS question_type text NOT NULL DEFAULT 'multiple_choice';
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS numeric_answer text;
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS answer_tolerance numeric DEFAULT 0.01;