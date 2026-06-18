import Link from "next/link";
import { AnimatedNumber } from "./AnimatedNumber";
import { HeroVideoBg } from "./HeroVideoBg";
import { GrowthCurve } from "./GrowthCurve";
import { Header } from "@/components/Header";
import { FormationsFooter } from "@/components/FormationsFooter";

const MAIN_SITE = "https://troiestudio.fr";
const CAL_URL = "https://cal.com/hugueslourmieres";

/* ─────────────────────────────────────────────────────────────────────
   Sources vérifiées (juin 2026), gains de productivite réels marketing
   - Etudes marketing solopreneurs 2026 (Mirra, AgentMinds, Enrich Labs) :
     médiane 15 a 27 h/sem récupérées sur la com + ads + reporting
   - Nielsen Norman Group : -60 a -70 % sur le temps de production
     créatif avec IA (design, copies, landings)
   - AgencyAnalytics 2026 : reporting GA4 hebdo passé de 5 h a 30 min
   - Datagrid 2026 : veille concurrentielle automatisée = 30 a 60 h/mois
   - Unicorn Platform 2026 : landing complète en 5 a 30 min vs 2 jours
   - Adoption freelance 2026 : 84 % utilisent l'IA (vs 41 % en 2023)
   ───────────────────────────────────────────────────────────────────── */

const STATS = [
  {
    value: 2,
    prefix: "× ",
    suffix: "",
    label: "Impact par collaborateur sur les tâches automatisables",
    détail: "Médiane etudes marketing solopreneurs 2026",
  },
  {
    value: 60,
    prefix: "+",
    suffix: " %",
    label: "De capacite équipe sans recruter un seul poste",
    détail: "3 jours par semaine gagnes par membre",
  },
  {
    value: 21,
    suffix: " h",
    label: "Libérées par semaine, par poste",
    détail: "Pour la stratégie, la création, la décision",
  },
  {
    value: -70,
    suffix: " %",
    label: "Sur le temps de production des créatifs",
    détail: "Nielsen Norman Group, design assiste IA",
  },
];

const SOLO_PACKS = [
  {
    badge: "Pack 01",
    title: "Découverte solo.",
    duration: "1/2 journée · 4 h",
    price: "À partir de 290 €",
    body:
      "Vous partez de zero. On installé les bons outils, on apprend la méthode, on construit ensemble votre première bibliothèque de prompts adaptée à votre activite.",
    bullets: [
      "Bibliothèque de 25 prompts pour votre métier",
      "ChatGPT, Claude, Gemini : usage avancé",
      "Méthode de prompting structurée",
    ],
  },
  {
    badge: "Pack 02",
    title: "Atelier perso.",
    duration: "1 journée · 7 h",
    price: "À partir de 590 €",
    body:
      "Un workflow IA construit avec vous, sur votre activite réelle. Vous repartez avec votre boite a outils, pas une présentation generique.",
    bullets: [
      "Audit de vos tâches a forte valeur a déléguer",
      "Workflow IA documenté, calque sur votre métier",
      "Templates : devis, emails, posts, visuels",
    ],
  },
  {
    badge: "Pack 03",
    title: "Suivi 30 jours.",
    duration: "1 mois · 8 h de coaching",
    price: "À partir de 1 290 €",
    body:
      "Un agent IA dedie sur votre cas + 2 sessions de 1 h par semaine pour ajuster. Vous passez de l'experimentation à la maîtrise sereine.",
    bullets: [
      "Agent IA configuré sur votre activite réelle",
      "2 sessions de coaching par semaine",
      "Joignable à tout moment pendant 30 jours",
    ],
  },
];

const PRO_PACKS = [
  {
    badge: "Formation 01",
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M13 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    title: "Découverte équipe.",
    duration: "1/2 journée · jusqu'à 10 pers.",
    price: "Sur devis",
    body:
      "Fondamentaux IA pour toute l'équipe. ChatGPT, Claude, Gemini. Méthode de prompting, hygiene des données, bibliothèque de prompts partagée.",
    bullets: [
      "Méthode de prompting structurée",
      "Bibliothèque de prompts collective",
      "Plan d'usage par métier (commercial, marketing, support)",
    ],
    cta: { label: "Voir le programme", href: `${MAIN_SITE}/fr/formations` },
  },
  {
    badge: "Formation 02",
    icon: "m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z",
    title: "Pratique créative.",
    duration: "1 journée · jusqu'à 8 pers.",
    price: "Sur devis",
    body:
      "Production & création IA pour les équipes marketing, com', création. Midjourney, Sora, Veo, Runway. Vous repartez avec un workflow reproductible.",
    bullets: [
      "Génération image et vidéo on-brand",
      "Intégration au workflow créatif existant",
      "Droits, mentions, limites juridiques",
    ],
    cta: { label: "Voir le programme", href: `${MAIN_SITE}/fr/formations` },
  },
  {
    badge: "Formation 03",
    icon: "M12 8V4H8M4 8h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zM2 14h2M20 14h2M15 13v2M9 13v2",
    title: "Agents IA & automatisation.",
    duration: "2 journées · jusqu'à 6 pers.",
    price: "Sur devis",
    body:
      "Make, n8n, Zapier. Conception et déploiement d'agents IA sur vos cas réels. 1 a 2 automatisations en production à la sortie de la formation.",
    bullets: [
      "Conception d'agents IA : mémoire, garde-fous",
      "1 a 2 automatisations en production",
      "Gouvernance et privacy-by-design",
    ],
    cta: { label: "Voir le programme", href: `${MAIN_SITE}/fr/formations` },
  },
];

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

