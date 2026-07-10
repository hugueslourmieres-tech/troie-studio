# Plan d'action : e-learning + mise à jour du site (juillet 2026)

Étiquettes : [fait vérifié] / [inférence] / [estimation]. Prix issus du brief
CLAUDE-troiestudio.md ou à valider.

## 0. Principe directeur (aligné sur l'arbitrage, non négociable)

Le e-learning n'est PAS un produit B2C autonome. C'est :
1. La **brique récurrente** de l'offre formation (abonnements = même logique que
   les retainers agents).
2. Le **support de la formation B2B** (blended : plateforme + coaching), qui
   multiplie la valeur des packs existants sans multiplier les heures vendues.
3. Une **machine à leads** B2C vers le B2B (le particulier qui se forme est un
   salarié qui prescrit).

Garde-fou : si un chantier e-learning ne renforce ni le récurrent ni le
packaging, on ne le fait pas.

## 1. État des lieux plateforme [fait vérifié dans le code]

Existant solide :
- Auth Supabase (sign-in, callback, sessions) + protection dashboard (proxy).
- Dashboard élève : cours, trophées, profil (tables `profiles`, `user_trophies`).
- Moteur QCM complet : 7+ quiz, niveaux, sons, trophées, QuizPlayer.
- Contenu : cours-01, cours-02, module-0, mastermind, bibliothèque de prompts.
- Grille tarifaire interne `src/lib/data/packs.ts` (2 500 à 9 500 €, 1 800 €/j).

Manquant :
- **Paiement : rien.** Stripe non installé, TODO explicite dans cours-01.
- Gating des contenus (tout compte connecté voit tout).
- Progression persistée par module (seuls les trophées sont en base).
- Certificats / attestations de fin de parcours.
- Comptes équipe B2B (sièges, vue manager).
- Emails transactionnels (bienvenue, relance, fin de parcours).

## 2. Modèle économique e-learning [estimation, à valider avant publication]

| Offre | Prix indicatif | Nature |
|---|---|---|
| Compte gratuit | 0 € | Quiz de niveau + module 0. Capture email. |
| Particulier, parcours à vie | 190 à 390 € / parcours | One-shot, marge de manoeuvre promo |
| Particulier, abonnement | 29 €/mois ou 290 €/an | RÉCURRENT, accès tout catalogue |
| Équipe (B2B) | 39 à 59 €/siège/mois, min 5 sièges | RÉCURRENT, vue manager + rapports |
| Blended B2B | plateforme incluse dans packs formation + retainer | Augmente la valeur des packs existants |

Règle : l'abonnement équipe est TOUJOURS proposé dans les devis formation B2B
et adossé au retainer supervision (une seule facture mensuelle).

## 3. Chantiers produit (plateforme)

### Chantier A, monétisation (S1-S3) : PRIORITAIRE
1. [FAIT 02/07] Stripe Checkout + webhooks (payment + subscription,
   price_data inline : rien à créer dans le dashboard Stripe).
2. [FAIT 02/07] Accès en base : réutilise `user_course_access` du schéma
   existant + `supabase/billing.sql` (idempotence webhooks, stripe_ref).
3. [FAIT 02/07] Helper d'accès `src/lib/billing/access.ts` (demo /
   anonymous / locked / granted). Gating des pages de cours : à brancher
   (chantier B, avec la progression).
4. [FAIT 02/07] Page /formations/tarifs + BuyButton sur cours-01 et
   cours-02 (fini les mailto "Demander un devis"). Fallback mailto si
   Stripe absent de l'environnement.
5. Emails transactionnels minimum (Resend, déjà installé) : reçu,
   bienvenue. RESTE À FAIRE.

#### Checklist de mise en service (Hugues, ~30 min)
1. Créer le compte Stripe (ou réutiliser un existant) : stripe.com,
   activer les paiements en France, EUR.
