import Link from "next/link";

const CAL_URL = "https://cal.com/troiestudio/30min";

type Metier = {
  name: string;
  stat: string;
  statLabel: string;
  use: string;
  icon: string;
};

/* Chiffres issus de données 2026 (Bpifrance, PwC, cas PME documentés). */
const METIERS: Metier[] = [
  {
    name: "Agences",
    stat: "+40 à 60 %",
    statLabel: "de contenu produit",
    use: "Calendrier éditorial, SEO client et reporting, automatisés.",
    icon: "m3 11 18-5v12L3 14v-3z M11.6 16.8a3 3 0 1 1-5.8-1.6",
  },
  {
    name: "E-commerce",
    stat: "jusqu'à 90 %",
    statLabel: "des tâches répétitives déléguées",
    use: "Fiches produits, SEO, annonces et analyse des avis.",
    icon: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0",
  },
  {
    name: "Immobilier",
    stat: "-60 %",
    statLabel: "de temps de qualification",
    use: "Annonces, estimation et scoring des leads.",
    icon: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
  {
    name: "Artisans & BTP",
    stat: "+25 %",
    statLabel: "de productivité",
    use: "Devis, factures et planning de chantiers.",
    icon: "M21.3 8.7 8.7 21.3a2.4 2.4 0 0 1-3.4 0l-2.6-2.6a2.4 2.4 0 0 1 0-3.4L15.3 2.7a2.4 2.4 0 0 1 3.4 0l2.6 2.6a2.4 2.4 0 0 1 0 3.4Z M7.5 10.5l2 2 M10.5 7.5l2 2 M13.5 4.5l2 2",
  },
  {
    name: "Indépendants",
    stat: "+30 %",
    statLabel: "de CA, sans recruter",
    use: "Admin, contenu, prospection : votre équipe d'agents IA.",
    icon: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8",
  },
  {
    name: "Professions libérales",
    stat: "+40 %",
    statLabel: "sur les tâches automatisables",
    use: "Analyse de documents, synthèses et veille.",
    icon: "M12 3v18 M5 7h14 M5 7l-3 7a4 4 0 0 0 6 0L5 7z M19 7l-3 7a4 4 0 0 0 6 0l-3-7z M8 21h8",
  },
];

/**
 * "Votre métier" : grille de métiers avec le chiffre en avant. On entre par
 * son métier, on voit le résultat concret. DA TROIE (cream, accent, pictos
 * ligne fine). Les fiches détaillées et les niveaux viendront ensuite.
 */
export function MetiersPro() {
  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
        <div className="md:max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Pour les pros, par métier
          </p>
          <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Des résultats concrets, pour votre métier.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            On connecte l&apos;IA à vos vrais outils (MCP) : calendrier éditorial,
            SEO, SEA, automatisation. Pas de théorie, des workflows qui tournent.
          </p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--rule)] md:mt-16 md:grid-cols-3">
          {METIERS.map((m) => (
            <li
              key={m.name}
              className="group flex flex-col bg-[var(--bg)] p-8 transition-colors hover:bg-[var(--bg-2)] md:p-10"
            >
              <div className="flex items-center justify-between">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--rule-strong)] text-[var(--accent)]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                    <path d={m.icon} />
                  </svg>
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--fg-2)]/55">
                  {m.name}
                </p>
              </div>

              <p className="t-display mt-8 text-4xl text-[var(--accent)] md:text-5xl">
                {m.stat}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                {m.statLabel}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-[var(--fg-2)]">
                {m.use}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1714]"
          >
            Réserver un audit de 30 min
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </a>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
            Votre métier n&apos;est pas listé ? On en parle.
          </span>
        </div>
      </div>
    </section>
  );
}
