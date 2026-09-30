import { Stars } from "./Button";
import type { Review } from "../content/types";

export type TestimonialsProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  summary?: { rating: number; count?: number; source?: string };
  items: Review[];
};

export function Testimonials({ id = "reviews", eyebrow, title = "Word on the block", summary, items }: TestimonialsProps) {
  return (
    <section className="sl sl-section" id={id} aria-labelledby="sl-rev-h">
      <div className="sl-wrap">
        {eyebrow && <p className="sl-eyebrow">{eyebrow}</p>}
        <h2 className="sl-h2" id="sl-rev-h" style={{ marginBottom: "var(--space-5)" }}>
          {title}
        </h2>
        {summary && (
          <div className="sl-summary">
            <strong>{summary.rating.toFixed(1)}</strong>
            <div>
              <Stars value={summary.rating} />
              <div>
                {summary.count ? `${summary.count} reviews` : ""}
                {summary.source ? ` on ${summary.source}` : ""}
              </div>
            </div>
          </div>
        )}
        <ul className="sl-rail quotes" style={{ listStyle: "none" }}>
          {items.map((r) => (
            <li key={r.name + r.quote.slice(0, 12)} style={{ display: "flex" }}>
              <figure className="sl-quote" style={{ flex: 1 }}>
                {r.rating && <Stars value={r.rating} />}
                <blockquote>{r.quote}</blockquote>
                <figcaption>
                  <span className="av" aria-hidden>
                    {r.name.charAt(0)}
                  </span>
                  <span className="who">
                    <b>{r.name}</b>
                    {r.detail && <span>{r.detail}</span>}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
