import Link from "next/link";
import { OfficialEmblems } from "@/components/OfficialEmblems";

/**
 * Article : financer une formation AI Act par le CPF ou un OPCO, ce que
 * les dispositifs couvrent vraiment en 2026.
 * Faits verifies le 16/09/2026 sur sources primaires :
 * - reglement (UE) 2024/1689 (AI Act), article 4 (maitrise de l'IA,
 *   obligation de MOYENS applicable depuis le 02/02/2025), EUR-Lex ;
 * - questions-reponses "AI literacy" de la Commission europeenne
 *   (digital-strategy.ec.europa.eu) : pas de certificat necessaire, pas de
 *   formation imposee, registre interne possible, supervision par les
 *   autorites nationales de surveillance du marche a partir du 02/08/2026 ;
 * - code du travail, article L. 6323-6 (actions eligibles au CPF :
 *   certifications enregistrees au RNCP, blocs de competences, repertoire
 *   specifique) et L. 6323-2 (accord expres du titulaire) ;
 * - service-public.gouv.fr, actualite A17364 mise a jour le 02/04/2026 :
 *   participation forfaitaire CPF portee a 150 euros par le decret
 *   n. 2026-234 du 30/03/2026, pour toute demande a compter du 02/04/2026
 *   (103,20 euros au 01/01/2026) ; exceptions : demandeurs d'emploi,
 *   abondement de l'employeur, C2P, abondement AT-MP ;
 * - code du travail, article L. 6316-1 (certification qualite exigee des
 *   prestataires finances par un OPCO, l'Etat, les regions, la Caisse des
 *   depots, France Travail) ; article L. 6332-17 (financement des actions
 *   de developpement des competences des entreprises de moins de 50
 *   salaries par les OPCO) ; article L. 6321-1 (obligation d'adaptation au
 *   poste, au regard de l'evolution des technologies) ;
 * - Opco Atlas, actualite du 22/06/2026 : fin de la subrogation de paiement
 *   au 01/10/2026, exceptions dont le plan de developpement des competences
 *   des entreprises de moins de 50 salaries et l'apprentissage, depot avant
 *   le 15/09/2026 pour garder les modalites actuelles ;
 * - Opco EP, actualite du 24/07/2026 : l'entreprise regle la facture TTC et
 *   Opco EP rembourse les frais HT dans la limite des plafonds ; demandes
 *   validees au plus tard le 30/10/2026 aux modalites actuelles ;
 * - prix du marche : comparatif source troie.app (releve juillet 2026),
 *   650 a 1 590 euros HT par personne pour les organismes classiques.
 * Points de prudence : ne jamais nommer Qualiopi (decrire la certification
 * qualite de l'article L. 6316-1 sans la marque) ; formations en ligne
 * TROIE NON financables CPF ni OPCO ; article 4 = obligation de MOYENS,
 * aucun certificat requis ; controle par les autorites nationales de
 * surveillance du marche, jamais la CNIL ; "attestation de formation",
 * jamais "certification AI Act". ZERO em-dash.
 */

const SOURCE_URL =
  "https://code.travail.gouv.fr/code-du-travail/l6323-6";

