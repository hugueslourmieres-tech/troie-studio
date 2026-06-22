import Link from "next/link";

export function CommentEcrireUnPrompt() {
  return (
    <>
      <p>
        Vous avez essayé ChatGPT, et la réponse était… moyenne. Le problème
        n’est presque jamais l’IA. C’est la question qu’on lui pose. Un bon
        prompt change tout. Voici comment en écrire un, avec des exemples
        copiables.
      </p>

      <h2>C’est quoi un prompt, au juste ?</h2>
      <p>
        Un prompt, c’est le message que vous écrivez à l’IA : une question, une
        consigne, une demande. La règle d’or tient en une ligne :
      </p>
      <blockquote>
        Une demande vague donne une réponse vague. Une demande précise donne une
        réponse utile.
      </blockquote>

      <h2>La recette d’un bon prompt en 4 ingrédients</h2>
      <ol>
        <li>
          <strong>Le rôle</strong> : dites à l’IA qui elle doit être. &laquo; Tu
          es un professeur de français bienveillant. &raquo;
        </li>
        <li>
          <strong>La tâche</strong> : ce que vous voulez, précisément. &laquo;
          Corrige ce texte sans changer le sens. &raquo;
        </li>
        <li>
          <strong>Le contexte</strong> : pour qui, dans quel but, quel ton.
          &laquo; C’est pour un mail professionnel, ton poli et court. &raquo;
        </li>
        <li>
          <strong>Le format</strong> : la forme de la réponse. &laquo; Réponds
          en 5 points, sans jargon. &raquo;
        </li>
      </ol>

      <h2>8 exemples prêts à copier</h2>
      <ul>
        <li>&laquo; Explique-moi [un sujet] comme si j’avais 12 ans. &raquo;</li>
        <li>&laquo; Reformule ce message pour qu’il soit plus poli : [texte]. &raquo;</li>
        <li>&laquo; Donne-moi 10 idées de [repas / cadeau / titre]. &raquo;</li>
        <li>&laquo; Résume ce document en 5 points clés : [texte]. &raquo;</li>
        <li>&laquo; Compare [A] et [B] dans un tableau simple. &raquo;</li>
        <li>&laquo; Joue le rôle d’un recruteur et pose-moi 5 questions d’entretien. &raquo;</li>
        <li>&laquo; Traduis ce texte en anglais, ton naturel, pas mot à mot. &raquo;</li>
        <li>&laquo; Avant de répondre, pose-moi les questions dont tu as besoin. &raquo;</li>
      </ul>

      <h2>L’astuce que 90 % des gens ratent</h2>
      <p>
        Demandez à l’IA de <strong>vous poser des questions</strong> avant de
        répondre (le dernier exemple ci-dessus). Elle récolte le contexte qui lui
        manque, et la réponse devient bien meilleure. Et n’hésitez pas à
        relancer : &laquo; Trop long, fais plus court &raquo;, &laquo; Donne-moi
        3 autres versions &raquo;. C’est une conversation, pas un distributeur.
      </p>

      <h2>Le réflexe à garder</h2>
      <p>
        Même avec un prompt parfait, l’IA peut se tromper (lire{" "}
        <Link href="/fr/blog/pourquoi-lia-hallucine">
          pourquoi l’IA invente parfois des choses
        </Link>
        ). Vous restez le décideur : vous relisez, vous validez. C’est tout
        l’esprit du{" "}
        <Link href="/fr/blog/ia-remplacer-mon-metier-manager-pas-remplace">
          manager, pas remplacé
        </Link>
        .
      </p>
      <p>
        Envie de vraiment progresser ? Testez vos réflexes avec le{" "}
        <Link href="/formations/quiz">QCM gratuit</Link>, puis avancez avec nos{" "}
        <Link href="/formations">cours en ligne</Link>.
      </p>
    </>
  );
}
