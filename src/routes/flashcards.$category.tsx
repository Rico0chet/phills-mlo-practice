import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Pause, Play, RotateCcw, Shuffle } from "lucide-react";
import { getFlashcardCategory, fetchFlashcards, type Flashcard } from "@/lib/flashcards";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/flashcards/$category")({
  loader: ({ params }) => {
    const cat = getFlashcardCategory(params.category);
    if (!cat) throw notFound();
    return cat;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Flashcards"} — MLO Flashcards` },
      { name: "description", content: loaderData?.description ?? "MLO licensing flashcards." },
      { property: "og:title", content: `${loaderData?.title ?? "Flashcards"} — MLO Flashcards` },
      { property: "og:description", content: loaderData?.description ?? "MLO licensing flashcards." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: () => <Fallback message="Something went wrong loading this deck." />,
  notFoundComponent: () => <Fallback message="That flashcard deck does not exist." />,
  component: FlashcardDeck,
});

function Fallback({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-card-foreground">{message}</p>
        <Link to="/flashcards" className="mt-4 inline-block text-sm text-primary hover:underline">
          Back to flashcards
        </Link>
      </div>
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function FlashcardDeck() {
  const cat = Route.useLoaderData();
  const { category } = Route.useParams();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchFlashcards(category)
      .then((c) => {
        setCards(c);
        setIndex(0);
        setFlipped(false);
      })
      .catch(() => setCards([]))
      .finally(() => setLoading(false));
  }, [category]);

  const card = cards[index];

  const go = (delta: number) => {
    setFlipped(false);
    setIndex((i) => Math.min(Math.max(i + delta, 0), Math.max(cards.length - 1, 0)));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link
                to="/flashcards"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> All decks
              </Link>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">{cat.title}</h1>
              <p className="mt-2 text-muted-foreground">{cat.description}</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        {loading ? (
          <p className="text-muted-foreground">Loading cards…</p>
        ) : cards.length === 0 ? (
          <p className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
            No flashcards in this deck yet.
          </p>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Card {index + 1} of {cards.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCards((c) => shuffle(c));
                    setIndex(0);
                    setFlipped(false);
                  }}
                  className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 font-medium text-foreground hover:bg-accent"
                >
                  <Shuffle className="h-4 w-4" /> Shuffle
                </button>
                <button
                  onClick={() => {
                    setIndex(0);
                    setFlipped(false);
                  }}
                  className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 font-medium text-foreground hover:bg-accent"
                >
                  <RotateCcw className="h-4 w-4" /> Restart
                </button>
              </div>
            </div>

            <button
              onClick={() => setFlipped((f) => !f)}
              className="flex min-h-64 w-full flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center shadow-sm transition-colors hover:border-primary"
            >
              <span className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {flipped ? "Answer" : "Question"}
              </span>
              <span className="whitespace-pre-wrap text-lg text-card-foreground">
                {flipped ? card.back : card.front}
              </span>
              <span className="mt-6 text-xs text-muted-foreground">Click to flip</span>
            </button>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => go(-1)}
                disabled={index === 0}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent disabled:opacity-40"
              >
                ← Previous
              </button>
              <button
                onClick={() => go(1)}
                disabled={index >= cards.length - 1}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
