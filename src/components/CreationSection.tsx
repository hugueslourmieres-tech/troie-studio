import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./Reveal";

/**
 * Section Création sur la home : nos réalisations en trois box (Vidéo, Photos,
 * Web), reprises de la page /creation. DA TROIE.
 */
export function CreationSection({ locale }: { locale: string }) {
  const cards = [
    {
      href: `/${locale}/creation/video`,
      label: "Vidéo",
      desc: "Films de marque, reels social et présentations produit.",
      img: "/images/creation/video/poster.jpg",
    },
    {
      href: `/${locale}/works`,
      label: "Photos",
      desc: "Photographie corporate, produit et événementielle.",
      img: "/images/works/CHANEL/cover.jpg",
    },
    {
      href: `/${locale}/creation/web`,
      label: "Web",
      desc: "Sites, web apps et e-commerce sur mesure.",
      img: "/images/creation-section/mockup-desktop.jpg",
    },
  ];

  return (
    <section className="border-t border-[var(--rule)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="t-eyebrow">Réalisations</p>
              <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
                Création.
              </h2>
            </div>
            <Link
              href={`/${locale}/creation`}
              className="group inline-flex items-center gap-3 border-b border-[var(--fg)] pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Voir la création
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          {cards.map((c, i) => (
            <li key={c.label}>
              <Reveal delay={i * 0.05}>
                <Link href={c.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[var(--bg-2)]">
                    <Image
                      src={c.img}
                      alt={c.label}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      style={{ filter: "grayscale(1) contrast(1.03)" }}
                    />
                    <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f5f0e6]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="t-display mt-5 text-2xl text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] md:text-3xl">
                    {c.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]">
                    {c.desc}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
