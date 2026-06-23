import type { QuizQuestion } from "./QuizPlayer";

/* ─────────────────────────────────────────────────────────────────────
   NIVEAU_IA : QCM "Connaître son niveau en IA" (10 questions).
   Difficulté croissante (bases -> avancé) pour situer le répondant sur
   3 paliers : Débutant, Intermédiaire, Avancé. Pour tous, gratuit.
   ───────────────────────────────────────────────────────────────────── */

export const NIVEAU_IA: QuizQuestion[] = [
  {
    id: "n1",
    prompt: "ChatGPT, Claude ou Gemini, ce sont avant tout :",
    options: [
      "Des moteurs de recherche comme Google.",
      "Des IA génératives qui produisent du texte (et plus).",
      "Des antivirus nouvelle génération.",
      "Des réseaux sociaux.",
    ],
    correctIndex: 1,
    explanation:
      "Ce sont des IA génératives : à partir de votre demande, elles produisent du texte, du code, des images selon l'outil. Elles ne « cherchent » pas une page web, elles génèrent une réponse.",
  },
  {
    id: "n2",
    prompt: "Un « prompt », c'est :",
    options: [
      "Un bug de l'IA.",
      "Le nom du modèle utilisé.",
      "L'instruction (le message) que vous donnez à l'IA.",
      "Un abonnement payant.",
    ],
    correctIndex: 2,
    explanation:
      "Le prompt, c'est ce que vous écrivez à l'IA. La qualité de votre prompt (clarté, contexte, exemple) change radicalement la qualité de la réponse.",
  },
  {
    id: "n3",
    prompt: "Quand une IA affirme une information fausse avec assurance, on parle de :",
    options: ["Un crash.", "Une hallucination.", "Un spam.", "Un cache."],
    correctIndex: 1,
    explanation:
      "C'est une « hallucination » : le modèle génère une réponse plausible mais inexacte. D'où l'importance de vérifier les faits importants et de demander les sources.",
  },
  {
    id: "n4",
    prompt: "Pour obtenir une bien meilleure réponse, le plus efficace est souvent de :",
    options: [
      "Écrire en majuscules.",
      "Répéter la question plusieurs fois.",
      "Donner du contexte et un exemple du résultat attendu.",
      "Payer l'abonnement le plus cher.",
    ],
    correctIndex: 2,
    explanation:
      "Contexte + exemple = la base d'un bon prompt. Dire à l'IA pour qui, dans quel but, et à quoi doit ressembler le résultat améliore tout de suite la sortie.",
  },
  {
    id: "n5",
    prompt: "La « fenêtre de contexte » d'un modèle, c'est :",
    options: [
      "La taille de l'écran.",
      "La quantité de texte qu'il peut prendre en compte d'un coup.",
      "Le nombre d'utilisateurs connectés.",
      "La vitesse de réponse.",
    ],
    correctIndex: 1,
    explanation:
      "C'est la « mémoire de travail » du modèle pour une conversation : tout ce qu'il peut lire et garder en tête à un instant donné (votre demande, les documents collés, l'historique).",
  },
  {
    id: "n6",
    prompt: "Avec des données clients sensibles, le bon réflexe est :",
    options: [
      "Les coller dans n'importe quel outil gratuit, c'est égal.",
      "Éviter les outils grand public sans garanties, et cadrer l'usage.",
      "Les envoyer par email à l'IA.",
      "Ne jamais utiliser d'IA, point.",
    ],
    correctIndex: 1,
    explanation:
      "Confidentialité et conformité (RGPD) d'abord : on évite de coller des données sensibles dans un outil grand public sans garanties, on choisit les bons réglages et les bonnes offres (entreprise, données non réutilisées).",
  },
  {
    id: "n7",
    prompt: "Le « RAG » (Retrieval-Augmented Generation) sert à :",
    options: [
      "Rendre l'IA plus rapide.",
      "Brancher l'IA sur vos documents et sources pour répondre avec vos données.",
      "Traduire automatiquement.",
      "Créer des images.",
    ],
    correctIndex: 1,
    explanation:
      "Le RAG connecte le modèle à votre base (documents, FAQ, catalogue). L'IA répond alors à partir de VOS contenus, ce qui réduit les hallucinations et personnalise les réponses.",
  },
  {
    id: "n8",
    prompt: "Un « agent IA », par rapport à un simple chatbot :",
    options: [
      "C'est exactement la même chose.",
      "Peut enchaîner des actions et utiliser des outils pour accomplir une tâche.",
      "Ne fait que traduire.",
      "Fonctionne sans modèle d'IA.",
    ],
    correctIndex: 1,
    explanation:
      "Un agent ne se contente pas de répondre : il planifie, utilise des outils (web, fichiers, API) et enchaîne des étapes pour réaliser une tâche de bout en bout.",
  },
  {
    id: "n9",
    prompt: "Le protocole MCP (Model Context Protocol) permet de :",
    options: [
      "Compresser des fichiers.",
      "Connecter l'IA à vos outils et données de façon standardisée.",
      "Accélérer le wifi.",
      "Bloquer les hallucinations à 100 %.",
    ],
    correctIndex: 1,
    explanation:
      "MCP est un standard ouvert pour brancher un modèle sur des outils et des sources (CRM, fichiers, agendas...). C'est ce qui permet d'automatiser de vrais workflows, pas juste de discuter.",
  },
  {
    id: "n10",
    prompt: "Le « fine-tuning » d'un modèle consiste à :",
    options: [
      "Changer la couleur de l'interface.",
      "Le réentraîner sur vos données pour spécialiser son comportement.",
      "Lui donner accès à internet.",
      "Réduire son prix.",
    ],
    correctIndex: 1,
    explanation:
      "Le fine-tuning ré-entraîne le modèle sur des exemples à vous pour le spécialiser (ton de marque, format, tâche précise). Utile quand le prompt et le RAG ne suffisent plus.",
  },
];
