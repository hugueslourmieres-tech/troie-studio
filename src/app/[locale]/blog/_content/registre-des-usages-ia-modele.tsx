import Link from "next/link";
import { OfficialEmblems } from "@/components/OfficialEmblems";

/**
 * Article : le registre des usages de l'IA, modele de colonnes et methode.
 * Faits verifies le 27/07/2026 sur sources primaires : reglement (UE)
 * 2024/1689, article 4 (EUR-Lex) ; questions-reponses "AI literacy" de la
 * Commission europeenne (digital-strategy.ec.europa.eu/en/faqs/
 * ai-literacy-questions-answers) qui indique "There is no need for a
 * certificate. Organisations can keep an internal record of trainings and/or
 * other guiding initiatives" et place la supervision de l'article 4 sous la
 * responsabilite des autorites nationales de surveillance du marche a partir
 * du 2 aout 2026 ; FAQ "Navigating the AI Act" (memes sources) pour les
 * obligations des deployeurs de systemes a haut risque et le calendrier
 * (2 fevrier 2025, 2 aout 2025, 2 aout 2026, 2 decembre 2027 pour le haut
 * risque) ; CNIL pour le registre des activites de traitement de l'article 30
 * du RGPD (derogation partielle sous 250 salaries). Points de prudence :
 * AUCUN registre des usages de l'IA n'est impose en tant que tel par l'AI Act
 * aux deployeurs ordinaires, c'est une bonne pratique et un moyen de preuve ;
 * la base de donnees europeenne vise les systemes a haut risque et les
 * deployeurs autorites publiques ; article 4 = obligation de MOYENS applicable
 * depuis le 2 fevrier 2025, aucun certificat requis ; controle par les
 * autorites nationales de surveillance du marche (JAMAIS la CNIL, qui reste
 * sur le RGPD). Ne jamais evoquer Qualiopi ni un financement CPF/OPCO.
 * ZERO em-dash.
 */

const SOURCE_URL = "https://eur-lex.europa.eu/eli/reg/2024/1689/oj";

