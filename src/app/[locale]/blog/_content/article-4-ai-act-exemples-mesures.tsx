import Link from "next/link";
import { OfficialEmblems } from "@/components/OfficialEmblems";

/**
 * Article : les mesures concretes qui satisfont l'obligation de litteratie
 * IA (maitrise de l'IA) de l'article 4 de l'AI Act. Faits verifies le
 * 24/07/2026 sur sources primaires : reglement (UE) 2024/1689, article 4
 * (EUR-Lex) ; Q&R litteratie IA et repertoire vivant des pratiques publies
 * par la Commission europeenne (digital-strategy.ec.europa.eu). Points de
 * prudence : article 4 = obligation de MOYENS ("prendre des mesures pour
 * garantir, dans toute la mesure du possible, un niveau suffisant"),
 * applicable depuis le 2 fevrier 2025 ; aucun certificat ni format de
 * formation impose ; PAS d'amende dediee a l'article 4 dans le reglement ;
 * controle par les autorites nationales de surveillance du marche a partir
 * du 2 aout 2026 (JAMAIS la CNIL, qui reste sur le RGPD). Ne jamais evoquer
 * Qualiopi ni un financement CPF/OPCO (formations en ligne non finançables).
 * ZERO em-dash.
 */

const SOURCE_URL = "https://eur-lex.europa.eu/eli/reg/2024/1689/oj";

