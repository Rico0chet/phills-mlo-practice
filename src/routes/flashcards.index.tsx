import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { FLASHCARD_CATEGORIES, fetchFlashcardCounts } from "@/lib/flashcards";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AccountMenu } from "@/components/AccountMenu";

export const Route = createFileRoute("/flashcards/")({
  head: () => ({
    meta: [
      { title: "MLO Flashcards — Study by Exam Category" },
      {
        name: "description",
        content:
          "Study MLO licensing flashcards across six exam categories: federal laws, general knowledge, origination, ethics, uniform state content and practice questions.",
      },
      { property: "og:title", content: "MLO Flashcards — Study by Exam Category" },
      {
        property: "og:description",
        content: "Six categories of MLO licensing flashcards to drill before your exam.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FlashcardsIndex,
});

function FlashcardsIndex() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchFlashcardCounts().then(setCounts).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> Back to chapters
              </Link>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground">Flashcards</h1>
            </div>
            <div className="flex flex-col items-end gap-2">
              <AccountMenu />
              <ThemeToggle />
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Quick-recall study decks organized by the six national exam content areas.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FLASHCARD_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to="/flashcards/$category"
              params={{ category: cat.slug }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Deck
                </span>
                <span className="text-xs text-muted-foreground">
                  {counts[cat.slug] ?? 0} {(counts[cat.slug] ?? 0) === 1 ? "card" : "cards"}
                </span>
              </div>
              <h2 className="mt-2 text-xl font-semibold text-card-foreground">{cat.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
