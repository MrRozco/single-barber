import { useEffect, useState, type RefObject } from "react";

export const prefersReducedMotion = (): boolean => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** True once the element has come within `rootMargin` of the viewport. Never flips back. */
export function useInView<T extends Element>(ref: RefObject<T | null>, rootMargin = "0px 0px -10% 0px"): boolean {
  // Without IntersectionObserver (very old browsers), just show everything.
  const [seen, setSeen] = useState(() => typeof IntersectionObserver === "undefined");
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, seen]);
  return seen;
}

/** true once the page has scrolled past `threshold` px (defaults to 60% of the first screen). */
export function useScrolledPast(threshold?: number, enabled = true): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => setPast(window.scrollY > (threshold ?? window.innerHeight * 0.6));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, enabled]);
  return past;
}
