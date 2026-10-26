import Link from "next/link";
import { Brief, Byline, DataTable, Ext, Faq, Sources, type QA } from "./_kit";

/**
 * Article : combien investir en Google Ads pour une PME. Requête visée :
 * « budget google ads pme ». Sources vérifiées le 25/10/2026 : aide Google
 * Ads (budgets quotidiens moyens, CPA cible, Outil de planification des
 * mots clés), LocaliQ (benchmarks 2026, en dollars, sans précision
 * géographique), La Fabrique du Net (prix de la gestion SEA, hors média).
 * Les calculs d'exemple sont signalés comme tels. ZÉRO em-dash.
 */

const G_BUDGET = "https://support.google.com/google-ads/answer/6385083?hl=fr";
const G_TCPA = "https://support.google.com/google-ads/answer/6268632?hl=fr";
const G_KP = "https://support.google.com/google-ads/answer/7337243?hl=fr";
const LOCALIQ = "https://localiq.com/blog/search-advertising-benchmarks/";
const LFDN_SEA = "https://www.lafabriquedunet.fr/agences/pages/agences-sea/tarifs";

const FAQ: QA[] = [
  {
    q: "Quel budget Google Ads minimum pour une PME ?",
    a: "Google ne fixe pas de minimum. Le bon plancher est celui qui produit assez de conversions pour piloter. L'aide Google Ads recommande d'évaluer une stratégie au CPA cible sur des périodes d'au moins 30 conversions. Multipliez ce nombre par votre coût par contact estimé : c'est le budget mensuel en dessous duquel les décisions reposent sur trop peu de données.",
  },
  {
    q: "Google peut-il dépenser plus que mon budget quotidien ?",
    a: "Oui, certains jours. Selon l'aide Google Ads, une campagne peut dépenser jusqu'à deux fois son budget quotidien moyen sur une journée. Sur le mois, la facture ne dépasse pas 30,4 fois ce budget quotidien moyen pour la plupart des campagnes.",
  },
  {
    q: "Quel est le coût par clic moyen sur Google Ads ?",
    a: "Le benchmark 2026 de LocaliQ donne un coût par clic moyen de 5,42 dollars tous secteurs confondus, un taux de conversion moyen de 8,18 % et un coût par contact moyen de 66,69 dollars. Ce sont des moyennes en dollars, sans précision géographique : votre coût réel se lit dans l'Outil de planification des mots clés de Google, sur vos mots clés et votre zone.",
  },
  {
    q: "Combien coûte une agence pour gérer Google Ads ?",
    a: "Le baromètre de La Fabrique du Net, calculé le 25 octobre 2026, donne une médiane de 10 000 euros pour une prestation de gestion Google Ads sur le réseau de recherche, la moitié des prestations se situant entre 5 000 et 28 000 euros. Ces montants excluent le budget média versé à Google.",
  },
  {
    q: "Combien de temps avant de juger une campagne Google Ads ?",
    a: "Le temps d'accumuler assez de conversions. Google recommande de mesurer les performances au CPA cible sur des périodes d'au moins 30 conversions. Pour une PME à 20 contacts par mois, cela représente six semaines environ. Juger au bout de huit jours revient à décider sur du bruit.",
  },
];

