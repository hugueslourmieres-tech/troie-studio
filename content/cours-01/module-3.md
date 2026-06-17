# Module 3 — 10 cas d'usage solo

> **Durée lecture** : 16 min · **Durée vidéo NotebookLM cible** : 22-28 min

## Pourquoi ce module

Vous savez prompter (Module 1). Vous savez fixer un assistant (Module 2). Place au concret : **10 cas d'usage solo** qui couvrent 80 % du quotidien d'un indépendant ou d'un solopreneur.

Pour chaque cas : le setup minimum, la sortie attendue, le temps gagné mesuré.

---

## Cas 01 — Triage email (30 min → 3 min)

**Setup** : Custom GPT "Email Triage" avec 5 catégories (URGENT / RDV / DEVIS / SUPPORT / PUB) + 10 exemples par catégorie + format de sortie tableau.

**Workflow** : matin, vous copiez vos 50 emails non lus. Vous collez. 30 secondes. Vous avez un tableau trié, avec résumé 1 ligne par email.

**Gain mesuré** : 30 min de tri quotidien → 3 min. Soit **2,2 h/semaine** récupérées.

**Astuce** : ajoutez une colonne "réponse suggérée 1 ligne" pour les emails simples. Vous traitez 70 % des emails en réponse copier-coller.

---

## Cas 02 — 30 jours de posts LinkedIn dans votre voix

**Setup** : Custom GPT "Content LinkedIn" avec :
- Votre persona pro en 5 lignes
- 5 sujets pillars (vos thèmes récurrents)
- 20 de vos meilleurs posts (matière à imiter le style)
- 3 templates structurels qui marchent chez vous

**Workflow** : début de mois, vous demandez "30 idées de posts sur [pillar X] dans mon style". Il sort 30 hooks + 10 développés. Vous gardez 10, vous éditez, vous schedule via Buffer ou Publer.

**Gain mesuré** : 4-5 h/semaine de "réflexion contenu" → **1 h/semaine**.

**Limite** : il faut éditer. 30 % des posts générés sont publiables tels quels. 70 % demandent un retravail léger. C'est le bon ratio : un assistant, pas un remplaçant.

---

## Cas 03 — Devis personnalisé en 30 secondes

**Setup** : voir le Pack 01 TROIE Prompts → System Prompt "Devis personnalisé" complet livré.

**Workflow** : client envoie un brief. Vous le copiez dans votre Custom GPT "Devis solo". 30 secondes. Vous recevez un devis structuré (Périmètre / Livrables / Conditions) calé sur votre grille.

**Gain mesuré** : 30-45 min de rédaction → 5 min (lecture + ajustement).

**Critique attendue** : "et si le brief est flou ?". Le prompt force le modèle à poser des questions clarifiantes au lieu d'inventer. Pas de devis sans données suffisantes.

---

## Cas 04 — Veille concurrentielle quotidienne

**Setup** : Projet Claude "Veille [secteur]" avec :
- 3-5 concurrents nommés (URL, profil dirigeant)
- Vos sources de veille (TechCrunch, blogs spécialisés, podcasts)
- Format : brief 5 lignes/jour, "ce qui a bougé"

**Workflow** : vous demandez chaque matin "résumé de hier sur mes concurrents". Le modèle ne peut pas vraiment "veiller" en temps réel (sauf avec recherche web activée), donc vous le couplez à :
- Google Alerts (gratuit)
- Notion AI (avec MCP web search en Cours 02)
- Ou Make + RSS feeds (voir Cours 02)

**Gain mesuré** : 4-8 h/mois → 30 min/mois. La vraie valeur : vous tenez la veille même quand vous êtes en deep work.

---

## Cas 05 — Transcription + résumé de réunion

**Setup** :
1. **Otter.ai** ou **Fireflies** ou **Whisper API** pour transcrire
2. Custom GPT "Meeting Notes" qui structure le transcript en : Décisions / Actions / Points ouverts

**Workflow** : meeting finit. 5 min plus tard, vous avez un compte-rendu pro avec actions clairement attribuées.

**Gain mesuré** : 30-60 min de prise de notes + rédaction → 5 min.

**Bonus** : ajoutez "prochaine étape suggérée" pour chaque action. Le modèle est bon pour ce genre de suggestion contextuelle.

---

## Cas 06 — Pages de vente qui convertissent

**Setup** : Custom GPT "Sales Copy" avec :
- 3 frameworks éprouvés (AIDA, PAS, Before-After-Bridge)
- 3-5 pages de vente de référence dans votre secteur
- Votre voix de marque

