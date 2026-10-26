"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useInView } from "motion/react";
import {
  ArrowRight,
  ChatCircleText,
  CheckCircle,
  MagnifyingGlass,
  MapPin,
} from "@phosphor-icons/react";
import { ScoreGauge } from "@/components/audit/ScoreGauge";

/**
 * Bloc d'accueil « Où en est votre site ? » (26/10/2026, demande de Hugues).
 *
 * Deux onglets :
 *   1. J'ai un site : un champ, un bouton. Le formulaire est un vrai GET vers
 *      /{locale}/audit-seo-gratuit?site=..., qui lance l'audit tout seul
 *      (marche aussi sans JavaScript). À côté, les deux cadrans du scanner
 *      dans leur état final, avec des valeurs d'exemple annoncées comme telles.
 *   2. Je n'ai pas de site : entreprise, ville, e-mail, consentement. POST
 *      vers /api/presence, Hugues répond à la main sous 48 h.
 *
 * Un seul mouvement : les cadrans balaient une fois quand le bloc entre à
 * l'écran (ScoreGauge gère les animations réduites : état final immédiat).
 * Le cadre granuleux garde une hauteur fixe d'un onglet à l'autre (desktop) :
 * les deux contenus sont empilés dans la même cellule et se relaient en
 * fondu. Sous 1024 px, seul le contenu actif reste, et le cadre disparaît
 * sur l'onglet 2 (le texte du formulaire dit déjà ce que Hugues regarde).
 */

type Tab = "site" | "presence";

const COPY = {
  fr: {
    title: "Où en est votre site ?",
    sub: "Deux scores gratuits en quelques secondes : le SEO pour Google, le GEO pour les assistants IA.",
    tabsLabel: "Choisir votre situation",
    tabSite: "J'ai un site",
    tabPresence: "Je n'ai pas de site",
    siteLabel: "Adresse de votre site",
    sitePlaceholder: "votre-site.fr",
    siteSubmit: "Lancer l'audit",
    siteEmpty: "Entrez l'adresse de votre site. Exemple : votre-site.fr",
    siteNote: "Gratuit, sans inscription. Le résultat s'affiche tout de suite.",
    full: "Voir l'audit complet",
    presenceIntro:
      "Pas de site, ou pas sûr du vôtre ? Nous regardons votre fiche Google, votre position sur votre recherche principale et ce que répondent ChatGPT et Gemini. Hugues vous envoie l'analyse par e-mail sous 48 h.",
    company: "Nom de votre entreprise",
    city: "Ville",
    email: "Votre e-mail",
    consent:
      "J'accepte de recevoir mon rapport et d'être recontacté par TROIE Studio. Je peux me désinscrire à tout moment.",
    privacy: "Politique de confidentialité",
    presenceSubmit: "Demander l'analyse",
    sending: "Envoi en cours",
    errFields: "Indiquez le nom de votre entreprise et votre ville.",
    errEmail: "Vérifiez votre adresse e-mail.",
    errConsent: "Cochez la case pour que nous puissions vous répondre.",
    errRate: "Plusieurs demandes viennent d'être envoyées. Réessayez dans une heure.",
    errGeneric: "L'envoi n'a pas abouti. Réessayez dans un instant.",
    doneTitle: "C'est noté.",
    doneBody: (email: string) =>
      `Hugues vous envoie l'analyse sous 48 h à ${email}. Un e-mail de confirmation vient de partir.`,
    example: "Exemple de résultat",
    seo: "SEO",
    seoSub: "Google",
    geo: "GEO",
    geoSub: "ChatGPT, Gemini",
    gradeSeo: "Bon",
    gradeGeo: "Fragile",
    idle: "Exemple",
    checksTitle: "Ce que Hugues regarde",
    checks: [
      { k: "map", t: "Votre fiche Google", d: "Présente, complète, avec des avis à jour." },
      { k: "search", t: "Votre recherche principale", d: "Votre place quand un client cherche votre métier dans votre ville." },
      { k: "chat", t: "ChatGPT et Gemini", d: "Ce qu'ils répondent quand on leur demande qui choisir." },
    ],
    checksFoot: "Analyse faite à la main, envoyée par e-mail sous 48 h.",
  },
  en: {
    title: "Where does your site stand?",
    sub: "Two free scores in seconds: SEO for Google, GEO for AI assistants.",
    tabsLabel: "Choose your situation",
    tabSite: "I have a website",
    tabPresence: "I don't have a website",
    siteLabel: "Your website address",
    sitePlaceholder: "your-site.com",
    siteSubmit: "Run the audit",
    siteEmpty: "Enter your website address. Example: your-site.com",
    siteNote: "Free, no sign-up. The result shows right away.",
    full: "See the full audit",
    presenceIntro:
      "No website, or not sure about yours? We look at your Google Business Profile, where you rank on your main search, and what ChatGPT and Gemini say about you. Hugues sends you the analysis by email within 48 hours.",
    company: "Company name",
    city: "City",
    email: "Your email",
    consent:
      "I agree to receive my report and to be contacted by TROIE Studio. I can unsubscribe at any time.",
    privacy: "Privacy policy",
    presenceSubmit: "Request the analysis",
    sending: "Sending",
    errFields: "Please enter your company name and your city.",
    errEmail: "Please check your email address.",
    errConsent: "Tick the box so we can reply to you.",
    errRate: "Several requests were just sent. Please try again in an hour.",
    errGeneric: "Sending failed. Please try again in a moment.",
    doneTitle: "Got it.",
    doneBody: (email: string) =>
      `Hugues will send you the analysis within 48 hours at ${email}. A confirmation email is on its way.`,
    example: "Example result",
    seo: "SEO",
    seoSub: "Google",
    geo: "GEO",
    geoSub: "ChatGPT, Gemini",
    gradeSeo: "Good",
    gradeGeo: "Weak",
    idle: "Example",
    checksTitle: "What Hugues looks at",
    checks: [
      { k: "map", t: "Your Google Business Profile", d: "Present, complete, with recent reviews." },
      { k: "search", t: "Your main search", d: "Where you rank when a customer looks for your trade in your city." },
      { k: "chat", t: "ChatGPT and Gemini", d: "What they answer when someone asks who to choose." },
    ],
    checksFoot: "Analysis done by hand, sent by email within 48 hours.",
  },
} as const;

