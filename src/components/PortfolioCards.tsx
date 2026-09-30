import { Button, SmartLink } from "./Button";
import { ArrowRight } from "./icons";

export type PortfolioCardItem = { key: string; name: string; meta?: string; tag?: string; image?: string; alt?: string; href?: string };

export type PortfolioCardsProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  items: PortfolioCardItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

export function PortfolioCards({
  id = "cuts",
  eyebrow,
  title = "Fresh off my chair",
  items,
  ctaLabel = "See all my cuts",
  ctaHref = "/portfolio",
}: PortfolioCardsProps) {
  return (
    <section className="sl sl-section" id={id} aria-labelledby="sl-cuts-h">
      <div className="sl-wrap">
        <div className="sl-sechead">
          <div>
            {eyebrow && <p className="sl-eyebrow">{eyebrow}</p>}
            <h2 className="sl-h2" id="sl-cuts-h">
              {title}
            </h2>
          </div>
        </div>
        <ul className="sl-rail" style={{ listStyle: "none" }}>
          {items.map((it, i) => (
            <li key={it.key}>
              <SmartLink className="sl-cut" href={it.href ?? ctaHref}>
                <div className="sl-cut-media">
                  {it.image ? (
                    <img src={it.image} alt={it.alt ?? it.name} loading="lazy" decoding="async" />
                  ) : (
                    <div className="sl-cut-ph" aria-hidden>
                      <b>{String(i + 1).padStart(2, "0")}</b>
                    </div>
                  )}
                  {it.tag && <span className="sl-cut-tag">{it.tag}</span>}
                </div>
                <div className="sl-cut-body">
                  <div>
                    <h3 className="sl-cut-name">{it.name}</h3>
                    {it.meta && <p className="sl-cut-meta">{it.meta}</p>}
                  </div>
                  <span className="sl-cut-go" aria-hidden>
                    <ArrowRight />
                  </span>
                </div>
              </SmartLink>
            </li>
          ))}
        </ul>
        <div className="sl-portfolio-cta">
          <Button href={ctaHref} variant="secondary" size="lg" block arrow>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
