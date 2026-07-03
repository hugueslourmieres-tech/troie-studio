import Link from "next/link";

export function CommentEcrireUnPromptEn() {
  return (
    <>
      <p>
        You tried ChatGPT, and the answer was… underwhelming. The problem is
        almost never the AI. It&rsquo;s the question you ask it. A good prompt
        changes everything. Here&rsquo;s how to write one, with copy-paste
        examples.
      </p>

      <h2>What exactly is a prompt?</h2>
      <p>
        A prompt is the message you write to the AI: a question, an
        instruction, a request. The golden rule fits in one line:
      </p>
      <blockquote>
        A vague request gets a vague answer. A precise request gets a useful
        one.
      </blockquote>

      <h2>The 4-ingredient recipe for a good prompt</h2>
      <ol>
        <li>
          <strong>The role</strong>: tell the AI who it should be. &ldquo;You
          are a supportive writing tutor.&rdquo;
        </li>
        <li>
          <strong>The task</strong>: what you want, precisely. &ldquo;Proofread
          this text without changing its meaning.&rdquo;
        </li>
        <li>
          <strong>The context</strong>: for whom, for what purpose, in what tone.
          &ldquo;It&rsquo;s for a professional email, polite and concise.&rdquo;
        </li>
        <li>
          <strong>The format</strong>: the shape of the answer. &ldquo;Reply
          in 5 bullet points, no jargon.&rdquo;
        </li>
      </ol>

      <h2>8 examples ready to copy</h2>
      <ul>
        <li>&ldquo;Explain [a topic] to me as if I were 12 years old.&rdquo;</li>
        <li>&ldquo;Rewrite this message to make it more polite: [text].&rdquo;</li>
        <li>&ldquo;Give me 10 ideas for [a meal / a gift / a title].&rdquo;</li>
        <li>&ldquo;Summarize this document in 5 key points: [text].&rdquo;</li>
        <li>&ldquo;Compare [A] and [B] in a simple table.&rdquo;</li>
        <li>&ldquo;Act as a recruiter and ask me 5 interview questions.&rdquo;</li>
        <li>&ldquo;Translate this text into French, natural tone, not word for word.&rdquo;</li>
        <li>&ldquo;Before answering, ask me any questions you need.&rdquo;</li>
      </ul>

      <h2>The trick 90% of people miss</h2>
      <p>
        Ask the AI to <strong>ask you questions</strong> before it answers (the
        last example above). It gathers the context it&rsquo;s missing, and the
        answer gets dramatically better. And don&rsquo;t hesitate to push back:
        &ldquo;Too long, make it shorter&rdquo;, &ldquo;Give me 3 other
        versions&rdquo;. It&rsquo;s a conversation, not a vending machine.
      </p>

      <h2>The habit to keep</h2>
      <p>
        Even with a perfect prompt, the AI can get things wrong (read{" "}
        <Link href="/fr/blog/pourquoi-lia-hallucine">
          why AI sometimes makes things up
        </Link>
        ). You remain the decision-maker: you review, you approve. That&rsquo;s
        the whole spirit of{" "}
        <Link href="/fr/blog/ia-remplacer-mon-metier-manager-pas-remplace">
          manage it, don&rsquo;t be replaced by it
        </Link>
        .
      </p>
      <p>
        Want to make real progress? Test your instincts with the{" "}
        <Link href="/formations/quiz">free quiz</Link>, then keep going with our{" "}
        <Link href="/formations">online courses</Link>.
      </p>
    </>
  );
}