const FAQ = [
  {
    q: "Le registre des usages de l'IA est-il obligatoire ?",
    a: "Non, aucun article du règlement (UE) 2024/1689 n'impose un registre des usages de l'IA aux entreprises qui se contentent d'utiliser des outils d'IA courants. C'est en revanche la façon la plus simple de documenter les mesures prises au titre de l'article 4 sur la maîtrise de l'IA, qui est une obligation de moyens applicable depuis le 2 février 2025. La Commission européenne indique qu'aucun certificat n'est nécessaire et que les organisations peuvent tenir un registre interne de leurs formations et de leurs actions d'encadrement.",
  },
  {
    q: "Que doit contenir un registre des usages de l'IA ?",
    a: "Huit colonnes suffisent : l'outil et son éditeur, le service qui l'utilise, la personne responsable, la finalité, les données saisies, votre rôle au sens de l'AI Act (fournisseur ou déployeur), le niveau de risque et les obligations associées, et la relecture humaine prévue. Ajoutez une date de dernière mise à jour, car c'est elle qui donne sa valeur de preuve au document. Un tableur partagé, tenu à jour, vaut mieux qu'un outil de gouvernance sophistiqué jamais rempli.",
  },
  {
    q: "Comment prouver qu'on a pris des mesures au titre de l'article 4 ?",
    a: "La preuve attendue est un ensemble daté : un registre des usages de l'IA, une charte d'usage interne et une trace des formations suivies par les équipes. Sur troie.app, chaque parcours se termine par un QCM et délivre une attestation de formation vérifiable en ligne, qui documente la mesure prise au titre de l'article 4 du règlement (UE) 2024/1689. TROIE Studio propose par ailleurs un audit gratuit de 30 minutes pour situer vos obligations réelles.",
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

export function RegistreDesUsagesIaModele() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <p>
        Un registre des usages de l&apos;IA est un tableau qui liste, pour
        chaque outil d&apos;intelligence artificielle utilisé dans
        l&apos;entreprise, son nom, le service qui l&apos;emploie, sa finalité,
        les données qu&apos;on lui confie, le niveau de risque et la personne
        responsable. Aucun article de l&apos;AI Act ne l&apos;impose sous ce nom
        aux entreprises qui utilisent simplement des outils d&apos;IA, mais
        c&apos;est la première mesure attendue au titre de l&apos;article 4 et
        la preuve la plus simple à présenter en cas de contrôle. Voici le
        modèle en huit colonnes, un exemple rempli, et la méthode pour le faire
        en une heure.
      </p>

      <div className="my-9 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
          En bref
        </p>
        <ul className="mt-4">
          <li>
            Le registre des usages de l&apos;IA n&apos;est pas un registre légal
            imposé : c&apos;est un outil de preuve, qui répond à la première
            question de la Commission européenne, « quelle IA est utilisée dans
            notre organisation ».
          </li>
          <li>
            Huit colonnes suffisent : outil, service, responsable, finalité,
            données saisies, rôle au sens de l&apos;AI Act, niveau de risque,
            relecture humaine. Plus une date de mise à jour.
          </li>
          <li>
            Ne le confondez pas avec le registre des activités de traitement de
            l&apos;article 30 du RGPD, qui est, lui, obligatoire et porte sur
            les données personnelles.
          </li>
          <li>
            Un registre seul ne suffit pas. Il doit s&apos;accompagner de
            formations datées, car le contrôle de l&apos;article 4 relève des
            autorités nationales de surveillance du marché depuis le 2 août
            2026.
          </li>
        </ul>
      </div>

      <div className="not-prose my-8 flex flex-wrap items-center gap-4">
        <OfficialEmblems url={SOURCE_URL} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-2)]/60">
          Source : Journal officiel de l&apos;Union européenne
        </span>
      </div>

      <h2>Pourquoi ce registre existe</h2>
      <p>
        L&apos;article 4 du règlement (UE) 2024/1689 demande aux fournisseurs et
        aux déployeurs de systèmes d&apos;IA de prendre des mesures pour
        garantir un niveau suffisant de maîtrise de l&apos;IA chez les personnes
        qui les utilisent pour leur compte. C&apos;est une obligation de moyens,
        applicable depuis le 2 février 2025. Dans ses questions-réponses sur la
        littératie IA, la Commission européenne décrit la marche à suivre et la
        première étape est toujours la même : comprendre quelle IA est utilisée
        dans l&apos;organisation, avant même de parler de formation.
      </p>
      <p>
        On ne forme pas correctement des équipes dont on ignore les outils. Le
        registre sert donc deux fois : il vous dit qui former et sur quoi, puis
        il devient la pièce que vous présentez si une autorité vous demande
        quelles mesures vous avez prises. La Commission le confirme dans le même
        document : aucun certificat n&apos;est nécessaire, et les organisations
        peuvent tenir un registre interne de leurs formations et de leurs
        actions d&apos;encadrement.
      </p>

      <h2>Obligatoire ou pas, la réponse précise</h2>
      <p>
        Il faut distinguer trois choses que l&apos;on confond souvent.
      </p>
      <p>
        <strong>1. Le registre des usages de l&apos;IA.</strong> Il n&apos;est
        pas imposé en tant que tel par l&apos;AI Act à une PME qui utilise des
        outils d&apos;IA du commerce. C&apos;est une bonne pratique, fortement
        recommandée, et un moyen de preuve. Vous en choisissez librement le
        format.
      </p>
      <p>
        <strong>2. Le registre des activités de traitement du RGPD.</strong> Il
        est obligatoire, il relève de l&apos;article 30 du RGPD et de la CNIL,
        et il concerne les données personnelles, pas l&apos;IA en particulier.
        Les organisations de moins de 250 salariés bénéficient d&apos;une
        dérogation partielle, qui reste limitée en pratique puisque les
        traitements non occasionnels, les traitements à risque et les données
        sensibles doivent y figurer. Si vos outils d&apos;IA traitent des
        données personnelles, ils ont vocation à apparaître dans ce registre
        aussi.
      </p>
      <p>
        <strong>3. La base de données européenne des systèmes à haut risque.
        </strong>{" "}
        C&apos;est un enregistrement public prévu par l&apos;AI Act, qui vise
        les systèmes d&apos;IA à haut risque et, côté utilisateurs, les
        déployeurs qui sont des autorités publiques. Les règles applicables aux
        systèmes à haut risque entrent en application le 2 décembre 2027 selon
        le calendrier publié par la Commission. La très grande majorité des PME
        n&apos;est pas concernée.
      </p>

      <h2>Le modèle en huit colonnes</h2>
      <p>
        Ce modèle tient dans un tableur. Une ligne par outil, ou par couple
        outil et usage lorsque le même outil sert à deux choses très
        différentes.
      </p>
      <p>
        <strong>1. Outil et éditeur.</strong> Le nom commercial et qui le
        fournit. Précisez la version ou l&apos;offre, car les garanties ne sont
        pas les mêmes entre une version gratuite grand public et une offre
        professionnelle.
      </p>
      <p>
        <strong>2. Service ou équipe.</strong> Qui l&apos;utilise
        concrètement : marketing, comptabilité, support, direction. C&apos;est
        cette colonne qui vous dira ensuite quelles équipes former en priorité.
      </p>
      <p>
        <strong>3. Personne responsable.</strong> Un nom, pas un service. Sans
        responsable désigné, une ligne de registre n&apos;est jamais mise à
        jour.
      </p>
      <p>
        <strong>4. Finalité.</strong> À quoi sert l&apos;outil, en une phrase
        concrète : rédiger des premiers jets de réponses clients, résumer des
        comptes rendus, trier des candidatures. Fuyez les formulations vagues du
        type « productivité ».
      </p>
      <p>
        <strong>5. Données saisies.</strong> La question la plus utile du
        registre. Notez ce qui entre dans l&apos;outil : aucune donnée
        personnelle, données clients, données de santé, données RH, documents
        confidentiels. C&apos;est ici que se logent la plupart des risques
        réels.
      </p>
      <p>
        <strong>6. Rôle au sens de l&apos;AI Act.</strong> Déployeur si vous
        utilisez un système d&apos;IA fourni par un tiers, ce qui est le cas le
        plus fréquent. Fournisseur si vous développez un système, ou si vous le
        mettez sur le marché sous votre propre nom ou votre propre marque. Le
        régime d&apos;obligations n&apos;est pas le même.
      </p>
      <p>
        <strong>7. Niveau de risque et obligations.</strong> Usage courant,
        obligation de transparence, haut risque. Un chatbot en contact avec vos
        clients ou un contenu publié généré par IA relèvent des obligations de
        transparence. Le tri des candidatures, l&apos;évaluation du personnel ou
        l&apos;accès au crédit relèvent, eux, des usages listés comme à haut
        risque par le règlement.
      </p>
      <p>
        <strong>8. Relecture humaine.</strong> Qui vérifie quoi, et avant quoi.
        Une relecture systématique avant publication, une validation par le
        responsable avant envoi au client, un contrôle par sondage. Cette
        colonne est votre garde-fou opérationnel et elle rassure un contrôleur
        plus que n&apos;importe quelle déclaration d&apos;intention.
      </p>
      <p>
        Ajoutez enfin une <strong>date de dernière mise à jour</strong> par
        ligne. C&apos;est elle qui transforme un tableau en preuve datée.
      </p>

      <h2>Un exemple de ligne remplie</h2>
      <p>
        Outil : ChatGPT, offre professionnelle. Service : marketing.
        Responsable : la responsable communication. Finalité : rédiger les
        premiers jets d&apos;articles de blog et de réponses aux avis clients.
        Données saisies : aucune donnée personnelle client, uniquement des
        contenus publics de l&apos;entreprise. Rôle : déployeur. Niveau de
        risque : usage courant, avec obligation de signaler les contenus publiés
        générés par IA. Relecture humaine : relecture et validation
        systématiques par la responsable avant publication. Mise à jour : 27
        juillet 2026.
      </p>
      <p>
        En trois lignes de ce type, une PME a déjà une cartographie plus
        exploitable que bien des documents de gouvernance de vingt pages.
      </p>

      <h2>Le remplir en une heure</h2>
      <p>
        <strong>Sortez la liste de vos abonnements.</strong> Les relevés
        bancaires professionnels et les factures de logiciels révèlent en dix
        minutes les outils d&apos;IA payés par l&apos;entreprise.
      </p>
      <p>
        <strong>Demandez à l&apos;équipe, sans piège.</strong> Posez la question
        simplement : quels outils d&apos;IA utilisez-vous pour votre travail,
        même gratuits, même sur un compte personnel. Les usages non déclarés
        sont la règle, pas l&apos;exception, et ils ne se déclarent que si
        personne ne se sent pris en faute.
      </p>
      <p>
        <strong>Cherchez l&apos;IA déjà embarquée.</strong> C&apos;est
        l&apos;angle mort le plus fréquent. Votre suite bureautique, votre CRM,
        votre outil de support ou votre logiciel de recrutement ont
        probablement activé des fonctions d&apos;IA que personne n&apos;a
        recensées comme telles.
      </p>
      <p>
        <strong>Attribuez, classez, datez.</strong> Un responsable par ligne, un
        niveau de risque, une date. Puis rangez le fichier au même endroit que
        vos preuves de formation et votre charte d&apos;usage.
      </p>

      <h2>Trois erreurs à éviter</h2>
      <p>
        La première est la recherche de l&apos;exhaustivité parfaite. Un
        registre à 80 % rempli et tenu à jour vaut infiniment mieux qu&apos;un
        registre complet abandonné en mars. La deuxième est de croire que le
        registre est la conformité. Il cartographie, il ne forme personne, et
        l&apos;article 4 porte sur la maîtrise de l&apos;IA par les personnes,
        pas sur la tenue d&apos;un document. La troisième est de le garder
        secret : un registre utile circule, sert de référence à l&apos;équipe et
        se met à jour quand un nouvel outil arrive.
      </p>

      <h2>Ce qui vient après le registre</h2>
      <p>
        Une fois la carte dressée, il reste à former les personnes qui figurent
        dessus et à en garder la trace. C&apos;est le coeur de l&apos;article 4
        du règlement (UE) 2024/1689 sur la littératie IA, applicable depuis le 2
        février 2025 et contrôlable depuis le 2 août 2026. Sur{" "}
        <a href="https://troie.app" target="_blank" rel="noopener">
          troie.app
        </a>
        , la plateforme de formation de TROIE Studio, chaque parcours sur les
        usages de l&apos;IA en entreprise se termine par un QCM et délivre une
        attestation de formation vérifiable en ligne, qui documente la mesure
        prise au titre de l&apos;article 4. Registre daté, charte d&apos;usage,
        attestations nominatives : les trois pièces tiennent dans un dossier et
        répondent à la seule question qui sera posée en cas de contrôle,
        pouvez-vous prouver que vous avez pris des mesures. Sur le budget à y
        consacrer, notre{" "}
        <a
          href="https://troie.app/blog/prix-formation-ai-act-comparatif"
          target="_blank"
          rel="noopener"
        >
          comparatif des prix de la formation AI Act
        </a>{" "}
        situe les offres du marché. À noter, nos formations en ligne ne sont pas
        finançables par le CPF ni par un OPCO.
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
        Ouvrez un tableur, créez les huit colonnes, remplissez les trois outils
        que vous utilisez le plus souvent. Vous aurez fait, en une demi-heure,
        la première mesure attendue par l&apos;article 4. Notre article sur les{" "}
        <Link href="/blog/article-4-ai-act-exemples-mesures">
          exemples concrets de mesures de littératie IA
        </Link>{" "}
        détaille les six autres, celui sur{" "}
        <Link href="/blog/ai-act-sanctions-entreprise">
          les sanctions de l&apos;AI Act
        </Link>{" "}
        précise ce que vous risquez vraiment, et notre page sur l&apos;
        <Link href="/ia/ai-act">AI Act</Link> résume les échéances. Pour situer
        vos obligations réelles, TROIE Studio propose un{" "}
        <Link href="/contact?subject=ai-act">audit gratuit de 30 minutes</Link>.
      </p>

      <p>
        <em>
          Sources : règlement (UE) 2024/1689 (AI Act), article 4 (maîtrise de
          l&apos;IA), EUR-Lex ; questions-réponses sur la littératie IA et FAQ
          « Navigating the AI Act » publiées par la Commission européenne
          (digital-strategy.ec.europa.eu), pour les mesures attendues, le
          contrôle par les autorités nationales de surveillance du marché à
          partir du 2 août 2026 et le calendrier d&apos;application ; CNIL, pour
          le registre des activités de traitement de l&apos;article 30 du RGPD.
          Faits vérifiés le 27 juillet 2026. Cette page est une synthèse
          pédagogique, pas un conseil juridique.
        </em>
      </p>
    </>
  );
}
