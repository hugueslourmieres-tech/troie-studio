"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  CheckCircle,
  Copy,
  LockSimple,
  WarningCircle,
  XCircle,
} from "@phosphor-icons/react";
import type {
  AuditFull,
  AuditSummary,
  CategoryId,
  CheckStatus,
  PhaseId,
  StreamEvent,
} from "@/lib/audit/types";
import { BAND_TONES, EASE_OUT_EXPO, ScoreGauge, type GaugeState } from "./ScoreGauge";
import { bandOf } from "@/lib/audit/types";

/**
 * L'audit SEO et GEO gratuit, côté page (26/10/2026).
 *
 * 1. Une adresse, un bouton. ?site=exemple.fr pré-remplit le champ et
 *    lance l'audit tout seul (liens envoyés aux prospects).
 * 2. Pendant le scan, les vraies étapes du serveur se cochent une à une
 *    (flux NDJSON de /api/scan-ia), affichage minimum 1,5 s.
 * 3. Le résultat, sans e-mail : le cadran, les quatre notes, les trois
 *    points à corriger d'abord.
 * 4. Le rapport détaillé et les correctifs pré-écrits, contre l'e-mail
 *    (/api/scan-ia/report).
 * 5. Une seule suite : la page contact. Aucun prix, aucun lien Cal.
 */

const ORDER: PhaseId[] = ["home", "robots", "sitemap", "llms", "markup", "score"];
const MIN_SCAN_MS = 1500;
const TICK_MS = 170;
const EASE = [0.23, 1, 0.32, 1] as const;

