# Module 8 — Les 8 MCPs stratégiques

> **Durée lecture** : 15 min · **Durée vidéo NotebookLM cible** : 18-22 min

## Pourquoi ce module

Un LLM dans son coin = limité aux tokens. Un LLM connecté à vos outils = il agit dans VOS workflows.

C'est ce que fait le **Model Context Protocol** (MCP), publié par Anthropic en novembre 2024, devenu le standard 2025-2026.

8 MCPs couvrent 90 % des besoins business. On les voit un par un avec setup, permissions, et garde-fous.

---

## MCP fondations

### C'est quoi
Un MCP = un connecteur standardisé qui expose des outils/données à un LLM. Le LLM peut alors les utiliser comme s'ils étaient natifs.

### Pourquoi c'est révolutionnaire
Avant MCPs : chaque intégration LLM ↔ outil X = code spécifique, à refaire à chaque LLM.
Avec MCPs : un MCP Slack fonctionne avec Claude, GPT, Gemini, **tout outil compatible**. Réutilisable.

### Architecture
- **MCP Server** : expose les capacités (lire Slack, écrire dans Notion)
- **MCP Client** : votre app LLM qui consomme (Claude.ai, ChatGPT desktop, Cursor)
- Communication via JSON-RPC

---

## MCP 1 — Slack

