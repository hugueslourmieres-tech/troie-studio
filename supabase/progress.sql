-- ────────────────────────────────────────────────────────────────────
-- TROIE Formations — Progression des modules (contenu statique)
--
-- A exécuter dans le SQL Editor de Supabase APRES schema.sql.
--
-- Le contenu des cours vit dans le code (src/lib/mock-data.ts), pas
-- dans les tables courses/modules : la progression est donc clé par
-- slugs texte (course_slug, module_slug) plutôt que par uuid.
-- ────────────────────────────────────────────────────────────────────

create table if not exists public.learning_progress (
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_slug text not null,
  module_slug text not null,
  status text default 'completed' not null,   -- started / completed
  completed_at timestamptz,
  updated_at timestamptz default now() not null,
  primary key (user_id, course_slug, module_slug)
);
alter table public.learning_progress enable row level security;

create policy "Users read own learning progress" on public.learning_progress
  for select using (auth.uid() = user_id);
create policy "Users insert own learning progress" on public.learning_progress
  for insert with check (auth.uid() = user_id);
create policy "Users update own learning progress" on public.learning_progress
  for update using (auth.uid() = user_id);
