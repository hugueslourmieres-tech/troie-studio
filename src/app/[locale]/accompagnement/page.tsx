import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ContactCTA } from "@/components/ContactCTA";
import { JsonLd } from "@/components/JsonLd";
import { pageSocial } from "@/lib/og";
import { metaDescription, seoTitle } from "@/lib/seo";


/**
 * Page « Accompagnement » (créée le 1er/10/2026), FR et EN.
 *
 * CADRE JURIDIQUE (voir /diagnostic-ia) : TROIE Studio vend du conseil et de
 * l'accompagnement, jamais de la « formation ». Mots autorisés : conseil,
 * accompagnement, atelier, prise en main, sensibilisation.
 *
 * L'IA n'apparaît ni dans le H1, ni dans le titre, ni dans la description,
 * ni dans un bouton. Elle n'est citée que dans le bloc Ateliers.
 *
 * Aucun visuel de personne. Aucun prix, aucune durée : le rythme et la durée
 * de la direction marketing à temps partagé se fixent dans le devis.
 * [À COMPLÉTER par Hugues] Rythme et durée, à afficher seulement après
 * validation.
 *
 * Le lien « Organisation et outils » vers /ia n'existe qu'en français, car
 * /ia est rédigée en français seulement.
 */

const COPY = {
  fr: {
    metaTitle: "Direction marketing à temps partagé et suivi",
    metaDesc:
      "Direction marketing à temps partagé, ateliers IA et AI Act avec vos équipes, suivi après livraison. Une équipe qui reste à vos côtés dans la durée.",
    eyebrow: "Accompagnement",
    title: "Nous restons à vos côtés.",
    intro:
      "Une stratégie ne sert que si elle est tenue. Nous suivons vos projets dans la durée, avec vous, vos équipes et vos prestataires.",
    book: "Décrire mon projet",
    project: "Nous écrire",
    directionTitle: "Une direction marketing, quand vous n'en avez pas.",
    directionBody:
      "Vous n'avez pas de directeur marketing, ou pas à plein temps. Un directeur marketing senior de l'équipe tient ce rôle à temps partagé : priorités, budget, choix des prestataires, suivi des résultats. Le rythme et la durée se fixent ensemble, dans le devis.",
    iaEyebrow: "L'IA dans vos équipes",
    iaTitle: "Vos équipes savent se servir de l'IA.",
    iaIntro:
      "Depuis le 2 février 2025, l'article 4 de l'AI Act demande aux entreprises de prendre des mesures pour que leurs équipes aient un niveau suffisant de maîtrise de l'IA. C'est une obligation de moyens : aucun certificat n'est exigé. Nous vous aidons à la remplir avec des ateliers sur vos vrais dossiers, et des documents qui restent.",
    iaCards: [
      {
        art: "sky",
        title: "Des ateliers sur vos cas réels",
        body: "Un mail difficile, un long PDF à résumer, un compte rendu de réunion, un tableau Excel, un client mécontent. Chacun repart avec des textes prêts à copier dans ChatGPT, Claude, Gemini ou Le Chat.",
      },
      {
        art: "dusk",
        title: "Le socle AI Act, clairement",
        body: "Comprendre l'IA, ce que dit l'AI Act, les usages interdits, l'utiliser de façon responsable dans votre métier, puis mettre en place les mesures. Six étapes courtes, sans jargon.",
      },
      {
        art: "orchid",
        title: "Les documents qui restent",
        body: "Une charte d'usage de l'IA en dix règles à votre nom, un registre des usages et une checklist de conformité. Ce sont vos preuves des mesures prises.",
      },
      {
        art: "meadow",
        title: "Des quiz pour s'entraîner",
        body: "Douze quiz gratuits, sans compte, pour garder le réflexe entre deux ateliers. Deux minutes chacun.",
      },
    ],
    iaToolsLink: "Outils IA gratuits",
    iaQuizLink: "Les 12 quiz sur troie.app",
    iaDates: [
      { d: "2 février 2025", t: "L'article 4 s'applique : maîtrise de l'IA dans les équipes." },
      { d: "2 août 2026", t: "Contrôles et sanctions possibles." },
      { d: "2 décembre 2027", t: "Systèmes à haut risque (annexe III), date reportée par le règlement 2026/1744." },
    ],
    workshopsTitle: "Des ateliers avec vos équipes.",
    workshopsBody:
      "Des séances courtes, sur vos cas réels : message de marque, contenus, outils du quotidien. L'IA y a sa place quand elle vous fait gagner du temps. Nous vous disons toujours ce que fait la machine et ce que fait la main. Vos équipes repartent avec une méthode qu'elles appliquent seules.",
    workshopsLink: "Organisation et outils" as string | null,
    followTitle: "Un suivi après la livraison.",
    followBody:
      "Un site, une campagne ou une vidéo continue de vivre après sa sortie. Nous restons joignables pour mesurer, ajuster et faire évoluer.",
    diagTitle: "Un diagnostic pour commencer.",
    diagBody:
      "Un premier diagnostic pour faire le point sur votre organisation, vos outils et vos priorités.",
    diagLink: "Le diagnostic",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Combien ça coûte ?",
        a: "C'est sur devis, après un premier échange. Le prix dépend du rythme et du périmètre.",
      },
      {
        q: "Et si j'ai déjà une équipe marketing ?",
        a: "Nous travaillons avec elle. Nous apportons un regard de direction et nous l'aidons à avancer, sans la remplacer.",
      },
      {
        q: "Faut-il un certificat pour l'AI Act ?",
        a: "Non. L'article 4 demande des mesures adaptées pour un niveau suffisant de maîtrise de l'IA, pas un diplôme. Gardez une trace de ce qui a été fait : ateliers, charte, registre.",
      },
      {
        q: "Est-ce pris en charge par un OPCO ?",
        a: "Non. TROIE Studio fait du conseil et de l'accompagnement. Nos prestations ne passent pas par les OPCO.",
      },
    ],
  },
  en: {
    metaTitle: "Fractional marketing direction and support",
    metaDesc:
      "Fractional marketing direction, AI and AI Act workshops with your teams, follow-up after delivery. A team that stays by your side over time.",
    eyebrow: "Ongoing support",
    title: "We stay by your side.",
    intro:
      "A strategy only works if it is followed through. We follow your projects over time, with you, your teams and your suppliers.",
    book: "Describe my project",
    project: "Write to us",
    directionTitle: "A marketing director, when you don't have one.",
    directionBody:
      "You have no marketing director, or not full time. A senior marketing director from our team takes on this role on a fractional basis: priorities, budget, choice of suppliers, tracking results. The pace and duration are set together, in the quote.",
    iaEyebrow: "AI in your teams",
    iaTitle: "Your teams know how to use AI.",
    iaIntro:
      "Since 2 February 2025, article 4 of the AI Act asks companies to take measures so their staff have a sufficient level of AI literacy. It is an obligation of means: no certificate is required. We help you meet it with workshops on your real files, and documents that stay with you.",
    iaCards: [
      {
        art: "sky",
        title: "Workshops on your real cases",
        body: "A difficult email, a long PDF to summarise, meeting notes, an Excel table, an unhappy customer. Everyone leaves with prompts ready to paste into ChatGPT, Claude, Gemini or Le Chat.",
      },
      {
        art: "dusk",
        title: "The AI Act basics, clearly",
        body: "Understanding AI, what the AI Act says, the banned uses, using it responsibly in your job, then putting the measures in place. Six short steps, no jargon.",
      },
      {
        art: "orchid",
        title: "Documents that stay",
        body: "An AI use policy in ten rules in your company's name, a register of uses and a compliance checklist. They are your proof of the measures taken.",
      },
      {
        art: "meadow",
        title: "Quizzes to practise",
        body: "Twelve free quizzes, no account needed, to keep the habit between workshops. Two minutes each.",
      },
    ],
    iaToolsLink: "Free AI tools",
    iaQuizLink: "The 12 quizzes on troie.app",
    iaDates: [
      { d: "2 February 2025", t: "Article 4 applies: AI literacy in teams." },
      { d: "2 August 2026", t: "Checks and penalties possible." },
      { d: "2 December 2027", t: "High-risk systems (Annex III), date postponed by Regulation 2026/1744." },
    ],
    workshopsTitle: "Workshops with your teams.",
    workshopsBody:
      "Short sessions on your real cases: brand message, content, everyday tools. AI has its place when it saves you time. We always tell you what the machine does and what the hand does. Your teams leave with a method they can apply on their own.",
    workshopsLink: null as string | null,
    followTitle: "Follow-up after delivery.",
    followBody:
      "A website, a campaign or a video keeps living after launch. We stay available to measure, adjust and improve.",
    diagTitle: "A diagnostic to start.",
    diagBody:
      "A first diagnostic to take stock of your organisation, your tools and your priorities.",
    diagLink: "The diagnostic",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How much does it cost?",
        a: "It is quoted after a first exchange. The price depends on the pace and the scope.",
      },
      {
        q: "What if I already have a marketing team?",
        a: "We work with them. We bring a director's view and help them move forward, without replacing them.",
      },
      {
        q: "Do we need a certificate for the AI Act?",
        a: "No. Article 4 asks for appropriate measures to reach a sufficient level of AI literacy, not a diploma. Keep a record of what was done: workshops, policy, register.",
      },
      {
        q: "Is it covered by an OPCO?",
        a: "No. TROIE Studio provides consulting and support. Our services are not funded through OPCOs.",
      },
    ],
  },
};

