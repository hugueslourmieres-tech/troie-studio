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
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
   * Le titre dit le savoir-faire du studio (1er/10/2026). L'IA n'apparaît
   * plus dans le titre ni la description.
   */
  const title = `${t("name")}. ${
    isFr
      ? "Agence digitale : sites, contenus, SEO et publicité qui font vendre"
      : "Digital agency: websites, content, SEO and advertising that sell"
  }`;
  // Description SEO (forme longue), distincte de la `tagline` courte
  // affichée dans le pied de page.
  const description = t("metaDescription");

  return {
    metadataBase: new URL("https://troiestudio.fr"),
    title: {
      default: title,
      template: `%s, ${t("name")}`,
    },
    description,
    keywords: isFr
      ? [
          "agence de communication Nice",
          "stratégie de marque Nice",
          "direction marketing à temps partagé",
          "production vidéo entreprise Nice",
          "photographe corporate Nice",
          "création site internet Nice",
          "direction artistique",
          "agence SEO Nice",
        ]
      : [
          "brand strategy Nice France",
          "fractional marketing director",
          "corporate video production",
          "corporate photographer Nice",
          "website design France",
          "art direction",
          "SEO agency Nice",
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
