import Link from "next/link";

/**
 * Échelle de formation sur la home : 4 marches cliquables, du gratuit
 * à l'entreprise. Le prix d'appel (abonnement 29 EUR/mois) est mis en
 * avant en carte sombre. Copie FR (même convention qu'AudienceFork).
 */

const STEPS = [
  {
    step: "01",
    title: "Commencez gratuit",
    price: "0 €",
    unit: "sans carte bancaire",
    body: "Testez votre niveau avec les QCM, puis suivez le Module 0 complet. Créez votre compte en une minute.",
    href: "/formations/quiz",
    cta: "Faire le QCM gratuit",
    featured: false,
  },
  {
    step: "02",
    title: "Abonnement",
    price: "29 €",
    unit: "/ mois · sans engagement",
    body: "Tout le catalogue de cours, les QCM, la bibliothèque de prompts et chaque nouveauté. Annulable en un clic.",
    href: "/formations/tarifs",
    cta: "S'abonner",
    featured: true,
  },
  {
    step: "03",
    title: "Cours à vie",
    price: "dès 97 €",
    unit: "paiement unique",
    body: "Un cours complet, à vous pour toujours, mises à jour incluses. Maîtriser ChatGPT & Claude, ou les Workflows IA.",
    href: "/formations/tarifs",
    cta: "Voir les cours",
    featured: false,
  },
  {
    step: "04",
    title: "Équipes & entreprises",
    price: "dès 900 €",
    unit: "formation intra · agents · AI Act",
    body: "Formations sur vos cas réels, déploiement d'agents IA, conformité et supervision continue. Audit gratuit de 30 minutes.",
    href: "/ia",
    cta: "Découvrir IA Pro",
    featured: false,
  },
];

export function FormationLadder() {
  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <p className="t-eyebrow">Se former</p>
        <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
          Commencez gratuit. Montez à votre rythme.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/85">
          Quatre marches, du premier QCM à la formation de toute votre équipe.
          Vous vous arrêtez où vous voulez.
        </p>

        <ol className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.step} className="h-full">
              <Link
                href={s.href}
                className={`group flex h-full flex-col rounded-sm border p-8 transition-all duration-300 hover:-translate-y-1 ${
                  s.featured
                    ? "border-[var(--accent)] bg-[#1a1714] text-[#f5f0e6] shadow-[0_28px_60px_-28px_rgba(26,23,20,0.45)]"
                    : "border-[var(--rule)] bg-[var(--bg-2)] hover:border-[var(--accent)]"
                }`}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
                  {s.step}
                  {s.featured ? " · Le plus choisi" : ""}
                </p>
                <h3
                  className={`t-display mt-4 text-2xl ${
                    s.featured ? "text-[#f5f0e6]" : "text-[var(--fg)]"
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`t-display mt-5 text-4xl ${
                    s.featured ? "text-[var(--accent)]" : "text-[var(--fg)]"
                  }`}
                >
                  {s.price}
                </p>
                <p
                  className={`mt-1 font-mono text-[10px] uppercase tracking-[0.16em] ${
                    s.featured ? "text-[#f5f0e6]/60" : "text-[var(--fg-2)]/65"
                  }`}
                >
                  {s.unit}
                </p>
                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    s.featured ? "text-[#f5f0e6]/80" : "text-[var(--fg-2)]"
                  }`}
                >
                  {s.body}
                </p>
                <span
                  className={`mt-auto inline-flex items-center gap-2 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] ${
                    s.featured
                      ? "text-[var(--accent)]"
                      : "text-[var(--fg)] group-hover:text-[var(--accent)]"
                  }`}
                >
                  {s.cta}
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
