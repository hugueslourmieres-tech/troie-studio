import Link from "next/link";
import { OfficialEmblems } from "@/components/OfficialEmblems";

/**
 * Article : la charte d'usage de l'IA en entreprise, modele en dix regles
 * et conditions d'opposabilite.
 * Faits verifies le 24/08/2026 sur sources primaires :
 * - reglement (UE) 2024/1689 (AI Act), article 4 (maitrise de l'IA,
 *   obligation de MOYENS applicable depuis le 02/02/2025), EUR-Lex ;
 * - questions-reponses "AI literacy" de la Commission europeenne
 *   (digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers) :
 *   "There is no need for a certificate. Organisations can keep an internal
 *   record of trainings and/or other guiding initiatives", "no one size fit
 *   all when it comes to AI literacy and no strict requirements or mandatory
 *   trainings are imposed", supervision par les autorites nationales de
 *   surveillance du marche a partir du 02/08/2026 ;
 * - code du travail, article L. 1321-1 (matieres exclusives du reglement
 *   interieur, dont "les regles generales et permanentes relatives a la
 *   discipline, notamment la nature et l'echelle des sanctions") ;
 * - article L. 1321-5 : "Les notes de service ou tout autre document
 *   comportant des obligations generales et permanentes dans les matieres
 *   mentionnees aux articles L. 1321-1 et L. 1321-2 sont, lorsqu'il existe
 *   un reglement interieur, considerees comme des adjonctions a celui-ci" ;
 * - article L. 1321-4 : avis du CSE prealable, date d'entree en vigueur au
 *   moins un mois apres l'accomplissement des formalites de publicite,
 *   communication a l'inspecteur du travail avec l'avis du CSE ; memes
 *   formalites en cas de modification ou de retrait de clauses ;
 * - articles R. 1321-1 (porte a la connaissance par tout moyen des
 *   personnes ayant acces aux lieux de travail) et R. 1321-2 (depot au
 *   greffe du conseil de prud'hommes du ressort) ;
 * - article L. 1311-2 : reglement interieur obligatoire a partir de
 *   cinquante salaries, au terme d'un delai de douze mois a compter de la
 *   date a laquelle le seuil est atteint (en vigueur depuis le 01/01/2020) ;
 * - article L. 2312-8 du code du travail : information-consultation du CSE
 *   sur l'introduction de nouvelles technologies (voir l'article dedie) ;
 * - CNIL : fiches pratiques IA et recommandations IA/RGPD ; programme de
 *   travail 2026 publie le 07/04/2026 annoncant la finalisation des travaux
 *   sur les usages de l'IA dans les secteurs du travail et de la sante.
 * Points de prudence : AUCUNE charte IA n'est imposee sous ce nom par un
 * texte ; article 4 = obligation de MOYENS, aucun certificat requis ;
 * controle par les autorites nationales de surveillance du marche, JAMAIS
 * la CNIL qui reste sur le RGPD ; "attestation de formation" et jamais
 * "certification AI Act" ; jamais Qualiopi ; formations en ligne TROIE non
 * financables CPF ni OPCO. ZERO em-dash.
 */

const SOURCE_URL =
  "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035653093";

