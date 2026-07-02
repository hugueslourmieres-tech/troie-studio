-- ────────────────────────────────────────────────────────────────────
-- TROIE Formations : Supabase database schema
--
-- A copier dans le SQL Editor de Supabase au moment du go-live.
-- Inclut : profiles, courses, modules, lessons, progress, trophies, RLS.
-- ────────────────────────────────────────────────────────────────────

-- Reset (dev only : remove on prod)
-- drop table if exists public.user_trophies cascade;
-- drop table if exists public.user_lesson_progress cascade;
-- drop table if exists public.user_module_progress cascade;
-- drop table if exists public.user_course_access cascade;
-- drop table if exists public.lessons cascade;
-- drop table if exists public.modules cascade;
-- drop table if exists public.courses cascade;
-- drop table if exists public.trophies cascade;
-- drop table if exists public.profiles cascade;

-- ── PROFILES ────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  xp_total int default 0 not null,
  level int default 1 not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);
alter table public.profiles enable row level security;

create policy "Users see own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Trigger : auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── COURSES ─────────────────────────────────────────────────────────
create table if not exists public.courses (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  subtitle text,
  description text,
  price_cents int default 0 not null,
  modules_count int default 0 not null,
  duration_min int default 0 not null,
  level text default 'starter' not null,  -- starter / advanced / mastermind
  cover_image_url text,
  is_published boolean default true not null,
  created_at timestamptz default now() not null
);
alter table public.courses enable row level security;

create policy "Anyone reads published courses" on public.courses
  for select using (is_published = true);

-- ── MODULES (inside a course) ───────────────────────────────────────
create table if not exists public.modules (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references public.courses(id) on delete cascade not null,
  slug text not null,
  title text not null,
  subtitle text,
  description text,
  order_index int not null,
  video_url text,
  content_md text,
  duration_min int default 0 not null,
  is_free boolean default false not null,
  created_at timestamptz default now() not null,
  unique(course_id, slug)
);
alter table public.modules enable row level security;

create policy "Anyone reads modules" on public.modules
  for select using (true);  -- Course access is enforced at lesson level

-- ── LESSONS (inside a module : optional layer) ──────────────────────
create table if not exists public.lessons (
  id uuid default gen_random_uuid() primary key,
  module_id uuid references public.modules(id) on delete cascade not null,
  slug text not null,
  title text not null,
  content_md text,
  video_url text,
  order_index int not null,
  duration_min int default 0 not null,
  quiz_questions jsonb,
  created_at timestamptz default now() not null,
  unique(module_id, slug)
);
alter table public.lessons enable row level security;

create policy "Anyone reads lessons (gating in app)" on public.lessons
  for select using (true);

-- ── USER COURSE ACCESS (who can access what) ────────────────────────
create table if not exists public.user_course_access (
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_slug text not null,
  granted_at timestamptz default now() not null,
  expires_at timestamptz,  -- null = permanent
  source text default 'manual' not null,  -- manual / purchase / subscription / promo
  primary key (user_id, course_slug)
);
alter table public.user_course_access enable row level security;

create policy "Users see own access" on public.user_course_access
  for select using (auth.uid() = user_id);

-- ── USER MODULE PROGRESS ────────────────────────────────────────────
create table if not exists public.user_module_progress (
  user_id uuid references public.profiles(id) on delete cascade not null,
  module_id uuid references public.modules(id) on delete cascade not null,
  status text default 'started' not null,  -- started / completed
  progress_pct int default 0 not null,
  completed_at timestamptz,
  updated_at timestamptz default now() not null,
  primary key (user_id, module_id)
);
alter table public.user_module_progress enable row level security;

create policy "Users see own progress" on public.user_module_progress
  for select using (auth.uid() = user_id);
create policy "Users insert own progress" on public.user_module_progress
  for insert with check (auth.uid() = user_id);
create policy "Users update own progress" on public.user_module_progress
  for update using (auth.uid() = user_id);

-- ── USER LESSON PROGRESS ────────────────────────────────────────────
create table if not exists public.user_lesson_progress (
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  status text default 'started' not null,
  quiz_score int,
  quiz_attempts int default 0 not null,
  completed_at timestamptz,
  updated_at timestamptz default now() not null,
  primary key (user_id, lesson_id)
);
alter table public.user_lesson_progress enable row level security;

create policy "Users own lesson progress" on public.user_lesson_progress
  for all using (auth.uid() = user_id);

