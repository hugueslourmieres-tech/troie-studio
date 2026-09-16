import Image from "next/image";
import Link from "next/link";

/**
 * Bloc 2 de l'accueil : trois réalisations qui montrent la capacité à
 * livrer. Chaque fait affiché est documenté (chiffres Rutherford fournis
 * par Hugues, troie.app en ligne depuis juillet 2026, livrable Veoria tiré
 * de sa fiche). Ne pas ajouter de chiffre sans source.
 */

type Work = {
  kind: string;
  name: string;
  desc: string;
  factLabel: string;
  fact: string;
  img: string;
  imgPos: string;
  alt: string;
  href: string;
  external?: boolean;
};

const COPY: Record<"fr" | "en", { eyebrow: string; title: string; all: string; works: Work[] }> = {
  fr: {
    eyebrow: "Réalisations",
    title: "Ce que nous avons livré.",
    all: "Toutes les réalisations",
    works: [
      {
        kind: "Site web et référencement",
        name: "Rutherford",
        desc: "Un site multilingue pour un groupe industriel B2B, pensé pour être trouvé sur Google.",
        factLabel: "Résultat",
        fact: "Trafic organique doublé en six mois, et 40 % de demandes entrantes en plus.",
        img: "/images/creation/web/rutherford-desktop.jpg",
        imgPos: "center top",
        alt: "Page d'accueil du site Rutherford",
        href: "/fr/creation/web",
      },
      {
        kind: "Application web",
        name: "troie.app",
        desc: "Une plateforme conçue, développée et mise en ligne par le studio : outils gratuits, cours, examens et attestations vérifiables.",
        factLabel: "En ligne",
        fact: "Depuis juillet 2026, avec comptes et paiement.",
        img: "/images/home/troie-app-outils.jpg",
        imgPos: "center top",
        alt: "Page des outils gratuits de troie.app",
        href: "https://troie.app/outils",
        external: true,
      },
      {
        kind: "Photographie corporate",
        name: "Veoria",
        desc: "Une journée auprès des équipes pour documenter la culture et l'engagement du groupe.",
        factLabel: "Livrable",
        fact: "Une banque de visuels prête pour les réseaux et la communication interne.",
        img: "/images/works/Veoria/cover.jpg",
        imgPos: "center 30%",
        alt: "Les équipes de Veoria photographiées au travail",
        href: "/fr/works/veoria",
      },
    ],
  },
  en: {
    eyebrow: "Our work",
    title: "What we have delivered.",
    all: "All our work",
    works: [
      {
        kind: "Website and SEO",
        name: "Rutherford",
        desc: "A multilingual website for a B2B industrial group, built to be found on Google.",
        factLabel: "Result",
        fact: "Organic traffic doubled in six months, with 40% more inbound leads.",
        img: "/images/creation/web/rutherford-desktop.jpg",
        imgPos: "center top",
        alt: "Home page of the Rutherford website",
        href: "/en/creation/web",
      },
      {
        kind: "Web app",
        name: "troie.app",
        desc: "A platform designed, built and launched by the studio: free tools, courses, exams and verifiable certificates.",
        factLabel: "Live",
        fact: "Since July 2026, with user accounts and payments.",
        img: "/images/home/troie-app-outils.jpg",
        imgPos: "center top",
        alt: "Free tools page of troie.app",
        href: "https://troie.app/outils",
        external: true,
      },
      {
        kind: "Corporate photography",
        name: "Veoria",
        desc: "A day with the teams to capture the group's culture and commitment.",
        factLabel: "Delivered",
        fact: "A bank of images ready for social media and internal communication.",
        img: "/images/works/Veoria/cover.jpg",
        imgPos: "center 30%",
        alt: "Veoria teams photographed at work",
        href: "/en/works/veoria",
      },
    ],
  },
};

export function HomeWorks({ locale }: { locale: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section id="realisations" className="scroll-mt-20 bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="t-eyebrow">{c.eyebrow}</p>
            <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-6xl">{c.title}</h2>
          </div>
          <Link
            href={`/${locale === "en" ? "en" : "fr"}/medias`}
            className="group inline-flex items-center gap-2.5 border-b border-[var(--fg)] pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {c.all}
            <span aria-hidden="true" className="transition group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <ul className="mt-14 grid gap-14 md:mt-20 md:grid-cols-3 md:gap-10">
          {c.works.map((w) => {
            const inner = (
              <>
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-2)]">
                  <Image
                    src={w.img}
                    alt={w.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="t-photo object-cover transition duration-700 group-hover:scale-[1.03]"
                    style={{ objectPosition: w.imgPos }}
                  />
                </div>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {w.kind}
                </p>
                <h3 className="t-display mt-3 text-3xl text-[var(--fg)] md:text-4xl">{w.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--fg-2)]">{w.desc}</p>
                <p className="mt-5 border-t border-[var(--rule)] pt-4 text-[15px] leading-relaxed text-[var(--fg)]">
                  <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/70">
                    {w.factLabel}
                  </span>
                  {w.fact}
                </p>
              </>
            );
            return (
              <li key={w.name}>
                {w.external ? (
                  <a href={w.href} target="_blank" rel="noopener" className="group block">
                    {inner}
                  </a>
                ) : (
                  <Link href={w.href} className="group block">
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
