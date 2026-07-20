import { supabase } from "@/integrations/supabase/client";

export type ChapterMedia = {
  id: string;
  chapter: number;
  page: number;
  audio_path: string | null;
  transcript: string | null;
};

export async function fetchMedia(chapter: number, page: number): Promise<ChapterMedia | null> {
  const { data } = await supabase
    .from("chapter_media")
    .select("id,chapter,page,audio_path,transcript")
    .eq("chapter", chapter)
    .eq("page", page)
    .maybeSingle();
  return (data as ChapterMedia | null) ?? null;
}

export async function getSignedAudioUrl(path: string): Promise<string | null> {
  const { data } = await supabase.storage
    .from("chapter-audio")
    .createSignedUrl(path, 60 * 60);
  return data?.signedUrl ?? null;
}

export async function uploadAudio(
  chapter: number,
  page: number,
  file: File,
): Promise<string> {
  const ext = file.name.split(".").pop() || "mp3";
  const path = `chapter-${chapter}/page-${page}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from("chapter-audio")
    .upload(path, file, { contentType: file.type || "audio/mpeg", upsert: false });
  if (error) throw error;
  return path;
}

export async function removeAudio(path: string): Promise<void> {
  await supabase.storage.from("chapter-audio").remove([path]);
}

export async function upsertMedia(
  chapter: number,
  page: number,
  fields: { audio_path?: string | null; transcript?: string | null },
): Promise<void> {
  const existing = await fetchMedia(chapter, page);
  if (existing) {
    const { error } = await supabase
      .from("chapter_media")
      .update(fields)
      .eq("id", existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("chapter_media")
      .insert({ chapter, page, ...fields });
    if (error) throw error;
  }
}
