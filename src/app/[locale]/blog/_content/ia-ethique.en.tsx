import Link from "next/link";

export function IaEthiqueEn() {
  return (
    <>
      <p>
        &ldquo;Ethical AI&rdquo;: the phrase sounds good, but it often means
        everything and nothing. In practical terms, what does it change for
        you? Here’s a simple definition, and what it means day to day, without
        the moralizing.
      </p>

      <h2>A simple definition</h2>
      <p>
        Ethical AI isn’t &ldquo;nice&rdquo; AI. It’s AI you use while keeping
        three things in mind: <strong>transparency</strong> (knowing when
        you’re talking to an AI), <strong>respect for data</strong> (yours and
        other people’s), and <strong>accountability</strong> (a human remains
        answerable for the result).
      </p>

      <h2>Why it matters (really)</h2>
      <ul>
        <li>
          <strong>Bias</strong>: AI reproduces the prejudices baked into its
          data. Knowing that is what lets you correct for it.
        </li>
        <li>
          <strong>Misinformation</strong>: deepfakes and fake sources are
          multiplying. Critical thinking is becoming a survival skill.
        </li>
        <li>
          <strong>Data</strong>: using AI without thinking about what you feed
          it puts both you and others at risk.
        </li>
      </ul>

      <h2>Ethics in everyday use: 4 habits</h2>
      <ol>
        <li>
          <strong>Say when it’s AI.</strong> No fake human byline on a text
          that’s 100% generated.
        </li>
        <li>
          <strong>Verify before you share.</strong> AI{" "}
          <Link href="/fr/blog/pourquoi-lia-hallucine">gets things wrong</Link>;
          you remain responsible.
        </li>
        <li>
          <strong>Protect the data.</strong> Don’t paste just anything (see{" "}
          <Link href="/fr/blog/ia-vie-privee-donnees">AI and privacy</Link>).
        </li>
        <li>
          <strong>Keep humans at the center.</strong> AI assists, it doesn’t
          decide in your place.
        </li>
      </ol>

      <h2>Where TROIE stands</h2>
      <p>
        We teach AI that is useful and honest: no magic promises, no hype, just
        concrete cases and real teaching. The goal isn’t to scare you or sell
        you a dream, but to make you{" "}
        <Link href="/fr/blog/ia-remplacer-mon-metier-manager-pas-remplace">
          able to manage AI
        </Link>{" "}
        rather than endure it.
      </p>
      <p>
        Curious where you stand? The{" "}
        <Link href="/formations/quiz">free quiz</Link> is made for exactly
        that, and our <Link href="/formations">online courses</Link> take it
        from there.
      </p>
    </>
  );
}
