"use client";

/**
 * Sons d'interface, générés à la volée via Web Audio API (aucun fichier).
 * Style "app Apple" : ondes sinus douces, attaques courtes, volumes bas.
 * Le contexte audio se crée au premier geste utilisateur (clic / survol),
 * ce qui respecte les politiques d'autoplay.
 */

let ctx: AudioContext | null = null;
let muted = false;
let lastHover = 0;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  startOffset: number,
  dur: number,
  gain = 0.06,
  type: OscillatorType = "sine",
) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t = c.currentTime + startOffset;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g);
  g.connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.03);
}

export type SoundKind =
  | "hover"
  | "select"
  | "correct"
  | "wrong"
  | "finish"
  | "tick";

export function playSound(kind: SoundKind) {
  if (muted || typeof window === "undefined") return;
  switch (kind) {
    case "hover": {
      // Très subtil, throttlé pour ne pas saturer au survol.
      const now = Date.now();
      if (now - lastHover < 70) return;
      lastHover = now;
      tone(1180, 0, 0.05, 0.014, "sine");
      break;
    }
    case "select":
      tone(523.25, 0, 0.07, 0.04, "sine");
      tone(784, 0.02, 0.09, 0.03, "sine");
      break;
    case "correct":
      // Arpège majeur ascendant, doux.
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
        tone(f, i * 0.075, 0.26, 0.05, "sine"),
      );
      break;
    case "wrong":
      // Deux notes basses, feutrées, jamais agressives.
      tone(233.08, 0, 0.16, 0.04, "triangle");
      tone(196, 0.06, 0.2, 0.035, "triangle");
      break;
    case "finish":
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) =>
        tone(f, i * 0.085, 0.32, 0.055, "sine"),
      );
      break;
    case "tick":
      tone(660, 0, 0.05, 0.03, "sine");
      break;
  }
}

export function setMuted(v: boolean) {
  muted = v;
}
export function isMuted() {
  return muted;
}
