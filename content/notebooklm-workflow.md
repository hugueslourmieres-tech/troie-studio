# NotebookLM Video Workflow pour les formations TROIE

> **Objectif** : transformer les `.md` des modules en vidéos pédagogiques narrées via Google NotebookLM Video Overview, puis publier dans l'espace membre.

---

## NotebookLM en 2026 — ce qu'il fait

[Google NotebookLM](https://notebooklm.google.com) (gratuit avec compte Google) génère :
- **Audio Overview** : podcast à 2 voix (style NPR / France Inter)
- **Video Overview** : vidéo narrée avec slides auto-générées (lancé en 2025)
- **Mind Maps** : carte mentale visuelle
- **Briefing Docs** : résumés structurés
- **Study Guides** : quizz et fiches

### Pour TROIE
Le format le plus utile : **Video Overview**. Chaque module .md = 1 vidéo de 12-25 min, hébergeable Mux/Cloudflare Stream, embedable dans l'espace membre.

---

## Liens certifiés

| Ressource | URL |
|---|---|
| **NotebookLM** (app principale) | https://notebooklm.google.com |
| **NotebookLM docs officielles** | https://support.google.com/notebooklm |
| **NotebookLM blog Google** | https://blog.google/technology/ai/notebooklm-features-update/ |
| **Mux** (hosting vidéo HLS) | https://www.mux.com |
| **Cloudflare Stream** (alternative) | https://www.cloudflare.com/products/cloudflare-stream/ |
| **Whisper** (transcription si vous ajoutez des sous-titres) | https://platform.openai.com/docs/guides/speech-to-text |

---

## Workflow étape par étape

### Étape 1 — Préparer la source

Pour chaque module, vous avez déjà :
- Le fichier `.md` dans `/content/cours-XX/module-N.md`
- Une section "Variables NotebookLM" en bas du module

Action : ouvrez le `.md`, copiez tout le contenu.

### Étape 2 — Créer un Notebook

1. Allez sur https://notebooklm.google.com
2. **"+ Create new notebook"**
3. Nommez-le : *"TROIE Cours 01 — Module 0"* (ou équivalent)

### Étape 3 — Ajouter les sources

NotebookLM accepte :
- Docs (Google Docs)
- PDFs
- Pages web (URL)
- Texte collé
- YouTube vidéos (transcript)
- Audio files

**Pour TROIE** :
1. Cliquez **"Add source"** → **"Paste text"**
2. Collez le contenu du `.md`
3. Validez

Optionnel : ajoutez 1-2 sources complémentaires pour enrichir :
- Pour Module 0 : un article Anthropic sur le RLHF (https://www.anthropic.com/research)
- Pour Module 5 : la doc Make officielle
- Pour Module 8 : la doc MCP Anthropic (https://modelcontextprotocol.io)

### Étape 4 — Générer la Video Overview

1. Une fois la source ajoutée, dans le panneau de droite cliquez **"Video Overview"**
2. **Customize the video** (facultatif mais recommandé) : collez le prompt customization de la section "Variables NotebookLM" du `.md`
3. Cliquez **"Generate"**
4. **Wait 5-15 minutes** (selon longueur de la source)

### Étape 5 — Récupérer la vidéo

1. Une fois prête, vous pouvez :
   - **Regarder en preview** dans NotebookLM
   - **Télécharger** le `.mp4`
   - **Partager** via lien (limité)

2. **Téléchargez le `.mp4`**

### Étape 6 — Upload vers votre hosting

Pour l'espace membre TROIE :

**Option A — Mux** (recommandé pour qualité pro)
1. Compte Mux (https://www.mux.com), plan starter ~10 $/mois
2. Upload via Direct Upload ou API
3. Récupérer le playback ID
4. Embed via `@mux/mux-player-react`

**Option B — Cloudflare Stream** (~5 $/1000 min)
1. Compte Cloudflare Stream
2. Upload via dashboard ou API
3. Récupérer l'URL HLS
4. Embed via `<video>` avec HLS.js

**Option C — YouTube unlisted** (gratuit mais branding YouTube)
1. Upload sur YouTube avec visibilité "Non répertorié"
2. Embed via `<iframe>`
3. Inconvénient : pubs possibles, branding YouTube
4. Avantage : zero coût hosting

---

## Limites NotebookLM à connaître

### Limite 1 — Langue
- Audio/Video Overview supporte FR (depuis 2025), EN, ES, JP, etc.
- Force la langue dans le **Customize prompt** : *"Génère la vidéo en français"*

### Limite 2 — Durée
- Vidéos limitées à ~25-30 min max actuellement
- Pour les modules longs (Module 9 par exemple), splittez en 2 sources si nécessaire

### Limite 3 — Visuels
- Les slides sont auto-générées (templates Google)
- Pas de contrôle fin sur la DA
- **Workaround** : pour TROIE, prévoir un re-traitement DaVinci/After Effects optionnel pour overlay logo + transitions custom (1-2 h par module)

### Limite 4 — Quota
- Gratuit jusqu'à 100 notebooks (largement suffisant pour TROIE)
- Premium NotebookLM Plus : 5x les notebooks (~20 €/mois)

---

## Alternative : Heygen / Synthesia pour avatar narration

Si vous voulez une vidéo avec **votre avatar** (votre tête, votre voix), au lieu d'une voix générique NotebookLM :

| Outil | Avantages | Inconvénients | Tarif |
|---|---|---|---|
| **Heygen** | Avatar custom de vous-même (clonage 1 min) | Plus cher | 30-100 $/mois |
| **Synthesia** | Avatars stock pro, multilingue | Pas votre vraie tête | 30-90 $/mois |
| **HeyGen Interactive** | Avatar conversationnel | Très récent, beta | Sur demande |

**Workflow Heygen** :
1. Cloner votre avatar (recording 1 min)
2. Coller le script du module .md
3. Choisir la voix (votre clone vocal ou voix stock)
4. Générer → MP4 livré

**Reco TROIE** : démarrez avec NotebookLM (gratuit, rapide). Si la réception est bonne, passez à Heygen pour Cours 01+02 pour incarner la marque.

---

## Workflow recommandé TROIE (24 vidéos à produire)

### Phase 1 — Validation concept (Module 0 only)
1. Générer le Module 0 via NotebookLM (15 min)
2. L'embedder dans `/formations/module-0` en MVP
3. Recueillir feedback utilisateurs (5-10 personnes)
4. Décider : continuer NotebookLM, ou passer à Heygen ?

### Phase 2 — Production Cours 01 (5 modules)
- 5 vidéos × 1 h de travail (génération + upload + embed) = 5 h

### Phase 3 — Production Cours 02 (6 modules)
- 6 vidéos × 1 h = 6 h

### Phase 4 — Polish (optionnel)
- Re-traitement DaVinci pour overlay logo + intro custom (1 h/vidéo)
- Sous-titres FR + EN (Whisper, 30 min par vidéo)
- Total polish : 2 jours

**Time-to-prod total** : 2-3 jours pour la version MVP, 5-7 jours pour version polish.

---

## Prompts NotebookLM à coller selon module

Chaque module .md contient une section **"Variables NotebookLM"** en bas avec :
- Audience cible
- Ton recommandé
- Format cible
- Durée cible
- **Prompt customization** prêt à coller dans NotebookLM

Exemple Module 0 :
> *"Crée une vidéo pédagogique sur les fondations des LLM. Reste fidèle au ton du document : direct, factuel, avec des exemples concrets. Insiste sur les 3 réflexes de la dernière leçon. Pas de hype IA, pas de buzzwords."*

Collez ces prompts à l'étape 4 du workflow.

---

## Stockage / organisation

```
/content/
  /cours-01/
    module-0.md
    module-1.md
    module-2.md
    module-3.md
    module-4.md
  /cours-02/
    module-5.md
    module-6.md
    module-7.md
    module-8.md
    module-9.md
    module-10.md
  /videos/
    cours-01-module-0.mp4   (output NotebookLM)
    cours-01-module-1.mp4
    ...
  notebooklm-workflow.md      (ce fichier)
```

Une fois les vidéos uploadées dans Mux/Cloudflare, vous gardez les `.mp4` originaux en backup local + iCloud/Google Drive.

---

## Pour aller plus loin

- **NotebookLM Plus** ($20/mois) : 5x les notebooks, custom branding sur les outputs, sharing avancé
- **API NotebookLM** : pas encore disponible publiquement en 2026 (en beta limitée)
- **Workflow auto** : si l'API arrive, on pourra générer automatiquement les vidéos depuis le repo (CI/CD)

---

## TL;DR

1. Source : `.md` de chaque module dans `/content/cours-XX/`
2. NotebookLM : copy-paste → customize prompt → Generate Video Overview
3. Hosting : Mux ou Cloudflare Stream
4. Embed : dans l'espace membre `/formations/dashboard` (Step C suivante)

Setup time complet : 5-7 jours pour les 11 vidéos. ROI : chaque cours devient une formation vidéo pro vendable 97-297 €.
