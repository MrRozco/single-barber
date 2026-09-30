import { useEffect } from "react";
import { site } from "../content/site";

function setMeta(selector: string, attr: "content" | "href", value: string, create: () => HTMLElement) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/** Per-route <title>, description, canonical and Open Graph tags. */
export function usePageMeta({ title, description, path }: { title?: string; description?: string; path: string }) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${site.barber.brandName}` : site.seo.defaultTitle;
    const desc = description ?? site.seo.description;
    const url = new URL(path, site.seo.siteUrl).toString();
    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", desc, () => Object.assign(document.createElement("meta"), { name: "description" }));
    setMeta('link[rel="canonical"]', "href", url, () => Object.assign(document.createElement("link"), { rel: "canonical" }));
    for (const [prop, value] of [
      ["og:title", fullTitle],
      ["og:description", desc],
      ["og:url", url],
    ]) {
      setMeta(`meta[property="${prop}"]`, "content", value, () => {
        const m = document.createElement("meta");
        m.setAttribute("property", prop);
        return m;
      });
    }
  }, [title, description, path]);
}

/** schema.org structured data so Google can show hours, rating and location in local results. */
export function localBusinessJsonLd(): string {
  const { barber, seo, rating } = site;
  const [street, locality] = barber.address.split("\n");
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: barber.brandName,
    url: seo.siteUrl,
    telephone: barber.phone,
    priceRange: seo.priceRange,
    address: { "@type": "PostalAddress", streetAddress: street, addressLocality: seo.city, addressRegion: seo.region, description: locality },
    aggregateRating: { "@type": "AggregateRating", ratingValue: rating.value, reviewCount: rating.count },
    sameAs: barber.socials.map((s) => s.href),
  }).replace(/</g, "\\u003c");
}
