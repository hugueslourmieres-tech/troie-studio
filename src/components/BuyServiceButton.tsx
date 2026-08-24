"use client";

import { useState } from "react";

/**
 * Achat d'une PRESTATION (audit-fix) : POST /api/billing/checkout puis
 * redirection vers Stripe Checkout. Contrairement à BuyButton, pas de
 * détour par la connexion : l'achat est ouvert aux invités, Stripe
 * collecte l'email, le webhook notifie l'équipe.
 * - 503 (Stripe pas configuré) : bascule mailto, aucune intention perdue.
 */
export function BuyServiceButton({
  product,
  site,
  locale,
  label,
  className,
  fallbackSubject,
}: {
  product: string;
  /** Domaine scanné, transmis en métadonnée Stripe pour lancer l'audit. */
  site?: string;
  locale: string;
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
        body: JSON.stringify({ product, site: site ?? "", locale }),
      });
      if (res.ok) {
        const data = (await res.json()) as { url?: string };
        if (data.url) {
          window.location.href = data.url;
          return;
        }
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
      {busy ? "…" : label}
    </button>
  );
}
