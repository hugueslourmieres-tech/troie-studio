import type { Metadata } from "next";
import "../globals.css";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Analytics } from "@vercel/analytics/next";
import { gfsDidot } from "@/lib/greek-font";

/**
 * Layout du segment /creation hors-locale (offres productisees,
 * FR par defaut, comme /ia et /formations). Le layout root [locale]
 * ne s'applique pas ici. Chaque page apporte son mini header.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://troiestudio.fr"),
  robots: { index: true, follow: true },
};

export default function CreationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={gfsDidot.variable}>
      <body className="tone-light bg-[var(--bg)] text-[var(--fg)] antialiased">
        <ScrollReveal />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
