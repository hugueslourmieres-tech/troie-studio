import Link from "next/link";
import { Brief, Byline, CAL_URL, DataTable, Ext, Faq, Sources, type QA } from "./_kit";

/**
 * Article : le GEO (generative engine optimization) expliqué aux
 * dirigeants. Requêtes visées : « geo seo », « apparaître dans chatgpt »,
 * « référencement ia ». Expression « visibilité » + « IA » proscrite. Faits vérifiés
 * le 25/10/2026 : blog Google France (lancement des Aperçus IA et du Mode
 * IA en France le 22/07/2026), Google Search Central (fonctionnalités d'IA
 * et votre site), OpenAI (robots OAI-SearchBot et GPTBot), étude SE Ranking
 * relayée par Siècle Digital (28/08/2026), article GEO (Aggarwal et al.,
 * KDD 2024). ZÉRO em-dash.
 */

const G_LAUNCH = "https://blog.google/intl/fr-fr/nouveautes-produits/explorez-obtenez-des-r%C3%A9ponses/recherche-ia-apercus-mode/";
const G_AI_DOC = "https://developers.google.com/search/docs/appearance/ai-features?hl=fr";
const OPENAI_BOTS = "https://developers.openai.com/api/docs/bots";
const SIECLE = "https://siecledigital.fr/2026/08/27/google-repond-deja-par-ia-a-plus-dune-recherche-sur-deux-en-france/";
const GEO_PAPER = "https://arxiv.org/abs/2311.09735";

const FAQ: QA[] = [
  {
    q: "Qu'est-ce que le GEO ?",
    a: "Le GEO, pour generative engine optimization, regroupe les pratiques qui augmentent les chances qu'un assistant IA (ChatGPT, Gemini, les Aperçus IA de Google, Perplexity) cite votre site dans sa réponse. Le terme vient d'un article de recherche présenté à la conférence KDD 2024, qui mesure jusqu'à 40 % de gain de présence dans les réponses générées.",
  },
  {
    q: "Comment apparaître dans ChatGPT ?",
    a: "ChatGPT cherche sur le web avec son robot OAI-SearchBot. OpenAI indique qu'il faut autoriser OAI-SearchBot dans le fichier robots.txt pour que le site puisse apparaître dans les résultats de recherche de ChatGPT. Ensuite, les pages doivent répondre clairement à des questions précises, avec des faits vérifiables et des sources.",
  },
  {
    q: "Faut-il un fichier spécial ou un balisage particulier pour Google ?",
    a: "Non. La documentation Google Search Central indique qu'aucune exigence supplémentaire ni optimisation spéciale n'est nécessaire pour les Aperçus IA et le Mode IA, et qu'il n'est pas nécessaire de créer des fichiers texte pour l'IA ni un balisage schema.org particulier. Une page doit être indexée et éligible à l'affichage d'un extrait.",
  },
  {
    q: "Le GEO remplace-t-il le SEO ?",
    a: "Non, il s'appuie dessus. Google rappelle que les bonnes pratiques SEO restent valables pour ses fonctionnalités d'IA. Une page mal indexée ne sera pas citée. Le GEO ajoute une exigence de forme : réponses directes, chiffres sourcés, auteur identifié, informations cohérentes d'une source à l'autre.",
  },
  {
    q: "Comment mesurer sa présence dans les réponses IA ?",
    a: "Pour Google, le trafic issu des Aperçus IA et du Mode IA est inclus dans le rapport Performances de Search Console, type de recherche Web, sans filtre séparé. Pour les assistants, la méthode reste manuelle : une liste fixe de questions d'acheteurs, posée chaque mois, en notant qui est cité.",
  },
];

