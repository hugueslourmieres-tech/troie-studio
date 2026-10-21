import Link from "next/link";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { ContactCTA } from "@/components/ContactCTA";
import { pageSocial } from "@/lib/og";
import { metaDescription, seoTitle } from "@/lib/seo";

/**
 * Page « Création » (1er/10/2026) : photo, vidéo, design et web, faits par
 * l'équipe. Trois cartes vers les pages détaillées. La couverture CHANEL est
 * retirée tant que l'accord de diffusion des photos n'est pas confirmé.
 * La page « Un site aux normes » (/creation/site-conforme) est en français
 * seulement, d'où le lien sans locale et la mention en anglais.
 */
const COPY = {
  fr: {
    metaTitle: "Photo, vidéo, design et sites web à Nice",
    metaDesc:
      "Nous tournons, photographions, dessinons et développons pour votre marque. Direction artistique de Hugues Lourmieres, une équipe qui fabrique elle-même.",
    label: "Création",
    title: "Photo, vidéo, design et web.",
    intro:
      "Nous partons de votre métier et de vos équipes, puis nous les montrons. Hugues Lourmieres assure la direction artistique. Thibaud Lourmieres réalise les films et les photos. Gilles Pons développe les sites et les applications.",
    cards: {
      media: {
        label: "Photo et vidéo",
        desc: "Reportages, films de marque, témoignages clients, contenus pour les réseaux.",
      },
      web: {
        label: "Sites web",
        desc: "Sites vitrines, e-commerce et applications web, pensés pour vos clients.",
      },
      compliant: {
        label: "Un site aux normes",
        desc: "Un site créé ou refait, accessible à tous dès la conception.",
      },
    },
  },
  en: {
    metaTitle: "Photo, video, design and websites in Nice",
    metaDesc:
      "We shoot, photograph, design and build for your brand. Art direction by Hugues Lourmieres, a team that makes things itself.",
    label: "Creative",
    title: "Photo, video, design and web.",
    intro:
      "We start from your trade and your teams, then we show them. Hugues Lourmieres leads art direction. Thibaud Lourmieres directs the films and photos. Gilles Pons builds the websites and apps.",
    cards: {
      media: {
        label: "Photo and video",
        desc: "Reportage, brand films, customer testimonials, social media content.",
      },
      web: {
        label: "Websites",
        desc: "Showcase sites, e-commerce and web apps, designed for your customers.",
      },
      compliant: {
        label: "A compliant website",
        desc: "A new or rebuilt site, accessible to everyone from the start (page in French).",
      },
    },
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
      canonical: `/${locale}/creation`,
      languages: { fr: "/fr/creation", en: "/en/creation" },
    },
    ...pageSocial({
      locale,
      path: "/creation",
      title: c.metaTitle,
      description: c.metaDesc,
    }),
  };
}

export default async function CreationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY[locale === "en" ? "en" : "fr"];

  const cards = [
    { href: `/${locale}/medias`, ...c.cards.media, img: "/images/creation/video/poster.jpg" },
    { href: `/${locale}/creation/web`, ...c.cards.web, img: "/images/creation-section/mockup-desktop.jpg" },
    { href: "/creation/site-conforme", ...c.cards.compliant, img: "/images/creation-section/mockup-phone.jpg" },
  ];

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24">
        <p className="t-eyebrow">{c.label}</p>
        <h1 className="t-display mt-6 text-4xl leading-[1.05] text-[var(--fg)] sm:text-5xl md:text-7xl">
          {c.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/85 md:text-xl">
          {c.intro}
        </p>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
          {cards.map((c, i) => (
            <Link key={c.label} href={c.href} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[var(--bg-2)]">
                <Image
                  src={c.img}
                  alt={c.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ filter: "grayscale(1) contrast(1.03)" }}
                />
                <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#fcfcfd]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="t-display mt-5 text-2xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] md:text-3xl">
                {c.label}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]">
                {c.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
