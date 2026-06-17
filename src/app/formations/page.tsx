import Link from "next/link";
import { Logo } from "@/components/Logo";
import { EmblemBreak } from "@/components/EmblemBreak";
import { ToolsMarquee } from "@/components/ToolsMarquee";
import { LevelBar } from "./LevelBar";
import { HeroHeroes } from "./HeroHeroes";
import { FormationFitting } from "./FormationFitting";
import { GrowthCurve } from "../ia/GrowthCurve";

const MAIN_SITE = "https://troiestudio.fr";
const CAL_URL = "https://cal.com/hugueslourmieres";

/* ─────────────────────────────────────────────────────────────────────
   Concept : votre IA est un personnage de RPG. De base, il est faible.
   Une fois "stuffe" (preset + prompts + MCPs + skills), il devient un
   boss. Les formations vous apprennent a équiper et faire monter en
   puissance vos 4 heros : Claude, ChatGPT+Codex, Gemini, Copilot.
   ───────────────────────────────────────────────────────────────────── */

/* Les 4 pièces d'équipement qui transforment un LLM brut en outil pro.
 * Chaque slot à un visuel item style MMORPG (généré via Runway) qui
 * apparaît en bandeau au-dessus du contenu. `image` reste null tant
 * que la génération n'a pas été livrée, fallback sur l'icone SVG.
 * Prompts Runway utilisés :
 *  - Preset : armor + shield (Greek hoplite bronze, golden engravings)
 *  - Prompts : wizard staff + glowing scrolls
 *  - MCPs : 3 mythical pets (phoenix, owl, dragon)
 *  - Skills : 5 rune medallions pentagonal formation
 */
const EQUIPMENT = [
  {
    slot: "01",
    label: "Preset",
    sub: "Armure de base",
    body: "System prompt taille sur votre métier. L'IA arrive déjà configurée : ton, contraintes, signatures, garde-fous. C'est elle, version vous.",
    icon: "M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z",
    image: "/images/equipment/preset.png" as string | null,
  },
  {
    slot: "02",
    label: "Prompts",
    sub: "Sorts & abilities",
    body: "Bibliothèque de 100+ prompts eprouves : rédaction, analyse, vente, code, image, vidéo. A coller, modifier, étendre. Chacun un sort précis.",
    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h4M8 17h6M8 9h2",
    image: "/images/equipment/prompts.png" as string | null,
  },
  {
    slot: "03",
    label: "MCPs",
    sub: "Allies & invocations",
    body: "Model Context Protocol. Slack, Notion, Gmail, Figma, GitHub, GA4, Stripe. L'IA n'est plus dans son coin : elle agit dans VOS outils.",
    icon: "M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM9 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 9h6M12 15h6M9 9v3",
    image: "/images/equipment/mcps.png" as string | null,
  },
  {
    slot: "04",
    label: "Skills",
    sub: "Pouvoirs speciaux",
    body: "Competences custom qui debloquent vos workflows repetitifs. Écrites une fois, executees à vie. Le skill est votre arme legendaire.",
    icon: "M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z",
    image: "/images/equipment/skills.png" as string | null,
  },
];

