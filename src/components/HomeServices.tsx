import Link from "next/link";

/**
 * Les services, en clair (21/10/2026) : ce que le client obtient, pas la
 * façon de faire. Quatre blocs, un lien chacun.
 */
const COPY = {
  fr: {
    title: "Ce que nous faisons.",
    items: [
      { name: "Sites et e-commerce", body: "Site vitrine, boutique en ligne, web app. Conçus, développés et mis en ligne.", href: "creation/web", cta: "Voir les sites" },
      { name: "Photo et vidéo", body: "Reportages, films de marque, témoignages clients, contenus pour les réseaux.", href: "medias", cta: "Voir les images" },
      { name: "Communication", body: "Positionnement, messages, réseaux sociaux, lancements de produits.", href: "strategie", cta: "En savoir plus" },
      { name: "SEO et publicité", body: "Référencement Google, campagnes Google Ads et Meta, suivies chaque mois.", href: "strategie#acquisition", cta: "En savoir plus" },
    ],
    training: "Nous formons aussi vos équipes aux outils digitaux.",
    trainingCta: "La formation",
  },
  en: {
    title: "What we do.",
    items: [
      { name: "Websites and e-commerce", body: "Showcase site, online store, web app. Designed, built and launched.", href: "creation/web", cta: "See the websites" },
      { name: "Photo and video", body: "Reportage, brand films, customer stories, social media content.", href: "medias", cta: "See the images" },
      { name: "Communication", body: "Positioning, messaging, social media, product launches.", href: "strategie", cta: "Learn more" },
      { name: "SEO and advertising", body: "Google search, Google Ads and Meta campaigns, reviewed every month.", href: "strategie#acquisition", cta: "Learn more" },
    ],
    training: "We also train your teams on digital tools.",
    trainingCta: "Training",
  },
} as const;

export function HomeServices({ locale }: { locale: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section id="services" className="scroll-mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-12 md:py-28 lg:grid-cols-12">
        <h2 className="t-display text-4xl text-[var(--fg)] md:text-5xl lg:col-span-4">{c.title}</h2>
        <div className="lg:col-span-8">
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {c.items.map((it) => (
              <li key={it.name} className="border-t border-[var(--rule)] py-7">
                <Link href={`/${locale}/${it.href}`} className="group block">
                  <h3 className="text-xl font-medium tracking-[-0.02em] text-[var(--fg)]">{it.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">{it.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
                    {it.cta}
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[var(--fg-2)]">
            {c.training}{" "}
            <Link href={`/${locale}/accompagnement`} className="font-medium text-[var(--fg)] underline decoration-[var(--rule-strong)] underline-offset-4 hover:decoration-[var(--fg)]">
              {c.trainingCta}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
