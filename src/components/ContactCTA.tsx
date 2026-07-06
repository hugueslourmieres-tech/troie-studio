import { useTranslations } from "next-intl";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";

const CAL_URL = "https://cal.com/troiestudio/30min";

/**
 * Section de contact en clôture de page : simple et directe, sur le fond
 * orange (hérité du wrapper tone-accent). Accroche, réservation d'un créneau
 * (cal.com), email, et la mascotte Troyie.
 */
export function ContactCTA(_props: { locale: string }) {
  const t = useTranslations("home");

  return (
    <section className="border-t border-[#1a1714]/15">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#1a1714]/55">
              Contact
            </p>
            <h2 className="t-display mt-6 text-4xl text-[#1a1714] md:text-6xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-[#1a1714]/75 md:text-lg">
              {t("ctaSubtitle")}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#f5f0e6] transition hover:bg-[#15120f]"
              >
                Réserver un créneau de 30 min
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </a>
              <ObfuscatedEmail className="border-b border-[#1a1714]/40 pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#1a1714]/75 transition hover:text-[#1a1714]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
