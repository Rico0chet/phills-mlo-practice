import type { Question } from "@/lib/questions";
import { parseNumeric, isNumericCorrect } from "@/lib/questions";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useState } from "react";

type Props = {
  question: Question;
  index: number;
  value: string | undefined;
  revealed: boolean;
  onAnswer: (value: string) => void;
};

export function MathQuestionCard({ question, index, value, revealed, onAnswer }: Props) {
  const [input, setInput] = useState("");
  const isLocked = revealed || value !== undefined;

  const correctAnswer = question.numericAnswer ?? "";
  const tolerance = question.tolerance ?? 0.01;
  const isCorrect = isNumericCorrect(value ?? "", correctAnswer, tolerance);

  function handleCheck() {
    const trimmed = input.trim();
    if (!trimmed) return;
    onAnswer(trimmed);
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-sm font-semibold text-primary">Q{index + 1}</span>
        <h3 className="text-base font-medium text-card-foreground whitespace-pre-wrap">
          {question.prompt}
        </h3>
      </div>

      {!isLocked ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleCheck();
              }
            }}
            placeholder="Type your answer (e.g. 1456.32)"
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button
            onClick={handleCheck}
            disabled={!input.trim()}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Check
          </button>
        </div>
      ) : (
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm",
            isCorrect
              ? "border-emerald-500 bg-emerald-50 text-emerald-900"
              : "border-red-500 bg-red-50 text-red-900",
          )}
        >
          {isCorrect ? (
            <Check className="h-5 w-5 text-emerald-600" />
          ) : (
            <X className="h-5 w-5 text-red-600" />
          )}
          <div>
            <span className="font-semibold">
              {isCorrect
                ? "Correct."
                : `Incorrect. Correct answer: ${correctAnswer}`}
            </span>
            {value && (
              <span className="text-muted-foreground"> Your answer: {value}</span>
            )}
          </div>
        </div>
      )}

      {isLocked && (
        <p className="mt-4 whitespace-pre-wrap rounded-md bg-muted p-3 text-sm text-muted-foreground">
          <span
            className={cn(
              "font-semibold",
              isCorrect ? "text-emerald-700" : "text-red-700",
            )}
          >
            {value
              ? isCorrect
                ? "Correct."
                : `Incorrect. Correct answer: ${correctAnswer}.`
              : `Answer: ${correctAnswer}.`}
          </span>
          {question.explanation ? ` ${question.explanation}` : null}
        </p>
      )}
    </div>
  );
}
