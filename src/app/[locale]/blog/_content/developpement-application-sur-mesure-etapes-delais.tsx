import Link from "next/link";
import { Brief, Byline, DataTable, Ext, Faq, Sources, type QA } from "./_kit";

/**
 * Article : faire développer une application web ou mobile, étapes,
 * délais et pièges. Requêtes visées : « développement application sur
 * mesure », « créer une application entreprise ». Faits vérifiés le
 * 25/10/2026 : La Fabrique du Net (baromètre application mobile, 349
 * budgets, données de juin 2026, et site sur mesure ou applicatif), Apple
 * (Developer Program, délais d'App Review), Google (Play Console), CNIL
 * (guide RGPD du développeur), Malt (TJM développeurs). ZÉRO em-dash.
 */

const LFDN_APP = "https://www.lafabriquedunet.fr/agences/pages/agences-application-mobile/tarifs";
const LFDN_SITE = "https://www.lafabriquedunet.fr/agences/pages/agences-site-internet/tarifs";
const APPLE_PROG = "https://developer.apple.com/programs/";
const APPLE_REVIEW = "https://developer.apple.com/distribute/app-review/";
const GOOGLE_PLAY = "https://support.google.com/googleplay/android-developer/answer/6112435?hl=fr";
const CNIL = "https://www.cnil.fr/fr/guide-rgpd-du-developpeur";
const MALT = "https://www.malt.fr/t/barometre-tarifs";

const FAQ: QA[] = [
  {
    q: "Combien coûte le développement d'une application sur mesure ?",
    a: "Selon La Fabrique du Net, la médiane d'une application mobile confiée à une agence est de 30 000 euros, la moitié des projets se situant entre 15 000 et 50 000 euros (349 budgets). Un MVP se situe autour de 15 000 euros. Côté web, un site sur mesure ou applicatif a une médiane de 18 000 euros. Le périmètre fonctionnel fait l'essentiel de l'écart.",
  },
  {
    q: "Combien de temps faut-il pour développer une application ?",
    a: "La Fabrique du Net observe qu'un MVP est souvent livré en 3 à 6 semaines, et une application aboutie en plusieurs mois. Il faut ajouter la publication : Apple indique examiner au moins 50 % des soumissions en moins de 24 heures et 90 % en moins de 48 heures, si le dossier est complet.",
  },
  {
    q: "Application web ou application mobile : que choisir ?",
    a: "Une application web suffit quand les utilisateurs travaillent surtout sur ordinateur, ou quand l'outil est interne. Une application mobile se justifie pour un usage fréquent sur téléphone, des notifications, la caméra, la géolocalisation ou un fonctionnement hors ligne. Le mode hors ligne est le marqueur de coût le plus net, avec une médiane observée autour de 77 500 euros selon La Fabrique du Net.",
  },
  {
    q: "Le cross-platform coûte-t-il moins cher que le natif ?",
    a: "Pas dans les données de La Fabrique du Net : 35 000 euros de médiane pour un projet cross-platform (React Native, Flutter), contre 20 000 euros en natif. Le baromètre l'explique par un périmètre plus large, ces projets visant iOS et Android à la fois. Les échantillons sont modestes, à lire comme une tendance.",
  },
  {
    q: "Qui doit être propriétaire de l'application ?",
    a: "Votre entreprise. Les comptes Apple Developer et Google Play Console, le dépôt de code, l'hébergement et les noms de domaine doivent être ouverts à son nom. Le contrat doit prévoir la cession des droits sur le code développé, que le code de la propriété intellectuelle exige de détailler par écrit.",
  },
];

