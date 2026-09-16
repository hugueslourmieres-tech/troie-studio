import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { GreekMark } from "@/components/GreekMark";

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
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { fr: "/fr/contact", en: "/en/contact" },
    },
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

/* La page etait monolingue : metadonnees traduites, corps francais en dur
   servi sur /en. Le corps lit desormais le namespace contact. */
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
          <GreekMark label="/ Contact" />
          <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/85 md:text-xl">
            {t("heroIntro")}
          </p>
        </header>

        {/* Formulaire + photo atelier + coordonnées */}
        <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-12">
          <ContactForm />

          <aside className="space-y-6 md:col-span-5">
            <div className="rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)] p-8">
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
            </div>
          </aside>
        </div>

        {/* Réserver un créneau, aperçu cal.com */}
        <section className="mt-20 md:mt-28">
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

          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)]">
            <iframe
              src={CAL_EMBED}
              title={t("calTitle")}
              loading="lazy"
              className="h-[640px] w-full md:h-[720px]"
            />
          </div>
        </section>

        {/* Le studio, Nice, map */}
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

          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)]">
            <iframe
              src={MAPS_EMBED}
              title={t("mapsTitle")}
              loading="lazy"
              className="h-[360px] w-full grayscale md:h-[420px]"
            />
          </div>
        </section>

        {/* Ce que l'on fait */}
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
