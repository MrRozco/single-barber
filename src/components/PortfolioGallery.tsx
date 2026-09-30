import { useCallback, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useSearchParams } from "react-router";
import { Button } from "./Button";
import { CutMedia } from "./CutMedia";
import { CutSheet } from "./CutSheet";
import { FilterChips } from "./FilterChips";
import { prefersReducedMotion } from "../hooks/motion";
import { cx } from "../lib/cx";
import type { Cut, FilterGroup } from "../content/types";

export type PortfolioGalleryProps = {
  id?: string;
  items: Cut[];
  filters: FilterGroup<"type" | "length">[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  bookHref?: string;
  bookLabel?: string;
  /** px; pins the filter bar under a sticky SiteHeader (64). */
  stickyTop?: number;
};

type Selection = Record<string, string | null>;

const LEAVE_MS = 200;

export function PortfolioGallery({
  id = "portfolio",
  items,
  filters,
  eyebrow,
  title = "The cuts",
  subtitle,
  bookHref,
  bookLabel,
  stickyTop,
}: PortfolioGalleryProps) {
  // Filters live in the URL (?type=curly&length=short) so a filtered view can be shared.
  const [params, setParams] = useSearchParams();
  const sel: Selection = useMemo(() => Object.fromEntries(filters.map((f) => [f.key, params.get(f.key)])), [filters, params]);
  const [openId, setOpenId] = useState<string | null>(null);

  const gridRef = useRef<HTMLUListElement>(null);
  const before = useRef<{ rects: Map<string, DOMRect>; ids: Set<string> } | null>(null);
  const pending = useRef<number | undefined>(undefined);

  const matches = useCallback((c: Cut, s: Selection) => filters.every((f) => !s[f.key] || c[f.key] === s[f.key]), [filters]);
  const visible = useMemo(() => items.filter((c) => matches(c, sel)), [items, sel, matches]);

  const counts = useMemo(() => {
    const out: Record<string, Record<string, number>> = {};
    for (const f of filters) {
      out[f.key] = {};
      for (const o of f.options) out[f.key][o.value] = items.filter((c) => matches(c, { ...sel, [f.key]: o.value })).length;
    }
    return out;
  }, [filters, items, sel, matches]);

  const snapshot = () => {
    const rects = new Map<string, DOMRect>();
    gridRef.current?.querySelectorAll<HTMLElement>("[data-id]").forEach((el) => rects.set(el.dataset.id!, el.getBoundingClientRect()));
    return rects;
  };

  const commit = (next: Selection) => {
    gridRef.current?.classList.add("is-ready"); // stop the one-time entrance animation from replaying
    before.current = { rects: snapshot(), ids: new Set(visible.map((c) => c.id)) };
    const p = new URLSearchParams(params);
    for (const f of filters) {
      const v = next[f.key];
      if (v) p.set(f.key, v);
      else p.delete(f.key);
    }
    setParams(p, { replace: true, preventScrollReset: true });
  };

  const change = (key: string, value: string | null) => {
    const next = { ...sel, [key]: value };
    window.clearTimeout(pending.current);
    if (prefersReducedMotion()) return commit(next);
    const leaving = visible.filter((c) => !matches(c, next));
    if (!leaving.length) return commit(next);
    // Shrink the cards that are leaving, then reflow.
    gridRef.current?.classList.add("is-ready");
    for (const c of leaving) {
      gridRef.current?.querySelector<HTMLElement>(`[data-id="${CSS.escape(c.id)}"]`)?.animate(
        [
          { opacity: 1, transform: "none" },
          { opacity: 0, transform: "scale(.9)" },
        ],
        { duration: LEAVE_MS, easing: "ease-in", fill: "forwards" },
      );
    }
    pending.current = window.setTimeout(() => commit(next), LEAVE_MS);
  };

  const clearAll = () => {
    window.clearTimeout(pending.current);
    commit(Object.fromEntries(filters.map((f) => [f.key, null])));
  };

  // FLIP: glide survivors from their old spot, rise newcomers in with a stagger.
  useLayoutEffect(() => {
    const prev = before.current;
    if (!prev || !gridRef.current) return;
    before.current = null;
    let k = 0;
    gridRef.current.querySelectorAll<HTMLElement>("[data-id]").forEach((el) => {
      const id = el.dataset.id!;
      const a = prev.rects.get(id);
      const b = el.getBoundingClientRect();
      if (a && prev.ids.has(id)) {
        const dx = a.left - b.left;
        const dy = a.top - b.top;
        if (dx || dy) el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], { duration: 420, easing: "cubic-bezier(.2,.7,.2,1)" });
      } else {
        el.animate(
          [
            { opacity: 0, transform: "translateY(16px) scale(.94)" },
            { opacity: 1, transform: "none" },
          ],
          {
            duration: 420,
            delay: 40 + k++ * 45,
            easing: "cubic-bezier(.2,.7,.2,1)",
            fill: "backwards",
          },
        );
      }
    });
  }, [sel]);

  const labelOf = (key: string, value: string) => filters.find((f) => f.key === key)?.options.find((o) => o.value === value)?.label ?? value;
  const active = filters.filter((f) => sel[f.key]);
  const openCut = openId ? (items.find((c) => c.id === openId) ?? null) : null;
  const step = (d: number) => {
    const i = visible.findIndex((c) => c.id === openId);
    if (i >= 0) setOpenId(visible[(i + d + visible.length) % visible.length].id);
  };

  return (
    <section className="sl sl-pf" id={id} aria-labelledby="sl-pf-h">
      <div className="sl-pf-intro sl-wrap">
        {eyebrow && <p className="sl-eyebrow">{eyebrow}</p>}
        <h1 className="sl-pf-h" id="sl-pf-h">
          {title}
        </h1>
        {subtitle && <p className="sl-pf-sub">{subtitle}</p>}
      </div>

      <div className={cx("sl-pf-bar", stickyTop != null && "is-sticky")} style={stickyTop != null ? { top: stickyTop } : undefined}>
        <div className="sl-wrap sl-pf-bar-in">
          {filters.map((f) => (
            <FilterChips key={f.key} label={f.label} options={f.options} value={sel[f.key]} counts={counts[f.key]} onChange={(v) => change(f.key, v)} />
          ))}
        </div>
      </div>

      <div className="sl-wrap">
        <div className="sl-pf-status" aria-live="polite">
          <span>
            <b key={visible.length} className="sl-pf-count">
              {visible.length}
            </b>
            {visible.length === 1 ? " cut" : " cuts"}
          </span>
          {active.length > 0 && (
            <div className="sl-pf-active">
              {active.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className="sl-pf-tag"
                  onClick={() => change(f.key, null)}
                  aria-label={`Remove ${labelOf(f.key, sel[f.key]!)} filter`}
                >
                  {labelOf(f.key, sel[f.key]!)}
                  <span aria-hidden>×</span>
                </button>
              ))}
              {active.length > 1 && (
                <button type="button" className="sl-pf-clear" onClick={clearAll}>
                  Clear
                </button>
              )}
            </div>
          )}
        </div>

        {visible.length > 0 ? (
          <ul className="sl-pf-grid" ref={gridRef}>
            {visible.map((c, n) => (
              <li key={c.id} data-id={c.id} className="sl-pf-item" style={{ "--d": `${Math.min(n, 12) * 50}ms` } as CSSProperties}>
                <button
                  type="button"
                  className="sl-pf-card"
                  onClick={() => setOpenId(c.id)}
                  aria-label={`${c.name}, ${labelOf("type", c.type)}, ${labelOf("length", c.length)}. View details`}
                >
                  <CutMedia cut={c} index={items.indexOf(c)} />
                  <span className="sl-pf-meta">
                    <span className="sl-pf-name">{c.name}</span>
                    <span className="sl-pf-sub2">
                      {labelOf("type", c.type)} · {labelOf("length", c.length)}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="sl-pf-empty">
            <p className="sl-pf-empty-t">No cuts match yet</p>
            <p>Try another length, or just ask me. I cut every hair type.</p>
            <Button variant="secondary" onClick={clearAll}>
              Clear filters
            </Button>
          </div>
        )}
      </div>

      <CutSheet
        cut={openCut}
        filters={filters}
        bookHref={bookHref}
        bookLabel={bookLabel}
        onClose={() => setOpenId(null)}
        onNext={visible.length > 1 ? () => step(1) : undefined}
        onPrev={visible.length > 1 ? () => step(-1) : undefined}
      />
    </section>
  );
}
