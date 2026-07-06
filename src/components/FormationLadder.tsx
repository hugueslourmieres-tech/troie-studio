"use client";

import Link from "next/link";
import { motion } from "motion/react";

/**
 * Échelle de formation sur la home : 3 packs, une couleur par pack.
 * - Abonnement (orange) : 29 EUR barré, gratuit 7 jours. Prix d'appel.
 * - Cours à vie (sombre) : dès 99 EUR, paiement unique.
 * - Équipes & entreprises (vert profond) : dès 990 EUR, audit gratuit.
 * Pictos SVG, gros CTA, révélation en cascade au scroll.
 */

type Pack = {
  step: string;
  badge?: string;
  title: string;
  strike?: string;
  price: string;
  unit: string;
  body: string;
  bullets: string[];
  href: string;
  cta: string;
  icon: "spark" | "infinity" | "team";
  /** Logos des outils couverts (monochromes). */
  tools: { src: string; label: string }[];
  /** Filtre CSS pour teinter les logos selon le fond de la carte. */
  toolFilter: string;
  /** Classes de la carte (fond / texte / bordure). */
  card: string;
  /** Couleurs internes. */
  text: string;
  sub: string;
  check: string;
  button: string;
};

const PACKS: Pack[] = [
  {
    step: "01",
    badge: "7 jours gratuits",
    title: "Abonnement",
    strike: "29 €",
    price: "Gratuit",
    unit: "7 jours, puis 29 € / mois · sans engagement",
    body: "L'accès complet à la plateforme pour apprendre l'IA à votre rythme, sur de vrais cas.",
    bullets: [
      "Tous les cours, actuels et à venir",
      "QCM interactifs, trophées, progression",
      "Bibliothèque de prompts par métier",
      "Annulable en un clic, à tout moment",
    ],
    href: "/formations/tarifs",
    cta: "Essayer gratuitement",
    icon: "spark",
    tools: [
      { src: "/images/logos/chatgpt.svg", label: "ChatGPT" },
      { src: "/images/logos/claude.svg", label: "Claude" },
      { src: "/images/logos/gemini.svg", label: "Gemini" },
      { src: "/images/logos/midjourney.svg", label: "Midjourney" },
      { src: "/images/logos/perplexity.svg", label: "Perplexity" },
    ],
    toolFilter: "brightness(0)",
    card: "border-[var(--accent)] bg-[var(--accent)]",
    text: "text-[#1a1714]",
    sub: "text-[#1a1714]/70",
    check: "text-[#1a1714]",
    button: "bg-[var(--ink)] text-[#f5f0e6] hover:bg-[#f5f0e6] hover:text-[#1a1714]",
  },
  {
    step: "02",
    title: "Cours à vie",
    price: "dès 99 €",
    unit: "paiement unique · accès à vie",
    body: "Un cours complet, à vous pour toujours, mises à jour incluses. Sans abonnement.",
    bullets: [
      "Maîtriser ChatGPT & Claude · 99 €",
      "Workflows IA & agents · 297 €",
      "25 à 100 prompts métier livrés",
      "Garantie satisfait ou remboursé 14 jours",
    ],
    href: "/formations/tarifs",
    cta: "Choisir mon cours",
    icon: "infinity",
    tools: [
      { src: "/images/logos/chatgpt.svg", label: "ChatGPT" },
      { src: "/images/logos/claude.svg", label: "Claude" },
      { src: "/images/logos/make.svg", label: "Make" },
      { src: "/images/logos/notion.svg", label: "Notion" },
      { src: "/images/logos/copilot.svg", label: "Copilot" },
    ],
    toolFilter: "brightness(0) invert(1)",
    card: "border-[#1a1714] bg-[var(--ink)]",
    text: "text-[#f5f0e6]",
    sub: "text-[#f5f0e6]/60",
    check: "text-[var(--accent)]",
    button: "bg-[var(--accent)] text-[#1a1714] hover:bg-[#f5f0e6]",
  },
  {
    step: "03",
    title: "Équipes & entreprises",
    price: "dès 990 €",
    unit: "formation intra · agents IA · AI Act",
    body: "On forme vos équipes sur leurs cas réels et on déploie vos agents, conformité incluse.",
    bullets: [
      "Formation intra, en France ou remote",
      "Conformité AI Act et preuve de formation",
      "Agents IA déployés et supervisés",
      "Audit gratuit de 30 minutes pour cadrer",
    ],
    href: "/ia",
    cta: "Réserver l'audit gratuit",
    icon: "team",
    tools: [
      { src: "/images/logos/chatgpt.svg", label: "ChatGPT" },
      { src: "/images/logos/claude.svg", label: "Claude" },
      { src: "/images/logos/gemini.svg", label: "Gemini" },
      { src: "/images/logos/mistral.svg", label: "Mistral" },
      { src: "/images/logos/copilot.svg", label: "Copilot" },
      { src: "/images/logos/make.svg", label: "Make" },
    ],
    toolFilter: "brightness(0) invert(1)",
    card: "border-[#1f3a34] bg-[#1f3a34]",
    text: "text-[#f5f0e6]",
    sub: "text-[#f5f0e6]/60",
    check: "text-[#8fc7b4]",
    button: "bg-[#f5f0e6] text-[#1f3a34] hover:bg-[var(--accent)] hover:text-[#1a1714]",
  },
];