### Capacités
- Lire les channels (selon permissions)
- Envoyer messages (en tant qu'utilisateur ou bot)
- Réagir aux messages
- Créer des channels

### Setup
1. Aller sur slack.com/apps → créer une app
2. OAuth permissions : channels:read, chat:write, etc.
3. Installer dans le workspace
4. Récupérer le token
5. Configurer le MCP server avec le token

### Use case TROIE
*"Quand un client envoie un mail support, Claude résume dans #support-ops avec score d'urgence et propose une réponse en thread."*

### Garde-fou
**Read-only** sur 95 % des channels. **Write** uniquement sur un channel ops dédié.

---

## MCP 2 — Notion

### Capacités
- Lire pages et databases
- Créer/modifier pages
- Requêter databases avec filtres
- Gérer permissions

### Setup
1. Notion → Integrations → Create new
2. Capabilities : lire, écrire, mettre à jour
3. Partager les pages avec l'intégration
4. Token internal integration

### Use case TROIE
*"Toutes les notes de réunion atterrissent automatiquement dans Notion, structurées par client, avec actions/owners extraits."*

### Garde-fou
Limitez l'intégration aux **workspaces business** (pas la knowledge perso). Permissions par database.

---

## MCP 3 — Gmail

### Capacités
- Lire mails (selon scope)
- Rédiger drafts
- Envoyer mails (haut risque)
- Classer mails (labels)

### Setup
1. Google Cloud Console → OAuth 2.0 credentials
2. Scopes : gmail.readonly + gmail.compose pour démarrer
3. Plus tard : gmail.send après 30 jours de validation
4. MCP server officiel Anthropic disponible

### Use case TROIE
*"Triage automatique des emails, drafts de réponse pour les 80 % faciles, escalade visible des 20 % difficiles."*

### Garde-fou TRÈS IMPORTANT
- 30 premiers jours : **mode draft uniquement**, validation humaine sur chaque envoi
- Jamais d'auto-reply à un nouveau contact externe
- Pas de pièce jointe générée par IA sans validation

---

## MCP 4 — Figma

### Capacités
- Lire design files
- Exporter composants en code
- Voir le design system
- Suggérer des frames

### Setup
1. Figma → Settings → Personal access token
2. MCP Figma officiel disponible
3. Connect au file/team

### Use case TROIE
*"Claude lit votre design system et génère le code React + Tailwind d'un composant en respectant vos couleurs et typo."*

### Garde-fou
Read-only pour la prod. Write réservé aux duplicates de drafts.

---

## MCP 5 — GitHub

### Capacités
- Lire repos
- Créer issues, PRs, commits
- Reviewer PRs
- Lancer GitHub Actions

### Setup
1. GitHub → Personal access token (fine-grained)
2. Scope au repo nécessaire seulement
3. MCP officiel disponible

### Use case TROIE
*"Claude Code lit votre codebase, ouvre des PRs structurées, review automatiquement les PRs entrantes pour pre-screen."*

### Garde-fou
- Token scopé à 1 repo précis
- Pas de write sur main, uniquement branches
- Human review obligatoire sur merge

---

## MCP 6 — Google Analytics 4

### Capacités
- Requêter rapports GA4
- Custom segments
- Convertir questions naturelles en requêtes

### Setup
1. Google Cloud → Service Account avec accès GA4
2. JSON key file
3. MCP GA4 (officiel ou community)

### Use case TROIE
*"Vous demandez 'top 5 pages la semaine dernière par conversion' en français. Claude requête, lit, vous répond."*

### Garde-fou
Read-only. Pas de risque de modifier les comptes.

---

## MCP 7 — Stripe

### Capacités
- Voir paiements, abonnements
- MRR, churn, refunds
- Créer payment links

### Setup
1. Stripe → API keys (restricted)
2. Scope : read pour démarrer
3. MCP Stripe officiel

### Use case TROIE
*"Brief financier hebdo : MRR, top 5 clients, refunds, churn rate, alertes sur paiements en échec."*

### Garde-fou
**STRICT** : write (créer paiement, refund) toujours en mode validation humaine. Token restricted + IP whitelist.

---

## MCP 8 — Make/Zapier (orchestration)

### Capacités
- Déclencher scénarios depuis le LLM
- Récupérer outputs de scénarios
- Combiner avec d'autres MCPs

### Setup
- Make/Zapier exposent un webhook
- Le MCP webhook generic appelle ce webhook

### Use case TROIE
*"Vous demandez à Claude 'lance le scénario de reporting client X'. Claude appelle le webhook Make. Make lance le scénario. Vous récupérez le rapport."*

### Garde-fou
Webhooks signés (secret), rate limit côté Make.

---

## Permissions : la règle du minimum

### Principe
À chaque setup MCP, vous choisissez les **scopes** (permissions). **Toujours commencer par le minimum**.

### Workflow recommandé

1. **Phase 1** : read-only sur 1 ressource (ex: 1 channel Slack)
2. **Phase 2** : si tout va bien, étendre au reste read-only
3. **Phase 3** : write sur 1 ressource avec validation humaine
4. **Phase 4** : write élargi après 30 jours de validation

Ne sautez JAMAIS d'étape. Le bon agent est le mince qui démarre lentement.

---

## Self-hosted vs SaaS

### MCPs SaaS (officiels par les éditeurs)
- Setup rapide
- Maintenu par l'éditeur
- Vos data passent par leurs serveurs

### MCPs self-hosted
- Vous hébergez le MCP sur votre serveur
- Code open source
- **Vos data ne quittent jamais chez vous** = top RGPD

### Reco TROIE

Pour démarrer : SaaS (rapide).
Pour les données sensibles : self-hosted (sécurité).
Hybride : SaaS pour le non-sensible, self-hosted pour les cas critiques.

---

## Combien de MCPs activer ?

### Règle
4 à 8 MCPs bien choisis. Pas plus.

### Pourquoi
Trop de MCPs = le LLM perd du temps à savoir lequel utiliser, hésite, hallucine.

### Mix optimal
- 1 messaging (Slack)
- 1 doc (Notion)
- 1 mail (Gmail)
- 1 data (GA4)
- 1 dev (GitHub) si applicable
- 1 design (Figma) si applicable
- 1 paiement (Stripe) si SaaS
- 1 orchestrateur (Make)

---

## Conclusion

Les MCPs transforment votre LLM en assistant connecté à TOUT votre stack. Démarrez avec 3-4 MCPs strictement nécessaires. Étendez progressivement. Toujours en read-only d'abord.

**Prochaine étape** : Module 9 — 10 workflows business clés-en-main. On applique MCPs + agents à 10 cas concrets.

---

## Variables NotebookLM

- **Audience** : ops/devs qui veulent connecter leurs LLMs au stack business
- **Ton** : technique mais accessible, sécurité-first
- **Format** : video tutorial avec 1 MCP par segment de 2 min + démos
- **Durée cible** : 18-22 min
- **Prompt customization** : *"Vidéo MCPs avec setup pas-à-pas pour les 8 essentiels. Insiste sur la règle du minimum de permissions et la progression read-only → write avec HITL."*
