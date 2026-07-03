import Link from "next/link";

export function IaViePriveeDonneesEn() {
  return (
    <>
      <p>
        ChatGPT is free, convenient, and remarkably chatty. But one question
        keeps coming up: where does everything I type actually go? Here is a
        plain-English look at what you should never paste into an AI, and how
        to stay in control of your data.
      </p>

      <h2>Where do your messages go?</h2>
      <p>
        With consumer versions, assume that what you write may be stored and,
        depending on your settings, used to improve the model. That is not
        necessarily malicious, but it is not private either. The common-sense
        rule: never tell an AI anything you would not tell a
        stranger.
      </p>

      <h2>What you should never paste</h2>
      <ul>
        <li>
          <strong>Passwords, PINs, banking</strong> credentials.
        </li>
        <li>
          <strong>Medical data</strong> or anything deeply personal.
        </li>
        <li>
          <strong>Confidential company documents</strong> (contracts,
          client files, internal code).
        </li>
        <li>
          <strong>Other people&apos;s personal data</strong> without their consent (a
          basic GDPR reflex).
        </li>
      </ul>

      <h2>3 settings to take back control</h2>
      <ol>
        <li>
          <strong>Turn off training.</strong> In ChatGPT&apos;s settings
          (Data Controls), disable model improvement.
        </li>
        <li>
          <strong>Use temporary chat</strong> for sensitive topics:
          it keeps no history.
        </li>
        <li>
          <strong>Anonymize before pasting.</strong> Replace real names,
          amounts, and addresses with [brackets].
        </li>
      </ol>

      <h2>The workplace case</h2>
      <p>
        At work, the free version is a bad idea for business data: no data
        processing agreement, data sometimes retained, unclear terms.
        &ldquo;Pro&rdquo; and &ldquo;team&rdquo;
        plans exist, with real guarantees. The real risk is
        unmanaged use: we cover it in{" "}
        <Link href="/fr/blog/ai-act-entreprise-2026">
          EU AI Act: what your company needs to do
        </Link>
        .
      </p>

      <h2>Protecting your data is a skill</h2>
      <p>
        Understanding where your information goes is already half the battle.
        And it ties directly into{" "}
        <Link href="/fr/blog/arnaque-ia-voix-clonee">AI-powered scams</Link>:
        the less data you leave lying around, the less can be used against
        you.
      </p>
      <p>
        To build the right reflexes (for you and your family), start with the{" "}
        <Link href="/formations/quiz">free quiz</Link>, then our{" "}
        <Link href="/formations">online courses</Link>.
      </p>
    </>
  );
}