**Workflow** : vous donnez le brief (audience, douleur, transformation, prix, preuve). Le modèle rédige une v1. Vous demandez le pattern "critique then iterate" du Module 1 pour une v2. Vous éditez 20 % manuellement. Vous publiez.

**Gain mesuré** : 1-2 jours de rédaction → 2-3 h.

**Note importante** : ne laissez JAMAIS l'IA inventer une preuve sociale, un témoignage ou un chiffre de résultat. Toujours validé manuellement à la source.

---

## Cas 07 — 10 visuels on-brand par jour avec Midjourney

**Setup** : système prompt Midjourney avec :
- `--cref [URL de vos visuels existants]` pour la cohérence persona
- `--sref [URL de votre style ref]` pour la cohérence visuelle
- Prompts contenant vos couleurs exactes (hex)

**Workflow** : pour chaque post / campagne, vous générez 4 variantes. Vous prenez la meilleure. 5 minutes par visuel fini.

**Gain mesuré** : 1-2 h pour un visuel pro custom → 5-15 min.

**Limite** : ne fonctionne pas pour les visuels avec texte précis (Midjourney est mauvais en texte). Pour ça, restez sur Figma + import de la base Midjourney.

---

## Cas 08 — Analyse CSV en 2 minutes

**Setup** :
- **ChatGPT Plus** avec Code Interpreter activé, OU
- **Claude** avec Analysis tool, OU
- **Gemini** dans Sheets

**Workflow** : vous uploadez un CSV (jusqu'à 1 MB en chat, plus si API). Vous demandez : *"3 patterns inhabituels dans cette data + 3 actions concrètes que je devrais prendre"*. 2 minutes plus tard, vous avez un mini-rapport avec graphes.

**Gain mesuré** : 4-8 h d'analyse Excel manuel → 30 min.

**Limite** : pour des analyses complexes (régressions, time series), vous restez sur un vrai outil data (Python notebook, Power BI). L'IA fait l'analyse de surface, pas la modélisation.

---

## Cas 09 — Comptabilité simplifiée mensuelle

**Setup** : Custom GPT "Compta perso" avec :
- Votre plan comptable (frais pro, achats, ventes, perso, prestation)
- 50 transactions catégorisées en exemples

**Workflow** : fin de mois, vous exportez votre relevé bancaire en CSV. Vous le collez. Le modèle catégorise tout. Vous validez les zones grises (5-10 transactions par mois en moyenne).

**Gain mesuré** : 4 h/mois → 30 min.

**Important** : **ne remplace pas un comptable** pour le bilan annuel, la TVA déclarée, les optimisations fiscales. Mais fait gagner du temps sur le suivi mensuel.

---

## Cas 10 — Traduction de site en 5 langues sans perdre la voix

**Setup** : Claude (meilleur sur la nuance de langue que GPT et Gemini) avec :
- System prompt "voix de marque" complet
- Glossaire de 30-50 termes (votre vocabulaire spécifique)
- 3 pages bilingues de référence (FR ↔ EN par exemple)

**Workflow** : vous lui donnez votre page FR + langue cible. Il traduit en respectant le glossaire et la voix. Édition humaine sur les 10 % restants (nuances culturelles, idiotismes).

**Gain mesuré** : 1 semaine par langue avec freelance → 1 jour.

**Astuce** : pour les marchés clés (US, UK), gardez un proofreader native en post-prod. Pour les marchés secondaires (LATAM, EU expansion), le rendu Claude + édition légère suffit.

---

## Conclusion

Dix cas d'usage. Tous testés en production chez TROIE et nos clients. Le gain total typique pour un solo qui implémente 5 de ces 10 cas : **10 à 15 h/semaine récupérées**.

Pas magique. Pas instantané. Le setup initial demande 2-3 soirées. Mais le ROI est rentable dès la semaine 2.

**Prochaine étape** : Module 4 — Limites, sécurité des données, RGPD. Avant de tout brancher, on apprend ce qu'on NE met JAMAIS dans un LLM.

---

## Prompts livrés avec ce module

25 prompts métiers couvrant les 10 cas d'usage (voir bibliothèque TROIE Prompts Pack 01-05).

## Variables NotebookLM

- **Audience** : freelance / solopreneur qui veut passer du gadget au pro
- **Ton** : pragmatique, chiffré, "voici ce qui marche vraiment"
- **Format** : video démonstrative, 1 cas d'usage = 1 capsule de 2 min
- **Durée cible** : 22-28 min
- **Prompt customization** : *"Vidéo qui montre les 10 cas d'usage avec une démo concrète pour chacun. Toujours commencer par 'combien de temps ça prenait avant' et finir par 'combien ça prend maintenant'. Quantifié, pratique, pas de hype."*
