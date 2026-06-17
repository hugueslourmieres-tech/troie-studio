import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { WORKS } from "@/lib/works";

const BASE = "https://troiestudio.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/formations",
    "/agents",
    "/works",
    "/contact",
    "/privacy",
    "/terms",
  ];

  // Section-level pages (formations / agents / works) get higher priority
  // and monthly refresh; legal pages stay yearly / 0.5.
  const HIGH_PRIORITY = new Set(["/works", "/formations", "/agents"]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: now,
        changeFrequency:
          path === ""
            ? "weekly"
            : HIGH_PRIORITY.has(path)
              ? "monthly"
              : "yearly",
        priority:
          path === ""
            ? 1
            : HIGH_PRIORITY.has(path)
              ? 0.9
              : 0.5,
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
            routing.locales.map((alt) => [
              alt,
              `${BASE}/${alt}/works/${work.slug}`,
            ]),
          ),
        },
      });
    }
  }

  // ── Routes hors-locale : /ia + /formations (B2C online) ─────────
  // Ces routes ne sont pas dans le segment [locale] et vivent en FR
  // par defaut. On les ajoute manuellement au sitemap pour SEO + GEO.
  const NON_LOCALE_PATHS: { path: string; priority: number; frequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/ia", priority: 0.9, frequency: "weekly" },
    { path: "/formations", priority: 0.95, frequency: "weekly" },
    { path: "/formations/module-0", priority: 0.85, frequency: "monthly" },
    { path: "/formations/prompts", priority: 0.9, frequency: "weekly" },
    { path: "/formations/prompts/freelance", priority: 0.8, frequency: "monthly" },
    { path: "/formations/prompts/marketing", priority: 0.8, frequency: "monthly" },
    { path: "/formations/prompts/ecommerce", priority: 0.8, frequency: "monthly" },
    { path: "/formations/prompts/design", priority: 0.8, frequency: "monthly" },
    { path: "/formations/prompts/coding", priority: 0.8, frequency: "monthly" },
    { path: "/formations/cours-01", priority: 0.9, frequency: "monthly" },
    { path: "/formations/cours-02", priority: 0.9, frequency: "monthly" },
    { path: "/formations/mastermind", priority: 0.85, frequency: "monthly" },
  ];

  for (const { path, priority, frequency } of NON_LOCALE_PATHS) {
    entries.push({
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency: frequency,
      priority,
    });
  }

  return entries;
}
