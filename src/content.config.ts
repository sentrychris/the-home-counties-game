// Content collections. Each schema below checks the matching Markdown/JSON at
// build time, so a typo shows up as a clear error instead of a broken page.
// See CONTENT.md for what every field means.
import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";
import map from "./data/map.json";

const layerIds = map.layers.map((l) => l.id) as [string, ...string[]];

const image = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(99),
    icon: z.string().optional(),
    // Optional built-in panel shown above the text.
    widget: z.enum(["loadout", "controls"]).optional(),
    updated: z.coerce.date().optional(),
  }),
});

const devlog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/devlog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    version: z.string().optional(),
    cover: image.optional(),
    screenshots: z.array(image).default([]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const weapons = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/weapons" }),
  schema: z.object({
    name: z.string(),
    order: z.number().default(99),
    class: z.string(),
    calibre: z.string(),
    slots: z.array(z.string()),
    summary: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    hero: image.optional(),
    specs: z.array(z.object({ label: z.string(), value: z.string() })),
    stats: z.array(
      z.object({
        label: z.string(),
        value: z.number().min(0).max(100),
        display: z.string().optional(),
      })
    ),
    fireModes: z.array(z.object({ name: z.string(), text: z.string() })).default([]),
    recoil: z.object({ text: z.string(), points: z.array(z.string()).default([]) }).optional(),
    reload: z.object({ text: z.string(), points: z.array(z.string()).default([]) }).optional(),
    ammo: z
      .array(
        z.object({
          name: z.string(),
          status: z.enum(["in-game", "planned"]).default("in-game"),
          damage: z.number().optional(),
          penetration: z.number().optional(),
          text: z.string(),
        })
      )
      .default([]),
    ammoSwitching: z.string().optional(),
    controls: z.array(z.object({ key: z.string(), action: z.string() })).default([]),
  }),
});

const enemies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/enemies" }),
  schema: z.object({
    name: z.string(),
    order: z.number().default(99),
    tagline: z.string(),
    summary: z.string(),
    image: image.optional(),
    threat: z.string().optional(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    behaviours: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
    loadouts: z
      .array(
        z.object({
          name: z.string(),
          frequency: z.string().optional(),
          gear: z.array(z.string()),
          text: z.string().optional(),
        })
      )
      .default([]),
    voiceLines: z.array(z.object({ line: z.string(), when: z.string() })).default([]),
  }),
});

const items = defineCollection({
  loader: file("src/data/items.json"),
  schema: z.object({
    name: z.string(),
    category: z.enum(["Weapons", "Attachments", "Grenades", "Gear", "Ammo", "Medical", "Provisions", "Valuables"]),
    slot: z.string(),
    weight: z.number().nonnegative(),
    value: z.number().nonnegative(),
    size: z.string().regex(/^\d+x\d+$/, "size is columns x rows, e.g. 2x2"),
    image: z.string().optional(),
    icon: z.string().optional(),
    description: z.string(),
    /** Where it came from: the line the game shows under the item's details. */
    about: z.string().optional(),
    link: z.string().optional(),
  }),
});

const roadmap = defineCollection({
  loader: file("src/data/roadmap.json"),
  schema: z.object({
    order: z.number(),
    phase: z.string(),
    title: z.string(),
    status: z.enum(["done", "now", "next", "later"]),
    items: z.array(z.object({ text: z.string(), done: z.boolean().default(false) })),
  }),
});

// One-off pages whose words live in Markdown (About, for now).
const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    lede: z.string(),
    portrait: image.optional(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    contact: z.string().optional(),
    pressKit: z.array(z.object({ label: z.string(), href: z.string(), note: z.string().optional() })).default([]),
  }),
});

const mapMarkers = defineCollection({
  loader: file("src/data/map-markers.json"),
  schema: z.object({
    layer: z.enum(layerIds),
    name: z.string(),
    label: z.string().optional(),
    x: z.number(),
    z: z.number(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { guides, devlog, weapons, enemies, items, roadmap, pages, mapMarkers };
