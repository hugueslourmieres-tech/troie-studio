import Link from "next/link";
import { HeroVideoBg } from "./HeroVideoBg";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { GreekMark } from "@/components/GreekMark";

/**
 * Page « Organisation et outils » (/ia, en français seulement, hors menu
 * principal). Elle est reliée depuis /accompagnement et le pied de page.
 *
 * Repositionnement du 1er/10/2026 : la stratégie d'abord, les outils
 * ensuite. L'IA est un outil parmi d'autres, jamais la promesse. Plus de
 * sous-marque « IA Pro », plus de packs pour les indépendants, plus de
 * courbe « Sans IA / Avec IA » (GrowthCurve reste dans le dépôt, hors
 * rendu) ni de mascotte.
 *
 * Cadre juridique : le studio vend du conseil et de l'accompagnement,
 * jamais de la « formation » (ni déclaration d'activité ni Qualiopi). Les
 * mots autorisés : atelier, prise en main, sensibilisation, mise en œuvre.
 *
 * Aucun prix affiché : tout passe par un devis écrit après un premier
 * échange. L'ancre id="tarifs" est gardée, des articles et /ia/ai-act y
 * renvoient.
 */

/* Plus de prise de rendez-vous (26/10/2026) : le bouton principal mène
   au formulaire de projet du site principal. */
const CAL_URL = "https://troiestudio.fr/fr/contact#projet";
const PROJECT_URL = "/fr/contact?besoin=accompagnement#projet";

/* Boutons (règle du 1er/10/2026) : sur fond crème, « Décrire mon projet » en
   orange plein, « Lancer un projet » en lien souligné. La zone cliquable
   garde au moins 48 px de haut pour le pouce. */
const BTN_BOOK =
  "group inline-flex min-h-[52px] w-full items-center justify-center gap-3 bg-[var(--accent)] sm:w-auto px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#111318] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)]";
const BTN_PROJECT =
  "group inline-flex min-h-[48px] items-center justify-center font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:text-[var(--accent)]";

/* Les trois ateliers. [À COMPLÉTER] durées et effectifs de chaque atelier,
   à valider par Hugues : le champ `duration` reste vide et n'est pas
   affiché tant qu'il ne l'est pas. */
const PRO_PACKS = [
  {
    badge: "Atelier 01",
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M13 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    title: "Prise en main en équipe.",
    duration: "",
    body:
      "Chacun apprend à utiliser les outils du quotidien sans risque pour vos données. Nous partons de vos tâches réelles.",
    bullets: [
      "Une méthode commune pour toute l'équipe",
      "Les règles d'usage et de confidentialité",
      "Un plan d'usage par métier (commercial, marketing, support)",
    ],
    cta: { label: "Décrire mon projet", href: CAL_URL },
  },
  {
    badge: "Atelier 02",
    icon: "m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z",
    title: "Création et contenus.",
    duration: "",
    body:
      "Les outils d'image et de vidéo intégrés à votre façon de créer, avec les règles de droits et de mentions.",
    bullets: [
      "Des visuels cohérents avec votre marque",
      "Intégration à votre façon de produire",
      "Droits, mentions, limites juridiques",
    ],
    cta: { label: "Décrire mon projet", href: CAL_URL },
  },
  {
    badge: "Atelier 03",
    icon: "M12 8V4H8M4 8h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zM2 14h2M20 14h2M15 13v2M9 13v2",
    title: "Automatisation.",
    duration: "",
    body:
      "Nous concevons avec vous une ou deux automatisations sur vos cas réels, avec des garde-fous.",
    bullets: [
      "Le choix des tâches à automatiser, et de celles à garder",
      "Des garde-fous et une supervision humaine",
      "Une documentation que votre équipe peut reprendre",
    ],
    cta: { label: "Décrire mon projet", href: CAL_URL },
  },
];

/* Les quatre étapes de la section #tarifs. Aucun prix : la dernière étape
   garde le style mis en avant (fond noir), sans mention « Recommandé ». */
