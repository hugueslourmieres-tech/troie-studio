import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Briques partagées des articles « acheteurs » (25/10/2026) : encadré
 * « En bref », tableau sourcé, FAQ avec son JSON-LD FAQPage, signature de
 * l'auteur et liste des sources datées. La classe blog-prose ne style pas
 * les tableaux, d'où les classes posées ici. ZÉRO em-dash.
 */

/** Lien externe vers une source. */
export function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener">
      {children}
    </a>
  );
}

/** Signature de l'auteur, en tête d'article. */
export function Byline({ checked }: { checked: string }) {
  return (
    <p className="text-sm text-[var(--fg-2)]/75">
      Par <Link href="/fr/hugues">Hugues Lourmieres</Link>, fondateur de TROIE
      Studio, agence web à Nice. Chiffres vérifiés le {checked}.
    </p>
  );
}

/** Encadré de synthèse. */
export function Brief({ items }: { items: ReactNode[] }) {
  return (
    <div className="my-9 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-7">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
        En bref
      </p>
      <ul className="mt-4">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

/** Tableau lisible sur mobile (défilement horizontal si besoin). */
export function DataTable({
  caption,
  head,
  rows,
  source,
}: {
  caption: string;
  head: string[];
  rows: ReactNode[][];
  source?: ReactNode;
}) {
  return (
    <figure>
      <div className="overflow-x-auto rounded-sm border border-[var(--rule)]">
        <table className="w-full min-w-[520px] border-collapse text-left text-[0.95rem] leading-snug">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-[var(--bg-2)]">
            <tr>
              {head.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="border-b border-[var(--rule)] px-4 py-3 font-semibold text-[var(--fg)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-[var(--rule)] last:border-b-0">
                {r.map((c, j) => (
                  <td key={j} className="px-4 py-3 align-top text-[var(--fg-2)]">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption>
        {caption}
        {source ? <> Source : {source}</> : null}
      </figcaption>
    </figure>
  );
}

export type QA = { q: string; a: string };

/** FAQ visible et son balisage FAQPage. */
export function Faq({ items }: { items: QA[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2>Questions fréquentes</h2>
      {items.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
    </>
  );
}

export type Src = { label: string; url: string; seen: string };

/** Sources numérotées, avec date de consultation. */
export function Sources({ items }: { items: Src[] }) {
  return (
    <>
      <h2>Sources</h2>
      <ol className="text-[0.95rem]">
        {items.map((s) => (
          <li key={s.url}>
            <Ext href={s.url}>{s.label}</Ext>, consulté le {s.seen}.
          </li>
        ))}
      </ol>
    </>
  );
}
