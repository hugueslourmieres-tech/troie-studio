/**
 * Article: on August 2, 2026, the EU AI Act becomes enforceable (the
 * end of de facto impunity). Facts verified on 05-06/07/2026, see brief
 * CONTENU-AI-ACT-2-AOUT. Caution: do not name any specific national
 * supervisory authority (national designations not confirmed).
 */

const FAQ = [
  {
    q: "Does the training obligation apply to companies with fewer than 10 employees?",
    a: "Yes. Article 4 sets no headcount threshold: any organization that deploys an AI system is covered.",
  },
  {
    q: "Is a training completion certificate enough?",
    a: "It is the foundation of your evidence, but proportionality matters: the training must match actual usage (a salesperson who drafts with AI and a developer who codes with it do not have the same needs).",
  },
  {
    q: "We don't use AI, are we in the clear?",
    a: "Check actual usage first: shadow IT is widespread. If even one employee uses an AI tool for work, you are a deployer.",
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

export function AiActControlable2Aout2026En() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <p>
        On August 2, 2026, the EU AI Act enters its enforcement phase. The
        obligation to ensure your teams a sufficient level of AI literacy,
        however, has been in force since February 2025. Here is what changes, who is affected, and
        the bare minimum you need to put in place.
      </p>

      <h2>What exactly changes on August 2, 2026?</h2>
      <p>
        Regulation (EU) 2024/1689, known as the EU AI Act, entered into
        force on August 1, 2024 with a phased timeline: prohibited
        practices banned since February 2025, obligations for
        general-purpose AI models since August 2025, and general
        application on August 2, 2026. From that date, national
        supervisory authorities can inspect and penalize
        non-compliance. In other words: the obligations already existed,
        it is the de facto impunity that ends.
      </p>

      <h2>Article 4: the obligation most SMBs have already missed</h2>
      <p>
        Since February 2, 2025, Article 4 requires any organization that
        uses AI systems (a &quot;deployer&quot;, even a micro-business
        using ChatGPT or Claude day to day) to ensure a sufficient level
        of AI literacy across its teams. No headcount threshold. No
        standard mandated program: a principle of proportionality, the
        training plan must match the roles, the tools in use, and the
        risks that come with them.
      </p>
      <p>Three questions to find out whether you are affected:</p>
      <ol>
        <li>
          Do your teams use an AI tool, even a free one, in their work?
          (If yes, you are a deployer.)
        </li>
        <li>
          Do you have a document that describes who uses what, for what
          purpose, and within what limits?
        </li>
        <li>
          Have your employees received training that matches how they
          actually use AI?
        </li>
      </ol>
      <p>Two nos out of three: you have compliance work to do.</p>

      <h2>What does an SMB actually risk?</h2>
      <p>
        Before August 2, 2026, the main risk was civil liability: a
        poorly trained employee who causes harm with an AI tool exposes
        the company. From August 2, 2026, national supervisory
        authorities can inspect and penalize. The level of penalty
        depends on the nature of the breach and will be specified by
        each national framework: what is certain is that &quot;we
        didn&apos;t know&quot; will no longer hold up, since the
        obligation is more than 18 months old.
      </p>

      <h2>The bare minimum before August 2 (4 weeks is doable)</h2>
      <ol>
        <li>
          <strong>Map:</strong> list the AI tools used across the
          company, official and unofficial.
        </li>
        <li>
          <strong>Frame:</strong> a one-page usage policy (approved
          uses, prohibited data, human review).
        </li>
        <li>
          <strong>Train:</strong> training proportionate to each usage
          profile, with a written record (certificates).
        </li>
        <li>
          <strong>Document:</strong> keep proof of the three previous
          steps. That proof is what protects you in the event of an
          inspection.
        </li>
      </ol>

      <h2>Frequently asked questions</h2>
      {FAQ.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}

      <h2>Where to start</h2>
      <p>
        TROIE Studio trains SMB teams on AI (online programs and ongoing
        supervision) and brings your documentation into compliance. The
        first step is a free 30-minute audit: we look at how you
        actually use AI and tell you where you stand.
      </p>

      <p>
        <em>
          Sources: Regulation (EU) 2024/1689 (EUR-Lex, adopted June 13,
          2024, in force since August 1, 2024); implementation timeline
          published by the European Commission; Article 4 (AI literacy),
          applicable since February 2, 2025. Facts verified in July
          2026.
        </em>
      </p>
    </>
  );
}
