import { BookingCTA } from "../components/BookingCTA";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { PortfolioCards } from "../components/PortfolioCards";
import { StickyBookBar } from "../components/StickyBookBar";
import { Testimonials } from "../components/Testimonials";
import { site } from "../content/site";
import { localBusinessJsonLd, usePageMeta } from "../lib/seo";
import { footerProps } from "./shared";

export default function Home() {
  usePageMeta({ path: "/" });
  const { barber, rating, booking } = site;
  const featured = site.cuts.filter((c) => c.featured).slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: localBusinessJsonLd() }} />
      <Hero
        brandName={barber.brandName}
        status="Booking this week"
        eyebrow="Independent barber · Est. 2016"
        title="Fresh fades. Clean lines."
        highlight="lines"
        subtitle="One barber, one chair, your full attention. Precision cuts, beard work and hot-towel shaves — book online in 30 seconds."
        primaryCta={{ label: "Book a cut", href: "#book" }}
        secondaryCta={{ label: "See my work", href: "#cuts" }}
        rating={rating.value}
        reviewCount={rating.count}
        note="By appointment only"
      />
      <main>
        <PortfolioCards
          eyebrow="My work"
          items={featured.map((c) => ({
            key: c.id,
            name: c.name,
            tag: c.tag,
            image: c.image,
            alt: c.alt,
            meta: [c.duration, c.price && `from ${c.price}`].filter(Boolean).join(" · "),
            href: `/portfolio?type=${c.type}`,
          }))}
        />
        <Testimonials eyebrow="Reviews" summary={{ rating: rating.value, count: rating.count, source: rating.source }} items={site.reviews} />
        <BookingCTA
          eyebrow="Book in 30 seconds"
          title="Book your cut"
          body="Pick a service and a time that works. You'll get a confirmation text and a reminder the day before."
          embedSrc={booking.embedSrc || undefined}
          provider={booking.provider}
          openHref={booking.openHref || undefined}
          embedHeight={booking.embedHeight}
          details={booking.details}
          notes={booking.notes}
          phone={barber.phone}
        />
      </main>
      <Footer {...footerProps()} />
      <StickyBookBar title="Next open: Thu 2:15 pm" note={`Cuts from ${booking.details[0]?.value ?? ""}`} />
    </>
  );
}
