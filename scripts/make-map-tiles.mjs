// Cuts the high-res tactical map into Leaflet tiles, plus a downloadable
// "field copy" and a small preview for the home page.
//
//   npm run tiles
//
// Reads its settings from src/data/map.json ("source", "tiles", "downloads").
// To use a new map image: drop it in resources/, point source.image at it, set
// source.crop to the part you want on the web map, set pxPerMetre and
// worldOriginPx (the pixel where game-world 0,0 sits), then re-run this.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { geometry } from "../src/lib/map-geometry.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const map = JSON.parse(await fs.readFile(path.join(ROOT, "src/data/map.json"), "utf8"));
const geo = geometry(map);
const { tileSize, quality } = map.tiles;
const src = path.join(ROOT, map.source.image);
const pub = (p) => path.join(ROOT, "public", p);

sharp.cache(false);
sharp.concurrency(2);

console.log(`Map: ${map.name}`);
console.log(`  source ${map.source.image}`);
console.log(`  native zoom ${geo.nativeZoom} (${2 ** geo.nativeZoom} px/m), base image ${geo.widthPx}x${geo.heightPx}`);

// One decoded copy of the cropped (and, if needed, resampled) base image.
const base = await sharp(src, { limitInputPixels: false })
  .extract(map.source.crop)
  .resize(geo.widthPx, geo.heightPx, { fit: "fill", kernel: "lanczos3" })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const tileRoot = pub(path.dirname(path.dirname(path.dirname(map.tiles.url))));
await fs.rm(tileRoot, { recursive: true, force: true });

let count = 0;
let bytes = 0;
for (let z = geo.nativeZoom; z >= 0; z--) {
  const f = 2 ** (z - geo.nativeZoom);
  const w = Math.max(1, Math.round(geo.widthPx * f));
  const h = Math.max(1, Math.round(geo.heightPx * f));
  const level = await sharp(base.data, { raw: base.info }).resize(w, h, { kernel: "lanczos3" }).raw().toBuffer({ resolveWithObject: true });
  const cols = Math.ceil(w / tileSize);
  const rows = Math.ceil(h / tileSize);
  for (let x = 0; x < cols; x++) {
    const dir = pub(map.tiles.url.replace("{z}", z).replace("{x}", x).replace("/{y}.webp", ""));
    await fs.mkdir(dir, { recursive: true });
    for (let y = 0; y < rows; y++) {
      const left = x * tileSize;
      const top = y * tileSize;
      const tw = Math.min(tileSize, w - left);
      const th = Math.min(tileSize, h - top);
      let tile = sharp(level.data, { raw: level.info }).extract({ left, top, width: tw, height: th });
      if (tw < tileSize || th < tileSize) {
        // Pad edge tiles so Leaflet doesn't stretch them.
        tile = sharp(await tile.ensureAlpha().png().toBuffer()).extend({
          right: tileSize - tw,
          bottom: tileSize - th,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        });
      }
      const file = path.join(dir, `${y}.webp`);
      await tile.webp({ quality, alphaQuality: 80, effort: 5 }).toFile(file);
      bytes += (await fs.stat(file)).size;
      count++;
    }
  }
  console.log(`  zoom ${z}: ${cols}x${rows} tiles`);
}
console.log(`  ${count} tiles, ${(bytes / 1048576).toFixed(1)} MB`);

// Full field copy (including the legend panel) for download, and a small preview.
await fs.mkdir(pub(path.dirname(map.downloads.fieldCopy)), { recursive: true });
await sharp(src, { limitInputPixels: false })
  .resize({ width: 3600 })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(pub(map.downloads.fieldCopy));
await sharp(base.data, { raw: base.info })
  .resize({ width: 960 })
  .webp({ quality: 74 })
  .toFile(pub(map.downloads.preview));
console.log(`  ${map.downloads.fieldCopy}, ${map.downloads.preview}`);
console.log("Done.");
