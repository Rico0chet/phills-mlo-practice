import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  chapters,
  isCurrentUserAdmin,
  type DbQuestion,
} from "@/lib/questions";
import { ArrowLeft, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { AdminMediaEditor } from "@/components/AdminMediaEditor";
import { AdminResourcesEditor } from "@/components/AdminResourcesEditor";
import { AdminPageTitlesEditor } from "@/components/AdminPageTitlesEditor";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — MLO Practice Exam" }],
  }),
  component: AdminPage,
});

type EditState = {
  id?: string;
  chapter: number;
  page: number;
  prompt: string;
  question_type: "multiple_choice" | "numeric";
  choices: string[];
  correct_index: number;
  numeric_answer: string;
  answer_tolerance: number;
  explanation: string;
  sort_order: number;
};

const empty = (chapter: number, page: number, sort_order = 0): EditState => ({
  chapter,
  page,
  prompt: "",
  question_type: "multiple_choice",
  choices: ["", "", "", ""],
  correct_index: 0,
  numeric_answer: "",
  answer_tolerance: 0.01,
  explanation: "",
  sort_order,
});

function AdminPage() {
  const [authorized, setAuthorized] = useState<null | boolean>(null);
  const [tab, setTab] = useState<"questions" | "media" | "resources">("questions");
  const [chapter, setChapter] = useState(1);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<DbQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<EditState | null>(null);
  const [showBulk, setShowBulk] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [bulkKey, setBulkKey] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    isCurrentUserAdmin().then((ok) => setAuthorized(ok));
  }, []);

  const chapterInfo = chapters.find((c) => c.number === chapter)!;

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("questions")
      .select("*")
      .eq("chapter", chapter)
      .eq("page", page)
      .order("sort_order", { ascending: true });
    setRows((data as DbQuestion[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    if (authorized) void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized, chapter, page]);

  if (authorized === null) {
    return <div className="p-10 text-center text-muted-foreground">Checking access…</div>;
  }
  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold text-foreground">Not authorized</h1>
          <p className="mt-2 text-muted-foreground">You need admin access to view this page.</p>
          <Link to="/" className="mt-6 inline-block text-primary hover:underline">
            ← Back to chapters
          </Link>
        </div>
      </div>
    );
  }

  async function saveEdit() {
    if (!edit) return;

    if (edit.question_type === "numeric") {
      if (!edit.prompt.trim() || !edit.numeric_answer.trim()) {
        setMsg("Prompt and numeric answer are required.");
        return;
      }
      const payload = {
        chapter: edit.chapter,
        page: edit.page,
        prompt: edit.prompt.trim(),
        question_type: "numeric",
        choices: [] as string[],
        correct_index: -1,
        numeric_answer: edit.numeric_answer.trim(),
        answer_tolerance: edit.answer_tolerance,
        explanation: edit.explanation.trim() || null,
        sort_order: edit.sort_order,
      };
      if (edit.id) {
        const { error } = await supabase.from("questions").update(payload).eq("id", edit.id);
        if (error) { setMsg(error.message); return; }
      } else {
        const { error } = await supabase.from("questions").insert(payload);
        if (error) { setMsg(error.message); return; }
      }
    } else {
      const choices = edit.choices.map((c) => c.trim());
      if (!edit.prompt.trim() || choices.some((c) => !c)) {
        setMsg("Prompt and all 4 choices are required.");
        return;
      }
      const payload = {
        chapter: edit.chapter,
        page: edit.page,
        prompt: edit.prompt.trim(),
        question_type: "multiple_choice",
        choices,
        correct_index: edit.correct_index,
        numeric_answer: null,
        answer_tolerance: 0.01,
        explanation: edit.explanation.trim() || null,
        sort_order: edit.sort_order,
      };
      if (edit.id) {
        const { error } = await supabase.from("questions").update(payload).eq("id", edit.id);
        if (error) { setMsg(error.message); return; }
      } else {
        const { error } = await supabase.from("questions").insert(payload);
        if (error) { setMsg(error.message); return; }
      }
    }

    setEdit(null);
    setMsg(null);
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this question?")) return;
    const { error } = await supabase.from("questions").delete().eq("id", id);
    if (error) { setMsg(error.message); return; }
    await load();
  }

  async function runBulkImport() {
    try {
      const parsed = parseBulk(bulkText, bulkKey);
      if (!parsed.length) throw new Error("No questions parsed.");
      const nextSort = (rows[rows.length - 1]?.sort_order ?? -1) + 1;
      const payload = parsed.map((p, i) => ({
        chapter,
        page,
        prompt: p.prompt,
        choices: p.choices,
        correct_index: p.correct_index,
        explanation: null,
        sort_order: nextSort + i,
      }));
      const { error } = await supabase.from("questions").insert(payload);
      if (error) throw error;
      setMsg(`Imported ${parsed.length} questions.`);
      setBulkText("");
      setBulkKey("");
      setShowBulk(false);
      await load();
    } catch (e) {
      setMsg((e as Error).message);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-foreground">Admin</h1>
          <p className="mt-2 text-muted-foreground">Manage questions, audio, and transcripts for each chapter and page.</p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setTab("questions")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${tab === "questions" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent"}`}
            >
              Questions
            </button>
            <button
              onClick={() => setTab("media")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${tab === "media" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent"}`}
            >
              Audio & Transcripts
            </button>
            <button
              onClick={() => setTab("resources")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${tab === "resources" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent"}`}
            >
              Resources
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {tab === "media" ? (
          <AdminMediaEditor />
        ) : tab === "resources" ? (
          <AdminResourcesEditor />
        ) : (
        <>

        <div className="mb-6 flex flex-wrap items-end gap-4 rounded-xl border border-border bg-card p-4">
          <label className="flex flex-col gap-1 text-sm">
            Chapter
            <select
              value={chapter}
              onChange={(e) => { setChapter(Number(e.target.value)); setPage(1); }}
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
                <option key={p} value={p}>Page {p}</option>
              ))}
            </select>
          </label>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setShowBulk((s) => !s)}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-accent"
            >
              <Upload className="h-4 w-4" /> Bulk paste
            </button>
            <button
              onClick={() => setEdit(empty(chapter, page, rows.length))}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" /> New question
            </button>
          </div>
        </div>

        {msg && (
          <div className="mb-4 rounded-md border border-border bg-accent px-3 py-2 text-sm">{msg}</div>
        )}

        {showBulk && (
          <div className="mb-6 space-y-3 rounded-xl border border-border bg-card p-4">
            <h2 className="font-semibold">Bulk paste import</h2>
            <p className="text-xs text-muted-foreground">
              Paste numbered questions (1., 2., …) with choices A) B) C) D). Then paste the answer key as
              "1. C, 2. A, ..." or one per line. Imported into Chapter {chapter}, Page {page}.
            </p>
            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              rows={10}
              placeholder="1. Question text?&#10;A) choice&#10;B) choice&#10;C) choice&#10;D) choice&#10;&#10;2. ..."
              className="w-full rounded-md border border-border bg-background p-2 font-mono text-xs"
            />
            <textarea
              value={bulkKey}
              onChange={(e) => setBulkKey(e.target.value)}
              rows={3}
              placeholder="Answer key: 1. C  2. A  3. B ..."
              className="w-full rounded-md border border-border bg-background p-2 font-mono text-xs"
            />
            <div className="flex gap-2">
              <button
                onClick={runBulkImport}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Import
              </button>
              <button
                onClick={() => setShowBulk(false)}
                className="rounded-md border border-border px-4 py-2 text-sm hover:bg-accent"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {rows.length} questions in this page.
            </p>
            {rows.map((r, i) => (
              <div key={r.id} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">
                      #{i + 1}{" "}
                      {r.question_type === "numeric" && (
                        <span className="ml-1 rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">numeric</span>
                      )}
                    </p>
                    <p className="mt-1 font-medium text-foreground">{r.prompt}</p>
                    {r.question_type === "numeric" ? (
                      <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">
                        Answer: {r.numeric_answer}{" "}
                        <span className="text-muted-foreground">
                          (±{r.answer_tolerance ?? 0.01})
                        </span>
                      </p>
                    ) : (
                      <ul className="mt-2 space-y-1 text-sm">
                        {r.choices.map((c, ci) => (
                          <li
                            key={ci}
                            className={ci === r.correct_index ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}
                          >
                            {String.fromCharCode(65 + ci)}) {c} {ci === r.correct_index && "✓"}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setEdit({
                        id: r.id,
                        chapter: r.chapter,
                        page: r.page,
                        prompt: r.prompt,
                        question_type: (r.question_type === "numeric" ? "numeric" : "multiple_choice") as "multiple_choice" | "numeric",
                        choices: r.choices?.length ? [...r.choices, "", "", "", ""].slice(0, 4) : ["", "", "", ""],
                        correct_index: r.correct_index,
                        numeric_answer: r.numeric_answer ?? "",
                        answer_tolerance: r.answer_tolerance ?? 0.01,
                        explanation: r.explanation ?? "",
                        sort_order: r.sort_order,
                      })}
                      className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => remove(r.id)}
                      className="rounded p-1.5 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </>
        )}
      </main>


      {edit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{edit.id ? "Edit question" : "New question"}</h2>
              <button onClick={() => setEdit(null)} className="rounded p-1 hover:bg-accent">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1 text-sm">
                  Chapter
                  <input
                    type="number"
                    value={edit.chapter}
                    onChange={(e) => setEdit({ ...edit, chapter: Number(e.target.value) })}
                    className="rounded-md border border-border bg-background px-2 py-1.5"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Page
                  <input
                    type="number"
                    value={edit.page}
                    onChange={(e) => setEdit({ ...edit, page: Number(e.target.value) })}
                    className="rounded-md border border-border bg-background px-2 py-1.5"
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEdit({ ...edit, question_type: "multiple_choice" })}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium ${edit.question_type === "multiple_choice" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent"}`}
                >
                  Multiple Choice
                </button>
                <button
                  onClick={() => setEdit({ ...edit, question_type: "numeric" })}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium ${edit.question_type === "numeric" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent"}`}
                >
                  Numeric Input
                </button>
              </div>
              <label className="flex flex-col gap-1 text-sm">
                Prompt
                <textarea
                  value={edit.prompt}
                  onChange={(e) => setEdit({ ...edit, prompt: e.target.value })}
                  rows={2}
                  className="rounded-md border border-border bg-background px-2 py-1.5"
                />
              </label>
              {edit.question_type === "numeric" ? (
                <>
                  <label className="flex flex-col gap-1 text-sm">
                    Correct Answer
                    <input
                      type="text"
                      value={edit.numeric_answer}
                      onChange={(e) => setEdit({ ...edit, numeric_answer: e.target.value })}
                      placeholder="e.g. $1,456.32 or 3.5%"
                      className="rounded-md border border-border bg-background px-2 py-1.5"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm">
                    Tolerance (±)
                    <input
                      type="number"
                      step="0.01"
                      value={edit.answer_tolerance}
                      onChange={(e) => setEdit({ ...edit, answer_tolerance: Number(e.target.value) })}
                      className="rounded-md border border-border bg-background px-2 py-1.5"
                    />
                  </label>
                </>
              ) : (
                edit.choices.map((c, i) => (
                  <label key={i} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      checked={edit.correct_index === i}
                      onChange={() => setEdit({ ...edit, correct_index: i })}
                    />
                    <span className="w-6 font-semibold">{String.fromCharCode(65 + i)})</span>
                    <input
                      type="text"
                      value={c}
                      onChange={(e) => {
                        const next = [...edit.choices];
                        next[i] = e.target.value;
                        setEdit({ ...edit, choices: next });
                      }}
                      className="flex-1 rounded-md border border-border bg-background px-2 py-1.5"
                    />
                  </label>
                ))
              )}
              <label className="flex flex-col gap-1 text-sm">
                {edit.question_type === "numeric" ? "Step-by-step solution" : "Explanation (optional)"}
                <textarea
                  value={edit.explanation}
                  onChange={(e) => setEdit({ ...edit, explanation: e.target.value })}
                  rows={2}
                  className="rounded-md border border-border bg-background px-2 py-1.5"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Sort order
                <input
                  type="number"
                  value={edit.sort_order}
                  onChange={(e) => setEdit({ ...edit, sort_order: Number(e.target.value) })}
                  className="rounded-md border border-border bg-background px-2 py-1.5"
                />
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setEdit(null)} className="rounded-md border border-border px-4 py-2 text-sm hover:bg-accent">
                  Cancel
                </button>
                <button onClick={saveEdit} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Parse "1. prompt?\nA) x\nB) y\nC) z\nD) w\n\n2. ..." + answer key like "1. C, 2. A" or lines "1. C"
function parseBulk(text: string, keyText: string): { prompt: string; choices: string[]; correct_index: number }[] {
  const answers = new Map<number, number>(); // qNum -> index
  const keyRegex = /(\d+)\s*[.):]\s*([A-D])/gi;
  let km: RegExpExecArray | null;
  while ((km = keyRegex.exec(keyText))) {
    answers.set(Number(km[1]), km[2].toUpperCase().charCodeAt(0) - 65);
  }

  const questions: { prompt: string; choices: string[]; correct_index: number }[] = [];
  // Split into blocks starting at "N." at line start
  const blocks = text.split(/\n(?=\s*\d+\s*[.)]\s+)/);
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    const headMatch = trimmed.match(/^(\d+)\s*[.)]\s+([\s\S]*)$/);
    if (!headMatch) continue;
    const qNum = Number(headMatch[1]);
    const body = headMatch[2];
    // find choices A-D
    const choiceRegex = /(^|\n)\s*([A-D])\s*[.)]\s*(.+?)(?=(\n\s*[A-D]\s*[.)]|$))/gs;
    const choices: string[] = ["", "", "", ""];
    let firstChoiceIdx = -1;
    let cm: RegExpExecArray | null;
    while ((cm = choiceRegex.exec(body))) {
      const letter = cm[2].toUpperCase();
      const idx = letter.charCodeAt(0) - 65;
      choices[idx] = cm[3].trim();
      if (firstChoiceIdx === -1) firstChoiceIdx = cm.index;
    }
    if (choices.some((c) => !c)) continue;
    const prompt = firstChoiceIdx >= 0 ? body.slice(0, firstChoiceIdx).trim() : body.trim();
    const correct = answers.get(qNum);
    if (correct === undefined) continue;
    questions.push({ prompt, choices, correct_index: correct });
  }
  return questions;
}
