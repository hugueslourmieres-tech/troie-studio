"use client";

import { useState } from "react";

/**
 * Le scan de visibilité : formulaire + rapport à deux notes, SEO et GEO.
 *
 * Les deux notes sortent des mêmes vérifications, pondérées côté serveur
 * (l'identité et le contenu citable pèsent en GEO, les fondamentaux en
 * SEO). Le verdict textuel suit la note GEO : c'est elle que la page vend.
 * Sous les anneaux, les trois corrections prioritaires (premiers échecs
 * des catégories les plus lourdes) avant le détail complet.
 *
 * Tout est affiché sans inscription : la conversion se joue sur le bloc
 * audit à 890 €, pas sur une barrière à l'email.
 *
 * Registre honnête, non négociable : on mesure la lisibilité par les
 * moteurs, on ne promet jamais une position ni une citation.
 */

type Status = "pass" | "warn" | "fail";
type Item = { label: string; status: Status; detail: string };
type Category = { id: string; label: string; points: number; max: number; items: Item[] };
type Report = {
  ok: boolean;
  url?: string;
  score?: number;
  seoScore?: number;
  geoScore?: number;
  categories?: Category[];
  error?: string;
};

const CAL_URL = "https://cal.com/troiestudio/30min";

const COPY = {
  fr: {
    placeholder: "votre-site.fr",
    submit: "Scanner",
    scanning: "Analyse en cours, quelques secondes…",
    errUrl: "Cette adresse ne ressemble pas à un site public. Exemple : votre-site.fr",
    errUnreachable:
      "Le site ne répond pas ou refuse la connexion. Vérifiez l'adresse, ou réessayez dans un instant.",
    errRate: "Limite atteinte : 10 scans par heure. Revenez un peu plus tard.",
    errGeneric: "Le scan a échoué. Réessayez dans un instant.",
    seoLabel: "Note SEO",
    seoSub: "Google, Bing",
    geoLabel: "Note GEO",
    geoSub: "ChatGPT, Perplexity, résumés IA",
    gradeHigh: "Prêt à être cité par les moteurs IA",
    gradeMid: "Lisible, mais peu citable",
    gradeLow: "Les moteurs IA vous survolent",
    gradeZero: "Quasi invisible pour les moteurs IA",
    scannedPrefix: "Analyse de",
    prioTitle: "Les corrections prioritaires",
    prioNone: "Rien de bloquant : les points restants sont du perfectionnement.",
    detailTitle: "Le détail des vérifications",
    ctaTitle: "On corrige tout ça en une semaine.",
    ctaBody:
      "L'audit-fix reprend chaque point en échec ci-dessus et le corrige : balisage Schema.org, llms.txt, restructuration des contenus, coordonnées, puis un rapport daté qui prouve le travail. Prix fixe, livrables définis.",
    ctaPrice: "890 €",
    ctaPriceNote: "prix fixe, déductible pour votre entreprise",
    ctaBook: "Réserver 30 minutes, gratuitement",
    honesty:
      "Ce scan mesure la lisibilité de votre site par les moteurs de recherche et les moteurs IA (ChatGPT, Perplexity, résumés IA de Google). Personne ne peut garantir une position ni une citation, et ceux qui le promettent vous trompent. Ce que ce rapport liste, en revanche, se corrige et se vérifie.",
  },
  en: {
    placeholder: "your-site.com",
    submit: "Scan",
    scanning: "Analysing, a few seconds…",
    errUrl: "This does not look like a public website. Example: your-site.com",
    errUnreachable:
      "The site does not respond or refuses the connection. Check the address and try again.",
    errRate: "Limit reached: 10 scans per hour. Come back a little later.",
    errGeneric: "The scan failed. Try again in a moment.",
    seoLabel: "SEO score",
    seoSub: "Google, Bing",
    geoLabel: "GEO score",
    geoSub: "ChatGPT, Perplexity, AI Overviews",
    gradeHigh: "Ready to be cited by AI engines",
    gradeMid: "Readable, but hardly citable",
    gradeLow: "AI engines skim past you",
    gradeZero: "Nearly invisible to AI engines",
    scannedPrefix: "Analysis of",
    prioTitle: "Priority fixes",
    prioNone: "Nothing blocking: what remains is refinement.",
    detailTitle: "Every check in detail",
    ctaTitle: "We fix all of it in a week.",
    ctaBody:
      "The audit-fix takes every failing check above and corrects it: Schema.org markup, llms.txt, content restructuring, contact signals, then a dated report that proves the work. Fixed price, defined deliverables.",
    ctaPrice: "€890",
    ctaPriceNote: "fixed price, tax-deductible for your company",
    ctaBook: "Book 30 minutes, free",
    honesty:
      "This scan measures how readable your site is for search engines and AI engines (ChatGPT, Perplexity, Google AI Overviews). Nobody can guarantee a ranking or a citation, and anyone promising that is misleading you. What this report lists, however, can be fixed and verified.",
  },
} as const;

