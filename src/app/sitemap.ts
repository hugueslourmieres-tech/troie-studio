import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { WORKS } from "@/lib/works";
import { ARTICLES, isNoindexArticle } from "@/app/[locale]/blog/articles";

const BASE = "https://troiestudio.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // /fr|/en/formation(s) redirige (301) vers /accompagnement : exclu du sitemap.
  // /privacy et /terms sont en noindex : hors du sitemap (24/09/2026).
  // /hello (lien en bio Instagram) est en noindex : hors du sitemap.
  // /rentree, /scan-ia et /diagnostic-ia redirigent en 301 depuis le 21/10/2026.
  // /works/formation-ia sort seule du sitemap : la fiche n'est plus dans WORKS
  // et redirige en permanence vers /accompagnement (next.config.ts).
  // Pages de services, page Nice et études de cas ajoutées le 23/10/2026.
  const staticPaths = [
    "",
    "/strategie",
    "/creation",
    "/creation/web",
    "/accompagnement",
    "/agence-seo-google-ads",
    "/agence-e-commerce-shopify",
    "/creation-site-application",
    "/agence-web-nice",
    "/etudes-de-cas",
    "/etudes-de-cas/loir-paris",
    "/etudes-de-cas/rutherford",
    "/etudes-de-cas/autajon",
    "/hugues",
    "/medias",
    "/blog",
    "/contact",
    // Outils IA gratuits portés depuis troie.app (23/10/2026), rédigés en français.
    "/outils",
    "/outils/charte-ia",
    "/outils/diagnostic-ai-act",
    "/outils/registre-usages-ia",
    "/outils/checklist-ai-act",
    "/ai-act-calendrier",
  ];
  // Rédigées en français seulement : la copie /en porte une canonique vers /fr.
  const FR_ONLY = new Set([
    "/creation/web",
    "/outils",
    "/outils/charte-ia",
    "/outils/diagnostic-ai-act",
    "/outils/registre-usages-ia",
    "/outils/checklist-ai-act",
    "/ai-act-calendrier",
  ]);
  const HIGH_PRIORITY = new Set([
    "/medias",
    "/blog",
    "/creation",
    "/strategie",
    "/accompagnement",
    "/agence-seo-google-ads",
    "/agence-e-commerce-shopify",
    "/creation-site-application",
    "/agence-web-nice",
    "/etudes-de-cas",
  ]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      if (FR_ONLY.has(path) && locale !== "fr") continue;
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: now,
        changeFrequency:
          path === "" ? "weekly" : HIGH_PRIORITY.has(path) ? "monthly" : "yearly",
        priority: path === "" ? 1 : HIGH_PRIORITY.has(path) ? 0.9 : 0.5,
        ...(FR_ONLY.has(path)
          ? {}
          : {
              alternates: {
                languages: Object.fromEntries(
                  routing.locales.map((alt) => [alt, `${BASE}/${alt}${path}`]),
                ),
              },
            }),
      });
    }

    for (const work of WORKS) {
      entries.push({
        url: `${BASE}/${locale}/works/${work.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((alt) => [alt, `${BASE}/${alt}/works/${work.slug}`]),
          ),
        },
      });
    }

  }

  // Articles : /fr toujours, /en seulement si la traduction existe
  // (BodyEn), avec hreflang croise entre les deux versions.
  for (const article of ARTICLES) {
    // Articles « formation-* » en noindex : hors du sitemap (23/10/2026).
    if (isNoindexArticle(article.slug)) continue;
    const hasEn = !!article.BodyEn;
    const languages = hasEn
      ? {
          fr: `${BASE}/fr/blog/${article.slug}`,
          en: `${BASE}/en/blog/${article.slug}`,
        }
      : undefined;
    for (const locale of hasEn ? (["fr", "en"] as const) : (["fr"] as const)) {
      entries.push({
        url: `${BASE}/${locale}/blog/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: "monthly",
        priority: 0.8,
        ...(languages ? { alternates: { languages } } : {}),
      });
    }
  }

  // ── Routes hors-locale : /ia + /creation (FR par défaut) ─────────
  // L'e-learning (/formations/*) a été déplacé sur troie.app : ces URL
  // redirigent en 301 vers l'app et sont donc exclues du sitemap studio.
  const NON_LOCALE: {
    path: string;
    priority: number;
    frequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
  ];

  for (const { path, priority, frequency } of NON_LOCALE) {
    entries.push({
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency: frequency,
      priority,
    });
  }

  return entries;
}
