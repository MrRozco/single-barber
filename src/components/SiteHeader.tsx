import { NavLink } from "react-router";
import { Button, SmartLink } from "./Button";
import { useScrolledPast } from "../hooks/motion";
import { cx } from "../lib/cx";
import type { Link } from "../content/types";

export type SiteHeaderProps = {
  brandName: string;
  links?: Link[];
  bookHref?: string;
  bookLabel?: string;
};

/** Sticky header for subpages. Nav shows from 768px; phones get name + Book only. */
export function SiteHeader({ brandName, links = [], bookHref = "/#book", bookLabel = "Book" }: SiteHeaderProps) {
  const scrolled = useScrolledPast(8);
  return (
    <header className={cx("sl", "sl-head", scrolled && "is-scrolled")}>
      <div className="sl-head-in">
        <SmartLink className="sl-head-brand" href="/">
          {brandName}
        </SmartLink>
        {links.length > 0 && (
          <nav className="sl-head-nav" aria-label="Main">
            {links.map((l) =>
              l.href.includes("#") ? (
                <SmartLink key={l.label} href={l.href}>
                  {l.label}
                </SmartLink>
              ) : (
                // NavLink sets aria-current="page" on the active route; the CSS underlines it.
                <NavLink key={l.label} to={l.href} end>
                  {l.label}
                </NavLink>
              ),
            )}
          </nav>
        )}
        <Button href={bookHref} size="sm">
          {bookLabel}
        </Button>
      </div>
    </header>
  );
}
