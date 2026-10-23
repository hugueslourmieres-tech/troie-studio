import Link from "next/link";

/**
 * Blocs de conversion de l'accueil (23/10/2026, audit conversion) : pour
 * qui, bande d'appel, déroulé en trois temps, FAQ courte. Fond blanc, même
 * typographie que le reste. Rien d'inventé : pas de prix, pas de délai chiffré.
 */

const CAL_URL = "https://cal.com/troiestudio/30min";
const BTN_BOOK =
  "inline-flex h-12 items-center rounded-full bg-[var(--ink)] px-6 text-[15px] font-medium text-white transition-[background-color,transform] duration-200 hover:bg-[#2a2e37] active:scale-[0.98]";
const BTN_OUTLINE =
  "inline-flex h-12 items-center rounded-full border border-[var(--rule-strong)] px-6 text-[15px] font-medium text-[var(--fg)] transition-colors duration-200 hover:border-[var(--fg)]";

const en = (locale: string) => locale === "en";

export function HomeAudience({ locale }: { locale: string }) {
  const E = en(locale);
  const items = E
    ? [
        { t: "SMEs", b: "A website that brings in enquiries, and the ads and content to fill it.", href: "agence-web-nice", cta: "Websites for SMEs", img: "sky" },
        { t: "E-commerce", b: "More online sales, on Shopify or elsewhere. Store, SEO and ads.", href: "agence-e-commerce-shopify", cta: "E-commerce", img: "ember" },
        { t: "Large groups", b: "Films, product launches and content for your teams and markets.", href: "medias", cta: "Films and photos", img: "orchid" },
      ]
    : [
        { t: "PME", b: "Un site qui amène des demandes, et la publicité et les contenus pour le faire vivre.", href: "agence-web-nice", cta: "Sites pour PME", img: "sky" },
        { t: "E-commerce", b: "Plus de ventes en ligne, sur Shopify ou ailleurs. Boutique, SEO et publicité.", href: "agence-e-commerce-shopify", cta: "E-commerce", img: "ember" },
        { t: "Grands groupes", b: "Films, lancements de produits et contenus pour vos équipes et vos marchés.", href: "medias", cta: "Films et photos", img: "orchid" },
      ];
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-12 md:py-28">
        <h2 data-reveal className="t-display text-4xl text-[var(--fg)] md:text-5xl">{E ? "Who we work for." : "Pour qui."}</h2>
        <ul data-reveal-stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((it) => (
            <li key={it.t}>
              <Link
                href={`/${locale}/${it.href}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-[var(--bg-2)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="grain block aspect-[16/10] overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/art/${it.img}.jpg`} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </span>
                <span className="flex flex-1 flex-col p-7">
                <h3 className="text-2xl font-medium tracking-[-0.02em] text-[var(--fg)]">{it.t}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--fg-2)]">{it.b}</p>
                <span className="mt-6 text-sm font-medium text-[var(--accent)] underline-offset-4 group-hover:underline">{it.cta}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomeCtaBand({ locale }: { locale: string }) {
  const E = en(locale);
  return (
    <section className="px-3 py-3 md:px-5">
      <div data-reveal className="grain relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-[28px] px-7 py-16 md:flex-row md:items-center md:px-14 md:py-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/art/ember.jpg" alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div>
          <h2 className="t-display text-3xl text-white md:text-5xl">{E ? "Got a project in mind?" : "Un projet en tête ?"}</h2>
          <p className="mt-3 text-base text-white/85 md:text-lg">{E ? "Tell us in 30 minutes. No commitment." : "Parlons-en 30 minutes, sans engagement."}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a href={CAL_URL} target="_blank" rel="noreferrer" className="relative z-10 inline-flex h-12 items-center rounded-full bg-white px-6 text-[15px] font-medium text-[#111318] transition-transform duration-200 active:scale-[0.98]">{E ? "Book 30 min" : "Réserver 30 min"}</a>
          <Link href={`/${locale}/contact#projet`} className="relative z-10 inline-flex h-12 items-center rounded-full border border-white/60 px-6 text-[15px] font-medium text-white transition-colors duration-200 hover:border-white">{E ? "Describe my project" : "Décrire mon projet"}</Link>
        </div>
      </div>
    </section>
  );
}

export function HomeProcess({ locale }: { locale: string }) {
  const E = en(locale);
  const steps = E
    ? [
        { t: "A 30-minute call", b: "You explain your goal. We listen and ask the right questions." },
        { t: "A written proposal", b: "Scope, timing and a quote, in plain words." },
        { t: "We launch", b: "We build, then review the numbers with you every month." },
      ]
    : [
        { t: "Un appel de 30 minutes", b: "Vous expliquez votre objectif. Nous écoutons et posons les bonnes questions." },
        { t: "Une proposition écrite", b: "Le périmètre, les délais et un devis, en clair." },
        { t: "On lance", b: "Nous réalisons, puis nous suivons les chiffres avec vous chaque mois." },
      ];
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-12 md:py-28">
        <h2 data-reveal className="t-display text-4xl text-[var(--fg)] md:text-5xl">{E ? "How it works." : "Comment ça se passe."}</h2>
        <ol data-reveal-stagger className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className="border-t border-[var(--fg)] pt-6">
              <span className="font-mono text-sm tabular-nums text-[var(--accent)]">{i + 1}</span>
              <h3 className="mt-3 text-xl font-medium tracking-[-0.02em] text-[var(--fg)]">{s.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">{s.b}</p>
            </li>
          ))}
        </ol>
        <a href={CAL_URL} target="_blank" rel="noreferrer" className={`${BTN_BOOK} mt-12`}>
          {E ? "Book the first call" : "Réserver le premier appel"}
        </a>
      </div>
    </section>
  );
}

export const FAQ = {
  fr: [
    { q: "Combien ça coûte ?", a: "Chaque projet a son devis. Il vous est remis par écrit après l'appel de 30 minutes." },
    { q: "Faut-il s'engager ?", a: "Non. L'appel et la proposition ne vous engagent à rien." },
    { q: "Vous travaillez où ?", a: "Nous sommes basés à Nice et travaillons partout en France, sur place ou à distance." },
    { q: "Vous faites tout, ou une seule chose ?", a: "Les deux. Un site seul, une campagne seule, ou tout ensemble avec une seule équipe." },
  ],
  en: [
    { q: "How much does it cost?", a: "Every project gets its own quote. You receive it in writing after the 30-minute call." },
    { q: "Do I have to commit?", a: "No. The call and the proposal do not commit you to anything." },
    { q: "Where do you work?", a: "We are based in Nice and work across France, on site or remotely." },
    { q: "Do you do everything, or one thing?", a: "Both. A website alone, a campaign alone, or everything with one team." },
  ],
};

export function HomeFaq({ locale }: { locale: string }) {
  const E = en(locale);
  const items = FAQ[E ? "en" : "fr"];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
  };
  return (
    <section className="border-t border-[var(--rule)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-12 md:py-28 lg:grid-cols-12">
        <h2 data-reveal className="t-display text-4xl text-[var(--fg)] md:text-5xl lg:col-span-4">{E ? "Questions." : "Vos questions."}</h2>
        <div className="lg:col-span-8">
          {items.map((it) => (
            <details key={it.q} className="group border-t border-[var(--rule)] py-5 last:border-b">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-[var(--fg)] [&::-webkit-details-marker]:hidden">
                {it.q}
                <span aria-hidden="true" className="text-2xl font-light text-[var(--fg-2)] transition-transform duration-200 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--fg-2)]">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
