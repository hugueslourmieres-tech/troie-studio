import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { WORKS, type Work } from "@/lib/works";
import { VideoCarousel } from "@/components/VideoCarousel";
import { ProofCase } from "@/components/ProofCase";
import { pageSocial } from "@/lib/og";
import { metaDescription, seoTitle } from "@/lib/seo";

/**
 * Page « Réalisations » (/medias, 1er/10/2026). Ordre : l'exemple Autajon,
 * la vidéo, la photographie pour les entreprises, puis le regard personnel
 * de Hugues (séries Valberg et Animaux). La vidéo Autajon est retirée du
 * carrousel puisqu'elle est déjà montrée en tête de page.
 */

/** Les séries personnelles de Hugues, sorties de la grille « entreprises ». */
const PERSONAL = ["valberg", "animaux"];

/** Identifiant YouTube de la vidéo Autajon, déjà dans le bloc ProofCase. */
const PROOF_VIDEO_ID = "FTjkGK2K-wI";

const INSTAGRAM_HUGUES = "https://www.instagram.com/hugueslourmieres/";

const COPY = {
  fr: {
    metaTitle: "Photo et vidéo d'entreprise, nos réalisations",
    metaDesc:
      "Films de marque, témoignages clients et reportages photo, tournés sur le terrain par l'équipe TROIE pour des maisons de luxe et des industriels.",
    eyebrow: "Réalisations",
    title: "Photo et vidéo, faites sur le terrain.",
    intro:
      "Des films et des photos faits sur place : ateliers, usines, boutiques, événements. Hugues et Thibaud Lourmieres réalisent, filment et montent. Chaque projet part d'une question simple : qu'est-ce que l'image doit prouver ?",
    videoEyebrow: "Vidéo",
    videoBody:
      "Films de marque, témoignages clients, contenus pour les réseaux. Du concept au montage.",
    photoEyebrow: "Photographie, pour les entreprises",
    regardEyebrow: "Le regard de Hugues",
    regardBody:
      "Hugues photographie aussi la nature et la faune, souvent en noir et blanc. Ses séries sont sur Instagram.",
    follow: "Suivre @hugueslourmieres",
  },
  en: {
    metaTitle: "Business photo and video, our work",
    metaDesc:
      "Brand films, customer testimonials and photo reportage, shot on location by the TROIE team for luxury houses and manufacturers.",
    eyebrow: "Work",
    title: "Photo and video, made on location.",
    intro:
      "Films and photos made on site: workshops, factories, shops, events. Hugues and Thibaud Lourmieres direct, shoot and edit. Every project starts with a simple question: what must the image prove?",
    videoEyebrow: "Video",
    videoBody:
      "Brand films, customer testimonials, content for social media. From concept to edit.",
    photoEyebrow: "Photography for businesses",
    regardEyebrow: "Hugues's eye",
    regardBody:
      "Hugues also photographs nature and wildlife, often in black and white. His series are on Instagram.",
    follow: "Follow @hugueslourmieres",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = COPY[locale === "en" ? "en" : "fr"];
  return {
    title: seoTitle(c.metaTitle),
    description: metaDescription(c.metaDesc),
    alternates: {
      canonical: `/${locale}/medias`,
      languages: { fr: "/fr/medias", en: "/en/medias" },
    },
    ...pageSocial({
      locale,
      path: "/medias",
      title: c.metaTitle,
      description: c.metaDesc,
    }),
  };
}

export default async function MediasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MediasView locale={locale} />;
}

function MediasView({ locale }: { locale: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];
  const business = WORKS.filter((w) => !PERSONAL.includes(w.slug));
  const personal = WORKS.filter((w) => PERSONAL.includes(w.slug));

  return (
    <article>
      {/* En-tête */}
      <header className="mx-auto max-w-7xl px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-20">
        <div className="max-w-3xl">
          <p className="t-eyebrow">{c.eyebrow}</p>
          <h1 className="t-display mt-6 text-4xl leading-[1.05] text-[var(--fg)] sm:text-5xl md:text-7xl">
            {c.title}
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-[var(--fg-2)]/80 md:text-xl">
            {c.intro}
          </p>
        </div>
      </header>

      {/* Un exemple : la vidéo Autajon (le lien « autres vidéos » est inutile ici) */}
      <ProofCase locale={locale} id="exemple" showMoreLink={false} />

      {/* Vidéo. Les surtitres de section sont des h2 au style surtitre : les
          titres du carrousel (h3) et des fiches (h3) se rangent dessous. */}
      <section id="video" className="scroll-mt-24 border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <h2 className="t-eyebrow">{c.videoEyebrow}</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
            {c.videoBody}
          </p>
          <div className="mt-12">
            <VideoCarousel locale={locale} exclude={[PROOF_VIDEO_ID]} />
          </div>
        </div>
      </section>

      {/* Photographie, pour les entreprises */}
      <section id="photo" className="scroll-mt-24 border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <h2 className="t-eyebrow">{c.photoEyebrow}</h2>
          <WorksGrid locale={locale} works={business} />
        </div>
      </section>

      {/* Le regard de Hugues : ses séries personnelles */}
      <section id="regard" className="scroll-mt-24 border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <h2 className="t-eyebrow">{c.regardEyebrow}</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/80 md:text-lg">
            {c.regardBody}
          </p>
          <WorksGrid locale={locale} works={personal} />
          <a
            href={INSTAGRAM_HUGUES}
            target="_blank"
            rel="noreferrer"
            className="group mt-12 inline-flex min-h-[48px] items-center font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:text-[var(--accent)]"
          >
            <span className="inline-flex items-center gap-2.5 border-b-2 border-current pb-1.5">
              {c.follow}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">
                ↗
              </span>
            </span>
          </a>
        </div>
      </section>
    </article>
  );
}

/**
 * Grille de fiches photo (couverture, titre, sous-titre, périmètre). Les
 * titres des fiches sont des h3, sous le h2 de leur section.
 */
function WorksGrid({ locale, works }: { locale: string; works: Work[] }) {
  const t = useTranslations("works");
  return (
    <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:grid-cols-3">
      {works.map((w, i) => (
        <Link key={w.slug} href={`/${locale}/works/${w.slug}`} className="group block">
          <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-2)]">
            <Image
              src={w.cover}
              alt={t(`items.${w.slug}.title`)}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="t-photo object-cover transition duration-700 group-hover:scale-[1.03]"
              style={{ objectPosition: w.coverPosition ?? "center" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg)]/80">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-5">
            <h3 className="t-display text-2xl text-[var(--fg)]">
              {t(`items.${w.slug}.title`)}
            </h3>
            <p className="mt-2 text-sm italic text-[var(--fg-2)]/70">
              {t(`items.${w.slug}.subtitle`)}
            </p>
            <p className="mt-2 text-sm text-[var(--fg-2)]/60">
              {t(`items.${w.slug}.scope`)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
