import Link from "next/link";
import { Logo } from "@/components/Logo";
import { EmblemBreak } from "@/components/EmblemBreak";

const MAIN_SITE = "https://troiestudio.fr";
const CAL_URL = "https://cal.com/hugueslourmieres";
const CHECKOUT_URL = "mailto:contact@troiestudio.fr?subject=Cours+02+%E2%80%94+TROIE-MULTI";

export const metadata = {
  title: "Cours 02 · Workflows IA pour solo & equipe — TROIE Formations",
  description:
    "7 modules · 3 h de video · 100 prompts · 10 templates Make · acces a vie. Connectez vos IA a vos outils, construisez des agents persistants. 297 €.",
  alternates: {
    canonical: "https://troiestudio.fr/formations/cours-02",
  },
};

const MODULES = [
  {
    badge: "Module 5",
    title: "Make & Zapier, les bases qui suffisent.",
    lecons: [
      "Anatomie d'un scenario (trigger, modules, mapping)",
      "Make vs Zapier vs n8n : quand choisir lequel",
      "Schedule, webhook, HTTP : les 3 triggers essentiels",
      "Iterators et boucles : traiter 50 leads en 1 scenario",
      "Cout & debugging : faire tourner serein",
    ],
    duree: "30 min · 5 scenarios livres",
  },
  {
    badge: "Module 6",
    title: "Agents persistants : memoire, contexte, garde-fous.",
    lecons: [
      "Difference chatbot vs agent persistant",
      "Memoire : vectorielle + relationnelle, quand quoi",
      "Pattern ReAct & plan-then-execute",
      "Garde-fous : human-in-the-loop sur les actions sensibles",
      "Tool use : declarer des fonctions au modele",
      "Code 70 / LLM 30 : la regle de fiabilite",
    ],
    duree: "40 min · 3 agents templates",
  },
  {
    badge: "Module 7",
    title: "Pipeline lead → mail → relance, en 1 apres-midi.",
    lecons: [
      "Source de leads qualifiee + RGPD",
      "Scoring IA + redaction personnalisee",
      "Sequence 3-5 mails espaces (J0/J3/J7/J14/J30)",
      "Reputation domaine : SPF, DKIM, DMARC, warm-up",
      "Mesurer le ROI : reply rate, RDV, deals closed",
      "Stop-rules : quand sortir un lead du pipeline",
    ],
    duree: "35 min · pipeline complet livre",
  },
  {
    badge: "Module 8",
    title: "Les 8 MCPs strategiques.",
    lecons: [
      "MCP : ce que c'est, pourquoi ca change tout",
      "Slack · Notion · Gmail · Figma · GitHub · GA4 · Stripe · Make",
      "Scope des permissions : la regle du minimum",
      "Read-only sur 90 %, write sur 1 canal validable",
      "Self-hosted vs SaaS : RGPD strict mode",
    ],
    duree: "35 min · 8 MCPs setup pas-a-pas",
  },
  {
    badge: "Module 9",
    title: "10 workflows business cles-en-main.",
    lecons: [
      "Lead-to-booking · Support tier-1 · Content engine",
      "Devis dynamique · Veille concurrentielle",
      "Reporting client mensuel · Transcription meetings",
      "CRM auto-update · Facturation conforme FR",
      "SEO content factory · Social listening",
    ],
    duree: "40 min · 10 workflows livres",
  },
  {
    badge: "Module 10",
    title: "Production, monitoring, securite.",
    lecons: [
      "Logs structures + metriques (success rate, latence, cout)",
      "Prompt injection : reconnaitre et mitiger",
      "Hard cap cout + circuit breaker + kill switch",
      "Deploiement progressif (shadow > A/B > full)",
      "RGPD : duree de conservation des logs",
    ],
    duree: "25 min · checklist prod complete",
  },
];

const DELIVERABLES = [
  {
    title: "100 prompts metier multi-tools",
    body: "Marketing, ops, sales, content, support, devis, veille. Calques sur 4 heros (Claude, ChatGPT+Codex, Gemini, Copilot).",
  },
  {
    title: "10 templates Make / n8n",
    body: "Scenarios prets a importer : lead-to-RDV, support tier-1, reporting, transcription, devis, veille, newsletter et plus.",
  },
  {
    title: "8 setups MCP detailes",
    body: "Slack, Notion, Gmail, Figma, GitHub, GA4, Stripe, Make. Permissions, scopes, securite : pas-a-pas.",
  },
  {
    title: "3 agents persistants templates",
    body: "Code de base pour : agent veille, agent prospection, agent support. A adapter en 1 apres-midi.",
  },
  {
    title: "70 questions QCM + explications",
    body: "Apres chaque module, mini-quiz. Score, justifications detaillees, ancrage des concepts.",
  },
  {
    title: "Acces a vie + Discord 90 j",
    body: "Tous les contenus mis a jour quand les modeles ou MCPs evoluent. Discord prive 90 j offerts.",
  },
];

