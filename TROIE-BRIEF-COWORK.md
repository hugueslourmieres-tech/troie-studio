# TROIE, Atelier Digital · Brief complet pour Cowork

Document de transfert : tout ce qu'il faut savoir sur le projet `troiestudio.fr` pour continuer à avancer, prendre des décisions stratégiques, et briefer une équipe IA / un cabinet / un partenaire.

> **À jour le 18 mai 2026.** Live : <https://troiestudio.fr> · Repo : `github.com/hugueslourmieres-tech/troie-studio`

---

## 1. La marque

**TROIE, Atelier Digital**

Studio personnel de Hugues Lourmieres, basé en France, dix ans d'accompagnement de marques en France et à l'international.

### Positionnement

> *Studio de création, stratégie marketing digital et formations aux outils d'intelligence artificielle. Photo, vidéo, design, identité de marque et accompagnement IA. À taille humaine, dix ans aux côtés des marques.*

### Trois piliers métiers

1. **01 · Création**, Image, vidéo, design.
   Photo produit / mode / corporate / événementiel, vidéo et films de marque, identité visuelle, direction artistique, création par IA (image / vidéo / voix), sites web et e-commerce.

2. **02 · Stratégie**, Communication et marketing digital.
   Stratégie de marque, conseil en communication, marketing digital, plan media, SEO / SEA / GEO (référencement LLM), paid media (Meta, Google, LinkedIn, TikTok), réseaux sociaux et conversion.

3. **03 · Formation**, Maîtriser les outils IA.
   ChatGPT, Claude, Gemini, Midjourney, Sora, Veo, Runway, Make, n8n, Zapier. Création et déploiement d'agents IA. Audits et feuilles de route. Formats intra ou inter, en France ou en remote.

### Identité visuelle

- **Palette** : crème Hermès `#f5f0e6` (papier), orange Hermès `#f37b22` (accent), ink `#1a1714` (texte).
- **Typographies** : Bodoni Moda (display, titres), Inter (sans), JetBrains Mono (eyebrow / labels), Fraunces (hero magazine).
- **Pictogramme signature** : un guerrier grec stylisé (`warrior.png`), réf. à la mythologie troyenne.
- **Aesthetic** : maisons de luxe (Hermès, Loewe, Aesop). Cream + orange, large espace blanc, photo B&W → couleur au hover, typographie éditoriale magazine.

### Persona fondateur

**Hugues Lourmieres**, Chief Marketing Officer dans l'industrie et les arts graphiques. Pilote la stratégie de marque et la production de contenus pour des acteurs exigeants. Photographe, vidéaste et directeur artistique depuis 10 ans. Forme également les équipes à l'IA.

- LinkedIn : <https://www.linkedin.com/in/hugueslourmieres/>
- Instagram : <https://www.instagram.com/hugueslourmieres/>
- Behance : <https://www.behance.net/hugueslourmie3>
- Email : `contact@troiestudio.fr`
- RDV : <https://cal.com/hugueslourmieres>

---

## 2. Clients accompagnés

Listés dans la section "Marques accompagnées" du site, en marquee défilant infini :

`CHANEL · X-RITE · SOFITEL · GS MONACO · VEORIA · RUTHERFORD · TOP AKITA INU · CAPEFRONT · STUDIO DE LA ROCHE · MEASURECOLOR`

### Réalisations en ligne (12 case studies)

Mis en avant en début de carrousel :

1. **Capefront**, Identité de marque et photographie (corporate / lifestyle)
2. **Cartonajes Pans**, Reportage industriel à Barcelone (presses offset)
3. **MIBI 2026**, Convention nationale, captation événementielle
4. **Veoria**, Culture corporate et photographie d'équipe
5. **Wauters B'Pack**, Imprimerie, presses offset et contenus

Suivis de :
6. CHANEL, Boutiques du Sud, équipes et savoir-faire
7. Monaco, Soirées et événements premium
8. Eshuis, Reportage et direction artistique
9. Social Media, DA et contenus pour les réseaux
10. Formation IA, Sessions intra-entreprise
11. Valberg, Paysages du Mercantour
12. Animaux, Photographie animalière

Chaque page : cover full-bleed 90vh, titre overlay blanc + dégradé, mosaïque éditoriale en colonnes natives (ratio des photos respecté), CTA "projet suivant" en bas + CTA contact.

