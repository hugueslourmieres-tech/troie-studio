import { setRequestLocale, getTranslations } from "next-intl/server";
import { ServiceSection } from "@/components/ServiceSection";
import { ContactCTA } from "@/components/ContactCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("strategyTitle").replace(/\.$/, ""),
    description: t("strategyBody"),
    alternates: {
      canonical: `/${locale}/strategie`,
      languages: { fr: "/fr/strategie", en: "/en/strategie" },
    },
  };
}

export default async function StrategiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const items = t.raw("strategyItems") as string[];

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <div aria-hidden="true" className="h-16 md:h-20" />
      <ServiceSection
        headingAs="h1"
        reveal={false}
        id="strategie"
        eyebrow={t("strategyEyebrow")}
        title={t("strategyTitle")}
        body={t("strategyBody")}
        items={items}
        ctaLabel={t("strategyCta")}
        ctaHref={`/${locale}/contact?subject=strategy`}
        photos={[
          { src: "/images/strategy-section/01.jpg", alt: "Stratégie, communication marque" },
          { src: "/images/strategy-section/02.jpg", alt: "Stratégie, direction artistique" },
          { src: "/images/strategy-section/03.jpg", alt: "Stratégie, événement Yacht Show" },
        ]}
        tools={[
          { src: "/images/logos/google-analytics.svg", label: "Google Analytics" },
          { src: "/images/logos/google-ads.svg", label: "Google Ads" },
          { src: "/images/logos/meta.svg", label: "Meta" },
          { src: "/images/logos/hubspot.svg", label: "HubSpot" },
          { src: "/images/logos/semrush.svg", label: "Semrush" },
        ]}
      />

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
