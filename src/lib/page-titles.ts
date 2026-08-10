import { supabase } from "@/integrations/supabase/client";

export const PAGE_SUBTITLES: Record<string, string> = {
  "1-1": "Conforming vs Non-Conforming",
  "1-2": "Conforming vs Non-Conforming (continued)",
  "1-3": "FHA",
  "1-4": "V.A.",
  "1-5": "USDA Loans",
  "1-6": "Non-QM",
  "2-1": "RESPA (RESPA 1974)",
  "4-1": "Mortgage Mathematics",
};

// Titles loaded from the database, keyed "chapter-page". Overrides the static map.
let overrides: Record<string, string> = {};

export function getPageSubtitle(chapter: number, page: number): string | null {
  const key = `${chapter}-${page}`;
  return overrides[key] ?? PAGE_SUBTITLES[key] ?? null;
}

export function getPageLabel(chapter: number, page: number): string {
  return getPageSubtitle(chapter, page) ?? `Page ${page}`;
}

export type PageTitle = {
  id: string;
  chapter: number;
  page: number;
  title: string;
};

export async function fetchPageTitles(): Promise<PageTitle[]> {
  const { data, error } = await supabase
    .from("page_titles")
    .select("id, chapter, page, title")
    .order("chapter", { ascending: true })
    .order("page", { ascending: true });
  if (error) throw error;
  const rows = (data ?? []) as PageTitle[];
  overrides = Object.fromEntries(rows.map((r) => [`${r.chapter}-${r.page}`, r.title]));
  return rows;
}

export async function savePageTitle(chapter: number, page: number, title: string) {
  const trimmed = title.trim();
  if (!trimmed) {
    const { error } = await supabase
      .from("page_titles")
      .delete()
      .eq("chapter", chapter)
      .eq("page", page);
    if (error) throw error;
    delete overrides[`${chapter}-${page}`];
    return;
  }
  const { error } = await supabase
    .from("page_titles")
    .upsert({ chapter, page, title: trimmed }, { onConflict: "chapter,page" });
  if (error) throw error;
  overrides[`${chapter}-${page}`] = trimmed;
}
