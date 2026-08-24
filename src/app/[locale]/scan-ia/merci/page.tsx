import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { GreekMark } from "@/components/GreekMark";

/**
 * Confirmation de commande de l'audit-fix (retour de Stripe Checkout).
 * Pas de vérification de session ici : la page n'ouvre aucun droit, elle
 * répète simplement les engagements. La source de vérité reste le webhook.
 */

const COPY = {
  fr: {
    eyebrow: "Commande confirmée",
    title: "Merci, votre audit-fix est lancé.",
    body: "Votre paiement est confirmé, vous recevez un reçu par email. Voici la suite, telle que nous nous y engageons :",
    steps: [
      "Sous 48 h ouvrées : nous vous écrivons pour valider le périmètre (site, pages prioritaires, accès éventuels).",
      "Ensuite : nous réalisons les corrections de citabilité (Schema.org, llms.txt, contenus, coordonnées).",
      "Sous 10 jours ouvrés : vous recevez le rapport avant/après daté, qui prouve chaque correction.",
    ],
    note: "Une question entre-temps ? Répondez à l'email de confirmation, il arrive directement chez nous.",
    honesty:
      "Rappel de méthode : personne ne peut garantir une citation par ChatGPT ou un résumé IA de Google. Ce que nous livrons, ce sont des corrections vérifiables qui rendent votre site lisible et citable par ces moteurs.",
    back: "Revenir au scan",
  },
  en: {
    eyebrow: "Order confirmed",
    title: "Thank you, your audit-fix is underway.",
    body: "Your payment is confirmed and a receipt is on its way by email. Here is what happens next, as we commit to it:",
    steps: [
      "Within 48 working hours: we write to you to confirm the scope (site, priority pages, access if needed).",
      "Then: we apply the citability fixes (Schema.org, llms.txt, content, contact signals).",
      "Within 10 working days: you receive the dated before/after report, proving every fix.",
    ],
    note: "A question in the meantime? Reply to the confirmation email, it lands directly in our inbox.",
    honesty:
      "A reminder on method: nobody can guarantee a citation by ChatGPT or a Google AI Overview. What we deliver are verifiable fixes that make your site readable and citable by those engines.",
    back: "Back to the scan",
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
    title: c.title.replace(/\.$/, ""),
    robots: { index: false, follow: false },
  };
}

export default async function ScanMerciPage({
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

      <section className="mx-auto max-w-7xl px-6 pt-24 pb-32 md:px-12 md:pt-32">
        <div className="max-w-3xl">
          <GreekMark
            label={c.eyebrow}
            labelClassName="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--fg-2)]/60"
          />
          <h1 className="t-display mt-6 text-4xl leading-[1.05] md:text-6xl">
            {c.title}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            {c.body}
          </p>

          <ol className="mt-8 flex max-w-2xl flex-col gap-4">
            {c.steps.map((step, i) => (
              <li
                key={step}
                className="flex gap-4 rounded-xl border border-[var(--fg)]/12 bg-[var(--bg-2)]/40 p-5"
              >
                <span className="font-mono text-sm tabular-nums text-[var(--fg-2)]">
                  {i + 1}
                </span>
                <span className="text-[15px] leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-[var(--fg-2)]">
            {c.note}
          </p>

          <p className="mt-8 max-w-2xl border-l-2 border-[var(--fg)]/15 pl-5 text-[13px] leading-relaxed text-[var(--fg-2)]/75">
            {c.honesty}
          </p>

          <Link
            href={`/${locale}/scan-ia`}
            className="mt-10 inline-flex font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-2)]/70 underline-offset-4 hover:underline"
          >
            {c.back}
          </Link>
        </div>
      </section>
    </div>
  );
}
