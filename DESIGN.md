---
name: TROIE Studio
description: Agence digitale qui montre ses résultats avant de parler d'elle. Fond blanc, encre presque noire, un seul bleu cobalt pour les chiffres.
colors:
  canvas: "#fcfcfd"
  band: "#f3f4f6"
  band-deep: "#e9ebef"
  surface: "#ffffff"
  ink: "#111318"
  ink-hover: "#2a2e37"
  graphite: "#4f5562"
  cobalt: "#2f5bd3"
  cobalt-wash: "rgba(47, 91, 211, 0.08)"
  warm: "#e4570f"
  rule: "rgba(17, 19, 24, 0.09)"
  rule-strong: "rgba(17, 19, 24, 0.22)"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.75rem (sm 3.75rem, lg 5.5rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem (md 3rem, sections larges md 3.75rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  figure:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.75rem (md 3.25rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontFeature: "tnum"
  figure-small:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem (md 1.75rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  body-lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "-0.005em"
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
  data-mono:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.3
    fontFeature: "tnum"
  wordmark:
    fontFamily: "Bodoni Moda, ui-serif, Georgia, serif"
    fontSize: "28px à 34px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.04em à 0.8em"
rounded:
  focus: "6px"
  tooltip: "8px"
  control: "12px"
  card: "16px"
  pill: "9999px"
spacing:
  gutter-mobile: "20px"
  gutter-desktop: "48px"
  card-gap-mobile: "12px"
  card-gap-desktop: "20px"
  card-inset: "24px"
  card-inset-desktop: "28px"
  section-y: "80px"
  section-y-desktop: "112px"
  section-y-wide: "96px"
  section-y-wide-desktop: "128px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.surface}"
  button-primary-compact:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "40px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  link-accent:
    textColor: "{colors.cobalt}"
    typography: "{typography.label}"
  result-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-inset}"
  result-card-figure:
    textColor: "{colors.cobalt}"
    typography: "{typography.figure}"
  analytics-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
  analytics-client-selected:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
  analytics-tab:
    backgroundColor: "{colors.band}"
    textColor: "{colors.graphite}"
    padding: "16px 24px"
  analytics-tab-selected:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.cobalt}"
  chart-tooltip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.data-mono}"
    rounded: "{rounded.tooltip}"
    padding: "8px 12px"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
---

# Design System: TROIE Studio

## Overview

**Creative North Star: "La preuve sur fond blanc"**

Le site se lit comme un relevé de résultats posé sur une feuille blanche. Un titre court, une phrase, un bouton noir, puis trois chiffres en bleu avec leur courbe réelle. Tout le reste (sites livrés, films, services, équipe) vient ensuite, comme la pièce justificative des chiffres. La page est aérée, les sections sont séparées par un simple filet, et rien ne décore pour décorer.

La couleur est rare par principe. Le blanc froid, l'encre presque noire et le gris graphite portent toute la page. Le bleu cobalt n'apparaît que là où il y a une mesure ou un lien : un chiffre, une courbe, un indicateur choisi, un lien de suite. Les images des travaux sont en noir et blanc au repos et reprennent leur couleur quand on les survole, si bien que la seule couleur vive permanente reste celle des résultats.

Ce système remplace l'ancienne identité crème, orange et Bodoni du 21 octobre 2026. Bodoni ne survit que dans le logo-mot TROIE.

**Key Characteristics:**
- Fond blanc froid, encre presque noire, un seul accent bleu cobalt.
- Chiffres en Geist, chasse fixe (tabular-nums), toujours en pourcentage ou en multiple.
- Cartes blanches à filet de 1 px et rayon de 16 px.
- Boutons noirs en pilule pour l'action principale.
- Travaux en noir et blanc, couleur au survol.
- Mouvement réduit : courbes tracées une fois, fondus discrets, films clients muets en boucle.

## Colors

Une palette froide et neutre, avec un seul bleu qui signale la mesure.

### Primary
- **Bleu cobalt** (`cobalt`) : réservé aux chiffres clés des cartes de résultats et du tableau de bord, au tracé et à l'aire des courbes, au trait de l'onglet choisi, aux liens de suite (« Voir les sites → », « Tous les films → ») et au survol des liens de navigation. Il sert aussi à l'anneau de focus clavier, au curseur de saisie et aux cases à cocher. L'aire sous une courbe le reprend en transparence (8 % dans les cartes, dégradé de 16 % à 0 dans le tableau de bord).
- **Voile cobalt** (`cobalt-wash`) : fond de survol des entrées du menu déroulant, et rien d'autre.

### Secondary
- **Orange TROIE** (`warm`, `--warm`, #e4570f) : l'orange historique de la marque, approfondi pour rester lisible en grand sur blanc (3,6:1, donc titres seulement, jamais du texte courant). Réservé au mot qui tourne dans le titre de l'accueil (« Nous faisons grandir vos ventes, commandes, visites, prospects, abonnés, demandes »). Le bleu mesure, l'orange désigne ce qui grandit.

### Neutral
- **Blanc froid** (`canvas`) : fond de toute la page.
- **Gris bande** (`band`) : bande de clôture (section d'appel), colonne des clients et onglets inactifs du tableau de bord, fond d'attente des films.
- **Gris bande appuyé** (`band-deep`) : second niveau de la bande de clôture.
- **Blanc pur** (`surface`) : cartes de résultats, panneau du tableau de bord, info-bulles. Le blanc pur posé sur le blanc froid suffit à détacher une carte.
- **Encre** (`ink`) : titres, texte fort, fond des boutons principaux.
- **Encre de survol** (`ink-hover`) : fond du bouton principal au survol.
- **Graphite** (`graphite`) : texte courant, sous-titres, légendes, étiquettes d'axes.
- **Filet** (`rule`) : bords des cartes, séparation des sections, grilles de graphiques.
- **Filet appuyé** (`rule-strong`) : contour du bouton secondaire, soulignement des liens texte au repos, contour des flèches du carrousel.

### Named Rules
**La règle du bleu qui mesure.** Le cobalt ne colore qu'un chiffre, une courbe ou un lien. Jamais un fond de section, jamais un bouton plein, jamais une illustration. Si un élément bleu ne mesure rien et ne mène nulle part, il doit redevenir encre ou graphite.

**La règle de l'orange rare.** L'orange n'apparaît qu'une fois par écran, sur un mot de titre. Jamais sur un bouton, un chiffre, une courbe ou un fond.

**La règle des boutons noirs.** L'action principale est en encre, pas en bleu. Le bleu reste disponible pour les chiffres, qui doivent être la chose la plus colorée de l'écran.

## Typography

**Display Font:** Geist (avec ui-sans-serif, system-ui)
**Body Font:** Geist (avec ui-sans-serif, system-ui)
**Label/Mono Font:** Geist Mono (avec ui-monospace, Menlo), seulement dans les graphiques
**Logo-mot:** Bodoni Moda, uniquement pour TROIE

**Character:** Une seule famille, serrée et sobre, qui laisse parler les chiffres. Les titres resserrent l'approche (-0.035em) et équilibrent leurs lignes (text-wrap: balance) pour rester nets à grande taille.

### Hierarchy
- **Display** (500, 2.75rem puis 3.75rem puis 5.5rem, interligne 1.02) : le titre du premier écran, un seul par page, sur toute la largeur.
- **Headline** (500, 2.25rem puis 3rem, interligne 1.02) : titres de section (« Explorez les chiffres. », « Nos films. »). Les sections à large respiration (sites, appel final) montent à 3.75rem. Les noms de projets et de membres de l'équipe reprennent ce style à 1.5rem à 2.25rem.
- **Title** (500, 1.25rem, approche -0.02em) : intitulé d'un service, nom d'un client dans une carte (1.125rem).
- **Figure** (500, 2.75rem puis 3.25rem, interligne 1, chasse fixe) : le chiffre d'une carte de résultat, en cobalt.
- **Figure small** (500, 1.25rem puis 1.75rem, chasse fixe) : le chiffre d'un onglet du tableau de bord, en cobalt.
- **Body lead** (400, 1.125rem, interligne 1.625, 34rem maximum) : la phrase d'appui sous un titre.
- **Body** (400, 15px à 16px, interligne 1.625) : descriptions, légendes de films, textes de services.
- **Label** (500, 14px) : navigation, boutons, liens de suite. Les intitulés de colonnes du pied de page descendent à 13px en graphite.
- **Data mono** (Geist Mono, 11px) : étiquettes d'axes, années, valeurs au-dessus des barres (13px) et contenu des info-bulles (11px et 14px).

### Named Rules
**La règle des chiffres en Geist.** Un chiffre affiché comme résultat est en Geist 500 avec tabular-nums, jamais en Geist Mono. Le mono n'existe que dans la mécanique du graphique (axes, info-bulles).

**La règle du titre nu.** Aucun libellé au-dessus d'un titre, aucun numéro de section. Le titre commence la section, en une phrase courte terminée par un point.

**La règle du logo seul.** Bodoni Moda n'écrit que TROIE. Aucun titre, aucune citation, aucun chiffre en Bodoni.

## Layout

Conteneur centré de 1280px maximum, avec une gouttière de 20px sur mobile et de 48px à partir de 768px. Les sections se suivent sur le même fond blanc, séparées par un filet de 1px en haut, avec 80px de marge verticale (112px sur ordinateur). Les sections de respiration (sites livrés, appel final) passent à 96px puis 128px.

Le premier écran pose le titre à gauche sur toute la largeur, puis une ligne avec la phrase d'appui à gauche et les actions à droite, puis les trois cartes de résultats en grille égale de trois colonnes (écart de 20px). Sur mobile, les cartes deviennent une rangée qui défile à l'horizontale avec aimantation, chaque carte à 82 % de la largeur.

Les sections intérieures utilisent une grille de 12 colonnes à partir de 1024px : titre sur 4 colonnes, contenu sur 8 (services en deux colonnes, films en trois). Les réalisations web alternent pleine largeur pour les projets mis en avant et deux colonnes pour les autres.

Points de rupture : 640px, 768px, 1024px, 1280px.

## Elevation & Depth

Le système est plat. La profondeur vient du blanc pur posé sur le blanc froid et du filet de 1px. Les ombres sont rares, larges et très douces, presque toujours décalées vers le bas avec un étalement négatif pour ne pas salir les bords.

### Shadow Vocabulary
- **Levée de carte** (`box-shadow: 0 18px 40px -24px rgba(17,19,24,0.35)`) : seulement au survol d'une carte de résultat, avec une montée de 2px.
- **Panneau** (`box-shadow: 0 1px 2px rgba(17,19,24,0.04), 0 24px 60px -32px rgba(17,19,24,0.18)`) : le panneau du tableau de bord, au repos.
- **Info-bulle** (`box-shadow: 0 8px 24px -12px rgba(17,19,24,0.3)`) : l'info-bulle qui suit le curseur sur un graphique.
- **Client choisi** (`box-shadow: 0 1px 2px rgba(17,19,24,0.06)`) : l'entrée de client sélectionnée dans la colonne du tableau de bord, avec un anneau de 1px au filet.

### Named Rules
**La règle du plat au repos.** Une carte ne porte pas d'ombre au repos. Elle se lève seulement en réponse au survol. Seul le panneau du tableau de bord garde une ombre permanente, parce qu'il est un outil.

## Shapes

Des angles doux et constants. Les cartes et les films ont un rayon de 16px. Les éléments de contrôle internes (entrées de la colonne des clients) ont 12px, les info-bulles 8px, l'anneau de focus 6px. Tout ce qui se clique comme un bouton est une pilule. Les chiffres en multiple (×35) se dessinent en petits carrés de 14px à rayon 3px. Les filets font 1px partout, le trait de l'onglet choisi 2px, le tracé des courbes 2.5px.

## Components

### Buttons
Noirs, ronds, sans fioriture.
- **Shape:** pilule (9999px).
- **Primary:** fond encre, texte blanc, Geist 500 à 15px, hauteur 48px, 24px de marge latérale. Version compacte dans l'en-tête : 40px de haut, 20px de marge, 14px.
- **Hover / Focus:** le fond passe à l'encre de survol en 200ms, une pression réduit le bouton à 98 %. Focus clavier : anneau cobalt de 2px, décalé de 3px.
- **Outline:** même gabarit, fond transparent, contour au filet appuyé, texte encre. Le contour passe à l'encre au survol.
- **Lien texte:** à côté du bouton principal, « Décrire mon projet » est un lien souligné (soulignement au filet appuyé, décalé de 4px) qui passe à l'encre au survol.

### Cartes de résultats (signature)
Le cœur du premier écran.
- **Corner Style:** 16px.
- **Background:** blanc pur sur blanc froid, filet de 1px.
- **Contenu:** nom du client (Title, 1.125rem), secteur (graphite, 14px), chiffre (Figure, cobalt), phrase de contexte (graphite, 15px), puis la courbe bord à bord sur 96px en bas de la carte.
- **Internal Padding:** 24px, 28px sur ordinateur.
- **États:** au survol, levée de 2px et ombre de levée, et « Voir la courbe → » apparaît en haut à droite. Un clic ouvre le tableau de bord sur ce client.
- **Mouvement:** la carte entre en fondu avec 16px de glissement (0.7s, décalage de 0.1s par carte), puis sa courbe se trace en 1.2s, l'une après l'autre (0.35s d'écart).

### Tableau de bord des clients (signature)
- **Structure:** panneau blanc à rayon 16px, colonne des clients de 220px sur fond gris bande à gauche (barre défilante en haut sur mobile), puis en-tête du client, rangée d'onglets d'indicateurs, graphique, et la source en pied de panneau (12px, graphite).
- **Onglets:** fond gris bande à 60 % au repos, blanc quand choisi, avec un trait cobalt de 2px en haut qui glisse d'un onglet à l'autre (0.3s). Chaque onglet porte son libellé, son chiffre en cobalt et une précision.
- **Graphique:** grille au filet, étiquettes en Geist Mono 11px graphite, courbe cobalt de 2.5px tracée en 1.4s, aire en dégradé cobalt de 16 % à 0. Le point survolé porte un repère vertical pointillé et un halo cobalt à 14 %.
- **Info-bulle:** blanche, rayon 8px, filet, ombre d'info-bulle, Geist Mono 11px pour la date et 14px pour la valeur.

### Aperçus de sites
- **Structure:** fenêtre de navigateur (barre avec trois pastilles et l'adresse) au format 16/10, et la page mobile superposée en bas à droite.
- **Images:** en noir et blanc au repos, couleur au survol en 500ms, montée de 4px de la fenêtre.
- **Légende:** nom du projet en Headline, nature du projet en graphite, adresse soulignée à l'encre qui passe au cobalt avec une flèche ↗.

### Films clients
- **Format:** vertical 9/16, rayon 16px, fond gris bande en attente.
- **Comportement:** muets, en boucle, lancés seulement quand ils sont à l'écran et jamais si l'utilisateur réduit les animations. Noir et blanc au repos, couleur et léger agrandissement (102 %) au survol en 700ms.

### Services
Six blocs en deux colonnes, chacun ouvert par un filet en haut : intitulé (Title), une phrase (graphite, 15px) et un lien de suite en cobalt avec une flèche qui avance de 2px au survol.

### Navigation
- **Style:** barre fixe, transparente en haut de page, puis blanc froid à 95 % avec flou d'arrière-plan au défilement. Logo-mot TROIE à gauche (Bodoni Moda 400, de 28px à 34px), liens en Geist 500 à 14px encre, qui passent au cobalt au survol, bouton « Réserver 30 min » compact à droite.
- **Menu déroulant:** fond blanc froid, filet, survol des entrées en voile cobalt.
- **Mobile:** sous 1024px, ni liens ni bouton dans la barre, les actions sont en tête du panneau du menu.

### Marques
Une rangée fixe de noms en capitales, Geist 500 à 14px, graphite à 85 %, qui passent à l'encre au survol, sous la phrase « L'équipe a travaillé avec ». Rien ne défile.

## Do's and Don'ts

### Do:
- **Do** réserver le bleu cobalt aux chiffres, aux courbes, à l'onglet choisi et aux liens de suite.
- **Do** mettre l'action principale dans un bouton noir en pilule (48px de haut), et l'action secondaire en lien souligné ou en pilule à contour.
- **Do** poser les contenus sur des cartes blanches à filet de 1px et rayon de 16px, sans ombre au repos.
- **Do** afficher chaque résultat client en pourcentage ou en multiple (+164 %, +711 %, ×35), avec les valeurs de src/lib/results.ts.
- **Do** écrire les chiffres en Geist 500 avec tabular-nums, et garder Geist Mono pour les axes et les info-bulles.
- **Do** passer les aperçus de travaux en noir et blanc, avec retour de la couleur au survol.
- **Do** limiter le mouvement aux courbes tracées une fois, aux fondus d'entrée avec 16px de glissement et aux films clients muets en boucle, et tout couper quand l'utilisateur réduit les animations.
- **Do** écrire en français avec tous les accents, des titres courts terminés par un point, des phrases simples.

### Don't:
- **Don't** afficher un montant, un volume ou un chiffre d'affaires en euros pour un client. Seulement des pourcentages ou des multiples.
- **Don't** poser un libellé au-dessus d'un titre de section, ni numéroter les sections.
- **Don't** utiliser le bleu pour un fond de section, un bouton plein ou une décoration.
- **Don't** réintroduire l'orange, la crème, les tons bruns ou Bodoni hors du logo-mot TROIE.
- **Don't** écrire un chiffre de résultat en Geist Mono.
- **Don't** faire défiler un bandeau, faire pulser un élément ou animer un titre lettre par lettre.
- **Don't** utiliser de tiret cadratin, de point-virgule ni de point médian dans les textes.
