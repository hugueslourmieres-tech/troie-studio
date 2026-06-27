import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync, existsSync, statSync, rmSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const BRAND = join(ROOT, "public/brand");
const TMP = "/private/tmp/claude-501/-Users-hugueslourmieres-Documents-Hugues-Lourmieres-Communication/64173358-2b60-483f-81c1-9f1d5010046a/scratchpad/brandrender";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
mkdirSync(TMP, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">';

async function render(out, w, h, body, scale = 2) {
  const html = `<!doctype html><html><head><meta charset="utf8">${FONTS}<style>html,body{margin:0;padding:0;background:transparent}#c{width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center}</style></head><body><div id="c">${body}</div></body></html>`;
  const htmlPath = join(TMP, out + ".html");
  writeFileSync(htmlPath, html);
  const outPath = join(BRAND, out);
  if (existsSync(outPath)) rmSync(outPath);
  const profile = join(TMP, "cdpE-" + out.replace(/\W/g, "_"));
  rmSync(profile, { recursive: true, force: true });
  const child = spawn(CHROME, [
    "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
    "--no-first-run", "--no-default-browser-check", "--default-background-color=00000000",
    `--force-device-scale-factor=${scale}`, `--window-size=${w},${h}`,
    "--virtual-time-budget=3000", `--user-data-dir=${profile}`,
    `--screenshot=${outPath}`, "file://" + htmlPath,
  ], { stdio: "ignore", detached: true });
  let last = -1, stable = 0, ok = false;
  for (let i = 0; i < 90; i++) {
    await sleep(300);
    if (existsSync(outPath)) {
      const sz = statSync(outPath).size;
      if (sz > 200 && sz === last) { if (++stable >= 2) { ok = true; break; } } else stable = 0;
      last = sz;
    }
  }
  try { process.kill(-child.pid, "SIGKILL"); } catch {}
  console.log(ok ? "rendered " + out : "TIMEOUT " + out);
}

const wordmark = (color) => `<div style="text-align:center">
  <div style="font-family:'Bodoni Moda',serif;font-weight:500;font-size:74px;letter-spacing:14px;color:${color};line-height:1">TROIE</div>
  <div style="height:1.4px;background:${color};opacity:.4;width:70%;margin:16px auto"></div>
  <div style="font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:11px;color:${color};opacity:.78">ATELIER DIGITAL</div>
</div>`;

const lockup = (warrior, color) => `<div style="display:flex;flex-direction:column;align-items:center;gap:40px">
  <img src="file://${join(BRAND, warrior)}" style="height:520px;width:auto;display:block"/>
  ${wordmark(color)}
</div>`;

async function main() {
  await render("troie-emblem.png", 760, 900, lockup("troie-warrior-ink.png", "#1a1714"));
  await render("troie-emblem-orange.png", 760, 900, lockup("troie-warrior.png", "#1a1714"));
  console.log("ALL DONE");
}
main().catch((e) => { console.error(e); process.exit(1); });
