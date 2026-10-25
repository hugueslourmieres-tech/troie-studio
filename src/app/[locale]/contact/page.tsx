import { setRequestLocale, getTranslations } from "next-intl/server";
import { ProjectForm } from "@/components/ProjectForm";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { pageSocial } from "@/lib/og";

const CAL_URL = "https://cal.com/troiestudio/30min";
const CAL_EMBED = "https://cal.com/troiestudio/30min?layout=month_view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  /* Métadonnées dédiées (25/10/2026) : la copie de la page reste dans le
     namespace contact, le titre de recherche dit l'action et la zone. */
  const en = locale === "en";
  const title = en ? "Contact and quote: book 30 minutes" : "Contact et devis : réserver 30 minutes";
  const description = en
    ? "Book 30 minutes with Hugues Lourmieres or describe your project: website, app, Shopify, SEO or Google Ads. You get a written proposal and a quote."
    : "Réservez 30 minutes avec Hugues Lourmieres ou décrivez votre projet : site, application, Shopify, SEO ou Google Ads. Proposition écrite et devis à la clé.";
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
  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <article className="mx-auto max-w-6xl px-6 pt-28 pb-24 md:px-10 md:pt-36 md:pb-32">
        {/* En-tête */}
        <header className="max-w-3xl">
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
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--ink)] text-white transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
                <p className="text-sm text-[var(--fg-2)]">{t("direct")}</p>
                <div className="mt-5 space-y-3">
                  <ObfuscatedEmail className="text-sm flex items-center gap-2 border-b border-[var(--rule-strong)] pb-0.5 text-[var(--fg-2)] transition hover:text-[var(--accent)] font-medium" />
                  <p className="text-sm text-[var(--fg-2)]">{t("location")}</p>
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
              className="text-sm group inline-flex shrink-0 items-center gap-3 rounded-full bg-[var(--ink)] px-7 py-4 text-white transition hover:bg-[#2a2e37] font-medium"
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


      </article>
    </div>
  );
}
