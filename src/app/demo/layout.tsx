import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "../globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--demo-display",
  display: "swap",
});
const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--demo-sans",
  display: "swap",
});

/**
 * Layout des démos de portfolio (vitrines, e-commerce, landings).
 * Pages autonomes, sans Header / Footer TROIE, avec leur propre typo.
 * noindex : ce sont des démonstrations, pas des pages à référencer.
 */
export const metadata: Metadata = {
  title: "Démo, TROIE Studio",
  robots: { index: false, follow: false },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
