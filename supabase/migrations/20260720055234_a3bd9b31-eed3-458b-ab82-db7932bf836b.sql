CREATE TABLE public.chapter_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter integer NOT NULL,
  page integer NOT NULL,
  audio_path text,
  transcript text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(chapter, page)
);

GRANT SELECT ON public.chapter_media TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.chapter_media TO authenticated;
GRANT ALL ON public.chapter_media TO service_role;

ALTER TABLE public.chapter_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chapter media viewable by everyone"
  ON public.chapter_media FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert chapter media"
  ON public.chapter_media FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update chapter media"
  ON public.chapter_media FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete chapter media"
  ON public.chapter_media FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_chapter_media_updated_at
  BEFORE UPDATE ON public.chapter_media
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();