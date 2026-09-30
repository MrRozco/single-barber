export type Link = { label: string; href: string };

export type HairType = "straight" | "wavy" | "curly" | "coily";
export type HairLength = "shaved" | "short" | "medium" | "long";

export type Cut = {
  /** Stable id used in URLs and React keys, e.g. "skin-fade". */
  id: string;
  name: string;
  type: HairType;
  length: HairLength;
  duration?: string;
  price?: string;
  description?: string;
  /** Path under /public (e.g. "/cuts/skin-fade.webp") or a full URL. Portrait 4:5. */
  image?: string;
  alt?: string;
  /** Deep link into the booking tool for this service, if it supports one. */
  bookHref?: string;
  /** Show on the home page's PortfolioCards (first 4 featured are used). */
  featured?: boolean;
  /** Small label on the home card, e.g. "Most booked". */
  tag?: string;
};

export type Review = { quote: string; name: string; detail?: string; rating?: number };

export type FilterGroup<K extends string = string> = {
  key: K;
  label: string;
  options: { value: string; label: string }[];
};

export type SiteContent = {
  barber: {
    /** Shown in the hero, header and footer. The barber's name or personal brand. */
    brandName: string;
    phone: string;
    address: string;
    mapHref: string;
    hours: { days: string; time: string }[];
    socials: Link[];
    tagline: string;
  };
  seo: { siteUrl: string; defaultTitle: string; description: string; city: string; region: string; priceRange: string };
  nav: Link[];
  booking: {
    /** The scheduler's embed URL (Calendly, Square, Acuity, Booksy…). Leave empty to show the placeholder. */
    embedSrc: string;
    provider: string;
    openHref: string;
    embedHeight: number;
    details: { label: string; value: string }[];
    notes: string[];
  };
  rating: { value: number; count: number; source: string };
  reviews: Review[];
  cuts: Cut[];
  about: {
    headline: string;
    bio: string[];
    facts: { value: string; label: string }[];
    caption: string;
    portrait?: string;
    timeline: { year: string; title: string; text?: string }[];
    approach: { title: string; text: string }[];
  };
};
