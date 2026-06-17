import type { Metadata } from "next";
import "../globals.css";

/**
 * Layout dedie au sous-domaine ia.troiestudio.fr.
 *
 * Pas de Header / Footer du site principal : on positionne la landing
 * comme une sous-marque B2B claire. Le seul retour vers le studio
 * createur se fait via le footer minimal de la page elle-même.
 *
 * Le layout root [locale] ne s'applique pas à cette route puisque /ia
 * vit en dehors du segment [locale].
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://troiestudio.fr"),
  title: "TROIE · IA Pro. Formations & agents IA pour vos équipes.",
  description:
    "Formations courtes, agents IA clés en main, audit gratuit. L'atelier qui formé et déploie l'IA dans vos équipes — France & international.",
  alternates: {
    canonical: "https://ia.troiestudio.fr",
  },
  openGraph: {
    type: "website",
    url: "https://ia.troiestudio.fr",
    title: "TROIE · IA Pro",
    description:
      "Formations courtes et agents IA clés en main pour vos équipes.",
    siteName: "TROIE · IA Pro",
    locale: "fr_FR",
    images: [
      {
        url: "/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "TROIE · IA Pro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TROIE · IA Pro",
    description:
      "Formations courtes et agents IA clés en main pour vos équipes.",
    images: ["/images/brand/og-image.png"],
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
        {children}
      </body>
    </html>
  );
}
