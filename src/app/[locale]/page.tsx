import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { AudienceFork } from "@/components/AudienceFork";
import { QcmSection } from "@/components/QcmSection";
import { ServiceSection } from "@/components/ServiceSection";
import { ProSection } from "@/components/ProSection";
import { AgentsTeaser } from "@/components/AgentsTeaser";
import { ClientsCloud } from "@/components/ClientsCloud";
import { AboutBlock } from "@/components/AboutBlock";
import { JournalTeaser } from "@/components/JournalTeaser";
import { ContactCTA } from "@/components/ContactCTA";
import { EmblemBreak } from "@/components/EmblemBreak";
import { WriteOnScroll } from "@/components/WriteOnScroll";

/**
 * Home, positionnement "IA d'abord". On entre par son public (fork), puis
 * deux parcours : Particuliers (les QCM gratuits) et Professionnels (par
 * métier). Création/stratégie/réalisations ne sont plus sur la home (elles
 * vivent sur /works) : on garde juste les logos clients + un lien comme
 * preuve. DA Hermès conservée (orange / cream alternés).
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
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

      {/* PARTICULIERS : les QCM gratuits, cartes cliquables */}
      <QcmSection />

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

      {/* PROFESSIONNELS : pitch par métier, renvoie vers /ia */}
      <ProSection locale={locale} />

      {/* AGENTS, teaser orange Hermès, 3 figures de l'Antiquité vers /agents */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <AgentsTeaser
          locale={locale}
          lang={locale === "en" ? "en" : "fr"}
        />
      </div>

      {/* JOURNAL : aimant SEO + pédagogie */}
      <JournalTeaser locale={locale} />

      <EmblemBreak size="md" />

      {/* PREUVE FINE : logos clients + lien vers les réalisations */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ClientsCloud />
        <div className="mx-auto max-w-7xl px-6 pb-16 text-center md:px-12 md:pb-20">
          <Link
            href={`/${locale}/works`}
            className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--bg)] hover:text-[var(--bg)]"
          >
            Voir nos réalisations
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      <AboutBlock />

      {/* CTA, only orange section of the entire site */}
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
