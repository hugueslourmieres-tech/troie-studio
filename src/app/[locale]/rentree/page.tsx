import Link from "next/link";
import { setRequestLocale } from "next-intl/server";

/**
 * Landing « La rentrée qui se prouve » : l'offre de rentrée 2026 complète
 * (visibilité IA / GEO / SEO, agents IA, création de sites et landing
 * pages, contenus et réseaux, atelier) sur UNE page conçue pour vendre.
 *
 * DA volontairement empruntée à troie.app (demande de Hugues du 24/08) :
 * fond blanc, encre #0a0a0a, cartes à bord encre 2 px et ombre portée
 * pleine, pilules épaisses, accents pop (jaune #ffb110, ciel #bfe3ff,
 * corail #ff5447, lime #c3f53c). C'est le pont visuel vers le campus.
 * Le reste du site garde sa DA crème/serif : cette page est un univers
 * autonome, aucun style global n'est modifié.
 *
 * Mots-clés travaillés (audit du 24/08/2026, Trends FR) : agence seo nice,
 * seo ia, geo seo, audit seo, agent ia entreprise, création landing page,
 * agence google ads. Bannis : « visibilité ia » en nommage, « agence geo ».
 *
 * Règles maison : jamais de promesse de citation par une IA, prix publics,
 * article 4 = obligation de moyens, pas d'em-dash, accents complets.
 */

const CAL_URL = "https://cal.com/troiestudio/30min";

