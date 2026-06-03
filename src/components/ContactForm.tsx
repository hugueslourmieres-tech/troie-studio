"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "ok" | "error";

/**
 * Map `?subject=…` query keys to readable subject text. Anything outside
 * the map is passed through as-is, so we can keep adding values later
 * (campaign tags, programme slugs, etc.) without touching this file.
 */
const SUBJECT_PRESETS: Record<string, { fr: string; en: string }> = {
  creation: {
    fr: "Projet de création",
    en: "Creative project",
  },
  strategy: {
    fr: "Audit stratégique",
    en: "Strategy audit",
  },
  training: {
    fr: "Formation IA",
    en: "AI training",
  },
  "formation-intra": {
    fr: "Demande de devis — formation intra",
    en: "Quote request — in-house training",
  },
  "formation-inter": {
    fr: "Inscription session inter",
    en: "Open session registration",
  },
  "formation-decouverte": {
    fr: "Formation Découverte — Fondamentaux IA",
    en: "Discovery training — AI fundamentals",
  },
  "formation-pratique": {
    fr: "Formation Pratique — Production & création IA",
    en: "Practice training — AI production & creation",
  },
  "formation-agents": {
    fr: "Formation Agents & automatisation",
    en: "Training — Agents & automation",
  },
  "audit-ia": {
    fr: "Audit IA & feuille de route",
    en: "AI audit & roadmap",
  },
  "agent-hermes": {
    fr: "Agent Hermès — prospection & RDV",
    en: "Hermes agent — outreach & meetings",
  },
  "agent-achille": {
    fr: "Agent Achille — contenus & social",
    en: "Achilles agent — content & social",
  },
  "agent-hestia": {
    fr: "Agent Hestia — service client 24/7",
    en: "Hestia agent — 24/7 customer care",
  },
  "agent-custom": {
    fr: "Agent sur-mesure",
    en: "Bespoke agent",
  },
};

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [subjectInitial, setSubjectInitial] = useState<string>("");

  // Resolve a readable subject from `?subject=…` on mount. Read it from
  // window.location directly so the component doesn't need a Suspense
  // boundary like useSearchParams() would.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = new URLSearchParams(window.location.search).get("subject");
    if (!raw) {
      setSubjectInitial("");
      return;
    }
    const lang = window.location.pathname.startsWith("/en") ? "en" : "fr";
    const preset = SUBJECT_PRESETS[raw];
    setSubjectInitial(preset ? preset[lang] : raw);
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Capture the form ref BEFORE any await — React recycles the synthetic
    // event and `event.currentTarget` becomes null after the await, which
    // was making the success path throw and fall into the error branch.
    const form = event.currentTarget;
    setStatus("sending");
    setErrorMsg(null);

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body?.error ?? "Une erreur est survenue. Réessayez.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("ok");
    } catch (err) {
      console.error("Contact form fetch error:", err);
      setErrorMsg("Réseau indisponible. Réessayez.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div
        className="md:col-span-7"
        role="status"
        aria-live="polite"
      >
        <div className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--bg-2)] p-8 md:p-12">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--bg)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <p className="t-eyebrow !text-[var(--accent)]">/ Message envoyé</p>
          </div>

          <h2 className="t-display mt-8 text-3xl text-[var(--fg)] md:text-5xl">
            Merci.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            {t("thanks")}
          </p>

          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-10 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            ↺ Envoyer un autre message
          </button>
        </div>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="space-y-5 md:col-span-7" noValidate>
      <Field name="name" label={t("name")} required />
      <Field name="email" label={t("email")} type="email" required />
      <Field name="company" label={t("company")} />
      <Field
        name="subject"
        label={t("subject")}
        defaultValue={subjectInitial}
        key={`subject-${subjectInitial}`}
      />
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--fg-2)]/70"
        >
          {t("message")} <span className="text-[var(--accent)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full rounded-xl border border-[var(--rule)] bg-[var(--bg-2)] px-4 py-3 text-[var(--fg)] outline-none transition focus:border-[var(--accent)]"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-[var(--accent)]">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--fg)] transition hover:bg-[#a85f2a] disabled:opacity-60"
      >
        {sending ? `${t("send")}…` : `${t("send")} →`}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--fg-2)]/70"
      >
        {label} {required && <span className="text-[var(--accent)]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        autoComplete={
          name === "email"
            ? "email"
            : name === "name"
              ? "name"
              : name === "company"
                ? "organization"
                : "off"
        }
        className="w-full rounded-xl border border-[var(--rule)] bg-[var(--bg-2)] px-4 py-3 text-[var(--fg)] outline-none transition focus:border-[var(--accent)]"
      />
    </div>
  );
}
