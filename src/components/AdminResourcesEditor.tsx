import { useEffect, useState } from "react";
import { chapters } from "@/lib/questions";
import {
  addResource,
  deleteResource,
  fetchResources,
  updateResource,
  type ChapterResource,
} from "@/lib/resources";
import { Plus, Trash2 } from "lucide-react";

type Draft = { title: string; url: string; description: string };

const emptyDraft: Draft = { title: "", url: "", description: "" };

export function AdminResourcesEditor() {
  const [chapter, setChapter] = useState(1);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ChapterResource[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const chapterInfo = chapters.find((c) => c.number === chapter)!;

  async function load() {
    setItems(await fetchResources(chapter, page));
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, page]);

  async function handleAdd() {
    if (!draft.title.trim()) {
      setMsg("Title is required.");
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      await addResource({
        chapter,
        page,
        title: draft.title.trim(),
        url: draft.url.trim() || null,
        description: draft.description.trim() || null,
        sort_order: (items[items.length - 1]?.sort_order ?? -1) + 1,
      });
      setDraft(emptyDraft);
      await load();
      setMsg("Resource added.");
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function handleSave(r: ChapterResource) {
    setBusy(true);
    try {
      await updateResource(r.id, {
        title: r.title.trim(),
        url: r.url?.trim() || null,
        description: r.description?.trim() || null,
        sort_order: r.sort_order,
      });
      setMsg("Saved.");
      await load();
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this resource?")) return;
    setBusy(true);
    try {
      await deleteResource(id);
      await load();
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4 rounded-xl border border-border bg-card p-4">
        <label className="flex flex-col gap-1 text-sm">
          Chapter
          <select
            value={chapter}
            onChange={(e) => {
              setChapter(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-md border border-border bg-background px-3 py-1.5"
          >
            {chapters.map((c) => (
              <option key={c.number} value={c.number}>
                {c.number}. {c.title}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Page
          <select
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
            className="rounded-md border border-border bg-background px-3 py-1.5"
          >
            {Array.from({ length: chapterInfo.pages }, (_, i) => i + 1).map((p) => (
              <option key={p} value={p}>
                Page {p}
              </option>
            ))}
          </select>
        </label>
      </div>

      {msg && (
        <div className="rounded-md border border-border bg-accent px-3 py-2 text-sm">{msg}</div>
      )}

      <div className="space-y-3 rounded-xl border border-border bg-card p-4">
        <h2 className="font-semibold">Add a resource</h2>
        <input
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          placeholder="Title"
          className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
        />
        <input
          value={draft.url}
          onChange={(e) => setDraft({ ...draft, url: e.target.value })}
          placeholder="Link (optional) — https://…"
          className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
        />
        <textarea
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          rows={3}
          placeholder="Details / notes (optional)"
          className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
        />
        <button
          onClick={handleAdd}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" /> Add resource
        </button>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {items.length} resource{items.length === 1 ? "" : "s"} on this page.
        </p>
        {items.map((r, i) => (
          <div key={r.id} className="space-y-2 rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs text-muted-foreground">#{i + 1}</p>
              <button
                onClick={() => handleDelete(r.id)}
                className="rounded p-1.5 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                aria-label="Delete resource"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <input
              value={r.title}
              onChange={(e) =>
                setItems(items.map((x) => (x.id === r.id ? { ...x, title: e.target.value } : x)))
              }
              className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            />
            <input
              value={r.url ?? ""}
              onChange={(e) =>
                setItems(items.map((x) => (x.id === r.id ? { ...x, url: e.target.value } : x)))
              }
              placeholder="Link (optional)"
              className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            />
            <textarea
              value={r.description ?? ""}
              onChange={(e) =>
                setItems(
                  items.map((x) => (x.id === r.id ? { ...x, description: e.target.value } : x)),
                )
              }
              rows={3}
              placeholder="Details / notes (optional)"
              className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            />
            <button
              onClick={() => handleSave(r)}
              disabled={busy}
              className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent disabled:opacity-50"
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