type Copy = (typeof COPY)["fr"] | (typeof COPY)["en"];

const ICONS = { map: MapPin, search: MagnifyingGlass, chat: ChatCircleText } as const;

const INPUT =
  "mt-2 h-12 w-full rounded-xl border border-[var(--rule-strong)] bg-white px-4 text-[16px] text-[var(--fg)] caret-[var(--accent)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--fg-2)]/60 focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_var(--accent-soft)]";

const PRIMARY =
  "group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 text-[15px] font-medium text-white transition-[background-color,transform,opacity] duration-200 hover:bg-[#2a2e37] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

export function HomeAuditTeaser({ locale }: { locale: string }) {
  const en = locale === "en";
  const c: Copy = COPY[en ? "en" : "fr"];
  const [tab, setTab] = useState<Tab>("site");
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ site: null, presence: null });
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, { once: true, margin: "0px 0px -20% 0px" });

  const tabs: { id: Tab; label: string }[] = [
    { id: "site", label: c.tabSite },
    { id: "presence", label: c.tabPresence },
  ];

  // Flèches, Début, Fin : navigation clavier du tablist (activation automatique).
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const i = tabs.findIndex((t) => t.id === tab);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    const id = tabs[next].id;
    setTab(id);
    tabRefs.current[id]?.focus();
  };

  return (
    <section id="audit" className="scroll-mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 py-20 md:px-12 md:py-28 lg:grid-cols-12 lg:gap-12">
        {/* Texte, onglets, formulaires */}
        <div className="lg:col-span-5">
          <h2 className="t-display text-4xl text-[var(--fg)] text-balance md:text-5xl">{c.title}</h2>
          <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-[var(--fg-2)] text-pretty">{c.sub}</p>

          <div
            role="tablist"
            aria-label={c.tabsLabel}
            className="relative mt-9 grid grid-cols-2 rounded-full bg-[var(--bg-2)] p-1"
          >
            {/* Pastille blanche qui glisse sous l'onglet actif */}
            <span
              aria-hidden="true"
              className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_1px_2px_rgba(17,19,24,0.08),0_4px_12px_-6px_rgba(17,19,24,0.18)] transition-transform duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
              style={{ transform: tab === "site" ? "translateX(0)" : "translateX(100%)" }}
            />
            {tabs.map((t) => {
              const selected = tab === t.id;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[t.id] = el;
                  }}
                  id={`audit-tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`audit-panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  onKeyDown={onTabKey}
                  className={`relative z-[1] min-h-11 rounded-full px-3 text-[14px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:text-[15px] ${
                    selected ? "text-[var(--fg)]" : "text-[var(--fg-2)] hover:text-[var(--fg)]"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <div
            id="audit-panel-site"
            role="tabpanel"
            aria-labelledby="audit-tab-site"
            hidden={tab !== "site"}
            className="mt-8"
          >
            <SiteForm locale={locale} c={c} />
          </div>
          <div
            id="audit-panel-presence"
            role="tabpanel"
            aria-labelledby="audit-tab-presence"
            hidden={tab !== "presence"}
            className="mt-8"
          >
            <PresenceForm locale={locale} c={c} />
          </div>
        </div>

        {/* Le cadre granuleux du scanner : exemple de résultat, ou ce que Hugues regarde */}
        <div
          ref={frameRef}
          className={`lg:col-span-7 lg:pt-2 ${tab === "presence" ? "max-lg:hidden" : ""}`}
          aria-hidden="true"
        >
          <div className="grain relative overflow-hidden rounded-[28px] p-3 sm:p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/art/sky.jpg"
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative z-[3] grid rounded-[20px] bg-white/[0.94] shadow-[0_1px_2px_rgba(17,19,24,0.05),0_24px_60px_-32px_rgba(17,19,24,0.35)] backdrop-blur-sm">
              {/* Les deux contenus partagent la même cellule : hauteur stable. */}
              <div
                className={`col-start-1 row-start-1 flex flex-col justify-center px-4 pt-5 pb-5 transition-[opacity,filter] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] sm:px-6 sm:pt-6 ${
                  tab === "site" ? "opacity-100" : "pointer-events-none opacity-0 blur-[2px] max-lg:hidden"
                }`}
              >
                <div className="flex items-center justify-center">
                  <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[12px] font-medium text-[var(--accent)]">
                    {c.example}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                  <ExampleGauge
                    name={c.seo}
                    sub={c.seoSub}
                    score={81}
                    band="bon"
                    grade={c.gradeSeo}
                    idle={c.idle}
                    run={inView}
                    delay={0.15}
                  />
                  <ExampleGauge
                    name={c.geo}
                    sub={c.geoSub}
                    score={48}
                    band="fragile"
                    grade={c.gradeGeo}
                    idle={c.idle}
                    run={inView}
                    delay={0.45}
                  />
                </div>
              </div>

              <div
                className={`col-start-1 row-start-1 flex flex-col justify-center px-6 py-7 transition-[opacity,filter] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] sm:px-10 ${
                  tab === "presence" ? "opacity-100" : "pointer-events-none opacity-0 blur-[2px] max-lg:hidden"
                }`}
              >
                <p className="text-[13px] font-medium text-[var(--fg-2)]">{c.checksTitle}</p>
                <ul className="mt-3">
                  {c.checks.map((it) => {
                    const Icon = ICONS[it.k];
                    return (
                      <li key={it.k} className="flex items-start gap-4 border-b border-[var(--rule)] py-4 last:border-b-0">
                        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                          <Icon size={18} weight="regular" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[16px] font-medium tracking-[-0.01em] text-[var(--fg)]">{it.t}</span>
                          <span className="mt-1 block text-[14px] leading-relaxed text-[var(--fg-2)]">{it.d}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-3 text-[13px] text-[var(--fg-2)]">{c.checksFoot}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Un cadran d'exemple ────────────────────────────────────────── */

function ExampleGauge({
  name,
  sub,
  score,
  band,
  grade,
  idle,
  run,
  delay,
}: {
  name: string;
  sub: string;
  score: number;
  band: "bon" | "fragile";
  grade: string;
  idle: string;
  run: boolean;
  delay: number;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center">
      <p className="text-center text-[13px] text-[var(--fg-2)]">
        <span className="font-medium text-[var(--fg)]">{name}</span>, {sub}
      </p>
      {/* Le cadran est dessiné pour 240 px : sous 640 px on le réduit d'un bloc
          (zoom) plutôt que de laisser le chiffre déborder de l'arc. */}
      <div className="mt-1 w-[240px] max-sm:[zoom:0.56]">
        <ScoreGauge
          state={run ? "done" : "idle"}
          score={score}
          band={band}
          gradeLabel={grade}
          idleLabel={idle}
          scanningLabel=""
          delay={delay}
        />
      </div>
    </div>
  );
}

/* ── Onglet 1 : j'ai un site ────────────────────────────────────── */

function SiteForm({ locale, c }: { locale: string; c: Copy }) {
  const router = useRouter();
  const [site, setSite] = useState("");
  const [err, setErr] = useState("");
  const action = `/${locale}/audit-seo-gratuit`;

  return (
    <form
      action={action}
      method="get"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const v = site.trim();
        if (!v) return setErr(c.siteEmpty);
        setErr("");
        router.push(`${action}?site=${encodeURIComponent(v)}`);
      }}
    >
      <label htmlFor="home-audit-site" className="block text-sm font-medium text-[var(--fg)]">
        {c.siteLabel}
      </label>
      <div className="mt-2.5 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0 sm:rounded-full sm:border sm:border-[var(--rule-strong)] sm:bg-white sm:p-1.5 sm:transition-[border-color,box-shadow] sm:duration-200 sm:focus-within:border-[var(--accent)] sm:focus-within:shadow-[0_0_0_4px_var(--accent-soft)]">
        <input
          id="home-audit-site"
          name="site"
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          value={site}
          onChange={(e) => {
            setSite(e.target.value);
            if (err) setErr("");
          }}
          placeholder={c.sitePlaceholder}
          aria-invalid={err ? true : undefined}
          aria-describedby="home-audit-site-msg"
          className="h-14 w-full min-w-0 rounded-full border border-[var(--rule-strong)] bg-white px-5 text-[16px] text-[var(--fg)] caret-[var(--accent)] outline-none placeholder:text-[var(--fg-2)]/60 focus-visible:border-[var(--accent)] focus-visible:shadow-[0_0_0_4px_var(--accent-soft)] sm:h-12 sm:flex-1 sm:border-0 sm:bg-transparent sm:pl-4 sm:focus-visible:shadow-none"
        />
        <button type="submit" className={`${PRIMARY} h-14 px-7 sm:h-12`}>
          {c.siteSubmit}
          <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
      <p id="home-audit-site-msg" role={err ? "alert" : undefined} className="min-h-6 pt-2 text-sm text-[var(--fg-2)]">
        {err ? <span className="text-[var(--fg)]">{err}</span> : c.siteNote}
      </p>
      <Link
        href={action}
        className="mt-3 inline-flex min-h-8 items-center gap-1.5 text-sm font-medium text-[var(--accent)] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
      >
        {c.full}
        <ArrowRight size={14} weight="bold" aria-hidden="true" />
      </Link>
    </form>
  );
}

/* ── Onglet 2 : je n'ai pas de site ─────────────────────────────── */

function PresenceForm({ locale, c }: { locale: string; c: Copy }) {
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // pot de miel
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const [sentTo, setSentTo] = useState("");

  if (sentTo) {
    return (
      <div role="status" className="rounded-2xl bg-[var(--bg-2)] p-6">
        <p className="flex items-center gap-2.5 text-xl font-medium tracking-[-0.02em] text-[var(--fg)]">
          <CheckCircle size={24} weight="fill" className="text-[var(--accent)]" aria-hidden="true" />
          {c.doneTitle}
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">{c.doneBody(sentTo)}</p>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (!company.trim() || !city.trim()) return setErr(c.errFields);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setErr(c.errEmail);
    if (!consent) return setErr(c.errConsent);
    setErr("");
    setSending(true);
    try {
      const res = await fetch("/api/presence", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ company, city, email: email.trim(), consent, locale, website }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setSentTo(email.trim());
        return;
      }
      setErr(
        data.error === "email"
          ? c.errEmail
          : data.error === "consent"
            ? c.errConsent
            : data.error === "fields"
              ? c.errFields
              : data.error === "rate"
                ? c.errRate
                : c.errGeneric,
      );
    } catch {
      setErr(c.errGeneric);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="relative">
      <p className="max-w-[34rem] text-[15px] leading-relaxed text-[var(--fg-2)] text-pretty">{c.presenceIntro}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="presence-company" className="block text-sm font-medium text-[var(--fg)]">
            {c.company}
          </label>
          <input
            id="presence-company"
            type="text"
            autoComplete="organization"
            maxLength={120}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={INPUT}
          />
        </div>
        <div>
          <label htmlFor="presence-city" className="block text-sm font-medium text-[var(--fg)]">
            {c.city}
          </label>
          <input
            id="presence-city"
            type="text"
            autoComplete="address-level2"
            maxLength={80}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={INPUT}
          />
        </div>
        <div>
          <label htmlFor="presence-email" className="block text-sm font-medium text-[var(--fg)]">
            {c.email}
          </label>
          <input
            id="presence-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={200}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={INPUT}
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
          <Link
            href={`/${locale}/privacy`}
            className="text-[var(--fg)] underline decoration-[var(--rule-strong)] underline-offset-4 hover:decoration-[var(--fg)]"
          >
            {c.privacy}
          </Link>
        </span>
      </label>
      <button type="submit" disabled={sending} className={`${PRIMARY} mt-6 w-full sm:w-auto`}>
        {sending ? c.sending : c.presenceSubmit}
        {!sending && (
          <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
        )}
      </button>
      <p role="alert" className="min-h-5 pt-3 text-sm text-[var(--fg)]">
        {err}
      </p>
    </form>
  );
}