const COPY = {
  fr: {
    label: "Adresse de votre site",
    placeholder: "votre-site.fr",
    submit: "Lancer l'audit",
    running: "Audit en cours",
    again: "Relancer",
    phases: {
      home: "Lecture de la page d'accueil",
      robots: "Lecture de robots.txt",
      sitemap: "Recherche du plan du site",
      llms: "Recherche de llms.txt",
      markup: "Analyse des balises et des données structurées",
      score: "Calcul des scores SEO et GEO",
    } as Record<PhaseId, string>,
    doneLine: (n: number, s: string) => `${n} vérifications en ${s} s.`,
    errUrl: "Cette adresse ne ressemble pas à un site public. Exemple : votre-site.fr",
    errUnreachable: "Le site ne répond pas. Vérifiez l'adresse, puis réessayez.",
    errBlocked:
      "Le site refuse les visites automatiques (pare-feu ou protection anti-robots). Écrivez-nous, nous ferons l'audit à la main.",
    errRate: "Vous avez lancé beaucoup d'audits en une heure. Réessayez un peu plus tard.",
    errGeneric: "L'audit n'a pas abouti. Réessayez dans un instant.",
    seoTitle: "Score SEO",
    seoSub: "SEO, visibilité sur Google",
    geoTitle: "Score GEO",
    geoSub: "GEO, visibilité dans les IA",
    geoEngines: "ChatGPT, Gemini, Perplexity, AI Overviews",
    weakest: "À traiter en premier",
    geoKeys: {
      "ai-bots": "Accès des robots IA",
      jsonld: "Données structurées JSON-LD",
      llms: "Fichier llms.txt",
      "no-js": "Contenu lisible sans JavaScript",
      faq: "Questions et réponses",
    } as Record<string, string>,
    idle: "En attente d'une adresse",
    scanning: "Analyse en cours",
    grade: { excellent: "Excellent", bon: "Bon", renforcer: "À renforcer", fragile: "Fragile" },
    scanned: "Audit de",
    srScore: (s: number, g: string, s2: number, g2: string) =>
      `Score SEO : ${s} sur 100, ${g}. Score GEO : ${s2} sur 100, ${g2}.`,
    issuesTitle: "Les trois points à corriger d'abord.",
    issuesNone: "Rien de bloquant. Les points restants relèvent du réglage fin.",
    cats: { technique: "Technique", contenu: "Contenu", ia: "Lisibilité IA", performance: "Performance" } as Record<CategoryId, string>,
    status: { pass: "Validé", warn: "À améliorer", fail: "À corriger" } as Record<CheckStatus, string>,
    lockedTitle: "Le rapport détaillé.",
    lockedBody: (n: number, f: number, host: string) =>
      `${n} vérifications, chacune avec ce que nous avons trouvé, pourquoi ça compte et la correction à faire.${f > 0 ? ` Plus ${f} correctif${f > 1 ? "s" : ""} déjà écrit${f > 1 ? "s" : ""} pour ${host}, prêt${f > 1 ? "s" : ""} à coller.` : ""}`,
    email: "E-mail",
    firstName: "Prénom",
    optional: "facultatif",
    consent:
      "J'accepte de recevoir mon rapport et d'être recontacté par TROIE Studio. Je peux me désinscrire à tout moment.",
    privacy: "Politique de confidentialité",
    unlock: "Recevoir mon rapport",
    unlocking: "Envoi en cours",
    errEmail: "Vérifiez l'adresse e-mail.",
    errConsent: "Cochez la case pour recevoir le rapport.",
    errReport: "Le rapport n'a pas pu être préparé. Réessayez dans un instant.",
    sent: (e: string) => `Le rapport est aussi parti à ${e}.`,
    notSent: "Le rapport est ci-dessous. L'envoi par e-mail n'a pas abouti, gardez cette page ouverte.",
    found: "Constat",
    why: "Pourquoi ça compte",
    todo: "À faire",
    fixesTitle: (host: string) => `Les correctifs prêts pour ${host}.`,
    fixesIntro: "Calculés à partir de votre page. Relisez-les, complétez les champs marqués, puis collez-les.",
    copy: "Copier",
    copied: "Copié",
    ctaTitle: "Faire corriger ces points.",
    ctaBody:
      "Nous corrigeons le site avec vous, puis nous relançons l'audit pour comparer. Décrivez votre projet en deux minutes.",
    ctaButton: "Faire corriger ces points",
    ctaMail: "Ou écrivez à",
  },
  en: {
    label: "Your website address",
    placeholder: "your-site.com",
    submit: "Run the audit",
    running: "Audit running",
    again: "Run again",
    phases: {
      home: "Reading the home page",
      robots: "Reading robots.txt",
      sitemap: "Looking for the sitemap",
      llms: "Looking for llms.txt",
      markup: "Analysing tags and structured data",
      score: "Computing the SEO and GEO scores",
    } as Record<PhaseId, string>,
    doneLine: (n: number, s: string) => `${n} checks in ${s} s.`,
    errUrl: "This does not look like a public website. Example: your-site.com",
    errUnreachable: "The site does not respond. Check the address, then try again.",
    errBlocked:
      "The site refuses automated visits (firewall or bot protection). Write to us and we will run the audit by hand.",
    errRate: "You ran many audits within an hour. Try again a little later.",
    errGeneric: "The audit did not complete. Try again in a moment.",
    seoTitle: "SEO score",
    seoSub: "SEO, visibility on Google",
    geoTitle: "GEO score",
    geoSub: "GEO, visibility in AI engines",
    geoEngines: "ChatGPT, Gemini, Perplexity, AI Overviews",
    weakest: "Fix this first",
    geoKeys: {
      "ai-bots": "AI crawler access",
      jsonld: "JSON-LD structured data",
      llms: "llms.txt file",
      "no-js": "Content readable without JavaScript",
      faq: "Questions and answers",
    } as Record<string, string>,
    idle: "Waiting for an address",
    scanning: "Analysing",
    grade: { excellent: "Excellent", bon: "Good", renforcer: "Needs work", fragile: "Fragile" },
    scanned: "Audit of",
    srScore: (s: number, g: string, s2: number, g2: string) =>
      `SEO score: ${s} out of 100, ${g}. GEO score: ${s2} out of 100, ${g2}.`,
    issuesTitle: "The three points to fix first.",
    issuesNone: "Nothing blocking. What remains is fine tuning.",
    cats: { technique: "Technical", contenu: "Content", ia: "AI readability", performance: "Performance" } as Record<CategoryId, string>,
    status: { pass: "Passed", warn: "To improve", fail: "To fix" } as Record<CheckStatus, string>,
    lockedTitle: "The detailed report.",
    lockedBody: (n: number, f: number, host: string) =>
      `${n} checks, each with what we found, why it matters and the fix to make.${f > 0 ? ` Plus ${f} fix${f > 1 ? "es" : ""} already written for ${host}, ready to paste.` : ""}`,
    email: "Email",
    firstName: "First name",
    optional: "optional",
    consent:
      "I agree to receive my report and to be contacted by TROIE Studio. I can unsubscribe at any time.",
    privacy: "Privacy policy",
    unlock: "Get my report",
    unlocking: "Sending",
    errEmail: "Check the email address.",
    errConsent: "Tick the box to receive the report.",
    errReport: "The report could not be prepared. Try again in a moment.",
    sent: (e: string) => `The report was also sent to ${e}.`,
    notSent: "The report is below. The email could not be sent, keep this page open.",
    found: "Finding",
    why: "Why it matters",
    todo: "To do",
    fixesTitle: (host: string) => `Fixes ready for ${host}.`,
    fixesIntro: "Computed from your page. Review them, complete the marked fields, then paste them.",
    copy: "Copy",
    copied: "Copied",
    ctaTitle: "Get these points fixed.",
    ctaBody: "We fix the site with you, then run the audit again to compare. Describe your project in two minutes.",
    ctaButton: "Get these points fixed",
    ctaMail: "Or write to",
  },
};

const CONTACT_EMAIL = "contact@troiestudio.fr";
const CAT_ORDER: CategoryId[] = ["technique", "contenu", "ia", "performance"];

type Phase = "idle" | "scanning" | "done";

