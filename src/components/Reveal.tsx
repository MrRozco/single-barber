import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useInView } from "../hooks/motion";
import { cx } from "../lib/cx";

type RevealProps = { as?: ElementType; className?: string; delay?: number; children: ReactNode };

/** Rises its children in once, when they first enter the viewport. */
export function Reveal({ as: Tag = "div", className, delay = 0, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  return (
    <Tag ref={ref} className={cx("sl-reveal", inView && "is-in", className)} style={{ "--rd": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
