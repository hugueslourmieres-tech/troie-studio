import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import {
  ArrowLink,
  BTN_DARK,
  ToolClosing,
  ToolHero,
  ToolSection,
  ToolShell,
  isEn,
  toolMetadata,
} from "@/components/outils/ToolsUI";

/**
 * Le calendrier de l'AI Act, à jour du règlement (UE) 2026/1744 (porté
 * depuis troie.app le 23/10/2026).
 *
 * Faits retenus, sourcés EUR-Lex :
 *   - article 4 (maîtrise de l'IA) applicable depuis le 2 février 2025,
 *     obligation de moyens, « niveau suffisant », aucun certificat requis,
 *   - contrôles et sanctions possibles depuis le 2 août 2026,
 *   - le règlement (UE) 2026/1744, en vigueur depuis le 27 juillet 2026,
 *     reporte le haut risque : annexe III au 2 décembre 2027, annexe I au
 *     2 août 2028. L'article 4 n'est pas modifié.
 * Aucun montant d'amende ni chiffre de marché n'est cité ici.
 */

const PATH = "/ai-act-calendrier";
const UPDATED = "23 octobre 2026";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return toolMetadata({
    locale,
    path: PATH,
    fr: {
      title: "Calendrier de l'AI Act : les dates après le report de 2026",
      description:
        "Le calendrier de l'AI Act à jour : haut risque reporté au 2 décembre 2027 par le règlement (UE) 2026/1744, article 4 inchangé depuis février 2025.",
    },
    en: {
      title: "AI Act timeline: dates updated after the 2026 postponement",
      description:
        "The EU AI Act timeline after Regulation (EU) 2026/1744: high-risk rules postponed to 2 December 2027, article 4 unchanged since February 2025.",
    },
  });
}

const CHANGES = [
  {
    what: "Systèmes à haut risque, annexe III",
    detail: "Recrutement et gestion des salariés, crédit, assurance, éducation, biométrie.",
    from: "2 août 2026",
    to: "2 décembre 2027",
  },
  {
    what: "Systèmes à haut risque, annexe I",
    detail: "IA intégrée à des produits déjà régulés : machines, dispositifs médicaux.",
    from: "2 août 2027",
    to: "2 août 2028",
  },
  {
    what: "Maîtrise de l'IA, article 4",
    detail: "Toute organisation qui fournit ou utilise de l'IA, sans seuil d'effectif.",
    from: null,
    to: "2 février 2025",
  },
];

type State = "past" | "next" | "future";

const TIMELINE: { date: string; title: string; body: string; state: State }[] = [
  {
    date: "1er août 2024",
    title: "Entrée en vigueur du règlement",
    body: "Le règlement (UE) 2024/1689 entre en vigueur. Il ne s'applique pas d'un bloc : les obligations arrivent par paliers.",
    state: "past",
  },
  {
    date: "2 février 2025",
    title: "Pratiques interdites et article 4",
    body: "Les usages à risque inacceptable sont interdits. L'article 4 s'applique : toute organisation qui fournit ou utilise de l'IA prend des mesures pour garantir un niveau suffisant de maîtrise de l'IA chez ses équipes.",
    state: "past",
  },
  {
    date: "2 août 2025",
    title: "Modèles à usage général et gouvernance",
    body: "Obligations des fournisseurs de modèles à usage général (ceux qui font tourner ChatGPT, Claude, Gemini ou Le Chat) et mise en place des autorités nationales.",
    state: "past",
  },
  {
    date: "2 août 2026",
    title: "Transparence, contrôles et sanctions",
    body: "Les obligations de transparence de l'article 50 s'appliquent. Les autorités nationales peuvent contrôler, et le régime de sanctions est applicable.",
    state: "past",
  },
  {
    date: "2 décembre 2027",
    title: "Haut risque, annexe III",
    body: "Reporté depuis le 2 août 2026 par le règlement (UE) 2026/1744. Recrutement et gestion des salariés, accès au crédit et aux services essentiels, éducation, biométrie.",
    state: "next",
  },
  {
    date: "2 août 2028",
    title: "Haut risque, annexe I",
    body: "Reporté depuis le 2 août 2027. IA intégrée à des produits déjà couverts par une réglementation sectorielle.",
    state: "future",
  },
];

