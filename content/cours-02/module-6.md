# Module 6 — Agents persistants : mémoire, contexte, garde-fous

> **Durée lecture** : 16 min · **Durée vidéo NotebookLM cible** : 20-25 min

## Pourquoi ce module

Un scénario Make = workflow réactif (trigger → action).
Un agent persistant = entité qui **observe-décide-agit** dans la durée, avec mémoire, contexte évolutif, et garde-fous.

C'est le passage de "automatisation" à "délégation". Beaucoup plus puissant. Aussi beaucoup plus risqué si mal cadré.

---

## Leçon 01 — La différence chatbot vs agent persistant

**Chatbot** : répond à une question, oublie tout après.
**Agent** : tourne en arrière-plan, mémoire active, peut prendre des initiatives.

### Exemple concret

**Chatbot** : *"Réponds à cet email"* → réponse → fini.

**Agent** : tourne 24/7, surveille la boîte mail, classe les emails, répond aux faciles, escalade les complexes à un humain, garde mémoire des conversations passées avec chaque interlocuteur.

L'agent c'est **8 h × 7 jours** de "présence" intelligente. Le chatbot c'est **30 sec** de réponse ponctuelle.

---

## Leçon 02 — Mémoire d'agent : vectorielle + relationnelle

### Mémoire courte (contexte conversation)
- Stockée dans le context window du LLM
- Limite : 200K tokens (Claude) à 1M (Claude Opus 4.7 1M)
- Suffit pour une conversation, pas pour "tout savoir sur le client X depuis 6 mois"

### Mémoire longue : 2 types
1. **Vectorielle** (Pinecone, Qdrant, Supabase pgvector)
   - Stocke des chunks de texte avec embedding
   - Recherche sémantique : "qu'est-ce que le client X a dit sur le pricing ?"
   - Idéal pour "se souvenir de conversations passées"

2. **Relationnelle** (Postgres, Supabase)
   - Stocke des faits structurés : nom, email, statut, dernière action
   - Idéal pour "qui a payé ?", "combien de leads ce mois ?"

### Pattern TROIE recommandé

Combinez les deux :
- **Postgres** pour les faits (CRM-like)
- **Vector DB** pour les conversations (semantic search)
- L'agent interroge les deux selon le besoin

---

## Leçon 03 — Pattern ReAct (Reasoning + Acting)

ReAct fait alterner le LLM entre raisonnement explicite et action concrète, en plusieurs étapes.

### Exemple

Question : *"Qualifie ce nouveau lead et envoie-lui le bon mail de bienvenue."*

Sans ReAct : LLM réfléchit silencieusement et exécute. Si quelque chose foire, vous ne savez pas pourquoi.

Avec ReAct :
```
Thought: Pour qualifier le lead, j'ai besoin de connaître son secteur et la taille de sa boîte.
Action: Recherche dans Crunchbase
Observation: SaaS B2B, 50 employés
Thought: SaaS B2B 50 emp est dans ma cible parfaite. Score 9/10.
Action: Enregistrer le score 9 dans le CRM
Observation: OK
Thought: Score 9 = mail de bienvenue chaud + CTA RDV
Action: Envoyer mail "warm welcome with calendar link"
Observation: Mail envoyé.
```

Beaucoup plus précis, beaucoup plus debuggable.

---

## Leçon 04 — Garde-fous : human-in-the-loop sur l'irréversible

**Règle d'or absolue** : un agent qui peut envoyer un email externe / supprimer une donnée / faire un paiement DOIT avoir un humain dans la boucle pour les 30 premiers jours minimum.

### Comment

Au lieu d'**envoyer**, l'agent **drafte**. Vous validez d'un clic. Pendant 30 jours.

```
Agent: 'Voilà la réponse au lead. Slack moi un emoji pouce pour envoyer.'
Vous: 👍
Agent envoie.
```

Après 30 jours et un taux d'erreur < 2 %, vous pouvez progressivement loosen (auto-send pour les emails "simples", garder validation pour les "complexes").

### Liste des actions qui restent toujours human-in-the-loop

- Envoi email externe à un client
- Suppression de données clients
- Toute mention de prix ou geste commercial
- Modification de droits/accès
- Paiement, refund
- Publication publique (réseaux sociaux)

---

## Leçon 05 — Tool use : déclarer des fonctions au modèle

C'est le **coeur** d'un agent moderne. Vous déclarez des fonctions (search_client, send_mail, read_pdf) au modèle. Lui décide laquelle appeler.

### Syntaxe Anthropic (Claude)

