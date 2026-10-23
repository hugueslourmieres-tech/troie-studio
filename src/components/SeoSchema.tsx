import { getTranslations } from "next-intl/server";
import { ORG_ID } from "./JsonLd";

/**
 * JSON-LD global du site (23/10/2026) : Organization + ProfessionalService,
 * Person (Hugues) et WebSite. Remplace le bloc `orgJsonLd` écrit en dur dans
 * src/app/[locale]/layout.tsx (mêmes @id, rendu une seule fois par page).
 *
 * Ajouts : catalogue des six services (hasOfferCatalog, liens vers les pages
 * dédiées), zone servie Nice, Côte d'Azur, Alpes-Maritimes et France, fiche
 * Google (Place ID) en hasMap et sameAs. Pas d'adresse postale précise
 * (audit données personnelles du 17/09/2026). L'IA n'y figure que comme
 * outil.
 */

const BASE = "https://troiestudio.fr";
const GBP_URL = "https://www.google.com/maps/place/?q=place_id:ChIJzaE5l_HCtSwRsqZgau9Fe4o";

const SERVICES = {
  fr: [
    { name: "Sites, applications et e-commerce", path: "/creation-site-application", desc: "Site vitrine, boutique en ligne, application web ou mobile. Conçus, développés et mis en ligne." },
    { name: "Photo et vidéo", path: "/medias", desc: "Reportages, films de marque, témoignages clients, contenus pour les réseaux." },
    { name: "Communication et réseaux sociaux", path: "/strategie", desc: "Positionnement, messages, contenus, réseaux sociaux, lancements de produits." },
    { name: "SEO et Google Ads", path: "/agence-seo-google-ads", desc: "Référencement Google, campagnes Google Ads et Meta, suivies chaque mois." },
    { name: "Leads, CRM et automatisations", path: "/contact", desc: "Formulaires qui convertissent, CRM en place, relances et suivi des prospects automatisés." },
    { name: "Accompagnement des équipes", path: "/accompagnement", desc: "Direction marketing à temps partagé, prise en main des outils digitaux, suivi après livraison." },
  ],
  en: [
    { name: "Websites, apps and e-commerce", path: "/creation-site-application", desc: "Showcase site, online store, web or mobile app. Designed, built and launched." },
    { name: "Photo and video", path: "/medias", desc: "Reportage, brand films, customer stories, social media content." },
    { name: "Communication and social media", path: "/strategie", desc: "Positioning, messaging, content, social media, product launches." },
    { name: "SEO and Google Ads", path: "/agence-seo-google-ads", desc: "Google search, Google Ads and Meta campaigns, reviewed every month." },
    { name: "Leads, CRM and automation", path: "/contact", desc: "Forms that convert, a CRM in place, automated follow-ups and lead tracking." },
    { name: "Team support", path: "/accompagnement", desc: "Fractional marketing direction, hands-on help with digital tools, follow-up after delivery." },
  ],
} as const;

export async function SeoSchema({ locale }: { locale: string }) {
  const tBrand = await getTranslations({ locale, namespace: "brand" });
  const isFr = locale !== "en";
  const services = SERVICES[isFr ? "fr" : "en"];

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        name: tBrand("name"),
        alternateName: "TROIE Atelier Digital",
        url: BASE,
        logo: `${BASE}/images/brand/og-image.png`,
        image: `${BASE}/images/brand/og-image.png`,
        slogan: isFr ? "L'agence qui fait vendre." : "The agency that drives sales.",
        /* Fraîcheur machine : figée au build, rafraîchie à chaque deploy. */
        dateModified: new Date().toISOString().slice(0, 10),
        description: tBrand("organizationDescription"),
        founder: { "@id": `${BASE}/#hugues` },
        knowsAbout: isFr
          ? [
              "Création de sites web et d'applications",
              "E-commerce et Shopify",
              "Photographie",
              "Production vidéo",
              "Communication et réseaux sociaux",
              "SEO",
              "Google Ads et Meta Ads",
              "CRM et automatisations",
              "Direction marketing à temps partagé",
            ]
          : [
              "Website and app development",
              "E-commerce and Shopify",
              "Photography",
              "Video production",
              "Communication and social media",
              "SEO",
              "Google Ads and Meta Ads",
              "CRM and automation",
              "Fractional marketing direction",
            ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: isFr ? "Services de TROIE Studio" : "TROIE Studio services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.name,
              description: s.desc,
              url: `${BASE}/${locale}${s.path}`,
              provider: { "@id": ORG_ID },
            },
          })),
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nice",
          addressRegion: "Provence-Alpes-Côte d'Azur",
          postalCode: "06000",
          addressCountry: "FR",
        },
        geo: { "@type": "GeoCoordinates", latitude: 43.7102, longitude: 7.262 },
        hasMap: GBP_URL,
        priceRange: isFr ? "Sur devis" : "On quote",
        knowsLanguage: ["fr-FR", "en"],
        areaServed: [
          { "@type": "City", name: "Nice" },
          { "@type": "AdministrativeArea", name: "Côte d'Azur" },
          { "@type": "AdministrativeArea", name: "Alpes-Maritimes" },
          { "@type": "Country", name: "France" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          // Email volontairement absent (anti-moisson).
          url: `${BASE}/${locale}/contact`,
          contactType: "customer service",
          availableLanguage: ["French", "English"],
        },
        sameAs: [
          "https://www.linkedin.com/company/troiestudio",
          "https://www.instagram.com/troiestudio",
          GBP_URL,
        ],
        subOrganization: {
          "@type": "Organization",
          name: "TROIE",
          alternateName: "troie.app",
          url: "https://troie.app",
          description: isFr
            ? "Les quiz gratuits et les outils en ligne de TROIE Studio."
            : "TROIE Studio's free quizzes and online tools.",
          sameAs: ["https://www.youtube.com/@troiestudio"],
        },
      },
      {
        "@type": "Person",
        "@id": `${BASE}/#hugues`,
        name: "Hugues Lourmieres",
        jobTitle: tBrand("jobTitle"),
        worksFor: { "@id": ORG_ID },
        url: `${BASE}/${locale}/hugues`,
        knowsAbout: isFr
          ? ["Stratégie marketing", "Acquisition", "SEO", "Direction artistique", "Photographie", "Vidéo"]
          : ["Marketing strategy", "Acquisition", "SEO", "Art direction", "Photography", "Video"],
        sameAs: [
          "https://www.linkedin.com/in/hugueslourmieres/",
          "https://www.instagram.com/hugueslourmieres/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        url: BASE,
        name: tBrand("name"),
        description: tBrand("metaDescription"),
        publisher: { "@id": ORG_ID },
        inLanguage: ["fr-FR", "en-US"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
