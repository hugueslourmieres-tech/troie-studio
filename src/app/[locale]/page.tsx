import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { ServiceSection } from "@/components/ServiceSection";
import { WorksGallery } from "@/components/WorksGallery";
import { ClientsCloud } from "@/components/ClientsCloud";
import { AboutBlock } from "@/components/AboutBlock";
import { ContactCTA } from "@/components/ContactCTA";
import { EmblemBreak } from "@/components/EmblemBreak";
import { VideoSection } from "@/components/VideoSection";

/**
 * Home — uniform cream tone everywhere (papier Hermès), one final
 * orange accent on the CTA. No dark sections; the rhythm comes from
 * typography, white space and B&W imagery instead of tonal contrast.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const creationItems = t.raw("creationItems") as string[];
  const strategyItems = t.raw("strategyItems") as string[];
  const trainingItems = t.raw("trainingItems") as string[];

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      {/* HERO — full orange Hermès, opening statement */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <Hero locale={locale} />
      </div>

      {/* INTRO — fond orange Hermès, 3 boxes / 3 métiers / 3 guerriers */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <Intro />
      </div>

      {/* CRÉATION — fond safran #f8b124 */}
      <div className="tone-saffron bg-[var(--bg)] text-[var(--fg)]">
        <ServiceSection
          id="creation"
          eyebrow={t("creationEyebrow")}
          title={t("creationTitle")}
          body={t("creationBody")}
          items={creationItems}
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
      </div>

      <ServiceSection
        id="strategy"
        eyebrow={t("strategyEyebrow")}
        title={t("strategyTitle")}
        body={t("strategyBody")}
        items={strategyItems}
        reverse
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

      <ServiceSection
        id="training"
        eyebrow={t("trainingEyebrow")}
        title={t("trainingTitle")}
        body={t("trainingBody")}
        items={trainingItems}
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

      <EmblemBreak size="md" />

      {/* WORKS — fond cream, plus de tone-accent */}
      <WorksGallery locale={locale} />

      {/* VIDEOS — bibliothèque vidéo corporate, fond cream pour respirer */}
      <VideoSection locale={locale} />

      {/* CLIENTS — ORANGE — wordmark grid on the iconic Hermès orange */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ClientsCloud />
      </div>

      <AboutBlock />

      {/* CTA — only orange section of the entire site */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
