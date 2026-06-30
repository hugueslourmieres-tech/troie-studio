import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ContactCTA } from "@/components/ContactCTA";

const PROJECTS: Project[] = [
  {
    name: "LOIR Paris",
    kind: "E-commerce · mode",
    href: "https://loirparis.fr",
    url: "loirparis.fr",
    label: "loirparis.fr",
    desktop: "/images/creation/web/loirparis-desktop.jpg",
    mobile: "/images/creation/web/loirparis-mobile.jpg",
  },
  {
    name: "Rutherford",
    kind: "Site web & plateforme SaaS",
    href: "https://rutherford.fr",
    url: "rutherford.fr",
    label: "rutherford.fr",
    desktop: "/images/creation/web/rutherford-desktop.jpg",
    mobile: "/images/creation/web/rutherford-mobile.jpg",
  },
  {
    name: "PerPost",
    kind: "Site web & application",
    href: "https://perpost-web.vercel.app",
    url: "perpost-web.vercel.app",
    label: "perpost-web.vercel.app",
    desktop: "/images/creation/web/perpost-desktop.jpg",
    mobile: "/images/creation/web/perpost-mobile.jpg",
  },
  {
    name: "Color Guesser",
    kind: "Web app · jeu",
    href: "https://playcolorguesser.com",
    url: "playcolorguesser.com",
    label: "playcolorguesser.com",
    desktop: "/images/creation/web/colorguesser-desktop.jpg",
    mobile: "/images/creation/web/colorguesser-mobile.jpg",
  },
];

const EXAMPLES: Project[] = [
  {
    name: "Cabinet d'avocats",
    kind: "Exemple · site vitrine juridique",
    href: "/demo/avocat",
    url: "vasseur-associes.fr",
    label: "Voir l'exemple",
    desktop: "/images/creation/web/avocat-desktop.jpg",
    mobile: "/images/creation/web/avocat-mobile.jpg",
  },
  {
    name: "Hôtel & rooftop",
    kind: "Exemple · site vitrine hôtellerie",
    href: "/demo/maison-lumiere",
    url: "maison-lumiere.fr",
    label: "Voir l'exemple",
    desktop: "/images/creation/web/maison-desktop.jpg",
    mobile: "/images/creation/web/maison-mobile.jpg",
  },
];

type Project = {
  name: string;
  kind: string;
  href: string;
  url: string;
  label: string;
  desktop: string;
  mobile: string;
};

/** Carte projet : fenêtre navigateur desktop + fenêtre mobile en superposition. */
function ProjectCard({ p }: { p: Project }) {
  return (
    <li>
      <a href={p.href} target="_blank" rel="noreferrer" className="group block">
        {/* Desktop : fenêtre navigateur (le téléphone se superpose dessus) */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--bg-2)] shadow-[0_30px_70px_-34px_rgba(26,23,20,0.42)] transition-transform duration-500 group-hover:-translate-y-1">
            <div className="flex items-center gap-1.5 border-b border-[var(--rule)] bg-[var(--bg)] px-4 py-2.5">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="mx-auto flex h-5 w-1/2 max-w-[210px] items-center justify-center rounded-full bg-[var(--bg-2)] font-mono text-[9px] tracking-[0.08em] text-[var(--fg-2)]/55">
                {p.url}
              </span>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
              <Image
                src={p.desktop}
                alt={`${p.name}, aperçu desktop`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Mobile : la page mobile en superposition (sans cadre), centrée */}
          <div className="absolute -bottom-9 right-6 w-[32%] min-w-[120px] max-w-[178px] sm:right-10 transition-transform duration-500 group-hover:-translate-y-1">
            <div className="overflow-hidden rounded-[1.4rem] bg-white shadow-[0_28px_62px_-18px_rgba(26,23,20,0.5)] ring-1 ring-[#1a1714]/10">
              <div className="bg-[#f3f3f5] px-2 pb-1.5 pt-2">
                <div className="mx-auto flex max-w-[140px] items-center justify-center gap-1 rounded-md bg-white px-2.5 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                  <span aria-hidden="true" className="text-[7px] leading-none text-[#9a9183]">🔒</span>
                  <span className="truncate text-[7px] font-medium tracking-tight text-[#6a6356]">{p.url}</span>
                </div>
              </div>
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-white">
                <Image
                  src={p.mobile}
                  alt={`${p.name}, aperçu mobile`}
                  fill
                  sizes="178px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>

        <h3 className="t-display mt-16 text-2xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
          {p.name}
        </h3>
        <p className="mt-1 text-sm text-[var(--fg-2)]">{p.kind}</p>
        <span className="mt-3 inline-flex items-center gap-2 border-b border-[var(--fg)] pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
          {p.label}
          <span aria-hidden="true" className="transition group-hover:translate-x-1">↗</span>
        </span>
      </a>
    </li>
  );
}

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
      "Sites, web apps et e-commerce sur mesure : notre processus et nos réalisations (LOIR Paris, Rutherford, PerPost).",
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

          <ul className="mt-12 grid gap-x-10 gap-y-16 md:mt-16 lg:grid-cols-2">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </ul>

          {/* Exemples par secteur */}
          <p className="mt-24 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)] md:mt-32">
            Exemples par secteur
          </p>
          <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
            Des maquettes prêtes pour votre métier.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/80">
            Un aperçu de ce que nous concevons par secteur. Exemples de
            démonstration, à décliner à votre marque.
          </p>
          <ul className="mt-12 grid gap-x-10 gap-y-16 md:mt-16 lg:grid-cols-2">
            {EXAMPLES.map((p) => (
              <ProjectCard key={p.name} p={p} />
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
