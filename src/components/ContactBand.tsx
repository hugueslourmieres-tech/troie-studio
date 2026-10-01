import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const CAL_URL = "https://cal.com/troiestudio/30min";

/**
 * Point de contact intermédiaire, juste après l'exemple Autajon, pour que le
 * visiteur convaincu n'ait pas à traverser les réalisations. Sans h2,
 * volontairement.
 *
 * Volontairement PLUS LÉGÈRE que ContactCTA : WriteOnScroll anime tous les
 * h2 de la page, et deux sections de contact portant le même titre auraient
 * dilué le signal comme le rendu. Sur fond orange (wrapper tone-accent dans
 * la page), donc bouton plein noir, puis bouton contour. Texte et boutons
 * passent sur une ligne à partir de lg : à 768 px, deux boutons à côté du
 * texte l'écrasaient sur 190 px.
 */
export function ContactBand() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="border-t border-[#1a1714]/15">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-14 text-center md:px-12 md:py-16 lg:flex-row lg:justify-between lg:text-left">
        <p className="max-w-xl text-base leading-relaxed text-[#1a1714]/80 md:text-lg">
          {t("bandText")}
        </p>
        <div className="flex w-full flex-none flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex flex-none items-center justify-center gap-3 rounded-full bg-[var(--ink)] px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#f5f0e6] transition hover:bg-[#15120f]"
          >
            {t("bandCta")}
            <span aria-hidden="true" className="transition group-hover:translate-x-1">
              →
            </span>
          </a>
          <Link
            href={`/${locale}/contact#projet`}
            className="inline-flex items-center justify-center gap-3 rounded-full border border-[var(--ink)] px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#1a1714] transition hover:bg-[var(--ink)] hover:text-[#f5f0e6]"
          >
            {t("bandProject")}
          </Link>
        </div>
      </div>
    </section>
  );
}