export function GeoApparaitreChatgptGeminiAiOverviews() {
  return (
    <>
      <Byline checked="25 octobre 2026" />

      <p>
        Le GEO consiste à rendre votre site citable par les assistants IA :
        ChatGPT, Gemini, les Aperçus IA de Google. En pratique, cela demande
        trois choses. Être lisible par leurs robots, publier des pages qui
        répondent directement à des questions d&apos;acheteurs, et appuyer chaque
        affirmation sur une source. Le sujet est devenu concret en France le
        22 juillet 2026, date du lancement des Aperçus IA et du Mode IA dans
        la recherche Google. Un mois plus tard, une étude SE Ranking relevait
        un Aperçu IA sur 52,63 % des 100 000 requêtes françaises analysées.
      </p>

      <Brief
        items={[
          <>Les Aperçus IA et le Mode IA de Google sont disponibles en France depuis le 22 juillet 2026.</>,
          <>Google : aucune optimisation spéciale requise. Une page indexée, éligible à un extrait, peut être citée.</>,
          <>ChatGPT : autoriser le robot OAI-SearchBot dans robots.txt pour apparaître dans ses recherches.</>,
          <>Ce qui fait citer une page : réponse directe, chiffres sourcés, auteur identifié, structure claire.</>,
          <>Le GEO s&apos;ajoute au SEO. Il ne le remplace pas.</>,
        ]}
      />

      <h2>Pourquoi un dirigeant doit s&apos;en occuper maintenant</h2>
      <p>
        Le{" "}
        <Ext href={G_LAUNCH}>blog officiel de Google France</Ext> a annoncé le
        22 juillet 2026 l&apos;arrivée des Aperçus IA, qui affichent une synthèse
        en tête des résultats avec des liens vers les sources, et du Mode IA,
        qui permet de poser des questions de suivi. Selon l&apos;étude de SE
        Ranking relayée par{" "}
        <Ext href={SIECLE}>Siècle Digital</Ext> le 28 août 2026, ces synthèses
        apparaissaient déjà sur 52,63 % des 100 000 requêtes analysées en
        France, et sur 87,1 % des requêtes du secteur business.
      </p>
      <p>
        Pour une PME, la conséquence est simple. Sur une partie des
        recherches, l&apos;acheteur lit une réponse avant de voir la liste des
        sites. Si votre entreprise n&apos;est pas citée dans cette réponse, elle
        passe derrière celles qui le sont.
      </p>

      <DataTable
        caption="Où apparaissent les réponses générées, et ce qui conditionne la citation."
        head={["Assistant", "Ce qui conditionne l'accès à votre site", "Source"]}
        rows={[
          ["Aperçus IA et Mode IA (Google)", "Page indexée et éligible à un extrait dans la recherche Google", <Ext key="g" href={G_AI_DOC}>Google Search Central</Ext>],
          ["Recherche de ChatGPT", "Robot OAI-SearchBot autorisé dans robots.txt", <Ext key="o" href={OPENAI_BOTS}>OpenAI</Ext>],
          ["Entraînement des modèles d'OpenAI", "Robot GPTBot, distinct, réglable à part", <Ext key="o2" href={OPENAI_BOTS}>OpenAI</Ext>],
          ["Gemini et autres systèmes de Google", "Jeton Google-Extended pour l'entraînement et l'ancrage", <Ext key="g2" href={G_AI_DOC}>Google Search Central</Ext>],
        ]}
      />

      <h2>Ce que Google dit officiellement</h2>
      <p>
        La page{" "}
        <Ext href={G_AI_DOC}>« Fonctionnalités d&apos;IA et votre site Web »</Ext> de
        Google Search Central est claire. Pour apparaître comme lien de
        référence dans un Aperçu IA ou le Mode IA, une page doit être indexée
        et pouvoir s&apos;afficher dans la recherche avec un extrait. Il n&apos;y a
        aucune exigence technique supplémentaire. Google précise qu&apos;il n&apos;est
        pas nécessaire de créer des fichiers texte destinés à l&apos;IA, ni un
        balisage schema.org particulier.
      </p>
      <p>
        Les recommandations restent celles du référencement : laisser les
        robots explorer le site, soigner le maillage interne, offrir une bonne
        expérience de page, mettre le contenu important sous forme de texte,
        et garder les données structurées cohérentes avec le texte visible.
        Méfiez-vous donc des offres qui vendent un fichier miracle. Un fichier
        llms.txt ne nuit pas, mais Google dit lui-même qu&apos;il n&apos;en a pas
        besoin.
      </p>

      <h2>Ce qui fait citer une page : la recherche</h2>
      <p>
        Le terme GEO vient d&apos;un{" "}
        <Ext href={GEO_PAPER}>article de recherche</Ext> d&apos;Aggarwal et de ses
        coauteurs (Université de Princeton et IIT Delhi), présenté à la conférence KDD
        2024. Les auteurs ont testé plusieurs façons de réécrire un même
        contenu et mesuré sa présence dans les réponses de moteurs génératifs.
        Ils annoncent jusqu&apos;à 40 % de gain de présence. Les trois méthodes les
        plus efficaces dans leurs tests, avec 30 à 40 % d&apos;amélioration
        relative, consistaient à citer des sources, à ajouter des citations
        et à ajouter des statistiques. Les auteurs
        notent aussi que l&apos;efficacité varie selon les domaines.
      </p>
      <p>
        Traduit pour une entreprise, cela donne une règle : un assistant cite
        plus volontiers une page qui contient une affirmation précise, datée
        et vérifiable, qu&apos;une page qui promet un « savoir-faire unique ».
      </p>

      <h2>La méthode en six chantiers</h2>
      <h3>1. Ouvrir l&apos;accès aux bons robots</h3>
      <p>
        Vérifiez votre fichier robots.txt. OpenAI indique qu&apos;il faut autoriser
        OAI-SearchBot pour apparaître dans les résultats de recherche de
        ChatGPT, et qu&apos;un changement met environ 24 heures à être pris en
        compte. GPTBot sert à l&apos;entraînement des modèles : vous pouvez le
        bloquer sans sortir de la recherche de ChatGPT. Côté Google, rien ne
        change : Googlebot doit pouvoir explorer vos pages.
      </p>
      <h3>2. Écrire pour les questions des acheteurs</h3>
      <p>
        Listez les questions qu&apos;un client pose avant d&apos;acheter : prix, délais,
        différences entre deux options, conditions. Chaque question mérite un
        intertitre et une réponse directe dans les deux premières phrases. Le
        détail vient ensuite.
      </p>
      <h3>3. Sourcer chaque chiffre</h3>
      <p>
        Un chiffre sans source est un risque pour un assistant. Un chiffre
        avec un lien vers son origine et une date est réutilisable. Vos
        propres résultats comptent aussi, à condition d&apos;être précis : période,
        périmètre, outil de mesure.
      </p>
      <h3>4. Identifier l&apos;auteur et l&apos;entreprise</h3>
      <p>
        Nom de l&apos;auteur, fonction, page de présentation, coordonnées de
        l&apos;entreprise identiques partout : site, fiche Google, annuaires,
        réseaux. Des informations contradictoires d&apos;une source à l&apos;autre font
        hésiter un système qui croise ses sources.
      </p>
      <h3>5. Structurer la page</h3>
      <p>
        Intertitres sous forme de questions, tableaux pour les comparaisons,
        FAQ en fin de page. Les données structurées (Organization, Article,
        FAQPage) aident les moteurs à comprendre la page, à condition de
        reprendre le texte visible.
      </p>
      <h3>6. Mesurer chaque mois</h3>
      <p>
        Google inclut le trafic des Aperçus IA et du Mode IA dans le rapport
        Performances de Search Console, sous le type de recherche Web, sans le
        séparer. Pour les assistants, construisez une liste fixe de vingt
        questions d&apos;acheteurs, posez-les chaque mois et notez qui est cité.
        C&apos;est artisanal, mais c&apos;est la seule mesure comparable dans le temps.
      </p>

      <h2>Ce qu&apos;il ne faut pas faire</h2>
      <ul>
        <li>
          <strong>Produire des pages en masse.</strong> Des dizaines de pages
          quasi identiques par ville ou par mot clé n&apos;apportent pas de
          réponse nouvelle.
        </li>
        <li>
          <strong>Inventer des chiffres.</strong> Un assistant qui croise ses
          sources finit par écarter celle qui contredit les autres.
        </li>
        <li>
          <strong>Bloquer tous les robots IA par principe.</strong> Bloquer
          l&apos;entraînement est un choix défendable. Bloquer la recherche revient
          à sortir des réponses.
        </li>
        <li>
          <strong>Oublier le référencement classique.</strong> Les mêmes
          pages, bien indexées, servent les deux.
        </li>
      </ul>

      <h2>Que faire cette semaine</h2>
      <p>
        Posez à ChatGPT, à Gemini et à Google trois questions qu&apos;un client
        poserait avant de vous choisir. Notez qui est cité. Si ce ne sont pas
        vous, regardez les pages citées : elles répondent en général plus
        directement, avec plus de faits. Pour les questions de budget, nos
        articles sur le{" "}
        <Link href="/fr/blog/prix-site-internet-2026">prix d&apos;un site internet</Link>{" "}
        et le{" "}
        <Link href="/fr/blog/budget-google-ads-pme">budget Google Ads d&apos;une PME</Link>{" "}
        suivent cette méthode.
      </p>

      <Faq items={FAQ} />

      <h2>Faire le point sur votre site</h2>
      <p>
        TROIE Studio travaille le référencement naturel et le GEO ensemble,
        comme un suivi mensuel. L&apos;audit à 890 euros HT vérifie l&apos;accès des
        robots, la structure des pages qui comptent, les données structurées
        et les questions sur lesquelles vos concurrents sont cités à votre
        place, avec les corrections par priorité. Vous pouvez aussi{" "}
        <Ext href={CAL_URL}>réserver un appel de 30 minutes</Ext>. L&apos;offre
        est détaillée sur la page{" "}
        <Link href="/fr/agence-seo-google-ads">agence SEO et Google Ads</Link>,
        et pour une entreprise de la Côte d&apos;Azur sur les pages{" "}
        <Link href="/fr/agence-web-nice">agence web à Nice</Link> et{" "}
        <Link href="/fr/agence-web-monaco">agence web à Monaco</Link>.
      </p>

      <Sources
        items={[
          { label: "Google, blog France, « Lancement des Aperçus IA et du Mode IA dans la Recherche Google en France », 22 juillet 2026", url: G_LAUNCH, seen: "25 octobre 2026" },
          { label: "Google Search Central, « Fonctionnalités d'IA et votre site Web », mise à jour du 31 décembre 2025", url: G_AI_DOC, seen: "25 octobre 2026" },
          { label: "OpenAI, « Overview of OpenAI Crawlers »", url: OPENAI_BOTS, seen: "25 octobre 2026" },
          { label: "Siècle Digital, « Google répond déjà par IA à plus d'une recherche sur deux en France », 28 août 2026 (étude SE Ranking)", url: SIECLE, seen: "25 octobre 2026" },
          { label: "Aggarwal et al., « GEO: Generative Engine Optimization », KDD 2024, arXiv:2311.09735", url: GEO_PAPER, seen: "25 octobre 2026" },
        ]}
      />
    </>
  );
}