/* Les 12 travaux : tâches modernes adossées aux gravures Tempesta (1608, MET,
   domaine public). Chaque carte porte le nom du travail mythologique en
   sous-titre + la gravure en bandeau N&B. */
const TASKS = [
  {
    title: "Vos emails",
    time: "26 min / jour",
    body: "Réponses pros calées dans votre voix. Première réponse en 3 secondes.",
    image: "/images/travaux/01_lion-nemee.jpg",
    labor: "Le Lion de Némée",
    icon: "M22 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2m20 0v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7m20 0-10 7L2 7",
  },
  {
    title: "Vos posts sociaux",
    time: "5 h / semaine",
    body: "LinkedIn, Instagram, TikTok. Un sujet, cinq formats sortants prêts à publier.",
    image: "/images/travaux/02_hydre-lerne.jpg",
    labor: "L'Hydre de Lerne",
    icon: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
  },
  {
    title: "Vos devis et factures",
    time: "3 à 5 h / semaine",
    body: "Générés, envoyés, relances automatiques. Plus jamais oubliés.",
    image: "/images/travaux/03_biche-cerynie.jpg",
    labor: "La Biche de Cérynie",
    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  },
  {
    title: "Votre prospection",
    time: "5 à 10 h / semaine",
    body: "Listes qualifiées, mails personnalisés ciblage par ciblage.",
    image: "/images/travaux/04_sanglier-erymanthe.jpg",
    labor: "Le Sanglier d'Érymanthe",
    icon: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  },
  {
    title: "Vos visuels et illustrations",
    time: "Quelques secondes",
    body: "Génération image on-brand, votre charte respectée.",
    image: "/images/travaux/05_juments-diomede.jpg",
    labor: "Les Juments de Diomède",
    icon: "M3 3h18v18H3zM21 15l-5-5L5 21",
  },
  {
    title: "Votre service client",
    time: "40 % en autonomie",
    body: "Première réponse en moins d'une minute, 24/7, en cinq langues.",
    image: "/images/travaux/06_geryon.jpg",
    labor: "Les Bœufs de Géryon",
    icon: "M3 12a9 9 0 0 1 18 0M3 12v5a2 2 0 0 0 2 2h2v-7H3M21 12v5a2 2 0 0 1-2 2h-2v-7h4",
  },
  {
    title: "Votre reporting",
    time: "Chaque lundi matin",
    body: "Synthèse automatique de vos chiffres, livrée sans intervention.",
    image: "/images/travaux/07_pommes-hesperides.jpg",
    labor: "Les Pommes des Hespérides",
    icon: "M3 3v18h18M7 16V10M12 16V6M17 16v-4",
  },
  {
    title: "Votre veille marché",
    time: "Sur demande",
    body: "Concurrents, tendances, signaux faibles. Résumés pertinents en 30 sec.",
    image: "/images/travaux/08_cerbere.jpg",
    labor: "Cerbère",
    icon: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  },
  {
    title: "Vos sous-titrages vidéo",
    time: "Automatique",
    body: "Réels et lives sous-titrés et traduits en cinq langues.",
    image: "/images/travaux/09_serpents-berceau.jpg",
    labor: "Les Serpents au berceau",
    icon: "M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM7 13h4M13 13h4M7 16h2M11 16h6",
  },
  {
    title: "Vos briefs créatifs",
    time: "30 sec",
    body: "Moodboards, références, scripts. Prêts à passer en prod.",
    image: "/images/travaux/10_nessus.jpg",
    labor: "Nessus",
    icon: "M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7zM9 21h6",
  },
  {
    title: "Vos traductions",
    time: "Instantanées",
    body: "Voix de marque conservée dans 5 langues.",
    image: "/images/travaux/11_centaures.jpg",
    labor: "Les Centaures",
    icon: "M2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0zM2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10M12 2a15 15 0 0 0-4 10 15 15 0 0 0 4 10",
  },
  {
    title: "Vos analyses de données",
    time: "Tableurs en minutes",
    body: "Vos CSV, vos Excel. Lus, croisés, expliqués en clair.",
    image: "/images/travaux/12_achelous.jpg",
    labor: "Achéloos",
    icon: "M3 3v18h18M7 14l4-4 4 4 5-5",
  },
];

