/**
 * La checklist AI Act pour PME, en sept étapes. Une seule source pour la
 * page /[locale]/outils/checklist-ai-act et pour le PDF à cocher.
 * Portée depuis troie.app le 23/10/2026, réécrite au vocabulaire de
 * l'agence : sensibilisation, ateliers, accompagnement, jamais « formation ».
 */
export const CHECKLIST_STEPS: { title: string; body: string }[] = [
  {
    title: "Inventorier vos usages de l'IA",
    body: "Qui utilise quoi : ChatGPT, Claude, Gemini, Copilot, fonctions IA des logiciels métier. Y compris les usages officieux et les comptes personnels utilisés pour le travail.",
  },
  {
    title: "Trier par niveau de risque",
    body: "Vérifier qu'aucun usage ne touche aux pratiques interdites, ni au haut risque (tri de candidatures, évaluation de salariés, accès au crédit) sans encadrement.",
  },
  {
    title: "Écrire les règles d'usage",
    body: "Pas de données confidentielles dans les outils grand public. Une relecture humaine avant tout envoi qui engage. Dire quand un contenu est généré. La charte d'usage en dix règles couvre ces points.",
  },
  {
    title: "Faire monter les équipes en maîtrise",
    body: "Article 4, applicable depuis le 2 février 2025 : prendre des mesures pour un niveau suffisant de maîtrise de l'IA, proportionné aux usages réels. Ateliers, sensibilisation, accompagnement : le format est libre.",
  },
  {
    title: "Garder une trace, personne par personne",
    body: "Qui a suivi quoi, quand, avec quel intervenant. Aucun certificat n'est exigé, mais l'effort doit pouvoir se montrer. La trace se range avec la charte et le registre.",
  },
  {
    title: "Désigner un référent IA",
    body: "Une personne nommée, pas un service. Elle tient le registre, valide les nouveaux outils, reçoit les signalements et suit l'évolution du règlement.",
  },
  {
    title: "Prévoir une revue trimestrielle",
    body: "Trente minutes par trimestre : nouveaux outils, nouvelles personnes, incidents. La charte et le registre restent vivants.",
  },
];