---

## 3. Architecture technique

### Stack

- **Framework** : Next.js 16 (App Router, Turbopack)
- **React** : 19.2
- **Style** : Tailwind CSS v4 (CSS-first tokens)
- **i18n** : next-intl (FR / EN, default FR)
- **Animations** : motion/react (Framer) + GSAP + ScrollTrigger
- **Carousel** : Embla Carousel
- **Smooth scroll** : ❌ retiré (Lenis désinstallé, on garde le scroll natif)
- **Mail** : Resend API
- **Hosting** : Vercel (production)
- **Repo** : GitHub `hugueslourmieres-tech/troie-studio`

### Structure des routes

```
/[locale]/                     → home
/[locale]/works                → grille des 12 projets
/[locale]/works/[slug]         → page projet
/[locale]/contact              → formulaire
/[locale]/privacy              → confidentialité RGPD
/[locale]/terms                → mentions légales
/api/contact                   → POST handler Resend
/icon.png /robots.txt /sitemap.xml → auto-générés
```

### Domaine + DNS

- Domaine principal : `troiestudio.fr` (OVH, registrar)
- Alias : `www.troiestudio.fr` (CNAME → `cname.vercel-dns.com.`)
- Apex A record : `76.76.21.21` (Vercel)
- Anciens domaines : `troie.studio`, `troie-studio.vercel.app` (toujours actifs en alias)
- Emails OVH actifs (MX `mx1/2/3.mail.ovh.net` + SPF + DKIM ovhmo-selector)
- Boîte pro : `contact@troiestudio.fr` (IMAP `ssl0.ovh.net:993`, SMTP `ssl0.ovh.net:465`)

### Variables d'environnement Vercel

| Variable | Usage |
|---|---|
| `RESEND_API_KEY` | Resend API key, formulaire de contact |
| `CONTACT_TO` | Email destinataire (`hugueslourmieres@gmail.com`) |
| `CONTACT_FROM` | (optionnel) Sender si domaine vérifié sur Resend |

⚠️ Sécurité : si la clé Resend a fuité, la révoquer sur <https://resend.com/api-keys> et regénérer.

### Optimisations en place

- **`next/image`** avec formats AVIF + WebP (`next.config.ts`)
- **Cache TTL 30 jours** sur les images optimisées
- **`compress: true`** (gzip/brotli)
- **`optimizePackageImports`** sur motion, gsap, lucide-react
- **Hero video** H.264 Main 3.1 + `+faststart` → autoplay garanti iOS / Android
- **Marquee clients** en GSAP 32s par cycle, edges fadés
- **GSAP signature** : magnetic CTAs hero, parallax slideshow
- **Lazy loading** par défaut sur toutes les images non-priority

### SEO

- OG image 1200×630 (`/images/brand/og-image.png`) avec couple guerriers orange Hermès
- `metadataBase` = `https://troiestudio.fr`
- Robots.txt + sitemap.xml automatiques (couvrent les 24 pages projet × 2 locales)
- Open Graph + Twitter card complets, hreflang `fr` / `en`

---

## 4. Animations & micro-interactions actuelles

| Élément | Type | Lib |
|---|---|---|
| Hero CTAs ("Démarrer un projet", "Voir nos travaux") | Magnetic hover (suivi du curseur) | GSAP `useMagnetic` |
| Hero slideshow / video | Parallax scroll (-14% sur la trajectoire) | ScrollTrigger |
| Marquee clients | Défilement horizontal infini (32s) | gsap.to xPercent |
| Sections (Intro, ServiceSection, Works) | Reveal au scroll | motion/react |
| Menu burger mobile | Plein écran cream opaque via Portal | React Portal + motion |
| Formulaire contact | Success state éditorial avec check orange | React state |

### Conventions de design

- **Tirets orange `--accent`** pour les bullets de liste
- **Lignes hairline 1px** entre sections (`border-t border-[var(--accent)]`)
- **CTAs en mono uppercase** `text-[11px] tracking-[0.22em]` avec underline qui passe à l'orange au hover
- **Photos en filtre B&W → couleur au hover** (classe `.t-photo`)
- **Titres en Bodoni** avec `letter-spacing: -0.025em` et `line-height: 0.96`

---

## 5. Workflow de prod

### Dev local

```bash
npm run dev          # http://localhost:3000
npm run build        # validation TS + build prod
```

