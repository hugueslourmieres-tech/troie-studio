import Link from "next/link";
import { Brief, Byline, CAL_URL, DataTable, Ext, Faq, Sources, type QA } from "./_kit";

/**
 * Article : refonte de site, les 7 signes et la méthode pour ne pas perdre
 * de trafic. Requête visée : « refonte site internet ». Faits vérifiés le
 * 25/10/2026 : web.dev (seuils Core Web Vitals), étude Deloitte pour Google
 * « Milliseconds Make Millions » (web.dev), directive (UE) 2019/882 (EUR-Lex),
 * politique de cycle de vie Adobe Commerce, Google Search Central
 * (migrations), La Fabrique du Net (médiane refonte). ZÉRO em-dash.
 */

const CWV = "https://web.dev/articles/vitals?hl=fr";
const MMM = "https://web.dev/case-studies/milliseconds-make-millions";
const EAA = "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32019L0882";
const ADOBE = "https://experienceleague.adobe.com/fr/docs/commerce-operations/release/planning/lifecycle-policy";
const G_MOVE = "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=fr";
const LFDN = "https://www.lafabriquedunet.fr/agences/pages/agences-site-internet/tarifs";

const FAQ: QA[] = [
  {
    q: "Quand faut-il refaire son site internet ?",
    a: "Quand le site freine l'activité : il est lent sur mobile, il ne génère pas de demandes mesurables, l'équipe ne peut pas le modifier seule, sa technologie n'est plus maintenue, il ne décrit plus l'offre, il n'est pas accessible alors que la loi l'exige, ou il n'est cité ni par Google ni par les assistants IA. Un seul de ces signes peut se corriger sans refonte. Trois ou plus justifient en général de reprendre le site.",
  },
  {
    q: "Combien coûte une refonte de site ?",
    a: "La médiane d'une refonte est de 7 000 euros selon La Fabrique du Net, contre 5 000 euros pour une création simple (relevé de juillet 2026). L'écart vient de la reprise de l'existant : contenus, historique de référencement, redirections, parfois migration de données.",
  },
  {
    q: "Une refonte fait-elle perdre du trafic ?",
    a: "Elle peut en faire perdre si des URL disparaissent sans redirection, si des contenus qui se positionnaient sont supprimés, ou si le nouveau site est plus lent. Google indique qu'un classement peut fluctuer pendant une migration et recommande des redirections permanentes conservées au moins un an. Une refonte préparée avec un inventaire des URL limite la baisse à une fluctuation temporaire.",
  },
  {
    q: "Combien de temps dure une refonte ?",
    a: "La Fabrique du Net indique que 80 % des sites sont livrés en trois mois ou moins. Une refonte ajoute l'inventaire de l'existant et le plan de redirection, à prévoir avant la conception. Après la mise en ligne, comptez quelques semaines de suivi dans Search Console.",
  },
  {
    q: "Peut-on améliorer son site sans le refaire ?",
    a: "Oui, souvent. Des pages lentes, un formulaire mal placé ou des titres mal rédigés se corrigent sur le site existant. Une refonte se justifie quand la base technique empêche ces corrections ou n'est plus maintenue. Un audit permet de faire la différence avant d'engager un budget.",
  },
];

