import { createFileRoute, Link } from "@tanstack/react-router";
import { chapters } from "@/lib/exam-data";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            MLO Licensing
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
            Practice Exam
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Prepare for your Mortgage Loan Originator licensing exam with chapter-by-chapter
            practice questions. Select a chapter below to begin.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((ch) => {
            const available = ch.number === 1;
            const inner = (
              <div
                className={
                  "group h-full rounded-xl border border-border bg-card p-6 shadow-sm transition-all " +
                  (available
                    ? "hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
                    : "opacity-60")
                }
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Chapter {ch.number}
                  </span>
                  {!available && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      Coming soon
                    </span>
                  )}
                </div>
                <h2 className="mt-2 text-xl font-semibold text-card-foreground">
                  {ch.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {available ? "Page 1 · 20 questions" : "Not yet available"}
                </p>
              </div>
            );
            return available ? (
              <Link
                key={ch.number}
                to="/chapter/$chapter/page/$page"
                params={{ chapter: String(ch.number), page: "1" }}
              >
                {inner}
              </Link>
            ) : (
              <div key={ch.number}>{inner}</div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
