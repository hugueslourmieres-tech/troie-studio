/**
 * Article : le 2 aout 2026, l'AI Act devient controlable (fin de
 * l'impunite de fait). Faits verifies les 05-06/07/2026, cf. brief
 * CONTENU-AI-ACT-2-AOUT. Prudence : ne pas nommer la CNIL comme
 * autorite de controle (designation francaise non confirmee).
 */
import { OfficialEmblems } from "@/components/OfficialEmblems";

const SOURCE_URL =
  "https://www.entreprises.gouv.fr/decryptages-de-nos-experts/le-reglement-europeen-sur-lintelligence-artificielle-publics-concernes";

const FAQ = [
  {
    q: "L'obligation de formation concerne-t-elle les entreprises de moins de 10 salariés ?",
    a: "Oui. L'article 4 ne prévoit aucun seuil d'effectif : toute organisation qui déploie un système d'IA est concernée.",
  },
  {
    q: "Une attestation de suivi de formation suffit-elle ?",
    a: "C'est la base de la preuve, mais la proportionnalité compte : la formation doit correspondre aux usages réels (un commercial qui rédige avec l'IA et un développeur qui code avec n'ont pas le même besoin).",
  },
  {
    q: "Nous n'utilisons pas d'IA, sommes-nous tranquilles ?",
    a: "Vérifiez d'abord l'usage réel : le shadow IT est massif. Si un seul collaborateur utilise un outil d'IA pour travailler, vous êtes déployeur.",
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

export function AiActControlable2Aout2026() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />

      <p>
        Le 2 août 2026, le règlement européen sur l&apos;intelligence
        artificielle entre dans sa phase de contrôle. L&apos;obligation de
        former vos équipes à l&apos;IA, elle, existe déjà depuis février
        2025. Voici ce qui change, qui est concerné, et le minimum vital à
        mettre en place.
      </p>

      <div className="not-prose my-8 flex flex-wrap items-center gap-4">
        <OfficialEmblems url={SOURCE_URL} />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-2)]/60">
          Source : République française · Union européenne
        </span>
      </div>

      <h2>Le 2 août 2026, qu&apos;est-ce qui change exactement ?</h2>
      <p>
        Le règlement (UE) 2024/1689, dit AI Act, est entré en vigueur le
        1er août 2024 avec un calendrier progressif : interdiction des
        pratiques inacceptables depuis février 2025, obligations pour les
        modèles d&apos;IA à usage général depuis août 2025, et application
        générale le 2 août 2026. À cette date, les autorités nationales de
        surveillance peuvent contrôler et sanctionner les manquements.
        Autrement dit : les obligations existaient déjà, c&apos;est
        l&apos;impunité de fait qui prend fin.
      </p>

      <h2>L&apos;article 4 : l&apos;obligation que la plupart des PME ont déjà ratée</h2>
      <p>
        Depuis le 2 février 2025, l&apos;article 4 impose à toute
        organisation qui utilise des systèmes d&apos;IA (un « déployeur »,
        même une TPE qui utilise ChatGPT ou Claude au quotidien) de
        garantir un niveau suffisant de littératie IA à ses équipes. Pas de
        seuil d&apos;effectif. Pas de programme standard imposé : un
        principe de proportionnalité, le plan de formation doit
        correspondre aux rôles, aux outils utilisés et aux risques
        associés.
      </p>
      <p>Trois questions pour savoir si vous êtes concerné :</p>
      <ol>
        <li>
          Vos équipes utilisent-elles un outil d&apos;IA, même gratuit,
          dans leur travail ? (Si oui, vous êtes déployeur.)
        </li>
        <li>
          Avez-vous un document qui décrit qui utilise quoi, pour quoi
          faire, avec quelles limites ?
        </li>
        <li>
          Vos collaborateurs ont-ils reçu une formation adaptée à leur
          usage réel ?
        </li>
      </ol>
      <p>Deux non sur trois : vous avez un chantier de conformité.</p>

      <h2>Que risque concrètement une PME ?</h2>
      <p>
        Avant le 2 août 2026, le risque principal était civil : un salarié
        mal formé qui cause un dommage avec un outil d&apos;IA engage la
        responsabilité de l&apos;entreprise. À partir du 2 août 2026, les
        autorités nationales peuvent contrôler et sanctionner. Le niveau de
        sanction dépend de la nature du manquement et sera précisé par le
        dispositif national : ce qui est certain, c&apos;est que « on ne
        savait pas » ne sera plus audible, l&apos;obligation ayant plus de
        18 mois d&apos;ancienneté.
      </p>

      <h2>Le minimum vital avant le 2 août : un plan réaliste en quatre semaines</h2>
      <ol>
        <li>
          <strong>Cartographier :</strong> lister les outils d&apos;IA
          utilisés dans l&apos;entreprise, officiels et officieux.
        </li>
        <li>
          <strong>Cadrer :</strong> une charte d&apos;usage d&apos;une page
          (usages autorisés, données interdites, validation humaine).
        </li>
        <li>
          <strong>Former :</strong> une formation proportionnée par profil
          d&apos;usage, avec trace écrite (attestations).
        </li>
        <li>
          <strong>Documenter :</strong> conserver la preuve des trois
          points précédents. C&apos;est elle qui vous protège en cas de
          contrôle.
        </li>
      </ol>

      <h2>Questions fréquentes</h2>
      {FAQ.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}

      <h2>Par où commencer</h2>
      <p>
        TROIE Studio forme les équipes des PME à l&apos;IA (parcours en
        ligne et supervision continue) et met votre documentation en
        conformité. Le premier pas est un audit gratuit de 30 minutes :
        on regarde vos usages réels et on vous dit où vous en êtes.
      </p>

      <p>
        <em>
          Sources : règlement (UE) 2024/1689 (EUR-Lex, adopté le 13 juin
          2024, en vigueur le 1er août 2024) ; calendrier d&apos;application
          publié par la Commission européenne ; article 4 (littératie IA),
          applicable depuis le 2 février 2025. Faits vérifiés en juillet
          2026.
        </em>
      </p>
    </>
  );
}
