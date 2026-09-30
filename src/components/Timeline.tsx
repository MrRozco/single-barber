import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";
import { prefersReducedMotion } from "../hooks/motion";

export type TimelineProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  items: { year: string; title: string; text?: string }[];
};

/** The barber's path. A brass line draws down the track as the visitor scrolls. */
export function Timeline({ id = "story", eyebrow, title = "The path", items }: TimelineProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    if (prefersReducedMotion()) {
      fill.style.transform = "scaleY(1)";
      return;
    }
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = list.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const t = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / Math.max(1, r.height)));
        fill.style.transform = `scaleY(${r.bottom < vh ? 1 : t})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="sl sl-section" id={id} aria-labelledby="sl-tl-h">
      <div className="sl-wrap">
        <Reveal className="sl-sechead-stack">
          {eyebrow && <p className="sl-eyebrow">{eyebrow}</p>}
          <h2 className="sl-h2" id="sl-tl-h">
            {title}
          </h2>
        </Reveal>
        <div className="sl-tl" ref={listRef}>
          <span className="sl-tl-track" aria-hidden>
            <span className="sl-tl-fill" ref={fillRef} />
          </span>
          <ol className="sl-tl-list">
            {items.map((it) => (
              <Reveal as="li" key={it.year + it.title} className="sl-tl-item" delay={60}>
                <span className="sl-tl-dot" aria-hidden />
                <span className="sl-tl-year">{it.year}</span>
                <div className="sl-tl-body">
                  <h3>{it.title}</h3>
                  {it.text && <p>{it.text}</p>}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
