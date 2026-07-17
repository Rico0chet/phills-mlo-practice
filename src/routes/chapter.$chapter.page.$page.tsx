import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { chapter1Page1, type Question } from "@/lib/exam-data";
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
    const questions = getQuestions(params.chapter, params.page);
    if (!questions) throw notFound();
    return { questions };
  },
  component: ChapterPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-foreground">Not available yet</h1>
        <p className="mt-2 text-muted-foreground">
          This chapter page hasn't been added. Check back soon.
        </p>
        <Link to="/" className="mt-6 inline-block text-primary hover:underline">
          ← Back to chapters
        </Link>
      </div>
    </div>
  ),
});

function getQuestions(chapter: string, page: string): Question[] | null {
  if (chapter === "1" && page === "1") return chapter1Page1;
  return null;
}

function ChapterPage() {
  const { chapter, page } = Route.useParams();
  const { questions } = Route.useLoaderData() as { questions: Question[] };
  const [answers, setAnswers] = useState<Record<number, "A" | "B" | "C" | "D">>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return null;
    let correct = 0;
    for (const q of questions) if (answers[q.id] === q.answer) correct++;
    return correct;
  }, [submitted, answers, questions]);

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
            Chapter {chapter} · Page {page}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Conventional Loans & Fundamentals
          </h1>
          <p className="mt-2 text-muted-foreground">
            {questions.length} multiple-choice questions. Answer each, then submit to see your score.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
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
      </main>
    </div>
  );
}
