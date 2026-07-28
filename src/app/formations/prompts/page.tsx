import Link from "next/link";
import { EmblemBreak } from "@/components/EmblemBreak";
import { FormationsFooter } from "@/components/FormationsFooter";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";

const MAIN_SITE = "https://troiestudio.fr";
const CAL_URL = "https://cal.com/troiestudio/30min";

/* TODO : remplacer les mailto par Lemon Squeezy / Stripe URLs au moment du go-live. */
const SUBJECT_BUNDLE = "TROIE Prompts Vault - Bundle 5 packs 99";

export const metadata = {
  title: "System Prompts, La boutique TROIE, 5 packs métier, prêts à coller",
  description:
    "25 system prompts métier prêts à coller dans ChatGPT, Claude, Gemini. 5 packs de 5 prompts. 29 € le pack, 99 € le bundle complet.",
  alternates: {
    canonical: "https://troiestudio.fr/formations/prompts",
  },
};

/* ─────────────────────────────────────────────────────────────────────
   La boutique TROIE Prompts.
   5 packs de 5 system prompts. Format : nom, sous-titre, body, 5 prompts.
   Visuel item MMORPG (image: null, fallback SVG en attendant Runway).
   ───────────────────────────────────────────────────────────────────── */

const PACKS = [
  {
    slug: "freelance",
    badge: "Pack 01",
    title: "Freelance Indépendant.",
    sub: "Sales, admin, com'",
    body: "Le strict minimum pour ne plus perdre de temps sur la paperasse + la prospection + la com'. Tout dans votre voix.",
    prompts: [
      "Devis personnalisé, généré à partir d'un brief client + votre grille",
      "Prospection LinkedIn, DMs ciblés, sans spammer",
      "Posts LinkedIn, 10 angles dans votre voix sur 1 sujet",
      "Brief client, cadrage initial complet en 5 min",
      "Suivi & relance, séquence 3 mails J0/J7/J21",
    ],
    icon: "M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z",
    image: null as string | null,
  },
  {
    slug: "marketing",
    badge: "Pack 02",
    title: "Marketing & Growth.",
    sub: "Ads, contenu, perf",
    body: "Pour ceux qui font tourner les campagnes, les briefs et le reporting. Réduisez de 70 % le temps de prod créative.",
    prompts: [
      "Campagne Meta Ads, angle, audience, copy, 3 variantes A/B",
      "Brief crea, visuel + texte + Midjourney prompts inclus",
      "Analyse perf hebdo, GA4/Meta Ads en 3 insights actionnables",
      "Plan éditorial 30 jours, themes pillars + calendrier",
      "Brief influence, pour micro/macro influenceurs",
    ],
    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h4M8 17h6M8 9h2",
    image: null as string | null,
  },
  {
    slug: "ecommerce",
    badge: "Pack 03",
    title: "E-commerce & SaaS.",
    sub: "Support, sales, produit",
    body: "Pour les boîtes qui scalent. Support tier-1 automatique, notes de sales call structurées, briefs produit propres.",
    prompts: [
      "Support client tier-1, 5 langues, première réponse propre",
      "Notes sales call, extraction + update CRM automatique",
      "Product brief, de feedback brut à specs claires",
      "Onboarding email série, 7 mails sur 14 jours",
      "Churn analysis, extraction des signaux faibles",
    ],
    icon: "M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM9 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 9h6M12 15h6M9 9v3",
    image: null as string | null,
  },
  {
    slug: "design",
    badge: "Pack 04",
    title: "Design & Créatif.",
    sub: "Brief, feedback, scope",
    body: "Pour ceux qui créent. Cadrer le brief, gérer les retours, éviter le scope creep, sans y passer la nuit.",
    prompts: [
      "Brief créatif structuré, du dump client à un brief signable",
      "Moodboard generator, références + direction artistique",
      "Présentation deck, structure narrative + Midjourney visuels",
      "Feedback handling, reformulation pro des retours client",
      "Scope creep tracking, détection auto des hors-cadre",
    ],
    icon: "M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z",
    image: null as string | null,
  },
  {
    slug: "coding",
    badge: "Pack 05",
    title: "Coding & Tech.",
    sub: "Code review, architecture, docs",
    body: "Pour les devs solo ou en équipe. Code review pertinents, architecture documentée, PRs propres.",
    prompts: [
      "Code review TROIE, vrai feedback, pas du 'lgtm'",
      "Architecture proposal, option A vs B avec tradeoffs",
      "Bug triage, root cause + priorisation",
      "PR description, what / why / how to test",
      "Tech doc writer, README, ADR, API specs",
    ],
    icon: "M16 18l6-6-6-6M8 6l-6 6 6 6",
    image: null as string | null,
  },
];

