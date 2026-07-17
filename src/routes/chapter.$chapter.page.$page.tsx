import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getQuestions, getChapter, buildAttempt, QUESTIONS_PER_ATTEMPT, type Question } from "@/lib/exam-data";
import { QuestionCard } from "@/components/QuestionCard";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/chapter/$chapter/page/$page")({
  head: ({ params }) => ({
    meta: [
      { title: `Chapter ${params.chapter} · Page ${params.page} — MLO Practice Exam` },
      {
        name: "description",
        content: `Chapter ${params.chapter}, page ${params.page} of the MLO licensing practice exam.`,
      },
    ],
  }),
  loader: ({ params }) => {
    const chapter = getChapter(params.chapter);
    if (!chapter) throw notFound();
    const pageNum = Number(params.page);
    if (!Number.isInteger(pageNum) || pageNum < 1 || pageNum > chapter.pages) throw notFound();
    const questions = getQuestions(params.chapter, params.page);
    return { questions, chapter };
  },
  component: ChapterPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-foreground">Not available</h1>
        <p className="mt-2 text-muted-foreground">
          This chapter page doesn't exist.
        </p>
        <Link to="/" className="mt-6 inline-block text-primary hover:underline">
          ← Back to chapters
        </Link>
      </div>
    </div>
  ),
});

function ChapterPage() {
  const { chapter: chapterParam, page } = Route.useParams();
  const { questions: pool, chapter } = Route.useLoaderData() as {
    questions: Question[] | null;
    chapter: { number: number; title: string; pages: number };
  };
  const [attemptSeed, setAttemptSeed] = useState(0);
  const [answers, setAnswers] = useState<Record<number, "A" | "B" | "C" | "D">>({});
  const [submitted, setSubmitted] = useState(false);

  // Build a fresh randomized attempt each time the page loads or the learner retries.
  const questions = useMemo(() => {
    if (!pool) return null;
    return buildAttempt(pool, QUESTIONS_PER_ATTEMPT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, attemptSeed]);

  const score = useMemo(() => {
    if (!submitted || !questions) return null;
    let correct = 0;
    for (const q of questions) if (answers[q.id] === q.answer) correct++;
    return correct;
  }, [submitted, answers, questions]);

  const pageNum = Number(page);
  const prevPage = pageNum > 1 ? String(pageNum - 1) : null;
  const nextPage = pageNum < chapter.pages ? String(pageNum + 1) : null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All chapters
          </Link>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Chapter {chapterParam} · Page {page}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            {chapter.title}
          </h1>
          {questions ? (
            <p className="mt-2 text-muted-foreground">
              {questions.length} randomized questions
              {pool && pool.length > questions.length ? ` (from a pool of ${pool.length})` : ""}
              . Questions and answer choices are shuffled each attempt.
            </p>
          ) : (
            <p className="mt-2 text-muted-foreground">
              Questions for this page haven't been added yet.
            </p>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        {questions ? (
          <>
            <div className="space-y-4">
              {questions.map((q, i) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  index={i}
                  selected={answers[q.id]}
                  revealed={submitted}
                  onSelect={(key) => setAnswers((a) => ({ ...a, [q.id]: key }))}
                />
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 shadow-sm">
              {submitted && score !== null ? (
                <>
                  <p className="text-sm text-muted-foreground">Your score</p>
                  <p className="text-4xl font-bold text-foreground">
                    {score} / {questions.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {Math.round((score / questions.length) * 100)}% correct
                  </p>
                  <button
                    onClick={() => {
                      setAnswers({});
                      setSubmitted(false);
                      setAttemptSeed((s) => s + 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="mt-2 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Retry
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setSubmitted(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={Object.keys(answers).length !== questions.length}
                  className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit answers ({Object.keys(answers).length}/{questions.length})
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <h2 className="text-xl font-semibold text-foreground">Coming soon</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Questions for Chapter {chapterParam}, Page {page} will be added shortly.
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          {prevPage ? (
            <Link
              to="/chapter/$chapter/page/$page"
              params={{ chapter: chapterParam, page: prevPage }}
              className="text-sm text-primary hover:underline"
            >
              ← Page {prevPage}
            </Link>
          ) : (
            <span />
          )}
          {nextPage ? (
            <Link
              to="/chapter/$chapter/page/$page"
              params={{ chapter: chapterParam, page: nextPage }}
              className="text-sm text-primary hover:underline"
            >
              Page {nextPage} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </main>
    </div>
  );
}
