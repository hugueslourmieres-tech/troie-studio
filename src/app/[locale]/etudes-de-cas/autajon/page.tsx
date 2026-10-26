import { setRequestLocale } from "next-intl/server";
import { CASES_PATH, CaseStudy, caseJsonLd, type CaseCopy } from "@/components/CaseStudy";
import { VideoFacade } from "@/components/VideoFacade";
import { loc, pageAlternates } from "@/components/SeoBlocks";
import { thumbnailUrl } from "@/lib/data/videos";
import { pageSocial } from "@/lib/og";
import { metaDescription, seoTitle } from "@/lib/seo";

/**
 * Étude de cas Autajon (23/10/2026), FR et EN. Faits repris de ProofCase et
 * de src/lib/data/videos.ts : film tourné chez Autajon Packaging, à Milan,
 * pour le groupe Rutherford, filmé et monté par l'équipe. ×35 = estimation
 * du groupe Rutherford, jamais un montant. Vidéo diffusée avec l'accord du
 * groupe (même mention que ProofCase).
 */
const PATH = `${CASES_PATH}/autajon`;
const YOUTUBE_ID = "FTjkGK2K-wI";
const VIDEO_TITLE = "Autajon Packaging Milan";

const COPY: Record<"fr" | "en", CaseCopy & { credit: string; play: string }> = {
  fr: {
    metaTitle: "Autajon : un film qui rapporte 35 fois son budget",
    metaDesc:
      "Étude de cas vidéo : film client tourné chez Autajon Packaging, à Milan, pour le groupe Rutherford, qui estime qu'il a rapporté environ 35 fois son budget.",
    title: "Autajon : un film qui a rapporté environ 35 fois son budget.",
    intro:
      "Un film client, tourné sur un site d'emballage, en Italie. Le groupe Rutherford estime qu'il lui a rapporté environ 35 fois ce qu'il a coûté.",
    sections: [
      {
        title: "Le client.",
        paragraphs: [
          "Autajon est un grand groupe de l'emballage. Le film a été tourné chez Autajon Packaging, à Milan, pour le groupe Rutherford.",
        ],
      },
      {
        title: "Notre travail.",
        paragraphs: [
          "L'équipe a filmé le site sur place, puis monté le film. Le sujet : la régularité des couleurs et l'efficacité de la production.",
        ],
      },
      {
        title: "Le résultat.",
        paragraphs: [
          "Le groupe Rutherford estime que ce film lui a rapporté environ 35 fois son budget, en ventes. Un témoignage client bien filmé convainc d'autres clients.",
        ],
      },
    ],
    sourceTitle: "D'où vient le chiffre.",
    source:
      "Il s'agit d'une estimation du groupe Rutherford, qui rapporte les ventes au budget du film. Nous ne publions pas de montant.",
    related: [
      { href: "medias", label: "Photo et vidéo" },
      { href: "strategie", label: "Communication et réseaux sociaux" },
    ],
    credit: "Vidéo réalisée pour le groupe Rutherford, diffusée avec son accord.",
    play: "Lire la vidéo",
  },
  en: {
    metaTitle: "Autajon: a film that returned 35 times its budget",
    metaDesc:
      "Video case study: a customer film shot at Autajon Packaging in Milan for the Rutherford group, which estimates it brought in around 35 times its budget.",
    title: "Autajon: a film that brought in around 35 times its budget.",
    intro:
      "A customer film, shot at a packaging site in Italy. The Rutherford group estimates it brought in around 35 times what it cost.",
    sections: [
      {
        title: "The client.",
        paragraphs: [
          "Autajon is a large packaging group. The film was shot at Autajon Packaging, in Milan, for the Rutherford group.",
        ],
      },
      {
        title: "Our work.",
        paragraphs: [
          "The team filmed the site on location, then edited the film. The subject: colour consistency and production efficiency.",
        ],
      },
      {
        title: "The result.",
        paragraphs: [
          "The Rutherford group estimates the film brought in around 35 times its budget, in sales. A well-filmed customer story convinces other customers.",
        ],
      },
    ],
    sourceTitle: "Where the figure comes from.",
    source:
      "It is an estimate by the Rutherford group, comparing sales with the film's budget. We do not publish any amount.",
    related: [
      { href: "medias", label: "Photo and video" },
      { href: "strategie", label: "Communication and social media" },
    ],
    credit: "Video made for the Rutherford group, shared with its agreement.",
    play: "Play the video",
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

export default async function AutajonCasePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY[loc(locale)];

  const media = (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-12 md:py-24">
        <VideoFacade
          youtubeSrc={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1&playsinline=1`}
          poster={thumbnailUrl(YOUTUBE_ID)}
          title={VIDEO_TITLE}
          zoom={false}
          playLabel={c.play}
          ariaLabel={`${c.play}${loc(locale) === "en" ? ":" : " :"} ${VIDEO_TITLE}`}
        />
        <p className="mt-4 text-xs text-[var(--fg-2)]/70">{c.credit}</p>
      </div>
    </section>
  );

  return (
    <CaseStudy
      locale={locale}
      id="autajon"
      copy={c}
      media={media}
      jsonLd={caseJsonLd({
        locale,
        id: "autajon",
        copy: c,
        // Pas de VideoObject : la date de mise en ligne (uploadDate,
        // obligatoire pour Google) n'est pas dans le dépôt.
        extra: { about: { "@type": "Organization", name: "Autajon" } },
      })}
    />
  );
}
