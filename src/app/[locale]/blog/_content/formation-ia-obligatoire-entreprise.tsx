import Link from "next/link";

/**
 * Article : "Formation IA obligatoire en entreprise : ce que dit
 * vraiment l'article 4". SEO cible : formation IA obligatoire,
 * littératie IA, article 4 AI Act. B2B, amont de l'offre formation.
 */
export function FormationIaObligatoireEntreprise() {
  return (
    <>
      <p>
        &laquo; La formation IA est-elle obligatoire ? &raquo; La question
        revient dans toutes les directions d&apos;entreprise depuis 2025. La
        réponse courte : si vos équipes utilisent l&apos;IA dans leur travail,
        oui, vous avez une obligation. Elle s&apos;appelle la littératie IA,
        elle vient de l&apos;article 4 du règlement européen sur l&apos;IA, et
        elle est déjà applicable. La réponse longue, sans jargon, la voici.
      </p>

      <h2>Ce que dit l&apos;article 4, en français courant</h2>
      <p>
        L&apos;AI Act demande aux entreprises qui fournissent ou utilisent des
        systèmes d&apos;IA de garantir, dans la mesure du possible, un{" "}
        <strong>niveau suffisant de maîtrise de l&apos;IA</strong> chez les
        personnes qui s&apos;en servent en leur nom. Trois mots comptent.
      </p>
      <p>
        <strong>&laquo; Utilisent &raquo;</strong> : vous êtes concerné même si
        vous ne développez rien. Un commercial qui rédige ses relances avec
        ChatGPT, une graphiste qui passe par Midjourney, un comptable qui
        résume des documents avec Copilot : ce sont des usages professionnels
        de systèmes d&apos;IA.
      </p>
      <p>
        <strong>&laquo; Suffisant &raquo;</strong> : le niveau attendu dépend
        du contexte. On n&apos;exige pas la même chose d&apos;une équipe qui
        fait du tri de CV assisté (usage sensible) que d&apos;une équipe qui
        reformule des emails. C&apos;est une obligation proportionnée, pas un
        diplôme universel.
      </p>
      <p>
        <strong>&laquo; Garantir &raquo;</strong> : c&apos;est
        l&apos;employeur qui porte l&apos;obligation. Laisser chacun se
        débrouiller avec l&apos;IA n&apos;est plus une position neutre :
        c&apos;est une absence de conformité.
      </p>

      <h2>Depuis quand, et que risque-t-on ?</h2>
      <p>
        L&apos;obligation de littératie IA s&apos;applique depuis le{" "}
        <strong>2 février 2025</strong>, en même temps que
        l&apos;interdiction des pratiques à risque inacceptable.
        C&apos;était la toute première marche du calendrier de l&apos;AI Act,
        avant même les obligations des grands modèles (août 2025) et
        l&apos;application générale (2026).
      </p>
      <p>
        Côté sanctions, le règlement prévoit des amendes qui se comptent en
        millions d&apos;euros pour les violations les plus graves, avec une
        règle protectrice pour les PME : c&apos;est le montant le plus bas
        entre le pourcentage du chiffre d&apos;affaires et le plafond en euros
        qui s&apos;applique. Mais le vrai risque à court terme est ailleurs :
        en cas de litige (un salarié qui divulgue des données clients via un
        outil IA, un contenu généré qui pose problème), l&apos;absence de
        formation documentée devient un élément à charge.
      </p>

      <h2>À quoi ressemble une formation conforme ?</h2>
      <p>
        Le texte n&apos;impose ni format ni durée. En pratique, une démarche
        sérieuse couvre quatre choses :
      </p>
      <p>
        <strong>1. Comprendre l&apos;outil.</strong> Ce qu&apos;un modèle de
        langage sait faire, ce qu&apos;il invente (les hallucinations), et
        pourquoi il faut vérifier ses sorties.
      </p>
      <p>
        <strong>2. Les règles de la maison.</strong> Quelles données on ne met
        jamais dans un outil grand public, quels outils sont validés par
        l&apos;entreprise, qui valide quoi.
      </p>
      <p>
        <strong>3. La pratique sur les cas réels du métier.</strong> Une
        formation générique ne change pas les habitudes. Former les
        commerciaux sur leurs relances, la production sur ses devis, le
        support sur ses réponses clients : c&apos;est là que le niveau devient
        &laquo; suffisant &raquo;.
      </p>
      <p>
        <strong>4. La trace.</strong> Qui a été formé, quand, sur quoi. Sans
        preuve, pas de conformité opposable. C&apos;est exactement ce que
        permet une plateforme avec suivi de progression et attestations.
      </p>

      <h2>Le piège à éviter : la formation alibi</h2>
      <p>
        Un webinaire d&apos;une heure regardé d&apos;un œil ne rend personne
        compétent, et tout le monde le sait, y compris un juge. À
        l&apos;inverse, inutile de sur-investir dans un programme de six mois :
        l&apos;obligation est proportionnée. Le bon format pour une PME tient
        souvent en une demi-journée à une journée de formation appliquée, plus
        un support en ligne pour ancrer et documenter.
      </p>

      <h2>Par où commencer</h2>
      <p>
        Faites l&apos;inventaire honnête des usages IA réels dans vos équipes
        (il y en a toujours plus que ce que la direction imagine), définissez
        vos règles d&apos;usage, puis formez par métier en gardant une trace.
        Si vous voulez gagner du temps,{" "}
        <Link href="/ia">nos formations IA pour équipes</Link> couvrent
        exactement ce périmètre, avec la preuve de formation incluse, et notre
        page dédiée à l&apos;<Link href="/ia/ai-act">AI Act</Link> résume
        toutes les échéances. Premier pas simple : un audit gratuit de 30
        minutes pour situer vos obligations réelles.
      </p>

      <p>
        <em>
          Cette page est une synthèse pédagogique, pas un conseil juridique.
          Pour une analyse opposable, consultez votre conseil.
        </em>
      </p>
    </>
  );
}
