import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { GreekMark } from "@/components/GreekMark";
import { ScanIa } from "@/components/ScanIa";
import { metaDescription } from "@/lib/seo";
import { pageSocial } from "@/lib/og";

const CAL_URL = "https://cal.com/troiestudio/30min";

/**
 * Page « Scan IA » : le produit d'appel de l'offre visibilité IA.
 *
 * Contexte marché (audit du 17/08/2026) : Google a activé AI Overviews en
 * France le 22 juillet 2026. Quand un résumé IA s'affiche, le CTR organique
 * chute de 61 % sur les requêtes informationnelles (Seer Interactive,
 * 3 119 requêtes). Le scan gratuit montre au dirigeant si son site est
 * lisible par les moteurs IA, et l'audit-fix (sur devis depuis le
 * 1er/10/2026) corrige ce qui ne l'est pas.
 *
 * Même cadre éditorial que /diagnostic-ia : on vend du conseil, jamais de
 * la « formation », et on ne promet JAMAIS une citation par une IA (personne
 * ne peut la garantir), seulement des livrables vérifiables.
 */

const COPY = {
  fr: {
    eyebrow: "Scan IA gratuit",
    title: "ChatGPT parle-t-il de votre entreprise ?",
    intro:
      "Depuis le 22 juillet 2026, Google affiche ses résumés IA en France. Vos clients posent aussi leurs questions à ChatGPT. Ce scan vérifie en 60 secondes si votre site est lisible par Google et par ces moteurs. Deux notes, SEO et GEO, gratuitement et sans inscription.",
    how: "Le scan lit votre site comme le ferait un robot de moteur IA : accès autorisés, contenu réellement servi, données structurées, signaux de citabilité. Cinq familles de vérifications, deux notes sur 100 (SEO pour Google, GEO pour les moteurs IA), les corrections prioritaires, et le détail complet.",
    diagLink: "Voir aussi le diagnostic IA complet",
    rentreeLink: "La stratégie et l'acquisition",
    humanLink: "Parler à quelqu'un de l'équipe",
  },
  en: {
    eyebrow: "Free AI scan",
    title: "Does ChatGPT know your company exists?",
    intro:
      "Since 22 July 2026, Google shows AI Overviews in France. Your customers also ask ChatGPT directly. This scan checks in 60 seconds whether your site is readable by Google and by these engines. Two scores, SEO and GEO, free and with no sign-up.",
    how: "The scan reads your site the way an AI engine's crawler would: allowed access, content actually served, structured data, citability signals. Five families of checks, two scores out of 100 (SEO for Google, GEO for AI engines), the priority fixes, and the full detail.",
    diagLink: "See also the full AI assessment",
    rentreeLink: "Strategy and acquisition",
    humanLink: "Talk to someone on the team",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = COPY[locale === "en" ? "en" : "fr"];
  const description = metaDescription(c.intro);
  // Partage social : même titre que l'onglet (pageSocial ajoute
  // « , TROIE Studio », qui donnerait « entreprise ?, TROIE Studio »), et
  // l'intro complète, que la coupe de la meta description ampute du scan.
  const social = pageSocial({ locale, path: "/scan-ia", title: c.title, description: c.intro });
  const shareTitle = `${c.title} | TROIE Studio`;
  return {
    // Le titre garde son point d'interrogation : le gabarit « , TROIE Studio »
    // laissait « entreprise , TROIE Studio » une fois le « ? » retiré.
    title: { absolute: shareTitle },
    description,
    alternates: {
      canonical: `/${locale}/scan-ia`,
      languages: { fr: "/fr/scan-ia", en: "/en/scan-ia" },
    },
    openGraph: { ...social.openGraph, title: shareTitle },
    twitter: { ...social.twitter, title: shareTitle },
  };
}

export default async function ScanIaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <div aria-hidden="true" className="h-16 md:h-20" />

      {/* L'espaceur ci-dessus compense l'en-tête fixe. Le bandeau AI Act a
          été retiré le 1er/10/2026 : la marge du haut se resserre d'autant. */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-24 md:px-12 md:pt-20 md:pb-32">
        <div className="max-w-3xl">
          <GreekMark
            label={c.eyebrow}
            labelClassName="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--fg-2)]/60"
          />
          <h1 className="t-display mt-6 text-4xl leading-[1.05] md:text-6xl">
            {c.title}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            {c.intro}
          </p>
        </div>

        <div className="mt-12">
          <ScanIa locale={locale} />
        </div>

        <p className="mt-16 max-w-2xl text-[15px] leading-relaxed text-[var(--fg-2)]/85">
          {c.how}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-8">
          <Link
            href={`/${locale}/strategie#acquisition`}
            className="inline-flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-2)]/70 underline-offset-4 hover:underline"
          >
            {c.rentreeLink}
          </Link>
          <Link
            href={`/${locale}/diagnostic-ia`}
            className="inline-flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-2)]/70 underline-offset-4 hover:underline"
          >
            {c.diagLink}
          </Link>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-2)]/70 underline-offset-4 hover:underline"
          >
            {c.humanLink}
          </a>
        </div>
      </section>

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
