import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ContactCTA } from "@/components/ContactCTA";

const SHOTS = [
  { img: "/images/creation-section/mockup-phone.jpg", label: "Application mobile" },
  { img: "/images/creation-section/mockup-desktop.jpg", label: "Site & web app" },
  { img: "/images/creation-section/mockup-billboard.jpg", label: "Affichage digital" },
];

const ITEMS = [
  "Sites web, web apps et landing pages sur mesure",
  "Application mobile iOS et Android",
  "E-commerce : Shopify, parcours d'achat et conversion",
  "Identité numérique et systèmes de design",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: "Web · Création",
    description:
      "Sites, web apps et e-commerce sur mesure : les produits digitaux signés TROIE.",
    alternates: {
      canonical: `/${locale}/creation/web`,
      languages: { fr: "/fr/creation/web", en: "/en/creation/web" },
    },
  };
}

export default async function WebPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24">
        <p className="t-eyebrow">Création · Web</p>
        <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
          Web.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/85 md:text-xl">
          Sites, web apps et e-commerce sur mesure. Des produits digitaux pensés
          pour la marque comme pour la conversion.
        </p>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
          {SHOTS.map((s) => (
            <div key={s.label}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[var(--bg-2)]">
                <Image
                  src={s.img}
                  alt={s.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <ul className="mt-16 grid gap-4 border-t border-[var(--rule)] pt-10 sm:grid-cols-2">
          {ITEMS.map((it) => (
            <li
              key={it}
              className="flex items-baseline gap-4 text-sm leading-relaxed text-[var(--fg-2)] md:text-base"
            >
              <span aria-hidden="true" className="inline-block h-px w-3 flex-shrink-0 bg-[var(--accent)]" />
              <span>{it}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/${locale}/contact?subject=web`}
          className="group mt-12 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Démarrer un projet web
          <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
        </Link>
      </section>

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
