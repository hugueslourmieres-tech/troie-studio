/**
 * Le Panthéon TROIE : mécanique d'affectation façon "lettre de
 * sorcier", version Olympe. L'utilisateur passe le test, reçoit son
 * sésame par email et rejoint sa lignée divine. Chaque maison mappe
 * un profil d'usage vers les offres du site.
 */

/**
 * Interrupteur global du Panthéon. Mis de côté (decision Hugues,
 * juillet 2026) : rien ne s'affiche côté site tant que c'est false.
 * Le code reste en place, on rallumera plus tard en repassant à true.
 */
export const PANTHEON_ENABLED = false;

export type HouseSlug = "hermes" | "athena" | "achille" | "hestia";

export type House = {
  slug: HouseSlug;
  name: string;
  title: string;
  /** Le domaine divin : ce que le membre devient. */
  godOf: string;
  motto: string;
  description: string;
  /** Couleurs DA (fond de carte, texte, accent). */
  bg: string;
  fg: string;
  accent: string;
  /** Offres du site servies en priorité à cette maison. */
  offers: { label: string; href: string }[];
  /** Ce que la maison fait au quotidien avec l'IA (3 tâches, chiffres et
   * visuels déjà publiés et sourcés sur /ia, réutilisés ici). */
  tasks: { title: string; time: string; body: string; image: string }[];
  /** Outils IA connectés (logos), typiques de cette maison. */
  tools: { src: string; label: string }[];
};

