import type { ReactNode } from "react";

/**
 * Sigle grec : une capitale Didone (GFS Didot) posee en index devant
 * l'eyebrow d'une section. Taxonomie de marque partagee avec troie.app.
 *   Α = AI Act   Β = Le campus   Γ = Agence IA
 *   Δ = Creation Ε = Avis        Ζ = Demarrer
 */
export function GreekMark({
  letter,
  label,
  className = "",
  letterClassName = "text-[2.4rem] leading-[0.7] md:text-[2.9rem] text-[var(--accent)]",
  labelClassName = "t-eyebrow",
}: {
  letter: string;
  label: ReactNode;
  className?: string;
  letterClassName?: string;
  labelClassName?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        aria-hidden
        className={`select-none ${letterClassName}`}
        style={{
          fontFamily: "var(--font-greek), 'GFS Didot', 'Didot', Georgia, serif",
        }}
      >
        {letter}
      </span>
      <span className={labelClassName}>{label}</span>
    </div>
  );
}
