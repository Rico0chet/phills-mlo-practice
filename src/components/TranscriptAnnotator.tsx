import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bold, Eraser, Highlighter, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";

type Mark = { start: number; end: number; type: "highlight" | "bold" };

type Stored = { marks: Mark[]; note: string };

function storageKey(chapter: number, page: number) {
  return `mlo-notes-${chapter}-${page}`;
}

function load(chapter: number, page: number): Stored {
  if (typeof window === "undefined") return { marks: [], note: "" };
  try {
    const raw = window.localStorage.getItem(storageKey(chapter, page));
    if (!raw) return { marks: [], note: "" };
    const parsed = JSON.parse(raw) as Stored;
    return { marks: Array.isArray(parsed.marks) ? parsed.marks : [], note: parsed.note ?? "" };
  } catch {
    return { marks: [], note: "" };
  }
}

/** Absolute character offset of a (node, offset) position inside root. */
function offsetInRoot(root: HTMLElement, node: Node, offset: number): number | null {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let total = 0;
  let current = walker.nextNode();
  while (current) {
    if (current === node) return total + offset;
    total += current.textContent?.length ?? 0;
    current = walker.nextNode();
  }
  if (node === root) return Math.min(total, offset);
  return null;
}

export function TranscriptAnnotator({
  chapter,
  page,
  text,
}: {
  chapter: number;
  page: number;
  text: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);

  useEffect(() => {
    const stored = load(chapter, page);
    setMarks(stored.marks);
    setNote(stored.note);
    setShowNote(Boolean(stored.note));
  }, [chapter, page]);

  const persist = useCallback(
    (next: Partial<Stored>) => {
      const value: Stored = { marks, note, ...next };
      try {
        window.localStorage.setItem(storageKey(chapter, page), JSON.stringify(value));
      } catch {
        /* ignore quota errors */
      }
    },
    [chapter, page, marks, note],
  );

  const readSelection = useCallback((): { start: number; end: number } | null => {
    const root = containerRef.current;
    const sel = window.getSelection();
    if (!root || !sel || sel.rangeCount === 0 || sel.isCollapsed) return null;
    const range = sel.getRangeAt(0);
    if (!root.contains(range.commonAncestorContainer)) return null;
    const start = offsetInRoot(root, range.startContainer, range.startOffset);
    const end = offsetInRoot(root, range.endContainer, range.endOffset);
    if (start === null || end === null || start === end) return null;
    return { start: Math.min(start, end), end: Math.max(start, end) };
  }, []);

  useEffect(() => {
    const onSelectionChange = () => setHasSelection(readSelection() !== null);
    document.addEventListener("selectionchange", onSelectionChange);
    return () => document.removeEventListener("selectionchange", onSelectionChange);
  }, [readSelection]);

  const apply = (type: Mark["type"]) => {
    const range = readSelection();
    if (!range) return;
    const next = [...marks, { ...range, type }];
    setMarks(next);
    persist({ marks: next });
    window.getSelection()?.removeAllRanges();
    setHasSelection(false);
  };

  const clearSelection = () => {
    const range = readSelection();
    const next = range
      ? marks.flatMap((m) => {
          if (m.end <= range.start || m.start >= range.end) return [m];
          const parts: Mark[] = [];
          if (m.start < range.start) parts.push({ ...m, end: range.start });
          if (m.end > range.end) parts.push({ ...m, start: range.end });
          return parts;
        })
      : [];
    setMarks(next);
    persist({ marks: next });
    window.getSelection()?.removeAllRanges();
    setHasSelection(false);
  };

  // Build contiguous segments with the same formatting flags.
  const segments = useMemo(() => {
    const len = text.length;
    const hi = new Uint8Array(len);
    const bo = new Uint8Array(len);
    for (const m of marks) {
      const s = Math.max(0, Math.min(len, m.start));
      const e = Math.max(0, Math.min(len, m.end));
      for (let i = s; i < e; i++) {
        if (m.type === "highlight") hi[i] = 1;
        else bo[i] = 1;
      }
    }
    const out: { text: string; hi: boolean; bo: boolean }[] = [];
    let i = 0;
    while (i < len) {
      const h = hi[i];
      const b = bo[i];
      let j = i + 1;
      while (j < len && hi[j] === h && bo[j] === b) j++;
      out.push({ text: text.slice(i, j), hi: h === 1, bo: b === 1 });
      i = j;
    }
    return out;
  }, [text, marks]);

  return (
    <div className="mt-3">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <button
          onClick={() => apply("highlight")}
          disabled={!hasSelection}
          className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Highlighter className="h-3.5 w-3.5" /> Highlight
        </button>
        <button
          onClick={() => apply("bold")}
          disabled={!hasSelection}
          className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Bold className="h-3.5 w-3.5" /> Bold
        </button>
        <button
          onClick={clearSelection}
          className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Eraser className="h-3.5 w-3.5" /> {hasSelection ? "Clear selection" : "Clear all"}
        </button>
        <button
          onClick={() => setShowNote((s) => !s)}
          className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <StickyNote className="h-3.5 w-3.5" /> {showNote ? "Hide notes" : "My notes"}
        </button>
        <span className="text-xs text-muted-foreground">Select text, then choose a style.</span>
      </div>

      <div
        ref={containerRef}
        className="max-h-96 select-text overflow-y-auto whitespace-pre-wrap rounded-md border border-border bg-background p-4 text-sm leading-relaxed text-foreground"
      >
        {segments.map((s, i) => (
          <span
            key={i}
            className={cn(
              s.hi && "rounded-sm bg-yellow-200 text-yellow-950 dark:bg-yellow-500/40 dark:text-foreground",
              s.bo && "font-bold",
            )}
          >
            {s.text}
          </span>
        ))}
      </div>

      {showNote && (
        <textarea
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            persist({ note: e.target.value });
          }}
          rows={5}
          placeholder="Write your own notes for this page…"
          className="mt-3 w-full rounded-md border border-border bg-background p-3 text-sm leading-relaxed text-foreground outline-none focus:ring-2 focus:ring-ring"
        />
      )}
    </div>
  );
}
