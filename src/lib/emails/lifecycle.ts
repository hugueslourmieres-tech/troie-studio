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

/* Gabarit HTML aux couleurs du site (DA "Hermès") : bandeau orange,
   carte crème, serif Georgia pour les titres, mono pour les étiquettes.
   Tables + styles inline uniquement (compatibilité clients mail). */

const C = {
  bg: "#f5f0e6",
  card: "#fdfaf3",
  ink: "#1a1714",
  gray: "#4a4239",
  mute: "#8a8470",
  accent: "#f37b22",
  rule: "#e6ddc8",
};
const MONO = "'Courier New', Courier, monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

function layout(eyebrow: string, inner: string): string {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Bandeau marque -->
        <tr><td style="background:${C.accent};padding:28px 36px;text-align:center;">
          <div style="font-family:${SERIF};font-size:30px;letter-spacing:0.3em;color:${C.ink};">TROIE</div>
          <div style="font-family:${MONO};font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:${C.ink};margin-top:8px;">
            Formations &middot; IA d&rsquo;abord
          </div>
        </td></tr>

        <!-- Carte -->
        <tr><td style="background:${C.card};border:1px solid ${C.rule};border-top:none;padding:40px 36px 36px;">
          <div style="font-family:${MONO};font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:${C.accent};">
            ${eyebrow}
          </div>
          ${inner}
        </td></tr>

        <!-- Pied -->
        <tr><td style="padding:24px 36px;text-align:center;">
          <div style="font-family:${MONO};font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${C.mute};line-height:2;">
            TROIE Studio &middot; Nice, C&ocirc;te d&rsquo;Azur<br/>
            <a href="https://troiestudio.fr" style="color:${C.mute};">troiestudio.fr</a>
          </div>
          <div style="font-family:${MONO};font-size:9px;color:${C.mute};margin-top:10px;">
            Vous recevez cet email car vous avez un compte TROIE Formations.
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>`;
}

function h1(text: string): string {
  return `<h1 style="font-family:${SERIF};font-size:32px;line-height:1.15;font-weight:normal;color:${C.ink};margin:14px 0 0;">${text}</h1>`;
}

function p(text: string): string {
  return `<p style="font-family:${SERIF};font-size:16px;line-height:1.7;color:${C.gray};margin:18px 0 0;">${text}</p>`;
}

function note(text: string): string {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
    <tr><td style="border-top:1px solid ${C.rule};padding-top:18px;">
      <p style="font-family:${SERIF};font-size:13px;line-height:1.7;color:${C.mute};margin:0;">${text}</p>
    </td></tr>
  </table>`;
}

function steps(items: string[]): string {
  const rows = items
    .map(
      (item, i) => `
      <tr>
        <td valign="top" style="padding:10px 14px 10px 0;font-family:${MONO};font-size:12px;letter-spacing:0.1em;color:${C.accent};white-space:nowrap;">0${i + 1}</td>
        <td valign="top" style="padding:10px 0;border-bottom:1px solid ${C.rule};font-family:${SERIF};font-size:15px;line-height:1.6;color:${C.ink};width:100%;">${item}</td>
      </tr>`,
    )
    .join("");
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;border-top:1px solid ${C.rule};">
    ${rows}
  </table>`;
}

function button(href: string, label: string): string {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:30px 0 0;">
    <tr><td style="background:${C.accent};">
      <a href="${href}"
         style="display:inline-block;padding:16px 32px;font-family:${MONO};font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:${C.ink};text-decoration:none;">
        ${label} &rarr;
      </a>
    </td></tr>
  </table>`;
}