-- ── TROPHIES ────────────────────────────────────────────────────────
create table if not exists public.trophies (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  description text,
  icon_slug text default 'star' not null,  -- star / shield / sword / dragon / sneaker
  tier text default 'bronze' not null,     -- bronze / silver / gold / legendary
  xp_reward int default 100 not null,
  criteria jsonb,
  created_at timestamptz default now() not null
);
alter table public.trophies enable row level security;

create policy "Anyone reads trophies" on public.trophies
  for select using (true);

-- ── USER TROPHIES (unlocked) ────────────────────────────────────────
create table if not exists public.user_trophies (
  user_id uuid references public.profiles(id) on delete cascade not null,
  trophy_id uuid references public.trophies(id) on delete cascade not null,
  unlocked_at timestamptz default now() not null,
  primary key (user_id, trophy_id)
);
alter table public.user_trophies enable row level security;

create policy "Users see own trophies" on public.user_trophies
  for select using (auth.uid() = user_id);
create policy "Users insert own trophies" on public.user_trophies
  for insert with check (auth.uid() = user_id);

-- ── SEED TROPHIES (10 starter trophies) ─────────────────────────────
insert into public.trophies (slug, title, description, icon_slug, tier, xp_reward) values
  ('premier-pas',     'Premier pas',     'Compléter le Module 0 gratuit',           'sneaker', 'bronze',    50),
  ('etudiant',        'Étudiant',        'Terminer le Cours 01',                    'shield',  'silver',   200),
  ('boss-niveau',     'Boss niveau',     'Terminer le Cours 02',                    'dragon',  'gold',     500),
  ('strategiste',     'Stratège',        'Score 9/10 ou plus au QCM Module 0',      'star',    'silver',   150),
  ('marathon',        'Marathon',        '7 jours consécutifs de connexion',        'sword',   'gold',     300),
  ('compleur',        'Compléteur',      '100 % d''un cours complet',               'shield',  'gold',     400),
  ('speedrunner',     'Speedrunner',     'Cours 01 terminé en moins de 24 h',       'sword',   'legendary',600),
  ('initie',          'Initié',          '25 prompts utilisés depuis votre stack',  'star',    'bronze',   100),
  ('master',          'Master',          '6 mois de Mastermind d''affilée',         'dragon',  'legendary',800),
  ('legende',         'Légende',         'Tous les autres trophées débloqués',      'star',    'legendary',1500)
on conflict (slug) do nothing;

-- ── SEED COURSES (3 cours) ──────────────────────────────────────────
insert into public.courses (slug, title, subtitle, price_cents, modules_count, duration_min, level) values
  ('module-0',  'Module 0 · Théorie LLM',           'Pourquoi un LLM hallucine et veut vous plaire', 0,     1, 15,  'free'),
  ('cours-01',  'Cours 01 · Maîtriser ChatGPT & Claude', '4 modules · 25 prompts · 5 templates',     9700,  4, 90,  'starter'),
  ('cours-02',  'Cours 02 · Workflows IA',          'Make · MCPs · Agents persistants',              29700, 6, 180, 'advanced')
on conflict (slug) do nothing;

-- ── HELPER FUNCTIONS ────────────────────────────────────────────────

-- Award XP and re-compute level
create or replace function public.award_xp(p_user_id uuid, p_xp int)
returns void as $$
begin
  update public.profiles
  set xp_total = xp_total + p_xp,
      level = greatest(1, floor((xp_total + p_xp) / 500) + 1),
      updated_at = now()
  where id = p_user_id;
end;
$$ language plpgsql security definer;

-- Unlock a trophy + award its XP (idempotent)
create or replace function public.unlock_trophy(p_user_id uuid, p_trophy_slug text)
returns boolean as $$
declare
  v_trophy_id uuid;
  v_xp int;
  v_already boolean;
begin
  select id, xp_reward into v_trophy_id, v_xp
  from public.trophies where slug = p_trophy_slug;

  if v_trophy_id is null then
    return false;
  end if;

  select exists (
    select 1 from public.user_trophies
    where user_id = p_user_id and trophy_id = v_trophy_id
  ) into v_already;

  if v_already then
    return false;
  end if;

  insert into public.user_trophies (user_id, trophy_id)
  values (p_user_id, v_trophy_id);

  perform public.award_xp(p_user_id, v_xp);
  return true;
end;
$$ language plpgsql security definer;
