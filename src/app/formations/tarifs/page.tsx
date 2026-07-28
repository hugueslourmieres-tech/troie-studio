import Link from "next/link";
import { FormationsFooter } from "@/components/FormationsFooter";
import { BuyButton } from "@/components/BuyButton";
import { BILLING_PRODUCTS, formatEuros } from "@/lib/billing/catalog";
import { JsonLd, ORG_ID } from "@/components/JsonLd";

export const metadata = {
  title: "Tarifs, TROIE Formations IA",
  description:
    "Cours en ligne IA à l'unité (accès à vie) ou en abonnement tout catalogue. QCM gratuits pour commencer, paiement sécurisé Stripe.",
  alternates: { canonical: "https://troiestudio.fr/formations/tarifs" },
};

const PRICING_JSONLD = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "TROIE Formations IA, tarifs",
  url: "https://troiestudio.fr/formations/tarifs",
  provider: { "@id": ORG_ID },
  itemListElement: Object.values(BILLING_PRODUCTS).map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: (p.amountCents / 100).toFixed(0),
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
  })),
};

const CARD_BTN =
  "mt-8 inline-flex w-full items-center justify-center gap-3 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors";

/**
 * Page tarifs de la plateforme : 2 cours a l'unité (accès à vie),
 * l'abonnement tout catalogue (mensuel / annuel), et le B2B équipes
 * en contact direct. Paiement via Stripe Checkout (BuyButton).
 */
export default function TarifsPage() {
  const cours01 = BILLING_PRODUCTS["cours-01"];
  const cours02 = BILLING_PRODUCTS["cours-02"];
  const mensuel = BILLING_PRODUCTS["abo-mensuel"];
  const annuel = BILLING_PRODUCTS["abo-annuel"];

  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <JsonLd data={PRICING_JSONLD} />

      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Tarifs
        </p>
        <h1 className="t-display mt-6 max-w-3xl text-5xl text-[var(--fg)] md:text-7xl">
          Simple et sans surprise.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/85">
          Commencez gratuitement avec les QCM et le Module 0. Puis achetez un
          cours à l&apos;unité (accès à vie) ou passez à l&apos;abonnement pour
          tout le catalogue. Paiement sécurisé par Stripe, sans engagement sur
          le mensuel.
        </p>

        {/* Grille d'offres */}
        <div className="mt-14 grid gap-6 md:mt-20 lg:grid-cols-3">
          {/* Cours à l'unité */}
          <div className="flex flex-col rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-8 md:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
              À l&apos;unité, accès à vie
            </p>
            <h2 className="t-display mt-5 text-3xl">Un cours, pour toujours.</h2>
            <div className="mt-8 space-y-6">
              <div className="border-t border-[var(--rule)] pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-base font-medium">Cours 01, ChatGPT &amp; Claude</p>
                  <p className="t-display text-2xl">{formatEuros(cours01.amountCents)}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]">
                  {cours01.description}
                </p>
                <BuyButton
                  product={cours01.key}
                  label="Acheter le Cours 01"
                  fallbackSubject="Cours 01"
                  className={`${CARD_BTN} border border-[var(--fg)]/30 text-[var(--fg)] hover:border-[var(--fg)] hover:bg-[var(--ink)] hover:text-[var(--bg)]`}
                />
              </div>
              <div className="border-t border-[var(--rule)] pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-base font-medium">Cours 02, Workflows IA</p>
                  <p className="t-display text-2xl">{formatEuros(cours02.amountCents)}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]">
                  {cours02.description}
                </p>
                <BuyButton
                  product={cours02.key}
                  label="Acheter le Cours 02"
                  fallbackSubject="Cours 02"
                  className={`${CARD_BTN} border border-[var(--fg)]/30 text-[var(--fg)] hover:border-[var(--fg)] hover:bg-[var(--ink)] hover:text-[var(--bg)]`}
                />
              </div>
            </div>
          </div>

          {/* Abonnement, mis en avant */}
          <div className="relative flex flex-col rounded-sm border border-[var(--accent)] bg-[var(--ink)] p-8 text-[var(--bg)] md:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
              Abonnement, 7 jours gratuits
            </p>
            <h2 className="t-display mt-5 text-3xl text-[var(--bg)]">
              Tout, en continu.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--bg)]/75">
              Tous les cours actuels et à venir, les QCM, la bibliothèque de
              prompts et les nouveautés. Sans engagement sur le mensuel.
            </p>
            <div className="mt-8 flex items-baseline gap-2">
              <p className="t-display text-5xl text-[var(--bg)]">
                {formatEuros(mensuel.amountCents)}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--bg)]/60">
                / mois
              </p>
            </div>
            <BuyButton
              product={mensuel.key}
              label="S'abonner, mensuel"
              fallbackSubject="Abonnement"
              className={`${CARD_BTN} bg-[var(--accent)] text-[#1a1714] hover:bg-[var(--bg)] hover:text-[var(--fg)]`}
            />
            <div className="mt-6 border-t border-[var(--bg)]/15 pt-6">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm text-[var(--bg)]/85">
                  Annuel : {formatEuros(annuel.amountCents)} / an
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                  2 mois offerts
                </p>
              </div>
              <BuyButton
                product={annuel.key}
                label="S'abonner, annuel"
                fallbackSubject="Abonnement annuel"
                className={`${CARD_BTN} border border-[var(--bg)]/30 text-[var(--bg)] hover:border-[var(--bg)] hover:bg-[var(--bg)] hover:text-[var(--fg)]`}
              />
            </div>
          </div>

          {/* Équipes / B2B */}
          <div className="flex flex-col rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-8 md:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
              Équipes &amp; entreprises
            </p>
            <h2 className="t-display mt-5 text-3xl">Formez toute l&apos;équipe.</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)]">
              Licences par siège, suivi de progression, formation intra avec
              coach, agents IA déployés sur vos cas réels.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "Plateforme + coaching (blended)",
                "Vue manager et rapports de progression",
                "Sur vos cas d'usage, dans vos outils",
                "Supervision continue en option (retainer)",
              ].map((li) => (
                <li key={li} className="flex items-baseline gap-3 text-sm text-[var(--fg-2)]">
                  <span aria-hidden="true" className="inline-block h-px w-3.5 flex-shrink-0 bg-[var(--accent)]" />
                  {li}
                </li>
              ))}
            </ul>
            <a
              href="https://cal.com/troiestudio/30min"
              target="_blank"
              rel="noreferrer"
              className={`${CARD_BTN} mt-auto bg-[var(--ink)] text-[var(--bg)] hover:bg-[var(--accent)] hover:text-[#1a1714]`}
            >
              Audit gratuit, 30 min
            </a>
          </div>
        </div>

        {/* Réassurance */}
        <div className="mt-12 grid gap-6 border-t border-[var(--rule)] pt-8 text-sm text-[var(--fg-2)] md:grid-cols-3">
          <p>Paiement sécurisé Stripe (CB, Apple Pay, Google Pay).</p>
          <p>Cours à l&apos;unité : accès à vie, mises à jour incluses.</p>
          <p>
            Une question avant d&apos;acheter ?{" "}
            <Link href="/formations" className="underline decoration-[var(--accent)] underline-offset-4 hover:text-[var(--fg)]">
              Commencez par les QCM gratuits
            </Link>
            .
          </p>
        </div>
      </section>

      <FormationsFooter />
    </article>
  );
}
