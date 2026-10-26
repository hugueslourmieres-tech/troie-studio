"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

/**
 * Diagnostic AI Act en sept questions (porté depuis troie.app le
 * 23/10/2026). Aucune inscription, résultat immédiat.
 *
 * Le but n'est pas de faire peur : dire ce qui s'applique ET ce qui ne
 * s'applique pas. Le résultat n'est pas une « conformité » (personne ne
 * peut la délivrer) mais un niveau d'exposition, ce qui est défendable.
 * Vocabulaire de l'agence : sensibilisation, ateliers, accompagnement.
 */

type Answer = "oui" | "non" | "sais-pas";

type Question = {
  id: string;
  q: string;
  help: string;
  /** Une réponse « oui » réduit-elle l'exposition ? */
  goodIsYes: boolean;
  weight: number;
};

const QUESTIONS: Question[] = [
  {
    id: "usage",
    q: "Des personnes utilisent-elles des outils d'IA dans votre organisation ?",
    help: "ChatGPT, Claude, Gemini, Copilot, ou une IA intégrée à un logiciel métier. Même de temps en temps, même sur un compte personnel.",
    goodIsYes: false,
    weight: 0,
  },
  {
    id: "recrutement",
    q: "Utilisez-vous l'IA pour trier des candidatures, évaluer ou surveiller des salariés ?",
    help: "Tri de CV, notation de candidats, évaluation de performance, attribution de tâches.",
    goodIsYes: false,
    weight: 3,
  },
  {
    id: "publication",
    q: "Publiez-vous des contenus générés ou retouchés par IA ?",
    help: "Textes, images, voix, vidéos, ou un agent conversationnel qui parle à vos clients.",
    goodIsYes: false,
    weight: 2,
  },
  {
    id: "maitrise",
    q: "Les personnes qui utilisent l'IA ont-elles été sensibilisées à ses limites et à ses risques ?",
    help: "Un atelier ou une séance structurée, pas un lien envoyé sur la messagerie interne.",
    goodIsYes: true,
    weight: 3,
  },
  {
    id: "trace",
    q: "Pouvez-vous montrer une trace écrite de cette sensibilisation, personne par personne ?",
    help: "Une liste datée : qui a suivi quoi, et quand. C'est ce qu'on vous demandera.",
    goodIsYes: true,
    weight: 3,
  },
  {
    id: "charte",
    q: "Avez-vous une règle écrite sur ce qui peut et ne peut pas être mis dans une IA ?",
    help: "Données clients, informations confidentielles, données personnelles.",
    goodIsYes: true,
    weight: 2,
  },
  {
    id: "inventaire",
    q: "Savez-vous précisément quels outils d'IA sont utilisés, et par qui ?",
    help: "Un inventaire, même sommaire. Sans lui, aucune des autres réponses n'est fiable.",
    goodIsYes: true,
    weight: 2,
  },
];

const CHOICES: [Answer, string][] = [
  ["oui", "Oui"],
  ["non", "Non"],
  ["sais-pas", "Je ne sais pas"],
];

const LEVEL = {
  faible: {
    badge: "Exposition faible",
    head: "Vous avez déjà fait le plus dur.",
    body: "L'essentiel est en place. Il vous manque surtout de la mise en forme : une trace que vous pouvez montrer, plutôt qu'une bonne intention.",
    fill: 1,
  },
  moyen: {
    badge: "Exposition moyenne",
    head: "Vous faites les choses, mais vous ne pourriez pas le montrer.",
    body: "Vous utilisez l'IA sérieusement, sans document à présenter en cas de contrôle. C'est le cas le plus fréquent, et le plus simple à corriger.",
    fill: 2,
  },
  eleve: {
    badge: "Exposition élevée",
    head: "L'IA circule chez vous sans cadre ni trace.",
    body: "Ce n'est pas d'abord une question d'amende. C'est une question de ce que vous répondrez le jour où un client, un assureur ou une autorité vous posera la question.",
    fill: 3,
  },
} as const;

const CARD = "rounded-2xl border border-[var(--rule)] bg-white";
const BTN_DARK =
  "group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 text-[15px] font-medium text-white transition-[background-color,transform,opacity] duration-200 hover:bg-[#2a2e37] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
const BTN_LINK =
  "group inline-flex min-h-12 items-center gap-2 text-[15px] font-medium text-[var(--fg)] underline decoration-[var(--rule-strong)] underline-offset-4 transition-colors hover:decoration-[var(--fg)]";

