import { useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Check, Lock } from "./icons";
import { useInView } from "../hooks/motion";
import { cx, telHref } from "../lib/cx";

export type BookingCTAProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  /** Scheduler embed URL (Calendly, Square, Acuity, Booksy…). Lazy-loaded near the viewport. */
  embedSrc?: string;
  /** Or a script-based widget's markup instead of embedSrc. */
  children?: ReactNode;
  provider?: string;
  embedHeight?: number;
  embedTitle?: string;
  /** Full-page booking link; defaults to embedSrc. */
  openHref?: string;
  placeholder?: string;
  details?: { label: string; value: string }[];
  notes?: string[];
  phone?: string;
  callLabel?: string;
};

const hex = (v: string) => (/^#[0-9a-f]{6}$/i.test(v.trim()) ? v.trim().slice(1) : null);

/** Calendly accepts colour params; theme it to the site's tokens so the widget doesn't flash white. */
function themeEmbed(src: string): string {
  if (!/calendly\.com/.test(src) || typeof window === "undefined") return src;
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return src;
  }
  const cs = getComputedStyle(document.documentElement);
  const pairs: [string, string][] = [
    ["background_color", "--surface-raised"],
    ["text_color", "--ink"],
    ["primary_color", "--brass"],
  ];
  url.searchParams.set("hide_gdpr_banner", "1");
  for (const [param, token] of pairs) {
    const v = hex(cs.getPropertyValue(token));
    if (v && !url.searchParams.has(param)) url.searchParams.set(param, v);
  }
  return url.toString();
}

const OPEN_DAYS = new Set([9, 10, 12, 16, 17, 18, 23, 24, 25, 30, 31]);

function EmbedSkeleton({ loading, caption }: { loading?: boolean; caption?: string }) {
  return (
    <div className={cx("sl-embed-ph", loading && "is-loading")} aria-hidden={loading || undefined}>
      <div className="sl-embed-ph-cal">
        <div className="sl-embed-ph-mo">
          <b />
          <span />
          <span />
        </div>
        <div className="sl-embed-ph-dow">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className="sl-embed-ph-days">
          {Array.from({ length: 35 }, (_, i) => (
            <i key={i} className={cx(i < 3 && "off", i === 17 && "on", OPEN_DAYS.has(i) && "open")} />
          ))}
        </div>
      </div>
      <div className="sl-embed-ph-times">
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} className={i === 1 ? "on" : undefined} />
        ))}
      </div>
      {caption && <p className="sl-embed-ph-cap">{caption}</p>}
    </div>
  );
}

export function BookingCTA({
  id = "book",
  eyebrow,
  title = "Book your cut",
  body,
  embedSrc,
  children,
  provider,
  embedHeight = 720,
  embedTitle = "Book an appointment",
  openHref,
  placeholder = "Your booking widget (Calendly, Square, Acuity, Booksy…) loads here.",
  details = [],
  notes = [],
  phone,
  callLabel = "Rather text or call?",
}: BookingCTAProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const near = useInView(frameRef, "400px 0px");
  const [loaded, setLoaded] = useState(false);
  const src = useMemo(() => (embedSrc && near ? themeEmbed(embedSrc) : null), [embedSrc, near]);
  const openLink = openHref || embedSrc;

  return (
    <section className="sl sl-section sl-bk" id={id} aria-labelledby="sl-book-h">
      <div className="sl-wrap sl-bk-grid">
        <div className="sl-bk-info">
          <div className="sl-bk-head">
            {eyebrow && <p className="sl-eyebrow">{eyebrow}</p>}
            <h2 className="sl-h2" id="sl-book-h">
              {title}
            </h2>
            {body && <p className="sl-bk-body">{body}</p>}
          </div>
          <div className="sl-bk-meta">
            {details.length > 0 && (
              <dl className="sl-bk-details">
                {details.map((d) => (
                  <div key={d.label}>
                    <dt>{d.label}</dt>
                    <dd>{d.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {notes.length > 0 && (
              <ul className="sl-bk-notes">
                {notes.map((n) => (
                  <li key={n}>
                    <Check />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            )}
            {phone && (
              <p className="sl-bk-call">
                {callLabel} <a href={telHref(phone)}>{phone}</a>
              </p>
            )}
          </div>
        </div>

        <div className="sl-embed" ref={frameRef}>
          <div className="sl-embed-pole" aria-hidden />
          <div className="sl-embed-bar">
            <span className="sl-embed-sec">
              <Lock />
              {provider ? `Secure booking via ${provider}` : "Secure booking"}
            </span>
            {openLink && (
              <a className="sl-embed-open" href={openLink} target="_blank" rel="noopener noreferrer">
                Open<span className="sl-hide-sm"> in new tab</span> ↗
              </a>
            )}
          </div>
          <div className="sl-embed-body" style={{ "--embed-h": `${embedHeight}px` } as CSSProperties}>
            {children ??
              (embedSrc ? (
                <>
                  {!loaded && <EmbedSkeleton loading />}
                  {src && (
                    <iframe
                      className={cx("sl-embed-frame", loaded && "is-loaded")}
                      src={src}
                      title={embedTitle}
                      loading="lazy"
                      allow="payment"
                      onLoad={() => setLoaded(true)}
                    />
                  )}
                </>
              ) : (
                <EmbedSkeleton caption={placeholder} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
