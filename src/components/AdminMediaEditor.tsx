import { useEffect, useState } from "react";
import { chapters } from "@/lib/questions";
import {
  fetchMedia,
  getSignedAudioUrl,
  removeAudio,
  uploadAudio,
  upsertMedia,
} from "@/lib/media";
import { Trash2, Upload } from "lucide-react";

export function AdminMediaEditor() {
  const [chapter, setChapter] = useState(1);
  const [page, setPage] = useState(1);
  const [audioPath, setAudioPath] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const chapterInfo = chapters.find((c) => c.number === chapter)!;

  async function load() {
    setMsg(null);
    const m = await fetchMedia(chapter, page);
    setAudioPath(m?.audio_path ?? null);
    setTranscript(m?.transcript ?? "");
    if (m?.audio_path) {
      setAudioUrl(await getSignedAudioUrl(m.audio_path));
    } else {
      setAudioUrl(null);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, page]);

  async function handleUpload(file: File) {
    setBusy(true);
    setMsg(null);
    try {
      if (audioPath) await removeAudio(audioPath);
      const path = await uploadAudio(chapter, page, file);
      await upsertMedia(chapter, page, { audio_path: path });
      setMsg("Audio uploaded.");
      await load();
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function handleRemoveAudio() {
    if (!audioPath) return;
    if (!confirm("Remove audio file?")) return;
    setBusy(true);
    try {
      await removeAudio(audioPath);
      await upsertMedia(chapter, page, { audio_path: null });
      setMsg("Audio removed.");
      await load();
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function handleSaveTranscript() {
    setBusy(true);
    try {
      await upsertMedia(chapter, page, { transcript: transcript.trim() || null });
      setMsg("Transcript saved.");
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4 rounded-xl border border-border bg-card p-4">
        <label className="flex flex-col gap-1 text-sm">
          Chapter
          <select
            value={chapter}
            onChange={(e) => { setChapter(Number(e.target.value)); setPage(1); }}
            className="rounded-md border border-border bg-background px-3 py-1.5"
          >
            {chapters.map((c) => (
              <option key={c.number} value={c.number}>{c.number}. {c.title}</option>
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
              <option key={p} value={p}>Page {p}</option>
            ))}
          </select>
        </label>
      </div>

      {msg && (
        <div className="rounded-md border border-border bg-accent px-3 py-2 text-sm">{msg}</div>
      )}

      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="font-semibold">Audio (MP3)</h3>
        {audioUrl && (
          <audio controls preload="none" src={audioUrl} className="mt-3 w-full" />
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-accent">
            <Upload className="h-4 w-4" />
            {audioPath ? "Replace audio" : "Upload audio"}
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              disabled={busy}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void handleUpload(f);
                e.target.value = "";
              }}
            />
          </label>
          {audioPath && (
            <button
              onClick={handleRemoveAudio}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4" /> Remove
            </button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="font-semibold">Transcript (read-along text)</h3>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          rows={12}
          placeholder="Paste the chapter/page transcript here…"
          className="mt-3 w-full rounded-md border border-border bg-background p-3 text-sm"
        />
        <div className="mt-3">
          <button
            onClick={handleSaveTranscript}
            disabled={busy}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            Save transcript
          </button>
        </div>
      </div>
    </div>
  );
}
