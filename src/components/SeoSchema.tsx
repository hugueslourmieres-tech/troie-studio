import { getTranslations } from "next-intl/server";
import { ORG_ID } from "./JsonLd";

/**
 * JSON-LD global du site (23/10/2026) : Organization + ProfessionalService,
 * Person (Hugues) et WebSite. Remplace le bloc `orgJsonLd` écrit en dur dans
 * src/app/[locale]/layout.tsx (mêmes @id, rendu une seule fois par page).
 *
 * 25/10/2026 : sept services (sites, applications, Shopify, SEO et Google
 * Ads, publicité sociale, films et photos en option, ateliers IA), zone
 * servie étendue à Monaco, Cannes, Antibes, Sophia Antipolis et Grasse,
 * logo en ImageObject, prise de rendez-vous en ReserveAction.
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
    { name: "Création de sites internet", path: "/creation-site-application", desc: "Sites vitrines et sites qui convertissent, conçus, développés et mis en ligne, puis suivis." },
    { name: "Applications web et mobiles", path: "/creation-application-nice", desc: "Applications web et mobiles sur mesure, de la maquette à la mise en ligne." },
    { name: "E-commerce Shopify", path: "/agence-e-commerce-shopify", desc: "Boutiques Shopify qui vendent : création, refonte, conversion et acquisition." },
    { name: "SEO et Google Ads", path: "/agence-seo-google-ads", desc: "Référencement Google et campagnes Google Ads, suivis chaque mois." },
    { name: "Publicité sur les réseaux sociaux", path: "/strategie", desc: "Campagnes payantes sur Instagram, Facebook et les autres réseaux, avec les contenus qui vont avec." },
    { name: "Films et photos, en option", path: "/medias", desc: "Films de marque, témoignages clients, reportages photo et contenus pour les réseaux." },
    { name: "Ateliers IA pour les équipes", path: "/accompagnement", desc: "Ateliers pratiques pour que les équipes utilisent l'IA dans leur travail, sans jargon." },
  ],
  en: [
    { name: "Website design and development", path: "/creation-site-application", desc: "Showcase sites and sites that convert, designed, built, launched and followed up." },
    { name: "Web and mobile apps", path: "/creation-application-nice", desc: "Custom web and mobile apps, from mock-up to launch." },
    { name: "Shopify e-commerce", path: "/agence-e-commerce-shopify", desc: "Shopify stores that sell: build, redesign, conversion and acquisition." },
    { name: "SEO and Google Ads", path: "/agence-seo-google-ads", desc: "Google search and Google Ads campaigns, reviewed every month." },
    { name: "Paid social", path: "/strategie", desc: "Paid campaigns on Instagram, Facebook and other networks, with the content they need." },
    { name: "Films and photos, as an option", path: "/medias", desc: "Brand films, customer stories, photo reportage and social media content." },
    { name: "AI workshops for teams", path: "/accompagnement", desc: "Hands-on workshops so teams use AI in their daily work, without jargon." },
  ],
} as const;

/* Zone servie (25/10/2026) : Nice, Côte d'Azur, Monaco, et la France à distance. */
const AREA_SERVED = [
  { "@type": "City", name: "Nice" },
  { "@type": "City", name: "Monaco" },
  { "@type": "City", name: "Cannes" },
  { "@type": "City", name: "Antibes" },
  { "@type": "Place", name: "Sophia Antipolis" },
  { "@type": "City", name: "Grasse" },
  { "@type": "AdministrativeArea", name: "Côte d'Azur" },
  { "@type": "AdministrativeArea", name: "Alpes-Maritimes" },
  { "@type": "Country", name: "France" },
];

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
        logo: {
          "@type": "ImageObject",
          "@id": `${BASE}/#logo`,
          url: `${BASE}/brand/troie-logotype.png`,
          width: 1200,
          height: 420,
          caption: "TROIE Studio",
        },
        image: `${BASE}/images/brand/og-image.png`,
        slogan: isFr ? "L'agence qui fait vendre." : "The agency that drives sales.",
        /* Fraîcheur machine : figée au build, rafraîchie à chaque deploy. */
        dateModified: new Date().toISOString().slice(0, 10),
        description: isFr
          ? "TROIE Studio est l'agence digitale qui fait vendre, à Nice, fondée par Hugues Lourmieres. Sites internet, applications web et mobiles, e-commerce Shopify, SEO, Google Ads et publicité sur les réseaux sociaux, avec films et photos en option et des ateliers IA pour les équipes. Nice, Côte d'Azur, Monaco et toute la France à distance."
          : "TROIE Studio is the digital agency that drives sales, based in Nice and founded by Hugues Lourmieres. Websites, web and mobile apps, Shopify e-commerce, SEO, Google Ads and paid social, with films and photos as options and AI workshops for teams. Nice, the French Riviera, Monaco and all of France remotely.",
        founder: { "@id": `${BASE}/#hugues` },
        knowsAbout: isFr
          ? [
              "Création de sites internet",
              "Applications web et mobiles",
              "E-commerce et Shopify",
              "SEO",
              "Google Ads",
              "Publicité sur les réseaux sociaux",
              "Production vidéo",
              "Photographie",
              "Ateliers IA pour les équipes",
            ]
          : [
              "Website design and development",
              "Web and mobile apps",
              "E-commerce and Shopify",
              "SEO",
              "Google Ads",
              "Paid social",
              "Video production",
              "Photography",
              "AI workshops for teams",
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
        areaServed: AREA_SERVED,
        contactPoint: {
          "@type": "ContactPoint",
          // Email volontairement absent (anti-moisson).
          url: `${BASE}/${locale}/contact`,
          contactType: "sales",
          availableLanguage: ["French", "English"],
        },
        /* Prise de rendez-vous en ligne, 30 minutes. */
        potentialAction: {
          "@type": "ReserveAction",
          target: "https://cal.com/troiestudio/30min",
          name: isFr ? "Réserver 30 minutes" : "Book 30 minutes",
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
        description: isFr
          ? "L'agence digitale qui fait vendre à Nice, Monaco et sur la Côte d'Azur : sites, applications, Shopify, SEO, Google Ads."
          : "The digital agency that drives sales in Nice, Monaco and the French Riviera: websites, apps, Shopify, SEO, Google Ads.",
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
