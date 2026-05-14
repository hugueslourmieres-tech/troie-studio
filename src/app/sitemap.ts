import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { WORKS } from "@/lib/works";

const BASE = "https://troiestudio.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = ["", "/works", "/contact", "/privacy", "/terms"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: now,
        changeFrequency:
          path === "" ? "weekly" : path === "/works" ? "monthly" : "yearly",
        priority: path === "" ? 1 : path === "/works" ? 0.9 : 0.5,
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

  return entries;
}