/* Classes des boutons (fond crème). La zone cliquable des liens soulignés
   garde 48 px de haut pour le pouce, le trait reste collé au texte. */
const BTN_BOOK =
  "group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 text-[15px] font-medium text-white transition-[background-color,transform] duration-200 hover:bg-[#2a2e37] active:scale-[0.98]";
const BTN_LINK =
  "group inline-flex min-h-12 items-center gap-2 text-[15px] font-medium text-[var(--fg)] underline decoration-[var(--rule-strong)] underline-offset-4 transition-colors hover:decoration-[var(--fg)]";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = COPY[locale === "en" ? "en" : "fr"];
  return {
    title: seoTitle(c.metaTitle),
    description: metaDescription(c.metaDesc),
    alternates: {
      canonical: `/${locale}/accompagnement`,
      languages: { fr: "/fr/accompagnement", en: "/en/accompagnement" },
    },
    ...pageSocial({
      locale,
      path: "/accompagnement",
      title: c.metaTitle,
      description: c.metaDesc,
    }),
  };
}

/** Lien souligné avec flèche, zone cliquable confortable. */
function ArrowLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className={BTN_LINK}>
      <span className="inline-flex items-center gap-2">
        {children}
        <span aria-hidden="true" className="transition group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

/** Bloc titre à gauche, texte à droite (même grille que /diagnostic-ia). */
function Block({
  id,
  title,
  body,
  link,
}: {
  id?: string;
  title: string;
  body: string;
  link?: { href: string; label: string } | null;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <h2 className="t-display text-3xl leading-tight text-[var(--fg)] md:text-4xl">
              {title}
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-base leading-relaxed text-[var(--fg-2)] md:text-lg">{body}</p>
            {link && (
              <div className="mt-6">
                <ArrowLink href={link.href}>{link.label}</ArrowLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Les ateliers IA (23/10/2026) : l'offre de troie.app, redessinée dans la
 *  charte du studio. Vocabulaire : ateliers, accompagnement, jamais
 *  « formation » (voir le cadre juridique en tête de fichier). */
function IaTeams({ c, locale }: { c: (typeof COPY)["fr"]; locale: string }) {
  return (
    <section id="ia" className="scroll-mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <p className="text-sm text-[var(--fg-2)]">{c.iaEyebrow}</p>
            <h2 className="t-display mt-4 text-3xl leading-tight text-[var(--fg)] md:text-5xl">{c.iaTitle}</h2>
          </div>
          <div className="md:col-span-6 md:pt-9">
            <p className="text-base leading-relaxed text-[var(--fg-2)] md:text-lg">{c.iaIntro}</p>
          </div>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.iaCards.map((card) => (
            <li key={card.title} className="flex flex-col overflow-hidden rounded-2xl border border-[var(--rule)] bg-white">
              <span aria-hidden="true" className="grain block h-20 shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/art/${card.art}.jpg`} alt="" className="h-full w-full object-cover" />
              </span>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[17px] font-medium leading-snug text-[var(--fg)]">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--fg-2)]">{card.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-8 md:grid-cols-12 md:gap-10">
          <ol className="grid gap-6 sm:grid-cols-3 md:col-span-9">
            {c.iaDates.map((x) => (
              <li key={x.d} className="border-t border-[var(--rule-strong)] pt-4">
                <p className="text-[15px] font-medium tabular-nums text-[var(--accent)]">{x.d}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]">{x.t}</p>
              </li>
            ))}
          </ol>
          {/* Les outils B2B vivent sur le studio depuis le 23/10/2026 (/outils).
              troie.app ne garde que les 12 quiz. */}
          <div className="flex flex-col items-start md:col-span-3 md:items-end md:justify-end">
            <ArrowLink href={`/${locale}/outils`}>{c.iaToolsLink}</ArrowLink>
            <a href="https://troie.app" target="_blank" rel="noreferrer" className={BTN_LINK}>
              <span className="inline-flex items-center gap-2">
                {c.iaQuizLink}
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function AccompagnementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY[locale === "en" ? "en" : "fr"];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `https://troiestudio.fr/${locale}/accompagnement#faq`,
    inLanguage: locale === "en" ? "en" : "fr",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <JsonLd data={faqJsonLd} />
      <div aria-hidden="true" className="h-16 md:h-20" />

      {/* En-tête */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 md:px-12 md:pt-24 md:pb-28">
        <div className="max-w-3xl">
          <h1 className="t-display mt-6 text-4xl leading-[1.05] text-[var(--fg)] md:text-6xl">
            {c.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]">
            {c.intro}
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Link href={`/${locale}/contact?besoin=autre#projet`} className={BTN_BOOK}>
              {c.book}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">
                →
              </span>
            </Link>
            <ArrowLink href={`/${locale}/contact#ecrire`}>
              {c.project}
            </ArrowLink>
          </div>
        </div>
      </section>

      <Block id="direction" title={c.directionTitle} body={c.directionBody} />
      <IaTeams c={c} locale={locale} />
      <Block id="suivi" title={c.followTitle} body={c.followBody} />
      {/* Questions fréquentes (même tableau que le JSON-LD FAQPage). Le padding
          est porté par le summary : toute la ligne de la question se touche. */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="grid gap-10 md:grid-cols-12 lg:gap-x-16">
            <div className="md:col-span-5">
              <h2 className="t-display text-3xl text-[var(--fg)] md:text-5xl">{c.faqTitle}</h2>
            </div>
            <div className="md:col-span-7">
              <ul className="border-t border-[var(--rule)]">
                {c.faq.map((item) => (
                  <li key={item.q} className="border-b border-[var(--rule)]">
                    <details className="group">
                      <summary className="text-sm flex min-h-[48px] cursor-pointer list-none items-start justify-between gap-6 py-5 leading-relaxed text-[var(--fg)] transition-colors hover:text-[var(--accent)] font-medium">
                        <span>{item.q}</span>
                        <span
                          aria-hidden="true"
                          className="font-sans text-base text-[var(--fg-2)] transition-transform duration-300 group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="-mt-1 max-w-2xl pb-5 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                        {item.a}
                      </p>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
