import "../globals.css";
import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600"],
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

  const title = `${t("name")} — ${
    isFr
      ? "Communication, création & formations IA"
      : "Communication, creative & AI training"
  }`;
  const description = t("tagline");

  return {
    metadataBase: new URL("https://troie.studio"),
    title: {
      default: title,
      template: `%s — ${t("name")}`,
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      url: `https://troie.studio/${locale}`,
      title,
      description,
      siteName: t("name"),
      locale: isFr ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-[var(--color-ink)] text-[var(--color-bone)] antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
