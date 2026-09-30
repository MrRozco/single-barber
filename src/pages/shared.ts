import type { FooterProps } from "../components/Footer";
import type { BookingCTAProps } from "../components/BookingCTA";
import { site } from "../content/site";

export const footerProps = (): FooterProps => ({
  brandName: site.barber.brandName,
  tagline: site.barber.tagline,
  address: site.barber.address,
  mapHref: site.barber.mapHref,
  phone: site.barber.phone,
  hours: site.barber.hours,
  socials: site.barber.socials,
  links: [
    { label: "Book", href: "/#book" },
    { label: "My work", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Reviews", href: "/#reviews" },
  ],
});

/** Booking block for subpages (same embed, different headline). */
export const bookingProps = (eyebrow: string, title: string): BookingCTAProps => ({
  eyebrow,
  title,
  body: "Pick a service and a time that works. You'll get a confirmation text and a reminder the day before.",
  embedSrc: site.booking.embedSrc || undefined,
  provider: site.booking.provider,
  openHref: site.booking.openHref || undefined,
  embedHeight: site.booking.embedHeight,
  details: site.booking.details,
  notes: site.booking.notes,
  phone: site.barber.phone,
});
