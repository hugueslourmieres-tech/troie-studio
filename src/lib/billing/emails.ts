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
