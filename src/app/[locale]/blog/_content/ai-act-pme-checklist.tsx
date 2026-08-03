import Link from "next/link";
import { OfficialEmblems } from "@/components/OfficialEmblems";

/**
 * Article : la checklist AI Act pour une PME, ecrite au lendemain de
 * l'entree en application generale du 2 aout 2026. Faits verifies le
 * 03/08/2026 sur sources primaires et secondaires de reference :
 * - reglement (UE) 2024/1689 (AI Act), EUR-Lex : entree en vigueur le
 *   01/08/2024 ; article 5 (pratiques interdites) et article 4
 *   (litteratie IA) applicables depuis le 02/02/2025 ; obligations des
 *   modeles a usage general et gouvernance depuis le 02/08/2025 ;
 *   application generale, transparence de l'article 50 et regime de
 *   sanctions de l'article 99 au 02/08/2026 ;
 * - article 99 : 35 M / 7 % (article 5), 15 M / 3 % (autres obligations
 *   dont article 50), 7,5 M / 1 % (fausses informations) ; montant le
 *   plus ELEVE pour une entreprise, le plus FAIBLE pour une PME ou une
 *   jeune pousse (art. 99, par. 6) ; l'article 4 n'a PAS d'amende dediee ;
 * - reglement (UE) 2026/1744 (Digital Omnibus sur l'IA), adopte le
 *   08/07/2026, publie au JOUE le 24/07/2026, en vigueur le 27/07/2026 :
 *   haut risque de l'annexe III reporte au 02/12/2027, composants de
 *   securite au 02/08/2028, delai de mise en conformite du marquage
 *   ramene de six a trois mois (02/12/2026), article 4 reecrit en
 *   obligation de moyens ("soutenir le developpement de la litteratie
 *   IA", "n'impose pas de garantir un niveau specifique") ;
 * - questions-reponses "AI literacy" de la Commission europeenne
 *   (digital-strategy.ec.europa.eu) : aucune formation type imposee,
 *   aucun certificat requis, registre interne des formations, controle
 *   par les autorites nationales de surveillance du marche.
 * Points de prudence : la CNIL = RGPD uniquement, JAMAIS presentee comme
 * autorite de controle de l'AI Act ; aucune "certification AI Act"
 * n'existe, le mot juste est "attestation de formation" ; ne jamais
 * evoquer Qualiopi ; les formations en ligne TROIE ne sont financables ni
 * par le CPF ni par un OPCO. ZERO em-dash.
 */

const SOURCE_URL = "https://eur-lex.europa.eu/eli/reg/2024/1689/oj";

