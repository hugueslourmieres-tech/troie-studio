"use client";

import { useLocale } from "next-intl";

// GS MONACO, VEORIA, STUDIO DE LA ROCHE, MEASURECOLOR seulement après accord
// de Hugues.
const CLIENTS = [
  "CHANEL",
  "X-RITE",
  "SOFITEL",
  "RUTHERFORD",
  "TOP AKITA INU",
  "CAPEFRONT",
  "LOIR PARIS",
];

/**
 * ClientsCloud, wordmarks des marques avec lesquelles l'équipe a travaillé,
 * en studio ou en interne (CHANEL : expérience salariée, pas un client du
 * studio, d'où le libellé « L'équipe a travaillé avec »), dans un marquee infini
 * horizontal piloté par GSAP. Inspiration luxe / Hermès : un seul "ruban"
 * qui défile lentement sans coupure.
 *
 * Rendu sur fond crème depuis le 1er/10/2026 (hors wrapper orange) : les
 * dégradés des bords lisent var(--bg) et suivent donc le ton crème. Plus de
 * sceau ici, il est déjà dans le héros (un seul par page).
 */
export function ClientsCloud() {
  const locale = useLocale();

  // Rangée fixe (21/10/2026) : rien ne défile hors des courbes et des films.
  const loopList = CLIENTS;

  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-5 pt-12 pb-4 md:px-12 md:pt-14 md:pb-6">
        <p className="text-center text-sm text-[var(--fg-2)]">
          {locale === "fr" ? "L'équipe a travaillé avec" : "Our team has worked with"}
        </p>
      </div>

      {/* Marquee, défile infiniment, full width */}
      <div className="relative mt-2 overflow-hidden pb-12 md:pb-16">

        <div
          className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-4 px-5 md:gap-x-16"
        >
          {loopList.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="text-sm whitespace-nowrap text-[var(--fg-2)]/85 transition-colors hover:text-[var(--fg)] md:text-sm font-medium"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
