import { clientColor } from "@/lib/client-colors";
import Link from "next/link";
import { ContactCTA } from "./ContactCTA";
import { JsonLd, ORG_ID } from "./JsonLd";
import {
  Actions,
  ArrowLink,
  BASE,
  Block,
  Body,
  PROOFS,
  ProofChart,
  loc,
  type ProofId,
} from "./SeoBlocks";

/**
 * Gabarit des études de cas (23/10/2026). Uniquement des faits déjà
 * publiés sur le site (src/lib/results.ts, HomeResults, ProofCase,
 * WebProjects, videos.ts). Un seul chiffre par étude, celui de PROOFS.
 */

export type CaseCopy = {
  metaTitle: string;
  metaDesc: string;
  title: string;
  intro: string;
  sections: { title: string; paragraphs: readonly string[] }[];
  sourceTitle: string;
  source: string;
  related: readonly { href: string; label: string }[];
};

export const CASES_PATH = "/etudes-de-cas";

export function caseJsonLd({
  locale,
  id,
  copy,
  extra = {},
}: {
  locale: string;
  id: ProofId;
  copy: CaseCopy;
  extra?: Record<string, unknown>;
}) {
  const p = PROOFS[id];
  const url = `${BASE}/${locale}${CASES_PATH}/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: copy.title,
    description: copy.metaDesc,
    url,
    mainEntityOfPage: url,
    inLanguage: loc(locale),
    datePublished: "2026-10-23",
    dateModified: "2026-10-23",
    image: `${BASE}/images/brand/og-image.png`,
    author: { "@id": "https://troiestudio.fr/#hugues" },
    publisher: { "@id": ORG_ID },
    about: { "@type": "Organization", name: p.client },
    genre: loc(locale) === "en" ? "Case study" : "Étude de cas",
    ...extra,
  };
}

export function CaseStudy({
  locale,
  id,
  copy,
  media,
  jsonLd,
}: {
  locale: string;
  id: ProofId;
  copy: CaseCopy;
  media?: React.ReactNode;
  jsonLd: Record<string, unknown>;
}) {
  const l = loc(locale);
  const p = PROOFS[id];
  const en = l === "en";

  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]" style={{ "--accent": clientColor(id) } as React.CSSProperties}>
      <JsonLd data={jsonLd} />
      <div aria-hidden="true" className="h-16 md:h-20" />

      <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 md:px-12 md:pt-24 md:pb-28">
        <Link
          href={`/${locale}${CASES_PATH}`}
          className="inline-flex min-h-12 items-center text-sm font-medium text-[var(--fg-2)] transition-colors hover:text-[var(--accent)]"
        >
          {en ? "Case studies" : "Études de cas"}
        </Link>
        <div className="mt-4 grid gap-12 md:grid-cols-12 md:items-end md:gap-16">
          <div className="md:col-span-7">
            <p className="text-sm font-medium text-[var(--fg-2)]">
              {p.client}, {p.sector[l]}
            </p>
            <h1 className="t-display mt-4 text-4xl leading-[1.05] text-[var(--fg)] md:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]">{copy.intro}</p>
          </div>
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-[var(--rule)] bg-white">
              <div className="px-6 pt-6 md:px-7 md:pt-7">
                <p className="text-[3.75rem] font-medium leading-none tracking-[-0.045em] text-[var(--accent)] tabular-nums md:text-[4.5rem]">
                  {p.value[l]}
                </p>
                <p className="mt-2 text-[15px] text-[var(--fg-2)]">{p.label[l]}</p>
              </div>
              <div className="mt-6 h-[96px]">
                <ProofChart id={id} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {media}

      {copy.sections.map((s) => (
        <Block key={s.title} title={s.title}>
          {s.paragraphs.map((t) => (
            <Body key={t}>{t}</Body>
          ))}
        </Block>
      ))}

      <Block title={copy.sourceTitle}>
        <Body>{copy.source}</Body>
      </Block>

      <Block title={en ? "Want the same for your business?" : "Le même travail pour vous ?"}>
        <Body>
          {en
            ? "Thirty minutes to understand where you stand and what you aim for. Then we send you a written proposal and a quote."
            : "Trente minutes pour comprendre où vous en êtes et ce que vous visez. Ensuite, nous vous envoyons une proposition écrite et un devis."}
        </Body>
        <div className="mt-6 flex flex-col items-start gap-1">
          {copy.related.map((r) => (
            <ArrowLink key={r.href} href={`/${locale}/${r.href}`}>
              {r.label}
            </ArrowLink>
          ))}
        </div>
        <Actions locale={locale} />
      </Block>

      <div className="tone-accent bg-[var(--bg)] text-[var(--fg)]">
        <ContactCTA locale={locale} />
      </div>
    </div>
  );
}
