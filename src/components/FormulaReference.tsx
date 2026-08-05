import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";

const FORMULAS: { name: string; formula: string; note?: string }[] = [
  {
    name: "LTV (Loan-to-Value Ratio)",
    formula: "LTV = (Loan Amount ÷ Property Value) × 100",
  },
  {
    name: "DTI (Debt-to-Income Ratio)",
    formula: "DTI = (Total Monthly Debt ÷ Gross Monthly Income) × 100",
  },
  {
    name: "Front-End DTI",
    formula: "Front-End DTI = (Housing Payment ÷ Gross Monthly Income) × 100",
    note: "Housing payment = principal + interest + taxes + insurance (PITI)",
  },
  {
    name: "Back-End DTI",
    formula: "Back-End DTI = ((Housing Payment + All Other Debts) ÷ Gross Monthly Income) × 100",
  },
  {
    name: "Monthly Payment (Amortization)",
    formula: "M = P × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1]",
    note: "P = principal, r = monthly interest rate (annual ÷ 12), n = total number of monthly payments",
  },
  {
    name: "Simple Interest",
    formula: "Interest = Principal × Rate × Time",
    note: "Rate as decimal, Time in years (or fraction thereof)",
  },
  {
    name: "Discount Points Cost",
    formula: "Cost = Loan Amount × (Points ÷ 100)",
  },
  {
    name: "Proration (360-day basis)",
    formula: "Proration = (Annual Amount ÷ 360) × Days",
    note: "Some lenders use 365-day basis — check which applies",
  },
  {
    name: "Total Interest Paid",
    formula: "Total Interest = (Monthly Payment × n) − Principal",
    note: "n = total number of payments",
  },
  {
    name: "APR Approximation",
    formula: "APR ≈ (Total Finance Charge ÷ Loan Amount ÷ Loan Term in Years) × 100",
  },
];

export function FormulaReference() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 rounded-xl border border-border bg-card shadow-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-3 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <BookOpen className="h-4 w-4 text-primary" />
          Formula Reference
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="space-y-3 border-t border-border px-5 py-4">
          {FORMULAS.map((f) => (
            <div key={f.name}>
              <p className="text-sm font-medium text-foreground">{f.name}</p>
              <p className="mt-0.5 font-mono text-sm text-primary">{f.formula}</p>
              {f.note && (
                <p className="mt-0.5 text-xs text-muted-foreground">{f.note}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