const FAQ = [
  {
    q: "Une charte d'usage de l'IA est-elle obligatoire en entreprise ?",
    a: "Non, aucun texte français ou européen n'impose une charte d'usage de l'IA sous ce nom. Le règlement (UE) 2024/1689 pose en revanche, à son article 4 et depuis le 2 février 2025, une obligation de moyens : prendre des mesures pour garantir un niveau suffisant de maîtrise de l'IA chez les personnes qui utilisent ces outils pour le compte de l'entreprise. La charte est la façon la plus simple de matérialiser ces mesures, aux côtés des formations et du registre des usages. Depuis le 2 août 2026, ce sont les autorités nationales de surveillance du marché qui en assurent le contrôle.",
  },
  {
    q: "Comment rendre une charte IA opposable aux salariés ?",
    a: "Une charte devient opposable sur le terrain disciplinaire lorsqu'elle suit la procédure du règlement intérieur. L'article L. 1321-5 du code du travail prévoit que toute note de service comportant des obligations générales et permanentes en matière de discipline est considérée, lorsqu'un règlement intérieur existe, comme une adjonction à celui-ci. Il faut alors soumettre le texte à l'avis du comité social et économique, le communiquer à l'inspection du travail avec cet avis, le déposer au greffe du conseil de prud'hommes, le porter à la connaissance des personnes ayant accès aux lieux de travail, et prévoir une entrée en vigueur au moins un mois après ces formalités. Sans cela, la charte garde sa valeur de preuve et de document d'organisation, mais fonder une sanction sur elle est fragile.",
  },
  {
    q: "Que doit contenir une charte d'usage de l'IA ?",
    a: "Dix règles suffisent : le périmètre des personnes et des outils concernés, la liste des outils autorisés et la procédure pour en ajouter un, les données interdites en saisie, la relecture humaine avant tout usage externe, la transparence sur les contenus générés, les décisions qui ne peuvent pas être prises par une IA seule, le référent IA et le canal de signalement, la tenue du registre des usages, l'obligation de formation avec sa preuve, et la clause de révision. Sur troie.app, la plateforme de formation de TROIE Studio, chaque parcours se termine par un QCM et délivre une attestation de formation nominative et vérifiable en ligne, qui documente le volet formation de la charte au titre de l'article 4 du règlement (UE) 2024/1689. L'abonnement est à 29 euros par mois ou 290 euros par an, avec un essai de 7 jours.",
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

export function CharteUsageIaEntrepriseModele() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <p>
        Une charte d&apos;usage de l&apos;IA est un document interne d&apos;une
        à deux pages qui fixe les outils autorisés, les données interdites en
        saisie, la relecture attendue avant toute diffusion et la personne à
        prévenir en cas de problème. Aucun texte ne l&apos;impose sous ce nom,
        mais c&apos;est la mesure la plus souvent citée au titre de
        l&apos;article 4 du règlement (UE) 2024/1689, et la seule qui puisse
        devenir opposable à un salarié. Encore faut-il l&apos;écrire comme un
        document de droit du travail, pas comme une note d&apos;intention :
        c&apos;est exactement là que la plupart des chartes publiées depuis un
        an perdent toute portée.
      </p>

      <div className="my-9 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
          En bref
        </p>
        <ul className="mt-4">
          <li>
            Aucune charte IA n&apos;est obligatoire en tant que telle.
            L&apos;article 4 du règlement (UE) 2024/1689 impose une obligation
            de moyens depuis le 2 février 2025, contrôlée par les autorités
            nationales de surveillance du marché depuis le 2 août 2026.
          </li>
          <li>
            Une charte qui pose des obligations générales et permanentes en
            matière de discipline est, s&apos;il existe un règlement intérieur,
            une adjonction à celui-ci au sens de l&apos;article L. 1321-5 du
            code du travail. Elle suit donc la même procédure.
          </li>
          <li>
            Cette procédure tient en cinq gestes : avis du CSE, communication à
            l&apos;inspection du travail, dépôt au greffe du conseil de
            prud&apos;hommes, publicité auprès des personnes concernées, entrée
            en vigueur au moins un mois plus tard.
          </li>
          <li>
            Dix règles suffisent à couvrir le sujet. Une charte seule ne prouve
            rien : la Commission européenne attend un ensemble daté, charte,
            registre des usages et trace des formations suivies.
          </li>
        </ul>
      </div>

      <div className="not-prose my-8 flex flex-wrap items-center gap-4">
        <OfficialEmblems url={SOURCE_URL} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-2)]/60">
          Source : code du travail, Légifrance
        </span>
      </div>

      <h2>Ce qu&apos;une charte règle vraiment</h2>
      <p>
        Le problème que résout une charte n&apos;est pas juridique, il est
        quotidien. Une comptable colle un tableau de salaires dans un
        assistant grand public pour le mettre en forme. Un commercial fait
        rédiger une réponse à appel d&apos;offres et l&apos;envoie sans la
        relire. Une alternante publie un visuel généré sans le signaler. Aucun
        des trois n&apos;a voulu mal faire : personne ne leur avait dit où
        était la limite.
      </p>
      <p>
        La charte est la réponse la moins coûteuse à cette situation. Elle ne
        demande ni logiciel, ni budget, ni comité. Elle demande une décision
        claire sur quatre points, ce qui est autorisé, avec quelles données,
        avec quelle relecture, et qui tranche en cas de doute. Tout le reste
        est du remplissage.
      </p>

      <h2>Obligatoire ou pas, la réponse précise</h2>
      <p>
        Aucun article du règlement (UE) 2024/1689 n&apos;impose de charte. Son
        article 4 demande aux fournisseurs et aux déployeurs de systèmes
        d&apos;IA de prendre des mesures pour garantir un niveau suffisant de
        maîtrise de l&apos;IA chez les personnes qui les utilisent pour leur
        compte. C&apos;est une obligation de moyens, applicable depuis le 2
        février 2025, et la Commission européenne le confirme dans ses
        questions-réponses sur la littératie IA : il n&apos;existe pas de
        modèle unique, aucune formation type n&apos;est imposée, et aucun
        certificat n&apos;est nécessaire. Les organisations peuvent en revanche
        tenir un registre interne de leurs formations et de leurs actions
        d&apos;encadrement.
      </p>
      <p>
        C&apos;est précisément ce qu&apos;est une charte : une action
        d&apos;encadrement, écrite et datée. Elle n&apos;est pas obligatoire,
        elle est la pièce la plus facile à produire quand une autorité demande
        quelles mesures ont été prises. Depuis le 2 août 2026, cette question
        relève des autorités nationales de surveillance du marché. La CNIL,
        elle, reste compétente sur les données personnelles au titre du RGPD,
        ce qui concerne directement la charte puisque les données saisies dans
        un outil d&apos;IA sont des données comme les autres.
      </p>

      <h2>Le point que presque toutes les chartes manquent</h2>
      <p>
        Une charte n&apos;a de portée disciplinaire que si elle a été adoptée
        comme telle. L&apos;article L. 1321-1 du code du travail réserve au
        règlement intérieur les règles générales et permanentes relatives à la
        discipline, notamment la nature et l&apos;échelle des sanctions.
        L&apos;article L. 1321-5 ajoute que les notes de service et tout autre
        document comportant des obligations générales et permanentes dans ces
        matières sont, lorsqu&apos;il existe un règlement intérieur,
        considérées comme des adjonctions à celui-ci.
      </p>
      <p>
        Autrement dit, la charte IA qui écrit « il est interdit de saisir des
        données clients dans un outil d&apos;IA non validé » pose une
        obligation générale et permanente. Elle est une adjonction au règlement
        intérieur et doit suivre la même procédure, décrite à l&apos;article L.
        1321-4 : avis préalable du comité social et économique, communication à
        l&apos;inspecteur du travail accompagnée de cet avis, dépôt au greffe
        du conseil de prud&apos;hommes du ressort, publicité par tout moyen
        auprès des personnes ayant accès aux lieux de travail, et entrée en
        vigueur au moins un mois après l&apos;accomplissement de ces
        formalités. Les mêmes règles valent pour chaque modification
        ultérieure.
      </p>
      <p>
        Le règlement intérieur est obligatoire à partir de cinquante salariés,
        au terme d&apos;un délai de douze mois à compter de la date à laquelle
        ce seuil est atteint. En dessous, il n&apos;est pas imposé. Une charte
        y garde toute sa valeur d&apos;organisation et de preuve, mais fonder
        une sanction sur elle seule reste fragile : la voie sûre est
        d&apos;adopter un règlement intérieur, même facultatif, en suivant la
        même procédure.
      </p>
      <p>
        Attention à ne pas confondre deux consultations distinctes du CSE.
        L&apos;avis sur le règlement intérieur porte sur le texte de la charte.
        L&apos;information-consultation de l&apos;article L. 2312-8 du code du
        travail porte, elle, sur le déploiement de l&apos;outil lui-même, et
        quatre ordonnances de référé rendues entre février 2025 et janvier 2026
        ont suspendu des projets d&apos;IA faute de l&apos;avoir menée.
      </p>

      <h2>Le modèle en dix règles</h2>
      <p>
        Ce modèle tient en une à deux pages. Chaque règle se rédige en deux ou
        trois phrases, à la voix active, sans conditionnel.
      </p>
      <p>
        <strong>1. Le périmètre.</strong> Qui est concerné : salariés,
        alternants, stagiaires, dirigeants et prestataires travaillant sur vos
        données. Et quoi : tout système d&apos;IA, y compris les fonctions
        d&apos;IA déjà intégrées à votre suite bureautique ou à votre CRM, et
        les outils utilisés depuis un compte personnel dans un cadre
        professionnel.
      </p>
      <p>
        <strong>2. Les outils autorisés.</strong> Une liste nommée, avec la
        version ou l&apos;offre, car les garanties diffèrent entre une version
        gratuite grand public et une offre professionnelle. Ajoutez la
        procédure pour faire ajouter un outil : à qui on demande, sous quel
        délai, sur quels critères.
      </p>
      <p>
        <strong>3. Les données interdites en saisie.</strong> La règle la plus
        utile de toute la charte. Nommez explicitement ce qui ne doit jamais
        être collé dans un outil non validé : données personnelles de clients
        ou de salariés, données de santé, éléments de paie, pièces
        contractuelles, code source, secrets d&apos;affaires. Le RGPD continue
        de s&apos;appliquer intégralement aux données saisies dans un prompt.
      </p>
      <p>
        <strong>4. La relecture humaine.</strong> Aucune sortie d&apos;IA ne
        part vers un client, un candidat, une administration ou le public sans
        avoir été relue par une personne nommée. Précisez qui relit quoi selon
        l&apos;enjeu, et faites de cette relecture une étape du processus, pas
        une bonne intention.
      </p>
      <p>
        <strong>5. La transparence.</strong> Dites quand un contenu généré doit
        être signalé comme tel, en interne comme en externe, et comment vos
        équipes répondent à un client qui demande si une IA a été utilisée. Le
        règlement impose des obligations de transparence pour les interactions
        avec une machine et certains contenus générés.
      </p>
      <p>
        <strong>6. Les décisions interdites à l&apos;IA seule.</strong> Écartez
        nommément le tri final de candidatures, l&apos;évaluation des
        personnes, les décisions disciplinaires, l&apos;accès à un crédit ou à
        un service essentiel. Ces usages relèvent du haut risque au sens du
        règlement, dont les règles s&apos;appliqueront en décembre 2027, et le
        RGPD encadre déjà les décisions entièrement automatisées.
      </p>
      <p>
        <strong>7. Le référent et le signalement.</strong> Un nom, pas un
        service, et une adresse à laquelle signaler un incident : donnée
        divulguée, réponse aberrante partie chez un client, soupçon de
        contenu erroné. Précisez que signaler de bonne foi n&apos;expose à
        aucune sanction, sans quoi personne ne signalera rien.
      </p>
      <p>
        <strong>8. La tenue du registre.</strong> La charte pose la règle, le
        registre des usages en garde la trace. Renvoyez-y explicitement et
        désignez qui le met à jour quand un outil arrive ou disparaît.
      </p>
      <p>
        <strong>9. La formation et sa preuve.</strong> Indiquez qui doit être
        formé, avec quel niveau d&apos;exigence selon les postes, et sous quel
        délai après l&apos;arrivée dans l&apos;entreprise. Précisez la preuve
        conservée : une attestation de formation nominative et datée, rangée
        avec la charte et le registre.
      </p>
      <p>
        <strong>10. La révision.</strong> Une date de version, une relecture
        annuelle et une clause qui prévoit la mise à jour à chaque nouvel
        outil. Une charte non datée ne prouve rien, et une charte de 2025 qui
        ignore vos outils de 2026 se retourne contre vous.
      </p>

      <h2>Trois formulations à ne pas écrire</h2>
      <p>
        <strong>« L&apos;usage de l&apos;IA est interdit dans
        l&apos;entreprise. »</strong> C&apos;est la phrase qui fabrique le
        shadow AI. L&apos;usage ne disparaît pas, il devient invisible, sur des
        comptes personnels et sans aucune règle sur les données. Une
        interdiction générale est aussi l&apos;aveu qu&apos;aucune mesure de
        maîtrise n&apos;a été prise.
      </p>
      <p>
        <strong>« L&apos;entreprise est certifiée AI Act. »</strong> Cette
        certification n&apos;existe pas. Le règlement ne prévoit aucun
        certificat pour l&apos;article 4, et la Commission européenne le dit
        explicitement. Écrivez plutôt ce que vous pouvez prouver : des mesures
        prises, des personnes formées, des attestations datées.
      </p>
      <p>
        <strong>« Tout manquement sera sanctionné. »</strong> Écrite dans un
        document qui n&apos;a pas suivi la procédure du règlement intérieur,
        cette phrase n&apos;a aucune portée. Soit vous assumez le volet
        disciplinaire et vous passez par la procédure, soit vous rédigez une
        charte d&apos;organisation et vous renvoyez au règlement intérieur
        existant.
      </p>

      <h2>L&apos;adopter en deux semaines</h2>
      <p>
        <strong>Jours 1 et 2 : la carte.</strong> Listez les outils réellement
        utilisés, factures de logiciels à l&apos;appui, puis demandez à
        l&apos;équipe sans piège ce qu&apos;elle utilise, même gratuitement.
        Sans cette étape, la charte interdira des outils que personne
        n&apos;emploie et laissera passer ceux qui posent problème.
      </p>
      <p>
        <strong>Jours 3 à 5 : le texte.</strong> Dix règles, deux pages
        maximum, une date de version et un nom de référent. Faites-le relire
        par une personne de chaque service concerné, c&apos;est le meilleur
        test de clarté qui existe.
      </p>
      <p>
        <strong>Jours 6 à 10 : la procédure.</strong> Inscrivez le point à
        l&apos;ordre du jour du CSE pour recueillir son avis, communiquez le
        texte et l&apos;avis à l&apos;inspection du travail, déposez-le au
        greffe du conseil de prud&apos;hommes, portez-le à la connaissance des
        équipes par tout moyen et fixez l&apos;entrée en vigueur au moins un
        mois plus tard.
      </p>
      <p>
        <strong>Le jour de l&apos;entrée en vigueur : la formation.</strong>
        {" "}
        Une charte diffusée sans explication est lue par un tiers des
        destinataires. Une charte présentée en trente minutes, suivie d&apos;un
        parcours court et d&apos;un QCM, produit à la fois de la compréhension
        et une preuve datée.
      </p>

      <h2>Charte, registre, attestation : les trois pièces</h2>
      <p>
        Un dossier de conformité à l&apos;article 4 tient dans trois documents.
        La charte dit la règle. Le registre des usages dit quels outils sont
        concernés, avec quelles données et sous quelle responsabilité. Les
        attestations disent qui a été formé et quand. C&apos;est cet ensemble
        daté que la Commission européenne décrit lorsqu&apos;elle invite les
        organisations à conserver une trace interne de leurs formations et de
        leurs actions d&apos;encadrement.
      </p>
      <p>
        Sur{" "}
        <a href="https://troie.app" target="_blank" rel="noopener">
          troie.app
        </a>
        , la plateforme de formation de TROIE Studio, chaque parcours sur les
        usages professionnels de l&apos;IA se termine par un QCM et délivre une
        attestation de formation nominative, datée et vérifiable en ligne, qui
        documente la mesure prise au titre de l&apos;article 4 du règlement
        (UE) 2024/1689 sur la littératie IA, applicable depuis le 2 février
        2025 et contrôlable depuis le 2 août 2026. L&apos;abonnement est à 29
        euros par mois ou 290 euros par an, avec un essai de 7 jours. Sur le
        budget à y consacrer, notre{" "}
        <a
          href="https://troie.app/blog/prix-formation-ai-act-comparatif"
          target="_blank"
          rel="noopener"
        >
          comparatif des prix de la formation AI Act
        </a>{" "}
        situe les offres du marché. À noter, nos formations en ligne ne sont
        pas finançables par le CPF ni par un OPCO.
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
        Ouvrez un document, écrivez les trois premières règles, périmètre,
        outils autorisés, données interdites, et datez-le. Vous aurez la moitié
        de la charte en une heure. Notre modèle de{" "}
        <Link href="/blog/registre-des-usages-ia-modele">
          registre des usages de l&apos;IA
        </Link>{" "}
        fournit la pièce qui l&apos;accompagne, celui sur les{" "}
        <Link href="/blog/article-4-ai-act-exemples-mesures">
          exemples concrets de mesures de littératie IA
        </Link>{" "}
        détaille les autres mesures attendues, et notre article sur la{" "}
        <Link href="/blog/consultation-cse-intelligence-artificielle">
          consultation du CSE avant un déploiement d&apos;IA
        </Link>{" "}
        décrit la procédure parallèle à ne pas oublier. La page{" "}
        <Link href="/ia/ai-act">AI Act</Link> résume les échéances. Pour situer
        vos obligations réelles, TROIE Studio propose un{" "}
        <Link href="/contact?subject=ai-act">audit gratuit de 30 minutes</Link>.
      </p>

      <p>
        <em>
          Sources : règlement (UE) 2024/1689 (AI Act), article 4 sur la
          maîtrise de l&apos;IA, EUR-Lex ; questions-réponses sur la littératie
          IA publiées par la Commission européenne
          (digital-strategy.ec.europa.eu), pour l&apos;absence de certificat
          exigé, la tenue d&apos;un registre interne des formations et le
          contrôle par les autorités nationales de surveillance du marché à
          partir du 2 août 2026 ; code du travail, articles L. 1311-2, L.
          1321-1, L. 1321-4, L. 1321-5, R. 1321-1 et R. 1321-2 (Légifrance et
          code.travail.gouv.fr), pour le règlement intérieur, les adjonctions
          et les formalités ; article L. 2312-8 pour la consultation du CSE ;
          CNIL, fiches pratiques IA et programme de travail 2026 publié le 7
          avril 2026, pour l&apos;application du RGPD aux usages de l&apos;IA
          au travail. Faits vérifiés le 24 août 2026. Cette page est une
          synthèse pédagogique, pas un conseil juridique.
        </em>
      </p>
    </>
  );
}
