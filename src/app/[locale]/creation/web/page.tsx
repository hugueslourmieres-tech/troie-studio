import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ContactCTA } from "@/components/ContactCTA";

const PROJECTS = [
  {
    name: "Color Guesser",
    kind: "Web app · jeu",
    img: "/images/creation/web/playcolorguesser.jpg",
    href: "https://playcolorguesser.com",
    label: "playcolorguesser.com",
  },
  {
    name: "Rutherford",
    kind: "Site web & plateforme SaaS",
    img: "/images/creation/web/rutherford.jpg",
    href: "https://rutherford.fr",
    label: "rutherford.fr",
  },
  {
    name: "PerPost",
    kind: "Site web & application",
    img: "/images/creation/web/perpost.jpg",
    href: "https://perpost-web.vercel.app",
    label: "perpost-web.vercel.app",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Cadrage",
    body: "Objectifs, audience, périmètre et contraintes. On aligne la marque et la conversion avant la première maquette.",
  },
  {
    step: "02",
    title: "Design",
    body: "Direction artistique, maquettes et prototype interactif (Figma). On valide l'expérience avant de coder.",
  },
  {
    step: "03",
    title: "Développement",
    body: "Sites, web apps et e-commerce sur mesure (Next.js, Shopify), responsive, rapides, et connectés à vos outils.",
  },
  {
    step: "04",
    title: "Lancement",
    body: "Mise en ligne, référencement (SEO, SEA, GEO), mesure et itérations. On reste là après le go-live.",
  },
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
      "Sites, web apps et e-commerce sur mesure : notre processus et nos réalisations (Color Guesser, Rutherford, PerPost).",
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
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-20">
        <p className="t-eyebrow">Création · Web</p>
        <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
          Web.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/85 md:text-xl">
          Sites, web apps et e-commerce sur mesure. Des produits digitaux pensés
          pour la marque comme pour la conversion, du cadrage à la mise en ligne.
        </p>

        {/* Processus */}
        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)] md:mt-20">
          Le processus
        </p>
        <ol className="mt-8 grid gap-px overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-4">
          {PROCESS.map((p) => (
            <li key={p.step} className="flex flex-col bg-[var(--bg)] p-7 md:p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
                {p.step}
              </span>
              <h3 className="t-display mt-4 text-2xl text-[var(--fg)]">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)]">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Réalisations web */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
            Réalisations
          </p>
          <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
            Des sites et des apps en ligne.
          </h2>

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 md:mt-16 md:gap-x-8 md:gap-y-14 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <li key={p.name}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--bg-2)]">
                    <Image
                      src={p.img}
                      alt={`${p.name}, aperçu du site`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  </div>
                  <h3 className="t-display mt-5 text-2xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--fg-2)]">{p.kind}</p>
                  <span className="mt-3 inline-flex items-center gap-2 border-b border-[var(--fg)] pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                    {p.label}
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <Link
            href={`/${locale}/contact?subject=web`}
            className="group mt-14 inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1714]"
          >
            Démarrer un projet web
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
