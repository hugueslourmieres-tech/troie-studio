import Link from "next/link";
import { OfficialEmblems } from "@/components/OfficialEmblems";

/**
 * Article : le regime de sanctions de l'AI Act pour les entreprises.
 * Faits verifies le 24/07/2026 sur source primaire : reglement (UE)
 * 2024/1689, article 99 (sanctions) et article 101 (amendes pour les
 * fournisseurs de modeles a usage general), EUR-Lex ; calendrier
 * d'application publie par la Commission europeenne. Points de prudence :
 * les trois plafonds d'amende (35 M / 7 %, 15 M / 3 %, 7,5 M / 1 %) sont
 * "le montant le plus ELEVE des deux" pour une entreprise, MAIS "le plus
 * FAIBLE" pour les PME et jeunes pousses (art. 99, para. 6). L'article 4
 * (litteratie IA) n'a PAS d'amende dediee dans le reglement. Le regime de
 * sanctions devient applicable le 2 aout 2026 ; le controle releve des
 * autorites nationales de surveillance du marche (JAMAIS la CNIL, qui
 * reste sur le RGPD). ZERO em-dash.
 */

const SOURCE_URL = "https://eur-lex.europa.eu/eli/reg/2024/1689/oj";

const FAQ = [
  {
    q: "Quelle est l'amende maximale prévue par l'AI Act ?",
    a: "L'amende la plus lourde vise les pratiques d'IA interdites par l'article 5 : jusqu'à 35 millions d'euros ou 7 % du chiffre d'affaires annuel mondial, le montant le plus élevé étant retenu. Les manquements aux autres obligations, comme la transparence de l'article 50, plafonnent à 15 millions d'euros ou 3 %. Fournir de fausses informations aux autorités expose à 7,5 millions d'euros ou 1 %.",
  },
  {
    q: "Les sanctions de l'AI Act s'appliquent-elles aux PME ?",
    a: "Oui, mais avec un plafond réduit. Pour les PME et les jeunes pousses, chaque amende est plafonnée au montant le plus faible entre la somme fixe et le pourcentage du chiffre d'affaires, alors que c'est le plus élevé qui s'applique aux grandes entreprises. Le règlement impose aussi de tenir compte de la taille et des intérêts de l'entreprise pour fixer la sanction.",
  },
  {
    q: "Risque-t-on une amende si on n'a pas formé ses équipes à l'IA ?",
    a: "L'obligation de littératie IA de l'article 4 n'a pas d'amende dédiée dans le règlement, contrairement aux pratiques interdites ou à la transparence. En cas de manquement, l'autorité nationale de surveillance du marché peut ordonner des mesures correctives à partir du 2 août 2026. Le vrai risque est indirect : sans équipes formées, les autres manquements sanctionnables deviennent bien plus probables.",
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

export function AiActSanctionsEntreprise() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <p>
        Que risque vraiment une entreprise qui ne respecte pas l&apos;AI Act ?
        Les amendes vont jusqu&apos;à 35 millions d&apos;euros ou 7 % du chiffre
        d&apos;affaires mondial pour les usages d&apos;IA interdits, 15 millions
        d&apos;euros ou 3 % pour les autres manquements, et 7,5 millions
        d&apos;euros ou 1 % pour de fausses informations aux autorités. Ce
        régime de sanctions du règlement (UE) 2024/1689 devient applicable le
        2 août 2026. Voici les trois niveaux, qui les prononce, et pourquoi les
        montants affichés ne racontent qu&apos;une partie de l&apos;histoire.
      </p>

      <div className="my-9 rounded-sm border border-[var(--rule)] bg-[var(--bg-2)] p-6 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
          En bref
        </p>
        <ul className="mt-4">
          <li>
            L&apos;AI Act prévoit trois niveaux d&apos;amende : 35 M€ ou 7 % du
            chiffre d&apos;affaires mondial, 15 M€ ou 3 %, et 7,5 M€ ou 1 %,
            selon la gravité du manquement.
          </li>
          <li>
            Pour une entreprise, c&apos;est le montant le plus élevé des deux
            qui s&apos;applique. Pour une PME ou une jeune pousse, c&apos;est au
            contraire le plus faible.
          </li>
          <li>
            L&apos;obligation de formation de l&apos;article 4 n&apos;a pas
            d&apos;amende dédiée : le risque est un manquement constaté et des
            mesures correctives, pas une amende directe.
          </li>
          <li>
            Le régime devient applicable le 2 août 2026. Le contrôle relève des
            autorités nationales de surveillance du marché, pas de la CNIL.
          </li>
        </ul>
      </div>

      <div className="not-prose my-8 flex flex-wrap items-center gap-4">
        <OfficialEmblems url={SOURCE_URL} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-2)]/60">
          Source : Journal officiel de l&apos;Union européenne
        </span>
      </div>

      <h2>Les trois niveaux de sanction</h2>
      <p>
        L&apos;article 99 du règlement organise les amendes en trois tranches,
        de la plus lourde à la plus légère. La logique est simple : plus le
        manquement met en danger les droits des personnes, plus la sanction est
        élevée.
      </p>
      <p>
        <strong>1. Pratiques interdites : 35 M€ ou 7 %.</strong> C&apos;est la
        tranche maximale. Elle vise les usages d&apos;IA proscrits par
        l&apos;article 5 : notation sociale, manipulation, exploitation des
        vulnérabilités, certaines identifications biométriques. L&apos;amende
        peut atteindre 35 millions d&apos;euros ou 7 % du chiffre d&apos;affaires
        annuel mondial, le montant le plus élevé étant retenu.
      </p>
      <p>
        <strong>2. Autres obligations : 15 M€ ou 3 %.</strong> C&apos;est la
        tranche qui concerne le plus d&apos;entreprises. Elle couvre les
        manquements aux obligations des fournisseurs et des déployeurs, y
        compris l&apos;obligation de transparence de l&apos;article 50 (signaler
        un chatbot, un deepfake, un contenu généré). Le plafond est de 15
        millions d&apos;euros ou 3 % du chiffre d&apos;affaires mondial.
      </p>
      <p>
        <strong>3. Fausses informations : 7,5 M€ ou 1 %.</strong> Fournir des
        informations incorrectes, incomplètes ou trompeuses aux autorités ou aux
        organismes notifiés expose à une amende pouvant atteindre 7,5 millions
        d&apos;euros ou 1 % du chiffre d&apos;affaires mondial.
      </p>

      <h2>Le piège du « montant le plus élevé »</h2>
      <p>
        Pour une grande entreprise, chaque plafond retient le montant le plus
        élevé entre la somme fixe et le pourcentage. Pour une PME ou une jeune
        pousse, le règlement inverse la règle : c&apos;est le montant le plus
        faible qui s&apos;applique. Une TPE ne risque donc pas mécaniquement 35
        millions d&apos;euros. C&apos;est une protection réelle, mais pas un
        blanc-seing : l&apos;amende reste dissuasive à l&apos;échelle d&apos;une
        petite structure, et elle s&apos;ajoute au coût de la mise en conformité
        forcée.
      </p>

      <h2>Le cas de l&apos;article 4 sur la formation</h2>
      <p>
        C&apos;est une nuance importante et souvent mal comprise.
        L&apos;obligation de littératie IA de l&apos;article 4, celle qui impose
        de former les personnes qui utilisent l&apos;IA, ne figure pas dans la
        liste des manquements assortis d&apos;une amende à l&apos;article 99. Il
        n&apos;existe donc pas d&apos;amende directe « pour défaut de
        formation ». Cela ne veut pas dire qu&apos;on peut l&apos;ignorer. Une
        autorité de surveillance peut constater le manquement et ordonner des
        mesures correctives. Surtout, une équipe non formée multiplie les
        risques de tomber, elle, sous une tranche sanctionnée : un chatbot non
        signalé, un contenu généré non marqué, un usage à haut risque mal
        encadré. La formation n&apos;est pas ce qui déclenche l&apos;amende,
        c&apos;est ce qui l&apos;évite.
      </p>

      <h2>Qui contrôle, et depuis quand</h2>
      <p>
        Le régime de sanctions devient applicable le 2 août 2026. À partir de
        cette date, les autorités nationales de surveillance du marché,
        désignées par chaque État membre, peuvent contrôler et sanctionner. La
        CNIL n&apos;est pas cette autorité pour l&apos;AI Act : elle reste
        compétente sur le RGPD, donc sur les données personnelles, ce qui est un
        sujet distinct. Le règlement encadre aussi la fixation des amendes : les
        autorités doivent tenir compte de la gravité du manquement, de sa durée,
        de la taille de l&apos;entreprise et de sa part de marché. Une sanction
        n&apos;est pas automatique ni forfaitaire, elle est proportionnée.
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
        La meilleure protection contre les sanctions n&apos;est pas de les
        connaître par coeur, c&apos;est d&apos;avoir pris des mesures et de
        pouvoir le prouver. Nos{" "}
        <a href="https://troie.app" target="_blank" rel="noopener">
          formations en ligne sur troie.app
        </a>{" "}
        couvrent les usages de l&apos;IA en entreprise avec un QCM par module et
        une attestation de formation vérifiable, qui documente les mesures
        prises au titre de l&apos;article 4. Notre page sur l&apos;
        <Link href="/ia/ai-act">AI Act</Link> résume les échéances, notre
        article sur les{" "}
        <Link href="/blog/article-4-ai-act-exemples-mesures">
          mesures concrètes de l&apos;article 4
        </Link>{" "}
        détaille quoi faire, et celui sur{" "}
        <Link href="/blog/transparence-ia-signaler-contenu-genere">
          les contenus à signaler
        </Link>{" "}
        couvre la tranche des 15 M€. Premier pas simple : un audit gratuit de 30
        minutes pour situer vos obligations réelles et votre exposition.
      </p>

      <p>
        <em>
          Sources : règlement (UE) 2024/1689 (AI Act), article 99 (sanctions) et
          article 101 (amendes pour les fournisseurs de modèles à usage
          général), EUR-Lex ; calendrier d&apos;application publié par la
          Commission européenne (digital-strategy.ec.europa.eu). Faits vérifiés
          le 24 juillet 2026. Cette page est une synthèse pédagogique, pas un
          conseil juridique.
        </em>
      </p>
    </>
  );
}
