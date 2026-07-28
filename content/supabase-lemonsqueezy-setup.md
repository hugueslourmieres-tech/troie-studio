# Step C : Supabase + Lemon Squeezy setup

> **Objectif** : architecture complète paiement + auth + accès cours pour TROIE Formations. Time-to-prod : 2-3 jours.

---

## Architecture globale

```
[Visiteur] 
    ↓
[Pages publiques /formations/*] (Next.js : déjà en place)
    ↓
[Bouton "Acheter"] 
    ↓
[Lemon Squeezy Checkout hosted] (merchant of record EU)
    ↓ webhook order.created
[Supabase webhook handler] (Next.js API route)
    ↓
[Supabase: user + order + access créés]
    ↓
[Email magic link envoyé]
    ↓
[Visiteur clique → auth Supabase]
    ↓
[/formations/dashboard avec ses cours débloqués]
```

---

## Pourquoi Lemon Squeezy (vs Stripe direct)

| Critère | Lemon Squeezy | Stripe direct |
|---|---|---|
| **Merchant of record EU** | ✓ (gère TVA, factures) | ✗ (vous facturez vous-même) |
| **Time-to-prod** | 2-3 jours | 1-2 semaines |
| **Fees** | 5 % + 0.50 $/transaction | 1.5 % + 0.25 € (EU) |
| **Support paiement EU/UK/US** | natif | OK mais setup TVA manuel |
| **Apple/Google Pay** | inclus | inclus |
| **Webhooks** | simples | très complets |
| **Dashboard reporting** | basique | très complet |

**Reco TROIE** : démarrer avec **Lemon Squeezy** (vélocité, gestion TVA EU automatique). Migrer vers Stripe si > 10K €/mois et que les fees deviennent significatives.

---

## Liens certifiés

| Ressource | URL |
|---|---|
| **Lemon Squeezy** (compte) | https://www.lemonsqueezy.com |
| **Lemon Squeezy docs API** | https://docs.lemonsqueezy.com |
| **Lemon Squeezy webhooks** | https://docs.lemonsqueezy.com/help/webhooks |
| **Supabase** (compte) | https://supabase.com |
| **Supabase Auth docs** | https://supabase.com/docs/guides/auth |
| **Supabase RLS docs** | https://supabase.com/docs/guides/auth/row-level-security |
| **Resend** (emails magic link) | https://resend.com |

---

## Étape 1 : Setup Lemon Squeezy

### 1.1 Création compte
1. https://www.lemonsqueezy.com → Sign up
2. Vérification entreprise (TROIE Studio, SIRET, IBAN)
3. KYC validé (1-3 jours ouvrés)

### 1.2 Créer les produits

Dans le dashboard Lemon Squeezy → **Products** :

**Produit 1 : Pack Prompts Freelance**
- Nom : "TROIE Prompts, Pack Freelance"
- Prix : 29 €
- Type : One-time payment
- Description : "5 system prompts métier prêts à coller"
- SKU : `PROMPTS-FREELANCE`

**Produit 2 : Pack Prompts Marketing**
- Identique, SKU : `PROMPTS-MARKETING`

**...** (5 packs au total)

**Produit 6 : Bundle Prompts complet**
- Nom : "TROIE Prompts Vault, Bundle 5 packs"
- Prix : 99 €
- SKU : `PROMPTS-BUNDLE`

**Produit 7 : Cours 01**
- Nom : "TROIE Cours 01, Maîtriser ChatGPT & Claude"
- Prix : 97 €
- SKU : `COURS-01`

**Produit 8 : Cours 02**
- Nom : "TROIE Cours 02, Workflows IA"
- Prix : 297 €
- SKU : `COURS-02`

**Produit 9 : Mastermind Mensuel**
- Nom : "TROIE Mastermind, Abonnement"
- Prix : 49 €/mois
- Type : Subscription
- SKU : `MASTERMIND-MONTHLY`

**Produit 10 : Mastermind Annuel**
- Nom : "TROIE Mastermind, Annuel"
- Prix : 490 €/an
- Type : Subscription
- SKU : `MASTERMIND-ANNUAL`

### 1.3 Récupérer les URLs de checkout

Pour chaque produit, Lemon Squeezy donne une **Checkout URL** :
```
https://troie-studio.lemonsqueezy.com/buy/[uuid]
```

À coller dans le code Next.js (remplace les `mailto:` actuels).

### 1.4 Configurer le webhook

Lemon Squeezy → **Settings** → **Webhooks** → **Create webhook**

