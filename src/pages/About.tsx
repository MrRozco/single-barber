import { AboutIntro } from "../components/AboutIntro";
import { Approach } from "../components/Approach";
import { BookingCTA } from "../components/BookingCTA";
import { Footer } from "../components/Footer";
import { SiteHeader } from "../components/SiteHeader";
import { StickyBookBar } from "../components/StickyBookBar";
import { Testimonials } from "../components/Testimonials";
import { Timeline } from "../components/Timeline";
import { site } from "../content/site";
import { usePageMeta } from "../lib/seo";
import { bookingProps, footerProps } from "./shared";

export default function About() {
  const { about, barber, rating } = site;
  usePageMeta({ title: "About", path: "/about", description: about.headline });
  return (
    <>
      <SiteHeader brandName={barber.brandName} links={site.nav} />
      <main>
        <AboutIntro
          eyebrow="About me"
          name={barber.brandName}
          headline={about.headline}
          bio={about.bio}
          facts={about.facts}
          caption={about.caption}
          image={about.portrait}
          primaryCta={{ label: "Book with me", href: "#book" }}
          secondaryCta={{ label: "See my work", href: "/portfolio" }}
        />
        <Timeline eyebrow="My story" title="The path" items={about.timeline} />
        <Approach eyebrow="My approach" title="How I work" items={about.approach} />
        <Testimonials eyebrow="Reviews" summary={{ rating: rating.value, count: rating.count, source: rating.source }} items={site.reviews} />
        <BookingCTA {...bookingProps("Let's get you in", "Book with me")} />
      </main>
      <Footer {...footerProps()} />
      <StickyBookBar title="Next open: Thu 2:15 pm" note={`Cuts from ${site.booking.details[0]?.value ?? ""}`} />
    </>
  );
}
