# Module 5 · Make & Zapier, les bases qui suffisent

> **Durée lecture** : 14 min · **Durée vidéo NotebookLM cible** : 18-22 min

## Pourquoi ce module

Vous savez prompter en chat. C'est bien. Mais 10 fois plus puissant : prompter via un workflow qui tourne tout seul. C'est ce que font Make, Zapier, n8n.

Ce module enseigne le minimum suffisant pour brancher votre Claude/ChatGPT sur **vos apps SaaS** sans coder. 5 scénarios livrés.

---

## Leçon 01 · Anatomie d'un scénario

Un scénario, c'est une suite de modules connectés qui s'exécute sur trigger ou planning.

**Composants** :
- **Trigger** : ce qui déclenche le scénario (nouveau mail, schedule CRON, webhook)
- **Modules** : les étapes (lire Notion, appeler Claude, écrire dans Slack)
- **Mapping** : comment les données passent d'un module au suivant

### Exemple simple

```
[Trigger CRON 8h] → [Lire Gmail derniers 24h] → [Filtre : pas spam] → 
[Appel Claude : résume en 5 lignes] → [Poster dans Slack]
```

Setup : 30 min. Tourne tous les jours, sans vous, à 8h pétantes. Brief Slack matinal pro.

---

## Leçon 02 · Make vs Zapier vs n8n

### Make (ex-Integromat)
- **Force** : workflows complexes (branches, boucles, iterators)
- **Tarif** : 9-29 €/mois (1000-100K operations)
- **UX** : visuel élégant, courbe d'apprentissage moyenne
- **Pour qui** : agences, freelances qui font du multi-step

### Zapier
- **Force** : simplicité, large catalogue d'apps
- **Tarif** : 20-69 $/mois
- **UX** : super simple, mais limité aux flows linéaires
- **Pour qui** : débutants, automatisations simples 1-trigger → 1-action

### n8n (self-hosted)
- **Force** : open source, hébergement chez vous = RGPD strict, pas de limite d'ops
- **Tarif** : gratuit en self-hosted, 20 €/mois en cloud n8n
- **UX** : technique, courbe d'apprentissage plus raide
- **Pour qui** : devs, équipes RGPD-sensitive (banque, santé, public)

### Reco TROIE 2026

- **Démarrer** : Make. Sweet spot UX/puissance.
- **Volume sérieux ou RGPD strict** : n8n self-hosted sur un VPS Hetzner (5 €/mois).
- **Très simple** : Zapier. Mais vous serez vite limité.

---

## Leçon 03 · Les 3 triggers essentiels

### Trigger 1 · Schedule (CRON)

Déclenche à heure fixe. Exemples :
- Brief matinal à 8h
- Veille concurrentielle à 18h
- Backup hebdo lundi 6h
- Rapport mensuel le 1er du mois

Setup Make : module "Schedule" → choisir fréquence → activer.

### Trigger 2 · Webhook

Une URL que Make écoute. Une app externe POST sur cette URL avec un payload → scénario démarre.

Cas d'usage :
- Formulaire Typeform soumis → workflow lance
- Stripe paiement reçu → activation produit
- Calendly RDV pris → préparer brief client
- GitHub push → notification équipe

### Trigger 3 · Polling app (Gmail, Slack, etc.)

Make check toutes les X minutes si une nouvelle data est apparue dans une app (nouveau mail Gmail, nouveau message Slack, nouvelle ligne Airtable). Si oui, déclenche.

Plus lent que webhook (latence de 1-15 min selon plan) mais marche avec toutes les apps même sans webhook officiel.

---

## Leçon 04 · Appeler Claude / GPT depuis Make

Make a un module **HTTP** générique. Vous configurez :

### Pour Claude

```
URL: https://api.anthropic.com/v1/messages
Méthode: POST
Headers:
  - x-api-key: [VOTRE_CLE_ANTHROPIC]
  - anthropic-version: 2023-06-01
  - Content-Type: application/json
Body (JSON):
{
  "model": "claude-opus-4-7",
  "max_tokens": 1024,
  "messages": [
    {"role": "user", "content": "{{1.contenu_du_mail}}"}
  ]
}
```

Le `{{1.contenu_du_mail}}` est un mapping Make : la donnée vient du module précédent.

### Pour ChatGPT (OpenAI)

```
URL: https://api.openai.com/v1/chat/completions
Méthode: POST
Headers:
  - Authorization: Bearer [VOTRE_CLE_OPENAI]
  - Content-Type: application/json
Body (JSON):
{
  "model": "gpt-5",
  "messages": [
    {"role": "system", "content": "Tu es..."},
    {"role": "user", "content": "{{1.contenu}}"}
  ]
}
```

