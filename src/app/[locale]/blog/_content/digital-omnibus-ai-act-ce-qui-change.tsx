import Link from "next/link";
import { OfficialEmblems } from "@/components/OfficialEmblems";

/**
 * Article : le Digital Omnibus sur l'IA, adopte definitivement par le
 * Conseil le 29/06/2026. Faits verifies le 15/07/2026 sur sources
 * primaires : communique du Conseil du 29/06/2026, texte final
 * PE-CONS 30/1/26 REV 1 (LEX 2532, Strasbourg, 8 juillet 2026),
 * calendrier et Q&R litteratie de la Commission.
 * Prudence : l'article 4 est ALLEGE (obligation de moyens), pas
 * supprime. Ne jamais nommer la CNIL comme autorite de controle de
 * l'AI Act (CNIL = RGPD uniquement).
 */

const SOURCE_URL =
  "https://www.consilium.europa.eu/en/press/press-releases/2026/06/29/artificial-intelligence-council-gives-final-green-light-to-simplify-and-streamline-rules/";

const FAQ = [
  {
    q: "Le report des règles sur l'IA à haut risque me dispense-t-il de former mes équipes ?",
    a: "Non. Le report ne concerne que le chapitre III du règlement, celui des systèmes à haut risque. L'obligation de littératie IA relève de l'article 4, au chapitre I, applicable depuis le 2 février 2025 et non reportée par le Digital Omnibus.",
  },
  {
    q: "L'obligation de formation à l'IA est-elle supprimée par le Digital Omnibus ?",
    a: "Non. Elle est réécrite. Les fournisseurs et les déployeurs doivent toujours prendre des mesures, mais pour soutenir le développement de la littératie IA de leur personnel. Le texte précise que l'obligation n'impose pas de garantir un niveau spécifique pour une personne donnée : c'est une obligation de moyens, pas de résultat.",
  },
  {
    q: "Qui contrôle l'application de l'AI Act, et à partir de quand ?",
    a: "Les autorités nationales de surveillance du marché désignées par chaque État membre, à partir du 2 août 2026. La CNIL, elle, reste compétente sur le RGPD, c'est-à-dire sur les données personnelles, ce qui est un sujet distinct.",
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

export function DigitalOmnibusAiActCeQuiChange() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <p>
        Le 29 juin 2026, le Conseil de l&apos;Union européenne a adopté
        définitivement le Digital Omnibus sur l&apos;IA, le texte qui
        simplifie le règlement européen sur l&apos;intelligence
        artificielle. Les gros titres ont retenu le report des règles sur
        l&apos;IA à haut risque. Pour une PME, l&apos;essentiel est
        ailleurs : le 2 août 2026 n&apos;a pas bougé, et
        l&apos;obligation de formation de l&apos;article 4 change de
        nature sans disparaître.
      </p>

      <div className="my-9 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
          En bref
        </p>
        <ul className="mt-4">
          <li>
            Le Digital Omnibus sur l&apos;IA a reçu le feu vert final du
            Conseil le 29 juin 2026. Il entre en vigueur le troisième jour
            suivant sa publication au Journal officiel de l&apos;Union
            européenne.
          </li>
          <li>
            Les règles sur les systèmes d&apos;IA à haut risque sont
            reportées : 2 décembre 2027 pour les systèmes autonomes,
            2 août 2028 pour ceux intégrés à des produits.
          </li>
          <li>
            Le 2 août 2026 reste la date d&apos;application générale :
            obligations de transparence de l&apos;article 50 et pouvoirs
            de contrôle des autorités nationales.
          </li>
          <li>
            L&apos;article 4 sur la littératie IA est réécrit en
            obligation de moyens. Il n&apos;est ni reporté, ni supprimé.
          </li>
        </ul>
      </div>

      <div className="not-prose my-8 flex flex-wrap items-center gap-4">
        <OfficialEmblems url={SOURCE_URL} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-2)]/60">
          Source : Conseil de l&apos;Union européenne
        </span>
      </div>

      <h2>Ce qui a été adopté le 29 juin 2026</h2>
      <p>
        Le Digital Omnibus sur l&apos;IA fait partie du paquet de
        simplification que la Commission avait proposé le 17 novembre
        2025. Le Parlement européen l&apos;a approuvé en séance plénière
        le 16 juin 2026, et le Conseil lui a donné son feu vert final le
        29 juin 2026. Le texte modifie le règlement (UE) 2024/1689, dit
        AI Act, sans le remplacer : le règlement d&apos;origine reste la
        référence, l&apos;Omnibus en ajuste le calendrier et certaines
        obligations. La publication au Journal officiel déclenche
        l&apos;entrée en vigueur, fixée au troisième jour qui la suit.
      </p>

      <h2>Ce qui est reporté : l&apos;IA à haut risque</h2>
      <p>
        C&apos;est le cœur de l&apos;Omnibus, et la raison de son
        urgence : les obligations applicables aux systèmes d&apos;IA à
        haut risque devaient s&apos;appliquer le 2 août 2026, alors que
        les normes techniques censées aider les entreprises à s&apos;y
        conformer n&apos;étaient pas prêtes. Les co-législateurs ont donc
        fixé deux nouvelles dates : le{" "}
        <strong>2 décembre 2027</strong> pour les systèmes autonomes
        classés à haut risque (annexe III) et le{" "}
        <strong>2 août 2028</strong> pour les systèmes intégrés à des
        produits comme les ascenseurs ou les jouets (annexe I).
      </p>
      <p>
        Beaucoup de dirigeants en concluent que le sujet ne les concerne
        plus. C&apos;est vrai pour la majorité des PME, dont les usages
        (rédaction, synthèse, support client) ne relèvent pas du haut
        risque. Ça l&apos;est beaucoup moins qu&apos;on ne le croit dès
        qu&apos;on touche aux ressources humaines : trier des
        candidatures ou évaluer des salariés avec un outil d&apos;IA
        relève de l&apos;annexe III. Une PME qui fait ça est déployeuse
        d&apos;un système à haut risque, et gagne simplement du temps
        jusqu&apos;au 2 décembre 2027.
      </p>

      <h2>Ce qui n&apos;est pas reporté : le 2 août 2026</h2>
      <p>
        L&apos;Omnibus n&apos;a pas décalé la date d&apos;application
        générale du règlement. Au 2 août 2026, deux choses arrivent.
      </p>
      <p>
        <strong>Les obligations de transparence de l&apos;article 50.</strong>{" "}
        Un utilisateur doit savoir qu&apos;il parle à une machine quand il
        s&apos;adresse à un agent conversationnel, un contenu manipulé de
        type deepfake doit être signalé, et les contenus de synthèse
        doivent être marqués dans un format lisible par machine. Sur ce
        point, l&apos;Omnibus a même resserré le calendrier : le délai de
        grâce accordé aux fournisseurs pour déployer leurs solutions de
        marquage passe de six à trois mois. Les systèmes d&apos;IA
        générative déjà sur le marché avant le 2 août 2026 doivent se
        conformer à l&apos;article 50, paragraphe 2, au plus tard le
        2 décembre 2026.
      </p>
      <p>
        <strong>Les pouvoirs de contrôle.</strong>{" "}
        À partir de cette date,
        les autorités nationales de surveillance du marché peuvent
        contrôler et sanctionner. C&apos;est le vrai basculement : les
        obligations existaient déjà, c&apos;est leur exigibilité qui
        change.
      </p>
      <p>
        À noter aussi, une nouveauté qui ne figurait pas dans le règlement
        d&apos;origine : l&apos;Omnibus interdit les pratiques
        d&apos;IA générant des contenus sexuels ou intimes non consentis
        ainsi que les contenus pédocriminels. Cette interdiction
        s&apos;applique à partir du 2 décembre 2026.
      </p>

      <h2>L&apos;article 4 change de nature, et c&apos;est mal compris</h2>
      <p>
        C&apos;est le changement le plus important pour une PME, et le
        moins commenté. La Commission avait proposé de transférer purement
        et simplement l&apos;obligation de littératie IA aux États membres,
        ce qui revenait à la retirer aux entreprises. Les co-législateurs
        ne l&apos;ont pas suivie. Ils ont réécrit l&apos;article 4, qui
        reste une obligation des fournisseurs et des déployeurs.
      </p>
      <p>
        La version d&apos;origine imposait de prendre des mesures pour{" "}
        <strong>garantir un niveau suffisant</strong>{" "}
        de maîtrise de l&apos;IA. La nouvelle version impose de prendre des mesures pour{" "}
        <strong>soutenir le développement</strong>{" "}
        de la littératie IA du personnel, en tenant compte des connaissances techniques, de
        l&apos;expérience, de la formation des personnes concernées et du
        contexte d&apos;usage. Et le texte ajoute une phrase qui tranche
        le débat : cette obligation n&apos;impose pas de garantir un
        niveau spécifique de littératie IA pour un individu donné.
      </p>
      <p>
        En clair, on passe d&apos;une obligation de résultat à une
        obligation de moyens. Les considérants l&apos;assument : les
        obligations strictes créaient une charge de conformité
        disproportionnée, en particulier pour les petites entreprises. Le
        même texte prévoit désormais que la Commission et les États
        membres doivent soutenir les fournisseurs et déployeurs,{" "}
        <em>en particulier les PME</em>, et que la Commission publie des
        exemples pratiques de mise en conformité.
      </p>
      <blockquote>
        La littératie IA devrait être une priorité stratégique,
        indépendamment des obligations réglementaires et des sanctions
        potentielles.
      </blockquote>
      <p>
        Cette phrase est tirée des considérants du texte adopté. Elle
        résume bien la situation : le législateur allège la contrainte
        parce qu&apos;il considère que l&apos;argument de la sanction
        n&apos;est pas le bon.
      </p>

      <h2>Ce que ça change pour votre plan de formation</h2>
      <p>
        <strong>Alléger n&apos;est pas supprimer.</strong>{" "}
        Ne rien faire reste non conforme. Une obligation de moyens exige des mesures
        réelles : c&apos;est leur absence, pas le niveau de vos
        collaborateurs, qui vous met en défaut.
      </p>
      <p>
        <strong>La preuve compte encore plus, pas moins.</strong>{" "}
        Puisque vous n&apos;avez plus à démontrer un niveau atteint, ce que vous
        devez pouvoir montrer, ce sont les mesures prises : qui a été
        formé, quand, sur quoi, et pourquoi ce format était adapté à
        l&apos;usage réel. C&apos;est exactement ce qu&apos;une trace de
        formation documente.
      </p>
      <p>
        <strong>La proportionnalité devient la règle.</strong>{" "}
        Un plan léger et cohérent avec vos usages vaut mieux qu&apos;un programme
        surdimensionné. Inutile de sur-investir : il faut être capable de
        justifier vos choix.
      </p>
      <p>
        <strong>Le calendrier ne bouge pas.</strong>{" "}
        L&apos;article 4 s&apos;applique depuis le 2 février 2025. Les autorités
        nationales peuvent contrôler à partir du 2 août 2026. Une
        obligation qui aura alors dix-huit mois d&apos;ancienneté.
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
        Faites l&apos;inventaire honnête des outils d&apos;IA réellement
        utilisés dans vos équipes, posez vos règles d&apos;usage, formez
        par métier, et gardez la trace. Nos{" "}
        <a href="https://troie.app" target="_blank" rel="noopener">
          formations en ligne sur troie.app
        </a>{" "}
        couvrent ce périmètre avec un QCM par module et une attestation de
        formation qui documente les mesures prises. Notre page dédiée à
        l&apos;<Link href="/ia/ai-act">AI Act</Link> résume toutes les
        échéances à jour, et notre article sur{" "}
        <Link href="/blog/formation-ia-obligatoire-entreprise">
          ce que dit vraiment l&apos;article 4
        </Link>{" "}
        détaille le contenu d&apos;une démarche sérieuse. Premier pas
        simple : un audit gratuit de 30 minutes pour situer vos
        obligations réelles. Certification Qualiopi en cours.
      </p>

      <p>
        <em>
          Sources : Conseil de l&apos;Union européenne, communiqué du
          29 juin 2026 ; texte final PE-CONS 30/1/26 REV 1 (LEX 2532,
          Strasbourg, 8 juillet 2026) modifiant le règlement (UE)
          2024/1689 ; calendrier d&apos;application et questions-réponses
          sur la littératie IA publiés par la Commission européenne
          (digital-strategy.ec.europa.eu) ; règlement (UE) 2024/1689
          (EUR-Lex). Faits vérifiés le 15 juillet 2026. Cette page est une
          synthèse pédagogique, pas un conseil juridique.
        </em>
      </p>
    </>
  );
}
