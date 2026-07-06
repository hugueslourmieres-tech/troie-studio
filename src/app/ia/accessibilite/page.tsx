import Link from "next/link";
import type { Metadata } from "next";

const CAL_URL = "https://cal.com/troiestudio/30min";

export const metadata: Metadata = {
  title:
    "Accessibilité web obligatoire : votre site est-il conforme ? RGAA, sanctions, plan d'action",
  description:
    "Depuis le 28 juin 2025, l'accessibilité numérique est obligatoire pour l'e-commerce et les services en ligne. Carrefour vient d'être condamné. Qui est concerné, ce que dit le RGAA, et ce que TROIE prend en charge : audit gratuit, diagnostic, mise en conformité.",
  alternates: { canonical: "https://troiestudio.fr/ia/accessibilite" },
  openGraph: {
    type: "article",
    url: "https://troiestudio.fr/ia/accessibilite",
    title: "Accessibilité web : ce que votre entreprise doit faire, sans paniquer",
    description:
      "Dates clés, obligations réelles pour les PME, sanctions, et un plan d'action en 4 briques à prix publiés.",
  },
};

/* Échéances de la directive (UE) 2019/882 (European Accessibility Act),
   transposée en droit français. Vérifié juillet 2026 : première
   condamnation (Carrefour) prononcée en juin 2026. */
const TIMELINE = [
  {
    date: "17 avril 2019",
    title: "La directive est adoptée",
    body: "L'European Accessibility Act (directive (UE) 2019/882) impose l'accessibilité des produits et services numériques dans toute l'Union. Les entreprises ont six ans pour se préparer.",
    status: "past",
  },
  {
    date: "28 juin 2025",
    title: "Entrée en application",
    body: "E-commerce, banque, transport, livres numériques : tout service en ligne vendu à des consommateurs européens doit être accessible. Seules les micro-entreprises (moins de 10 salariés et moins de 2 M€ de CA) sont exemptées.",
    status: "past",
  },
  {
    date: "Juillet 2025",
    title: "Premières mises en demeure",
    body: "Des associations mettent en demeure Auchan, Carrefour, E.Leclerc et Picard : leurs sites e-commerce ne sont pas utilisables par les personnes handicapées.",
    status: "past",
  },
  {
    date: "Novembre 2025",
    title: "Premiers procès européens",
    body: "Faute de réponse satisfaisante, les associations assignent en référé devant le tribunal de commerce. Ce sont les premières actions en justice fondées sur l'European Accessibility Act en Europe.",
    status: "past",
  },
  {
    date: "Juin 2026",
    title: "Carrefour condamné",
    body: "Le tribunal ordonne à Carrefour de rendre son site et son application accessibles sous 6 mois, sous astreinte par jour de retard. Le signal est clair : l'obligation est réelle, et elle se plaide.",
    status: "now",
  },
  {
    date: "2026 et après",
    title: "Les contrôles s'étendent",
    body: "DGCCRF, associations, clients : les signalements se multiplient. Plus un site attend, plus la mise en conformité se fait dans l'urgence, au prix fort.",
    status: "future",
  },
];

const OBLIGATIONS = [
  {
    q: "Vous vendez en ligne (produits ou services) ?",
    a: "L'e-commerce est explicitement couvert par la directive. Si des consommateurs européens peuvent acheter sur votre site, il doit être accessible : navigation au clavier, lecteur d'écran, contrastes, formulaires étiquetés.",
  },
  {
    q: "Plus de 10 salariés ou plus de 2 M€ de chiffre d'affaires ?",
    a: "Alors l'exemption micro-entreprise ne s'applique pas : vous êtes dans le périmètre depuis le 28 juin 2025. La taille ne protège plus au-delà de ce seuil.",
  },
  {
    q: "Votre site passe-t-il le test du clavier ?",
    a: "Débranchez la souris : si on ne peut pas parcourir le menu, remplir le formulaire et payer uniquement au clavier, votre site n'est pas conforme. C'est le test le plus rapide, et le plus souvent raté.",
  },
  {
    q: "Une refonte ou un nouveau site est prévu ?",
    a: "C'est le meilleur moment : intégrer l'accessibilité dès la conception coûte une fraction d'une mise en conformité après coup, et le référentiel RGAA sert de cahier des charges.",
  },
];

