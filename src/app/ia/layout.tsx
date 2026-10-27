import type { Metadata } from "next";
import "../globals.css";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Analytics } from "@vercel/analytics/next";

/**
 * Layout racine du segment /ia (page Organisation et outils, rangée sous
 * Accompagnement). Plus de sous-marque IA Pro.
 *
 * Le layout root [locale] ne s'applique pas à cette route puisque /ia
 * vit en dehors du segment [locale] : la page apporte elle-même le Header
 * et le Footer du studio, en français.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://troiestudio.fr"),
  title: "Organisation et outils IA pour PME à Nice, TROIE Studio",
  description:
    "Nous partons de votre stratégie et de votre façon de travailler. Puis nous mettons en place les outils utiles, IA comprise, et accompagnons leur prise en main.",
  alternates: {
    canonical: "https://troiestudio.fr/ia",
  },
  openGraph: {
    type: "website",
    url: "https://troiestudio.fr/ia",
    title: "Organisation et outils IA pour PME, TROIE Studio",
    description:
      "D'abord votre stratégie, ensuite les outils. Diagnostic, ateliers et mise en place, avec un premier échange par écrit.",
    siteName: "TROIE Studio",
    locale: "fr_FR",
    images: [
      {
        url: "/images/brand/og-troie-2026.png",
        width: 1200,
        height: 630,
        alt: "TROIE Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Organisation et outils IA pour PME, TROIE Studio",
    description:
      "D'abord votre stratégie, ensuite les outils. Diagnostic, ateliers et mise en place, avec un premier échange par écrit.",
    images: ["/images/brand/og-troie-2026.png"],
  },
  robots: { index: true, follow: true },
};

export default function IaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="tone-light bg-[var(--bg)] text-[var(--fg)] antialiased">
        <ScrollReveal />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
