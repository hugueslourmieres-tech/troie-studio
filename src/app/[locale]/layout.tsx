import "../globals.css";
import type { Metadata } from "next";
import { Bodoni_Moda, Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Analytics } from "@vercel/analytics/next";

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
   * Le titre dit ce que le studio réalise pour un client, en peu de mots
   * (16/09/2026). Plus de « formations » : le studio vend du conseil et de
   * la réalisation, pas de la formation (ni NDA ni Qualiopi). La catégorie
   * Google Business « Centre de formation » n'est donc plus un objectif.
   */
  const title = `${t("name")}. ${
    isFr
      ? "Agents IA, sites web et SEO à Nice"
      : "AI agents, websites and SEO in Nice, France"
  }`;
  // SEO description (long form), différent from the in-page `tagline`
  // which is kept short for visual use in the footer.
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
          "agence IA Nice",
          "agent IA sur mesure",
          "automatisation IA entreprise",
          "création site internet Nice",
          "agence SEO Nice",
          "SEO IA",
          "référencement ChatGPT",
          "production vidéo entreprise Nice",
          "photographe corporate Nice",
        ]
      : [
          "AI agency Nice France",
          "custom AI agents",
          "AI automation for business",
          "website development France",
          "SEO agency France",
          "AI search optimization",
          "corporate video production",
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
      images: [
        {
          url: "/images/brand/og-image.png",
          width: 1200,
          height: 630,
          alt: t("name"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/brand/og-image.png"],
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

  // Global JSON-LD : Organization + Person (Hugues), rendered on every
  // page so Google attaches the brand entity to the whole site.
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
        knowsAbout: [
          "Agents IA",
          "Automatisation (Make, n8n)",
          "Intelligence artificielle générative",
          "Création de sites web et d'applications",
          "SEO",
          "Référencement dans les moteurs IA (GEO)",
          "Identité de marque",
          "Direction artistique",
          "Photographie",
          "Vidéo",
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
          // de contact est le canal public.
          url: "https://troiestudio.fr/fr/contact",
          contactType: "customer service",
          availableLanguage: ["French", "English"],
        },
        sameAs: [
          "https://www.linkedin.com/company/troiestudio",
          "https://www.instagram.com/troiestudio/",
          "https://www.youtube.com/@troiestudio",
        ],
        subOrganization: {
          "@type": "Organization",
          name: "TROIE",
          alternateName: "troie.app",
          url: "https://troie.app",
          description:
            locale === "fr"
              ? "Les outils IA gratuits et les cours en ligne de TROIE Studio."
              : "Free AI tools and online courses by TROIE Studio.",
        },
      },
      {
        "@type": "Person",
        "@id": "https://troiestudio.fr/#hugues",
        name: "Hugues Lourmieres",
        jobTitle: tBrand("jobTitle"),
        worksFor: { "@id": "https://troiestudio.fr/#organization" },
        url: "https://troiestudio.fr",
        knowsAbout: [
          "Stratégie marketing",
          "Acquisition",
          "SEO",
          "Référencement dans les moteurs IA (GEO)",
          "Agents IA et automatisation",
          "Direction artistique",
        ],
        sameAs: ["https://www.linkedin.com/in/hugueslourmieres/"],
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
      className={`${bodoni.variable} ${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="tone-light bg-[var(--bg)] text-[var(--fg)] antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ScrollProgress />
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
