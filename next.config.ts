import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Trim runtime CSS / JS where Next allows it.
  compress: true,
  reactStrictMode: true,
  // Optimise the image pipeline: prefer modern formats and cache aggressively.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days for optimised assets
  },
  // Pre-bundle motion + gsap so route-level chunks stay lean.
  experimental: {
    optimizePackageImports: ["motion", "gsap", "@gsap/react", "lucide-react"],
  },
  // Redirections SEO : les anciennes vitrines formation localisees
  // pointent vers le hub unique /formations (plateforme + offres +
  // bloc entreprises qui renvoie vers /ia). Consolidation du 02/07/2026.
  async redirects() {
    return [
      // ─── E-learning déplacé sur troie.app (la plateforme d'apprentissage) ───
      // Le studio ne fait plus que l'agence. Redirections 301 : elles gardent
      // le référencement et renvoient chacun au bon endroit sur l'app.
      { source: "/formations/tarifs", destination: "https://troie.app/abonnement", permanent: true },
      { source: "/formations/auth/:path*", destination: "https://troie.app/connexion", permanent: true },
      { source: "/formations/dashboard/:path*", destination: "https://troie.app/parcours", permanent: true },
      { source: "/formations/quiz/:path*", destination: "https://troie.app/niveau", permanent: true },
      { source: "/formations/prompts/:path*", destination: "https://troie.app/formation", permanent: true },
      { source: "/formations", destination: "https://troie.app/formation", permanent: true },
      { source: "/formations/:path*", destination: "https://troie.app/formation", permanent: true },
      // Vitrines formation localisées → directement sur l'app (pas de double saut).
      {
        source: "/:locale(fr|en)/formations",
        destination: "https://troie.app/formation",
        permanent: true,
      },
      {
        source: "/:locale(fr|en)/formation",
        destination: "https://troie.app/formation",
        permanent: true,
      },
      // Pages photo + vidéo fusionnees dans /medias (les detail /works/:slug restent).
      {
        source: "/:locale(fr|en)/works",
        destination: "/:locale/medias",
        permanent: true,
      },
      {
        source: "/:locale(fr|en)/creation/video",
        destination: "/:locale/medias",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
