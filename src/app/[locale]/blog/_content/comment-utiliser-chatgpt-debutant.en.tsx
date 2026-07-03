import Link from "next/link";

/**
 * Article: "How to use ChatGPT: the beginner's guide."
 * Top-of-funnel traffic magnet. Educational, reassuring, zero jargon.
 */
export function CommentUtiliserChatgptDebutantEn() {
  return (
    <>
      <p>
        Everyone is talking about it, and maybe you have never quite dared to
        open it. That’s normal: it feels like you need to be a computer expert
        to use ChatGPT. You don’t. If you can write a text message, you can use
        ChatGPT. Here is the simple guide to getting started, with no jargon
        and no nasty surprises.
      </p>

      <h2>What is ChatGPT, in one sentence?</h2>
      <p>
        ChatGPT is an assistant you talk to in writing, and it answers you in
        writing. You ask it a question, ask it to draft an email, explain a
        topic, summarize a document or give you ideas, and it responds within
        seconds. It’s a conversation, not a complicated piece of software.
      </p>
      <p>
        Important: ChatGPT is not a search engine, and it doesn’t &ldquo;know&rdquo;
        everything. It generates plausible answers based on what
        it has learned. Most of the time it’s right; sometimes it gets things
        wrong with total confidence. More on that below.
      </p>

      <h2>Where to start (for free)</h2>
      <ol>
        <li>
          Go to the official website (chatgpt.com) or download the app. Create
          an account with your email address.
        </li>
        <li>
          The free version is more than enough to get started. No need to pay
          just to explore.
        </li>
        <li>
          You’ll see a bar where you can type: that’s all there is to it. Type
          your request and press Enter.
        </li>
      </ol>
      <p>
        And that’s it. The hard part isn’t technical, it’s knowing{" "}
        <strong>what</strong> to ask and <strong>how</strong>.
      </p>

      <h2>What is a &ldquo;prompt&rdquo;?</h2>
      <p>
        A prompt is simply the message you write to the AI. A question, an
        instruction, a request. Remember one single rule:
      </p>
      <blockquote>
        A vague request gets a vague answer. A precise request gets a useful
        answer.
      </blockquote>
      <p>
        Give it context: who you are, who the result is for, the tone you want,
        the length. Compare:
      </p>
      <ul>
        <li>
          <strong>Vague</strong>: &ldquo;write an email&rdquo; → generic
          answer.
        </li>
        <li>
          <strong>Precise</strong>: &ldquo;Write a short, polite email to
          reschedule a dentist appointment to next week, in a friendly
          tone.&rdquo; → answer you can use right away.
        </li>
      </ul>

      <h2>5 example prompts to get you started</h2>
      <ul>
        <li>
          &ldquo;Explain [a complicated topic] to me as if I were 12 years old.&rdquo;
        </li>
        <li>
          &ldquo;Proofread this text and fix the mistakes without changing the
          meaning: [paste your text].&rdquo;
        </li>
        <li>
          &ldquo;Give me 10 ideas for [a meal / a gift / an activity] for [the
          situation].&rdquo;
        </li>
        <li>
          &ldquo;Summarize this document in 5 key points: [paste the text].&rdquo;
        </li>
        <li>
          &ldquo;Help me prepare [an interview / a letter]: first, ask me the
          questions you need answered.&rdquo;
        </li>
      </ul>
      <p>
        That last trick is powerful: ask the AI to{" "}
        <strong>ask you questions</strong> before it answers. The response will
        be far better.
      </p>

      <h2>The beginner mistake to avoid: believing everything</h2>
      <p>
        ChatGPT sometimes invents false information with complete confidence
        (it’s called &ldquo;hallucinating&rdquo;). Dates, figures, quotes,
        sources: always double-check anything that matters. AI is an excellent
        first draft, not an authoritative source. You stay in control, always.
      </p>
      <h3>What about my personal data?</h3>
      <p>
        Good habit: never paste sensitive information (passwords, card numbers,
        medical records, trade secrets). Assume that whatever you type may be
        stored. Beyond that, you can turn off chat history in the settings.
      </p>

      <h2>What next? Go from &ldquo;clicking&rdquo; to &ldquo;mastering&rdquo;</h2>
      <p>
        Using ChatGPT to draft an email is a good start. But truly knowing how
        to use it, check its output and fit it into your daily routine without
        getting fooled is a level above, and that’s exactly what’s at stake
        today (see also{" "}
        <Link href="/fr/blog/ia-remplacer-mon-metier-manager-pas-remplace">
          Will AI replace my job?
        </Link>
        ).
      </p>
      <p>
        The easiest way to find out where you stand: take the{" "}
        <Link href="/formations/quiz">free quiz</Link>, it takes 8 minutes and
        gauges your reflexes. Then move at your own pace through clear{" "}
        <Link href="/formations">online courses</Link>, for yourself, your
        family or your teams.
      </p>
    </>
  );
}
