# The Home Counties: website

Promotional site for *The Home Counties*, a single-player extraction shooter made in Godot 4 by Chris Rowles.

Built with [Astro](https://astro.build) as a fully static site, with [Leaflet](https://leafletjs.com) for the tactical map. Everything you'd want to change (words, items, weapons, map markers, dev log posts) lives in JSON or Markdown. **[CONTENT.md](CONTENT.md) explains how to edit all of it.**

## Running it

Needs Node 22.23 or newer (Node 24 recommended).

```sh
npm install
npm run dev        # http://localhost:4321, reloads as you edit
npm run build      # static site into dist/
npm run preview    # serve dist/ locally
npm run check      # type-check and validate content
```

The build checks every content file against a schema (see `src/content.config.ts`), so a typo in a JSON file or a missing field gives you an error that names the file, rather than a broken page.

## Images and the map

The web-ready images are already in `public/` and `src/assets/`. You only need these when you add or replace source art:

```sh
npm run images     # resources/ -> public/images (screenshots, item art, key art), textures, social card
npm run tiles      # the tactical map -> public/map/duncombe-street/tiles (about 700 tiles, ~5 MB)
npm run textures   # brushed edges and scratched frames -> src/assets/textures (procedural, no inputs)
```

The painterly look comes from four generated textures used as CSS masks: `brush-fade`/`brush-rise` (dry-brush section edges, the hero fade and the header wash), `brush-stroke` (underlines and small accents), `brush-frame` (ragged edges on screenshots and the green buttons) and `scratch-frame` (the worn edge on every `.panel`). Add `class="band"` to a section to give it a painted background with brushed top and bottom edges, or `class="brushed"` to an image.

`npm run tiles` reads the 64 MB source map from `resources/`, which is git-ignored by default because of its size. The generated tiles in `public/` are what the site uses, so commit those.

## Deploying

### Netlify

Connect the repo. `netlify.toml` already sets the build command (`npm run build`), the publish folder (`dist`) and Node 24. Nothing else to do.

### GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.

1. Push the repo to GitHub.
2. Settings → Pages → Source: **GitHub Actions**.
3. Push to `main`.

Project sites are served from `https://<user>.github.io/<repo>/`. The workflow sets `BASE_PATH` to `/<repo>/` so every link and asset gets the right prefix. If you use a `<user>.github.io` repo or a custom domain, change `BASE_PATH` to `/` in the workflow.

To build for a sub-folder locally (bash): `SITE_URL=https://you.github.io BASE_PATH=/repo/ npm run build`. In Git Bash on Windows, prefix with `MSYS_NO_PATHCONV=1` or it rewrites `/repo/` into a Windows path.

## Layout

```
src/
  content/          Markdown: guides, devlog, weapons, enemies, pages/about.md
  data/             JSON: site.json, items.json, map.json, map-markers.json,
                    roadmap.json, credits.json, controls.json
  pages/            one file per route; [slug].astro files are the templates
  components/       Header, Footer, Gallery, Img (with placeholders), StatBar, ...
  scripts/map.ts    the interactive map
  styles/           global.css (look and feel), map.css (Leaflet restyle)
  lib/              URL helper, shared map geometry
  icons/            SVG icons (game-icons.net, CC BY 3.0; see credits)
  assets/textures/  generated worn textures used by the CSS
public/
  images/           generated screenshots, item art, key art
  map/              map tiles, aerial render, downloadable field copy
scripts/            image and tile generators (Node + sharp)
resources/          raw source art (not served)
```

## Accessibility and performance

- Semantic landmarks, skip link, visible focus, keyboard-operable map (arrow keys pan, +/− zoom, Tab through markers), and a full text index of every map marker under the map.
- Film grain and pulsing exit markers stop when the system asks for reduced motion.
- No client-side framework. The home page ships about 3 KB of JavaScript; Leaflet loads on the map page only.
- Self-hosted fonts (Latin subset), WebP images with `srcset`, lazy loading below the fold, and map tiles fetched only for what's on screen.
