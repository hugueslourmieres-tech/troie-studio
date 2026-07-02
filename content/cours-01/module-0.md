# Module 0 · Pourquoi un LLM hallucine et veut vous plaire

> **Statut** : gratuit, sans inscription · **Durée lecture** : 8 min · **Durée vidéo NotebookLM cible** : 12-15 min

## Pourquoi ce module existe

Avant d'apprendre à équiper votre IA, comprenez son fonctionnement de base. Sinon vous allez prompter à l'aveugle, vous prendre des hallucinations dans la figure, et accuser le modèle d'être nul. Le modèle n'est pas nul. Il fait exactement ce pour quoi il a été entraîné. Le problème, c'est ce pour quoi il a été entraîné.

Quatre leçons, 10 questions de validation à la fin.

---

## Leçon 01 · Le pre-training : un prédicteur statistique, pas un cerveau

Un LLM (Large Language Model) comme ChatGPT, Claude, Gemini, ce n'est pas un être pensant. C'est une machine statistique gigantesque.

**Comment ça apprend** : on lui montre des milliards de phrases en lui demandant à chaque fois "devine le mot suivant". Il se trompe au début, on corrige, il ajuste. Au bout de quelques milliers de milliards d'exemples, il devient excellent à ce jeu de devinette.

C'est tout. Il n'a rien compris au sens humain. Il a juste appris une probabilité massive : *"quand la phrase ressemble à X, le mot le plus probable ensuite c'est Y."*

**Pourquoi c'est important** : cela explique tout. Sa puissance (il peut continuer n'importe quelle phrase de façon plausible), et sa limite (il privilégie ce qui est plausible, pas ce qui est vrai).

Un LLM qui "raisonne" est en fait en train de générer un raisonnement plausible. Souvent ça colle avec la vérité. Parfois non. Et il ne saura pas la différence.

---

## Leçon 02 · Le RLHF : pourquoi il devient sycophant

Après le pre-training, le modèle sait continuer du texte. Mais il est brutal, parfois grossier, souvent inutile. On lui ajoute une deuxième couche : le **RLHF** (Reinforcement Learning from Human Feedback).

**Comment ça marche** : des humains comparent deux réponses du modèle et choisissent celle qu'ils préfèrent. Le modèle apprend à reproduire les réponses qui plaisent.

**Le piège** : les humains préfèrent les réponses confiantes, polies, qui leur donnent raison. Donc le modèle apprend à être confiant, poli, et à vous donner raison.

C'est ce qu'on appelle la **sycophancy** (complaisance). Le modèle a appris que dire "vous avez raison" est plus récompensé que dire "je crois que vous vous trompez". Il a appris que finir une réponse difficile par "tout est possible avec de la détermination !" est mieux noté que "c'est probablement irréaliste".

**Conséquence pratique** : ne lui demandez JAMAIS "est-ce que mon idée est bonne ?". Il vous dira oui. Demandez-lui plutôt "donne-moi 3 raisons pour lesquelles cette idée pourrait échouer".

---

## Leçon 03 · Les hallucinations : d'où elles viennent

Une "hallucination" c'est quand le modèle vous invente une information qui sonne juste mais est factuellement fausse. Un nom, une citation, une date, une statistique.

**Pourquoi ça arrive** : revenez à la Leçon 01. Le modèle est un prédicteur de tokens. Quand il ne connaît pas une info précise, il ne s'arrête pas pour le dire. Il génère ce qui *ressemble* à la bonne réponse. Et comme il a vu des milliards de phrases similaires, il génère quelque chose de très convaincant.

**Exemple typique** : vous lui demandez "qui a écrit X ?". Si l'auteur est célèbre et présent dans son entraînement, ça passe. Si l'auteur est obscur ou si vous avez mal écrit le titre, le modèle invente un auteur plausible. Avec aplomb.

**Les zones à risque maximum** :
- Chiffres précis (taux, pourcentages, dates)
- Citations exactes
- Références bibliographiques
- URLs et liens
- Noms propres rares

**La règle d'or** : ne JAMAIS publier un chiffre ou une citation sortie d'un LLM sans vérification humaine à la source. Jamais.

---

## Leçon 04 · Les 3 réflexes pour ne plus jamais vous faire avoir

Maintenant que vous comprenez le mécanisme, voici trois réflexes à intégrer dans tous vos prompts.

### Réflexe 1 · La sortie de secours autorisée

Dites-lui explicitement : *"Si tu n'es pas sûr à 90 %, réponds : je ne sais pas. Tu n'inventes JAMAIS de chiffre ou de citation."*

Ce simple ajout dans votre system prompt réduit les hallucinations de 50 à 80 % selon nos tests internes. Sans cette autorisation, le modèle pense qu'il *doit* répondre. Avec, il sait qu'il a le droit de s'abstenir.

### Réflexe 2 · Demander la source

Pour chaque affirmation factuelle, demandez : *"Cite la source de cette info. Si tu n'as pas de source vérifiable, marque-le 'non sourcé'."*

Le modèle ne peut pas vraiment "citer" (il n'a pas accès à internet en chat de base), mais cette consigne le force à différencier ce dont il est sûr (vu mille fois) de ce qu'il invente (peu de signal).

### Réflexe 3 · La critique avant la réponse

Pour les questions importantes, utilisez le pattern : *"Avant de répondre, liste 3 raisons pour lesquelles ma question pourrait être mal posée."*

Cela force le modèle à sortir de son mode sycophant et à challenger votre prémisse. Vous découvrirez souvent que vous posiez mal le problème.

---

## Conclusion

Un LLM n'est pas magique. C'est un prédicteur statistique entraîné pour vous plaire. Quand vous comprenez ça, vous arrêtez de le traiter comme un oracle et vous commencez à le traiter comme un outil. Un outil très puissant, mais qui nécessite votre vigilance.

**Prochaine étape** : Module 1. Les 5 patterns de prompts qui marchent. On y apprend à structurer ses demandes pour obtenir des résultats fiables, pas juste plausibles.

---

## QCM de validation (10 questions)

Le QCM est intégré directement dans la page web `/formations/module-0`. Score ≥ 7/10 débloque un code promo -15 % sur le Cours 01.

## Variables NotebookLM (pour génération vidéo)

- **Audience** : freelance / solo / équipe découvrant l'IA pro
- **Ton** : pédagogique, direct, sans jargon
- **Format souhaité** : Video Overview NotebookLM avec narration + concepts illustrés
- **Durée cible** : 12-15 minutes
- **Prompt customization** : *"Crée une vidéo pédagogique sur les fondations des LLM. Reste fidèle au ton du document : direct, factuel, avec des exemples concrets. Insiste sur les 3 réflexes de la dernière leçon. Pas de hype IA, pas de buzzwords."*
