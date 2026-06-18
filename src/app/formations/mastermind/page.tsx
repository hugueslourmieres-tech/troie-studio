import Link from "next/link";
import { EmblemBreak } from "@/components/EmblemBreak";
import { FormationsFooter } from "@/components/FormationsFooter";

const MAIN_SITE = "https://troiestudio.fr";
const CAL_URL = "https://cal.com/hugueslourmieres";
const SUBSCRIBE_MONTHLY = "mailto:contact@troiestudio.fr?subject=Mastermind+TROIE+%E2%80%94+Mensuel+49";
const SUBSCRIBE_ANNUAL = "mailto:contact@troiestudio.fr?subject=Mastermind+TROIE+%E2%80%94+Annuel+490";

export const metadata = {
  title: "Mastermind TROIE · L'abo qui garde votre stack IA à jour, TROIE",
  description:
    "49 €/mois ou 490 €/an. Cours 01 + Cours 02 inclus. Nouveaux prompts mensuels, office hours live, communaute Discord. Restez top tier.",
  alternates: {
    canonical: "https://troiestudio.fr/formations/mastermind",
  },
};

const RYTHMES = [
  {
    title: "Chaque semaine",
    body: "10 nouveaux prompts métier ajoutés à la bibliothèque (selon votre vertical : marketing, ops, sales, content).",
  },
  {
    title: "Chaque mois",
    body: "Office hours live 1 h. Demos, refonte de cas, Q&A. Replays disponibles à tout moment.",
  },
  {
    title: "A chaque release",
    body: "Mises à jour des supports cours 24 h après un nouveau modèle (GPT 6, Claude Opus 5, Gemini 3.5...).",
  },
  {
    title: "En continu",
    body: "Discord prive actif : entraide, partagé de workflows, retours d'expérience réel.",
  },
];

const INCLUDED = [
  {
    title: "Cours 01 · Maîtriser ChatGPT & Claude",
    body: "97 € inclus. 4 modules + 25 prompts livres. Accès à vie.",
  },
  {
    title: "Cours 02 · Workflows IA solo & équipe",
    body: "297 € inclus. 7 modules + 100 prompts + 10 templates + 3 agents. Accès à vie.",
  },
  {
    title: "Bibliothèque vivante de prompts",
    body: "500+ prompts métier maintenus à jour. Tag par cas d'usage, par outil, par vertical.",
  },
  {
    title: "Veille IA mensuelle",
    body: "1 brief synthèse par mois : releases majeures, nouveaux MCPs, évolutions tarifaires, ce qui marché réellement.",
  },
  {
    title: "Office hours live",
    body: "1 fois par mois, 1 h. On regarde vos cas concrets. Vous prenez le micro, on resout en live.",
  },
  {
    title: "Discord prive",
    body: "Communaute de pros : freelances, équipes, marques. Entraide, partagé, jobs board.",
  },
];

const FAQ = [
  {
    q: "Quel est l'avantage du Mastermind vs acheter les cours separes ?",
    a: "Vous économisez déjà 97 + 297 = 394 € avec le cumul des deux cours (vs 588 € si pris à l'unité). Le plus important : vous restez aligné sur la meta du moment. L'IA bouge vite, un cours acheté il y a 6 mois peut être dépassé sur certains outils. Le Mastermind garantit que votre stack reste pertinente.",
  },
  {
    q: "Puis-je annuler quand je veux ?",
    a: "Oui, en 1 clic dans votre espace membre. L'abonnement mensuel s'arrete à la fin du mois en cours, pas de prelevement supplementaire. L'annuel : remboursement au prorata des mois non consommes pendant les 30 premiers jours.",
  },
  {
    q: "Mensuel ou annuel : que choisir ?",
    a: "Si vous testez : mensuel. Si vous êtes déjà convaincu et voulez optimiser : annuel (2 mois offerts, 490 € soit 41 €/mois equivalent). Vous pouvez switcher du mensuel à l'annuel à tout moment.",
  },
  {
    q: "Pour qui n'est-ce PAS fait ?",
    a: "Pour quelqu'un qui veut juste un cours one-shot sans suivi : achetez Cours 01 ou 02 à l'unité. Pour quelqu'un qui veut une formation certifiante CPF : pas encore (Qualiopi en cours). Pour quelqu'un qui veut du coaching individuel : voir l'audit gratuit + accompagnement TROIE IA Pro.",
  },
  {
    q: "Combien êtes-vous à l'inscription ?",
    a: "Petite communaute volontairement limitee a 100 membres actifs pour garder la qualité des office hours et l'attention sur chaque cas. Si plein : liste d'attente avec accès au cours 01 inclus en attendant.",
  },
];

