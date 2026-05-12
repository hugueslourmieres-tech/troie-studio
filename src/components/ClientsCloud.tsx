import { useTranslations } from "next-intl";

const CLIENTS = [
  "CHANEL",
  "X-RITE",
  "SOFITEL",
  "GS MONACO",
  "VEORIA",
  "RUTHERFORD",
  "TOP AKITA INU",
  "CAPEFRONT",
];

/**
 * ClientsCloud — mention typographique des marques accompagnées.
 * Editorial, restrained, like a colophon.
 */
export function ClientsCloud() {
  const t = useTranslations("home");

  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <p className="t-eyebrow text-center">{t("clientsTitle")}</p>
        <ul className="mt-12 grid grid-cols-2 gap-x-10 gap-y-8 md:grid-cols-5">
          {CLIENTS.map((c) => (
            <li
              key={c}
              className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60 transition hover:text-[var(--fg)]"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