const STEPS = [
  {
    step: "01",
    title: "Échange",
    unit: "Par écrit",
    body: "Nous écoutons votre activité et vos priorités. Vous repartez avec une première piste, avec ou sans IA.",
    featured: false,
  },
  {
    step: "02",
    title: "Diagnostic",
    unit: "Sur devis",
    body: "Nous regardons vos processus et vos outils. Nous priorisons ce qui fait gagner du temps, avec un plan daté.",
    featured: false,
  },
  {
    step: "03",
    title: "Mise en œuvre",
    unit: "Sur devis",
    body: "Nous mettons en place les outils retenus, testés et documentés. Votre équipe est accompagnée dans la prise en main.",
    featured: false,
  },
  {
    step: "04",
    title: "Suivi",
    unit: "Chaque mois",
    body: "Nous ajustons, nous maintenons et nous faisons le point avec vous.",
    featured: true,
  },
];

/* Les pages ressources reliées sous les boutons de la section #tarifs. */
const RESOURCE_LINKS = [
  { href: "/ia/ai-act", label: "L'AI Act vous concerne ?" },
  { href: "/ia/accessibilite", label: "Accessibilité web" },
  { href: "/creation/site-conforme", label: "Un site aux normes" },
  { href: "/fr/diagnostic-ia", label: "Le diagnostic" },
];

/* Hors rendu, gardé pour mémoire. Les durées indiquées ne sont pas
   sourcées : ne pas les réafficher telles quelles. */
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

/* FAQ. Retirées le 1er/10/2026 : la question micro-entreprise et SAS
   (plus de packs indépendants) et la question sur l'hébergement des
   données. [À COMPLÉTER] remettre cette dernière avec la réponse validée
   par Gilles Pons. Le JSON-LD FAQPage suit ce tableau. */
const FAQ = [
  {
    q: "Concrètement, je gagne combien de temps ?",
    a: "Cela dépend de vos tâches. Nous le mesurons avec vous au diagnostic.",
  },
  {
    q: "Combien de temps avant que ça serve vraiment ?",
    a: "Cela dépend du cas. Nous fixons ensemble les indicateurs au diagnostic (temps gagné, contenus publiés, demandes traitées) et nous les mesurons à date fixe.",
  },
  {
    q: "Un agent peut-il vraiment remplacer une personne ?",
    a: "Non, et c'est volontaire. Un agent prend la charge répétitive et mesurable (suivi, première réponse, prospection, contenu). Il libère votre équipe pour ce qui demande du jugement, de la relation, de la création. La promesse, c'est ça : moins de tâches à la chaîne, plus de temps pour ce qui compte.",
  },
  {
    q: "Est-ce pris en charge par un OPCO ?",
    a: "Non. TROIE Studio fait du conseil et de l'accompagnement. Nos prestations ne passent pas par les OPCO.",
  },
];