export function DiagnosticQuiz({ locale }: { locale: string }) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [done, setDone] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const answered = Object.keys(answers).length;
  const total = QUESTIONS.length;

  const result = useMemo(() => {
    const noUse = answers.usage === "non";
    let exposure = 0;
    let max = 0;
    for (const q of QUESTIONS) {
      if (q.weight === 0) continue;
      max += q.weight;
      const a = answers[q.id];
      if (!a) continue;
      // Ne pas savoir est déjà un défaut de maîtrise : exposition partielle.
      if (a === "sais-pas") exposure += q.weight * 0.6;
      else if (q.goodIsYes ? a === "non" : a === "oui") exposure += q.weight;
    }
    const ratio = max > 0 ? exposure / max : 0;
    const level: keyof typeof LEVEL = ratio < 0.25 ? "faible" : ratio < 0.6 ? "moyen" : "eleve";
    return {
      noUse,
      level,
      hautRisque: answers.recrutement === "oui",
      article50: answers.publication === "oui",
    };
  }, [answers]);

  const show = (d: boolean) => {
    setDone(d);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ block: "start" }));
  };

  const reset = () => {
    setAnswers({});
    show(false);
  };

  if (!done) {
    return (
      <div ref={topRef} className="scroll-mt-28">
        <div className="flex items-center gap-4" aria-live="polite">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--rule)]">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-500 ease-out"
              style={{ width: `${(answered / total) * 100}%` }}
            />
          </div>
          <span className="text-sm tabular-nums text-[var(--fg-2)]">
            {answered} sur {total}
          </span>
        </div>

        <ol className="mt-8 flex flex-col gap-4">
          {QUESTIONS.map((q, i) => {
            const picked = answers[q.id];
            return (
              <li key={q.id} className={`${CARD} p-6 md:p-8`}>
                <fieldset>
                  <legend className="flex gap-4">
                    <span className="t-display w-6 shrink-0 text-xl tabular-nums text-[var(--accent)]">{i + 1}</span>
                    <span className="text-[17px] font-medium leading-snug text-[var(--fg)]">{q.q}</span>
                  </legend>
                  <div className="pl-10">
                    <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">{q.help}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {CHOICES.map(([val, label]) => {
                        const on = picked === val;
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setAnswers((p) => ({ ...p, [q.id]: val }))}
                            aria-pressed={on}
                            className={`inline-flex min-h-11 items-center rounded-full border px-5 text-[15px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                              on
                                ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                                : "border-[var(--rule-strong)] bg-white text-[var(--fg)] hover:border-[var(--ink)]"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </fieldset>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <button type="button" disabled={answered < total} onClick={() => show(true)} className={BTN_DARK}>
            Voir mon résultat
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
          {answered < total && (
            <p className="text-[15px] text-[var(--fg-2)]">
              Encore {total - answered} question{total - answered > 1 ? "s" : ""}.
            </p>
          )}
        </div>
      </div>
    );
  }

  const lvl = LEVEL[result.level];

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* Le verdict */}
      <div className={`${CARD} overflow-hidden`}>
        <span aria-hidden="true" className="grain block h-20 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/art/${result.noUse ? "meadow" : result.level === "eleve" ? "dusk" : "sky"}.jpg`} alt="" className="h-full w-full object-cover" />
        </span>
        <div className="p-6 md:p-10">
          {result.noUse ? (
            <>
              <h2 className="t-display text-3xl leading-tight text-[var(--fg)] md:text-4xl">
                L&apos;article 4 ne vous concerne pas aujourd&apos;hui.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
                L&apos;obligation de maîtrise de l&apos;IA vise les organisations qui fournissent ou
                utilisent des systèmes d&apos;IA. Si personne n&apos;en utilise, elle ne s&apos;applique
                pas. Attention toutefois : beaucoup de logiciels métier intègrent de l&apos;IA sans
                l&apos;annoncer, et un salarié qui utilise ChatGPT sur un compte personnel pour son
                travail vous fait entrer dans le champ. Commencez par un inventaire.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="flex gap-1">
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className={`h-2 w-6 rounded-full ${n <= lvl.fill ? "bg-[var(--accent)]" : "bg-[var(--rule)]"}`}
                    />
                  ))}
                </span>
                <span className="text-sm font-medium text-[var(--accent)]">{lvl.badge}</span>
              </div>
              <h2 className="t-display mt-5 text-3xl leading-tight text-[var(--fg)] md:text-4xl">{lvl.head}</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">{lvl.body}</p>
            </>
          )}
        </div>
      </div>

      {/* Ce qui s'applique */}
      <h2 className="t-display mt-16 text-3xl leading-tight text-[var(--fg)] md:text-4xl">Ce qui s&apos;applique à vous</h2>
      <ul className="mt-8 flex flex-col gap-4">
        {!result.noUse && (
          <Rule
            date="Depuis le 2 février 2025"
            title="Article 4, maîtrise de l'IA"
            body="Vous devez prendre des mesures pour garantir un niveau suffisant de maîtrise de l'IA chez les personnes qui l'utilisent, et pouvoir le montrer. C'est une obligation de moyens : aucun format n'est imposé, aucun certificat n'est exigé. Le report de juillet 2026 ne la concerne pas."
          />
        )}
        {result.article50 && (
          <Rule
            date="Depuis le 2 août 2026"
            title="Article 50, transparence"
            body="Vous publiez des contenus générés par IA : il faut signaler qu'ils le sont, et prévenir une personne quand elle échange avec une IA."
          />
        )}
        {result.hautRisque && (
          <Rule
            date="2 décembre 2027"
            title="Usage probablement à haut risque, annexe III"
            body="Trier des candidatures ou évaluer des salariés avec de l'IA relève de l'annexe III. Cette échéance a été reportée du 2 août 2026 au 2 décembre 2027 par le règlement (UE) 2026/1744. Les obligations restent lourdes (documentation, supervision humaine réelle, journalisation) : ce sujet mérite aussi l'avis d'un professionnel du droit."
            strong
          />
        )}
        {!result.hautRisque && !result.noUse && (
          <Rule
            title="Vous n'êtes pas sur du haut risque"
            body="D'après vos réponses, vous n'utilisez pas l'IA pour des décisions sur des personnes. Le gros du règlement, reporté à décembre 2027, ne vous concerne donc pas. Ne vous laissez pas vendre une mise en conformité haut risque dont vous n'avez pas besoin."
            muted
          />
        )}
      </ul>

      {/* Les trois choses à faire */}
      {!result.noUse && (
        <>
          <h2 className="t-display mt-16 text-3xl leading-tight text-[var(--fg)] md:text-4xl">
            Les trois choses à faire, dans l&apos;ordre
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "L'inventaire",
                d: "Listez les outils d'IA utilisés, et par qui. Une demi-heure suffit.",
                ok: answers.inventaire === "oui",
                href: `/${locale}/outils/registre-usages-ia`,
                cta: "Le registre des usages",
              },
              {
                t: "La règle écrite",
                d: "Ce qu'on peut mettre dans une IA, ce qu'on n'y met jamais, qui valide quoi.",
                ok: answers.charte === "oui",
                href: `/${locale}/outils/charte-ia`,
                cta: "Générer la charte",
              },
              {
                t: "Les équipes, et leur trace",
                d: "Des ateliers sur vos cas réels, et une trace datée par personne.",
                ok: answers.maitrise === "oui" && answers.trace === "oui",
                href: `/${locale}/accompagnement#ia`,
                cta: "Les ateliers",
              },
            ].map((s, i) => (
              <li key={s.t} className={`${CARD} flex flex-col p-6`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="t-display text-2xl tabular-nums text-[var(--accent)]">{i + 1}</span>
                  {s.ok && <span className="text-sm text-[var(--fg-2)]">Déjà fait</span>}
                </div>
                <h3 className="mt-3 text-[17px] font-medium text-[var(--fg)]">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">{s.d}</p>
                <div className="mt-auto pt-4">
                  <Link href={s.href} className={BTN_LINK}>
                    {s.cta}
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}

      {/* L'appel */}
      <div className="mt-16 rounded-2xl bg-[var(--bg-2)] p-8 md:p-12">
        <h2 className="t-display text-3xl leading-tight text-[var(--fg)] md:text-4xl">
          Parlons de votre résultat.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
          Nous regardons vos usages réels avec vous, puis nous vous disons ce qui suffit et ce qui
          ne sert à rien. Si des ateliers avec vos équipes ont du sens, nous les construisons sur vos
          dossiers.
        </p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Link href={`/${locale}/contact#projet`} className={BTN_DARK}>
            Nous contacter
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
          <Link href={`/${locale}/accompagnement#ia`} className={BTN_LINK}>
            L&apos;accompagnement des équipes
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-8">
        <button type="button" onClick={reset} className={BTN_LINK}>
          Refaire le diagnostic
        </button>
        <Link href={`/${locale}/ai-act-calendrier`} className={BTN_LINK}>
          Voir le calendrier complet
        </Link>
      </div>

      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[var(--fg-2)]">
        Ce diagnostic est une aide à la décision, pas un conseil juridique ni une attestation de
        conformité. Le règlement ne prévoit aucune certification de conformité pour l&apos;article 4.
        Si vos usages relèvent du haut risque, faites-vous accompagner par un professionnel du droit.
      </p>
    </div>
  );
}

function Rule({
  date,
  title,
  body,
  strong,
  muted,
}: {
  date?: string;
  title: string;
  body: string;
  strong?: boolean;
  muted?: boolean;
}) {
  return (
    <li
      className={`rounded-2xl border p-6 md:p-8 ${
        strong
          ? "border-[var(--accent)] bg-[var(--accent-soft)]"
          : muted
            ? "border-dashed border-[var(--rule-strong)]"
            : "border-[var(--rule)] bg-white"
      }`}
    >
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
        <h3 className="text-[17px] font-medium text-[var(--fg)]">{title}</h3>
        {date && <p className="text-[15px] font-medium tabular-nums text-[var(--accent)]">{date}</p>}
      </div>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--fg-2)]">{body}</p>
    </li>
  );
}
