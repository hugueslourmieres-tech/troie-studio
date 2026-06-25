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
  // Redirections SEO : /fr|/en/formations (legacy B2B Qualiopi) -> /ia.
  // Le contenu formation entreprise est desormais traite cote IA Pro.
  // /formations (sans locale) reste = nouvelle plateforme cours en ligne.
  async redirects() {
    return [
      {
        source: "/:locale(fr|en)/formations",
        destination: "/ia",
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
