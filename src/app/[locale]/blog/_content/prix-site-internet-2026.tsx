import Link from "next/link";
import { Brief, Byline, DataTable, Ext, Faq, Sources, type QA } from "./_kit";

/**
 * Article : prix d'un site internet en 2026 (vitrine, e-commerce,
 * application). Requêtes visées : « prix site internet », « combien coûte
 * un site internet ». Chiffres vérifiés le 25/10/2026 :
 * - La Fabrique du Net, baromètre des tarifs site internet (calcul du
 *   25/10/2026 sur 2 912 budgets, segments arrêtés en juillet 2026).
 * - La Fabrique du Net, baromètre application mobile (349 budgets,
 *   données arrêtées en juin 2026).
 * - Malt, baromètre des tarifs freelances (TJM moyen des développeurs).
 * - Shopify, page tarifs France, Apple et Google, frais développeur.
 * Codeur.com et les CCI n'ont pas de grille publique vérifiable : non cités.
 * ZÉRO em-dash, aucun montant inventé.
 */

const LFDN_SITE = "https://www.lafabriquedunet.fr/agences/pages/agences-site-internet/tarifs";
const LFDN_APP = "https://www.lafabriquedunet.fr/agences/pages/agences-application-mobile/tarifs";
const MALT = "https://www.malt.fr/t/barometre-tarifs";
const SHOPIFY = "https://www.shopify.com/fr/tarifs";

const FAQ: QA[] = [
  {
    q: "Combien coûte un site internet en 2026 ?",
    a: "Le budget médian d'un site internet confié à une agence est de 5 600 euros selon le baromètre de La Fabrique du Net, calculé le 25 octobre 2026 sur 2 912 budgets. La moitié des projets se situe entre 3 800 et 20 000 euros. Le type de site fait l'essentiel de l'écart : 3 500 euros de médiane pour un site vitrine, 10 000 euros pour un e-commerce, 18 000 euros pour un site sur mesure ou applicatif.",
  },
  {
    q: "Quel est le prix d'un site vitrine pour une PME ?",
    a: "La médiane d'un site vitrine est de 3 500 euros, avec une fourchette courante de 2 000 à 8 000 euros (La Fabrique du Net, juillet 2026). Pour une PME qui veut un design et un parcours travaillés, le même baromètre donne un repère de 5 000 à 8 000 euros. La médiane tous projets confondus d'une PME est de 6 000 euros.",
  },
  {
    q: "Combien coûte une boutique Shopify ?",
    a: "La médiane d'un projet Shopify réalisé par une agence est de 15 000 euros, la moitié des projets se situant entre 5 000 et 30 000 euros (La Fabrique du Net, juillet 2026). Il faut y ajouter l'abonnement Shopify, à partir de 27 euros par mois en paiement annuel pour le forfait Basic, et les frais de paiement.",
  },
  {
    q: "Combien coûte une application mobile ?",
    a: "La médiane d'une application mobile confiée à une agence est de 30 000 euros, la moitié des projets se situant entre 15 000 et 50 000 euros (La Fabrique du Net, 349 budgets). Une première version testable, le MVP, se situe autour de 15 000 euros. Un projet avec back-end a une médiane de 40 000 euros.",
  },
  {
    q: "Pourquoi les devis de site internet varient autant ?",
    a: "Parce qu'ils ne chiffrent pas le même travail. Le baromètre de La Fabrique du Net montre un rapport de 1 à 8 entre un site Wix et un site sur mesure. Les intégrations avec un CRM, un ERP ou une API font passer la médiane à 15 000 euros. Un devis se compare seulement si le brief est identique et si chaque poste est détaillé.",
  },
];

