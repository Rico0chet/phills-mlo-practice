import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Headphones } from "lucide-react";
import { fetchMedia, getSignedAudioUrl } from "@/lib/media";

export function ChapterAudioPlayer({ chapter, page }: { chapter: number; page: number }) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    setAudioUrl(null);
    setTranscript(null);
    (async () => {
      const media = await fetchMedia(chapter, page);
      if (cancel) return;
      if (media?.transcript) setTranscript(media.transcript);
      if (media?.audio_path) {
        const url = await getSignedAudioUrl(media.audio_path);
        if (!cancel) setAudioUrl(url);
      }
      if (!cancel) setLoading(false);
    })();
    return () => {
      cancel = true;
    };
  }, [chapter, page]);

  if (loading) return null;
  if (!audioUrl && !transcript) return null;

  return (
    <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Headphones className="h-4 w-4 text-primary" />
        Listen & read along
      </div>
      {audioUrl && (
        <audio controls preload="none" src={audioUrl} className="mt-3 w-full">
          Your browser does not support audio playback.
        </audio>
      )}
      {transcript && (
        <>
          <button
            onClick={() => setShowTranscript((s) => !s)}
            className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            {showTranscript ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {showTranscript ? "Hide" : "Show"} transcript
          </button>
          {showTranscript && (
            <div className="mt-3 max-h-96 overflow-y-auto whitespace-pre-wrap rounded-md border border-border bg-background p-4 text-sm leading-relaxed text-foreground">
              {transcript}
            </div>
          )}
        </>
      )}
    </div>
  );
}
