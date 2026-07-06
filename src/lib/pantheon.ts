/**
 * Le Panthéon TROIE : mécanique d'affectation façon "lettre de
 * sorcier", version Olympe. L'utilisateur passe le test, reçoit son
 * sésame par email et rejoint sa lignée divine. Chaque maison mappe
 * un profil d'usage vers les offres du site.
 */

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
