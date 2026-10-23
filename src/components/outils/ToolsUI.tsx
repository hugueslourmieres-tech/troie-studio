import Link from "next/link";
import type { ReactNode } from "react";
import { metaDescription, seoTitle } from "@/lib/seo";
import { pageSocial } from "@/lib/og";

/**
 * Briques communes des outils IA gratuits (portés depuis troie.app le
 * 23/10/2026), dessinées dans la charte de l'agence : blanc cassé chaud,
 * titres t-display, cartes blanches rounded-2xl avec bande art granuleuse,
 * bleu réservé aux dates, chiffres et liens. Même grammaire que la section
 * #ia de /accompagnement.
 *
 * Langue : les outils sont rédigés en français. Les routes /en servent le
 * même contenu, précédé d'une ligne d'introduction en anglais, et portent
 * une canonique vers /fr (le sitemap ne liste que /fr).
 */

export const CAL_URL = "https://cal.com/troiestudio/30min";

export type Art = "sky" | "orchid" | "meadow" | "dusk";

export const BTN_DARK =
  "group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 text-[15px] font-medium text-white transition-[background-color,transform] duration-200 hover:bg-[#2a2e37] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
export const BTN_LINK =
  "group inline-flex min-h-12 items-center gap-2 text-[15px] font-medium text-[var(--fg)] underline decoration-[var(--rule-strong)] underline-offset-4 transition-colors hover:decoration-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

export const isEn = (locale: string) => locale === "en";

/** Métadonnées d'un outil : titre et description par langue, canonique vers /fr. */
export function toolMetadata({
  locale,
  path,
  fr,
  en,
}: {
  locale: string;
  path: string;
  fr: { title: string; description: string };
  en: { title: string; description: string };
}) {
  const c = isEn(locale) ? en : fr;
  return {
    title: seoTitle(c.title),
    description: metaDescription(c.description),
    alternates: {
      canonical: `/fr${path}`,
      languages: { fr: `/fr${path}`, en: `/en${path}` },
    },
    ...pageSocial({ locale, path, title: c.title, description: c.description }),
  };
}

export function ArtBand({ art, className = "h-20" }: { art: Art; className?: string }) {
  return (
    <span aria-hidden="true" className={`grain block shrink-0 overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/art/${art}.jpg`} alt="" className="h-full w-full object-cover" />
    </span>
  );
}

export function Arrow() {
  return (
    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
      →
    </span>
  );
}

export function ArrowLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const inner = (
    <span className="inline-flex items-center gap-2">
      {children}
      <Arrow />
    </span>
  );
  return external || href.startsWith("http") || href.startsWith("/api/") ? (
    <a
      href={href}
      className={BTN_LINK}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {inner}
    </a>
  ) : (
    <Link href={href} className={BTN_LINK}>
      {inner}
    </Link>
  );
}

/** Coquille de page : ton clair, espace sous l'en-tête fixe. */
export function ToolShell({ children }: { children: ReactNode }) {
  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)] selection:bg-[var(--accent-soft)]">
      <div aria-hidden="true" className="h-16 md:h-20" />
      {children}
    </div>
  );
}

/** En-tête d'outil : fil d'Ariane discret, titre, introduction, ligne EN. */
export function ToolHero({
  locale,
  crumb = true,
  title,
  intro,
  enLine,
  children,
}: {
  locale: string;
  crumb?: boolean;
  title: string;
  intro: ReactNode;
  enLine?: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-14 pb-16 md:px-12 md:pt-20 md:pb-24">
      {crumb && (
        <nav aria-label={isEn(locale) ? "Breadcrumb" : "Fil d'Ariane"}>
          <Link
            href={`/${locale}/outils`}
            className="inline-flex min-h-10 items-center gap-2 text-sm text-[var(--fg-2)] transition-colors hover:text-[var(--fg)]"
          >
            <span aria-hidden="true">←</span>
            {isEn(locale) ? "Free AI tools" : "Outils IA gratuits"}
          </Link>
        </nav>
      )}
      <div className="max-w-3xl">
        <h1 className="t-display mt-6 text-4xl leading-[1.05] text-[var(--fg)] md:text-6xl">{title}</h1>
        {isEn(locale) && enLine && (
          <p lang="en" className="mt-8 max-w-2xl border-l border-[var(--accent)] pl-4 text-base leading-relaxed text-[var(--fg)]">
            {enLine}
          </p>
        )}
        <div lang="fr" className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)]">
          {intro}
        </div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

/** Section bordée, grille 12 colonnes. */
export function ToolSection({
  id,
  title,
  aside,
  children,
  tone,
}: {
  id?: string;
  title?: string;
  aside?: ReactNode;
  children: ReactNode;
  tone?: "panel";
}) {
  return (
    <section
      id={id}
      lang="fr"
      className={`scroll-mt-24 border-t border-[var(--rule)] ${tone === "panel" ? "bg-[var(--bg-2)]" : ""}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        {title && (
          <div className="grid gap-6 md:grid-cols-12 md:gap-10">
            <h2 className="t-display text-3xl leading-tight text-[var(--fg)] md:col-span-6 md:text-4xl">{title}</h2>
            {aside && (
              <div className="text-base leading-relaxed text-[var(--fg-2)] md:col-span-6 md:pt-2 md:text-lg">{aside}</div>
            )}
          </div>
        )}
        <div className={title ? "mt-12" : ""}>{children}</div>
      </div>
    </section>
  );
}

/** Fin de page commune : l'accompagnement, puis l'appel de 30 minutes. */
export function ToolClosing({ locale }: { locale: string }) {
  const en = isEn(locale);
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div className="overflow-hidden rounded-2xl border border-[var(--rule)] bg-white md:grid md:grid-cols-12">
          <ArtBand art="dusk" className="h-24 md:col-span-4 md:h-auto" />
          <div className="p-8 md:col-span-8 md:p-12">
            <h2 className="t-display text-3xl leading-tight text-[var(--fg)] md:text-4xl">
              {en ? "The tools set the frame. Your teams make it real." : "Les outils posent le cadre. Vos équipes le font vivre."}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
              {en
                ? "We run workshops with your teams on their real cases, then leave you the documents that stay: policy, register, record of the sessions."
                : "Nous animons des ateliers avec vos équipes sur leurs cas réels, puis nous vous laissons les documents qui restent : charte, registre, trace des séances."}
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
              <a href={CAL_URL} target="_blank" rel="noreferrer" className={BTN_DARK}>
                {en ? "Book 30 min" : "Réserver 30 min"}
                <Arrow />
              </a>
              <ArrowLink href={`/${locale}/accompagnement#ia`}>
                {en ? "Workshops with your teams" : "Les ateliers avec vos équipes"}
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LegalNote({ children }: { children: ReactNode }) {
  return <p className="mt-10 max-w-3xl text-sm leading-relaxed text-[var(--fg-2)]">{children}</p>;
}
