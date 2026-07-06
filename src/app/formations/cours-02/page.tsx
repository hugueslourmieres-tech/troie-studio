import Link from "next/link";
import { BuyButton } from "@/components/BuyButton";
import { EmblemBreak } from "@/components/EmblemBreak";
import { FormationsFooter } from "@/components/FormationsFooter";
import { JsonLd, ORG_ID } from "@/components/JsonLd";

const COURSE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://troiestudio.fr/formations/cours-02#course",
  name: "Cours 02 · Workflows IA pour solo & équipe",
  description:
    "7 modules, 3 h de vidéo, 100 prompts, 10 templates Make, accès à vie. Connectez vos IA à vos outils et construisez des agents persistants.",
  url: "https://troiestudio.fr/formations/cours-02",
  inLanguage: "fr",
  provider: { "@id": ORG_ID },
  educationalLevel: "Intermédiaire",
  timeRequired: "PT3H",
  offers: {
    "@type": "Offer",
    price: "297",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: "https://troiestudio.fr/formations/cours-02",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    courseWorkload: "PT3H",
  },
};

const MAIN_SITE = "https://troiestudio.fr";
const CAL_URL = "https://cal.com/troiestudio/30min";
// Achat via Stripe Checkout (BuyButton) ; mailto en secours si Stripe
// n'est pas configuré sur l'environnement.
const FALLBACK_SUBJECT = "Cours 02 - TROIE-MULTI";

export const metadata = {
  title: "Cours 02 · Workflows IA pour solo & équipe, TROIE Formations",
  description:
    "7 modules · 3 h de vidéo · 100 prompts · 10 templates Make · accès à vie. Connectez vos IA à vos outils, construisez des agents persistants. 297 €.",
  alternates: {
    canonical: "https://troiestudio.fr/formations/cours-02",
  },
};

const MODULES = [
  {
    badge: "Module 5",
    title: "Make & Zapier, les bases qui suffisent.",
    lecons: [
      "Anatomie d'un scénario (trigger, modules, mapping)",
      "Make vs Zapier vs n8n : quand choisir lequel",
      "Schedule, webhook, HTTP : les 3 triggers essentiels",
      "Iterators et boucles : traiter 50 leads en 1 scénario",
      "Coût & debugging : faire tourner serein",
    ],
    duree: "30 min · 5 scénarios livrés",
  },
  {
    badge: "Module 6",
    title: "Agents persistants : mémoire, contexte, garde-fous.",
    lecons: [
      "Différence chatbot vs agent persistant",
      "Mémoire : vectorielle + relationnelle, quand quoi",
      "Pattern ReAct & plan-then-execute",
      "Garde-fous : human-in-the-loop sur les actions sensibles",
      "Tool use : déclarer des fonctions au modèle",
      "Code 70 / LLM 30 : la règle de fiabilité",
    ],
    duree: "40 min · 3 agents templates",
  },
  {
    badge: "Module 7",
    title: "Pipeline lead → mail → relance, en 1 après-midi.",
    lecons: [
      "Source de leads qualifiée + RGPD",
      "Scoring IA + rédaction personnalisée",
      "Séquence 3-5 mails espacés (J0/J3/J7/J14/J30)",
      "Réputation domaine : SPF, DKIM, DMARC, warm-up",
      "Mesurer le ROI : reply rate, RDV, deals closed",
      "Stop-rules : quand sortir un lead du pipeline",
    ],
    duree: "35 min · pipeline complet livré",
  },
  {
    badge: "Module 8",
    title: "Les 8 MCPs stratégiques.",
    lecons: [
      "MCP : ce que c'est, pourquoi ça change tout",
      "Slack · Notion · Gmail · Figma · GitHub · GA4 · Stripe · Make",
      "Scope des permissions : la règle du minimum",
      "Read-only sur 90 %, write sur 1 canal validable",
      "Self-hosted vs SaaS : RGPD strict mode",
    ],
    duree: "35 min · 8 MCPs setup pas-à-pas",
  },
  {
    badge: "Module 9",
    title: "10 workflows business clés-en-main.",
    lecons: [
      "Lead-to-booking · Support tier-1 · Content engine",
      "Devis dynamique · Veille concurrentielle",
      "Reporting client mensuel · Transcription meetings",
      "CRM auto-update · Facturation conforme FR",
      "SEO content factory · Social listening",
    ],
    duree: "40 min · 10 workflows livrés",
  },
  {
    badge: "Module 10",
    title: "Production, monitoring, sécurité.",
    lecons: [
      "Logs structurés + métriques (success rate, latence, coût)",
      "Prompt injection : reconnaître et mitiger",
      "Hard cap coût + circuit breaker + kill switch",
      "Déploiement progressif (shadow > A/B > full)",
      "RGPD : durée de conservation des logs",
    ],
    duree: "25 min · checklist prod complète",
  },
];

