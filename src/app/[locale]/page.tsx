import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { AudienceFork } from "@/components/AudienceFork";
import { ServiceSection } from "@/components/ServiceSection";
import { AgentsTeaser } from "@/components/AgentsTeaser";
import { WorksGallery } from "@/components/WorksGallery";
import { ClientsCloud } from "@/components/ClientsCloud";
import { AboutBlock } from "@/components/AboutBlock";
import { JournalTeaser } from "@/components/JournalTeaser";
import { ContactCTA } from "@/components/ContactCTA";
import { EmblemBreak } from "@/components/EmblemBreak";
import { WriteOnScroll } from "@/components/WriteOnScroll";

/**
 * Home, positionnement "IA d'abord" : on forme et on accompagne à l'IA
 * (pro + perso, en ligne + présentiel). Le fork Pro/Perso oriente tout de
 * suite, la formation est mise en avant, création/stratégie/réalisations
 * deviennent la preuve. DA Hermès conservée (orange / cream alternés).
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
      {/* Écriture au scroll : les titres de section s'écrivent mot par mot */}
      <WriteOnScroll />

      {/* HERO, full orange Hermès, opening statement */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <Hero locale={locale} />
      </div>

      {/* INTRO, fond orange Hermès, le studio et ses métiers */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <Intro />
      </div>

      {/* FORK Pro / Perso : oriente le visiteur dès l'entrée */}
      <AudienceFork locale={locale} />

      {/* FORMATION IA, le coeur de l'offre, preuve d'ateliers réels */}
      <ServiceSection
        id="training"
        eyebrow={t("trainingEyebrow")}
        title={t("trainingTitle")}
        body={t("trainingBody")}
        items={trainingItems}
        ctaLabel={t("trainingCta")}
        ctaHref={`/${locale}/formations`}
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

      {/* AGENTS, 04. Teaser orange Hermès, 3 figures de l'Antiquité vers /agents */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <AgentsTeaser
          locale={locale}
          lang={locale === "en" ? "en" : "fr"}
        />
      </div>

      <EmblemBreak size="md" />

      {/* PREUVE : on ne fait pas que former, on pratique (création + stratégie) */}
      <ServiceSection
        id="création"
        eyebrow={t("creationEyebrow")}
        title={t("creationTitle")}
        body={t("creationBody")}
        items={creationItems}
        ctaLabel={t("creationCta")}
        ctaHref={`/${locale}/contact?subject=création`}
        photos={[
          { src: "/images/creation-section/mockup-phone.jpg", alt: "Application et site mobile sur smartphone" },
          { src: "/images/creation-section/mockup-desktop.jpg", alt: "Site web sur ordinateur" },
          { src: "/images/creation-section/mockup-billboard.jpg", alt: "Affichage digital sur panneau publicitaire" },
        ]}
        tools={[
          { src: "/images/logos/adobe.svg", label: "Adobe" },
          { src: "/images/logos/figma.svg", label: "Figma" },
          { src: "/images/logos/davinci-resolve.svg", label: "DaVinci Resolve" },
          { src: "/images/logos/midjourney.svg", label: "Midjourney" },
          { src: "/images/logos/runway.svg", label: "Runway" },
        ]}
      />

      <ServiceSection
        id="strategy"
        eyebrow={t("strategyEyebrow")}
        title={t("strategyTitle")}
        body={t("strategyBody")}
        items={strategyItems}
        ctaLabel={t("strategyCta")}
        ctaHref={`/${locale}/contact?subject=strategy`}
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

      {/* WORKS, réalisations = preuve */}
      <WorksGallery locale={locale} />

      {/* CLIENTS, ORANGE, wordmark grid on the iconic Hermès orange */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ClientsCloud />
      </div>

      <AboutBlock />

      {/* JOURNAL : aimant SEO + pédagogie */}
      <JournalTeaser locale={locale} />

      {/* CTA, only orange section of the entire site */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