export function PrixSiteInternet2026() {
  return (
    <>
      <Byline checked="25 octobre 2026" />

      <p>
        En 2026, un site internet confié à une agence coûte 5 600 euros en
        médiane, et la moitié des projets se situe entre 3 800 et 20 000
        euros. Ce sont les chiffres du baromètre de La Fabrique du Net,
        calculés le 25 octobre 2026 sur 2 912 budgets réels. Par type : un site
        vitrine tourne autour de 3 500 euros, un e-commerce autour de 10 000
        euros, un site sur mesure autour de 18 000 euros, et une application
        mobile autour de 30 000 euros. Le reste de cet article explique ce qui
        fait bouger ces montants, et comment lire un devis.
      </p>

      <Brief
        items={[
          <>Site vitrine : 3 500 € de médiane, de 2 000 à 8 000 € pour la moitié des projets.</>,
          <>E-commerce : 10 000 € de médiane, avec un quart des boutiques au-delà de 40 000 €.</>,
          <>Sur mesure ou applicatif : 18 000 € de médiane. Application mobile : 30 000 €.</>,
          <>Les intégrations (CRM, ERP, API) et la reprise de données pèsent plus que le nombre de pages.</>,
          <>Le budget de création ne couvre pas la suite : abonnement, hébergement, maintenance, acquisition.</>,
        ]}
      />

      <h2>D&apos;où viennent ces chiffres</h2>
      <p>
        La plupart des grilles de prix publiées en ligne n&apos;indiquent ni leur
        source ni leur échantillon. Nous avons retenu deux sources qui
        publient leur méthode. La première est le{" "}
        <Ext href={LFDN_SITE}>baromètre des tarifs de création de site</Ext> de
        La Fabrique du Net, un annuaire d&apos;agences web. Il agrège les budgets
        déclarés par les agences et par leurs clients, et publie des médianes
        plutôt que des moyennes. La raison est simple : la moyenne atteint 17
        150 euros, tirée par quelques très gros projets, alors que la médiane
        reste à 5 600 euros. La seconde est le{" "}
        <Ext href={MALT}>baromètre des tarifs freelances de Malt</Ext>, utile
        pour comprendre le coût d&apos;une journée de travail.
      </p>
      <p>
        Une précision avant de lire les tableaux. Les chiffres par segment
        datent du relevé de juillet 2026. Ce sont des ordres de grandeur pour
        situer un devis, pas des tarifs.
      </p>

      <h2>Combien coûte un site vitrine, un e-commerce ou un site sur mesure ?</h2>
      <p>
        Le type de projet est le premier repère. Un site vitrine présente une
        entreprise et génère des demandes de contact. Un e-commerce vend en
        ligne, avec catalogue, paiement et logistique. Un site sur mesure ou
        applicatif embarque une logique métier : espace client, calcul de
        devis, connexion à un outil interne.
      </p>

      <DataTable
        caption="Budget médian par type de projet, réalisé par une agence."
        head={["Type de projet", "Médiane", "Moitié des projets entre"]}
        rows={[
          ["Site vitrine", "3 500 €", "2 000 et 8 000 €"],
          ["Site e-commerce", "10 000 €", "3 000 et 40 000 €"],
          ["Site sur mesure ou applicatif", "18 000 €", "6 000 et 45 000 €"],
          ["Application mobile", "30 000 €", "15 000 et 50 000 €"],
        ]}
        source={
          <>
            La Fabrique du Net, baromètres{" "}
            <Ext href={LFDN_SITE}>site internet</Ext> (juillet 2026) et{" "}
            <Ext href={LFDN_APP}>application mobile</Ext> (juin 2026).
          </>
        }
      />

      <p>
        Le saut le plus net se situe entre le site vitrine et le sur mesure :
        un facteur cinq. On ne paie pas plus de pages. On paie du
        développement, des tests et une architecture qui doit tenir dans la
        durée.
      </p>

      <h2>Le prix selon la technologie : WordPress, Shopify, sur mesure</h2>
      <p>
        Pour un même besoin affiché, l&apos;outil choisi fait varier le budget du
        simple au huit, selon La Fabrique du Net. Ce n&apos;est pas que les agences
        facturent la marque du logiciel. Chaque outil correspond à un type de
        projet différent.
      </p>

      <DataTable
        caption="Budget médian d'un projet selon la technologie (relevé de juillet 2026)."
        head={["Technologie", "Médiane", "Moitié des projets entre"]}
        rows={[
          ["Wix", "2 500 €", "1 500 et 3 500 €"],
          ["WooCommerce", "4 000 €", "2 000 et 8 000 €"],
          ["WordPress", "5 000 €", "2 500 et 10 000 €"],
          ["Webflow", "6 500 €", "4 000 et 9 500 €"],
          ["Shopify", "15 000 €", "5 000 et 30 000 €"],
          ["Développement sur mesure", "18 000 €", "6 000 et 45 000 €"],
          ["PrestaShop", "20 000 €", "10 000 et 40 000 €"],
        ]}
        source={<Ext href={LFDN_SITE}>La Fabrique du Net, baromètre site internet.</Ext>}
      />

      <p>
        Le tableau se lit avec prudence. Une boutique Shopify à 15 000 euros
        n&apos;est pas plus chère qu&apos;une boutique WooCommerce à 4 000 euros pour le
        même travail : elle porte en général un catalogue plus large, un
        design propre à la marque et des intégrations. Pour une marque qui
        veut vendre en ligne, nous détaillons les arbitrages sur notre page{" "}
        <Link href="/fr/agence-e-commerce-shopify">agence e-commerce Shopify</Link>.
      </p>

      <h2>Ce qui fait vraiment monter le devis</h2>
      <p>
        Le baromètre croise aussi le budget avec les fonctionnalités citées
        dans les projets. Trois familles apparaissent. Les fonctions de base
        (prise de rendez-vous, blog, référencement de départ, version mobile)
        restent proches de la médiane. La refonte, l&apos;e-commerce et le
        multilingue font monter le budget de moitié ou plus. Les intégrations
        lourdes changent de catégorie.
      </p>

      <DataTable
        caption="Budget médian des projets qui mentionnent chaque fonctionnalité (juillet 2026)."
        head={["Fonctionnalité citée", "Médiane du projet"]}
        rows={[
          ["Réservation, prise de rendez-vous", "4 000 €"],
          ["Référencement (SEO)", "5 000 €"],
          ["Version mobile", "6 000 €"],
          ["Refonte d'un site existant", "8 000 €"],
          ["Multilingue", "10 000 €"],
          ["Migration, reprise de données", "12 000 €"],
          ["Intégration API, CRM ou ERP", "15 000 €"],
        ]}
        source={<Ext href={LFDN_SITE}>La Fabrique du Net, baromètre site internet.</Ext>}
      />

      <p>
        Deux autres facteurs jouent. La taille de l&apos;entreprise d&apos;abord : 4 000
        euros de médiane pour une TPE, 6 000 euros pour une PME, 8 500 euros
        pour une ETI. La région ensuite : 7 500 euros en Île-de-France contre
        5 000 euros dans le reste de la France. La Fabrique du Net l&apos;attribue à
        la densité concurrentielle et à la taille des annonceurs parisiens.
      </p>

      <h3>Le coût d&apos;une journée de travail</h3>
      <p>
        Un devis est d&apos;abord un nombre de jours. Sur Malt, le tarif journalier
        moyen affiché pour la famille des développeurs est de 575 euros, et de
        578 euros pour les consultants webmarketing, au 25 octobre 2026. Ce
        repère aide à vérifier un devis : au tarif moyen de Malt, un site
        vitrine à 3 500 euros représente six jours de travail environ, design,
        contenus et mise en ligne compris. Si le devis promet plus en moins de jours, demandez ce
        qui a été retiré.
      </p>

      <h2>Combien coûte un site une fois en ligne ?</h2>
      <p>
        Le prix de création paie la mise en ligne. Ensuite, un site coûte
        chaque année, même s&apos;il ne change pas. Les postes sont toujours les
        mêmes : nom de domaine, hébergement ou abonnement, licences, et
        maintenance.
      </p>

      <DataTable
        caption="Coûts récurrents publics, relevés le 25 octobre 2026."
        head={["Poste", "Exemple", "Prix affiché"]}
        rows={[
          ["Nom de domaine .fr", "OVHcloud, renouvellement", "7,79 € HT par an"],
          ["Boutique en ligne", "Shopify Basic", "27 € par mois en annuel, 36 € en mensuel"],
          ["Paiement en ligne", "Shopify Payments, carte standard", "1,5 % + 0,25 € par transaction"],
          ["Application iPhone", "Apple Developer Program", "99 USD par an"],
          ["Application Android", "Google Play Console", "25 USD, une seule fois"],
          ["Maintenance", "Agence ou freelance", "Au devis"],
        ]}
        source={
          <>
            <Ext href={LFDN_SITE}>La Fabrique du Net</Ext> (relevé OVHcloud),{" "}
            <Ext href={SHOPIFY}>Shopify</Ext>,{" "}
            <Ext href="https://developer.apple.com/programs/">Apple</Ext>,{" "}
            <Ext href="https://support.google.com/googleplay/android-developer/answer/6112435?hl=fr">Google</Ext>.
          </>
        }
      />

      <p>
        Le poste qui fait varier la facture, c&apos;est la maintenance. Sur
        WordPress, elle n&apos;est pas facultative : une extension non mise à jour
        expose le site à des failles connues. Faites-la chiffrer dans le même
        devis que la création, comme un budget annuel séparé.
      </p>
      <p>
        Il manque un poste dans la plupart des budgets : faire venir des
        visiteurs. Un site qui n&apos;est ni référencé ni soutenu par de la
        publicité reste une adresse. Nous traitons ce budget dans notre
        article sur le{" "}
        <Link href="/fr/blog/budget-google-ads-pme">budget Google Ads d&apos;une PME</Link>.
      </p>

      <h2>Comment comparer deux devis</h2>
      <p>
        Trois règles suffisent à rendre des devis comparables.
      </p>
      <ol>
        <li>
          <strong>Le même brief pour tous.</strong> Pages, fonctionnalités,
          contenus fournis ou non, délai. Deux devis sur deux briefs différents
          ne se comparent pas.
        </li>
        <li>
          <strong>Le détail poste par poste.</strong> Design, développement,
          intégrations, contenus, recette, mise en ligne, maintenance. Un
          montant global cache les impasses.
        </li>
        <li>
          <strong>La propriété.</strong> Le nom de domaine, l&apos;hébergement, les
          comptes administrateur et le code doivent être à votre nom. Un
          abonnement « tout compris » peut masquer un site que vous ne pourrez
          pas emporter.
        </li>
      </ol>
      <p>
        Côté délai, La Fabrique du Net indique que 80 % des sites sont livrés
        en trois mois ou moins. Un site vitrine qui demande six mois a
        souvent un problème de contenus, pas de développement : les textes et
        les photos arrivent tard. Prévoyez ce temps de votre côté.
      </p>

      <h2>Et si vous avez déjà un site</h2>
      <p>
        Refondre coûte en médiane 7 000 euros, contre 5 000 euros pour une
        création simple, selon le même baromètre. L&apos;écart vient de la reprise
        de l&apos;existant : contenus, redirections, historique de référencement.
        Avant de chiffrer une refonte, vérifiez qu&apos;elle est nécessaire. Notre
        article sur les{" "}
        <Link href="/fr/blog/refonte-site-internet-sans-perdre-trafic">
          signes qu&apos;il est temps de refondre son site
        </Link>{" "}
        aide à trancher. Si le projet ressemble plutôt à un outil métier, lisez
        notre guide pour{" "}
        <Link href="/fr/blog/developpement-application-sur-mesure-etapes-delais">
          faire développer une application
        </Link>
        .
      </p>

      <Faq items={FAQ} />

      <h2>Votre budget, chiffré sur votre cas</h2>
      <p>
        Une médiane situe un devis. Elle ne dit pas ce dont votre entreprise a
        besoin. Chez TROIE Studio, à Nice, nous commençons par un premier échange
        pour comprendre l&apos;objectif, puis nous envoyons une proposition
        écrite avec un délai ferme. Si votre site existe déjà, l&apos;audit à 890
        euros HT liste ce qui freine les demandes et les ventes, et les
        corrections par priorité. Vous pouvez{" "}
        <Link href="/fr/contact#projet">nous décrire votre projet</Link>, ou
        consulter nos pages{" "}
        <Link href="/fr/creation-site-application">création de site et d&apos;application</Link>,{" "}
        <Link href="/fr/agence-web-nice">agence web à Nice</Link> et{" "}
        <Link href="/fr/agence-web-monaco">agence web à Monaco</Link>.
      </p>

      <Sources
        items={[
          { label: "La Fabrique du Net, « Prix et devis d'un site internet 2026 : tarifs réels », calcul du 25 octobre 2026, segments de juillet 2026", url: LFDN_SITE, seen: "25 octobre 2026" },
          { label: "La Fabrique du Net, « Prix d'une application mobile en 2026 », 349 budgets, données de juin 2026", url: LFDN_APP, seen: "25 octobre 2026" },
          { label: "Malt, baromètre des tarifs freelances en France", url: MALT, seen: "25 octobre 2026" },
          { label: "Shopify France, page Tarifs", url: SHOPIFY, seen: "25 octobre 2026" },
          { label: "Apple, Apple Developer Program", url: "https://developer.apple.com/programs/", seen: "25 octobre 2026" },
          { label: "Google, Aide Play Console, s'inscrire pour obtenir un compte de développeur", url: "https://support.google.com/googleplay/android-developer/answer/6112435?hl=fr", seen: "25 octobre 2026" },
        ]}
      />
    </>
  );
}