const WHY = [
  {
    title: "Capital pour commencer.",
    body: "Sans system prompt, ChatGPT/Claude est un génie générique. Avec, il devient VOTRE assistant qui connaît votre métier, votre voix, vos contraintes.",
  },
  {
    title: "Prêt à coller.",
    body: "Vous ouvrez Custom GPT ou Projet Claude, vous collez. C'est tout. Pas de configuration cryptique, pas de code.",
  },
  {
    title: "Calibrés sur du réel.",
    body: "Pas du théorique. Chaque prompt est calibré sur 50+ cas réels. Itération au fil du temps, mises à jour gratuites.",
  },
  {
    title: "Pas de lock-in.",
    body: "C'est du texte. Vous le modifiez, l'étendez, l'intégrez dans vos outils. Pas d'abonnement, pas de dépendance.",
  },
];

const HOW = [
  {
    n: "01",
    title: "Vous achetez le pack.",
    body: "Accès immédiat : un PDF + un fichier .md propre, pour chaque prompt.",
  },
  {
    n: "02",
    title: "Vous collez dans GPT/Claude.",
    body: "Custom GPT pour ChatGPT, Projet pour Claude. Le prompt est le 'system' (les instructions de fond).",
  },
  {
    n: "03",
    title: "Vous personnalisez 3 lignes.",
    body: "Votre nom, votre marque, votre ton, les emplacements sont marqués. 5 min suffisent.",
  },
  {
    n: "04",
    title: "Vous utilisez.",
    body: "Plus jamais besoin de re-expliquer le contexte. Vous demandez, ça livre, calibré.",
  },
];

const FAQ = [
  {
    q: "C'est quoi un 'system prompt' exactement ?",
    a: "Le system prompt, c'est la constitution invisible de votre assistant IA. Persistant sur toute la conversation, il definit qui il est, ce qu'il sait, comment il parle, ce qu'il refuse. Sans : vous re-expliquez tout, à chaque fois. Avec : votre IA arrive déjà configurée.",
  },
  {
    q: "Compatible avec quels outils ?",
    a: "Tous les LLM majeurs : ChatGPT (via Custom GPT), Claude (via Projets), Gemini (via Gem), Copilot (via workspace instructions). Les prompts sont écrits en français, optimisés pour fonctionner partout sans modification.",
  },
  {
    q: "Pourquoi pas un seul prompt géant ?",
    a: "Parce qu'un assistant qui fait tout fait tout moyen. 5 prompts spécialisés (un pour les devis, un pour la prospection, un pour les posts...) donnent 5 outils chirurgicaux qui battent un Swiss-knife générique. Vous switchez selon la tâche.",
  },
  {
    q: "Les mises à jour ?",
    a: "Gratuites à vie. Quand un modèle évolue significativement (release majeure GPT, Claude, Gemini) et qu'un prompt peut être amélioré, vous recevez la v2 par email. Le pack est un produit vivant.",
  },
  {
    q: "Garantie ?",
    a: "14 jours satisfait ou remboursé, sans question. Si les prompts ne tiennent pas leur promesse pour vous, vous m'écrivez et je vous rembourse le jour même.",
  },
  {
    q: "Inclus dans les Cours / Mastermind ?",
    a: "Oui. Cours 01 inclut 25 prompts (sa propre sélection). Cours 02 inclut 100 prompts plus avancés + 10 templates Make. Mastermind inclut TOUT + bibliothèque vivante. Les packs prompts sont l'entry sec pour commencer sans engagement.",
  },
];

