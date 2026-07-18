import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { StatsState } from "./stats";

export const loadCloudStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<StatsState> => {
    const { data, error } = await context.supabase
      .from("chapter_stats")
      .select("chapter, correct, total, attempts");
    if (error) throw new Error(error.message);
    const out: StatsState = {};
    for (const row of data ?? []) {
      out[row.chapter] = {
        correct: row.correct,
        total: row.total,
        attempts: row.attempts,
      };
    }
    return out;
  });

const recordSchema = z.object({
  chapter: z.string().min(1).max(20),
  correct: z.number().int().min(0),
  total: z.number().int().min(0).max(1000),
});

export const recordCloudAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => recordSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { chapter, correct, total } = data;
    const { data: existing, error: selErr } = await context.supabase
      .from("chapter_stats")
      .select("correct, total, attempts")
      .eq("user_id", context.userId)
      .eq("chapter", chapter)
      .maybeSingle();
    if (selErr) throw new Error(selErr.message);

    const next = {
      user_id: context.userId,
      chapter,
      correct: (existing?.correct ?? 0) + correct,
      total: (existing?.total ?? 0) + total,
      attempts: (existing?.attempts ?? 0) + 1,
      updated_at: new Date().toISOString(),
    };
    const { error } = await context.supabase
      .from("chapter_stats")
      .upsert(next, { onConflict: "user_id,chapter" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const clearCloudStats = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { error } = await context.supabase
      .from("chapter_stats")
      .delete()
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
