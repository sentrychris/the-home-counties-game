// getStaticPaths() for the one-page-per-file sections, in any language. The English pages in
// src/pages/ and their wrappers in src/pages/<lang>/ both use these, so they always list the same
// pages: one for every English file, translated where a translation exists.
import type { Lang } from "./index";
import { getLocalCollection } from "./content";

export async function devlogPaths(lang: Lang) {
  const posts = (await getLocalCollection(lang, "devlog", ({ data }) => !data.draft)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return posts.map((post, i) => ({
    params: { slug: post.id },
    props: { post, newer: posts[i - 1], older: posts[i + 1] },
  }));
}

export async function guidePaths(lang: Lang) {
  const guides = (await getLocalCollection(lang, "guides")).sort((a, b) => a.data.order - b.data.order);
  return guides.map((guide, i) => ({
    params: { slug: guide.id },
    props: { guide, all: guides, prev: guides[i - 1], next: guides[i + 1] },
  }));
}

export async function weaponPaths(lang: Lang) {
  const weapons = await getLocalCollection(lang, "weapons");
  return weapons.map((weapon) => ({ params: { slug: weapon.id }, props: { weapon } }));
}

export async function enemyPaths(lang: Lang) {
  const enemies = await getLocalCollection(lang, "enemies");
  return enemies.map((enemy) => ({ params: { slug: enemy.id }, props: { enemy } }));
}