const COPY = {
  eyebrow: "La rentrée qui se prouve",
  h1: "Vos clients demandent à ChatGPT. Votre site doit être la réponse.",
  intro:
    "Depuis le 22 juillet 2026, Google affiche ses résumés IA en France : les domaines exposés ont perdu 23,1 % de clics en neuf jours (Ahrefs). La moitié des acheteurs B2B commencent désormais par un assistant IA. À la rentrée, on ne choisit plus l'agence qui promet : on choisit celle qui prouve.",
  ctaScan: "Scanner mon site gratuitement",
  ctaCall: "Réserver 30 minutes",
  proofTitle: "Des résultats, pas des promesses",
  proofs: [
    { k: "100/100", t: "au scan SEO et GEO", e: "notre propre site troie.app, vérifiable en 60 secondes" },
    { k: "+100 %", t: "de trafic organique en 6 mois", e: "refonte SEO multilingue d'un groupe industriel B2B" },
    { k: "175 k€", t: "de commandes générées", e: "avec 5 000 € de budget contenu, mesuré et documenté" },
    { k: "+40 %", t: "de leads entrants", e: "même client, même méthode, chiffres suivis dans le temps" },
  ],
  momentTitle: "Ce qui a changé cet été",
  momentSub:
    "Trois faits sourcés, zéro storytelling. C'est la fenêtre de cette rentrée.",
  moments: [
    {
      k: "22 juillet",
      t: "Les Aperçus IA de Google sont actifs en France",
      e: "Le dernier grand marché servi. Quand un résumé IA s'affiche, il répond à la place de votre site.",
    },
    {
      k: "-23,1 %",
      t: "de clics pour les domaines exposés, en 9 jours",
      e: "Étude Ahrefs France, août 2026. Les sites en .fr perdent 12,3 % de clics en médiane.",
    },
    {
      k: "51 %",
      t: "des acheteurs B2B commencent par un chatbot IA",
      e: "G2 Research, avril 2026. Et 69 % ont changé de fournisseur sur recommandation d'une IA.",
    },
  ],
  offersTitle: "Quatre offres fermées, prix publics",
  offersSub:
    "Pas de devis à rallonge : un périmètre, un prix, un délai, un livrable qui prouve le travail. On assemble ensuite selon vos priorités.",
  packs: [
    {
      tone: "yellow",
      tag: "Tête d'affiche",
      title: "Visibilité IA, GEO et SEO",
      price: "890 €",
      priceNote: "l'audit-fix, corrections comprises",
      features: [
        "Scan gratuit en 60 secondes : deux notes, SEO et GEO, sans inscription",
        "Audit-fix 890 € : Schema.org, llms.txt, contenus, coordonnées, corrigés pour vous",
        "Rapport avant/après daté : chaque correction est vérifiable",
        "Suivi mensuel 590 €, ou Production 990 € avec contenus citables livrés",
      ],
      cta: "Commencer par le scan gratuit",
      href: "/scan-ia",
      internal: true,
    },
    {
      tone: "sky",
      tag: "Le gain de temps",
      title: "Votre premier agent IA utile",
      price: "2 900 €",
      priceNote: "clé en main, maintenance 300 €/mois",
      features: [
        "Un agent qui travaille sur VOS documents : devis, relances, tri d'emails, contenu",
        "Monté avec vos outils réels (Claude, n8n, Make), pas une démo générique",
        "Équipe formée à le piloter, le corriger, le superviser",
        "Cadre AI Act et RGPD posé d'entrée : usages, limites, registre",
      ],
      cta: "Identifier mon premier agent",
      href: CAL_URL,
      internal: false,
    },
    {
      tone: "coral",
      tag: "La vitesse",
      title: "Création : landing, site, web app",
      price: "1 500 €",
      priceNote: "la landing page, livrée en 7 jours ouvrés",
      features: [
        "Landing page orientée conversion : copywriting, design, mesure incluse",
        "Site vitrine complet dès 2 900 €, lisible par Google ET par les moteurs IA",
        "Web app sur mesure : troie.app et bilber.app sont nos preuves publiques",
        "Le marché livre en 2 à 5 semaines. Nous, en 7 jours, et c'est écrit",
      ],
      cta: "Voir ce qu'on peut construire",
      href: CAL_URL,
      internal: false,
    },
    {
      tone: "lime",
      tag: "La régularité",
      title: "Contenus et réseaux sociaux",
      price: "790 €",
      priceNote: "par mois, système de contenu complet",
      features: [
        "3 publications par semaine, calendrier éditorial et carrousels compris",
        "Pensé pour la portée : formats qui performent, liens au bon endroit",
        "Le même moteur de contenu qui alimente nos propres sites",
        "Gestion Google Ads en option dans l'accompagnement, jamais vendue seule",
      ],
      cta: "Mettre mes réseaux en rythme",
      href: CAL_URL,
      internal: false,
    },
  ],
  workshopTitle: "Et vos équipes, dans tout ça ?",
  workshopBody:
    "Une journée d'atelier IA dans vos locaux : vos cas réels, vos outils, vos données. 1 900 € la journée, préparation en ligne sur troie.app incluse pour chaque participant. L'article 4 du règlement européen demande un niveau suffisant de maîtrise de l'IA : c'est une obligation de moyens, et l'atelier plus les attestations nominatives vérifiables en sont la preuve la plus simple.",
  workshopCta: "Organiser une journée",
  workshopCampus: "Découvrir le campus troie.app",
  bonusTitle: "Le bonus de rentrée, jusqu'au 31 octobre",
  bonusBody:
    "Pour toute commande d'un audit-fix ou d'un agent avant le 31 octobre : un re-scan de contrôle à 90 jours, offert, avec rapport comparatif daté. Pas de remise : une preuve de plus.",
  methodTitle: "Pourquoi nous, en quatre engagements",
  method: [
    {
      t: "On ne promet jamais une citation par une IA",
      e: "Personne ne peut la garantir, et ceux qui le promettent vous trompent. Nous montrons notre propre score et des rapports datés, requête par requête.",
    },
    {
      t: "Les prix sont publics et fermés",
      e: "890 €, 1 500 €, 1 900 €, 2 900 €. Sur ce marché, la plupart des agences renvoient au devis. Vous savez où vous allez avant le premier appel.",
    },
    {
      t: "Les délais sont écrits, donc tenus",
      e: "Scan immédiat, réponse sous 48 h ouvrées, landing en 7 jours ouvrés, audit-fix sous 10 jours ouvrés après cadrage.",
    },
    {
      t: "Un interlocuteur senior, pas un compte junior",
      e: "Direction marketing exercée depuis 2018 pour l'industrie, le B2B et le luxe. La personne qui vend est celle qui fait.",
    },
  ],
  faqTitle: "Les questions qu'on nous pose vraiment",
  faq: [
    {
      q: "Pouvez-vous garantir que ChatGPT citera mon entreprise ?",
      a: "Non, et personne ne le peut : les moteurs IA décident seuls de leurs sources. Ce que nous garantissons, c'est ce qui se corrige et se vérifie : votre site devient lisible et citable (données structurées, llms.txt, contenus datés, identité complète), et chaque correction est documentée dans un rapport avant/après. Méfiez-vous des promesses de citations en 30 jours.",
    },
    {
      q: "Quelle différence entre le SEO et le GEO ?",
      a: "Le SEO travaille votre visibilité dans les résultats classiques de Google. Le GEO (generative engine optimization, qu'on cherche aussi sous « seo ia » ou « geo seo ») travaille votre lisibilité par les moteurs génératifs : ChatGPT, Perplexity, les résumés IA de Google. Les deux se recouvrent : notre audit-fix note et corrige les deux, avec une note sur 100 pour chacun.",
    },
    {
      q: "Combien de temps avant de voir des résultats ?",
      a: "Les corrections techniques sont livrées sous 10 jours ouvrés et vérifiables immédiatement au re-scan. L'effet sur les citations et le trafic prend généralement 3 à 6 mois : c'est le rythme réel du marché, et quiconque annonce plus court sans preuve vous vend du vent. D'où le re-scan de contrôle à 90 jours.",
    },
    {
      q: "La formation de mes équipes est-elle obligatoire ?",
      a: "L'article 4 du règlement européen sur l'IA impose depuis février 2025 une obligation de moyens : garantir un niveau suffisant de maîtrise de l'IA. Aucune formation type ni certificat n'est imposé. Une journée d'atelier et des attestations nominatives vérifiables sont simplement la façon la plus directe de prouver l'effort le jour où on vous le demande.",
    },
    {
      q: "Comment on démarre ?",
      a: "Par le scan gratuit : 60 secondes, deux notes, les corrections prioritaires. Ensuite, 30 minutes en visio pour passer votre rapport en revue et chiffrer le potentiel selon votre trafic réel. Sans engagement : vous repartez au minimum avec un diagnostic clair.",
    },
  ],
  finalTitle: "On commence par la preuve.",
  finalBody:
    "Scannez votre site maintenant, gratuitement. Ou prenez 30 minutes : on regarde ensemble ce que les moteurs IA lisent de votre entreprise, et ce que ça vaut en clients.",
} as const;

