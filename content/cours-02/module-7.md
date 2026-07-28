# Module 7, Pipeline lead → mail → relance, en 1 après-midi

> **Durée lecture** : 14 min, **Durée vidéo NotebookLM cible** : 18-22 min

## Pourquoi ce module

C'est le cas d'usage business numéro 1. Tous les SaaS, freelances, agences en ont besoin. Un pipeline qui prend un lead qualifié, lui écrit, le relance, et le passe en RDV : sans intervention manuelle (sauf validation).

Setup en 1 après-midi avec ce que vous savez maintenant (Make + Claude/GPT + un CRM léger).

---

## Étape 1, La source de leads doit être qualifiée + RGPD

Le pipeline ne sauve pas une base pourrie. Investissez dans la source.

### Sources légales et qualifiées

- Formulaire site (consentement explicite)
- Events / salons (carte de visite + consentement)
- Réseau (referral, partenaire)
- Plateformes spécialisées (PME nationales, base 100 % opt-in)

### Sources à éviter

- Scraping LinkedIn (juridiquement fragile en 2026)
- Bases achetées d'origine douteuse
- Spam mass mailing

### Le format minimum dans votre CRM

- email
- prénom + nom
- entreprise + taille
- source du lead
- consentement RGPD (date, méthode)
- statut pipeline

---

## Étape 2, Scoring IA du lead

Vous voulez prioriser les bons. Faites scorer chaque lead par un LLM.

### Prompt scoring

```
Tu es Sales Operations. Tu scores des leads B2B sur une échelle 1-10.

Pour le lead suivant :
- Entreprise : {{lead.entreprise}}
- Taille : {{lead.taille}}
- Rôle : {{lead.role}}
- Source : {{lead.source}}
- Signaux comportementaux observés : {{lead.signals}}

Donne :
1. SCORE : note de 1 à 10
2. JUSTIFICATION : 2 phrases
3. ANGLE D'APPROCHE : la douleur la plus probable pour ce profil

Format JSON :
{"score": X, "justification": "...", "angle": "..."}
```

Vous appelez ce prompt via Make pour chaque nouveau lead. Score >= 8 = priorité haute, séquence chaude. Score 5-7 = séquence tiède. Score < 5 = newsletter long terme.

---

## Étape 3, Personnaliser massivement sans spammer

La règle : personnaliser le sujet, le premier paragraphe et l'exemple. Pas juste "Bonjour {{prenom}}".

### Prompt mail perso

```
Rédige un mail froid B2B pour [LEAD]. 4 phrases maximum.

PHRASE 1 : Un signal observé sur le lead (poste récent, post LinkedIn, news de la boîte). Tu utilises : {{signal_observe}}.
PHRASE 2 : Pourquoi tu écris MAINTENANT (timing).
PHRASE 3 : La valeur que tu apportes, en affirmation concrète.
PHRASE 4 : Question fermée facile à répondre.

Style : confiant mais pas hard sell. Comme un pair qui parle à un pair.

INTERDICTIONS :
- Pas de "j'espère que vous allez bien"
- Pas de "petit message"
- Pas d'emoji
- Jamais plus de 4 phrases
```

Couplé à un signal observé (Crunchbase, news API, Make Google Alerts), le mail sonne humain. Reply rate typique : 5-10 % sur des leads tièdes, 1.5-3 % sur du froid.

---

## Étape 4, Séquence J0/J7/J21/J45

### J0, Premier contact
Le mail ci-dessus.

### J7, Rappel doux
- Reprend en 1 phrase le contexte
- Ajoute un élément NOUVEAU (article, cas client, deadline interne)
- Question fermée

### J21, Valeur ajoutée
- Apporte un vrai insight sans demander
- Cas client de leur secteur
- "Si plus pertinent, dites-le, j'arrête"

### J45, Décision claire
- "On relance ou on clot ?"
- Donne le choix : oui / non / pas encore
- Dernière relance

### Stop-rules

