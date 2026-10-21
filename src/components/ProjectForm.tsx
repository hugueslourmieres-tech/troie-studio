"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { NEEDS, NEED_EVENT, SUBJECT_TO_NEED, isNeed, type NeedSlug } from "@/lib/needs";

/**
 * Formulaire de brief court (bouton Lancer un projet), repris du commit
 * 725bde9 sans le champ budget. Présélection du besoin par ?besoin= ou par
 * les anciens ?subject=. Envoi par /api/contact avec kind projet, mêmes
 * protections anti-spam.
 *
 * Le visiteur peut répondre « à définir » partout : il n'a pas à connaître
 * la solution. Aucun délai de réponse n'est affiché tant qu'il n'est pas
 * validé ([À COMPLÉTER] : délai de réponse au formulaire).
 */

type Status = "idle" | "sending" | "ok" | "error";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
    };
  }
}

const COPY = {
  fr: {
    need: "Votre besoin",
    outcome: "Ce que vous voulez obtenir",
    outcomeHint: "Par exemple : être mieux compris par vos clients, ou lancer une nouvelle offre.",
    situation: "Où vous en êtes",
    situationHint: "Par exemple : un site qui date, pas de plan de communication, une équipe débordée.",
    deadline: "Échéance",
    name: "Nom",
    email: "Email",
    company: "Entreprise",
    phone: "Téléphone",
    optional: "facultatif",
    deadlines: ["À définir", "Dès que possible", "Dans le mois", "D'ici trois mois", "Plus tard"],
    send: "Envoyer ma demande",
    sending: "Envoi en cours",
    privacy: "Vos informations servent uniquement à répondre à votre demande.",
    okEyebrow: "Demande envoyée",
    okTitle: "Merci.",
    okText: "Hugues lit chaque demande et vous répond avec une proposition ou une question pour la cadrer.",
    again: "Décrire un autre projet",
    errRequired: "Indiquez ce que vous voulez obtenir, votre nom et votre email.",
    errEmail: "Vérifiez votre adresse email.",
    errGeneric: "Une erreur est survenue. Réessayez.",
    errNetwork: "Réseau indisponible. Réessayez.",
  },
  en: {
    need: "What you need",
    outcome: "What you want to achieve",
    outcomeHint: "For example: be better understood by your customers, or launch a new offer.",
    situation: "Where you are today",
    situationHint: "For example: an old website, no communication plan, a team stretched thin.",
    deadline: "Timing",
    name: "Name",
    email: "Email",
    company: "Company",
    phone: "Phone",
    optional: "optional",
    deadlines: ["Not sure yet", "As soon as possible", "Within a month", "Within three months", "Later"],
    send: "Send my request",
    sending: "Sending",
    privacy: "Your details are only used to answer your request.",
    okEyebrow: "Request sent",
    okTitle: "Thank you.",
    okText: "Hugues reads every request and gets back to you with a proposal or a question to frame it.",
    again: "Describe another project",
    errRequired: "Please add what you want to achieve, your name and your email.",
    errEmail: "Please check your email address.",
    errGeneric: "Something went wrong. Please try again.",
    errNetwork: "Network unavailable. Please try again.",
  },
} as const;

/* 16 px de texte dans les champs : en dessous, Safari sur iPhone zoome la
   page au focus. Les listes coupent leur texte trop long par « … » (le choix
   « Clarifier ma stratégie ou mon positionnement » à 375 px). */
const inputCls =
  "w-full rounded-xl border border-[var(--rule-strong)] bg-[var(--bg-2)] px-4 py-3.5 text-base text-[var(--fg)] outline-none transition placeholder:text-[var(--fg-2)]/45 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]";

