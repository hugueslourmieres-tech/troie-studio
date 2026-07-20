import Link from "next/link";
import { OfficialEmblems } from "@/components/OfficialEmblems";

/**
 * Article : l'obligation de transparence de l'article 50 de l'AI Act,
 * applicable le 2 aout 2026. Faits verifies le 20/07/2026 sur sources
 * primaires : reglement (UE) 2024/1689, article 50 (transparence) et
 * article 99 (sanctions), EUR-Lex ; calendrier d'application de la
 * Commission europeenne ; canon du site pour l'ajustement du delai de
 * marquage par le Digital Omnibus (6 a 3 mois, mise en conformite des
 * IA generatives deja sur le marche au plus tard le 2 decembre 2026).
 * Prudence : ne jamais nommer la CNIL comme autorite de controle de
 * l'AI Act (CNIL = RGPD uniquement). Autorites competentes = autorites
 * nationales de surveillance du marche, a partir du 2 aout 2026.
 * ZERO em-dash.
 */

const SOURCE_URL = "https://eur-lex.europa.eu/eli/reg/2024/1689/oj";

const FAQ = [
  {
    q: "Dois-je afficher une mention sur mon chatbot de site web ?",
    a: "Oui, sauf si le fait de parler à une machine est évident pour un utilisateur normalement informé. Une phrase claire au premier message, du type « Vous échangez avec un assistant automatisé », suffit à remplir l'obligation de l'article 50, paragraphe 1.",
  },
  {
    q: "Une image ou un texte publié sur mes réseaux et généré par IA doit-il être signalé ?",
    a: "Cela dépend de l'usage. Un deepfake (image, son ou vidéo manipulés de façon réaliste) doit être signalé par le déployeur. Un texte généré par IA publié pour informer le public sur des sujets d'intérêt général doit l'être aussi, sauf s'il a fait l'objet d'une relecture humaine avec responsabilité éditoriale. Un simple visuel illustratif retouché n'entre pas dans ce périmètre.",
  },
  {
    q: "La CNIL contrôle-t-elle l'obligation de transparence de l'AI Act ?",
    a: "Non. Le contrôle de l'AI Act, article 50 compris, relève des autorités nationales de surveillance du marché, à partir du 2 août 2026. La CNIL reste compétente sur le RGPD, c'est-à-dire sur les données personnelles, ce qui est un sujet distinct.",
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

export function TransparenceIaSignalerContenuGenere() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <p>
        À partir du 2 août 2026, une nouvelle règle de l&apos;AI Act
        devient contrôlable et concerne beaucoup plus d&apos;entreprises
        qu&apos;on ne le croit : l&apos;obligation de transparence de
        l&apos;article 50. En clair, quand une IA parle à un humain ou
        fabrique un contenu, cela doit se voir. Chatbots, images de
        synthèse, voix clonées, textes générés : voici ce que vous devez
        signaler, quand, et ce que vous risquez si vous ne le faites pas.
      </p>

      <div className="my-9 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
          En bref
        </p>
        <ul className="mt-4">
          <li>
            L&apos;article 50 de l&apos;AI Act impose de rendre visible le
            recours à l&apos;IA. Il devient contrôlable le 2 août 2026.
          </li>
          <li>
            Cinq situations sont visées : agents conversationnels, contenus
            de synthèse, reconnaissance des émotions, deepfakes, et textes
            d&apos;intérêt public générés par IA.
          </li>
          <li>
            Les contenus de synthèse doivent aussi être marqués dans un
            format lisible par machine. Les IA génératives déjà sur le
            marché ont jusqu&apos;au 2 décembre 2026 pour s&apos;y
            conformer.
          </li>
          <li>
            Une violation expose à une amende pouvant atteindre 15 millions
            d&apos;euros ou 3 % du chiffre d&apos;affaires mondial. Pour une
            PME, c&apos;est le montant le plus faible des deux.
          </li>
        </ul>
      </div>

      <div className="not-prose my-8 flex flex-wrap items-center gap-4">
        <OfficialEmblems url={SOURCE_URL} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-2)]/60">
          Source : Journal officiel de l&apos;Union européenne
        </span>
      </div>

      <h2>Ce que dit l&apos;article 50, en une phrase</h2>
      <p>
        Le principe est simple : une personne a le droit de savoir
        quand elle interagit avec une IA ou quand un contenu a été généré
        ou manipulé par une machine. L&apos;article 50 traduit ce principe
        en obligations concrètes, réparties entre les fournisseurs (ceux
        qui conçoivent l&apos;IA) et les déployeurs (ceux qui l&apos;
        utilisent). La plupart des PME sont dans la seconde catégorie, mais
        pas toujours : dès que vous mettez un chatbot ou un générateur
        d&apos;images à disposition du public, vous pouvez porter les deux
        casquettes.
      </p>

      <h2>Les cinq situations concernées</h2>
      <p>
        <strong>1. Les agents conversationnels.</strong> Si vos clients
        échangent avec un chatbot, un assistant vocal ou tout système conçu
        pour dialoguer, ils doivent être informés qu&apos;ils parlent à une
        machine, à moins que ce soit évident.
      </p>
      <p>
        <strong>2. Les contenus de synthèse.</strong> Les fournisseurs de
        systèmes qui produisent du son, de l&apos;image, de la vidéo ou du
        texte artificiels doivent faire en sorte que ces contenus soient
        marqués dans un format lisible par machine et détectables comme
        générés ou manipulés. C&apos;est l&apos;obligation la plus
        technique, car elle suppose un marquage invisible intégré à la
        production, pas seulement une mention affichée.
      </p>
      <p>
        <strong>3. La reconnaissance des émotions et la catégorisation
        biométrique.</strong> Un déployeur qui utilise un système
        d&apos;analyse des émotions ou de classification biométrique doit
        en informer les personnes exposées.
      </p>
      <p>
        <strong>4. Les deepfakes.</strong> Un déployeur qui diffuse une
        image, un son ou une vidéo constituant un deepfake, c&apos;est-à-
        dire un contenu manipulé de façon réaliste, doit signaler que ce
        contenu a été généré ou manipulé artificiellement.
      </p>
      <p>
        <strong>5. Les textes d&apos;intérêt public.</strong> Un texte
        généré par IA et publié dans le but d&apos;informer le public sur
        des questions d&apos;intérêt général doit être signalé comme tel.
      </p>

      <h2>Les exceptions à connaître</h2>
      <p>
        L&apos;obligation n&apos;est pas absolue. Vous n&apos;avez rien à
        signaler quand le recours à l&apos;IA est déjà évident pour un
        utilisateur normalement informé. Les fonctions d&apos;assistance à
        l&apos;édition qui ne modifient pas substantiellement le contenu
        échappent au marquage. Les oeuvres à caractère artistique, créatif
        ou satirique bénéficient d&apos;un régime allégé, avec une
        divulgation adaptée qui ne gâche pas l&apos;oeuvre. Pour les textes
        d&apos;intérêt public, la mention n&apos;est pas requise si le
        contenu a fait l&apos;objet d&apos;une relecture humaine et
        qu&apos;une personne ou une entité en assume la responsabilité
        éditoriale. Des exceptions existent enfin pour certains usages
        autorisés des forces de l&apos;ordre.
      </p>

      <h2>Quand, et comment le signaler</h2>
      <p>
        Le règlement fixe le moment : l&apos;information doit être donnée
        de manière claire et identifiable, au plus tard lors de la première
        interaction ou exposition. Concrètement, pour un chatbot, la
        mention arrive au premier message. Pour un deepfake diffusé, le
        signalement accompagne le contenu dès sa publication.
      </p>
      <p>
        Le marquage des contenus de synthèse est plus exigeant. Il ne
        s&apos;agit pas seulement d&apos;une phrase visible, mais d&apos;un
        signal technique intégré au fichier, du type filigrane numérique ou
        métadonnées, pour qu&apos;une machine puisse le détecter. Le Digital
        Omnibus a resserré le calendrier de déploiement de ces solutions,
        ramené de six à trois mois. Les systèmes d&apos;IA générative déjà
        sur le marché avant le 2 août 2026 doivent se conformer à
        l&apos;article 50, paragraphe 2, au plus tard le 2 décembre 2026.
      </p>

      <h2>Ce que vous risquez</h2>
      <p>
        Le manquement aux obligations de transparence de l&apos;article 50
        relève de la deuxième tranche de sanctions de l&apos;AI Act : une
        amende administrative pouvant atteindre 15 millions d&apos;euros ou
        3 % du chiffre d&apos;affaires annuel mondial, le montant le plus
        élevé étant retenu. Le règlement prévoit une atténuation pour les
        PME et les jeunes pousses : dans leur cas, c&apos;est au contraire
        le montant le plus faible qui s&apos;applique. La sanction n&apos;
        est pas le seul enjeu. Un chatbot ou un visuel non signalé, c&apos;
        est aussi un risque de réputation et de confiance vis-à-vis de vos
        clients.
      </p>
      <p>
        Le contrôle relève des autorités nationales de surveillance du
        marché, désignées par chaque État membre, à partir du 2 août 2026.
        La CNIL n&apos;est pas cette autorité : elle reste compétente sur le
        RGPD, donc sur les données personnelles, ce qui est un sujet
        distinct de la transparence des contenus.
      </p>

      <h2>Par où commencer, côté PME</h2>
      <p>
        Faites la liste des endroits où une IA parle à la place de vos
        équipes ou fabrique un contenu diffusé : chatbot du site, assistant
        téléphonique, images et vidéos générées pour vos réseaux, textes
        publiés sous votre marque. Pour chacun, posez la bonne mention et,
        pour les contenus de synthèse, vérifiez avec votre prestataire que
        le marquage lisible par machine est bien activé. Le point de
        vigilance le plus fréquent en PME reste le chatbot de relation
        client et les visuels générés pour la communication.
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
        La transparence n&apos;est qu&apos;une des obligations qui
        deviennent exigibles le 2 août 2026, et elle suppose que vos
        équipes sachent reconnaître un usage concerné. Nos{" "}
        <a href="https://troie.app" target="_blank" rel="noopener">
          formations en ligne sur troie.app
        </a>{" "}
        couvrent les usages de l&apos;IA en entreprise avec un QCM par
        module et une attestation de formation qui documente les mesures
        prises au titre de l&apos;article 4. Notre page dédiée à
        l&apos;<Link href="/ia/ai-act">AI Act</Link> résume toutes les
        échéances à jour, et notre article sur{" "}
        <Link href="/blog/ai-act-controlable-2-aout-2026">
          ce qui devient contrôlable le 2 août 2026
        </Link>{" "}
        replace la transparence dans le calendrier d&apos;ensemble. Premier
        pas simple : un audit gratuit de 30 minutes pour situer vos
        obligations réelles.
      </p>

      <p>
        <em>
          Sources : règlement (UE) 2024/1689 (AI Act), article 50
          (obligations de transparence) et article 99 (sanctions),
          EUR-Lex ; calendrier d&apos;application publié par la Commission
          européenne (digital-strategy.ec.europa.eu) ; ajustement du délai
          de marquage par le Digital Omnibus sur l&apos;IA. Faits vérifiés
          le 20 juillet 2026. Cette page est une synthèse pédagogique, pas
          un conseil juridique.
        </em>
      </p>
    </>
  );
}
