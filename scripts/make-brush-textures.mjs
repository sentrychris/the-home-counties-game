// Generates the painterly textures the CSS uses for brushed edges and worn frames.
//
//   npm run textures
//
// Everything is procedural (seeded noise), so re-running gives the same files.
// Output goes to src/assets/textures/.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const OUT = path.join(ROOT, "src", "assets", "textures");

// ---------- Noise ----------

function hash(x, y, seed) {
  let h = (x * 374761393 + y * 668265263 + seed * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

const fade = (t) => t * t * (3 - 2 * t);

function valueNoise(x, y, seed) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = fade(x - xi), yf = fade(y - yi);
  const a = hash(xi, yi, seed), b = hash(xi + 1, yi, seed);
  const c = hash(xi, yi + 1, seed), d = hash(xi + 1, yi + 1, seed);
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
}

/** Fractal noise in 0..1. */
function fbm(x, y, seed, octaves = 4) {
  let sum = 0, amp = 0.5, norm = 0;
  for (let o = 0; o < octaves; o++) {
    sum += valueNoise(x, y, seed + o * 17) * amp;
    norm += amp;
    x *= 2.03;
    y *= 2.03;
    amp *= 0.5;
  }
  return sum / norm;
}

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (a, b, v) => fade(clamp01((v - a) / (b - a)));

async function writeAlpha(file, w, h, alphaAt, rgb = [255, 255, 255]) {
  const buf = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      buf[i] = rgb[0];
      buf[i + 1] = rgb[1];
      buf[i + 2] = rgb[2];
      buf[i + 3] = Math.round(clamp01(alphaAt(x, y)) * 255);
    }
  }
  await sharp(buf, { raw: { width: w, height: h, channels: 4 } }).png({ compressionLevel: 9, palette: false }).toFile(path.join(OUT, file));
  console.log(`  ${file} (${w}x${h})`);
}

// ---------- Brush fade: solid at the top, dry-brush streaks breaking up to nothing at the bottom ----------

function brushFade(w, h, seed) {
  return (x, y) => {
    const t = y / (h - 1);
    // The edge wanders a little along its length.
    const wob = (fbm(x / 240, 0.5, seed, 3) - 0.5) * 0.35 + (fbm(x / 50, 3.5, seed + 5, 2) - 0.5) * 0.12;
    const cover = 1 - t + wob;
    // Long horizontal bristle streaks, plus a little grain.
    const streak = fbm(x / 160, y / 1.8, seed + 11, 4) - 0.5;
    const grain = fbm(x / 2.5, y / 2.5, seed + 23, 2) - 0.5;
    const a = (cover - 0.5 + streak * 0.95 + grain * 0.2) * 3.2 + 0.5;
    // Guarantee solid at the very top and nothing at the very bottom, so it joins cleanly.
    return Math.max(clamp01(a) * (1 - smooth(0.78, 0.98, t)), 1 - smooth(0.02, 0.12, t));
  };
}

// ---------- Brush stroke: one horizontal swipe with ragged edges and a dry tail ----------

function brushStroke(w, h, seed) {
  return (x, y) => {
    const u = x / (w - 1);
    const v = y / (h - 1);
    // Thickness swells from the start, holds, and thins out at the end.
    const thick = 0.42 * smooth(0, 0.06, u) * (1 - 0.55 * smooth(0.55, 1, u));
    const centre = 0.5 + (fbm(u * 3, 0.3, seed, 2) - 0.5) * 0.18;
    const edge = (fbm(u * 30, v * 3, seed + 3, 3) - 0.5) * 0.22;
    const body = 1 - smooth(thick - 0.06, thick + 0.03, Math.abs(v - centre) + edge);
    // Bristle streaks run along the stroke and break up towards the tail.
    const streak = fbm(u * 6, v * 26, seed + 9, 4);
    const dry = smooth(0.45, 1, u) * 0.75 + 0.12;
    const tail = smooth(dry - 0.12, dry + 0.05, streak);
    return body * tail;
  };
}

// ---------- Brush frame: a rectangle with dry-brushed edges, for masking images ----------

function brushFrame(w, h, seed, edge) {
  return (x, y) => {
    const sides = [
      { d: y, along: x, s: seed },
      { d: h - 1 - y, along: x, s: seed + 100 },
      { d: x, along: y, s: seed + 200 },
      { d: w - 1 - x, along: y, s: seed + 300 },
    ];
    let a = 1;
    for (const side of sides) {
      if (side.d > edge * 2.2) continue;
      // Big slow wander, medium bites, then bristle streaks along the edge.
      const wob = (fbm(side.along / 260, 0.5, side.s, 3) - 0.5) * 1.6 + (fbm(side.along / 45, 2.5, side.s + 3, 3) - 0.5) * 0.9;
      const streak = fbm(side.along / 45, side.d / 3, side.s + 7, 4) - 0.5;
      const grain = fbm(side.along / 2.5, side.d / 2.5, side.s + 13, 2) - 0.5;
      const cover = side.d / edge - 0.6 + wob * 0.6 + streak * 0.8 + grain * 0.3;
      a = Math.min(a, cover * 2.6 + 0.5);
    }
    return a;
  };
}

