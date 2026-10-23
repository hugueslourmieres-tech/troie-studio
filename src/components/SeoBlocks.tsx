import Link from "next/link";
import { LOIR_SALES_PCT, RUTHERFORD_TIKTOK_PCT } from "@/lib/results";
import { ORG_ID } from "./JsonLd";

/**
 * Blocs partagés des pages de services, de la page Nice et des études de
 * cas (23/10/2026). Même grammaire que /accompagnement et /strategie : fond
 * blanc, Geist, bouton noir en pilule, chiffres en bleu (var(--accent)).
 *
 * Chiffres autorisés (src/lib/results.ts, pourcentages seulement) :
 * LOIR Paris +164 %, Rutherford +193 % TikTok, Autajon ×35 (estimation du
 * groupe Rutherford). Aucun autre chiffre sur ces pages.
 */

export const BASE = "https://troiestudio.fr";
export const CAL_URL = "https://cal.com/troiestudio/30min";
export const GBP_URL = "https://www.google.com/maps/place/?q=place_id:ChIJzaE5l_HCtSwRsqZgau9Fe4o";

export type Locale = "fr" | "en";
export const loc = (locale: string): Locale => (locale === "en" ? "en" : "fr");

export const BTN_BOOK =
  "group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 text-[15px] font-medium text-white transition-[background-color,transform] duration-200 hover:bg-[#2a2e37] active:scale-[0.98]";
const BTN_LINK =
  "group inline-flex min-h-12 items-center gap-2 text-[15px] font-medium text-[var(--fg)] underline decoration-[var(--rule-strong)] underline-offset-4 transition-colors hover:decoration-[var(--fg)]";

export type FaqItem = { q: string; a: string };

/** Lien souligné avec flèche, zone cliquable de 48 px. */
export function ArrowLink({ href, children }: { href: string; children: string }) {
  const external = href.startsWith("http");
  const arrow = (
    <span aria-hidden="true" className="transition group-hover:translate-x-1">
      →
    </span>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={BTN_LINK}>
      <span className="inline-flex items-center gap-2">
        {children}
        {arrow}
      </span>
    </a>
  ) : (
    <Link href={href} className={BTN_LINK}>
      <span className="inline-flex items-center gap-2">
        {children}
        {arrow}
      </span>
    </Link>
  );
}

/** Les deux actions : réserver 30 min (Cal), décrire le projet (/contact). */
export function Actions({
  locale,
  need,
}: {
  locale: string;
  need?: "strategie" | "site" | "contenus" | "accompagnement";
}) {
  const en = loc(locale) === "en";
  return (
    <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
      <a href={CAL_URL} target="_blank" rel="noreferrer" className={BTN_BOOK}>
        {en ? "Book 30 min" : "Réserver 30 min"}
        <span aria-hidden="true" className="transition group-hover:translate-x-1">
          →
        </span>
      </a>
      <ArrowLink href={`/${locale}/contact${need ? `?besoin=${need}` : ""}#projet`}>
        {en ? "Describe my project" : "Décrire mon projet"}
      </ArrowLink>
    </div>
  );
}

/** En-tête de page : surtitre, H1 court, introduction, actions. */
export function PageHero({
  locale,
  eyebrow,
  title,
  intro,
  need,
  children,
}: {
  locale: string;
  eyebrow: string;
  title: string;
  intro: string;
  need?: "strategie" | "site" | "contenus" | "accompagnement";
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 md:px-12 md:pt-24 md:pb-28">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-[var(--fg-2)]">{eyebrow}</p>
        <h1 className="t-display mt-4 text-4xl leading-[1.05] text-[var(--fg)] md:text-6xl">
          {title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]">{intro}</p>
        {children}
        <Actions locale={locale} need={need} />
      </div>
    </section>
  );
}

