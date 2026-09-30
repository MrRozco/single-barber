import type { CSSProperties } from "react";
import { Button } from "./Button";
import type { Link } from "../content/types";

export type AboutIntroProps = {
  name: string;
  eyebrow?: string;
  headline?: string;
  bio?: string[];
  facts?: { value: string; label: string }[];
  caption?: string;
  image?: string;
  alt?: string;
  primaryCta?: Link;
  secondaryCta?: Link;
};

const delay = (ms: number) => ({ "--rd": `${ms}ms` }) as CSSProperties;

export function AboutIntro({
  name,
  eyebrow,
  headline,
  bio = [],
  facts = [],
  caption,
  image,
  alt,
  primaryCta = { label: "Book with me", href: "/#book" },
  secondaryCta,
}: AboutIntroProps) {
  const words = name.split(" ");
  return (
    <section className="sl sl-about" aria-labelledby="sl-about-h">
      <div className="sl-wrap sl-about-grid">
        <div className="sl-about-media">
          <div className="sl-about-photo">
            {image ? (
              <img src={image} alt={alt ?? `Portrait of ${name}`} />
            ) : (
              <div className="sl-about-ph" aria-hidden>
                <b>{words.map((w) => w.charAt(0)).join("")}</b>
              </div>
            )}
            <span className="sl-about-stripe" aria-hidden />
          </div>
          {caption && <p className="sl-about-cap">{caption}</p>}
        </div>

        <div className="sl-about-copy">
          {eyebrow && (
            <p className="sl-eyebrow sl-in" style={delay(100)}>
              {eyebrow}
            </p>
          )}
          <h1 className="sl-about-name" id="sl-about-h">
            {words.map((w, i) => (
              <span key={i} className="sl-in" style={delay(160 + i * 90)}>
                {w}
              </span>
            ))}
          </h1>
          {headline && (
            <p className="sl-about-lead sl-in" style={delay(380)}>
              {headline}
            </p>
          )}
          {bio.map((p, i) => (
            <p key={i} className="sl-about-bio sl-in" style={delay(460 + i * 60)}>
              {p}
            </p>
          ))}
          {facts.length > 0 && (
            <dl className="sl-about-facts sl-in" style={delay(620)}>
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.value}</dt>
                  <dd>{f.label}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="sl-about-ctas sl-in" style={delay(700)}>
            <Button href={primaryCta.href} size="lg" arrow>
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="secondary" size="lg">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