const TEMPLATES: Record<LifecycleEmailType, { subject: string; html: string }> = {
  welcome: {
    subject: "Bienvenue chez TROIE Formations, votre premier trophée vous attend",
    html: layout(
      "Bienvenue &middot; Espace membre",
      `
      ${h1("Votre compte est pr&ecirc;t.")}
      ${p(
        "Le meilleur premier pas tient en trois &eacute;tapes, et la premi&egrave;re prend 6 minutes. Vous gagnerez votre premier troph&eacute;e avant la fin du caf&eacute;.",
      )}
      ${steps([
        "Le QCM de niveau : 10 questions pour situer vos r&eacute;flexes IA.",
        "Le Module 0, offert : pourquoi une IA hallucine (et veut vous plaire).",
        "Votre premier troph&eacute;e tombe, et votre s&eacute;rie commence.",
      ])}
      ${button(DASHBOARD_URL, "Commencer maintenant")}
      ${note(
        "Un conseil : bloquez 20 minutes, deux fois par semaine. La r&eacute;gularit&eacute; bat l&rsquo;intensit&eacute;, et la plateforme suit votre s&eacute;rie de jours d&rsquo;affil&eacute;e.",
      )}
    `,
    ),
  },
  trial_j2: {
    subject: "Jour 2 sur 7 : là où les autres s'arrêtent, pas vous",
    html: layout(
      "Essai gratuit &middot; Jour 2 sur 7",
      `
      ${h1("Vous avez 5 jours d&rsquo;avance.")}
      ${p(
        "La plupart des gens s&rsquo;inscrivent et ne reviennent jamais. Vous valez mieux que &ccedil;a : reprenez l&agrave; o&ugrave; vous vous &ecirc;tes arr&ecirc;t&eacute;, votre progression et vos troph&eacute;es vous attendent.",
      )}
      ${button(DASHBOARD_URL, "Reprendre ma formation")}
      ${note(
        "Pendant votre essai, tout est ouvert : les cours complets, les QCM et la biblioth&egrave;que de prompts par m&eacute;tier. Servez-vous.",
      )}
    `,
    ),
  },
  trial_j5: {
    subject: "Votre essai gratuit se termine dans 2 jours",
    html: layout(
      "Essai gratuit &middot; Jour 5 sur 7",
      `
      ${h1("Plus que 2 jours d&rsquo;essai.")}
      ${p(
        "Dans deux jours, votre abonnement d&eacute;marre &agrave; 29 &euro; par mois, sans engagement, annulable en un clic. Si la plateforme vous sert, vous n&rsquo;avez rien &agrave; faire. Sinon, annulez depuis votre espace : aucun d&eacute;bit, sans question.",
      )}
      ${button(DASHBOARD_URL, "Acc&eacute;der &agrave; mon espace")}
      ${note(
        "Astuce : les cours restent accessibles &agrave; vie en achat unique si vous pr&eacute;f&eacute;rez &eacute;viter l&rsquo;abonnement.",
      )}
    `,
    ),
  },
  inactive_j3: {
    subject: "Votre progression vous attend (3 jours sans vous)",
    html: layout(
      "Votre s&eacute;rie &middot; On garde votre place",
      `
      ${h1("On garde votre place.")}
      ${p(
        "Trois jours sans progresser, &ccedil;a arrive. Le plus dur est de rouvrir la porte : la prochaine le&ccedil;on fait moins de 10 minutes.",
      )}
      ${button(DASHBOARD_URL, "Reprendre o&ugrave; j&rsquo;en &eacute;tais")}
    `,
    ),
  },
  inactive_j14: {
    subject: "Deux semaines déjà : un module de 10 minutes pour reprendre ?",
    html: layout(
      "On reprend &middot; En douceur",
      `
      ${h1("Reprenons doucement.")}
      ${p(
        "Deux semaines sans progression. Plut&ocirc;t que de tout reprendre, choisissez la plus petite marche : un QCM de 6 minutes pour vous remettre en selle, ou la le&ccedil;on suivante de votre cours.",
      )}
      ${button(DASHBOARD_URL, "Me remettre en selle")}
      ${note(
        "Si le format ne vous convient pas, r&eacute;pondez &agrave; cet email et dites-le nous franchement : &ccedil;a nous aide vraiment.",
      )}
    `,
    ),
  },
};

