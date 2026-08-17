import Link from "next/link";
import { OfficialEmblems } from "@/components/OfficialEmblems";

/**
 * Article : la consultation du CSE avant le deploiement d'un outil d'IA.
 * Faits verifies le 17/08/2026 sur sources officielles et decisions
 * publiees :
 * - code du travail, article L. 2312-8, II, 4° (Legifrance et
 *   code.travail.gouv.fr) : information-consultation du CSE sur
 *   "l'introduction de nouvelles technologies, tout amenagement important
 *   modifiant les conditions de sante et de securite ou les conditions de
 *   travail" ;
 * - article L. 2312-38 : information prealable sur les methodes d'aide au
 *   recrutement et sur les traitements automatises de gestion du personnel,
 *   information-consultation sur les moyens de controle de l'activite ;
 *   article L. 2312-37, 1° : mise en oeuvre des moyens de controle ;
 * - article R. 2312-6 : delai d'un mois, porte a deux mois en cas
 *   d'expertise et a trois mois en cas d'expertises au niveau du CSE
 *   central et d'un ou plusieurs CSE d'etablissement ; avis repute rendu
 *   et negatif a l'expiration du delai ;
 * - article L. 2317-1 : entrave au fonctionnement regulier du CSE punie
 *   d'une amende de 7 500 euros ;
 * - quatre ordonnances de refere : TJ Nanterre, 14 fevrier 2025,
 *   n° 24/01457 (trouble manifestement illicite) ; TJ Creteil, 15 juillet
 *   2025, n° 25/00851 (suspension jusqu'a la cloture de la consultation) ;
 *   TJ Paris, 2 septembre 2025, n° 25/53278 (suspension d'une plateforme
 *   d'IA generative, pas de consultation imposee pour la version 2 d'un
 *   chatbot RH) ; TJ Nanterre, 29 janvier 2026, n° 25/02856 (suspension
 *   immediate phase pilote comprise, astreinte de 500 euros par jour) ;
 * - reglement (UE) 2024/1689, article 4 (litteratie IA, applicable depuis
 *   le 02/02/2025), article 26, paragraphe 7 (information des
 *   representants des travailleurs avant l'usage d'un systeme a haut
 *   risque au travail : information, pas consultation), application
 *   generale et sanctions au 02/08/2026 ;
 * - reglement (UE) 2026/1744 (Digital Omnibus sur l'IA), publie au JOUE le
 *   24/07/2026 : haut risque de l'annexe III reporte au 02/12/2027.
 * Points de prudence : la CNIL = RGPD uniquement, jamais presentee comme
 * autorite de controle de l'AI Act ; "attestation de formation" et jamais
 * "certification AI Act" ; jamais Qualiopi ; formations en ligne TROIE non
 * financables CPF ni OPCO. ZERO em-dash.
 */

const SOURCE_URL =
  "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036411413";

