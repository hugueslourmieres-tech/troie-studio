import Link from "next/link";

/**
 * Article : "On peut cloner votre voix en 30 secondes : l’arnaque IA à connaître."
 * Perso / famille. Très partageable. Pédagogique, rassurant, actionnable.
 */
export function ArnaqueIaVoixCloneeEn() {
  return (
    <>
      <p>
        Picture this: your phone rings. It&apos;s your son&apos;s voice, panicked,
        saying he&apos;s had an accident and needs money right away. His voice, his
        intonation, unmistakably him. Except it isn&apos;t him. It&apos;s an AI that
        cloned his voice from a few seconds of a voicemail or an Instagram
        story. This scam is no longer science fiction: in
        2026, it is commonplace in France.
      </p>

      <h2>How it works (and why it is so effective)</h2>
      <p>
        Cloning a voice now takes about 30 seconds of audio. Scammers
        harvest that sound everywhere: a voicemail, a video on social
        media, an answering machine. With it, they generate a strikingly
        convincing voice and call you posing as a loved one, your bank advisor,
        or even your company&apos;s CEO.
      </p>
      <p>
        The volume of this doctored content (&ldquo;deepfakes&rdquo;) has
        grown tenfold in two years. And it pays: the average loss for an
        individual typically runs between 2,000 and 12,000 euros, often far
        more when the scams target businesses.
      </p>

      <h2>The 5 most common scenarios</h2>
      <ul>
        <li>
          <strong>The fake loved one in distress</strong>: &ldquo;Mom, I&apos;m in
          trouble, don&apos;t hang up.&rdquo;
        </li>
        <li>
          <strong>The fake bank advisor</strong> asking you to
          &ldquo;secure&rdquo; your account.
        </li>
        <li>
          <strong>The fake executive</strong> (at work) ordering an
          urgent, confidential wire transfer.
        </li>
        <li>
          <strong>The fake miracle investment</strong>, backed by a doctored video
          of a well-known public figure.
        </li>
        <li>
          <strong>The fake customer service rep</strong> &ldquo;confirming&rdquo;
          an order to trick you into giving up a code.
        </li>
      </ul>

      <h2>How to spot a spoofed call</h2>
      <p>
        There is no magic detector, but certain signals should put you on alert:
      </p>
      <ul>
        <li>
          <strong>Urgency and secrecy.</strong> &ldquo;Right now&rdquo;,
          &ldquo;don&apos;t tell anyone&rdquo;: that is the signature of a
          scam.
        </li>
        <li>
          <strong>A request for money or a code</strong>, especially through an
          unusual channel.
        </li>
        <li>
          <strong>Evasive answers</strong> when you ask a specific
          personal question only the real person would know.
        </li>
      </ul>

      <h2>The right reflexes to avoid getting caught</h2>
      <ol>
        <li>
          <strong>Hang up and call back yourself</strong>, reaching your loved
          one or your bank on their real number. A voice on the phone no longer proves anything.
        </li>
        <li>
          <strong>Agree on a family password.</strong> A secret word
          you ask for whenever in doubt. Simple and remarkably effective.
        </li>
        <li>
          <strong>Never give in to urgency.</strong> No real loved one, no
          real bank will ever blame you for taking two minutes to check.
        </li>
        <li>
          <strong>Limit public audio.</strong> The less your voice (and your
          children&apos;s) floats around online, the harder it is to clone.
        </li>
      </ol>

      <h2>Already a victim? What to do</h2>
      <p>
        Don&apos;t blame yourself, these scams are engineered to fool anyone.
        Report illegal content on the Pharos platform (France&apos;s official reporting service), alert your
        bank immediately, and file a police report. The faster you act, the
        better your chances of blocking a transfer.
      </p>

      <h2>The best protection is understanding</h2>
      <p>
        Learning how AI works means learning how not to get fooled,
        at any age. It is also something you can pass on to your parents and
        your children. Test your reflexes with our{" "}
        <Link href="/formations/quiz">free quiz</Link> (an entire module is
        devoted to security and common traps), then go further with our{" "}
        <Link href="/formations">online courses</Link>, designed for you and your
        family. And for the bigger picture, read{" "}
        <Link href="/fr/blog/ia-remplacer-mon-metier-manager-pas-remplace">
          Manager, not replaced
        </Link>
        .
      </p>
    </>
  );
}
