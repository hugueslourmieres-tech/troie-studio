import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";

const CAL_URL = "https://cal.com/hugueslourmieres";

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
  return <ContactView />;
}

function ContactView() {
  const t = useTranslations("contact");

  return (
    <div className="tone-taupe bg-[var(--bg)] text-[var(--fg)]">
      <article className="mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-36">
        <header>
          <p className="t-eyebrow">/ Contact</p>
          <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
            {t("pageTitle")}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/80 md:text-xl">
            {t("pageSubtitle")}
          </p>
        </header>

        {/* Rendez-vous : appel de 30 min (aperçu calendrier à rebrancher
            une fois le bon lien cal.com fourni) */}
        <section className="mt-16 overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)]">
          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-10">
            <div>
              <p className="t-eyebrow">{t("bookingEyebrow")}</p>
              <h2 className="t-display mt-4 text-3xl text-[var(--fg)] md:text-4xl">
                {t("bookingTitle")}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--fg-2)]">
                {t("bookingText")}
              </p>
            </div>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[var(--accent)] px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#1a1714] transition hover:bg-[#ff8c33]"
            >
              {t("bookingCta")}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </section>

        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <ContactForm />

          <aside className="md:col-span-5">
            <div className="rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)] p-8">
              <p className="t-eyebrow">{t("or")}</p>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--fg-2)] transition hover:text-[var(--accent)]"
              >
                <span className="border-b border-[var(--rule-strong)] pb-0.5">
                  {t("callDirect")}
                </span>
                →
              </a>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