export function DeveloppementApplicationSurMesureEtapesDelais() {
  return (
    <>
      <Byline checked="25 octobre 2026" />

      <p>
        Faire développer une application sur mesure se fait en cinq étapes :
        cadrage, maquettes, première version testable (le MVP),
        développement complet, puis publication et maintenance. Selon le
        baromètre de La Fabrique du Net, une application mobile coûte en
        médiane 30 000 euros, un MVP autour de 15 000 euros, et ce MVP est
        souvent livré en 3 à 6 semaines. Les pièges les plus coûteux ne sont
        pas techniques : un périmètre mal défini, des comptes ouverts au nom
        du prestataire, et une maintenance oubliée dans le budget.
      </p>

      <Brief
        items={[
          <>Médiane d&apos;une application mobile : 30 000 €. MVP : environ 15 000 €. Avec back-end : 40 000 €.</>,
          <>Site ou outil web sur mesure : 18 000 € de médiane.</>,
          <>Publication : 99 USD par an chez Apple, 25 USD une seule fois chez Google.</>,
          <>Comptes, code et données au nom de votre entreprise, dès le premier jour.</>,
          <>Le levier de coût n&apos;est pas le tarif de l&apos;agence. C&apos;est la liste des fonctions.</>,
        ]}
      />

      <h2>Application web ou application mobile ?</h2>
      <p>
        La première décision n&apos;est pas technique, elle porte sur l&apos;usage. Un
        outil interne utilisé au bureau (suivi de chantiers, devis,
        planning) fonctionne très bien dans un navigateur. Une application
        installée sur le téléphone se justifie quand l&apos;usage est fréquent et
        mobile, ou quand il faut la caméra, la géolocalisation, les
        notifications ou le travail sans réseau.
      </p>

      <DataTable
        caption="Repères de budget par type de projet, réalisé par une agence."
        head={["Projet", "Médiane", "Moitié des projets entre"]}
        rows={[
          ["Site sur mesure ou applicatif (web)", "18 000 €", "6 000 et 45 000 €"],
          ["Application mobile, tous projets", "30 000 €", "15 000 et 50 000 €"],
          ["Application mobile avec back-end", "40 000 €", "non publié"],
          ["Natif (iOS et/ou Android)", "20 000 €", "non publié"],
          ["Cross-platform (React Native, Flutter)", "35 000 €", "non publié"],
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
        Le baromètre relève aussi un écart géographique : 40 000 euros de
        médiane pour un projet d&apos;application porté par une entreprise
        francilienne, contre 23 000 euros dans le reste de la France. Le
        développement se pilotant à distance, une entreprise de la Côte
        d&apos;Azur n&apos;a pas besoin d&apos;un prestataire parisien.
      </p>

      <h2>Les cinq étapes d&apos;un projet</h2>

      <h3>1. Le cadrage</h3>
      <p>
        On écrit qui utilise l&apos;application, pour faire quoi, et comment on
        saura qu&apos;elle marche. Chaque fonction est classée : indispensable,
        utile, plus tard. Le devis se construit sur la première colonne. C&apos;est
        aussi le moment de lister les données personnelles traitées. Le{" "}
        <Ext href={CNIL}>guide RGPD du développeur</Ext> de la CNIL sert de
        référence : minimiser les données collectées, gérer les durées de
        conservation, préparer l&apos;exercice des droits des personnes.
      </p>

      <h3>2. Les maquettes</h3>
      <p>
        Avant d&apos;écrire du code, on dessine les écrans et on les fait tester
        par quelques vrais utilisateurs. Modifier une maquette coûte quelques
        heures. Modifier un écran développé coûte des jours.
      </p>

      <h3>3. Le MVP</h3>
      <p>
        La première version fonctionnelle ne contient que les fonctions
        indispensables. La Fabrique du Net la situe autour de 15 000 euros,
        souvent livrée en 3 à 6 semaines, avec un back-end dans plus de la
        moitié des cas. Elle sert à vérifier que l&apos;usage existe avant de
        financer le reste.
      </p>

      <h3>4. Le développement complet</h3>
      <p>
        Il se mène par cycles courts, avec une démonstration à chaque fin de
        cycle. Le baromètre situe l&apos;application aboutie, multi-plateforme,
        avec back-end solide et espace d&apos;administration, entre 30 000 et
        80 000 euros. Au-delà, on parle de plateforme : temps réel,
        intégrations métier lourdes, sécurité renforcée.
      </p>

      <h3>5. La publication et la maintenance</h3>
      <p>
        Une application iPhone se publie via l&apos;
        <Ext href={APPLE_PROG}>Apple Developer Program</Ext>, à 99 dollars par
        an. Une application Android passe par la{" "}
        <Ext href={GOOGLE_PLAY}>Google Play Console</Ext>, avec un versement
        unique de 25 dollars. Google précise que les comptes personnels créés
        après le 13 novembre 2023 doivent respecter des exigences de test
        spécifiques avant publication, une raison de plus pour ouvrir un
        compte d&apos;organisation. Côté délais,{" "}
        <Ext href={APPLE_REVIEW}>Apple indique</Ext> examiner en général au
        moins 50 % des soumissions en moins de 24 heures et 90 % en moins de
        48 heures, à condition que le dossier soit complet.
      </p>
      <p>
        Ensuite, Apple et Google font évoluer leurs systèmes chaque année. Une
        application que personne ne met à jour se dégrade. La maintenance est
        un budget annuel, à chiffrer dans le même devis que le développement.
      </p>

      <DataTable
        caption="Calendrier type d'un projet d'application."
        head={["Étape", "Livrable", "Durée indicative"]}
        rows={[
          ["Cadrage", "Liste des fonctions classées, données traitées, critères de réussite", "Selon le périmètre"],
          ["Maquettes", "Écrans testés par des utilisateurs", "Selon le nombre d'écrans"],
          ["MVP", "Version fonctionnelle, testable", "3 à 6 semaines (La Fabrique du Net)"],
          ["Développement complet", "Application en production", "Plusieurs mois (La Fabrique du Net)"],
          ["Publication", "Fiches App Store et Google Play", "Examen Apple : 90 % en moins de 48 h"],
        ]}
      />

      <h2>Les pièges qui coûtent cher</h2>
      <h3>Un périmètre qui grossit en route</h3>
      <p>
        La Fabrique du Net note que la friction qui revient dans les avis
        clients n&apos;est pas la qualité technique, mais le cadrage du périmètre
        par rapport au budget. Chaque fonction ajoutée en cours de route
        allonge le délai. La parade est la liste écrite des fonctions, et une
        règle simple : toute nouvelle demande remplace une fonction de même
        poids, ou passe dans la version suivante.
      </p>
      <h3>Des comptes au nom du prestataire</h3>
      <p>
        Les comptes Apple et Google, le dépôt de code, l&apos;hébergement et les
        noms de domaine doivent être ouverts au nom de votre entreprise. Sans
        cela, changer de prestataire revient à republier l&apos;application.
      </p>
      <h3>Des droits sur le code mal cédés</h3>
      <p>
        Le code écrit par un prestataire extérieur ne vous appartient pas
        automatiquement. Le code de la propriété intellectuelle (article L.
        131-3) impose que chaque droit cédé soit mentionné distinctement dans
        le contrat, avec son étendue, sa destination, son lieu et sa durée.
        Faites relire cette clause avant de signer.
      </p>
      <h3>Le cross-platform vu comme une économie automatique</h3>
      <p>
        Un seul code pour iOS et Android réduit le travail à périmètre égal.
        Mais les données de La Fabrique du Net montrent des projets
        cross-platform plus chers en médiane (35 000 euros) que les projets
        natifs (20 000 euros), parce qu&apos;ils embarquent plus de fonctions.
      </p>
      <h3>Le mode hors ligne en version 1</h3>
      <p>
        C&apos;est le marqueur de complexité le plus net du baromètre, avec une
        médiane observée autour de 77 500 euros sur les projets qui
        l&apos;incluent. Si l&apos;usage le tolère, exigez une connexion réseau dans la
        première version.
      </p>

      <h2>Comment vérifier un devis</h2>
      <p>
        Un devis est un nombre de jours multiplié par un tarif. Sur Malt, le
        tarif journalier moyen affiché pour les développeurs freelances est de
        575 euros au 25 octobre 2026. Un MVP à 15 000 euros représente donc,
        à ce tarif, environ 26 jours de travail. Demandez la répartition :
        design, développement, back-end, tests, publication. Un devis qui ne
        prévoit aucun jour de tests vous les fera payer après le lancement.
      </p>
      <p>
        Pour un projet web plutôt que mobile, notre article sur le{" "}
        <Link href="/fr/blog/prix-site-internet-2026">prix d&apos;un site internet</Link>{" "}
        donne les repères de budget correspondants.
      </p>

      <Faq items={FAQ} />

      <h2>Cadrer votre application</h2>
      <p>
        TROIE Studio conçoit et développe des applications web et mobiles
        pour des entreprises de la Côte d&apos;Azur et d&apos;ailleurs, avec un seul
        interlocuteur du cadrage à la maintenance. Le premier pas est un{" "}
        <Link href="/fr/contact#projet">échange sur votre projet</Link> pour comprendre l&apos;usage
        visé. Nous envoyons ensuite une proposition écrite, avec un périmètre
        et un délai fermes. Si un site ou un outil existe déjà, l&apos;audit à 890
        euros HT dit ce qui peut être gardé. Les détails sont sur nos pages{" "}
        <Link href="/fr/creation-site-application">création de site et d&apos;application</Link>{" "}
        et{" "}
        <Link href="/fr/creation-application-nice">création d&apos;application à Nice</Link>
        .
      </p>

      <Sources
        items={[
          { label: "La Fabrique du Net, « Prix d'une application mobile en 2026 », 349 budgets, données de juin 2026", url: LFDN_APP, seen: "25 octobre 2026" },
          { label: "La Fabrique du Net, « Prix et devis d'un site internet 2026 », relevé de juillet 2026", url: LFDN_SITE, seen: "25 octobre 2026" },
          { label: "Apple, Apple Developer Program", url: APPLE_PROG, seen: "25 octobre 2026" },
          { label: "Apple, App Review", url: APPLE_REVIEW, seen: "25 octobre 2026" },
          { label: "Aide Play Console, s'inscrire pour obtenir un compte de développeur Google Play", url: GOOGLE_PLAY, seen: "25 octobre 2026" },
          { label: "CNIL, Guide RGPD du développeur", url: CNIL, seen: "25 octobre 2026" },
          { label: "Malt, baromètre des tarifs freelances en France", url: MALT, seen: "25 octobre 2026" },
        ]}
      />
    </>
  );
}
