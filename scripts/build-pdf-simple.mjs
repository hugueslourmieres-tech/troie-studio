import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync, existsSync, statSync, rmSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const BRAND = join(ROOT, "public/brand");
const TMP = "/private/tmp/claude-501/-Users-hugueslourmieres-Documents-Hugues-Lourmieres-Communication/64173358-2b60-483f-81c1-9f1d5010046a/scratchpad/brandrender";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
mkdirSync(TMP, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500&display=swap" rel="stylesheet">';

const sw = (name, hex, dark) => `<div style="text-align:center">
  <div style="height:88px;border-radius:8px;background:${hex};border:1px solid rgba(26,23,20,.1)"></div>
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;margin-top:10px">${name}</div>
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(26,23,20,.5);margin-top:2px">${hex}</div>
</div>`;

const HTML = `<!doctype html><html><head><meta charset="utf8">${FONTS}
<style>
  @page{size:A4;margin:0}
  *{-webkit-print-color-adjust:exact;print-color-adjust:exact;box-sizing:border-box}
  html,body{margin:0;padding:0;font-family:'Inter',sans-serif;color:#1a1714}
  .page{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;background:#f7f2ea;padding:26mm 24mm}
  .page:last-child{page-break-after:auto}
  .eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.32em;text-transform:uppercase;color:#f37b22;margin:0 0 20px}
  .label{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:rgba(26,23,20,.55)}
  .foot{position:absolute;left:24mm;right:24mm;bottom:18mm;display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,23,20,.4);border-top:1px solid rgba(26,23,20,.12);padding-top:10px}
</style></head><body>

<div class="page" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
  <div style="font-family:'Bodoni Moda',serif;font-weight:500;font-size:104px;letter-spacing:18px;line-height:1">TROIE</div>
  <div style="height:1.4px;background:#1a1714;opacity:.35;width:200px;margin:26px auto"></div>
  <div style="font-family:'JetBrains Mono',monospace;font-size:16px;letter-spacing:14px;color:rgba(26,23,20,.75)">ATELIER DIGITAL</div>
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#f37b22;margin-top:70px">Charte graphique</div>
  <div style="font-family:'Inter';font-size:12px;color:rgba(26,23,20,.5);margin-top:10px">Studio de création et d'IA. Nice.</div>
  <div class="foot"><span>TROIE Studio</span><span>Charte graphique</span></div>
</div>

<div class="page">
  <p class="eyebrow">Logotype</p>
  <div style="border:1px solid rgba(26,23,20,.12);border-radius:10px;background:#f5f0e6;padding:40px;text-align:center">
    <div style="font-family:'Bodoni Moda',serif;font-weight:500;font-size:60px;letter-spacing:11px">TROIE</div>
    <div style="height:1.2px;background:#1a1714;opacity:.35;width:150px;margin:16px auto"></div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:10px;color:rgba(26,23,20,.72)">ATELIER DIGITAL</div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-top:14px">
    <div style="height:24mm;border-radius:8px;background:#f5f0e6;border:1px solid rgba(26,23,20,.12);display:flex;align-items:center;justify-content:center;font-family:'Bodoni Moda',serif;font-size:26px;letter-spacing:6px;color:#1a1714">TROIE</div>
    <div style="height:24mm;border-radius:8px;background:#0f0b08;display:flex;align-items:center;justify-content:center;font-family:'Bodoni Moda',serif;font-size:26px;letter-spacing:6px;color:#f5f0e6">TROIE</div>
    <div style="height:24mm;border-radius:8px;background:#f37b22;display:flex;align-items:center;justify-content:center;font-family:'Bodoni Moda',serif;font-size:26px;letter-spacing:6px;color:#1a1714">TROIE</div>
  </div>

  <p class="eyebrow" style="margin-top:13mm">Couleurs</p>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:16px">
    ${sw("Terracotta", "#F37B22")}
    ${sw("Crème", "#F5F0E6")}
    ${sw("Sable", "#ECE4D6")}
    ${sw("Encre", "#1A1714")}
  </div>

  <p class="eyebrow" style="margin-top:13mm">Typographie</p>
  <div style="border-top:1px solid rgba(26,23,20,.12);padding-top:6mm">
    <div class="label">Titrage — Bodoni Moda</div>
    <div style="font-family:'Bodoni Moda',serif;font-size:40px;margin-top:6px">Atelier digital, IA d'abord.</div>
  </div>
  <div style="border-top:1px solid rgba(26,23,20,.12);padding-top:5mm;margin-top:5mm">
    <div class="label">Labels — JetBrains Mono</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:.24em;text-transform:uppercase;margin-top:6px">01 · Création &nbsp; 02 · Stratégie &nbsp; 03 · Formation</div>
  </div>
  <div style="border-top:1px solid rgba(26,23,20,.12);padding-top:5mm;margin-top:5mm">
    <div class="label">Courant — Inter</div>
    <div style="font-family:'Inter';font-size:15px;line-height:1.7;margin-top:6px;max-width:150mm">Studio de création et d'IA basé à Nice. Site web, application, image, stratégie et formation.</div>
  </div>
</div>

</body></html>`;

async function main() {
  const htmlPath = join(TMP, "charte-simple.html");
  writeFileSync(htmlPath, HTML);
  const outPath = join(BRAND, "TROIE-charte-graphique.pdf");
  if (existsSync(outPath)) rmSync(outPath);
  const profile = join(TMP, "cdpPDFsimple");
  rmSync(profile, { recursive: true, force: true });
  const child = spawn(CHROME, [
    "--headless=new", "--disable-gpu", "--no-sandbox", "--no-first-run", "--no-default-browser-check",
    "--no-pdf-header-footer", "--virtual-time-budget=8000",
    `--user-data-dir=${profile}`, `--print-to-pdf=${outPath}`, "file://" + htmlPath,
  ], { stdio: "ignore", detached: true });
  let last = -1, stable = 0, ok = false;
  for (let i = 0; i < 120; i++) {
    await sleep(300);
    if (existsSync(outPath)) {
      const sz = statSync(outPath).size;
      if (sz > 1000 && sz === last) { if (++stable >= 3) { ok = true; break; } } else stable = 0;
      last = sz;
    }
  }
  try { process.kill(-child.pid, "SIGKILL"); } catch {}
  console.log(ok ? "PDF ok " + statSync(outPath).size + " bytes" : "PDF TIMEOUT");
}
main().catch((e) => { console.error(e); process.exit(1); });
