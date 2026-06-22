import Link from "next/link";

export function PourquoiLiaHallucine() {
  return (
    <>
      <p>
        Un jour, ChatGPT vous donne une date, une citation ou une source qui a
        l’air parfaitement crédible… et qui est complètement fausse. Ce n’est pas
        un bug, c’est un comportement connu : on appelle ça une &laquo;
        hallucination &raquo;. Comprendre pourquoi, c’est arrêter de se faire
        avoir.
      </p>

      <h2>Pourquoi l’IA invente des choses</h2>
      <p>
        Une IA générative ne &laquo; sait &raquo; pas les choses comme une
        encyclopédie. Elle prédit le mot le plus probable après le précédent,
        encore et encore. La plupart du temps, ça tombe juste. Mais quand
        l’information lui manque, elle ne dit pas &laquo; je ne sais pas &raquo; :
        elle comble le trou avec quelque chose de plausible. D’où des réponses
        fausses présentées avec aplomb.
      </p>
      <p>
        Important : même les meilleurs modèles se trompent encore une partie du
        temps. L’hallucination n’est pas un défaut qu’on a oublié de corriger,
        c’est lié à la façon dont l’IA fonctionne.
      </p>

      <h2>Quand se méfier le plus</h2>
      <ul>
        <li>
          <strong>Les chiffres, dates et statistiques</strong> précis.
        </li>
        <li>
          <strong>Les citations, sources, références</strong> (elle peut en
          inventer de toutes pièces).
        </li>
        <li>
          <strong>Les sujets très récents</strong> ou très spécialisés.
        </li>
        <li>
          <strong>Le juridique, le médical, le financier</strong> : ne jamais
          agir sans vérifier.
        </li>
      </ul>

      <h2>3 réflexes pour ne jamais se faire avoir</h2>
      <ol>
        <li>
          <strong>Demandez les sources</strong>, puis vérifiez-les vous-même.
          Une source qui ne s’ouvre pas est une source inventée.
        </li>
        <li>
          <strong>Recoupez l’info importante</strong> avec une recherche
          classique avant de l’utiliser.
        </li>
        <li>
          <strong>Utilisez l’IA comme premier jet</strong>, jamais comme autorité
          finale. Vous gardez la décision.
        </li>
      </ol>

      <h2>Le bon état d’esprit</h2>
      <p>
        L’IA est un assistant brillant mais qui se trompe parfois. Garder son
        esprit critique, ce n’est pas être contre l’IA, c’est savoir s’en
        servir. C’est exactement la posture du{" "}
        <Link href="/fr/blog/ia-remplacer-mon-metier-manager-pas-remplace">
          manager, pas remplacé
        </Link>{" "}
        : l’outil propose, vous validez.
      </p>
      <p>
        Pour muscler ces réflexes (un module entier y est consacré), commencez
        par le <Link href="/formations/quiz">QCM gratuit</Link>, puis nos{" "}
        <Link href="/formations">cours en ligne</Link>.
      </p>
    </>
  );
}
