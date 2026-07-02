# Module 1 · Les 5 patterns de prompts qui marchent

> **Durée lecture** : 12 min · **Durée vidéo NotebookLM cible** : 15-20 min

## Pourquoi ce module

Tout le monde "prompt". Très peu de gens prompt *bien*. La différence entre un prompt amateur et un prompt pro, c'est la structure. Pas le talent, pas le ton, la structure.

Cinq patterns. Ils couvrent 95 % de vos besoins. Une fois appris, vous les combinez.

---

## Pattern 1 · RTCF : la fondation

**R** ole · **T** ask · **C** ontext · **F** ormat

C'est le squelette de base de tout prompt pro. Quatre éléments. Dans cet ordre.

### Role
Qui doit répondre ? Ne dites pas "tu es un expert", c'est trop vague. Soyez précis : *"tu es un avocat spécialisé en droit du travail français, 15 ans d'expérience en cabinet B2B"*.

Pourquoi : le modèle a appris à imiter mille personas. Plus vous êtes précis, plus la réponse est calée sur le bon registre.

### Task
Que doit-il faire ? Verbe d'action, objet, livrable. *"Rédige un contrat de prestation"* > *"écris un mail"* > *"liste 5 risques"*.

### Context
Avec quelles données ? *"Le client est une SAS de 8 salariés, secteur SaaS, basée à Paris."* Sans contexte, la réponse est générique. Le contexte la cale sur votre situation.

### Format
Sous quelle forme ? *"En Markdown structuré, sections numérotées, max 800 mots."*

### Exemple complet

```
ROLE : Tu es un avocat spécialisé en droit du travail français, 15 ans d'expérience en cabinet B2B.

TASK : Rédige un contrat de prestation de service entre une SAS et un freelance.

CONTEXT : 
- Client : SAS de 8 salariés, secteur SaaS, basée à Paris
- Freelance : développeur React, micro-entreprise, basé à Lyon
- Mission : 3 mois, 90 jours-homme, 800 €/jour
- Risque principal à couvrir : la propriété intellectuelle du code

FORMAT : Markdown structuré, 6 sections numérotées, clauses standard du droit français, max 1200 mots.
```

Résultat : un contrat exploitable, calé sur votre cas. Pas un template générique.

---

## Pattern 2 · Few-shot prompting

Au lieu d'expliquer ce que vous voulez, **montrez** 2 à 5 exemples du résultat attendu. Le modèle s'aligne dessus.

### Quand l'utiliser
- Fixer un ton précis (votre voix de marque)
- Fixer un format complexe (un JSON avec une structure spécifique)
- Fixer un niveau de détail (court ou long, technique ou grand public)
- Quand l'explication serait plus longue que les exemples

### Exemple

```
Je veux que tu rédiges des titres de posts LinkedIn dans mon style. Voici 3 exemples de mes posts qui marchent :

EXEMPLE 1 : "La plupart des marketers parlent stratégie. Très peu en font. Voici ce que j'ai vu chez 50 boîtes en 2 ans."

EXEMPLE 2 : "Vous voulez +30 % de conversion ? Arrêtez d'optimiser votre landing. Commencez par votre brief créa."

EXEMPLE 3 : "5 ans de freelance. 3 leçons que j'aurais aimé entendre au début."

Maintenant, rédige 10 titres dans ce style, sur le thème "automatisation marketing avec l'IA".
```

Avec 3 exemples, le modèle capture le rythme, l'usage des chiffres, la posture (direct, opinionné, sans hype). Sans exemples, vous obtenez du LinkedIn générique.

### Combien d'exemples ?
- 2 exemples : suffisant pour des tâches simples
- 5 exemples : sweet spot pour fixer un style
- 10+ exemples : peu de gain supplémentaire, coût en tokens élevé

---

## Pattern 3 · Chain-of-thought : raisonner avant de répondre

Pour les questions complexes (math, logique, stratégie multi-étapes), ajoutez : *"Réfléchis étape par étape avant de me donner ta réponse finale."*

### Pourquoi ça marche
Par défaut, le modèle "saute" à la conclusion. Le chain-of-thought (CoT) le force à expliciter son raisonnement. Pour des questions où la réponse correcte dépend de plusieurs étapes, la précision augmente significativement (parfois +40 %).

### Quand l'utiliser
- Calcul ou estimation (prix, durée, ROI)
- Comparaison multi-critères (option A vs B vs C)
- Diagnostic (pourquoi X arrive)
- Stratégie en plusieurs étapes

### Exemple

```
J'ai 30 000 € pour lancer une campagne d'acquisition leads B2B. 
- 60 % du budget en Meta Ads, 40 % en Google Ads ?
- Ou 80 % en Google Ads, 20 % en Meta ?

Pour décider, réfléchis étape par étape :
1. Caractéristiques de ma cible (CTO français, boîtes 50-500 salariés)
2. Comportement de recherche typique de cette cible
3. Coûts moyens (CPL, CPC) sur Meta vs Google pour cette cible
4. Volume disponible sur chaque canal
5. Recommandation finale avec justification
```

