CREATE TABLE public.chapter_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter integer NOT NULL,
  page integer NOT NULL,
  title text NOT NULL,
  url text,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.chapter_resources TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chapter_resources TO authenticated;
GRANT ALL ON public.chapter_resources TO service_role;

ALTER TABLE public.chapter_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Resources viewable by everyone" ON public.chapter_resources FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert resources" ON public.chapter_resources FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update resources" ON public.chapter_resources FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete resources" ON public.chapter_resources FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_chapter_resources_updated_at BEFORE UPDATE ON public.chapter_resources FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX chapter_resources_chapter_page_idx ON public.chapter_resources (chapter, page, sort_order);