import Link from "next/link";
import { EmblemBreak } from "@/components/EmblemBreak";
import { FormationsFooter } from "@/components/FormationsFooter";
import { JsonLd, ORG_ID } from "@/components/JsonLd";

const COURSE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://troiestudio.fr/formations/cours-01#course",
  name: "Cours 01 · Maîtriser ChatGPT & Claude",
  description:
    "4 modules, 90 minutes de vidéo, 25 prompts livrés, accès à vie. Équipez votre premier héros IA en une soirée.",
  url: "https://troiestudio.fr/formations/cours-01",
  inLanguage: "fr",
  provider: { "@id": ORG_ID },
  educationalLevel: "Débutant",
  timeRequired: "PT90M",
  offers: {
    "@type": "Offer",
    price: "97",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: "https://troiestudio.fr/formations/cours-01",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    courseWorkload: "PT90M",
  },
};

const MAIN_SITE = "https://troiestudio.fr";
const CAL_URL = "https://cal.com/troiestudio/30min";
// TODO : remplacer par l'URL Lemon Squeezy / Stripe Checkout des activation
const CHECKOUT_URL = "mailto:contact@troiestudio.fr?subject=Cours+01+%E2%80%94+TROIE-START";

export const metadata = {
  title: "Cours 01 · Maîtriser ChatGPT & Claude, TROIE Formations",
  description:
    "4 modules · 90 min de vidéo · 25 prompts livrés · accès à vie. Équipez votre premier héros IA en 1 soirée. 97 €.",
  alternates: {
    canonical: "https://troiestudio.fr/formations/cours-01",
  },
};

const MODULES = [
  {
    badge: "Module 1",
    title: "Les 5 patterns de prompts qui marchent.",
    lecons: [
      "Pattern RTCF (Role · Task · Context · Format)",
      "Few-shot prompting : 2-5 exemples qui calent la sortie",
      "Chain-of-thought : raisonner avant de répondre",
      "Constraint prompting : forcer un format strict",
      "Critique then iterate : auto-correction en 2 passes",
    ],
    duree: "25 min · 8 démos pratiques",
  },
  {
    badge: "Module 2",
    title: "System prompts à coller dans GPTs et Projets Claude.",
    lecons: [
      "Anatomie d'un system prompt qui tient sur 100 messages",
      "Calquer votre voix avec 5-10 exemples bruts",
      "Sortie de secours : éliminer les hallucinations",
      "Résister aux prompt injections",
      "5 templates prêts à coller dans votre Custom GPT",
    ],
    duree: "30 min · 5 templates livrés",
  },
  {
    badge: "Module 3",
    title: "10 cas d'usage solo, du concret immédiat.",
    lecons: [
      "Triage email 30 min/jour > 3 min",
      "30 jours de posts LinkedIn dans votre voix",
      "Devis personnalisé en 30 secondes",
      "Veille concurrentielle automatique",
      "Transcription + résumé réunion en 2 min",
      "Pages de vente qui convertissent",
      "10 visuels on-brand par jour (Midjourney)",
      "Analyse CSV : 3 insights en 2 min",
      "Compta simplifiée mensuelle",
      "Traduction de site en 5 langues sans perdre la voix",
    ],
    duree: "25 min · 25 prompts bibliothèque",
  },
  {
    badge: "Module 4",
    title: "Limites, sécurité des données, RGPD.",
    lecons: [
      "Ce qu'on NE met JAMAIS dans un chat web",
      "API en zone EU et DPA signé",
      "Anonymisation PII avant envoi",
      "Quand redémarrer une conversation",
      "Calculer le ROI de votre stack au bout de 30 jours",
    ],
    duree: "10 min · checklist sécurité",
  },
];

const DELIVERABLES = [
  {
    title: "Bibliothèque de 25 prompts métier",
    body: "Email, posts, devis, prospection, veille, devis, brief créatif, analyse data. Prêts à coller, classés par tâche.",
  },
  {
    title: "5 templates System Prompts",
    body: "Pour Custom GPTs et Projets Claude : Assistant marketing, Triage email, Devis solo, Veille concurrence, Éditeur de contenu.",
  },
  {
    title: "Checklist sécurité RGPD",
    body: "Ce qu'on met, ce qu'on ne met pas, où héberger l'API, comment anonymiser. 1 page A4 référence.",
  },
  {
    title: "Accès à vie + mises à jour",
    body: "Vos modules restent dispos. Quand un modèle change (GPT 5.5, Claude Opus 5...), les contenus sont mis à jour gratuitement.",
  },
  {
    title: "30 questions QCM",
    body: "Après chaque module, un mini-quiz pour ancrer. Score visible, explications détaillées à chaque question.",
  },
  {
    title: "Communauté Discord (option)",
    body: "Accès 30 jours offerts à la communauté TROIE. Entraide, partage de prompts, retours d'expérience.",
  },
];