- URL : `https://troiestudio.fr/api/lemonsqueezy/webhook`
- Events to listen :
  - `order_created`
  - `subscription_created`
  - `subscription_updated`
  - `subscription_cancelled`
  - `subscription_resumed`
  - `subscription_expired`
- Secret : générer un secret 32 chars (à mettre en `.env`)

---

## Étape 2 : Setup Supabase

### 2.1 Création projet
1. https://supabase.com → New project
2. Nom : "troie-formations"
3. Région : Frankfurt (proche RGPD-friendly)
4. Plan : Free tier (suffit pour démarrer, 500 MB DB)

### 2.2 Schéma DB

Tables à créer (via Supabase SQL Editor) :

```sql
-- Users (lié à auth.users via Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  created_at timestamp with time zone default now()
);

-- Orders (commandes Lemon Squeezy)
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  lemonsqueezy_order_id text unique not null,
  product_sku text not null,
  amount_cents int not null,
  currency text default 'EUR',
  status text default 'pending',  -- pending / paid / refunded / failed
  created_at timestamp with time zone default now()
);

-- Subscriptions (abonnements Mastermind)
create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  lemonsqueezy_subscription_id text unique not null,
  product_sku text not null,
  status text default 'active',  -- active / past_due / cancelled / expired
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Course Access (qui a accès à quoi)
create table public.course_access (
  user_id uuid references public.profiles(id) on delete cascade,
  course_sku text not null,  -- COURS-01, COURS-02, PROMPTS-FREELANCE, etc.
  granted_at timestamp with time zone default now(),
  expires_at timestamp with time zone,  -- null = permanent
  primary key (user_id, course_sku)
);

-- Progress tracking (optionnel mais utile)
create table public.module_progress (
  user_id uuid references public.profiles(id) on delete cascade,
  course_sku text not null,
  module_id text not null,  -- "module-0", "module-1", etc.
  status text default 'started',  -- started / completed
  progress_pct int default 0,
  last_at timestamp with time zone default now(),
  primary key (user_id, course_sku, module_id)
);
```

### 2.3 Row Level Security (RLS)

Activer RLS sur toutes les tables, puis policies :

```sql
-- Profiles : users peuvent voir/modifier que leur profil
alter table public.profiles enable row level security;
create policy "Users see own profile" on public.profiles 
  for select using (auth.uid() = id);

-- Course access : users voient leurs accès
alter table public.course_access enable row level security;
create policy "Users see own access" on public.course_access 
  for select using (auth.uid() = user_id);

-- Service role bypass tout (pour le webhook handler)
```

### 2.4 Auth setup
1. Supabase Dashboard → Authentication → Settings
2. Activer **Email** (magic link)
3. Configurer SMTP via Resend :
   - Host : smtp.resend.com
   - Port : 465
   - Username : `resend`
   - Password : votre clé API Resend
4. Customiser le template email magic link (branding TROIE)

---

## Étape 3 : Webhook handler Next.js

### 3.1 API route

Créer `/src/app/api/lemonsqueezy/webhook/route.ts` :

```typescript
import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // bypass RLS
);

const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-signature");

  // Verify signature
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const digest = hmac.update(body).digest("hex");
  if (signature !== digest) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);
  const eventName = event.meta.event_name;
  const data = event.data;

  switch (eventName) {
    case "order_created":
      await handleOrderCreated(data);
      break;
    case "subscription_created":
      await handleSubscriptionCreated(data);
      break;
    case "subscription_cancelled":
      await handleSubscriptionCancelled(data);
      break;
    // ... autres events
  }

  return NextResponse.json({ received: true });
}

async function handleOrderCreated(data: any) {
  const email = data.attributes.user_email;
  const productSku = data.attributes.first_order_item.product_name; // adapter selon ce que LS envoie

  // 1. Créer ou trouver le user
  let { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (!profile) {
    const { data: user } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
    });
    await supabase.from("profiles").insert({ id: user.user!.id, email });
    profile = { id: user.user!.id };
  }

  // 2. Insérer order
  await supabase.from("orders").insert({
    user_id: profile.id,
    lemonsqueezy_order_id: data.id,
    product_sku: productSku,
    amount_cents: data.attributes.total,
    status: "paid",
  });

  // 3. Granter accès
  await supabase.from("course_access").insert({
    user_id: profile.id,
    course_sku: productSku,
  });

  // 4. Envoyer magic link
  await supabase.auth.admin.generateLink({
    type: "magiclink",
    email,
  });
}

// ... handleSubscription...
```

### 3.2 Variables d'environnement

Dans `.env.local` (et Vercel env) :

