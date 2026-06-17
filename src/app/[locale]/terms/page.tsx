import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Mentions légales" : "Légal notice",
    alternates: {
      canonical: `/${locale}/terms`,
      languages: { fr: "/fr/terms", en: "/en/terms" },
    },
  };
}

export default async function TermsPage({
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
        <p className="t-eyebrow">/ {isFr ? "Mentions légales" : "Legal"}</p>
        <h1 className="t-display mt-6 text-5xl text-[var(--fg)] md:text-7xl">
          {t("terms")}
        </h1>
      </header>

      <section className="mt-16 space-y-8 text-base leading-relaxed text-[var(--fg-2)] md:text-lg">
        {isFr ? <TermsFr /> : <TermsEn />}
      </section>
    </article>
  );
}

function TermsFr() {
  return (
    <>
      <Block title="Éditeur du site">
        <p>
          TROIE, atelier digital
          <br />
          Exploité par Hugues Lourmieres, entrepreneur individuel établi en
          France.
          <br />
          Contact : <a className="underline" href="mailto:contact@troiestudio.fr">contact@troiestudio.fr</a>
        </p>
      </Block>
      <Block title="Directeur de la publication">
        <p>Hugues Lourmieres.</p>
      </Block>
      <Block title="Hébergement">
        <p>
          Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
          <br />
          Site officiel : vercel.com
        </p>
      </Block>
      <Block title="Nom de domaine">
        <p>
          Le domaine troiestudio.fr est enregistré auprès d'OVHcloud, 2 rue
          Kellermann, 59100 Roubaix, France.
        </p>
      </Block>
      <Block title="Propriété intellectuelle">
        <p>
          L'ensemble des contenus présents sur le site (textes, images, vidéos,
          logos, identité graphique) est protégé par le droit d'auteur. Toute
          reproduction, représentation ou exploitation sans autorisation
          préalable est interdite.
        </p>
      </Block>
      <Block title="Responsabilité">
        <p>
          Les informations diffusées sur ce site sont données à titre indicatif.
          TROIE ne saurait être tenu responsable des erreurs ou omissions, ni
          des dommages directs ou indirects résultant de l'utilisation du site.
        </p>
      </Block>
      <Block title="Conditions d'intervention">
        <p>
          Les missions confiées à TROIE font l'objet d'un devis signé. Les
          modalités de règlement standard sont : 50 % à la commande, solde à la
          livraison. Tous les prix sont indiqués hors taxes.
        </p>
      </Block>
      <Block title="Droit applicable">
        <p>
          Le présent site et les prestations associées sont soumis au droit
          français. Tout litige sera de la compétence des tribunaux français.
        </p>
      </Block>
    </>
  );
}

function TermsEn() {
  return (
    <>
      <Block title="Site publisher">
        <p>
          TROIE, digital studio
          <br />
          Operated by Hugues Lourmieres, sole proprietor based in France.
          <br />
          Contact: <a className="underline" href="mailto:contact@troiestudio.fr">contact@troiestudio.fr</a>
        </p>
      </Block>
      <Block title="Publication director">
        <p>Hugues Lourmieres.</p>
      </Block>
      <Block title="Hosting">
        <p>
          Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United
          States.
          <br />
          Website: vercel.com
        </p>
      </Block>
      <Block title="Domain name">
        <p>
          troiestudio.fr is registered with OVHcloud, 2 rue Kellermann, 59100
          Roubaix, France.
        </p>
      </Block>
      <Block title="Intellectual property">
        <p>
          All content on this site (text, images, vidéos, logos, graphic
          identity) is protected by copyright. Any reproduction, représentation
          or exploitation without prior authorisation is forbidden.
        </p>
      </Block>
      <Block title="Liability">
        <p>
          Information on this site is provided for information purposes only.
          TROIE cannot be held responsible for errors, omissions or for any
          direct or indirect damage resulting from use of the site.
        </p>
      </Block>
      <Block title="Engagement terms">
        <p>
          Engagements with TROIE are governed by a signed quote. Standard
          payment terms are: 50 % on order, balance on delivery. All prices are
          quoted excluding VAT.
        </p>
      </Block>
      <Block title="Applicable law">
        <p>
          This site and any related service are governed by French law. Any
          dispute will be subject to the jurisdiction of French courts.
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
