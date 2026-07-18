import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, TrendingUp, AlertTriangle, Circle } from "lucide-react";
import { loadStats, summarize, clearStats, type ChapterSummary } from "@/lib/stats";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Your Stats — MLO Practice Exam" },
      { name: "description", content: "Track strengths and areas needing improvement across chapters." },
    ],
  }),
  component: StatsPage,
});

const STRONG = 0.8;
const WEAK = 0.6;

function StatsPage() {
  const [summary, setSummary] = useState<ChapterSummary[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSummary(summarize(loadStats()));
    setLoaded(true);
  }, []);

  const answered = summary.filter((s) => s.total > 0);
  const strong = answered.filter((s) => (s.accuracy ?? 0) >= STRONG);
  const weak = answered.filter((s) => (s.accuracy ?? 0) < WEAK);
  const middle = answered.filter((s) => (s.accuracy ?? 0) >= WEAK && (s.accuracy ?? 0) < STRONG);
  const untried = summary.filter((s) => s.total === 0);

  const totalCorrect = answered.reduce((a, s) => a + s.correct, 0);
  const totalAnswered = answered.reduce((a, s) => a + s.total, 0);
  const overall = totalAnswered > 0 ? totalCorrect / totalAnswered : null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All chapters
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Your Stats</h1>
          <p className="mt-2 text-muted-foreground">
            Based on the practice attempts you've submitted on this device.
          </p>
          {loaded && overall !== null && (
            <div className="mt-6 flex flex-wrap items-baseline gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Overall accuracy</p>
                <p className="text-3xl font-bold text-foreground">{Math.round(overall * 100)}%</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Questions answered</p>
                <p className="text-3xl font-bold text-foreground">{totalAnswered}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Correct</p>
                <p className="text-3xl font-bold text-foreground">{totalCorrect}</p>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8 space-y-8">
        {loaded && answered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <h2 className="text-xl font-semibold text-foreground">No attempts yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Submit a chapter page to start tracking your strengths and weaknesses.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Browse chapters
            </Link>
          </div>
        ) : (
          <>
            <Section
              title="Strengths"
              subtitle={`Chapters with ≥ ${Math.round(STRONG * 100)}% accuracy`}
              icon={<TrendingUp className="h-5 w-5 text-emerald-600" />}
              rows={strong}
              tone="strong"
              empty="No strong chapters yet — keep practicing."
            />
            <Section
              title="Needs Improvement"
              subtitle={`Chapters below ${Math.round(WEAK * 100)}% accuracy`}
              icon={<AlertTriangle className="h-5 w-5 text-red-600" />}
              rows={weak}
              tone="weak"
              empty="Nothing weak — great work."
            />
            <Section
              title="Getting There"
              subtitle={`Between ${Math.round(WEAK * 100)}% and ${Math.round(STRONG * 100)}%`}
              icon={<Circle className="h-5 w-5 text-amber-600" />}
              rows={middle}
              tone="mid"
              empty="No chapters in this range."
            />
            {untried.length > 0 && (
              <Section
                title="Not Attempted"
                subtitle="Chapters you haven't tried yet"
                icon={<Circle className="h-5 w-5 text-muted-foreground" />}
                rows={untried}
                tone="none"
                empty=""
              />
            )}

            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (confirm("Clear all saved stats?")) {
                    clearStats();
                    setSummary(summarize({}));
                  }
                }}
                className="text-sm text-muted-foreground hover:text-red-600"
              >
                Reset stats
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function Section({
  title,
  subtitle,
  icon,
  rows,
  tone,
  empty,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  rows: ChapterSummary[];
  tone: "strong" | "weak" | "mid" | "none";
  empty: string;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <span className="text-sm text-muted-foreground">· {subtitle}</span>
      </div>
      {rows.length === 0 ? (
        empty ? <p className="text-sm text-muted-foreground">{empty}</p> : null
      ) : (
        <div className="space-y-2">
          {rows.map((r) => (
            <ChapterRow key={r.number} row={r} tone={tone} />
          ))}
        </div>
      )}
    </section>
  );
}

function ChapterRow({ row, tone }: { row: ChapterSummary; tone: "strong" | "weak" | "mid" | "none" }) {
  const pct = row.accuracy === null ? 0 : Math.round(row.accuracy * 100);
  const barColor =
    tone === "strong" ? "bg-emerald-500"
    : tone === "weak" ? "bg-red-500"
    : tone === "mid" ? "bg-amber-500"
    : "bg-muted-foreground/30";

  return (
    <Link
      to="/chapter/$chapter/page/$page"
      params={{ chapter: String(row.number), page: "1" }}
      className="block rounded-xl border border-border bg-card p-4 shadow-sm hover:border-primary"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Chapter {row.number}
          </p>
          <h3 className="truncate text-sm font-semibold text-card-foreground">{row.title}</h3>
        </div>
        <div className="text-right">
          {row.accuracy === null ? (
            <span className="text-sm text-muted-foreground">Not attempted</span>
          ) : (
            <>
              <p className="text-lg font-bold text-foreground">{pct}%</p>
              <p className="text-xs text-muted-foreground">
                {row.correct}/{row.total} · {row.attempts} {row.attempts === 1 ? "attempt" : "attempts"}
              </p>
            </>
          )}
        </div>
      </div>
      {row.accuracy !== null && (
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className={`h-full ${barColor}`} style={{ width: `${pct}%` }} />
        </div>
      )}
    </Link>
  );
}