### Déploiement

```bash
git add <fichiers spécifiques>   # JAMAIS git add -A
git commit -m "..."
git push                          # auto-deploy Vercel
vercel deploy --prod --yes         # déploiement manuel si besoin
```

⚠️ **Règle absolue** : ne JAMAIS faire `git add -A` aveugle. Toujours staging sélectif. Un `git add -A` a déjà supprimé 90 fichiers d'images par accident une fois (réparé via `git revert`).

### Folders sources gitignored

`01slideshow hero/`, `02videos for/`, `03image video desing section/`, `04 Strategie communication/`, `05formations/`, `06about/`, `07video/`, `IA/`, `Photos Corpo Hugues/`, sources brutes locales, compressées dans les bons dossiers, jamais déployées.

---

## 6. Stratégie commerciale & cibles

### Verticales prioritaires

1. **Industrie & arts graphiques** (lien direct avec le rôle CMO de Hugues)
   - Imprimerie, packaging, presses offset
   - Solutions colorimétriques (X-Rite, MeasureColor)
   - Cas clients existants : Cartonajes Pans, Wauters B'Pack, LEFRANCQ, Moderna Printing, Capefront, Avery Dennison

2. **Luxe & hospitalité**
   - Maisons (Chanel)
   - Hôtellerie 5* (Sofitel, GS Monaco × Forbes)
   - Événementiel premium

3. **Recrutement spécialisé / chasse de têtes** (nouveau territoire)
   - Cap Front (oil & gas), pitch en cours
   - Angle : IA pour accélérer le sourcing, la qualification et l'approche

### Offres types

- **Audit IA gratuit 30 minutes** → identifier les processus à automatiser
- **Formation intra-entreprise** : demi-journée à 2 jours
- **Pack création de contenu** : photo + vidéo + DA pour un événement / un lancement
- **Refonte stratégique** : positionnement + plateforme de marque + plan media

### Pitch type, Formation IA pour cabinet de chasse (exemple Cap Front)

> Cabinets de chasse spécialisés où la vitesse et la qualité du sourcing font la différence. L'IA peut faire gagner du temps sur :
>
> 1. **Sourcing** : génération de requêtes booléennes, cartographie auto des entreprises cibles, veille marché instantanée
> 2. **Qualification** : résumés de CV/LinkedIn, scoring candidat ↔ poste, extraction de données
> 3. **Approche** : messages personnalisés à l'échelle, séquences de relance par profil
> 4. **Automatisation** : agents Claude Cowork (recherche → qualification → CRM), pipelines LinkedIn → CRM
>
> Format intra-entreprise, cas pratiques sur missions réelles, 30 min de découverte gratuite.

---

## 7. Choses à faire / pistes ouvertes

- [ ] **Vérifier le domaine sur Resend** pour envoyer depuis `contact@troiestudio.fr` (au lieu de `onboarding@resend.dev`)
- [ ] **Google Search Console** : soumettre le sitemap pour indexation
- [ ] **Vercel Analytics** : 1 clic dans Settings pour activer
- [ ] **Caches WhatsApp / LinkedIn** : forcer le rescrape via LinkedIn Post Inspector / FB Debugger
- [ ] **Carrousel vidéos YouTube + locales**, 14 cards, déjà en ligne, peut être enrichi
- [ ] **Vidéos métiers** (Création / Stratégie / Formation) : reels B&W déjà en place dans la section "Un studio. Trois métiers."
- [ ] **Page Studio dédiée** ? (actuellement bio dans la section About de la home)
- [ ] **Page Tarifs** ? (translations `packsEyebrow` / `packsTitle` existent déjà dans le i18n)
- [ ] **Track analytics conversion** sur le formulaire (event Vercel ou Plausible)

---

## 8. Fichiers utiles à connaître

