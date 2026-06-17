import type {
  Course,
  Module,
  Trophy,
  Profile,
  ModuleProgress,
} from "./types";

/**
 * Donnees mock pour la demo / le dev avant que Supabase soit configure.
 * Une fois SUPABASE_URL et SUPABASE_ANON_KEY definis, les pages preferent
 * les vraies donnees Supabase et tombent sur ces mocks en fallback.
 */

export const MOCK_PROFILE: Profile = {
  id: "demo-user",
  email: "demo@troiestudio.fr",
  full_name: "Hugues (demo)",
  avatar_url: null,
  xp_total: 350,
  level: 2,
  created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
};

export const MOCK_COURSES: Course[] = [
  {
    id: "course-module-0",
    slug: "module-0",
    title: "Module 0 — Théorie LLM",
    subtitle: "Pourquoi un LLM hallucine et veut vous plaire",
    description:
      "Théorie LLM en 15 min + QCM 10 questions. Comprendre pre-training, RLHF, hallucinations, sycophancy.",
    price_cents: 0,
    modules_count: 1,
    duration_min: 15,
    level: "free",
    cover_image_url: null,
  },
  {
    id: "course-01",
    slug: "cours-01",
    title: "Cours 01 — Maîtriser ChatGPT & Claude",
    subtitle: "4 modules · 90 min de video · 25 prompts livres",
    description:
      "Les 5 patterns de prompts, les system prompts, 10 cas d'usage solo, securite RGPD.",
    price_cents: 9700,
    modules_count: 4,
    duration_min: 90,
    level: "starter",
    cover_image_url: null,
  },
  {
    id: "course-02",
    slug: "cours-02",
    title: "Cours 02 — Workflows IA",
    subtitle: "7 modules · 3 h · MCPs · agents persistants",
    description:
      "Make/Zapier, agents persistants, MCPs, 10 workflows business, production & monitoring.",
    price_cents: 29700,
    modules_count: 7,
    duration_min: 180,
    level: "advanced",
    cover_image_url: null,
  },
];

export const MOCK_MODULES: Record<string, Module[]> = {
  "module-0": [
    {
      id: "mod-0-1",
      course_id: "course-module-0",
      slug: "theorie-llm",
      title: "Pourquoi un LLM hallucine et veut vous plaire",
      subtitle: "Pre-training, RLHF, sycophancy, hallucinations",
      description: "4 leçons + QCM 10 questions",
      order_index: 1,
      video_url: null,
      content_md: null,
      duration_min: 15,
      is_free: true,
    },
  ],
  "cours-01": [
    {
      id: "mod-1-1",
      course_id: "course-01",
      slug: "patterns-prompts",
      title: "Les 5 patterns de prompts qui marchent",
      subtitle: "RTCF, few-shot, CoT, constraint, critique then iterate",
      description: "25 min · 8 démos pratiques",
      order_index: 1,
      video_url: null,
      content_md: null,
      duration_min: 25,
      is_free: false,
    },
    {
      id: "mod-1-2",
      course_id: "course-01",
      slug: "system-prompts",
      title: "System prompts à coller dans GPTs et Projets Claude",
      subtitle: "Anatomie, voix, sortie de secours, prompt injection",
      description: "30 min · 5 templates livrés",
      order_index: 2,
      video_url: null,
      content_md: null,
      duration_min: 30,
      is_free: false,
    },
    {
      id: "mod-1-3",
      course_id: "course-01",
      slug: "cas-usage-solo",
      title: "10 cas d'usage solo, du concret immédiat",
      subtitle: "Email, posts, devis, veille, transcription, créa, data",
      description: "25 min · 25 prompts bibliothèque",
      order_index: 3,
      video_url: null,
      content_md: null,
      duration_min: 25,
      is_free: false,
    },
    {
      id: "mod-1-4",
      course_id: "course-01",
      slug: "limites-securite",
      title: "Limites, sécurité des données, RGPD",
      subtitle: "Ce qu'on NE met JAMAIS, API EU, anonymisation",
      description: "10 min · checklist sécurité",
      order_index: 4,
      video_url: null,
      content_md: null,
      duration_min: 10,
      is_free: false,
    },
  ],
  "cours-02": [
    {
      id: "mod-2-1",
      course_id: "course-02",
      slug: "make-zapier",
      title: "Make & Zapier, les bases qui suffisent",
      subtitle: "Triggers, modules, debugging",
      description: "30 min · 5 scenarios livres",
      order_index: 1,
      video_url: null,
      content_md: null,
      duration_min: 30,
      is_free: false,
    },
    {
      id: "mod-2-2",
      course_id: "course-02",
      slug: "agents-persistants",
      title: "Agents persistants : mémoire, contexte, garde-fous",
      subtitle: "ReAct, plan-then-execute, HITL",
      description: "40 min · 3 agents templates",
      order_index: 2,
      video_url: null,
      content_md: null,
      duration_min: 40,
      is_free: false,
    },
  ],
};

export const MOCK_TROPHIES: Trophy[] = [
  { id: "t-1", slug: "premier-pas", title: "Premier pas", description: "Compléter le Module 0 gratuit", icon_slug: "sneaker", tier: "bronze", xp_reward: 50 },
  { id: "t-2", slug: "etudiant", title: "Étudiant", description: "Terminer le Cours 01", icon_slug: "shield", tier: "silver", xp_reward: 200 },
  { id: "t-3", slug: "boss-niveau", title: "Boss niveau", description: "Terminer le Cours 02", icon_slug: "dragon", tier: "gold", xp_reward: 500 },
  { id: "t-4", slug: "strategiste", title: "Stratège", description: "Score 9/10 ou plus au QCM Module 0", icon_slug: "star", tier: "silver", xp_reward: 150 },
  { id: "t-5", slug: "marathon", title: "Marathon", description: "7 jours consécutifs de connexion", icon_slug: "sword", tier: "gold", xp_reward: 300 },
  { id: "t-6", slug: "compleur", title: "Compléteur", description: "100 % d'un cours complet", icon_slug: "shield", tier: "gold", xp_reward: 400 },
  { id: "t-7", slug: "speedrunner", title: "Speedrunner", description: "Cours 01 terminé en moins de 24 h", icon_slug: "sword", tier: "legendary", xp_reward: 600 },
  { id: "t-8", slug: "initie", title: "Initié", description: "25 prompts utilisés depuis votre stack", icon_slug: "star", tier: "bronze", xp_reward: 100 },
  { id: "t-9", slug: "master", title: "Master", description: "6 mois de Mastermind d'affilée", icon_slug: "dragon", tier: "legendary", xp_reward: 800 },
  { id: "t-10", slug: "legende", title: "Légende", description: "Tous les autres trophées débloqués", icon_slug: "star", tier: "legendary", xp_reward: 1500 },
];

export const MOCK_UNLOCKED_TROPHIES = new Set(["premier-pas", "strategiste"]);

export const MOCK_COURSE_ACCESS = new Set(["module-0", "cours-01"]);

export const MOCK_MODULE_PROGRESS: ModuleProgress[] = [
  {
    user_id: "demo-user",
    module_id: "mod-0-1",
    status: "completed",
    progress_pct: 100,
    completed_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    user_id: "demo-user",
    module_id: "mod-1-1",
    status: "completed",
    progress_pct: 100,
    completed_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    user_id: "demo-user",
    module_id: "mod-1-2",
    status: "started",
    progress_pct: 35,
    completed_at: null,
  },
];

/** Helper to check if Supabase is configured. */
export function isSupabaseConfigured(): boolean {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
