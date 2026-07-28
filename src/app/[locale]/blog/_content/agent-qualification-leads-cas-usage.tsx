import Link from "next/link";

/**
 * Article : "Cas d'usage : un agent de qualification des leads, de l'email
 * au CRM". SEO cible : agent IA prospection, qualification leads IA.
 * Cas d'architecture type, aucun chiffre client inventé : on décrit le
 * mécanisme et ce qu'il change, pas des pourcentages.
 */
export function AgentQualificationLeadsCasUsage() {
  return (
    <>
      <p>
        C&apos;est le premier agent que nous recommandons à une PME qui vend
        en B2B, parce que le problème est universel : un prospect écrit, et
        la réponse part trop tard. Entre le formulaire de contact, la boîte
        mail partagée et le CRM que personne n&apos;ouvre le vendredi, des
        rendez-vous se perdent chaque semaine. Voici, étape par étape, à
        quoi ressemble un agent de qualification des leads bien construit.
      </p>

      <h2>Le point de départ : une demande entre</h2>
      <p>
        Formulaire du site, email direct, parfois un message LinkedIn
        recopié. Aujourd&apos;hui, cette demande attend qu&apos;un humain
        soit disponible. Avec l&apos;agent, elle est lue dans la minute :
        l&apos;agent extrait qui écrit, pour quelle entreprise, avec quel
        besoin, et range ces informations proprement.
      </p>

      <h2>Étape 1 : enrichir et comprendre</h2>
      <p>
        L&apos;agent complète la fiche : site web de l&apos;entreprise,
        taille apparente, secteur. Rien d&apos;exotique : les informations
        publiques que votre commercial irait chercher lui-même, mais
        cherchées à chaque fois, tout de suite, sans fatigue.
      </p>

      <h2>Étape 2 : qualifier selon VOS critères</h2>
      <p>
        La qualification n&apos;est pas magique, elle est écrite : vos
        critères, posés noir sur blanc (zone géographique, type de besoin,
        budget évoqué, urgence). L&apos;agent classe la demande (prioritaire,
        standard, hors cible) et le dit clairement. Si les critères sont
        flous, le classement le sera aussi : c&apos;est l&apos;occasion de
        les écrire enfin.
      </p>

      <h2>Étape 3 : préparer la réponse, pas l&apos;envoyer</h2>
      <p>
        L&apos;agent rédige un brouillon dans votre ton, adapté à la
        demande, et le met en file de validation. Un humain relit, ajuste
        une phrase, envoie. C&apos;est le garde-fou non négociable : tout ce
        qui part vers l&apos;extérieur passe par une validation humaine.
        L&apos;agent fait la préparation, vous gardez la signature.
      </p>

      <h2>Étape 4 : le CRM à jour, sans y penser</h2>
      <p>
        Chaque étape écrit dans le CRM : la fiche créée, le classement, la
        réponse envoyée, la relance programmée à J+3 si silence. Le lundi
        matin, le pipeline est lisible : qui attend une réponse, qui a été
        relancé, qui est hors cible. Personne n&apos;a saisi une ligne à la
        main.
      </p>

      <h2>Ce que ça change, concrètement</h2>
      <p>
        Le délai de première réponse passe d&apos;heures, parfois de jours,
        à quelques minutes pour le brouillon et au premier créneau humain
        pour l&apos;envoi. Les relances partent vraiment, ce qui est
        souvent le vrai gisement : la plupart des équipes répondent bien à
        la première demande et oublient la suite. Et la mesure est simple :
        comptez vos demandes entrantes, vos réponses et vos relances sur un
        mois avant, puis un mois après.
      </p>

      <h2>Ce qu&apos;il faut avoir avant de se lancer</h2>
      <p>
        Un processus écrit en cinq lignes, des critères de qualification
        posés, un ton de marque défini, et une équipe formée aux bases de
        l&apos;IA : nous détaillons ces prérequis dans{" "}
        <Link href="/fr/blog/deployer-ia-pme-5-erreurs">
          les 5 erreurs des déploiements IA en PME
        </Link>{" "}
        et dans notre{" "}
        <Link href="/fr/blog/agent-ia-pme-guide">
          guide des agents IA pour PME
        </Link>
        . Pour la formation des équipes, le campus{" "}
        <a href="https://troie.app">troie.app</a> couvre le socle en 2
        heures par personne. Et si vous voulez qu&apos;on regarde votre cas
        ensemble, <Link href="/ia">l&apos;offre IA du studio est ici</Link>.
      </p>
    </>
  );
}
