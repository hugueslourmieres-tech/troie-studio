import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { pageSocial } from "@/lib/og";

/**
 * Page du lien en bio Instagram (1er/10/2026), /fr/hello et /en/hello.
 * Une colonne, gouttière de 16 px, l'essentiel tient dans 375 x 812.
 * Page noindex et hors sitemap : elle sert seulement aux visiteurs qui
 * arrivent d'Instagram (le lien court /ig et la redirection sont gérés
 * ailleurs). Header et Footer viennent du layout [locale].
 *
 * Liens en bio (gestes de Hugues, hors dépôt) :
 * - @hugueslourmieres vers troiestudio.fr/ig
 * - @troiestudio vers troiestudio.fr/fr/hello?utm_source=instagram&utm_medium=bio&utm_campaign=troiestudio
 */

const CAL_URL = "https://cal.com/troiestudio/30min";
const INSTAGRAM_URL = "https://www.instagram.com/troiestudio/";
const LINKEDIN_URL = "https://www.linkedin.com/company/troiestudio";
const APP_URL = "https://troie.app";
/* Vignette YouTube de la vidéo Autajon (domaine déjà autorisé dans next.config). */
const AUTAJON_THUMB = "https://i.ytimg.com/vi/FTjkGK2K-wI/hqdefault.jpg";

const COPY = {
  fr: {
    metaTitle: "Bonjour, je suis Hugues",
    metaDescription:
      "Hugues Lourmieres, fondateur de TROIE Studio : stratégie, photo, vidéo et sites web.",
    name: "Hugues Lourmieres",
    role: "Fondateur de TROIE Studio",
    eyebrow: "Depuis Instagram",
    title: "Bonjour, je suis Hugues.",
    body: "Vous connaissez mes photos de nature. Avec TROIE Studio, je mets le même regard au service des entreprises. Mon équipe et moi pensons votre stratégie, puis nous la montrons en photo, en vidéo et sur le web. Nous travaillons partout en France.",
    book: "Réserver 30 min",
    project: "Décrire mon projet",
    work: "Voir les réalisations",
    team: "Rencontrer l'équipe",
    series: "Mes séries nature",
    thumbs: ["La vidéo Autajon", "Valberg", "Animaux"],
    appLead: "Vous êtes un particulier ? Nos outils en ligne sont sur",
    based: "Basés à Nice, partout en France",
    newTab: "nouvel onglet",
  },
  en: {
    metaTitle: "Hello, I'm Hugues",
    metaDescription:
      "Hugues Lourmieres, founder of TROIE Studio: strategy, photo, video and websites.",
    name: "Hugues Lourmieres",
    role: "Founder of TROIE Studio",
    eyebrow: "From Instagram",
    title: "Hello, I'm Hugues.",
    body: "You know my nature photos. With TROIE Studio, I bring the same eye to businesses. My team and I shape your strategy, then show it in photos, video and on the web. We work across France.",
    book: "Book 30 min",
    project: "Describe my project",
    work: "See our work",
    team: "Meet the team",
    series: "My nature series",
    /* Le plan ne donne que les alt FR. En anglais, « Animaux » devient
       « Wildlife », comme dans la section Réalisations de l'accueil. */
    thumbs: ["The Autajon video", "Valberg", "Wildlife"],
    appLead: "Not a business? Our online tools are on",
    based: "Based in Nice, working across France",
    newTab: "new tab",
  },
} as const;

function copyFor(locale: string) {
  return locale === "en" ? COPY.en : COPY.fr;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = copyFor(locale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    /* Canonique sur elle-même : sans cela, la page hériterait du canonique
       de l'accueil déclaré dans le layout, ce qui contredirait le noindex. */
    alternates: {
      canonical: `/${locale}/hello`,
      languages: { fr: "/fr/hello", en: "/en/hello" },
    },
    robots: { index: false, follow: true },
    ...pageSocial({
      locale,
      path: "/hello",
      title: c.metaTitle,
      description: c.metaDescription,
    }),
  };
}

/* Styles partagés. Cibles tactiles de 56 px (h-14), pleine largeur. */
const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--fg)]";
const BUTTON =
  "flex h-14 w-full items-center justify-center gap-2 px-5 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300";
const LINK_ROW = `group flex h-14 w-full items-center justify-between gap-4 border border-[var(--rule-strong)] px-5 text-left text-base text-[var(--fg)] transition-colors duration-300 hover:border-[var(--fg)] ${FOCUS}`;

