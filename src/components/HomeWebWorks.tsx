import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PROJECTS, ProjectCard } from "./WebProjects";

/**
 * Accueil : les réalisations web, juste sous les services (21/10/2026).
 * Les deux jeux en pleine largeur, puis deux sites. Tout est en ligne.
 */
export async function HomeWebWorks({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home" });
  const shown = PROJECTS.slice(0, 4);

  return (
    <section id="realisations" className="scroll-mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <h2 className="t-display max-w-[18ch] text-balance text-4xl text-[var(--fg)] md:text-6xl">
          {t("webTitle")}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
          {t("webIntro")}
        </p>

        <ul className="mt-14 grid gap-x-10 gap-y-20 lg:grid-cols-2">
          {shown.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </ul>

        <Link
          href={`/${locale}/creation/web`}
          className="group mt-16 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]"
        >
          {t("webCta")}
          <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
