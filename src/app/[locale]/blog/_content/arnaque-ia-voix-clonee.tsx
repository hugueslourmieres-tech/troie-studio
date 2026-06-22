import Link from "next/link";

/**
 * Article : "On peut cloner votre voix en 30 secondes : l’arnaque IA à connaître."
 * Perso / famille. Très partageable. Pédagogique, rassurant, actionnable.
 */
export function ArnaqueIaVoixClonee() {
  return (
    <>
      <p>
        Imaginez : votre téléphone sonne. C’est la voix de votre fils, paniqué,
        qui a eu un accident et a besoin d’argent tout de suite. Sa voix, son
        intonation, vraiment lui. Sauf que ce n’est pas lui. C’est une IA qui a
        cloné sa voix à partir de quelques secondes d’un message vocal ou d’une
        story Instagram. Cette arnaque n’est plus de la science-fiction : en
        2026, elle est courante en France.
      </p>

      <h2>Comment ça marche (et pourquoi c’est si efficace)</h2>
      <p>
        Cloner une voix demande aujourd’hui environ 30 secondes d’audio. Les
        escrocs récupèrent ce son partout : un message vocal, une vidéo sur les
        réseaux, un répondeur. Avec ça, ils génèrent une voix bluffante et vous
        appellent en se faisant passer pour un proche, votre banquier, ou même
        le dirigeant de votre entreprise.
      </p>
      <p>
        Le volume de ces contenus truqués (les &laquo; deepfakes &raquo;) a été
        multiplié par dix en deux ans. Et ça paie : le préjudice moyen pour un
        particulier se situe souvent entre 2 000 et 12 000 euros, parfois bien
        plus pour les arnaques visant les entreprises.
      </p>

      <h2>Les 5 scénarios les plus fréquents</h2>
      <ul>
        <li>
          <strong>Le faux proche en détresse</strong> : &laquo; Maman, j’ai un
          problème, ne raccroche pas. &raquo;
        </li>
        <li>
          <strong>Le faux conseiller bancaire</strong> qui vous demande de
          &laquo; sécuriser &raquo; votre compte.
        </li>
        <li>
          <strong>Le faux dirigeant</strong> (en entreprise) qui ordonne un
          virement urgent et confidentiel.
        </li>
        <li>
          <strong>Le faux placement</strong> miracle, avec une vidéo truquée
          d’une personnalité connue.
        </li>
        <li>
          <strong>Le faux service client</strong> qui &laquo; confirme &raquo;
          une commande pour vous soutirer un code.
        </li>
      </ul>

      <h2>Comment reconnaître un appel truqué</h2>
      <p>
        Aucun détecteur magique, mais des signaux qui doivent vous alerter :
      </p>
      <ul>
        <li>
          <strong>L’urgence et le secret.</strong> &laquo; Tout de suite &raquo;,
          &laquo; n’en parle à personne &raquo; : c’est la signature de
          l’arnaque.
        </li>
        <li>
          <strong>Une demande d’argent ou de code</strong>, surtout par un canal
          inhabituel.
        </li>
        <li>
          <strong>Des réponses qui tournent</strong> si vous posez une question
          personnelle précise que seul le vrai proche connaît.
        </li>
      </ul>

      <h2>Les bons réflexes pour ne pas se faire avoir</h2>
      <ol>
        <li>
          <strong>Raccrochez et rappelez vous-même</strong> le proche ou la
          banque sur son vrai numéro. Une voix au téléphone ne prouve plus rien.
        </li>
        <li>
          <strong>Convenez d’un mot de passe familial.</strong> Un mot secret
          que vous demandez en cas de doute. Simple et redoutablement efficace.
        </li>
        <li>
          <strong>Ne cédez jamais à l’urgence.</strong> Aucun vrai proche, aucune
          vraie banque ne vous reprochera de prendre deux minutes pour vérifier.
        </li>
        <li>
          <strong>Limitez l’audio public.</strong> Moins votre voix (et celle de
          vos enfants) traîne en ligne, moins elle est clonable.
        </li>
      </ol>

      <h2>Vous avez été victime ? Que faire</h2>
      <p>
        Ne culpabilisez pas, ces arnaques sont conçues pour piéger n’importe qui.
        Signalez les contenus illicites sur la plateforme Pharos, prévenez votre
        banque immédiatement, et déposez plainte. Plus vous agissez vite, plus
        vous avez de chances de bloquer un virement.
      </p>

      <h2>La meilleure protection, c’est de comprendre</h2>
      <p>
        Apprendre comment l’IA fonctionne, c’est apprendre à ne plus se faire
        avoir, à tout âge. C’est aussi ce qu’on peut transmettre à ses parents et
        à ses enfants. Testez vos réflexes avec notre{" "}
        <Link href="/formations/quiz">QCM gratuit</Link> (un module entier est
        consacré à la sécurité et aux pièges), puis allez plus loin avec nos{" "}
        <Link href="/formations">cours en ligne</Link>, pensés pour vous et votre
        famille. Et pour comprendre le tableau d’ensemble, lisez{" "}
        <Link href="/fr/blog/ia-remplacer-mon-metier-manager-pas-remplace">
          Manager, pas remplacé
        </Link>
        .
      </p>
    </>
  );
}
