import Link from "next/link";
import { ProcessSteps } from "./ProcessSteps";

/**
 * Blocs de conversion de l'accueil (23/10/2026, audit conversion) : pour
 * qui, bande d'appel, déroulé en trois temps, FAQ courte. Fond blanc, même
 * typographie que le reste. Rien d'inventé : pas de prix, pas de délai chiffré.
 */

const BTN_BOOK =
  "inline-flex h-12 items-center rounded-full bg-[var(--ink)] px-6 text-[15px] font-medium text-white transition-[background-color,transform] duration-200 hover:bg-[#2a2e37] active:scale-[0.98]";
const BTN_OUTLINE =
  "inline-flex h-12 items-center rounded-full border border-[var(--rule-strong)] px-6 text-[15px] font-medium text-[var(--fg)] transition-colors duration-200 hover:border-[var(--fg)]";

const en = (locale: string) => locale === "en";

export function HomeAudience({ locale }: { locale: string }) {
  const E = en(locale);
  const items = E
    ? [
        { t: "SMEs", b: "A website that brings you customers, and ways to get it seen.", href: "agence-web-nice", cta: "Websites for SMEs", img: "sky" },
        { t: "E-commerce", b: "More sales on your online store.", href: "agence-e-commerce-shopify", cta: "E-commerce", img: "meadow" },
        { t: "Large groups", b: "Films and content for your product launches.", href: "medias", cta: "Films and photos", img: "orchid" },
      ]
    : [
        { t: "PME", b: "Un site qui vous amène des clients, et de quoi le faire connaître.", href: "agence-web-nice", cta: "Sites pour PME", img: "sky" },
        { t: "E-commerce", b: "Plus de ventes sur votre boutique en ligne.", href: "agence-e-commerce-shopify", cta: "E-commerce", img: "meadow" },
        { t: "Grands groupes", b: "Des films et des contenus pour vos lancements de produits.", href: "medias", cta: "Films et photos", img: "orchid" },
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
        <img src="/images/art/dusk.jpg" alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div>
          <h2 className="t-display text-3xl text-white md:text-5xl">{E ? "Got a project in mind?" : "Un projet en tête ?"}</h2>
          <p className="mt-3 text-base text-white/80 md:text-lg">{E ? "Tell us about it in a few lines. No commitment." : "Parlez-nous-en en quelques lignes, sans engagement."}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/${locale}/contact#projet`} className="relative z-10 inline-flex h-12 items-center rounded-full bg-white px-6 text-[15px] font-medium text-[#111318] transition-transform duration-200 active:scale-[0.98]">{E ? "Describe my project" : "Décrire mon projet"}</Link>
          <Link href={`/${locale}/audit-seo-gratuit`} className="relative z-10 inline-flex h-12 items-center rounded-full border border-white/50 px-6 text-[15px] font-medium text-white transition-colors duration-200 hover:border-white">{E ? "Free audit" : "Audit gratuit"}</Link>
        </div>
      </div>
    </section>
  );
}

export function HomeProcess({ locale }: { locale: string }) {
  const E = en(locale);
  const steps = E
    ? [
        { t: "A free audit", b: "We measure where you stand on Google and on ChatGPT." },
        { t: "A written proposal", b: "What we do, the timeline and the quote." },
        { t: "We build, then bring visitors", b: "Website, search, advertising. We track the results with you." },
      ]
    : [
        { t: "Un audit gratuit", b: "Nous mesurons où vous en êtes sur Google et sur ChatGPT." },
        { t: "Une proposition écrite", b: "Ce que nous faisons, les délais et le devis." },
        { t: "On construit, puis on fait venir", b: "Site, référencement, publicité. Nous suivons les résultats avec vous." },
      ];
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-12 md:py-28">
        <h2 data-reveal className="t-display text-4xl text-[var(--fg)] md:text-5xl">{E ? "How it works." : "Comment ça se passe."}</h2>
        <ProcessSteps steps={steps} />
        <Link href={`/${locale}/contact#projet`} className={`${BTN_BOOK} mt-12`}>
          {E ? "Describe my project" : "Décrire mon projet"}
        </Link>
      </div>
    </section>
  );
}

/**
 * FAQ de l'accueil (26/10/2026, demande de Hugues) : d'abord les questions
 * que les clients tapent vraiment sur Google (pourquoi un site fait vendre,
 * comment être premier, comment être cité par ChatGPT), puis les questions
 * pratiques. Balisée en FAQPage pour Google et les IA. Aucun prix.
 */
