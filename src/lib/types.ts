/**
 * Types partages pour la plateforme TROIE Formations.
 * Mirror du schema Supabase. Quand on connecte la DB live, on peut
 * generer ces types automatiquement avec `supabase gen types typescript`.
 */

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  /** Maison du Panthéon (hermes, athena, achille, hestia) ou null. */
  house?: string | null;
  xp_total: number;
  level: number;
  created_at: string;
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  price_cents: number;
  modules_count: number;
  duration_min: number;
  level: "free" | "starter" | "advanced" | "mastermind";
  cover_image_url: string | null;
};

export type Module = {
  id: string;
  course_id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  order_index: number;
  video_url: string | null;
  content_md: string | null;
  duration_min: number;
  is_free: boolean;
};

export type Lesson = {
  id: string;
  module_id: string;
  slug: string;
  title: string;
  content_md: string | null;
  video_url: string | null;
  order_index: number;
  duration_min: number;
  quiz_questions: unknown | null;
};

export type CourseAccess = {
  user_id: string;
  course_slug: string;
  granted_at: string;
  expires_at: string | null;
  source: "manual" | "purchase" | "subscription" | "promo";
};

export type ModuleProgress = {
  user_id: string;
  module_id: string;
  status: "started" | "completed";
  progress_pct: number;
  completed_at: string | null;
};

export type Trophy = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  icon_slug: "star" | "shield" | "sword" | "dragon" | "sneaker";
  tier: "bronze" | "silver" | "gold" | "legendary";
  xp_reward: number;
};

export type UserTrophy = {
  user_id: string;
  trophy_id: string;
  unlocked_at: string;
};
