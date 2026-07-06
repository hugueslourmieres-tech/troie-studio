import Link from "next/link";

export function IaEthique() {
  return (
    <>
      <p>
        &laquo; IA éthique &raquo; : l’expression sonne bien, mais veut souvent
        dire tout et n’importe quoi. Concrètement, ça change quoi pour vous ?
        Voici une définition simple, et ce que ça implique au quotidien, sans
        leçon de morale.
      </p>

      <h2>Une définition simple</h2>
      <p>
        Une IA éthique, ce n’est pas une IA &laquo; gentille &raquo;. C’est une
        IA qu’on utilise en gardant trois choses en tête : la{" "}
        <strong>transparence</strong> (savoir quand on parle à une IA), le{" "}
        <strong>respect des données</strong> (les vôtres et celles des autres),
        et la <strong>responsabilité</strong> (un humain reste garant du
        résultat).
      </p>

      <h2>Pourquoi ça compte (vraiment)</h2>
      <ul>
        <li>
          <strong>Les biais</strong> : l’IA reproduit les préjugés de ses données.
          Le savoir, c’est pouvoir corriger.
        </li>
        <li>
          <strong>La désinformation</strong> : deepfakes et fausses sources se
          multiplient. L’esprit critique devient une compétence de survie.
        </li>
        <li>
          <strong>Les données</strong> : utiliser l’IA sans réfléchir à ce qu’on
          lui donne, c’est prendre un risque pour soi et pour les autres.
        </li>
      </ul>

      <h2>L’éthique au quotidien : 4 réflexes</h2>
      <ol>
        <li>
          <strong>Dire quand c’est de l’IA.</strong> Pas de fausse signature
          humaine sur un texte 100 % généré.
        </li>
        <li>
          <strong>Vérifier avant de diffuser.</strong> L’IA{" "}
          <Link href="/fr/blog/pourquoi-lia-hallucine">se trompe</Link> ; vous
          restez responsable.
        </li>
        <li>
          <strong>Protéger les données.</strong> Ne pas coller n’importe quoi
          (voir{" "}
          <Link href="/fr/blog/ia-vie-privee-donnees">IA et vie privée</Link>).
        </li>
        <li>
          <strong>Garder l’humain au centre.</strong> L’IA assiste, elle ne
          décide pas à votre place.
        </li>
      </ol>

      <h2>Notre parti pris chez TROIE</h2>
      <p>
        On forme à une IA utile et honnête : pas de promesse magique, pas de
        survente, des cas concrets et de la pédagogie. L’objectif n’est pas de
        vous faire peur ni de vous vendre du rêve, mais de vous rendre{" "}
        <Link href="/fr/blog/ia-remplacer-mon-metier-manager-pas-remplace">
          capable de manager l’IA
        </Link>{" "}
        plutôt que de la subir.
      </p>
      <p>
        Curieux d’où vous en êtes ? Le{" "}
        <Link href="/formations/quiz">QCM gratuit</Link> est fait pour ça, et nos{" "}
        <Link href="/formations">cours en ligne</Link> prennent le relais.
      </p>
    </>
  );
}
