/**
 * AiActStamp : tampon « certification » en trait, TRANSPARENT (aucun aplat),
 * en currentColor pour se poser sur un bouton et le laisser transparaître.
 * Double anneau, texte circulaire ATTESTATION AI ACT, cocarde à ruban au
 * centre (symbole de certification). À placer en overlay avec une opacité
 * réduite et une légère rotation.
 */
export function AiActStamp({ className = "" }: { className?: string }) {
  // 40 petits traits radiaux : le bord cranté du tampon.
  const ticks = Array.from({ length: 40 }, (_, i) => {
    const a = (i / 40) * Math.PI * 2;
    return (
      <line
        key={i}
        x1={50 + Math.cos(a) * 39.5}
        y1={50 + Math.sin(a) * 39.5}
        x2={50 + Math.cos(a) * 45}
        y2={50 + Math.sin(a) * 45}
        strokeWidth="0.7"
      />
    );
  });

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <defs>
        <path
          id="troie-stamp-ring"
          d="M50,50 m0,-31 a31,31 0 1,1 0,62 a31,31 0 1,1 0,-62"
        />
      </defs>

      <circle cx="50" cy="50" r="46.5" strokeWidth="1.4" />
      <circle cx="50" cy="50" r="38.5" strokeWidth="0.9" />
      {ticks}

      <text
        fill="currentColor"
        stroke="none"
        style={{
          fontFamily: "var(--font-mono, ui-monospace), monospace",
          fontSize: "7px",
          fontWeight: 700,
          letterSpacing: "1.3px",
        }}
      >
        <textPath href="#troie-stamp-ring" startOffset="0%">
          ATTESTATION · AI ACT · ARTICLE 4 ·&nbsp;
        </textPath>
      </text>

      {/* Cocarde de certification : médaille + coche + rubans */}
      <circle cx="50" cy="41" r="10" strokeWidth="1.5" />
      <path
        d="M45.4 41 L48.7 44.3 L54.6 37.6"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M45 50 L42 62.5 L47.3 58.8" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M55 50 L58 62.5 L52.7 58.8" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
