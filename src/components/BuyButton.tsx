"use client";

import { useState } from "react";

/**
 * Bouton d'achat : POST /api/billing/checkout puis redirection vers
 * Stripe Checkout.
 * - 401 : renvoie vers la connexion avec retour sur la page d'origine.
 * - 503 (Stripe pas encore configuré) : bascule mailto de secours,
 *   pour ne jamais perdre une intention d'achat.
 */
export function BuyButton({
  product,
  label,
  className,
  fallbackSubject,
}: {
  product: string;
  label: string;
  className: string;
  fallbackSubject?: string;
}) {
  const [busy, setBusy] = useState(false);

  const fallbackMail = () => {
    const address = ["contact", "troiestudio.fr"].join("@");
    window.location.href = `mailto:${address}${
      fallbackSubject ? `?subject=${encodeURIComponent(fallbackSubject)}` : ""
    }`;
  };

  const buy = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });

      if (res.status === 401) {
        const next = encodeURIComponent(
          window.location.pathname + window.location.search,
        );
        window.location.href = `/formations/auth/sign-in?next=${next}`;
        return;
      }
      if (!res.ok) {
        fallbackMail();
        return;
      }
      const { url } = await res.json();
      if (url) {
        window.location.href = url;
        return;
      }
      fallbackMail();
    } catch {
      fallbackMail();
    } finally {
      setBusy(false);
    }
  };

  return (
    <button type="button" onClick={buy} disabled={busy} className={className}>
      {busy ? "Redirection…" : label}
    </button>
  );
}