const FAQ = [
  {
    q: "Peut-on financer une formation AI Act avec le CPF ?",
    a: "Oui, mais seulement si la formation prépare une certification enregistrée au répertoire national des certifications professionnelles ou au répertoire spécifique, comme le prévoit l'article L. 6323-6 du code du travail. Le sujet de la formation ne suffit pas : une formation AI Act sans numéro d'enregistrement n'apparaît pas sur Mon Compte Formation. Le salarié doit donner son accord exprès, et depuis le 2 avril 2026 il paie une participation forfaitaire de 150 euros, sauf si l'employeur abonde son compte.",
  },
  {
    q: "Un OPCO peut-il prendre en charge une formation à l'AI Act ?",
    a: "Oui, à condition que l'organisme de formation détienne la certification qualité exigée par l'article L. 6316-1 du code du travail pour tout financement par un opérateur de compétences. Les OPCO financent en priorité le plan de développement des compétences des entreprises de moins de 50 salariés, selon les règles fixées par leur conseil d'administration. Depuis le 1er octobre 2026, la plupart des OPCO ne paient plus directement l'organisme : l'entreprise règle la facture puis se fait rembourser, sauf exceptions dont ce plan pour les moins de 50 salariés.",
  },
  {
    q: "Existe-t-il une formation AI Act non finançable mais valable au titre de l'article 4 ?",
    a: "Oui, car l'article 4 du règlement (UE) 2024/1689 n'impose ni format, ni durée, ni organisme, ni certificat : il demande de prendre des mesures pour garantir un niveau suffisant de maîtrise de l'IA. Sur troie.app, la plateforme de formation de TROIE Studio, chaque parcours se termine par un QCM et délivre une attestation de formation nominative, datée et vérifiable en ligne, qui documente cette mesure. Ces formations en ligne ne sont finançables ni par le CPF ni par un OPCO, et l'abonnement coûte 29 euros par mois ou 290 euros par an, avec un essai de 7 jours.",
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

export function FormationAiActCpfOpcoFinancement() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <p>
        Une formation AI Act est finançable par le CPF uniquement si elle
        prépare une certification enregistrée au RNCP ou au répertoire
        spécifique, et par un OPCO uniquement si l&apos;organisme détient la
        certification qualité prévue par le code du travail. Ces deux
        conditions viennent du droit de la formation professionnelle, pas de
        l&apos;AI Act : son article 4 impose depuis le 2 février 2025 une
        obligation de moyens, sans format de formation ni certificat. Voici ce
        que chaque dispositif couvre, ce qu&apos;il coûte réellement, et ce qui
        change dans le circuit des OPCO depuis le 1er octobre 2026.
      </p>

      <div className="my-9 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
          En bref
        </p>
        <ul className="mt-4">
          <li>
            CPF : seules les formations qui préparent une certification
            enregistrée (RNCP ou répertoire spécifique) sont éligibles. Depuis
            le 2 avril 2026, le salarié paie 150 euros de participation, sauf
            abondement de l&apos;employeur.
          </li>
          <li>
            OPCO : l&apos;organisme doit être certifié au titre de
            l&apos;article L. 6316-1 du code du travail. Le financement vise
            surtout les entreprises de moins de 50 salariés.
          </li>
          <li>
            Depuis le 1er octobre 2026, la plupart des OPCO remboursent
            l&apos;entreprise au lieu de payer l&apos;organisme. Le plan de
            développement des compétences des moins de 50 salariés fait partie
            des exceptions.
          </li>
          <li>
            L&apos;article 4 de l&apos;AI Act n&apos;exige aucune formation
            financée ni aucun certificat. Une formation non finançable reste
            une mesure valable, si elle est adaptée et documentée.
          </li>
        </ul>
      </div>

      <div className="not-prose my-8 flex flex-wrap items-center gap-4">
        <OfficialEmblems url={SOURCE_URL} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-2)]/60">
          Source : code du travail, article L. 6323-6
        </span>
      </div>

      <h2>Deux questions à ne pas mélanger</h2>
      <p>
        « Ma formation AI Act est-elle finançable ? » et « Ma formation AI Act
        est-elle valable ? » sont deux questions sans rapport. La première
        relève du code du travail, qui réserve l&apos;argent mutualisé de la
        formation professionnelle à certaines formations et à certains
        organismes. La seconde relève du règlement (UE) 2024/1689, qui ne
        s&apos;intéresse ni au financement, ni à l&apos;organisme, ni à la
        durée.
      </p>
      <p>
        L&apos;article 4 demande aux fournisseurs et aux déployeurs de systèmes
        d&apos;IA de prendre des mesures pour garantir un niveau suffisant de
        maîtrise de l&apos;IA chez les personnes qui les utilisent pour leur
        compte. La Commission européenne précise dans ses questions-réponses
        sur la littératie IA qu&apos;aucune formation type n&apos;est imposée
        et qu&apos;aucun certificat n&apos;est nécessaire : un registre interne
        des formations et des actions d&apos;encadrement suffit. Depuis le 2
        août 2026, ce sont les autorités nationales de surveillance du marché
        qui peuvent vérifier ces mesures. Une formation financée par un OPCO
        n&apos;y pèse pas plus lourd qu&apos;une autre.
      </p>

      <h2>Le CPF : une question de certification, pas de sujet</h2>
      <p>
        L&apos;article L. 6323-6 du code du travail fixe la liste des actions
        éligibles au compte personnel de formation. Pour une formation
        professionnelle classique, il faut qu&apos;elle prépare une
        certification enregistrée au répertoire national des certifications
        professionnelles (RNCP), un bloc de compétences d&apos;une telle
        certification, ou une certification enregistrée au répertoire
        spécifique. Le mot « AI Act » dans l&apos;intitulé ne change rien : sans
        numéro d&apos;enregistrement, la formation n&apos;est pas sur Mon Compte
        Formation.
      </p>
      <p>
        Trois points pèsent ensuite dans la décision. Le CPF appartient au
        salarié et ne peut être mobilisé qu&apos;avec son accord exprès :
        l&apos;employeur ne peut pas l&apos;imposer pour remplir sa propre
        obligation. Depuis le 2 avril 2026, en application du décret n°
        2026-234 du 30 mars 2026, chaque demande entraîne une participation
        forfaitaire de 150 euros à la charge du titulaire, contre 103,20 euros
        au 1er janvier 2026. Enfin, cette participation ne s&apos;applique pas
        lorsque l&apos;employeur abonde le compte, ce qui en fait
        l&apos;option à privilégier si le CPF est retenu.
      </p>
      <p>
        Avant d&apos;acheter, vérifiez donc le numéro RNCP ou RS indiqué par
        l&apos;organisme, et lisez l&apos;intitulé exact de la certification.
        Une certification enregistrée sur l&apos;usage de l&apos;IA générative
        peut être utile, elle ne porte pas forcément sur les obligations du
        règlement.
      </p>

      <h2>L&apos;OPCO : la certification qualité de l&apos;organisme</h2>
      <p>
        Les opérateurs de compétences financent les actions de développement
        des compétences des entreprises de moins de 50 salariés, selon
        l&apos;article L. 6332-17 du code du travail, dans les limites et les
        priorités fixées par leur conseil d&apos;administration. Au-delà de ce
        seuil, la formation relève pour l&apos;essentiel du budget de
        l&apos;entreprise.
      </p>
      <p>
        La condition décisive porte sur l&apos;organisme. L&apos;article L.
        6316-1 exige que tout prestataire financé par un OPCO, l&apos;État, une
        région, la Caisse des dépôts ou France Travail soit certifié sur la base
        d&apos;un référentiel national qualité. Sans cette certification,
        aucune prise en charge n&apos;est possible, quel que soit le contenu
        de la formation. Le prix de marché suit logiquement : les organismes
        qui la détiennent vendent des formats de une demi-journée à deux jours,
        facturés en conséquence.
      </p>

      <h2>Ce qui change au 1er octobre 2026</h2>
      <p>
        Jusqu&apos;ici, l&apos;OPCO payait souvent directement l&apos;organisme
        de formation : c&apos;est la subrogation de paiement. À la suite
        d&apos;une évolution des règles de TVA applicables aux OPCO, ce
        mécanisme disparaît pour la plupart des dossiers à compter du 1er
        octobre 2026. Opco Atlas l&apos;a annoncé le 22 juin 2026 : l&apos;organisme
        facture désormais l&apos;entreprise, qui demande ensuite le
        remboursement. Opco EP précise, le 24 juillet 2026, que
        l&apos;entreprise règle la totalité de la facture toutes taxes
        comprises et se fait rembourser les frais hors taxes dans la limite
        des plafonds.
      </p>
      <p>
        Deux exceptions comptent pour une PME : le plan de développement des
        compétences des entreprises de moins de 50 salariés, pour lequel le
        paiement direct peut être maintenu, et les contrats
        d&apos;apprentissage. Les dates de bascule varient selon
        l&apos;opérateur : Opco Atlas demandait un dépôt avant le 15 septembre
        2026 pour garder les anciennes modalités, Opco EP les maintient pour
        les demandes validées au plus tard le 30 octobre 2026. Conséquence
        pratique pour une entreprise de 50 salariés ou plus : prévoir
        l&apos;avance de trésorerie et vérifier auprès de son OPCO la modalité
        appliquée à chaque dossier.
      </p>

      <h2>Combien coûte une formation AI Act</h2>
      <p>
        Notre{" "}
        <a
          href="https://troie.app/blog/prix-formation-ai-act-comparatif"
          target="_blank"
          rel="noopener"
        >
          comparatif sourcé des prix de la formation AI Act
        </a>
        , relevé en juillet 2026, situe les organismes de formation classiques
        entre 650 et 1 590 euros HT par personne, pour des formats de trois
        heures trente à deux jours. Ce sont ces offres qui ouvrent la prise en
        charge par un OPCO. Les certifications professionnelles de
        gouvernance de l&apos;IA montent nettement plus haut, et les
        ressources gratuites de la Commission européenne ne délivrent aucune
        preuve individuelle.
      </p>
      <p>
        Le calcul qui compte n&apos;est pas le prix unitaire. Pour dix
        salariés, une formation à 650 euros HT représente 6 500 euros HT hors
        temps passé, et une journée entière d&apos;absence par personne.
        Le financement réduit la facture, il ne réduit pas les heures. Or
        l&apos;article 4 est proportionné : un commercial qui rédige des
        e-mails avec un assistant n&apos;a pas besoin du même niveau
        qu&apos;une équipe RH qui trie des candidatures. Le bon réflexe est
        souvent un socle court pour tous, et un approfondissement financé pour
        les quelques postes exposés.
      </p>

      <h2>La méthode en quatre décisions</h2>
      <p>
        <strong>1. Cartographier les usages.</strong> Qui utilise quels outils,
        avec quelles données. Sans cette carte, impossible de savoir qui doit
        aller plus loin qu&apos;un socle commun. Notre{" "}
        <Link href="/blog/registre-des-usages-ia-modele">
          modèle de registre des usages de l&apos;IA
        </Link>{" "}
        fait ce travail en une heure.
      </p>
      <p>
        <strong>2. Séparer le socle et les rôles exposés.</strong> Le socle
        couvre les règles de base, les données interdites, la relecture et le
        cadre légal. Les rôles exposés (RH, juridique, relation client
        automatisée, direction) justifient une formation plus longue.
      </p>
      <p>
        <strong>3. Choisir le financement par poste, pas en bloc.</strong> Une
        formation certifiante via le CPF abondé par l&apos;employeur pour un
        salarié qui veut monter en compétence, une prise en charge OPCO pour
        un format long, le budget de l&apos;entreprise pour un socle court.
        L&apos;article L. 6321-1 du code du travail rappelle que
        l&apos;adaptation des salariés à l&apos;évolution des technologies est
        une obligation de l&apos;employeur, financée ou non.
      </p>
      <p>
        <strong>4. Garder la preuve.</strong> Quelle que soit la formule, une
        attestation de formation nominative et datée, rangée avec la charte et
        le registre des usages, est ce que vous pourrez produire le jour où
        l&apos;on vous demandera quelles mesures ont été prises.
      </p>

      <h2>Où se situe TROIE</h2>
      <p>
        Soyons clairs : les formations en ligne de{" "}
        <a href="https://troie.app" target="_blank" rel="noopener">
          troie.app
        </a>{" "}
        ne sont finançables ni par le CPF ni par un OPCO. Elles servent le
        socle commun. Sur troie.app, la plateforme de formation de TROIE
        Studio, chaque parcours sur les usages professionnels de l&apos;IA se
        termine par un QCM et délivre une attestation de formation nominative,
        datée et vérifiable en ligne, qui documente la mesure prise au titre de
        l&apos;article 4 du règlement (UE) 2024/1689 sur la littératie IA,
        applicable depuis le 2 février 2025 et contrôlable depuis le 2 août
        2026. L&apos;abonnement est à 29 euros par mois ou 290 euros par an,
        avec un essai de 7 jours, soit une fraction du reste à charge
        d&apos;une journée de formation non prise en charge.
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
        Avant de chercher un financement, fixez le besoin : qui utilise
        l&apos;IA, pour quoi, et qui doit aller au-delà du socle. Notre article
        sur les{" "}
        <Link href="/blog/formation-ai-act-gratuite">
          formations AI Act gratuites
        </Link>{" "}
        recense ce qui existe sans budget, celui sur les{" "}
        <Link href="/blog/article-4-ai-act-exemples-mesures">
          exemples concrets de mesures de littératie IA
        </Link>{" "}
        détaille ce qu&apos;on attend de vous, et la{" "}
        <Link href="/blog/ai-act-pme-checklist">checklist AI Act PME</Link>{" "}
        met tout en ordre. La page <Link href="/ia/ai-act">AI Act</Link>{" "}
        résume les échéances. Pour situer vos obligations réelles avant
        d&apos;engager un budget, TROIE Studio propose un{" "}
        <Link href="/contact?subject=ai-act">audit gratuit de 30 minutes</Link>.
      </p>

      <p>
        <em>
          Sources : règlement (UE) 2024/1689 (AI Act), article 4 sur la
          maîtrise de l&apos;IA, EUR-Lex ; questions-réponses sur la littératie
          IA publiées par la Commission européenne
          (digital-strategy.ec.europa.eu), pour l&apos;absence de certificat
          exigé et le contrôle par les autorités nationales de surveillance du
          marché à partir du 2 août 2026 ; code du travail, articles L. 6316-1,
          L. 6321-1, L. 6323-2, L. 6323-6 et L. 6332-17 (Légifrance et
          code.travail.gouv.fr) ; Service-Public, « CPF : la participation
          forfaitaire obligatoire augmente », mise à jour du 2 avril 2026
          (décret n° 2026-234 du 30 mars 2026) ; Opco Atlas, « Réforme de la
          TVA : ce qui change pour le financement de vos formations », 22 juin
          2026 ; Opco EP, « Réforme de la TVA : ce qui change pour vos demandes
          de prise en charge de formation », 24 juillet 2026 ; comparatif des
          prix de la formation AI Act, troie.app, relevé de juillet 2026. Faits
          vérifiés le 16 septembre 2026. Cette page est une synthèse
          pédagogique, pas un conseil juridique ni financier.
        </em>
      </p>
    </>
  );
}
