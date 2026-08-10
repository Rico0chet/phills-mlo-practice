import { supabase } from "@/integrations/supabase/client";
import { chapters, saveChapterPageCount } from "@/lib/questions";
import { fetchPageTitles } from "@/lib/page-titles";

export type PageOverview = {
  page: number;
  title: string | null;
  questionCount: number;
  resourceCount: number;
  hasMedia: boolean;
};

/** Counts of questions/resources/media per page for a chapter. */
export async function fetchChapterPageOverview(chapter: number): Promise<PageOverview[]> {
  const info = chapters.find((c) => c.number === chapter);
  const pageCount = Math.max(1, info?.pages ?? 1);

  const [titles, questions, resources, media] = await Promise.all([
    fetchPageTitles(),
    supabase.from("questions").select("page").eq("chapter", chapter),
    supabase.from("chapter_resources").select("page").eq("chapter", chapter),
    supabase.from("chapter_media").select("page").eq("chapter", chapter),
  ]);
  if (questions.error) throw questions.error;
  if (resources.error) throw resources.error;
  if (media.error) throw media.error;

  const titleMap = new Map(
    titles.filter((t) => t.chapter === chapter).map((t) => [t.page, t.title]),
  );
  const count = (rows: { page: number }[] | null, page: number) =>
    (rows ?? []).filter((r) => r.page === page).length;

  return Array.from({ length: pageCount }, (_, i) => {
    const page = i + 1;
    return {
      page,
      title: titleMap.get(page) ?? null,
      questionCount: count(questions.data, page),
      resourceCount: count(resources.data, page),
      hasMedia: count(media.data, page) > 0,
    };
  });
}

async function shiftPageDown(chapter: number, from: number) {
  const to = from - 1;
  for (const table of ["questions", "chapter_resources", "chapter_media", "page_titles"] as const) {
    const { error } = await supabase
      .from(table)
      .update({ page: to })
      .eq("chapter", chapter)
      .eq("page", from);
    if (error) throw error;
  }
}

/**
 * Delete a page: removes all of its content, then shifts every later page down
 * by one and decrements the chapter's page count.
 */
export async function deleteChapterPage(chapter: number, page: number) {
  const info = chapters.find((c) => c.number === chapter);
  const pageCount = Math.max(1, info?.pages ?? 1);

  for (const table of ["questions", "chapter_resources", "chapter_media", "page_titles"] as const) {
    const { error } = await supabase.from(table).delete().eq("chapter", chapter).eq("page", page);
    if (error) throw error;
  }

  for (let p = page + 1; p <= pageCount; p++) {
    await shiftPageDown(chapter, p);
  }

  await saveChapterPageCount(chapter, Math.max(1, pageCount - 1));
  await fetchPageTitles();
}

/** Append a new empty page to a chapter. */
export async function addChapterPage(chapter: number) {
  const info = chapters.find((c) => c.number === chapter);
  const pageCount = Math.max(1, info?.pages ?? 1);
  await saveChapterPageCount(chapter, pageCount + 1);
  return pageCount + 1;
}
