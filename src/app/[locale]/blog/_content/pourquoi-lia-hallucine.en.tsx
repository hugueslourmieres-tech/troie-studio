import Link from "next/link";

export function PourquoiLiaHallucineEn() {
  return (
    <>
      <p>
        One day, ChatGPT gives you a date, a quote, or a source that looks
        perfectly credible… and is completely wrong. It&rsquo;s not a bug,
        it&rsquo;s a known behavior: it&rsquo;s called a &ldquo;
        hallucination&rdquo;. Understanding why it happens means never getting
        fooled again.
      </p>

      <h2>Why AI makes things up</h2>
      <p>
        A generative AI doesn&rsquo;t &ldquo;know&rdquo; things the way an
        encyclopedia does. It predicts the most likely next word, over and
        over. Most of the time, it lands on the right answer. But when the
        information is missing, it doesn&rsquo;t say &ldquo;I don&rsquo;t know&rdquo;:
        it fills the gap with something plausible. Hence wrong answers
        delivered with complete confidence.
      </p>
      <p>
        Important: even the best models still get things wrong some of the
        time. Hallucination isn&rsquo;t a flaw someone forgot to fix, it&rsquo;s
        inherent to how the AI works.
      </p>

      <h2>When to be most careful</h2>
      <ul>
        <li>
          <strong>Precise numbers, dates, and statistics</strong>.
        </li>
        <li>
          <strong>Quotes, sources, references</strong> (it can invent them
          out of thin air).
        </li>
        <li>
          <strong>Very recent topics</strong> or highly specialized ones.
        </li>
        <li>
          <strong>Legal, medical, financial matters</strong>: never act
          without verifying.
        </li>
      </ul>

      <h2>3 habits so you never get fooled</h2>
      <ol>
        <li>
          <strong>Ask for sources</strong>, then check them yourself.
          A source that doesn&rsquo;t open is a source that was made up.
        </li>
        <li>
          <strong>Cross-check important information</strong> with a regular
          web search before using it.
        </li>
        <li>
          <strong>Use AI as a first draft</strong>, never as the final
          authority. The decision stays with you.
        </li>
      </ol>

      <h2>The right mindset</h2>
      <p>
        AI is a brilliant assistant that sometimes gets things wrong. Keeping a
        critical eye isn&rsquo;t being against AI, it&rsquo;s knowing how to
        use it. That&rsquo;s exactly the posture of{" "}
        <Link href="/fr/blog/ia-remplacer-mon-metier-manager-pas-remplace">
          manage it, don&rsquo;t be replaced by it
        </Link>{" "}
        : the tool proposes, you approve.
      </p>
      <p>
        To sharpen these habits (a full module is devoted to them), start with
        the <Link href="/formations/quiz">free quiz</Link>, then our{" "}
        <Link href="/formations">online courses</Link>.
      </p>
    </>
  );
}
