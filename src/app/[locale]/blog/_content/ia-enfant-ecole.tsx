import Link from "next/link";

export function IaEnfantEcole() {
  return (
    <>
      <p>
        Votre enfant rend ses devoirs avec ChatGPT. Première réaction : l’envie
        d’interdire. Mais plus de 60 % des lycéens utilisent déjà l’IA pour
        l’école, le plus souvent sans le dire. La vraie question n’est donc pas
        &laquo; comment l’empêcher &raquo;, mais &laquo; comment l’accompagner
        &raquo;.
      </p>

      <h2>Pourquoi interdire ne marche pas</h2>
      <p>
        Interdire l’IA à un ado en 2026, c’est un peu comme interdire la
        calculatrice : inapplicable, et contre-productif. L’outil est partout,
        gratuit, sur son téléphone. L’interdiction pousse surtout à l’usage
        caché, donc sans aucun garde-fou.
      </p>

      <h2>Le vrai risque : la dépendance, pas la triche</h2>
      <p>
        Le danger principal n’est pas que l’IA fasse le devoir. C’est qu’à force
        de lui déléguer la réflexion, on perde l’habitude de réfléchir
        soi-même. Des études tirent la sonnette d’alarme sur cette &laquo;
        dépendance &raquo; : plus on s’appuie sur la machine pour trier le vrai
        du faux, moins on sait le faire seul.
      </p>

      <h2>Accompagner, concrètement : 4 règles simples</h2>
      <ol>
        <li>
          <strong>L’IA aide, elle ne remplace pas.</strong> On l’utilise pour
          comprendre, pas pour recopier.
        </li>
        <li>
          <strong>On vérifie toujours.</strong> L’IA se trompe ; recouper, c’est
          le réflexe à transmettre.
        </li>
        <li>
          <strong>On explique ce qu’on a rendu.</strong> Si l’enfant ne peut pas
          réexpliquer son devoir, c’est qu’il ne l’a pas fait.
        </li>
        <li>
          <strong>On en parle ouvertement.</strong> Mieux vaut un usage déclaré
          et cadré qu’un usage caché.
        </li>
      </ol>

      <h2>Une occasion, pas seulement un problème</h2>
      <p>
        Bien utilisée, l’IA est un formidable professeur particulier : elle
        explique à l’infini, sans juger, au rythme de l’enfant. Le rôle du
        parent n’est pas de la bloquer, mais d’apprendre à la{" "}
        <Link href="/fr/blog/ia-remplacer-mon-metier-manager-pas-remplace">
          manager
        </Link>{" "}
        avec son enfant. Pensez aussi à protéger ses{" "}
        <Link href="/fr/blog/ia-vie-privee-donnees">données personnelles</Link>.
      </p>
      <p>
        Pour apprendre en famille, sans jargon, commencez par le{" "}
        <Link href="/formations/quiz">QCM gratuit</Link> (pensé pour tous les
        âges), puis nos <Link href="/formations">cours en ligne</Link>.
      </p>
    </>
  );
}
