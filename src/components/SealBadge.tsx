import type { ReactNode } from "react";

/**
 * SealBadge, contour en sceau festonné (bords ondulés) façon tampon/badge.
 * Juste le trait (orange par défaut), avec le picto centré au-dessus.
 */
const CX = 24;
const CY = 24;
const R = 20.5;
const BUMPS = 12;

function buildSeal(): string {
  const pts: [number, number][] = [];
  for (let i = 0; i < BUMPS; i++) {
    const a = (i / BUMPS) * Math.PI * 2 - Math.PI / 2;
    pts.push([
      +(CX + R * Math.cos(a)).toFixed(2),
      +(CY + R * Math.sin(a)).toFixed(2),
    ]);
  }
  // Rayon d'arc = demi-corde -> bosses en demi-cercle (feston marqué).
  const ar = +(R * Math.sin(Math.PI / BUMPS)).toFixed(2);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i <= BUMPS; i++) {
    const p = pts[i % BUMPS];
    d += ` A ${ar} ${ar} 0 0 1 ${p[0]} ${p[1]}`;
  }
  return `${d} Z`;
}

const SEAL_PATH = buildSeal();

export function SealBadge({
  children,
  className = "",
  size = "h-12 w-12",
}: {
  children: ReactNode;
  className?: string;
  /** Tailwind size classes for the badge box. */
  size?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex ${size} items-center justify-center text-[var(--accent)] ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        className="absolute inset-0 h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={SEAL_PATH} />
      </svg>
      <span className="relative flex items-center justify-center">{children}</span>
    </span>
  );
}
