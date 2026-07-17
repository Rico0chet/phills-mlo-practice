import { useState } from "react";
import type { Question } from "@/lib/exam-data";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

type Props = {
  question: Question;
  index: number;
  selected: string | undefined;
  revealed: boolean;
  onSelect: (key: "A" | "B" | "C" | "D") => void;
};

export function QuestionCard({ question, index, selected, revealed, onSelect }: Props) {
  const [localReveal, setLocalReveal] = useState(false);
  const isRevealed = revealed || localReveal;

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-sm font-semibold text-primary">Q{index + 1}</span>
        <h3 className="text-base font-medium text-card-foreground">{question.prompt}</h3>
      </div>
      <div className="space-y-2">
        {question.choices.map((c) => {
          const isSelected = selected === c.key;
          const isCorrect = question.answer === c.key;
          const showCorrect = isRevealed && isCorrect;
          const showWrong = isRevealed && isSelected && !isCorrect;
          return (
            <button
              key={c.key}
              onClick={() => !isRevealed && onSelect(c.key)}
              disabled={isRevealed}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                "border-border bg-background hover:bg-accent hover:text-accent-foreground",
                isSelected && !isRevealed && "border-primary bg-accent",
                showCorrect && "border-emerald-500 bg-emerald-50 text-emerald-900",
                showWrong && "border-red-500 bg-red-50 text-red-900",
                isRevealed && "cursor-default",
              )}
            >
              <span className="font-semibold">{c.key}.</span>
              <span className="flex-1">{c.text}</span>
              {showCorrect && <Check className="h-5 w-5 text-emerald-600" />}
              {showWrong && <X className="h-5 w-5 text-red-600" />}
            </button>
          );
        })}
      </div>
      {!revealed && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => setLocalReveal((v) => !v)}
            className="text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            {localReveal ? "Hide answer" : "Show answer"}
          </button>
        </div>
      )}
      {isRevealed && question.explanation && (
        <p className="mt-4 rounded-md bg-muted p-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Answer {question.answer}. </span>
          {question.explanation}
        </p>
      )}
    </div>
  );
}
