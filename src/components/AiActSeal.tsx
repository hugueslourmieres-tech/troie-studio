/**
 * AiActSeal : macaron officiel « tamponné », façon sceau de diplôme.
 * Bord festonné (rosace), double anneau, texte circulaire ATTESTATION AI ACT
 * ARTICLE 4, bouclier à coche au centre. Posé en accent sur un CTA.
 * Couleurs fixes (encre + accent + crème) : lisible sur n'importe quel fond.
 */
export function AiActSeal({ className = "" }: { className?: string }) {
  const INK = "#1a1714";
  const ACCENT = "#e07b39";
  const CREAM = "#faf5ec";

  // Festons du bord : petits disques encre régulièrement répartis.
  const scallops = Array.from({ length: 20 }, (_, i) => {
    const a = (i / 20) * Math.PI * 2;
    return (
      <circle
        key={i}
        cx={50 + Math.cos(a) * 45}
        cy={50 + Math.sin(a) * 45}
        r={3.4}
        fill={INK}
      />
    );
  });

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        {/* Cercle pour le texte circulaire (démarre en haut, sens horaire). */}
        <path id="troie-seal-ring" d="M50,50 m0,-33 a33,33 0 1,1 0,66 a33,33 0 1,1 0,-66" />
      </defs>

      {scallops}
      <circle cx="50" cy="50" r="45" fill={CREAM} stroke={INK} strokeWidth="2.4" />
      <circle cx="50" cy="50" r="38.5" fill="none" stroke={ACCENT} strokeWidth="1.4" />

      {/* Texte circulaire */}
      <text
        fill={INK}
        style={{
          fontFamily: "var(--font-mono, ui-monospace), monospace",
          fontSize: "8.4px",
          fontWeight: 700,
          letterSpacing: "1.6px",
        }}
      >
        <textPath href="#troie-seal-ring" startOffset="1%">
          ATTESTATION · AI ACT · ARTICLE 4 ·
        </textPath>
      </text>

      {/* Bouclier + coche au centre */}
      <path
        d="M50 33 L61 37 V49 C61 57 56 62 50 65 C44 62 39 57 39 49 V37 Z"
        fill={INK}
      />
      <path
        d="M45.5 49.5 L48.8 53 L55 45.5"
        fill="none"
        stroke={CREAM}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
