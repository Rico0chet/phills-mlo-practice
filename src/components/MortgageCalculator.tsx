import { useCallback, useEffect, useRef, useState } from "react";
import { Home, X, GripVertical } from "lucide-react";

const POS_KEY = "mortgage-calc-pos";

const CREDIT_BANDS = ["Excellent (740+)", "Good (700-739)", "Fair (660-699)", "Poor (below 660)"];

function currency(n: number): string {
  if (!isFinite(n)) return "$0";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function MortgageCalculator() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(POS_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (typeof p?.x === "number" && typeof p?.y === "number") setPos(p);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const clamp = useCallback((x: number, y: number) => {
    const el = btnRef.current;
    const w = el?.offsetWidth ?? 200;
    const h = el?.offsetHeight ?? 44;
    return {
      x: Math.min(Math.max(8, x), Math.max(8, window.innerWidth - w - 8)),
      y: Math.min(Math.max(8, y), Math.max(8, window.innerHeight - h - 8)),
    };
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    const rect = btnRef.current!.getBoundingClientRect();
    offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    draggingRef.current = true;
    movedRef.current = false;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    movedRef.current = true;
    setPos(clamp(e.clientX - offsetRef.current.x, e.clientY - offsetRef.current.y));
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    if (movedRef.current && pos) {
      try {
        localStorage.setItem(POS_KEY, JSON.stringify(pos));
      } catch {
        /* ignore */
      }
    }
  }

  const [homePrice, setHomePrice] = useState("300000");
  const [down, setDown] = useState("60000");
  const [downPct, setDownPct] = useState("20");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("15");
  const [credit, setCredit] = useState(CREDIT_BANDS[0]);

  const price = parseFloat(homePrice) || 0;
  const downAmt = parseFloat(down) || 0;
  const principal = Math.max(0, price - downAmt);
  const annualRate = parseFloat(rate) || 0;
  const months = (parseInt(term, 10) || 0) * 12;

  const r = annualRate / 100 / 12;
  const monthly =
    months > 0
      ? r > 0
        ? (principal * (r * Math.pow(1 + r, months))) / (Math.pow(1 + r, months) - 1)
        : principal / months
      : 0;
  const total = monthly * months;
  const interest = Math.max(0, total - principal);

  function onPriceChange(v: string) {
    setHomePrice(v);
    const p = parseFloat(v) || 0;
    const pct = parseFloat(downPct) || 0;
    setDown(String(Math.round((p * pct) / 100)));
  }

  function onDownChange(v: string) {
    setDown(v);
    const p = parseFloat(homePrice) || 0;
    const d = parseFloat(v) || 0;
    setDownPct(p > 0 ? String(Math.round((d / p) * 1000) / 10) : "0");
  }

  function onDownPctChange(v: string) {
    setDownPct(v);
    const p = parseFloat(homePrice) || 0;
    const pct = parseFloat(v) || 0;
    setDown(String(Math.round((p * pct) / 100)));
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";
  const labelClass = "mb-1 block text-xs font-medium text-muted-foreground";

  return (
    <>
      <button
        ref={btnRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={() => {
          if (movedRef.current) {
            movedRef.current = false;
            return;
          }
          setOpen((o) => !o);
        }}
        style={pos ? { left: pos.x, top: pos.y, bottom: "auto" } : undefined}
        className="fixed bottom-6 left-6 z-40 flex touch-none select-none items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
        aria-label="Toggle mortgage calculator (drag to move)"
      >
        <GripVertical className="h-4 w-4 opacity-70" />
        {open ? <X className="h-4 w-4" /> : <Home className="h-4 w-4" />}
        Mortgage Calculator
      </button>

      {open && (
        <div
          style={
            pos
              ? {
                  left: Math.min(pos.x, Math.max(8, window.innerWidth - 360)),
                  top: pos.y > window.innerHeight / 2 ? "auto" : pos.y + 60,
                  bottom: pos.y > window.innerHeight / 2 ? window.innerHeight - pos.y + 12 : "auto",
                }
              : undefined
          }
          className="fixed bottom-24 left-6 z-40 max-h-[75vh] w-[22rem] max-w-[calc(100vw-3rem)] overflow-y-auto rounded-xl border border-border bg-card p-4 shadow-xl"
        >
          <h3 className="mb-3 text-sm font-semibold text-card-foreground">Mortgage Calculator</h3>

          <div className="space-y-3">
            <div>
              <label className={labelClass}>Home price ($)</label>
              <input
                type="number"
                inputMode="decimal"
                value={homePrice}
                onChange={(e) => onPriceChange(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>Down payment ($)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={down}
                  onChange={(e) => onDownChange(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Down payment (%)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={downPct}
                  onChange={(e) => onDownPctChange(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>Interest rate (%)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Loan term</label>
                <select
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className={inputClass}
                >
                  {["10", "15", "20", "25", "30"].map((t) => (
                    <option key={t} value={t}>
                      {t} Years
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Credit score</label>
              <select
                value={credit}
                onChange={(e) => setCredit(e.target.value)}
                className={inputClass}
              >
                {CREDIT_BANDS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 space-y-2 rounded-lg border border-border bg-background p-3 text-sm">
            <Row label="Total amount" value={currency(total)} />
            <Row label="Principal" value={currency(principal)} />
            <Row label="Interest" value={currency(interest)} />
            <div className="border-t border-border pt-2">
              <Row label="Monthly payment" value={currency(monthly)} strong />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={
          strong
            ? "font-mono text-base font-semibold tabular-nums text-primary"
            : "font-mono font-medium tabular-nums text-foreground"
        }
      >
        {value}
      </span>
    </div>
  );
}
