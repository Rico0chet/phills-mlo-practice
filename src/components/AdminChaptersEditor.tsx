import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { chapters, fetchChapterConfig } from "@/lib/questions";
import { savePageTitle, getPageLabel } from "@/lib/page-titles";
import {
  addChapterPage,
  deleteChapterPage,
  fetchChapterPageOverview,
  type PageOverview,
} from "@/lib/chapter-admin";
import { Check, ExternalLink, Pencil, Plus, Trash2, X } from "lucide-react";

export function AdminChaptersEditor() {
  const [chapter, setChapter] = useState<number>(chapters[0]?.number ?? 1);
  const [pages, setPages] = useState<PageOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async (ch: number) => {
    setLoading(true);
    try {
      await fetchChapterConfig();
      setPages(await fetchChapterPageOverview(ch));
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(chapter);
  }, [chapter, load]);

  async function saveTitle(page: number) {
    setBusy(true);
    setMsg(null);
    try {
      await savePageTitle(chapter, page, draftTitle);
      setEditing(null);
      await load(chapter);
      setMsg(`Saved title for page ${page}.`);
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function removePage(page: number) {
    setBusy(true);
    setMsg(null);
    try {
      await deleteChapterPage(chapter, page);
      setConfirmDelete(null);
      await load(chapter);
      setMsg(`Page ${page} deleted.`);
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function addPage() {
    setBusy(true);
    setMsg(null);
    try {
      const n = await addChapterPage(chapter);
      await load(chapter);
      setMsg(`Added page ${n}.`);
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const current = chapters.find((c) => c.number === chapter);

  return (
    <div className="space-y-6">
      <p className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        Pick a chapter to see every page it contains. You can rename a page, open it, add a new one,
        or delete one — deleting removes that page's questions, audio, and resources, and renumbers
        the pages that follow.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium text-foreground">Chapter</label>
        <select
          value={chapter}
          onChange={(e) => {
            setEditing(null);
            setConfirmDelete(null);
            setChapter(Number(e.target.value));
          }}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        >
          {chapters.map((c) => (
            <option key={c.number} value={c.number}>
              {c.number}. {c.title}
            </option>
          ))}
        </select>
        <button
          onClick={addPage}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> Add page
        </button>
        <span className="text-sm text-muted-foreground">
          {current?.pages ?? 0} page{(current?.pages ?? 0) === 1 ? "" : "s"}
        </span>
      </div>

      {msg && (
        <div className="rounded-md border border-border bg-accent px-3 py-2 text-sm">{msg}</div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div className="space-y-3">
          {pages.map((p) => (
            <div key={p.page} className="rounded-lg border border-border bg-card p-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md bg-accent px-2 py-1 text-xs font-semibold text-foreground">
                  Page {p.page}
                </span>

                {editing === p.page ? (
                  <>
                    <input
                      value={draftTitle}
                      onChange={(e) => setDraftTitle(e.target.value)}
                      placeholder={`Page ${p.page}`}
                      className="min-w-[220px] flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm"
                    />
                    <button
                      onClick={() => saveTitle(p.page)}
                      disabled={busy}
                      className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                    >
                      <Check className="h-4 w-4" /> Save
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
                    >
                      <X className="h-4 w-4" /> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 min-w-[200px] text-sm font-medium text-foreground">
                      {p.title ?? getPageLabel(chapter, p.page)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {p.questionCount} question{p.questionCount === 1 ? "" : "s"} ·{" "}
                      {p.resourceCount} resource{p.resourceCount === 1 ? "" : "s"} ·{" "}
                      {p.hasMedia ? "audio" : "no audio"}
                    </span>
                    <Link
                      to="/chapter/$chapter/page/$page"
                      params={{ chapter: String(chapter), page: String(p.page) }}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
                    >
                      <ExternalLink className="h-4 w-4" /> Open
                    </Link>
                    <button
                      onClick={() => {
                        setConfirmDelete(null);
                        setEditing(p.page);
                        setDraftTitle(p.title ?? "");
                      }}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
                    >
                      <Pencil className="h-4 w-4" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        setEditing(null);
                        setConfirmDelete(p.page);
                      }}
                      disabled={pages.length <= 1}
                      className="inline-flex items-center gap-1 rounded-md border border-destructive/50 px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </>
                )}
              </div>

              {confirmDelete === p.page && (
                <div className="mt-3 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm">
                  <p className="font-medium text-foreground">
                    Delete page {p.page} ({p.title ?? getPageLabel(chapter, p.page)})?
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    This permanently removes {p.questionCount} question
                    {p.questionCount === 1 ? "" : "s"}, {p.resourceCount} resource
                    {p.resourceCount === 1 ? "" : "s"}, and any audio/transcript for this page. Later
                    pages will move up one number. Are you sure?
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => removePage(p.page)}
                      disabled={busy}
                      className="rounded-md bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 disabled:opacity-60"
                    >
                      {busy ? "Deleting…" : "Yes, delete page"}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
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
      )}
    </div>
  );
}
