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
    setStatus("sending");
    setErrorMsg(null);

    const formData = new FormData(event.currentTarget);
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

      setStatus("ok");
      event.currentTarget.reset();
    } catch {
      setErrorMsg("Réseau indisponible. Réessayez.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="md:col-span-7">
        <div className="rounded-2xl border border-[var(--rule)] bg-[var(--bg-2)] p-10">
          <p className="t-eyebrow">/ Merci</p>
          <p className="mt-6 text-lg leading-relaxed text-[var(--fg)] md:text-xl">
            {t("thanks")}
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-8 inline-flex items-center gap-3 border-b border-[var(--fg)] pb-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
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
