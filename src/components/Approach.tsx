import { Reveal } from "./Reveal";

export type ApproachProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  items: { title: string; text: string }[];
};

export function Approach({ id = "approach", eyebrow, title = "How I work", items }: ApproachProps) {
  return (
    <section className="sl sl-section sl-appr" id={id} aria-labelledby="sl-ap-h">
      <div className="sl-wrap">
        <Reveal className="sl-sechead-stack">
          {eyebrow && <p className="sl-eyebrow">{eyebrow}</p>}
          <h2 className="sl-h2" id="sl-ap-h">
            {title}
          </h2>
        </Reveal>
        <ol className="sl-appr-grid">
          {items.map((it, i) => (
            <Reveal as="li" key={it.title} className="sl-appr-card" delay={i * 90}>
              <span className="sl-appr-n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
