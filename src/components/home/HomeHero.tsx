import Link from "next/link";
import { LetterReveal } from "@/components/LetterReveal";
import { Reveal } from "@/components/Reveal";
import type { NeedSlug } from "@/lib/needs";
import { NeedLink } from "./NeedLink";

/**
 * Bloc 1 de l'accueil (refonte du 16/09/2026) : la promesse et les quatre
 * besoins. Un seul parcours, « voici mon besoin, voici votre proposition
 * adaptée ». Chaque carte montre un exemple concret et une réalisation, et
 * son bouton présélectionne le besoin dans le formulaire (#projet).
 *
 * Les offres chiffrées ne s'affichent plus ici : elles servent de cadres
 * internes, les prix vivent dans les propositions.
 */

type Line = { lead: string; em: string; emFirst?: boolean };
type Need = {
  slug: NeedSlug;
  title: string;
  example: string;
  work: { label: string; href: string };
};

const COPY: Record<
  "fr" | "en",
  {
    eyebrow: string;
    lines: Line[];
    sub: string;
    cta: string;
    works: string;
    needsLabel: string;
    exampleLabel: string;
    workLabel: string;
    needs: Need[];
  }
> = {
  fr: {
    eyebrow: "Studio créatif et technique, à Nice",
    lines: [
      { lead: "Un site à", em: "lancer." },
      { lead: "Des contenus à", em: "produire." },
      { lead: "Des tâches à", em: "automatiser." },
    ],
    sub: "TROIE réunit création, développement et stratégie pour répondre à votre besoin, du premier cadrage à la mise en ligne.",
    cta: "Décrire mon projet",
    works: "Voir nos réalisations",
    needsLabel: "Votre besoin",
    exampleLabel: "Exemple",
    workLabel: "Réalisation",
    needs: [
      {
        slug: "site",
        title: "Créer un site ou une application",
        example: "Un site vitrine bilingue et rapide, que Google et les IA comprennent.",
        work: { label: "LOIR Paris, boutique en ligne", href: "/fr/creation/web" },
      },
      {
        slug: "automatisation",
        title: "Automatiser des tâches",
        example: "Une demande arrive, un agent prépare le devis, votre équipe vérifie et l'envoie.",
        work: { label: "Le scan IA, un site analysé en 60 secondes", href: "/fr/scan-ia" },
      },
      {
        slug: "visibilite",
        title: "Développer ma visibilité",
        example: "Des pages que Google classe bien et que ChatGPT peut citer.",
        work: { label: "Rutherford, trafic organique doublé en six mois", href: "#realisations" },
      },
      {
        slug: "contenus",
        title: "Produire des contenus et des images",
        example: "Un reportage sur vos équipes, décliné pour le site et les réseaux.",
        work: { label: "Wauters B'Pack, reportage industriel", href: "/fr/works/wauters-bpack" },
      },
    ],
  },
  en: {
    eyebrow: "Creative and technical studio in Nice, France",
    lines: [
      { em: "Launch", lead: "your website.", emFirst: true },
      { em: "Create", lead: "your content.", emFirst: true },
      { em: "Automate", lead: "your work.", emFirst: true },
    ],
    sub: "TROIE brings together design, development and strategy to take your project from the first brief to launch.",
    cta: "Tell us about your project",
    works: "View our work",
    needsLabel: "What you need",
    exampleLabel: "Example",
    workLabel: "Our work",
    needs: [
      {
        slug: "site",
        title: "Build a website or an app",
        example: "A fast, bilingual company website that Google and AI tools understand.",
        work: { label: "LOIR Paris, online store", href: "/en/creation/web" },
      },
      {
        slug: "automatisation",
        title: "Automate tasks",
        example: "A request comes in, an agent drafts the quote, your team checks it and sends it.",
        work: { label: "The AI scan, a website analysed in 60 seconds", href: "/en/scan-ia" },
      },
      {
        slug: "visibilite",
        title: "Grow my visibility",
        example: "Pages that rank well on Google and that ChatGPT can quote.",
        work: { label: "Rutherford, organic traffic doubled in six months", href: "#realisations" },
      },
      {
        slug: "contenus",
        title: "Produce content and images",
        example: "A photo story about your teams, adapted for your website and social media.",
        work: { label: "Wauters B'Pack, industrial photo story", href: "/en/works/wauters-bpack" },
      },
    ],
  },
};