### Bonne pratique

Stockez votre clé API dans les **Make Connections** (chiffré) ou dans les variables d'environnement de votre repo Make. **JAMAIS en clair** dans le module.

---

## Leçon 05 · Iterators : traiter une liste

Vous avez 50 leads dans un CSV. Vous voulez qualifier chacun avec Claude. Make peut le faire en 1 scénario avec un **Iterator**.

```
[Lire CSV] → [Iterator: parcours chaque ligne] → 
  [Appel Claude pour scorer ce lead] → 
  [Écrire score dans Notion]
```

L'Iterator décompose la liste et exécute les modules suivants 1 fois par élément. Pour 50 leads, 50 appels Claude, 50 écritures dans Notion. Tout en 1 scénario.

Coût : ~50 ops Make + 50 appels API Claude (~2-4 €).

### Astuce

Couplez avec un **Aggregator** ensuite, pour resynthétiser les résultats en 1 brief final.

---

## Leçon 06 · Coût typique d'un scénario IA quotidien

Estimation réaliste pour un scénario "brief matinal IA" qui tourne 1x/jour pendant 30 jours :

| Composant | Coût mensuel |
|---|---|
| Make (10 ops × 30j = 300 ops) | inclus dans plan 9 €/mois |
| API Claude (1 appel par jour, 2K tokens) | ~2-3 € |
| **Total** | **~12 €/mois** |

Si vous remplacez 30 min × 22 jours = 11 h de lecture/synthèse manuelle à 50 €/h = **550 €** d'équivalent temps économisé pour 12 € de coût technique.

**ROI = 45x**.

---

## Leçon 07 · Debugger un scénario Make

Make a un mode debug puissant. **"Run Once"** exécute le scénario en visualisant les données à chaque étape.

### Causes typiques d'erreur

1. **Mapping cassé** : vous référencez `{{1.email}}` mais le champ s'appelle `{{1.address}}`
2. **JSON malformé** : virgule en trop, guillemet manquant dans le payload
3. **Token expiré** : Connection à reconnecter
4. **Rate limit** : trop d'appels en peu de temps, attendre ou upgrade plan
5. **LLM réponse trop longue** : `max_tokens` à augmenter

### Workflow debug

1. **Run Once** sur le scénario
2. **Inspectez** chaque module : input bundle et output bundle
3. **Trouvez** où la data diverge de ce qui est attendu
4. **Corrigez** le mapping ou le payload
5. **Re-run**

95 % des bugs trouvés en 30 sec avec cette méthode.

---

## Leçon 08 · La règle d'or : valider avant l'envoi externe

L'IA peut produire du texte mal formaté, du JSON cassé, du contenu hors-sujet.

**Avant tout envoi externe** (email client, Slack public, post LinkedIn), ajoutez un module de validation :

- Regex check du format
- Parsing JSON safe (si JSON output attendu)
- Longueur minimale/maximale check
- Mot-clé interdit (si applicable)

Si la validation échoue, le scénario alerte un humain au lieu d'envoyer. Vous évitez 100 % des "oups, j'ai envoyé du Lorem Ipsum à 200 leads".

---

## 5 scénarios livrés avec ce module

1. **Brief matinal IA Slack** (le scénario qu'on a démonté ci-dessus)
2. **Triage email entrant** (Gmail → Claude → étiquette + dossier)
3. **Lead scoring auto** (Typeform → Claude → CRM)
4. **Veille concurrence quotidienne** (Google Alerts → Claude résume → Notion)
5. **Reporting client mensuel** (GA4 + Meta Ads → Claude → PDF → Gmail)

Templates Make `.json` exportables fournis. Vous importez en 1 clic dans votre Make.

---

## Conclusion

Make + Claude/GPT = 80 % de ce dont vous avez besoin pour automatiser. Pas besoin de coder. Pas besoin d'ingénieur.

**Prochaine étape** : Module 6. Agents persistants. On y passe de "scénario qui tourne sur trigger" à "agent qui observe-décide-agit dans la durée, avec mémoire".

---

## Variables NotebookLM

- **Audience** : utilisateurs qui ont fini Cours 01 et veulent passer aux workflows
- **Ton** : pratique, démos d'écran, beaucoup d'exemples chiffrés
- **Format** : video tutorial avec captures Make et code visible
- **Durée cible** : 18-22 min
- **Prompt customization** : *"Vidéo tutorial sur Make + API LLM. Insiste sur les 3 triggers, le mode debug, et la règle d'or de validation avant envoi externe. Montre les coûts réels (ROI 45x mentionné)."*
