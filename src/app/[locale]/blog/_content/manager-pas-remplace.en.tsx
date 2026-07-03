import Link from "next/link";

/**
 * Article: "Will AI replace my job?"
 * TROIE angle: manager, not replaced. Educational, no hype.
 */
export function ManagerPasRemplaceEn() {
  return (
    <>
      <p>
        It&apos;s the question everyone is asking, often under their breath:
        <strong> is artificial intelligence going to take my job?</strong>{" "}
        In France, 67% of people see AI as a threat, and the fear of being
        replaced keeps growing. Yet the honest answer is neither
        &ldquo;yes, you&apos;re done for&rdquo; nor &ldquo;no, don&apos;t change
        a thing&rdquo;. It comes down to one sentence, delivered by the head of
        France&apos;s AI champion before the National Assembly.
      </p>

      <figure>
        <div className="blog-embed">
          <iframe
            src="https://www.youtube-nocookie.com/embed/vczBo0AvbTI?start=375"
            title="Arthur Mensch (Mistral) devant l'Assemblée nationale"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <figcaption>
          Arthur Mensch, CEO of Mistral AI, hearing before the French National
          Assembly (May 12, 2026). The key passage starts at 6:15.
        </figcaption>
      </figure>

      <h2>The fear is real, and the numbers back it up</h2>
      <p>
        There&apos;s no point brushing it aside. In France, roughly one in ten
        employees fears being replaced by AI, and the majority is calling for
        guardrails rather than speed. Some professions can already feel the
        ground shifting: copywriting, customer support, parts of accounting.
        This is not paranoia.
      </p>
      <p>
        But there&apos;s a blind spot in all this anxiety-driven talk. The very
        technology that &ldquo;threatens&rdquo; us is already used by nearly one
        in two French people. The problem isn&apos;t AI. It&apos;s that nobody
        ever taught us how to use it <strong>properly</strong>.
      </p>

      <h2>What the head of Mistral actually said</h2>
      <p>
        Testifying before members of parliament, Arthur Mensch explained that
        his engineers hardly write any code anymore. They describe what they
        want, AI agents produce it, and the engineers review and make the
        calls. The stated result: productivity doubled internally in six
        months.
      </p>
      <blockquote>
        &ldquo;You&apos;re no longer a craftsman, you&apos;re a manager, so you
        ask agents to write the code for you.&rdquo;
      </blockquote>
      <p>
        His message is not &ldquo;AI is going to fire you&rdquo;. It&apos;s the
        opposite: your job is shifting toward that of a manager. You stop
        executing everything by hand and start directing tools that execute for
        you. And this isn&apos;t some LinkedIn influencer talking: it&apos;s the
        CEO of France&apos;s AI champion, speaking before Parliament.
      </p>

      <h2>What really changes: from execution to supervision</h2>
      <p>
        This shift isn&apos;t just about developers. It touches nearly every
        knowledge-based profession:
      </p>
      <ul>
        <li>
          The marketing manager no longer writes every post; they run a content
          production pipeline and keep the final say.
        </li>
        <li>
          The accountant no longer keys in every entry; they supervise
          generated dashboards and hunt down anomalies.
        </li>
        <li>
          The lawyer no longer reads 200 pages; they have an agent do the first
          pass, then validate the analysis.
        </li>
      </ul>
      <p>
        In every case, the value moves from <strong>doing</strong> to
        <strong> deciding, checking, arbitrating</strong>. In other words:
        managing.
      </p>

      <h2>Managing an AI is a skill you can learn (and it&apos;s not hype)</h2>
      <p>
        This is the real issue. We open ChatGPT, copy-paste an answer, and
        believe we&apos;re &ldquo;doing AI&rdquo;. We&apos;re not. Managing an
        AI is a concrete skill built on four reflexes:
      </p>
      <ol>
        <li>
          <strong>Provide the right context.</strong> A vague request gets a
          vague answer. A good brief (goal, audience, constraints, examples)
          changes everything.
        </li>
        <li>
          <strong>Check what it produces.</strong> AI sometimes makes things up
          (it&apos;s called &ldquo;hallucinating&rdquo;). A manager never signs
          off without reviewing.
        </li>
        <li>
          <strong>Delegate what should be delegated.</strong> Repetitive tasks,
          yes. Judgment, relationships, the final decision, no.
        </li>
        <li>
          <strong>Stay in control.</strong> Your data, your responsibility,
          your signature. The tool proposes, you decide.
        </li>
      </ol>
      <p>
        These reflexes can&apos;t be improvised. They&apos;re learned, with
        concrete cases, not with magical promises.
      </p>

      <h2>Who is this for? Everyone</h2>
      <p>
        <strong>For individuals and families</strong>, managing AI means using
        it without getting fooled: spotting a scam (a voice can be cloned in 30
        seconds), guiding children who already use it for homework, saving time
        every day without outsourcing your critical thinking.
      </p>
      <p>
        <strong>For professionals and businesses</strong>, it has become a
        matter of competitiveness, but also of compliance: since 2025, the
        EU AI Act has required a minimum level of AI literacy for teams that
        work with these tools. A team improvising with AI isn&apos;t
        productivity, it&apos;s risk.
      </p>

      <h2>Where to start, concretely</h2>
      <p>
        Not with hours of theoretical videos. With an honest assessment of
        where you actually stand. That&apos;s exactly how TROIE works: you
        start with a{" "}
        <Link href="/formations/quiz">free quiz</Link> to gauge your reflexes,
        then move at your own pace through clear{" "}
        <Link href="/formations">online courses</Link> built on real cases.
      </p>
      <p>
        On the business side, we help you frame AI use across your teams, on
        site or remotely, with real teaching and zero hype: see{" "}
        <Link href="/ia">TROIE for professionals</Link>, or{" "}
        <Link href="/fr/contact">book a 30-minute call</Link> to talk it
        through.
      </p>

      <h2>Manager, not replaced</h2>
      <p>
        The real divide of 2026 isn&apos;t between those who use AI and those
        who don&apos;t. It&apos;s between those who know how to{" "}
        <strong>manage</strong> it and those who settle for clicking. The good
        news is that it can be learned. And you can start today, for free.
      </p>
    </>
  );
}
