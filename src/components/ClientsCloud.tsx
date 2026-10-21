"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { gsap } from "gsap";

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
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, { xPercent: -50, ease: "none", duration: 32, repeat: -1 });
    });
    return () => ctx.revert();
  }, []);

  const loopList = [...CLIENTS, ...CLIENTS];

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
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent md:w-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent md:w-40"
        />

        <div
          ref={trackRef}
          className="flex w-max gap-12 will-change-transform md:gap-20"
        >
          {loopList.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.28em] text-[var(--fg-2)]/85 transition-colors hover:text-[var(--fg)] md:text-sm"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