function StatusIcon({ s, size = 18 }: { s: CheckStatus; size?: number }) {
  if (s === "pass") return <CheckCircle size={size} weight="fill" className="shrink-0 text-[#1f9d5a]" aria-hidden="true" />;
  if (s === "warn") return <WarningCircle size={size} weight="fill" className="shrink-0 text-[#e2a614]" aria-hidden="true" />;
  return <XCircle size={size} weight="fill" className="shrink-0 text-[#d6363b]" aria-hidden="true" />;
}

export function SeoAudit({ locale }: { locale: string }) {
  const en = locale === "en";
  const c = en ? COPY.en : COPY.fr;
  const reduce = useReducedMotion();

  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [ticked, setTicked] = useState(0);
  const [summary, setSummary] = useState<AuditSummary | null>(null);
  const [full, setFull] = useState<AuditFull | null>(null);
  const [runId, setRunId] = useState(0);

  const arrived = useRef<Set<PhaseId>>(new Set());
  const pending = useRef<AuditSummary | null>(null);
  const startedAt = useRef(0);
  const lastTick = useRef(0);
  const abort = useRef<AbortController | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const autoRan = useRef(false);

  const run = useCallback(
    async (raw: string) => {
      const value = raw.trim();
      if (!value) return;
      abort.current?.abort();
      const ctrl = new AbortController();
      abort.current = ctrl;
      arrived.current = new Set();
      pending.current = null;
      startedAt.current = performance.now();
      lastTick.current = performance.now();
      setTicked(0);
      setError("");
      setFull(null);
      setSummary(null);
      setPhase("scanning");
      setRunId((n) => n + 1);

      // Sur mobile, le cadran est sous le formulaire : on l'amène à l'écran.
      const panel = panelRef.current;
      if (panel && window.innerWidth < 1024) {
        const r = panel.getBoundingClientRect();
        if (r.top > window.innerHeight * 0.6) {
          window.scrollTo({ top: window.scrollY + r.top - 88, behavior: reduce ? "auto" : "smooth" });
        }
      }

      const fail = (msg: string) => {
        if (ctrl.signal.aborted) return;
        setError(msg);
        setPhase("idle");
      };

      try {
        const res = await fetch("/api/scan-ia", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ url: value, locale }),
          signal: ctrl.signal,
        });
        if (!res.ok || !res.body || !(res.headers.get("content-type") ?? "").includes("ndjson")) {
          const data = (await res.json().catch(() => ({}))) as { error?: string };
          return fail(data.error === "url" ? c.errUrl : data.error === "rate" ? c.errRate : c.errGeneric);
        }
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let buf = "";
        for (;;) {
          const { done, value: chunk } = await reader.read();
          if (done) break;
          buf += dec.decode(chunk, { stream: true });
          let nl: number;
          while ((nl = buf.indexOf("\n")) >= 0) {
            const line = buf.slice(0, nl).trim();
            buf = buf.slice(nl + 1);
            if (!line) continue;
            const ev = JSON.parse(line) as StreamEvent;
            if (ev.type === "phase") arrived.current.add(ev.id);
            else if (ev.type === "result") {
              ORDER.forEach((id) => arrived.current.add(id));
              pending.current = ev.summary;
            } else if (ev.type === "error") {
              return fail(ev.error === "blocked" ? c.errBlocked : ev.error === "unreachable" ? c.errUnreachable : c.errGeneric);
            }
          }
        }
        if (!pending.current) fail(c.errGeneric);
      } catch {
        fail(c.errGeneric);
      }
    },
    [c, locale, reduce],
  );

  /* Les étapes se cochent dans l'ordre, au rythme des vraies réponses. */
  useEffect(() => {
    if (phase !== "scanning") return;
    const id = window.setInterval(() => {
      const now = performance.now();
      setTicked((n) => {
        if (n < ORDER.length) {
          if (arrived.current.has(ORDER[n]) && now - lastTick.current >= TICK_MS) {
            lastTick.current = now;
            return n + 1;
          }
          return n;
        }
        if (pending.current && now - startedAt.current >= MIN_SCAN_MS && now - lastTick.current >= 220) {
          setSummary(pending.current);
          setPhase("done");
        }
        return n;
      });
    }, 50);
    return () => window.clearInterval(id);
  }, [phase, runId]);

  /* ?site=exemple.fr : pré-remplit et lance l'audit (liens prospects). */
  useEffect(() => {
    if (autoRan.current) return;
    autoRan.current = true;
    const site = new URLSearchParams(window.location.search).get("site");
    if (site && site.length < 300) {
      setUrl(site);
      run(site);
    }
  }, [run]);

  useEffect(() => () => abort.current?.abort(), []);

  const busy = phase === "scanning";

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-14 pb-16 md:px-12 md:pt-24 md:pb-24">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Colonne texte : titre, champ, étapes */}
          <div className="lg:col-span-5 lg:pt-6">
            <h1 className="t-display text-[2.6rem] leading-[1.02] tracking-[-0.035em] text-[var(--fg)] text-balance sm:text-6xl lg:text-[3.5rem]">
              {en ? "Free SEO and GEO audit of your website." : "Audit SEO et GEO gratuit de votre site."}
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-[var(--fg-2)]">
              {en
                ? "Enter your site's address. In a few seconds you get two scores out of 100: SEO, how Google reads you, and GEO, how AI engines read you. Then the three points to fix first. Free, no sign-up."
                : "Entrez l'adresse de votre site. En quelques secondes, vous obtenez deux scores sur 100 : le SEO, pour Google, et le GEO, pour les moteurs IA. Puis les trois points à corriger d'abord. Gratuit, sans inscription."}
            </p>

            <form
              className="mt-9"
              onSubmit={(e) => {
                e.preventDefault();
                run(url);
              }}
              noValidate
            >
              <label htmlFor="audit-url" className="block text-sm font-medium text-[var(--fg)]">
                {c.label}
              </label>
              <div className="mt-2.5 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0 sm:rounded-full sm:border sm:border-[var(--rule-strong)] sm:bg-white sm:p-1.5 sm:transition-[border-color,box-shadow] sm:duration-200 sm:focus-within:border-[var(--accent)] sm:focus-within:shadow-[0_0_0_4px_var(--accent-soft)]">
                <input
                  id="audit-url"
                  name="site"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="go"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={c.placeholder}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "audit-error" : undefined}
                  className="h-14 w-full min-w-0 rounded-full border border-[var(--rule-strong)] bg-white px-5 text-[16px] text-[var(--fg)] caret-[var(--accent)] outline-none placeholder:text-[var(--fg-2)]/60 focus-visible:border-[var(--accent)] focus-visible:shadow-[0_0_0_4px_var(--accent-soft)] sm:h-12 sm:flex-1 sm:border-0 sm:bg-transparent sm:pl-4 sm:focus-visible:shadow-none"
                />
                <button
                  type="submit"
                  disabled={busy || !url.trim()}
                  className="group inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-7 text-[15px] font-medium text-white transition-[background-color,transform,opacity] duration-200 hover:bg-[#2a2e37] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:h-12"
                >
                  {busy ? c.running : phase === "done" && summary ? c.again : c.submit}
                  {!busy && (
                    <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  )}
                </button>
              </div>
              <p id="audit-error" role="alert" className="min-h-6 pt-2 text-sm text-[var(--fg)]">
                {error}
              </p>
            </form>

            {/* Étapes réelles du scan */}
            {phase !== "idle" && (
              <ol className="mt-2 space-y-2.5" aria-live="polite">
                {ORDER.map((id, i) => {
                  const done = i < ticked;
                  const active = busy && i === ticked;
                  return (
                    <li
                      key={id}
                      className={`flex items-center gap-3 text-[15px] transition-colors duration-300 ${phase === "done" ? "max-lg:hidden" : ""}`}
                      style={{ color: done || active ? "var(--fg)" : "color-mix(in oklab, var(--fg-2) 70%, transparent)" }}
                    >
                      <span className="relative grid size-5 place-items-center">
                        {done ? (
                          <motion.span
                            initial={reduce ? false : { transform: "scale(0.6)", opacity: 0 }}
                            animate={{ transform: "scale(1)", opacity: 1 }}
                            transition={{ duration: 0.22, ease: EASE }}
                            className="grid size-5 place-items-center rounded-full bg-[var(--accent)] text-white"
                          >
                            <Check size={11} weight="bold" aria-hidden="true" />
                          </motion.span>
                        ) : active ? (
                          <span className="audit-spin size-[18px] rounded-full border-2 border-[var(--accent-soft)] border-t-[var(--accent)]" />
                        ) : (
                          <span className="size-[18px] rounded-full border-[1.5px] border-[var(--rule-strong)]" />
                        )}
                      </span>
                      <span>{c.phases[id]}</span>
                      <span className="sr-only">{done ? " : OK" : ""}</span>
                    </li>
                  );
                })}
                {phase === "done" && summary && (
                  <li className="flex items-center gap-3 pt-1 text-sm text-[var(--fg-2)] tabular-nums lg:pl-8">
                    <span className="grid size-5 place-items-center rounded-full bg-[var(--accent)] text-white lg:hidden">
                      <Check size={11} weight="bold" aria-hidden="true" />
                    </span>
                    {c.doneLine(
                      summary.checks.length,
                      (summary.durationMs / 1000).toLocaleString(en ? "en-GB" : "fr-FR", { maximumFractionDigits: 1 }),
                    )}
                  </li>
                )}
              </ol>
            )}

            {phase === "idle" && (
              <p className="mt-2 max-w-[34rem] text-sm leading-relaxed text-[var(--fg-2)]">
                {en
                  ? "The audit measures how readable your site is for search and AI engines. It does not tell you whether ChatGPT cites you: nobody can measure or guarantee that."
                  : "L'audit mesure la lisibilité de votre site par les moteurs. Il ne dit pas si ChatGPT vous cite : personne ne peut le mesurer ni le garantir."}
              </p>
            )}
          </div>

          {/* Les deux cadrans, posés sur la matière granuleuse du site */}
          <div ref={panelRef} className="scroll-mt-24 lg:col-span-7">
            <div className="grain relative overflow-hidden rounded-[28px] p-3 sm:p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/art/sky.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
              <div className="relative z-[3] rounded-[20px] bg-white/[0.94] px-4 pt-6 pb-5 shadow-[0_1px_2px_rgba(17,19,24,0.05),0_24px_60px_-32px_rgba(17,19,24,0.35)] backdrop-blur-sm sm:px-6 sm:pt-7">
                <div className="flex h-5 items-center justify-center text-[13px] text-[var(--fg-2)]">
                  {summary && (
                    <span className="truncate">
                      {c.scanned} <span className="font-medium text-[var(--fg)]">{summary.host}</span>
                    </span>
                  )}
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-3">
                  <ScoreColumn side="seo" phase={phase} summary={summary} runId={runId} c={c} />
                  <ScoreColumn side="geo" phase={phase} summary={summary} runId={runId} c={c} />
                </div>
                <p className="sr-only" aria-live="polite">
                  {summary ? c.srScore(summary.seoScore, c.grade[summary.seoBand], summary.geoScore, c.grade[summary.geoBand]) : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {phase === "done" && summary && (
        <AuditResult
          key={summary.scanId}
          summary={summary}
          full={full}
          setFull={setFull}
          locale={locale}
          c={c}
        />
      )}
    </>
  );
}

