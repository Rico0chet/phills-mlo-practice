CREATE TABLE public.page_titles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter integer NOT NULL,
  page integer NOT NULL,
  title text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (chapter, page)
);

GRANT SELECT ON public.page_titles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_titles TO authenticated;
GRANT ALL ON public.page_titles TO service_role;

ALTER TABLE public.page_titles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Page titles viewable by everyone" ON public.page_titles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert page titles" ON public.page_titles FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update page titles" ON public.page_titles FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete page titles" ON public.page_titles FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_page_titles_updated_at BEFORE UPDATE ON public.page_titles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.page_titles (chapter, page, title) VALUES
  (1, 1, 'Conforming vs Non-Conforming'),
  (1, 2, 'Conforming vs Non-Conforming (continued)'),
  (1, 3, 'FHA'),
  (1, 4, 'V.A.'),
  (1, 5, 'USDA Loans'),
  (1, 6, 'Non-QM'),
  (2, 1, 'RESPA (RESPA 1974)'),
  (4, 1, 'Mortgage Mathematics');