const FAQ = [
  {
    q: "Combien de temps pour finir le cours ?",
    a: "Compter 1 soirée pour le visionner intégralement (90 min de vidéo). Et 2-3 soirées supplémentaires pour configurer votre premier Custom GPT et tester les prompts sur vos vrais cas. Bilan typique : 1 semaine entre l'achat et un setup pro qui tourne.",
  },
  {
    q: "Pour quel niveau ?",
    a: "Si vous avez déjà utilisé ChatGPT ou Claude au moins une fois et que vous voulez passer du 'gadget cool' au 'outil pro qui me fait gagner 5h par semaine', c'est pour vous. Pas besoin de coder. Pas besoin de connaissance technique.",
  },
  {
    q: "Quels outils faut-il pour suivre ?",
    a: "Un compte ChatGPT (Plus à 20 €/mois recommandé pour les Custom GPTs) OU Claude.ai (Pro à 20 € recommandé pour les Projects). Le cours montre les deux. Pas besoin des deux pour démarrer.",
  },
  {
    q: "Si ça ne me convient pas ?",
    a: "Garantie 14 jours, sans question. Vous m'écrivez, je vous rembourse. C'est mon engagement éditorial : si le contenu ne tient pas sa promesse pour vous, vous ne payez pas.",
  },
  {
    q: "Et après ce cours ?",
    a: "Cours 02 (Workflows IA) est la suite logique : connecter le LLM à vos outils (MCPs), construire des agents qui tournent sans vous, automatiser des pipelines. Réductions cumulatives prévues si vous prenez les deux.",
  },
  {
    q: "Possibilité de financer via CPF / OPCO ?",
    a: "Pas encore : la certification Qualiopi est en cours. Pour les CPF / OPCO, regardez le Cours 04 sur place (sur devis) qui passe via TROIE Studio en tant qu'organisme partenaire. Possible dès juillet 2026.",
  },
];

