"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
      <Field name="subject" label={t("subject")} />
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
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
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
