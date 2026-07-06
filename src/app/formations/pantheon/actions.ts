"use server";

import { createClient } from "@/lib/supabase/server";
import { sendSesameEmail } from "@/lib/emails/lifecycle";
import { isHouseSlug } from "@/lib/pantheon";
import { revalidatePath } from "next/cache";

/**
 * Enregistre la maison de l'utilisateur connecté et envoie son sésame
 * (une seule fois par compte). Renvoie l'état pour l'écran de résultat.
 */
export async function saveHouse(
  house: string,
): Promise<"saved" | "not_signed_in" | "invalid" | "unavailable"> {
  if (!isHouseSlug(house)) return "invalid";

  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return "unavailable"; // mode démo local
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return "not_signed_in";

  const { error } = await supabase
    .from("profiles")
    .update({ house })
    .eq("id", user.id);
  if (error) return "unavailable";

  if (user.email) {
    // Best-effort : l'échec d'email ne bloque pas l'affectation.
    try {
      await sendSesameEmail(user.id, user.email, house);
    } catch {
      /* noop */
    }
  }

  revalidatePath("/formations/dashboard");
  return "saved";
}
