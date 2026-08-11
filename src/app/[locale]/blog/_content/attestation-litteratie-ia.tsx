import Link from "next/link";
import { OfficialEmblems } from "@/components/OfficialEmblems";

/**
 * Article : l'attestation de litteratie IA, valeur juridique, contenu,
 * verification. Faits verifies le 29/07/2026 sur sources primaires :
 * reglement (UE) 2024/1689, article 4 (EUR-Lex) ; questions-reponses
 * "AI literacy" de la Commission europeenne
 * (digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers)
 * qui indique "There is no need for a certificate. Organisations can keep
 * an internal record of trainings and/or other guiding initiatives",
 * "There is no one size fit all when it comes to AI literacy and no strict
 * requirements or mandatory trainings are imposed", et "The supervision and
 * enforcement of Article 4 of the AI Act is not with the AI Office, but it
 * is under the remit of national market surveillance authorities. The
 * national market surveillance authorities will start supervising and
 * enforcing the rules as of 2 August 2026" ; depot vivant de la Commission
 * recensant plus de 40 initiatives de litteratie IA ; Digital Omnibus sur
 * l'IA adopte definitivement par le Conseil le 29/06/2026, qui reecrit
 * l'article 4 sans le supprimer (obligation de moyens, aucun niveau
 * specifique garanti pour une personne donnee).
 * Points de prudence : AUCUN certificat n'est requis, aucune formation type
 * n'est imposee, l'attestation est un MOYEN DE PREUVE et jamais une
 * "certification AI Act" ; article 4 applicable depuis le 2 fevrier 2025,
 * controle par les autorites nationales de surveillance du marche a partir
 * du 2 aout 2026 (JAMAIS la CNIL, qui reste sur le RGPD) ; ne jamais
 * evoquer Qualiopi ni un financement CPF/OPCO (les formations en ligne
 * TROIE ne sont finançables ni par le CPF ni par un OPCO).
 * ZERO em-dash.
 */

const SOURCE_URL =
  "https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers";

