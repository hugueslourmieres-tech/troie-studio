"use client";

import { useEffect, useState } from "react";

/**
 * Bouton fixe sur téléphone (23/10/2026) : « Réserver 30 min » apparaît
 * après le héros et se cache quand l'appel final est à l'écran.
 */
export function StickyMobileCta({ locale }: { locale: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const end = document.getElementById("contact-final");
      const endTop = end ? end.getBoundingClientRect().top : Infinity;
      setShow(window.scrollY > 700 && endTop > window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(16px,env(safe-area-inset-bottom))] transition-[opacity,transform] duration-300 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <a
        href="https://cal.com/troiestudio/30min"
        target="_blank"
        rel="noreferrer"
        className="flex h-14 w-full items-center justify-center rounded-full bg-[var(--ink)] text-[16px] font-medium text-white shadow-[0_18px_40px_-16px_rgba(17,19,24,0.6)] active:scale-[0.98]"
      >
        {locale === "en" ? "Book 30 min" : "Réserver 30 min"}
      </a>
    </div>
  );
}
