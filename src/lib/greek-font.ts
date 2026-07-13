import { GFS_Didot } from "next/font/google";

/**
 * GFS Didot, sous-ensemble grec : la Didone qui rend les sigles Α–Ζ
 * (index thematiques de marque). Exposee en --font-greek et injectee dans
 * chaque layout qui rend un <html>, pour que les sigles s'affichent
 * partout dans la meme fonte que les couvertures reseaux.
 */
export const gfsDidot = GFS_Didot({
  subsets: ["greek"],
  weight: "400",
  variable: "--font-greek",
  display: "swap",
});
