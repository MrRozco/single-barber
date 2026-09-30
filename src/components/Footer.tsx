import { SmartLink } from "./Button";
import { telHref } from "../lib/cx";
import type { Link } from "../content/types";

export type FooterProps = {
  brandName: string;
  tagline?: string;
  address?: string;
  mapHref?: string;
  phone?: string;
  locationLabel?: string;
  hours?: { days: string; time: string }[];
  links?: Link[];
  socials?: Link[];
  legal?: string;
  credit?: string;
};

const YEAR = new Date().getFullYear();
const small = { margin: "var(--space-2) 0 0", fontSize: 14 };

export function Footer({
  brandName,
  tagline,
  address,
  mapHref,
  phone,
  locationLabel = "Find me",
  hours = [],
  links = [],
  socials = [],
  legal,
  credit,
}: FooterProps) {
  return (
    <footer className="sl sl-footer">
      <div className="sl-wrap">
        <div className="sl-footer-cols">
          <div>
            <p className="sl-footer-name">{brandName}</p>
            {tagline && <p className="sl-footer-tag">{tagline}</p>}
            {socials.length > 0 && (
              <div className="sl-socials">
                {socials.map((s) => (
                  <SmartLink key={s.label} href={s.href}>
                    {s.label}
                  </SmartLink>
                ))}
              </div>
            )}
          </div>
          {address && (
            <div>
              <h3>{locationLabel}</h3>
              <address>
                {address.split("\n").map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </address>
              {mapHref && (
                <p style={small}>
                  <SmartLink href={mapHref}>Get directions →</SmartLink>
                </p>
              )}
              {phone && (
                <p style={small}>
                  <a href={telHref(phone)}>{phone}</a>
                </p>
              )}
            </div>
          )}
          {hours.length > 0 && (
            <div>
              <h3>Hours</h3>
              <ul>
                {hours.map((r) => (
                  <li key={r.days}>
                    <span>{r.days}</span>
                    <span>{r.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {links.length > 0 && (
            <div>
              <h3>Explore</h3>
              <ul>
                {links.map((l) => (
                  <li key={l.label}>
                    <SmartLink href={l.href}>{l.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="sl-footer-legal">
          <span>{legal ?? `© ${YEAR} ${brandName}`}</span>
          {credit && <span>{credit}</span>}
        </div>
      </div>
    </footer>
  );
}