// ---------- Scratch frame: a worn, chipped edge for panels (used as a 9-slice border-image) ----------

async function scratchFrame(file, size, slice, seed) {
  const w = size, h = size;
  const buf = Buffer.alloc(w * h * 4);
  const put = (x, y, rgb, a) => {
    if (x < 0 || y < 0 || x >= w || y >= h || a <= 0) return;
    const i = (y * w + x) * 4;
    // "Over" blend onto whatever is there.
    const ea = buf[i + 3] / 255;
    const na = a + ea * (1 - a);
    for (let c = 0; c < 3; c++) buf[i + c] = Math.round((rgb[c] * a + buf[i + c] * ea * (1 - a)) / (na || 1));
    buf[i + 3] = Math.round(na * 255);
  };

  const bone = [216, 210, 195];
  const dark = [6, 7, 6];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const d = Math.min(x, y, w - 1 - x, h - 1 - y); // distance from the outer edge
      if (d >= slice) continue;
      const along = d === y || d === h - 1 - y ? x : y;
      const sideSeed = d === y ? 0 : d === h - 1 - y ? 1 : d === x ? 2 : 3;

      // Dark outer lip so the panel sits on the page.
      if (d < 2) put(x, y, dark, d === 0 ? 0.75 : 0.45);

      // Worn bevel: a thin pale line just inside the edge, chipped and uneven.
      const chip = fbm(along / 26, sideSeed * 7.3, seed + sideSeed, 3);
      const bevel = d >= 2 && d <= 3 ? smooth(0.32, 0.5, chip) * (0.18 + 0.22 * fbm(along / 8, sideSeed, seed + 40, 2)) : 0;
      if (bevel > 0) put(x, y, bone, bevel);

      // Paint worn off the edge: pale scuffs that are heavier near the corners.
      const cx = Math.min(x, w - 1 - x), cy = Math.min(y, h - 1 - y);
      const nearCorner = 1 - smooth(10, slice * 1.5, Math.hypot(Math.min(cx, slice * 2), Math.min(cy, slice * 2)));
      const scuff = fbm(x / 3.2, y / 3.2, seed + 60, 3);
      const wearZone = 1 - smooth(1, 10, d);
      const threshold = 0.68 - nearCorner * 0.14;
      if (scuff > threshold) put(x, y, bone, wearZone * (scuff - threshold) * 2.2);
    }
  }

  // A few fine scratches across the corners.
  let rnd = seed * 9301 + 49297;
  const rand = () => ((rnd = (rnd * 9301 + 49297) % 233280) / 233280);
  for (let n = 0; n < 26; n++) {
    const corner = n % 4;
    const ox = corner % 2 === 0 ? rand() * slice * 1.2 : w - 1 - rand() * slice * 1.2;
    const oy = corner < 2 ? rand() * slice * 1.2 : h - 1 - rand() * slice * 1.2;
    const ang = rand() * Math.PI;
    const len = 6 + rand() * 22;
    const a = 0.12 + rand() * 0.2;
    for (let s = 0; s < len; s += 0.5) {
      const px = Math.round(ox + Math.cos(ang) * s), py = Math.round(oy + Math.sin(ang) * s);
      const d = Math.min(px, py, w - 1 - px, h - 1 - py);
      if (d < slice) put(px, py, bone, a * (1 - s / len) * (0.6 + 0.4 * Math.sin((s / len) * Math.PI)));
    }
  }

  await sharp(buf, { raw: { width: w, height: h, channels: 4 } }).png({ compressionLevel: 9 }).toFile(path.join(OUT, file));
  console.log(`  ${file} (${w}x${h}, slice ${slice})`);
}

await fs.mkdir(OUT, { recursive: true });
console.log("Brush textures");
await writeAlpha("brush-fade.png", 1600, 120, brushFade(1600, 120, 7));
await writeAlpha("brush-rise.png", 1600, 120, ((f) => (x, y) => f(x, 119 - y))(brushFade(1600, 120, 19)));
await writeAlpha("brush-stroke.png", 480, 64, brushStroke(480, 64, 31));
await writeAlpha("brush-frame.png", 1600, 900, brushFrame(1600, 900, 43, 56));
await scratchFrame("scratch-frame.png", 240, 40, 57);
console.log("Done.");
