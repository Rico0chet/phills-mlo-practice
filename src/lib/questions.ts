import { supabase } from "@/integrations/supabase/client";

export type Question = {
  id: string;
  prompt: string;
  type: "multiple_choice" | "numeric";
  choices: { key: "A" | "B" | "C" | "D"; text: string }[];
  answer: "A" | "B" | "C" | "D";
  numericAnswer?: string;
  tolerance?: number;
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
  question_type: string;
  numeric_answer: string | null;
  answer_tolerance: number | null;
};

const LETTERS: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];

export function dbToQuestion(r: DbQuestion): Question {
  if (r.question_type === "numeric") {
    return {
      id: r.id,
      prompt: r.prompt,
      type: "numeric",
      choices: [],
      answer: "A",
      numericAnswer: r.numeric_answer ?? "",
      tolerance: r.answer_tolerance ?? 0.01,
      explanation: r.explanation ?? undefined,
    };
  }
  return {
    id: r.id,
    prompt: r.prompt,
    type: "multiple_choice",
    choices: (r.choices ?? []).map((text, i) => ({ key: LETTERS[i], text })),
    answer: LETTERS[r.correct_index] ?? "A",
    explanation: r.explanation ?? undefined,
  };
}

export async function fetchQuestions(chapter: number, page: number): Promise<Question[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("id,chapter,page,prompt,choices,correct_index,explanation,sort_order,question_type,numeric_answer,answer_tolerance")
    .eq("chapter", chapter)
    .eq("page", page)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data as DbQuestion[]).map(dbToQuestion);
}

export async function fetchAllQuestions(): Promise<DbQuestion[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("id,chapter,page,prompt,choices,correct_index,explanation,sort_order,question_type,numeric_answer,answer_tolerance")
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

/** Load page counts (and titles) from the database, overriding the static defaults. */
export async function fetchChapterConfig(): Promise<ChapterInfo[]> {
  const { data, error } = await supabase
    .from("chapters")
    .select("id, title, page_count")
    .order("id", { ascending: true });
  if (error) throw error;
  for (const row of data ?? []) {
    const local = chapters.find((c) => c.number === row.id);
    if (local) {
      local.pages = Math.max(1, row.page_count);
      local.title = row.title;
    } else {
      chapters.push({ number: row.id, title: row.title, pages: Math.max(1, row.page_count) });
    }
  }
  chapters.sort((a, b) => a.number - b.number);
  return chapters;
}

export async function saveChapterPageCount(chapterNumber: number, pageCount: number) {
  const chapter = chapters.find((c) => c.number === chapterNumber);
  const pages = Math.max(1, Math.floor(pageCount));
  const { error } = await supabase
    .from("chapters")
    .upsert(
      { id: chapterNumber, title: chapter?.title ?? `Chapter ${chapterNumber}`, page_count: pages },
      { onConflict: "id" },
    );
  if (error) throw error;
  if (chapter) chapter.pages = pages;
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
    if (q.type === "numeric") return q;
    const shuffledChoices = shuffle(q.choices);
    const newChoices = shuffledChoices.map((c, i) => ({ key: LETTERS[i], text: c.text }));
    const correctIdx = shuffledChoices.findIndex((c) => c.key === q.answer);
    return { ...q, choices: newChoices, answer: LETTERS[correctIdx] };
  });
}

/** Extract the numeric value from a string like "$1,456.32" or "3.5%" */
export function parseNumeric(s: string): number | null {
  const cleaned = s.replace(/[^0-9.\-]/g, "");
  if (!cleaned || cleaned === "-" || cleaned === "." || cleaned === "-.") return null;
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

/** Compare a learner's answer to the correct answer within tolerance */
export function isNumericCorrect(userAnswer: string, correctAnswer: string, tolerance = 0.01): boolean {
  const user = parseNumeric(userAnswer);
  const correct = parseNumeric(correctAnswer);
  if (user === null || correct === null) return false;
  return Math.abs(user - correct) <= tolerance;
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
