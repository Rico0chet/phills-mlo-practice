import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { chapters } from "@/lib/questions";
import { fetchPageTitles, getPageLabel } from "@/lib/page-titles";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AccountMenu } from "@/components/AccountMenu";


export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [, setTitlesVersion] = useState(0);

  useEffect(() => {
    let cancel = false;
    fetchPageTitles()
      .then(() => !cancel && setTitlesVersion((v) => v + 1))
      .catch(() => {});
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                MLO Licensing
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
                Practice Exam
              </h1>
            </div>
            <div className="flex flex-col items-end gap-2">
              <AccountMenu />
              <ThemeToggle />
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Prepare for your Mortgage Loan Originator licensing exam with chapter-by-chapter
            practice questions. Select a chapter and page below to begin.
          </p>
          <Link
            to="/stats"
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:border-primary hover:bg-accent"
          >
            View your stats →
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {chapters.map((ch) => (
            <div
              key={ch.number}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Chapter {ch.number}
                </span>
                <span className="text-xs text-muted-foreground">
                  {ch.pages} {ch.pages === 1 ? "page" : "pages"}
                </span>
              </div>
              <h2 className="mt-2 text-xl font-semibold text-card-foreground">
                {ch.title}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {Array.from({ length: ch.pages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    to="/chapter/$chapter/page/$page"
                    params={{ chapter: String(ch.number), page: String(p) }}
                    className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-accent hover:text-accent-foreground"
                  >
                    {getPageLabel(ch.number, p)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
