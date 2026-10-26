import Link from "next/link";
import { Brief, Byline, DataTable, Ext, Faq, Sources, type QA } from "./_kit";

/**
 * Article : migrer de Magento, PrestaShop ou WooCommerce vers Shopify sans
 * perdre son référencement. Requêtes visées : « migration shopify »,
 * « passer de prestashop à shopify ». Faits vérifiés le 25/10/2026 :
 * Google Search Central (migrations de sites, mise à jour du 11/09/2026),
 * aide Shopify (redirections d'URL, limite de 100 000), Adobe (politique de
 * cycle de vie Adobe Commerce), Shopify (tarifs France), La Fabrique du Net
 * (médianes Shopify, PrestaShop, migration). Aucune promesse de trafic.
 * ZÉRO em-dash.
 */

const GOOGLE_MOVE = "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=fr";
const SHOPIFY_REDIRECTS = "https://help.shopify.com/fr/manual/online-store/menus-and-links/url-redirect";
const ADOBE_LIFECYCLE = "https://experienceleague.adobe.com/fr/docs/commerce-operations/release/planning/lifecycle-policy";
const SHOPIFY_PRICING = "https://www.shopify.com/fr/tarifs";
const LFDN_SITE = "https://www.lafabriquedunet.fr/agences/pages/agences-site-internet/tarifs";

const FAQ: QA[] = [
  {
    q: "Perd-on son référencement en passant à Shopify ?",
    a: "Pas si chaque ancienne URL est redirigée en 301 vers son équivalent. Google indique que le classement peut fluctuer pendant une migration et que la majorité des pages d'un site de petite ou moyenne taille migre en quelques semaines. La perte durable vient presque toujours de redirections absentes, en chaîne ou vers la page d'accueil, ou de contenus supprimés.",
  },
  {
    q: "Combien de redirections Shopify accepte-t-il ?",
    a: "Jusqu'à 100 000 redirections d'URL par boutique, et 20 millions sur Shopify Plus, selon l'aide Shopify. Elles s'importent en CSV depuis Contenu, Menus, Redirections d'URL. Une redirection ne fonctionne que si l'ancienne adresse ne mène plus à une page existante.",
  },
  {
    q: "Peut-on garder les mêmes URL qu'avec PrestaShop ou Magento ?",
    a: "Rarement. Shopify impose ses propres préfixes : /products/ pour les fiches, /collections/ pour les catégories, /pages/ pour les pages et /blogs/ pour les articles. La quasi-totalité des URL change donc, d'où le plan de redirection. Le nom de domaine, lui, peut rester le même.",
  },
  {
    q: "Combien de temps garder les redirections après la migration ?",
    a: "Le plus longtemps possible, et au moins un an selon Google Search Central. Sur Shopify, il n'y a pas de raison de les supprimer : elles restent actives tant que l'ancienne adresse ne correspond à aucune page.",
  },
  {
    q: "Combien coûte une migration vers Shopify ?",
    a: "Le baromètre de La Fabrique du Net donne une médiane de 15 000 euros pour un projet Shopify et de 12 000 euros pour les projets qui citent une migration ou une reprise de données (relevé de juillet 2026). L'abonnement Shopify démarre à 27 euros par mois en paiement annuel. Le coût réel dépend du nombre de produits, de clients et de commandes à reprendre.",
  },
];

