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
    title: t("creationTitle").replace(/\.$/, ""),
    description: t("creationBody"),
    alternates: {
      canonical: `/${locale}/creation`,
      languages: { fr: "/fr/creation", en: "/en/creation" },
    },
  };
}

export default async function CreationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const items = t.raw("creationItems") as string[];

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <div aria-hidden="true" className="h-16 md:h-20" />
      <ServiceSection
        headingAs="h1"
        reveal={false}
        id="creation"
        eyebrow={t("creationEyebrow")}
        title={t("creationTitle")}
        body={t("creationBody")}
        items={items}
        ctaLabel={t("creationCta")}
        ctaHref={`/${locale}/contact?subject=création`}
        photos={[
          { src: "/images/creation-section/01-black-horse.png", alt: "Création IA, portrait de cheval" },
          { src: "/images/creation-section/02-dsc-0908.jpg", alt: "Création, photographie" },
          { src: "/images/creation-section/03-img-8524.jpg", alt: "Création, image" },
        ]}
        tools={[
          { src: "/images/logos/adobe.svg", label: "Adobe" },
          { src: "/images/logos/figma.svg", label: "Figma" },
          { src: "/images/logos/davinci-resolve.svg", label: "DaVinci Resolve" },
          { src: "/images/logos/midjourney.svg", label: "Midjourney" },
          { src: "/images/logos/runway.svg", label: "Runway" },
        ]}
      />

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
