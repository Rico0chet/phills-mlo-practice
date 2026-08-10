import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import {
  FLASHCARD_CATEGORIES,
  fetchFlashcards,
  saveFlashcard,
  deleteFlashcard,
  type Flashcard,
} from "@/lib/flashcards";

type EditState = { id?: string; front: string; back: string; sort_order: number };

export function AdminFlashcardsEditor() {
  const [category, setCategory] = useState(FLASHCARD_CATEGORIES[0].slug);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<EditState | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const load = (cat: string) => {
    setLoading(true);
    fetchFlashcards(cat)
      .then(setCards)
      .catch((e) => setMsg(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(category);
  }, [category]);

  const onSave = async () => {
    if (!edit) return;
    if (!edit.front.trim() || !edit.back.trim()) {
      setMsg("Front and back are both required.");
      return;
    }
    try {
      await saveFlashcard({ ...edit, category });
      setEdit(null);
      setMsg("Saved.");
      load(category);
    } catch (e) {
      setMsg((e as Error).message);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteFlashcard(id);
      setConfirmDelete(null);
      load(category);
    } catch (e) {
      setMsg((e as Error).message);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end gap-4 rounded-xl border border-border bg-card p-4">
        <label className="flex flex-col gap-1 text-sm">
          Category
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setEdit(null);
            }}
            className="rounded-md border border-border bg-background px-3 py-2"
          >
            {FLASHCARD_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={() => setEdit({ front: "", back: "", sort_order: cards.length })}
          className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> New card
        </button>
      </div>

      {msg && <p className="mb-4 text-sm text-muted-foreground">{msg}</p>}

      {edit && (
        <div className="mb-6 space-y-3 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-card-foreground">
              {edit.id ? "Edit card" : "New card"}
            </h3>
            <button onClick={() => setEdit(null)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <label className="flex flex-col gap-1 text-sm">
            Front (term / question)
            <textarea
              value={edit.front}
              onChange={(e) => setEdit({ ...edit, front: e.target.value })}
              rows={3}
              className="rounded-md border border-border bg-background px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Back (definition / answer)
            <textarea
              value={edit.back}
              onChange={(e) => setEdit({ ...edit, back: e.target.value })}
              rows={4}
              className="rounded-md border border-border bg-background px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Sort order
            <input
              type="number"
              value={edit.sort_order}
              onChange={(e) => setEdit({ ...edit, sort_order: Number(e.target.value) })}
              className="w-32 rounded-md border border-border bg-background px-3 py-2"
            />
          </label>
          <button
            onClick={onSave}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Save card
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : cards.length === 0 ? (
        <p className="text-muted-foreground">No cards in this category yet.</p>
      ) : (
        <ul className="space-y-3">
          {cards.map((c) => (
            <li key={c.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="whitespace-pre-wrap font-medium text-card-foreground">{c.front}</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">{c.back}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() =>
                      setEdit({ id: c.id, front: c.front, back: c.back, sort_order: c.sort_order })
                    }
                    className="rounded-md border border-border p-2 hover:bg-accent"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(c.id)}
                    className="rounded-md border border-border p-2 text-destructive hover:bg-accent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {confirmDelete === c.id && (
                <div className="mt-3 rounded-md border border-border bg-background p-3 text-sm">
                  Delete this flashcard permanently?
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => onDelete(c.id)}
                      className="rounded-md bg-destructive px-3 py-1.5 font-medium text-destructive-foreground"
                    >
                      Yes, delete
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="rounded-md border border-border px-3 py-1.5 font-medium"
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
