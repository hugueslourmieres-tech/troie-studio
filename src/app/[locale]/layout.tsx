import "../globals.css";
import type { Metadata } from "next";
import { Bodoni_Moda, Fraunces, Geist, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SeoSchema } from "@/components/SeoSchema";
import { ARTICLES_SORTED, localizeArticle } from "./blog/articles";
import { Analytics } from "@vercel/analytics/next";
import { OG_IMAGE } from "@/lib/og";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Fraunces variable, with SOFT + WONK axes for magazine-grade display.
// Used at extrême settings for the hero (.t-display-hero in globals.css).
// next/font requires weight: "variable" when axes are declared.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: "variable",
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  // Plus utilisée dans les pages (25/10/2026) : pas de préchargement, la
  // police ne se télécharge que si une classe la demande.
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false, // inutilisée depuis le 21/10/2026, pas de préchargement
});

// Système du 21/10/2026 : Geist pour tout le texte, Geist Mono pour les
// chiffres et libellés. Bodoni ne sert plus qu'au logo TROIE.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false, // remplacée par Geist Mono, pas de préchargement
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brand" });
  const isFr = locale === "fr";

  /*
   * Accueil (25/10/2026) : la requête visée d'abord (« agence web Nice »),
   * le positionnement « l'agence qui fait vendre » en tête de description.
   * Titre sous 60 signes, en absolu (le gabarit « %s, TROIE Studio » ne
   * s'applique pas au titre par défaut). Description entre 140 et 160 signes.
   */
  const title = isFr
    ? "Agence web Nice : sites, apps et acquisition | TROIE Studio"
    : "Web agency in Nice: websites, apps and growth | TROIE Studio";
  const description = isFr
    ? "L'agence digitale qui fait vendre à Nice, Monaco et sur la Côte d'Azur : sites, applications, Shopify, SEO, Google Ads. LOIR Paris : +164 % de ventes en ligne."
    : "The digital agency that drives sales in Nice, Monaco and the Riviera: websites, apps, Shopify, SEO and Google Ads. LOIR Paris: +164% online sales.";

  return {
    metadataBase: new URL("https://troiestudio.fr"),
    title: {
      default: title,
      template: `%s, ${t("name")}`,
    },
    description,
    keywords: isFr
      ? [
          "agence web Nice",
          "agence digitale Nice",
          "création site internet Nice",
          "création application Nice",
          "agence Shopify",
          "agence SEO Nice",
          "agence Google Ads Nice",
          "agence web Monaco",
          "agence web Cannes Antibes",
        ]
      : [
          "web agency Nice",
          "digital agency French Riviera",
          "web agency Monaco",
          "app development Nice",
          "Shopify agency France",
          "SEO agency Nice",
          "Google Ads agency Nice",
        ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
        // Version servie quand aucune langue déclarée ne correspond, par
        // exemple un visiteur italien ou allemand. Sans x-default, Google
        // choisit seul, et il choisit souvent /en alors que le marché visé
        // est francophone. On pointe donc explicitement sur /fr.
        "x-default": "/fr",
      },
    },
    openGraph: {
      type: "website",
      url: `https://troiestudio.fr/${locale}`,
      title,
      description,
      siteName: t("name"),
      locale: isFr ? "fr_FR" : "en_US",
      alternateLocale: isFr ? ["en_US"] : ["fr_FR"],
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const tBrand = await getTranslations({ locale, namespace: "brand" });

  const isFr = locale === "fr";

  // JSON-LD global : Organization + Person (Hugues), rendu sur chaque page
  // pour que Google rattache l'entité de marque à tout le site.
  // Les savoir-faire suivent le positionnement du 1er/10/2026 : stratégie,
  // création, accompagnement. L'IA n'y figure plus que comme outil.

  return (
    <html
      lang={locale}
      className={`${bodoni.variable} ${fraunces.variable} ${inter.variable} ${jetbrains.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="tone-light bg-[var(--bg)] text-[var(--fg)] antialiased">
        <SeoSchema locale={locale} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ScrollProgress />
          <ScrollReveal />
          <Header
            locale={locale}
            latest={ARTICLES_SORTED.slice(0, 4).map((a) => {
              const L = localizeArticle(a, locale);
              return { href: `/${locale}/blog/${a.slug}`, img: a.cover, title: L.cardTitle, kind: L.category };
            })}
          />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