export default function PromptsPage() {
  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* Global FormationsHeader rendered via layout */}
      {/* HERO */}
      <section className="relative border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-24 md:px-12 md:pt-32 md:pb-32">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            La boutique, system prompts, capital pour démarrer
          </p>
          <h1 className="t-display mt-8 max-w-5xl text-5xl text-[var(--fg)] md:text-7xl lg:text-[88px]">
            Le system prompt. Le{" "}
            <span className="text-[var(--accent)]">départ obligatoire.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)]/90 md:text-lg">
            Sans system prompt, votre IA est un génie générique. Avec, elle
            devient VOTRE assistant qui connaît votre métier, votre voix,
            vos contraintes. 5 packs de 5 system prompts, par métier. Prêt
            à coller dans ChatGPT, Claude, Gemini.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#packs"
              className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Voir les 5 packs
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#bundle"
              className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:text-[var(--fg)]"
            >
              Bundle 99 € (au lieu de 145 €) →
            </a>
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* POURQUOI */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Pourquoi un system prompt
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            L'armure de base. Avant tout le reste.
          </h2>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-20 md:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <div key={w.title} className="bg-[var(--bg)] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-[28px]">
                  {w.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-[15px]">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* PACKS, 5 packs cards */}
      <section id="packs" className="border-t border-[var(--rule)] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Catalogue, 5 packs métier
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Cinq packs. Une mission par métier.
          </h2>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            29 € le pack. 5 system prompts dedans, prêts à coller.
            Accès immédiat. Mises à jour à vie. Garantie 14 jours.
          </p>

          <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {PACKS.map((p, i) => {
              const themes = [
                {
                  card: "bg-[#ede3d0] text-[#1a1714]",
                  border: "border-[#1a1714]/10",
                  rule: "border-[#1a1714]/15",
                  body: "text-[#1a1714]/80",
                  meta: "text-[#1a1714]/60",
                  cta: "bg-[var(--ink)] text-[#f5f0e6] hover:bg-[var(--accent)]",
                  dotBg: "bg-[var(--accent)]",
                  badgeText: "text-[var(--accent)]",
                },
                {
                  card: "bg-[#5a4a3a] text-[#f5f0e6]",
                  border: "border-[#f5f0e6]/10",
                  rule: "border-[#f5f0e6]/15",
                  body: "text-[#f5f0e6]/85",
                  meta: "text-[#f5f0e6]/60",
                  cta: "bg-[var(--accent)] text-[#1a1714] hover:bg-[#f5f0e6]",
                  dotBg: "bg-[var(--accent)]",
                  badgeText: "text-[var(--accent)]",
                },
                {
                  card: "bg-[var(--ink)] text-[#f5f0e6]",
                  border: "border-[#f5f0e6]/15",
                  rule: "border-[#f5f0e6]/15",
                  body: "text-[#f5f0e6]/85",
                  meta: "text-[#f5f0e6]/60",
                  cta: "bg-[var(--accent)] text-[#1a1714] hover:bg-[#f5f0e6]",
                  dotBg: "bg-[var(--accent)]",
                  badgeText: "text-[var(--accent)]",
                },
                {
                  card: "bg-[#ebe2cf] text-[#1a1714]",
                  border: "border-[#1a1714]/10",
                  rule: "border-[#1a1714]/15",
                  body: "text-[#1a1714]/80",
                  meta: "text-[#1a1714]/60",
                  cta: "bg-[var(--ink)] text-[#f5f0e6] hover:bg-[var(--accent)]",
                  dotBg: "bg-[var(--accent)]",
                  badgeText: "text-[var(--accent)]",
                },
                {
                  card: "bg-[#7a6753] text-[#f5f0e6]",
                  border: "border-[#f5f0e6]/10",
                  rule: "border-[#f5f0e6]/15",
                  body: "text-[#f5f0e6]/85",
                  meta: "text-[#f5f0e6]/60",
                  cta: "bg-[var(--accent)] text-[#1a1714] hover:bg-[#f5f0e6]",
                  dotBg: "bg-[var(--accent)]",
                  badgeText: "text-[var(--accent)]",
                },
              ];
              const t = themes[i % themes.length];
              const tone = i === 1 || i === 2 || i === 4 ? "dark" : "light";
              return (
                <div
                  key={p.title}
                  className={`flex h-full flex-col overflow-hidden rounded-sm border ${t.border} ${t.card} transition-transform hover:-translate-y-1`}
                >
                  {/* Bandeau item, visuel item MMORPG (image-ready) */}
                  {p.image ? (
                    <div className="relative aspect-square overflow-hidden bg-[#0e0a07]">
                      {/* eslint-disable-next-line @next/next/no-img-élément */}
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#0e0a07] text-[var(--accent)]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-16 w-16 opacity-90"
                        aria-hidden="true"
                      >
                        <path d={p.icon} />
                      </svg>
                      <span className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]/65">
                        Item, pending
                      </span>
                    </div>
                  )}

                  <div className="flex h-full flex-col p-6 md:p-8">
                    <p className={`font-mono text-[11px] uppercase tracking-[0.22em] ${t.badgeText}`}>
                      {p.badge}
                    </p>
                    <h3 className="t-display mt-3 text-3xl md:text-4xl">{p.title}</h3>
                    <p className={`mt-2 font-mono text-[10px] uppercase tracking-[0.22em] ${t.meta}`}>
                      {p.sub}
                    </p>
                    <p className={`mt-5 text-sm leading-relaxed md:text-[15px] ${t.body}`}>
                      {p.body}
                    </p>

                    <p className={`mt-6 font-mono text-[10px] uppercase tracking-[0.32em] ${t.meta}`}>
                      Les 5 prompts inclus
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {p.prompts.map((q) => (
                        <li
                          key={q}
                          className={`flex items-start gap-3 text-sm leading-relaxed ${t.body}`}
                        >
                          <span
                            aria-hidden="true"
                            className={`mt-[10px] inline-block h-[3px] w-3 flex-shrink-0 ${t.dotBg}`}
                          />
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex-1" />
                    <div className={`mt-8 border-t pt-6 ${t.rule}`}>
                      <div className="flex items-end justify-between">
                        <p className="t-display text-2xl md:text-3xl">29 €</p>
                        <p className={`font-mono text-[9px] uppercase tracking-[0.22em] ${t.meta}`}>
                          Accès à vie, MAJ libres
                        </p>
                      </div>
                      <Link
                        href={`/formations/prompts/${p.slug}`}
                        className={`group mt-5 inline-flex w-full items-center justify-center gap-3 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${t.cta}`}
                      >
                        Voir le détail, 29 €
                        <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* BUNDLE FEATURED */}
      <section id="bundle" className="border-t border-[var(--rule)] bg-[var(--bg-2)] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <div className="overflow-hidden rounded-sm bg-[var(--accent)] text-[#1a1714]">
            <div className="grid gap-0 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="relative flex aspect-square items-center justify-center bg-[#0e0a07] text-[var(--accent)] md:h-full md:aspect-auto">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-24 w-24 opacity-90"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col p-8 md:col-span-7 md:p-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714]/85">
                  Bundle complet, 5 packs
                </p>
                <h3 className="t-display mt-4 text-4xl md:text-5xl lg:text-6xl">
                  Toute la bibliothèque. 25 prompts. 1 prix.
                </h3>
                <div className="mt-6 flex items-baseline gap-4">
                  <p className="t-display text-5xl md:text-6xl">99 €</p>
                  <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#1a1714]/65 line-through">
                    145 €
                  </p>
                </div>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714]/70">
                  Économie de 46 €, accès à vie, MAJ libres
                </p>
                <p className="mt-6 text-base leading-relaxed text-[#1a1714]/85 md:text-lg">
                  Les 5 packs ensemble. 25 system prompts couvrant
                  Freelance, Marketing, E-commerce, Design, Coding. Pour
                  ceux qui veulent démarrer avec une bibliothèque complète
                  dès le premier soir.
                </p>
                <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-[#1a1714]/20 pt-6">
                  <ul className="grid gap-1.5 md:grid-cols-2">
                    {PACKS.map((p) => (
                      <li
                        key={p.badge}
                        className="flex items-start gap-3 text-sm leading-relaxed text-[#1a1714]/85"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[10px] inline-block h-[3px] w-3 flex-shrink-0 bg-[var(--ink)]"
                        />
                        <span>{p.title.replace(".", "")}</span>
                      </li>
                    ))}
                  </ul>
                  <ObfuscatedEmail
                    subject={SUBJECT_BUNDLE}
                    className="group inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:bg-[#f5f0e6] hover:text-[#1a1714]"
                  >
                    Acheter le bundle, 99 €
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </ObfuscatedEmail>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* COMMENT CA MARCHE */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Comment ça marche
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Achat, copie, perso, prod.
          </h2>

          <ol className="mt-16 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-x-10 md:gap-y-14 lg:grid-cols-4">
            {HOW.map((s) => (
              <li key={s.title} className="border-t border-[var(--rule)] pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {s.n}.
                </p>
                <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-[28px]">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
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
            <div className="md:col-span-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--fg)]/80">
                Prêt à équiper votre IA ?
              </p>
              <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-7xl">
                29 € le pack. 99 € le bundle.
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg)]/85 md:text-lg">
                Le point de départ le moins risqué pour passer de
                'ChatGPT moyen' à 'assistant qui sait votre métier'.
                14 jours satisfait ou remboursé.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ObfuscatedEmail
                  subject={SUBJECT_BUNDLE}
                  className="group inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:bg-[#f5f0e6] hover:text-[#1a1714]"
                >
                  Acheter le bundle, 99 €
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </ObfuscatedEmail>
                <Link
                  href="/formations/cours-01"
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:text-[var(--bg)]"
                >
                  Ou aller plus loin avec Cours 01 (99 €) →
                </Link>
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
                Gratuit. On regarde votre activité, je vous dis quel pack vous fera vraiment gagner du temps.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FormationsFooter />
    </article>
  );
}
