DROP POLICY IF EXISTS "Chapter audio readable by all" ON storage.objects;
CREATE POLICY "Signed-in users can read chapter audio" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'chapter-audio' AND auth.uid() IS NOT NULL);