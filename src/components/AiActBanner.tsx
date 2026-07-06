import Link from "next/link";

/**
 * Bandeau annonce AI Act : texte defilant en boucle (marquee, pause au
 * survol), entierement cliquable vers l'article "controlable le 2 aout
 * 2026". Noir en haut de page, orange une fois la page scrollee
 * (prop `solid`, alignee sur l'etat de la navbar).
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

export function AiActBanner({
  locale = "fr",
  solid = false,
}: {
  locale?: string;
  /** Fond orange (page scrollee) au lieu du noir. */
  solid?: boolean;
}) {
  const c = COPY[locale === "en" ? "en" : "fr"];
  const items = Array.from({ length: 6 });

  return (
    <Link
      href={c.href}
      aria-label={`${c.text} ${c.cta}`}
      className={`group block overflow-hidden py-2.5 transition-colors duration-500 ${
        solid ? "bg-[var(--accent)]" : "bg-[#1a1714]"
      }`}
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
                className={`mr-16 flex items-baseline gap-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-500 ${
                  solid ? "text-[#1a1714]" : "text-[#f5f0e6]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={solid ? "text-[#1a1714]" : "text-[var(--accent)]"}
                >
                  ●
                </span>
                {c.text}
                <span
                  className={`transition group-hover:underline ${
                    solid ? "font-bold text-[#1a1714]" : "text-[var(--accent)]"
                  }`}
                >
                  {c.cta}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </Link>
  );
}
