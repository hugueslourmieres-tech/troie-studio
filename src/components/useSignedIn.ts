"use client";

import { useEffect, useState } from "react";

/**
 * Session Supabase côté client, pour basculer les CTA du header
 * (Se connecter → Mon espace). Rend `false` en mode démo (env absentes)
 * et tant que la session n'est pas confirmée : le CTA par défaut reste
 * "Se connecter", jamais l'inverse.
 */
export function useSignedIn(): boolean {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return;
    }
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    import("@/lib/supabase/client").then(({ createClient }) => {
      if (cancelled) return;
      const supabase = createClient();
      supabase.auth.getSession().then(({ data }) => {
        if (!cancelled) setSignedIn(!!data.session);
      });
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!cancelled) setSignedIn(!!session);
      });
      unsubscribe = () => data.subscription.unsubscribe();
    });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  return signedIn;
}
