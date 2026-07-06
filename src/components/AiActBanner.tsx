import Link from "next/link";

/**
 * Bandeau annonce AI Act : fond marron, texte defilant en boucle
 * (marquee, pause au survol), ponctue d'etoiles IA, entierement
 * cliquable vers l'article "controlable le 2 aout 2026".
 */

const COPY = {
  fr: {
    text: "L'AI Act devient contrôlable le 2 août 2026",
    cta: "S'informer →",
    href: "/fr/blog/ai-act-controlable-2-aout-2026",
  },
  en: {
    text: "The EU AI Act becomes enforceable on August 2, 2026",
    cta: "Learn more →",
    href: "/en/blog/ai-act-controlable-2-aout-2026",
  },
} as const;

export function AiActBanner({ locale = "fr" }: { locale?: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];
  const items = Array.from({ length: 6 });

  return (
    <Link
      href={c.href}
      aria-label={`${c.text} ${c.cta}`}
      className="group block overflow-hidden bg-[var(--ink)] py-2.5"
    >
      <div className="t-marquee flex w-max">
        {[0, 1].map((half) => (
          <div
            key={half}
            aria-hidden={half === 1 || undefined}
            className="flex w-max shrink-0"
          >
            {items.map((_, i) => (
              <span
                key={i}
                className="mr-14 flex items-baseline gap-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e6]"
              >
                <span aria-hidden="true" className="text-[var(--accent)]">✦</span>
                {c.text}
                <span aria-hidden="true" className="text-[var(--accent)]/70">✧</span>
                <span className="text-[var(--accent)] transition group-hover:underline">
                  {c.cta}
                </span>
                <span aria-hidden="true" className="ml-1 text-[10px] text-[#f5f0e6]/40">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </Link>
  );
}
