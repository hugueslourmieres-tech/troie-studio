import Link from "next/link";
import { AnimatedNumber } from "./AnimatedNumber";
import { HeroVideoBg } from "./HeroVideoBg";

const MAIN_SITE = "https://troiestudio.fr";
const CAL_URL = "https://cal.com/hugueslourmieres";

const STATS = [
  { value: 5, suffix: "×", label: "Plus vite, vraiment" },
  { value: 60, suffix: " %", label: "De temps libere par tache" },
  { value: 30, suffix: " jours", label: "Premier ROI mesurable" },
  { value: 1, suffix: "h/jour", label: "Gain moyen par auto-tache" },
];

const SOLO_PACKS = [
  {
    badge: "Pack 01",
    title: "Decouverte solo.",
    duration: "1/2 journee · 4 h",
    price: "A partir de 290 €",
    body:
      "Pour les indeps qui partent de zero. ChatGPT, Claude, Gemini. Methode de prompting, hygiene des donnees, bibliotheque de prompts adaptee a votre metier.",
    bullets: [
      "Bibliotheque de 25 prompts pour votre activite",
      "Workflow texte au quotidien",
      "Hygiene des donnees, ce qu'on partage ou pas",
    ],
  },
  {
    badge: "Pack 02",
    title: "Atelier perso.",
    duration: "1 journee · 7 h",
    price: "A partir de 590 €",
    body:
      "Un workflow IA construit avec vous, sur votre activite reelle. Vous repartez avec votre boite a outils, pas une presentation generique.",
    bullets: [
      "Audit de vos taches chronophages",
      "Workflow IA personnalise documente",
      "Templates : devis, emails, posts, visuels",
    ],
  },
  {
    badge: "Pack 03",
    title: "Suivi 30 jours.",
    duration: "1 mois · 8 h de coaching",
    price: "A partir de 1 290 €",
    body:
      "Un agent IA dedie sur votre cas + 2 sessions de 1h par semaine pour ajuster. Vous passez de l'experimentation a la maitrise sereine.",
    bullets: [
      "Agent IA configure sur votre activite",
      "2 sessions de coaching par semaine",
      "Toujours joignable pendant 30 jours",
    ],
  },
];

const PRO_PACKS = [
  {
    badge: "Formation 01",
    title: "Decouverte equipe.",
    duration: "1/2 journee · jusqu'a 10 pers.",
    price: "Sur devis",
    body:
      "Fondamentaux IA pour toute l'equipe. ChatGPT, Claude, Gemini. Methode de prompting, hygiene des donnees, bibliotheque de prompts partagee.",
    bullets: [
      "Methode de prompting structuree",
      "Bibliotheque de prompts collective",
      "Plan d'usage par metier (commercial, marketing, support)",
    ],
    cta: { label: "Voir le programme", href: `${MAIN_SITE}/fr/formations` },
  },
  {
    badge: "Formation 02",
    title: "Pratique creative.",
    duration: "1 journee · jusqu'a 8 pers.",
    price: "Sur devis",
    body:
      "Production & creation IA pour les equipes marketing, com', creation. Midjourney, Sora, Veo, Runway. Vous repartez avec un workflow reproductible.",
    bullets: [
      "Generation image et video on-brand",
      "Integration au workflow creatif existant",
      "Droits, mentions, limites juridiques",
    ],
    cta: { label: "Voir le programme", href: `${MAIN_SITE}/fr/formations` },
  },
  {
    badge: "Formation 03",
    title: "Agents IA & automatisation.",
    duration: "2 journees · jusqu'a 6 pers.",
    price: "Sur devis",
    body:
      "Make, n8n, Zapier. Conception et deploiement d'agents IA sur vos cas reels. 1 a 2 automatisations en production a la sortie de la formation.",
    bullets: [
      "Conception d'agents IA : memoire, garde-fous",
      "1 a 2 automatisations en production",
      "Gouvernance et privacy-by-design",
    ],
    cta: { label: "Voir le programme", href: `${MAIN_SITE}/fr/formations` },
  },
];