export default function MastermindPage() {
  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* Global FormationsHeader rendered via layout */}
      {/* HERO */}
      <section className="relative border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-24 md:px-12 md:pt-32 md:pb-32">
          <div className="grid gap-16 md:grid-cols-12 md:gap-12 lg:gap-20">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Mastermind · abo mensuel · communaute limitee
              </p>
              <h1 className="t-display mt-8 text-5xl text-[var(--fg)] md:text-6xl lg:text-[80px]">
                L'abo qui garde{" "}
                <span className="text-[var(--accent)]">votre stack à jour.</span>
              </h1>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/90 md:text-lg">
                <strong className="text-[var(--fg)]">L'IA change vite. Vous restez top tier.</strong>{" "}
                Les 2 cours inclus, nouveaux prompts chaque mois, office hours live, Discord prive.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={SUBSCRIBE_MONTHLY}
                  className="group inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
                >
                  Rejoindre · 49 € / mois
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href={SUBSCRIBE_ANNUAL}
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:text-[var(--fg)]"
                >
                  Annuel 490 € (2 mois offerts) →
                </a>
              </div>
            </div>

            {/* Pricing card sticky-like */}
            <div className="md:col-span-5 md:pt-8">
              <div className="rounded-sm border border-[var(--accent)] bg-[var(--accent)] p-6 text-[#1a1714] md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#1a1714]/80">
                  Inclus dans l'abo
                </p>
                <h2 className="t-display mt-4 text-4xl md:text-5xl">
                  49 € / mois
                </h2>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1a1714]/70">
                  ou 490 € / an · 2 mois offerts
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Cours 01 (97 €) inclus",
                    "Cours 02 (297 €) inclus",
                    "Bibliothèque 500+ prompts vivante",
                    "Office hours 1x / mois live",
                    "Discord prive (100 membres max)",
                    "Veille IA mensuelle",
                  ].map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[#1a1714]/85"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[10px] inline-block h-[3px] w-3 flex-shrink-0 bg-[#1a1714]"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={SUBSCRIBE_MONTHLY}
                  className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-[#1a1714] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:bg-[#f5f0e6] hover:text-[#1a1714]"
                >
                  Rejoindre · 49 € / mois
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-[#1a1714]/70">
                  Annulez en 1 clic, sans engagement
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* RYTHMES */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Comment ça marché
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Un rythme calibre pour rester en avancé.
          </h2>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-20 md:grid-cols-2 lg:grid-cols-4">
            {RYTHMES.map((r, i) => (
              <div key={r.title} className="bg-[var(--bg)] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-3xl">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-[15px]">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* INCLUDED */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Tout ce qui est inclus
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            394 € de cours offerts, et la suite à vie.
          </h2>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Si vous comptiez acheter Cours 01 + Cours 02 à l'unité (394 €), l'abonnement est rentable des le mois 1. Et après, c'est tout le reste qui compte.
          </p>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-20 md:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((d, i) => (
              <div key={d.title} className="bg-[var(--bg)] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-[28px]">
                  {d.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-[15px]">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* FAQ */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Questions
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Ce qu'on nous demandé avant de s'abonner.
          </h2>

          <div className="mt-16 space-y-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-20">
            {FAQ.map((f, i) => (
              <details key={f.q} className="group bg-[var(--bg)]" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 p-6 md:p-8">
                  <h3 className="t-display text-xl text-[var(--fg)] md:text-2xl">
                    {f.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-2 font-mono text-[14px] text-[var(--accent)] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-8 md:px-8">
                  <p className="text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                    {f.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="tone-accent border-t border-[var(--rule)] bg-[var(--bg)] text-[var(--fg)]">
        <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
          <div className="grid gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--fg)]/80">
                Prêt a rejoindre la guilde ?
              </p>
              <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-7xl">
                49 € / mois. Annulez quand vous voulez.
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg)]/85 md:text-lg">
                Communaute volontairement limitee a 100 membres actifs. Vos cas trouvent une vraie réponse en live, pas un thread perdu.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={SUBSCRIBE_MONTHLY}
                  className="group inline-flex items-center gap-3 bg-[#1a1714] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:bg-[#f5f0e6] hover:text-[#1a1714]"
                >
                  Rejoindre · 49 € / mois
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href={SUBSCRIBE_ANNUAL}
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:text-[var(--bg)]"
                >
                  Annuel 490 € (2 mois offerts) →
                </a>
              </div>
            </div>
            <div className="md:col-span-4 md:border-l md:border-[var(--fg)]/20 md:pl-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)]/70">
                Vous hésitez ?
              </p>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="t-display mt-3 block text-2xl text-[var(--fg)] hover:text-[var(--bg)] md:text-3xl"
              >
                30 min en visio →
              </a>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg)]/75">
                Gratuit. On voit si l'abo vaut le coup pour vous, ou s'il vaut mieux 1 cours à l'unité.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FormationsFooter />
    </article>
  );
}
