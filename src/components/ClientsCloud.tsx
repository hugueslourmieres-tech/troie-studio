import { useTranslations } from "next-intl";

const CLIENTS = [
  "CHANEL",
  "PANTONE",
  "X-RITE",
  "SOFITEL",
  "HEIDELBERG",
  "GS MONACO",
  "VEORIA",
  "RUTHERFORD",
  "TOP AKITA INU",
  "CAPEFRONT",
];

/**
 * Wordmark-style client cloud. We don't have all SVG logos cleaned yet,
 * so v1 ships as elegant typographic mentions (cleaner than mismatched bitmaps).
 * v2 will replace these with proper logo SVGs.
 */
export function ClientsCloud() {
  const t = useTranslations("home");

  return (
    <section className="border-t border-[var(--color-mist)] bg-[var(--color-ink-2)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="t-eyebrow">/ Clients</p>
            <h2 className="t-display mt-6 text-4xl text-[var(--color-bone)] md:text-5xl">
              {t("clientsTitle")}
            </h2>
          </div>
          <div className="md:col-span-8 md:pt-6">
            <p className="text-lg leading-relaxed text-[var(--color-bone-2)]/80">
              {t("clientsIntro")}
            </p>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-x-10 gap-y-8 border-t border-[var(--color-mist)] pt-12 md:grid-cols-5">
          {CLIENTS.map((c) => (
            <li
              key={c}
              className="font-mono text-sm uppercase tracking-[0.14em] text-[var(--color-bone-2)]/70 transition hover:text-[var(--color-bone)]"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