Sortir le lead du pipeline si :
- Il répond
- Il demande à être retiré
- Il clique sur l'unsubscribe
- 45 jours sans réponse

---

## Étape 5, Réputation de domaine

Sans SPF/DKIM/DMARC bien configurés, vos mails atterrissent en spam. Personne ne les lit. Game over.

### Setup minimum

1. **SPF** : enregistrement DNS qui dit "qui peut envoyer depuis mon domaine"
2. **DKIM** : signature cryptographique de vos mails
3. **DMARC** : politique en cas d'échec SPF/DKIM

### Warm-up du domaine

Si nouveau domaine, ne PAS envoyer 1000 mails dès J1. Vous serez blacklisté immédiatement.

Progression typique :
- Semaine 1 : 5-10 mails/jour
- Semaine 2 : 20-30 mails/jour
- Semaine 3 : 50 mails/jour
- Semaine 4+ : 100+ mails/jour

### Outils

- **Mailwarm**, **Warmbox** : warm-up automatique 30 €/mois
- **Glockapps** : test délivrabilité

---

## Étape 6, Mesurer le ROI réel

### Métriques en 2026

Pixels qui se cassent, filtres anti-tracking, autoresponders Apple Mail Privacy Protection : open rate et click rate deviennent peu fiables.

**Mesurez le reply rate** (réponse texte humaine) :
- > 5 % sur tiède : bon setup
- > 1.5 % sur froid : bon setup
- < 0.5 % : revoir audience ou pitch

### KPI hiérarchie

1. **Reply rate** (priorité 1)
2. **RDV pris** (en out)
3. **Deals closés** (in)
4. **Open rate** (signal faible, à valider avec d'autres)

### A/B test

Pour valider votre pipeline IA, faites un test honnête :
- 100 leads de même profil
- 50 sequence écrite par vous manuelle (control)
- 50 sequence IA + Make (variant)
- Comparez reply rate + RDV pris sur 30 jours
- Décision basée sur les chiffres

---

## Étape 7, Setup time-to-prod

Avec les templates du Cours 02, vous pouvez avoir un pipeline opérationnel en **1 après-midi** :

| Heure | Action |
|---|---|
| 14h00 | Setup Make compte + Connection Claude/OpenAI |
| 14h30 | Import du template scénario "Lead Score" |
| 15h00 | Import du template "Mail perso J0" |
| 15h30 | Configurer SPF/DKIM (DNS provider) |
| 16h00 | Connecter votre CRM (HubSpot/Pipedrive/Airtable) |
| 16h30 | Test sur 5 leads manuels |
| 17h00 | Validation des outputs, ajustements prompts |
| 17h30 | Activer le scénario |
| 18h00 | Ça tourne. |

---

## Le piège à éviter

Le piège classique : **mettre toute votre énergie sur le volume**, oublier la qualité des leads et la valeur du contenu.

Volume × 10 sans qualité = réputation domaine cassée en 30 jours + bouche-à-oreille négatif.

**Investissez dans** :
1. La qualité de votre base (consentement, fit)
2. La qualité du contenu (pertinence, valeur)
3. Le timing (signaux observés, news)

**N'investissez pas dans** : envoyer plus.

---

## Conclusion

Pipeline pro = source qualifiée + scoring IA + 3-5 mails espacés + monitoring honnête. Setup 1 après-midi, ROI mesurable sous 30 jours.

**Prochaine étape** : Module 8. Les 8 MCPs stratégiques. On apprend à connecter votre LLM à Slack, Notion, Gmail, et tout votre stack.

---

## Variables NotebookLM

- **Audience** : sales/marketing ops qui veulent automatiser proprement
- **Ton** : opérationnel, ROI-focus, anti-spam
- **Format** : video walkthrough du pipeline étape par étape
- **Durée cible** : 18-22 min
- **Prompt customization** : *"Vidéo qui montre un pipeline complet lead-to-RDV étape par étape. Insiste sur la réputation domaine (SPF/DKIM), les stop-rules, et le A/B test honnête vs séquence manuelle."*
