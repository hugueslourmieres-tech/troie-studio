import "../globals.css";
import type { Metadata } from "next";
import { Bodoni_Moda, Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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

  const title = `${t("name")}. ${
    isFr
      ? "Atelier digital, création & IA à Nice"
      : "Digital studio, creative & AI in Nice, France"
  }`;
  // SEO description (long form), différent from the in-page `tagline`
  // which is kept short for visual use in the footer.
  const description = t("metaDescription");

  return {
    metadataBase: new URL("https://troiestudio.fr"),
    title: {
      default: title,
      template: `%s · ${t("name")}`,
    },
    description,
    keywords: isFr
      ? [
          "agence IA Nice",
          "atelier digital Nice",
          "formation IA Nice",
          "agence intelligence artificielle Côte d'Azur",
          "formation ChatGPT Nice",
          "consultant IA Nice",
          "agents IA entreprise",
          "automatisation IA",
          "agence communication Nice",
          "direction artistique Nice",
          "stratégie de marque",
          "création de site web Nice",
          "formation intelligence artificielle France",
          "IA pour entreprises francophones",
          "agence digitale Provence-Alpes-Côte d'Azur",
        ]
      : [
          "AI agency Nice France",
          "AI training",
          "ChatGPT training",
          "AI agents for business",
          "automation",
          "brand strategy",
          "digital studio French Riviera",
        ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
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
        "@type": ["Organization", "EducationalOrganization", "ProfessionalService"],
        "@id": "https://troiestudio.fr/#organization",
        name: tBrand("name"),
        alternateName: "TROIE Atelier Digital",
        url: "https://troiestudio.fr",
        logo: "https://troiestudio.fr/images/brand/og-image.png",
        description: tBrand("organizationDescription"),
        founder: { "@id": "https://troiestudio.fr/#hugues" },
        founders: [{ "@id": "https://troiestudio.fr/#hugues" }],
        knowsAbout: [
          "Intelligence artificielle générative",
          "ChatGPT",
          "Claude",
          "Gemini",
          "Prompt engineering",
          "Agents IA",
          "Automatisation (Make, n8n)",
          "Formation IA",
          "Direction artistique",
          "Identité de marque",
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
          email: "contact@troiestudio.fr",
          contactType: "customer service",
          availableLanguage: ["French", "English"],
        },
        sameAs: ["https://www.linkedin.com/in/hugueslourmieres/"],
      },
      {
        "@type": "Person",
        "@id": "https://troiestudio.fr/#hugues",
        name: "Hugues Lourmieres",
        jobTitle: tBrand("jobTitle"),
        worksFor: { "@id": "https://troiestudio.fr/#organization" },
        url: "https://troiestudio.fr",
        knowsAbout: [
          "Intelligence artificielle générative",
          "Prompt engineering",
          "Agents IA",
          "Automatisation",
          "Direction artistique",
          "Stratégie de marque",
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
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
