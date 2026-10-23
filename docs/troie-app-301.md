# Redirections 301 troie.app vers troiestudio.fr

Rédigé le 23/10/2026. **À NE PAS ACTIVER** avant la mise à jour de la
production de troiestudio.fr (branche `agence` déployée) : sinon les
redirections pointent vers des pages qui n'existent pas encore en ligne.

À activer sur troie.app uniquement (next.config.ts du dépôt troie-app,
`permanent: true`). Les 12 quiz restent sur troie.app et ne sont pas
redirigés.

| URL troie.app | Nouvelle URL troiestudio.fr | Remarque |
|---|---|---|
| `/outils` | `https://troiestudio.fr/fr/outils` | Index des outils |
| `/outils/charte-ia` | `https://troiestudio.fr/fr/outils/charte-ia` | Générateur de charte (PDF) |
| `/api/charte` | `https://troiestudio.fr/fr/outils/charte-ia` | POST : ne pas rediriger, laisser répondre 404 ou retirer la route (un 301 casse un POST) |
| `/api/checklist` | `https://troiestudio.fr/api/outils/checklist` | PDF checklist AI Act |
| `/api/checklist?doc=registre` | `https://troiestudio.fr/api/outils/registre` | Condition `has: [{ type: "query", key: "doc", value: "registre" }]`, à placer AVANT la ligne précédente |
| `/diagnostic` | `https://troiestudio.fr/fr/outils/diagnostic-ai-act` | Diagnostic en 7 questions |
| `/ia-act-calendrier` | `https://troiestudio.fr/fr/ai-act-calendrier` | Calendrier à jour du règlement 2026/1744 |
| `/ai-act` | `https://troiestudio.fr/fr/ai-act-calendrier` | Pas de page « AI Act expliqué » sur le studio : le calendrier en reprend l'essentiel (alternative : `/fr/blog/ai-act-entreprise-2026`) |
| `/prix-formation-ia-act` | `https://troiestudio.fr/fr/accompagnement#ia` | Page non portée (voir plus bas). Le fragment `#ia` est conservé par les navigateurs |
| `/entreprise` | `https://troiestudio.fr/fr/accompagnement#ia` | Ateliers pour les équipes |
| `/formation` | `https://troiestudio.fr/fr/accompagnement#ia` | Le studio vend de l'accompagnement, pas de la formation |
| `/formation/:path*` | `https://troiestudio.fr/fr/accompagnement#ia` | Toutes les fiches de parcours |

Exemple de syntaxe (troie-app, `next.config.ts`) :

```ts
{
  source: "/api/checklist",
  has: [{ type: "query", key: "doc", value: "registre" }],
  destination: "https://troiestudio.fr/api/outils/registre",
  permanent: true,
},
{ source: "/api/checklist", destination: "https://troiestudio.fr/api/outils/checklist", permanent: true },
{ source: "/outils/charte-ia", destination: "https://troiestudio.fr/fr/outils/charte-ia", permanent: true },
```

## Pourquoi `/prix-formation-ia-act` n'a pas été porté

La page compare des prix de formations AI Act (organismes, tarifs publics
relevés en juillet 2026, CPF, OPCO) pour vendre le parcours à 59 € de
troie.app. Réécrite en « ateliers », elle deviendrait une page
« prix formation » sur le site d'une agence qui ne vend jamais de formation,
avec des tarifs de tiers non revérifiés. Elle n'est donc pas portée, et son
URL renvoie vers l'accompagnement.

## Après activation

1. Vérifier chaque ligne avec `curl -sI https://troie.app/<chemin>` (code 308 ou 301, bonne destination).
2. Soumettre le sitemap de troiestudio.fr dans la Search Console.
3. Retirer ces URL du sitemap de troie.app.
