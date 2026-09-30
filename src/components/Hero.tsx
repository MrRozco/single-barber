import { Button, Stars } from "./Button";
import { Scissors } from "./icons";
import { cx } from "../lib/cx";
import type { Link } from "../content/types";

export type HeroProps = {
  brandName: string;
  title: string;
  /** One word of the title, painted brass with an animated underline. */
  highlight?: string;
  subtitle?: string;
  eyebrow?: string;
  status?: string;
  primaryCta?: Link;
  secondaryCta?: Link;
  rating?: number;
  reviewCount?: number;
  note?: string;
  /** Fill 100svh (default). Set false inside contained layouts. */
  fullHeight?: boolean;
};

const FADE_BARS = [120, 96, 74, 54, 36, 20];
const clean = (w: string) => w.replace(/[^\w'-]/g, "").toLowerCase();

export function Hero({
  brandName,
  title,
  highlight,
  subtitle,
  eyebrow,
  status,
  primaryCta = { label: "Book a cut", href: "#book" },
  secondaryCta,
  rating,
  reviewCount,
  note,
  fullHeight = true,
}: HeroProps) {
  const words = title.split(" ");
  return (
    <header className={cx("sl", "sl-hero", !fullHeight && "is-contained")}>
      <div className="sl-hero-grid" aria-hidden />
      <div className="sl-hero-top">
        <span className="sl-hero-brand">{brandName}</span>
        {status && (
          <span className="sl-hero-open">
            <i />
            {status}
          </span>
        )}
      </div>

      <div className="sl-hero-art" aria-hidden>
        <Scissors />
        <div className="sl-pole">
          <div className="sl-pole-glass" />
          <div className="sl-pole-cap top" />
          <div className="sl-pole-cap bot" />
        </div>
        <div className="sl-fade">
          {FADE_BARS.map((w, i) => (
            <span key={w} style={{ width: w, opacity: 1 - i * 0.15, animationDelay: `${0.2 + i * 0.08}s` }} />
          ))}
        </div>
      </div>

      <div className="sl-hero-spacer" />

      <div className="sl-hero-copy">
        {eyebrow && <p className="sl-eyebrow">{eyebrow}</p>}
        <h1 className="sl-hero-title">
          {words.map((w, i) => (
            <span key={i} className={cx("w", !!highlight && clean(w) === highlight.toLowerCase() && "hl")} style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
              {w}
            </span>
          ))}
        </h1>
        {subtitle && <p className="sl-hero-sub">{subtitle}</p>}
        <div className="sl-hero-ctas">
          <Button href={primaryCta.href} size="lg" block arrow>
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button href={secondaryCta.href} variant="secondary" size="lg" block>
              {secondaryCta.label}
            </Button>
          )}
        </div>
        {(rating || note) && (
          <div className="sl-hero-trust">
            {rating && (
              <span className="sl-rating">
                <Stars value={rating} />
                {rating.toFixed(1)}
              </span>
            )}
            {reviewCount && <span>{reviewCount} reviews</span>}
            {note && <span>{note}</span>}
          </div>
        )}
      </div>
    </header>
  );
}
