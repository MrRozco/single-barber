import { Button } from "./Button";
import { useScrolledPast } from "../hooks/motion";
import { cx } from "../lib/cx";

export type StickyBookBarProps = {
  href?: string;
  label?: string;
  title?: string;
  note?: string;
  showAfter?: number;
  /** Render in place instead of fixed (previews). */
  static?: boolean;
};

/** Phone + tablet only (hidden ≥1024px via CSS). Slides up once the first screen scrolls away. */
export function StickyBookBar({ href = "#book", label = "Book now", title, note, showAfter, static: isStatic = false }: StickyBookBarProps) {
  const past = useScrolledPast(showAfter, !isStatic);
  return (
    <div className={cx("sl", "sl-bar", (past || isStatic) && "is-on", isStatic && "is-static")} role="region" aria-label="Book an appointment">
      <div className="sl-bar-note">
        {title && <b>{title}</b>}
        {note}
      </div>
      <Button href={href} size="sm" arrow>
        {label}
      </Button>
    </div>
  );
}