Résultat : un raisonnement traçable. Vous voyez sur quoi se base la reco. Vous pouvez challenger.

### Note 2026
Les modèles "thinking" (Claude Opus 4.7 thinking mode, GPT-5 Pro, Gemini 2.5 Pro extended thinking) font ça automatiquement avant chaque réponse. Le pattern CoT manuel reste utile pour les modèles standards.

---

## Pattern 4 · Constraint prompting : forcer un format strict

Quand vous voulez une sortie utilisable par un autre système (CSV, JSON, Markdown structuré), vous devez contraindre le format précisément.

### Comment
1. Décrire le format en mots ("JSON avec 3 clés : name, score, reason")
2. Montrer un exemple exact ("comme ceci : {\"name\": \"...\", \"score\": 0.8, \"reason\": \"...\"}")
3. Interdire les variations ("ne mets PAS de texte autour, juste le JSON")

### Exemple

```
À partir des emails ci-dessous, extrais pour chacun :
- L'intention (rdv / question / plainte / spam)
- L'urgence (haute / moyenne / basse)
- Le résumé en 1 phrase

Réponds UNIQUEMENT en JSON, dans ce format exact :

[
  {"id": 1, "intention": "rdv", "urgence": "haute", "resume": "Demande RDV demain matin"},
  {"id": 2, "intention": "question", "urgence": "moyenne", "resume": "Question sur le pricing"}
]

PAS de texte autour. PAS de ```json. Juste le JSON brut.

Emails :
[coller les 5 emails ici]
```

Astuce Claude : utilisez les balises XML pour structurer vos inputs et outputs. C'est ce que Claude préfère.

```
<emails>
<email id="1">...</email>
<email id="2">...</email>
</emails>

<output_format>
JSON array, structure : {id, intention, urgence, resume}
</output_format>
```

---

## Pattern 5 · Critique then iterate : auto-correction

Le pattern le plus puissant et le moins utilisé. Vous demandez au modèle de critiquer sa propre réponse puis de la refaire.

### Comment

```
ÉTAPE 1 : Rédige une page de vente pour [produit].

ÉTAPE 2 : Maintenant, mets-toi à la place d'un copywriter pro et identifie 5 problèmes dans ta réponse précédente. Sois sévère.

ÉTAPE 3 : Réécris la page de vente en corrigeant ces 5 problèmes.
```

Le résultat de l'étape 3 est presque toujours nettement meilleur que celui de l'étape 1. Vous bénéficiez d'une "deuxième passe" qui sort le modèle de son mode "première idée plausible".

### Variante : la persona critique

```
Réponds d'abord, puis fais critiquer ta réponse par :
1. Un sceptique : qu'est-ce qui ne tient pas dans ce que tu dis ?
2. Un expert métier : quelle nuance technique manque ?
3. Un utilisateur final : qu'est-ce qui n'est pas clair ?

Puis livre une version finale qui répond à ces 3 critiques.
```

C'est lent (plus de tokens), c'est cher (plus d'API calls), mais pour les outputs importants (page de vente, contrat, deck investor), ça vaut le coût.

---

## Conclusion

Les 5 patterns, dans l'ordre utile :

1. **RTCF** : fondation de tout prompt sérieux
2. **Few-shot** : quand l'exemple vaut mille mots d'instruction
3. **Chain-of-thought** : quand le raisonnement compte
4. **Constraint** : quand le format est critique
5. **Critique then iterate** : quand la qualité est critique

Vous les combinez. Un bon prompt pro c'est souvent : RTCF + 2-3 few-shot + constraint format + sortie de secours (Module 0).

**Prochaine étape** : Module 2. System prompts à coller dans GPTs et Projets Claude. On y voit comment transformer ces patterns en "constitution" persistante pour votre assistant.

---

## Prompts livrés avec ce module

5 templates RTCF prêts à personnaliser dans la bibliothèque TROIE Prompts :
- Template Marketing
- Template Sales/B2B
- Template Recherche
- Template Code & Tech
- Template Créatif

(Disponibles en téléchargement après achat Cours 01)

## Variables NotebookLM

- **Audience** : utilisateur ChatGPT/Claude actuel qui veut professionnaliser
- **Ton** : pédagogique, démonstratif, avec démos visibles
- **Format** : video tutorial avec chaque pattern montré sur un exemple concret
- **Durée cible** : 15-20 min
- **Prompt customization** : *"Vidéo pédagogique sur les 5 patterns de prompts. Pour chaque pattern, montre un avant/après concret. Utilise des comparaisons (prompt naïf vs prompt pro). Insiste sur l'ordre RTCF et son importance."*