| Fichier | Rôle |
|---|---|
| `src/app/[locale]/page.tsx` | Home, assemble Hero, Intro, 3 ServiceSections, Works, Videos, Clients, About, CTA |
| `src/app/[locale]/works/[slug]/page.tsx` | Page projet (cover, mosaic, next project, CTA) |
| `src/app/[locale]/contact/page.tsx` | Formulaire de contact |
| `src/app/api/contact/route.ts` | API Resend, validation payload, envoi mail |
| `src/components/Hero.tsx` | Hero avec slideshow vidéo + magnetic CTAs |
| `src/components/HeroVideo.tsx` | Vidéo loop B&W avec 7 fallbacks autoplay |
| `src/components/ServiceSection.tsx` | Bloc service réutilisé pour Création / Stratégie / Formation |
| `src/components/ClientsCloud.tsx` | Marquee GSAP des marques |
| `src/components/Header.tsx` / `Footer.tsx` | Navigation + lockup logo |
| `src/components/MobileMenu.tsx` | Menu burger via React Portal |
| `src/components/ContactForm.tsx` | Formulaire client avec fix `event.currentTarget` capture |
| `src/i18n/messages/fr.json` / `en.json` | Toutes les traductions |
| `src/lib/works.ts` | Source de vérité des 12 projets (slugs, covers, galleries) |
| `src/lib/data/videos.ts` | 14 vidéos (6 locales + 8 YouTube) |
| `next.config.ts` | Image formats AVIF/WebP, optimizePackageImports, cache TTL |

---

## 9. Tons & messages clés (à réutiliser dans les pitches)

### One-liners

- "Studio de création, stratégie et formations aux outils d'intelligence artificielle."
- "À taille humaine, dix ans aux côtés des marques."
- "TROIE réunit deux mondes : la création qui se voit, et l'IA qui produit."

### Headlines de pitch

- "Vos équipes formées à l'IA en une journée."
- "Audit gratuit 30 min, identifier ce qui peut être automatisé."
- "Création, stratégie & formation, sous un même toit."

### Ton

- Éditorial, premium, sobre.
- Pas de superlatifs creux ("révolutionnaire", "innovant").
- Phrases courtes, alternance avec phrases longues plus posées.
- Pas d'em-dash gratuit (`,`) en excès, souvent remplacé par `:` ou virgule.
- Pas de "passionné par…" / "expert en…", préférer les faits.

---

## 10. Contacts & accès

| Service | URL / contact |
|---|---|
| Site live | <https://troiestudio.fr> |
| Repo GitHub | <https://github.com/hugueslourmieres-tech/troie-studio> |
| Vercel project | `hugueslourmieres-techs-projects/troie-studio` |
| Resend dashboard | <https://resend.com> |
| OVH domain | <https://www.ovh.com/manager> → `troiestudio.fr` |
| Cal.com | <https://cal.com/hugueslourmieres> |
| Email perso | `hugueslourmieres@gmail.com` |
| Email pro | `contact@troiestudio.fr` |

---

## Annexe, Pitch Cap Front (oil & gas headhunting)

> **Objet : Accélérer votre sourcing avec l'IA, formation sur-mesure**
>
> Bonjour [Prénom],
>
> Je me permets de vous écrire car j'accompagne les entreprises dans la prise en main concrète des outils d'IA, notamment Claude, ChatGPT et les environnements agentiques comme Claude Cowork, à travers des formations courtes et opérationnelles.
>
> Dans un cabinet de chasse spécialisé oil & gas comme Cap Front, où la vitesse et la qualité du sourcing font la différence, l'IA peut faire gagner un temps considérable. Récap de ce qu'on peut mettre en place :
>
> 1. **Sourcing** : requêtes booléennes avancées en quelques secondes, cartographie auto des entreprises et talents clés, veille marché instantanée (Perplexity, Claude).
> 2. **Qualification** : résumés CV / LinkedIn, scoring candidat ↔ fiche de poste, extraction et structuration de données depuis tout document.
> 3. **Approche** : messages personnalisés à l'échelle, séquences de relance par profil, comptes-rendus d'entretien.
> 4. **Automatisation** : agents IA (Claude Cowork) qui enchaînent recherche → qualification → mise à jour CRM. Pipelines LinkedIn → email → CRM autonomes (Make, n8n).
>
> Vos chasseurs passent moins de temps sur la recherche brute, plus de temps sur la relation et la négociation.
>
> Formats intra-entreprise (demi-journée ou journée), cas pratiques sur vos missions réelles. 30 min d'échange si le sujet vous parle ?
>
> Bien à vous,
> Hugues Lourmieres, TROIE Atelier Digital · troiestudio.fr

---

*Document généré pour transfert vers Claude Cowork. Tu peux le coller directement comme contexte ou l'attacher au début d'une conversation pour reprendre où on en est.*