/* ── Une colonne de score : SEO (Google) ou GEO (moteurs IA) ───────── */

const SEO_CATS: CategoryId[] = ["technique", "contenu", "performance"];
const GEO_PRIORITY = ["ai-bots", "jsonld", "llms", "no-js", "faq"];
/** Départs (s) : le cadran SEO, puis le GEO, puis les détails. */
const T = { seo: 0.15, geo: 0.45, rows: 1.0 };

/** Les quatre points IA montrés sous le GEO : d'abord ceux qui posent problème. */
function geoRows(summary: AuditSummary | null) {
  if (!summary) return GEO_PRIORITY.slice(0, 4).map((id) => ({ id, status: null as CheckStatus | null }));
  const list = GEO_PRIORITY.map((id) => summary.checks.find((x) => x.id === id)).filter(Boolean) as AuditSummary["checks"];
  const picked = new Set([...list.filter((x) => x.status !== "pass"), ...list].slice(0, 4).map((x) => x.id));
  return list.filter((x) => picked.has(x.id)).map((x) => ({ id: x.id, status: x.status as CheckStatus | null }));
}

/** Marque de statut : vert validé, jaune à améliorer, rouge à corriger (26/10/2026). */
function StatusMark({ s }: { s: CheckStatus | null }) {
  if (s === "pass")
    return (
      <span className="grid size-[18px] place-items-center rounded-full bg-[#1f9d5a] text-white">
        <Check size={10} weight="bold" aria-hidden="true" />
      </span>
    );
  if (s === "warn")
    return (
      <svg viewBox="0 0 18 18" className="size-[18px]" aria-hidden="true">
        <circle cx="9" cy="9" r="7.75" fill="none" stroke="#e2a614" strokeWidth="1.5" />
        <path d="M9 3.5 A5.5 5.5 0 0 0 9 14.5 Z" fill="#e2a614" />
      </svg>
    );
  if (s === "fail")
    return (
      <svg viewBox="0 0 18 18" className="size-[18px]" aria-hidden="true">
        <circle cx="9" cy="9" r="8" fill="#d6363b" />
        <path d="M5.75 9 H12.25" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  return <span className="size-[18px] rounded-full border-[1.5px] border-[var(--rule-strong)]" aria-hidden="true" />;
}

function ScoreColumn({
  side,
  phase,
  summary,
  runId,
  c,
}: {
  side: "seo" | "geo";
  phase: Phase;
  summary: AuditSummary | null;
  runId: number;
  c: Copy;
}) {
  const reduce = useReducedMotion();
  const done = phase === "done" && !!summary;
  const score = summary ? (side === "seo" ? summary.seoScore : summary.geoScore) : 0;
  const band = summary ? (side === "seo" ? summary.seoBand : summary.geoBand) : "bon";
  const tone = BAND_TONES[band];
  const weak = done && summary.weakest === side;
  const start = T[side];
  const gaugeState: GaugeState = done ? "done" : phase === "scanning" ? "scanning" : "idle";
  const appear = (delay: number) =>
    reduce || !done
      ? { initial: false as const, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, transform: "translateY(4px)" },
          animate: { opacity: 1, transform: "translateY(0px)" },
          transition: { duration: 0.45, delay, ease: EASE },
        };

  return (
    <section
      aria-label={side === "seo" ? c.seoTitle : c.geoTitle}
      className="relative flex flex-col rounded-[16px] px-4 pt-4 pb-5 transition-[background-color,box-shadow] duration-700 sm:px-5"
      style={{
        background: weak ? `color-mix(in oklab, ${tone.to} 8%, white)` : "transparent",
        boxShadow: weak ? `inset 0 0 0 1px color-mix(in oklab, ${tone.to} 30%, transparent)` : "inset 0 0 0 1px transparent",
        transitionDelay: weak && !reduce ? `${T.geo + 1.1}s` : "0s",
      }}
    >
      <header className="md:min-h-[84px]">
        <div className="min-w-0 pr-1">
          <h2 className="text-[15px] font-medium tracking-[-0.01em] text-[var(--fg)]">{side === "seo" ? c.seoTitle : c.geoTitle}</h2>
          <p className="mt-0.5 text-[13px] leading-snug text-[var(--fg-2)]">
            {side === "seo" ? c.seoSub : c.geoSub}
            {side === "geo" && <span className="mt-0.5 block text-[12px] text-balance opacity-75">{c.geoEngines}</span>}
          </p>
        </div>
        {weak && (
          <motion.span
            key={`w-${runId}`}
            initial={reduce ? false : { opacity: 0, transform: "scale(0.94)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            transition={{ duration: 0.35, delay: reduce ? 0 : T.geo + 1.15, ease: EASE }}
            className="absolute -top-2.5 right-4 rounded-full bg-white px-2.5 py-1 text-[11.5px] leading-none font-medium whitespace-nowrap"
            style={{ color: tone.text, boxShadow: `0 0 0 1px color-mix(in oklab, ${tone.to} 35%, transparent), 0 4px 12px -6px color-mix(in oklab, ${tone.to} 45%, transparent)` }}
          >
            {c.weakest}
          </motion.span>
        )}
      </header>

      <div className="mx-auto mt-2 w-full max-w-[236px]">
        <ScoreGauge
          state={gaugeState}
          score={score}
          band={band}
          gradeLabel={summary ? c.grade[band] : ""}
          idleLabel={c.idle}
          scanningLabel={c.scanning}
          delay={start}
        />
      </div>

      {side === "seo" ? (
        <ul className="mt-4 space-y-3.5">
          {SEO_CATS.map((id, i) => {
            const v = done ? (summary.categories.find((x) => x.id === id)?.score ?? 0) : 0;
            const d = T.rows + i * 0.08;
            const ct = BAND_TONES[bandOf(v)];
            return (
              <li key={id}>
                <div className="flex items-baseline justify-between text-[13.5px]">
                  <span className="font-medium text-[var(--fg)]">{c.cats[id]}</span>
                  <motion.span
                    key={`${runId}-${phase}`}
                    {...appear(d + 0.1)}
                    className="font-medium tabular-nums"
                    style={{ color: done ? ct.text : "color-mix(in oklab, var(--fg) 25%, transparent)" }}
                  >
                    {v}
                  </motion.span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--fg)_7%,transparent)]">
                  <motion.div
                    className="h-full w-full origin-left rounded-full"
                    style={{ background: `linear-gradient(90deg, ${ct.from}, ${ct.to})` }}
                    initial={false}
                    animate={{ transform: `scaleX(${v / 100})` }}
                    transition={
                      reduce ? { duration: 0 } : done ? { duration: 1, delay: d, ease: EASE_OUT_EXPO } : { duration: 0.3, ease: EASE }
                    }
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="mt-3 divide-y divide-[var(--rule)]">
          {geoRows(done ? summary : null).map((row, i) => (
            <motion.li
              key={`${runId}-${phase}-${row.id}`}
              {...appear(T.rows + 0.12 + i * 0.07)}
              className="flex items-center gap-3 py-2 text-[13.5px]"
            >
              <StatusMark s={row.status} />
              <span className={`min-w-0 flex-1 ${row.status ? "text-[var(--fg)]" : "text-[var(--fg-2)]"}`}>{c.geoKeys[row.id]}</span>
              {row.status && (
                <span className={`shrink-0 text-[12px] ${row.status === "pass" ? "text-[#1f9d5a]" : row.status === "warn" ? "text-[#b78207]" : "text-[#d6363b]"}`}>
                  {c.status[row.status]}
                </span>
              )}
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ── Résultat : points prioritaires, rapport verrouillé, suite ─────── */

type Copy = typeof COPY.fr;

function AuditResult({
  summary,
  full,
  setFull,
  locale,
  c,
}: {
  summary: AuditSummary;
  full: AuditFull | null;
  setFull: (f: AuditFull) => void;
  locale: string;
  c: Copy;
}) {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, transform: "translateY(12px)" },
          animate: { opacity: 1, transform: "translateY(0px)" },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <>
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-12 lg:gap-16">
          <motion.h2 {...fade(1.3)} className="t-display text-3xl leading-[1.05] tracking-[-0.03em] text-[var(--fg)] text-balance md:text-4xl lg:col-span-5">
            {c.issuesTitle}
          </motion.h2>
          <div className="lg:col-span-7">
            {summary.issues.length === 0 ? (
              <motion.p {...fade(1.4)} className="text-lg text-[var(--fg-2)]">
                {c.issuesNone}
              </motion.p>
            ) : (
              <ol className="border-t border-[var(--rule)]">
                {summary.issues.map((it, i) => (
                  <motion.li
                    key={it.id}
                    {...fade(1.4 + i * 0.08)}
                    className="flex items-start gap-5 border-b border-[var(--rule)] py-5 md:py-6"
                  >
                    <span className="w-6 pt-0.5 text-lg font-medium text-[var(--accent)] tabular-nums">{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-lg font-medium tracking-[-0.015em] text-[var(--fg)] md:text-xl">{it.title}</p>
                      <p className="mt-1 text-sm text-[var(--fg-2)]">
                        {it.cat === "ia" ? "GEO" : "SEO"}, {c.cats[it.cat].toLowerCase()}, {c.status[it.status].toLowerCase()}
                      </p>
                    </div>
                    <StatusIcon s={it.status} size={20} />
                  </motion.li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </section>

      {full ? <FullReport full={full} c={c} /> : <LockedReport summary={summary} setFull={setFull} locale={locale} c={c} />}

      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 md:px-12 md:py-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="t-display text-3xl leading-[1.05] tracking-[-0.03em] text-[var(--fg)] md:text-5xl">{c.ctaTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--fg-2)]">{c.ctaBody}</p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <Link
              href={`/${locale}/contact#projet`}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 text-[15px] font-medium text-white transition-[background-color,transform] duration-200 hover:bg-[#2a2e37] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              {c.ctaButton}
              <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <p className="text-sm text-[var(--fg-2)]">
              {c.ctaMail}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-[var(--fg)] underline decoration-[var(--rule-strong)] underline-offset-4 hover:decoration-[var(--fg)]">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function LockedReport({
  summary,
  setFull,
  locale,
  c,
}: {
  summary: AuditSummary;
  setFull: (f: AuditFull) => void;
  locale: string;
  c: Copy;
}) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setErr(c.errEmail);
    if (!consent) return setErr(c.errConsent);
    setErr("");
    setSending(true);
    try {
      const res = await fetch("/api/scan-ia/report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ scanId: summary.scanId, url: summary.url, email: email.trim(), firstName, consent, locale, website }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; emailSent?: boolean; report?: AuditFull; error?: string };
      if (!data.ok || !data.report) {
        setErr(data.error === "email" ? c.errEmail : data.error === "consent" ? c.errConsent : c.errReport);
        setSending(false);
        return;
      }
      setFull({ ...data.report, emailNote: data.emailSent ? c.sent(email.trim()) : c.notSent });
    } catch {
      setErr(c.errReport);
      setSending(false);
    }
  }

  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="t-display text-3xl leading-[1.05] tracking-[-0.03em] text-[var(--fg)] md:text-4xl">{c.lockedTitle}</h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--fg-2)]">
            {c.lockedBody(summary.checks.length, summary.fixCount, summary.host)}
          </p>

          <form onSubmit={submit} noValidate className="mt-8 rounded-2xl border border-[var(--rule)] bg-white p-5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="report-email" className="block text-sm font-medium text-[var(--fg)]">
                  {c.email}
                </label>
                <input
                  id="report-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 h-12 w-full rounded-xl border border-[var(--rule-strong)] bg-white px-4 text-[16px] text-[var(--fg)] caret-[var(--accent)] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_var(--accent-soft)]"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="report-name" className="block text-sm font-medium text-[var(--fg)]">
                  {c.firstName} <span className="font-normal text-[var(--fg-2)]">({c.optional})</span>
                </label>
                <input
                  id="report-name"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-2 h-12 w-full rounded-xl border border-[var(--rule-strong)] bg-white px-4 text-[16px] text-[var(--fg)] caret-[var(--accent)] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_var(--accent-soft)]"
                />
              </div>
              {/* Pot de miel, invisible pour les humains */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Site web
                  <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </label>
              </div>
            </div>
            <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[var(--fg-2)]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 size-[18px] shrink-0 cursor-pointer rounded accent-[var(--accent)]"
              />
              <span>
                {c.consent}{" "}
                <Link href={`/${locale}/privacy`} className="text-[var(--fg)] underline decoration-[var(--rule-strong)] underline-offset-4 hover:decoration-[var(--fg)]">
                  {c.privacy}
                </Link>
              </span>
            </label>
            <button
              type="submit"
              disabled={sending}
              className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 text-[15px] font-medium text-white transition-[background-color,transform,opacity] duration-200 hover:bg-[#2a2e37] active:scale-[0.97] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:w-auto"
            >
              <LockSimple size={16} weight="bold" aria-hidden="true" />
              {sending ? c.unlocking : c.unlock}
            </button>
            <p role="alert" className="min-h-5 pt-3 text-sm text-[var(--fg)]">
              {err}
            </p>
          </form>
        </div>

        {/* Aperçu verrouillé : les vraies vérifications, le détail flouté */}
        <div className="relative lg:col-span-7" aria-hidden="true">
          <div className="max-h-[560px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
            <ul className="border-t border-[var(--rule)]">
              {summary.checks.slice(0, 9).map((ch, i) => (
                <li key={ch.id} className="flex items-start gap-4 border-b border-[var(--rule)] py-5">
                  <StatusIcon s={ch.status} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-medium text-[var(--fg)]">{ch.title}</p>
                    <div className="mt-2.5 space-y-2 blur-[5px]">
                      <div className="h-2.5 rounded-full bg-[color-mix(in_oklab,var(--fg)_14%,transparent)]" style={{ width: `${88 - ((i * 13) % 30)}%` }} />
                      <div className="h-2.5 rounded-full bg-[color-mix(in_oklab,var(--fg)_10%,transparent)]" style={{ width: `${62 - ((i * 7) % 20)}%` }} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FullReport({ full, c }: { full: AuditFull; c: Copy }) {
  const reduce = useReducedMotion();
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-12 md:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="t-display text-3xl leading-[1.05] tracking-[-0.03em] text-[var(--fg)] md:text-4xl">{c.lockedTitle}</h2>
            {full.emailNote && <p className="mt-5 text-[15px] leading-relaxed text-[var(--fg-2)]">{full.emailNote}</p>}
          </div>
        </div>

        <div className="mt-10 space-y-14">
          {CAT_ORDER.map((cat) => {
            const list = full.details.filter((d) => d.cat === cat);
            const score = full.categories.find((x) => x.id === cat)?.score ?? 0;
            return (
              <div key={cat} className="grid gap-6 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <h3 className="text-xl font-medium tracking-[-0.02em] text-[var(--fg)]">{c.cats[cat]}</h3>
                  <p className="mt-1 text-[28px] font-medium tracking-[-0.03em] text-[var(--accent)] tabular-nums">
                    {score}
                    <span className="text-base font-normal tracking-normal text-[var(--fg-2)]"> / 100</span>
                  </p>
                </div>
                <ul className="border-t border-[var(--rule)] lg:col-span-7">
                  {list.map((d, i) => (
                    <motion.li
                      key={d.id}
                      initial={reduce ? false : { opacity: 0, transform: "translateY(8px)" }}
                      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: Math.min(i, 6) * 0.04, ease: EASE }}
                      className="flex items-start gap-4 border-b border-[var(--rule)] py-5"
                    >
                      <span className="pt-0.5">
                        <StatusIcon s={d.status} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <p className="text-[16px] font-medium text-[var(--fg)]">{d.title}</p>
                          <span className="text-xs font-medium text-[var(--fg-2)]">{c.status[d.status]}</span>
                        </div>
                        <p className="mt-1.5 text-[15px] leading-relaxed break-words text-[var(--fg-2)]">{d.found}</p>
                        {d.status !== "pass" && (
                          <>
                            <p className="mt-3 text-[15px] leading-relaxed text-[var(--fg-2)]">{d.why}</p>
                            <p className="mt-3 text-[15px] leading-relaxed text-[var(--fg)]">
                              <span className="font-medium">{c.todo} : </span>
                              {d.fix}
                            </p>
                          </>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {full.fixes.length > 0 && (
          <div className="mt-20 grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="t-display text-3xl leading-[1.05] tracking-[-0.03em] text-[var(--fg)] text-balance md:text-4xl">
                {c.fixesTitle(full.host)}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--fg-2)]">{c.fixesIntro}</p>
            </div>
            <div className="space-y-6 lg:col-span-7">
              {full.fixes.map((f) => (
                <FixBlock key={f.id} fix={f} c={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FixBlock({ fix, c }: { fix: AuditFull["fixes"][number]; c: Copy }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--rule)] bg-white">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium tracking-[-0.015em] text-[var(--fg)]">{fix.title}</h3>
            {fix.file && <p className="mt-0.5 font-mono text-xs text-[var(--fg-2)]">{fix.file}</p>}
          </div>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(fix.code);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1600);
              } catch {
                /* presse-papiers indisponible : le code reste sélectionnable */
              }
            }}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-[var(--rule-strong)] px-3.5 text-[13px] font-medium text-[var(--fg)] transition-[border-color,transform] duration-200 hover:border-[var(--fg)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {copied ? <Check size={14} weight="bold" aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
            <span aria-live="polite">{copied ? c.copied : c.copy}</span>
          </button>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--fg-2)]">{fix.intro}</p>
      </div>
      <pre className="max-h-[420px] overflow-auto border-t border-[var(--rule)] bg-[var(--bg-2)] px-5 py-4 font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap break-words text-[var(--fg)] sm:px-6">
        <code>{fix.code}</code>
      </pre>
    </div>
  );
}
