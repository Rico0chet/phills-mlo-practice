import { useEffect, useState } from "react";
import { chapters, fetchChapterConfig, saveChapterPageCount } from "@/lib/questions";
import { Minus, Plus, Save } from "lucide-react";

export function AdminChaptersEditor() {
  const [counts, setCounts] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<number | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<number | null>(null);

  useEffect(() => {
    let cancel = false;
    fetchChapterConfig()
      .catch((e) => setMsg((e as Error).message))
      .finally(() => {
        if (cancel) return;
        setCounts(Object.fromEntries(chapters.map((c) => [c.number, c.pages])));
        setLoading(false);
      });
    return () => {
      cancel = true;
    };
  }, []);

  function currentPages(chapterNumber: number) {
    return chapters.find((c) => c.number === chapterNumber)?.pages ?? 1;
  }

  function requestSave(chapterNumber: number) {
    const next = counts[chapterNumber] ?? 1;
    if (next < currentPages(chapterNumber)) {
      setConfirming(chapterNumber);
      return;
    }
    void save(chapterNumber);
  }

  async function save(chapterNumber: number) {
    setBusy(chapterNumber);
    setConfirming(null);
    setMsg(null);
    try {
      await saveChapterPageCount(chapterNumber, counts[chapterNumber] ?? 1);
      setMsg(`Chapter ${chapterNumber} now has ${counts[chapterNumber]} page(s).`);
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  function bump(chapterNumber: number, delta: number) {
    setCounts((prev) => ({
      ...prev,
      [chapterNumber]: Math.max(1, (prev[chapterNumber] ?? 1) + delta),
    }));
  }

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      <p className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        Set how many pages each chapter has. Adding a page makes it immediately available on the
        home page — then use the Page Titles and Questions tabs to fill it in.
      </p>

      {msg && (
        <div className="rounded-md border border-border bg-accent px-3 py-2 text-sm">{msg}</div>
      )}

      <div className="space-y-3">
        {chapters.map((c) => (
          <div
            key={c.number}
            className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-4"
          >
            <span className="flex-1 min-w-[200px] text-sm font-medium text-foreground">
              {c.number}. {c.title}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => bump(c.number, -1)}
                className="rounded-md border border-border p-2 hover:bg-accent"
                aria-label={`Remove a page from chapter ${c.number}`}
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min={1}
                value={counts[c.number] ?? 1}
                onChange={(e) =>
                  setCounts({ ...counts, [c.number]: Math.max(1, Number(e.target.value) || 1) })
                }
                className="w-20 rounded-md border border-border bg-background px-3 py-1.5 text-center text-sm"
              />
              <button
                onClick={() => bump(c.number, 1)}
                className="rounded-md border border-border p-2 hover:bg-accent"
                aria-label={`Add a page to chapter ${c.number}`}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => requestSave(c.number)}
              disabled={busy === c.number}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              <Save className="h-4 w-4" /> {busy === c.number ? "Saving…" : "Save"}
            </button>

            {confirming === c.number && (
              <div className="w-full rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm">
                <p className="font-medium text-foreground">
                  Reduce chapter {c.number} from {currentPages(c.number)} to {counts[c.number]} page
                  {(counts[c.number] ?? 1) === 1 ? "" : "s"}?
                </p>
                <p className="mt-1 text-muted-foreground">
                  Page{currentPages(c.number) - (counts[c.number] ?? 1) === 1 ? "" : "s"}{" "}
                  {(counts[c.number] ?? 1) + 1}
                  {currentPages(c.number) - (counts[c.number] ?? 1) === 1
                    ? ""
                    : `–${currentPages(c.number)}`}{" "}
                  will no longer be available to students. Are you sure?
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => save(c.number)}
                    className="rounded-md bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
                  >
                    Yes, remove
                  </button>
                  <button
                    onClick={() => {
                      setConfirming(null);
                      setCounts((prev) => ({ ...prev, [c.number]: currentPages(c.number) }));
                    }}
                    className="rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-accent"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