const FAQ = [
  {
    q: "Que doit faire une PME pour être en règle avec l'AI Act depuis le 2 août 2026 ?",
    a: "Une PME qui se contente d'utiliser des outils d'IA du commerce a trois obligations concrètes. La première est l'article 4 du règlement (UE) 2024/1689, applicable depuis le 2 février 2025 : prendre des mesures pour soutenir la littératie IA des personnes qui utilisent ces outils pour son compte, et pouvoir le documenter. La deuxième est l'article 5 : ne pas recourir aux pratiques d'IA interdites, comme la notation sociale ou la reconnaissance des émotions au travail. La troisième est l'article 50, applicable depuis le 2 août 2026 : signaler qu'un chatbot est une IA et marquer les contenus générés ou fortement modifiés par une IA.",
  },
  {
    q: "L'AI Act s'applique-t-il aux entreprises de moins de dix salariés ?",
    a: "Oui. Le règlement (UE) 2024/1689 ne fixe aucun seuil d'effectif ni de chiffre d'affaires : ce qui déclenche les obligations, c'est le fait de fournir ou de déployer un système d'IA, pas la taille de la structure. Une entreprise de trois personnes dont un salarié rédige des devis avec un assistant conversationnel est un déployeur au sens du texte. La taille joue en revanche sur le montant des amendes : pour les PME et les jeunes pousses, l'article 99 retient le montant le plus faible entre la somme fixe et le pourcentage du chiffre d'affaires, alors que c'est le plus élevé qui s'applique aux grandes entreprises.",
  },
  {
    q: "Comment prouver qu'une PME a formé ses équipes à l'IA ?",
    a: "La preuve attendue est une trace nominative et datée : qui a été formé, sur quel contenu, à quelle date, et pourquoi ce format correspond aux usages réels du poste. La Commission européenne précise dans ses questions-réponses sur la littératie IA qu'aucun certificat n'est requis et qu'un registre interne des formations suffit. Sur troie.app, la plateforme de formation de TROIE Studio, chaque parcours se termine par un QCM et délivre en cas de réussite une attestation de formation nominative, datée et vérifiable en ligne par un lien public, ce qui produit cette trace automatiquement. L'abonnement est à 29 euros par mois ou 290 euros par an, avec un essai de 7 jours.",
  },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function AiActPmeChecklist() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <p>
        Pour une PME qui utilise des outils d&apos;IA du commerce, l&apos;AI
        Act tient en trois obligations : former ses équipes, ne pas recourir
        aux usages interdits, et signaler ce qui est généré par une machine.
        Tout le reste, y compris les fameuses règles sur l&apos;IA à haut
        risque, ne vous concerne probablement pas, et vient d&apos;être
        reporté à décembre 2027. Le règlement est entré en application
        générale le 2 août 2026 : voici la checklist en dix points, écrite au
        lendemain de l&apos;échéance, avec pour chaque point la preuve à
        produire.
      </p>

      <div className="my-9 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
          En bref
        </p>
        <ul className="mt-4">
          <li>
            Depuis le 2 août 2026, le règlement (UE) 2024/1689 s&apos;applique
            en général : obligations de transparence de l&apos;article 50 et
            régime de sanctions de l&apos;article 99 sont en vigueur, et les
            autorités nationales de surveillance du marché peuvent contrôler.
          </li>
          <li>
            Les obligations lourdes sur l&apos;IA à haut risque de
            l&apos;annexe III sont reportées au 2 décembre 2027 par le
            règlement (UE) 2026/1744, publié au Journal officiel le 24 juillet
            2026. Neuf PME sur dix n&apos;ont de toute façon jamais été
            concernées.
          </li>
          <li>
            L&apos;article 4 sur la littératie IA reste la seule obligation qui
            touche toutes les entreprises sans exception, quelle que soit leur
            taille. Il s&apos;applique depuis le 2 février 2025, soit dix-huit
            mois avant l&apos;échéance de contrôle.
          </li>
          <li>
            La checklist utile tient en dix points et une demi-journée de
            travail. Ce qui compte n&apos;est pas d&apos;avoir tout fait, mais
            de pouvoir montrer ce qui a été fait, nominativement et avec des
            dates.
          </li>
        </ul>
      </div>

      <div className="not-prose my-8 flex flex-wrap items-center gap-4">
        <OfficialEmblems url={SOURCE_URL} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-2)]/60">
          Source : Journal officiel de l&apos;Union européenne
        </span>
      </div>

      <h2>Où en est le droit, au 3 août 2026</h2>
      <p>
        Le calendrier du règlement (UE) 2024/1689 est progressif depuis son
        entrée en vigueur le 1er août 2024. Trois étages sont déjà debout. Le
        2 février 2025, les pratiques d&apos;IA interdites de l&apos;article 5
        et l&apos;obligation de littératie IA de l&apos;article 4 sont
        devenues applicables. Le 2 août 2025, les obligations relatives aux
        modèles d&apos;IA à usage général et le dispositif de gouvernance ont
        pris effet. Le 2 août 2026, le règlement est entré en application
        générale : les obligations de transparence de l&apos;article 50 et le
        régime de sanctions de l&apos;article 99 sont désormais opposables.
      </p>
      <p>
        Le paysage a bougé une dernière fois quelques jours avant
        l&apos;échéance. Le règlement (UE) 2026/1744, le Digital Omnibus sur
        l&apos;IA, a été adopté le 8 juillet 2026, publié au Journal officiel
        de l&apos;Union européenne le 24 juillet 2026 et est entré en vigueur
        le 27 juillet 2026. Il n&apos;a pas décalé la date du 2 août : il a
        allégé le contenu des obligations et repoussé le volet haut risque.
      </p>

      <h2>Ce qui ne vous concerne pas, et qui fait perdre du temps</h2>
      <p>
        Avant la checklist, un tri. La majorité de ce qui s&apos;écrit sur
        l&apos;AI Act porte sur des obligations qui ne visent pas une PME
        utilisatrice. Les systèmes d&apos;IA à haut risque de l&apos;annexe
        III, ceux qui interviennent dans le recrutement, l&apos;accès au
        crédit, l&apos;éducation ou la gestion de l&apos;emploi, sont reportés
        au 2 décembre 2027 pour les systèmes autonomes et au 2 août 2028 pour
        ceux intégrés comme composants de sécurité dans des produits. Et même
        à ces dates, l&apos;essentiel des obligations pèse sur le fournisseur
        du système, pas sur l&apos;entreprise qui l&apos;utilise.
      </p>
      <p>
        Deuxième tri utile : les obligations relatives aux modèles d&apos;IA à
        usage général visent ceux qui entraînent et mettent sur le marché ces
        modèles, autrement dit une poignée d&apos;acteurs mondiaux. Utiliser
        un assistant conversationnel ne fait pas de vous un fournisseur de
        modèle. Si vous cherchez à situer votre position exacte dans le texte,
        notre page sur l&apos;<Link href="/ia/ai-act">AI Act</Link> résume les
        échéances et les rôles.
      </p>

      <h2>La checklist en dix points</h2>
      <p>
        Chaque point est formulé avec la preuve qu&apos;il produit. C&apos;est
        cette colonne de droite qui compte : une obligation de moyens se
        démontre par des documents datés, pas par des intentions.
      </p>
      <ol>
        <li>
          <strong>Recensez les outils d&apos;IA réellement utilisés.</strong>{" "}
          Pas ceux que vous avez achetés, ceux que vos équipes ouvrent le
          matin. Le décalage entre les deux est la première surprise de tout
          audit. Preuve produite : un{" "}
          <Link href="/blog/registre-des-usages-ia-modele">
            registre des usages de l&apos;IA
          </Link>{" "}
          en huit colonnes, tenu dans un simple tableur.
        </li>
        <li>
          <strong>Identifiez votre rôle pour chaque outil.</strong> Déployeur
          dans la quasi-totalité des cas, fournisseur si vous intégrez un
          modèle dans un produit que vous commercialisez sous votre marque. Le
          rôle détermine tout le reste. Preuve produite : une colonne
          supplémentaire dans le registre.
        </li>
        <li>
          <strong>Vérifiez l&apos;absence de pratique interdite.</strong>{" "}
          L&apos;article 5 proscrit notamment la notation sociale, la
          manipulation exploitant des vulnérabilités et la reconnaissance des
          émotions sur le lieu de travail. Cette dernière piège des
          entreprises de bonne foi, via des outils d&apos;analyse d&apos;appels
          ou d&apos;entretiens. Preuve produite : une revue écrite des cas,
          datée et signée.
        </li>
        <li>
          <strong>Signalez vos chatbots.</strong> Depuis le 2 août 2026,
          l&apos;article 50 impose d&apos;informer une personne qu&apos;elle
          interagit avec un système d&apos;IA, sauf lorsque c&apos;est évident.
          Une mention à l&apos;ouverture de la conversation suffit. Preuve
          produite : une capture d&apos;écran datée de votre interface.
        </li>
        <li>
          <strong>Marquez les contenus générés.</strong> Images, sons, vidéos
          et textes d&apos;information produits ou fortement modifiés par une
          IA doivent être identifiables comme tels. Le marquage lisible par
          machine bénéficie d&apos;un délai de mise en conformité jusqu&apos;au
          2 décembre 2026, ramené de six à trois mois par le Digital Omnibus.
          Le détail des cinq situations concernées figure dans notre article
          sur la{" "}
          <Link href="/blog/transparence-ia-signaler-contenu-genere">
            transparence des contenus générés
          </Link>
          . Preuve produite : une règle éditoriale écrite.
        </li>
        <li>
          <strong>Posez une charte d&apos;usage d&apos;une page.</strong> Ce
          qui est autorisé, ce qui est interdit, quelles données ne sortent
          jamais de l&apos;entreprise, qui valide avant publication. Une page
          lue vaut mieux que quinze pages archivées. Preuve produite : le
          document, sa date de diffusion et la liste des destinataires.
        </li>
        <li>
          <strong>Formez les personnes exposées, à hauteur de leur
          usage.</strong> L&apos;article 4 demande de tenir compte des
          connaissances, de l&apos;expérience, de la formation et du contexte
          d&apos;utilisation. Un commercial qui rédige des propositions et un
          développeur qui génère du code n&apos;ont pas le même besoin. Preuve
          produite : une attestation de formation nominative et datée par
          personne.
        </li>
        <li>
          <strong>Traitez le volet données personnelles séparément.</strong> Si
          vos outils d&apos;IA traitent des données personnelles, c&apos;est le
          RGPD qui s&apos;applique, avec la CNIL comme autorité compétente. Ce
          sont deux textes distincts et deux contrôleurs distincts : être en
          règle sur l&apos;un ne dit rien de l&apos;autre. Preuve produite :
          la mise à jour de votre registre des traitements.
        </li>
        <li>
          <strong>Désignez un responsable interne.</strong> Pas un poste, une
          personne nommée qui tient le registre à jour, intègre les arrivées et
          les départs et relit la charte une fois par an. Sans elle, la
          documentation vieillit en trois mois. Preuve produite : la mention
          écrite de la désignation.
        </li>
        <li>
          <strong>Datez et classez tout au même endroit.</strong> Un dossier,
          six fichiers, une date de dernière revue. Le jour où une autorité
          nationale de surveillance du marché pose une question, la vitesse de
          réponse pèse autant que le contenu. Preuve produite : le dossier
          lui-même.
        </li>
      </ol>

      <h2>Les trois points qui coûtent le plus cher à rater</h2>
      <p>
        <strong>Le shadow IA.</strong> Une entreprise qui déclare ne pas
        utiliser d&apos;IA se trompe presque toujours : les outils entrent par
        les comptes personnels des salariés, hors de tout cadre. Vous êtes
        déployeur dès qu&apos;une seule personne travaille avec un système
        d&apos;IA pour votre compte. Commencer la checklist par un état des
        lieux honnête évite de bâtir une conformité sur une fiction.
      </p>
      <p>
        <strong>La confusion RGPD et AI Act.</strong> Beaucoup de dirigeants
        pensent avoir traité le sujet parce que leur registre des traitements
        est à jour. Ce sont deux réglementations différentes. La CNIL est
        l&apos;autorité de contrôle du RGPD ; l&apos;AI Act relève des
        autorités nationales de surveillance du marché désignées par chaque
        État membre. Confondre les deux fait croire à une conformité qui
        n&apos;existe pas.
      </p>
      <p>
        <strong>L&apos;absence de trace.</strong> C&apos;est le point le plus
        fréquent et le plus facile à corriger. Des entreprises ont réellement
        formé leurs équipes, souvent bien, et sont incapables de le démontrer :
        pas de liste, pas de dates, pas de contenu identifiable. Une obligation
        de moyens se juge sur les moyens démontrés. Le détail de ce qui compte
        comme mesure recevable figure dans notre article sur les{" "}
        <Link href="/blog/article-4-ai-act-exemples-mesures">
          exemples concrets de mesures de littératie IA
        </Link>
        .
      </p>

      <h2>Ce que vous risquez vraiment, en tant que PME</h2>
      <p>
        L&apos;article 99 organise trois tranches d&apos;amendes : 35 millions
        d&apos;euros ou 7 % du chiffre d&apos;affaires mondial pour les
        pratiques interdites de l&apos;article 5, 15 millions ou 3 % pour les
        autres manquements dont la transparence de l&apos;article 50, 7,5
        millions ou 1 % pour la fourniture de fausses informations aux
        autorités. Pour une PME ou une jeune pousse, le règlement retient le
        montant le plus faible entre la somme fixe et le pourcentage, alors
        qu&apos;il retient le plus élevé pour les grandes entreprises.
      </p>
      <p>
        Une précision qui évite bien des angoisses mal placées :
        l&apos;article 4 sur la littératie IA ne figure pas dans la liste des
        manquements assortis d&apos;une amende. Il n&apos;existe pas
        d&apos;amende directe pour défaut de formation. L&apos;autorité peut
        constater le manquement et ordonner des mesures correctives. Le risque
        réel est indirect : une équipe non formée déclenche les manquements
        qui, eux, sont sanctionnés. Notre article sur les{" "}
        <Link href="/blog/ai-act-sanctions-entreprise">
          sanctions de l&apos;AI Act
        </Link>{" "}
        détaille les trois tranches et leur mécanique.
      </p>

      <h2>Combien de temps ça prend réellement</h2>
      <p>
        Pour une entreprise de moins de cinquante personnes qui utilise des
        outils d&apos;IA du commerce, les points 1 à 3 et 8 à 10 tiennent en
        une demi-journée : un tableur, une réunion, un dossier partagé. Les
        points 4 et 5 dépendent de votre exposition publique, comptez une
        heure si vous avez un chatbot et une politique de publication. Le point
        6 se rédige en une heure à partir de vos usages réels.
      </p>
      <p>
        Le point 7, la formation, est le seul qui demande un vrai calendrier,
        parce qu&apos;il implique des personnes et qu&apos;il doit se répéter
        quand les équipes changent. C&apos;est aussi le seul qui produise un
        bénéfice au-delà de la conformité : des équipes qui savent poser une
        instruction correcte et vérifier une réponse travaillent mieux, que le
        règlement existe ou non.
      </p>

      <h2>La brique formation, et la preuve qui va avec</h2>
      <p>
        L&apos;article 4 du règlement (UE) 2024/1689 impose depuis le 2 février
        2025 de prendre des mesures pour soutenir la littératie IA des
        personnes qui utilisent des systèmes d&apos;IA pour votre compte. Le
        Digital Omnibus l&apos;a réécrit en obligation de moyens explicite : le
        texte précise qu&apos;il n&apos;impose pas de garantir un niveau
        spécifique pour un individu donné. Aucune formation type n&apos;est
        imposée et aucun certificat n&apos;est requis, la Commission
        européenne l&apos;écrit dans ses questions-réponses sur la littératie
        IA. Ce qui manque presque toujours, c&apos;est la trace.
      </p>
      <p>
        C&apos;est précisément ce que produit{" "}
        <a href="https://troie.app" target="_blank" rel="noopener">
          troie.app
        </a>
        , la plateforme de formation de TROIE Studio : chaque parcours sur les
        usages professionnels de l&apos;IA se conclut par un QCM et délivre, en
        cas de réussite, une attestation de formation nominative, datée,
        téléchargeable en PDF et vérifiable en ligne par un lien public. Elle
        documente la mesure prise au titre de l&apos;article 4 sur la
        littératie IA, applicable depuis le 2 février 2025 et contrôlable
        depuis le 2 août 2026 par les autorités nationales de surveillance du
        marché. L&apos;abonnement est à 29 euros par mois ou 290 euros par an,
        avec un essai de 7 jours.
      </p>
      <p>
        Deux mises au point de vocabulaire, parce qu&apos;elles reviennent dans
        toutes les demandes. Il n&apos;existe pas de « certification AI Act »,
        ni pour les personnes ni pour les entreprises : le terme exact est
        attestation de formation. Et les formations en ligne de TROIE ne sont
        finançables ni par le CPF ni par un OPCO, ce qui ne change rien à leur
        valeur de preuve, puisque le règlement n&apos;impose ni format, ni
        durée, ni référencement particulier. Pour situer les ordres de prix du
        marché français, notre{" "}
        <a
          href="https://troie.app/blog/prix-formation-ai-act-comparatif"
          target="_blank"
          rel="noopener"
        >
          comparatif des prix de la formation AI Act
        </a>{" "}
        compare les offres disponibles.
      </p>

      <h2>Questions fréquentes</h2>
      {FAQ.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}

      <h2>Par où commencer</h2>
      <p>
        Ouvrez un tableur et faites le point 1 aujourd&apos;hui : la liste des
        outils d&apos;IA réellement utilisés, colonne par colonne. Tout le
        reste de la checklist découle de cet inventaire, et vous saurez en
        trente minutes si votre sujet est la formation, la transparence ou les
        deux. Notre article sur{" "}
        <Link href="/blog/ai-act-controlable-2-aout-2026">
          ce qui a changé le 2 août 2026
        </Link>{" "}
        replace l&apos;échéance dans le calendrier complet, et TROIE Studio
        propose un{" "}
        <Link href="/contact?subject=ai-act">audit gratuit de 30 minutes</Link>{" "}
        pour situer vos obligations réelles et éliminer celles qui ne vous
        concernent pas.
      </p>

      <p>
        <em>
          Sources : règlement (UE) 2024/1689 (AI Act), EUR-Lex, pour le
          calendrier d&apos;application, l&apos;article 4 sur la maîtrise de
          l&apos;IA, l&apos;article 5 sur les pratiques interdites,
          l&apos;article 50 sur la transparence et l&apos;article 99 sur les
          sanctions, y compris le plafond au montant le plus faible pour les
          PME et les jeunes pousses ; règlement (UE) 2026/1744, dit Digital
          Omnibus sur l&apos;IA, adopté le 8 juillet 2026, publié au Journal
          officiel de l&apos;Union européenne le 24 juillet 2026 et entré en
          vigueur le 27 juillet 2026, pour le report des obligations relatives
          aux systèmes à haut risque de l&apos;annexe III au 2 décembre 2027
          et au 2 août 2028 pour les composants de sécurité, pour la réduction
          de six à trois mois du délai de mise en conformité du marquage et
          pour la réécriture de l&apos;article 4 en obligation de moyens ;
          questions-réponses sur la littératie IA publiées par la Commission
          européenne (digital-strategy.ec.europa.eu), pour l&apos;absence de
          formation type imposée, l&apos;absence de certificat requis, le
          registre interne des formations et le contrôle par les autorités
          nationales de surveillance du marché. Faits vérifiés le 3 août 2026.
          Cette page est une synthèse pédagogique, pas un conseil juridique.
        </em>
      </p>
    </>
  );
}
