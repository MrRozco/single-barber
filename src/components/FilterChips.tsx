import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../hooks/motion";
import { cx } from "../lib/cx";

export type FilterChipsProps = {
  label?: string;
  options: { value: string; label: string }[];
  /** null = "All" */
  value: string | null;
  onChange: (value: string | null) => void;
  /** Result count per option; 0 renders the chip dashed. */
  counts?: Record<string, number>;
  allLabel?: string;
};

/** Single-select chips with a brass pill that slides to the active chip (and across wrapped rows). */
export function FilterChips({ label, options, value, onChange, counts, allLabel = "All" }: FilterChipsProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const firstPaint = useRef(true);
  const [, setLayoutTick] = useState(0);
  const all = [{ value: null as string | null, label: allLabel }, ...options];

  useLayoutEffect(() => {
    const rail = railRef.current;
    const pill = pillRef.current;
    const btn = rail?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
    if (!rail || !pill || !btn) return;
    const instant = firstPaint.current || prefersReducedMotion();
    if (instant) pill.style.transition = "none";
    pill.style.width = `${btn.offsetWidth}px`;
    pill.style.transform = `translate(${btn.offsetLeft}px, ${btn.offsetTop}px)`;
    if (instant) {
      void pill.offsetWidth; // flush so the next change animates
      pill.style.transition = "";
      firstPaint.current = false;
    }
    // Keep the active chip visible on the horizontally-scrolling phone rail.
    const l = btn.offsetLeft - 16;
    const r = btn.offsetLeft + btn.offsetWidth + 16;
    if (l < rail.scrollLeft || r > rail.scrollLeft + rail.clientWidth) {
      rail.scrollTo({ left: Math.max(0, l), behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  });

  // Re-measure on resize and once web fonts land (chip widths change).
  useEffect(() => {
    const remeasure = () => {
      firstPaint.current = true;
      setLayoutTick((t) => t + 1);
    };
    window.addEventListener("resize", remeasure);
    document.fonts?.ready.then(remeasure);
    return () => window.removeEventListener("resize", remeasure);
  }, []);

  return (
    <div className="sl-chipgroup" role="group" aria-label={label}>
      {label && <span className="sl-chipgroup-label">{label}</span>}
      <div className="sl-chips" ref={railRef}>
        <span className="sl-chip-pill" ref={pillRef} aria-hidden />
        {all.map((o) => {
          const on = o.value === value;
          const n = o.value != null && counts ? (counts[o.value] ?? 0) : null;
          return (
            <button key={String(o.value)} type="button" className={cx("sl-chip", n === 0 && "is-empty")} aria-pressed={on} onClick={() => onChange(o.value)}>
              {o.label}
              {n != null && <span className="sl-chip-n">{n}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
