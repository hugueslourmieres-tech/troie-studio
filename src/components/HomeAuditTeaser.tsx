"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ChatCircleText,
  CheckCircle,
  MagnifyingGlass,
  MapPin,
} from "@phosphor-icons/react";
import { ScoreGauge } from "@/components/audit/ScoreGauge";

/**
 * Bloc d'accueil « Où en est votre site ? » (26/10/2026, version anthracite).
 *
 * Deux onglets :
 *   1. J'ai un site : un champ, un bouton. Le formulaire est un vrai GET vers
 *      /{locale}/audit-seo-gratuit?site=..., qui lance l'audit tout seul
 *      (marche aussi sans JavaScript).
 *   2. Je n'ai pas de site : entreprise, ville, e-mail, consentement. POST
 *      vers /api/presence, l'équipe envoie un score de présence sur 100 sous
 *      48 h.
 *
 * À côté, un seul grand cadran sur le fond granuleux anthracite du site
 * (dusk.jpg, comme les bandes d'appel sombres) : « Score GEO » pour le
 * premier onglet, « Score de présence » pour le second. Cadran blanc et
 * argent (ScoreGauge tone="dark"), en suspens (idleMode="suspense").
 *
 * Ordre : sur mobile, titre, phrase, cadran, onglets, formulaire. Sur desktop,
 * deux colonnes (texte et formulaire à gauche, cadran à droite). Les deux
 * contenus du cadre partagent la même cellule de grille : la hauteur ne bouge
 * pas d'un onglet à l'autre, donc les onglets placés dessous ne sautent pas.
 */

type Tab = "site" | "presence";

const COPY = {
  fr: {
    title: "Où en est votre site ?",
    sub: "Votre score GEO en quelques secondes, gratuit.",
    tabsLabel: "Choisir votre situation",
    tabSite: "J'ai un site",
    tabPresence: "Je n'ai pas de site",
    siteLabel: "Adresse de votre site",
    sitePlaceholder: "votre-site.fr",
    siteSubmit: "Voir mon score",
    siteEmpty: "Entrez l'adresse de votre site. Exemple : votre-site.fr",
    siteNote: "Sans inscription.",
    presenceIntro: "Nous mesurons votre présence sur Google et dans les IA. Votre score arrive par e-mail sous 48 h.",
    company: "Nom de votre entreprise",
    city: "Ville",
    email: "Votre e-mail",
    consent:
      "J'accepte de recevoir mon rapport et d'être recontacté par TROIE Studio. Je peux me désinscrire à tout moment.",
    privacy: "Politique de confidentialité",
    presenceSubmit: "Recevoir mon score",
    sending: "Envoi en cours",
    errFields: "Indiquez le nom de votre entreprise et votre ville.",
    errEmail: "Vérifiez votre adresse e-mail.",
    errConsent: "Cochez la case pour que nous puissions vous répondre.",
    errRate: "Plusieurs demandes viennent d'être envoyées. Réessayez dans une heure.",
    errGeneric: "L'envoi n'a pas abouti. Réessayez dans un instant.",
    doneTitle: "C'est noté.",
    doneBody: (email: string) =>
      `Votre score de présence arrive sous 48 h à ${email}. Un e-mail de confirmation vient de partir.`,
    geo: "Score GEO",
    geoSub: "Votre visibilité dans les réponses des IA.",
    geoChips: ["ChatGPT", "Gemini", "Réponses IA de Google"],
    presence: "Score de présence",
    presenceSub: "Sur 100, par e-mail sous 48 h.",
    idle: "Votre score",
    checks: [
      { k: "map", t: "Fiche Google" },
      { k: "search", t: "Recherche" },
      { k: "chat", t: "ChatGPT, Gemini" },
    ],
  },
  en: {
    title: "Where does your site stand?",
    sub: "Your GEO score in seconds, free.",
    tabsLabel: "Choose your situation",
    tabSite: "I have a website",
    tabPresence: "I don't have a website",
    siteLabel: "Your website address",
    sitePlaceholder: "your-site.com",
    siteSubmit: "See my score",
    siteEmpty: "Enter your website address. Example: your-site.com",
    siteNote: "No sign-up.",
    presenceIntro: "We measure your presence on Google and in AI answers. Your score arrives by email within 48 hours.",
    company: "Company name",
    city: "City",
    email: "Your email",
    consent:
      "I agree to receive my report and to be contacted by TROIE Studio. I can unsubscribe at any time.",
    privacy: "Privacy policy",
    presenceSubmit: "Get my score",
    sending: "Sending",
    errFields: "Please enter your company name and your city.",
    errEmail: "Please check your email address.",
    errConsent: "Tick the box so we can reply to you.",
    errRate: "Several requests were just sent. Please try again in an hour.",
    errGeneric: "Sending failed. Please try again in a moment.",
    doneTitle: "Got it.",
    doneBody: (email: string) =>
      `Your presence score arrives within 48 hours at ${email}. A confirmation email is on its way.`,
    geo: "GEO score",
    geoSub: "How visible you are in AI answers.",
    geoChips: ["ChatGPT", "Gemini", "Google AI answers"],
    presence: "Presence score",
    presenceSub: "Out of 100, by email within 48 hours.",
    idle: "Your score",
    checks: [
      { k: "map", t: "Google profile" },
      { k: "search", t: "Search" },
      { k: "chat", t: "ChatGPT, Gemini" },
    ],
  },
} as const;

