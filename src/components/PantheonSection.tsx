"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { HOUSES, type HouseSlug } from "@/lib/pantheon";

/**
 * Section home : présente les 4 maisons du Panthéon et renvoie vers
 * le test d'ascension (/formations/pantheon). Suit directement le
 * hero ("Devenez un dieu de l'Olympe.") pour tenir la promesse tout
 * de suite. Données et couleurs partagées avec le test (src/lib/pantheon.ts).
 */

const ORDER: HouseSlug[] = ["hermes", "athena", "achille", "hestia"];

export function PantheonSection() {
  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <p className="t-eyebrow">Le Panthéon</p>
        <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
          Quatre maisons. Un seul Olympe.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/85">
          Cinq questions suffisent au Panthéon pour révéler votre maison, et
          le parcours IA taillé pour elle. Vous ne suivez pas une formation
          générique : vous devenez le dieu de votre domaine.
        </p>

        <ol className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-4">
          {ORDER.map((slug, i) => {
            const h = HOUSES[slug];
            return (
              <motion.li
                key={slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/formations/pantheon/test"
                  className="group flex h-full flex-col rounded-sm border p-7 transition-transform duration-300 hover:-translate-y-1.5"
                  style={{ backgroundColor: h.bg, borderColor: h.bg, color: h.fg }}
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full border"
                    style={{ borderColor: `${h.fg}40` }}
                  >
                    <HouseIcon slug={slug} className="h-5 w-5" />
                  </span>
                  <h3 className="t-display mt-6 text-2xl">{h.name}</h3>
                  <p
                    className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] opacity-70"
                  >
                    {h.godOf}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed opacity-90">
                    {h.description}
                  </p>
                  <span
                    className="mt-6 text-lg italic opacity-95"
                    style={{ color: h.accent }}
                  >
                    « {h.motto} »
                  </span>
                  <span className="mt-auto flex items-center gap-2 pt-6 font-mono text-[9px] uppercase tracking-[0.22em] opacity-80">
                    Découvrir
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ol>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/formations/pantheon/test"
            className="group inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1714]"
          >
            Faire le test du Panthéon
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/65">
            5 questions · votre sésame par email
          </p>
        </div>
      </div>
    </section>
  );
}

function HouseIcon({ slug, className }: { slug: HouseSlug; className: string }) {
  const paths: Record<HouseSlug, React.ReactNode> = {
    hermes: (
      // Sandale ailée : aile stylisée
      <path d="M3 13c3-6 8-9 13-8 3 .6 5 2.7 5 5.5S19 16 15 16c-3 0-4-1.5-4-3M3 13l4-1M3 13l3 3" />
    ),
    athena: (
      // Chouette : disques + oreilles
      <>
        <circle cx="9" cy="12" r="3" />
        <circle cx="15" cy="12" r="3" />
        <path d="M12 15v2m-7-9 2 3M19 6l-2 3M9 9l1-3M15 9l-1-3" />
      </>
    ),
    achille: (
      // Flamme / lame
      <path d="M12 2c2 3-1 4-1 7a3 3 0 0 0 6 0c0-1-.4-1.8-1-2.5.7 1.7.3 3.7-1 5-1 1-2.6 1.5-4 1.5-3 0-5.5-2.2-5.5-5.5C5.5 5 8 3 12 2z" />
    ),
    hestia: (
      // Foyer : flamme dans une maison
      <>
        <path d="M4 12 12 4l8 8" />
        <path d="M6 11v9h12v-9" />
        <path d="M12 20v-4a2 2 0 1 1 2-3.2c0 1.6-2 2.2-2 3.2" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[slug]}
    </svg>
  );
}
