import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ContactCTA } from "@/components/ContactCTA";
import { PROJECTS, ProjectCard } from "@/components/WebProjects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return {
    title: "Création de sites web et d'applications",
    description:
      "Sites, web apps, jeux et e-commerce sur mesure : nos réalisations en ligne (Color Guesser, Bilber, Rutherford, LOIR Paris).",
    /* Page rédigée en français seulement : /en/creation/web en est une copie,
       la canonique pointe vers /fr et aucun hreflang anglais n'est annoncé. */
    alternates: { canonical: "/fr/creation/web" },
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
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-4 md:px-12 md:pt-40 md:pb-6">
        <p className="t-eyebrow">Création, Web</p>
        <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
          Web.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/85 md:text-xl">
          Sites, web apps, jeux et e-commerce sur mesure. Des produits digitaux pensés
          pour la marque comme pour la conversion, du cadrage à la mise en ligne.
        </p>

      </section>

      {/* Réalisations web : visibles dès l'arrivée */}
      <section>
        <div className="mx-auto max-w-7xl px-6 pt-8 pb-20 md:px-12 md:pb-28">
          <h2 className="sr-only">Nos réalisations web</h2>
          <ul className="grid gap-x-10 gap-y-20 lg:grid-cols-2">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </ul>

          <Link
            href={`/${locale}/contact?subject=web`}
            className="group mt-14 inline-flex items-center gap-3 bg-[var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1714]"
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
