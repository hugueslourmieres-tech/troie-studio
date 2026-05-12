import Image from "next/image";
import { useTranslations } from "next-intl";
import { Emblem } from "./Emblem";

export function AboutBlock() {
  const t = useTranslations("home");
  const bullets = t.raw("aboutBullets") as string[];

  return (
    <section
      id="about"
      className="border-t border-[var(--rule)] bg-[var(--bg-2)] scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="group md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--bg)]">
              <Image
                src="/images/about/hugues-portrait.jpg"
                alt="Hugues Lourmières"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative md:col-span-7">
            {/* Discreet warrior watermark on the right of the about copy */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-12 hidden opacity-40 md:block"
            >
              <Emblem className="h-72 w-auto" />
            </div>

            <p className="t-eyebrow relative">{t("aboutEyebrow")}</p>
            <h2 className="t-display relative mt-8 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
              {t("aboutTitle")}
            </h2>
            <p className="relative mt-10 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]/85">
              {t("aboutBody")}
            </p>
            <ul className="relative mt-12 grid gap-4 border-t border-[var(--rule)] pt-10 md:grid-cols-2">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-baseline gap-4 text-sm text-[var(--fg-2)]"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-px w-3 flex-shrink-0 bg-[var(--accent)]"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
