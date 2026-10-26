import Link from "next/link";

/**
 * Les services, en clair (21/10/2026) : ce que le client obtient, pas la
 * façon de faire. Six blocs, un lien chacun.
 */
const COPY = {
  fr: {
    title: "Ce que nous faisons.",
    items: [
      { name: "Sites, applications et e-commerce", body: "Site vitrine, boutique en ligne, application web ou mobile. Conçus, développés et mis en ligne.", href: "creation-site-application", cta: "En savoir plus" },
      { name: "Photo et vidéo", body: "Reportages, films de marque, témoignages clients, contenus pour les réseaux.", href: "medias", cta: "Voir les images" },
      { name: "Communication et réseaux sociaux", body: "Positionnement, messages, contenus, réseaux sociaux, lancements de produits.", href: "strategie", cta: "En savoir plus" },
      { name: "SEO et publicité", body: "Référencement Google, campagnes Google Ads et Meta, suivies chaque mois.", href: "agence-seo-google-ads", cta: "En savoir plus", extra: { href: "audit-seo-gratuit", label: "Audit SEO gratuit de votre site" } },
      { name: "Leads, CRM et automatisations", body: "Formulaires qui convertissent, CRM en place, relances et suivi des prospects automatisés.", href: "contact#projet", cta: "Décrire mon projet" },
      { name: "Accompagnement des équipes", body: "Prise en main des outils digitaux, pour que vos équipes avancent seules.", href: "accompagnement", cta: "En savoir plus" },
    ],
  },
  en: {
    title: "What we do.",
    items: [
      { name: "Websites, apps and e-commerce", body: "Showcase site, online store, web or mobile app. Designed, built and launched.", href: "creation-site-application", cta: "Learn more" },
      { name: "Photo and video", body: "Reportage, brand films, customer stories, social media content.", href: "medias", cta: "See the images" },
      { name: "Communication and social media", body: "Positioning, messaging, content, social media, product launches.", href: "strategie", cta: "Learn more" },
      { name: "SEO and advertising", body: "Google search, Google Ads and Meta campaigns, reviewed every month.", href: "agence-seo-google-ads", cta: "Learn more", extra: { href: "audit-seo-gratuit", label: "Free SEO audit of your site" } },
      { name: "Leads, CRM and automation", body: "Forms that convert, a CRM in place, automated follow-ups and lead tracking.", href: "contact#projet", cta: "Describe my project" },
      { name: "Team support", body: "Hands-on help with digital tools, so your teams can move on their own.", href: "accompagnement", cta: "Learn more" },
    ],
  },
} as const;

export function HomeServices({ locale }: { locale: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section id="services" className="scroll-mt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-12 md:py-28 lg:grid-cols-12">
        <h2 data-reveal className="t-display text-4xl text-[var(--fg)] md:text-5xl lg:col-span-4">{c.title}</h2>
        <div className="lg:col-span-8">
          <ul data-reveal-stagger className="grid gap-x-10 sm:grid-cols-2">
            {c.items.map((it) => (
              <li key={it.name} className="border-t border-[var(--rule)] py-7">
                <Link href={`/${locale}/${it.href}`} className="group block">
                  <h3 className="text-xl font-medium tracking-[-0.02em] text-[var(--fg)]">{it.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">{it.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
                    {it.cta}
                  </span>
                </Link>
                {"extra" in it && (
                  <Link
                    href={`/${locale}/${it.extra.href}`}
                    className="mt-2 inline-flex min-h-8 items-center text-sm text-[var(--fg-2)] underline decoration-[var(--rule-strong)] underline-offset-4 transition-colors hover:text-[var(--fg)] hover:decoration-[var(--fg)]"
                  >
                    {it.extra.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
