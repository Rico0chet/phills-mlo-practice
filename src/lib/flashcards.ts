import { supabase } from "@/integrations/supabase/client";

export type Flashcard = {
  id: string;
  category: string;
  front: string;
  back: string;
  sort_order: number;
};

export type FlashcardCategory = { slug: string; title: string; description: string };

export const FLASHCARD_CATEGORIES: FlashcardCategory[] = [
  {
    slug: "federal-mortgage-related-laws",
    title: "Federal Mortgage-Related Laws",
    description: "RESPA, TILA, ECOA, HMDA, FCRA and other federal rules.",
  },
  {
    slug: "general-mortgage-knowledge",
    title: "General Mortgage Knowledge",
    description: "Loan types, terms, qualification ratios and program basics.",
  },
  {
    slug: "mortgage-origination-activities",
    title: "Mortgage Origination Activities",
    description: "Application, processing, underwriting and closing steps.",
  },
  {
    slug: "ethics",
    title: "Ethics",
    description: "Fair lending, prohibited acts, fraud detection and disclosure duties.",
  },
  {
    slug: "uniform-state-content",
    title: "Uniform State Content",
    description: "SAFE Act licensing, NMLS requirements and state regulatory authority.",
  },
  {
    slug: "practice-questions",
    title: "Practice Questions",
    description: "Mixed review cards drawn from across the exam outline.",
  },
];

export function getFlashcardCategory(slug: string) {
  return FLASHCARD_CATEGORIES.find((c) => c.slug === slug);
}

export async function fetchFlashcards(category: string): Promise<Flashcard[]> {
  const { data, error } = await supabase
    .from("flashcards")
    .select("id,category,front,back,sort_order")
    .eq("category", category)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Flashcard[];
}

export async function fetchFlashcardCounts(): Promise<Record<string, number>> {
  const { data, error } = await supabase.from("flashcards").select("category");
  if (error) throw error;
  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.category] = (counts[row.category] ?? 0) + 1;
  }
  return counts;
}

export async function saveFlashcard(card: {
  id?: string;
  category: string;
  front: string;
  back: string;
  sort_order: number;
}) {
  if (card.id) {
    const { error } = await supabase
      .from("flashcards")
      .update({
        category: card.category,
        front: card.front,
        back: card.back,
        sort_order: card.sort_order,
      })
      .eq("id", card.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("flashcards").insert({
      category: card.category,
      front: card.front,
      back: card.back,
      sort_order: card.sort_order,
    });
    if (error) throw error;
  }
}

export async function deleteFlashcard(id: string) {
  const { error } = await supabase.from("flashcards").delete().eq("id", id);
  if (error) throw error;
}