/* Les 4 "personnages" IA et leurs stats */
const TOOLS = [
  {
    name: "Claude",
    role: "Le strategiste",
    logo: "/images/logos/claude.svg",
    specialty: "Long-form, raisonnement, Claude Code",
    stats: [
      { label: "Stratégie", value: 96 },
      { label: "Rédaction", value: 94 },
      { label: "Code (Claude Code)", value: 92 },
    ],
    loadout: {
      preset: "Operator TROIE",
      prompts: 32,
      mcps: 8,
      skills: 5,
    },
    cowork:
      "Claude Code : pair-coding terminal-first. Vous decrivez, il exécuté, lit, écrit, testé. Comme un dev senior toujours dispo.",
  },
  {
    name: "ChatGPT + Codex",
    role: "Le polyvalent",
    logo: "/images/logos/chatgpt.svg",
    specialty: "GPTs custom, Codex dev, plugins",
    stats: [
      { label: "Polyvalence", value: 95 },
      { label: "GPTs custom", value: 90 },
      { label: "Codex dev", value: 88 },
    ],
    loadout: {
      preset: "Custom GPT TROIE",
      prompts: 28,
      mcps: 6,
      skills: 4,
    },
    cowork:
      "Codex (la couche dev d'OpenAI) prend votre brief produit et livre une feature. Le GPT custom devient votre opérateur métier 24/7.",
  },
  {
    name: "Gemini",
    role: "Le natif Workspace",
    logo: "/images/logos/gemini.svg",
    specialty: "Docs, Sheets, Gmail, Drive en natif",
    stats: [
      { label: "Workspace", value: 97 },
      { label: "Analyse data", value: 91 },
      { label: "Multimodal", value: 89 },
    ],
    loadout: {
      preset: "Gem TROIE",
      prompts: 22,
      mcps: 5,
      skills: 3,
    },
    cowork:
      "Le seul qui vit dans Gmail / Docs / Sheets sans friction. Résumé de réunion, rédaction de mail, analyse de Sheet, tout en un clic.",
  },
  {
    name: "Copilot",
    role: "Le pair-programmer",
    logo: "/images/logos/copilot.svg",
    specialty: "VS Code, JetBrains, Visual Studio",
    stats: [
      { label: "Code completion", value: 93 },
      { label: "Refactor", value: 87 },
      { label: "Tests auto", value: 85 },
    ],
    loadout: {
      preset: "Workspace instructions",
      prompts: 18,
      mcps: 4,
      skills: 3,
    },
    cowork:
      "Vit dans votre IDE. Ne quitte jamais le code. Il vous suggéré, vous expliqué, vous refactore. Pour qui code tous les jours.",
  },
];

/* Use cases débloqués par chaque heros, vue agregee */
const USE_CASES = [
  { title: "SEO", body: "Audit, briefs, contenus structures, signaux", best: "Claude" },
  { title: "SEA", body: "Campagnes Meta Ads + Google Ads, A/B tests", best: "ChatGPT" },
  { title: "GEO", body: "Apparaître dans les LLM (Claude, GPT, Perplexity)", best: "Claude" },
  { title: "Images on-brand", body: "Midjourney, Firefly, GPT Images, Veo", best: "Tous" },
  { title: "Vidéos courtes", body: "Sora, Runway, Veo, sous-titrage auto", best: "Gemini" },
  { title: "Code & landings", body: "Claude Code, Codex, Copilot. Du brief au prod.", best: "Claude Code" },
  { title: "Veille marché", body: "Concurrents, signaux faibles, pricing", best: "ChatGPT" },
  { title: "Service client", body: "Première réponse 24/7 en 5 langues", best: "Tous" },
  { title: "Analytics", body: "GA4, Search Console, dashboards auto", best: "Gemini" },
];

/* Les 3 parcours de progression, leveling paths */
const PATHS = [
  {
    badge: "Parcours 01 · Solo",
    title: "Équipez 1 IA jusqu'au niveau pro.",
    duration: "4 modules · 90 min de vidéo · 25 prompts livres",
    price: "97 €",
    priceNote: "Paiement unique · accès à vie",
    body: "Vous choisissez votre heros (Claude OU ChatGPT). On le boost avec un preset, 25 prompts métier et les 3 MCPs essentiels. A la fin, vous le maîtrisez comme un pro.",
    bullets: [
      "1 heros équipe niveau pro (Claude ou ChatGPT)",
      "1 preset métier + 25 prompts",
      "3 MCPs essentiels connectés",
      "Module bonus : éviter hallucinations et sycophancy",
    ],
    cta: { label: "Voir le cours", href: "/formations/cours-01" },
  },
  {
    badge: "Parcours 02 · Multi-class",
    title: "Maîtrisez 4 IA + MCPs + Skills.",
    duration: "7 modules · 3 h de vidéo · 100 prompts + 10 templates",
    price: "297 €",
    priceNote: "Paiement unique · accès à vie",
    body: "Les 4 heros actives : Claude, ChatGPT + Codex, Gemini, Copilot. 100 prompts métier, 8 MCPs stratégiques, 5 skills custom. Vous choisissez le bon outil pour la bonne tâche.",
    bullets: [
      "4 heros équipes : Claude, ChatGPT+Codex, Gemini, Copilot",
      "100 prompts métier multi-tools",
      "8 MCPs stratégiques (Slack, Notion, Gmail, GA4...)",
      "5 skills custom + 10 templates Make / Zapier",
    ],
    cta: { label: "Voir le cours", href: "/formations/cours-02" },
  },
  {
    badge: "Parcours 03 · Mastermind",
    title: "Restez équipe du dernier patch.",
    duration: "Abonnement mensuel · communaute Discord",
    price: "49 € / mois",
    priceNote: "ou 490 € / an (2 mois offerts)",
    body: "La meta change vite. Nouveau preset des qu'un modèle sort, prompts mis à jour mensuellement, office hours live, Discord prive. Vous restez top tier sans effort.",
    bullets: [
      "Parcours 01 + 02 entièrement inclus",
      "Nouveaux prompts publiés chaque mois",
      "Office hours live 1x/mois",
      "Discord prive + mises à jour de tous les heros",
    ],
    cta: { label: "Voir le Mastermind", href: "/formations/mastermind" },
  },
];

