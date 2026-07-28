import { supabase } from "@/integrations/supabase/client";

export type ChapterResource = {
  id: string;
  chapter: number;
  page: number;
  title: string;
  url: string | null;
  description: string | null;
  sort_order: number;
};

export async function fetchResources(
  chapter: number,
  page: number,
): Promise<ChapterResource[]> {
  const { data } = await supabase
    .from("chapter_resources")
    .select("id,chapter,page,title,url,description,sort_order")
    .eq("chapter", chapter)
    .eq("page", page)
    .order("sort_order", { ascending: true });
  return (data as ChapterResource[]) ?? [];
}

export async function addResource(input: {
  chapter: number;
  page: number;
  title: string;
  url: string | null;
  description: string | null;
  sort_order: number;
}): Promise<void> {
  const { error } = await supabase.from("chapter_resources").insert(input);
  if (error) throw error;
}

export async function updateResource(
  id: string,
  fields: Partial<Pick<ChapterResource, "title" | "url" | "description" | "sort_order">>,
): Promise<void> {
  const { error } = await supabase.from("chapter_resources").update(fields).eq("id", id);
  if (error) throw error;
}

export async function deleteResource(id: string): Promise<void> {
  const { error } = await supabase.from("chapter_resources").delete().eq("id", id);
  if (error) throw error;
}