const STEPS = [
  {
    title: "Audit gratuit · 30 min.",
    body: "On regarde vos tâches reelles. Réponse claire, chiffree, écrite, sous 48 h.",
    img: "/images/corpo/strategie/DSC_5552-4.jpg",
  },
  {
    title: "Setup & formation.",
    body: "On configuré les outils sur vos cas concrets. On formé votre équipe avec vos données, votre voix.",
    img: "/images/corpo/montpellier/DSC_7573.jpg",
  },
  {
    title: "Production supervisee.",
    body: "Pendant 30 jours, on accompagne les premières semaines. Ajustements continus, transfert progressif.",
    img: "/images/corpo/mibi/DSC_7665.jpg",
  },
  {
    title: "Autonomie complète.",
    body: "Vos workflows, vos prompts, vos accès. Tout vous appartient. Sortie propre, sans lock-in.",
    img: "/images/corpo/barcelona/13Hugues-Nikon-35mm.jpg",
  },
];

const FAQ = [
  {
    q: "C'est quoi la difference micro-entreprise et SAS ?",
    a: "Micro-entreprise (anciennement auto-entrepreneur) : le statut le plus simple pour démarrer. Plafond 77 700 € en services, comptabilite allegee. Idéal pour freelances et consultants qui commencent. SAS / SASU : formé societe, plus structurée, pour ceux qui veulent grandir, embaucher, s'associer ou lever des fonds. Si vous hésitez, on en parle pendant l'audit gratuit.",
  },
  {
    q: "Concretement, je gagne combien de temps ?",
    a: "Les chiffres officiels 2026 : 8 heures par semaine en moyenne pour les freelances actifs avec l'IA, jusqu'à 10-15 heures pour les marketers en équipe. Sur les emails, 26 minutes par jour récupérées rien que la. Sur la prospection ciblée, 5 a 10 heures par semaine. Le 5x s'applique aux tâches automatisables (drafts, première réponse, posts, prospection), pas à votre métier de fond.",
  },
  {
    q: "Combien de temps avant que ça serve vraiment ?",
    a: "Pour les solos : utilisable des le soir même de la formation. Résultats mesurables sous 2 semaines. Pour les équipes : 14 jours pour les premiers contenus publiés via Achille, 21 jours pour passer 60 % des tickets en mode autonome via Hestia, 30 jours pour les premiers RDV qualifiés via Hermes.",
  },
  {
    q: "Mes données restent en Union europeenne ?",
    a: "Oui par defaut. Tous les agents et outils tournent sur des modèles hebergees Europe (Mistral, Claude region UE) ou via passerelles a garanties contractuelles. Variante 100 % souveraine sur demandé pour les secteurs reglementes.",
  },
  {
    q: "Un agent peut-il vraiment remplacer une personne ?",
    a: "Non, et c'est volontaire. Un agent prend la charge répétitive et mesurable (suivi, première réponse, prospection, contenu). Il libéré votre équipe pour ce qui demandé du jugement, de la relation, de la création. La promesse, c'est ça : moins de tâches à la chaine, plus de temps pour ce qui compte.",
  },
  {
    q: "Vous êtes pris en charge par les OPCO ?",
    a: "Pas en direct chez TROIE, nous travaillons avec un organisme certifie Qualiopi pour les sessions intra. Sur devis, nous indiquons le format eligible et le partenaire OF qui prend la prise en charge en main.",
  },
];