const FAQ = [
  {
    q: "L'AI Act a-t-il été reporté ?",
    a: "En partie seulement. Le règlement (UE) 2026/1744, en vigueur depuis le 27 juillet 2026, reporte les obligations applicables aux systèmes à haut risque : l'annexe III passe du 2 août 2026 au 2 décembre 2027, et l'annexe I du 2 août 2027 au 2 août 2028. L'article 4 n'est pas modifié.",
  },
  {
    q: "Le report change-t-il quelque chose pour mes équipes ?",
    a: "Non. L'article 4 sur la maîtrise de l'IA s'applique depuis le 2 février 2025 à toute organisation qui utilise ou fournit de l'IA, sans seuil d'effectif. Utiliser ChatGPT, Claude ou Gemini au travail fait de vous un déployeur au sens du règlement.",
  },
  {
    q: "Que s'est-il passé le 2 août 2026 ?",
    a: "Les obligations de transparence de l'article 50 sont devenues applicables : signaler qu'un contenu a été généré ou manipulé par une IA, et prévenir une personne qu'elle échange avec une IA. Depuis cette date, les autorités nationales peuvent contrôler et sanctionner.",
  },
  {
    q: "Faut-il un certificat pour être en règle avec l'article 4 ?",
    a: "Non. Le règlement n'exige aucun certificat. L'article 4 est une obligation de moyens : prendre des mesures pour garantir un niveau suffisant de maîtrise de l'IA, et pouvoir le montrer. Une charte d'usage, un registre et une trace datée des ateliers suivis en sont les preuves les plus simples.",
  },
];

const SOURCES = [
  {
    label: "Règlement (UE) 2026/1744, texte au Journal officiel (EUR-Lex)",
    href: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj",
  },
  {
    label: "Règlement (UE) 2024/1689, l'AI Act d'origine (EUR-Lex)",
    href: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
  },
];