const FAQ = [
  {
    q: "Une attestation de littératie IA est-elle obligatoire ?",
    a: "Non. La Commission européenne écrit explicitement, dans ses questions-réponses sur la littératie IA, qu'aucun certificat n'est nécessaire et que les organisations peuvent tenir un registre interne de leurs formations et de leurs actions d'encadrement. L'article 4 du règlement (UE) 2024/1689 est une obligation de moyens : il demande de prendre des mesures, pas de détenir un document particulier. L'attestation n'est donc pas une obligation, c'est le moyen de preuve le plus simple et le plus lisible pour montrer que la mesure a bien été prise.",
  },
  {
    q: "Que doit contenir une attestation de formation à l'IA ?",
    a: "Sept mentions suffisent : le nom et le prénom de la personne formée, l'intitulé exact du parcours, la date d'obtention, la durée ou le volume de contenu suivi, les objectifs pédagogiques couverts, la nature de l'évaluation réussie, et l'identité de l'organisme qui émet le document. Ajoutez un identifiant unique et une adresse de vérification en ligne, car c'est ce qui distingue une attestation contrôlable d'un simple visuel exportable. Le document doit être nominatif : une attestation au nom de l'entreprise ne prouve rien sur les personnes qui utilisent réellement les outils d'IA.",
  },
  {
    q: "Où obtenir une attestation de littératie IA vérifiable ?",
    a: "Sur troie.app, la plateforme de formation de TROIE Studio, chaque parcours sur les usages de l'IA en entreprise se termine par un QCM et délivre, en cas de réussite, une attestation de formation nominative vérifiable en ligne par un lien public. L'abonnement est à 29 euros par mois ou 290 euros par an, avec un essai de 7 jours, et couvre l'ensemble du catalogue. Ces formations en ligne ne sont finançables ni par le CPF ni par un OPCO.",
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

export function AttestationLitteratieIa() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <p>
        Une attestation de littératie IA est un document nominatif qui prouve
        qu&apos;une personne a suivi et validé une formation aux usages de
        l&apos;intelligence artificielle. Elle n&apos;est obligatoire nulle
        part : la Commission européenne écrit noir sur blanc qu&apos;aucun
        certificat n&apos;est nécessaire au titre de l&apos;article 4 du
        règlement (UE) 2024/1689. Elle reste pourtant la pièce la plus simple à
        produire quand une autorité demande quelles mesures vous avez prises,
        parce qu&apos;elle est datée, nominative et vérifiable. Voici ce
        qu&apos;elle prouve réellement, ce qu&apos;elle ne prouve pas, et les
        sept mentions qu&apos;elle doit porter pour valoir quelque chose.
      </p>

      <div className="my-9 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
          En bref
        </p>
        <ul className="mt-4">
          <li>
            Aucun certificat n&apos;est exigé par l&apos;AI Act. La Commission
            européenne précise que les organisations peuvent simplement tenir
            un registre interne de leurs formations et de leurs actions
            d&apos;encadrement.
          </li>
          <li>
            L&apos;attestation est un moyen de preuve, pas un titre. Le mot
            « certification AI Act » n&apos;a aucune existence juridique et
            devrait vous alerter quand un vendeur l&apos;emploie.
          </li>
          <li>
            Elle vaut par sept mentions : identité de la personne, intitulé du
            parcours, date, durée, objectifs couverts, évaluation réussie,
            émetteur. Plus un identifiant et un lien de vérification.
          </li>
          <li>
            Elle ne suffit jamais seule. Un dossier crédible associe des
            attestations nominatives, un registre des usages de l&apos;IA et
            une charte interne. Les autorités nationales de surveillance du
            marché contrôlent depuis le 2 août 2026.
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

      <h2>Ce que dit exactement le texte</h2>
      <p>
        L&apos;article 4 du règlement (UE) 2024/1689, applicable depuis le 2
        février 2025, demande aux fournisseurs et aux déployeurs de systèmes
        d&apos;IA de prendre des mesures pour soutenir la maîtrise de l&apos;IA
        chez les personnes qui utilisent ces systèmes pour leur compte, en
        tenant compte de leurs connaissances techniques, de leur expérience, de
        leur formation et du contexte d&apos;utilisation. C&apos;est une
        obligation de moyens. Depuis la réécriture opérée par le Digital
        Omnibus sur l&apos;IA, adopté définitivement par le Conseil le 29 juin
        2026, le texte précise même que l&apos;obligation n&apos;impose pas de
        garantir un niveau de maîtrise déterminé pour une personne donnée.
      </p>
      <p>
        Dans ses questions-réponses sur la littératie IA, la Commission ajoute
        deux phrases qui règlent le débat. La première : « il n&apos;y a pas
        besoin de certificat, les organisations peuvent tenir un registre
        interne de leurs formations et de leurs autres initiatives
        d&apos;encadrement ». La seconde : aucune formation type n&apos;est
        imposée, il n&apos;existe pas de modèle unique en matière de littératie
        IA. Autrement dit, personne ne peut vous vendre le document
        obligatoire, puisqu&apos;il n&apos;y en a pas.
      </p>

      <h2>Alors pourquoi une attestation ?</h2>
      <p>
        Parce que l&apos;obligation de moyens a une contrepartie désagréable :
        c&apos;est à vous de démontrer les moyens. À partir du 2 août 2026, la
        supervision de l&apos;article 4 relève des autorités nationales de
        surveillance du marché désignées par chaque État membre. Le jour où la
        question est posée, la réponse « nous avons sensibilisé les équipes »
        ne pèse rien. Une liste de personnes, avec pour chacune un parcours
        identifié, une date et une évaluation réussie, pèse immédiatement.
      </p>
      <p>
        L&apos;attestation n&apos;a donc pas de valeur en elle-même. Elle a une
        valeur probatoire : elle transforme une intention en fait daté. C&apos;
        est exactement ce que la Commission décrit lorsqu&apos;elle parle de
        registre interne des formations, et son dépôt vivant recense d&apos;
        ailleurs plus de quarante initiatives de littératie IA menées par des
        entreprises et des organismes publics, sans qu&apos;aucune ne repose
        sur un certificat officiel.
      </p>

      <h2>Attestation, certificat, diplôme : ne confondez pas</h2>
      <p>
        <strong>L&apos;attestation de formation</strong> constate un fait :
        telle personne a suivi tel parcours à telle date et a validé telle
        évaluation. C&apos;est le bon terme, et le seul qui soit exact ici.
      </p>
      <p>
        <strong>La certification</strong> suppose un référentiel reconnu et un
        organisme certificateur habilité. Il n&apos;existe aujourd&apos;hui
        aucune certification officielle de conformité à l&apos;article 4 de
        l&apos;AI Act, ni pour les personnes, ni pour les entreprises. Une
        offre qui promet une « certification AI Act » vend un mot qui
        n&apos;existe pas.
      </p>
      <p>
        <strong>Le diplôme</strong> relève du système éducatif et sanctionne un
        cursus. Rien de tout cela n&apos;est demandé par le règlement.
      </p>
      <p>
        Un dernier point, souvent source de malentendus en France : la question
        du financement est indépendante de la conformité. Les formations en
        ligne de TROIE ne sont finançables ni par le CPF ni par un OPCO, et
        cela ne change rien à leur valeur de preuve au titre de l&apos;article
        4, puisque le règlement n&apos;impose aucun format ni aucun
        référencement particulier. Pour situer les ordres de prix du marché,
        notre{" "}
        <a
          href="https://troie.app/blog/prix-formation-ai-act-comparatif"
          target="_blank"
          rel="noopener"
        >
          comparatif des prix de la formation AI Act
        </a>{" "}
        compare les offres disponibles.
      </p>

      <h2>Les sept mentions qui font une attestation utile</h2>
      <p>
        <strong>1. L&apos;identité de la personne formée.</strong> Nom, prénom.
        Une attestation collective au nom de la société ne prouve rien : le
        texte porte sur les personnes qui utilisent les systèmes d&apos;IA.
      </p>
      <p>
        <strong>2. L&apos;intitulé exact du parcours.</strong> Pas
        « sensibilisation à l&apos;IA », mais l&apos;intitulé précis, celui qui
        permet de savoir ce qui a été couvert.
      </p>
      <p>
        <strong>3. La date d&apos;obtention.</strong> La pièce maîtresse. Une
        preuve sans date ne se rattache à aucune échéance et ne démontre aucune
        antériorité.
      </p>
      <p>
        <strong>4. La durée ou le volume suivi.</strong> Un ordre de grandeur
        honnête. Deux heures assumées valent mieux qu&apos;une durée gonflée
        que personne ne pourra recouper.
      </p>
      <p>
        <strong>5. Les objectifs pédagogiques couverts.</strong> Trois à six
        lignes suffisent : reconnaître un usage à risque, protéger les données
        saisies, vérifier une réponse générée, signaler un contenu produit par
        IA. C&apos;est cette rubrique qui montre l&apos;adéquation entre la
        formation et les usages réels de la personne, ce que l&apos;article 4
        demande expressément de prendre en compte.
      </p>
      <p>
        <strong>6. La nature de l&apos;évaluation.</strong> Une attestation de
        présence prouve qu&apos;une vidéo a tourné. Une attestation adossée à
        un examen réussi prouve qu&apos;un contenu a été assimilé. La
        différence est visible immédiatement par un contrôleur.
      </p>
      <p>
        <strong>7. L&apos;émetteur et la vérifiabilité.</strong> Qui délivre le
        document, avec un identifiant unique et une adresse permettant de le
        vérifier en ligne. Sans cela, une attestation reste un fichier que
        n&apos;importe qui peut refaire.
      </p>

      <h2>Vérifiable, et pourquoi cela compte</h2>
      <p>
        Une attestation vérifiable porte un identifiant et renvoie vers une
        page publique qui confirme, sans divulguer davantage, que ce document a
        bien été émis pour cette personne à cette date. C&apos;est une exigence
        de bon sens, à l&apos;heure où un PDF se falsifie en trois minutes, et
        c&apos;est aussi ce qui rend le dossier présentable à un tiers : un
        client, un donneur d&apos;ordre, un assureur, une autorité.
      </p>
      <p>
        Sur{" "}
        <a href="https://troie.app" target="_blank" rel="noopener">
          troie.app
        </a>
        , la plateforme de formation de TROIE Studio, chaque parcours se
        termine par un QCM et délivre, en cas de réussite, une attestation de
        formation nominative, datée, téléchargeable en PDF et vérifiable par un
        lien public. Elle documente la mesure prise au titre de l&apos;article 4
        du règlement (UE) 2024/1689 sur la littératie IA, applicable depuis le 2
        février 2025 et contrôlable depuis le 2 août 2026. L&apos;abonnement
        est à 29 euros par mois ou 290 euros par an, avec un essai de 7 jours.
      </p>

      <h2>Ce que l&apos;attestation ne prouve pas</h2>
      <p>
        Elle ne prouve pas que votre entreprise est conforme à l&apos;AI Act.
        L&apos;article 4 n&apos;est qu&apos;une obligation parmi d&apos;autres,
        et une organisation qui exploite un système à haut risque ou un
        chatbot en contact avec le public a des devoirs supplémentaires.
      </p>
      <p>
        Elle ne prouve pas non plus que les pratiques ont changé. Un salarié
        peut réussir un QCM le lundi et coller un fichier client dans un outil
        grand public le mardi. C&apos;est pourquoi la charte d&apos;usage
        interne et la règle de relecture humaine comptent autant que la
        formation elle-même.
      </p>
      <p>
        Enfin, elle ne se périme pas officiellement, puisqu&apos;aucune durée de
        validité n&apos;est fixée par le règlement. En pratique, une trace de
        plus de dix-huit mois sur un sujet qui bouge chaque trimestre convainc
        mal. Prévoyez une remise à niveau annuelle et l&apos;intégration des
        nouveaux arrivants dans le mois qui suit leur arrivée.
      </p>

      <h2>Le dossier complet, en trois pièces</h2>
      <p>
        <strong>Les attestations nominatives</strong>, une par personne exposée
        aux outils d&apos;IA, avec la date et l&apos;évaluation.
      </p>
      <p>
        <strong>Le registre des usages de l&apos;IA</strong>, qui liste les
        outils, les services concernés, les données saisies et le niveau de
        risque. Notre{" "}
        <Link href="/blog/registre-des-usages-ia-modele">
          modèle de registre en huit colonnes
        </Link>{" "}
        se remplit en une heure.
      </p>
      <p>
        <strong>La charte d&apos;usage interne</strong>, une page qui dit ce qui
        est autorisé, ce qui ne l&apos;est jamais et qui relit quoi avant
        publication.
      </p>
      <p>
        Ces trois pièces, rangées au même endroit et datées, répondent à la
        seule question qui sera posée : pouvez-vous démontrer que vous avez pris
        des mesures. Le détail des mesures acceptables figure dans notre article
        sur les{" "}
        <Link href="/blog/article-4-ai-act-exemples-mesures">
          exemples concrets de mesures de littératie IA
        </Link>
        .
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
        Listez les personnes qui utilisent réellement des outils d&apos;IA dans
        votre organisation, formez-les, gardez la trace nominative. C&apos;est
        toute la logique de l&apos;article 4, et cela se fait en quelques jours
        plutôt qu&apos;en quelques mois. Notre page sur l&apos;
        <Link href="/ia/ai-act">AI Act</Link> résume les échéances, notre
        article sur{" "}
        <Link href="/blog/ai-act-sanctions-entreprise">
          les sanctions de l&apos;AI Act
        </Link>{" "}
        précise ce que vous risquez vraiment, et TROIE Studio propose un{" "}
        <Link href="/contact?subject=ai-act">audit gratuit de 30 minutes</Link>{" "}
        pour situer vos obligations réelles.
      </p>

      <p>
        <em>
          Sources : règlement (UE) 2024/1689 (AI Act), article 4 sur la maîtrise
          de l&apos;IA, EUR-Lex ; questions-réponses sur la littératie IA
          publiées par la Commission européenne
          (digital-strategy.ec.europa.eu), pour l&apos;absence de certificat
          requis, l&apos;absence de formation type imposée, le registre interne
          des formations, le dépôt vivant des initiatives de littératie IA et le
          contrôle par les autorités nationales de surveillance du marché à
          partir du 2 août 2026 ; Digital Omnibus sur l&apos;IA, adopté
          définitivement par le Conseil de l&apos;Union européenne le 29 juin
          2026, pour la réécriture de l&apos;article 4. Faits vérifiés le 29
          juillet 2026. Cette page est une synthèse pédagogique, pas un conseil
          juridique.
        </em>
      </p>
    </>
  );
}
