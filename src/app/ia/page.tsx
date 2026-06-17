import Link from "next/link";

const MAIN_SITE = "https://troiestudio.fr";
const CAL_URL = "https://cal.com/hugueslourmieres";

const STATS = [
  { value: "200+", label: "Professionnels formes" },
  { value: "30 jours", label: "Premier agent en production" },
  { value: "60 %", label: "De temps libere pour vos equipes" },
];

const OFFERS = [
  {
    eyebrow: "01 · Formations",
    title: "Trois packs courts, livrables en main.",
    body: "Decouverte, Pratique, Agents. Une demi-journee a deux jours, intra ou inter. Vous repartez avec une bibliotheque de prompts, un workflow documente, un agent deploye selon le pack.",
    bullets: [
      "Decouverte — Fondamentaux IA (1/2 journee)",
      "Pratique — Production & creation IA (1 journee)",
      "Agents — Automatisation & deploiement (2 journees)",
    ],
    cta: { label: "Voir les formations", href: `${MAIN_SITE}/fr/formations` },
  },
  {
    eyebrow: "02 · Agents IA",
    title: "Trois agents qui prennent la charge.",
    body: "Hermes prospecte et qualifie. Achille produit vos contenus. Hestia veille sur vos clients 24/7. Setup cle en main, supervision humaine 30 jours, sortie propre garantie.",
    bullets: [
      "Hermes — Prospection & rendez-vous pris",
      "Achille — Contenus, social, image IA",
      "Hestia — Service client 24/7 multilingue",
    ],
    cta: { label: "Voir les agents", href: `${MAIN_SITE}/fr/agents` },
  },
  {
    eyebrow: "03 · Audit",
    title: "Trente minutes pour vous dire si l'IA est rentable chez vous.",
    body: "Sans engagement. Une reponse claire, chiffree, ecrite, sous 48 h apres l'echange. Y compris si la reponse est non.",
    bullets: [
      "Audit de vos cas d'usage actuels",
      "Estimation de gain de temps et de cout",
      "Feuille de route 90 jours si pertinente",
    ],
    cta: { label: "Reserver l'audit", href: CAL_URL, external: true },
  },
];

const PILLARS = [
  {
    title: "Sortie propre, jamais de lock-in.",
    body: "Vos workflows Make / n8n, vos prompts, vos acces : tout reste chez vous a la fin du contrat. Vous pouvez continuer seul ou avec un autre prestataire.",
  },
  {
    title: "Donnees en UE par defaut.",
    body: "Tous les agents tournent sur des modeles hebergees Europe (Mistral, Claude region UE) ou via passerelle a garanties contractuelles. Variante 100 % souveraine sur demande.",
  },
  {
    title: "Supervision humaine 30 jours.",
    body: "Pas de mise en service en aveugle. Un humain TROIE valide les premieres semaines, ajuste les garde-fous, transfere la main quand tout tourne.",
  },
];

const FAQ = [
  {
    q: "Combien de temps avant que ca serve vraiment ?",
    a: "Hermes : 30 jours pour les premiers RDV qualifies. Achille : 14 jours pour les premiers contenus publies. Hestia : 21 jours pour passer 60 % des tickets en mode autonome. Formations : votre equipe est operationnelle des le soir meme.",
  },
  {
    q: "C'est pris en charge par les OPCO ?",
    a: "Pas encore en direct chez TROIE — nous travaillons en partenariat avec un organisme certifie Qualiopi pour les sessions intra. Sur devis, nous indiquons le format eligible et le partenaire OF.",
  },
  {
    q: "Combien ca coute ?",
    a: "Setup + abonnement mensuel pour les agents, prix par jour pour les formations. Tarif final calibre apres l'audit gratuit, en fonction de vos volumes et de votre stack. Aucun engagement avant accord ecrit.",
  },
  {
    q: "Un agent peut-il remplacer mon equipe ?",
    a: "Non. Un agent prend la charge repetitive et mesurable. Il libere votre equipe pour ce qui demande du jugement, de la relation, de la creation. Cote TROIE, ca reste a taille humaine.",
  },
];

