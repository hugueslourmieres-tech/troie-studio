import type { MetadataRoute } from "next";

/**
 * robots.txt.
 * - Crawl classique autorisé partout sauf /api et l'espace membre.
 * - Crawlers IA explicitement autorisés (GEO) : on VEUT être lu et cité
 *   par ChatGPT, Claude, Perplexity, Gemini, etc.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/formations/dashboard/", "/formations/auth/"];

  // Crawlers IA / moteurs génératifs : entraînement + recherche en direct.
  const aiAgents = [
    "GPTBot", // OpenAI (entraînement)
    "OAI-SearchBot", // ChatGPT Search (récupération live)
    "ChatGPT-User", // navigation ChatGPT
    "ClaudeBot", // Anthropic
    "anthropic-ai",
    "Claude-Web",
    "PerplexityBot", // Perplexity
    "Perplexity-User",
    "Google-Extended", // Gemini / Vertex
    "Applebot-Extended", // Apple Intelligence
    "CCBot", // Common Crawl (alimente beaucoup de LLM)
    "Bytespider",
    "Meta-ExternalAgent",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...aiAgents.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: "https://troiestudio.fr/sitemap.xml",
    host: "https://troiestudio.fr",
  };
}
