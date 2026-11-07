// Languages for the site. English is the source: every page, data file and post is written in
// English first. Another language is a set of translations laid over it, and anything not yet
// translated simply shows in English. See "Translations" in CONTENT.md.
//
// A page knows its language from its address: /ru/... is Russian, everything else English.
// Pages under src/pages/ru/ are one-line wrappers around the English page files, so a change to a
// page's layout shows in every language at once.
import { url } from "../lib/url";

export const LANGS = {
  en: { label: "English", short: "EN", html: "en-GB", og: "en_GB", locale: "en-GB" },
  ru: { label: "Русский", short: "RU", html: "ru", og: "ru_RU", locale: "ru-RU" },
} as const;

export type Lang = keyof typeof LANGS;
export const DEFAULT_LANG: Lang = "en";
export const OTHER_LANGS = Object.keys(LANGS).filter((l) => l !== DEFAULT_LANG) as Lang[];

const BASE = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

// Translations: one flat "English": "translation" list per language, split over several files in
// src/i18n/<lang>/ (ui.json for the words in the page templates, data.json for src/data/, and so on).
const files = import.meta.glob<Record<string, string>>("./*/*.json", { eager: true, import: "default" });
const dictionaries: Record<string, Map<string, string>> = {};
for (const [file, entries] of Object.entries(files)) {
  const lang = file.split("/")[1];
  const dict = (dictionaries[lang] ??= new Map());
  for (const [en, tr] of Object.entries(entries)) if (tr) dict.set(en, tr);
}

/** The site path without the base, e.g. "ru/map/" or "map/". */
function sitePath(pathname: string): string {
  let p = pathname;
  if (p.startsWith(BASE)) p = p.slice(BASE.length);
  else if (`${p}/` === BASE) p = "";
  return p.replace(/^\/+/, "");
}

/** Which language a page is in, from its address. */
export function langOf(u: URL | string): Lang {
  const pathname = typeof u === "string" ? u : u.pathname;
  const first = sitePath(pathname).split("/")[0];
  return (OTHER_LANGS as string[]).includes(first) ? (first as Lang) : DEFAULT_LANG;
}

/** The same page in another language. */
export function pathIn(u: URL, to: Lang): string {
  const from = langOf(u);
  let p = sitePath(u.pathname);
  if (from !== DEFAULT_LANG) p = p.slice(from.length).replace(/^\/+/, "");
  return url(to === DEFAULT_LANG ? p : `${to}/${p}`);
}

/**
 * Link to a page of the site in this language: link(lang)("map/") is "/map/" in English and
 * "/ru/map/" in Russian. Use url() from lib/url for files (images, downloads, tiles), which are
 * shared by every language.
 */
export function link(lang: Lang) {
  return (p = ""): string => {
    if (lang === DEFAULT_LANG || /^([a-z]+:|#|\/\/)/i.test(p)) return url(p);
    return url(`${lang}/${p.replace(/^\/+/, "")}`);
  };
}

/** Translate one line, falling back to the English. {name} placeholders are filled from vars. */
export function translate(lang: Lang, s: string, vars?: Record<string, string | number>): string {
  let out = lang === DEFAULT_LANG ? s : (dictionaries[lang]?.get(s) ?? s);
  if (vars) out = out.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
  return out;
}

/** A translator for one language: const _ = t(lang); _("Raid intel"). */
export function t(lang: Lang) {
  return (s: string, vars?: Record<string, string | number>) => translate(lang, s, vars);
}

/** Is there a translation for this line? */
export function has(lang: Lang, s: string): boolean {
  return lang === DEFAULT_LANG || Boolean(dictionaries[lang]?.has(s));
}

// Data keys whose values are never words to translate, even when they look like one.
const NOT_WORDS = new Set(["id", "src", "href", "fallback", "url", "image", "icon", "colour", "status", "layer", "licence", "youtubeId", "link"]);

/**
 * Every line of text in a data object (site.json, map.json...) translated, everything else
 * (paths, ids, numbers) left as it is. Strings with no translation stay in English.
 */
export function localize<T>(lang: Lang, value: T): T {
  if (lang === DEFAULT_LANG) return value;
  const walk = (v: unknown, key = ""): unknown => {
    if (NOT_WORDS.has(key)) return v;
    if (typeof v === "string") return translate(lang, v);
    if (Array.isArray(v)) return v.map((x) => walk(x, key));
    if (v && typeof v === "object" && !(v instanceof Date)) {
      return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, k)]));
    }
    return v;
  };
  return walk(value) as T;
}

/**
 * "1 screenshot", "3 screenshots" in English; Russian has three forms ("1 снимок", "3 снимка",
 * "5 снимков"), so a counted word is given as the English pair and looked up as "one|other".
 */
export function plural(lang: Lang, n: number, one: string, other: string): string {
  const en = n === 1 ? one : other;
  if (lang === DEFAULT_LANG) return en;
  const forms = translate(lang, `${one}|${other}`).split("|");
  if (forms.length < 3) return en;
  const rule = new Intl.PluralRules(LANGS[lang].locale).select(n);
  return rule === "one" ? forms[0] : rule === "few" ? forms[1] : forms[2];
}

export function formatDate(lang: Lang, d: Date): string {
  return d.toLocaleDateString(LANGS[lang].locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function formatPounds(lang: Lang, n: number): string {
  return `£${n.toLocaleString(LANGS[lang].locale)}`;
}