const TASKS = [
  { title: "Redaction d'emails", body: "Vos reponses pros calees dans votre voix, en 3 secondes." },
  { title: "Posts reseaux sociaux", body: "LinkedIn, Instagram, TikTok. Un sujet, cinq formats sortants." },
  { title: "Reponse client / SAV", body: "Premiere reponse en moins d'une minute, 24/7." },
  { title: "Prospection ciblee", body: "Listes qualifiees, mails personnalises, relances propres." },
  { title: "Devis & factures", body: "Generes, envoyes, relances. Plus jamais oublies." },
  { title: "Visuels et illustrations", body: "Generation image on-brand, en quelques secondes." },
  { title: "Reporting hebdo", body: "Synthese automatique de vos chiffres, chaque lundi matin." },
  { title: "Veille marche", body: "Concurrents, tendances, signaux faibles. Resumes a la demande." },
  { title: "Sous-titrage video", body: "Vos reels et lives sous-titres et traduits automatiquement." },
  { title: "Briefs creatifs", body: "Moodboards, references, scripts. Pretes a passer en prod." },
  { title: "Traduction multilingue", body: "Votre voix de marque, conservee dans 5 langues." },
  { title: "Analyse de donnees", body: "Vos CSV, vos Excel, vos tableurs. Lus, croises, expliques." },
];

const STEPS = [
  {
    title: "Audit gratuit, 30 min.",
    body: "On regarde vos taches reelles. Sans engagement, sans jargon. Reponse claire, chiffree, ecrite.",
  },
  {
    title: "Setup & formation.",
    body: "On configure les outils sur vos cas concrets, on forme votre equipe avec vos donnees, vos clients, votre voix.",
  },
  {
    title: "Production supervisee.",
    body: "Pendant 30 jours, on surveille les premieres semaines. Garde-fous, ajustements, transfert progressif de la main.",
  },
  {
    title: "Autonomie complete.",
    body: "Vos workflows, vos prompts, vos acces. Tout reste chez vous. Sortie propre garantie, jamais de lock-in.",
  },
];

const FAQ = [
  {
    q: "C'est quoi la difference micro / SAS ?",
    a: "Micro-entreprise (anciennement auto-entrepreneur) : le statut le plus simple pour demarrer une activite en France. Plafond 77 700 € en services. Ideal pour freelances et consultants qui commencent. SAS / SASU : forme societe, plus structuree, pour ceux qui veulent grandir, embaucher ou s'associer. Si vous hesitez entre les deux, on en parle pendant l'audit gratuit.",
  },
  {
    q: "Combien de temps avant que ca serve vraiment ?",
    a: "Pour les solos : utilisable des le soir meme de la formation, transformation visible en 2-4 semaines. Pour les equipes : 30 jours pour les premiers RDV qualifies via Hermes, 14 jours pour les premiers contenus publies via Achille, 21 jours pour passer 60 % des tickets en mode autonome via Hestia.",
  },
  {
    q: "Mes donnees restent en Union europeenne ?",
    a: "Oui par defaut. Tous les agents et outils tournent sur des modeles hebergees Europe (Mistral, Claude region UE) ou via passerelles a garanties contractuelles. Variante 100 % souveraine sur demande pour les secteurs reglementes.",
  },
  {
    q: "Combien ca coute pour une boite de 5-20 personnes ?",
    a: "Selon la combinaison choisie : formation a partir de 1 290 € la journee intra, agent IA a partir de 3 900 € setup + 590 €/mois. Devis chiffre apres l'audit gratuit, en fonction de vos volumes et de votre stack.",
  },
  {
    q: "Un agent peut-il vraiment remplacer une personne ?",
    a: "Non. Un agent prend la charge repetitive et mesurable (suivi, premiere reponse, prospection, contenu). Il libere votre equipe pour ce qui demande du jugement, de la relation, de la creation. La promesse, c'est ca : moins de taches a la chaine, plus de temps pour ce qui compte.",
  },
  {
    q: "Vous etes pris en charge par les OPCO ?",
    a: "Pas en direct chez TROIE — nous travaillons avec un organisme certifie Qualiopi pour les sessions intra. Sur devis, nous indiquons le format eligible et le partenaire OF qui prend la prise en charge en main.",
  },
];

