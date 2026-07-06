import Link from "next/link";
import type { Metadata } from "next";

const CAL_URL = "https://cal.com/troiestudio/30min";

export const metadata: Metadata = {
  title: "AI Act entreprise : êtes-vous concerné ? Obligations, dates, plan d'action",
  description:
    "Le règlement européen sur l'IA s'applique déjà : littératie IA et interdictions depuis février 2025, transparence en 2026. Ce que votre PME doit faire, et ce que TROIE prend en charge : diagnostic, formation, conformité continue.",
  alternates: { canonical: "https://troiestudio.fr/ia/ai-act" },
  openGraph: {
    type: "article",
    url: "https://troiestudio.fr/ia/ai-act",
    title: "AI Act : ce que votre entreprise doit faire, sans paniquer",
    description:
      "Dates clés, obligations réelles pour les PME, sanctions, et un plan d'action en 4 briques à prix publiés.",
  },
};

/* Échéances du règlement (UE) 2024/1689. Vérifié juillet 2026 :
   le paquet Digital Omnibus (2026) ajuste le calendrier haut risque,
   mais littératie, interdictions et GPAI sont déjà en vigueur. */
const TIMELINE = [
  {
    date: "1er août 2024",
    title: "Entrée en vigueur",
    body: "Le règlement (UE) 2024/1689 est adopté. Le compte à rebours démarre pour toutes les entreprises qui utilisent l'IA dans l'Union.",
    status: "past",
  },
  {
    date: "2 février 2025",
    title: "Interdictions + littératie IA",
    body: "Les pratiques à risque inacceptable sont interdites. Surtout : l'article 4 impose de former à l'IA toute équipe qui l'utilise. C'est déjà applicable, et c'est la marche la plus simple à monter.",
    status: "past",
  },
  {
    date: "2 août 2025",
    title: "Modèles d'IA générative (GPAI)",
    body: "Obligations pour les fournisseurs de grands modèles. Impact indirect pour vous : vos fournisseurs d'outils IA doivent être conformes, à vérifier dans vos contrats.",
    status: "past",
  },
  {
    date: "2 août 2026",
    title: "Application générale",
    body: "Transparence obligatoire : chatbots déclarés comme IA, contenus générés signalés, deepfakes étiquetés. Le gros des obligations pour les déployeurs entre en application.",
    status: "now",
  },
  {
    date: "2027 et après",
    title: "Haut risque (calendrier en ajustement)",
    body: "RH, crédit, éducation, infrastructures : exigences renforcées. Le paquet Digital Omnibus (2026) allège et décale une partie de ces échéances, mais ne touche pas à ce qui est déjà en vigueur.",
    status: "future",
  },
];

const OBLIGATIONS = [
  {
    q: "Vos équipes utilisent ChatGPT, Claude ou Gemini ?",
    a: "Article 4 : vous devez garantir un niveau suffisant de littératie IA (formation adaptée au contexte d'usage). Applicable depuis février 2025.",
  },
  {
    q: "Un chatbot parle à vos clients ?",
    a: "Transparence : l'utilisateur doit savoir qu'il parle à une IA. Applicable à l'échéance d'août 2026.",
  },
  {
    q: "Vous publiez des contenus générés par IA ?",
    a: "Les contenus synthétiques (images, audio, vidéo) devront être identifiables comme tels. Les deepfakes doivent être étiquetés.",
  },
  {
    q: "Vous triez des CV ou scorez des clients avec l'IA ?",
    a: "Vous êtes probablement en zone haut risque : documentation, supervision humaine, registre. Le calendrier précis bouge encore, la préparation, elle, ne peut pas attendre.",
  },
];