const BRIQUES = [
  {
    step: "01",
    title: "Audit accessibilité gratuit",
    price: "0 €",
    body: "Scan automatisé + revue manuelle de vos pages clés (accueil, produit, panier, contact). Verdict écrit sous 48 h : concerné ou pas, et les 5 blocages les plus graves.",
  },
  {
    step: "02",
    title: "Diagnostic RGAA complet",
    price: "1 500 à 3 000 €",
    body: "Audit sur le référentiel officiel (106 critères), tests lecteur d'écran, registre des non-conformités, plan d'action daté et chiffré. Le document qui prouve votre démarche.",
  },
  {
    step: "03",
    title: "Mise en conformité",
    price: "Sur devis",
    body: "Nos développeurs corrigent : structure, contrastes, formulaires, navigation clavier, alternatives. Par lots priorisés, avec re-test à chaque livraison.",
  },
  {
    step: "04",
    title: "Supervision continue",
    price: "500 à 1 500 € / mois",
    body: "Monitoring de votre conformité numérique (accessibilité + AI Act) : chaque mise en production est re-testée, votre déclaration reste à jour. La conformité qui ne se périme pas.",
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
 * Page Conformité Accessibilité : deuxième volet de la porte d'entrée
 * conformité (avec /ia/ai-act). Univers /ia (B2B). Requêtes visées :
 * "accessibilité site web obligatoire", "RGAA obligation e-commerce".
 */
export default function AccessibilitePage() {
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

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 md:px-12 md:pt-28 md:pb-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
          Conformité · Directive (UE) 2019/882
        </p>
        <h1 className="t-display mt-8 max-w-4xl text-5xl leading-[1.02] text-[var(--fg)] md:text-7xl">
          Votre site doit être accessible. C&apos;est la loi, depuis juin 2025.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--fg-2)] md:text-xl">
          En juin 2026, Carrefour a été condamné à rendre son site accessible
          sous 6 mois, sous astreinte. L&apos;obligation vaut pour tout
          e-commerce et service en ligne au-delà de 10 salariés ou 2 M€ de
          chiffre d&apos;affaires. La mise en conformité d&apos;une PME est un
          chantier court quand il est bien cadré, et un cauchemar quand il se
          fait sous astreinte.
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
            L&apos;obligation est en vigueur. La jurisprudence aussi.
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
                    {t.status === "past" ? "✓ Acquis" : t.status === "now" ? "● Jurisprudence en cours" : "À venir"}
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
              ["7 500 €", "d'amende par manquement (15 000 € en récidive)"],
              ["Astreinte", "par jour de retard sur injonction du tribunal"],
              ["Publication", "de la sanction, voire suspension du service"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="t-display text-3xl text-[var(--accent)] md:text-4xl">{n}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#f5f0e6]/75">{l}</p>
              </div>
            ))}
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f5f0e6]/50 md:col-span-3">
              Le vrai coût n&apos;est pas l&apos;amende : c&apos;est la mise en conformité en urgence, sous astreinte, avec l&apos;image de marque en jeu. Et, selon l&apos;OMS, près d&apos;une personne sur six vit avec un handicap : autant de clients qui ne pouvaient pas acheter chez vous.
            </p>
          </div>
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
              href="/ia/ai-act"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
            >
              L&apos;autre conformité qui vous concerne : AI Act →
            </Link>
            <Link
              href="/creation/site-conforme"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/70 transition hover:text-[var(--accent)]"
            >
              Refonte + conformité en un pack : site conforme dès 1 500 € →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer minimal + disclaimer */}
      <footer className="border-t border-[var(--rule)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 md:px-12">
          <p className="max-w-3xl text-xs leading-relaxed text-[var(--fg-2)]/70">
            Informations vérifiées en juillet 2026 sur la base de la directive
            (UE) 2019/882, de sa transposition française et du référentiel
            RGAA. Cette page est une synthèse pédagogique, pas un conseil
            juridique : pour une analyse opposable, consultez votre conseil.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-2)]/55">
            TROIE Studio · Nice · <Link href="/ia" className="underline underline-offset-4 hover:text-[var(--accent)]">ia.troiestudio.fr</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
