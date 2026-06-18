/**
 * Injecte un bloc JSON-LD (schema.org). À placer dans n'importe quelle page
 * server. Le contenu est sérialisé tel quel : passer un objet déjà structuré.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const ORG_ID = "https://troiestudio.fr/#organization";
