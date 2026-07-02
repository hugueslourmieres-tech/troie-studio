-- ────────────────────────────────────────────────────────────────────
-- TROIE Formations — Journal des emails de cycle de vie
--
-- A exécuter dans le SQL Editor de Supabase APRES schema.sql.
-- Garantit qu'un email d'un type donné n'est envoyé qu'une fois par
-- utilisateur (bienvenue, essai J2/J5, relances inactivité).
-- Écriture uniquement via service-role (pas de policy publique).
-- ────────────────────────────────────────────────────────────────────

create table if not exists public.email_log (
  user_id uuid references public.profiles(id) on delete cascade not null,
  email_type text not null,   -- welcome / trial_j2 / trial_j5 / inactive_j3 / inactive_j14
  sent_at timestamptz default now() not null,
  primary key (user_id, email_type)
);
alter table public.email_log enable row level security;
