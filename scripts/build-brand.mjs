import sharp from "sharp";
import { spawn } from "node:child_process";
import { writeFileSync, readFileSync, mkdirSync, existsSync, statSync, rmSync } from "node:fs";
import { join } from "node:path";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ROOT = process.cwd();
const BRAND = join(ROOT, "public/brand");
const SRC = join(ROOT, "public/images/brand/emboss.png");
const TMP = "/private/tmp/claude-501/-Users-hugueslourmieres-Documents-Hugues-Lourmieres-Communication/64173358-2b60-483f-81c1-9f1d5010046a/scratchpad/brandrender";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
mkdirSync(BRAND, { recursive: true });
mkdirSync(TMP, { recursive: true });

// 1) WARRIOR : detoure (orange transparent) + silhouette encre
async function silhouette(rgb, outName, flattenBg) {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const out = Buffer.alloc(width * height * 4);
  for (let p = 0; p < width * height; p++) {
    const a = data[p * 4 + 3];
    if (a > 128) {
      out[p * 4] = rgb.r; out[p * 4 + 1] = rgb.g; out[p * 4 + 2] = rgb.b; out[p * 4 + 3] = 255;
    }
  }
  let img = sharp(out, { raw: { width, height, channels: 4 } });
  if (flattenBg) img = sharp(await img.png().toBuffer()).flatten({ background: flattenBg });
  await img.trim({ threshold: 5 }).resize({ height: 1500 }).png().toFile(join(BRAND, outName));
}

async function warrior() {
  await silhouette({ r: 243, g: 123, b: 34 }, "troie-warrior.png");
  await silhouette({ r: 26, g: 23, b: 20 }, "troie-warrior-ink.png");
  await silhouette({ r: 26, g: 23, b: 20 }, "troie-warrior-silhouette-flat.png", { r: 245, g: 240, b: 230 });
  console.log("warrior done");
}

const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">';

async function renderSvg({ svg, out, w, h, color = "#1a1714", scale = 2 }) {
  const svgInline = readFileSync(join(BRAND, svg), "utf8");
  const html = `<!doctype html><html><head><meta charset="utf8">${FONTS}<style>html,body{margin:0;padding:0;background:transparent}#c{width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center;color:${color}}#c svg{width:${w}px;height:${h}px;display:block}</style></head><body><div id="c">${svgInline}</div></body></html>`;
  const htmlPath = join(TMP, out + ".html");
  writeFileSync(htmlPath, html);
  const outPath = join(BRAND, out);
  if (existsSync(outPath)) rmSync(outPath);
  const profile = join(TMP, "cdp-" + out.replace(/\W/g, "_"));
  rmSync(profile, { recursive: true, force: true });
  const child = spawn(CHROME, [
    "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
    "--no-first-run", "--no-default-browser-check",
    "--default-background-color=00000000",
    `--force-device-scale-factor=${scale}`,
    `--window-size=${w},${h}`,
    "--virtual-time-budget=3000",
    `--user-data-dir=${profile}`,
    `--screenshot=${outPath}`,
    "file://" + htmlPath,
  ], { stdio: "ignore", detached: true });
  // Attendre l'apparition du fichier (taille stable) puis tuer Chrome
  let last = -1, stable = 0, ok = false;
  for (let i = 0; i < 90; i++) {
    await sleep(300);
    if (existsSync(outPath)) {
      const sz = statSync(outPath).size;
      if (sz > 200 && sz === last) { if (++stable >= 2) { ok = true; break; } }
      else stable = 0;
      last = sz;
    }
  }
  try { process.kill(-child.pid, "SIGKILL"); } catch {}
  console.log(ok ? "rendered " + out : "TIMEOUT " + out);
}

async function tryRender(opts) {
  try { await renderSvg(opts); } catch (e) { console.error("FAIL", opts.out, e.code || e.message); }
}

async function main() {
  if (process.env.SKIP_WARRIOR !== "1") await warrior();
  if (process.env.ONLY_WARRIOR === "1") { console.log("ALL DONE"); return; }
  // Logotype : encre + creme
  await tryRender({ svg: "troie-logotype.svg", out: "troie-logotype.png", w: 600, h: 210, color: "#1a1714" });
  await tryRender({ svg: "troie-logotype.svg", out: "troie-logotype-cream.png", w: 600, h: 210, color: "#f5f0e6" });
  // Monogramme : encre + creme
  await tryRender({ svg: "troie-monogram.svg", out: "troie-monogram.png", w: 256, h: 256, color: "#1a1714" });
  await tryRender({ svg: "troie-monogram.svg", out: "troie-monogram-cream.png", w: 256, h: 256, color: "#f5f0e6" });
  // Emblemes (bichromie figee)
  await tryRender({ svg: "troie-emblem-helmet.svg", out: "troie-emblem-helmet.png", w: 200, h: 230 });
  await tryRender({ svg: "troie-emblem-horse.svg", out: "troie-emblem-horse.png", w: 200, h: 230 });
  // Favicon 512 puis declinaisons
  await tryRender({ svg: "favicon.svg", out: "favicon-512.png", w: 64, h: 64, scale: 8 });
  await sharp(join(BRAND, "favicon-512.png")).resize(180, 180).png().toFile(join(BRAND, "apple-touch-icon.png"));
  await sharp(join(BRAND, "favicon-512.png")).resize(32, 32).png().toFile(join(BRAND, "favicon-32.png"));
  await sharp(join(BRAND, "favicon-512.png")).resize(16, 16).png().toFile(join(BRAND, "favicon-16.png"));
  console.log("ALL DONE");
}
main().catch((e) => { console.error(e); process.exit(1); });
