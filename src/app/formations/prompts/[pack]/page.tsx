import { notFound } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { EmblemBreak } from "@/components/EmblemBreak";
import { PACKS } from "../data";

const MAIN_SITE = "https://troiestudio.fr";
const CAL_URL = "https://cal.com/hugueslourmieres";
const checkoutForPack = (badge: string) =>
  `mailto:contact@troiestudio.fr?subject=TROIE+Prompts+%E2%80%94+Pack+${encodeURIComponent(badge)}+29`;

type Params = Promise<{ pack: string }>;

export async function generateStaticParams() {
  return PACKS.map((p) => ({ pack: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { pack: slug } = await params;
  const pack = PACKS.find((p) => p.slug === slug);
  if (!pack) return {};
  return {
    title: `${pack.badge} · ${pack.title} — TROIE Prompts Vault`,
    description: pack.body,
    alternates: {
      canonical: `https://troiestudio.fr/formations/prompts/${pack.slug}`,
    },
  };
}

/* Theme map - reuse the palette utilisés sur la catalogue */
const THEMES = {
  light: {
    card: "bg-[#ede3d0] text-[#1a1714]",
    border: "border-[#1a1714]/10",
    body: "text-[#1a1714]/80",
    meta: "text-[#1a1714]/60",
    rule: "border-[#1a1714]/15",
    badgeText: "text-[var(--accent)]",
    dotBg: "bg-[var(--accent)]",
    cta: "bg-[#1a1714] text-[#f5f0e6] hover:bg-[var(--accent)]",
  },
  warm: {
    card: "bg-[#5a4a3a] text-[#f5f0e6]",
    border: "border-[#f5f0e6]/10",
    body: "text-[#f5f0e6]/85",
    meta: "text-[#f5f0e6]/60",
    rule: "border-[#f5f0e6]/15",
    badgeText: "text-[var(--accent)]",
    dotBg: "bg-[var(--accent)]",
    cta: "bg-[var(--accent)] text-[#1a1714] hover:bg-[#f5f0e6]",
  },
  dark: {
    card: "bg-[#1a1714] text-[#f5f0e6]",
    border: "border-[#f5f0e6]/15",
    body: "text-[#f5f0e6]/85",
    meta: "text-[#f5f0e6]/60",
    rule: "border-[#f5f0e6]/15",
    badgeText: "text-[var(--accent)]",
    dotBg: "bg-[var(--accent)]",
    cta: "bg-[var(--accent)] text-[#1a1714] hover:bg-[#f5f0e6]",
  },
  linen: {
    card: "bg-[#ebe2cf] text-[#1a1714]",
    border: "border-[#1a1714]/10",
    body: "text-[#1a1714]/80",
    meta: "text-[#1a1714]/60",
    rule: "border-[#1a1714]/15",
    badgeText: "text-[var(--accent)]",
    dotBg: "bg-[var(--accent)]",
    cta: "bg-[#1a1714] text-[#f5f0e6] hover:bg-[var(--accent)]",
  },
  taupe: {
    card: "bg-[#7a6753] text-[#f5f0e6]",
    border: "border-[#f5f0e6]/10",
    body: "text-[#f5f0e6]/85",
    meta: "text-[#f5f0e6]/60",
    rule: "border-[#f5f0e6]/15",
    badgeText: "text-[var(--accent)]",
    dotBg: "bg-[var(--accent)]",
    cta: "bg-[var(--accent)] text-[#1a1714] hover:bg-[#f5f0e6]",
  },
} as const;

export default async function PackDetailPage({ params }: { params: Params }) {
  const { pack: slug } = await params;
  const pack = PACKS.find((p) => p.slug === slug);
  if (!pack) notFound();

  const t = THEMES[pack.theme];

  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* Global FormationsHeader rendered via layout */}
      {/* HERO */}
      <section className="relative border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-24 md:px-12 md:pt-32 md:pb-32">
          <div className="grid gap-16 md:grid-cols-12 md:gap-12 lg:gap-20">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
                {pack.badge} · {pack.sub} · accès à vie
              </p>
              <h1 className="t-display mt-8 text-5xl text-[var(--fg)] md:text-6xl lg:text-[80px]">
                {pack.title}
              </h1>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-[var(--fg-2)]/90 md:text-lg">
                {pack.body}
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={checkoutForPack(pack.badge)}
                  className="group inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
                >
                  Acheter ce pack · 29 €
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#prompts"
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 transition-colors hover:text-[var(--accent)]"
                >
                  Voir les 5 prompts →
                </a>
              </div>
            </div>

            {/* Récap card */}
            <div className="md:col-span-5 md:pt-8">
              <div className={`overflow-hidden rounded-sm border ${t.border} ${t.card}`}>
                <div className="relative flex aspect-square items-center justify-center bg-[#0e0a07] text-[var(--accent)]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-20 w-20 opacity-90"
                    aria-hidden="true"
                  >
                    <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z" />
                  </svg>
                  <span className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]/65">
                    Item · pending
                  </span>
                </div>
                <div className="p-6 md:p-8">
                  <p className={`font-mono text-[10px] uppercase tracking-[0.32em] ${t.badgeText}`}>
                    Inclus dans le pack
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {pack.prompts.map((p) => (
                      <li
                        key={p.title}
                        className={`flex items-start gap-3 text-sm leading-relaxed ${t.body}`}
                      >
                        <span
                          aria-hidden="true"
                          className={`mt-[10px] inline-block h-[3px] w-3 flex-shrink-0 ${t.dotBg}`}
                        />
                        <span>
                          {p.title}
                          {p.freePreview && (
                            <span className={`ml-2 font-mono text-[9px] uppercase tracking-[0.22em] ${t.badgeText}`}>
                              · preview gratuit
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-6 flex items-end justify-between border-t pt-5 ${t.rule}`}>
                    <p className="t-display text-3xl md:text-4xl">29 €</p>
                    <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${t.meta}`}>
                      Accès à vie · MAJ libres
                    </p>
                  </div>
                  <a
                    href={checkoutForPack(pack.badge)}
                    className={`group mt-6 inline-flex w-full items-center justify-center gap-3 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${t.cta}`}
                  >
                    Acheter · 29 €
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* LISTE DES PROMPTS */}
      <section id="prompts" className="border-t border-[var(--rule)] scroll-mt-24">
        <div className="mx-auto max-w-5xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Les 5 system prompts
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Le premier en preview. Les 4 autres : locked.
          </h2>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
            Cliquez n'importe lequel pour voir son scope. Le premier
            est intégralement visible : un cadeau pour juger la
            qualité. Le reste se débloqué avec l'achat.
          </p>

          <div className="mt-16 space-y-6 md:mt-20">
            {pack.prompts.map((p) => {
              const isFree = p.freePreview === true;
              return (
                <article
                  key={p.title}
                  className="overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--bg)]"
                >
                  {/* En-tete */}
                  <div className="border-b border-[var(--rule)] p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                          Prompt {p.number}
                        </p>
                        <h3 className="t-display mt-3 text-2xl text-[var(--fg)] md:text-3xl">
                          {p.title}
                        </h3>
                        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                          {p.subtitle}
                        </p>
                      </div>
                      <span
                        className={`font-mono text-[9px] uppercase tracking-[0.22em] ${
                          isFree ? "text-[var(--accent)]" : "text-[var(--fg-2)]/55"
                        }`}
                      >
                        {isFree ? "Preview gratuit" : "Locked · 29 €"}
                      </span>
                    </div>
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[var(--fg-2)]/55">
                          Pour qui
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]">
                          {p.forWho}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[var(--fg-2)]/55">
                          Quand utiliser
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]">
                          {p.whenToUse}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[var(--fg-2)]/55">
                        Variables :
                      </p>
                      {p.variables.map((v) => (
                        <span
                          key={v}
                          className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]"
                        >
                          [{v}]
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contenu : visible ou floute */}
                  <div className="relative">
                    <pre
                      className={`overflow-x-auto whitespace-pre-wrap p-6 font-mono text-[12px] leading-relaxed text-[var(--fg-2)] md:p-8 md:text-[13px] ${
                        isFree ? "" : "select-none blur-[5px]"
                      }`}
                    >
                      {p.content}
                    </pre>

                    {!isFree && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/85 to-[var(--bg)]/40 p-6">
                        <div className="pointer-events-auto max-w-md rounded-sm border border-[var(--accent)] bg-[var(--bg)] p-6 text-center md:p-8">
                          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                            Locked
                          </p>
                          <p className="t-display mt-3 text-2xl text-[var(--fg)] md:text-3xl">
                            Debloquez ce prompt + 4 autres
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)]">
                            29 € le pack complet (5 prompts). Accès à vie, MAJ
                            libres, garantie 14 jours.
                          </p>
                          <a
                            href={checkoutForPack(pack.badge)}
                            className="group mt-6 inline-flex w-full items-center justify-center gap-3 bg-[var(--fg)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)]"
                          >
                            Acheter le pack · 29 €
                            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer prompt */}
                  <div className="border-t border-[var(--rule)] bg-[var(--bg-2)] px-6 py-5 md:px-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                      Format de sortie
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]">
                      {p.outputHint}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <EmblemBreak size="md" />

      {/* CROSS-SELL : autres packs */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Les autres packs
          </p>
          <h2 className="t-display mt-8 max-w-3xl text-4xl text-[var(--fg)] md:text-5xl lg:text-6xl">
            Bundle des 5 packs · 99 € au lieu de 145 €.
          </h2>

          <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {PACKS.filter((p) => p.slug !== pack.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/formations/prompts/${other.slug}`}
                className="group flex h-full flex-col rounded-sm border border-[var(--rule)] bg-[var(--bg)] p-6 transition-transform hover:-translate-y-1 hover:border-[var(--accent)] md:p-8"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
                  {other.badge}
                </p>
                <h3 className="t-display mt-3 text-2xl text-[var(--fg)] md:text-[26px]">
                  {other.title}
                </h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/60">
                  {other.sub}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)] md:text-[15px]">
                  {other.body}
                </p>
                <div className="flex-1" />
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                  Voir le pack →
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/formations/prompts#bundle"
              className="group inline-flex items-center gap-3 bg-[var(--accent)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[#1a1714] hover:text-[var(--accent)]"
            >
              Voir le bundle complet · 99 €
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="tone-accent border-t border-[var(--rule)] bg-[var(--bg)] text-[var(--fg)]">
        <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
          <div className="grid gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--fg)]/80">
                Prêt a équiper votre IA ?
              </p>
              <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-7xl">
                29 € le pack. Garantie 14 jours.
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--fg)]/85 md:text-lg">
                Si les prompts ne tiennent pas leur promesse pour
                vous, vous m'écrivez et je vous rembourse le jour
                même. Aucune question.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={checkoutForPack(pack.badge)}
                  className="group inline-flex items-center gap-3 bg-[#1a1714] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)] transition-colors hover:bg-[#f5f0e6] hover:text-[#1a1714]"
                >
                  Acheter ce pack · 29 €
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </a>
                <Link
                  href="/formations/cours-01"
                  className="inline-flex items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition-colors hover:text-[var(--bg)]"
                >
                  Ou Cours 01 (97 €) pour aller plus loin →
                </Link>
              </div>
            </div>
            <div className="md:col-span-4 md:border-l md:border-[var(--fg)]/20 md:pl-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)]/70">
                Vous hésitez ?
              </p>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="t-display mt-3 block text-2xl text-[var(--fg)] hover:text-[var(--bg)] md:text-3xl"
              >
                30 min en visio →
              </a>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg)]/75">
                Gratuit. On regarde votre activite, je vous dis quel pack vous fera vraiment gagner du temps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <Logo variant="wordmark-emblem" className="h-10 text-[var(--fg)] md:h-12" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/65">
                Atelier digital · Paris · Formations IA en ligne
              </p>
            </div>
            <div className="flex flex-col gap-2 md:items-end md:justify-end">
              <Link href={MAIN_SITE} className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-2)]/80 transition-colors hover:text-[var(--accent)]">
                Retour au site principal →
              </Link>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-2)]/55">
                © 2026 TROIE Studio
              </p>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}
