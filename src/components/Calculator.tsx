import { useState } from "react";
import { Calculator as CalcIcon, X } from "lucide-react";

export function Calculator() {
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newInput, setNewInput] = useState(true);

  function inputDigit(d: string) {
    if (newInput) {
      setDisplay(d);
      setNewInput(false);
    } else {
      if (display.length < 14) {
        setDisplay(display === "0" ? d : display + d);
      }
    }
  }

  function inputDecimal() {
    if (newInput) {
      setDisplay("0.");
      setNewInput(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  function clearAll() {
    setDisplay("0");
    setPrevious(null);
    setOperation(null);
    setNewInput(true);
  }

  function compute(a: number, b: number, op: string): number {
    switch (op) {
      case "+":
        return a + b;
      case "−":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b === 0 ? 0 : a / b;
      case "%":
        return (a * b) / 100;
      default:
        return b;
    }
  }

  function handleOperation(op: string) {
    const current = parseFloat(display);
    if (previous !== null && operation && !newInput) {
      const result = compute(previous, current, operation);
      setDisplay(formatResult(result));
      setPrevious(result);
    } else {
      setPrevious(current);
    }
    setOperation(op);
    setNewInput(true);
  }

  function handleEquals() {
    if (previous === null || !operation) return;
    const current = parseFloat(display);
    const result = compute(previous, current, operation);
    setDisplay(formatResult(result));
    setPrevious(null);
    setOperation(null);
    setNewInput(true);
  }

  function formatResult(n: number): string {
    const rounded = Math.round(n * 1000000) / 1000000;
    return String(rounded);
  }

  const btnClass =
    "h-12 rounded-lg text-sm font-medium transition-colors";
  const numClass =
    "bg-background border border-border hover:bg-accent";
  const opClass =
    "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20";
  const clearClass =
    "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20";

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
        aria-label="Toggle calculator"
      >
        {open ? <X className="h-5 w-5" /> : <CalcIcon className="h-5 w-5" />}
      </button>

      {/* Calculator panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-40 w-64 rounded-xl border border-border bg-card p-3 shadow-xl">
          <div className="mb-2 rounded-lg bg-background px-3 py-3 text-right">
            <span className="font-mono text-lg font-semibold tabular-nums text-foreground">
              {display}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <button onClick={clearAll} className={`${btnClass} ${clearClass} col-span-2`}>
              Clear
            </button>
            <button onClick={() => handleOperation("%")} className={`${btnClass} ${opClass}`}>
              %
            </button>
            <button onClick={() => handleOperation("÷")} className={`${btnClass} ${opClass}`}>
              ÷
            </button>
            {["7", "8", "9"].map((d) => (
              <button key={d} onClick={() => inputDigit(d)} className={`${btnClass} ${numClass}`}>
                {d}
              </button>
            ))}
            <button onClick={() => handleOperation("×")} className={`${btnClass} ${opClass}`}>
              ×
            </button>
            {["4", "5", "6"].map((d) => (
              <button key={d} onClick={() => inputDigit(d)} className={`${btnClass} ${numClass}`}>
                {d}
              </button>
            ))}
            <button onClick={() => handleOperation("−")} className={`${btnClass} ${opClass}`}>
              −
            </button>
            {["1", "2", "3"].map((d) => (
              <button key={d} onClick={() => inputDigit(d)} className={`${btnClass} ${numClass}`}>
                {d}
              </button>
            ))}
            <button onClick={() => handleOperation("+")} className={`${btnClass} ${opClass}`}>
              +
            </button>
            <button
              onClick={() => inputDigit("0")}
              className={`${btnClass} ${numClass} col-span-2`}
            >
              0
            </button>
            <button onClick={inputDecimal} className={`${btnClass} ${numClass}`}>
              .
            </button>
            <button
              onClick={handleEquals}
              className={`${btnClass} bg-primary text-primary-foreground hover:bg-primary/90`}
            >
              =
            </button>
          </div>
        </div>
      )}
    </>
  );
}