export const HOUSES: Record<HouseSlug, House> = {
  hermes: {
    slug: "hermes",
    name: "Hermès",
    title: "Maison Hermès",
    godOf: "dieu de la prospection",
    motto: "Toujours en mouvement.",
    description:
      "Messager ailé, négociateur né. Les membres de la maison Hermès font de l'IA leur meilleur commercial : pipeline plein, relances impeccables, RDV qui tombent tout seuls.",
    bg: "#f37b22",
    fg: "#1a1714",
    accent: "#1a1714",
    offers: [
      { label: "Agent prospection & RDV", href: "/ia" },
      { label: "Cours 01 · Maîtriser ChatGPT & Claude", href: "/formations/cours-01" },
      { label: "Prompts métier vente", href: "/formations/prompts" },
    ],
    tasks: [
      {
        title: "Votre prospection",
        time: "5 à 10 h / semaine",
        body: "Listes qualifiées, mails personnalisés ciblage par ciblage.",
        image: "/images/travaux/04_sanglier-erymanthe.jpg",
      },
      {
        title: "Vos emails",
        time: "26 min / jour",
        body: "Réponses pros calées dans votre voix. Première réponse en 3 secondes.",
        image: "/images/travaux/01_lion-nemee.jpg",
      },
      {
        title: "Vos devis et factures",
        time: "3 à 5 h / semaine",
        body: "Générés, envoyés, relances automatiques. Plus jamais oubliés.",
        image: "/images/travaux/03_biche-cerynie.jpg",
      },
    ],
    tools: [
      { src: "/images/logos/chatgpt.svg", label: "ChatGPT" },
      { src: "/images/logos/claude.svg", label: "Claude" },
      { src: "/images/logos/hubspot.svg", label: "HubSpot" },
      { src: "/images/logos/salesforce.svg", label: "Salesforce" },
      { src: "/images/logos/gmail.svg", label: "Gmail" },
      { src: "/images/logos/linkedin.svg", label: "LinkedIn" },
    ],
  },
  athena: {
    slug: "athena",
    name: "Athéna",
    title: "Maison Athéna",
    godOf: "dieu de la stratégie",
    motto: "Voir avant les autres.",
    description:
      "Sagesse et stratégie. Les membres de la maison Athéna pilotent : ils voient les risques avant tout le monde, décident avec un coup d'avance et dorment tranquilles côté conformité.",
    bg: "#1a1714",
    fg: "#f5f0e6",
    accent: "#f37b22",
    offers: [
      { label: "Audit & diagnostic IA", href: "/ia" },
      { label: "Conformité AI Act", href: "/ia/ai-act" },
      { label: "Accessibilité web", href: "/ia/accessibilite" },
    ],
    tasks: [
      {
        title: "Votre reporting",
        time: "Chaque lundi matin",
        body: "Synthèse automatique de vos chiffres, livrée sans intervention.",
        image: "/images/travaux/07_pommes-hesperides.jpg",
      },
      {
        title: "Votre veille marché",
        time: "Sur demande",
        body: "Concurrents, tendances, signaux faibles. Résumés pertinents en 30 sec.",
        image: "/images/travaux/08_cerbere.jpg",
      },
      {
        title: "Vos analyses de données",
        time: "Tableurs en minutes",
        body: "Vos CSV, vos Excel. Lus, croisés, expliqués en clair.",
        image: "/images/travaux/12_achelous.jpg",
      },
    ],
    tools: [
      { src: "/images/logos/claude.svg", label: "Claude" },
      { src: "/images/logos/chatgpt.svg", label: "ChatGPT" },
      { src: "/images/logos/notion.svg", label: "Notion" },
      { src: "/images/logos/google-analytics.svg", label: "Google Analytics" },
      { src: "/images/logos/semrush.svg", label: "Semrush" },
      { src: "/images/logos/make.svg", label: "Make" },
    ],
  },
  achille: {
    slug: "achille",
    name: "Achille",
    title: "Maison Achille",
    godOf: "dieu de la création",
    motto: "La beauté frappe fort.",
    description:
      "L'éclat et la production. Les membres de la maison Achille créent plus vite que leur ombre : contenus, visuels, campagnes. L'IA est leur armure, la marque leur champ de bataille.",
    bg: "#b4552d",
    fg: "#f5f0e6",
    accent: "#f5f0e6",
    offers: [
      { label: "Cours 02 · Workflows IA & agents", href: "/formations/cours-02" },
      { label: "Création médias & web", href: "/creation/site-conforme" },
      { label: "Prompts contenu & social", href: "/formations/prompts" },
    ],
    tasks: [
      {
        title: "Vos posts sociaux",
        time: "5 h / semaine",
        body: "LinkedIn, Instagram, TikTok. Un sujet, cinq formats sortants prêts à publier.",
        image: "/images/travaux/02_hydre-lerne.jpg",
      },
      {
        title: "Vos visuels et illustrations",
        time: "Quelques secondes",
        body: "Génération image on-brand, votre charte respectée.",
        image: "/images/travaux/05_juments-diomede.jpg",
      },
      {
        title: "Vos briefs créatifs",
        time: "30 sec",
        body: "Moodboards, références, scripts. Prêts à passer en prod.",
        image: "/images/travaux/10_nessus.jpg",
      },
    ],
    tools: [
      { src: "/images/logos/midjourney.svg", label: "Midjourney" },
      { src: "/images/logos/figma.svg", label: "Figma" },
      { src: "/images/logos/adobe.svg", label: "Adobe" },
      { src: "/images/logos/runway.svg", label: "Runway" },
      { src: "/images/logos/instagram.svg", label: "Instagram" },
      { src: "/images/logos/tiktok.svg", label: "TikTok" },
    ],
  },
  hestia: {
    slug: "hestia",
    name: "Hestia",
    title: "Maison Hestia",
    godOf: "dieu du foyer qui tourne",
    motto: "La maison tient grâce à moi.",
    description:
      "Le foyer et la constance. Les membres de la maison Hestia font tourner la boutique : support, admin, opérations. Leurs agents IA répondent, classent et relancent pendant qu'ils construisent.",
    bg: "#1f3a34",
    fg: "#f5f0e6",
    accent: "#8fc7b4",
    offers: [
      { label: "Agent service client 24/7", href: "/ia" },
      { label: "Formation équipe dès 990 €", href: "/formations" },
      { label: "Automatisations Make / n8n", href: "/ia" },
    ],
    tasks: [
      {
        title: "Votre service client",
        time: "40 % en autonomie",
        body: "Première réponse en moins d'une minute, 24/7, en cinq langues.",
        image: "/images/travaux/06_geryon.jpg",
      },
      {
        title: "Vos sous-titrages vidéo",
        time: "Automatique",
        body: "Réels et lives sous-titrés et traduits en cinq langues.",
        image: "/images/travaux/09_serpents-berceau.jpg",
      },
      {
        title: "Vos traductions",
        time: "Instantanées",
        body: "Voix de marque conservée dans 5 langues.",
        image: "/images/travaux/11_centaures.jpg",
      },
    ],
    tools: [
      { src: "/images/logos/whatsapp.svg", label: "WhatsApp" },
      { src: "/images/logos/slack.svg", label: "Slack" },
      { src: "/images/logos/make.svg", label: "Make" },
      { src: "/images/logos/notion.svg", label: "Notion" },
      { src: "/images/logos/gmail.svg", label: "Gmail" },
      { src: "/images/logos/hubspot.svg", label: "HubSpot" },
    ],
  },
};

