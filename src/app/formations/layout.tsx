import type { Metadata } from "next";
import "../globals.css";

/**
 * Layout pour la section /formations.
 *
 * Sous-section dediee aux formations IA en ligne — separee du
 * site principal pour positionner clairement l'offre de cours
 * (potentiellement futur sous-domaine formations.troiestudio.fr).
 *
 * Pas de Header / Footer principal : on construit notre propre
 * navigation legere dans la page elle-meme.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://troiestudio.fr"),
  title: "TROIE · Formations IA. Maitrisez ChatGPT, Claude et les agents.",
  description:
    "Formations IA en ligne, pratiques et immediatement applicables. Maitriser ChatGPT et Claude, workflows automatises, agents personnels. Module 0 gratuit.",
  alternates: {
    canonical: "https://troiestudio.fr/formations",
  },
  openGraph: {
    type: "website",
    url: "https://troiestudio.fr/formations",
    title: "TROIE · Formations IA",
    description:
      "Formations IA en ligne. Module 0 gratuit, cours premium a partir de 97 €.",
    siteName: "TROIE · Formations",
    locale: "fr_FR",
    images: [
      {
        url: "/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "TROIE · Formations IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TROIE · Formations IA",
    description: "Maitrisez l'IA en pratique. Module 0 gratuit.",
    images: ["/images/brand/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function FormationsLayout({
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