type Copy = (typeof COPY)["fr"] | (typeof COPY)["en"];

const ICONS = { map: MapPin, search: MagnifyingGlass, chat: ChatCircleText } as const;

const INPUT =
  "mt-2 h-12 w-full rounded-xl border border-[var(--rule-strong)] bg-white px-4 text-[16px] text-[var(--fg)] caret-[var(--accent)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--fg-2)]/60 focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_var(--accent-soft)]";

const PRIMARY =
  "group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 text-[15px] font-medium text-white transition-[background-color,transform,opacity] duration-200 hover:bg-[#2a2e37] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

const SWAP =
  "col-start-1 row-start-1 flex flex-col items-center text-center transition-[opacity,filter] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none";

export function HomeAuditTeaser({ locale }: { locale: string }) {
  const en = locale === "en";
  const c: Copy = COPY[en ? "en" : "fr"];
  const [tab, setTab] = useState<Tab>("site");
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ site: null, presence: null });

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

  const on = (t: Tab) => (tab === t ? "opacity-100" : "pointer-events-none opacity-0 blur-[3px]");

  return (
    <section id="audit" className="scroll-mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:px-12 md:py-28 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-0">
        {/* 1. Titre et phrase */}
        <div className="lg:col-span-5 lg:row-start-1">
          <h2 className="t-display text-4xl text-[var(--fg)] text-balance md:text-5xl">{c.title}</h2>
          <p className="mt-4 max-w-[28rem] text-lg leading-relaxed text-[var(--fg-2)] text-pretty">{c.sub}</p>
        </div>

        {/* 2. Le cadran, sur le fond anthracite granuleux. Sur mobile, juste sous
            la phrase ; sur desktop, la colonne de droite sur toute la hauteur. */}
        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-start" aria-hidden="true">
          <div className="grain relative overflow-hidden rounded-[28px] bg-[#15171d]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/art/dusk.jpg"
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Assombrit la traînée claire de l'image derrière le cadran, garde
                la lumière sur les bords : le blanc ressort partout. */}
            <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_48%,rgba(14,16,22,0.62),rgba(14,16,22,0.25)_70%,rgba(14,16,22,0.1))]" />
            <div className="pointer-events-none absolute inset-0 z-[3] rounded-[inherit] ring-1 ring-inset ring-white/10" />

            <div className="relative z-[3] grid place-items-center px-5 pt-7 pb-6 sm:px-10 sm:pt-11 sm:pb-10">
              <div className={`${SWAP} ${on("site")}`}>
                <PanelHead name={c.geo} sub={c.geoSub} />
                <DarkGauge idle={c.idle} from={46} />
                <ul className="mt-1 flex flex-wrap justify-center gap-2">
                  {c.geoChips.map((t) => (
                    <li key={t} className={CHIP}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${SWAP} ${on("presence")}`}>
                <PanelHead name={c.presence} sub={c.presenceSub} />
                <DarkGauge idle={c.idle} from={58} />
                <ul className="mt-1 flex flex-wrap justify-center gap-2">
                  {c.checks.map((it) => {
                    const Icon = ICONS[it.k];
                    return (
                      <li key={it.k} className={CHIP}>
                        <Icon size={14} weight="regular" className="text-white/70" />
                        {it.t}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Onglets et formulaires */}
        <div className="lg:col-span-5 lg:row-start-2 lg:pt-9">
          <div
            role="tablist"
            aria-label={c.tabsLabel}
            className="relative grid grid-cols-2 rounded-full bg-[var(--bg-2)] p-1"
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
            className="mt-7"
          >
            <SiteForm locale={locale} c={c} />
          </div>
          <div
            id="audit-panel-presence"
            role="tabpanel"
            aria-labelledby="audit-tab-presence"
            hidden={tab !== "presence"}
            className="mt-7"
          >
            <PresenceForm locale={locale} c={c} />
          </div>
        </div>
      </div>
    </section>
  );
}

const CHIP =
  "inline-flex h-8 items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-3 text-[13px] font-medium text-white/85";

/* ── Le cadre : titre du score, grand cadran ────────────────────── */

function PanelHead({ name, sub }: { name: string; sub: string }) {
  return (
    <div>
      <p className="text-[22px] font-medium tracking-[-0.02em] text-white sm:text-[26px]">{name}</p>
      <p className="mt-1 text-[14px] text-white/65 sm:text-[15px]">{sub}</p>
    </div>
  );
}

function DarkGauge({ idle, from }: { idle: string; from: number }) {
  // Dessiné pour 240 px, agrandi d'un bloc (zoom) : chiffre, arc et mentions
  // grandissent ensemble.
  return (
    <div className="mt-3 w-[240px] [zoom:1.08] sm:[zoom:1.25] lg:[zoom:1.32]">
      <ScoreGauge
        state="idle"
        score={0}
        band="bon"
        tone="dark"
        idleMode="suspense"
        suspenseFrom={from}
        gradeLabel=""
        idleLabel={idle}
        scanningLabel=""
        delay={0.2}
      />
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
      <p className="max-w-[30rem] text-[15px] leading-relaxed text-[var(--fg-2)] text-pretty">{c.presenceIntro}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
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
