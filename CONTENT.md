# Editing the site

Everything below is JSON or Markdown. Change a file, and `npm run dev` shows it straight away. If something's wrong (a missing field, a typo in a category), the build stops and tells you which file and which field.

**Paths.** Wherever a file asks for an image or a link, write it relative to the site, without a leading slash: `images/screenshots/shot.webp`, `map/`, `guides/controls/`. The site adds the right prefix itself, so the same content works on Netlify and on GitHub Pages.

**Missing images become placeholders.** If a path points at a file that isn't in `public/` yet, the page shows a dashed "Image to come" box with the exact path to drop the file at. Nothing breaks.

**Numbers to check.** Item weights and values, the AK-47's stats (rate of fire, the 0–100 bars), scav loadouts and voice lines are first drafts, not numbers from the game. Replace them with the real ones.

---

## Site-wide: `src/data/site.json`

| Field | What it does |
| --- | --- |
| `trailer` | The YouTube trailer on the home page. `youtubeId` is the part after `/embed/` or `?v=` in the video's link. Remove the whole block to hide the section |
| `name`, `status`, `version`, `tagline`, `description` | Title, the "Early access / Prototype build" stamp, build tag in the header, title-screen text, search-engine description |
| `coords` | Grid position shown on the title screen and in the footer bar, like the game's map screen |
| `cta.primary.href` | Where "Follow development" goes. Empty = the dev log. Put a Steam, itch.io or Discord link here when you have one |
| `links` | Footer "Follow" links. Empty `href` shows "coming soon" |
| `nav` | Header menu |
| `features` | The six feature cards. `icon` is a file name from `src/icons/` without `.svg` |
| `loop` | The four "In, loot, out" steps |
| `screenshots` | Home page gallery: `src`, `alt` (describe the image for screen readers), `caption` |

## Screenshots and art

1. Drop the PNG/JPG into `resources/screenshots/`.
2. Run `npm run images`. It makes `public/images/screenshots/<name>.webp` plus an 800-wide copy for phones (`Screenshot 2026-10-24 224625.png` becomes `2026-10-24-224625.webp`).
3. Reference it as `images/screenshots/<name>.webp`.

You can also put a ready-made `.webp` straight into `public/images/` and point at it.

## Guides: `src/content/guides/*.md`

One file per guide; the file name is the address (`extraction-tips.md` → `/guides/extraction-tips/`).

```md
---
title: Extraction tips
summary: One line for the guide list and search engines.
order: 6            # position in the list
icon: quit          # optional, from src/icons/
widget: loadout     # optional: "loadout" (gear screen) or "controls" (key table)
---

Normal Markdown. Tables work.

> A blockquote turns into a taped paper field note.

Link to a map marker with its id: [S-04](../../map/#s-04)
```

## Weapons: `src/content/weapons/*.md`

Copy `ak-47.md` to add a weapon; the template page builds itself. The frontmatter holds the specs table, stat bars (0–100, with an optional `display` like `600 rpm`), fire modes, recoil, reload, ammo (`status: in-game` or `planned`, optional `damage`/`penetration` bars), and controls. The text after the frontmatter is the lore, shown on a paper dossier. `hero` is an optional wide in-game shot; until it exists you'll see a placeholder.

## Gear and items: `src/data/items.json`

```json
{ "id": "watch", "name": "Wristwatch", "category": "Valuables", "slot": "Pockets",
  "weight": 0.1, "value": 250, "size": "1x1", "icon": "watch",
  "description": "…", "link": "weapons/ak-47/" }
```

- `category`: one of `Weapons`, `Gear`, `Ammo`, `Medical`, `Provisions`, `Valuables` (these are the filter buttons).
- `slot`: free text; separate several with ` / ` (e.g. `Pockets / Rig`) and each becomes a slot filter option.
- `weight` in kg, `value` in pounds. £/kg is worked out for you.
- `size`: inventory cells, columns x rows (the AK-47 is `5x2`).
- `image` (a picture in `public/`) or `icon` (an SVG name from `src/icons/`). `link` is optional.

## Enemies: `src/content/enemies/*.md`

`scavs.md` is the template: facts, behaviours, loadouts (with `frequency` and a `gear` list) and `voiceLines` (`line` and `when`). The text after the frontmatter is the "Who they are" dossier.

## Dev log: `src/content/devlog/*.md`

```md
---
title: Red smoke and a field copy
date: 2026-10-25
summary: Shown in lists and on social cards.
version: v0.1.41             # optional
tags: [extraction, map]
cover: { src: images/screenshots/x.webp, alt: "…" }
screenshots:
  - { src: images/screenshots/y.webp, alt: "…", caption: "…" }
draft: true                  # optional: hides the post
---
```

Newest first. The cover is also used as the social card when the post is shared.

## Roadmap: `src/data/roadmap.json`

Each column has a `phase` label, a `title`, a `status` (`done`, `now`, `next`, `later`, which sets the colour) and `items` with optional `"done": true` for a tick.

## About and credits

- `src/content/pages/about.md`: fact sheet, contact (`contact` can be an email or a URL), press-kit downloads, and the page text. Drop a portrait at `public/images/about/chris-rowles.webp`.
- `src/data/credits.json`: one group per kind of asset. **Add your CC BY models, textures and sounds to the "3D models, textures and sounds" group** and remove its `"placeholder": true` line. Licence names that match the `licences` list are linked automatically.

## The tactical map

### Markers: `src/data/map-markers.json`

```json
{ "id": "s-07", "layer": "scavs", "name": "Scav spawn S-07", "label": "S-07",
  "x": 81.5, "z": -64.75, "description": "…", "image": "images/…webp" }
```

- `x` and `z` are **game-world metres**, the same as Godot's `global_position.x` and `global_position.z` (x east, z south). Grid references (E7 etc.) are worked out from them.
- `layer` is one of the layer ids in `map.json`: `starts`, `exits`, `scavs`, `crates`, `houses`, `landmarks`, `notes`.
- `label` is the short text next to scav markers. `description` and `image` show in the popup.
- `id` also works as a link: `/map/#s-07` opens the map on that marker.

**Getting coordinates without the game:** on the map, press **Drop a pin** and click anywhere. The popup gives the grid reference and a ready-to-paste JSON line.

The current markers were read off the field copy (`resources/duncombe-street-tactical-map-military.png`) and the game's own `duncombe_street.json`, so they line up with the printed map to within half a metre.

### Map settings: `src/data/map.json`

- `intel`, `fieldNote`, `distances`: the raid intel boxes, the paper note and the exits table.
- `layers`: name, colour, whether it's on by default, and the one-line legend text.
- `grid`: 25 m squares, starting at world `originX`/`originZ`, `cols` x `rows`.
- `aerial`: the in-game top-down render, placed using the same `area` as the game's map JSON (`[x, z, width, height]` in metres).

### Swapping in a new map image

1. Put the image in `resources/` and set `source.image` to it.
2. Set `source.crop` to the part you want on the web map (pixels).
3. Set `source.pxPerMetre` (the field copy is 16: one 25 m square is 400 px) and `source.worldOriginPx`, the pixel where game-world (0, 0) falls.
4. Run `npm run tiles`.

The tile script resamples to a power-of-two scale if it needs to, and markers stay put because they're in world coordinates.
