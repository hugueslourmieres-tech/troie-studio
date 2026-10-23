import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { SpectrumBackdrop } from "./SpectrumBackdrop";

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
    <section>
      <SpectrumBackdrop scrim>
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-12 md:py-32">
        <div data-reveal className="mx-auto max-w-3xl text-center">
          <h2 className="t-display text-4xl text-white md:text-6xl">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            {t("ctaSubtitle")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center rounded-full bg-white px-6 text-[15px] font-medium text-[#111318] transition-[background-color,transform] duration-200 hover:bg-white/90 active:scale-[0.98]"
            >
              {t("ctaBook")}
            </a>
            <Link
              href={`/${locale}/contact#projet`}
              className="inline-flex h-12 items-center rounded-full border border-white/60 px-6 text-[15px] font-medium text-white transition-colors duration-200 hover:border-white"
            >
              {t("ctaProject")}
            </Link>
          </div>
          <ObfuscatedEmail className="mt-8 inline-block text-sm text-white/85 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white" />
        </div>
      </div>
      </SpectrumBackdrop>
    </section>
  );
}