export function RefonteSiteInternetSansPerdreTrafic() {
  return (
    <>
      <Byline checked="25 octobre 2026" />

      <p>
        Une refonte de site se justifie quand le site freine l&apos;activité, pas
        quand il paraît daté. Sept signes permettent de trancher : lenteur sur
        mobile, absence de demandes mesurables, dépendance à un prestataire
        pour chaque modification, technologie en fin de support, offre
        décrite de travers, accessibilité non conforme et absence dans les
        réponses de Google ou des assistants IA. La refonte se mène ensuite
        sans perte de trafic si l&apos;on inventorie toutes les URL, qu&apos;on les
        redirige une par une et qu&apos;on suit Search Console après la mise en
        ligne. Selon La Fabrique du Net, une refonte coûte en médiane 7 000
        euros.
      </p>

      <Brief
        items={[
          <>Trois signes ou plus sur sept : la refonte devient en général plus rentable que les correctifs.</>,
          <>Seuils Core Web Vitals de Google : LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1.</>,
          <>Sites e-commerce : l&apos;accessibilité est exigée depuis le 28 juin 2025, sauf micro-entreprises.</>,
          <>Le trafic se perd par les URL oubliées. Inventaire, redirections 301, suivi d&apos;au moins un an.</>,
          <>Médiane d&apos;une refonte : 7 000 €, contre 5 000 € pour une création simple.</>,
        ]}
      />

      <h2>Les 7 signes qu&apos;il est temps de refondre son site</h2>

      <h3>1. Le site est lent sur mobile</h3>
      <p>
        Google mesure l&apos;expérience de page avec trois indicateurs, les Core
        Web Vitals. D&apos;après{" "}
        <Ext href={CWV}>web.dev</Ext>, une page est jugée bonne si le plus
        grand élément s&apos;affiche en 2,5 secondes ou moins (LCP), si elle réagit
        à une interaction en 200 millisecondes ou moins (INP), et si sa mise
        en page bouge peu (CLS de 0,1 ou moins), mesurés sur 75 % des visites.
        La vitesse a un effet commercial documenté : l&apos;étude « Milliseconds
        Make Millions » menée par Deloitte pour Google sur 37 marques
        européennes et américaines mesure, pour 0,1 seconde gagnée sur
        mobile, une hausse des conversions de 8,4 % dans le commerce et de
        10,1 % dans le voyage, selon{" "}
        <Ext href={MMM}>web.dev</Ext>.
      </p>

      <h3>2. Le site ne produit aucune demande mesurable</h3>
      <p>
        Si personne ne sait combien de devis, d&apos;appels ou de ventes le site
        apporte chaque mois, il ne peut pas être piloté. Le problème est
        parfois un simple suivi absent. Il est souvent plus profond : aucune
        page ne mène vers une action claire.
      </p>

      <h3>3. Chaque modification demande un prestataire</h3>
      <p>
        Changer un prix, ajouter une référence ou publier une actualité ne
        devrait pas prendre une semaine. Un site que l&apos;équipe ne peut pas
        modifier vieillit plus vite que son offre.
      </p>

      <h3>4. La technologie n&apos;est plus maintenue</h3>
      <p>
        Un CMS, un thème ou une extension qui ne reçoit plus de correctifs de
        sécurité est une porte ouverte. Exemple concret : selon la{" "}
        <Ext href={ADOBE}>politique de cycle de vie d&apos;Adobe</Ext>, le support
        standard d&apos;Adobe Commerce 2.4.6 a pris fin le 11 août 2026. Dans ce
        cas, la montée de version coûte souvent autant qu&apos;un nouveau projet.
      </p>

      <h3>5. Le site ne décrit plus votre offre</h3>
      <p>
        Nouveaux services, nouvelle cible, nouveaux prix : si un prospect doit
        vous appeler pour comprendre ce que vous vendez, le site fait perdre
        du temps aux deux parties.
      </p>

      <h3>6. Le site n&apos;est pas accessible alors que la loi l&apos;exige</h3>
      <p>
        La{" "}
        <Ext href={EAA}>directive (UE) 2019/882</Ext>, dite European
        Accessibility Act, s&apos;applique depuis le 28 juin 2025 à plusieurs
        services numériques vendus aux consommateurs, dont le commerce en
        ligne. Les micro-entreprises qui fournissent ces services sont
        exemptées. Nous détaillons le périmètre dans notre article sur l&apos;
        <Link href="/fr/blog/accessibilite-site-web-obligation">
          accessibilité obligatoire des sites web
        </Link>
        . Rendre accessible un vieux site demande souvent de reprendre ses
        gabarits, donc une partie de la refonte.
      </p>

      <h3>7. Ni Google ni les assistants IA ne vous citent</h3>
      <p>
        Si vos pages de services n&apos;apparaissent pas sur vos requêtes
        principales, ni dans les réponses de ChatGPT ou des Aperçus IA de
        Google, la structure du site est en cause : pages trop générales,
        absence de réponses directes, informations techniques inaccessibles.
        Notre article sur le{" "}
        <Link href="/fr/blog/geo-apparaitre-chatgpt-gemini-ai-overviews">
          GEO expliqué aux dirigeants
        </Link>{" "}
        détaille ce que ces systèmes attendent.
      </p>

      <DataTable
        caption="Grille de décision : corriger ou refondre."
        head={["Situation", "Correction possible sans refonte", "Refonte justifiée si"]}
        rows={[
          ["Lenteur", "Images, cache, scripts tiers", "Le thème ou le CMS empêche d'atteindre les seuils"],
          ["Pas de demandes", "Suivi des conversions, appels à l'action", "Aucune page ne correspond à une intention d'achat"],
          ["Dépendance au prestataire", "Formation, accès administrateur", "L'outil ne permet pas d'éditer sans code"],
          ["Technologie en fin de support", "Montée de version", "La montée de version coûte autant qu'un projet"],
          ["Offre mal décrite", "Réécriture des pages", "L'arborescence ne correspond plus aux services"],
          ["Accessibilité", "Corrections ciblées", "Les gabarits sont à reprendre"],
          ["Absent des réponses", "Contenus, données structurées", "La structure du site disperse les sujets"],
        ]}
      />

      <h2>Combien coûte une refonte ?</h2>
      <p>
        Le{" "}
        <Ext href={LFDN}>baromètre de La Fabrique du Net</Ext> donne une
        médiane de 7 000 euros pour une refonte, soit environ 40 % de plus
        qu&apos;une création simple à 5 000 euros (relevé de juillet 2026). Les
        projets qui citent une refonte parmi leurs fonctionnalités ont, eux,
        une médiane de 8 000 euros. L&apos;écart avec une création vient de la
        reprise de l&apos;existant. C&apos;est précisément ce travail qui protège le
        trafic.
      </p>

      <h2>Comment mener la refonte sans perdre de trafic</h2>
      <p>
        La{" "}
        <Ext href={G_MOVE}>documentation de Google sur les migrations</Ext>{" "}
        donne le cadre : correspondance des URL, redirections permanentes
        côté serveur, sitemap à jour, suivi dans Search Console. Elle indique
        que le classement peut fluctuer pendant la migration, et que la
        majorité des pages d&apos;un site de petite ou moyenne taille migre en
        quelques semaines. Voici la méthode en sept étapes.
      </p>
      <ol>
        <li>
          <strong>Photographier l&apos;existant.</strong> Exporter de Search
          Console les pages et requêtes des 16 derniers mois, les pages
          d&apos;entrée de l&apos;outil d&apos;analyse, et faire un crawl complet du site.
        </li>
        <li>
          <strong>Repérer les pages qui portent le trafic.</strong> Une petite
          partie des pages apporte en général la majorité des visites. Ce sont
          elles qu&apos;on conserve ou qu&apos;on améliore, jamais qu&apos;on supprime sans
          remplacement.
        </li>
        <li>
          <strong>Dessiner la nouvelle arborescence.</strong> Une page par
          service et par question d&apos;acheteur, des URL courtes et stables.
        </li>
        <li>
          <strong>Écrire le plan de redirection.</strong> Une ligne par
          ancienne URL, vers la page équivalente la plus proche, en un seul
          saut, en 301.
        </li>
        <li>
          <strong>Construire sur un environnement de test fermé.</strong>{" "}
          Protégé par mot de passe ou en noindex, pour ne pas créer de
          doublon dans Google.
        </li>
        <li>
          <strong>Recetter avant la bascule.</strong> Vitesse sur mobile,
          formulaires, suivi des conversions, balises titre, redirections
          testées sur la liste complète des anciennes URL.
        </li>
        <li>
          <strong>Mettre en ligne et suivre.</strong> Soumettre le sitemap,
          surveiller les erreurs 404 et la couverture d&apos;indexation chaque
          jour la première semaine, puis chaque semaine. Garder les
          redirections au moins un an, comme le recommande Google.
        </li>
      </ol>

      <p>
        Le piège le plus courant n&apos;est pas technique. C&apos;est la réécriture des
        contenus : une page qui se positionnait bien, raccourcie ou fusionnée
        pendant la refonte, perd ce qui la faisait remonter. Comparez chaque
        page importante avant et après.
      </p>
      <p>
        Si la refonte s&apos;accompagne d&apos;un changement de plateforme e-commerce,
        notre guide de{" "}
        <Link href="/fr/blog/migration-shopify-sans-perdre-seo">
          migration vers Shopify
        </Link>{" "}
        détaille la checklist des redirections. Pour situer le budget global,
        voir notre article sur le{" "}
        <Link href="/fr/blog/prix-site-internet-2026">prix d&apos;un site internet</Link>
        .
      </p>

      <Faq items={FAQ} />

      <h2>Refondre, ou corriger d&apos;abord</h2>
      <p>
        Avant de refaire un site, il faut savoir ce qui bloque vraiment. C&apos;est
        l&apos;objet de notre audit à 890 euros HT : ce qui freine les demandes et
        les ventes, les pages qui portent votre trafic, et les corrections par
        priorité. Vous décidez ensuite, refonte ou non. Vous pouvez aussi{" "}
        <Ext href={CAL_URL}>réserver un appel de 30 minutes</Ext>. Nos pages{" "}
        <Link href="/fr/creation-site-application">création et refonte de site</Link>,{" "}
        <Link href="/fr/agence-web-nice">agence web à Nice</Link> et{" "}
        <Link href="/fr/agence-web-monaco">agence web à Monaco</Link>{" "}
        présentent la façon dont nous travaillons.
      </p>

      <Sources
        items={[
          { label: "web.dev, « Signaux Web essentiels » (Core Web Vitals), mise à jour du 31 octobre 2024", url: CWV, seen: "25 octobre 2026" },
          { label: "web.dev, « Milliseconds make millions », étude Deloitte pour Google", url: MMM, seen: "25 octobre 2026" },
          { label: "EUR-Lex, directive (UE) 2019/882 relative aux exigences en matière d'accessibilité des produits et services", url: EAA, seen: "25 octobre 2026" },
          { label: "Adobe Experience League, politique de cycle de vie d'Adobe Commerce", url: ADOBE, seen: "25 octobre 2026" },
          { label: "Google Search Central, « Migrer un site », mise à jour du 11 septembre 2026", url: G_MOVE, seen: "25 octobre 2026" },
          { label: "La Fabrique du Net, « Prix et devis d'un site internet 2026 », relevé de juillet 2026", url: LFDN, seen: "25 octobre 2026" },
        ]}
      />
    </>
  );
}
