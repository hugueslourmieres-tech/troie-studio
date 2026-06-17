# Module 4 — Limites, sécurité des données, RGPD

> **Durée lecture** : 10 min · **Durée vidéo NotebookLM cible** : 12-15 min

## Pourquoi ce module

Tout ce qu'on a appris jusqu'ici peut devenir un cauchemar légal/business si vous coller des données sensibles dans le mauvais endroit. Ce module dit ce qu'on NE met JAMAIS dans un LLM, où le mettre quand on doit, et comment rester conforme RGPD.

C'est court. C'est crucial.

---

## Leçon 01 — Ce qu'on NE met JAMAIS dans un chat web

### Le contexte

Les chats web grand public (chat.openai.com, claude.ai en plan personnel, gemini.google.com) peuvent utiliser vos messages pour entraîner les modèles. Selon les CGU + votre pays + votre plan.

**Anthropic** : par défaut, les chats Claude.ai personal sont utilisés pour améliorer le modèle. Vous pouvez désactiver dans les Privacy Settings.

**OpenAI** : ChatGPT Plus n'est pas utilisé pour entraîner par défaut depuis 2023. ChatGPT Free, oui (sauf opt-out).

**Google** : Gemini chat web peut être lu par des évaluateurs humains pour amélioration.

### Ce qu'on NE met JAMAIS dans ces chats web

1. **Données clients identifiables** (nom + email + société + détails commerciaux)
2. **Mots de passe, codes API, clés privées, secrets**
3. **Contrats sous clause de confidentialité explicite**
4. **Données de santé, judiciaires, biométriques** (catégories spéciales RGPD)
5. **Données financières détaillées** (relevés bancaires nominatifs, soldes)
6. **Données mineurs**
7. **Stratégie business sensible** (prix négociés, contrats fournisseurs)

### Règle simple

Si vous ne voulez pas que cette donnée se retrouve dans un journal, ne la mettez pas dans un chat web. Point.

---

## Leçon 02 — Où mettre les données sensibles quand on doit les traiter

### L'API en mode privacy

Les **APIs payantes** d'Anthropic et OpenAI **n'utilisent pas vos inputs pour l'entraînement** par défaut. C'est dans leurs Data Processing Agreements.

- **Anthropic API** : 0 % de vos données utilisées pour le training.
- **OpenAI API** : 0 % depuis 2023 (CGU explicites).

Pour les usages business, **passez systématiquement par l'API**, pas par le chat web.

### Comment

1. **Make / Zapier / n8n** : appellent l'API en arrière-plan, votre data est en sécurité (voir Cours 02 pour le détail)
2. **Custom app** : un dev appelle l'API directement avec votre clé
3. **Tools comme Cursor, Claude Code** : appellent l'API, vous configurez vos propres credentials

### Hébergement EU pour RGPD strict

Si vous traitez des données RGPD à haute sensibilité :
- **Azure OpenAI EU** : OpenAI hébergé chez Microsoft en zone EU
- **Anthropic via AWS Bedrock EU** : Claude hébergé via AWS en zone EU
- **Mistral** : modèle français, hébergement EU natif (alternative crédible en 2026)

Avec ces options, vos données ne quittent jamais l'EU. Votre DPO est content.

---

## Leçon 03 — Anonymiser avant d'envoyer

Même avec une API privacy-safe, **bonne pratique pro** : anonymiser les PII (Personally Identifiable Information) avant l'envoi.

### Ce qu'on anonymise

- Noms → "[NOM_CLIENT_01]"
- Emails → "[EMAIL_01]"
- Téléphones → "[TEL_01]"
- Adresses → "[ADRESSE_01]"
- Numéros de contrat / SS → "[ID_01]"

### Outils

- **Présidio (Microsoft)** : open source, détecte et masque PII automatiquement
- **Regex maison** : pour les patterns simples
- **MCP Anonymizer** (TROIE livre un template en Cours 02)

### Workflow

