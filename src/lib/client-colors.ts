/**
 * Une couleur par client (23/10/2026, demande de Hugues) : simples et
 * franches, tirées des palettes de Colorloop et de Bien en règle, dans leur
 * version profonde pour rester lisibles en chiffres sur fond blanc (contraste
 * de 4,5 pour 1 au moins). Vert = ventes, bleu = abonnés, rouge = le ×35.
 */
export const CLIENT_COLORS: Record<string, string> = {
  loir: "#0a8a4a",
  rutherford: "#2f6fdb",
  autajon: "#e1000f",
};

export const clientColor = (id: string) => CLIENT_COLORS[id] ?? "#2f6fdb";
