import Image from "next/image";
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
  "STUDIO DE LA ROCHE",
  "MEASURECOLOR",
];

/**
 * ClientsCloud — mention typographique des marques accompagnées,
 * surmontée d'un sceau de cire orange (signature, garantie de qualité).
 */
export function ClientsCloud() {
  const t = useTranslations("home");

  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        {/* Wax seal — signature of the brands worked with */}
        <div className="mx-auto mb-10 flex w-full max-w-[180px] justify-center md:max-w-[220px]">
          <Image
            src="/images/brand/emboss.png"
            alt=""
            width={2000}
            height={2000}
            sizes="(max-width: 768px) 180px, 220px"
            className="h-auto w-full"
          />
        </div>
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
