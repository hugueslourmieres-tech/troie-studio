import Image from "next/image";

/**
 * Emblem, guerrier grec en pose d'attaque (épée levée), inspiré des
 * céramiques attiques. Source : illustration noire à hachures blanches
 * (muscles, barbe, jupe) fournie par le studio, détourée en transparent.
 * À utiliser comme signe distinctif en pendant du wordmark, ou comme
 * accent décoratif sur les sections clés du site. Variante crème pour
 * fonds sombres : /brand/v2/warrior-cream.png.
 *
 * L'image PNG est volontairement utilisée plutôt qu'un SVG retracé :
 * la richesse des hachures (muscles, barbe, jupe en bandes) ne peut pas
 * être reproduite fidèlement en SVG inline et constitue une part de la
 * personnalité de la marque.
 */
export function Emblem({
  className = "",
  priority = false,
  alt = "TROIE",
}: {
  className?: string;
  priority?: boolean;
  alt?: string;
}) {
  return (
    <Image
      src="/images/brand/warrior.png"
      alt={alt}
      width={883}
      height={1143}
      priority={priority}
      sizes="(max-width: 768px) 80px, 200px"
      className={className}
    />
  );
}
