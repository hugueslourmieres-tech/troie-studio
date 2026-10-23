"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

/**
 * « L'équipe a travaillé avec » (24/10/2026) : les logos défilent en continu,
 * façon ElevenLabs, dans l'ordre voulu par Hugues. Logos en noir sur
 * transparent, hauteur réglée pour un poids visuel égal. Le défilement
 * s'arrête au survol et quand l'utilisateur réduit les animations.
 * GS MONACO, VEORIA, STUDIO DE LA ROCHE, MEASURECOLOR seulement après accord.
 */
const CLIENTS = [
  { name: "CHANEL", src: "/images/clients/mono-chanel.png", w: 1015, h: 160, px: 18 },
  { name: "Sofitel", src: "/images/clients/mono-sofitel.png", w: 506, h: 160, px: 27 },
  { name: "X-Rite Pantone", src: "/images/clients/mono-xrite-pantone.png", w: 1288, h: 160, px: 17 },
  { name: "Capefront Energies", src: "/images/clients/mono-capefront.png", w: 540, h: 160, px: 26 },
  { name: "LOIR Paris", src: "/images/clients/mono-loir-paris.png", w: 358, h: 160, px: 31 },
  { name: "Rutherford", src: "/images/clients/mono-rutherford.png", w: 978, h: 160, px: 19 },
  { name: "PerPost", src: "/images/clients/mono-perpost.png", w: 915, h: 160, px: 20 },
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24">
      {CLIENTS.map((c) => (
        <li key={c.name} className="flex h-10 items-center">
          <Image
            src={c.src}
            alt={hidden ? "" : c.name}
            width={c.w}
            height={c.h}
            sizes="220px"
            style={{ height: `${c.px}px`, width: "auto" }}
            className="opacity-70 transition-opacity duration-200 hover:opacity-100"
          />
        </li>
      ))}
    </ul>
  );
}

export function ClientsCloud() {
  const locale = useLocale();
  return (
    <section className="border-t border-[var(--rule)]">
      <div data-reveal className="mx-auto max-w-7xl px-5 pt-12 pb-6 md:px-12 md:pt-14">
        <p className="text-center text-sm text-[var(--fg-2)]">
          {locale === "fr" ? "L'équipe a travaillé avec" : "Our team has worked with"}
        </p>
      </div>
      <div className="logo-marquee relative overflow-hidden pb-12 md:pb-16 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="logo-marquee-track flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
