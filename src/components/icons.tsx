type IconProps = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const ArrowRight = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ChevronLeft = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);
export const ChevronRight = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);
export const Close = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const Check = ({ size = 18 }: IconProps) => (
  <svg {...base(size)} strokeWidth={2.4}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);
export const Lock = ({ size = 14 }: IconProps) => (
  <svg {...base(size)}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export function Scissors() {
  return (
    <svg className="sl-scissors" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden>
      <g className="blade-a">
        <path d="M50 46 L94 20" />
        <path d="M50 46 L30 60" />
        <circle cx="22" cy="66" r="10" />
      </g>
      <g className="blade-b">
        <path d="M50 46 L94 64" />
        <path d="M50 46 L30 32" />
        <circle cx="22" cy="26" r="10" />
      </g>
      <circle cx="50" cy="46" r="3" fill="currentColor" />
    </svg>
  );
}
