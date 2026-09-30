import { Button } from "../components/Button";
import { SiteHeader } from "../components/SiteHeader";
import { site } from "../content/site";
import { usePageMeta } from "../lib/seo";

export default function NotFound() {
  usePageMeta({ title: "Page not found", path: "/404" });
  return (
    <>
      <SiteHeader brandName={site.barber.brandName} links={site.nav} />
      <main className="sl sl-section" style={{ minHeight: "70svh", display: "grid", alignContent: "center" }}>
        <div className="sl-wrap">
          <p className="sl-eyebrow">404</p>
          <h1 className="sl-h2" style={{ marginBottom: "var(--space-5)" }}>
            Missed the line
          </h1>
          <Button href="/" arrow>
            Back home
          </Button>
        </div>
      </main>
    </>
  );
}
