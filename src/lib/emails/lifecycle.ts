import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Emails de cycle de vie de la plateforme (activation + rétention) :
 * - welcome      : à la création du compte (callback auth + backstop cron)
 * - trial_j2     : 2 jours après le début de l'essai gratuit
 * - trial_j5     : 5 jours après (l'essai se termine dans 2 jours)
 * - inactive_j3  : 3 jours sans progression
 * - inactive_j14 : 14 jours sans progression
 *
 * Idempotence : table email_log (user_id, email_type) écrite AVANT
 * l'envoi ; un type d'email ne part jamais deux fois au même compte.
 */

export type LifecycleEmailType =
  | "welcome"
  | "trial_j2"
  | "trial_j5"
  | "inactive_j3"
  | "inactive_j14";

const DASHBOARD_URL = "https://troiestudio.fr/formations/dashboard";
const TARIFS_URL = "https://troiestudio.fr/formations/tarifs";

function layout(inner: string): string {
  return `
  <div style="font-family: Georgia, serif; max-width: 540px; margin: 0 auto; color: #1a1714;">
    <p style="font-size: 22px; letter-spacing: 0.18em;">T R O I E</p>
    ${inner}
    <p style="font-size: 12px; color: #8a8470; margin-top: 32px;">
      TROIE Studio · Nice, Côte d'Azur · troiestudio.fr<br/>
      Vous recevez cet email car vous avez un compte TROIE Formations.
    </p>
  </div>`;
}

function button(href: string, label: string): string {
  return `
  <p style="margin: 28px 0;">
    <a href="${href}"
       style="background: #1a1714; color: #f5f0e6; padding: 14px 28px; text-decoration: none; font-family: monospace; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;">
      ${label}
    </a>
  </p>`;
}

const TEMPLATES: Record<LifecycleEmailType, { subject: string; html: string }> = {
  welcome: {
    subject: "Bienvenue chez TROIE Formations, votre premier trophée vous attend",
    html: layout(`
      <h1 style="font-size: 26px; font-weight: normal;">Bienvenue.</h1>
      <p style="font-size: 15px; line-height: 1.6;">
        Votre compte est prêt. Le meilleur premier pas : le QCM de niveau
        (10 questions, 6 minutes), puis le Module 0 offert. Vous gagnerez
        votre premier trophée avant la fin du café.
      </p>
      ${button(DASHBOARD_URL, "Commencer maintenant")}
      <p style="font-size: 13px; line-height: 1.6; color: #4a4239;">
        Un conseil : bloquez 20 minutes, deux fois par semaine. La
        régularité bat l'intensité, et la plateforme suit votre série de
        jours d'affilée.
      </p>
    `),
  },
  trial_j2: {
    subject: "Jour 2 sur 7 : là où les autres s'arrêtent, pas vous",
    html: layout(`
      <h1 style="font-size: 26px; font-weight: normal;">Vous avez 5 jours d'avance.</h1>
      <p style="font-size: 15px; line-height: 1.6;">
        La plupart des gens s'inscrivent et ne reviennent jamais. Vous
        valez mieux que ça : reprenez là où vous vous êtes arrêté, votre
        progression et vos trophées vous attendent.
      </p>
      ${button(DASHBOARD_URL, "Reprendre ma formation")}
      <p style="font-size: 13px; line-height: 1.6; color: #4a4239;">
        Pendant votre essai, tout est ouvert : les cours complets, les QCM
        et la bibliothèque de prompts par métier. Servez-vous.
      </p>
    `),
  },
  trial_j5: {
    subject: "Votre essai gratuit se termine dans 2 jours",
    html: layout(`
      <h1 style="font-size: 26px; font-weight: normal;">Plus que 2 jours d'essai.</h1>
      <p style="font-size: 15px; line-height: 1.6;">
        Dans deux jours, votre abonnement démarre à 29 € par mois, sans
        engagement, annulable en un clic. Si la plateforme vous sert,
        vous n'avez rien à faire. Sinon, annulez depuis votre espace :
        aucun débit, sans question.
      </p>
      ${button(DASHBOARD_URL, "Accéder à mon espace")}
      <p style="font-size: 13px; line-height: 1.6; color: #4a4239;">
        Astuce : les cours restent accessibles à vie en achat unique si
        vous préférez éviter l'abonnement.
      </p>
    `),
  },
  inactive_j3: {
    subject: "Votre progression vous attend (3 jours sans vous)",
    html: layout(`
      <h1 style="font-size: 26px; font-weight: normal;">On garde votre place.</h1>
      <p style="font-size: 15px; line-height: 1.6;">
        Trois jours sans progresser, ça arrive. Le plus dur est de
        rouvrir la porte : la prochaine leçon fait moins de 10 minutes.
      </p>
      ${button(DASHBOARD_URL, "Reprendre où j'en étais")}
    `),
  },
  inactive_j14: {
    subject: "Deux semaines déjà : un module de 10 minutes pour reprendre ?",
    html: layout(`
      <h1 style="font-size: 26px; font-weight: normal;">Reprenons doucement.</h1>
      <p style="font-size: 15px; line-height: 1.6;">
        Deux semaines sans progression. Plutôt que de tout reprendre,
        choisissez la plus petite marche : un QCM de 6 minutes pour vous
        remettre en selle, ou la leçon suivante de votre cours.
      </p>
      ${button(DASHBOARD_URL, "Me remettre en selle")}
      <p style="font-size: 13px; line-height: 1.6; color: #4a4239;">
        Si le format ne vous convient pas, répondez à cet email et
        dites-le nous franchement : ça nous aide vraiment.
      </p>
    `),
  },
};

/**
 * Envoie un email de cycle de vie, une seule fois par (user, type).
 * Renvoie "sent", "duplicate" ou "skipped" (config manquante).
 */
export async function sendLifecycleEmail(
  userId: string,
  to: string,
  type: LifecycleEmailType,
): Promise<"sent" | "duplicate" | "skipped"> {
  const apiKey = process.env.RESEND_API_KEY;
  const admin = createAdminClient();
  if (!apiKey || !admin || !to) return "skipped";

  // Idempotence : l'insertion échoue si (user, type) existe déjà.
  const { error: dupe } = await admin
    .from("email_log")
    .insert({ user_id: userId, email_type: type });
  if (dupe) return "duplicate";

  const template = TEMPLATES[type];
  const from = process.env.CONTACT_FROM ?? "TROIE <onboarding@resend.dev>";

  try {
    await new Resend(apiKey).emails.send({
      from,
      to,
      subject: template.subject,
      html: template.html,
    });
    return "sent";
  } catch {
    // L'envoi a échoué : on retire la ligne pour permettre une retentative.
    await admin
      .from("email_log")
      .delete()
      .eq("user_id", userId)
      .eq("email_type", type);
    return "skipped";
  }
}