/* Module 0 gratuit, la théorie LLM pour comprendre le reste */
const FREE_MODULE = {
  title: "Pourquoi un LLM hallucine et veut vous plaire.",
  duration: "15 min · gratuit · sans inscription",
  body: "Avant d'équiper votre heros, comprenez son fonctionnement de base. Pourquoi il inventé, pourquoi il vous donne raison même quand vous avez tort, et les 3 réflexes pour ne plus jamais vous faire avoir.",
  bullets: [
    "Le pre-training : comment un modèle apprend a predire",
    "Le RLHF : pourquoi il devient sycophant",
    "Les hallucinations : d'ou elles viennent",
    "3 réflexes pour ne plus jamais vous faire avoir",
  ],
};

export default function FormationsPage() {
  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* FormationsHeader est rendu globalement via /formations/layout.tsx */}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          POUR QUI ?, switcher B2C / B2B en tout premier
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-[var(--rule)] bg-[var(--bg-2)] pt-20 md:pt-24">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Pour qui ?
          </p>
          <div className="mt-6 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2">
            {/* B2C, cours en ligne (page courante) */}
            <a
              href="#start"
              className="group bg-[var(--bg)] p-6 transition-colors hover:bg-[var(--accent)]/8 md:p-8"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  Pour vous · solo &amp; équipe
                </p>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                  Vous êtes ici
                </span>
              </div>
              <h2 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-3xl">
                Cours en ligne &amp; system prompts
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                Accès immediat. Module 0 gratuit. Packs prompts a 29 €.
                Cours à partir de 97 €. Mastermind 49 €/mois.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                Voir les parcours
                <span aria-hidden="true" className="transition group-hover:translate-x-1">↓</span>
              </span>
            </a>

            {/* B2B, entreprise sur site (legacy /fr/formations) */}
            <Link
              href="/fr/agents"
              className="group bg-[var(--bg)] p-6 transition-colors hover:bg-[var(--accent)]/8 md:p-8"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  Pour votre entreprise · sur site
                </p>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                  Sur devis
                </span>
              </div>
              <h2 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-3xl">
                Agents IA &amp; formations équipe
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                Déploiement d'agents (Hermes, Achille, Hestia) +
                formations sur mesure pour vos équipes. Sur site ou
                distanciel. Sur devis.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                Voir les agents &amp; formations
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO, votre IA, de base a boss niveau
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-24 md:px-12 md:pt-32 md:pb-32">
          <div className="grid gap-16 md:grid-cols-12 md:gap-12 lg:gap-20">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Formations IA · stuffer vos outils · niveau pro
              </p>
              <h1 className="t-display mt-8 text-5xl text-[var(--fg)] md:text-6xl lg:text-[80px] xl:text-[92px]">
                Votre IA, de base.
                <br />
                <span className="text-[var(--accent)]">Boss niveau,</span> en 90 minutes.
              </h1>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/90 md:text-lg">
                <strong className="text-[var(--fg)]">Pensez RPG.</strong>{" "}
                Votre Claude, votre ChatGPT, votre Gemini, votre Copilot :
                ce sont des personnages. Équipez-les avec un preset,
                des prompts, des MCPs, des skills. Et regardez-les
                devenir massifs.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href="#free"
                  className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Module 0 gratuit
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#paths"
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 transition-colors hover:text-[var(--accent)]"
                >
                  Voir les 3 parcours →
                </a>
              </div>
            </div>

            {/* Hero visual : slideshow autoplay des 4 personnages IA */}
            <div className="md:col-span-5 md:pt-8">
              <HeroHeroes />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee logos IA - même que home troiestudio.fr */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-6 md:py-8">
        <ToolsMarquee ariaLabel="Outils IA enseignes dans les formations TROIE" />
      </section>

      <EmblemBreak size="md" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PUNCHLINE · L'IA qui exécuté · Équipage IA
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                La promesse
              </p>
              <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
                L'IA qui exécuté.{" "}
                <span className="text-[var(--accent)]">Pas celle qui répond.</span>
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                <strong className="text-[var(--fg)]">Stop aux questions, place à l'action.</strong>{" "}
                ChatGPT répond à vos questions. Votre équipage IA, Hermes,
                Achille, Hestia, agit dans vos outils, 24/7, sans que vous
                leviez le petit doigt. Pendant que vous dormez, votre stack
                traité vos mails, draft vos posts, met à jour votre CRM.
                Vous arrivez le matin, tout est prêt à valider.
              </p>
            </div>
            <div className="md:col-span-5">
              <ul className="grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)]">
                {[
                  { left: "L'IA qui répond", right: "L'IA qui exécuté" },
                  { left: "Vous posez 50 questions / jour", right: "Vous validez 50 actions / jour" },
                  { left: "Vous oubliez tout entre 2 chats", right: "Mémoire persistante des clients" },
                  { left: "Aucun accès à vos outils", right: "Connectée Gmail, Notion, Slack, GA4" },
                  { left: "Reactive", right: "Proactive · brief matinal Slack 8h" },
                ].map((row, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-2 gap-px bg-[var(--rule)]"
                  >
                    <div className="bg-[var(--bg)] p-3 md:p-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                        Avant
                      </p>
                      <p className="mt-1 text-xs leading-tight text-[var(--fg-2)] line-through opacity-70 md:text-sm">
                        {row.left}
                      </p>
                    </div>
                    <div className="bg-[var(--accent)]/8 p-3 md:p-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]">
                        Après
                      </p>
                      <p className="mt-1 text-xs leading-tight text-[var(--fg)] md:text-sm">
                        {row.right}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href="/ia"
                className="group mt-6 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:text-[var(--fg)]"
              >
                Voir les 3 agents en détail
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ROI · GrowthCurve + FormationFitting personnalisé
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Combien vous allez gagner ?
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Calculez votre ROI. Trouvez votre parcours.
          </h2>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            A gauche, la courbe : ce que vous changez en equipant vos
            outils IA. A droite, le fitting : 3 questions pour vous
            recommander LE parcours qui colle à votre profil.
          </p>

          <div className="mt-16 grid gap-8 md:mt-20 md:grid-cols-2">
            <GrowthCurve />
            <FormationFitting />
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          AVANT / APRÈS, la transformation
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Avant / Après
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Même outil. Pas le même heros.
          </h2>

          <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
            {/* AVANT, l'outil de base */}
            <div className="rounded-sm border border-[var(--rule)] bg-[var(--bg)] p-8 md:p-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--fg-2)]/65">
                  Avant · default
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                  LV. 12
                </span>
              </div>
              <p className="t-display mt-6 text-3xl text-[var(--fg)]/75 md:text-4xl">
                Claude de base
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                Sans preset, sans prompts, sans MCPs
              </p>
              <div className="mt-8 space-y-4">
                <LevelBar label="Stratégie" value={32} delay={0.1} />
                <LevelBar label="Rédaction" value={45} delay={0.2} />
                <LevelBar label="Code" value={28} delay={0.3} />
              </div>
              <p className="mt-10 text-sm leading-relaxed text-[var(--fg-2)]/85">
                Réponses generiques. Ton aleatoire. Pas de contexte
                métier. Hallucinations frequentes. Vous re-expliquez
                tout, à chaque fois. Vous corrigez plus que vous ne
                produisez.
              </p>
            </div>

            {/* APRÈS, l'outil stuffe */}
            <div className="relative rounded-sm border border-[var(--accent)] bg-[#1a1714] p-8 text-[#f5f0e6] md:p-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  Après · stuffe
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  LV. 96 / MAX
                </span>
              </div>
              <p className="t-display mt-6 text-3xl md:text-4xl">
                Claude TROIE
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#f5f0e6]/65">
                Preset · 32 prompts · 8 MCPs · 5 skills
              </p>
              <div className="mt-8 space-y-4">
                <LevelBar label="Stratégie" value={96} tone="dark" delay={0.4} />
                <LevelBar label="Rédaction" value={94} tone="dark" delay={0.55} />
                <LevelBar label="Code" value={92} tone="dark" delay={0.7} />
              </div>
              <p className="mt-10 text-sm leading-relaxed text-[#f5f0e6]/85">
                Réponses calées sur votre ton. Contexte métier
                permanent. Actions dans Slack, Notion, Gmail, GA4.
                Workflows automatiques. Vous décidez, il exécuté.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          L'EQUIPEMENT, 4 slots
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            L'équipement complet
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Quatre slots. Vos heros deviennent imbattables.
          </h2>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Comme un personnage RPG : armure, sorts, allies, pouvoirs
            speciaux. C'est ce qui transformé une IA generique en
            outil pro qui sait votre métier.
          </p>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-20 md:grid-cols-4">
            {EQUIPMENT.map((e) => (
              <div key={e.slot} className="flex flex-col bg-[var(--bg)]">
                {/* Bandeau item MMORPG, pixel-art orange Hermes */}
                {e.image ? (
                  <div className="relative aspect-square overflow-hidden bg-[var(--accent)]">
                    {/* eslint-disable-next-line @next/next/no-img-élément */}
                    <img
                      src={e.image}
                      alt={e.label}
                      className="h-full w-full object-contain transition-transform duration-700 hover:scale-105"
                      style={{ imageRendering: "pixelated" }}
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
                      <path d={e.icon} />
                    </svg>
                    <span className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]/65">
                      Item · pending
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                    Slot {e.slot}
                  </p>
                  <h3 className="t-display mt-4 text-3xl text-[var(--fg)] md:text-4xl">
                    {e.label}
                  </h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                    {e.sub}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-[var(--fg-2)] md:text-[15px]">
                    {e.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          VOS 4 HEROS IA, character cards
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Vos 4 heros IA
          </p>
          <h2 className="t-display mt-8 max-w-4xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Le bon outil pour la bonne quete.
          </h2>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            On ne joue pas que avec un. Chaque outil à sa specialite,
            ses MCPs natifs, ses skills. Le parcours Multi-class vous
            apprend a switcher.
          </p>

          <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {TOOLS.map((t, i) => {
              const themes = [
                "bg-[#ede3d0] text-[#1a1714] border-[#1a1714]/10",
                "bg-[#5a4a3a] text-[#f5f0e6] border-[#f5f0e6]/10",
                "bg-[#1a1714] text-[#f5f0e6] border-[#f5f0e6]/15",
                "bg-[var(--accent)] text-[#1a1714] border-[#1a1714]/15",
              ];
              const tone = i === 1 || i === 2 ? "dark" : "light";
              const meta = tone === "dark" ? "text-[#f5f0e6]/60" : "text-[#1a1714]/60";
              const body = tone === "dark" ? "text-[#f5f0e6]/85" : "text-[#1a1714]/85";
              return (
                <div
                  key={t.name}
                  className={`flex h-full flex-col rounded-sm border p-6 transition-transform hover:-translate-y-1 md:p-8 ${themes[i]}`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`font-mono text-[10px] uppercase tracking-[0.32em] ${i === 3 ? "text-[#1a1714]" : "text-[var(--accent)]"}`}>
                      Heros {String(i + 1).padStart(2, "0")}
                    </p>
                    <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${meta}`}>
                      LV. {t.stats[0].value}
                    </span>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-élément */}
                    <img
                      src={t.logo}
                      alt={t.name}
                      className="h-12 w-auto"
                      style={{ filter: tone === "dark" ? "invert(1) grayscale(1)" : "grayscale(1)" }}
                    />
                    <div>
                      <p className="t-display text-2xl md:text-[26px]">{t.name}</p>
                      <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${meta}`}>
                        {t.role}
                      </p>
                    </div>
                  </div>

                  <p className={`mt-5 text-sm leading-relaxed ${body}`}>
                    {t.specialty}
                  </p>

                  {/* Stats */}
                  <div className="mt-6 space-y-3">
                    {t.stats.map((s, j) => (
                      <LevelBar
                        key={s.label}
                        label={s.label}
                        value={s.value}
                        tone={tone}
                        delay={0.1 + j * 0.12}
                      />
                    ))}
                  </div>

                  {/* Loadout */}
                  <div className={`mt-6 grid grid-cols-4 gap-2 border-t pt-5 ${i === 1 || i === 2 ? "border-[#f5f0e6]/15" : "border-[#1a1714]/15"}`}>
                    {[
                      { v: t.loadout.prompts, l: "Prompts" },
                      { v: t.loadout.mcps, l: "MCPs" },
                      { v: t.loadout.skills, l: "Skills" },
                      { v: 1, l: "Preset" },
                    ].map((it) => (
                      <div key={it.l} className="text-center">
                        <p className="t-display text-xl md:text-2xl">
                          {it.v}
                        </p>
                        <p className={`mt-1 font-mono text-[8px] uppercase tracking-[0.16em] ${meta}`}>
                          {it.l}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex-1" />
                  <p className={`mt-6 border-t pt-5 text-xs leading-relaxed ${body} ${i === 1 || i === 2 ? "border-[#f5f0e6]/15" : "border-[#1a1714]/15"}`}>
                    <strong>Cowork :</strong> {t.cowork}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SKILLS A DEBLOQUER, use cases
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Skills a débloquer
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            9 competences. Niveau pro à chaque slot.
          </h2>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-20 md:grid-cols-3">
            {USE_CASES.map((u, i) => (
              <div key={u.title} className="bg-[var(--bg)] p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                    Skill {String(i + 1).padStart(2, "0")}
                  </p>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                    Best · {u.best}
                  </span>
                </div>
                <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-[28px]">
                  {u.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-[15px]">
                  {u.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MODULE 0 GRATUIT, la théorie LLM
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="free" className="border-t border-[var(--rule)] bg-[var(--bg-2)] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Module 0 · gratuit · sans inscription
              </p>
              <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
                {FREE_MODULE.title}
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                {FREE_MODULE.duration}
              </p>
              <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                {FREE_MODULE.body}
              </p>
              <ul className="mt-10 space-y-3.5">
                {FREE_MODULE.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-base leading-relaxed text-[var(--fg-2)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[10px] inline-block h-[3px] w-3 flex-shrink-0 bg-[var(--accent)]"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/formations/module-0"
                className="group mt-10 inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
              >
                Lancer le Module 0
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </Link>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                4 lecons + 10 questions · sans inscription · 15 min
              </p>
            </div>
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LES 3 PARCOURS, leveling paths
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PAR OU COMMENCER, tunnel a 5 niveaux
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="start" className="border-t border-[var(--rule)] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Par ou commencer
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            5 niveaux, du gratuit au mensuel.
          </h2>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Choisissez votre porté d'entree selon votre besoin et votre budget. Tous les niveaux sont compatibles, vous progressez à votre rythme.
          </p>

          <ol className="mt-16 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-20 md:grid-cols-5">
            {/* Niveau 01, Module 0 gratuit */}
            <Link
              href="/formations/module-0"
              className="group flex flex-col bg-[var(--bg)] p-6 transition-colors hover:bg-[var(--bg-2)] md:p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                01 · Gratuit
              </p>
              <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-[26px]">
                Module 0
              </h3>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                Sans inscription
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)]">
                Théorie LLM en 15 min + QCM 10 questions. Code promo offert si score ≥ 7/10.
              </p>
              <div className="flex-1" />
              <p className="mt-6 t-display text-2xl text-[var(--fg)] md:text-3xl">0 €</p>
              <span className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] transition-transform group-hover:translate-x-1">
                Commencer →
              </span>
            </Link>

            {/* Niveau 02, Boutique Prompts */}
            <Link
              href="/formations/prompts"
              className="group flex flex-col bg-[var(--bg)] p-6 transition-colors hover:bg-[var(--bg-2)] md:p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                02 · Entree douce
              </p>
              <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-[26px]">
                Prompts Vault
              </h3>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                5 packs · 25 prompts
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)]">
                System prompts métier prêts à coller. Freelance, Marketing, E-com, Design, Coding.
              </p>
              <div className="flex-1" />
              <p className="mt-6 t-display text-2xl text-[var(--fg)] md:text-3xl">
                29 € / 99 €
              </p>
              <span className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] transition-transform group-hover:translate-x-1">
                Acheter →
              </span>
            </Link>

            {/* Niveau 03, Cours 01 */}
            <Link
              href="/formations/cours-01"
              className="group flex flex-col bg-[#5a4a3a] p-6 text-[#f5f0e6] transition-transform hover:-translate-y-1 md:p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                03 · Entry
              </p>
              <h3 className="t-display mt-4 text-2xl md:text-[26px]">
                Cours 01
              </h3>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e6]/60">
                4 modules · 90 min vidéo
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#f5f0e6]/85">
                Maîtriser ChatGPT &amp; Claude. 5 patterns + 25 prompts + 5 templates System.
              </p>
              <div className="flex-1" />
              <p className="mt-6 t-display text-2xl md:text-3xl">97 €</p>
              <span className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] transition-transform group-hover:translate-x-1">
                Voir le cours →
              </span>
            </Link>

            {/* Niveau 04, Cours 02 */}
            <Link
              href="/formations/cours-02"
              className="group flex flex-col bg-[#1a1714] p-6 text-[#f5f0e6] transition-transform hover:-translate-y-1 md:p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                04 · Advanced
              </p>
              <h3 className="t-display mt-4 text-2xl md:text-[26px]">
                Cours 02
              </h3>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e6]/60">
                7 modules · 3 h vidéo
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#f5f0e6]/85">
                Workflows IA. Make + MCPs + agents persistants + 100 prompts + 10 templates.
              </p>
              <div className="flex-1" />
              <p className="mt-6 t-display text-2xl md:text-3xl">297 €</p>
              <span className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] transition-transform group-hover:translate-x-1">
                Voir le cours →
              </span>
            </Link>

            {/* Niveau 05, Mastermind */}
            <Link
              href="/formations/mastermind"
              className="group flex flex-col bg-[var(--accent)] p-6 text-[#1a1714] transition-transform hover:-translate-y-1 md:p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#1a1714]/85">
                05 · Premium
              </p>
              <h3 className="t-display mt-4 text-2xl md:text-[26px]">
                Mastermind
              </h3>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1a1714]/65">
                Abo mensuel · communaute
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#1a1714]/85">
                Cours 01 + 02 inclus + bibliothèque vivante + office hours + Discord prive.
              </p>
              <div className="flex-1" />
              <p className="mt-6 t-display text-2xl md:text-3xl">49 € / mois</p>
              <span className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1a1714] transition-transform group-hover:translate-x-1">
                Rejoindre →
              </span>
            </Link>
          </ol>

          <p className="mt-12 max-w-2xl font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65 md:text-[11px]">
            Pas sur du bon niveau ? <Link href="https://cal.com/hugueslourmieres" target="_blank" className="text-[var(--accent)] hover:underline">30 min visio gratuit</Link> avec Hugues, on regarde votre cas et on choisit ensemble.
          </p>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DÉTAIL DES 3 PARCOURS, pour ceux qui veulent fouiller
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="paths" className="border-t border-[var(--rule)] bg-[var(--bg-2)] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Détail des 3 parcours
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-6xl lg:text-7xl">
            Choisissez votre voie de leveling.
          </h2>

          <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-3 md:gap-8">
            {PATHS.map((p, i) => {
              const themes = [
                {
                  card: "bg-[#ede3d0] text-[#1a1714]",
                  border: "border-[#1a1714]/10",
                  rule: "border-[#1a1714]/15",
                  body: "text-[#1a1714]/80",
                  meta: "text-[#1a1714]/60",
                  cta: "bg-[#1a1714] text-[#f5f0e6] hover:bg-[var(--accent)]",
                },
                {
                  card: "bg-[#5a4a3a] text-[#f5f0e6]",
                  border: "border-[#f5f0e6]/10",
                  rule: "border-[#f5f0e6]/15",
                  body: "text-[#f5f0e6]/85",
                  meta: "text-[#f5f0e6]/60",
                  cta: "bg-[var(--accent)] text-[#1a1714] hover:bg-[#f5f0e6]",
                },
                {
                  card: "bg-[var(--accent)] text-[#1a1714]",
                  border: "border-[#1a1714]/15",
                  rule: "border-[#1a1714]/20",
                  body: "text-[#1a1714]/85",
                  meta: "text-[#1a1714]/65",
                  cta: "bg-[#1a1714] text-[#f5f0e6] hover:bg-[#f5f0e6] hover:text-[#1a1714]",
                },
              ];
              const t = themes[i % themes.length];
              return (
                <div
                  key={p.title}
                  id={p.cta.href.startsWith("#") ? p.cta.href.replace("#", "") : undefined}
                  className={`flex h-full flex-col rounded-sm border ${t.border} ${t.card} p-8 transition-transform hover:-translate-y-1 md:p-10`}
                >
                  <p className={`font-mono text-[11px] uppercase tracking-[0.22em] ${i === 2 ? "text-[#1a1714]" : "text-[var(--accent)]"}`}>
                    {p.badge}
                  </p>
                  <h3 className="t-display mt-4 text-3xl md:text-4xl">{p.title}</h3>
                  <p className={`mt-3 font-mono text-[11px] uppercase tracking-[0.22em] ${t.meta}`}>
                    {p.duration}
                  </p>
                  <p className={`mt-6 text-sm leading-relaxed md:text-base ${t.body}`}>
                    {p.body}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        className={`flex items-start gap-3 text-sm leading-relaxed ${t.body}`}
                      >
                        <span
                          aria-hidden="true"
                          className={`mt-[10px] inline-block h-[3px] w-3 flex-shrink-0 ${i === 2 ? "bg-[#1a1714]" : "bg-[var(--accent)]"}`}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex-1" />
                  <div className={`mt-10 border-t pt-6 ${t.rule}`}>
                    <p className="t-display text-2xl md:text-3xl">{p.price}</p>
                    <p className={`mt-1 font-mono text-[10px] uppercase tracking-[0.22em] ${t.meta}`}>
                      {p.priceNote}
                    </p>
                    {p.cta.href.startsWith("/") ? (
                      <Link
                        href={p.cta.href}
                        className={`group mt-6 inline-flex w-full items-center justify-center gap-3 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${t.cta}`}
                      >
                        {p.cta.label}
                        <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                      </Link>
                    ) : (
                      <a
                        href={p.cta.href}
                        className={`group mt-6 inline-flex w-full items-center justify-center gap-3 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${t.cta}`}
                      >
                        {p.cta.label}
                        <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FINAL CTA
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="tone-accent border-t border-[var(--rule)] bg-[var(--bg)] text-[var(--fg)]">
        <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
          <div className="grid gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-8">
              <h2 className="t-display text-4xl text-[var(--fg)] md:text-7xl">
                Pas sur du bon parcours ?
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg)]/85 md:text-lg">
                30 min en visio gratuit. On regarde votre activite,
                vos outils, votre objectif. On vous dit honnêtement
                quel heros équiper en premier, ou si vous n'avez
                besoin d'aucun cours.
              </p>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="group mt-12 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--bg)] hover:text-[var(--bg)] md:text-[12px]"
              >
                Réserver 30 min d'orientation
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </a>
            </div>
            <div className="md:col-span-4 md:border-l md:border-[var(--fg)]/20 md:pl-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)]/70">
                Ou aller plus loin
              </p>
              <Link
                href="/ia"
                className="t-display mt-3 block text-2xl text-[var(--fg)] hover:text-[var(--bg)] md:text-3xl"
              >
                Voir TROIE IA Pro →
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg)]/75">
                Formations sur site, déploiement d'agents, accompagnement équipe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
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
