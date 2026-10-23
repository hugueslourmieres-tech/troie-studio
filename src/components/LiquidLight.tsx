/**
 * Lumière liquide (DA « Liquide », 23/10/2026) : sur fond noir, des nappes
 * de lumière argentée, à peine irisées, ondulent comme la surface d'un bain
 * d'huile qu'on fait vibrer (inspiration : identité Apple Music d'oct. 2026).
 * SVG pur : une turbulence animée déforme des halos flous (animations SVG
 * natives, lentes, sans JavaScript).
 */
export function LiquidLight({ className = "", id = "ll" }: { className?: string; id?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id={`${id}-liquid`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.009" numOctaves="2" seed="7" result="noise">
            <animate attributeName="baseFrequency" dur="22s" values="0.004 0.009;0.006 0.005;0.004 0.009" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="260" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <radialGradient id={`${id}-silver`}>
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#c9ccd4" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-cool`}>
          <stop offset="0%" stopColor="#9fb4ff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-warm`}>
          <stop offset="0%" stopColor="#ffb3d1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="#000" />
      <g filter={`url(#${id}-liquid)`} style={{ mixBlendMode: "screen" }}>
        <ellipse cx="1150" cy="300" rx="520" ry="230" fill={`url(#${id}-silver)`}>
          <animate attributeName="cx" dur="18s" values="1150;980;1150" repeatCount="indefinite" />
          <animate attributeName="cy" dur="24s" values="300;380;300" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="1350" cy="620" rx="380" ry="180" fill={`url(#${id}-cool)`}>
          <animate attributeName="cx" dur="26s" values="1350;1200;1350" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="820" cy="720" rx="420" ry="150" fill={`url(#${id}-warm)`}>
          <animate attributeName="cx" dur="30s" values="820;1000;820" repeatCount="indefinite" />
          <animate attributeName="cy" dur="20s" values="720;640;720" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="300" cy="180" rx="300" ry="120" fill={`url(#${id}-silver)`} opacity="0.5">
          <animate attributeName="cx" dur="28s" values="300;460;300" repeatCount="indefinite" />
        </ellipse>
      </g>
    </svg>
  );
}
