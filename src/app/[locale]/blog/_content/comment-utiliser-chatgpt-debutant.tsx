import Link from "next/link";

/**
 * Article : "Comment utiliser ChatGPT : le guide pour débuter."
 * Aimant à trafic top-tunnel. Pédagogique, rassurant, zéro jargon.
 */
export function CommentUtiliserChatgptDebutant() {
  return (
    <>
      <p>
        Tout le monde en parle, et vous, vous n’avez peut-être jamais vraiment
        osé l’ouvrir. C’est normal : on a l’impression qu’il faut être
        informaticien pour utiliser ChatGPT. C’est faux. Si vous savez écrire un
        SMS, vous savez utiliser ChatGPT. Voici le guide simple pour débuter,
        sans jargon et sans vous faire avoir.
      </p>

      <h2>C’est quoi ChatGPT, en une phrase ?</h2>
      <p>
        ChatGPT est un assistant à qui vous parlez en écrivant, et qui vous
        répond en écrivant. Vous lui posez une question, vous lui demandez de
        rédiger un mail, d’expliquer un sujet, de résumer un document ou de vous
        donner des idées, et il répond en quelques secondes. C’est une
        conversation, pas un logiciel compliqué.
      </p>
      <p>
        Important : ChatGPT n’est pas un moteur de recherche, et il ne &laquo;
        sait &raquo; pas tout. Il génère des réponses plausibles à partir de ce
        qu’il a appris. La plupart du temps c’est juste, parfois il se trompe
        avec aplomb. On y revient plus bas.
      </p>

      <h2>Par où commencer (gratuitement)</h2>
      <ol>
        <li>
          Allez sur le site officiel (chatgpt.com) ou téléchargez l’application.
          Créez un compte avec votre email.
        </li>
        <li>
          La version gratuite suffit largement pour débuter. Pas besoin de payer
          pour découvrir.
        </li>
        <li>
          Vous voyez une barre où écrire : c’est tout. Tapez votre demande,
          appuyez sur Entrée.
        </li>
      </ol>
      <p>
        Et voilà. Le plus dur n’est pas technique, c’est de savoir{" "}
        <strong>quoi</strong> lui demander et <strong>comment</strong>.
      </p>

      <h2>C’est quoi un &laquo; prompt &raquo; ?</h2>
      <p>
        Un prompt, c’est simplement le message que vous écrivez à l’IA. Une
        question, une consigne, une demande. Retenez une seule règle :
      </p>
      <blockquote>
        Une demande vague donne une réponse vague. Une demande précise donne une
        réponse utile.
      </blockquote>
      <p>
        Donnez-lui du contexte : qui vous êtes, à qui s’adresse le résultat, le
        ton voulu, la longueur. Comparez :
      </p>
      <ul>
        <li>
          <strong>Vague</strong> : &laquo; écris un mail &raquo; → réponse
          générique.
        </li>
        <li>
          <strong>Précis</strong> : &laquo; Écris un mail poli et court pour
          décaler un rendez-vous chez le dentiste à la semaine prochaine, sur un
          ton aimable. &raquo; → réponse directement utilisable.
        </li>
      </ul>

      <h2>5 exemples de demandes pour vous lancer</h2>
      <ul>
        <li>
          &laquo; Explique-moi [un sujet compliqué] comme si j’avais 12 ans. &raquo;
        </li>
        <li>
          &laquo; Relis ce texte et corrige les fautes sans changer le sens :
          [collez votre texte]. &raquo;
        </li>
        <li>
          &laquo; Donne-moi 10 idées de [repas / cadeau / activité] pour [la
          situation]. &raquo;
        </li>
        <li>
          &laquo; Résume ce document en 5 points clés : [collez le texte]. &raquo;
        </li>
        <li>
          &laquo; Aide-moi à préparer [un entretien / une lettre] : pose-moi
          d’abord les questions dont tu as besoin. &raquo;
        </li>
      </ul>
      <p>
        Cette dernière astuce est puissante : demandez à l’IA de vous{" "}
        <strong>poser des questions</strong> avant de répondre. La réponse sera
        bien meilleure.
      </p>

      <h2>L’erreur de débutant à éviter : tout gober</h2>
      <p>
        ChatGPT invente parfois des informations fausses avec assurance (on
        appelle ça &laquo; halluciner &raquo;). Dates, chiffres, citations,
        sources : vérifiez toujours ce qui est important. L’IA est un excellent
        premier jet, pas une source d’autorité. Vous gardez la main, toujours.
      </p>
      <h3>Et mes données personnelles ?</h3>
      <p>
        Bon réflexe : ne collez pas d’informations sensibles (mots de passe,
        numéros de carte, données médicales, secrets professionnels). Partez du
        principe que ce que vous écrivez peut être conservé. Pour le reste, vous
        pouvez désactiver l’historique dans les réglages.
      </p>

      <h2>Et après ? Passez de &laquo; cliquer &raquo; à &laquo; maîtriser &raquo;</h2>
      <p>
        Utiliser ChatGPT pour rédiger un mail, c’est déjà bien. Mais savoir
        vraiment s’en servir, vérifier, l’intégrer dans votre quotidien sans se
        faire avoir, c’est un cran au-dessus, et c’est exactement ce qui se
        joue aujourd’hui (lisez aussi{" "}
        <Link href="/fr/blog/ia-remplacer-mon-metier-manager-pas-remplace">
          L’IA va-t-elle remplacer mon métier ?
        </Link>
        ).
      </p>
      <p>
        Le plus simple pour savoir où vous en êtes : faites le{" "}
        <Link href="/formations/quiz">QCM gratuit</Link>, ça prend 8 minutes et
        ça situe vos réflexes. Ensuite, avancez à votre rythme avec des{" "}
        <Link href="/formations">cours en ligne</Link> clairs, pour vous, votre
        famille ou vos équipes.
      </p>
    </>
  );
}
