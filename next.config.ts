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
  // Redirections SEO. Le studio fait du conseil et de la création.
  // Depuis le 23/10/2026, les anciennes URL formation renvoient vers
  // l'accompagnement (ateliers IA), plus vers troie.app. Les fiches et pages retirées du studio pointent
  // vers la page qui les remplace (1er/10/2026).
  async redirects() {
    return [
      // ─── Anciennes URL formation : vers l'accompagnement (23/10/2026) ───
      // Les espaces de compte restent sur troie.app. Redirections 301 : elles gardent
      // le référencement et renvoient chacun au bon endroit sur l'app.
      { source: "/formations/tarifs", destination: "/fr/accompagnement", permanent: true },
      { source: "/formations/auth/:path*", destination: "https://troie.app/connexion", permanent: true },
      { source: "/formations/dashboard/:path*", destination: "https://troie.app/parcours", permanent: true },
      { source: "/formations/quiz/:path*", destination: "https://troie.app/niveau", permanent: true },
      { source: "/formations/prompts/:path*", destination: "/fr/accompagnement", permanent: true },
      { source: "/formations", destination: "/fr/accompagnement", permanent: true },
      { source: "/formations/:path*", destination: "/fr/accompagnement", permanent: true },
      // Vitrines formation localisées → l'accompagnement, dans la même langue.
      {
        source: "/:locale(fr|en)/formations",
        destination: "/:locale/accompagnement",
        permanent: true,
      },
      {
        source: "/:locale(fr|en)/formation",
        destination: "/:locale/accompagnement",
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
      // Fiche réalisation « formation-ia » supprimée (elle était indexée) :
      // son sujet vit désormais sur la page Accompagnement.
      {
        source: "/:locale(fr|en)/works/formation-ia",
        destination: "/:locale/accompagnement",
        permanent: true,
      },
      // ─── Agence digitale (21/10/2026) : les pages IA sortent du site ───
      // Le studio vend ses services, plus de pages d'entrée IA. Chaque
      // ancienne URL renvoie vers la page qui la remplace.
      { source: "/:locale(fr|en)/rentree", destination: "/:locale/strategie", permanent: true },
      { source: "/:locale(fr|en)/scan-ia", destination: "/:locale/strategie", permanent: true },
      { source: "/:locale(fr|en)/scan-ia/:path*", destination: "/:locale/strategie", permanent: true },
      { source: "/:locale(fr|en)/diagnostic-ia", destination: "/:locale/accompagnement", permanent: true },
      { source: "/ia/ai-act", destination: "/fr/blog/ai-act-entreprise-2026", permanent: true },
      { source: "/ia/accessibilite", destination: "/fr/blog/accessibilite-site-web-obligation", permanent: true },
      { source: "/ia", destination: "/fr/accompagnement", permanent: true },
      { source: "/ia/:path*", destination: "/fr/accompagnement", permanent: true },
      { source: "/creation/site-conforme", destination: "/fr/creation/web", permanent: true },
      // Lien court du compte Instagram @hugueslourmieres (lien en bio).
      // Temporaire (307) pour pouvoir changer la destination plus tard.
      {
        source: "/ig",
        destination:
          "/fr/hello?utm_source=instagram&utm_medium=bio&utm_campaign=hugueslourmieres",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
