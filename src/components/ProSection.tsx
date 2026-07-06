import Link from "next/link";

const CAL_URL = "https://cal.com/troiestudio/30min";

const HIGHLIGHTS = [
  { stat: "+40 à 60 %", label: "de contenu, pour les agences" },
  { stat: "-60 %", label: "de qualification, en immobilier" },
  { stat: "+30 %", label: "de CA, pour les indépendants" },
];

/**
 * Section Professionnels sur la home : le pitch pro + 3 chiffres par métier,
 * renvoie vers /ia (la grille complète). Orange Hermès pour le contraste.
 */
export function ProSection({ locale }: { locale: string }) {
  return (
    <section className="tone-accent border-t border-[var(--rule)] bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-20">
          {/* Texte */}
          <div className="md:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
              Professionnels &amp; équipes
            </p>
            <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              L&apos;IA, concrète, pour votre métier.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              On connecte l&apos;IA à vos vrais outils (MCP) : calendrier
              éditorial, SEO, SEA, automatisation. Des workflows qui tournent,
              pas de la théorie. En présentiel ou à distance.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/ia"
                className="group inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#f5f0e6] transition-colors hover:bg-[#f5f0e6] hover:text-[#1a1714]"
              >
                Découvrir par métier
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </Link>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--bg)] hover:text-[var(--bg)]"
              >
                Audit gratuit 30 min
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Chiffres */}
          <div className="md:col-span-5 md:col-start-8">
            <ul className="divide-y divide-[var(--rule-strong)] border-y border-[var(--rule-strong)]">
              {HIGHLIGHTS.map((h) => (
                <li key={h.label} className="flex items-baseline justify-between gap-6 py-6">
                  <span className="t-display text-3xl text-[var(--fg)] md:text-4xl">
                    {h.stat}
                  </span>
                  <span className="text-right font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80">
                    {h.label}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
              E-commerce, artisans, professions libérales... 6 métiers sur /ia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
