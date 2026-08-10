import { useEffect, useState } from "react";
import { chapters } from "@/lib/questions";
import { fetchPageTitles, PAGE_SUBTITLES, savePageTitle } from "@/lib/page-titles";
import { Save } from "lucide-react";

export function AdminPageTitlesEditor() {
  const [chapter, setChapter] = useState(1);
  const [titles, setTitles] = useState<Record<number, string>>({});
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const chapterInfo = chapters.find((c) => c.number === chapter)!;

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    fetchPageTitles()
      .then((rows) => {
        if (cancel) return;
        const next: Record<number, string> = {};
        for (let p = 1; p <= chapterInfo.pages; p++) {
          const row = rows.find((r) => r.chapter === chapter && r.page === p);
          next[p] = row?.title ?? PAGE_SUBTITLES[`${chapter}-${p}`] ?? "";
        }
        setTitles(next);
      })
      .catch((e) => setMsg((e as Error).message))
      .finally(() => !cancel && setLoading(false));
    return () => {
      cancel = true;
    };
  }, [chapter, chapterInfo.pages]);

  async function save(page: number) {
    setBusy(page);
    setMsg(null);
    try {
      await savePageTitle(chapter, page, titles[page] ?? "");
      setMsg(`Saved title for page ${page}.`);
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4 rounded-xl border border-border bg-card p-4">
        <label className="flex flex-col gap-1 text-sm">
          Chapter
          <select
            value={chapter}
            onChange={(e) => setChapter(Number(e.target.value))}
            className="rounded-md border border-border bg-background px-3 py-1.5"
          >
            {chapters.map((c) => (
              <option key={c.number} value={c.number}>
                {c.number}. {c.title}
              </option>
            ))}
          </select>
        </label>
        <p className="text-xs text-muted-foreground">
          Leave a title blank and save to fall back to “Page N”.
        </p>
      </div>

      {msg && (
        <div className="rounded-md border border-border bg-accent px-3 py-2 text-sm">{msg}</div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div className="space-y-3">
          {Array.from({ length: chapterInfo.pages }, (_, i) => i + 1).map((p) => (
            <div
              key={p}
              className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-4"
            >
              <span className="w-16 text-sm text-muted-foreground">Page {p}</span>
              <input
                type="text"
                value={titles[p] ?? ""}
                onChange={(e) => setTitles({ ...titles, [p]: e.target.value })}
                placeholder={`Page ${p}`}
                className="min-w-[240px] flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm"
              />
              <button
                onClick={() => save(p)}
                disabled={busy === p}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
              >
                <Save className="h-4 w-4" /> {busy === p ? "Saving…" : "Save"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
