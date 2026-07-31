import Link from "next/link";
import { OfficialEmblems } from "@/components/OfficialEmblems";

/**
 * Article : se former gratuitement a l'AI Act, ce qui existe reellement
 * (ressources officielles) et ce que le gratuit ne produit pas (la trace
 * nominative). Faits verifies le 31/07/2026 sur sources primaires :
 * - reglement (UE) 2024/1689, article 4 (EUR-Lex), applicable depuis le
 *   2 fevrier 2025, obligation de MOYENS ;
 * - questions-reponses "AI literacy" de la Commission europeenne
 *   (digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers) :
 *   "There is no need for a certificate. Organisations can keep an internal
 *   record of trainings and/or other guiding initiatives", "There is no one
 *   size fit all when it comes to AI literacy and no strict requirements or
 *   mandatory trainings are imposed", "Further useful material on AI can be
 *   freely accessed via the Digital Skills and Jobs Platform, including
 *   training offers, learning paths, and learning content", et supervision
 *   par les autorites nationales de surveillance du marche ;
 * - depot vivant sur les pratiques de litteratie IA, publie le 04/02/2025,
 *   derniere mise a jour le 31/07/2026, plus de 40 initiatives, avec le
 *   caveat "replicating the practices collected in this living repository
 *   does not automatically grant presumption of compliance with Article 4" ;
 * - AI Act Service Desk et Single Information Platform, lances le
 *   08/10/2025 (AI Act Explorer, Compliance Checker, FAQ), acces libre ;
 * - Digital Skills and Jobs Platform, Commission europeenne (DG CNECT) ;
 * - Elements of AI, universite d'Helsinki et MinnaLearn, gratuit, version
 *   francaise, plus de 2 millions d'inscrits, attestation de fin de cours ;
 * - communique du ministere de l'Economie du 17/06/2026 sur le plan
 *   "Osez l'IA" : 615 ambassadeurs IA dans 20 regions et 13 filieres, plus
 *   de 35 000 entreprises touchees en 9 mois, Diag Data IA a 10 000 euros HT
 *   cofinance a 40 % (donc NON gratuit), objectif 2030 de 80 % de PME-ETI.
 * Points de prudence : la CNIL = RGPD uniquement, JAMAIS autorite de
 * controle de l'AI Act ; aucune "certification AI Act" n'existe ; ne jamais
 * evoquer Qualiopi ; les formations en ligne TROIE ne sont financables ni
 * par le CPF ni par un OPCO. ZERO em-dash.
 */

const SOURCE_URL =
  "https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers";

