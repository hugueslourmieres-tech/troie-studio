import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { ScanInline } from "@/components/ScanInline";
import { ScoreGauge } from "@/components/audit/ScoreGauge";

/**
 * Section de contact en clôture de page (21/10/2026) : titre, une phrase,
 * décrire son projet (bouton blanc, action principale), le score GEO
 * en une ligne (ScanInline), puis l'email masqué. Plus de prise de
 * rendez-vous depuis le 26/10/2026.
 *
 * Partagé par l'accueil, /strategie, /creation, /creation/web,
 * /diagnostic-ia, /scan-ia et /accompagnement.
 */
export function ContactCTA(_props: { locale: string }) {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="px-3 py-3 md:px-5 md:py-5">
      {/* Esprit ElevenLabs : grand bloc arrondi sur un visuel filé avec grain. */}
      <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[28px] px-5 py-24 md:px-12 md:py-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/art/dusk.jpg" alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div data-reveal className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="t-display text-4xl text-white md:text-6xl">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            {t("ctaSubtitle")}
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href={`/${locale}/contact#projet`}
              className="inline-flex h-12 items-center rounded-full bg-white px-6 text-[15px] font-medium text-[#111318] transition-transform duration-200 active:scale-[0.98]"
            >
              {t("ctaProject")}
            </Link>
          </div>
          {/* 26/10/2026 : le score GEO proposé partout, à la place du bouton « Audit gratuit ». */}
          {/* Le cadran en suspens, comme dans le bloc « Vérifiez votre visibilité ». */}
          <div aria-hidden="true" className="mx-auto mt-12 w-[200px] md:w-[220px]">
            <ScoreGauge
              state="idle"
              score={0}
              band="bon"
              tone="dark"
              idleMode="suspense"
              suspenseFrom={47}
              gradeLabel=""
              idleLabel={locale === "en" ? "Your score" : "Votre score"}
              scanningLabel=""
              delay={0.2}
            />
          </div>
          <ScanInline locale={locale} tone="dark" className="mx-auto mt-6 max-w-md text-left" />
          <ObfuscatedEmail className="mt-8 inline-block text-sm text-white/80 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white" />
        </div>
      </div>
    </section>
  );
}