export default async function HelloPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = copyFor(locale);

  const links = [
    { href: `/${locale}/medias`, label: c.work },
    { href: `/${locale}#about`, label: c.team },
    { href: `/${locale}/medias#photo`, label: c.series },
  ];

  const thumbs = [
    {
      href: `/${locale}#exemple`,
      src: AUTAJON_THUMB,
      alt: c.thumbs[0],
      video: true,
      position: "center",
    },
    {
      href: `/${locale}/medias#valberg`,
      src: "/images/works/Valberg/cover.jpg",
      alt: c.thumbs[1],
      video: false,
      position: "center 55%",
    },
    {
      href: `/${locale}/medias#animaux`,
      src: "/images/works/Animaux/cover.jpg",
      alt: c.thumbs[2],
      video: false,
      position: "center",
    },
  ];

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-md px-4 pt-28 pb-20 text-center">
        {/* 1. Portrait */}
        <Image
          src="/images/about/hugues-2025.jpg"
          alt="Hugues Lourmieres"
          width={96}
          height={96}
          loading="eager"
          fetchPriority="high"
          className="mx-auto h-24 w-24 rounded-full object-cover grayscale"
          style={{ objectPosition: "center 30%" }}
        />

        {/* 2. Nom et rôle */}
        <p className="t-display mt-4 text-xl">{c.name}</p>
        <p className="mt-1 text-sm text-[var(--fg-2)]">{c.role}</p>

        {/* 3 à 5. Surtitre, titre, texte */}
        <p className="t-eyebrow mt-8">{c.eyebrow}</p>
        <h1 className="t-display mt-3 text-4xl">{c.title}</h1>
        <p className="mt-5 text-base leading-relaxed text-[var(--fg-2)]">{c.body}</p>

        {/* 6. Les deux actions : réserver (orange plein), lancer un projet (contour) */}
        <div className="mt-8 flex flex-col gap-3">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className={`${BUTTON} bg-[var(--ink)] text-white hover:bg-[#2a2e37] hover:text-white ${FOCUS}`}
          >
            {c.book}
            <span aria-hidden="true">↗</span>
            <span className="sr-only">({c.newTab})</span>
          </a>
          <Link
            href={`/${locale}/contact#projet`}
            className={`${BUTTON} border border-[var(--ink)] text-[var(--fg)] hover:bg-[var(--ink)] hover:text-[var(--bg)] ${FOCUS}`}
          >
            {c.project}
          </Link>
        </div>

        {/* 7. Trois liens vers le site */}
        <ul className="mt-6 flex flex-col gap-2">
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className={LINK_ROW}>
                <span>{l.label}</span>
                <span
                  aria-hidden="true"
                  className="text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* 8. Trois vignettes noir et blanc, aucune lecture automatique */}
        <ul className="mt-8 grid grid-cols-3 gap-2">
          {thumbs.map((th) => (
            <li key={th.src}>
              <Link
                href={th.href}
                className={`group relative block aspect-square overflow-hidden bg-[var(--ink)] ${FOCUS}`}
              >
                {/* La vignette hqdefault de YouTube porte des bandes noires en
                    haut et en bas : un zoom de 1,36 les sort du cadre carré. */}
                <Image
                  src={th.src}
                  alt={th.alt}
                  fill
                  sizes="(max-width: 448px) 31vw, 136px"
                  className={`object-cover grayscale transition-transform duration-700 ${
                    th.video ? "scale-[1.36] group-hover:scale-[1.4]" : "group-hover:scale-[1.04]"
                  }`}
                  style={{ objectPosition: th.position }}
                />
                {th.video ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg)]/90 text-[var(--fg)]">
                      <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>

        {/* 9. Ligne discrète vers troie.app */}
        <p className="mt-8 text-xs leading-relaxed text-[var(--fg-2)]">
          {c.appLead}{" "}
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener"
            className={`underline decoration-[var(--rule-strong)] underline-offset-4 transition-colors hover:text-[var(--accent)] ${FOCUS}`}
          >
            troie.app
            <span className="sr-only"> ({c.newTab})</span>
          </a>
          .
        </p>

        {/* 10. Réseaux du studio et adresse */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <li>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex min-h-11 items-center gap-2 text-sm text-[var(--fg-2)] transition-colors hover:text-[var(--accent)] ${FOCUS}`}
            >
              <InstagramIcon />
              <span>
                <span className="sr-only">Instagram </span>@troiestudio
              </span>
            </a>
          </li>
          <li>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex min-h-11 items-center gap-2 text-sm text-[var(--fg-2)] transition-colors hover:text-[var(--accent)] ${FOCUS}`}
            >
              <LinkedInIcon />
              <span>
                <span className="sr-only">LinkedIn </span>TROIE Studio
              </span>
            </a>
          </li>
        </ul>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
          {c.based}
        </p>
      </div>
    </div>
  );
}

/** Instagram, même tracé que le pied de page. */
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** LinkedIn, même tracé que le pied de page. */
function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z" />
    </svg>
  );
}