const FAQ = [
  {
    q: "La consultation du CSE est-elle obligatoire avant de déployer un outil d'IA ?",
    a: "Oui, dans les entreprises d'au moins cinquante salariés, dès lors que l'outil modifie l'organisation ou les conditions de travail. L'article L. 2312-8 du code du travail soumet à information-consultation du comité social et économique l'introduction de nouvelles technologies et tout aménagement important modifiant les conditions de travail. Quatre ordonnances de référé rendues entre février 2025 et janvier 2026 ont jugé que le déploiement d'outils d'IA entre dans ce cadre. La consultation doit précéder la mise en service, phase pilote comprise, et l'avis du CSE est consultatif : il ne donne aucun droit de veto à l'employeur.",
  },
  {
    q: "Que risque un employeur qui déploie une IA sans consulter le CSE ?",
    a: "Le risque immédiat est la suspension judiciaire du projet. Saisi en référé, le juge peut caractériser un trouble manifestement illicite et ordonner l'arrêt de l'utilisation de l'outil jusqu'à la clôture de la procédure d'information-consultation : le tribunal judiciaire de Nanterre l'a fait le 29 janvier 2026 sous astreinte de 500 euros par jour de retard, phase pilote comprise. S'y ajoute le risque pénal du délit d'entrave au fonctionnement régulier du CSE, puni d'une amende de 7 500 euros par l'article L. 2317-1 du code du travail. Le coût réel est surtout industriel : un déploiement arrêté après le déménagement des données et la formation des équipes.",
  },
  {
    q: "Quels documents remettre au CSE pour la consultation sur un projet d'IA ?",
    a: "Le dossier utile tient en cinq pièces : la description de l'outil et de son fournisseur, la liste des postes et des tâches concernés, le sort des données traitées et leur hébergement, les règles de contrôle humain sur les décisions produites, et le plan de formation des personnes exposées. Cette dernière pièce est celle qui manque le plus souvent, alors qu'elle est déjà exigée par ailleurs : l'article 4 du règlement (UE) 2024/1689 impose depuis le 2 février 2025 de soutenir la littératie IA des salariés. Sur troie.app, la plateforme de formation de TROIE Studio, chaque parcours se termine par un QCM et délivre une attestation de formation nominative, datée et vérifiable en ligne, qui documente ce volet du dossier remis au CSE. L'abonnement est à 29 euros par mois ou 290 euros par an, avec un essai de 7 jours.",
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

export function ConsultationCseIntelligenceArtificielle() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <p>
        Déployer un outil d&apos;IA qui change la façon de travailler impose
        d&apos;informer et de consulter le comité social et économique avant sa
        mise en service, dans les entreprises d&apos;au moins cinquante
        salariés. Quatre ordonnances de référé rendues entre février 2025 et
        janvier 2026 l&apos;ont jugé, et trois d&apos;entre elles ont suspendu
        le déploiement, phase pilote comprise, dont une sous astreinte de 500
        euros par jour. Le sujet n&apos;est plus théorique : c&apos;est
        aujourd&apos;hui le premier motif d&apos;arrêt brutal d&apos;un projet
        d&apos;IA en France, très loin devant l&apos;AI Act.
      </p>

      <div className="my-9 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
          En bref
        </p>
        <ul className="mt-4">
          <li>
            L&apos;article L. 2312-8 du code du travail soumet à
            information-consultation du CSE « l&apos;introduction de nouvelles
            technologies » et tout aménagement important modifiant les
            conditions de travail. Les juges y rattachent désormais les outils
            d&apos;IA.
          </li>
          <li>
            Quatre décisions le confirment : Nanterre le 14 février 2025,
            Créteil le 15 juillet 2025, Paris le 2 septembre 2025 et Nanterre
            le 29 janvier 2026, cette dernière assortie d&apos;une astreinte de
            500 euros par jour.
          </li>
          <li>
            La consultation doit précéder la mise en service, y compris une
            simple phase pilote. Le délai de droit commun est d&apos;un mois,
            porté à deux mois en cas d&apos;expertise. L&apos;avis rendu est
            consultatif.
          </li>
          <li>
            Ce cadre est français et distinct de l&apos;AI Act. Le règlement
            (UE) 2024/1689 ajoute une obligation d&apos;information des
            représentants des travailleurs, mais seulement pour les systèmes à
            haut risque, dont l&apos;échéance est reportée à décembre 2027.
          </li>
        </ul>
      </div>

      <div className="not-prose my-8 flex flex-wrap items-center gap-4">
        <OfficialEmblems url={SOURCE_URL} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-2)]/60">
          Source : code du travail, Légifrance
        </span>
      </div>

      <h2>Le texte qui s&apos;applique, et depuis longtemps</h2>
      <p>
        Rien dans cette obligation n&apos;a été écrit pour l&apos;IA.
        L&apos;article L. 2312-8 du code du travail prévoit que le comité social
        et économique est informé et consulté sur les questions intéressant
        l&apos;organisation, la gestion et la marche générale de
        l&apos;entreprise, notamment sur « l&apos;introduction de nouvelles
        technologies, tout aménagement important modifiant les conditions de
        santé et de sécurité ou les conditions de travail ». Le texte date de la
        création du CSE et visait hier les progiciels de gestion, la
        géolocalisation des véhicules ou le passage au tout numérique.
      </p>
      <p>
        Deux autres articles complètent le dispositif et sont souvent oubliés
        dans les projets d&apos;IA. L&apos;article L. 2312-38 impose
        d&apos;informer le CSE avant l&apos;utilisation de méthodes ou
        techniques d&apos;aide au recrutement, avant la mise en place de
        traitements automatisés de gestion du personnel, et de
        l&apos;informer-consulter avant tout moyen ou technique permettant un
        contrôle de l&apos;activité des salariés. L&apos;article L. 2312-37, 1°,
        vise expressément la mise en oeuvre de ces moyens de contrôle. Un
        assistant qui trie des candidatures, note des entretiens ou mesure des
        temps de traitement coche donc plusieurs cases à la fois.
      </p>

      <h2>Quatre décisions en douze mois</h2>
      <p>
        La jurisprudence de référé s&apos;est construite vite, et dans le même
        sens.
      </p>
      <ul>
        <li>
          <strong>Tribunal judiciaire de Nanterre, 14 février 2025, n°
          24/01457.</strong> Première décision à qualifier le déploiement
          d&apos;applications d&apos;IA d&apos;introduction d&apos;une nouvelle
          technologie au sens de l&apos;article L. 2312-8, et à y voir un
          trouble manifestement illicite lorsque la mise en service précède la
          fin de la consultation.
        </li>
        <li>
          <strong>Tribunal judiciaire de Créteil, 15 juillet 2025, n°
          25/00851.</strong> Dans une entreprise de presse professionnelle, le
          juge suspend l&apos;utilisation des outils d&apos;IA jusqu&apos;à la
          clôture du processus de consultation du CSE. Les groupes de travail
          internes sur la technologie, eux, ne sont pas suspendus : réfléchir
          n&apos;est pas déployer.
        </li>
        <li>
          <strong>Tribunal judiciaire de Paris, 2 septembre 2025, n°
          25/53278.</strong> Décision la plus intéressante, parce qu&apos;elle
          trie. La plateforme d&apos;IA générative mise à disposition des
          salariés d&apos;un groupe audiovisuel public est suspendue faute de
          consultation du CSE central. En revanche, la deuxième version
          d&apos;un chatbot RH existant échappe à l&apos;obligation : le juge y
          voit l&apos;amélioration d&apos;un outil déjà en service, sans rupture
          technologique.
        </li>
        <li>
          <strong>Tribunal judiciaire de Nanterre, 29 janvier 2026, n°
          25/02856.</strong> Le remplacement d&apos;un logiciel de gestion des
          talents par deux outils intégrant des fonctions d&apos;IA, couvrant
          les entretiens annuels, l&apos;affectation aux missions, le
          développement des compétences et l&apos;identification des besoins de
          formation, est jugé constitutif d&apos;un projet important
          d&apos;introduction de nouvelles technologies. Suspension immédiate du
          déploiement, phase pilote comprise, sous astreinte de 500 euros par
          jour de retard, et injonction d&apos;ouvrir la consultation du CSE
          central avant toute reprise.
        </li>
      </ul>

      <h2>Ce qui déclenche la consultation, ce qui ne la déclenche pas</h2>
      <p>
        La ligne de partage qui se dessine ne tient pas à la technologie mais à
        son effet sur le travail. Déclenchent la consultation : un outil qui
        entre dans un processus RH, un assistant déployé à l&apos;échelle
        d&apos;une population de salariés, une automatisation qui change le
        contenu d&apos;un poste, tout dispositif qui produit une évaluation ou
        une mesure de l&apos;activité. Ne la déclenchent pas, en principe : une
        expérimentation menée en cercle restreint sans mise en production, une
        mise à jour d&apos;un outil déjà consulté, un usage individuel
        d&apos;assistant qui ne modifie pas l&apos;organisation.
      </p>
      <p>
        Deux pièges reviennent. Le premier est la phase pilote, présentée comme
        un test sans conséquence : la décision du 29 janvier 2026 la vise
        explicitement. Le second est le niveau de consultation, CSE
        d&apos;établissement ou CSE central : deux des quatre décisions portent
        précisément sur un projet global qu&apos;il fallait présenter au comité
        central. Enfin, le fait que l&apos;outil soit gratuit, en marque blanche
        ou fourni par un éditeur déjà référencé ne change rien à la
        qualification.
      </p>

      <h2>La procédure, et les délais réels</h2>
      <p>
        La consultation suit le régime de droit commun. L&apos;employeur remet
        au CSE des informations précises et écrites, une réunion se tient, le
        comité rend un avis. L&apos;article R. 2312-6 fixe le délai à un mois à
        compter de la mise à disposition des informations, porté à deux mois en
        cas de recours à un expert, et à trois mois lorsque des expertises
        interviennent à la fois au niveau du CSE central et d&apos;un ou
        plusieurs CSE d&apos;établissement. À l&apos;expiration de ce délai, le
        comité est réputé avoir été consulté et avoir rendu un avis négatif.
      </p>
      <p>
        Ce dernier point mérite d&apos;être dit clairement, parce qu&apos;il est
        déformé dans les deux sens. Le CSE ne dispose d&apos;aucun droit de
        veto : un avis négatif n&apos;interdit pas le déploiement. Mais
        l&apos;absence de consultation, elle, l&apos;interdit. Ce que sanctionne
        le juge n&apos;est pas le désaccord, c&apos;est le fait de décider avant
        d&apos;avoir consulté. En pratique, un projet correctement instruit
        coûte un mois de calendrier et une réunion préparée. Un projet suspendu
        coûte un trimestre, la confiance des équipes, et parfois le budget.
      </p>

      <h2>Moins de cinquante salariés : ce qui reste</h2>
      <p>
        Les attributions d&apos;information-consultation de l&apos;article L.
        2312-8 concernent les entreprises d&apos;au moins cinquante salariés.
        En dessous de ce seuil, le CSE, obligatoire à partir de onze salariés, a
        des attributions réduites : présenter les réclamations individuelles et
        collectives, contribuer à la santé et à la sécurité. Il n&apos;y a donc
        pas de procédure formelle de consultation à conduire avant un
        déploiement d&apos;IA.
      </p>
      <p>
        Cela ne veut pas dire qu&apos;une petite entreprise n&apos;a rien à
        faire. Les obligations qui pèsent sur elle viennent d&apos;ailleurs : le
        RGPD si des données personnelles sont traitées, avec la CNIL comme
        autorité compétente, et le règlement (UE) 2024/1689 sur
        l&apos;intelligence artificielle, dont l&apos;article 4 sur la littératie
        IA s&apos;applique à toutes les entreprises sans seuil d&apos;effectif.
        Notre{" "}
        <Link href="/blog/ai-act-pme-checklist">
          checklist AI Act pour les PME
        </Link>{" "}
        détaille ce qui s&apos;applique réellement à une structure de moins de
        cinquante personnes.
      </p>

      <h2>Ce que l&apos;AI Act ajoute, et ce qu&apos;il n&apos;ajoute pas</h2>
      <p>
        Beaucoup de dirigeants confondent les deux sujets. L&apos;AI Act ne
        contient pas d&apos;obligation générale de consulter les représentants
        du personnel avant de déployer un outil d&apos;IA. Son article 26,
        paragraphe 7, prévoit uniquement que le déployeur qui est un employeur
        informe les représentants des travailleurs et les travailleurs concernés
        avant de mettre en service un système d&apos;IA à haut risque sur le
        lieu de travail. C&apos;est une information, pas une consultation, et
        elle ne vise que le haut risque, dont les obligations de l&apos;annexe
        III ont été reportées au 2 décembre 2027 par le règlement (UE) 2026/1744
        publié au Journal officiel de l&apos;Union européenne le 24 juillet 2026.
      </p>
      <p>
        Autrement dit, sur ce terrain précis, le droit du travail français est
        aujourd&apos;hui plus contraignant et surtout plus immédiatement
        opposable que le règlement européen. Le règlement, lui, s&apos;applique
        en général depuis le 2 août 2026 et son contrôle relève des autorités
        nationales de surveillance du marché, pas de la CNIL, qui reste
        l&apos;autorité du RGPD. Notre page sur l&apos;
        <Link href="/ia/ai-act">AI Act</Link> replace chaque échéance dans le
        calendrier complet.
      </p>

      <h2>Le dossier à préparer avant la réunion</h2>
      <p>
        Une consultation se gagne ou se perd sur la qualité du dossier remis.
        Cinq pièces suffisent, et elles servent bien au-delà du CSE. La
        description de l&apos;outil et de son fournisseur. La liste des postes
        et des tâches concernés, tirée d&apos;un{" "}
        <Link href="/blog/registre-des-usages-ia-modele">
          registre des usages de l&apos;IA
        </Link>{" "}
        tenu dans un simple tableur. Le sort des données traitées, leur
        hébergement et leur durée de conservation. Les règles de contrôle humain
        sur ce que produit l&apos;outil, notamment lorsqu&apos;une décision
        touche une personne. Et le plan de formation des salariés exposés.
      </p>
      <p>
        Cette cinquième pièce est celle qui manque presque toujours, alors
        qu&apos;elle est déjà exigée par ailleurs. L&apos;article 4 du règlement
        (UE) 2024/1689 impose depuis le 2 février 2025 de prendre des mesures
        pour soutenir la littératie IA des personnes qui utilisent des systèmes
        d&apos;IA pour le compte de l&apos;entreprise, et le règlement est entré
        en application générale le 2 août 2026. C&apos;est une obligation de
        moyens : aucune formation type n&apos;est imposée et aucun certificat
        n&apos;est requis, mais la mesure doit pouvoir se démontrer. C&apos;est
        ce que produit{" "}
        <a href="https://troie.app" target="_blank" rel="noopener">
          troie.app
        </a>
        , la plateforme de formation de TROIE Studio : chaque parcours sur les
        usages professionnels de l&apos;IA se conclut par un QCM et délivre, en
        cas de réussite, une attestation de formation nominative, datée,
        téléchargeable en PDF et vérifiable en ligne par un lien public.
        Présenter au CSE la liste nominative des personnes formées, avec les
        dates, change la nature de la réunion : le projet cesse d&apos;être une
        décision subie et devient un plan d&apos;accompagnement. L&apos;abonnement
        est à 29 euros par mois ou 290 euros par an, avec un essai de 7 jours.
      </p>
      <p>
        Deux précisions de vocabulaire, parce qu&apos;elles reviennent dans
        toutes les demandes. Il n&apos;existe pas de « certification AI Act », le
        terme exact est attestation de formation. Et les formations en ligne de
        TROIE ne sont finançables ni par le CPF ni par un OPCO, ce qui ne change
        rien à leur valeur de preuve, puisque le règlement n&apos;impose ni
        format, ni durée, ni référencement particulier. Pour situer les ordres
        de prix du marché français, notre{" "}
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
        Si un projet d&apos;IA est en cours chez vous, posez trois questions
        aujourd&apos;hui : est-ce que l&apos;outil touche un processus RH ou une
        mesure de l&apos;activité, est-ce qu&apos;il concerne plusieurs
        établissements, et est-ce qu&apos;une phase pilote est déjà lancée. Si la
        réponse est oui à l&apos;une des trois, la consultation se prépare
        maintenant, pas après. Notre article sur les{" "}
        <Link href="/blog/deployer-ia-pme-5-erreurs">
          cinq erreurs des déploiements d&apos;IA en PME
        </Link>{" "}
        détaille les autres angles morts, et TROIE Studio propose un{" "}
        <Link href="/contact?subject=ai-act">audit gratuit de 30 minutes</Link>{" "}
        pour cadrer le dossier avant la réunion.
      </p>

      <p>
        <em>
          Sources : code du travail, Légifrance et code.travail.gouv.fr, pour
          l&apos;article L. 2312-8 sur l&apos;introduction de nouvelles
          technologies, l&apos;article L. 2312-37 sur les moyens de contrôle de
          l&apos;activité, l&apos;article L. 2312-38 sur les traitements
          automatisés de gestion du personnel, l&apos;article R. 2312-6 sur les
          délais de consultation et l&apos;article L. 2317-1 sur le délit
          d&apos;entrave ; ordonnances de référé du tribunal judiciaire de
          Nanterre du 14 février 2025 (n° 24/01457) et du 29 janvier 2026 (n°
          25/02856), du tribunal judiciaire de Créteil du 15 juillet 2025 (n°
          25/00851) et du tribunal judiciaire de Paris du 2 septembre 2025 (n°
          25/53278) ; règlement (UE) 2024/1689 sur l&apos;intelligence
          artificielle, EUR-Lex, pour l&apos;article 4 sur la littératie IA
          applicable depuis le 2 février 2025, l&apos;article 26, paragraphe 7,
          sur l&apos;information des représentants des travailleurs et
          l&apos;application générale au 2 août 2026 ; règlement (UE) 2026/1744,
          dit Digital Omnibus sur l&apos;IA, publié au Journal officiel de
          l&apos;Union européenne le 24 juillet 2026, pour le report des
          obligations relatives aux systèmes à haut risque de l&apos;annexe III
          au 2 décembre 2027. Faits vérifiés le 17 août 2026. Cette page est une
          synthèse pédagogique, pas un conseil juridique.
        </em>
      </p>
    </>
  );
}
