import Link from "next/link";

/**
 * Article : "AI Act : ce que votre entreprise doit faire en 2026."
 * B2B, fort panier. Pédagogique, pas un avis juridique (disclaimer).
 */
export function AiActEntreprise2026() {
  return (
    <>
      <p>
        Vos équipes utilisent déjà l’IA. La question n’est plus &laquo; faut-il
        s’y mettre &raquo;, mais &laquo; est-on en règle &raquo;. Car depuis
        2025, l’Europe a posé un cadre, l’AI Act, et certaines obligations
        deviennent contraignantes en 2026. Voici, sans jargon juridique, ce que
        ça change concrètement pour votre entreprise.
      </p>

      <h2>L’AI Act en une minute</h2>
      <p>
        L’AI Act est le règlement européen sur l’intelligence artificielle. Son
        principe : plus un usage de l’IA est risqué, plus les obligations sont
        fortes. La plupart des entreprises ne développent pas d’IA, elles
        l’utilisent, et sont donc surtout concernées par deux choses : la{" "}
        <strong>transparence</strong> et la <strong>littératie IA</strong>,
        c’est-à-dire le fait que vos équipes aient un niveau de compétence
        minimal pour manipuler ces outils.
      </p>

      <h2>L’obligation qui vous concerne vraiment : former vos équipes</h2>
      <p>
        C’est le point que beaucoup de dirigeants ratent. Le règlement demande
        que les personnes qui utilisent des systèmes d’IA dans le cadre
        professionnel disposent d’un niveau de compétence suffisant pour le
        faire de façon éclairée. Autrement dit : laisser ses salariés improviser
        avec ChatGPT, sans cadre ni formation, n’est plus une option neutre.
      </p>
      <p>
        Et l’échéance se rapproche : des sanctions nationales deviennent
        applicables en 2026 en cas de non-conformité. La bonne nouvelle, c’est
        que se mettre en règle sur ce volet n’a rien d’insurmontable : il s’agit
        surtout de <strong>cadrer et former</strong>.
      </p>

      <h2>Le vrai risque, en attendant : le &laquo; shadow AI &raquo;</h2>
      <p>
        Aujourd’hui, dans la plupart des entreprises, l’IA entre par la petite
        porte : un salarié colle un document confidentiel dans un outil grand
        public, un autre génère un contrat sans le faire relire, un troisième
        diffuse une analyse fausse parce que l’IA a &laquo; halluciné &raquo;.
        C’est ce qu’on appelle le shadow AI : un usage massif, mais invisible et
        non encadré.
      </p>
      <blockquote>
        Une équipe qui improvise avec l’IA, ce n’est pas de la productivité,
        c’est du risque (données, conformité, qualité).
      </blockquote>

      <h2>Les 4 étapes pour être en règle (et plus efficace)</h2>
      <ol>
        <li>
          <strong>Faire l’état des lieux.</strong> Quels outils sont déjà
          utilisés, par qui, pour quoi ? On ne cadre bien que ce qu’on connaît.
        </li>
        <li>
          <strong>Poser des règles simples.</strong> Ce qu’on peut coller ou
          non, ce qui doit être relu, quels outils sont validés. Une charte
          d’une page suffit pour commencer.
        </li>
        <li>
          <strong>Former les équipes.</strong> Pas un séminaire théorique de
          deux jours, mais une montée en compétence concrète : bien prompter,
          vérifier, protéger les données, garder l’humain dans la boucle.
        </li>
        <li>
          <strong>Documenter.</strong> Garder une trace de votre démarche
          (charte, formation suivie). C’est ce qui prouve votre bonne foi.
        </li>
      </ol>

      <h2>Pourquoi c’est une opportunité, pas juste une contrainte</h2>
      <p>
        Les chiffres sont clairs : l’usage de l’IA au travail a doublé en un an,
        mais plus de la moitié des salariés n’ont jamais été formés. Les
        entreprises qui forment prennent une avance réelle de productivité, et
        les compétences IA peuvent faire grimper la valeur d’un poste de façon
        significative. Se mettre en règle, c’est aussi se rendre meilleur. C’est
        le même mouvement de fond que celui décrit dans{" "}
        <Link href="/fr/blog/ia-remplacer-mon-metier-manager-pas-remplace">
          Manager, pas remplacé
        </Link>
        .
      </p>

      <h2>Par où commencer</h2>
      <p>
        Le plus simple est de faire un point honnête sur votre situation. Chez
        TROIE, on accompagne les équipes à cadrer et utiliser l’IA, en
        présentiel ou à distance, avec une vraie pédagogie et zéro bullshit :
        voir <Link href="/ia">TROIE pour les professionnels</Link>, ou{" "}
        <Link href="/fr/contact">réserver un appel de 30 minutes</Link> pour
        faire le point sur votre conformité et vos besoins.
      </p>
      <p>
        <em>
          Cet article est informatif et pédagogique, il ne constitue pas un avis
          juridique. Pour une analyse de votre situation précise, rapprochez-vous
          d’un conseil spécialisé.
        </em>
      </p>
    </>
  );
}
