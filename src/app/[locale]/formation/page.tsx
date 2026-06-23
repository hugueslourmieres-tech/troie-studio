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
    title: t("trainingTitle").replace(/\.$/, ""),
    description: t("trainingBody"),
    alternates: {
      canonical: `/${locale}/formation`,
      languages: { fr: "/fr/formation", en: "/en/formation" },
    },
  };
}

export default async function FormationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const items = t.raw("trainingItems") as string[];

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <div aria-hidden="true" className="h-16 md:h-20" />
      <ServiceSection
        headingAs="h1"
        reveal={false}
        id="formation"
        eyebrow={t("trainingEyebrow")}
        title={t("trainingTitle")}
        body={t("trainingBody")}
        items={items}
        ctaLabel={t("trainingCta")}
        ctaHref={`/${locale}/contact?subject=formation`}
        photos={[
          { src: "/images/training-section/01.jpg", alt: "Formation IA, atelier" },
          { src: "/images/training-section/02.jpg", alt: "Formation IA, Montpellier" },
          { src: "/images/training-section/03.jpg", alt: "Formation IA, workshop" },
        ]}
        tools={[
          { src: "/images/logos/chatgpt.svg", label: "ChatGPT" },
          { src: "/images/logos/claude.svg", label: "Claude" },
          { src: "/images/logos/gemini.svg", label: "Gemini" },
          { src: "/images/logos/perplexity.svg", label: "Perplexity" },
          { src: "/images/logos/make.svg", label: "Make" },
          { src: "/images/logos/copilot.svg", label: "Copilot" },
        ]}
      />

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
