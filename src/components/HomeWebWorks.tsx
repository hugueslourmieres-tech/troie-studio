import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { HOME_PROJECTS, PROJECTS } from "./WebProjects";
import { WebSlider } from "./WebSlider";

/**
 * Accueil : le design de nos sites, en slider (21/10/2026). Cinq sites,
 * tous en ligne : LOIR Paris, Color Guesser, Bien en règle, Rutherford, Bilber.
 */
export async function HomeWebWorks({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home" });
  const shown = HOME_PROJECTS.map((n) => PROJECTS.find((p) => p.name === n)).filter((p) => !!p);

  return (
    <section id="realisations" className="scroll-mt-24 overflow-hidden border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="t-display max-w-[18ch] text-balance text-4xl text-[var(--fg)] md:text-6xl">
              {t("webTitle")}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              {t("webIntro")}
            </p>
          </div>
          <Link
            href={`/${locale}/creation/web`}
            className="inline-flex items-center text-sm font-medium text-[var(--accent)] hover:underline underline-offset-4"
          >
            {t("webCta")}
          </Link>
        </div>

        <div className="mt-14">
          <WebSlider projects={shown} en={locale === "en"} />
        </div>
      </div>
    </section>
  );
}