export default function IaLandingPage() {
  return (
    <article className="min-h-screen bg-[var(--bg)]">
      {/* Navbar standard du site : navigation + connexion */}
      <Header locale="fr" />

      {/* Hero, vidéo bg + cream veil. Pas de sceau : pitch direct, équipe boostee. */}
      <section className="relative isolate overflow-hidden border-b border-[var(--rule)]">
        <HeroVideoBg />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[var(--bg)]/75"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-2/3 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/70 to-transparent"
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-24 md:px-12 md:pt-40 md:pb-36">
          <div className="grid gap-16 md:grid-cols-12 md:gap-12 lg:gap-20">
            {/* Col gauche : punchline */}
            <div className="md:col-span-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Pour solo · équipes · entreprises
              </p>
              <h1 className="t-display mt-8 text-5xl text-[var(--fg)] md:text-6xl lg:text-[80px] xl:text-[92px]">
                Multipliez vos bénéfices,{" "}
                <span className="text-[var(--accent)]">grâce à l'IA.</span>
              </h1>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/90 md:text-lg">
                <strong className="text-[var(--fg)]">Vos equipes deviennent des super-heros.</strong>{" "}
                Solo, freelance, équipe ou entreprise : trois jours par semaine
                récupérés, capacite doublee sans embaucher. Formations courtes
                et agents IA prêts à l'emploi. Sans changer de métier, sans
                grosse facture.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Réserver 30 min d'audit gratuit
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
                  Marques / équipes →
                </a>
              </div>
            </div>

            {/* Col droite : courbe + logos + metriques */}
            <div className="md:col-span-6 md:pt-8">
              <GrowthCurve />
            </div>
          </div>
        </div>
      </section>

      {/* Stat band supprimee, les chiffres vérifiés sont desormais
          dans la GrowthCurve du hero, pour éviter la redondance. */}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SOLO / MICRO / AUTO-ENTREPRENEUR
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="solo" className="border-t border-[var(--rule)] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Pour les indeps · micro · auto-entrepreneurs
              </p>
              <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-6xl lg:text-7xl">
                Concentrez-vous sur le geste.
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                Vous êtes seul à tout porter : prospection, production, devis,
                SAV, compta, reseaux. L'IA bien configurée avec vous, n'enleve
                pas votre signature. Elle vous rend les heures qu'on n'a plus
                quand on est solo.
              </p>
              <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                <strong className="text-[var(--fg)]">8 heures par semaine
                récupérées</strong> en moyenne sur les freelances actifs avec
                l'IA en 2026. Une journée complète par semaine pour respirer,
                créer, vivre.
              </p>

              {/* Mini-glossaire statuts avec pictogrammes Lucide */}
              <div className="mt-12 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2">
                <div className="bg-[var(--bg)] p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    {/* Pictogramme : personne seule (auto-entrepreneur) */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-[var(--accent)]"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
                    </svg>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                      Micro-entreprise
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                    Anciennement auto-entrepreneur. Le statut le plus simple
                    pour démarrer. Plafond 77 700 € en services. Idéal solo.
                  </p>
                </div>
                <div className="bg-[var(--bg)] p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    {/* Pictogramme : building / societe */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-[var(--accent)]"
                      aria-hidden="true"
                    >
                      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                      <path d="M10 6h4" />
                      <path d="M10 10h4" />
                      <path d="M10 14h4" />
                      <path d="M10 18h4" />
                    </svg>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                      SAS · SASU
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                    Formé societe. Plus structurée, pour ceux qui veulent
                    grandir, embaucher, s'associer ou lever des fonds.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 packs solo, chaque pack un fond différent (Pack 04 below) */}
          <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-3 md:gap-8">
            {SOLO_PACKS.map((p, i) => {
              // Palette : Pack 01 sable doux, Pack 02 brun terre, Pack 03 noir nuit
              const themes = [
                {
                  card: "bg-[#ede3d0] text-[#1a1714]",
                  border: "border-[#1a1714]/10",
                  rule: "border-[#1a1714]/15",
                  body: "text-[#1a1714]/75",
                  meta: "text-[#1a1714]/55",
                  cta: "bg-[#1a1714] text-[#f5f0e6] hover:bg-[var(--accent)]",
                },
                {
                  card: "bg-[#5a4a3a] text-[#f5f0e6]",
                  border: "border-[#f5f0e6]/10",
                  rule: "border-[#f5f0e6]/15",
                  body: "text-[#f5f0e6]/80",
                  meta: "text-[#f5f0e6]/55",
                  cta: "bg-[var(--accent)] text-[#1a1714] hover:bg-[#f5f0e6]",
                },
                {
                  card: "bg-[#1a1714] text-[#f5f0e6]",
                  border: "border-[#f5f0e6]/15",
                  rule: "border-[#f5f0e6]/15",
                  body: "text-[#f5f0e6]/80",
                  meta: "text-[#f5f0e6]/55",
                  cta: "bg-[var(--accent)] text-[#1a1714] hover:bg-[#f5f0e6]",
                },
              ];
              const t = themes[i % themes.length];
              // 1 bandeau 16:9 N&B par pack
              const banners = [
                // Pack 01 Découverte solo : une personne seule, sur ordinateur
                "/images/ia-packs/solo-pc.jpg",
                "/images/corpo/montpellier/DSC_7603.jpg",
                "/images/corpo/montpellier/DSC_7604.jpg",
              ];
              const banner = banners[i % banners.length];
              return (
                <div
                  key={p.title}
                  className={`flex h-full flex-col overflow-hidden rounded-sm border ${t.border} ${t.card} transition-transform hover:-translate-y-1`}
                >
                  {/* Bandeau 16:9 N&B */}
                  <div className="relative aspect-video overflow-hidden bg-[var(--fg)]/10">
                    {/* eslint-disable-next-line @next/next/no-img-élément */}
                    <img
                      src={banner}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      style={{ filter: "grayscale(1) contrast(1.05)" }}
                    />
                  </div>

                  <div className="flex h-full flex-col p-8 md:p-10">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
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
                          className={`flex items-start gap-3 text-sm leading-relaxed md:text-[15px] ${t.body}`}
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
                    <div className={`mt-10 border-t pt-6 ${t.rule}`}>
                      <p className="t-display text-2xl md:text-3xl">{p.price}</p>
                      <a
                        href={CAL_URL}
                        target="_blank"
                        rel="noreferrer"
                        className={`group mt-6 inline-flex w-full items-center justify-center gap-3 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${t.cta}`}
                      >
                        Réserver
                        <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pack Complet Solo, featured full-width orange Hermes, after 3 packs */}
          <div className="mt-16 overflow-hidden rounded-sm bg-[var(--accent)] text-[#1a1714] md:mt-20">
            <div className="grid gap-0 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="relative h-64 md:h-full">
                  {/* eslint-disable-next-line @next/next/no-img-élément */}
                  <img
                    src="/images/corpo/barcelona/13Hugues-Nikon-35mm.jpg"
                    alt=""
                    className="h-full w-full object-cover"
                    style={{ filter: "grayscale(1) contrast(1.05)" }}
                  />
                </div>
              </div>
              <div className="flex flex-col p-8 md:col-span-7 md:p-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714]/85">
                  Pack 04 · Le complet
                </p>
                <h3 className="t-display mt-4 text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
                  Tout en un. Solo, formation &amp; agent.
                </h3>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714]/65">
                  1 mois · 12 h de coaching · agent inclus
                </p>
                <p className="mt-6 text-base leading-relaxed text-[#1a1714]/85 md:text-lg">
                  La formule la plus complète : audit, formation, bibliothèque de 100 prompts, un agent IA configuré sur votre cas réel, et 12 h de coaching reparties sur 30 jours.
                </p>
                <ul className="mt-6 grid gap-2.5 md:grid-cols-2">
                  {[
                    "Audit + plan de déploiement 360°",
                    "Bibliothèque 100 prompts métier",
                    "1 agent IA configuré + supervisé",
                    "12 h de coaching sur 30 jours",
                    "Hotline directe pendant 30 jours",
                    "Workflows Make / Zapier livres",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-[#1a1714]/85 md:text-[15px]">
                      <span aria-hidden="true" className="mt-[10px] inline-block h-[3px] w-3 flex-shrink-0 bg-[#1a1714]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-[#1a1714]/20 pt-6">
                  <p className="t-display text-3xl md:text-4xl">À partir de 2 490 €</p>
                  <a
                    href={CAL_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 bg-[#1a1714] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:bg-[#f5f0e6] hover:text-[#1a1714]"
                  >
                    Réserver
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PRO / MARQUES / BOITES
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="pro" className="relative isolate overflow-hidden border-t border-[var(--rule)] bg-[var(--bg-2)] scroll-mt-24">
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Pour les marques · équipes · entreprises
              </p>
              <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-6xl lg:text-7xl">
                Multipliez votre précision.
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                Vos équipes ont accumule des années de contenus, de clients, de
                tickets, de prospects. C'est le carburant idéal pour des agents
                IA bien configurés.{" "}
                <strong className="text-[var(--fg)]">Plus vous avez de
                données, plus le résultat est précis.</strong>
              </p>
              <p className="mt-6 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                On formé vos équipes a maîtriser les outils, on déploie des
                agents qui prennent les charges mesurables. Reste pour vous : la
                stratégie, la relation, le geste qui fait la difference.
              </p>

              {/* SEO / SEA / GEO avec logos + chiffres animes */}
              <div className="mt-12 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-3">
                {/* SEO */}
                <div className="bg-[var(--bg)] p-6 md:p-8">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                      SEO
                    </p>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--fg-2)]/55">
                      Organique
                    </span>
                  </div>
                  <p className="t-display mt-4 text-3xl text-[var(--fg)] md:text-4xl">
                    <AnimatedNumber value={180} prefix="+" suffix=" %" duration={1500} />
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                    Trafic en 6 mois
                  </p>
                  {/* Logos */}
                  <div className="mt-5 flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-élément */}
                    <img src="/images/logos/google-analytics.svg" alt="Google Analytics" className="h-5 w-auto opacity-80" style={{ filter: "grayscale(1)" }} />
                    {/* eslint-disable-next-line @next/next/no-img-élément */}
                    <img src="/images/logos/semrush.svg" alt="Semrush" className="h-5 w-auto opacity-80" style={{ filter: "grayscale(1)" }} />
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-[var(--fg-2)]">
                    Référencement Google organique, contenus optimisés a grande
                    echelle.
                  </p>
                </div>

                {/* SEA */}
                <div className="bg-[var(--bg)] p-6 md:p-8">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                      SEA
                    </p>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--fg-2)]/55">
                      Payant
                    </span>
                  </div>
                  <p className="t-display mt-4 text-3xl text-[var(--fg)] md:text-4xl">
                    <AnimatedNumber value={3} prefix="× " duration={1500} />
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                    ROAS sur 90 jours
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-élément */}
                    <img src="/images/logos/google-ads.svg" alt="Google Ads" className="h-5 w-auto opacity-80" style={{ filter: "grayscale(1)" }} />
                    {/* eslint-disable-next-line @next/next/no-img-élément */}
                    <img src="/images/logos/meta.svg" alt="Meta" className="h-5 w-auto opacity-80" style={{ filter: "grayscale(1)" }} />
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-[var(--fg-2)]">
                    Google Ads, Meta, LinkedIn. Campagnes structurees, A/B
                    quotidien.
                  </p>
                </div>

                {/* GEO */}
                <div className="bg-[var(--bg)] p-6 md:p-8">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                      GEO
                    </p>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--fg-2)]/55">
                      LLM
                    </span>
                  </div>
                  <p className="t-display mt-4 text-3xl text-[var(--fg)] md:text-4xl">
                    <AnimatedNumber value={42} prefix="+" suffix=" %" duration={1500} />
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                    Visibilite dans les LLM
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-élément */}
                    <img src="/images/logos/chatgpt.svg" alt="ChatGPT" className="h-5 w-auto opacity-80" style={{ filter: "grayscale(1)" }} />
                    {/* eslint-disable-next-line @next/next/no-img-élément */}
                    <img src="/images/logos/claude.svg" alt="Claude" className="h-5 w-auto opacity-80" style={{ filter: "grayscale(1)" }} />
                    {/* eslint-disable-next-line @next/next/no-img-élément */}
                    <img src="/images/logos/perplexity.svg" alt="Perplexity" className="h-5 w-auto opacity-80" style={{ filter: "grayscale(1)" }} />
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-[var(--fg-2)]">
                    Apparaître dans ChatGPT, Claude, Perplexity. La nouvelle
                    porté d'entree.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pack Complet Pro, featured noir/orange */}
          <div className="mt-20 overflow-hidden rounded-sm bg-[#1a1714] text-[#f5f0e6] md:mt-28">
            <div className="grid gap-0 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="relative h-64 md:h-full">
                  {/* eslint-disable-next-line @next/next/no-img-élément */}
                  <img
                    src="/images/corpo/mibi/_DSC7503.jpg"
                    alt=""
                    className="h-full w-full object-cover"
                    style={{ filter: "grayscale(1) contrast(1.05)" }}
                  />
                </div>
              </div>
              <div className="flex flex-col p-8 md:col-span-7 md:p-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  Formation 04 · Le complet
                </p>
                <h3 className="t-display mt-4 text-4xl md:text-5xl lg:text-6xl">
                  Déploiement IA équipe & agents.
                </h3>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#f5f0e6]/60">
                  3 jours · jusqu'à 15 pers. · 3 agents inclus
                </p>
                <p className="mt-6 text-base leading-relaxed text-[#f5f0e6]/85 md:text-lg">
                  Le programme complet pour une équipe : formation collective, audit de vos processus, déploiement de 3 agents IA (Hermes, Achille, Hestia ou personnalisés), workflows et gouvernance.
                </p>
                <ul className="mt-6 grid gap-2.5 md:grid-cols-2">
                  {[
                    "Formation 3 j · 15 personnes max",
                    "Audit complet de vos processus",
                    "3 agents IA configurés et livres",
                    "Workflows Make / Zapier / n8n",
                    "Gouvernance, sécurité, RGPD",
                    "Suivi 90 jours post-déploiement",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-[#f5f0e6]/85 md:text-[15px]">
                      <span aria-hidden="true" className="mt-[10px] inline-block h-[3px] w-3 flex-shrink-0 bg-[var(--accent)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-[#f5f0e6]/15 pt-6">
                  <p className="t-display text-3xl md:text-4xl">Sur devis</p>
                  <Link
                    href={`${MAIN_SITE}/fr/contact`}
                    className="group inline-flex items-center gap-3 bg-[var(--accent)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[#f5f0e6] hover:text-[#1a1714]"
                  >
                    Demander un devis
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 3 formations pro, chaque box un fond différent */}
          <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3 md:gap-8">
            {PRO_PACKS.map((p, i) => {
              // Palette pro : Form 01 lin clair, Form 02 taupe, Form 03 orange Hermes
              const themes = [
                {
                  card: "bg-[#ebe2cf] text-[#1a1714]",
                  border: "border-[#1a1714]/10",
                  rule: "border-[#1a1714]/15",
                  body: "text-[#1a1714]/75",
                  meta: "text-[#1a1714]/55",
                  cta: "bg-[#1a1714] text-[#f5f0e6] hover:bg-[var(--accent)]",
                },
                {
                  card: "bg-[#7a6753] text-[#f5f0e6]",
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
                  meta: "text-[#1a1714]/60",
                  cta: "bg-[#1a1714] text-[#f5f0e6] hover:bg-[#f5f0e6] hover:text-[#1a1714]",
                },
              ];
              const t = themes[i % themes.length];
              return (
                <div
                  key={p.title}
                  className={`flex h-full flex-col rounded-sm border ${t.border} ${t.card} p-8 transition-transform hover:-translate-y-1 md:p-10`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`font-mono text-[11px] uppercase tracking-[0.22em] ${i === 2 ? "text-[#1a1714]" : "text-[var(--accent)]"}`}>
                      {p.badge}
                    </p>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`h-7 w-7 ${i === 2 ? "text-[#1a1714]" : "text-[var(--accent)]"}`}
                      aria-hidden="true"
                    >
                      <path d={p.icon} />
                    </svg>
                  </div>
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
                        className={`flex items-start gap-3 text-sm leading-relaxed md:text-[15px] ${t.body}`}
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
                    <Link
                      href={p.cta.href}
                      className={`group mt-6 inline-flex w-full items-center justify-center gap-3 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${t.cta}`}
                    >
                      {p.cta.label}
                      <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ÉQUIPAGE IA, Hermès / Achille / Hestia (orange Hermès)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="tone-accent border-t border-[var(--rule)] bg-[var(--bg)] text-[var(--fg)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
              Votre équipage IA · 3 agents clé en main
            </p>
            <h3 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              Hermes. Achille. Hestia.
            </h3>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              <strong className="text-[var(--fg)]">L'IA qui exécute. Pas celle qui répond.</strong>{" "}
              Vous donnez le cap, votre équipage opère : Hermes prospecte,
              Achille produit, Hestia accueille. 24/7, dans votre voix, sans
              que vous leviez le petit doigt.
            </p>

            {/* 3 portraits N&B, slider horizontal mobile, grid 3-col desktop */}
            <div className="mt-12 -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-16 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0">
              {[
                {
                  name: "Hermes",
                  role: "Prospection & qualification",
                  img: "/images/agents/hermes.jpg",
                  body: "Listes ciblées, premiers messages personnalisés, relances. Toujours dans votre voix.",
                },
                {
                  name: "Achille",
                  role: "Production de contenus",
                  img: "/images/agents/achille.jpg",
                  body: "Posts, articles, visuels, scripts. Calé sur votre charte, sortie quotidienne.",
                },
                {
                  name: "Hestia",
                  role: "Service client 24/7",
                  img: "/images/agents/hestia.jpg",
                  body: "Première réponse en moins d'une minute, 5 langues, escalade humaine sur ce qui compte.",
                },
              ].map((a) => (
                <div
                  key={a.name}
                  className="flex w-[78%] flex-shrink-0 snap-center flex-col md:w-auto"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--fg)]/5">
                    {/* eslint-disable-next-line @next/next/no-img-élément */}
                    <img
                      src={a.img}
                      alt={a.name}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      style={{ filter: "grayscale(1) contrast(1.05)" }}
                    />
                  </div>
                  <h4 className="t-display mt-6 text-3xl text-[var(--fg)] md:text-4xl">
                    {a.name}
                  </h4>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    {a.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                    {a.body}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href={`${MAIN_SITE}/fr/agents`}
              className="group mt-12 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Découvrir les 3 agents
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LES 12 TRAVAUX D'HERCULE, TASKS GRID (noir)
          Reframe éditorial : 12 travaux modernes que votre IA accomplit
          pour vous, comme Hercule pour Eurysthée. Numérotation romaine
          I → XII pour ancrer la référence mythologique.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="tone-dark border-t border-[var(--rule)] bg-[var(--bg)] text-[var(--fg)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            {/* Portrait Hercule, engravure N&B, même registre que Hermès/Achille/Hestia */}
            <div className="md:col-span-4">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--fg)]/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/agents/hercule.jpg"
                  alt="Le Grand Hercule, gravure de Hendrick Goltzius, 1589"
                  className="h-full w-full object-cover object-top"
                  style={{ filter: "grayscale(1) contrast(1.05) brightness(0.98)" }}
                />
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--fg-mute)]">
                Hercule · Goltzius, 1589
              </p>
            </div>

            {/* Titre + intro */}
            <div className="md:col-span-8 md:pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Vos douze travaux · automatiques
              </p>
              <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-6xl lg:text-7xl">
                Les 12 travaux d'Hercule.
              </h2>
              <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                Hercule accomplit douze travaux impossibles pour racheter sa
                dette. Vous, vous avez les vôtres, les tâches qui rongent vos
                semaines, qui repoussent l'essentiel. Votre équipage IA les
                prend en charge. Une heure récupérée ici, deux là, trois par
                jour. Au bout d'un mois, la moitié de votre temps retrouvée,
                concrète, mesurable, par tâche, sources vérifiables.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] md:mt-20 md:grid-cols-3">
            {TASKS.map((task, i) => (
              <Link
                key={task.title}
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Prendre rendez-vous pour automatiser : ${task.title}`}
                className="group relative block bg-[var(--bg)] p-6 transition-colors hover:bg-[var(--accent-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)] md:p-8"
              >
                {/* Gravure Tempesta 1608, MET, domaine public.
                    Zoom 15 % pour recadrer les bords blancs de la gravure,
                    filtre marron foncé uniforme, picto orange centré. */}
                <div className="relative -mx-6 -mt-6 mb-6 aspect-[3/2] overflow-hidden bg-[#1a0e05] md:-mx-8 md:-mt-8 md:mb-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={task.image}
                    alt={`${task.labor}, gravure d'Antonio Tempesta, 1608`}
                    className="h-full w-full scale-[1.15] object-cover object-center transition-transform duration-700 group-hover:scale-[1.22]"
                    style={{
                      filter: "grayscale(1) sepia(0.55) brightness(0.5) contrast(1.05)",
                    }}
                    loading="lazy"
                  />
                  {/* Filtre marron foncé uniforme */}
                  <div
                    className="absolute inset-0 bg-[#2d1a0d] opacity-50 mix-blend-multiply"
                    aria-hidden="true"
                  />
                  {/* Picto orange centré */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-14 w-14 text-[var(--accent)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-110 md:h-16 md:w-16"
                      aria-hidden="true"
                    >
                      <path d={task.icon} />
                    </svg>
                  </div>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  Travail {ROMAN[i]} · {task.labor}
                </p>
                <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-[28px]">
                  {task.title}
                </h3>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  + {task.time}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          COMMENT CA MARCHE, 4 étapes
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            La méthode
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Quatre étapes, jamais plus.
          </h2>

          <ol className="mt-16 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-x-10 md:gap-y-14 lg:grid-cols-4 lg:gap-x-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex flex-col">
                {/* Bandeau 16:9 N&B */}
                <div className="relative aspect-video overflow-hidden bg-[var(--fg)]/5">
                  {/* eslint-disable-next-line @next/next/no-img-élément */}
                  <img
                    src={step.img}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    style={{ filter: "grayscale(1) contrast(1.05)" }}
                  />
                </div>
                <div className="mt-6 border-t border-[var(--rule)] pt-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")} ·
                  </p>
                  <h3 className="t-display mt-4 text-2xl text-[var(--fg)] md:text-[28px]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--rule)]">
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

      {/* Final CTA, full orange Hermes, pitch direct */}
      <section className="tone-accent relative isolate overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--fg)]/70">
                Audit gratuit · sans engagement
              </p>
              <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-6xl lg:text-7xl">
                Trente minutes pour parler de votre cas.
              </h2>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--fg)]/85 md:text-lg">
                On regarde ensemble si l'IA est rentable chez vous, on chiffre,
                on écrit. Y compris si la réponse est non.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 bg-[#1a1714] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:bg-[#f5f0e6] hover:text-[#1a1714]"
                >
                  Réserver l'audit gratuit
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="mailto:contact@troiestudio.fr"
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)]/75 transition-colors hover:text-[var(--fg)]"
                >
                  contact@troiestudio.fr →
                </a>
              </div>
            </div>

            {/* Énorme "30" sur une image */}
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#1a1714]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/corpo/montpellier/DSC_7573.jpg"
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover opacity-70"
                  style={{ filter: "grayscale(1) contrast(1.05) brightness(0.85)" }}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-[var(--accent)] opacity-30 mix-blend-multiply" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#f5f0e6]">
                  <span className="t-display text-[140px] leading-[0.8] drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] md:text-[200px]">
                    30
                  </span>
                  <span className="mt-2 font-mono text-[12px] uppercase tracking-[0.5em]">
                    Minutes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer commun aux pages de formation */}
      <FormationsFooter />
    </article>
  );
}
