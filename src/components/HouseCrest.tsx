import type { HouseSlug } from "@/lib/pantheon";

/**
 * Blason de maison : medaillon avec couronne de laurier et symbole
 * iconographique fidele a la mythologie grecque classique.
 *   - Hermes  : caducee (baton aile, deux serpents entrelaces)
 *   - Athena  : chouette + branche d'olivier
 *   - Achille : le bouclier d'Achille (cercles concentriques + astre
 *               central, decrit par Homere, Iliade XVIII)
 *   - Hestia  : le foyer, flamme sur l'autel, cercle de l'eternite
 *
 * Rendu en medaillon grave (fond degrade, symbole en relief clair,
 * couronne de laurier au registre inferieur) pour rester dans la DA
 * "Hermes" du site (gravures, bas-relief bronze).
 */

const LAUREL_LEFT =
  "M60 108c-9-2-17-6-23-13-4-5-6-11-6-11l6 2c1 4 4 8 8 11 5 4 10 6 15 7z" +
  "M42 96c-2-3-3-7-3-11l5 3c0 3 1 6 2 8z" +
  "M48 102c-2-3-4-6-4-10l5 3c0 3 1 5 3 7z" +
  "M35 89c-1-3-1-6 0-9l4 3c-1 2-1 5 0 7z";

function Laurel({ color }: { color: string }) {
  return (
    <g fill={color} opacity={0.85}>
      <path d={LAUREL_LEFT} />
      <path d={LAUREL_LEFT} transform="matrix(-1,0,0,1,120,0)" />
    </g>
  );
}

function Symbol({ slug, color }: { slug: HouseSlug; color: string }) {
  switch (slug) {
    case "hermes":
      return (
        <g fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          {/* Baton */}
          <line x1="60" y1="34" x2="60" y2="78" />
          {/* Deux serpents entrelaces */}
          <path d="M60 38c-8 4-8 10 0 14s8 10 0 14s-8 10 0 14" />
          <path d="M60 38c8 4 8 10 0 14s-8 10 0 14s8 10 0 14" />
          {/* Ailes */}
          <path d="M60 34c-6-8-16-9-22-4c4 2 6 6 6 6" fill={color} stroke="none" />
          <path d="M60 34c6-8 16-9 22-4c-4 2-6 6-6 6" fill={color} stroke="none" />
          {/* Poignee */}
          <circle cx="60" cy="32" r="2.6" fill={color} stroke="none" />
        </g>
      );
    case "athena":
      return (
        <g fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          {/* Chouette de face */}
          <path d="M46 40c0-7 6-12 14-12s14 5 14 12v14c0 9-7 16-14 16s-14-7-14-16z" />
          <circle cx="53" cy="42" r="5.5" />
          <circle cx="67" cy="42" r="5.5" />
          <circle cx="53" cy="42" r="1.6" fill={color} stroke="none" />
          <circle cx="67" cy="42" r="1.6" fill={color} stroke="none" />
          <path d="M60 47l-2.5 4h5z" fill={color} stroke="none" />
          <path d="M46 42l-6-3M74 42l6-3" />
          <path d="M52 66l-4 8M68 66l4 8" />
          {/* Branche d'olivier */}
          <path d="M40 82c8 4 32 4 40 0" />
          <ellipse cx="43" cy="80" rx="3.4" ry="2" transform="rotate(-25 43 80)" fill={color} stroke="none" />
          <ellipse cx="77" cy="80" rx="3.4" ry="2" transform="rotate(25 77 80)" fill={color} stroke="none" />
          <ellipse cx="50" cy="84" rx="3.4" ry="2" transform="rotate(-10 50 84)" fill={color} stroke="none" />
          <ellipse cx="70" cy="84" rx="3.4" ry="2" transform="rotate(10 70 84)" fill={color} stroke="none" />
        </g>
      );
    case "achille":
      return (
        <g fill="none" stroke={color} strokeLinecap="round">
          {/* Bouclier : cercles concentriques (Iliade XVIII) */}
          <circle cx="60" cy="58" r="26" strokeWidth={2.2} />
          <circle cx="60" cy="58" r="19" strokeWidth={1.6} opacity={0.85} />
          <circle cx="60" cy="58" r="12" strokeWidth={1.4} opacity={0.7} />
          {/* Astre central : soleil, lune, etoiles */}
          <g fill={color} stroke="none">
            <circle cx="60" cy="58" r="3.4" />
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i * Math.PI) / 4;
              const x1 = 60 + Math.cos(a) * 5.5;
              const y1 = 58 + Math.sin(a) * 5.5;
              const x2 = 60 + Math.cos(a) * 8.5;
              const y2 = 58 + Math.sin(a) * 8.5;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={color}
                  strokeWidth={1.4}
                  strokeLinecap="round"
                />
              );
            })}
          </g>
          {/* Lances croisees derriere */}
          <line x1="34" y1="82" x2="80" y2="34" strokeWidth={2} opacity={0.6} />
          <line x1="34" y1="34" x2="80" y2="82" strokeWidth={2} opacity={0.6} />
        </g>
      );
    case "hestia":
      return (
        <g>
          {/* Cercle de l'eternite */}
          <circle cx="60" cy="56" r="24" fill="none" stroke={color} strokeWidth={1.4} opacity={0.55} />
          {/* Autel */}
          <path
            d="M46 76h28l-3-14H49z"
            fill="none"
            stroke={color}
            strokeWidth={2.2}
            strokeLinejoin="round"
          />
          <line x1="42" y1="76" x2="78" y2="76" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
          {/* Flamme */}
          <path
            d="M60 34c4 6 8 10 8 16c0 5-3.6 8-8 8s-8-3-8-8c0-3 1.5-5 2.5-7c0.3 2 1.3 3 2 3c-0.5-4 1-8 3.5-12z"
            fill={color}
            stroke="none"
          />
        </g>
      );
  }
}

export function HouseCrest({
  slug,
  size = 120,
  bg,
  symbolColor,
  className,
}: {
  slug: HouseSlug;
  size?: number;
  /** Couleur de fond du medaillon (defaut : transparent). */
  bg?: string;
  /** Couleur du symbole et de la couronne. */
  symbolColor: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {bg && <circle cx="60" cy="60" r="58" fill={bg} />}
      <circle cx="60" cy="60" r="56" fill="none" stroke={symbolColor} strokeWidth={1} opacity={0.35} />
      <Laurel color={symbolColor} />
      <Symbol slug={slug} color={symbolColor} />
    </svg>
  );
}
