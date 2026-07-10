# TROIE Studio : passation de session (2 au 4 juillet 2026)

Document de contexte pour reprendre le travail dans une nouvelle session.
Ne jamais commiter ce fichier (comme tous les TROIE-*.md du repo).

## Le projet

- Site : troiestudio.fr (Next.js 16 App Router, Tailwind v4, repo
  `github.com/hugueslourmieres-tech/troie-studio`, branche `main`,
  auto-deploy Vercel, projet `troie-studio` du compte hugueslourmieres-tech).
- Dossier local : `~/Documents/Hugues Lourmieres Communication/troie-studio`.
- Dev local : `npm run dev -- -p 3100` (port 3100 fixe, configure dans
  `.claude/launch.json` a la racine du dossier parent ; le port 3000 et le
  4188 sont pris par d'autres sessions).

## Positionnement (arbitrage juillet 2026, ne pas rediscuter)

Porte d'entree unique : **agents IA + formation + conformite pour PME
francophones**. La conformite a DEUX volets : AI Act (`/ia/ai-act`) et
accessibilite web (`/ia/accessibilite`, ajoutee le 04/07). Creation =
cross-sell uniquement (la mise en conformite accessibilite est le pont
naturel vers la creation). Priorite commerciale : le recurrent
(supervision 500-1500 EUR/mois, abonnement e-learning 29 EUR/mois).

Briefs sources : `~/Desktop/CLAUDE-troiestudio.md` (business) et
`TROIE-PLAN-ELEARNING.md` (repo, non commite).

## Regles maison (non negociables)

- ZERO em-dash (U+2014) nulle part : copie, code, commits, emails.
- Francais correctement accentue dans la copie ; slugs/identifiants ASCII.
- Tout chiffre publie doit etre source (recherche web datee) ; etiqueter
  [fait verifie] / [inference] / [estimation] dans les analyses.
- Challenger toute demande qui re-elargit le positionnement.
- Commits : messages en francais sans accents, footer
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Qualiopi : dire uniquement "Certification Qualiopi en cours".
- Je ne touche jamais aux valeurs de credentials : l'utilisateur colle
  lui-meme les secrets (workflow etabli via Chrome).

## Infrastructure en production (tout est LIVE et verifie)

| Brique | Etat |
|---|---|
| Stripe | Compte reclame (banque CA ..7987), cle `troie-studio-v2`, webhook signe, checkout inline price_data, essai 7 jours sur abonnement |
| Supabase | Projet `xaqtlppixdgdvnepavpr`, 11 tables + RLS, email_log, Site URL = troiestudio.fr, redirect URLs troiestudio.fr/** et localhost:3000/** |
| Google OAuth | Projet Google Cloud `troie-studio`, app "TROIE Studio" publiee en production, client `troie-studio-web`, provider Google actif dans Supabase. Bouton "Continuer avec Google" fonctionnel (teste par Hugues) |
| Resend | RESEND_API_KEY + CONTACT_FROM dans Vercel ; emails de cycle de vie au design DA (bandeau orange, carte creme) |
| Cron Vercel | `/api/cron/lifecycle` quotidien 8h UTC. ATTENTION : le bouton "Run" manuel de Vercel renvoie 401 (pas de header x-vercel-cron) ; ajouter un CRON_SECRET si on veut du declenchement manuel |
| Search Console | Propriete domaine troiestudio.fr, sitemap soumis, validation "duplicata" lancee le 03/07 |

Catalogue billing (source de verite) : `src/lib/billing/catalog.ts`
(cours-01 99 EUR, cours-02 297 EUR, abo 29 EUR/mois essai 7j, annuel 290 EUR).

## Realise pendant cette session

1. **Emails de cycle de vie** (`src/lib/emails/lifecycle.ts`) : welcome
   (callback auth + backstop cron), trial J2/J5, inactif J+3/J+14.
   Idempotents via table email_log (insert-first). Design DA TROIE.
   Previsualisation dev : `/api/dev/email-preview?type=welcome` (404 en prod).
2. **Google OAuth de bout en bout** (voir tableau). Piege connu : les
   secrets clients Google ne sont visibles qu'a la creation ; en cas de
   perte, desactiver + supprimer puis "Add secret" (max 2 secrets).
3. **Nouveau titre hero** : « Faites de l'IA / votre meilleure recrue. »
   (2 lignes verrouillees, clamp 1.5rem/5.5vw/5.2rem). EN : "Make AI /
   your best hire."
4. **Header connecte** : "Se connecter" devient "Mon espace" quand une
   session Supabase existe (hook `src/components/useSignedIn.ts`, utilise
   par Header + MobileMenu).
5. **Dashboard optimise** : profil auto-complete depuis Google (nom +
   avatar, self-heal dans le layout), badge de plan (Decouverte / Cours a
   vie / Abonnement actif), streak reel (jours consecutifs d'activite),
   accueil par prenom, "Reprendre" en premier, barres de progression par
   cours, carte "Par ou commencer" (Module 0) si aucune progression,
   upsell abonnement (masque si abonne).
6. **SEO / Search Console** : le probleme "duplicata canonique" venait des
   articles FR servis sur /en avec self-canonical. Corrige puis depasse :
   **les 14 articles du blog sont traduits en vrai anglais** (fichiers
   `.en.tsx` dans `src/app/[locale]/blog/_content/`, champs titleEn/
   descriptionEn/BodyEn dans `articles.ts`, helper `localizeArticle`).
   Canonique par locale + hreflang quand la traduction existe, sinon
   repli canonique /fr. Sitemap nettoye (redirections retirees,
   /ia/ai-act et /formations/tarifs ajoutes) et resoumis.
7. **Offre accessibilite (04/07)** : page `/ia/accessibilite` (jumelle
   AI Act : frise EAA, affaire Carrefour juin 2026 condamne sous
   astreinte, FAQ JSON-LD, sanctions 7500 EUR, 4 briques memes prix),
   article de blog bilingue `accessibilite-site-web-obligation`
   (categorie "Conformite"), maillage depuis /ia et /ia/ai-act.

Commits principaux : c656d92 (emails), 462f201 (hero), 81ba0f6
(dashboard), e623e32 + b9b388f (SEO + blog bilingue), 07541a5 (design
emails), 2ddfc91 (accessibilite).

## En attente / prochaines etapes

- **Test paiement Stripe** : Hugues etait en train de tester l'abonnement
  avec sa vraie carte (essai 7 jours, annulation avant J7 = 0 EUR).
  Verifier : badge "Abonnement actif" sur le dashboard, upsell masque,
  email trial_j2 dans 2 jours (nouveau design).
- **Email de bienvenue redesigne** : la trace email_log welcome de son
  compte a ete effacee ; l'email repartira a sa prochaine connexion
  Google (le declenchement par cron manuel Vercel ne marche pas, 401).
- **Vercel Hobby vers Pro** (usage commercial + adresse de facturation
  manquante) ; **Supabase vers Pro** des les premiers abonnes (le free
  tier se met en pause apres inactivite).
- E-learning : videos a produire (workflow NotebookLM documente dans
  `content/notebooklm-workflow.md`), 3e parcours recommande "Conformite
  AI Act pour dirigeants", certificats PDF.
- Retention : streaks visibles + rappel hebdo, module "Veille du mois",
  live mensuel.
- Idees en attente : post LinkedIn sur l'affaire Carrefour (amorcer le
  trafic vers /ia/accessibilite), rythme 1 article de blog bilingue par
  semaine, backlinks locaux (French Tech, presse nicoise).
- Search Console : 65 pages "detectees non indexees" = normal (site
  jeune), s'indexeront progressivement.

## Pieges connus (pour ne pas retomber dedans)

- Champs env Vercel : les placeholders gris ressemblent a des valeurs
  collees ; verifier que le texte est NOIR avant de sauvegarder.
- Next 16 : un seul `next dev` par projet (lock dans .next/dev) ; tuer
  le PID indique par l'erreur si un serveur orphelin traine.
- SQL editor Supabase : cliquer DANS l'editeur avant cmd+A ; coller via
  presse-papiers plutot que taper (autoclose Monaco).
- Traductions d'articles : toujours creer le `.en.tsx` + les 3 champs
  En dans `articles.ts`, sinon la page /en sert le FR avec canonique /fr
  (comportement voulu de repli).
