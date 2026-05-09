import { useTranslations } from "next-intl";

export function Manifesto() {
  const t = useTranslations("home");

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-44">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-4">
            <p className="t-eyebrow">{t("manifestoEyebrow")}</p>
            <div className="mt-8 hidden md:block">
              {/* sketched horse silhouette in pure CSS — anchor for the section */}
              <HorseGlyph />
            </div>
          </div>
          <div className="md:col-span-8">
            <h2 className="t-display text-4xl text-[var(--color-bone)] md:text-6xl">
              {t("manifestoTitle")}
            </h2>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-[var(--color-bone-2)]/80 md:text-xl">
              {t("manifestoBody")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HorseGlyph() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-40 w-40 text-[var(--color-gold)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      {/* Stylized horse: a single-line abstract outline, evocative not literal */}
      <path d="M30 140 Q55 90 95 95 Q110 60 140 65 Q160 45 175 65 Q180 80 165 90 L165 110 L155 115 L150 140 L165 165 L150 165 L140 145 L115 145 L120 165 L105 165 L95 140 Q70 145 55 160 Z" />
      <circle cx="160" cy="78" r="2" fill="currentColor" />
    </svg>
  );
}