function grade(score: number, c: (typeof COPY)[keyof typeof COPY]) {
  if (score >= 75) return c.gradeHigh;
  if (score >= 50) return c.gradeMid;
  if (score >= 30) return c.gradeLow;
  return c.gradeZero;
}

const DOT: Record<Status, string> = {
  pass: "bg-[#2f6b4f]",
  warn: "bg-[#b8860b]",
  fail: "bg-[#b3402e]",
};

/** Anneau de note : le trait change de teinte selon le niveau. */
function Ring({
  value,
  label,
  sub,
}: {
  value: number;
  label: string;
  sub: string;
}) {
  const r = 54;
  const ring = 2 * Math.PI * r;
  const tone = value >= 75 ? "#2f6b4f" : value >= 50 ? "#b8860b" : "#b3402e";
  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="132" height="132" viewBox="0 0 132 132" role="img" aria-label={`${label} : ${value}/100`}>
        <circle cx="66" cy="66" r={r} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="9" />
        <circle
          cx="66" cy="66" r={r} fill="none"
          stroke={tone} strokeWidth="9" strokeLinecap="round"
          strokeDasharray={`${(ring * value) / 100} ${ring}`}
          transform="rotate(-90 66 66)"
        />
        <text x="66" y="62" textAnchor="middle" fill="currentColor"
          style={{ font: "600 32px ui-monospace, monospace", fontVariantNumeric: "tabular-nums" }}>
          {value}
        </text>
        <text x="66" y="82" textAnchor="middle" fill="currentColor" fillOpacity="0.55"
          style={{ font: "10px ui-monospace, monospace", letterSpacing: "0.08em" }}>
          / 100
        </text>
      </svg>
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em]">{label}</p>
        <p className="mt-0.5 text-[11px] text-[var(--fg-2)]/60">{sub}</p>
      </div>
    </div>
  );
}

