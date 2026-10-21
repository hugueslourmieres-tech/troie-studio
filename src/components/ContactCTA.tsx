import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { GreekMark } from "@/components/GreekMark";

const CAL_URL = "https://cal.com/troiestudio/30min";

/**
 * Section de contact en clôture de page : simple et directe, sur le fond
 * orange (hérité du wrapper tone-accent). Accroche, réservation d'un créneau
 * (cal.com, bouton plein noir), lancement d'un projet (bouton contour vers le
 * formulaire de /contact), puis l'email masqué.
 *
 * Partagé par l'accueil, /strategie, /creation, /creation/web,
 * /diagnostic-ia, /scan-ia et /accompagnement.
 */
export function ContactCTA(_props: { locale: string }) {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="border-t border-[#111318]/15">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div>
            <GreekMark
              label="Contact"
              className="justify-center"
              labelClassName="font-mono text-[11px] uppercase tracking-[0.32em] text-[#111318]/55"
            />
            <h2 className="t-display mt-6 text-4xl text-[#111318] md:text-6xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-[#111318]/75 md:text-lg">
              {t("ctaSubtitle")}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#fcfcfd] transition hover:bg-[#15120f]"
              >
                {t("ctaBook")}
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </a>
              <Link
                href={`/${locale}/contact#projet`}
                className="group inline-flex items-center gap-3 rounded-full border border-[#111318] px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#111318] transition hover:bg-[var(--ink)] hover:text-[#fcfcfd]"
              >
                {t("ctaProject")}
              </Link>
              <ObfuscatedEmail className="border-b border-[#111318]/40 pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#111318]/75 transition hover:text-[#111318]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