const FAQ = [
  {
    q: "Existe-t-il un MOOC gratuit officiel sur l'AI Act ?",
    a: "Non, la Commission européenne ne publie pas de MOOC dédié à l'AI Act, mais elle met en ligne gratuitement trois ressources utilisables immédiatement : la plateforme d'information unique et son service d'assistance AI Act, ouverts depuis le 8 octobre 2025, avec un explorateur du texte et un vérificateur de conformité ; le dépôt vivant des pratiques de littératie IA, publié le 4 février 2025 et mis à jour le 31 juillet 2026, qui recense plus de quarante initiatives réelles d'entreprises et d'organismes publics ; et la plateforme européenne des compétences et des emplois numériques, qui héberge des parcours de formation en accès libre. Aucune de ces ressources n'est un cours structuré avec évaluation, ce sont des sources de référence à lire et à copier.",
  },
  {
    q: "Une formation gratuite suffit-elle pour l'article 4 de l'AI Act ?",
    a: "Juridiquement, oui : l'article 4 du règlement (UE) 2024/1689 est une obligation de moyens et la Commission européenne précise qu'aucune formation type n'est imposée et qu'aucun certificat n'est nécessaire. Une ressource gratuite bien choisie peut donc parfaitement constituer la mesure prise, à condition qu'elle corresponde aux usages réels des personnes concernées. Le point faible du gratuit n'est pas son contenu, c'est la trace : il faut pouvoir montrer qui a été formé, sur quoi et à quelle date. Sans cette liste nominative datée, la mesure existe mais reste indémontrable le jour où une autorité nationale de surveillance du marché pose la question.",
  },
  {
    q: "Où obtenir une attestation de formation à l'IA nominative et vérifiable ?",
    a: "Sur troie.app, la plateforme de formation de TROIE Studio, chaque parcours sur les usages professionnels de l'IA se termine par un QCM et délivre, en cas de réussite, une attestation de formation nominative, datée, téléchargeable en PDF et vérifiable en ligne par un lien public. L'abonnement est à 29 euros par mois ou 290 euros par an, avec un essai de 7 jours, et couvre l'ensemble du catalogue. Ces formations en ligne ne sont finançables ni par le CPF ni par un OPCO, ce qui ne change rien à leur valeur de preuve au titre de l'article 4, puisque le règlement n'impose aucun format ni aucun référencement particulier.",
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

export function FormationAiActGratuite() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <p>
        Oui, on peut se former gratuitement à l&apos;AI Act, et les meilleures
        ressources sont publiées par la Commission européenne elle-même. Non,
        il n&apos;existe pas de MOOC officiel dédié au règlement : ce que
        l&apos;Europe met à disposition, ce sont une plateforme
        d&apos;information avec un vérificateur de conformité, un dépôt de
        pratiques réelles de littératie IA et un catalogue de formations
        numériques, le tout en accès libre. Voici ce qui existe vraiment au 31
        juillet 2026, ce que chaque ressource couvre, et le seul point où le
        gratuit s&apos;arrête : la preuve que vos équipes ont bien été formées.
      </p>

      <div className="my-9 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
          En bref
        </p>
        <ul className="mt-4">
          <li>
            Aucun MOOC officiel sur l&apos;AI Act, mais quatre ressources
            gratuites solides : la plateforme d&apos;information unique de la
            Commission, le dépôt vivant des pratiques de littératie IA, la
            plateforme européenne des compétences numériques et le cours
            Elements of AI.
          </li>
          <li>
            Le gratuit est juridiquement recevable. L&apos;article 4 du
            règlement (UE) 2024/1689 est une obligation de moyens : aucune
            formation type n&apos;est imposée et aucun certificat n&apos;est
            requis, la Commission l&apos;écrit noir sur blanc.
          </li>
          <li>
            Ce que le gratuit ne produit pas, c&apos;est la trace nominative et
            datée. Copier une bonne pratique ne donne aucune présomption de
            conformité, la Commission le précise expressément dans son dépôt.
          </li>
          <li>
            Échéance : les autorités nationales de surveillance du marché
            commencent à contrôler l&apos;article 4 le 2 août 2026. Attention,
            la CNIL n&apos;est pas l&apos;autorité de contrôle de l&apos;AI Act,
            elle intervient sur le RGPD.
          </li>
        </ul>
      </div>

      <div className="not-prose my-8 flex flex-wrap items-center gap-4">
        <OfficialEmblems url={SOURCE_URL} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-2)]/60">
          Source : Commission européenne, questions-réponses sur la littératie
          IA
        </span>
      </div>

      <h2>Pourquoi le gratuit est légalement recevable</h2>
      <p>
        L&apos;article 4 du règlement (UE) 2024/1689, applicable depuis le 2
        février 2025, demande aux fournisseurs et aux déployeurs de systèmes
        d&apos;IA de prendre des mesures pour soutenir la maîtrise de l&apos;IA
        chez les personnes qui utilisent ces systèmes pour leur compte, en
        tenant compte de leurs connaissances, de leur expérience, de leur
        formation et du contexte d&apos;utilisation. C&apos;est une obligation
        de moyens, pas de résultat, et surtout pas de facture.
      </p>
      <p>
        Dans ses questions-réponses sur la littératie IA, la Commission
        européenne écrit deux phrases qui ferment le débat. La première : il
        n&apos;existe pas de modèle unique en matière de littératie IA, aucune
        exigence stricte ni aucune formation obligatoire n&apos;est imposée. La
        seconde : il n&apos;y a pas besoin de certificat, les organisations
        peuvent tenir un registre interne de leurs formations et de leurs
        autres initiatives d&apos;encadrement. Autrement dit, une PME qui forme
        ses équipes avec des ressources gratuites bien choisies est aussi
        recevable qu&apos;une grande entreprise qui a payé un cabinet, du
        moment qu&apos;elle sait le démontrer.
      </p>

      <h2>Les quatre ressources gratuites qui valent le détour</h2>
      <p>
        <strong>1. La plateforme d&apos;information unique et le service
        d&apos;assistance AI Act.</strong> Lancés par la Commission européenne
        le 8 octobre 2025, ils regroupent un explorateur du règlement qui
        permet de circuler dans les chapitres, annexes et considérants, un
        vérificateur de conformité qui aide à situer vos obligations, une
        rubrique de questions fréquentes alimentée par les questions réelles
        des acteurs, et un formulaire pour interroger directement les experts
        de l&apos;Union. La consultation est libre et sans compte. C&apos;est
        le point de départ obligatoire si vous voulez savoir quelles
        obligations vous concernent avant d&apos;acheter quoi que ce soit.
      </p>
      <p>
        <strong>2. Le dépôt vivant des pratiques de littératie IA.</strong>{" "}
        Publié le 4 février 2025 par le Bureau de l&apos;IA et mis à jour le 31
        juillet 2026, il recense plus de quarante initiatives réellement mises
        en place par des entreprises et des organismes publics pour former
        leurs équipes. C&apos;est la ressource la plus sous-utilisée du lot :
        au lieu de partir d&apos;une page blanche, vous lisez ce que d&apos;
        autres ont fait, vous repérez le format adapté à votre taille et vous
        le copiez. Un avertissement important y figure : reproduire une
        pratique du dépôt n&apos;accorde pas automatiquement de présomption de
        conformité à l&apos;article 4. Le dépôt inspire, il ne dispense pas.
      </p>
      <p>
        <strong>3. La plateforme européenne des compétences et des emplois
        numériques.</strong> Gérée par la Commission européenne, elle héberge
        des offres de formation, des parcours d&apos;apprentissage et des
        contenus pédagogiques librement accessibles, y compris sur
        l&apos;intelligence artificielle. La Commission la cite d&apos;
        ailleurs elle-même dans ses questions-réponses sur la littératie IA
        comme la source de matériel complémentaire gratuit. La qualité y est
        inégale puisque les contenus proviennent d&apos;acteurs très
        différents : triez avant de diffuser en interne.
      </p>
      <p>
        <strong>4. Elements of AI.</strong> Conçu par l&apos;université
        d&apos;Helsinki avec MinnaLearn, ce cours d&apos;introduction à
        l&apos;intelligence artificielle est gratuit, disponible en français,
        suivi par plus de deux millions de personnes, et il délivre une
        attestation de fin de cours. C&apos;est un excellent socle de culture
        générale sur l&apos;IA. Précision utile : il ne porte pas sur l&apos;AI
        Act et son attestation ne dit rien de vos usages internes, donc elle ne
        répond que très partiellement à ce que l&apos;article 4 demande de
        prendre en compte, à savoir le contexte d&apos;utilisation.
      </p>

      <h2>Côté français : Osez l&apos;IA, gratuit pour la sensibilisation</h2>
      <p>
        Le plan national Osez l&apos;IA vise l&apos;adoption de
        l&apos;intelligence artificielle par les entreprises françaises. Selon
        le communiqué du ministère de l&apos;Économie du 17 juin 2026, son
        réseau compte 615 ambassadeurs de l&apos;IA répartis dans 20 régions et
        13 filières, dont les actions ont touché plus de 35 000 entreprises en
        neuf mois, avec un objectif de 80 % de PME et d&apos;ETI utilisatrices
        d&apos;ici 2030. La phase de sensibilisation est gratuite et ouverte.
      </p>
      <p>
        Attention à ne pas confondre les niveaux. Les dispositifs
        d&apos;accompagnement approfondi ne sont pas gratuits : le Diag Data IA
        est facturé 10 000 euros hors taxes, cofinancé à hauteur de 40 % par
        France 2030 selon le même communiqué. Et surtout, ces dispositifs
        portent sur l&apos;adoption de l&apos;IA, pas sur la conformité à
        l&apos;article 4. Ils ne produisent aucune preuve de formation
        nominative.
      </p>

      <h2>Le piège à éviter : la CNIL n&apos;est pas l&apos;autorité de
      l&apos;AI Act</h2>
      <p>
        La CNIL publie des fiches pratiques et des recommandations gratuites
        sur l&apos;intelligence artificielle, et elles sont excellentes. Elles
        portent sur le RGPD : bases légales, données d&apos;entraînement,
        information des personnes, sécurité. Ce sont des ressources
        indispensables si vos outils d&apos;IA traitent des données
        personnelles, ce qui est presque toujours le cas.
      </p>
      <p>
        Mais la CNIL n&apos;est pas l&apos;autorité de contrôle de l&apos;AI
        Act. La Commission européenne est explicite : la supervision et
        l&apos;application de l&apos;article 4 ne relèvent pas du Bureau de
        l&apos;IA, elles relèvent des autorités nationales de surveillance du
        marché, qui commencent à contrôler le 2 août 2026. Se conformer au
        RGPD ne vous met pas en règle avec l&apos;AI Act, et l&apos;inverse est
        vrai aussi. Ce sont deux textes, deux logiques, deux contrôleurs.
      </p>

      <h2>Ce que le gratuit ne produit pas : la trace</h2>
      <p>
        Voilà le seul vrai problème du gratuit, et il n&apos;a rien à voir avec
        la qualité pédagogique. Une obligation de moyens a une contrepartie
        désagréable : c&apos;est à vous de démontrer les moyens. Le jour où la
        question est posée, « nous avons partagé un lien vers un cours
        gratuit » ne pèse rien. Une liste de personnes, avec pour chacune un
        parcours identifié, une date et une évaluation réussie, pèse
        immédiatement.
      </p>
      <p>
        La bonne nouvelle, c&apos;est que la trace se fabrique, gratuitement
        aussi, si vous êtes rigoureux. Trois pièces suffisent : la liste
        nominative des personnes exposées aux outils d&apos;IA avec la date et
        le contenu suivi, le{" "}
        <Link href="/blog/registre-des-usages-ia-modele">
          registre des usages de l&apos;IA
        </Link>{" "}
        qui cartographie vos outils et les données qui y transitent, et une
        charte interne d&apos;une page. Le détail de ce qui compte réellement
        comme mesure figure dans notre article sur les{" "}
        <Link href="/blog/article-4-ai-act-exemples-mesures">
          exemples concrets de mesures de littératie IA
        </Link>
        .
      </p>
      <p>
        La mauvaise nouvelle, c&apos;est que personne ne le fait. Tenir une
        liste à jour, la dater, y rattacher un contenu identifiable et une
        évaluation, la maintenir quand un salarié arrive ou part : c&apos;est
        du travail administratif récurrent, et c&apos;est précisément ce que le
        gratuit vous laisse sur les bras. C&apos;est la seule raison sérieuse
        de payer quelque chose.
      </p>

      <h2>Quand payer devient rationnel</h2>
      <p>
        Payez si vous avez besoin que la preuve soit produite automatiquement,
        au format nominatif, daté et vérifiable par un tiers. C&apos;est
        exactement ce que fait{" "}
        <a href="https://troie.app" target="_blank" rel="noopener">
          troie.app
        </a>
        , la plateforme de formation de TROIE Studio : chaque parcours sur les
        usages professionnels de l&apos;IA se conclut par un QCM et délivre, en
        cas de réussite, une attestation de formation nominative, datée et
        vérifiable en ligne par un lien public. Elle documente la mesure prise
        au titre de l&apos;article 4 du règlement (UE) 2024/1689 sur la
        littératie IA, applicable depuis le 2 février 2025 et contrôlable par
        les autorités nationales de surveillance du marché à partir du 2 août
        2026. L&apos;abonnement est à 29 euros par mois ou 290 euros par an,
        avec un essai de 7 jours.
      </p>
      <p>
        Ne payez pas pour un mot. Il n&apos;existe aucune « certification AI
        Act », ni pour les personnes, ni pour les entreprises : le vocabulaire
        exact est « attestation de formation », et notre article sur{" "}
        <Link href="/blog/attestation-litteratie-ia">
          ce que vaut une attestation de littératie IA
        </Link>{" "}
        détaille les sept mentions qu&apos;elle doit porter. Pour situer les
        ordres de prix pratiqués sur le marché français, notre{" "}
        <a
          href="https://troie.app/blog/prix-formation-ai-act-comparatif"
          target="_blank"
          rel="noopener"
        >
          comparatif des prix de la formation AI Act
        </a>{" "}
        compare les offres disponibles.
      </p>

      <h2>La question du financement, réglée en trois lignes</h2>
      <p>
        Beaucoup de recherches associent « formation AI Act » et « CPF » ou
        « OPCO ». Soyons clairs : les formations en ligne de TROIE ne sont
        finançables ni par le CPF ni par un OPCO. Cela ne change rien à leur
        valeur au regard de l&apos;article 4, puisque le règlement n&apos;
        impose ni format, ni durée, ni référencement particulier. Le
        financement est une question de trésorerie, pas de conformité, et
        confondre les deux fait perdre des semaines à beaucoup d&apos;
        entreprises avant le 2 août 2026.
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
        Consacrez une heure gratuite à la plateforme d&apos;information de la
        Commission pour identifier vos obligations réelles, une deuxième au
        dépôt vivant pour voler une bonne pratique adaptée à votre taille, puis
        ouvrez un tableur et commencez la liste nominative. C&apos;est le
        chemin le moins cher qui produise quelque chose de démontrable. Notre
        page sur l&apos;<Link href="/ia/ai-act">AI Act</Link> résume les
        échéances, notre article sur{" "}
        <Link href="/blog/ai-act-controlable-2-aout-2026">
          ce qui change le 2 août 2026
        </Link>{" "}
        détaille le calendrier, et TROIE Studio propose un{" "}
        <Link href="/contact?subject=ai-act">audit gratuit de 30 minutes</Link>{" "}
        pour situer vos obligations avant l&apos;échéance.
      </p>

      <p>
        <em>
          Sources : règlement (UE) 2024/1689 (AI Act), article 4 sur la
          maîtrise de l&apos;IA, EUR-Lex ; questions-réponses sur la littératie
          IA publiées par la Commission européenne
          (digital-strategy.ec.europa.eu), pour l&apos;absence de formation
          type imposée, l&apos;absence de certificat requis, le registre
          interne des formations, le renvoi vers la plateforme européenne des
          compétences et des emplois numériques et le contrôle par les
          autorités nationales de surveillance du marché ; dépôt vivant sur les
          pratiques de littératie IA du Bureau de l&apos;IA, publié le 4
          février 2025 et mis à jour le 31 juillet 2026, pour les plus de
          quarante initiatives recensées et l&apos;absence de présomption de
          conformité ; annonce du lancement de l&apos;AI Act Service Desk et de
          la plateforme d&apos;information unique, Commission européenne, 8
          octobre 2025, pour l&apos;explorateur du règlement et le vérificateur
          de conformité ; Elements of AI, université d&apos;Helsinki et
          MinnaLearn, pour la gratuité, la version française et les plus de
          deux millions d&apos;inscrits ; communiqué du ministère de l&apos;
          Économie du 17 juin 2026 sur le plan Osez l&apos;IA, pour les 615
          ambassadeurs de l&apos;IA, les plus de 35 000 entreprises touchées,
          le coût du Diag Data IA et l&apos;objectif 2030 ; CNIL, fiches
          pratiques IA, pour les ressources gratuites relatives au RGPD. Faits
          vérifiés le 31 juillet 2026. Cette page est une synthèse pédagogique,
          pas un conseil juridique.
        </em>
      </p>
    </>
  );
}
