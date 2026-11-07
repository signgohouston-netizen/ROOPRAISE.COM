import Link from "next/link";

type Props = {
  variant?: "full" | "mark";
  className?: string;
  /** height of the mark in px */
  size?: number;
  href?: string | null;
};

/**
 * Roopraise brand mark — a hand-stitched bloom inside a rounded tile.
 * The bloom reads as both a flower (handmade / botanical) and a spark,
 * nodding to the maker community the marketplace celebrates.
 */
export function LogoMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Roopraise"
      className={className}
    >
      <defs>
        <linearGradient id="rp-tile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#12a892" />
          <stop offset="1" stopColor="#0b6558" />
        </linearGradient>
      </defs>

      {/* tile */}
      <rect x="1.5" y="1.5" width="45" height="45" rx="14" fill="url(#rp-tile)" />
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="14"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />

      {/* bloom petals */}
      <g fill="#fdfbf7">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="24"
            cy="14.4"
            rx="4"
            ry="8.4"
            transform={`rotate(${deg} 24 24)`}
          />
        ))}
      </g>

      {/* stitched center */}
      <circle cx="24" cy="24" r="5.4" fill="#f5b301" />
      <circle cx="24" cy="24" r="2.1" fill="#0b6558" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold tracking-tight ${className}`}>
      <span className="text-ink">Roo</span>
      <span className="text-brand-500">praise</span>
    </span>
  );
}

export default function Logo({ variant = "full", className = "", size = 40, href = "/" }: Props) {
  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} className="shrink-0 drop-shadow-sm" />
      {variant === "full" && <Wordmark className="text-2xl" />}
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} aria-label="Roopraise — home" className="inline-flex">
      {content}
    </Link>
  );
}
