// Builds the site's worn textures from the game's own menu textures, so panels and
// headings wear the same way as the hideout screens.
//
//   resources/ui/worn/grunge.png -> src/assets/textures/grunge.webp
//     Scuffs, scratches and dirt (the game's WornBox). Laid over every panel and button.
//   resources/ui/worn/ink.png    -> src/assets/textures/ink-heavy.png, ink-light.png
//     Worn print for headings (the game's ui_worn_ink shader): the alpha drops out at the
//     chips, so a heading masked with it wears through like the wordmark.
//
// Run with: npm run textures
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const src = (p) => path.join(ROOT, "resources/ui/worn", p);
const out = (p) => path.join(ROOT, "src/assets/textures", p);
fs.mkdirSync(out(""), { recursive: true });

// Scuffs: keep the grey and the alpha, at half size (the game draws it at 1024 px a repeat;
// the CSS draws this one at 1024 px too, so it stays soft rather than sharp).
await sharp(src("grunge.png")).resize(512, 512).webp({ quality: 72, alphaQuality: 70 }).toFile(out("grunge.webp"));

// Worn print. Same maths as shaders/ui_worn_ink.gdshader:
//   alpha = 1 - smoothstep(0.28, 0.5, ink * wear)
const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const { data, info } = await sharp(src("ink.png")).resize(560, 560).greyscale().raw().toBuffer({ resolveWithObject: true });

for (const [name, wear] of [
  ["ink-heavy.png", 0.7],
  ["ink-light.png", 0.55],
]) {
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const worn = (data[i * info.channels] / 255) * wear;
    rgba[i * 4 + 3] = Math.round(255 * (1 - smooth(0.28, 0.5, worn)));
  }
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9, palette: true, colours: 16 })
    .toFile(out(name));
}

for (const f of ["grunge.webp", "ink-heavy.png", "ink-light.png"]) {
  console.log(`src/assets/textures/${f}  ${(fs.statSync(out(f)).size / 1024).toFixed(0)} KB`);
}