export function BudgetGoogleAdsPme() {
  return (
    <>
      <Byline checked="25 octobre 2026" />

      <p>
        Le bon budget Google Ads d&apos;une PME se calcule à l&apos;envers : nombre de
        contacts ou de ventes visés par mois, multiplié par le coût d&apos;un
        contact sur vos mots clés. Google ne fixe aucun minimum. Mais son aide
        recommande de juger une campagne sur au moins 30 conversions, ce qui
        donne un plancher utile. À titre de repère, le benchmark 2026 de
        LocaliQ situe le coût moyen d&apos;un contact à 66,69 dollars tous secteurs
        confondus. Votre chiffre réel se lit dans l&apos;Outil de planification des
        mots clés, avant de dépenser un euro.
      </p>

      <Brief
        items={[
          <>Budget mensuel = contacts visés × coût par contact. Coût par contact = coût par clic ÷ taux de conversion.</>,
          <>Plancher utile : de quoi obtenir 30 conversions sur la période d&apos;analyse, seuil cité par Google.</>,
          <>Google peut dépenser jusqu&apos;à 2 fois le budget quotidien un jour donné, jamais plus de 30,4 fois sur le mois.</>,
          <>Repères LocaliQ 2026 : 5,42 $ le clic, 8,18 % de conversion, 66,69 $ le contact, en moyenne.</>,
          <>La gestion par une agence s&apos;ajoute au budget média : 10 000 € de médiane selon La Fabrique du Net.</>,
        ]}
      />

      <h2>Comment Google consomme votre budget</h2>
      <p>
        Dans Google Ads, on ne fixe pas un budget mensuel mais un budget
        quotidien moyen. L&apos;
        <Ext href={G_BUDGET}>aide Google Ads sur les budgets quotidiens moyens</Ext>{" "}
        précise deux règles. Un jour donné, la plupart des campagnes peuvent
        dépenser jusqu&apos;à deux fois ce montant, pour profiter des journées où
        les recherches sont plus nombreuses. Sur un mois, la dépense ne
        dépasse pas 30,4 fois le budget quotidien moyen. Un budget de 50
        euros par jour correspond donc à 1 520 euros maximum sur le mois.
      </p>
      <p>
        Conséquence pratique : raisonnez en mois, puis divisez par 30,4 pour
        obtenir le montant à saisir.
      </p>

      <h2>La méthode : partir des contacts, pas d&apos;un montant</h2>
      <p>
        Un budget fixé « parce que c&apos;est ce qu&apos;on peut mettre » ne dit pas ce
        qu&apos;il produira. La bonne question est inverse : combien de demandes de
        devis, d&apos;appels ou de ventes faut-il chaque mois, et combien coûte
        chacun ?
      </p>
      <ol>
        <li>
          <strong>Fixer l&apos;objectif.</strong> Nombre de contacts qualifiés par
          mois, ou chiffre d&apos;affaires visé pour un site marchand.
        </li>
        <li>
          <strong>Estimer le coût par clic.</strong> L&apos;
          <Ext href={G_KP}>Outil de planification des mots clés</Ext> donne,
          pour chaque mot clé, une estimation des recherches mensuelles et du
          coût moyen d&apos;affichage. Ses prévisions sont actualisées chaque jour
          sur les 7 à 10 derniers jours. Il faut un compte Google Ads avec des
          informations de facturation pour y accéder.
        </li>
        <li>
          <strong>Estimer le taux de conversion du site.</strong> Si vous
          mesurez déjà vos formulaires et vos appels, prenez votre propre taux.
          Sinon, partez d&apos;une hypothèse prudente et corrigez-la après le
          premier mois.
        </li>
        <li>
          <strong>Calculer.</strong> Coût par contact = coût par clic ÷ taux de
          conversion. Budget = contacts visés × coût par contact.
        </li>
        <li>
          <strong>Vérifier le plancher.</strong> Le budget doit permettre
          d&apos;atteindre environ 30 conversions sur la période d&apos;analyse.
        </li>
      </ol>

      <DataTable
        caption="Exemple de calcul, avec des hypothèses à remplacer par vos propres chiffres."
        head={["Hypothèse", "Cas A", "Cas B"]}
        rows={[
          ["Coût par clic estimé", "2 €", "4 €"],
          ["Taux de conversion du site", "5 %", "3 %"],
          ["Coût par contact (clic ÷ taux)", "40 €", "133 €"],
          ["Contacts visés par mois", "25", "15"],
          ["Budget média mensuel", "1 000 €", "2 000 €"],
          ["Budget quotidien moyen à saisir (÷ 30,4)", "33 €", "66 €"],
        ]}
      />

      <p>
        Ces deux cas sont des illustrations de la méthode, pas des moyennes.
        Ils montrent surtout une chose : le taux de conversion du site pèse
        autant que le prix du clic. Passer de 3 % à 5 % de conversion fait
        baisser le coût d&apos;un contact de 40 %, à coût par clic égal. Avant
        d&apos;augmenter un budget, vérifiez la page sur laquelle arrivent les
        clics.
      </p>

      <h2>Le plancher : 30 conversions pour décider</h2>
      <p>
        Les stratégies d&apos;enchères automatiques de Google apprennent à partir
        des conversions. L&apos;
        <Ext href={G_TCPA}>aide Google Ads sur le CPA cible</Ext> recommande de
        mesurer les performances sur des périodes comptant au moins 30
        conversions. Elle indique aussi que le CPA cible recommandé correspond
        au coût par acquisition moyen des 30 derniers jours, quand
        l&apos;historique existe.
      </p>
      <p>
        Pour une PME, c&apos;est la règle la plus utile. Si votre coût par contact
        est de 60 euros, il faut environ 1 800 euros de budget pour réunir 30
        conversions. Avec 600 euros par mois, il faudra trois mois pour
        disposer de la même base. C&apos;est possible, mais les décisions seront
        lentes. Mieux vaut alors concentrer le budget sur peu de mots clés, à
        forte intention, que l&apos;étaler sur tout le catalogue.
      </p>

      <h2>Quels repères de marché utiliser ?</h2>
      <p>
        Les benchmarks publics sont rares et souvent américains. Le plus cité
        est celui de LocaliQ, mis à jour le 1er juin 2026 à partir des
        campagnes de ses clients sur Google Ads et Microsoft Ads. Il est en
        dollars et ne précise pas la zone géographique. Il sert à situer un
        ordre de grandeur entre secteurs, pas à fixer votre budget.
      </p>

      <DataTable
        caption="Benchmarks Search 2026 de LocaliQ, moyennes en dollars."
        head={["Secteur", "Coût par clic", "Coût par contact"]}
        rows={[
          ["Tous secteurs", "5,42 $", "66,69 $"],
          ["Services aux entreprises", "5,87 $", "93,69 $"],
          ["Maison et travaux", "8,33 $", "90,92 $"],
          ["Immobilier", "3,22 $", "102,51 $"],
          ["Juridique", "9,87 $", "131,63 $"],
          ["Commerce, cadeaux", "4,14 $", "49,40 $"],
          ["Voyage", "2,14 $", "44,70 $"],
        ]}
        source={<Ext href={LOCALIQ}>LocaliQ, 2026 Search Advertising Benchmarks.</Ext>}
      />

      <p>
        Le même rapport donne un taux de clic moyen de 6,64 % et un taux de
        conversion moyen de 8,18 %. Sur la Côte d&apos;Azur comme ailleurs en
        France, le prix d&apos;un clic dépend surtout de la concurrence sur le mot
        clé et de la zone ciblée. Seul l&apos;outil de Google, interrogé sur vos
        mots clés et votre rayon, donne un chiffre exploitable.
      </p>

      <h2>Budget média et frais de gestion : deux lignes distinctes</h2>
      <p>
        Le budget média est versé directement à Google. La gestion des
        campagnes (structure, annonces, suivi des conversions, optimisation)
        est un travail à part. Le{" "}
        <Ext href={LFDN_SEA}>baromètre SEA de La Fabrique du Net</Ext>,
        calculé le 25 octobre 2026 sur 660 budgets, donne une médiane de 10
        000 euros pour une prestation de gestion Google Ads sur le réseau de
        recherche. La moitié des prestations se situe entre 5 000 et 28 000
        euros, hors budget média. Selon le même baromètre, l&apos;essentiel du marché
        correspond à une gestion menée à l&apos;année.
      </p>
      <p>
        Avant de signer, vérifiez trois points : le compte Google Ads est à
        votre nom, le suivi des conversions est en place avant le lancement,
        et le rapport mensuel parle de contacts et de ventes, pas seulement de
        clics.
      </p>

      <h2>Les erreurs qui gaspillent le budget</h2>
      <ul>
        <li>
          <strong>Lancer sans suivi des conversions.</strong> Les enchères
          automatiques optimisent alors des clics, pas des clients.
        </li>
        <li>
          <strong>Cibler toute la France pour un service local.</strong> Une
          entreprise de Nice qui intervient dans les Alpes-Maritimes paie des
          clics venus de Lille.
        </li>
        <li>
          <strong>Oublier les mots clés négatifs.</strong> « Gratuit »,
          « emploi », « formation » attirent des recherches qui ne
          convertiront pas.
        </li>
        <li>
          <strong>Envoyer les clics vers la page d&apos;accueil.</strong> Une
          annonce sur un service doit mener à la page de ce service.
        </li>
        <li>
          <strong>Juger trop tôt.</strong> En dessous de 30 conversions, une
          variation d&apos;une semaine sur l&apos;autre reste du bruit.
        </li>
      </ul>

      <h2>Google Ads ou référencement naturel ?</h2>
      <p>
        Les deux ne se remplacent pas. Google Ads achète de la présence
        immédiate, qui s&apos;arrête avec le budget. Le référencement naturel
        construit une présence qui dure, mais prend des mois. Pour une PME,
        la combinaison la plus fréquente consiste à financer la demande
        immédiate par la publicité sur quelques mots clés rentables, pendant
        que les pages de services gagnent leur place en résultats naturels.
        Les mêmes pages servent aussi aux assistants IA, comme nous
        l&apos;expliquons dans notre article sur le{" "}
        <Link href="/fr/blog/geo-apparaitre-chatgpt-gemini-ai-overviews">
          GEO expliqué aux dirigeants
        </Link>
        .
      </p>

      <Faq items={FAQ} />

      <h2>Chiffrer votre budget sur vos mots clés</h2>
      <p>
        Chez TROIE Studio, nous gérons Google Ads et le référencement comme un
        travail mensuel, avec un rapport qui parle de demandes et de ventes.
        Si vous avez déjà un compte, notre audit montre où part le
        budget et quelles corrections passer en premier. Sinon, un{" "}
        <Link href="/fr/contact#projet">premier échange</Link> suffit pour poser
        l&apos;objectif et la méthode. Le détail de l&apos;offre est sur la page{" "}
        <Link href="/fr/agence-seo-google-ads">agence SEO et Google Ads</Link>,
        et pour les entreprises locales sur la page{" "}
        <Link href="/fr/agence-web-nice">agence web à Nice</Link>.
      </p>

      <Sources
        items={[
          { label: "Aide Google Ads, « À propos des budgets quotidiens moyens »", url: G_BUDGET, seen: "25 octobre 2026" },
          { label: "Aide Google Ads, « À propos de la stratégie d'enchères au CPA cible »", url: G_TCPA, seen: "25 octobre 2026" },
          { label: "Aide Google Ads, « Utiliser l'Outil de planification des mots clés »", url: G_KP, seen: "25 octobre 2026" },
          { label: "LocaliQ, « 2026 Search Advertising Benchmarks for Your Industry », mis à jour le 1er juin 2026", url: LOCALIQ, seen: "25 octobre 2026" },
          { label: "La Fabrique du Net, « Tarif agence SEA 2026 », calcul du 25 octobre 2026", url: LFDN_SEA, seen: "25 octobre 2026" },
        ]}
      />
    </>
  );
}
