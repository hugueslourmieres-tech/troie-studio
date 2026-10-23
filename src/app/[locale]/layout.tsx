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
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": "https://troiestudio.fr/#organization",
        name: tBrand("name"),
        alternateName: "TROIE Atelier Digital",
        url: "https://troiestudio.fr",
        logo: "https://troiestudio.fr/images/brand/og-image.png",
        /* Fraîcheur machine : figée au build, rafraîchie à chaque deploy
           (critère GEO : les moteurs IA privilégient les sources datées). */
        dateModified: new Date().toISOString().slice(0, 10),
        description: tBrand("organizationDescription"),
        founder: { "@id": "https://troiestudio.fr/#hugues" },
        founders: [{ "@id": "https://troiestudio.fr/#hugues" }],
        knowsAbout: isFr
          ? [
              "Stratégie de marque",
              "Stratégie de communication et marketing",
              "Direction artistique",
              "Production vidéo",
              "Photographie",
              "Création de sites web et d'applications",
              "SEO",
              "Publicité en ligne, Google Ads et Meta Ads",
              "Réseaux sociaux",
              "Direction marketing à temps partagé",
              "Automatisation et outils IA",
            ]
          : [
              "Brand strategy",
              "Communication and marketing strategy",
              "Art direction",
              "Video production",
              "Photography",
              "Website and app development",
              "SEO",
              "Online advertising, Google Ads and Meta Ads",
              "Social media",
              "Fractional marketing direction",
              "Automation and AI tools",
            ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nice",
          addressRegion: "Provence-Alpes-Côte d'Azur",
          postalCode: "06000",
          addressCountry: "FR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 43.7102,
          longitude: 7.262,
        },
        hasMap: "https://www.google.com/maps/place/Nice,+France",
        priceRange: "Sur devis",
        knowsLanguage: ["fr-FR", "en"],
        areaServed: [
          { "@type": "City", name: "Nice" },
          { "@type": "AdministrativeArea", name: "Provence-Alpes-Côte d'Azur" },
          { "@type": "Country", name: "France" },
          { "@type": "Country", name: "Monaco" },
          { "@type": "Country", name: "Belgique" },
          { "@type": "Country", name: "Suisse" },
          { "@type": "Country", name: "Luxembourg" },
          { "@type": "Country", name: "Canada" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          // Email volontairement absent (anti-moisson) : le formulaire
          // de contact est le canal public, dans la langue de la page.
          url: `https://troiestudio.fr/${locale}/contact`,
          contactType: "customer service",
          availableLanguage: ["French", "English"],
        },
        sameAs: [
          "https://www.linkedin.com/company/troiestudio",
          "https://www.instagram.com/troiestudio/",
        ],
        // La chaîne YouTube s'appelle encore « TROIE, le campus IA » : elle
        // est rattachée à troie.app, pas au studio.
        subOrganization: {
          "@type": "Organization",
          name: "TROIE",
          alternateName: "troie.app",
          url: "https://troie.app",
          description: isFr
            ? "Les outils en ligne et l'espace d'apprentissage de TROIE Studio."
            : "TROIE Studio's online tools and learning space.",
          sameAs: ["https://www.youtube.com/@troiestudio"],
        },
      },
      {
        "@type": "Person",
        "@id": "https://troiestudio.fr/#hugues",
        name: "Hugues Lourmieres",
        jobTitle: tBrand("jobTitle"),
        worksFor: { "@id": "https://troiestudio.fr/#organization" },
        url: "https://troiestudio.fr",
        knowsAbout: isFr
          ? [
              "Stratégie de marque",
              "Stratégie marketing",
              "Acquisition",
              "Direction artistique",
              "Photographie",
              "Vidéo",
              "SEO",
            ]
          : [
              "Brand strategy",
              "Marketing strategy",
              "Acquisition",
              "Art direction",
              "Photography",
              "Video",
              "SEO",
            ],
        sameAs: [
          "https://www.linkedin.com/in/hugueslourmieres/",
          "https://www.instagram.com/hugueslourmieres/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://troiestudio.fr/#website",
        url: "https://troiestudio.fr",
        name: tBrand("name"),
        description: tBrand("metaDescription"),
        publisher: { "@id": "https://troiestudio.fr/#organization" },
        inLanguage: ["fr-FR", "en-US"],
      },
    ],
  };

  return (
    <html
      lang={locale}
      className={`${bodoni.variable} ${fraunces.variable} ${inter.variable} ${jetbrains.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="tone-light bg-[var(--bg)] text-[var(--fg)] antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
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
