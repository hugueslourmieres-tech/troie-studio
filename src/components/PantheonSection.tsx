"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { HOUSES, type HouseSlug } from "@/lib/pantheon";

/**
 * Section home : présente les 4 maisons du Panthéon et renvoie vers
 * le test d'ascension (/formations/pantheon/test). Suit directement le
 * hero pour tenir la promesse tout de suite. Données et couleurs
 * partagées avec le test (src/lib/pantheon.ts).
 *
 * Blasons retirés volontairement (en attente d'une version propre).
 * Chaque carte montre le canal que la maison fait grandir, un chiffre
 * déjà publié sur /ia, et les outils réellement branchés (logos).
 */

const ORDER: HouseSlug[] = ["hermes", "athena", "achille", "hestia"];

/** Canal principal que chaque maison fait grandir. */
const CHANNELS: Record<HouseSlug, string> = {
  hermes: "CRM, Prospection",
  athena: "SEO, SEA",
  achille: "Réseaux sociaux",
  hestia: "Support, Opérations",
};

/** Un chiffre par maison, repris des tâches déjà publiées et sourcées sur /ia. */
const STATS: Record<HouseSlug, string> = {
  hermes: "5 à 10 h de prospection récupérées par semaine",
  athena: "Vos chiffres synthétisés chaque lundi matin",
  achille: "Un sujet devient cinq formats prêts à publier",
  hestia: "40 % du service client traité en autonomie",
};

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

        <ol className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {ORDER.map((slug, i) => {
            const h = HOUSES[slug];
            // Les logos SVG sont multicolores : on les force dans la
            // couleur de texte de la carte (noir ou crème).
            const logoFilter =
              h.fg === "#1a1714" ? "brightness(0)" : "brightness(0) invert(1)";
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
                  <h3 className="t-display text-2xl">{h.name}</h3>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] opacity-70">
                    {h.godOf}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed opacity-90">
                    {h.description}
                  </p>

                  {/* Canal + chiffre déjà publié */}
                  <div
                    className="mt-6 border-t pt-4"
                    style={{ borderColor: `${h.fg}33` }}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] opacity-70">
                      {CHANNELS[slug]} <span aria-hidden="true">↗</span>
                    </p>
                    <p
                      className="mt-2 text-sm font-medium leading-snug"
                      style={{ color: h.accent }}
                    >
                      {STATS[slug]}
                    </p>
                  </div>

                  {/* Outils réellement branchés (agents + connexions MCP) */}
                  <ul
                    aria-label={`Outils connectés par la maison ${h.name}`}
                    className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2.5"
                  >
                    {h.tools.map((tool) => (
                      <li
                        key={tool.src}
                        title={tool.label}
                        className="flex h-4 items-center opacity-60 transition-opacity duration-300 group-hover:opacity-90"
                      >
                        <img
                          src={tool.src}
                          alt={tool.label}
                          loading="lazy"
                          className="h-4 w-auto"
                          style={{ filter: logoFilter }}
                        />
                      </li>
                    ))}
                  </ul>

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

        {/* Agents branchés sur les vrais outils + schéma de croissance */}
        <div className="mt-16 grid gap-10 border-t border-[var(--rule)] pt-14 md:mt-24 md:grid-cols-12 md:gap-12 md:pt-16">
          <div className="md:col-span-5">
            <p className="t-eyebrow">Comment ça marche</p>
            <h3 className="t-display mt-5 text-2xl text-[var(--fg)] md:text-3xl">
              Des agents branchés sur vos vrais outils.
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
              Chaque maison connecte ses agents IA à vos logiciels du
              quotidien : CRM, boîte mail, boutique, réseaux sociaux. C'est
              le rôle des connexions MCP : l'agent ne donne pas des conseils,
              il lit vos données, écrit, relance et publie à votre place,
              sous votre supervision.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
              Résultat : le SEO, le SEA, les réseaux sociaux, le CRM et le
              support avancent chaque semaine, même quand vous dormez.
            </p>
          </div>
          <div className="md:col-span-7">
            <GrowthChart />
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-16">
          <Link
            href="/formations/pantheon/test"
            className="group inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1714]"
          >
            Faire le test du Panthéon
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/65">
            5 questions, votre sésame par email
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * GrowthChart : schéma d'illustration, une courbe exponentielle par
 * maison (couleurs DA), chaque courbe étiquetée par le canal qu'elle
 * fait grandir. Volontairement sans chiffres : aucune promesse
 * inventée, la légende renvoie vers le test.
 */
function GrowthChart() {
  const curves: {
    slug: HouseSlug;
    label: string;
    d: string;
    endY: number;
    color: string;
  }[] = [
    { slug: "hermes", label: "CRM, Hermès", d: "M44 254 C 330 251, 545 190, 598 40", endY: 40, color: "#f37b22" },
    { slug: "achille", label: "Réseaux sociaux, Achille", d: "M44 254 C 330 251, 550 208, 598 85", endY: 85, color: "#b4552d" },
    { slug: "athena", label: "SEO / SEA, Athéna", d: "M44 254 C 335 252, 555 222, 598 130", endY: 130, color: "#1a1714" },
    { slug: "hestia", label: "Support, Hestia", d: "M44 254 C 340 253, 560 236, 598 175", endY: 175, color: "#1f3a34" },
  ];

  return (
    <figure className="border border-[var(--rule)] bg-[var(--bg-2)]/60 p-5 md:p-7">
      <svg
        viewBox="0 0 640 300"
        role="img"
        aria-label="Schéma d'illustration : le volume traité par les agents de chaque maison grandit mois après mois (CRM, SEO et SEA, réseaux sociaux, support)."
        className="w-full"
      >
        {/* Axes */}
        <line x1="44" y1="18" x2="44" y2="258" stroke="var(--rule)" strokeWidth="1" />
        <line x1="44" y1="258" x2="600" y2="258" stroke="var(--rule)" strokeWidth="1" />
        {/* Grille discrète */}
        {[78, 138, 198].map((y) => (
          <line key={y} x1="44" y1={y} x2="600" y2={y} stroke="var(--rule)" strokeWidth="1" opacity="0.45" />
        ))}

        {/* Courbes */}
        {curves.map((c) => (
          <g key={c.slug}>
            <path d={c.d} fill="none" stroke={c.color} strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="598" cy={c.endY} r="4" fill={c.color} />
            <text
              x="590"
              y={c.endY - 10}
              textAnchor="end"
              fill={c.color}
              style={{ font: "600 11px var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              {c.label}
            </text>
          </g>
        ))}

        {/* Légendes d'axes */}
        <text x="44" y="284" fill="var(--fg-2)" style={{ font: "10px var(--font-mono)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Mois 1
        </text>
        <text x="600" y="284" textAnchor="end" fill="var(--fg-2)" style={{ font: "10px var(--font-mono)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Mois 12
        </text>
        <text x="36" y="150" textAnchor="middle" fill="var(--fg-2)" transform="rotate(-90 36 150)" style={{ font: "10px var(--font-mono)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Volume traité
        </text>
      </svg>
      <figcaption className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--fg-2)]/65">
        Schéma d'illustration. Le rythme réel dépend de vos outils et de votre volume.
      </figcaption>
    </figure>
  );
}
