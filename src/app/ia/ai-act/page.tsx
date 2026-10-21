import Link from "next/link";
import type { Metadata } from "next";
import { GreekMark } from "@/components/GreekMark";
import { OG_IMAGE } from "@/lib/og";

const CAL_URL = "https://cal.com/troiestudio/30min";

export const metadata: Metadata = {
  title: "AI Act entreprise : êtes-vous concerné ? Obligations, dates, plan d'action",
  description:
    "Le règlement européen sur l'IA s'applique déjà : littératie IA et interdictions depuis février 2025, transparence depuis août 2026. Ce que votre PME doit faire, et ce que TROIE peut prendre en charge : diagnostic, atelier de sensibilisation, suivi.",
  alternates: { canonical: "https://troiestudio.fr/ia/ai-act" },
  // openGraph et twitter déclarés en entier : sinon la page hérite de ceux
  // du layout /ia (titre et texte de la page Organisation et outils).
  openGraph: {
    type: "article",
    url: "https://troiestudio.fr/ia/ai-act",
    title: "AI Act : ce que votre entreprise doit faire, sans paniquer",
    description:
      "Dates clés, obligations réelles pour les PME, sanctions, et un plan d'action en 4 étapes.",
    siteName: "TROIE Studio",
    locale: "fr_FR",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Act : ce que votre entreprise doit faire, sans paniquer",
    description:
      "Dates clés, obligations réelles pour les PME, sanctions, et un plan d'action en 4 étapes.",
    images: [OG_IMAGE.url],
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
    body: "Les pratiques à risque inacceptable sont interdites. Surtout : l'article 4 demande d'agir sur la maîtrise de l'IA de toute équipe qui l'utilise. C'est déjà applicable, et c'est la marche la plus simple à monter.",
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
    status: "past",
  },
  {
    date: "2 décembre 2027",
    title: "Haut risque, reporté",
    body: "RH, crédit, éducation, infrastructures : exigences renforcées. Le règlement (UE) 2026/1744 les a reportées au 2 décembre 2027 (annexe III) et au 2 août 2028 (annexe I). L'article 4 et la transparence ne bougent pas.",
    status: "future",
  },
];

const OBLIGATIONS = [
  {
    q: "Vos équipes utilisent ChatGPT, Claude ou Gemini ?",
    a: "Article 4 : vous devez prendre des mesures pour garantir un niveau suffisant de maîtrise de l'IA, adapté à l'usage de chacun. Applicable depuis février 2025.",
  },
  {
    q: "Un chatbot parle à vos clients ?",
    a: "Transparence : l'utilisateur doit savoir qu'il parle à une IA. Applicable depuis août 2026.",
  },
  {
    q: "Vous publiez des contenus générés par IA ?",
    a: "Les contenus synthétiques (images, audio, vidéo) devront être identifiables comme tels. Les deepfakes doivent être étiquetés.",
  },
  {
    q: "Vous triez des CV ou scorez des clients avec l'IA ?",
    a: "Vous êtes probablement en zone haut risque : documentation, supervision humaine, registre. Le règlement (UE) 2026/1744 a reporté ces obligations au 2 décembre 2027 (annexe III). Mieux vaut s'y préparer dès maintenant.",
  },
];