export default function IaLandingPage() {
  return (
    <article className="min-h-screen bg-[var(--bg)]">
      {/* Top bar — minimal, sub-brand explicite */}
      <header className="border-b border-[var(--rule)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12">
          <div className="flex items-baseline gap-3">
            <span className="t-display text-xl text-[var(--fg)] md:text-2xl">
              TROIE
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)] md:text-[11px]">
              · IA Pro
            </span>
          </div>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 border-b border-[var(--fg)] pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:text-[11px]"
          >
            Audit gratuit
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-20 md:px-12 md:pt-40 md:pb-32">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            L'atelier qui forme et deploie l'IA
          </p>
          <h1 className="t-display mt-8 max-w-4xl text-5xl text-[var(--fg)] md:text-7xl lg:text-[88px]">
            L'IA operationnelle.
            <br />
            Pour vos equipes.
          </h1>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)]/85 md:text-lg">
            Formations courtes livrables en main. Agents IA cles en main,
            supervises 30 jours. Audit gratuit avant tout engagement. Pour les
            entreprises qui veulent gagner du temps sans degrader le niveau de
            service.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Reserver 30 min d'audit
              <span
                aria-hidden="true"
                className="transition group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <Link
              href={`${MAIN_SITE}/fr/formations`}
              className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 transition-colors hover:text-[var(--accent)]"
            >
              Voir les formations →
            </Link>
            <Link
              href={`${MAIN_SITE}/fr/agents`}
              className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 transition-colors hover:text-[var(--accent)]"
            >
              Voir les agents →
            </Link>
          </div>
        </div>
      </section>

      {/* Stat band */}
      <section className="border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
          <ul className="grid gap-10 md:grid-cols-3 md:gap-16">
            {STATS.map((s) => (
              <li key={s.label} className="flex flex-col">
                <span className="t-display text-4xl text-[var(--fg)] md:text-5xl">
                  {s.value}
                </span>
                <span className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 offerings */}
      <section className="border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Trois portes d'entree
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Selon ou vous en etes.
          </h2>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-20 md:grid-cols-3">
            {OFFERS.map((o) => (
              <div
                key={o.eyebrow}
                className="flex h-full flex-col bg-[var(--bg)] p-8 md:p-10"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {o.eyebrow}
                </p>
                <h3 className="t-display mt-6 text-3xl text-[var(--fg)] md:text-4xl">
                  {o.title}
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                  {o.body}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {o.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-[15px]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[10px] inline-block h-[3px] w-3 flex-shrink-0 bg-[var(--accent)]"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex-1" />
                {o.cta.external ? (
                  <a
                    href={o.cta.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-10 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {o.cta.label}
                    <span
                      aria-hidden="true"
                      className="transition group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                ) : (
                  <Link
                    href={o.cta.href}
                    className="group mt-10 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {o.cta.label}
                    <span
                      aria-hidden="true"
                      className="transition group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Trois engagements
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl">
            Ce qui change avec TROIE.
          </h2>
          <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-16">
            {PILLARS.map((p) => (
              <div key={p.title} className="border-t border-[var(--rule)] pt-6">
                <h3 className="t-display text-2xl text-[var(--fg)] md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Questions frequentes
              </p>
              <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-5xl">
                Vous nous demandez souvent.
              </h2>
            </div>
            <div className="md:col-span-7">
              <ul className="space-y-2 border-t border-[var(--rule)]">
                {FAQ.map((item) => (
                  <li key={item.q} className="border-b border-[var(--rule)]">
                    <details className="group py-5">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:text-[var(--accent)]">
                        <span>{item.q}</span>
                        <span
                          aria-hidden="true"
                          className="font-sans text-base text-[var(--fg-2)] transition-transform duration-300 group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                        {item.a}
                      </p>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA — full orange Hermes */}
      <section className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
          <div className="grid gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-7">
              <h2 className="t-display text-4xl text-[var(--fg)] md:text-6xl">
                Trente minutes pour parler de votre cas.
              </h2>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/85 md:text-lg">
                Sans engagement. On regarde ensemble si l'IA est rentable chez
                vous, on chiffre, on ecrit. Y compris si la reponse est non.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Reserver l'audit
                  <span
                    aria-hidden="true"
                    className="transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
                <a
                  href="mailto:contact@troiestudio.fr"
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 transition-colors hover:text-[var(--fg)]"
                >
                  contact@troiestudio.fr →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer — minimal, retour vers studio creatif */}
      <footer>
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-14">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <div className="flex items-baseline gap-3">
              <span className="t-display text-lg text-[var(--fg)]">TROIE</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                · IA Pro
              </span>
            </div>
            <a
              href={MAIN_SITE}
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70 transition-colors hover:text-[var(--accent)] md:text-[11px]"
            >
              Studio creatif → troiestudio.fr
              <span
                aria-hidden="true"
                className="transition group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
            © 2026 TROIE Studio · Atelier digital
          </p>
        </div>
      </footer>
    </article>
  );
}