const DELIVERABLES = [
  {
    title: "100 prompts métier multi-tools",
    body: "Marketing, ops, sales, content, support, devis, veille. Calqués sur 4 héros (Claude, ChatGPT+Codex, Gemini, Copilot).",
  },
  {
    title: "10 templates Make / n8n",
    body: "Scénarios prêts à importer : lead-to-RDV, support tier-1, reporting, transcription, devis, veille, newsletter et plus.",
  },
  {
    title: "8 setups MCP détaillés",
    body: "Slack, Notion, Gmail, Figma, GitHub, GA4, Stripe, Make. Permissions, scopes, sécurité : pas-à-pas.",
  },
  {
    title: "3 agents persistants templates",
    body: "Code de base pour : agent veille, agent prospection, agent support. À adapter en 1 après-midi.",
  },
  {
    title: "70 questions QCM + explications",
    body: "Après chaque module, mini-quiz. Score, justifications détaillées, ancrage des concepts.",
  },
  {
    title: "Accès à vie + Discord 90 j",
    body: "Tous les contenus mis à jour quand les modèles ou MCPs évoluent. Discord privé 90 j offerts.",
  },
];

const FAQ = [
  {
    q: "Cours 01 est-il un prérequis ?",
    a: "Pas obligatoire mais fortement recommandé. Cours 02 part du principe que vous savez déjà écrire un system prompt et utiliser un Custom GPT ou un Projet Claude. Si ce n'est pas le cas, commencez par Cours 01 (99 €) avant.",
  },
  {
    q: "Faut-il savoir coder ?",
    a: "Non. Le cours est no-code-first. Make et n8n suffisent pour 95 % des workflows. Les agents persistants sont présentés en deux versions : no-code (Make) et code (Python/Node). Vous choisissez votre voie.",
  },
  {
    q: "Quelle stack faut-il pour suivre ?",
    a: "Au minimum : Claude.ai Pro (20 €/mois) OU ChatGPT Plus (20 €/mois) + Make (gratuit jusqu'à 1000 ops/mois). Optionnel : n8n self-hosted (gratuit), Notion (gratuit), Slack workspace test.",
  },
  {
    q: "Combien de temps pour déployer un premier workflow ?",
    a: "Le pipeline lead-to-RDV (module 7) est fait pour être opérationnel en 1 après-midi avec les templates livrés. Les workflows plus complexes (agents persistants) demandent 1-3 jours.",
  },
  {
    q: "Si ça ne me convient pas ?",
    a: "Garantie 14 jours, sans question. Si le contenu ne tient pas sa promesse, vous m'écrivez et je vous rembourse.",
  },
  {
    q: "Et après ce cours ?",
    a: "Mastermind TROIE (49 €/mois) pour rester à jour : nouveaux prompts mensuels, office hours, communauté. C'est l'abonnement qui prolonge la vie des cours en gardant votre stack alignée sur la meta du moment.",
  },
];

