import Link from "next/link";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { ContactCTA } from "@/components/ContactCTA";
import { GreekMark } from "@/components/GreekMark";

const COPY = {
  fr: {
    metaTitle: "Création",
    metaDesc: "Vidéo, photographie et web : les contenus et produits digitaux qui incarnent votre marque, signés TROIE.",
    label: "01 · Création",
    title: "Création.",
    intro: "Les contenus et produits digitaux qui incarnent vos marques : vidéo, photographie, web.",
    cards: {
      video: { label: "Vidéo", desc: "Films de marque, reels social et présentations produit." },
      photos: { label: "Photos", desc: "Photographie corporate, produit et événementielle." },
      web: { label: "Web", desc: "Sites, web apps et e-commerce sur mesure." },
    },
  },
  en: {
    metaTitle: "Creation",
    metaDesc: "Video, photography and web: the digital products and content that give shape to your brand, made by TROIE.",
    label: "01 · Creation",
    title: "Creation.",
    intro: "The digital products and content that give shape to your brands: video, photography, web.",
    cards: {
      video: { label: "Video", desc: "Brand films, social reels and product showcases." },
      photos: { label: "Photos", desc: "Corporate, product and event photography." },
      web: { label: "Web", desc: "Custom websites, web apps and e-commerce." },
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
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: {
      canonical: `/${locale}/creation`,
      languages: { fr: "/fr/creation", en: "/en/creation" },
    },
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
    { href: `/${locale}/creation/video`, ...c.cards.video, img: "/images/creation/video/poster.jpg" },
    { href: `/${locale}/works`, ...c.cards.photos, img: "/images/works/CHANEL/cover.jpg" },
    { href: `/${locale}/creation/web`, ...c.cards.web, img: "/images/creation-section/mockup-desktop.jpg" },
  ];

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24">
        <GreekMark letter="Δ" label={c.label} />
        <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
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
                <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f5f0e6]">
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