function PackIcon({ name, className }: { name: Pack["icon"]; className: string }) {
  const paths: Record<Pack["icon"], React.ReactNode> = {
    spark: (
      <path d="M12 2l1.9 5.8a2 2 0 0 0 1.3 1.3L21 11l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 20l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 11l5.8-1.9a2 2 0 0 0 1.3-1.3L12 2z" />
    ),
    infinity: (
      <path d="M6 16c-2.2 0-4-1.8-4-4s1.8-4 4-4c3.5 0 8.5 8 12 8 2.2 0 4-1.8 4-4s-1.8-4-4-4c-3.5 0-8.5 8-12 8z" />
    ),
    team: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

export function FormationLadder() {
  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <p className="t-eyebrow">Se former</p>
        <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
          Commencez gratuit. Montez à votre rythme.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/85">
          Trois façons d&apos;apprendre l&apos;IA avec nous, du premier essai
          gratuit à la formation de toute votre équipe.
        </p>

        <ol className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3">
          {PACKS.map((p, i) => (
            <motion.li
              key={p.step}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-sm border p-8 transition-transform duration-300 hover:-translate-y-1.5 md:p-9 ${p.card}`}
              >
                {/* Badge essai gratuit */}
                {p.badge && (
                  <span className="absolute right-0 top-0 bg-[var(--ink)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                    {p.badge}
                  </span>
                )}

                {/* Picto + numéro */}
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                      p.step === "01" ? "border-[#1a1714]/25" : "border-current/25"
                    } ${p.text}`}
                  >
                    <PackIcon name={p.icon} className="h-6 w-6" />
                  </span>
                  <span className={`font-mono text-[11px] uppercase tracking-[0.28em] ${p.sub}`}>
                    {p.step}
                  </span>
                </div>

                <h3 className={`t-display mt-6 text-[26px] leading-tight ${p.text}`}>
                  {p.title}
                </h3>

                {/* Prix, avec barré éventuel */}
                <p className={`t-display mt-4 flex items-baseline gap-3 text-5xl ${p.text}`}>
                  {p.strike && (
                    <span className={`text-2xl line-through decoration-2 ${p.sub}`}>
                      {p.strike}
                    </span>
                  )}
                  {p.price}
                </p>
                <p className={`mt-2 font-mono text-[10px] uppercase tracking-[0.16em] ${p.sub}`}>
                  {p.unit}
                </p>

                <p className={`mt-5 text-[15px] leading-relaxed ${p.text} opacity-90`}>
                  {p.body}
                </p>

                {/* Ce que ça comprend */}
                <ul className="mt-6 space-y-2.5">
                  {p.bullets.map((b) => (
                    <li key={b} className={`flex items-start gap-3 text-sm leading-relaxed ${p.text}`}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={`mt-[3px] h-4 w-4 shrink-0 ${p.check}`}
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="opacity-90">{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Outils couverts : logos monochromes */}
                <ul
                  aria-label="Outils couverts"
                  className={`mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-5 ${
                    p.step === "01" ? "border-[#1a1714]/15" : "border-[#f5f0e6]/15"
                  }`}
                >
                  {p.tools.map((tool) => (
                    <li
                      key={tool.src}
                      title={tool.label}
                      className="flex h-5 items-center opacity-55 transition-opacity duration-300 hover:opacity-100"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tool.src}
                        alt={tool.label}
                        loading="lazy"
                        className="h-5 w-auto"
                        style={{ filter: p.toolFilter }}
                      />
                    </li>
                  ))}
                </ul>

                {/* CTA puissant, aligné en pied de carte */}
                <div className="mt-auto pt-8">
                  <Link
                    href={p.href}
                    className={`inline-flex w-full items-center justify-center gap-3 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${p.button}`}
                  >
                    {p.cta}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/60">
          Pas encore prêt ? <Link href="/formations/quiz" className="border-b border-[var(--fg-2)]/40 pb-0.5 text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">Testez votre niveau avec le QCM gratuit</Link>, sans compte ni carte.
        </p>
      </div>
    </section>
  );
}