export default async function CalendrierPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `https://troiestudio.fr/fr${PATH}#faq`,
    inLanguage: "fr-FR",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Calendrier de l'AI Act : les dates à jour après le report de 2026",
    datePublished: "2026-10-23",
    dateModified: "2026-10-23",
    inLanguage: "fr-FR",
    url: `https://troiestudio.fr/fr${PATH}`,
    author: { "@id": "https://troiestudio.fr/#organization" },
    publisher: { "@id": "https://troiestudio.fr/#organization" },
    about: { "@type": "Legislation", name: "Règlement (UE) 2024/1689 sur l'intelligence artificielle" },
    citation: SOURCES.map((s) => s.href),
  };

  return (
    <ToolShell>
      <JsonLd data={faqLd} />
      <JsonLd data={articleLd} />
      <ToolHero
        locale={locale}
        title="Le calendrier de l'AI Act, à jour."
        enLine={
          isEn(locale)
            ? "The EU AI Act timeline, updated after Regulation (EU) 2026/1744 postponed the high-risk rules. Article 4 on AI literacy is unchanged. The page is in French, sources link to EUR-Lex."
            : undefined
        }
        intro={
          <>
            <p>
              Le règlement européen sur l&apos;intelligence artificielle (AI Act, ou IA Act) est entré
              en vigueur le 1er août 2024 et s&apos;applique par paliers. Le règlement (UE) 2026/1744,
              en vigueur depuis le 27 juillet 2026, a reporté les obligations sur les systèmes à haut
              risque. Voici le calendrier à jour, et ce qui n&apos;a pas bougé.
            </p>
            <p className="mt-4 text-sm tabular-nums">Mis à jour le {UPDATED}.</p>
          </>
        }
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <a href="#calendrier" className={BTN_DARK}>
            Voir le calendrier
            <span aria-hidden="true">↓</span>
          </a>
          <ArrowLink href={`/${locale}/outils/diagnostic-ai-act`}>Suis-je concerné ? Sept questions</ArrowLink>
        </div>
      </ToolHero>

      <ToolSection
        title="Ce qui bouge, ce qui ne bouge pas"
        aside="Le report vise le haut risque, qui concerne une minorité d'organisations. L'obligation qui touche presque tout le monde court toujours."
      >
        <ul className="grid gap-5 md:grid-cols-3">
          {CHANGES.map((c) => (
            <li key={c.what} className="flex flex-col rounded-2xl border border-[var(--rule)] bg-white p-6 md:p-8">
              <p className="text-sm text-[var(--fg-2)]">{c.from ? "Reporté" : "Inchangé"}</p>
              <h3 className="mt-2 text-[17px] font-medium leading-snug text-[var(--fg)]">{c.what}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">{c.detail}</p>
              <p className="mt-auto flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-6 tabular-nums">
                {c.from && (
                  <>
                    <s className="text-[15px] text-[var(--fg-mute)]">{c.from}</s>
                    <span aria-hidden="true" className="text-[var(--fg-2)]">→</span>
                  </>
                )}
                <span className="t-display text-2xl text-[var(--accent)]">{c.to}</span>
              </p>
            </li>
          ))}
        </ul>
      </ToolSection>

      <ToolSection id="calendrier" title="Le calendrier complet" tone="panel">
        <ol className="relative">
          {TIMELINE.map((t) => (
            <li key={t.date} className="grid gap-2 border-t border-[var(--rule-strong)] py-7 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4">
                <p
                  className={`t-display text-2xl tabular-nums md:text-3xl ${
                    t.state === "past" ? "text-[var(--fg)]" : "text-[var(--accent)]"
                  }`}
                >
                  {t.date}
                </p>
                {t.state === "next" && (
                  <p className="mt-2 text-sm text-[var(--accent)]">Prochaine échéance</p>
                )}
                {t.state === "past" && <p className="mt-2 text-sm text-[var(--fg-2)]">S&apos;applique</p>}
              </div>
              <div className="md:col-span-8">
                <h3 className="text-[18px] font-medium text-[var(--fg)]">{t.title}</h3>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[var(--fg-2)] md:text-base">{t.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </ToolSection>

      <ToolSection
        title="L'article 4 n'a pas été reporté."
        aside="Si vos équipes utilisent une IA au travail, vous devez prendre des mesures pour garantir un niveau suffisant de maîtrise de l'IA, et pouvoir le montrer."
      >
        <ul className="grid gap-6 sm:grid-cols-3">
          {[
            { t: "Une obligation de moyens", d: "Aucun format n'est imposé. Il faut agir, en proportion de vos usages." },
            { t: "Aucun certificat requis", d: "Le règlement n'exige pas de certification. Il faut garder une trace de l'effort." },
            { t: "Des contrôles possibles", d: "Depuis le 2 août 2026, les autorités nationales peuvent contrôler." },
          ].map((b) => (
            <li key={b.t} className="border-t border-[var(--rule-strong)] pt-4">
              <h3 className="text-[16px] font-medium text-[var(--fg)]">{b.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">{b.d}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
          <ArrowLink href={`/${locale}/outils/charte-ia`}>Générer la charte d&apos;usage</ArrowLink>
          <ArrowLink href={`/${locale}/outils/registre-usages-ia`}>Le registre des usages</ArrowLink>
          <ArrowLink href={`/${locale}/outils/checklist-ai-act`}>La checklist en sept étapes</ArrowLink>
        </div>
      </ToolSection>

      <section lang="fr" className="border-t border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-10 md:grid-cols-12 lg:gap-x-16">
            <div className="md:col-span-5">
              <h2 className="t-display text-3xl text-[var(--fg)] md:text-4xl">Questions fréquentes</h2>
            </div>
            <div className="md:col-span-7">
              <ul className="border-t border-[var(--rule)]">
                {FAQ.map((f) => (
                  <li key={f.q} className="border-b border-[var(--rule)]">
                    <details className="group">
                      <summary className="flex min-h-[48px] cursor-pointer list-none items-start justify-between gap-6 py-5 text-[15px] font-medium leading-relaxed text-[var(--fg)] transition-colors hover:text-[var(--accent)]">
                        <span>{f.q}</span>
                        <span aria-hidden="true" className="text-base text-[var(--fg-2)] transition-transform duration-300 group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="-mt-1 max-w-2xl pb-5 text-[15px] leading-relaxed text-[var(--fg-2)]">{f.a}</p>
                    </details>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <h3 className="text-sm font-medium text-[var(--fg)]">Sources</h3>
                <ul className="mt-3 flex flex-col gap-1">
                  {SOURCES.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex min-h-10 items-center text-[15px] text-[var(--accent)] underline decoration-[var(--accent-soft)] underline-offset-4 hover:decoration-[var(--accent)]"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-[var(--fg-2)]">
                  Cette page n&apos;est pas un conseil juridique. Pour une situation particulière,
                  notamment si vous relevez du haut risque, faites-vous accompagner par un
                  professionnel du droit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToolClosing locale={locale} />
    </ToolShell>
  );
}
