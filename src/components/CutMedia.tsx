import type { ReactElement } from "react";
import type { Cut, HairLength, HairType } from "../content/types";

const FILL: Record<HairLength, number> = { shaved: 0.2, short: 0.4, medium: 0.62, long: 0.86 };

/**
 * Placeholder art for a cut with no photo: draws the hair TYPE as a texture
 * (lines / waves / loops / zigzags) filled up to the LENGTH. Never ship it.
 */
export function HairTexture({ type, length }: { type: HairType; length: HairLength }) {
  const W = 200;
  const H = 250;
  const top = H * (1 - FILL[length]);
  const shapes: ReactElement[] = [];
  const fade = (row: number, step: number) => ({ opacity: Math.max(0.25, 1 - row * step) });

  if (type === "straight") {
    for (let x = 6; x < W; x += 9) shapes.push(<path key={x} d={`M${x} ${H} V${top + (x % 18 ? 8 : 0)}`} />);
  } else if (type === "wavy") {
    for (let y = H - 6, row = 0; y > top; y -= 14, row++) {
      let d = `M-10 ${y}`;
      for (let x = -10; x < W + 20; x += 40) d += " q10 -9 20 0 t20 0";
      shapes.push(<path key={y} d={d} style={fade(row, 0.06)} />);
    }
  } else if (type === "curly") {
    for (let y = H - 10, row = 0; y > top; y -= 18, row++)
      for (let x = (row % 2) * 10 + 6; x < W; x += 20) shapes.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={6} style={fade(row, 0.07)} />);
  } else {
    for (let y = H - 6, row = 0; y > top; y -= 10, row++) {
      let d = `M0 ${y}`;
      for (let x = 0; x < W; x += 8) d += " l4 -5 l4 5";
      shapes.push(<path key={y} d={d} style={fade(row, 0.06)} />);
    }
  }

  return (
    <svg className="sl-tex" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
        {shapes}
      </g>
      <line className="sl-tex-line" x1={0} x2={W} y1={top} y2={top} />
    </svg>
  );
}

export function CutMedia({ cut, index }: { cut: Cut; index?: number }) {
  return (
    <div className="sl-cutm">
      {cut.image ? (
        <img src={cut.image} alt={cut.alt ?? cut.name} loading="lazy" decoding="async" />
      ) : (
        <div className="sl-cutm-ph">
          <HairTexture type={cut.type} length={cut.length} />
          {index != null && <b>{String(index + 1).padStart(2, "0")}</b>}
        </div>
      )}
    </div>
  );
}
