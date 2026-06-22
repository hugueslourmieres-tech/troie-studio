import Link from "next/link";

/**
 * Article : "L'IA va-t-elle remplacer mon métier ?"
 * Angle TROIE : manager, pas remplacé. Pédagogique, sans bullshit.
 */
export function ManagerPasRemplace() {
  return (
    <>
      <p>
        C&apos;est la question que tout le monde se pose, souvent à voix basse :
        <strong> l&apos;intelligence artificielle va-t-elle prendre mon travail ?</strong>{" "}
        En France, 67 % des gens voient l&apos;IA comme une menace, et la peur
        du remplacement progresse. Pourtant, la réponse honnête n&apos;est ni
        &laquo; oui, vous êtes foutu &raquo;, ni &laquo; non, ne changez rien &raquo;.
        Elle tient en une phrase, lâchée par le patron de l&apos;IA française
        devant l&apos;Assemblée nationale.
      </p>

      <figure>
        <div className="blog-embed">
          <iframe
            src="https://www.youtube-nocookie.com/embed/vczBo0AvbTI?start=375"
            title="Arthur Mensch (Mistral) devant l'Assemblée nationale"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <figcaption>
          Arthur Mensch, PDG de Mistral AI, audition à l&apos;Assemblée
          nationale (12 mai 2026). Le passage commence à 6:15.
        </figcaption>
      </figure>

      <h2>La peur est réelle, et les chiffres la confirment</h2>
      <p>
        Inutile de la balayer d&apos;un revers de main. En France, environ
        un salarié sur dix craint d&apos;être remplacé par l&apos;IA, et la
        majorité réclame de l&apos;encadrement plutôt que de la vitesse. Certains
        métiers voient déjà le sol bouger : la rédaction, le support client, une
        partie de la comptabilité. Ce n&apos;est pas du fantasme.
      </p>
      <p>
        Mais il y a un angle mort dans ce discours anxiogène. La même
        technologie qui &laquo; menace &raquo; est déjà utilisée par près d&apos;un
        Français sur deux. Le problème n&apos;est pas l&apos;IA. C&apos;est que
        personne ne nous a appris à nous en servir <strong>vraiment</strong>.
      </p>

      <h2>Ce que le patron de Mistral a vraiment dit</h2>
      <p>
        Auditionné par les députés, Arthur Mensch a expliqué que ses
        ingénieurs n&apos;écrivent quasiment plus de code. Ils décrivent ce
        qu&apos;ils veulent, des agents IA le produisent, et eux vérifient et
        arbitrent. Résultat annoncé : une productivité multipliée par deux en
        six mois en interne.
      </p>
      <blockquote>
        &laquo; Vous n&apos;êtes plus un artisan, vous êtes un manager, et donc
        vous demandez à des agents d&apos;écrire le code pour vous. &raquo;
      </blockquote>
      <p>
        Son message n&apos;est pas &laquo; l&apos;IA va vous virer &raquo;.
        C&apos;est l&apos;inverse : votre métier glisse vers celui d&apos;un
        manager. Vous arrêtez de tout exécuter à la main, vous pilotez des
        outils qui exécutent à votre place. Et ce n&apos;est pas un influenceur
        LinkedIn qui le dit : c&apos;est le dirigeant du champion français de
        l&apos;IA, devant le Parlement.
      </p>

      <h2>Ce qui change vraiment : de l&apos;exécution à la supervision</h2>
      <p>
        Le glissement ne concerne pas que les développeurs. Il touche presque
        tous les métiers de service :
      </p>
      <ul>
        <li>
          Le responsable marketing ne rédige plus chaque post, il pilote une
          chaîne de production de contenu et garde le dernier mot.
        </li>
        <li>
          Le comptable ne saisit plus tout à la main, il supervise des tableaux
          de bord générés et traque les anomalies.
        </li>
        <li>
          Le juriste ne lit plus 200 pages, il fait dégrossir par un agent puis
          valide l&apos;analyse.
        </li>
      </ul>
      <p>
        Dans tous les cas, la valeur se déplace de <strong>faire</strong> vers
        <strong> décider, vérifier, arbitrer</strong>. Autrement dit : manager.
      </p>

      <h2>Manager une IA, ça s&apos;apprend (et ce n&apos;est pas du bullshit)</h2>
      <p>
        Voilà le vrai sujet. On ouvre ChatGPT, on copie-colle une réponse, et on
        croit &laquo; faire de l&apos;IA &raquo;. Ce n&apos;en est pas. Manager
        une IA, c&apos;est un savoir-faire concret qui repose sur quatre
        réflexes :
      </p>
      <ol>
        <li>
          <strong>Donner le bon contexte.</strong> Une demande vague donne une
          réponse vague. Un bon brief (objectif, public, contraintes, exemples)
          change tout.
        </li>
        <li>
          <strong>Vérifier ce qu&apos;elle sort.</strong> L&apos;IA invente
          parfois (on appelle ça &laquo; halluciner &raquo;). Un manager ne signe
          jamais sans relire.
        </li>
        <li>
          <strong>Déléguer ce qui doit l&apos;être.</strong> Les tâches
          répétitives, oui. Le jugement, la relation, la décision finale, non.
        </li>
        <li>
          <strong>Garder la main.</strong> Vos données, votre responsabilité,
          votre signature. L&apos;outil propose, vous disposez.
        </li>
      </ol>
      <p>
        Ces réflexes ne s&apos;improvisent pas. Ils s&apos;apprennent, avec des
        cas concrets, pas avec des promesses magiques.
      </p>

      <h2>Pour qui ? Pour tout le monde</h2>
      <p>
        <strong>Pour les particuliers et les familles</strong>, manager
        l&apos;IA, c&apos;est l&apos;utiliser sans se faire avoir : reconnaître
        une arnaque (on clone une voix en 30 secondes), accompagner ses enfants
        qui l&apos;utilisent déjà pour leurs devoirs, gagner du temps au
        quotidien sans déléguer son esprit critique.
      </p>
      <p>
        <strong>Pour les professionnels et les entreprises</strong>, c&apos;est
        devenu un enjeu de compétitivité, mais aussi de conformité : depuis 2025,
        le règlement européen sur l&apos;IA (AI Act) impose un niveau minimal de
        compétences pour les équipes qui manipulent ces outils. Une équipe qui
        improvise avec l&apos;IA, ce n&apos;est pas de la productivité, c&apos;est
        du risque.
      </p>

      <h2>Par où commencer concrètement</h2>
      <p>
        Pas par des heures de vidéo théorique. Par un point honnête sur votre
        niveau réel. C&apos;est exactement la logique de TROIE : on commence par
        un{" "}
        <Link href="/formations/quiz">QCM gratuit</Link> pour situer vos
        réflexes, puis on avance à votre rythme avec des{" "}
        <Link href="/formations">cours en ligne</Link> clairs et des cas réels.
      </p>
      <p>
        Côté entreprise, on cadre l&apos;usage de l&apos;IA dans vos équipes,
        en présentiel ou à distance, avec une vraie pédagogie et zéro bullshit :
        voir <Link href="/ia">TROIE pour les professionnels</Link>, ou{" "}
        <Link href="/fr/contact">réserver un appel de 30 minutes</Link> pour en
        parler.
      </p>

      <h2>Manager, pas remplacé</h2>
      <p>
        La vraie fracture de 2026 ne sépare pas ceux qui utilisent l&apos;IA de
        ceux qui ne l&apos;utilisent pas. Elle sépare ceux qui savent la{" "}
        <strong>manager</strong> de ceux qui se contentent de cliquer. La bonne
        nouvelle, c&apos;est que ça s&apos;apprend. Et que vous pouvez commencer
        aujourd&apos;hui, gratuitement.
      </p>
    </>
  );
}