export const HOUSE_SLUGS = Object.keys(HOUSES) as HouseSlug[];

export function isHouseSlug(v: string | null | undefined): v is HouseSlug {
  return !!v && v in HOUSES;
}

/* ── Le test d'affectation ──────────────────────────────────────────
   5 questions, chaque réponse crédite une maison. En cas d'égalité,
   la première réponse donnée aux questions les plus "identitaires"
   (Q1 puis Q3) tranche. */

export type PantheonQuestion = {
  q: string;
  answers: { label: string; house: HouseSlug }[];
};

export const PANTHEON_QUESTIONS: PantheonQuestion[] = [
  {
    q: "Au quotidien, votre énergie part surtout dans...",
    answers: [
      { label: "Convaincre : prospects, clients, partenaires", house: "hermes" },
      { label: "Décider : priorités, budgets, risques", house: "athena" },
      { label: "Créer : contenus, visuels, campagnes", house: "achille" },
      { label: "Faire tourner : clients servis, dossiers à jour", house: "hestia" },
    ],
  },
  {
    q: "Votre entreprise gagne quand...",
    answers: [
      { label: "Le pipeline est plein", house: "hermes" },
      { label: "Le cap est clair et tenu", house: "athena" },
      { label: "La marque rayonne", house: "achille" },
      { label: "Les clients restent et reviennent", house: "hestia" },
    ],
  },
  {
    q: "Si l'IA vous débarrassait d'une seule corvée demain...",
    answers: [
      { label: "La prospection et les relances", house: "hermes" },
      { label: "Le reporting et la veille", house: "athena" },
      { label: "La production du premier jet", house: "achille" },
      { label: "Les réponses répétitives et l'admin", house: "hestia" },
    ],
  },
  {
    q: "L'onglet toujours ouvert sur votre écran :",
    answers: [
      { label: "LinkedIn ou le CRM", house: "hermes" },
      { label: "Le tableau de bord ou Notion", house: "athena" },
      { label: "Canva, Figma ou Midjourney", house: "achille" },
      { label: "La boîte mail ou les tickets", house: "hestia" },
    ],
  },
  {
    q: "Votre devise secrète :",
    answers: [
      { label: "« Toujours en mouvement. »", house: "hermes" },
      { label: "« Voir avant les autres. »", house: "athena" },
      { label: "« La beauté frappe fort. »", house: "achille" },
      { label: "« Tout tient debout grâce à moi. »", house: "hestia" },
    ],
  },
];

/** Affecte une maison à partir des réponses (index de maison par question). */
export function assignHouse(picks: HouseSlug[]): HouseSlug {
  const score = new Map<HouseSlug, number>();
  for (const h of HOUSE_SLUGS) score.set(h, 0);
  picks.forEach((h, i) => {
    // Q1 et Q3 pèsent double : ce sont les plus identitaires.
    const weight = i === 0 || i === 2 ? 2 : 1;
    score.set(h, (score.get(h) ?? 0) + weight);
  });
  let best: HouseSlug = picks[0] ?? "hermes";
  let bestScore = -1;
  for (const h of HOUSE_SLUGS) {
    const s = score.get(h) ?? 0;
    if (s > bestScore) {
      best = h;
      bestScore = s;
    }
  }
  return best;
}
