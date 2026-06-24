import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";

const CAL_URL = "https://cal.com/troiestudio/30min";
const EMAIL = "contact@troiestudio.fr";

const WHAT_WE_DO = [
  {
    n: "01",
    title: "Création",
    body: "Photo, vidéo, graphisme, web design, sites et applications.",
  },
  {
    n: "02",
    title: "Stratégie",
    body: "Marque, contenu et acquisition : SEO, SEA, GEO.",
  },
  {
    n: "03",
    title: "Intelligence artificielle",
    body: "Formation des équipes et déploiement d'agents sur mesure.",
  },
];

const TEAM = [
  { name: "Hugues Lourmieres", role: "Fondateur & CEO" },
  { name: "Vanessa Nobrega", role: "Consultante IA & Communication" },
  { name: "Thibaud Lourmieres", role: "Créateur de médias" },
];

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

        {/* Qui nous sommes */}
        <section className="mt-14 max-w-3xl border-t border-[var(--rule)] pt-10">
          <p className="t-eyebrow">Qui nous sommes</p>
          <p className="mt-5 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            TROIE est un atelier digital basé à Nice. Création, stratégie et
            intelligence artificielle réunies sous un même toit, pour les marques
            comme pour les particuliers. Dix ans auprès de marques exigeantes, en
            France et à l&apos;international.
          </p>
        </section>

        {/* Réserver un créneau */}
        <section className="mt-10 overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)]">
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
              Réserver un créneau
              <span aria-hidden="true" className="transition group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </section>

        <div className="mt-16 grid gap-12 md:grid-cols-12 lg:gap-16">
          {/* Formulaire */}
          <ContactForm />

          {/* Coordonnées + studio */}
          <aside className="space-y-6 md:col-span-5">
            {/* Studio / Nice */}
            <div className="rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)] p-8">
              <p className="t-eyebrow">Le studio</p>
              <p className="mt-5 font-mono text-[13px] uppercase leading-relaxed tracking-[0.14em] text-[var(--fg)]">
                Nice, Côte d&apos;Azur
                <br />
                <span className="text-[var(--fg-2)]/70">France</span>
              </p>
              <div className="mt-6 space-y-3 border-t border-[var(--rule)] pt-6">
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                >
                  <span className="border-b border-[var(--rule-strong)] pb-0.5">{EMAIL}</span>
                </a>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--fg-2)] transition hover:text-[var(--accent)]"
                >
                  <span className="border-b border-[var(--rule-strong)] pb-0.5">
                    {t("callDirect")}
                  </span>
                  →
                </a>
              </div>
            </div>

            {/* Ce que l'on fait */}
            <div className="rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)] p-8">
              <p className="t-eyebrow">Ce que l&apos;on fait</p>
              <ul className="mt-5 space-y-5">
                {WHAT_WE_DO.map((d) => (
                  <li key={d.n} className="flex gap-4">
                    <span className="font-mono text-[10px] tracking-[0.22em] text-[var(--accent)]">
                      {d.n}
                    </span>
                    <div>
                      <p className="t-display text-lg text-[var(--fg)]">{d.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--fg-2)]">
                        {d.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* L'équipe */}
            <div className="rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)] p-8">
              <p className="t-eyebrow">L&apos;équipe</p>
              <ul className="mt-5 space-y-4">
                {TEAM.map((m) => (
                  <li key={m.name} className="flex items-baseline justify-between gap-4">
                    <span className="text-[var(--fg)]">{m.name}</span>
                    <span className="text-right font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-2)]/70">
                      {m.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
