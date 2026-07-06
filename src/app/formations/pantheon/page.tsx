import Link from "next/link";
import type { Metadata } from "next";
import { HOUSES, type HouseSlug } from "@/lib/pantheon";

const CAL_URL = "https://cal.com/troiestudio/30min";
const ORDER: HouseSlug[] = ["hermes", "athena", "achille", "hestia"];

export const metadata: Metadata = {
  title: "Le Panthéon TROIE : les 4 maisons, ce qu'elles font, comment ça marche",
  description:
    "Hermès, Athéna, Achille, Hestia : quatre façons de mettre l'IA au travail. Ce que chaque maison fait au quotidien, les outils connectés, les chiffres, et le modèle gratuit pour commencer.",
  alternates: { canonical: "https://troiestudio.fr/formations/pantheon" },
  openGraph: {
    type: "website",
    url: "https://troiestudio.fr/formations/pantheon",
    title: "Le Panthéon TROIE : quatre maisons, un seul Olympe",
    description:
      "Ce que chaque maison fait au quotidien avec l'IA, les outils connectés, les chiffres, et comment commencer gratuitement.",
  },
};

/* Chiffres deja publies et sources ailleurs sur le site (voir /ia,
   section STATS : etudes marketing solopreneurs 2026, Nielsen Norman
   Group, AgencyAnalytics, Datagrid). Repris ici tels quels. */
const GLOBAL_STATS = [
  { value: "× 2", label: "Impact par collaborateur sur les tâches automatisables" },
  { value: "+60 %", label: "De capacité équipe sans recruter un seul poste" },
  { value: "21 h", label: "Libérées par semaine, par poste" },
  { value: "-70 %", label: "Sur le temps de production des créatifs" },
];

export default function PantheonOverviewPage() {
  return (
    <div className="bg-[var(--bg)] pt-28 md:pt-36">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Le Panthéon
        </p>
        <h1 className="t-display mt-6 max-w-4xl text-4xl leading-[1.05] text-[var(--fg)] md:text-7xl">
          Quatre maisons. Un seul Olympe.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)] md:text-xl">
          Le Panthéon n&apos;est pas un cours de plus. C&apos;est une
          identité : celle que le test vous révèle selon votre usage réel de
          l&apos;IA. Le test est gratuit. Votre maison est gratuite. Ses
          premiers pouvoirs aussi.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/formations/pantheon/test"
            className="group inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1714]"
          >
            Faire le test · gratuit
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </Link>
          <a
            href="#maisons"
            className="border-b border-[var(--fg)] pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Découvrir les 4 maisons
          </a>
        </div>
      </section>

      {/* Chiffres, toutes maisons confondues */}
      <section className="border-t border-[var(--rule)] bg-[var(--ink)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
            Ce que l&apos;Olympe permet, toutes maisons confondues
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {GLOBAL_STATS.map((s) => (
              <div key={s.label}>
                <p className="t-display text-4xl text-[var(--accent)] md:text-5xl">{s.value}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#f5f0e6]/80">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 font-mono text-[9px] uppercase tracking-[0.18em] text-[#f5f0e6]/45">
            Études marketing solopreneurs 2026 (Mirra, AgentMinds, Enrich Labs) ·
            Nielsen Norman Group · AgencyAnalytics 2026
          </p>
        </div>
      </section>

      {/* Les 4 maisons, en detail */}
      <div id="maisons">
        {ORDER.map((slug, i) => {
          const h = HOUSES[slug];
          const alt = i % 2 === 1;
          return (
            <section
              key={slug}
              id={slug}
              className={`scroll-mt-24 border-t border-[var(--rule)] ${alt ? "bg-[var(--bg-2)]" : "bg-[var(--bg)]"}`}
            >
              <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
                <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:gap-14 md:text-left">
                  {/* Blason retiré en attendant une version propre */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
                      <span
                        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em]"
                        style={{ backgroundColor: h.bg, color: h.fg }}
                      >
                        ✦ Maison {h.name}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                        {h.godOf}
                      </span>
                    </div>

                    <h2 className="t-display mt-6 max-w-2xl text-4xl text-[var(--fg)] md:text-6xl">
                      {h.name}.
                    </h2>
                    <p className="mt-3 t-display text-xl italic md:text-2xl" style={{ color: h.bg }}>
                      « {h.motto} »
                    </p>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                      {h.description}
                    </p>
                  </div>
                </div>

                {/* Ce que la maison fait au quotidien : 3 taches, chiffres + visuels */}
                <p className="mt-14 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
                  Ce qu&apos;elle fait au quotidien
                </p>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  {h.tasks.map((t) => (
                    <div
                      key={t.title}
                      className="overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--bg)]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#1a0f08]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={t.image}
                          alt=""
                          aria-hidden="true"
                          className="h-full w-full object-cover"
                          style={{ filter: "grayscale(1) contrast(1.05) brightness(0.95)" }}
                          loading="lazy"
                        />
                        <span
                          className="absolute left-3 top-3 rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em]"
                          style={{ backgroundColor: h.bg, color: h.fg }}
                        >
                          {t.time}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="t-display text-lg text-[var(--fg)]">{t.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]">
                          {t.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Outils connectes (MCP) */}
                <p className="mt-14 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
                  Les outils connectés
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                  Vos agents IA parlent directement à ces outils via MCP
                  (Model Context Protocol) : ils écrivent dans votre CRM,
                  programment le prochain post ou classent un ticket, sans
                  copier-coller.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
                  {h.tools.map((tool) => (
                    <span key={tool.label} className="flex items-center gap-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tool.src}
                        alt=""
                        aria-hidden="true"
                        className="h-6 w-6 object-contain opacity-80"
                        style={{ filter: "grayscale(1)" }}
                        loading="lazy"
                      />
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg-2)]/80">
                        {tool.label}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link
                    href="/formations/pantheon/test"
                    className="group inline-flex items-center gap-3 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors"
                    style={{ backgroundColor: h.bg, color: h.fg }}
                  >
                    Rejoindre la maison {h.name}
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Le modele : gratuit pour decouvrir, un choix pour aller plus loin */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Comment ça marche
          </p>
          <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
            Gratuit pour découvrir. Un choix pour aller plus loin.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Le test, gratuit",
                body: "5 questions. Votre maison est révélée, votre sésame arrive par email. Aucune carte bancaire.",
              },
              {
                step: "02",
                title: "Votre montée en puissance, libre",
                body: "Vous progressez dans votre maison : parcours, trophées, XP, bibliothèque de prompts. À votre rythme.",
              },
              {
                step: "03",
                title: "Aller jusqu'au bout",
                body: "Pour déployer un agent en production ou former toute une équipe : une formation complète, ou un audit gratuit de 30 minutes pour les entreprises.",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-sm border border-[var(--rule)] bg-[var(--bg)] p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">{s.step}</p>
                <h3 className="t-display mt-4 text-xl text-[var(--fg)] md:text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)]">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/formations/pantheon/test"
              className="group inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1714]"
            >
              Faire le test du Panthéon
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
            >
              Ou parlons de votre entreprise : audit gratuit →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