const BRIQUES = [
  {
    step: "01",
    title: "Premier échange",
    terms: "30 minutes",
    body: "Nous identifions vos usages IA réels et vos obligations actuelles.",
  },
  {
    step: "02",
    title: "Diagnostic IA & conformité",
    terms: "Sur devis, selon périmètre",
    body: "Cartographie de vos systèmes, classement par niveau de risque, registre des usages, plan d'action daté.",
  },
  {
    step: "03",
    title: "Atelier de sensibilisation",
    terms: "Sur devis, selon l'équipe",
    body: "Une mesure simple pour l'article 4 : un atelier adapté à vos usages, avec une trace écrite par participant.",
  },
  {
    step: "04",
    title: "Supervision continue",
    terms: "Chaque mois",
    body: "Veille réglementaire, registre tenu à jour, contrôles périodiques de vos outils.",
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

      {/* Mini header, retour vers l'accompagnement du studio */}
      <header className="border-b border-[var(--rule)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 md:px-12">
          <Link
            href="/fr/accompagnement"
            className="inline-flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:text-[var(--accent)]"
          >
            ← TROIE Studio
          </Link>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2.5 whitespace-nowrap bg-[var(--accent)] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#111318] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)]"
          >
            Réserver 30 min
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:px-12 md:pt-28 md:pb-24">
        <GreekMark
          label="Conformité, Règlement (UE) 2024/1689"
          labelClassName="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]"
        />
        <h1 className="t-display mt-8 max-w-4xl text-5xl leading-[1.02] text-[var(--fg)] md:text-7xl">
          L&apos;AI Act s&apos;applique déjà. Pas de panique, une méthode.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)] md:text-xl">
          Depuis février 2025, l&apos;article 4 demande aux entreprises qui
          utilisent l&apos;IA de prendre des mesures pour que leurs équipes
          aient un niveau suffisant de maîtrise de l&apos;IA. Depuis août
          2026, la transparence est exigible. La taille de votre entreprise
          ne vous exonère pas, mais la mise en conformité d&apos;une PME est
          un chantier court quand il est bien cadré.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-[52px] items-center gap-3 bg-[var(--accent)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#111318] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)]"
          >
            Réserver 30 min
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </a>
          <Link
            href="/ia#tarifs"
            className="border-b border-[var(--fg)] pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Voir la méthode
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
            Les échéances, dans l&apos;ordre.
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
          <div className="mt-12 grid gap-8 rounded-sm bg-[var(--ink)] p-8 text-[#fcfcfd] md:grid-cols-3 md:p-12">
            {[
              ["35 M€ ou 7 %", "du CA mondial : pratiques interdites"],
              ["15 M€ ou 3 %", "du CA mondial : non-conformité haut risque"],
              ["7,5 M€ ou 1 %", "du CA mondial : manquements de transparence"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="t-display text-3xl text-[var(--accent)] md:text-4xl">{n}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#fcfcfd]/75">{l}</p>
              </div>
            ))}
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#fcfcfd]/50 md:col-span-3">
              Pour les PME, le montant retenu est le moindre des deux. L&apos;article 4 (littératie) n&apos;est pas dans cette liste : l&apos;article 99 ne prévoit pas d&apos;amende dédiée.
            </p>
          </div>
        </div>
      </section>

      {/* Le minimum à mettre en place */}
      <section className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
            Par où commencer
          </p>
          <h2 className="t-display mt-6 max-w-3xl text-3xl text-[var(--fg)] md:text-5xl">
            Le minimum à mettre en place.
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
                title: "Sensibiliser",
                body: "Un atelier adapté à chaque usage, avec une trace écrite par participant.",
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
              AI Act : ce qui est contrôlable depuis le 2 août 2026
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
            Quatre étapes, un devis clair.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {BRIQUES.map((b) => (
              <div key={b.step} className="flex flex-col rounded-sm border border-[var(--rule)] bg-[var(--bg)] p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">{b.step}</p>
                <h3 className="t-display mt-4 text-xl text-[var(--fg)] md:text-2xl">{b.title}</h3>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/70">{b.terms}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-2)]">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 bg-[var(--accent)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#111318] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)]"
            >
              Réserver 30 min
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </a>
            <Link
              href="/ia#tarifs"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
            >
              Notre méthode d&apos;accompagnement →
            </Link>
            <Link
              href="/ia/accessibilite"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
            >
              L&apos;autre échéance conformité : accessibilité web →
            </Link>
            <a
              href="https://troie.app/ai-act"
              target="_blank"
              rel="noopener"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
            >
              L&apos;attestation art. 4 en ligne : troie.app →
            </a>
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
            TROIE Studio, Nice, <Link href="/fr" className="underline underline-offset-4 hover:text-[var(--accent)]">troiestudio.fr</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
