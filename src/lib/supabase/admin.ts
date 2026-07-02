import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase service-role, STRICTEMENT serveur (webhooks, admin).
 * Contourne la RLS : ne jamais importer depuis un composant client.
 * Renvoie null si la clé n'est pas configurée (mode démo).
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  return createSupabaseClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
