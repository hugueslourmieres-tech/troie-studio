import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("pageTitle"),
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

      <div className="mt-16 grid gap-16 md:grid-cols-12">
        <ContactForm />

        <aside className="md:col-span-5">
          <div className="rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)] p-8">
            <p className="t-eyebrow">{t("or")}</p>
            <a
              href="https://cal.com/hugueslourmieres"
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
  );
}
