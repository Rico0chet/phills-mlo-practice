import { chapters } from "./questions";
import { supabase } from "@/integrations/supabase/client";
import { recordCloudAttempt, clearCloudStats } from "./stats.functions";

const KEY = "mlo-stats-v1";


export type ChapterStat = {
  correct: number;
  total: number;
  attempts: number;
};

export type StatsState = Record<string, ChapterStat>;

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadStats(): StatsState {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as StatsState;
  } catch {
    return {};
  }
}

function saveStats(s: StatsState) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

export function recordAttempt(chapter: string | number, correct: number, total: number) {
  const key = String(chapter);
  const s = loadStats();
  const cur = s[key] ?? { correct: 0, total: 0, attempts: 0 };
  s[key] = {
    correct: cur.correct + correct,
    total: cur.total + total,
    attempts: cur.attempts + 1,
  };
  saveStats(s);
  // Fire-and-forget cloud sync when signed in
  void syncAttemptToCloud(String(chapter), correct, total);
}

async function syncAttemptToCloud(chapter: string, correct: number, total: number) {
  try {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return;
    await recordCloudAttempt({ data: { chapter, correct, total } });
  } catch (e) {
    console.warn("Cloud stats sync failed", e);
  }
}

export function clearStats() {
  if (isBrowser()) window.localStorage.removeItem(KEY);
  void (async () => {
    try {
      const { data } = await supabase.auth.getSession();
      if (data.session) await clearCloudStats();
    } catch (e) {
      console.warn("Cloud stats clear failed", e);
    }
  })();
}


export type ChapterSummary = {
  number: number;
  title: string;
  correct: number;
  total: number;
  attempts: number;
  accuracy: number | null;
};

export function summarize(state: StatsState): ChapterSummary[] {
  return chapters.map((ch) => {
    const s = state[String(ch.number)];
    const total = s?.total ?? 0;
    const correct = s?.correct ?? 0;
    return {
      number: ch.number,
      title: ch.title,
      correct,
      total,
      attempts: s?.attempts ?? 0,
      accuracy: total > 0 ? correct / total : null,
    };
  });
}
