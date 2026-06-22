import Link from "next/link";

export function GlossaireIa() {
  return (
    <>
      <p>
        IA, LLM, prompt, hallucination, agent, token… Le vocabulaire de l’IA
        ressemble à une langue étrangère. Voici 20 mots expliqués simplement, en
        une phrase chacun, pour ne plus jamais être perdu.
      </p>

      <h2>Les bases</h2>
      <ul>
        <li>
          <strong>IA (intelligence artificielle)</strong> : un programme capable
          de réaliser des tâches qui demandent normalement de l’intelligence
          humaine.
        </li>
        <li>
          <strong>IA générative</strong> : une IA qui crée du contenu (texte,
          image, son) plutôt que de simplement classer ou prédire.
        </li>
        <li>
          <strong>LLM (grand modèle de langage)</strong> : le moteur derrière
          ChatGPT et consorts, entraîné sur d’énormes quantités de texte.
        </li>
        <li>
          <strong>ChatGPT / Claude / Gemini / Le Chat</strong> : des assistants
          conversationnels basés sur des LLM.
        </li>
      </ul>

      <h2>Quand on s’en sert</h2>
      <ul>
        <li>
          <strong>Prompt</strong> : le message que vous écrivez à l’IA pour lui
          demander quelque chose.
        </li>
        <li>
          <strong>Token</strong> : un morceau de mot. L’IA lit et écrit en
          tokens, pas en lettres.
        </li>
        <li>
          <strong>Contexte</strong> : tout ce que l’IA &laquo; garde en tête &raquo;
          dans la conversation en cours.
        </li>
        <li>
          <strong>Hallucination</strong> : quand l’IA invente une information
          fausse en la présentant comme vraie.
        </li>
        <li>
          <strong>Agent IA</strong> : une IA qui ne fait pas que répondre, mais
          enchaîne des actions pour atteindre un objectif.
        </li>
      </ul>

      <h2>Les coulisses</h2>
      <ul>
        <li>
          <strong>Entraînement</strong> : la phase où le modèle apprend à partir
          de données.
        </li>
        <li>
          <strong>Données d’entraînement</strong> : les textes et images qui ont
          servi à apprendre.
        </li>
        <li>
          <strong>Modèle</strong> : le &laquo; cerveau &raquo; entraîné, qu’on
          utilise ensuite.
        </li>
        <li>
          <strong>Open source</strong> : un modèle dont le fonctionnement est
          public et réutilisable (Mistral en propose).
        </li>
        <li>
          <strong>Multimodal</strong> : une IA qui comprend plusieurs formats
          (texte + image + son).
        </li>
      </ul>

      <h2>Ce qui fait débat</h2>
      <ul>
        <li>
          <strong>Biais</strong> : des préjugés présents dans les données, que
          l’IA peut reproduire.
        </li>
        <li>
          <strong>Deepfake</strong> : un faux contenu (voix, vidéo) généré par
          IA, parfois utilisé pour des arnaques.
        </li>
        <li>
          <strong>AI Act</strong> : le règlement européen qui encadre l’usage de
          l’IA.
        </li>
        <li>
          <strong>RGPD</strong> : les règles européennes de protection des
          données, qui s’appliquent aussi à l’IA.
        </li>
        <li>
          <strong>Souveraineté</strong> : l’idée de garder la maîtrise (et les
          données) sur le sol européen.
        </li>
        <li>
          <strong>Prompt injection</strong> : une technique pour tromper une IA
          en lui glissant des instructions cachées.
        </li>
      </ul>

      <h2>Et maintenant ?</h2>
      <p>
        Connaître les mots, c’est déjà ne plus avoir peur. Pour passer à la
        pratique, testez vos réflexes avec le{" "}
        <Link href="/formations/quiz">QCM gratuit</Link>, ou apprenez à{" "}
        <Link href="/fr/blog/comment-ecrire-un-prompt">écrire un bon prompt</Link>
        . Et pour aller plus loin, nos{" "}
        <Link href="/formations">cours en ligne</Link> vous accompagnent pas à
        pas.
      </p>
    </>
  );
}
