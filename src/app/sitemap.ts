import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { WORKS } from "@/lib/works";
import { ARTICLES } from "@/app/[locale]/blog/articles";

const BASE = "https://troiestudio.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // /fr|/en/formation(s) redirige (301) vers /formations : exclu du sitemap.
  const staticPaths = ["", "/creation", "/creation/web", "/strategie", "/diagnostic-ia", "/scan-ia", "/medias", "/blog", "/contact", "/privacy", "/terms"];
  const HIGH_PRIORITY = new Set(["/medias", "/blog", "/creation", "/strategie", "/diagnostic-ia", "/scan-ia"]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: now,
        changeFrequency:
          path === "" ? "weekly" : HIGH_PRIORITY.has(path) ? "monthly" : "yearly",
        priority: path === "" ? 1 : HIGH_PRIORITY.has(path) ? 0.9 : 0.5,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((alt) => [alt, `${BASE}/${alt}${path}`]),
          ),
        },
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
    { path: "/ia", priority: 0.9, frequency: "weekly" },
    { path: "/ia/ai-act", priority: 0.9, frequency: "weekly" },
    { path: "/ia/accessibilite", priority: 0.9, frequency: "weekly" },
    { path: "/creation/site-conforme", priority: 0.9, frequency: "weekly" },
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
