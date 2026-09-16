/**
 * Bloc 3 de l'accueil : la méthode en trois temps, échange, proposition,
 * réalisation. La proposition détaille ce que le studio envoie après
 * l'étude de la demande (traitement humain, pas de configurateur).
 */

type Step = { name: string; body: string; list?: string[] };

const COPY: Record<"fr" | "en", { eyebrow: string; title: string; steps: Step[] }> = {
  fr: {
    eyebrow: "La méthode",
    title: "Comment ça se passe.",
    steps: [
      {
        name: "Échange",
        body: "Vous décrivez ce que vous voulez obtenir. Si le projet le demande, un court appel permet de le cadrer.",
      },
      {
        name: "Proposition",
        body: "Vous recevez une recommandation claire, qui précise :",
        list: [
          "le problème à résoudre et le résultat attendu",
          "les livrables et les limites du périmètre",
          "le calendrier et le prix",
          "l'accompagnement après la livraison, si besoin",
        ],
      },
      {
        name: "Réalisation",
        body: "L'équipe produit, met en ligne, puis reste disponible pour la suite si vous le souhaitez.",
      },
    ],
  },
  en: {
    eyebrow: "How we work",
    title: "How it works.",
    steps: [
      {
        name: "Talk",
        body: "You tell us what you want to achieve. If the project needs it, a short call helps frame it.",
      },
      {
        name: "Proposal",
        body: "You receive a clear recommendation that sets out:",
        list: [
          "the problem to solve and the expected result",
          "the deliverables and the scope",
          "the timeline and the price",
          "support after delivery, if you need it",
        ],
      },
      {
        name: "Delivery",
        body: "The team builds, launches, then stays available afterwards if you want.",
      },
    ],
  },
};

export function HomeMethod({ locale }: { locale: string }) {
  const c = COPY[locale === "en" ? "en" : "fr"];

  return (
    <section className="tone-dark bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-36">
        <p className="t-eyebrow">{c.eyebrow}</p>
        <h2 className="t-display mt-6 text-4xl text-[var(--fg)] md:text-6xl">{c.title}</h2>

        <ol className="mt-14 grid gap-px border border-[var(--rule)] bg-[var(--rule)] md:mt-20 md:grid-cols-3">
          {c.steps.map((s, i) => (
            <li key={s.name} className="flex flex-col bg-[var(--bg)] p-8 md:p-10">
              <span aria-hidden="true" className="t-display text-6xl leading-none text-[var(--accent)] md:text-7xl">
                {i + 1}
              </span>
              <h3 className="t-display mt-8 text-3xl text-[var(--fg)] md:text-4xl">{s.name}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--fg-2)] md:text-base">{s.body}</p>
              {s.list && (
                <ul className="mt-4 space-y-2.5">
                  {s.list.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--fg-2)] md:text-base"
                    >
                      <span aria-hidden="true" className="mt-[0.78em] inline-block h-[1.5px] w-3.5 flex-none bg-[var(--accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