export default function Cours02Page() {
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
                Cours 02 · Advanced · paiement unique · accès à vie
              </p>
              <h1 className="t-display mt-8 text-5xl text-[var(--fg)] md:text-6xl lg:text-[80px]">
                Workflows IA{" "}
                <span className="text-[var(--accent)]">solo &amp; équipe.</span>
              </h1>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/90 md:text-lg">
                <strong className="text-[var(--fg)]">Connectez vos IA à vos outils. Construisez des agents qui tournent sans vous.</strong>{" "}
                Make, MCPs, agents persistants, 10 workflows business clés-en-main, sécurité production.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <BuyButton
                  product="cours-02"
                  label="Acheter · 297 € · accès à vie"
                  fallbackSubject={FALLBACK_SUBJECT}
                  className="group inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
                />
                <Link
                  href="/formations/cours-01"
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 transition-colors hover:text-[var(--accent)]"
                >
                  Voir Cours 01 (prérequis) →
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 md:pt-8">
              <div className="rounded-sm border border-[var(--fg)]/15 bg-[var(--bg-2)] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  Résumé
                </p>
                <h2 className="t-display mt-4 text-3xl text-[var(--fg)] md:text-4xl">
                  297 €
                </h2>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                  Paiement unique · accès à vie · garantie 14 j
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "7 modules · 3 h de vidéo",
                    "100 prompts métier livrés",
                    "10 templates Make / n8n",
                    "8 MCPs configurés pas-à-pas",
                    "3 agents persistants prêts",
                    "70 questions QCM",
                    "Discord 90 j offerts",
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
                <BuyButton
                  product="cours-02"
                  label="Acheter · 297 €"
                  fallbackSubject={FALLBACK_SUBJECT}
                  className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-[var(--fg)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
                />
                <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                  Garantie satisfait ou remboursé 14 jours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* AVANT / APRÈS */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            La transformation
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            De l'outil ponctuel au pipeline qui tourne.
          </h2>

          <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
            <div className="rounded-sm border border-[var(--rule)] bg-[var(--bg)] p-8 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--fg-2)]/65">
                Avant · LV. 30
              </p>
              <h3 className="t-display mt-4 text-2xl text-[var(--fg)]/75 md:text-3xl">
                Vous chattez avec votre IA, manuellement.
              </h3>
              <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-[var(--fg-2)]/85">
                <li>· Vous copiez-collez entre 5 onglets.</li>
                <li>· Aucun pipeline qui tourne sans vous.</li>
                <li>· Vous oubliez les relances.</li>
                <li>· Le reporting prend votre lundi.</li>
                <li>· Votre IA ne sait rien de vos outils.</li>
              </ul>
            </div>
            <div className="rounded-sm border border-[var(--accent)] bg-[#1a1714] p-8 text-[#f5f0e6] md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Après · LV. 92+
              </p>
              <h3 className="t-display mt-4 text-2xl md:text-3xl">
                Vos workflows tournent sans vous.
              </h3>
              <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-[#f5f0e6]/85">
                <li>· 3 agents persistants gèrent vos tâches récurrentes.</li>
                <li>· Brief quotidien dans Slack à 8h.</li>
                <li>· Leads scorés et contactés auto.</li>
                <li>· Reporting client généré en 5 min.</li>
                <li>· Votre IA agit dans vos outils 24/7.</li>
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
            Le programme · 6 modules avancés
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            De Make à la prod, sans saut technique.
          </h2>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Chaque module finit avec un livrable importable. 70 questions QCM ancrent chaque concept.
          </p>

          <div className="mt-16 space-y-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-20">
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

      {/* DELIVERABLES */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Ce que vous repartez avec
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Templates, scénarios, agents, tout livré.
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
                Prêt à équiper toute votre équipe ?
              </p>
              <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-7xl">
                297 €. 3 heures. Accès à vie.
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg)]/85 md:text-lg">
                Garantie 14 jours, sans question. Le cours qui transforme vos heures perdues en pipeline.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <BuyButton
                  product="cours-02"
                  label="Acheter · 297 € · accès à vie"
                  fallbackSubject={FALLBACK_SUBJECT}
                  className="group inline-flex items-center gap-3 bg-[#1a1714] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:bg-[#f5f0e6] hover:text-[#1a1714]"
                />
                <Link
                  href="/formations/mastermind"
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:text-[var(--bg)]"
                >
                  Voir le Mastermind →
                </Link>
              </div>
            </div>
            <div className="md:col-span-5 md:border-l md:border-[var(--fg)]/20 md:pl-12">
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
                Gratuit. On regarde vos workflows actuels, je vous dis ce qui se délivre vraiment en Cours 02.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FormationsFooter />
    </article>
  );
}
