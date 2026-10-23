import { setRequestLocale } from "next-intl/server";
import { CASES_PATH } from "@/components/CaseStudy";
import { ContactCTA } from "@/components/ContactCTA";
import { JsonLd, ORG_ID } from "@/components/JsonLd";
import { BASE, PROOFS, PageHero, ProofGrid, loc, pageAlternates, type ProofId } from "@/components/SeoBlocks";
import { pageSocial } from "@/lib/og";
import { metaDescription, seoTitle } from "@/lib/seo";

/** Index des études de cas (23/10/2026), FR et EN. */
const COPY = {
  fr: {
    metaTitle: "Études de cas : des résultats mesurés",
    metaDesc:
      "Trois clients, trois résultats mesurés : LOIR Paris (+164 % de ventes en ligne), Rutherford (+193 % d'abonnés TikTok), Autajon (un film qui rapporte 35 fois son budget).",
    eyebrow: "Études de cas",
    title: "Études de cas.",
    intro:
      "Trois clients, trois résultats mesurés. Des chiffres lus dans les outils de nos clients, publiés en pourcentage.",
    gridTitle: "Une boutique en ligne, une PME industrielle, un grand groupe.",
  },
  en: {
    metaTitle: "Case studies: measured results",
    metaDesc:
      "Three clients, three measured results: LOIR Paris (+164% online sales), Rutherford (+193% TikTok followers), Autajon (a film that returned 35 times its budget).",
    eyebrow: "Case studies",
    title: "Case studies.",
    intro:
      "Three clients, three measured results. Figures read in our clients' own tools, published in percent.",
    gridTitle: "An online store, an industrial SME, a large group.",
  },
} as const;

const IDS: ProofId[] = ["loir", "rutherford", "autajon"];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = COPY[loc(locale)];
  return {
    title: seoTitle(c.metaTitle),
    description: metaDescription(c.metaDesc),
    alternates: pageAlternates(locale, CASES_PATH),
    ...pageSocial({ locale, path: CASES_PATH, title: c.metaTitle, description: c.metaDesc }),
  };
}

export default async function CasesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = loc(locale);
  const c = COPY[l];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE}/${locale}${CASES_PATH}#page`,
    name: c.metaTitle,
    description: c.metaDesc,
    url: `${BASE}/${locale}${CASES_PATH}`,
    inLanguage: l,
    publisher: { "@id": ORG_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: IDS.map((id, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${PROOFS[id].client}${l === "en" ? ":" : " :"} ${PROOFS[id].value[l]} ${PROOFS[id].label[l]}`,
        url: `${BASE}/${locale}${CASES_PATH}/${PROOFS[id].slug}`,
      })),
    },
  };

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <JsonLd data={jsonLd} />
      <div aria-hidden="true" className="h-16 md:h-20" />
      <PageHero locale={locale} eyebrow={c.eyebrow} title={c.title} intro={c.intro} />
      <ProofGrid locale={locale} title={c.gridTitle} ids={IDS} />
      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
