/*
 * <!-- ATTENTION : accord écrit de LOIR Paris EN ATTENTE. Ne pas mettre
 * cette page en production avant d'avoir reçu l'accord écrit du client
 * pour publier son nom et l'évolution de ses ventes. -->
 *
 * Étude de cas LOIR Paris (23/10/2026), FR et EN. Seuls faits publiés :
 * marque de mode, boutique Shopify loirparis.fr, ventes nettes +164 % de
 * septembre 2024 à septembre 2026 sur 12 mois glissants (src/lib/results.ts).
 * Aucun montant, aucun volume.
 * [À COMPLÉTER par Hugues] Détail de la mission (site, contenus,
 * acquisition), à valider avec le client avant publication.
 */
import { setRequestLocale } from "next-intl/server";
import { CASES_PATH, CaseStudy, caseJsonLd, type CaseCopy } from "@/components/CaseStudy";
import { loc, pageAlternates } from "@/components/SeoBlocks";
import { pageSocial } from "@/lib/og";
import { metaDescription, seoTitle } from "@/lib/seo";

const PATH = `${CASES_PATH}/loir-paris`;

const COPY: Record<"fr" | "en", CaseCopy> = {
  fr: {
    metaTitle: "LOIR Paris : +164 % de ventes en ligne en deux ans",
    metaDesc:
      "Étude de cas e-commerce : la boutique Shopify de LOIR Paris, marque de mode. Ventes nettes en ligne +164 % entre septembre 2024 et septembre 2026.",
    title: "LOIR Paris : +164 % de ventes en ligne en deux ans.",
    intro:
      "LOIR Paris est une marque de mode qui vend en ligne. Sa boutique tourne sur Shopify. En deux ans, ses ventes en ligne ont plus que doublé.",
    sections: [
      {
        title: "Le client.",
        paragraphs: [
          "LOIR Paris est une marque de mode. Elle vend sur sa propre boutique en ligne, loirparis.fr, construite sur Shopify.",
        ],
      },
      {
        title: "Notre travail.",
        paragraphs: [
          "Nous travaillons sur la boutique Shopify de LOIR Paris. Le site fait partie de nos réalisations web.",
          "Une boutique qui vend, c'est un site clair, de bonnes images et des visites qualifiées. Les ventes se lisent chaque mois dans Shopify.",
        ],
      },
      {
        title: "Le résultat.",
        paragraphs: [
          "Les ventes nettes en ligne ont progressé de 164 % entre septembre 2024 et septembre 2026. La courbe monte de façon régulière, saison après saison.",
        ],
      },
    ],
    sourceTitle: "D'où vient le chiffre.",
    source:
      "Ventes nettes lues dans la boutique Shopify de LOIR Paris. Chaque point additionne les 12 mois précédents, pour lisser les saisons. Nous publions une évolution en pourcentage, jamais de montant.",
    related: [
      { href: "agence-e-commerce-shopify", label: "Notre offre e-commerce Shopify" },
      { href: "agence-seo-google-ads", label: "SEO et Google Ads" },
    ],
  },
  en: {
    metaTitle: "LOIR Paris: +164% online sales in two years",
    metaDesc:
      "E-commerce case study: the Shopify store of LOIR Paris, a fashion brand. Net online sales up 164% between September 2024 and September 2026.",
    title: "LOIR Paris: +164% online sales in two years.",
    intro:
      "LOIR Paris is a fashion brand that sells online. Its store runs on Shopify. In two years, its online sales more than doubled.",
    sections: [
      {
        title: "The client.",
        paragraphs: [
          "LOIR Paris is a fashion brand. It sells on its own online store, loirparis.fr, built on Shopify.",
        ],
      },
      {
        title: "Our work.",
        paragraphs: [
          "We work on the LOIR Paris Shopify store. The website is part of our web portfolio.",
          "A store that sells needs a clear site, good images and qualified visits. Sales are read every month in Shopify.",
        ],
      },
      {
        title: "The result.",
        paragraphs: [
          "Net online sales grew by 164% between September 2024 and September 2026. The curve rises steadily, season after season.",
        ],
      },
    ],
    sourceTitle: "Where the figure comes from.",
    source:
      "Net sales read in the LOIR Paris Shopify store. Each point adds up the previous 12 months, to smooth out the seasons. We publish a change in percent, never an amount.",
    related: [
      { href: "agence-e-commerce-shopify", label: "Our Shopify e-commerce offer" },
      { href: "agence-seo-google-ads", label: "SEO and Google Ads" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = COPY[loc(locale)];
  return {
    title: seoTitle(c.metaTitle),
    description: metaDescription(c.metaDesc),
    alternates: pageAlternates(locale, PATH),
    ...pageSocial({ locale, path: PATH, title: c.metaTitle, description: c.metaDesc }),
  };
}

export default async function LoirCasePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY[loc(locale)];
  return (
    <CaseStudy
      locale={locale}
      id="loir"
      copy={c}
      jsonLd={caseJsonLd({
        locale,
        id: "loir",
        copy: c,
        extra: { about: { "@type": "Organization", name: "LOIR Paris", url: "https://loirparis.fr" } },
      })}
    />
  );
}
