"use client";

import { useLocale } from "next-intl";

import Image from "next/image";

// GS MONACO, VEORIA, STUDIO DE LA ROCHE, MEASURECOLOR seulement après accord
// de Hugues. Logos en noir sur transparent (22/10/2026), tirés des fichiers
// des marques, recadrés au plus juste. Hauteur réglée à l'œil pour que chaque
// logo pèse le même poids (surface égale) : h ≈ √(4000 / largeur relative).
// Top Akita Inu retiré avec son site (le fichier top-akita-inu.png contenait
// en fait le logo Rutherford).
const CLIENTS = [
  { name: "CHANEL", src: "/images/clients/mono-chanel.png", w: 1015, h: 160, px: 25 },
  { name: "X-Rite", src: "/images/clients/mono-xrite-mark.png", w: 538, h: 160, px: 34 },
  { name: "Sofitel", src: "/images/clients/mono-sofitel.png", w: 506, h: 160, px: 36 },
  { name: "Rutherford", src: "/images/clients/mono-rutherford.png", w: 978, h: 160, px: 26 },
  { name: "Capefront Energies", src: "/images/clients/mono-capefront.png", w: 540, h: 160, px: 34 },
  { name: "LOIR Paris", src: "/images/clients/mono-loir-paris.png", w: 358, h: 160, px: 42 },
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
      <div data-reveal className="mx-auto max-w-7xl px-5 pt-12 pb-4 md:px-12 md:pt-14 md:pb-6">
        <p className="text-center text-sm text-[var(--fg-2)]">
          {locale === "fr" ? "L'équipe a travaillé avec" : "Our team has worked with"}
        </p>
      </div>

      {/* Marquee, défile infiniment, full width */}
      <div className="relative mt-2 overflow-hidden pb-12 md:pb-16">

        <ul
          data-reveal-stagger
          className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-8 px-5 md:gap-x-16"
        >
          {loopList.map((c) => (
            <li key={c.name} className="flex items-center">
              <Image
                src={c.src}
                alt={c.name}
                width={c.w}
                height={c.h}
                sizes="200px"
                style={{ height: `calc(${c.px}px * var(--logo-scale, 1))`, width: "auto" }}
                className="opacity-70 transition-opacity duration-200 hover:opacity-100 [--logo-scale:0.78] md:[--logo-scale:1]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
