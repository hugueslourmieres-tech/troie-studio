---
version: 1
slug: "src-app-locale-page-tsx"
primary_target: "src/app/[locale]/page.tsx"
related_targets: []
---

## Scope
Accueil de troiestudio.fr (FR et EN). Mode Persuade. Les pages intérieures (création, web, médias, stratégie, accompagnement, contact, hugues) héritent du même système et des mêmes règles de texte.

## Audience et action
Dirigeants de PME, marques e-commerce et grands groupes, à égalité. Ils veulent comprendre en quelques secondes ce que l'agence fait et ce qu'elle a obtenu. Action : réserver un appel de 30 min (principale), décrire son projet (secondaire).

## Preuves
Uniquement les chiffres de src/lib/results.ts, en pourcentages : LOIR +164 % de ventes, Rutherford +711 % TikTok, Autajon ×35 le budget. Travaux réels : sites livrés, films clients, photos.

## Direction contract
THESIS: La preuve avant la promesse : trois résultats chiffrés et animés juste sous un titre court, puis le travail réel qui les a produits. Refuse le héros d'agence qui empile des adjectifs et cache les résultats en bas de page.
OWN-WORLD: Fond blanc froid, encre presque noire, un seul bleu cobalt réservé aux chiffres et aux courbes, Geist et Geist Mono, cartes blanches à bord fin et rayon 16 px, boutons noirs en pilule, images de travaux en noir et blanc qui reprennent leur couleur au survol, logo TROIE en Bodoni.
STORY: Le visiteur lit la promesse, voit trois clients et leurs courbes, explore le tableau de bord, regarde les sites et les films, retrouve les services en six blocs, rencontre l'équipe, réserve 30 minutes.
FIRST VIEWPORT: Titre de 5 mots sur toute la largeur à gauche, en dessous une ligne avec la phrase d'appui à gauche et le bouton Réserver 30 min à droite, puis trois cartes de résultats égales (client, chiffre en bleu, mini-courbe) qui finissent dans le premier écran à 1440 x 900.
FORM: Les résultats en trois cartes, structure 2 de ma liste ordonnée du second tirage, choisie par Hugues dans la version plus sage. seed: f26a7a84 (clé de tirage de surface, second re-roll ; cette version n'imprime pas de référence à 16 caractères pour une surface)
SIGNATURE: les mini-courbes des trois cartes se tracent à l'arrivée, l'une après l'autre ; un clic sur une carte ouvre le tableau de bord sur ce client.
MOTION: entrées en fondu et léger glissement, une seule fois, courbes tracées en 1,2 s, films clients en boucle muets, rien d'autre ne bouge.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
