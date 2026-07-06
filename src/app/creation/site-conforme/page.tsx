import Link from "next/link";
import type { Metadata } from "next";

const CAL_URL = "https://cal.com/troiestudio/30min";

export const metadata: Metadata = {
  title:
    "Pack site conforme : site vitrine + accessibilité (RGAA) + AI Act, à partir de 1 500 €",
  description:
    "Création ou refonte de votre site vitrine avec la conformité incluse : accessibilité (EAA/RGAA), mentions et charte IA (AI Act). Prix fixe annoncé à l'avance, livré par l'atelier TROIE à Nice.",
  alternates: { canonical: "https://troiestudio.fr/creation/site-conforme" },
  openGraph: {
    type: "website",
    url: "https://troiestudio.fr/creation/site-conforme",
    title: "Pack site conforme : votre site aux normes, une bonne fois",
    description:
      "Site vitrine + accessibilité RGAA + volet AI Act, à partir de 1 500 €. L'offre productisée de TROIE Studio.",
  },
};

/* Reperes reglementaires. Verifies juillet 2026 : ordonnance Carrefour
   du 4 juin 2026 (astreinte 500 EUR/jour, obligation de resultat). */
const TIMELINE = [
  {
    date: "28 juin 2025",
    title: "L'accessibilité devient obligatoire",
    body: "Directive (UE) 2019/882 : tout e-commerce et service en ligne au-delà de 10 salariés ou 2 M€ de CA doit être accessible. Les sites vitrines des entreprises concernées sont en première ligne.",
    status: "past",
  },
  {
    date: "4 juin 2026",
    title: "Carrefour condamné sous astreinte",
    body: "Ordonnance du 4 juin 2026 : obligation de résultat, mise en conformité sous 6 mois, astreinte de 500 € par jour de retard. La jurisprudence est posée, et elle ne vise pas que les géants.",
    status: "now",
  },
  {
    date: "2 août 2026",
    title: "L'AI Act devient contrôlable",
    body: "Les autorités nationales peuvent contrôler et sanctionner. Si votre site utilise un chatbot ou publie des contenus générés par IA, la transparence devient exigible.",
    status: "now",
  },
];

const INCLUS = [
  {
    step: "01",
    title: "Le site",
    body: "Création ou refonte de votre site vitrine : design dans les règles de l'art, rapide, responsive, écrit pour convertir. Fait à l'atelier, à Nice.",
  },
  {
    step: "02",
    title: "L'accessibilité",
    body: "Conforme au référentiel RGAA dès la conception : navigation clavier, lecteur d'écran, contrastes, formulaires étiquetés. Avec la déclaration d'accessibilité publiée.",
  },
  {
    step: "03",
    title: "Le volet IA",
    body: "Mentions de transparence (chatbot déclaré, contenus IA signalés) et charte d'usage IA d'une page pour vos équipes : le socle AI Act de votre site.",
  },
  {
    step: "04",
    title: "La preuve",
    body: "Un dossier de conformité livré avec le site : audit final, déclaration, charte. Ce qui vous protège en cas de contrôle ou de signalement.",
  },
];