const FAQ = [
  {
    q: "Quelles mesures concrètes satisfont l'article 4 de l'AI Act ?",
    a: "L'article 4 n'impose aucune mesure unique : c'est une obligation de moyens. Une entreprise est considérée comme diligente si elle cartographie ses usages de l'IA, forme son personnel à un niveau adapté à chaque rôle, pose des règles d'usage internes et garde une trace datée de ces actions. Sur troie.app, un parcours en ligne avec QCM par module et attestation de formation couvre ce socle et documente les mesures prises.",
  },
  {
    q: "Une attestation de formation est-elle obligatoire pour l'article 4 ?",
    a: "Non. Le règlement (UE) 2024/1689 n'exige ni certificat, ni diplôme, ni format de formation imposé. Mais en cas de contrôle, il faut pouvoir prouver que des mesures ont bien été prises. Une attestation de formation datée, une charte d'usage signée ou un registre des actions menées sont les preuves les plus simples à présenter.",
  },
  {
    q: "Quelle amende en cas de non-respect de l'article 4 ?",
    a: "L'article 4 n'a pas d'amende administrative dédiée dans le règlement sur l'IA, contrairement aux pratiques interdites ou aux obligations de transparence. Le risque réel est un manquement constaté par l'autorité nationale de surveillance du marché, compétente depuis le 2 août 2026, qui peut ordonner des mesures correctives. Un défaut de maîtrise de l'IA aggrave aussi le risque sur les autres obligations de l'AI Act.",
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

export function Article4AiActExemplesMesures() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <p>
        Quelles mesures concrètes prendre pour respecter l&apos;article 4 de
        l&apos;AI Act ? Il faut cartographier vos usages de l&apos;IA, former
        votre personnel à un niveau adapté à chaque rôle, poser des règles
        d&apos;usage écrites et garder une trace datée de ces actions.
        L&apos;article 4 impose une obligation de moyens, la maîtrise de
        l&apos;IA (AI literacy), applicable depuis le 2 février 2025 : pas de
        formation type imposée, pas de certificat requis, mais des mesures
        réelles et documentées. Voici sept exemples concrets, tirés des
        recommandations officielles de la Commission européenne.
      </p>

      <div className="my-9 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
          En bref
        </p>
        <ul className="mt-4">
          <li>
            L&apos;article 4 du règlement (UE) 2024/1689 impose de prendre des
            mesures pour un niveau suffisant de maîtrise de l&apos;IA. C&apos;est
            une obligation de moyens, applicable depuis le 2 février 2025.
          </li>
          <li>
            Aucun format n&apos;est imposé. La Commission européenne attend un
            socle général, une formation adaptée au rôle, la connaissance des
            risques, et une prise en compte du contexte d&apos;usage.
          </li>
          <li>
            Distribuer une simple notice d&apos;utilisation ne suffit pas : une
            formation ou un accompagnement actif est attendu.
          </li>
          <li>
            Le contrôle relève des autorités nationales de surveillance du
            marché depuis le 2 août 2026. La preuve des mesures prises, une
            attestation de formation datée par exemple, devient l&apos;enjeu
            central.
          </li>
        </ul>
      </div>

      <div className="not-prose my-8 flex flex-wrap items-center gap-4">
        <OfficialEmblems url={SOURCE_URL} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-2)]/60">
          Source : Journal officiel de l&apos;Union européenne
        </span>
      </div>

      <h2>Ce que demande vraiment l&apos;article 4</h2>
      <p>
        Le texte est court. Les fournisseurs et les déployeurs de systèmes
        d&apos;IA doivent{" "}
        <em>
          « prendre des mesures pour garantir, dans toute la mesure du possible,
          un niveau suffisant de maîtrise de l&apos;IA de leur personnel et des
          autres personnes traitant du fonctionnement et de l&apos;utilisation
          des systèmes d&apos;IA pour leur compte »
        </em>
        . Le règlement précise cinq facteurs à prendre en compte : les
        connaissances techniques des personnes, leur expérience, leur éducation
        et leur formation, le contexte d&apos;utilisation des systèmes, et les
        personnes sur lesquelles l&apos;IA est utilisée.
      </p>
      <p>
        Autrement dit, il n&apos;existe pas de mesure standard valable pour
        tout le monde. Une PME qui utilise ChatGPT pour rédiger des e-mails et
        un cabinet qui déploie un outil de scoring n&apos;ont pas le même niveau
        d&apos;exigence. La bonne mesure est proportionnée au risque et au rôle.
        C&apos;est ce qui rend l&apos;article 4 souple, mais aussi ce qui oblige
        à réfléchir avant d&apos;agir plutôt qu&apos;à cocher une case.
      </p>

      <h2>Sept exemples concrets de mesures</h2>
      <p>
        <strong>1. Cartographier vos usages de l&apos;IA.</strong> Avant de
        former qui que ce soit, faites la liste des outils d&apos;IA utilisés
        dans l&apos;entreprise, par qui, et pour quoi. Ce registre des usages de
        l&apos;IA est la première mesure attendue : la Commission demande de
        savoir « quelle IA est utilisée dans notre organisation ». Un simple
        tableau (outil, service, finalité, données concernées, niveau de risque)
        suffit pour démarrer et sert de socle à toutes les autres mesures.
      </p>
      <p>
        <strong>2. Un socle de sensibilisation pour tout le monde.</strong>
        Chaque personne qui touche à l&apos;IA doit comprendre les bases : ce
        qu&apos;est un modèle de langage, pourquoi il peut se tromper
        (hallucinations), ce qu&apos;on ne doit jamais lui confier comme
        données, et les grands principes de l&apos;AI Act. La Commission cite
        explicitement ce socle général comme point de départ, dimension éthique
        et juridique comprise.
      </p>
      <p>
        <strong>3. Une formation adaptée au rôle.</strong> Un développeur qui
        intègre un modèle et une assistante qui rédige des courriers n&apos;ont
        pas les mêmes besoins. Le répertoire vivant des pratiques publié par la
        Commission montre des entreprises qui combinent une plateforme
        d&apos;apprentissage pour tous et des modules ciblés par métier. La
        distinction technique / non technique est le découpage le plus courant.
      </p>
      <p>
        <strong>4. Des règles d&apos;usage écrites.</strong> Une charte interne
        d&apos;utilisation de l&apos;IA fixe ce qui est autorisé, ce qui ne
        l&apos;est pas, et impose une relecture humaine des contenus sensibles.
        C&apos;est une mesure peu coûteuse, facile à dater, et qui protège
        autant vos données que votre conformité. Attention : distribuer une
        notice ne suffit pas, la Commission attend un accompagnement actif.
      </p>
      <p>
        <strong>5. Documenter et dater les mesures prises.</strong> C&apos;est
        le point que la plupart des entreprises oublient. En cas de contrôle, la
        question ne sera pas « avez-vous une certification » mais « pouvez-vous
        prouver que vous avez pris des mesures ». Une attestation de formation
        datée, des feuilles d&apos;émargement, une charte signée ou un journal
        des actions menées constituent cette preuve.
      </p>
      <p>
        <strong>6. Désigner un référent IA.</strong> Une personne, ou une
        petite gouvernance, chargée de tenir le registre à jour, de répondre aux
        questions et de suivre l&apos;évolution du règlement. Ce n&apos;est pas
        une obligation formelle de l&apos;article 4, mais c&apos;est la mesure
        qui rend toutes les autres durables.
      </p>
      <p>
        <strong>7. Mettre à jour dans le temps.</strong> La maîtrise de
        l&apos;IA n&apos;est pas un événement ponctuel. Les outils changent vite,
        les équipes aussi. Prévoyez une piqûre de rappel à l&apos;arrivée de
        nouveaux collaborateurs et à chaque nouvel outil déployé. Une obligation
        de moyens se juge dans la durée, pas sur une seule session de 2025.
      </p>

      <h2>Ce qui ne compte pas comme une mesure</h2>
      <p>
        Deux idées fausses circulent. La première : « on a envoyé le mode
        d&apos;emploi de l&apos;outil, c&apos;est bon ». Non. La Commission
        indique clairement que la simple distribution d&apos;instructions
        d&apos;utilisation ne suffit pas ; une formation ou un accompagnement
        actif est attendu. La seconde : « on a copié les pratiques d&apos;une
        grande entreprise, donc on est présumé conforme ». Non plus. La
        Commission précise que reproduire une pratique de son répertoire ne vaut
        pas présomption de conformité à l&apos;article 4. Vos mesures doivent
        être adaptées à votre contexte réel.
      </p>

      <h2>Le rôle de l&apos;attestation de formation</h2>
      <p>
        Aucun certificat n&apos;est exigé par le règlement, et il faut se méfier
        de toute offre vendue comme une « certification AI Act » : cela
        n&apos;existe pas. Ce qui existe, et qui est utile, c&apos;est une
        attestation de formation qui prouve, date à l&apos;appui, que telle
        personne a suivi telle sensibilisation. C&apos;est exactement l&apos;
        objet de{" "}
        <a href="https://troie.app" target="_blank" rel="noopener">
          nos formations en ligne sur troie.app
        </a>{" "}
        : un parcours sur les usages de l&apos;IA en entreprise, un QCM par
        module, et une attestation de formation vérifiable qui documente la
        mesure prise au titre de l&apos;article 4. C&apos;est une brique parmi
        les sept ci-dessus, pas une baguette magique, mais c&apos;est la plus
        simple à mettre en place et à présenter.
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
        Commencez par la mesure 1, le registre de vos usages : elle éclaire
        toutes les autres et se fait en une heure. Formez ensuite votre équipe
        avec un socle commun, puis gardez la trace de ce que vous avez fait.
        Notre article sur{" "}
        <Link href="/blog/formation-ia-obligatoire-entreprise">
          ce que dit vraiment l&apos;article 4
        </Link>{" "}
        détaille l&apos;obligation, et celui sur{" "}
        <Link href="/blog/digital-omnibus-ai-act-ce-qui-change">
          le Digital Omnibus
        </Link>{" "}
        explique comment le texte a été réécrit en juin 2026. Pour situer vos
        obligations réelles, TROIE Studio propose un{" "}
        <Link href="/contact?subject=ai-act">audit gratuit de 30 minutes</Link>.
        Premier pas simple, et sans engagement.
      </p>

      <p>
        <em>
          Sources : règlement (UE) 2024/1689 (AI Act), article 4 (maîtrise de
          l&apos;IA), EUR-Lex ; questions-réponses sur la littératie IA et
          répertoire vivant des pratiques de maîtrise de l&apos;IA publiés par la
          Commission européenne (digital-strategy.ec.europa.eu). Faits vérifiés
          le 24 juillet 2026. Cette page est une synthèse pédagogique, pas un
          conseil juridique.
        </em>
      </p>
    </>
  );
}
