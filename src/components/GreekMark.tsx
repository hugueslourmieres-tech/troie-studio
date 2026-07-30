import type { ReactNode } from "react";

/**
 * Eyebrow de section.
 *
 * ⚠️ LES SIGLES GRECS ONT ÉTÉ RETIRÉS (29/07/2026). Une capitale Didone
 * (Α = AI Act, Β = Le campus, Γ = Agence IA, Δ = Création, Ε = Avis,
 * Ζ = Démarrer) précédait chaque surtitre. Ils avaient déjà été retirés de
 * troie.app en juillet, remplacés par des numéros ; troiestudio.fr s'aligne
 * à son tour, pour que les deux sites racontent la même chose.
 *
 * Le composant garde son nom et sa signature : `letter` et `letterClassName`
 * sont acceptés mais IGNORÉS, ce qui évite de toucher aux vingt-cinq appels
 * d'un coup. Ils pourront disparaître des appels puis du type au prochain
 * passage. Les sigles restent en revanche sur les couvertures Instagram, qui
 * ne sont pas dans ce dépôt.
 */
export function GreekMark({
  label,
  className = "",
  labelClassName = "t-eyebrow",
}: {
  /** @deprecated Ignoré depuis le retrait des sigles grecs. */
  letter?: string;
  label: ReactNode;
  className?: string;
  /** @deprecated Ignoré depuis le retrait des sigles grecs. */
  letterClassName?: string;
  labelClassName?: string;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className={labelClassName}>{label}</span>
    </div>
  );
}