const TONES = {
  yellow: { bg: "#ffb110", soft: "#fff2d4" },
  sky: { bg: "#bfe3ff", soft: "#e9f4ff" },
  coral: { bg: "#ff5447", soft: "#ffe3e0" },
  lime: { bg: "#c3f53c", soft: "#f0fbd6" },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title:
      "Agence SEO, GEO et création à Nice : la rentrée qui se prouve | TROIE Studio",
    description:
      "Audit SEO et GEO 890 € corrections comprises, premier agent IA d'entreprise 2 900 €, création de landing page en 7 jours à 1 500 €, contenus et réseaux 790 €/mois. Prix publics, rapports datés, scan gratuit en 60 secondes.",
    alternates: {
      canonical: `/${locale}/rentree`,
      languages: { fr: "/fr/rentree", en: "/en/rentree" },
    },
  };
}

/* JSON-LD : la FAQ visible, balisée (le format le plus repris par les
   moteurs IA), et le catalogue d'offres avec ses prix publics. */
function jsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: COPY.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      name: "Offres de rentrée 2026, TROIE Studio",
      url: "https://troiestudio.fr/fr/rentree",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Audit-fix visibilité IA (GEO + SEO)",
          price: "890",
          priceCurrency: "EUR",
          url: "https://troiestudio.fr/fr/scan-ia",
        },
        {
          "@type": "Offer",
          name: "Premier agent IA d'entreprise, clé en main",
          price: "2900",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          name: "Landing page orientée conversion, livrée en 7 jours ouvrés",
          price: "1500",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          name: "Système de contenu et réseaux sociaux, mensuel",
          price: "790",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          name: "Journée d'atelier IA en entreprise, préparation en ligne incluse",
          price: "1900",
          priceCurrency: "EUR",
        },
      ],
    },
  ];
}

