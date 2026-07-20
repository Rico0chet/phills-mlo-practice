import { supabase } from "@/integrations/supabase/client";

export type Question = {
  id: string;
  prompt: string;
  choices: { key: "A" | "B" | "C" | "D"; text: string }[];
  answer: "A" | "B" | "C" | "D";
  explanation?: string;
};

export type DbQuestion = {
  id: string;
  chapter: number;
  page: number;
  prompt: string;
  choices: string[];
  correct_index: number;
  explanation: string | null;
  sort_order: number;
};

const LETTERS: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];

export function dbToQuestion(r: DbQuestion): Question {
  return {
    id: r.id,
    prompt: r.prompt,
    choices: r.choices.map((text, i) => ({ key: LETTERS[i], text })),
    answer: LETTERS[r.correct_index],
    explanation: r.explanation ?? undefined,
  };
}

export async function fetchQuestions(chapter: number, page: number): Promise<Question[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("id,chapter,page,prompt,choices,correct_index,explanation,sort_order")
    .eq("chapter", chapter)
    .eq("page", page)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data as DbQuestion[]).map(dbToQuestion);
}

export async function fetchAllQuestions(): Promise<DbQuestion[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("id,chapter,page,prompt,choices,correct_index,explanation,sort_order")
    .order("chapter", { ascending: true })
    .order("page", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as DbQuestion[];
}

export type ChapterInfo = { number: number; title: string; pages: number };

export const chapters: ChapterInfo[] = [
  { number: 1, title: "Loan Types and Related Products", pages: 6 },
  { number: 2, title: "Regulatory Framework", pages: 7 },
  { number: 3, title: "Loan Processing", pages: 5 },
  { number: 4, title: "Mortgage Mathematics", pages: 1 },
  { number: 5, title: "Ethical Consideration and Compliance", pages: 6 },
  { number: 6, title: "Closing Process", pages: 5 },
  { number: 7, title: "Market Trends and Economic Factors", pages: 3 },
  { number: 8, title: "Customer Service and Communication Skills", pages: 3 },
  { number: 9, title: "Technology in Mortgage Lending", pages: 1 },
  { number: 10, title: "Practice Questions and Answers", pages: 8 },
];

export function getChapter(chapter: string | number): ChapterInfo | undefined {
  const n = Number(chapter);
  return chapters.find((c) => c.number === n);
}

export const QUESTIONS_PER_ATTEMPT = 20;

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildAttempt(pool: Question[], count = QUESTIONS_PER_ATTEMPT): Question[] {
  const picked = shuffle(pool).slice(0, Math.min(count, pool.length));
  return picked.map((q) => {
    const shuffledChoices = shuffle(q.choices);
    const newChoices = shuffledChoices.map((c, i) => ({ key: LETTERS[i], text: c.text }));
    const correctIdx = shuffledChoices.findIndex((c) => c.key === q.answer);
    return { ...q, choices: newChoices, answer: LETTERS[correctIdx] };
  });
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();
  if (error) return false;
  return !!data;
}
