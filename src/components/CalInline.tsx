"use client";

import { useEffect } from "react";

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, unknown>;
  q?: unknown[];
};

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

/**
 * Aperçu de calendrier cal.com en inline (embed officiel). Charge le script
 * cal.com et monte le calendrier dans le conteneur. `calLink` = chemin après
 * cal.com/ (ex. "hugueslourmieres" ou "hugueslourmieres/30min").
 */
export function CalInline({
  calLink = "hugueslourmieres",
  className = "",
}: {
  calLink?: string;
  className?: string;
}) {
  useEffect(() => {
    const src = "https://app.cal.com/embed/embed.js";

    if (!window.Cal) {
      const stub = ((...args: unknown[]) => {
        stub.q = stub.q || [];
        stub.q.push(args);
      }) as CalFn;
      window.Cal = stub;
    }

    const cal = window.Cal as CalFn;
    if (!cal.loaded) {
      cal.loaded = true;
      cal.ns = {};
      cal.q = cal.q || [];
      const s = document.createElement("script");
      s.src = src;
      document.head.appendChild(s);
    }

    cal("init", { origin: "https://cal.com" });
    cal("inline", {
      elementOrSelector: "#cal-inline",
      calLink,
      layout: "month_view",
    });
    cal("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
      cssVarsPerTheme: {
        light: { "cal-brand": "#f37b22" },
        dark: { "cal-brand": "#f37b22" },
      },
    });
  }, [calLink]);

  return (
    <div
      id="cal-inline"
      className={className}
      style={{ width: "100%", minHeight: "560px", overflow: "auto" }}
    />
  );
}