```json
{
  "tools": [
    {
      "name": "search_client",
      "description": "Cherche un client dans le CRM par email",
      "input_schema": {
        "type": "object",
        "properties": {
          "email": {"type": "string", "description": "Email du client"}
        },
        "required": ["email"]
      }
    }
  ]
}
```

Vous envoyez ce tool au LLM. Le LLM peut décider *"j'ai besoin d'appeler search_client avec email=alice@x.com"*. Votre code exécute la fonction. Retourne le résultat. Le LLM continue.

### MCPs : le standard 2026

Anthropic a publié en novembre 2024 le **Model Context Protocol** (MCP). C'est devenu le standard pour exposer des outils à un LLM.

Un MCP = un connecteur réutilisable. Slack, Notion, Gmail, GitHub, etc. ont leurs MCPs officiels. Couvert en détail au Module 8.

---

## Leçon 06 — Pattern plan-then-execute

Pour les tâches longues (50+ étapes), l'agent doit d'abord faire un **plan complet**, puis l'exécuter étape par étape.

### Pourquoi

Sans plan : l'agent improvise, perd le fil après 10 étapes, recommence ou abandonne.
Avec plan : l'agent garde une roadmap claire, exécute, marque les étapes faites, peut reprendre s'il échoue.

### Exemple

Tâche : *"Lance la campagne marketing du nouveau produit X."*

Plan (étape 1, le LLM produit) :
```
1. Définir l'audience cible
2. Rédiger 3 angles de campagne
3. Générer 5 visuels par angle
4. Créer landing dédiée
5. Setup tracking analytics
6. Configurer campagne Meta Ads
7. Configurer campagne Google Ads
8. Lancer
9. Monitor jour 1-7
10. Rapport hebdo
```

Exécution (étape 2-10, l'agent exécute) : 1 étape à la fois, validation humaine sur les critiques.

Si l'étape 6 échoue, vous savez exactement où reprendre. Pas de "fuck it, on recommence tout".

---

## Leçon 07 — La règle 70 code / 30 LLM

Pour qu'un agent soit fiable à 99 %, déléguez au LLM uniquement ce qui demande **vrai jugement**. Mettez du code déterministe partout ailleurs.

### Exemples

**Code (déterministe)** :
- Format email valide ? Regex.
- Montant > 0 ? Comparaison.
- Statut = 'payé' ? Lookup DB.
- Filtre par date ? SQL WHERE.

**LLM (jugement)** :
- Cet email est-il urgent ?
- Quel ton adopter avec ce client ?
- Reformuler ce paragraphe.
- Quelle catégorie ?

### Effet

Un agent 100 % LLM : 80-85 % de fiabilité.
Un agent 70 % code / 30 % LLM : 95-99 % de fiabilité.

C'est la discipline qui sépare un proof-of-concept d'un agent production.

---

## Leçon 08 — Monitorer un agent en prod

Un agent qui tourne en silence sans monitoring = bombe à retardement.

### 3 métriques minimales

1. **Success rate** : % de tâches finies correctement
2. **Latence p95** : temps pour 95 % des tâches
3. **Coût par tâche** : token usage × pricing

### Outils

- **Langfuse** : open source, gratuit en self-hosted
- **LangSmith** : payant, intégré à LangChain
- **Helicone** : SaaS, simple
- **Grafana custom** : pour les gros volumes

### Alertes

- Success rate < 90 % → Slack alerte
- Coût quotidien > 2x baseline → Slack alerte
- Latence p95 > 5 sec → Slack alerte

---

## 3 agents persistants templates livrés

1. **Agent Veille** : surveille 10 sources, brief quotidien Slack 8h
2. **Agent Prospection** : qualifie + écrit + queue pour validation humaine
3. **Agent Support tier-1** : répond aux FAQ, escalade le reste

Templates code Python ou Node, prêts à déployer sur Render / Railway / Fly.io.

---

## Conclusion

Un agent persistant bien fait, c'est l'équivalent d'un employé junior dévoué 24/7 qui ne se plaint jamais. Mais comme tout employé, il faut le former (system prompt + tools), le superviser (HITL + monitoring), et lui donner des garde-fous.

**Prochaine étape** : Module 7 — Pipeline lead → mail → relance. On applique tout ça à un cas business standard.

---

## Variables NotebookLM

- **Audience** : utilisateurs niveau intermédiaire prêts pour les agents
- **Ton** : technique mais accessible, beaucoup de comparaisons (chatbot vs agent)
- **Format** : video tutorial avec démos d'architecture
- **Durée cible** : 20-25 min
- **Prompt customization** : *"Vidéo qui explique la différence chatbot/agent persistant avec analogie 'employé junior 24/7'. Insiste sur les garde-fous HITL et la règle 70/30 code/LLM."*
