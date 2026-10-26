import Link from "next/link";

/**
 * Les services, en clair (21/10/2026) : ce que le client obtient, pas la
 * façon de faire. Six blocs, un lien chacun.
 */
const COPY = {
  fr: {
    title: "Ce que nous faisons.",
    items: [
      { name: "Sites et boutiques en ligne", body: "Site vitrine, boutique, application. Nous les créons et les mettons en ligne.", href: "creation-site-application", cta: "En savoir plus" },
      { name: "Photo et vidéo", body: "Reportages, films de marque, témoignages de vos clients.", href: "medias", cta: "Voir les images" },
      { name: "Communication et réseaux sociaux", body: "Vos messages, vos publications, vos lancements de produits.", href: "strategie", cta: "En savoir plus" },
      { name: "Google et publicité", tag: "SEO, Google Ads", body: "Être trouvé sur Google, et de la publicité suivie chaque mois.", href: "agence-seo-google-ads", cta: "En savoir plus", extra: { href: "audit-seo-gratuit", label: "Tester mon site gratuitement" } },
      { name: "Plus de demandes clients", tag: "CRM", body: "Des formulaires qui donnent envie d'écrire, et des relances automatiques.", href: "contact#projet", cta: "Décrire mon projet" },
      { name: "Accompagnement des équipes", body: "Nous aidons vos équipes à se servir seules de leurs outils.", href: "accompagnement", cta: "En savoir plus" },
    ],
  },
  en: {
    title: "What we do.",
    items: [
      { name: "Websites and online stores", body: "Showcase site, online store, app. We build them and put them online.", href: "creation-site-application", cta: "Learn more" },
      { name: "Photo and video", body: "Reportage, brand films, stories from your customers.", href: "medias", cta: "See the images" },
      { name: "Communication and social media", body: "Your messages, your posts, your product launches.", href: "strategie", cta: "Learn more" },
      { name: "Google and advertising", tag: "SEO, Google Ads", body: "Getting found on Google, and ads reviewed every month.", href: "agence-seo-google-ads", cta: "Learn more", extra: { href: "audit-seo-gratuit", label: "Test my site for free" } },
      { name: "More customer enquiries", tag: "CRM", body: "Forms people want to fill in, and automatic follow-ups.", href: "contact#projet", cta: "Describe my project" },
      { name: "Team support", body: "We help your teams use their tools on their own.", href: "accompagnement", cta: "Learn more" },
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
                  <h3 className="text-xl font-medium tracking-[-0.02em] text-[var(--fg)]">
                    {it.name}
                    {"tag" in it && (
                      <span className="ml-2 inline-block align-middle rounded-full border border-[var(--rule)] px-2 py-0.5 text-[11px] font-normal tracking-normal text-[var(--fg-2)]">
                        {it.tag}
                      </span>
                    )}
                  </h3>
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
