import { setRequestLocale } from "next-intl/server";
import { CASES_PATH, CaseStudy, caseJsonLd, type CaseCopy } from "@/components/CaseStudy";
import { loc, pageAlternates } from "@/components/SeoBlocks";
import { pageSocial } from "@/lib/og";
import { metaDescription, seoTitle } from "@/lib/seo";

/**
 * Étude de cas Rutherford (23/10/2026), FR et EN. Faits repris de
 * HomeResults (réseaux sociaux : contenus, vidéos, publications), de la page
 * /hugues (direction marketing à temps partagé depuis 2018) et de
 * WebProjects (rutherford.fr). Un seul chiffre : TikTok +193 % depuis mars
 * 2025 (src/lib/results.ts).
 */
const PATH = `${CASES_PATH}/rutherford`;

const COPY: Record<"fr" | "en", CaseCopy> = {
  fr: {
    metaTitle: "Rutherford : +193 % d'abonnés TikTok en B2B",
    metaDesc:
      "Étude de cas réseaux sociaux : Rutherford, PME industrielle B2B de l'imprimerie et de l'emballage. +193 % d'abonnés TikTok depuis mars 2025.",
    title: "Rutherford : +193 % d'abonnés TikTok depuis mars 2025.",
    intro:
      "Une PME industrielle, qui vend à d'autres entreprises. Sur TikTok, un réseau qu'on croit réservé au grand public, son audience a presque triplé.",
    sections: [
      {
        title: "Le client.",
        paragraphs: [
          "Rutherford est une PME industrielle, en B2B. Elle propose des solutions pour l'imprimerie et l'emballage.",
        ],
      },
      {
        title: "Notre travail.",
        paragraphs: [
          "Hugues dirige le marketing de Rutherford à temps partagé depuis 2018. Avec l'équipe, nous faisons vivre ses réseaux sociaux : contenus, vidéos, publications.",
          "Le site rutherford.fr fait aussi partie de nos réalisations web.",
        ],
      },
      {
        title: "Le résultat.",
        paragraphs: [
          "Le nombre d'abonnés TikTok de Rutherford a progressé de 193 % entre mars 2025 et septembre 2026. Une preuve qu'un sujet industriel peut intéresser, à condition d'être bien filmé.",
        ],
      },
    ],
    sourceTitle: "D'où vient le chiffre.",
    source:
      "Relevés datés des exports TikTok et de la page publique du compte. Le point de départ est mars 2025. Nous publions une évolution en pourcentage.",
    related: [
      { href: "strategie", label: "Communication et réseaux sociaux" },
      { href: "medias", label: "Photo et vidéo" },
    ],
  },
  en: {
    metaTitle: "Rutherford: +193% TikTok followers in B2B",
    metaDesc:
      "Social media case study: Rutherford, an industrial B2B SME in printing and packaging. +193% TikTok followers since March 2025.",
    title: "Rutherford: +193% TikTok followers since March 2025.",
    intro:
      "An industrial SME that sells to other businesses. On TikTok, a network people think is only for consumers, its audience almost tripled.",
    sections: [
      {
        title: "The client.",
        paragraphs: [
          "Rutherford is an industrial SME, in B2B. It provides solutions for printing and packaging.",
        ],
      },
      {
        title: "Our work.",
        paragraphs: [
          "Hugues has led Rutherford's marketing on a fractional basis since 2018. With the team, we run its social media: content, videos, posts.",
          "The rutherford.fr website is also part of our web portfolio.",
        ],
      },
      {
        title: "The result.",
        paragraphs: [
          "Rutherford's TikTok followers grew by 193% between March 2025 and September 2026. Proof that an industrial subject can draw interest, as long as it is filmed well.",
        ],
      },
    ],
    sourceTitle: "Where the figure comes from.",
    source:
      "Dated readings from TikTok exports and the account's public page. The starting point is March 2025. We publish a change in percent.",
    related: [
      { href: "strategie", label: "Communication and social media" },
      { href: "medias", label: "Photo and video" },
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

export default async function RutherfordCasePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY[loc(locale)];
  return (
    <CaseStudy
      locale={locale}
      id="rutherford"
      copy={c}
      jsonLd={caseJsonLd({
        locale,
        id: "rutherford",
        copy: c,
        extra: { about: { "@type": "Organization", name: "Rutherford", url: "https://rutherford.fr" } },
      })}
    />
  );
}