```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
LEMONSQUEEZY_WEBHOOK_SECRET=...
LEMONSQUEEZY_API_KEY=...
RESEND_API_KEY=re_xxx...
```

---

## Étape 4 : Auth côté client

### 4.1 Install Supabase JS

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 4.2 Helper client

`/src/lib/supabase/client.ts` :

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### 4.3 Login page

Remplacer le placeholder `/formations/dashboard` par un vrai login magic link :

```typescript
"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export function MagicLinkForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function sendLink() {
    const supabase = createClient();
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/formations/dashboard` },
    });
    setSent(true);
  }

  return (
    <div>
      {!sent ? (
        <>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={sendLink}>Recevoir le lien magique</button>
        </>
      ) : (
        <p>Lien envoyé à {email}. Cliquez pour vous connecter.</p>
      )}
    </div>
  );
}
```

### 4.4 Dashboard authentifié

Dans `/formations/dashboard/page.tsx`, charger les cours débloqués :

```typescript
const { data: access } = await supabase
  .from("course_access")
  .select("course_sku")
  .eq("user_id", user.id);
```

---

## Étape 5 : Tests E2E

### 5.1 Test paiement

1. Acheter un pack via Lemon Squeezy en mode test
2. Vérifier que le webhook arrive (logs Vercel)
3. Vérifier que `orders`, `course_access` sont créés en DB
4. Vérifier que l'email magic link arrive
5. Cliquer, login, voir le cours débloqué dans dashboard

### 5.2 Test refund

1. Refund depuis Lemon Squeezy
2. Vérifier que `course_access` est révoqué via webhook

### 5.3 Test subscription

1. Abonnement Mastermind
2. Vérifier `subscriptions.status = active`, accès aux 2 cours
3. Annulation → vérifier `status = cancelled`
4. Période expirée → vérifier accès révoqué

---

## Étape 6 : Migration du code existant

Dans les 4 fichiers actuels avec `mailto:` placeholder :

| Fichier | Constante à changer | URL Lemon Squeezy |
|---|---|---|
| `cours-01/page.tsx` | `CHECKOUT_URL` | https://troie-studio.lemonsqueezy.com/buy/uuid-cours-01 |
| `cours-02/page.tsx` | `CHECKOUT_URL` | https://troie-studio.lemonsqueezy.com/buy/uuid-cours-02 |
| `mastermind/page.tsx` | `SUBSCRIBE_MONTHLY` + `SUBSCRIBE_ANNUAL` | URLs Mastermind |
| `prompts/page.tsx` + `prompts/[pack]/page.tsx` | `checkoutForPack()` | Mapping SKU → URL |

---

## Time-to-prod estimé

| Phase | Durée |
|---|---|
| Setup Lemon Squeezy + créer produits | 4 h |
| Setup Supabase + schéma DB | 2 h |
| Webhook handler Next.js | 4 h |
| Auth client + dashboard | 4 h |
| Migration mailto → checkout URLs | 1 h |
| Tests E2E (paiement, refund, subscription) | 4 h |
| Customisation emails (magic link, confirmation) | 2 h |
| **Total** | **~2,5 jours** |

---

## Sécurité : checklist

- [ ] Webhook signature vérifiée (HMAC SHA256)
- [ ] Service role key UNIQUEMENT côté serveur, jamais client
- [ ] Anon key OK côté client (RLS protège)
- [ ] RLS activé sur toutes les tables sensibles
- [ ] `.env.local` dans `.gitignore`
- [ ] Variables prod dans Vercel env, pas dans le code
- [ ] Rate limit sur le webhook endpoint
- [ ] Logs structurés (à connecter avec un service comme Logtail)
- [ ] Backup Supabase auto (inclus dans plan)

---

## Coûts mensuels

| Service | Plan | Coût |
|---|---|---|
| Lemon Squeezy | 5 % + 0.50 $/transaction | variable, ~50-200 €/mois si trafic |
| Supabase | Free tier | 0 €/mois jusqu'à 500 MB |
| Resend | Free tier | 0 €/mois jusqu'à 3000 emails |
| Vercel | Hobby ou Pro | 0-20 €/mois |
| **Total fixe** | | **0-20 €/mois** |

Vous payez vraiment quand vous vendez. Healthy.

---

## Prochaine étape : Step D

Refonte de `/formations` pour mettre en avant le tunnel de conversion optimal :

1. Hero (existant)
2. **Boutique Prompts** (29 €) comme entry point principal
3. Module 0 (gratuit) comme lead magnet
4. Cours 01 → 02 → Mastermind comme progression
5. Dashboard pour accès post-achat

C'est Step D.
