import { useTranslations } from "next-intl";

type Client = { src: string; label: string };

const CLIENTS: Client[] = [
  { src: "/images/clients/chanel.png", label: "Chanel" },
  { src: "/images/clients/xrite.png", label: "X-Rite Pantone" },
  { src: "/images/clients/sofitel.svg", label: "Sofitel" },
  { src: "/images/clients/gs-monaco.png", label: "GS Monaco" },
  { src: "/images/clients/veoria.png", label: "Veoria" },
  { src: "/images/clients/rutherford.png", label: "Rutherford" },
  { src: "/images/clients/top-akita-inu.png", label: "Top Akita Inu" },
  { src: "/images/clients/capefront.svg", label: "Capefront" },
];

/**
 * ClientsCloud — grille des logos clients monochromes.
 * Chaque logo est forcé en noir pur via filter brightness(0) pour
 * cohérence visuelle, opacité 55 % par défaut, 95 % au survol.
 */
export function ClientsCloud() {
  const t = useTranslations("home");

  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <p className="t-eyebrow text-center">{t("clientsTitle")}</p>
        <ul className="mt-14 grid grid-cols-2 items-center gap-x-10 gap-y-12 sm:grid-cols-4 md:gap-x-14 lg:grid-cols-4 lg:gap-y-14">
          {CLIENTS.map((c) => (
            <li
              key={c.src}
              title={c.label}
              className="flex items-center justify-center"
            >
              <img
                src={c.src}
                alt={c.label}
                loading="lazy"
                className="max-h-8 w-auto opacity-55 transition-opacity duration-300 hover:opacity-95 md:max-h-10"
                style={{ filter: "brightness(0)" }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
