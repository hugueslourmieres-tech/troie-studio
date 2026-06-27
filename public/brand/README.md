# Charte graphique TROIE Studio

Identité de marque : atelier digital, IA d'abord. Nice.
Tous les fichiers sont prêts à l'emploi (dossier `public/brand`).

## Logo

| Fichier | Usage |
|---|---|
| `troie-logotype.svg` / `.png` | Logotype principal (encre). Référence. |
| `troie-logotype-cream.png` | Logotype sur fond sombre. |
| `troie-monogram.svg` / `.png` | Monogramme T en sceau, formats réduits. |
| `troie-monogram-cream.png` | Monogramme sur fond sombre. |
| `troie-emblem.png` | Emblème guerrier + logotype (encre). |
| `troie-emblem-orange.png` | Emblème guerrier orange + logotype. |
| `favicon.svg` | Favicon vectoriel (carré terracotta + T). |
| `favicon-512.png` `apple-touch-icon.png` (180) `favicon-32.png` `favicon-16.png` | Déclinaisons icône. |

Les SVG embarquent les polices Adobe/Google (Bodoni Moda, JetBrains Mono) : ils
s'affichent correctement dans un navigateur. Les PNG sont rendus avec les
vraies polices, fond transparent.

## Le guerrier

| Fichier | Usage |
|---|---|
| `troie-warrior.png` | Silhouette pleine orange, fond transparent (1500 px). |
| `troie-warrior-ink.png` | Silhouette pleine encre, fond transparent. |
| `troie-warrior-silhouette-flat.png` | Silhouette encre sur crème (impression). |

Issu du relief de marque (`images/brand/emboss.png`). Pour un vectoriel
éditable du guerrier : ouvrir un PNG dans Illustrator puis Image Trace
(vectorisation), la silhouette est nette et se trace en un clic.

## Couleurs

| Rôle | Hex |
|---|---|
| Terracotta (primaire) | `#F37B22` |
| Crème (fond) | `#F5F0E6` |
| Sable (surface) | `#ECE4D6` |
| Encre (texte) | `#1A1714` |
| Noir profond | `#0F0B08` |
| Pétrole (secondaire, pro) | `#1F4D4A` |

## Typographie

- Titrage : **Bodoni Moda** (serif).
- Labels : **JetBrains Mono** (mono, capitales espacées).
- Courant : **Inter** (sans).

## Document

- `TROIE-charte-graphique.pdf` : la charte complète, 5 pages, prête à imprimer.

## Régénération

Scripts dans `scripts/` (Node + sharp + Chrome headless) :
`node scripts/build-brand.mjs` (logos + guerrier), `node scripts/build-emblem.mjs`
(emblèmes), `node scripts/build-pdf.mjs` (PDF).
