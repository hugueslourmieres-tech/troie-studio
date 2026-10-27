/**
 * Partage social des pages (1er/10/2026). Un openGraph déclaré dans une page
 * remplace TOUT celui du layout, et une page sans openGraph hérite du titre
 * et de l'URL de l'accueil. Chaque page servie étale donc pageSocial(...)
 * dans le retour de son generateMetadata.
 */
export const OG_IMAGE = {
  url: "/images/brand/og-troie-2026.png",
  width: 1200,
  height: 630,
  alt: "TROIE Studio",
};

export function pageSocial({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}) {
  return {
    openGraph: {
      type: "website" as const,
      url: `https://troiestudio.fr/${locale}${path}`,
      title: `${title}, TROIE Studio`,
      description,
      siteName: "TROIE Studio",
      locale: locale === "en" ? "en_US" : "fr_FR",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title}, TROIE Studio`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