const ctaDark =
  "group inline-flex items-center gap-3 whitespace-nowrap bg-[var(--ink)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--bg-2)] hover:text-[var(--fg)]";

export function HomeHero({ locale }: { locale: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];
  const title = c.lines
    .map((l) => (l.emFirst ? `${l.em} ${l.lead}` : `${l.lead} ${l.em}`))
    .join(" ");

  return (
    <section className="tone-accent relative bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-7xl px-6 pt-36 pb-20 md:px-12 md:pt-48 md:pb-28">
        <p className="t-eyebrow">{c.eyebrow}</p>

        {/* Trois phrases courtes, une par ligne. Le verbe porte l'accent en
            italique : sur le fond orange, la couleur ne peut pas le faire. */}
        <h1
          className="t-display mt-8 leading-[1.02] text-[var(--fg)] text-[clamp(1.6rem,7.6vw,3.4rem)] md:text-[clamp(3.6rem,6.5vw,6.9rem)]"
          aria-label={title}
        >
          {c.lines.map((l, i) => (
            <span key={i} aria-hidden="true" className="block">
              {l.emFirst ? (
                <>
                  <span className="italic">
                    <LetterReveal text={l.em} delay={i * 0.22} />
                  </span>{" "}
                  <LetterReveal text={l.lead} delay={i * 0.22 + 0.3} />
                </>
              ) : (
                <>
                  <LetterReveal text={l.lead} delay={i * 0.22} />{" "}
                  <span className="italic">
                    <LetterReveal text={l.em} delay={i * 0.22 + 0.4} />
                  </span>
                </>
              )}
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-end lg:gap-12">
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--fg-2)] md:text-xl lg:col-span-7">
            {c.sub}
          </p>
          <div className="flex flex-col flex-wrap items-start gap-6 sm:flex-row sm:items-center lg:col-span-5 lg:justify-end">
            <NeedLink className={ctaDark}>
              {c.cta}
              <span aria-hidden="true" className="transition group-hover:translate-x-1">
                →
              </span>
            </NeedLink>
            <a
              href="#realisations"
              className="inline-flex items-center whitespace-nowrap border-b-2 border-[var(--fg)] pb-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:opacity-70"
            >
              {c.works}
            </a>
          </div>
        </div>

        {/* Les quatre besoins */}
        <div id="expertises" className="mt-20 scroll-mt-28 md:mt-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--fg)]/70">
            {c.needsLabel}
          </p>
          <ul className="mt-5 grid gap-px border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-4">
            {c.needs.map((n, i) => (
              <li key={n.slug} className="flex bg-[var(--bg)]">
                <Reveal delay={i * 0.06} className="flex w-full">
                  <div className="flex w-full flex-col p-7 md:p-8">
                    <h2
                      data-writeon="off"
                      className="t-display text-balance text-[1.75rem] leading-[1.08] text-[var(--fg)] md:text-[2rem]"
                    >
                      {n.title}
                    </h2>
                    <dl className="mt-7 space-y-5 text-[15px] leading-relaxed">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--fg)]/60">
                          {c.exampleLabel}
                        </dt>
                        <dd className="mt-2 text-[var(--fg-2)]">{n.example}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--fg)]/60">
                          {c.workLabel}
                        </dt>
                        <dd className="mt-2">
                          {n.work.href.startsWith("#") ? (
                            <a
                              href={n.work.href}
                              className="border-b border-[var(--fg)]/35 pb-0.5 text-[var(--fg)] transition hover:border-[var(--fg)]"
                            >
                              {n.work.label}
                            </a>
                          ) : (
                            <Link
                              href={n.work.href}
                              className="border-b border-[var(--fg)]/35 pb-0.5 text-[var(--fg)] transition hover:border-[var(--fg)]"
                            >
                              {n.work.label}
                            </Link>
                          )}
                        </dd>
                      </div>
                    </dl>
                    <NeedLink
                      need={n.slug}
                      className="group mt-auto inline-flex items-center gap-2 self-start pt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:opacity-70"
                    >
                      <span className="border-b border-[var(--fg)] pb-0.5">{c.cta}</span>
                      <span aria-hidden="true" className="transition group-hover:translate-x-1">
                        →
                      </span>
                    </NeedLink>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
