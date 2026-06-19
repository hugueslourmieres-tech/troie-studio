import type { Metadata } from "next";
import { FormationsHeader } from "@/components/FormationsHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import "../globals.css";

/**
 * Layout pour la section /formations.
 *
 * Sous-section dediee aux formations IA en ligne, separee du
 * site principal pour positionner clairement l'offre de cours
 * (potentiellement futur sous-domaine formations.troiestudio.fr).
 *
 * Pas de Header / Footer principal : on construit notre propre
 * navigation légère dans la page elle-même.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://troiestudio.fr"),
  title: "TROIE · Cours en ligne IA. Pro, perso et famille.",
  description:
    "Cours en ligne pour comprendre et intégrer l'IA au quotidien : pour vous, votre famille et vos équipes. Accès immédiat, à votre rythme. QCM gratuits pour commencer.",
  alternates: {
    canonical: "https://troiestudio.fr/formations",
  },
  openGraph: {
    type: "website",
    url: "https://troiestudio.fr/formations",
    title: "TROIE · Cours en ligne IA",
    description:
      "Cours en ligne IA pour comprendre et intégrer l'IA au quotidien. Pro, perso, famille. QCM gratuits pour commencer.",
    siteName: "TROIE · Cours en ligne IA",
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
    title: "TROIE · Cours en ligne IA",
    description:
      "Comprendre et intégrer l'IA au quotidien. Pro, perso, famille. QCM gratuits.",
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
        <FormationsHeader />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
