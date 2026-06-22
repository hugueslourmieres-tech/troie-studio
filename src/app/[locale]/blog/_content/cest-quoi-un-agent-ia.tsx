import Link from "next/link";

export function CestQuoiUnAgentIa() {
  return (
    <>
      <p>
        On entend partout le mot &laquo; agent IA &raquo;, présenté comme la
        prochaine révolution. Mais c’est quoi, au juste, et en quoi c’est
        différent de ChatGPT ? Explication simple, sans jargon.
      </p>

      <h2>La différence avec ChatGPT</h2>
      <p>
        ChatGPT répond. Un agent IA <strong>agit</strong>. Au lieu de vous
        donner un texte que vous devez ensuite utiliser, un agent enchaîne
        plusieurs étapes tout seul pour atteindre un objectif : il réfléchit,
        planifie, utilise des outils, et fait la tâche de bout en bout.
      </p>
      <blockquote>
        ChatGPT vous dit comment faire. Un agent IA le fait.
      </blockquote>

      <h2>Un exemple concret</h2>
      <p>
        Demandez à ChatGPT &laquo; organise mon déménagement &raquo; : il vous
        donne une liste de conseils. Un agent, lui, pourrait comparer des
        sociétés, pré-remplir des demandes de devis, et vous proposer un planning,
        en enchaînant les actions. Vous passez de l’exécution à la supervision :
        vous validez, il exécute.
      </p>

      <h2>Pourquoi tout le monde en parle</h2>
      <p>
        Parce que ça change la nature du travail. Le patron de Mistral l’a résumé
        devant l’Assemblée : ses ingénieurs ne codent plus, ils &laquo; managent
        &raquo; des agents qui codent à leur place. C’est tout le sujet de{" "}
        <Link href="/fr/blog/ia-remplacer-mon-metier-manager-pas-remplace">
          manager, pas remplacé
        </Link>{" "}
        : votre valeur se déplace vers le pilotage.
      </p>

      <h2>Faut-il s’en méfier ?</h2>
      <p>
        Un agent qui agit seul, ça demande des garde-fous. Trois précautions de
        bon sens :
      </p>
      <ul>
        <li>
          <strong>Garder un humain dans la boucle</strong> pour les décisions qui
          comptent (paiement, envoi, suppression).
        </li>
        <li>
          <strong>Limiter ses accès</strong> à ce qui est strictement utile.
        </li>
        <li>
          <strong>Vérifier ses actions</strong> : un agent peut se tromper comme
          n’importe quelle IA.
        </li>
      </ul>

      <h2>Ce qu’il faut retenir</h2>
      <p>
        Un agent IA n’est pas magique : c’est un assistant qui peut agir, à
        condition d’être bien cadré. Savoir le diriger devient une compétence
        clé, au travail comme à la maison.
      </p>
      <p>
        Pour comprendre et déployer ça sereinement (en équipe, c’est notre
        métier), faites le <Link href="/formations/quiz">QCM gratuit</Link>,
        découvrez <Link href="/ia">TROIE pour les professionnels</Link>, ou{" "}
        <Link href="/fr/contact">parlons-en 30 minutes</Link>.
      </p>
    </>
  );
}