export default function Cours01Page() {
  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <JsonLd data={COURSE_JSONLD} />
      {/* Global FormationsHeader rendered via layout */}
      {/* HERO */}
      <section className="relative border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-24 md:px-12 md:pt-32 md:pb-32">
          <div className="grid gap-16 md:grid-cols-12 md:gap-12 lg:gap-20">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Cours 01 · Entry · paiement unique · accès à vie
              </p>
              <h1 className="t-display mt-8 text-5xl text-[var(--fg)] md:text-6xl lg:text-[80px]">
                Maîtriser ChatGPT &{" "}
                <span className="text-[var(--accent)]">Claude.</span>
              </h1>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/90 md:text-lg">
                <strong className="text-[var(--fg)]">Équipez votre premier héros IA en 1 soirée.</strong>{" "}
                4 modules, 90 min de vidéo, 25 prompts livrés, 5 templates de
                system prompts. À la fin, vous passez de l'outil ponctuel à
                l'assistant pro qui sait votre métier.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={CHECKOUT_URL}
                  className="group inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
                >
                  Demander un devis
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <Link
                  href="/formations/module-0"
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 transition-colors hover:text-[var(--accent)]"
                >
                  Tester gratuit (Module 0) →
                </Link>
              </div>
            </div>

            {/* Résumé produit · sticky-like card */}
            <div className="md:col-span-5 md:pt-8">
              <div className="rounded-sm border border-[var(--fg)]/15 bg-[var(--bg-2)] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  Résumé
                </p>
                <h2 className="t-display mt-4 text-3xl text-[var(--fg)] md:text-4xl">
                  97 €
                </h2>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                  Paiement unique · accès à vie · garantie 14 j
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "4 modules · 90 min de vidéo",
                    "25 prompts métier livrés",
                    "5 templates System Prompts",
                    "30 questions QCM avec explications",
                    "Accès à vie + mises à jour",
                    "Communauté Discord (30 j offerts)",
                  ].map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[var(--fg-2)]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[10px] inline-block h-[3px] w-3 flex-shrink-0 bg-[var(--accent)]"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={CHECKOUT_URL}
                  className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-[var(--fg)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
                >
                  Demander un devis
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                  Garantie satisfait ou remboursé 14 jours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* AVANT / APRÈS, la transformation */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            La transformation
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            En 90 minutes, vous changez de niveau.
          </h2>

          <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
            <div className="rounded-sm border border-[var(--rule)] bg-[var(--bg)] p-8 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--fg-2)]/65">
                Avant · LV. 12
              </p>
              <h3 className="t-display mt-4 text-2xl text-[var(--fg)]/75 md:text-3xl">
                Vous copiez des prompts d'internet.
              </h3>
              <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-[var(--fg-2)]/85">
                <li>· Vous re-expliquez tout, à chaque fois.</li>
                <li>· Le ton n'est jamais le votre.</li>
                <li>· Vous corrigez plus que vous ne produisez.</li>
                <li>· Les hallucinations vous piègent.</li>
                <li>· Vous perdez 30 min à chaque tâche complexe.</li>
              </ul>
            </div>
            <div className="rounded-sm border border-[var(--accent)] bg-[#1a1714] p-8 text-[#f5f0e6] md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Après · LV. 76+
              </p>
              <h3 className="t-display mt-4 text-2xl md:text-3xl">
                Votre IA arrive déjà configurée.
              </h3>
              <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-[#f5f0e6]/85">
                <li>· Vos Custom GPTs / Projects ont VOTRE ton.</li>
                <li>· Vous savez quand utiliser quel pattern.</li>
                <li>· Sortie de secours : zéro hallucination subie.</li>
                <li>· Vous publiez en 5 min ce qui prenait 30 min.</li>
                <li>· Vos données restent sécurisées.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* MODULES DÉTAIL */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Le programme · 4 modules + bonus 0
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Vous apprenez ce qui marche en pratique.
          </h2>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Pas de théorie indigeste. Chaque module finit avec un
            livrable concret (prompt, template, workflow) que vous
            utilisez le soir même.
          </p>

          <div className="mt-16 space-y-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-20">
            {/* Module 0 gratuit en haut */}
            <div className="bg-[var(--bg)] p-8 md:p-10">
              <div className="grid gap-6 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                    Module 0 · Gratuit
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                    15 min · sans inscription
                  </p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="t-display text-2xl text-[var(--fg)] md:text-3xl">
                    Pourquoi un LLM hallucine et veut vous plaire.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-[15px]">
                    Théorie LLM : pre-training, RLHF, hallucinations, sycophancy. 4 leçons + QCM 10 questions. Score ≥ 7/10 : code promo -15 % sur ce cours.
                  </p>
                  <Link
                    href="/formations/module-0"
                    className="group mt-4 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:text-[var(--fg)]"
                  >
                    Lancer le Module 0
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Modules 1-4 */}
            {MODULES.map((m) => (
              <div key={m.badge} className="bg-[var(--bg)] p-8 md:p-10">
                <div className="grid gap-6 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                      {m.badge}
                    </p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                      {m.duree}
                    </p>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="t-display text-2xl text-[var(--fg)] md:text-3xl">
                      {m.title}
                    </h3>
                    <ul className="mt-5 space-y-2.5">
                      {m.lecons.map((l) => (
                        <li
                          key={l}
                          className="flex items-start gap-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-[15px]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[10px] inline-block h-[3px] w-3 flex-shrink-0 bg-[var(--accent)]"
                          />
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* DELIVERABLES, ce que vous recevez */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Ce que vous repartez avec
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Pas juste de la théorie. Du concret réutilisable.
          </h2>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-20 md:grid-cols-2 lg:grid-cols-3">
            {DELIVERABLES.map((d, i) => (
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
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Questions
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Tout ce qu'on nous demande avant d'acheter.
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
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--fg)]/80">
                Prêt à équiper votre héros ?
              </p>
              <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-7xl">
                97 €. Une soirée. Accès à vie.
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg)]/85 md:text-lg">
                Garantie satisfait ou remboursé 14 jours, sans question.
                Si le contenu ne tient pas sa promesse, vous m'écrivez
                et je vous rembourse le jour même.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={CHECKOUT_URL}
                  className="group inline-flex items-center gap-3 bg-[#1a1714] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:bg-[#f5f0e6] hover:text-[#1a1714]"
                >
                  Demander un devis
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <Link
                  href="/formations/module-0"
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:text-[var(--bg)]"
                >
                  Tester le Module 0 gratuit →
                </Link>
              </div>
            </div>
            <div className="md:col-span-5 md:border-l md:border-[var(--fg)]/20 md:pl-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)]/70">
                Encore pas sûr ?
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
                Gratuit. On regarde votre activité. Je vous dis honnêtement si Cours 01 est pour vous, ou si vous êtes déjà plus avancé et qu'il faut viser Cours 02.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FormationsFooter />
    </article>
  );
}