const BRIQUES = [
  {
    step: "01",
    title: "Audit IA gratuit",
    price: "0 €",
    body: "30 minutes : on identifie vos usages IA réels et vos obligations actuelles. Réponse écrite sous 48 h.",
  },
  {
    step: "02",
    title: "Diagnostic IA & conformité",
    price: "1 500 à 3 000 €",
    body: "Cartographie de vos systèmes, classement par niveau de risque, registre des usages, plan d'action daté.",
  },
  {
    step: "03",
    title: "Formation littératie IA",
    price: "dès 990 €",
    body: "L'obligation la plus immédiate (article 4). Formation de vos équipes documentée : la preuve de conformité est incluse.",
  },
  {
    step: "04",
    title: "Supervision continue",
    price: "500 à 1 500 € / mois",
    body: "Veille réglementaire, registre tenu à jour, contrôles périodiques de vos agents. La conformité qui ne se périme pas.",
  },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: OBLIGATIONS.map((o) => ({
    "@type": "Question",
    name: o.q,
    acceptedAnswer: { "@type": "Answer", text: o.a },
  })),
};

/**
 * Page Conformité AI Act : la porte d'entrée SEO/commerciale du
 * positionnement (requêtes "AI Act entreprise"). Univers /ia (B2B).
 */
export default function AiActPage() {
  return (
    <div className="tone-light bg-[var(--bg)] text-[var(--fg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      {/* Mini header, retour IA Pro */}
      <header className="border-b border-[var(--rule)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
          <Link
            href="/ia"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:text-[var(--accent)]"
          >
            ← TROIE · IA Pro
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

      {/* Bandeau compte a rebours : controles a partir du 2 aout 2026 */}
      <div className="border-b border-[var(--rule)] bg-[#1a1714]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-3.5 md:px-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f5f0e6]">
            <span className="text-[var(--accent)]">Le 2 août 2026</span>, l&apos;AI Act devient contrôlable. Votre plan de formation est-il documenté ?
          </p>
          <Link
            href="/fr/blog/ai-act-controlable-2-aout-2026"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] transition hover:text-[#f5f0e6]"
          >
            Ce qui change →
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:px-12 md:pt-28 md:pb-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Conformité · Règlement (UE) 2024/1689
        </p>
        <h1 className="t-display mt-8 max-w-4xl text-5xl leading-[1.02] text-[var(--fg)] md:text-7xl">
          L&apos;AI Act s&apos;applique déjà. Pas de panique, une méthode.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)] md:text-xl">
          Depuis février 2025, toute entreprise dont les équipes utilisent
          l&apos;IA doit les former (article 4). En 2026, la transparence
          devient obligatoire. La taille de votre entreprise ne vous exonère
          pas, mais la mise en conformité d&apos;une PME est un chantier
          court quand il est bien cadré.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 bg-[var(--fg)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-[#1a1714]"
          >
            Vérifier ma situation · gratuit
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </a>
          <Link
            href="/ia#tarifs"
            className="border-b border-[var(--fg)] pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Voir les tarifs
          </Link>
        </div>
      </section>

      {/* Échéances */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Les dates qui comptent
          </p>
          <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
            Trois échéances sont déjà passées.
          </h2>
          <ol className="mt-12 space-y-px">
            {TIMELINE.map((t) => (
              <li
                key={t.date}
                className={`grid gap-3 border-l-2 px-6 py-6 md:grid-cols-12 md:gap-8 ${
                  t.status === "now"
                    ? "border-[var(--accent)] bg-[var(--bg)]"
                    : t.status === "past"
                      ? "border-[var(--fg)]/30 bg-transparent"
                      : "border-[var(--rule)] bg-transparent"
                }`}
              >
                <div className="md:col-span-3">
                  <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--fg)]">
                    {t.date}
                  </p>
                  <p className={`mt-1 font-mono text-[9px] uppercase tracking-[0.22em] ${
                    t.status === "past" ? "text-[var(--fg-2)]/60" : t.status === "now" ? "text-[var(--accent)]" : "text-[var(--fg-2)]/45"
                  }`}>
                    {t.status === "past" ? "✓ En vigueur" : t.status === "now" ? "● Échéance en cours" : "À venir"}
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

      {/* Concerné ? */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Êtes-vous concerné ?
          </p>
          <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
            Quatre questions suffisent.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2">
            {OBLIGATIONS.map((o) => (
              <div key={o.q} className="bg-[var(--bg)] p-8 md:p-10">
                <h3 className="t-display text-xl text-[var(--fg)] md:text-2xl">{o.q}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)] md:text-base">{o.a}</p>
              </div>
            ))}
          </div>

          {/* Sanctions */}
          <div className="mt-12 grid gap-8 rounded-sm bg-[#1a1714] p-8 text-[#f5f0e6] md:grid-cols-3 md:p-12">
            {[
              ["35 M€ ou 7 %", "du CA mondial : pratiques interdites"],
              ["15 M€ ou 3 %", "du CA mondial : non-conformité haut risque"],
              ["7,5 M€ ou 1 %", "du CA mondial : manquements de transparence"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="t-display text-3xl text-[var(--accent)] md:text-4xl">{n}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#f5f0e6]/75">{l}</p>
              </div>
            ))}
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f5f0e6]/50 md:col-span-3">
              Pour les PME, le montant retenu est le moindre des deux. La bonne nouvelle : la conformité coûte deux ordres de grandeur de moins.
            </p>
          </div>
        </div>
      </section>

      {/* Minimum vital avant le 2 aout */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Avant le 2 août
          </p>
          <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
            Le minimum vital en 4 semaines.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Cartographier",
                body: "Lister les outils d'IA utilisés dans l'entreprise, officiels et officieux. Le shadow IT compte aussi.",
              },
              {
                step: "02",
                title: "Cadrer",
                body: "Une charte d'usage d'une page : usages autorisés, données interdites, validation humaine.",
              },
              {
                step: "03",
                title: "Former",
                body: "Une formation proportionnée par profil d'usage, avec trace écrite (attestations nominatives).",
              },
              {
                step: "04",
                title: "Documenter",
                body: "Conserver la preuve des trois points précédents. C'est elle qui vous protège en cas de contrôle.",
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">{s.step}</p>
                <h3 className="t-display mt-4 text-xl text-[var(--fg)] md:text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)]">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[var(--fg-2)]">
            Le détail, les trois questions pour savoir si vous êtes concerné
            et la FAQ complète sont dans notre article :{" "}
            <Link
              href="/fr/blog/ai-act-controlable-2-aout-2026"
              className="underline underline-offset-4 transition hover:text-[var(--accent)]"
            >
              AI Act : ce qui devient contrôlable le 2 août 2026
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Plan d'action TROIE */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg-2)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Le plan d&apos;action
          </p>
          <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
            Quatre briques, prix publiés.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {BRIQUES.map((b) => (
              <div key={b.step} className="flex flex-col rounded-sm border border-[var(--rule)] bg-[var(--bg)] p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">{b.step}</p>
                <h3 className="t-display mt-4 text-xl text-[var(--fg)] md:text-2xl">{b.title}</h3>
                <p className="t-display mt-4 text-2xl text-[var(--fg)]">{b.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)]">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 bg-[var(--accent)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1714] transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
            >
              Commencer par l&apos;audit gratuit
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </a>
            <Link
              href="/ia#tarifs"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
            >
              Le détail des offres IA Pro →
            </Link>
            <Link
              href="/ia/accessibilite"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
            >
              L&apos;autre échéance conformité : accessibilité web →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer minimal + disclaimer */}
      <footer className="border-t border-[var(--rule)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 md:px-12">
          <p className="max-w-3xl text-xs leading-relaxed text-[var(--fg-2)]/70">
            Informations vérifiées en juillet 2026 sur la base du règlement
            (UE) 2024/1689 et des ajustements du paquet Digital Omnibus. Cette
            page est une synthèse pédagogique, pas un conseil juridique : pour
            une analyse opposable, consultez votre conseil.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/55">
            TROIE Studio · Nice · <Link href="/ia" className="underline underline-offset-4 hover:text-[var(--accent)]">ia.troiestudio.fr</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
