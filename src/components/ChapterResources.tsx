import { useEffect, useState } from "react";
import { fetchResources, type ChapterResource } from "@/lib/resources";
import { BookOpen, ChevronDown, ExternalLink } from "lucide-react";

export function ChapterResources({ chapter, page }: { chapter: number; page: number }) {
  const [items, setItems] = useState<ChapterResource[] | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancel = false;
    setOpen(false);
    fetchResources(chapter, page).then((r) => {
      if (!cancel) setItems(r);
    });
    return () => {
      cancel = true;
    };
  }, [chapter, page]);

  if (!items || items.length === 0) return null;

  return (
    <div className="mb-6 rounded-xl border border-border bg-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-foreground"
        aria-expanded={open}
      >
        <BookOpen className="h-4 w-4 text-primary" />
        Resources ({items.length})
        <ChevronDown
          className={`ml-auto h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul className="space-y-3 border-t border-border px-4 py-4">
          {items.map((r) => (
            <li key={r.id}>
              {r.url ? (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                >
                  {r.title}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <p className="font-medium text-foreground">{r.title}</p>
              )}
              {r.description && (
                <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
                  {r.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
