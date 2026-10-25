// Turns the raw art in resources/ into web-ready images under public/.
// Run with `npm run images` after dropping new screenshots or art into resources/.
// Safe to re-run: it overwrites its own outputs and never touches anything else.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const RES = path.join(ROOT, "resources");
const PUB = path.join(ROOT, "public");

sharp.cache(false);

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function slugify(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/^screenshot\s*/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function log(msg) {
  console.log(`  ${msg}`);
}

// Screenshots: <slug>.webp (1600 wide) and <slug>-800.webp for srcset.
async function screenshots() {
  const dir = path.join(RES, "screenshots");
  if (!(await exists(dir))) return;
  const out = path.join(PUB, "images", "screenshots");
  await ensureDir(out);
  const files = (await fs.readdir(dir)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  console.log(`Screenshots (${files.length})`);
  for (const f of files) {
    const slug = slugify(f);
    const src = path.join(dir, f);
    await sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(out, `${slug}.webp`));
    await sharp(src).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(out, `${slug}-800.webp`));
    log(`${f} -> images/screenshots/${slug}.webp`);
  }
}

// Key art: hero backdrop and the title wordmark.
async function keyArt() {
  console.log("Key art");
  const out = path.join(PUB, "images");
  await ensureDir(out);
  const backdrop = path.join(RES, "ui", "backdrop.jpg");
  if (await exists(backdrop)) {
    for (const w of [2000, 1200, 720]) {
      await sharp(backdrop).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(out, `backdrop-${w}.webp`));
    }
    log("backdrop -> images/backdrop-{2000,1200,720}.webp");
  }
  const logo = path.join(RES, "ui", "title_logo.png");
  if (await exists(logo)) {
    for (const w of [1400, 700]) {
      await sharp(logo).resize({ width: w }).webp({ quality: 88, alphaQuality: 90 }).toFile(path.join(out, `logo-${w}.webp`));
    }
    log("title_logo -> images/logo-{1400,700}.webp");
  }
}

// Item art and empty-slot silhouettes from the game's inventory UI.
async function inventoryArt() {
  for (const kind of ["items", "slots"]) {
    const dir = path.join(RES, "ui", kind);
    if (!(await exists(dir))) continue;
    const out = path.join(PUB, "images", kind);
    await ensureDir(out);
    const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".png"));
    console.log(`Inventory ${kind} (${files.length})`);
    for (const f of files) {
      await sharp(path.join(dir, f)).webp({ quality: 86, alphaQuality: 90 }).toFile(path.join(out, f.replace(/\.png$/, ".webp")));
    }
  }
}

// Worn textures used by the CSS: print mask for distressed headings, panel wear,
// scratches and scuffed paper. All tile seamlessly.
async function textures() {
  console.log("Textures");
  const out = path.join(ROOT, "src", "assets", "textures");
  await ensureDir(out);
  const ink = path.join(RES, "ui", "worn", "ink.png");
  const grunge = path.join(RES, "ui", "worn", "grunge.png");
  const size = 512;

  if (await exists(ink)) {
    // Alpha mask: solid everywhere except the bright specks, which become holes in the type.
    const alpha = await sharp(ink).removeAlpha().resize(size, size).greyscale().linear(-1.7, 360).extractChannel(0).raw().toBuffer();
    await sharp({ create: { width: size, height: size, channels: 3, background: "#000" } })
      .joinChannel(alpha, { raw: { width: size, height: size, channels: 1 } })
      .png({ compressionLevel: 9 })
      .toFile(path.join(out, "print-mask.png"));

    const scratchAlpha = await sharp(ink).removeAlpha().resize(size, size).greyscale().linear(0.11, 0).extractChannel(0).raw().toBuffer();
    await sharp({ create: { width: size, height: size, channels: 3, background: "#d8d2c3" } })
      .joinChannel(scratchAlpha, { raw: { width: size, height: size, channels: 1 } })
      .webp({ quality: 70, alphaQuality: 60 })
      .toFile(path.join(out, "scratches.webp"));
    log("print-mask.png, scratches.webp");
  }

  if (await exists(grunge)) {
    const wearAlpha = await sharp(grunge).resize(size, size).removeAlpha().greyscale().linear(-0.16, 40.8).extractChannel(0).raw().toBuffer();
    await sharp({ create: { width: size, height: size, channels: 3, background: "#000" } })
      .joinChannel(wearAlpha, { raw: { width: size, height: size, channels: 1 } })
      .webp({ quality: 70, alphaQuality: 60 })
      .toFile(path.join(out, "wear.webp"));

    // Scuffed paper: warm bone base, soft blotches from the grunge, specks from the ink.
    const blotchAlpha = await sharp(grunge).resize(size, size).blur(6).removeAlpha().greyscale().linear(-0.1, 25.5).extractChannel(0).raw().toBuffer();
    const speckAlpha = await sharp(ink).removeAlpha().resize(size, size).greyscale().linear(0.35, 0).extractChannel(0).raw().toBuffer();
    const tint = (colour, alpha) =>
      sharp({ create: { width: size, height: size, channels: 3, background: colour } })
        .joinChannel(alpha, { raw: { width: size, height: size, channels: 1 } })
        .png()
        .toBuffer();
    const blotchRgba = await tint("#6b5636", blotchAlpha);
    const speck = await tint("#4a4336", speckAlpha);
    const base = await sharp({ create: { width: size, height: size, channels: 3, background: "#dcd3bf" } }).png().toBuffer();
    await sharp(base)
      .composite([{ input: blotchRgba }, { input: speck }])
      .webp({ quality: 72 })
      .toFile(path.join(out, "paper.webp"));
    log("wear.webp, paper.webp");
  }
}

// The in-game top-down render, used as the "Aerial" base layer on the map.
async function aerial() {
  const src = path.join(RES, "maps", "duncombe_street.png");
  if (!(await exists(src))) return;
  console.log("Map aerial layer");
  const out = path.join(PUB, "map", "duncombe-street");
  await ensureDir(out);
  await sharp(src).webp({ quality: 80 }).toFile(path.join(out, "aerial.webp"));
  log("maps/duncombe_street.png -> map/duncombe-street/aerial.webp");
}

// Social sharing card: backdrop with the wordmark.
async function ogImage() {
  const backdrop = path.join(RES, "ui", "backdrop.jpg");
  const logo = path.join(RES, "ui", "title_logo.png");
  if (!(await exists(backdrop)) || !(await exists(logo))) return;
  console.log("Social card");
  const W = 1200, H = 630;
  const shade = Buffer.from(
    `<svg width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e0f0d" stop-opacity=".15"/><stop offset=".55" stop-color="#0e0f0d" stop-opacity=".35"/><stop offset="1" stop-color="#0e0f0d" stop-opacity=".9"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`
  );
  const logoBuf = await sharp(logo).resize({ width: 920 }).toBuffer();
  const meta = await sharp(logoBuf).metadata();
  await sharp(backdrop)
    .resize(W, H, { fit: "cover", position: "centre" })
    .composite([
      { input: shade },
      { input: logoBuf, left: Math.round((W - meta.width) / 2), top: H - meta.height - 70 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(PUB, "og.jpg"));
  log("og.jpg");
}

console.log("Preparing images from resources/ ...");
await screenshots();
await keyArt();
await inventoryArt();
await textures();
await aerial();
await ogImage();
console.log("Done.");
