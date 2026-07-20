CREATE POLICY "Chapter audio readable by all"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'chapter-audio');

CREATE POLICY "Admins can upload chapter audio"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'chapter-audio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update chapter audio"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'chapter-audio' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'chapter-audio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete chapter audio"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'chapter-audio' AND public.has_role(auth.uid(), 'admin'));