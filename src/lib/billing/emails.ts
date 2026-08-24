import { Resend } from "resend";

/**
 * Email de bienvenue après un achat réussi (envoyé depuis le webhook
 * Stripe). Best-effort : une erreur d'email ne doit jamais faire
 * échouer le traitement du paiement.
 */
export async function sendAccessEmail({
  to,
  productName,
}: {
  to: string;
  productName: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const from = process.env.CONTACT_FROM ?? "TROIE <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from,
      to,
      subject: "Votre accès TROIE Formations est actif",
      html: `
        <div style="font-family: Georgia, serif; max-width: 540px; margin: 0 auto; color: #1a1714;">
          <p style="font-size: 22px; letter-spacing: 0.18em;">T R O I E</p>
          <h1 style="font-size: 26px; font-weight: normal;">Merci, votre accès est actif.</h1>
          <p style="font-size: 15px; line-height: 1.6;">
            Votre paiement pour <strong>${productName}</strong> est confirmé.
            Vos contenus sont disponibles dès maintenant dans votre espace membre.
          </p>
          <p style="margin: 28px 0;">
            <a href="https://troiestudio.fr/formations/dashboard"
               style="background: #1a1714; color: #f5f0e6; padding: 14px 28px; text-decoration: none; font-family: monospace; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;">
              Accéder à mes cours
            </a>
          </p>
          <p style="font-size: 13px; line-height: 1.6; color: #4a4239;">
            Connectez-vous avec l'adresse utilisée pour l'achat
            (${to}). Une question ? Répondez simplement à cet email.
          </p>
          <p style="font-size: 12px; color: #8a8470;">TROIE Studio, Nice, Côte d'Azur, troiestudio.fr</p>
        </div>
      `,
    });
  } catch {
    // Best-effort : on ne bloque jamais le webhook pour un email.
  }
}

/**
 * Emails d'une commande de PRESTATION (audit-fix visibilité IA) : pas
 * d'accès à ouvrir, mais deux personnes à prévenir. Best-effort aussi :
 * le paiement est encaissé, un email raté ne doit rien bloquer.
 */
export async function sendServiceOrderEmails({
  buyerEmail,
  productName,
  site,
  amountLabel,
}: {
  buyerEmail: string | null;
  productName: string;
  site: string | null;
  amountLabel: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const from = process.env.CONTACT_FROM ?? "TROIE <onboarding@resend.dev>";
  const resend = new Resend(apiKey);
  const internal = process.env.CONTACT_TO;

  // 1. L'équipe d'abord : c'est elle qui doit réagir sous 48 h.
  if (internal) {
    try {
      await resend.emails.send({
        from,
        to: internal,
        subject: `Commande ${productName}${site ? ` : ${site}` : ""}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 540px; margin: 0 auto; color: #1a1714;">
            <h1 style="font-size: 22px; font-weight: normal;">Nouvelle commande payée</h1>
            <p style="font-size: 15px; line-height: 1.7;">
              <strong>${productName}</strong>, ${amountLabel}.<br />
              Site à auditer : <strong>${site ?? "non précisé"}</strong><br />
              Client : <strong>${buyerEmail ?? "email non transmis par Stripe"}</strong>
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #4a4239;">
              Engagement pris dans l'email client : prise de contact sous
              48 h ouvrées, rapport sous 10 jours ouvrés après validation
              du périmètre.
            </p>
          </div>
        `,
      });
    } catch {
      // Best-effort.
    }
  }

  // 2. Le client : ce qui vient de se passer, ce qui arrive ensuite.
  if (buyerEmail) {
    try {
      await resend.emails.send({
        from,
        to: buyerEmail,
        subject: "Votre audit-fix visibilité IA est commandé",
        html: `
          <div style="font-family: Georgia, serif; max-width: 540px; margin: 0 auto; color: #1a1714;">
            <p style="font-size: 22px; letter-spacing: 0.18em;">T R O I E</p>
            <h1 style="font-size: 26px; font-weight: normal;">Merci, votre commande est confirmée.</h1>
            <p style="font-size: 15px; line-height: 1.7;">
              Vous avez commandé <strong>${productName}</strong> (${amountLabel})${
                site ? ` pour <strong>${site}</strong>` : ""
              }.
            </p>
            <p style="font-size: 15px; line-height: 1.7;">
              La suite : nous vous écrivons <strong>sous 48 h ouvrées</strong> à
              cette adresse pour valider le périmètre (site, pages, accès), puis
              nous réalisons les corrections et vous livrons le rapport
              avant/après daté <strong>sous 10 jours ouvrés</strong>.
            </p>
            <p style="font-size: 13px; line-height: 1.6; color: #4a4239;">
              Une question entre-temps ? Répondez simplement à cet email.
            </p>
            <p style="font-size: 12px; color: #8a8470;">TROIE Studio, Nice, Côte d'Azur, troiestudio.fr</p>
          </div>
        `,
      });
    } catch {
      // Best-effort.
    }
  }
}