export default function IaLandingPage() {
  return (
    <article className="min-h-screen bg-[var(--bg)]">
      {/* Top bar — minimal */}
      <header className="relative z-20 border-b border-[var(--rule)] bg-[var(--bg)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12">
          <div className="flex items-baseline gap-3">
            <span className="t-display text-xl text-[var(--fg)] md:text-2xl">TROIE</span>
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

      {/* Hero — fullbleed video bg + cream veil + ink text on top */}
      <section className="relative isolate overflow-hidden border-b border-[var(--rule)]">
        <HeroVideoBg />
        {/* Cream veil so the body copy stays readable */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[var(--bg)]/75"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-2/3 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/70 to-transparent"
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-24 md:px-12 md:pt-40 md:pb-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Formations & agents IA pour les pros
          </p>
          <h1 className="t-display mt-8 max-w-4xl text-5xl text-[var(--fg)] md:text-7xl lg:text-[96px]">
            Multipliez votre
            <br />
            temps. Pas vos heures.
          </h1>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)]/90 md:text-lg">
            Arretez d'executer, devenez manager. Avancez 5x plus vite sur vos
            taches chronophages, sans perdre votre identite ni votre niveau de
            service. Pour les indeps qui veulent gagner du temps, pour les
            equipes qui veulent gagner en precision.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Reserver 30 min d'audit gratuit
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#solo"
              className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 transition-colors hover:text-[var(--accent)]"
            >
              Indep / micro →
            </a>
            <a
              href="#pro"
              className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 transition-colors hover:text-[var(--accent)]"
            >
              Marques / boites →
            </a>
          </div>
        </div>
      </section>

      {/* Animated stat band — counters trigger on scroll */}
      <section className="border-b border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <ul className="grid gap-12 md:grid-cols-4 md:gap-8">
            {STATS.map((s) => (
              <li key={s.label} className="flex flex-col">
                <span className="t-display text-5xl text-[var(--fg)] md:text-7xl">
                  <AnimatedNumber value={s.value} suffix={s.suffix} />
                </span>
                <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SOLO / MICRO / AUTO-ENTREPRENEUR
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="solo" className="border-b border-[var(--rule)] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Pour les indeps · micro · auto-entrepreneurs
              </p>
              <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-6xl lg:text-7xl">
                Arretez d'executer.
                <br />
                Devenez manager.
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                Vous etes seul a porter tout : la prospection, la production,
                les devis, le SAV, la compta, les reseaux. L'IA, bien configuree
                avec vous, n'enleve pas votre signature. Elle vous rend les
                heures qu'on n'a plus quand on est solo.
              </p>
              <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                <strong className="text-[var(--fg)]">Avancez 5x plus vite</strong> sur tout ce
                qui n'est pas votre vrai metier. Concentrez-vous sur le geste,
                la relation, la creation. Laissez l'IA prendre le reste.
              </p>

              {/* Mini-glossaire status */}
              <div className="mt-12 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2">
                <div className="bg-[var(--bg)] p-6 md:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    Micro-entreprise
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                    Anciennement auto-entrepreneur. Le statut le plus simple
                    pour demarrer. Plafond 77 700 € en services. Ideal solo.
                  </p>
                </div>
                <div className="bg-[var(--bg)] p-6 md:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    SAS · SASU
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                    Forme societe. Plus structuree, pour ceux qui veulent
                    grandir, embaucher, s'associer ou lever des fonds.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 packs solo */}
          <div className="mt-20 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-28 md:grid-cols-3">
            {SOLO_PACKS.map((p) => (
              <div key={p.title} className="flex h-full flex-col bg-[var(--bg)] p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {p.badge}
                </p>
                <h3 className="t-display mt-4 text-3xl text-[var(--fg)] md:text-4xl">{p.title}</h3>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                  {p.duration}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                  {p.body}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {p.bullets.map((b) => (
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
                <div className="mt-10 border-t border-[var(--rule)] pt-6">
                  <p className="t-display text-2xl text-[var(--fg)] md:text-3xl">{p.price}</p>
                  <a
                    href={CAL_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-6 inline-flex w-full items-center justify-center gap-3 bg-[var(--fg)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
                  >
                    Reserver
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PRO / MARQUES / BOITES
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="pro" className="border-b border-[var(--rule)] bg-[var(--bg-2)] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Pour les marques · equipes · entreprises
              </p>
              <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-6xl lg:text-7xl">
                Plus de data,
                <br />
                plus de precision.
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                Vos equipes ont accumule des annees de contenus, de clients, de
                tickets, de prospects. C'est le carburant ideal pour des agents
                IA bien configures.{" "}
                <strong className="text-[var(--fg)]">Plus vous avez de
                donnees, plus c'est precis.</strong>{" "}
                Moins votre equipe perd de temps sur des taches a la chaine.
              </p>
              <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                On forme vos equipes a maitriser les outils, on deploie des
                agents qui prennent la charge mesurable. Reste pour vous : la
                strategie, la relation, le geste qui fait la difference.
              </p>

              <div className="mt-12 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-3">
                <div className="bg-[var(--bg)] p-6 md:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    SEO
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)]">
                    Referencement Google organique, contenus optimises a echelle.
                  </p>
                </div>
                <div className="bg-[var(--bg)] p-6 md:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    SEA
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)]">
                    Google Ads, Meta, LinkedIn. Campagnes structurees, A/B au
                    quotidien.
                  </p>
                </div>
                <div className="bg-[var(--bg)] p-6 md:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    GEO
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)]">
                    Apparaitre dans ChatGPT, Claude, Perplexity. La nouvelle
                    porte d'entree.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 packs entreprises */}
          <div className="mt-20 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-28 md:grid-cols-3">
            {PRO_PACKS.map((p) => (
              <div key={p.title} className="flex h-full flex-col bg-[var(--bg)] p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {p.badge}
                </p>
                <h3 className="t-display mt-4 text-3xl text-[var(--fg)] md:text-4xl">{p.title}</h3>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                  {p.duration}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                  {p.body}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {p.bullets.map((b) => (
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
                <div className="mt-10 border-t border-[var(--rule)] pt-6">
                  <p className="t-display text-2xl text-[var(--fg)] md:text-3xl">{p.price}</p>
                  <Link
                    href={p.cta.href}
                    className="group mt-6 inline-flex w-full items-center justify-center gap-3 bg-[var(--fg)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
                  >
                    {p.cta.label}
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Agents IA cross-link */}
          <div className="mt-20 border-t border-[var(--rule)] pt-16 md:mt-28 md:pt-20">
            <div className="grid gap-12 md:grid-cols-12 md:gap-20">
              <div className="md:col-span-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  Et 3 agents IA cle en main
                </p>
                <h3 className="t-display mt-6 text-3xl text-[var(--fg)] md:text-5xl">
                  Hermes. Achille. Hestia.
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                  Trois agents pretes a deployer : Hermes prospecte et qualifie,
                  Achille produit vos contenus on-brand, Hestia gere votre
                  service client en 5 langues 24/7. Setup, supervision humaine
                  30 jours, sortie propre garantie.
                </p>
                <Link
                  href={`${MAIN_SITE}/fr/agents`}
                  className="group mt-10 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Decouvrir les 3 agents
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TASKS GRID — ce que l'IA fait pour vous tous les jours
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Tous les jours
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-6xl lg:text-7xl">
            12 taches que l'IA prend en charge.
          </h2>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Une heure economisee ici, deux la, trois par jour. Au bout d'un
            mois, vous avez retrouve la moitie de votre temps. C'est ca, la
            promesse — concrete, mesurable, par tache.
          </p>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-20 md:grid-cols-3">
            {TASKS.map((task, i) => (
              <div key={task.title} className="bg-[var(--bg)] p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-[28px]">
                  {task.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-[15px]">
                  {task.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          COMMENT CA MARCHE — 4 etapes
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            La methode
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Quatre etapes, jamais plus.
          </h2>

          <ol className="mt-16 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-x-16 md:gap-y-14 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="border-t border-[var(--rule)] pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")} ·
                </p>
                <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-[28px]">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FAQ
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
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

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FINAL CTA — full orange
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
          <div className="grid gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-8">
              <h2 className="t-display text-4xl text-[var(--fg)] md:text-7xl">
                Trente minutes pour parler de votre cas.
              </h2>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/90 md:text-lg">
                Sans engagement. On regarde ensemble si l'IA est rentable chez
                vous, on chiffre, on ecrit. Y compris si la reponse est non.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:opacity-70"
                >
                  Reserver l'audit gratuit
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="mailto:contact@troiestudio.fr"
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 transition-colors hover:text-[var(--fg)]"
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
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
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