2. Récupérer la clé secrète : dashboard.stripe.com/apikeys
   (sk_live_..., et sk_test_... pour tester d'abord).
3. Créer le webhook : dashboard.stripe.com/webhooks, endpoint
   `https://troiestudio.fr/api/stripe/webhook`, événements :
   `checkout.session.completed`, `customer.subscription.created`,
   `customer.subscription.updated`, `customer.subscription.deleted`.
   Copier le secret whsec_...
4. Variables d'environnement Vercel (projet troie-studio) :
   `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
   `SUPABASE_SERVICE_ROLE_KEY` (Supabase > Settings > API).
5. Exécuter `supabase/billing.sql` dans le SQL Editor Supabase
   (après schema.sql si pas encore fait).
6. Test en mode test Stripe (carte 4242 4242 4242 4242) : acheter
   cours-01, vérifier la ligne dans user_course_access, puis passer
   les clés en live.

### Chantier B, expérience élève (S3-S6)
1. [FAIT 02/07] Progression par module en base (`learning_progress`,
   clé par slugs, `supabase/progress.sql`). Bouton "Marquer comme
   terminé" branché (action serveur), carte "Reprendre" du dashboard
   calculée sur la vraie progression, trophées débloqués automatiquement
   à 100 % d'un cours (RPC unlock_trophy existante : premier-pas,
   etudiant, boss-niveau) avec XP.
2. [FAIT 02/07] Gating réel : accès dashboard calculés depuis
   user_course_access (+ abonnement), plus de mocks. Bouton Débloquer
   (achat direct Stripe) sur les pages cours verrouillées + lien tarifs.
3. [FAIT 02/07] Email de bienvenue post-achat (Resend, best-effort,
   depuis le webhook).
4. Certificat de fin de parcours (PDF vérifiable par URL). RESTE À FAIRE.
5. [FAIT 02/07] DÉCOUVERTE MAJEURE : le contenu écrit des 11 modules
   existait déjà (content/cours-01 et cours-02, ~2 300 lignes). Il est
   maintenant affiché dans les leçons de l'espace membre (rendu
   markdown DA, sections de production masquées). Les 2 cours sont
   complets en version écrite. RESTE CÔTÉ HUGUES : uniquement les
   vidéos (workflow NotebookLM documenté dans
   content/notebooklm-workflow.md, variables prêtes en fin de chaque
   fichier module).
6. Relances email J+3 / J+14 si progression arrêtée. RESTE À FAIRE.
7. Prix validés par Hugues (02/07) : 97 / 297 / 29 par mois / 290 par an.

### Chantier C, B2B équipes (S6-S10)
1. Organisation Supabase : table `organizations` + `org_members` (sièges).
2. Vue manager : progression de l'équipe, taux de complétion, export.
3. Onboarding par lien d'invitation (le manager invite ses salariés).
4. Rapport mensuel automatique par email au manager (renforce le retainer).

### Chantier D, conformité formation (parallèle, S3-S6)
1. Vérifier Qualiopi (éligibilité, coût, délai) AVANT d'industrialiser le B2B.
2. Si oui : monter le dossier avec la plateforme comme preuve de traçabilité
   (progression, QCM, certificats = exigences qualité couvertes en partie).
3. Si non ou trop long : vendre le B2B en direct (sans OPCO), prix ajustés.

## 4. Mise à jour du site (marketing) alignée positionnement + e-learning

### 4.1 Home (S1-S2)
- Hero : « On forme vos équipes et on déploie vos agents IA. Conformité AI Act
  incluse. » CTA 1 : audit gratuit 30 min. CTA 2 : tester la plateforme.
- Ordre des sections : 1) promesse + preuves (chiffres, clients), 2) offres
  packagées avec prix, 3) plateforme e-learning (démo visuelle du dashboard,
  quiz de niveau en accès direct), 4) AI Act (bandeau échéances + lien page),
  5) création en cross-sell compact, 6) équipe, 7) contact.
- Le QCM « Apprendre dès maintenant » devient le funnel d'entrée e-learning
  (déjà sur la home, le brancher vers création de compte).

### 4.2 Navigation (S1-S2)
- 01 Formation & plateforme (nouveau hub), 02 Agents IA (offres + AI Act),
  03 Stratégie, 04 Création (descend). Burger menu idem.

### 4.3 Offres et prix (S2-S4)
- Page « Offres » unique : Audit gratuit / Diagnostic 1 500-3 000 € /
  Déploiement agent 5 000-15 000 € / Retainer 500-1 500 €/mois (mis en avant)
  + les tarifs plateforme (section 2 ci-dessus une fois validés).
- Remplacer tous les « Sur devis » de /ia par les fourchettes publiées.
- JSON-LD Offer sur chaque prix (SEO).

### 4.4 Page Conformité AI Act (S2-S4)
- Échéances, obligations PME, ce que TROIE livre, prix, CTA audit.
- L'article de blog AI Act pointe vers elle (maillage).

### 4.5 Hub formation (S3-S5)
- Fusionner [locale]/formation et [locale]/formations en un hub unique :
  particuliers (plateforme, prix, quiz de niveau) + entreprises (blended,
  Qualiopi si validé, financement) + FAQ.
- Redirection 301 de l'ancienne URL.

### 4.6 SEO (S4-S12)
- Pages requêtes : « formation IA entreprise », « AI Act PME »,
  « formation IA CPF/OPCO » (si Qualiopi), « agent IA PME ».
- Pages locales : Nice, Monaco, Sophia Antipolis.
- Blog : 2 articles/mois alignés sur ces requêtes, chacun avec CTA plateforme.

## 5. Roadmap fusionnée 90 jours

| Semaines | Chantier | Livrable |
|---|---|---|
| 1-2 | Home + nav | Nouvelle promesse en ligne |
| 1-3 | Stripe + gating (A) | Premier paiement possible |
| 2-4 | Offres + prix + page AI Act | « Sur devis » éliminé |
| 3-5 | Hub formation | Funnel B2C/B2B unifié |
| 3-6 | Qualiopi (D) + progression/certificats (B) | Décision OPCO documentée |
| 4-12 | SEO éditorial + pages locales | 6+ pages publiées |
| 6-9 | Scanner RGAA (plafond 2-3 sem. dev) + page audit accessibilité | MVP en ligne |
| 6-10 | B2B équipes (C) | Première licence équipe vendable |

## 6. KPI (90 jours, complète le brief)

- Brief : 2 retainers signés, pipeline 10 diagnostics, conversion audit > 20 %.
- E-learning : premier paiement Stripe < S3 ; 100 comptes gratuits ;
  10 abonnements payants (dont 1 équipe) ; MRR plateforme > 500 € [estimation].

## 7. Risques et garde-fous

1. **Contenu = goulot.** Le moteur est prêt, il manque des parcours scénarisés.
   Ne pas vendre l'abonnement tout-catalogue avant 3 parcours complets.
2. **Qualiopi non vérifié** : ne conditionne PAS le B2C ni le blended direct,
   mais conditionne le discours « financement OPCO ». Vérifier avant la page hub.
3. **Plafond dev** : e-learning ne doit pas cannibaliser Bilber-B2B/PPWR
   Connect (priorité 1 du portefeuille). Les chantiers A et B sont bornés ;
   si dépassement, couper C, pas A.
4. **Prix publiés** : tous les prix e-learning sont [estimation] à valider par
   Hugues avant mise en ligne. Les fourchettes du brief (diagnostic,
   déploiement, retainer) sont arbitrées et publiables dès maintenant.
