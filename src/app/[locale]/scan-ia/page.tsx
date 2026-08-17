import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { GreekMark } from "@/components/GreekMark";
import { ScanIa } from "@/components/ScanIa";

/**
 * Page « Scan IA » : le produit d'appel de l'offre visibilité IA.
 *
 * Contexte marché (audit du 17/08/2026) : Google a activé AI Overviews en
 * France le 22 juillet 2026 ; quand un résumé IA s'affiche, le CTR organique
 * chute de 61 % sur les requêtes informationnelles (Seer Interactive,
 * 3 119 requêtes). Le scan gratuit montre au dirigeant si son site est
 * lisible par les moteurs IA, et l'audit-fix à 890 € corrige ce qui ne
 * l'est pas.
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
      "Depuis le 22 juillet 2026, Google affiche ses résumés IA en France, et vos clients posent leurs questions à ChatGPT. Quand un résumé IA s'affiche, les clics vers les sites chutent de moitié. La question n'est plus d'être bien classé : c'est d'être lisible, et cité, par les moteurs IA. Ce scan vous dit en 60 secondes où vous en êtes, gratuitement, sans inscription.",
    how: "Le scan lit votre site comme le ferait un robot de moteur IA : accès autorisés, contenu réellement servi, données structurées, signaux de citabilité. Cinq familles de vérifications, un score sur 100, et le détail de ce qui bloque.",
    diagLink: "Voir aussi le diagnostic IA complet",
  },
  en: {
    eyebrow: "Free AI scan",
    title: "Does ChatGPT know your company exists?",
    intro:
      "Since 22 July 2026, Google shows AI Overviews in France, and your customers ask ChatGPT directly. When an AI summary appears, clicks to websites drop by half. The question is no longer ranking well: it is being readable, and citable, by AI engines. This scan tells you where you stand in 60 seconds, free, no sign-up.",
    how: "The scan reads your site the way an AI engine's crawler would: allowed access, content actually served, structured data, citability signals. Five families of checks, a score out of 100, and the detail of what blocks you.",
    diagLink: "See also the full AI assessment",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = COPY[locale === "en" ? "en" : "fr"];
  return {
    title: c.title.replace(/\?$/, ""),
    description: c.intro,
    alternates: {
      canonical: `/${locale}/scan-ia`,
      languages: { fr: "/fr/scan-ia", en: "/en/scan-ia" },
    },
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

      <section className="mx-auto max-w-7xl px-6 pt-24 pb-24 md:px-12 md:pt-32 md:pb-32">
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
        <Link
          href={`/${locale}/diagnostic-ia`}
          className="mt-4 inline-flex font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-2)]/70 underline-offset-4 hover:underline"
        >
          {c.diagLink}
        </Link>
      </section>

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
