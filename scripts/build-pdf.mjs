import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync, existsSync, statSync, rmSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const BRAND = join(ROOT, "public/brand");
const TMP = "/private/tmp/claude-501/-Users-hugueslourmieres-Documents-Hugues-Lourmieres-Communication/64173358-2b60-483f-81c1-9f1d5010046a/scratchpad/brandrender";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
mkdirSync(TMP, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const A = (f) => "file://" + join(BRAND, f);

const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500&display=swap" rel="stylesheet">';

const swatch = (name, hex, use, dark) => `<div style="border:1px solid rgba(26,23,20,.12);border-radius:8px;overflow:hidden">
  <div style="height:90px;background:${hex}"></div>
  <div style="padding:12px 14px">
    <div style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#1a1714">${name}</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:12px;color:rgba(26,23,20,.55);margin-top:3px">${hex}</div>
    <div style="font-family:'Inter';font-size:11px;color:rgba(26,23,20,.6);margin-top:8px;line-height:1.45">${use}</div>
  </div>
</div>`;

const eyebrow = (t) => `<p style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.32em;text-transform:uppercase;color:#f37b22;margin:0 0 22px">${t}</p>`;

const HTML = `<!doctype html><html><head><meta charset="utf8">${FONTS}
<style>
  @page{size:A4;margin:0}
  *{-webkit-print-color-adjust:exact;print-color-adjust:exact;box-sizing:border-box}
  html,body{margin:0;padding:0;font-family:'Inter',sans-serif;color:#1a1714}
  .page{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;background:#f7f2ea;padding:24mm 22mm}
  .page:last-child{page-break-after:auto}
  h2{font-family:'Bodoni Moda',serif;font-weight:500;font-size:34px;margin:0 0 6px;letter-spacing:.01em}
  .sub{font-family:'Inter';font-size:13px;color:rgba(26,23,20,.62);line-height:1.6;max-width:150mm}
  .foot{position:absolute;left:22mm;right:22mm;bottom:16mm;display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,23,20,.4);border-top:1px solid rgba(26,23,20,.12);padding-top:10px}
  .card{border:1px solid rgba(26,23,20,.12);border-radius:10px;background:#f5f0e6;display:flex;align-items:center;justify-content:center}
  .cap{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,23,20,.55);margin-top:10px;text-align:center}
</style></head><body>

<div class="page" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
  <img src="${A("troie-emblem.png")}" style="height:118mm;width:auto"/>
  <div style="font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.34em;text-transform:uppercase;color:#f37b22;margin-top:18mm">Charte graphique</div>
  <div style="font-family:'Inter';font-size:12px;color:rgba(26,23,20,.5);margin-top:10px">Atelier digital, IA d'abord. Nice.</div>
  <div class="foot"><span>TROIE Studio</span><span>Charte graphique</span></div>
</div>

<div class="page">
  ${eyebrow("01 — Logo")}
  <h2>Le système de logo.</h2>
  <p class="sub">Quatre expressions d'une même identité. Le logotype est la référence ; le monogramme sert aux formats réduits ; l'emblème guerrier porte le récit de la marque ; le favicon décline le tout en icône.</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14mm">
    <div><div class="card" style="height:46mm"><img src="${A("troie-logotype.png")}" style="height:20mm"/></div><div class="cap">01 · Logotype principal</div></div>
    <div><div class="card" style="height:46mm"><img src="${A("troie-monogram.png")}" style="height:34mm"/></div><div class="cap">02 · Monogramme</div></div>
    <div><div class="card" style="height:60mm"><img src="${A("troie-emblem.png")}" style="height:52mm"/></div><div class="cap">03 · Emblème guerrier</div></div>
    <div><div class="card" style="height:60mm;flex-direction:column;gap:8mm"><img src="${A("favicon-512.png")}" style="height:24mm;border-radius:8px"/></div><div class="cap">04 · Favicon / app icon</div></div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-top:8mm">
    <div class="card" style="height:26mm;background:#f5f0e6"><img src="${A("troie-logotype.png")}" style="height:11mm"/></div>
    <div class="card" style="height:26mm;background:#0f0b08"><img src="${A("troie-logotype-cream.png")}" style="height:11mm"/></div>
    <div class="card" style="height:26mm;background:#f37b22"><img src="${A("troie-logotype.png")}" style="height:11mm"/></div>
  </div>
  <div class="foot"><span>TROIE Studio</span><span>01 — Logo</span></div>
</div>

<div class="page">
  ${eyebrow("02 — Couleurs")}
  <h2>La palette.</h2>
  <p class="sub">Crème et encre par défaut, terracotta en ponctuation. Le pétrole distingue l'univers professionnel. Contraste élevé, aplats francs, zéro dégradé.</p>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-top:14mm">
    ${swatch("Terracotta", "#F37B22", "Accents, CTA, liens, pictogrammes.")}
    ${swatch("Crème", "#F5F0E6", "Fond principal, cartes claires.")}
    ${swatch("Sable", "#ECE4D6", "Surfaces secondaires, séparations.")}
    ${swatch("Encre", "#1A1714", "Texte, sections sombres, logo.")}
    ${swatch("Noir profond", "#0F0B08", "Sections dramatiques, contraste.")}
    ${swatch("Pétrole", "#1F4D4A", "Univers pro / entreprise, à doser.")}
  </div>
  <div class="foot"><span>TROIE Studio</span><span>02 — Couleurs</span></div>
</div>

<div class="page">
  ${eyebrow("03 — Typographie")}
  <h2>Les caractères.</h2>
  <p class="sub">Une serif de couture pour le verbe, une mono pour la précision, une sans pour le confort de lecture.</p>
  <div style="margin-top:12mm;border-top:1px solid rgba(26,23,20,.12);padding-top:9mm">
    <div style="display:flex;align-items:baseline;gap:20px">
      <span style="font-family:'Bodoni Moda',serif;font-size:96px;line-height:.9">Aa</span>
      <div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;color:#f37b22;text-transform:uppercase">Titrage — Bodoni Moda</div>
        <div style="font-family:'Bodoni Moda',serif;font-size:30px;margin-top:6px">Atelier digital, IA d'abord.</div>
        <div style="font-family:'Bodoni Moda',serif;font-size:15px;color:rgba(26,23,20,.6);margin-top:8px">ABCDEFGHIJKLMNOPQRSTUVWXYZ &nbsp; abcdefghijklm &nbsp; 0123456789</div>
      </div>
    </div>
  </div>
  <div style="margin-top:9mm;border-top:1px solid rgba(26,23,20,.12);padding-top:9mm">
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;color:#f37b22;text-transform:uppercase">Labels — JetBrains Mono</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:.26em;text-transform:uppercase;margin-top:8px">01 · Création &nbsp; 02 · Stratégie &nbsp; 03 · Formation</div>
  </div>
  <div style="margin-top:9mm;border-top:1px solid rgba(26,23,20,.12);padding-top:9mm">
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;color:#f37b22;text-transform:uppercase">Courant — Inter</div>
    <div style="font-family:'Inter';font-size:15px;line-height:1.7;margin-top:8px;max-width:150mm">Studio de création et d'IA basé à Nice. Site web, application, image, stratégie et formation : on remet la précision au cœur du métier, pour les marques comme pour les particuliers.</div>
  </div>
  <div class="foot"><span>TROIE Studio</span><span>03 — Typographie</span></div>
</div>

<div class="page" style="background:#0f0b08;color:#f5f0e6">
  ${eyebrow("04 — Emblème")}
  <h2 style="color:#f5f0e6">Le guerrier.</h2>
  <p class="sub" style="color:rgba(245,240,230,.62)">Achille troyen, bouclier au bras. Issu du relief de marque, décliné en silhouette pleine. À utiliser en grand sur les couvertures, en filigrane, ou en tampon.</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:14mm;align-items:center">
    <div style="border:1px solid rgba(245,240,230,.14);border-radius:10px;background:#15110d;display:flex;align-items:center;justify-content:center;height:120mm"><img src="${A("troie-warrior.png")}" style="height:104mm"/></div>
    <div style="border:1px solid rgba(245,240,230,.14);border-radius:10px;background:#f5f0e6;display:flex;align-items:center;justify-content:center;height:120mm"><img src="${A("troie-warrior-ink.png")}" style="height:104mm"/></div>
  </div>
  <div class="foot" style="color:rgba(245,240,230,.4);border-top-color:rgba(245,240,230,.14)"><span>TROIE Studio</span><span>04 — Emblème</span></div>
</div>

</body></html>`;

async function main() {
  const htmlPath = join(TMP, "charte.html");
  writeFileSync(htmlPath, HTML);
  const outPath = join(BRAND, "TROIE-charte-graphique.pdf");
  if (existsSync(outPath)) rmSync(outPath);
  const profile = join(TMP, "cdpPDF");
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
  console.log(ok ? "PDF ok " + (statSync(outPath).size) + " bytes" : "PDF TIMEOUT");
}
main().catch((e) => { console.error(e); process.exit(1); });