/** Pilule signature troie.app : bord encre, ombre pleine, enfoncement au clic. */
function Pill({
  href,
  children,
  dark,
  external,
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
  external?: boolean;
}) {
  const cls = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 px-6 py-3.5 text-[15px] font-extrabold leading-none transition-[transform,box-shadow] duration-100 active:translate-y-[4px] active:shadow-none ${
    dark
      ? "border-[#0a0a0a] bg-[#0a0a0a] text-white shadow-[0_5px_0_0_#000]"
      : "border-[#0a0a0a] bg-white text-[#0a0a0a] shadow-[0_4px_0_0_#0a0a0a]"
  }`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export default async function RentreePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY;
  const scanHref = `/${locale === "en" ? "en" : "fr"}/scan-ia`;

  return (
    <div
      className="bg-white text-[#0a0a0a]"
      style={{ fontFamily: "var(--font-sans)", letterSpacing: "-0.011em" }}
    >
      {jsonLd().map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      <div aria-hidden="true" className="h-16 md:h-20" />

      {/* ===== Hero ===== */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-14 md:px-10 md:pt-24">
        <span className="inline-block rounded-full border-2 border-[#0a0a0a] bg-[#ffb110] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em]">
          {c.eyebrow}
        </span>
        <h1 className="mt-7 max-w-3xl text-4xl font-extrabold leading-[1.04] tracking-tight md:text-6xl">
          {c.h1}
        </h1>
        <p className="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-[#6b6a67] md:text-lg">
          {c.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3.5">
          <Pill href={scanHref} dark>
            {c.ctaScan} →
          </Pill>
          <Pill href={CAL_URL} external>
            {c.ctaCall}
          </Pill>
        </div>
      </section>

      {/* ===== Preuves ===== */}
      <section className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#6b6a67]">
          {c.proofTitle}
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.proofs.map((p) => (
            <div
              key={p.k}
              className="rounded-2xl border-2 border-[#0a0a0a] bg-white p-5 shadow-[0_5px_0_0_#0a0a0a]"
            >
              <div className="text-3xl font-extrabold tabular-nums">{p.k}</div>
              <div className="mt-1 text-[14px] font-bold">{p.t}</div>
              <div className="mt-1.5 text-[12.5px] leading-snug text-[#6b6a67]">
                {p.e}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Le moment ===== */}
      <section className="mx-auto max-w-6xl px-6 pt-20 md:px-10">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {c.momentTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] text-[#6b6a67]">{c.momentSub}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {c.moments.map((m) => (
            <div
              key={m.k}
              className="rounded-2xl border-2 border-[#0a0a0a] bg-[#e9f4ff] p-6 shadow-[0_5px_0_0_#0a0a0a]"
            >
              <div className="text-2xl font-extrabold tabular-nums">{m.k}</div>
              <div className="mt-1.5 text-[14.5px] font-bold leading-snug">
                {m.t}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[#3f3d3a]">
                {m.e}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Les 4 offres ===== */}
      <section className="mx-auto max-w-6xl px-6 pt-20 md:px-10">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {c.offersTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] text-[#6b6a67]">{c.offersSub}</p>
        <div className="mt-7 grid gap-6 md:grid-cols-2">
          {c.packs.map((pack) => {
            const tone = TONES[pack.tone as keyof typeof TONES];
            return (
              <div
                key={pack.title}
                className="flex flex-col overflow-hidden rounded-3xl border-2 border-[#0a0a0a] bg-white shadow-[0_6px_0_0_#0a0a0a]"
              >
                <div
                  className="border-b-2 border-[#0a0a0a] px-6 py-4"
                  style={{ background: tone.bg }}
                >
                  <span className="text-[10.5px] font-extrabold uppercase tracking-[0.22em]">
                    {pack.tag}
                  </span>
                  <h3 className="mt-1 text-[21px] font-extrabold leading-tight">
                    {pack.title}
                  </h3>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-4xl font-extrabold tabular-nums">
                      {pack.price}
                    </span>
                    <span className="text-[13px] font-semibold text-[#6b6a67]">
                      {pack.priceNote}
                    </span>
                  </div>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {pack.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[14px] leading-snug">
                        <span
                          aria-hidden="true"
                          className="mt-[6px] h-2 w-2 flex-none rounded-full border border-[#0a0a0a]"
                          style={{ background: tone.bg }}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-1">
                    <Pill href={pack.internal ? scanHref : pack.href} dark external={!pack.internal}>
                      {pack.cta}
                    </Pill>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== Atelier + campus ===== */}
      <section className="mx-auto max-w-6xl px-6 pt-20 md:px-10">
        <div className="rounded-3xl border-2 border-[#0a0a0a] bg-[#0a0a0a] p-8 text-white shadow-[0_6px_0_0_#6b6a67] md:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            {c.workshopTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#d9d6d0]">
            {c.workshopBody}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3.5">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#ffb110] bg-[#ffb110] px-6 py-3.5 text-[15px] font-extrabold leading-none text-[#0a0a0a] shadow-[0_5px_0_0_#8a5c00] transition-[transform,box-shadow] duration-100 active:translate-y-[4px] active:shadow-none"
            >
              {c.workshopCta}
            </a>
            <a
              href="https://troie.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-[rgba(255,255,255,0.5)] px-6 py-3.5 text-[15px] font-bold leading-none text-white transition hover:bg-[rgba(255,255,255,0.08)]"
            >
              {c.workshopCampus} →
            </a>
          </div>
        </div>
      </section>

      {/* ===== Bonus rentrée ===== */}
      <section className="mx-auto max-w-6xl px-6 pt-10 md:px-10">
        <div className="rounded-2xl border-2 border-dashed border-[#0a0a0a] bg-[#fff2d4] px-6 py-5">
          <span className="text-[10.5px] font-extrabold uppercase tracking-[0.22em] text-[#8a5c00]">
            {c.bonusTitle}
          </span>
          <p className="mt-1.5 max-w-3xl text-[14.5px] font-semibold leading-relaxed">
            {c.bonusBody}
          </p>
        </div>
      </section>

      {/* ===== Méthode ===== */}
      <section className="mx-auto max-w-6xl px-6 pt-20 md:px-10">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {c.methodTitle}
        </h2>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {c.method.map((m, i) => (
            <div
              key={m.t}
              className="rounded-2xl border-2 border-[#0a0a0a] bg-white p-6 shadow-[0_5px_0_0_#0a0a0a]"
            >
              <div className="flex items-start gap-3.5">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-[#c3f53c] text-[14px] font-extrabold tabular-nums">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[16px] font-extrabold leading-snug">{m.t}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#6b6a67]">
                    {m.e}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ (visible + balisée FAQPage) ===== */}
      <section className="mx-auto max-w-6xl px-6 pt-20 md:px-10">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {c.faqTitle}
        </h2>
        <div className="mt-7 flex flex-col gap-4">
          {c.faq.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border-2 border-[#0a0a0a] bg-white px-6 py-5 shadow-[0_4px_0_0_#0a0a0a] open:shadow-[0_5px_0_0_#0a0a0a]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-extrabold leading-snug marker:hidden [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 flex-none items-center justify-center rounded-full border-2 border-[#0a0a0a] text-[15px] font-extrabold transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3.5 max-w-3xl text-[14.5px] leading-relaxed text-[#3f3d3a]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== CTA final ===== */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-28 md:px-10">
        <div className="rounded-3xl border-2 border-[#0a0a0a] bg-[#ffb110] p-8 shadow-[0_6px_0_0_#0a0a0a] md:p-12">
          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.06] tracking-tight md:text-5xl">
            {c.finalTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-[15.5px] font-semibold leading-relaxed">
            {c.finalBody}
          </p>
          <div className="mt-7 flex flex-wrap gap-3.5">
            <Pill href={scanHref} dark>
              {c.ctaScan} →
            </Pill>
            <Pill href={CAL_URL} external>
              {c.ctaCall}
            </Pill>
          </div>
        </div>
      </section>
    </div>
  );
}
