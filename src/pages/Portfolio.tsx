import { BookingCTA } from "../components/BookingCTA";
import { Footer } from "../components/Footer";
import { PortfolioGallery } from "../components/PortfolioGallery";
import { SiteHeader } from "../components/SiteHeader";
import { StickyBookBar } from "../components/StickyBookBar";
import { HAIR_FILTERS, site } from "../content/site";
import { usePageMeta } from "../lib/seo";
import { bookingProps, footerProps } from "./shared";

export default function Portfolio() {
  usePageMeta({
    title: "My work",
    path: "/portfolio",
    description: "Fades, tapers, waves, twists and more — filter real cuts by hair type and length, then book the one you want.",
  });
  return (
    <>
      <SiteHeader brandName={site.barber.brandName} links={site.nav} />
      <main>
        <PortfolioGallery
          eyebrow="My work"
          title="The cuts"
          subtitle="Every cut here came out of my chair. Filter by your hair type and length, then book the one you want."
          items={site.cuts}
          filters={HAIR_FILTERS}
          stickyTop={64}
          bookHref="#book"
        />
        <BookingCTA {...bookingProps("Found your cut?", "Book it now")} />
      </main>
      <Footer {...footerProps()} />
      <StickyBookBar title="Found your cut?" note="Next open: Thu 2:15 pm" />
    </>
  );
}