/** Bloc titre à gauche, contenu à droite (grille de /accompagnement). */
export function Block({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
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
          <div className="md:col-span-6 md:col-start-7">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Paragraphe courant des blocs. */
export function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base leading-relaxed text-[var(--fg-2)] md:text-lg [&+p]:mt-5">
      {children}
    </p>
  );
}

/** Liste de phrases complètes, filet entre chaque ligne. */
export function Sentences({ items }: { items: readonly string[] }) {
  return (
    <ul className="border-t border-[var(--rule)]">
      {items.map((s) => (
        <li
          key={s}
          className="border-b border-[var(--rule)] py-4 text-base leading-relaxed text-[var(--fg)] md:text-lg"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

/* ── Preuves ─────────────────────────────────────────────────────────── */

export type ProofId = "loir" | "rutherford" | "autajon";

const time = (d: string) => new Date(`${d}T00:00:00Z`).getTime();

/** Ramène une série à [0, 1] sur les deux axes. */
function norm(points: { x: number; v: number }[]): [number, number][] {
  const xs = points.map((p) => p.x);
  const vs = points.map((p) => p.v);
  const [x0, x1] = [Math.min(...xs), Math.max(...xs)];
  const [v0, v1] = [Math.min(...vs), Math.max(...vs)];
  return points.map((p) => [(p.x - x0) / (x1 - x0 || 1), (p.v - v0) / (v1 - v0 || 1)]);
}

export const PROOFS: Record<
  ProofId,
  {
    client: string;
    slug: string;
    sector: Record<Locale, string>;
    value: Record<Locale, string>;
    label: Record<Locale, string>;
    curve?: [number, number][];
    bars?: true;
  }
> = {
  loir: {
    client: "LOIR Paris",
    slug: "loir-paris",
    sector: { fr: "E-commerce de mode, Shopify", en: "Fashion e-commerce, Shopify" },
    value: { fr: "+164 %", en: "+164%" },
    label: { fr: "de ventes en ligne en deux ans", en: "online sales in two years" },
    curve: norm(LOIR_SALES_PCT.map((v, i) => ({ x: i, v }))),
  },
  rutherford: {
    client: "Rutherford",
    slug: "rutherford",
    sector: { fr: "PME industrielle, B2B", en: "Industrial SME, B2B" },
    value: { fr: "+193 %", en: "+193%" },
    label: { fr: "d'abonnés TikTok depuis mars 2025", en: "TikTok followers since March 2025" },
    curve: norm(RUTHERFORD_TIKTOK_PCT.map((p) => ({ x: time(p.d), v: p.v }))),
  },
  autajon: {
    client: "Autajon",
    slug: "autajon",
    sector: { fr: "Grand groupe, emballage", en: "Large group, packaging" },
    value: { fr: "×35", en: "×35" },
    label: {
      fr: "le budget d'un film, en ventes estimées par le groupe Rutherford",
      en: "a film's budget, in sales estimated by the Rutherford group",
    },
    bars: true,
  },
};

const W = 400;
const H = 96;

function linePath(points: [number, number][]) {
  return points
    .map(([px, py], i) => `${i ? "L" : "M"}${(px * W).toFixed(1)},${(H - 6 - py * (H - 12)).toFixed(1)}`)
    .join(" ");
}

/** Courbe réelle (ou deux barres pour Autajon), sans axe ni autre chiffre. */
export function ProofChart({ id, className = "" }: { id: ProofId; className?: string }) {
  const p = PROOFS[id];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio={p.bars ? "xMidYMid meet" : "none"}
      className={`h-full w-full ${className}`}
      aria-hidden="true"
    >
      {p.curve && (
        <>
          <path d={`${linePath(p.curve)} L${W},${H} L0,${H} Z`} fill="var(--accent)" opacity={0.08} />
          <path
            d={linePath(p.curve)}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
        </>
      )}
      {p.bars && (
        <>
          <rect x={150} y={H - 6} width={36} height={6} rx={2} fill="var(--rule-strong)" />
          <rect x={214} y={6} width={36} height={H - 6} rx={2} fill="var(--accent)" />
        </>
      )}
    </svg>
  );
}

/** Cartes de preuve, chacune mène à son étude de cas. */
export function ProofGrid({
  locale,
  title,
  ids = ["loir", "rutherford", "autajon"],
}: {
  locale: string;
  title: string;
  ids?: ProofId[];
}) {
  const l = loc(locale);
  const more = l === "en" ? "Read the case study" : "Lire l'étude de cas";
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <h2 className="t-display max-w-2xl text-3xl leading-tight text-[var(--fg)] md:text-4xl">
          {title}
        </h2>
        <ul className={`mt-12 grid gap-5 ${ids.length > 1 ? "md:grid-cols-3" : "md:max-w-md"}`}>
          {ids.map((id) => {
            const p = PROOFS[id];
            return (
              <li key={id}>
                <Link
                  href={`/${locale}/etudes-de-cas/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--rule)] bg-white transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(17,19,24,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  <div className="px-6 pt-6 md:px-7 md:pt-7">
                    <p className="text-lg font-medium tracking-[-0.01em] text-[var(--fg)]">{p.client}</p>
                    <p className="mt-0.5 text-sm text-[var(--fg-2)]">{p.sector[l]}</p>
                    <p className="mt-8 text-[3.25rem] font-medium leading-none tracking-[-0.045em] text-[var(--accent)] tabular-nums">
                      {p.value[l]}
                    </p>
                    <p className="mt-2 text-[15px] text-[var(--fg-2)]">{p.label[l]}</p>
                    <p className="mt-5 text-sm font-medium text-[var(--accent)]">{more}</p>
                  </div>
                  <div className="mt-6 h-[96px] overflow-hidden rounded-b-2xl">
                    <ProofChart id={id} />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ── Questions fréquentes ────────────────────────────────────────────── */

/** FAQ visible. Le même tableau alimente le JSON-LD FAQPage. */
export function Faq({ title, items }: { title: string; items: readonly FaqItem[] }) {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 lg:gap-x-16">
          <div className="md:col-span-5">
            <h2 className="t-display text-3xl text-[var(--fg)] md:text-5xl">{title}</h2>
          </div>
          <div className="md:col-span-7">
            <ul className="border-t border-[var(--rule)]">
              {items.map((item) => (
                <li key={item.q} className="border-b border-[var(--rule)]">
                  <details className="group">
                    <summary className="flex min-h-[48px] cursor-pointer list-none items-start justify-between gap-6 py-5 text-sm font-medium leading-relaxed text-[var(--fg)] transition-colors hover:text-[var(--accent)] md:text-base">
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
  );
}

/* ── Données structurées ─────────────────────────────────────────────── */

export function faqJsonLd(locale: string, path: string, items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE}/${locale}${path}#faq`,
    inLanguage: loc(locale),
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export const AREA_SERVED = [
  { "@type": "City", name: "Nice" },
  { "@type": "AdministrativeArea", name: "Côte d'Azur" },
  { "@type": "AdministrativeArea", name: "Alpes-Maritimes" },
  { "@type": "Country", name: "France" },
];

export function serviceJsonLd({
  locale,
  path,
  name,
  serviceType,
  description,
}: {
  locale: string;
  path: string;
  name: string;
  serviceType: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/${locale}${path}#service`,
    name,
    serviceType,
    description,
    url: `${BASE}/${locale}${path}`,
    inLanguage: loc(locale),
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${BASE}/${locale}/contact`,
    },
  };
}

/** Métadonnées communes : titre, description, canonique, hreflang. */
export function pageAlternates(locale: string, path: string) {
  return {
    canonical: `/${locale}${path}`,
    languages: { fr: `/fr${path}`, en: `/en${path}`, "x-default": `/fr${path}` },
  };
}
