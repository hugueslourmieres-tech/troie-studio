import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { LiquidLight } from "./LiquidLight";

const CAL_URL = "https://cal.com/troiestudio/30min";

/**
 * Section de contact en clôture de page (21/10/2026) : titre, une phrase,
 * réserver 30 min (bouton noir, action principale), décrire son projet
 * (bouton contour), puis l'email masqué.
 *
 * Partagé par l'accueil, /strategie, /creation, /creation/web,
 * /diagnostic-ia, /scan-ia et /accompagnement.
 */
export function ContactCTA(_props: { locale: string }) {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="tone-dark relative isolate overflow-hidden bg-black text-[var(--fg)]">
      {/* DA « Liquide » : lumière liquide sur fond noir, comme le héros. */}
      <LiquidLight id="cta" className="-z-10 opacity-80" />
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-12 md:py-32">
        <div data-reveal className="mx-auto max-w-3xl text-center">
          <h2 className="t-display text-4xl text-[var(--fg)] md:text-6xl">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            {t("ctaSubtitle")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="gloss-btn-light inline-flex h-12 items-center rounded-full px-6 text-[15px] font-medium"
            >
              {t("ctaBook")}
            </a>
            <Link
              href={`/${locale}/contact#projet`}
              className="inline-flex h-12 items-center rounded-full border border-[var(--rule-strong)] px-6 text-[15px] font-medium text-[var(--fg)] transition-colors duration-200 hover:border-[var(--fg)]"
            >
              {t("ctaProject")}
            </Link>
          </div>
          <ObfuscatedEmail className="mt-8 inline-block text-sm text-[var(--fg-2)] underline decoration-[var(--rule-strong)] underline-offset-4 transition-colors hover:text-[var(--fg)]" />
        </div>
      </div>
    </section>
  );
}
