import Link from "next/link";

/**
 * Article: "EU AI Act: what your company needs to do in 2026."
 * B2B, high-value. Educational, not legal advice (disclaimer).
 */
export function AiActEntreprise2026En() {
  return (
    <>
      <p>
        Your teams are already using AI. The question is no longer
        &ldquo;should we adopt it&rdquo; but &ldquo;are we compliant&rdquo;.
        Since 2025, Europe has had a framework in place, the EU AI Act, and
        some of its obligations become binding in 2026. Here is what that
        means for your company in practice, without the legal jargon.
      </p>

      <h2>The EU AI Act in one minute</h2>
      <p>
        The EU AI Act is the European regulation on artificial intelligence.
        Its core principle: the riskier the use of AI, the stronger the
        obligations. Most companies do not build AI, they use it, so what
        mainly concerns them comes down to two things:{" "}
        <strong>transparency</strong> and <strong>AI literacy</strong>,
        meaning that your teams have a minimum level of competence to handle
        these tools.
      </p>

      <h2>The obligation that really applies to you: training your teams</h2>
      <p>
        This is the point many executives miss. The regulation requires that
        people who use AI systems at work have a sufficient level of
        competence to do so in an informed way. In other words: letting your
        employees improvise with ChatGPT, with no framework and no training,
        is no longer a neutral option.
      </p>
      <p>
        And the deadline is closing in: national penalties for
        non-compliance become applicable in 2026. The good news is that
        getting compliant on this front is entirely manageable: it is mostly
        a matter of <strong>setting a framework and training</strong>.
      </p>

      <h2>The real risk in the meantime: shadow AI</h2>
      <p>
        Today, in most companies, AI comes in through the back door: one
        employee pastes a confidential document into a consumer tool,
        another generates a contract without having it reviewed, a third
        circulates a flawed analysis because the AI
        &ldquo;hallucinated&rdquo;. This is what we call shadow AI: usage
        that is massive, yet invisible and unmanaged.
      </p>
      <blockquote>
        A team improvising with AI is not productivity, it is risk (data,
        compliance, quality).
      </blockquote>

      <h2>The 4 steps to get compliant (and more effective)</h2>
      <ol>
        <li>
          <strong>Take stock.</strong> Which tools are already in use, by
          whom, and for what? You can only manage what you know about.
        </li>
        <li>
          <strong>Set simple rules.</strong> What can and cannot be pasted,
          what must be reviewed, which tools are approved. A one-page policy
          is enough to start.
        </li>
        <li>
          <strong>Train your teams.</strong> Not a two-day theoretical
          seminar, but practical upskilling: prompting well, verifying
          outputs, protecting data, keeping a human in the loop.
        </li>
        <li>
          <strong>Document it.</strong> Keep a record of what you have done
          (policy, training completed). That is what proves your good faith.
        </li>
      </ol>

      <h2>Why this is an opportunity, not just a constraint</h2>
      <p>
        The numbers speak for themselves: AI use at work doubled in a year,
        yet more than half of employees have never been trained. Companies
        that train their people gain a real productivity edge, and AI skills
        can significantly raise the value of a role. Getting compliant also
        means getting better. It is the same underlying shift described in{" "}
        <Link href="/fr/blog/ia-remplacer-mon-metier-manager-pas-remplace">
          Manager, not replaced
        </Link>
        .
      </p>

      <h2>Where to start</h2>
      <p>
        The simplest move is an honest assessment of where you stand. At
        TROIE, we help teams frame and use AI, on site or remotely, with
        real teaching and zero fluff: see{" "}
        <Link href="/ia">TROIE for professionals</Link>, or{" "}
        <Link href="/fr/contact">book a 30-minute call</Link> to review your
        compliance and your needs.
      </p>
      <p>
        <em>
          This article is informational and educational; it does not
          constitute legal advice. For an analysis of your specific
          situation, consult a specialised adviser.
        </em>
      </p>
    </>
  );
}