const FAQ = [
  {
    q: "Combien coûte le pack site conforme ?",
    a: "À partir de 1 500 €, avec un prix fixe annoncé avant de commencer (fourchette 1 500 à 3 500 € selon le périmètre : nombre de pages, e-commerce ou vitrine, contenus à reprendre). Pas de facturation au temps passé.",
  },
  {
    q: "Mon site actuel peut-il être mis en conformité sans refonte ?",
    a: "Souvent, oui. L'audit gratuit le détermine : si la base technique est saine, on corrige par lots. Si elle ne l'est pas, la refonte conforme coûte souvent moins cher que la rustine.",
  },
  {
    q: "Suis-je concerné par l'obligation d'accessibilité ?",
    a: "Si votre entreprise dépasse 10 salariés ou 2 M€ de chiffre d'affaires et vend en ligne, oui, depuis le 28 juin 2025. En dessous, l'accessibilité reste un avantage : près d'une personne sur six vit avec un handicap (OMS).",
  },
  {
    q: "Que se passe-t-il après la livraison ?",
    a: "Votre site évolue, la conformité doit suivre. Notre supervision mensuelle (500 à 1 500 € par mois) re-teste chaque mise en production, accessibilité et IA comprises, et tient votre documentation à jour.",
  },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/**
 * Offre productisee "pack site conforme" : creation/refonte de site
 * vitrine + accessibilite (EAA/RGAA) + volet AI Act, prix fixe.
 * Pont officiel entre l'univers conformite (/ia/accessibilite,
 * /ia/ai-act) et la creation (cross-sell assume).
 */
export default function SiteConformePage() {
  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      {/* Mini header */}
      <header className="border-b border-[var(--rule)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:text-[var(--accent)]"
          >
            ← TROIE · Studio
          </Link>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 bg-[var(--accent)] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
          >
            Audit gratuit · 30 min
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:px-12 md:pt-28 md:pb-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Création · Pack site conforme
        </p>
        <h1 className="t-display mt-8 max-w-4xl text-5xl leading-[1.02] text-[var(--fg)] md:text-7xl">
          Votre site, aux normes, une bonne fois pour toutes.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)] md:text-xl">
          Un site vitrine créé ou refondu par l&apos;atelier, avec la
          conformité incluse dès la conception : accessibilité (RGAA),
          transparence IA (AI Act), et le dossier de preuve qui va avec.
          Prix fixe annoncé avant de commencer, à partir de 1 500 €.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1714]"
          >
            Demander mon prix fixe · gratuit
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </a>
          <Link
            href="/ia/accessibilite"
            className="border-b border-[var(--fg)] pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Pourquoi c&apos;est obligatoire
          </Link>
        </div>
      </section>

      {/* Reperes reglementaires */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Pourquoi maintenant
          </p>
          <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
            Deux obligations, une seule refonte.
          </h2>
          <ol className="mt-12 space-y-px">
            {TIMELINE.map((t) => (
              <li
                key={t.date}
                className={`grid gap-3 border-l-2 px-6 py-6 md:grid-cols-12 md:gap-8 ${
                  t.status === "now"
                    ? "border-[var(--accent)] bg-[var(--bg)]"
                    : "border-[var(--fg)]/30 bg-transparent"
                }`}
              >
                <div className="md:col-span-3">
                  <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--fg)]">
                    {t.date}
                  </p>
                  <p className={`mt-1 font-mono text-[9px] uppercase tracking-[0.22em] ${
                    t.status === "past" ? "text-[var(--fg-2)]/60" : "text-[var(--accent)]"
                  }`}>
                    {t.status === "past" ? "✓ En vigueur" : "● Actualité"}
                  </p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="t-display text-xl text-[var(--fg)] md:text-2xl">{t.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--fg-2)] md:text-base">
                    {t.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Ce qui est inclus
          </p>
          <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
            Un pack, quatre livrables.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {INCLUS.map((b) => (
              <div key={b.step} className="flex flex-col rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">{b.step}</p>
                <h3 className="t-display mt-4 text-xl text-[var(--fg)] md:text-2xl">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)]">{b.body}</p>
              </div>
            ))}
          </div>

          {/* Prix */}
          <div className="mt-12 grid gap-8 rounded-sm bg-[#1a1714] p-8 text-[#f5f0e6] md:grid-cols-12 md:items-center md:p-12">
            <div className="md:col-span-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
                Prix fixe, annoncé avant de commencer
              </p>
              <p className="t-display mt-4 text-4xl md:text-5xl">
                à partir de 1 500 €
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#f5f0e6]/75 md:text-base">
                Fourchette 1 500 à 3 500 € selon le périmètre (nombre de
                pages, vitrine ou e-commerce, contenus à reprendre). Le prix
                exact est posé par écrit après l&apos;audit gratuit, et il ne
                bouge plus.
              </p>
            </div>
            <div className="md:col-span-5">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full items-center justify-center gap-3 bg-[var(--accent)] px-8 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[#f5f0e6]"
              >
                Obtenir mon prix fixe
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </a>
              <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-[#f5f0e6]/50">
                30 minutes · réponse écrite sous 48 h
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Questions fréquentes
          </p>
          <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
            Ce qu&apos;on nous demande.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2">
            {FAQ.map((f) => (
              <div key={f.q} className="bg-[var(--bg)] p-8 md:p-10">
                <h3 className="t-display text-xl text-[var(--fg)] md:text-2xl">{f.q}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/ia/accessibilite"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
            >
              Le détail de l&apos;obligation accessibilité →
            </Link>
            <Link
              href="/ia/ai-act"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
            >
              Le détail de l&apos;AI Act →
            </Link>
            <Link
              href="/formations"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
            >
              Former vos équipes à l&apos;IA →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer minimal + disclaimer */}
      <footer className="border-t border-[var(--rule)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 md:px-12">
          <p className="max-w-3xl text-xs leading-relaxed text-[var(--fg-2)]/70">
            Repères réglementaires vérifiés en juillet 2026 (directive (UE)
            2019/882, règlement (UE) 2024/1689, ordonnance du 4 juin 2026).
            Cette page est une synthèse pédagogique, pas un conseil
            juridique.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/55">
            TROIE Studio · Nice · <Link href="/" className="underline underline-offset-4 hover:text-[var(--accent)]">troiestudio.fr</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
