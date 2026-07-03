import Link from "next/link";

/**
 * Article: "Mandatory AI training at work: what Article 4 actually
 * says". Target SEO: mandatory AI training, AI literacy, Article 4
 * EU AI Act. B2B, top of funnel for the training offer.
 */
export function FormationIaObligatoireEntrepriseEn() {
  return (
    <>
      <p>
        &ldquo;Is AI training mandatory?&rdquo; Since 2025, the question has
        been landing on every leadership team&apos;s desk. The short answer:
        if your teams use AI in their work, yes, you have a legal obligation.
        It is called AI literacy, it comes from Article 4 of the EU AI Act,
        and it already applies. Here is the long answer, minus the jargon.
      </p>

      <h2>What Article 4 says, in plain English</h2>
      <p>
        The EU AI Act requires companies that provide or use AI systems to
        ensure, to the best of their ability, a{" "}
        <strong>sufficient level of AI literacy</strong> among the people
        operating those systems on their behalf. Three words do the heavy
        lifting.
      </p>
      <p>
        <strong>&ldquo;Use&rdquo;</strong>: you are in scope even if you build
        nothing. A sales rep drafting follow-ups with ChatGPT, a designer
        working in Midjourney, an accountant summarising documents with
        Copilot: these are all professional uses of AI systems.
      </p>
      <p>
        <strong>&ldquo;Sufficient&rdquo;</strong>: the expected level depends
        on context. A team running AI-assisted CV screening (a sensitive use
        case) is not held to the same standard as a team rewording emails.
        The obligation is proportionate, not a one-size-fits-all diploma.
      </p>
      <p>
        <strong>&ldquo;Ensure&rdquo;</strong>: the obligation sits with the
        employer. Letting everyone figure out AI on their own is no longer a
        neutral stance: it is a compliance gap.
      </p>

      <h2>Since when, and what is at stake?</h2>
      <p>
        The AI literacy obligation has applied since{" "}
        <strong>2 February 2025</strong>, alongside the ban on practices
        deemed an unacceptable risk. It was the very first step in the EU AI
        Act timeline, ahead of the obligations on large general-purpose
        models (August 2025) and general application (2026).
      </p>
      <p>
        On penalties, the regulation provides for fines running into millions
        of euros for the most serious violations, with a protective rule for
        SMEs: whichever is lower between the percentage of turnover and the
        cap in euros applies. But the real short-term risk lies elsewhere: in
        a dispute (an employee leaking client data through an AI tool, a
        piece of generated content that causes harm), the absence of
        documented training becomes evidence against you.
      </p>

      <h2>What does compliant training look like?</h2>
      <p>
        The text imposes neither a format nor a duration. In practice, a
        serious programme covers four things:
      </p>
      <p>
        <strong>1. Understanding the tool.</strong> What a language model can
        do, what it makes up (hallucinations), and why its outputs need
        checking.
      </p>
      <p>
        <strong>2. House rules.</strong> Which data never goes into a
        consumer-grade tool, which tools the company has approved, and who
        signs off on what.
      </p>
      <p>
        <strong>3. Practice on real cases from the job.</strong> Generic
        training does not change habits. Training salespeople on their
        follow-ups, operations on their quotes, support on their customer
        replies: that is where the level becomes &ldquo;sufficient&rdquo;.
      </p>
      <p>
        <strong>4. The paper trail.</strong> Who was trained, when, and on
        what. Without proof, there is no defensible compliance. That is
        exactly what a platform with progress tracking and certificates
        provides.
      </p>

      <h2>The trap to avoid: box-ticking training</h2>
      <p>
        A one-hour webinar watched with half an eye makes no one competent,
        and everyone knows it, including a judge. Conversely, there is no
        need to over-invest in a six-month programme: the obligation is
        proportionate. For an SME, the right format is often half a day to a
        full day of hands-on training, plus an online resource to reinforce
        the learning and document it.
      </p>

      <h2>Where to start</h2>
      <p>
        Take an honest inventory of the actual AI usage across your teams
        (there is always more of it than leadership imagines), define your
        usage rules, then train by role and keep a record. If you want to
        save time,{" "}
        <Link href="/ia">our AI training for teams</Link> covers exactly this
        scope, with proof of training included, and our dedicated{" "}
        <Link href="/ia/ai-act">EU AI Act</Link> page sums up every deadline.
        A simple first step: a free 30-minute audit to map out your actual
        obligations.
      </p>

      <p>
        <em>
          This page is an educational summary, not legal advice. For a
          legally binding analysis, consult your counsel.
        </em>
      </p>
    </>
  );
}
