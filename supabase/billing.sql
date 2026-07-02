-- ────────────────────────────────────────────────────────────────────
-- TROIE Formations — Facturation Stripe
--
-- A exécuter dans le SQL Editor de Supabase APRES schema.sql.
-- Ajoute : idempotence des webhooks + référence Stripe sur les accès.
-- Le webhook écrit avec la clé service-role (contourne la RLS) ;
-- aucune policy d'écriture publique n'est donc nécessaire.
-- ────────────────────────────────────────────────────────────────────

-- ── BILLING EVENTS (idempotence des webhooks Stripe) ────────────────
create table if not exists public.billing_events (
  id text primary key,              -- event.id Stripe (evt_...)
  type text not null,
  received_at timestamptz default now() not null
);
alter table public.billing_events enable row level security;
-- Pas de policy : lecture/écriture uniquement via service-role.

-- ── Référence Stripe sur les accès (session ou subscription id) ─────
alter table public.user_course_access
  add column if not exists stripe_ref text;

-- ── Nettoyage périodique (optionnel) : events de plus de 90 jours ───
-- delete from public.billing_events where received_at < now() - interval '90 days';