1. Vous prenez la donnée brute
2. Vous passez par l'anonymiseur
3. Vous envoyez la version anonymisée au LLM
4. Vous recevez la réponse, vous remappez les placeholders si nécessaire

### Bonus

Si jamais une fuite se produit, votre data sortie n'est pas exploitable. Belt and suspenders.

---

## Leçon 04 — Quand redémarrer une conversation

Un contexte pollué (longue conversation, plusieurs corrections successives) fait souvent dériver le modèle.

### Signes d'un contexte pollué

- Le modèle répète des erreurs déjà corrigées
- Il invente des éléments qu'on n'a jamais discutés
- Il devient contradictoire entre 2 réponses
- Il oublie des instructions du début

### Solution

**Redémarrez** une conversation neuve. Avec le bon system prompt et un seul prompt clair, vous avez souvent une meilleure réponse en 30 secondes qu'après 1 heure de tâtonnement.

### Règle empirique

Au-delà de **30-40 messages dans une conversation**, la qualité dégrade. Redémarrez.

---

## Leçon 05 — Calculer le ROI de votre stack en 30 jours

Tout ce qu'on apprend n'a de valeur que si c'est rentable. Voici le calcul honnête.

### Le calcul

```
ROI mensuel = (Heures économisées × votre TJM horaire) − (Coût abonnements + temps de setup amorti)
```

### Exemple concret pour un freelance design à 70 €/h

**Coûts mensuels** :
- ChatGPT Plus : 20 €
- Claude Pro : 20 €
- Midjourney : 30 €
- **Total** : 70 €/mois

**Temps de setup initial** :
- 3 soirées d'installation = 12 h × 70 €/h = 840 €
- Amorti sur 12 mois = 70 €/mois

**Coût mensuel total** : 70 € + 70 € = **140 €/mois**

**Gain mensuel typique** : 8 h/semaine × 4 = 32 h/mois × 70 €/h = **2 240 €/mois**

**ROI net** : **2 100 €/mois**

C'est conservateur. Pour des profils qui gagnent plus (consultant 150 €/h, dev senior 100 €/h), le ROI explose.

### La vraie question

Ce n'est pas "ça vaut le coup ?". C'est "à quel moment je commence ?". La réponse est toujours : ce week-end.

---

## Conclusion

Avec ce module, vous savez :
- Ce qu'on ne met JAMAIS dans un chat web
- Comment passer par l'API pour sécuriser
- Comment anonymiser pour le RGPD strict
- Quand redémarrer une conversation
- Comment calculer votre ROI

**Vous avez fini le Cours 01.**

Vous savez prompter (Module 1), figer un assistant (Module 2), appliquer à des cas concrets (Module 3), et garder vos données en sécurité (Module 4).

La suite logique, c'est le Cours 02 : connecter votre IA à vos outils (MCPs), construire des workflows qui tournent sans vous, déployer des agents persistants.

---

## Checklist sécurité TROIE (à imprimer)

- [ ] Tous les chats web personnels en privacy mode (opt-out training)
- [ ] Tous les usages business via API (Anthropic / OpenAI / Mistral)
- [ ] Données sensibles : Azure EU ou AWS Bedrock EU
- [ ] Anonymisation PII avant chaque envoi
- [ ] Redémarrage conversation tous les 30-40 messages
- [ ] Backup de mes prompts pro dans un Notion / repo Git
- [ ] Pas de mots de passe ou clés API dans les prompts
- [ ] ROI mensuel mesuré (heures économisées × TJM)

## Variables NotebookLM

- **Audience** : utilisateurs qui ont compris les bases et veulent rester safe en production
- **Ton** : sérieux, factuel, sans alarmisme mais sans complaisance
- **Format** : video éducative avec checklist visible à la fin
- **Durée cible** : 12-15 min
- **Prompt customization** : *"Vidéo qui sert d'avertissement raisonnable sur la sécurité données + RGPD avec les LLM. Cite des chiffres réels (gains ROI), donne la checklist finale. Pas de FUD (fear, uncertainty, doubt), juste les bonnes pratiques pros."*
