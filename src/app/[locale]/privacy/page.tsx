import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Confidentialité" : "Privacy",
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: { fr: "/fr/privacy", en: "/en/privacy" },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "footer" });
  const isFr = locale === "fr";

  return (
    <article className="mx-auto max-w-3xl px-6 py-24 md:px-10 md:py-36">
      <header>
        <p className="t-eyebrow">/ {isFr ? "Confidentialité" : "Privacy"}</p>
        <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
          {t("privacy")}
        </h1>
      </header>

      <section className="mt-16 space-y-8 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
        {isFr ? <PrivacyFr /> : <PrivacyEn />}
      </section>
    </article>
  );
}

function PrivacyFr() {
  return (
    <>
      <Block title="1. Responsable du traitement">
        <p>
          TROIE, atelier digital exploité par Hugues Lourmieres,
          France. Contact : <a className="underline" href="mailto:contact@troiestudio.fr">contact@troiestudio.fr</a>.
        </p>
      </Block>
      <Block title="2. Données collectées">
        <p>
          Lorsque vous nous contactez via le formulaire, nous collectons
          uniquement : nom, email, entreprise (optionnel), sujet (optionnel)
          et message. Ces données sont utilisées pour répondre à votre demande
          et conservées au plus deux ans.
        </p>
      </Block>
      <Block title="3. Cookies">
        <p>
          Le site ne dépose aucun cookie de suivi ni de publicité. Seuls les
          cookies techniques strictement nécessaires (hébergement Vercel) sont
          utilisés.
        </p>
      </Block>
      <Block title="4. Prestataires">
        <p>
          Hébergement : Vercel Inc. (États-Unis). Envoi des emails du
          formulaire : Resend (États-Unis). Emails professionnels : OVHcloud
          (France).
        </p>
      </Block>
      <Block title="5. Vos droits">
        <p>
          Conformément au RGPD, vous disposez d'un droit d'accès, de
          rectification, d'effacement, de limitation et de portabilité de vos
          données. Pour exercer ces droits, écrivez-nous à
          {" "}<a className="underline" href="mailto:contact@troiestudio.fr">contact@troiestudio.fr</a>.
        </p>
      </Block>
      <Block title="6. Réclamation">
        <p>
          Vous pouvez à tout moment introduire une réclamation auprès de la
          CNIL (www.cnil.fr) si vous estimez que vos droits ne sont pas
          respectés.
        </p>
      </Block>
    </>
  );
}

function PrivacyEn() {
  return (
    <>
      <Block title="1. Data controller">
        <p>
          TROIE, a digital studio operated by Hugues Lourmieres, based in
          France. Contact: <a className="underline" href="mailto:contact@troiestudio.fr">contact@troiestudio.fr</a>.
        </p>
      </Block>
      <Block title="2. Data we collect">
        <p>
          When you reach out through the contact form we only collect: name,
          email, company (optional), subject (optional) and message. This data
          is used to answer your request and kept for at most two years.
        </p>
      </Block>
      <Block title="3. Cookies">
        <p>
          The site does not use any tracking or advertising cookie. Only
          strictly necessary technical cookies (Vercel hosting) are used.
        </p>
      </Block>
      <Block title="4. Processors">
        <p>
          Hosting: Vercel Inc. (United States). Contact-form email delivery:
          Resend (United States). Professional email inbox: OVHcloud (France).
        </p>
      </Block>
      <Block title="5. Your rights">
        <p>
          Under GDPR, you may access, rectify, erase, limit or port your
          personal data at any time. To exercise these rights, write to
          {" "}<a className="underline" href="mailto:contact@troiestudio.fr">contact@troiestudio.fr</a>.
        </p>
      </Block>
      <Block title="6. Complaint">
        <p>
          You may file a complaint with the French data protection authority
          (CNIL, www.cnil.fr) if you believe your rights are not respected.
        </p>
      </Block>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="t-display text-2xl text-[var(--fg)] md:text-3xl">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}