/** Rendu d'un gabarit (page de pr&eacute;visualisation dev + tests). */
export function renderLifecycleEmail(type: LifecycleEmailType): {
  subject: string;
  html: string;
} {
  return TEMPLATES[type];
}

/* ── Le s&eacute;same du Panth&eacute;on ─────────────────────────────────────
   Envoy&eacute; quand l'utilisateur re&ccedil;oit sa maison : il ne devient pas
   sorcier, il devient dieu. Un seul s&eacute;same par compte (email_log,
   type "sesame"). */

const SESAME_HOUSES: Record<
  string,
  { name: string; plainName: string; godOf: string; motto: string; color: string }
> = {
  hermes: {
    name: "Herm&egrave;s",
    plainName: "Hermès",
    godOf: "dieu de la prospection",
    motto: "Toujours en mouvement.",
    color: "#f37b22",
  },
  athena: {
    name: "Ath&eacute;na",
    plainName: "Athéna",
    godOf: "dieu de la strat&eacute;gie",
    motto: "Voir avant les autres.",
    color: "#8a7a5c",
  },
  achille: {
    name: "Achille",
    plainName: "Achille",
    godOf: "dieu de la cr&eacute;ation",
    motto: "La beaut&eacute; frappe fort.",
    color: "#b4552d",
  },
  hestia: {
    name: "Hestia",
    plainName: "Hestia",
    godOf: "dieu du foyer qui tourne",
    motto: "La maison tient gr&acirc;ce &agrave; moi.",
    color: "#1f3a34",
  },
};

export function renderSesameEmail(house: string): {
  subject: string;
  html: string;
} | null {
  const h = SESAME_HOUSES[house];
  if (!h) return null;
  return {
    subject: `Votre sésame pour l'Olympe : maison ${h.plainName}`,
    html: layout(
      `Le Panth&eacute;on &middot; Votre s&eacute;same`,
      `
      ${h1(`Bienvenue dans la maison ${h.name}.`)}
      ${p(
        `Le test a parl&eacute; : vous avez l'&eacute;toffe d'un ${h.godOf}. Ce s&eacute;same vous ouvre l'Olympe : votre espace membre, vos parcours et vos prompts choisis pour votre lign&eacute;e.`,
      )}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:26px;">
        <tr><td style="border-left:4px solid ${h.color};padding:14px 20px;background:#f5f0e6;">
          <div style="font-family:${MONO};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${C.gray};">Devise de la maison</div>
          <div style="font-family:${SERIF};font-size:22px;color:${C.ink};margin-top:6px;">&laquo; ${h.motto} &raquo;</div>
        </td></tr>
      </table>
      ${steps([
        "Ouvrez votre espace membre : votre blason y est d&eacute;j&agrave; accroch&eacute;.",
        "Commencez le parcours recommand&eacute; pour votre maison.",
        "Gagnez vos premiers troph&eacute;es : l'Olympe r&eacute;compense la r&eacute;gularit&eacute;.",
      ])}
      ${button(DASHBOARD_URL, "Entrer dans l'Olympe")}
      ${note(
        "Un s&eacute;same ne se partage pas, mais un test si : vos coll&egrave;gues peuvent d&eacute;couvrir leur maison sur troiestudio.fr/formations/pantheon.",
      )}
    `,
    ),
  };
}

/**
 * Envoie le s&eacute;same (une seule fois par compte, type "sesame").
 */
export async function sendSesameEmail(
  userId: string,
  to: string,
  house: string,
): Promise<"sent" | "duplicate" | "skipped"> {
  const apiKey = process.env.RESEND_API_KEY;
  const admin = createAdminClient();
  const template = renderSesameEmail(house);
  if (!apiKey || !admin || !to || !template) return "skipped";

  const { error: dupe } = await admin
    .from("email_log")
    .insert({ user_id: userId, email_type: "sesame" });
  if (dupe) return "duplicate";

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
    await admin
      .from("email_log")
      .delete()
      .eq("user_id", userId)
      .eq("email_type", "sesame");
    return "skipped";
  }
}

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
