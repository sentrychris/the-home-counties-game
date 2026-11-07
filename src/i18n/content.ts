// Markdown in other languages. A translation is a copy of the English file with the same name
// under src/content/<lang>/ (src/content/ru/devlog/2026-11-03-night.md, and so on), with its words
// translated. Lists and pages always follow the English files: a post with no translation yet is
// shown in English, and a translated file whose English one has gone is ignored.
//
// Only the words are taken from a translation. Dates, versions, order, numbers, picture paths and
// the like always come from the English file, so they can't drift apart.
import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import { DEFAULT_LANG, type Lang } from "./index";

type Translatable = "devlog" | "guides" | "weapons" | "enemies" | "pages";

const TRANSLATIONS = {
  ru: { devlog: "devlogRu", guides: "guidesRu", weapons: "weaponsRu", enemies: "enemiesRu", pages: "pagesRu" },
} as const;

// Keys whose values are never words, even when they're strings. ("image" is a path on a weapon, but
// an object with alt text on an enemy, so only plain values and lists are kept.)
const KEEP = new Set(["src", "image", "icon", "widget", "status", "href", "link", "youtubeId", "slots", "calibre"]);

/** The English data with the translation's words laid over it, item by item. */
function overlay(en: unknown, tr: unknown, key = ""): unknown {
  if (KEEP.has(key) && (typeof en !== "object" || en === null || Array.isArray(en))) return en;
  if (typeof en === "string") return typeof tr === "string" && tr.trim() ? tr : en;
  if (Array.isArray(en)) return en.map((v, i) => overlay(v, Array.isArray(tr) ? tr[i] : undefined));
  if (en && typeof en === "object" && !(en instanceof Date)) {
    const t = tr && typeof tr === "object" ? (tr as Record<string, unknown>) : {};
    return Object.fromEntries(Object.entries(en).map(([k, v]) => [k, overlay(v, t[k], k)]));
  }
  return en;
}

export type Localized<C extends Translatable> = CollectionEntry<C> & {
  /** The entry to render(): the translation if there is one, otherwise the English. */
  source: CollectionEntry<C>;
  /** False when this is the English, shown because there's no translation yet. */
  translated: boolean;
};

function combine<C extends Translatable>(lang: Lang, en: CollectionEntry<C>, tr: unknown): Localized<C> {
  if (lang === DEFAULT_LANG) return { ...en, source: en, translated: true };
  if (!tr) return { ...en, source: en, translated: false };
  const entry = tr as CollectionEntry<C>;
  return { ...en, data: overlay(en.data, entry.data) as CollectionEntry<C>["data"], source: entry, translated: true };
}

/** getCollection() in a language: the English entries, each with its translation if there is one. */
export async function getLocalCollection<C extends Translatable>(
  lang: Lang,
  collection: C,
  filter?: (entry: CollectionEntry<C>) => boolean
): Promise<Localized<C>[]> {
  const en = (await getCollection(collection)).filter((e) => !filter || filter(e as CollectionEntry<C>)) as CollectionEntry<C>[];
  const name = lang === DEFAULT_LANG ? undefined : TRANSLATIONS[lang as keyof typeof TRANSLATIONS]?.[collection];
  const translations = name ? await getCollection(name) : [];
  const byId = new Map(translations.map((t) => [t.id, t]));
  return en.map((e) => combine(lang, e, byId.get(e.id)));
}

/** getEntry() in a language. */
export async function getLocalEntry<C extends Translatable>(lang: Lang, collection: C, id: string): Promise<Localized<C> | undefined> {
  const en = (await getEntry(collection, id)) as CollectionEntry<C> | undefined;
  if (!en) return undefined;
  const name = lang === DEFAULT_LANG ? undefined : TRANSLATIONS[lang as keyof typeof TRANSLATIONS]?.[collection];
  const tr = name ? await getEntry(name, id) : undefined;
  return combine(lang, en, tr);
}