export const FAQ = {
  fr: [
    { q: "Pourquoi un site internet aide-t-il à vendre ?", a: "Avant d'acheter ou d'appeler, la plupart des clients cherchent sur Google ou demandent à ChatGPT. Un site clair, rapide sur téléphone et bien référencé transforme ces recherches en demandes de devis, en commandes ou en réservations." },
    { q: "Comment apparaître en premier sur Google ?", a: "Il faut un site techniquement propre, des pages qui répondent précisément aux recherches de vos clients, une fiche Google complète avec des avis, et des liens depuis d'autres sites. Pour être visible dès le premier jour, on ajoute des annonces Google Ads." },
    { q: "Comment être recommandé par ChatGPT ?", a: "ChatGPT, Gemini et les réponses IA de Google citent les entreprises qu'ils comprennent bien : un site ouvert à leurs robots, une identité déclarée dans le code, des offres claires, des questions-réponses et les mêmes informations partout. C'est ce qu'on appelle le GEO." },
    { q: "Quelle différence entre le SEO et le GEO ?", a: "Le SEO travaille votre place dans la liste de liens de Google. Le GEO travaille votre présence dans la réponse que l'IA écrit au client. Les deux partent d'un site clair et sérieux. Le GEO ajoute des réglages précis pour les IA." },
    { q: "Pourquoi s'en occuper maintenant ?", a: "Une réponse d'IA ne cite que quelques noms par sujet. Les entreprises qui s'y installent tôt deviennent les références, et il est ensuite plus long et plus coûteux de prendre leur place." },
    { q: "En combien de temps voit-on des résultats ?", a: "Google Ads apporte des visites dès les premiers jours. Le référencement naturel et le GEO se construisent en général sur trois à six mois. Les corrections techniques, elles, se font en quelques jours." },
    { q: "Comment avoir plus de visites sur son site ?", a: "En combinant trois sources : Google, avec le référencement et les annonces, les réseaux sociaux, et les réponses des IA. Nous mesurons d'abord d'où viennent vos visites, puis nous renforçons ce qui rapporte le plus." },
    { q: "Les réseaux sociaux suffisent-ils, sans site ?", a: "Ils créent de l'attention et des abonnés, mais ces abonnés ne vous appartiennent pas, et Google comme ChatGPT s'appuient surtout sur les sites. Le site reste la base qui transforme l'attention en demandes." },
    { q: "Google Ads ou référencement naturel : que choisir ?", a: "Les deux se complètent. Google Ads donne des résultats immédiats tant que le budget tourne. Le référencement naturel demande un investissement de départ puis rapporte dans la durée. Nous conseillons souvent de commencer par les deux." },
    { q: "Combien ça coûte ?", a: "Chaque projet a son devis, remis par écrit après un premier échange. L'audit de votre site est gratuit." },
    { q: "Faut-il s'engager ?", a: "Non. Le premier échange et la proposition ne vous engagent à rien." },
    { q: "Vous travaillez où ?", a: "Sur place sur la Côte d'Azur, à Nice, Monaco, Cannes et Antibes, et à distance partout en France et à l'étranger." },
  ],
  en: [
    { q: "Why does a website help you sell?", a: "Before buying or calling, most customers search on Google or ask ChatGPT. A clear website, fast on phones and well ranked, turns those searches into quote requests, orders or bookings." },
    { q: "How do you rank first on Google?", a: "You need a technically clean website, pages that answer exactly what your customers search for, a complete Google Business Profile with reviews, and links from other websites. To be visible from day one, we add Google Ads." },
    { q: "How do you get recommended by ChatGPT?", a: "ChatGPT, Gemini and Google's AI answers cite the companies they understand well: a website open to their crawlers, an identity declared in the code, clear offers, questions and answers, and the same information everywhere. This is called GEO." },
    { q: "What is the difference between SEO and GEO?", a: "SEO works on your position in Google's list of links. GEO works on your presence in the answer the AI writes to the customer. Both start from a clear, serious website. GEO adds precise settings for AI tools." },
    { q: "Why act now?", a: "An AI answer only cites a few names per topic. Companies that get there early become the references, and it then takes longer and costs more to take their place." },
    { q: "How long before you see results?", a: "Google Ads brings visits within days. Search rankings and GEO usually build over three to six months. Technical fixes take a few days." },
    { q: "How do you get more website visits?", a: "By combining three sources: Google, through search and ads, social media, and AI answers. We first measure where your visits come from, then strengthen what pays off most." },
    { q: "Is social media enough without a website?", a: "It creates attention and followers, but those followers are not yours, and both Google and ChatGPT rely mostly on websites. The website stays the base that turns attention into enquiries." },
    { q: "Google Ads or SEO: which one?", a: "They work together. Google Ads gives immediate results while the budget runs. SEO needs an initial investment, then pays off over time. We often advise starting with both." },
    { q: "How much does it cost?", a: "Every project gets its own quote, in writing, after a first exchange. The audit of your website is free." },
    { q: "Do I have to commit?", a: "No. The first exchange and the proposal do not commit you to anything." },
    { q: "Where do you work?", a: "On site on the French Riviera, in Nice, Monaco, Cannes and Antibes, and remotely anywhere in France and abroad." },
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