const IA_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://troiestudio.fr/ia#service",
      name: "Organisation et outils IA",
      serviceType: "Conseil en organisation et mise en œuvre d'outils",
      url: "https://troiestudio.fr/ia",
      areaServed: "FR",
      provider: { "@id": "https://troiestudio.fr/#organization" },
      description:
        "Diagnostic, ateliers de prise en main et mise en œuvre d'outils, IA comprise, au service de la stratégie de l'entreprise. Premier échange par écrit.",
    },
    {
      "@type": "FAQPage",
      "@id": "https://troiestudio.fr/ia#faq",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function IaLandingPage() {
  return (
    <article className="min-h-screen bg-[var(--bg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(IA_JSONLD) }}
      />
      {/* Navbar du studio. Pas de sélecteur de langue : il enverrait vers
          /en/ia, qui n'existe pas. */}
      <Header locale="fr" showLang={false} />

      {/* Héros, vidéo en fond sous un voile crème. À droite, l'encadré
          « Notre règle » remplace la courbe GrowthCurve. */}
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
            {/* Colonne gauche : promesse et actions */}
            <div className="md:col-span-6">
              <GreekMark
                label="Organisation, outils, accompagnement"
                labelClassName="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]"
              />
              <h1 className="t-display mt-8 text-5xl text-[var(--fg)] md:text-6xl lg:text-[80px] xl:text-[92px]">
                D&apos;abord votre stratégie.{" "}
                <span className="text-[var(--accent)]">Ensuite, les outils.</span>
              </h1>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/90 md:text-lg">
                Nous partons de votre activité et de votre stratégie. Ensuite,
                nous choisissons avec vous les outils utiles. L&apos;IA en fait
                partie quand elle sert. Nous les mettons en place et nous
                accompagnons vos équipes jusqu&apos;à ce qu&apos;elles s&apos;en
                servent seules.
              </p>
              <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
                <a href={CAL_URL} target="_blank" rel="noreferrer" className={BTN_BOOK}>
                  Décrire mon projet
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <Link href={PROJECT_URL} className={BTN_PROJECT}>
                  <span className="inline-flex items-center gap-2.5 border-b border-current pb-1.5">
                    Lancer un projet
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Colonne droite : notre règle */}
            <div className="md:col-span-6 md:pt-8">
              <div className="border border-[var(--rule-strong)] bg-[var(--bg)]/90 p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  Notre règle
                </p>
                <p className="mt-5 text-lg leading-relaxed text-[var(--fg)]">
                  Nous sommes des personnes qui utilisent les outils d&apos;IA
                  avec transparence : ce que fait la machine, ce que fait la
                  main. Nous respectons vos données. Et nous pouvons refuser un
                  projet qui ne correspond pas à nos valeurs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          POUR LES PME ET LES ÉQUIPES, les trois ateliers
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="pro" className="relative isolate overflow-hidden border-t border-[var(--rule)] bg-[var(--bg)] scroll-mt-24">
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Pour les PME et les équipes
              </p>
              <h2 className="t-display mt-8 text-4xl text-[var(--fg)] md:text-6xl lg:text-7xl">
                Nous partons de votre façon de travailler.
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                Avant de parler d&apos;IA, nous regardons vos objectifs, vos
                clients et la façon dont votre équipe travaille. Nous repérons
                ce qui prend du temps sans créer de valeur. Puis nous mettons
                en place les bons outils, et nous accompagnons votre équipe
                pour qu&apos;elle s&apos;en serve vraiment.
              </p>
            </div>
          </div>

          {/* Les trois ateliers, chaque carte un fond différent */}
          <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-3 md:gap-8">
            {PRO_PACKS.map((p, i) => {
              // Palette : Atelier 01 lin clair, Atelier 02 taupe, Atelier 03
              // orange. Bouton plein orange sur fond clair, noir sur orange.
              const themes = [
                {
                  card: "bg-[#ebe2cf] text-[#111318]",
                  border: "border-[#111318]/10",
                  rule: "border-[#111318]/15",
                  body: "text-[#111318]/75",
                  meta: "text-[#111318]/55",
                  cta: "bg-[var(--accent)] text-[#111318] hover:bg-[var(--ink)] hover:text-[#fcfcfd]",
                },
                {
                  card: "bg-[#7a6753] text-[#fcfcfd]",
                  border: "border-[#fcfcfd]/10",
                  rule: "border-[#fcfcfd]/15",
                  body: "text-[#fcfcfd]/85",
                  meta: "text-[#fcfcfd]/60",
                  cta: "bg-[var(--accent)] text-[#111318] hover:bg-[#fcfcfd]",
                },
                {
                  card: "bg-[var(--accent)] text-[#111318]",
                  border: "border-[#111318]/15",
                  rule: "border-[#111318]/20",
                  body: "text-[#111318]/85",
                  meta: "text-[#111318]/60",
                  cta: "bg-[var(--ink)] text-[#fcfcfd] hover:bg-[#fcfcfd] hover:text-[#111318]",
                },
              ];
              const t = themes[i % themes.length];
              return (
                <div
                  key={p.title}
                  className={`flex h-full flex-col rounded-sm border ${t.border} ${t.card} p-8 transition-transform hover:-translate-y-1 md:p-10`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`font-mono text-[11px] uppercase tracking-[0.22em] ${i === 2 ? "text-[#111318]" : "text-[var(--accent)]"}`}>
                      {p.badge}
                    </p>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`h-7 w-7 ${i === 2 ? "text-[#111318]" : "text-[var(--accent)]"}`}
                      aria-hidden="true"
                    >
                      <path d={p.icon} />
                    </svg>
                  </div>
                  <h3 className="t-display mt-4 text-3xl md:text-4xl">{p.title}</h3>
                  {/* Durée et effectif : [À COMPLÉTER], non affichés tant
                      qu'ils ne sont pas validés. */}
                  {p.duration ? (
                    <p className={`mt-3 font-mono text-[11px] uppercase tracking-[0.22em] ${t.meta}`}>
                      {p.duration}
                    </p>
                  ) : null}
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
                          className={`mt-[10px] inline-block h-[3px] w-3 flex-shrink-0 ${i === 2 ? "bg-[var(--ink)]" : "bg-[var(--accent)]"}`}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex-1" />
                  <div className={`mt-10 border-t pt-6 ${t.rule}`}>
                    <a
                      href={p.cta.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`group inline-flex min-h-[52px] w-full items-center justify-center gap-3 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${t.cta}`}
                    >
                      {p.cta.label}
                      <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          COMMENT NOUS AVANÇONS, les 4 étapes. Ancre #tarifs gardée : des
          articles de blog et /ia/ai-act y renvoient. Aucun prix : tout se
          fait sur devis après un premier échange.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="tarifs" className="border-t border-[var(--rule)] bg-[var(--bg-2)] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Comment nous avançons
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Quatre étapes, un devis écrit.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Tout commence par un premier échange. Le prix se fixe ensuite
            sur devis, une fois votre situation comprise.
          </p>

          <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((o) => (
              <div
                key={o.step}
                className={`flex flex-col rounded-sm border p-8 ${
                  o.featured
                    ? "border-[var(--accent)] bg-[var(--ink)] text-[#fcfcfd]"
                    : "border-[var(--rule)] bg-[var(--bg)]"
                }`}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
                  {o.step}
                </p>
                <h3 className={`t-display mt-4 text-2xl md:text-[26px] ${o.featured ? "text-[#fcfcfd]" : "text-[var(--fg)]"}`}>
                  {o.title}
                </h3>
                <p className={`mt-3 font-mono text-[10px] uppercase tracking-[0.18em] ${o.featured ? "text-[var(--accent)]" : "text-[var(--fg-2)]/65"}`}>
                  {o.unit}
                </p>
                <p className={`mt-4 text-sm leading-relaxed ${o.featured ? "text-[#fcfcfd]/80" : "text-[var(--fg-2)]"}`}>
                  {o.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
            <a href={CAL_URL} target="_blank" rel="noreferrer" className={BTN_BOOK}>
              Décrire mon projet
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </a>
            <Link href={PROJECT_URL} className={BTN_PROJECT}>
              <span className="inline-flex items-center gap-2.5 border-b border-current pb-1.5">
                Lancer un projet
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>

          {/* Les pages ressources, en liens soulignés */}
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-1 border-t border-[var(--rule)] pt-6">
            {RESOURCE_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-[44px] items-center text-sm text-[var(--fg-2)] underline underline-offset-4 transition-colors hover:text-[var(--accent)] md:text-[15px]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                Questions fréquentes
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

      {/* Clôture, fond orange : sur l'orange, le bouton plein est noir */}
      <section className="tone-accent relative isolate overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--fg)]/70">
                Premier échange, sans engagement
              </p>
              <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-6xl lg:text-7xl">
                Trente minutes pour parler de votre cas.
              </h2>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--fg)]/85 md:text-lg">
                Nous regardons ensemble ce qui vous ferait gagner du temps,
                avec ou sans IA. Nous vous le disons par écrit. Y compris si
                la réponse est non.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex min-h-[52px] items-center gap-3 bg-[var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#2f5bd3] transition-colors hover:bg-[#fcfcfd] hover:text-[#111318]"
                >
                  Décrire mon projet
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <ObfuscatedEmail className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)]/75 transition-colors hover:text-[var(--fg)]" />
              </div>
            </div>

            {/* Le « 30 » sur une photo sans personne reconnaissable */}
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[var(--ink)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/corpo/montpellier/DSC_7604.jpg"
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover opacity-70"
                  style={{ filter: "grayscale(1) contrast(1.05) brightness(0.85)" }}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-[var(--accent)] opacity-30 mix-blend-multiply" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#fcfcfd]">
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

      {/* Pied de page du studio (FormationsFooter reste dans le dépôt pour
          les routes /formations déjà redirigées). */}
      <Footer locale="fr" />
    </article>
  );
}