const FAQ = [
  {
    q: "Cours 01 est-il un prerequis ?",
    a: "Pas obligatoire mais fortement recommande. Cours 02 part du principe que vous savez deja ecrire un system prompt et utiliser un Custom GPT ou un Projet Claude. Si ce n'est pas le cas, commencez par Cours 01 (97 €) avant.",
  },
  {
    q: "Faut-il savoir coder ?",
    a: "Non. Le cours est no-code-first. Make et n8n suffisent pour 95 % des workflows. Les agents persistants sont presentes en deux versions : no-code (Make) et code (Python/Node). Vous choisissez votre voie.",
  },
  {
    q: "Quelle stack faut-il pour suivre ?",
    a: "Au minimum : Claude.ai Pro (20 €/mois) OU ChatGPT Plus (20 €/mois) + Make (gratuit jusqu'a 1000 ops/mois). Optionnel : n8n self-hosted (gratuit), Notion (gratuit), Slack workspace test.",
  },
  {
    q: "Combien de temps pour deployer un premier workflow ?",
    a: "Le pipeline lead-to-RDV (module 7) est fait pour etre operationnel en 1 apres-midi avec les templates livres. Les workflows plus complexes (agents persistants) demandent 1-3 jours.",
  },
  {
    q: "Si ca ne me convient pas ?",
    a: "Garantie 14 jours, sans question. Si le contenu ne tient pas sa promesse, vous m'ecrivez et je vous rembourse.",
  },
  {
    q: "Et apres ce cours ?",
    a: "Mastermind TROIE (49 €/mois) pour rester a jour : nouveaux prompts mensuels, office hours, communaute. C'est l'abonnement qui prolonge la vie des cours en gardant votre stack alignee sur la meta du moment.",
  },
];

export default function Cours02Page() {
  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* Global FormationsHeader rendered via layout */}
      {/* HERO */}
      <section className="relative border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-24 md:px-12 md:pt-32 md:pb-32">
          <div className="grid gap-16 md:grid-cols-12 md:gap-12 lg:gap-20">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Cours 02 · Advanced · paiement unique · acces a vie
              </p>
              <h1 className="t-display mt-8 text-5xl text-[var(--fg)] md:text-6xl lg:text-[80px]">
                Workflows IA{" "}
                <span className="text-[var(--accent)]">solo &amp; equipe.</span>
              </h1>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/90 md:text-lg">
                <strong className="text-[var(--fg)]">Connectez vos IA a vos outils. Construisez des agents qui tournent sans vous.</strong>{" "}
                Make, MCPs, agents persistants, 10 workflows business cles-en-main, securite production.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={CHECKOUT_URL}
                  className="group inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
                >
                  Commencer · 297 €
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <Link
                  href="/formations/cours-01"
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 transition-colors hover:text-[var(--accent)]"
                >
                  Voir Cours 01 (prerequis) →
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 md:pt-8">
              <div className="rounded-sm border border-[var(--fg)]/15 bg-[var(--bg-2)] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  Resume
                </p>
                <h2 className="t-display mt-4 text-3xl text-[var(--fg)] md:text-4xl">
                  297 €
                </h2>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                  Paiement unique · acces a vie · garantie 14 j
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "7 modules · 3 h de video",
                    "100 prompts metier livres",
                    "10 templates Make / n8n",
                    "8 MCPs configures pas-a-pas",
                    "3 agents persistants prets",
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
                <a
                  href={CHECKOUT_URL}
                  className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-[var(--fg)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
                >
                  Acheter · 297 €
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                  Garantie satisfait ou rembourse 14 jours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* AVANT / APRES */}
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
                Apres · LV. 92+
              </p>
              <h3 className="t-display mt-4 text-2xl md:text-3xl">
                Vos workflows tournent sans vous.
              </h3>
              <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-[#f5f0e6]/85">
                <li>· 3 agents persistants gerent vos taches recurrentes.</li>
                <li>· Brief quotidien dans Slack a 8h.</li>
                <li>· Leads scores et contactes auto.</li>
                <li>· Reporting client genere en 5 min.</li>
                <li>· Votre IA agit dans vos outils 24/7.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* MODULES DETAIL */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Le programme · 6 modules avances
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            De Make a la prod, sans saut technique.
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
            Templates, scenarios, agents — tout livre.
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
                Pret a equiper toute votre equipe ?
              </p>
              <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-7xl">
                297 €. 3 heures. Acces a vie.
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg)]/85 md:text-lg">
                Garantie 14 jours, sans question. Le cours qui transforme vos heures perdues en pipeline.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={CHECKOUT_URL}
                  className="group inline-flex items-center gap-3 bg-[#1a1714] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:bg-[#f5f0e6] hover:text-[#1a1714]"
                >
                  Acheter le Cours 02 · 297 €
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
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
                Vous hesitez ?
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
                Gratuit. On regarde vos workflows actuels, je vous dis ce qui se delivre vraiment en Cours 02.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <Logo variant="wordmark-emblem" className="h-10 text-[var(--fg)] md:h-12" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                Atelier digital · Paris · Formations IA en ligne
              </p>
            </div>
            <div className="flex flex-col gap-2 md:items-end md:justify-end">
              <Link href={MAIN_SITE} className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 transition-colors hover:text-[var(--accent)]">
                Retour au site principal →
              </Link>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                © 2026 TROIE Studio
              </p>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}
