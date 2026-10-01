import { setRequestLocale, getTranslations } from "next-intl/server";
import { ProjectForm } from "@/components/ProjectForm";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { pageSocial } from "@/lib/og";

const CAL_URL = "https://cal.com/troiestudio/30min";
const CAL_EMBED = "https://cal.com/troiestudio/30min?layout=month_view";
const MAPS_LINK = "https://www.google.com/maps/place/Nice,+France";
const MAPS_EMBED =
  "https://maps.google.com/maps?q=Nice%2C%20Côte%20d'Azur%2C%20France&z=12&output=embed";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const title = t("pageTitle");
  const description = t("pageSubtitle");
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

/* Page contact (1er/10/2026) : deux façons de commencer, réserver 30 min
   ou lancer un projet. Le formulaire de projet (ProjectForm) remplace
   l'ancien formulaire de contact, dont le fichier reste dans le dépôt.
   Toute la copie vient du namespace contact. */
async function ContactView({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const WHAT_WE_DO = [
    { n: "01", title: t("what1Title"), body: t("what1Body") },
    { n: "02", title: t("what2Title"), body: t("what2Body") },
    { n: "03", title: t("what3Title"), body: t("what3Body") },
  ];
  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <article className="mx-auto max-w-6xl px-6 pt-28 pb-24 md:px-10 md:pt-36 md:pb-32">
        {/* En-tête */}
        <header className="max-w-3xl">
          <p className="t-eyebrow">Contact</p>
          <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/85 md:text-xl">
            {t("heroIntro")}
          </p>
        </header>

        {/* Deux façons de commencer : l'appel d'abord, le formulaire ensuite. */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex min-w-0 items-start justify-between gap-6 rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)] p-6 transition hover:border-[var(--accent)]"
          >
            <span className="block min-w-0 [overflow-wrap:anywhere]">
              <span className="t-display block text-2xl text-[var(--fg)] md:text-3xl">
                {t("chooseBookTitle")}
              </span>
              <span className="mt-2 block text-base leading-relaxed text-[var(--fg-2)]">
                {t("chooseBookText")}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[#1a1714] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
          <a
            href="#projet"
            className="group flex min-w-0 items-start justify-between gap-6 rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)] p-6 transition hover:border-[var(--accent)]"
          >
            <span className="block min-w-0 [overflow-wrap:anywhere]">
              <span className="t-display block text-2xl text-[var(--fg)] md:text-3xl">
                {t("chooseProjectTitle")}
              </span>
              <span className="mt-2 block text-base leading-relaxed text-[var(--fg-2)]">
                {t("chooseProjectText")}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--fg)] text-[var(--fg)] transition group-hover:translate-y-0.5 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]"
            >
              ↓
            </span>
          </a>
        </div>

        {/* Votre projet : formulaire de brief court + coordonnées directes */}
        <section id="projet" className="mt-20 scroll-mt-24 md:mt-28">
          <div className="max-w-2xl">
            <p className="t-eyebrow">{t("projectEyebrow")}</p>
            <h2 className="t-display mt-4 text-3xl text-[var(--fg)] md:text-5xl">
              {t("projectTitle")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              {t("projectIntro")}
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-12">
            <ProjectForm locale={locale} className="md:col-span-7" />

            <aside className="space-y-6 md:col-span-5">
              <div className="rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)] p-6 sm:p-8">
                <p className="t-eyebrow">{t("direct")}</p>
                <div className="mt-5 space-y-3">
                  <ObfuscatedEmail className="flex items-center gap-2 border-b border-[var(--rule-strong)] pb-0.5 font-mono text-xs uppercase tracking-[0.16em] text-[var(--fg-2)] transition hover:text-[var(--accent)]" />
                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                  >
                    <span className="border-b border-[var(--rule-strong)] pb-0.5">{t("location")}</span>
                    →
                  </a>
                </div>
                <p className="mt-5 text-sm text-[var(--fg-2)]">{t("directNote")}</p>
              </div>
            </aside>
          </div>
        </section>

        {/* Réserver un créneau. Sur mobile, le bouton suffit : le calendrier
            intégré (640 px de haut) n'apparaît qu'à partir de md. */}
        <section id="rdv" className="mt-20 scroll-mt-24 md:mt-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="t-eyebrow">{t("bookingEyebrow")}</p>
              <h2 className="t-display mt-4 text-3xl text-[var(--fg)] md:text-5xl">
                {t("bookingTitle")}.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                {t("bookingIntro")}
              </p>
            </div>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[var(--accent)] px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#1a1714] transition hover:bg-[#ff8c33]"
            >
              {t("bookingOpen")}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="mt-8 hidden overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)] md:block">
            <iframe
              src={CAL_EMBED}
              title={t("calTitle")}
              loading="lazy"
              className="h-[640px] w-full md:h-[720px]"
            />
          </div>
        </section>

        {/* Le studio, Nice. La carte n'apparaît qu'à partir de md. */}
        <section className="mt-20 md:mt-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="t-eyebrow">{t("studioEyebrow")}</p>
              <h2 className="t-display mt-4 text-3xl text-[var(--fg)] md:text-5xl">
                {t("studioTitle")}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                {t("studioText")}
              </p>
            </div>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex shrink-0 items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t("mapsCta")}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="mt-8 hidden overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)] md:block">
            <iframe
              src={MAPS_EMBED}
              title={t("mapsTitle")}
              loading="lazy"
              className="h-[360px] w-full grayscale md:h-[420px]"
            />
          </div>
        </section>

        {/* Ce que nous faisons : Stratégie, Création, Accompagnement */}
        <section className="mt-20 border-t border-[var(--rule)] pt-14 md:mt-28 md:pt-16">
          <p className="t-eyebrow">{t("whatEyebrow")}</p>
          <ul className="mt-8 grid gap-8 sm:grid-cols-3 md:gap-12">
            {WHAT_WE_DO.map((d) => (
              <li key={d.n}>
                <span className="font-mono text-[10px] tracking-[0.22em] text-[var(--accent)]">
                  {d.n}
                </span>
                <h3 className="t-display mt-3 text-2xl text-[var(--fg)]">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]">{d.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