export function ProjectForm({ locale, className = "" }: { locale: string; className?: string }) {
  const en = locale === "en";
  const c = en ? COPY.en : COPY.fr;

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [need, setNeed] = useState<NeedSlug>("a-definir");
  const [flash, setFlash] = useState(false);
  const mountedAt = useRef<number>(0);
  const turnstileToken = useRef<string>("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileId = useRef<string | undefined>(undefined);
  const okRef = useRef<HTMLDivElement>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Besoin présélectionné : ?besoin=… (liens directs) ou ?subject=… (anciens
  // liens des autres pages), puis les boutons de la même page (NEED_EVENT).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("besoin");
    const fromSubject = SUBJECT_TO_NEED[params.get("subject") ?? ""];
    if (isNeed(fromUrl)) setNeed(fromUrl);
    else if (isNeed(fromSubject)) setNeed(fromSubject);

    const onNeed = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if (!isNeed(value)) return;
      setNeed(value);
      setStatus((s) => (s === "ok" ? "idle" : s));
      setFlash(true);
      if (flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlash(false), 1600);
    };
    window.addEventListener(NEED_EVENT, onNeed);
    return () => {
      window.removeEventListener(NEED_EVENT, onNeed);
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, []);

  // Widget Turnstile, seulement si la clé publique existe. Rendu une fois par
  // affichage du formulaire (il disparaît avec le message de succès).
  const formVisible = status !== "ok";
  useEffect(() => {
    if (!formVisible || !TURNSTILE_SITE_KEY || !turnstileRef.current) return;
    const el = turnstileRef.current;
    const render = () => {
      if (window.turnstile && el.isConnected && !el.hasChildNodes()) {
        turnstileId.current = window.turnstile.render(el, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => {
            turnstileToken.current = token;
          },
        });
      }
    };
    if (window.turnstile) {
      render();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>("script[data-turnstile]");
    if (existing) {
      existing.addEventListener("load", render, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.dataset.turnstile = "1";
    script.addEventListener("load", render, { once: true });
    document.head.appendChild(script);
  }, [formVisible]);

  // Après l'envoi, le message de succès (plus court que le formulaire)
  // reçoit le focus : sur téléphone, il revient ainsi à l'écran.
  useEffect(() => {
    if (status === "ok") okRef.current?.focus();
  }, [status]);

  // Un jeton Turnstile ne sert qu'une fois : après une erreur du serveur,
  // le widget en redemande un pour le prochain envoi.
  // (reset est typé ici : ContactForm déclare déjà window.turnstile sans lui.)
  function resetTurnstile() {
    const ts = window.turnstile as { reset?: (widgetId?: string) => void } | undefined;
    if (!turnstileId.current || !ts?.reset) return;
    turnstileToken.current = "";
    ts.reset(turnstileId.current);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Le formulaire est capturé avant tout await : event.currentTarget
    // redevient null ensuite.
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const outcome = get("outcome");
    const name = get("name");
    const email = get("email");
    if (!outcome || !name || !email) {
      setErrorMsg(c.errRequired);
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg(c.errEmail);
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg(null);
    const needEntry = NEEDS.find((n) => n.slug === need);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        // x-troie-form : marqueur du vrai formulaire, exigé par l'API.
        headers: { "Content-Type": "application/json", "x-troie-form": "1" },
        body: JSON.stringify({
          kind: "projet",
          locale: en ? "en" : "fr",
          need,
          needLabel: needEntry ? needEntry.fr : "",
          outcome,
          situation: get("situation"),
          deadline: get("deadline"),
          name,
          email,
          company: get("company"),
          phone: get("phone"),
          website: get("website"),
          elapsedMs: mountedAt.current ? Date.now() - mountedAt.current : 0,
          turnstileToken: turnstileToken.current,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        // Les erreurs 4xx sont rédigées pour le visiteur, dans sa langue.
        // Les erreurs 5xx sont techniques : message générique.
        setErrorMsg(res.status < 500 && body?.error ? body.error : c.errGeneric);
        setStatus("error");
        resetTurnstile();
        return;
      }
      form.reset();
      setNeed("a-definir");
      setStatus("ok");
    } catch {
      setErrorMsg(c.errNetwork);
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div ref={okRef} tabIndex={-1} className={`scroll-mt-28 outline-none ${className}`} role="status" aria-live="polite">
        <div className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--bg-2)] p-6 sm:p-8 md:p-12">
          <p className="text-sm text-[var(--accent)] font-medium">{c.okEyebrow}</p>
          <p className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl">{c.okTitle}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">{c.okText}</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm relative mt-10 inline-flex items-center gap-2 border-b border-[var(--fg)] pb-1 text-[var(--fg)] transition before:absolute before:-inset-x-2 before:-inset-y-3 before:content-[''] hover:border-[var(--accent)] hover:text-[var(--accent)] font-medium"
          >
            {c.again}
          </button>
        </div>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className={`space-y-6 ${className}`}>
      {/* Champ piège, hors écran (pas display:none, que certains robots repèrent). */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", height: 0, overflow: "hidden" }}>
        <label htmlFor="projet-website">Website</label>
        <input id="projet-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id="projet-besoin" label={c.need}>
        <SelectBox flash={flash}>
          <select
            id="projet-besoin"
            name="need"
            value={need}
            onChange={(e) => setNeed(e.target.value as NeedSlug)}
            className={`${inputCls} appearance-none truncate pr-11`}
          >
            {NEEDS.map((n) => (
              <option key={n.slug} value={n.slug}>
                {en ? n.en : n.fr}
              </option>
            ))}
          </select>
        </SelectBox>
      </Field>

      <Field id="projet-resultat" label={c.outcome} required>
        <textarea id="projet-resultat" name="outcome" rows={3} required placeholder={c.outcomeHint} className={`${inputCls} resize-y`} />
      </Field>

      <Field id="projet-situation" label={c.situation} optional={c.optional}>
        <textarea id="projet-situation" name="situation" rows={3} placeholder={c.situationHint} className={`${inputCls} resize-y`} />
      </Field>

      <Field id="projet-echeance" label={c.deadline}>
        <SelectBox>
          <select id="projet-echeance" name="deadline" defaultValue={c.deadlines[0]} className={`${inputCls} appearance-none truncate pr-11`}>
            {c.deadlines.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </SelectBox>
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="projet-nom" label={c.name} required>
          <input id="projet-nom" name="name" type="text" required autoComplete="name" className={inputCls} />
        </Field>
        <Field id="projet-email" label={c.email} required>
          <input id="projet-email" name="email" type="email" required autoComplete="email" inputMode="email" className={inputCls} />
        </Field>
        <Field id="projet-entreprise" label={c.company} optional={c.optional}>
          <input id="projet-entreprise" name="company" type="text" autoComplete="organization" className={inputCls} />
        </Field>
        <Field id="projet-telephone" label={c.phone} optional={c.optional}>
          <input id="projet-telephone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
        </Field>
      </div>

      {TURNSTILE_SITE_KEY && <div ref={turnstileRef} />}

      {status === "error" && errorMsg && (
        <p role="alert" className="text-sm text-[var(--accent-2)]">
          {errorMsg}
        </p>
      )}

      <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={sending}
          className="text-sm group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[var(--ink)] px-8 py-4 text-[var(--bg)] transition-colors hover:bg-[#2a2e37] hover:text-white disabled:opacity-60 font-medium"
        >
          {sending ? `${c.sending}…` : c.send}
          {!sending && (
            <span aria-hidden="true" className="transition group-hover:translate-x-1">
              →
            </span>
          )}
        </button>
        <p className="max-w-xs text-xs leading-relaxed text-[var(--fg-2)]/70">{c.privacy}</p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required = false,
  optional,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <label htmlFor={id} className="text-sm flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[var(--fg-2)]/80 font-medium">
        <span>{label}</span>
        {required && (
          <span aria-hidden="true" className="text-[var(--accent)]">
            *
          </span>
        )}
        {optional && <span className="font-sans text-[12px] normal-case tracking-normal text-[var(--fg-2)]/55">{optional}</span>}
      </label>
      {children}
    </div>
  );
}

function SelectBox({ children, flash = false }: { children: ReactNode; flash?: boolean }) {
  return (
    <div className={`relative rounded-xl transition-shadow duration-500 ${flash ? "shadow-[0_0_0_3px_var(--accent)]" : ""}`}>
      {children}
      <svg
        viewBox="0 0 10 6"
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 h-1.5 w-2.5 -translate-y-1/2 text-[var(--fg)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 1l4 4 4-4" />
      </svg>
    </div>
  );
}