export function ScanIa({ locale }: { locale: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<Report | null>(null);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !value.trim()) return;
    setBusy(true);
    setError("");
    setReport(null);
    try {
      const res = await fetch("/api/scan-ia", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: value }),
      });
      if (res.status === 429) {
        setError(c.errRate);
        return;
      }
      const data: Report = await res.json();
      if (!data.ok) {
        setError(
          data.error === "url" ? c.errUrl
            : data.error === "unreachable" ? c.errUnreachable
            : c.errGeneric,
        );
        return;
      }
      setReport(data);
    } catch {
      setError(c.errGeneric);
    } finally {
      setBusy(false);
    }
  }

  const geo = report?.geoScore ?? report?.score ?? 0;
  const seo = report?.seoScore ?? report?.score ?? 0;

  /* Les 3 corrections prioritaires : premiers échecs des catégories les
     plus décisives (identité, citable), puis le reste. */
  const priorities = (() => {
    if (!report?.categories) return [] as Item[];
    const order = ["identite", "citable", "fondamentaux", "contenu", "acces"];
    const sorted = [...report.categories].sort(
      (a, b) => order.indexOf(a.id) - order.indexOf(b.id),
    );
    const fails: Item[] = [];
    for (const cat of sorted) {
      for (const it of cat.items) {
        if (it.status === "fail") fails.push(it);
        if (fails.length >= 3) return fails;
      }
    }
    return fails;
  })();

  return (
    <div>
      {/* Formulaire */}
      <form onSubmit={run} className="flex max-w-xl flex-col gap-3 sm:flex-row">
        <input
          type="text"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={c.placeholder}
          aria-label="URL"
          className="min-w-0 flex-1 rounded-full border border-[var(--fg)]/25 bg-transparent px-6 py-4 font-mono text-sm outline-none transition placeholder:text-[var(--fg-2)]/40 focus:border-[var(--accent)]"
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-[var(--ink)] px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#f5f0e6] transition hover:opacity-90 disabled:opacity-50"
        >
          {busy ? "…" : c.submit}
        </button>
      </form>

      {busy && (
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-2)]/70" role="status">
          {c.scanning}
        </p>
      )}
      {error && (
        <p className="mt-6 max-w-xl border-l-2 border-[#b3402e] pl-4 text-[15px] text-[var(--fg-2)]" role="alert">
          {error}
        </p>
      )}

      {/* Rapport */}
      {report?.ok && report.categories && (
        <div className="mt-14">
          {/* Verdict : deux anneaux + phrase */}
          <div className="rounded-2xl border border-[var(--fg)]/12 bg-[var(--bg-2)]/40 p-8 md:p-10">
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              <Ring value={seo} label={c.seoLabel} sub={c.seoSub} />
              <Ring value={geo} label={c.geoLabel} sub={c.geoSub} />
              <div className="max-w-sm text-center md:text-left">
                <p className="t-display text-2xl leading-tight md:text-3xl">{grade(geo, c)}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg-2)]/60">
                  {c.scannedPrefix} {report.url?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </p>
              </div>
            </div>
          </div>

          {/* Priorités */}
          <div className="mt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--fg-2)]/60">
              {c.prioTitle}
            </p>
            {priorities.length > 0 ? (
              <ol className="mt-4 flex flex-col gap-3">
                {priorities.map((it, i) => (
                  <li
                    key={it.label}
                    className="flex gap-4 rounded-xl border border-[#b3402e]/25 bg-[#b3402e]/[0.04] p-4"
                  >
                    <span className="font-mono text-sm text-[#b3402e] tabular-nums">{i + 1}</span>
                    <div className="text-[14.5px] leading-snug">
                      <span className="font-semibold">{it.label}</span>
                      <span className="block text-[13px] text-[var(--fg-2)]">{it.detail}</span>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-4 text-[15px] text-[var(--fg-2)]">{c.prioNone}</p>
            )}
          </div>

          {/* Détail */}
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--fg-2)]/60">
            {c.detailTitle}
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {report.categories.map((cat) => (
              <section key={cat.id} className="rounded-2xl border border-[var(--fg)]/12 p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold">{cat.label}</h3>
                  <span className="font-mono text-sm tabular-nums text-[var(--fg-2)]">
                    {cat.points}/{cat.max}
                  </span>
                </div>
                <ul className="mt-4 flex flex-col gap-3">
                  {cat.items.map((item) => (
                    <li key={item.label} className="flex gap-3">
                      <span aria-hidden="true" className={`mt-[7px] h-2 w-2 flex-none rounded-full ${DOT[item.status]}`} />
                      <div className="text-[14px] leading-snug">
                        <span className="font-medium">{item.label}</span>
                        <span className="block text-[13px] text-[var(--fg-2)]">{item.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* CTA audit */}
          <div className="mt-10 rounded-2xl border border-[var(--accent)] bg-[var(--accent)]/5 p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="t-display text-2xl md:text-3xl">{c.ctaTitle}</h3>
              <p className="font-mono text-2xl font-semibold tabular-nums">
                {c.ctaPrice}
                <span className="ml-2 align-middle font-sans text-[12px] font-normal text-[var(--fg-2)]">{c.ctaPriceNote}</span>
              </p>
            </div>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--fg-2)]">{c.ctaBody}</p>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-6 inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#f5f0e6] transition hover:opacity-90"
            >
              {c.ctaBook}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </a>
          </div>

          <p className="mt-8 max-w-2xl border-l-2 border-[var(--fg)]/15 pl-5 text-[13px] leading-relaxed text-[var(--fg-2)]/75">
            {c.honesty}
          </p>
        </div>
      )}
    </div>
  );
}
