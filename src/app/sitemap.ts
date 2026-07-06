import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { WORKS } from "@/lib/works";
import { PACKS } from "@/app/formations/prompts/data";
import { QUIZZES } from "@/app/formations/quizzes";
import { ARTICLES } from "@/app/[locale]/blog/articles";

const BASE = "https://troiestudio.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // /fr|/en/formation(s) redirige (301) vers /formations : exclu du sitemap.
  const staticPaths = ["", "/creation", "/creation/web", "/strategie", "/medias", "/blog", "/contact", "/privacy", "/terms"];
  const HIGH_PRIORITY = new Set(["/medias", "/blog", "/creation", "/strategie"]);

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

  // ── Routes hors-locale : /ia + /formations (FR par défaut) ─────────
  const NON_LOCALE: {
    path: string;
    priority: number;
    frequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/ia", priority: 0.9, frequency: "weekly" },
    { path: "/ia/ai-act", priority: 0.9, frequency: "weekly" },
    { path: "/ia/accessibilite", priority: 0.9, frequency: "weekly" },
    { path: "/creation/site-conforme", priority: 0.9, frequency: "weekly" },
    { path: "/formations", priority: 0.95, frequency: "weekly" },
    { path: "/formations/tarifs", priority: 0.9, frequency: "weekly" },
    // Panthéon mis de côté (PANTHEON_ENABLED=false) : hors sitemap tant qu'il n'est pas affiché.
    { path: "/formations/quiz", priority: 0.9, frequency: "weekly" },
    { path: "/formations/module-0", priority: 0.8, frequency: "monthly" },
    { path: "/formations/prompts", priority: 0.9, frequency: "weekly" },
    { path: "/formations/cours-01", priority: 0.9, frequency: "monthly" },
    { path: "/formations/cours-02", priority: 0.9, frequency: "monthly" },
    { path: "/formations/mastermind", priority: 0.85, frequency: "monthly" },
    // QCM gratuits : long-tail SEO + matière citable pour les LLM (GEO)
    ...QUIZZES.map((q) => ({
      path: `/formations/quiz/${q.slug}`,
      priority: 0.75,
      frequency: "monthly" as const,
    })),
    // Packs de prompts (boutique), mappés depuis la donnée pour éviter la dérive
    ...PACKS.map((p) => ({
      path: `/formations/prompts/${p.slug}`,
      priority: 0.8,
      frequency: "monthly" as const,
    })),
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
