import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { Button } from "./Button";
import { CutMedia } from "./CutMedia";
import { ChevronLeft, ChevronRight, Close } from "./icons";
import { prefersReducedMotion } from "../hooks/motion";
import { cx } from "../lib/cx";
import type { Cut, FilterGroup } from "../content/types";

export type CutSheetProps = {
  cut: Cut | null;
  filters: FilterGroup[];
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  bookHref?: string;
  bookLabel?: string;
};

const labelFor = (filters: FilterGroup[], key: string, value: string) =>
  filters.find((f) => f.key === key)?.options.find((o) => o.value === value)?.label ?? value;

/** Bottom sheet on phones (drag to dismiss), centred sheet on tablets, two-column modal ≥1024px. */
export function CutSheet({ cut, filters, onClose, onNext, onPrev, bookHref = "/#book", bookLabel = "Book this cut" }: CutSheetProps) {
  const open = cut != null;
  const [shown, setShown] = useState<Cut | null>(cut);
  const [leaving, setLeaving] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drag = useRef<{ y: number; dy: number } | null>(null);
  // Latest handlers without re-running the open/close effect on every render.
  const handlers = useRef({ onClose, onNext, onPrev });
  useLayoutEffect(() => {
    handlers.current = { onClose, onNext, onPrev };
  });

  // Keep the last cut mounted while the exit animation plays (adjust state on prop change, during render).
  const [prevCut, setPrevCut] = useState(cut);
  if (cut !== prevCut) {
    setPrevCut(cut);
    if (cut) {
      setShown(cut);
      setLeaving(false);
    } else if (shown) {
      setLeaving(true);
    }
  }

  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(
      () => {
        setShown(null);
        setLeaving(false);
      },
      prefersReducedMotion() ? 0 : 260,
    );
    return () => window.clearTimeout(t);
  }, [leaving]);

  // Focus, scroll lock and keyboard while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 30);
    const onKey = (e: KeyboardEvent) => {
      const h = handlers.current;
      if (e.key === "Escape") h.onClose();
      else if (e.key === "ArrowRight") h.onNext?.();
      else if (e.key === "ArrowLeft") h.onPrev?.();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.({ preventScroll: true });
    };
  }, [open]);

  if (!shown) return null;

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { y: e.clientY, dy: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    if (panelRef.current) panelRef.current.style.transition = "none";
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !panelRef.current) return;
    drag.current.dy = Math.max(0, e.clientY - drag.current.y);
    panelRef.current.style.transform = `translateY(${drag.current.dy}px)`;
  };
  const onUp = () => {
    if (!drag.current || !panelRef.current) return;
    const { dy } = drag.current;
    drag.current = null;
    panelRef.current.style.transition = "";
    panelRef.current.style.transform = "";
    if (dy > 110) onClose();
  };

  const c = shown;
  return (
    <div className={cx("sl", "sl-sheet", leaving ? "is-leaving" : "is-open")} role="dialog" aria-modal="true" aria-labelledby="sl-sheet-t">
      <div className="sl-sheet-bg" onClick={onClose} />
      <div className="sl-sheet-panel" ref={panelRef} key={c.id}>
        <div className="sl-sheet-grab" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} aria-hidden>
          <i />
        </div>
        <div className="sl-sheet-media">
          <CutMedia cut={c} />
          <button type="button" className="sl-sheet-x" ref={closeRef} onClick={onClose} aria-label="Close">
            <Close />
          </button>
          {(onPrev || onNext) && (
            <div className="sl-sheet-nav">
              <button type="button" onClick={onPrev} aria-label="Previous cut">
                <ChevronLeft />
              </button>
              <button type="button" onClick={onNext} aria-label="Next cut">
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
        <div className="sl-sheet-body">
          <div className="sl-sheet-tags">
            <span>{labelFor(filters, "type", c.type)}</span>
            <span>{labelFor(filters, "length", c.length)}</span>
          </div>
          <h2 className="sl-sheet-t" id="sl-sheet-t">
            {c.name}
          </h2>
          {c.description && <p className="sl-sheet-d">{c.description}</p>}
          <dl className="sl-sheet-facts">
            {c.duration && (
              <div>
                <dt>Time</dt>
                <dd>{c.duration}</dd>
              </div>
            )}
            {c.price && (
              <div>
                <dt>From</dt>
                <dd>{c.price}</dd>
              </div>
            )}
            <div>
              <dt>Length</dt>
              <dd>{labelFor(filters, "length", c.length)}</dd>
            </div>
          </dl>
          <Button href={c.bookHref ?? bookHref} onClick={() => handlers.current.onClose()} size="lg" block arrow>
            {bookLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
