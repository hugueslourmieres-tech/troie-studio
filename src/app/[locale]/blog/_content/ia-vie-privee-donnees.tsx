import Link from "next/link";

export function IaViePriveeDonnees() {
  return (
    <>
      <p>
        ChatGPT est gratuit, pratique, et terriblement bavard. Mais une question
        revient : ce que je lui écris, où ça va ? Voici, simplement, ce qu’il ne
        faut jamais coller dans une IA, et comment garder le contrôle de vos
        données.
      </p>

      <h2>Où vont vos messages ?</h2>
      <p>
        Avec les versions grand public, partez du principe que ce que vous
        écrivez peut être conservé et, selon les réglages, utilisé pour améliorer
        le modèle. Ce n’est pas forcément malveillant, mais ce n’est pas privé.
        La règle de bon sens : ne confiez jamais à une IA ce que vous ne
        diriez pas à un inconnu.
      </p>

      <h2>Ce qu’il ne faut jamais coller</h2>
      <ul>
        <li>
          <strong>Mots de passe, codes, identifiants</strong> bancaires.
        </li>
        <li>
          <strong>Données médicales</strong> ou très personnelles.
        </li>
        <li>
          <strong>Documents confidentiels</strong> de votre entreprise (contrats,
          fichiers clients, code interne).
        </li>
        <li>
          <strong>Données personnelles d’autrui</strong> sans leur accord (un
          réflexe RGPD de base).
        </li>
      </ul>

      <h2>3 réglages pour reprendre la main</h2>
      <ol>
        <li>
          <strong>Désactivez l’entraînement.</strong> Dans les réglages de
          ChatGPT (Data Controls), coupez l’amélioration du modèle.
        </li>
        <li>
          <strong>Utilisez le chat temporaire</strong> pour les sujets sensibles
          : il ne garde pas l’historique.
        </li>
        <li>
          <strong>Anonymisez avant de coller.</strong> Remplacez les vrais noms,
          montants et adresses par des [crochets].
        </li>
      </ol>

      <h2>Le cas de l’entreprise</h2>
      <p>
        En entreprise, la version gratuite est déconseillée pour les données
        professionnelles : pas de contrat de traitement, données parfois
        conservées, cadre flou. Des offres &laquo; pro &raquo; ou &laquo; team
        &raquo; existent, avec de vraies garanties. Le vrai risque, c’est
        l’usage non encadré : on en parle dans{" "}
        <Link href="/fr/blog/ai-act-entreprise-2026">
          AI Act : ce que votre entreprise doit faire
        </Link>
        .
      </p>

      <h2>Protéger ses données, ça s’apprend</h2>
      <p>
        Comprendre où vont vos informations, c’est déjà se protéger. Et c’est
        lié de près aux{" "}
        <Link href="/fr/blog/arnaque-ia-voix-clonee">arnaques par IA</Link> :
        moins vous laissez traîner de données, moins on peut s’en servir contre
        vous.
      </p>
      <p>
        Pour acquérir les bons réflexes (vous et votre famille), commencez par le{" "}
        <Link href="/formations/quiz">QCM gratuit</Link>, puis nos{" "}
        <Link href="/formations">cours en ligne</Link>.
      </p>
    </>
  );
}