export function MigrationShopifySansPerdreSeo() {
  return (
    <>
      <Byline checked="25 octobre 2026" />

      <p>
        Passer de Magento, PrestaShop ou WooCommerce à Shopify se fait sans
        perte durable de référencement, à une condition : chaque ancienne URL
        doit être redirigée en 301 vers sa nouvelle adresse, avant la bascule
        du nom de domaine. Google le dit dans sa documentation sur les
        migrations : le classement peut fluctuer, puis se stabilise en
        quelques semaines pour un site de petite ou moyenne taille. Le moment
        de migrer, lui, se décide sur trois critères : le coût de maintenance
        de la plateforme actuelle, sa fin de support, et le temps que
        l&apos;équipe perd à la faire tourner.
      </p>

      <Brief
        items={[
          <>Shopify change presque toutes les URL (/products/, /collections/). Le plan de redirection est la tâche principale.</>,
          <>Redirections 301, gardées au moins un an selon Google. Shopify en accepte 100 000 par boutique.</>,
          <>Adobe Commerce 2.4.6 n&apos;est plus supporté depuis le 11 août 2026. C&apos;est un signal de migration.</>,
          <>Médiane d&apos;un projet Shopify : 15 000 €. Projets avec migration de données : 12 000 €.</>,
          <>La migration se prépare sur une boutique de test, pas le jour de la bascule.</>,
        ]}
      />

      <h2>Quand faut-il migrer vers Shopify ?</h2>
      <p>
        Une migration n&apos;est pas un projet d&apos;image. Elle se justifie quand la
        plateforme actuelle coûte plus qu&apos;elle ne rapporte. Quatre situations
        reviennent.
      </p>
      <h3>La plateforme arrive en fin de support</h3>
      <p>
        Adobe publie la{" "}
        <Ext href={ADOBE_LIFECYCLE}>politique de cycle de vie d&apos;Adobe Commerce</Ext>{" "}
        (ex-Magento). Le support standard de la version 2.4.6 a pris fin le 11
        août 2026. Celui de la 2.4.7 se termine le 31 mai 2027, celui de la
        2.4.8 le 31 mai 2028. Rester sur une version sans correctifs de
        sécurité, pour une boutique qui encaisse des paiements, est un risque.
        La montée de version coûte souvent le prix d&apos;un projet. C&apos;est le
        moment de comparer avec une migration.
      </p>
      <h3>La maintenance mange le budget</h3>
      <p>
        Hébergement, mises à jour, modules payants, développeur appelé à
        chaque incident. Sur Shopify, l&apos;hébergement, le certificat SSL et les
        mises à jour de la plateforme sont compris dans l&apos;abonnement. Le
        forfait Basic coûte 27 euros par mois en paiement annuel, Grow 79
        euros, Advanced 289 euros, et Shopify Plus démarre à 2 100 euros par
        mois, selon la <Ext href={SHOPIFY_PRICING}>page tarifs de Shopify</Ext>.
      </p>
      <h3>L&apos;équipe ne peut rien modifier seule</h3>
      <p>
        Une page promotionnelle qui demande un développeur, une fiche produit
        qui casse la mise en page : c&apos;est le signe que l&apos;outil freine la vente.
      </p>
      <h3>Les ventes stagnent malgré le trafic</h3>
      <p>
        Un tunnel de paiement lent ou peu adapté au mobile fait perdre des
        commandes. Ce critère se mesure avant de décider, dans les données de
        la boutique actuelle.
      </p>

      <DataTable
        caption="Repères de coût pour comparer les plateformes (agences, relevé de juillet 2026)."
        head={["Plateforme", "Médiane d'un projet", "Moitié des projets entre"]}
        rows={[
          ["WooCommerce", "4 000 €", "2 000 et 8 000 €"],
          ["Shopify", "15 000 €", "5 000 et 30 000 €"],
          ["PrestaShop", "20 000 €", "10 000 et 40 000 €"],
          ["Projets citant une migration ou une reprise de données", "12 000 €", "non publié"],
        ]}
        source={<Ext href={LFDN_SITE}>La Fabrique du Net, baromètre site internet.</Ext>}
      />

      <h2>Pourquoi le référencement est en jeu</h2>
      <p>
        Google classe des URL, pas des boutiques. Quand une URL disparaît sans
        redirection, la page perd son historique : liens reçus, position,
        clics. Shopify impose une structure fixe. Une fiche PrestaShop du type
        /chaussures/123-basket-cuir.html devient /products/basket-cuir. Une
        catégorie devient /collections/chaussures. Presque toutes les adresses
        changent, même si le nom de domaine reste le même.
      </p>
      <p>
        La{" "}
        <Ext href={GOOGLE_MOVE}>documentation de Google sur les migrations</Ext>{" "}
        (mise à jour le 11 septembre 2026) fixe la méthode : préparer la
        correspondance des URL, poser des redirections permanentes côté
        serveur (301 ou 308), mettre à jour les sitemaps, puis suivre le
        trafic dans Search Console. Elle prévient aussi que le classement peut
        fluctuer pendant la migration.
      </p>

      <h2>La checklist des redirections</h2>
      <p>
        Voici l&apos;ordre que nous suivons. Chaque étape a un livrable, que vous
        pouvez vérifier.
      </p>
      <ol>
        <li>
          <strong>Inventorier toutes les URL.</strong> Trois sources à croiser :
          un crawl complet du site actuel, les pages qui reçoivent des clics
          dans Search Console sur 16 mois, et les pages qui reçoivent des liens
          externes. Une URL absente de l&apos;inventaire ne sera pas redirigée.
        </li>
        <li>
          <strong>Classer par valeur.</strong> Pages qui génèrent des clics,
          des ventes ou des liens en premier. Ce sont elles qu&apos;on vérifie une
          par une.
        </li>
        <li>
          <strong>Construire le fichier de correspondance.</strong> Une ligne
          par ancienne URL, une destination précise : fiche vers fiche,
          catégorie vers collection, article vers article. Jamais tout vers la
          page d&apos;accueil.
        </li>
        <li>
          <strong>Traiter les cas particuliers.</strong> Produits arrêtés vers
          la collection la plus proche, variantes avec paramètres, URL avec
          majuscules ou caractères accentués, anciennes pages de filtres.
        </li>
        <li>
          <strong>Éviter les chaînes.</strong> Si l&apos;ancien site avait déjà des
          redirections, la destination finale doit être la nouvelle URL, en un
          seul saut.
        </li>
        <li>
          <strong>Importer dans Shopify.</strong> Le{" "}
          <Ext href={SHOPIFY_REDIRECTS}>gestionnaire de redirections</Ext>{" "}
          accepte un import CSV, jusqu&apos;à 100 000 redirections (20 millions sur
          Plus). Une redirection ne s&apos;applique que si l&apos;ancienne adresse ne
          correspond à aucune page existante.
        </li>
        <li>
          <strong>Reprendre les balises.</strong> Titres, méta-descriptions,
          textes de catégories et attributs alt des images. Un import de
          catalogue reprend les produits, rarement ce travail.
        </li>
        <li>
          <strong>Tester avant la bascule.</strong> Recrawler la liste des
          anciennes URL contre la nouvelle boutique : chaque ligne doit
          répondre 301, puis 200, sur la bonne page.
        </li>
        <li>
          <strong>Basculer et déclarer.</strong> Pointer le domaine, soumettre
          le nouveau sitemap dans Search Console, et contrôler le rapport
          d&apos;indexation chaque jour la première semaine.
        </li>
        <li>
          <strong>Garder les redirections.</strong> Au moins un an selon
          Google. Sur Shopify, il n&apos;y a aucune raison de les supprimer.
        </li>
      </ol>

      <DataTable
        caption="Correspondance type entre une boutique PrestaShop et Shopify (exemple d'URL)."
        head={["Type de page", "Avant (exemple PrestaShop)", "Après sur Shopify"]}
        rows={[
          ["Fiche produit", "/chaussures/123-basket-cuir.html", "/products/basket-cuir"],
          ["Catégorie", "/12-chaussures", "/collections/chaussures"],
          ["Page de contenu", "/content/4-a-propos", "/pages/a-propos"],
          ["Article de blog", "/blog/conseils-entretien", "/blogs/journal/conseils-entretien"],
          ["Produit arrêté", "/chaussures/98-ancien-modele.html", "/collections/chaussures"],
        ]}
      />

      <h2>Ce qu&apos;il faut migrer en plus des produits</h2>
      <p>
        Le référencement n&apos;est qu&apos;une partie du risque. Une migration reprend
        aussi les comptes clients, l&apos;historique des commandes, les avis, les
        codes promo actifs et les abonnements à la newsletter. Plusieurs
        applications de l&apos;App Store Shopify, comme Cart2Cart, LitExtension ou
        MigrationPro, déclarent prendre en charge Magento, WooCommerce et
        PrestaShop. Elles font gagner du temps sur le volume. Elles ne
        décident pas à votre place de la structure des collections ni des
        redirections.
      </p>
      <p>
        Un point souvent oublié : les mots de passe des clients ne sont en
        général pas repris d&apos;une plateforme à l&apos;autre. Prévoyez un e-mail
        d&apos;invitation à réactiver le compte, envoyé après la bascule.
      </p>

      <h2>Le calendrier d&apos;une migration</h2>
      <p>
        Pour une boutique de quelques centaines à quelques milliers de
        références, comptez trois phases. D&apos;abord l&apos;inventaire et le plan de
        redirection. Ensuite la construction de la boutique Shopify, protégée
        par mot de passe, avec import et recette. Enfin la bascule, à
        programmer hors période de forte vente, puis quatre à six semaines de
        suivi. Google parle de quelques semaines pour la majorité des pages
        d&apos;un site de petite ou moyenne taille.
      </p>
      <p>
        Chez LOIR Paris, une marque que nous accompagnons sur Shopify, les
        ventes en ligne ont progressé de 164 % et les commandes de 121 % en
        deux ans. Ce résultat vient du travail mensuel qui suit la mise en
        ligne : fiches produits, Google Shopping, publicité. La migration rend
        ce travail possible, elle ne le remplace pas.
      </p>

      <Faq items={FAQ} />

      <h2>Préparer votre migration</h2>
      <p>
        Avant de choisir une date, il faut savoir combien d&apos;URL portent votre
        trafic et votre chiffre d&apos;affaires. C&apos;est ce que mesure notre audit :
        les pages qui comptent, les risques de la bascule et
        les corrections par priorité. Vous pouvez aussi{" "}
        <Link href="/fr/contact#projet">nous décrire votre projet</Link> pour en
        parler. Notre approche est détaillée sur la page{" "}
        <Link href="/fr/agence-e-commerce-shopify">agence e-commerce Shopify</Link>
        , et le suivi du référencement sur la page{" "}
        <Link href="/fr/agence-seo-google-ads">SEO et Google Ads</Link>. Pour une
        refonte sans changement de plateforme, lisez notre article sur la{" "}
        <Link href="/fr/blog/refonte-site-internet-sans-perdre-trafic">
          refonte de site sans perte de trafic
        </Link>
        .
      </p>

      <Sources
        items={[
          { label: "Google Search Central, « Migrer un site » (changements d'URL), mise à jour du 11 septembre 2026", url: GOOGLE_MOVE, seen: "25 octobre 2026" },
          { label: "Aide Shopify, « Créer et gérer des redirections d'URL »", url: SHOPIFY_REDIRECTS, seen: "25 octobre 2026" },
          { label: "Adobe Experience League, politique de cycle de vie d'Adobe Commerce", url: ADOBE_LIFECYCLE, seen: "25 octobre 2026" },
          { label: "Shopify France, page Tarifs", url: SHOPIFY_PRICING, seen: "25 octobre 2026" },
          { label: "La Fabrique du Net, « Prix et devis d'un site internet 2026 », relevé de juillet 2026", url: LFDN_SITE, seen: "25 octobre 2026" },
        ]}
      />
    </>
  );
}
