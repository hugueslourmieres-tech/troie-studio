import { setRequestLocale, getTranslations } from "next-intl/server";
import { ProjectForm } from "@/components/ProjectForm";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { pageSocial } from "@/lib/og";

const LINKEDIN_URL = "https://www.linkedin.com/company/troiestudio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  /* Métadonnées dédiées : la copie de la page reste dans le namespace
     contact, le titre de recherche dit l'action. */
  const en = locale === "en";
  const title = en ? "Contact and quote: describe your project" : "Contact et devis : décrire votre projet";
  const description = en
    ? "Describe your project to TROIE Studio, or write to us directly: website, online store, app, SEO or Google Ads. You get a written proposal and a quote."
    : "Décrivez votre projet à TROIE Studio ou écrivez-nous directement : site, boutique en ligne, application, SEO ou Google Ads. Proposition écrite et devis à la clé.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { fr: "/fr/contact", en: "/en/contact" },
    },
    ...pageSocial({ locale, path: "/contact", title, description }),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactView locale={locale} />;
}

/* Page contact (26/10/2026) : plus de prise de rendez-vous. Deux façons de
   nous joindre, annoncées en tête puis développées :
   1. « Décrire mon projet » (#projet) : le formulaire de projet,
   2. « Nous écrire directement » (#ecrire) : l'email masqué aux robots
      (ObfuscatedEmail) et la page LinkedIn de l'agence.
   Toute la copie vient du namespace contact. */
async function ContactView({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const steps = [t("next1"), t("next2"), t("next3")];
  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <article className="mx-auto max-w-6xl px-5 pt-28 pb-24 md:px-10 md:pt-36 md:pb-32">
        <header className="max-w-3xl">
          <h1 className="t-display text-5xl text-[var(--fg)] md:text-7xl">{t("heroTitle")}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)] md:text-xl">
            {t("heroIntro")}
          </p>
        </header>

        {/* Les deux options, en un coup d'œil. */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <ChoiceCard
            href="#projet"
            title={t("chooseProjectTitle")}
            text={t("chooseProjectText")}
            primary
          />
          <ChoiceCard href="#ecrire" title={t("chooseWriteTitle")} text={t("chooseWriteText")} />
        </div>

        {/* 1. Décrire mon projet */}
        <section id="projet" className="mt-20 scroll-mt-28 md:mt-28">
          <div className="max-w-2xl">
            <h2 className="t-display text-3xl text-[var(--fg)] md:text-5xl">{t("projectTitle")}</h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              {t("projectIntro")}
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-12">
            <ProjectForm locale={locale} className="md:col-span-7" />

            <aside className="md:col-span-5">
              <div className="rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)] p-6 sm:p-8 md:sticky md:top-28">
                <p className="text-xl font-medium tracking-[-0.02em] text-[var(--fg)]">{t("nextTitle")}</p>
                <ol className="mt-6 space-y-5">
                  {steps.map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--ink)] text-[13px] font-medium tabular-nums text-white">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 text-[15px] leading-relaxed text-[var(--fg-2)]">{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 border-t border-[var(--rule)] pt-5 text-sm text-[var(--fg-2)]">{t("location")}</p>
              </div>
            </aside>
          </div>
        </section>

        {/* 2. Nous écrire directement */}
        <section id="ecrire" className="mt-20 scroll-mt-28 md:mt-28">
          <div className="grain relative overflow-hidden rounded-[28px] px-6 py-14 sm:px-10 md:px-14 md:py-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/art/dusk.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="relative z-10 grid gap-10 md:grid-cols-12 md:items-end md:gap-12">
              <div className="md:col-span-5">
                <h2 className="t-display text-3xl text-white md:text-5xl">{t("writeTitle")}</h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
                  {t("writeIntro")}
                </p>
              </div>

              <div className="grid gap-3 md:col-span-7 sm:grid-cols-2">
                <div className="flex min-w-0 flex-col justify-between gap-6 rounded-2xl bg-white p-6">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-medium text-[var(--fg-2)]">
                      <MailIcon />
                      {t("writeEmailLabel")}
                    </p>
                    <ObfuscatedEmail className="mt-3 block text-lg font-medium tracking-[-0.01em] text-[var(--fg)] underline decoration-[var(--rule-strong)] underline-offset-4 transition-colors [overflow-wrap:anywhere] hover:text-[var(--accent)] hover:decoration-[var(--accent)]" />
                  </div>
                  <p className="text-[13px] leading-relaxed text-[var(--fg-2)]">{t("writeEmailHint")}</p>
                </div>

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-w-0 flex-col justify-between gap-6 rounded-2xl bg-white p-6 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div>
                    <p className="flex items-center gap-2 text-sm font-medium text-[var(--fg-2)]">
                      <LinkedInIcon />
                      {t("writeLinkedinLabel")}
                    </p>
                    <p className="mt-3 flex items-center gap-2 text-lg font-medium tracking-[-0.01em] text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                      {t("writeLinkedinCta")}
                      <ArrowIcon className="h-3.5 w-3.5 -rotate-45 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </p>
                  </div>
                  <p className="text-[13px] leading-relaxed text-[var(--fg-2)]">{t("writeLinkedinHint")}</p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}

function ChoiceCard({
  href,
  title,
  text,
  primary = false,
}: {
  href: string;
  title: string;
  text: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      className="group flex min-w-0 items-start justify-between gap-6 rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)] p-6 transition-colors duration-200 hover:border-[var(--accent)] md:p-7"
    >
      <span className="block min-w-0 [overflow-wrap:anywhere]">
        <span className="t-display block text-2xl text-[var(--fg)] md:text-3xl">{title}</span>
        <span className="mt-2 block text-base leading-relaxed text-[var(--fg-2)]">{text}</span>
      </span>
      <span
        aria-hidden="true"
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-y-0.5 ${
          primary
            ? "bg-[var(--ink)] text-white"
            : "border border-[var(--fg)] text-[var(--fg)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]"
        }`}
      >
        <ArrowIcon className="h-4 w-4 rotate-90" />
      </span>
    </a>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
    >
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="m3.5 6 6.5 5 6.5-5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z" />
    </svg>
  );
}
