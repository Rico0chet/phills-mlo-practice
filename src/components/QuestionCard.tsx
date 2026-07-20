import type { Question } from "@/lib/questions";
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
  // As soon as the learner picks an answer, show red/green feedback.
  const hasSelection = selected !== undefined;
  const isRevealed = revealed || hasSelection;
  const answeredCorrectly = selected === question.answer;

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
          // Highlight the correct choice in green once an answer has been picked
          // (or the whole page has been submitted). Highlight the picked choice
          // in red only when it's wrong.
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
                showCorrect && "border-emerald-500 bg-emerald-50 text-emerald-900 hover:bg-emerald-50 hover:text-emerald-900",
                showWrong && "border-red-500 bg-red-50 text-red-900 hover:bg-red-50 hover:text-red-900",
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
      {isRevealed && (
        <p className="mt-4 whitespace-pre-wrap rounded-md bg-muted p-3 text-sm text-muted-foreground">
          <span className={cn("font-semibold", answeredCorrectly ? "text-emerald-700" : "text-red-700")}>
            {hasSelection
              ? answeredCorrectly
                ? "Correct."
                : `Incorrect. Correct answer: ${question.answer}.`
              : `Answer ${question.answer}.`}
          </span>
          {question.explanation ? ` ${question.explanation}` : null}
        </p>
      )}
    </div>
  );
}

