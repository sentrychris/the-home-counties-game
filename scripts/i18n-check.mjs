// What still needs translating: `npm run i18n` (or `node scripts/i18n-check.mjs`).
// Lists, for each language other than English:
//   - Markdown (dev-log posts, guides, weapons, enemies, About) with no translated copy yet,
//   - words in the page templates (_("...") calls) with no entry in src/i18n/<lang>/*.json,
//   - words in the data files (src/data/*.json) with no entry.
// Nothing here stops the site building: anything untranslated simply shows in English.
// See "Translations" in CONTENT.md.
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const src = join(root, "src");
const langs = readdirSync(join(src, "i18n")).filter((d) => statSync(join(src, "i18n", d)).isDirectory());

const walk = (dir, ext) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name), ext) : e.name.endsWith(ext) ? [join(dir, e.name)] : []
  );

// The same keys src/i18n/index.ts never translates.
const NOT_WORDS = new Set(["id", "src", "href", "fallback", "url", "image", "icon", "colour", "status", "layer", "licence", "youtubeId", "link"]);
const DATA = ["site", "map", "map-markers", "items", "tasks", "controls", "credits", "roadmap", "traders"];
const isWords = (s) => /[A-Za-z]{2,}/.test(s) && !/^(https?:|mailto:|#|\/)/.test(s) && !/^[\w./-]+\.(webp|jpg|png|svg|mp4|webm|json|zip)$/.test(s);

// items.json's slot and category are translated a word at a time in gear.astro.
const PER_WORD = new Set(["slot", "category"]);

function dataStrings(value, key = "", out = new Set()) {
  if (NOT_WORDS.has(key)) return out;
  if (PER_WORD.has(key) && typeof value === "string") { for (const w of value.split("/")) if (isWords(w.trim())) out.add(w.trim()); return out; }
  if (typeof value === "string") { if (isWords(value)) out.add(value); }
  else if (Array.isArray(value)) value.forEach((v) => dataStrings(v, key, out));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) dataStrings(v, k, out);
  return out;
}

const templateStrings = new Set();
for (const f of [...walk(join(src, "pages"), ".astro"), ...walk(join(src, "components"), ".astro"), ...walk(join(src, "layouts"), ".astro")]) {
  for (const m of readFileSync(f, "utf8").matchAll(/\b_\(\s*"((?:[^"\\]|\\.)+)"/g)) templateStrings.add(m[1].replace(/\\"/g, '"'));
}

for (const lang of langs) {
  const dict = new Map();
  for (const f of walk(join(src, "i18n", lang), ".json")) for (const [k, v] of Object.entries(JSON.parse(readFileSync(f, "utf8")))) if (v) dict.set(k, v);
  console.log(`\n== ${lang} ==`);

  for (const col of ["devlog", "guides", "weapons", "enemies", "pages"]) {
    const missing = readdirSync(join(src, "content", col)).filter((n) => n.endsWith(".md") && !existsSync(join(src, "content", lang, col, n)));
    if (missing.length) console.log(`\nMarkdown with no ${lang} copy in src/content/${lang}/${col}/:\n` + missing.map((n) => `  ${n}`).join("\n"));
  }

  const tmpl = [...templateStrings].filter((s) => !dict.has(s));
  if (tmpl.length) console.log(`\nTemplate words with no entry (add to src/i18n/${lang}/ui.json):\n` + tmpl.map((s) => `  ${JSON.stringify(s)}`).join("\n"));

  for (const name of DATA) {
    const f = join(src, "data", `${name}.json`);
    if (!existsSync(f)) continue;
    const missing = [...dataStrings(JSON.parse(readFileSync(f, "utf8")))].filter((s) => !dict.has(s));
    if (missing.length) console.log(`\n${relative(root, f)}: ${missing.length} with no entry:\n` + missing.map((s) => `  ${JSON.stringify(s)}`).join("\n"));
  }
}
console.log("");
