// The interactive tactical map. Reads everything from the JSON the page embeds
// (built from src/data/map.json and src/data/map-markers.json).
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import { gridRef, columnLetter } from "../lib/map-geometry.mjs";

interface Layer {
  id: string;
  name: string;
  icon: string;
  colour: string;
  visible: boolean;
}

interface MarkerData {
  id: string;
  layer: string;
  name: string;
  label?: string;
  x: number;
  z: number;
  description?: string;
  image?: string;
  grid: string | null;
}

interface MapData {
  geo: { left: number; top: number; widthM: number; heightM: number; nativeZoom: number };
  tiles: { url: string; tileSize: number; minZoom: number; maxZoom: number };
  aerial: { url: string; name: string; area: [number, number, number, number] };
  grid: { size: number; originX: number; originZ: number; cols: number; rows: number };
  boundary: { minX: number; minZ: number; maxX: number; maxZ: number };
  layers: Layer[];
  markers: MarkerData[];
}

const STORE = "thc-map-v1";
const el = document.getElementById("map");
const dataEl = document.getElementById("map-data");

if (el && dataEl) init(el, JSON.parse(dataEl.textContent ?? "{}") as MapData);

function init(el: HTMLElement, data: MapData) {
  const { geo, grid } = data;

  // Game world: x east, z south, in metres. Leaflet: lat north, lng east.
  const ll = (x: number, z: number) => L.latLng(-z, x);
  const toWorld = (p: L.LatLng) => ({ x: p.lng, z: -p.lat });

  // 1 unit = 1 m; zoom n shows 2^n px per metre; pixel 0,0 is the image's top-left.
  const crs = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1, -geo.left, -1, -geo.top),
  });

  const imageBounds = L.latLngBounds(ll(geo.left, geo.top), ll(geo.left + geo.widthM, geo.top + geo.heightM));
  const b = data.boundary;
  const playBounds = L.latLngBounds(ll(b.minX, b.minZ), ll(b.maxX, b.maxZ));

  const map = L.map(el, {
    crs,
    minZoom: data.tiles.minZoom,
    maxZoom: data.tiles.maxZoom,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: 100,
    zoomControl: false,
    maxBounds: imageBounds.pad(0.2),
    maxBoundsViscosity: 0.85,
  });
  map.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');
  L.control.zoom({ position: "topright", zoomInTitle: "Zoom in", zoomOutTitle: "Zoom out" }).addTo(map);
  map.fitBounds(playBounds, { padding: [24, 24] });

  const saved = load();

  // ---------- Base maps ----------
  map.createPane("aerialPane").style.zIndex = "250";
  const bases: Record<string, L.Layer> = {
    field: L.tileLayer(data.tiles.url, {
      tileSize: data.tiles.tileSize,
      minZoom: data.tiles.minZoom,
      maxZoom: data.tiles.maxZoom,
      minNativeZoom: 0,
      maxNativeZoom: geo.nativeZoom,
      noWrap: true,
      bounds: imageBounds,
      keepBuffer: 3,
      attribution: 'Street data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }),
    aerial: L.imageOverlay(
      data.aerial.url,
      L.latLngBounds(ll(data.aerial.area[0], data.aerial.area[1]), ll(data.aerial.area[0] + data.aerial.area[2], data.aerial.area[1] + data.aerial.area[3])),
      { pane: "aerialPane", alt: data.aerial.name }
    ),
  };
  let base = saved.base && bases[saved.base] ? saved.base : "field";
  bases[base].addTo(map);

  for (const input of document.querySelectorAll<HTMLInputElement>('input[name="base"]')) {
    input.checked = input.value === base;
    input.addEventListener("change", () => {
      if (!input.checked) return;
      map.removeLayer(bases[base]);
      base = input.value;
      bases[base].addTo(map);
      save();
    });
  }

  // ---------- Grid ----------
  const gridLayer = L.layerGroup();
  const line = { color: "#d8d2c3", weight: 1, opacity: 0.3, interactive: false };
  const gx1 = grid.originX + grid.cols * grid.size;
  const gz1 = grid.originZ + grid.rows * grid.size;
  for (let c = 0; c <= grid.cols; c++) {
    const x = grid.originX + c * grid.size;
    L.polyline([ll(x, grid.originZ), ll(x, gz1)], line).addTo(gridLayer);
  }
  for (let r = 0; r <= grid.rows; r++) {
    const z = grid.originZ + r * grid.size;
    L.polyline([ll(grid.originX, z), ll(gx1, z)], line).addTo(gridLayer);
  }
  L.rectangle(playBounds, { color: "#c9513c", weight: 2, dashArray: "10 7", fill: false, interactive: false }).addTo(gridLayer);

  const gridToggle = document.querySelector<HTMLInputElement>('input[name="grid"]');
  let gridOn = saved.grid ?? true;
  if (gridToggle) gridToggle.checked = gridOn;
  if (gridOn) gridLayer.addTo(map);

  // Rulers along the top and left edges, tracking the grid as you pan and zoom.
  const rulerX = el.parentElement!.querySelector<HTMLElement>(".ruler-x")!;
  const rulerY = el.parentElement!.querySelector<HTMLElement>(".ruler-y")!;
  const colLabels = Array.from({ length: grid.cols }, (_, i) => rulerX.appendChild(Object.assign(document.createElement("span"), { textContent: columnLetter(i) })));
  const rowLabels = Array.from({ length: grid.rows }, (_, i) => rulerY.appendChild(Object.assign(document.createElement("span"), { textContent: String(i + 1) })));

  const updateRulers = () => {
    const size = map.getSize();
    const cell = map.latLngToContainerPoint(ll(grid.size, 0)).x - map.latLngToContainerPoint(ll(0, 0)).x;
    const show = gridOn && cell >= 16;
    rulerX.classList.toggle("is-hidden", !show);
    rulerY.classList.toggle("is-hidden", !show);
    if (!show) return;
    colLabels.forEach((span, i) => {
      const px = map.latLngToContainerPoint(ll(grid.originX + (i + 0.5) * grid.size, 0)).x;
      span.style.left = `${px}px`;
      span.hidden = px < 30 || px > size.x - 10;
    });
    rowLabels.forEach((span, i) => {
      const py = map.latLngToContainerPoint(ll(0, grid.originZ + (i + 0.5) * grid.size)).y - 22;
      span.style.top = `${py}px`;
      span.hidden = py < 8 || py > size.y - 30;
    });
  };
  map.on("move zoom resize viewreset", updateRulers);

  gridToggle?.addEventListener("change", () => {
    gridOn = gridToggle.checked;
    if (gridOn) gridLayer.addTo(map);
    else map.removeLayer(gridLayer);
    updateRulers();
    save();
  });

  // ---------- Markers ----------
  const icons = document.getElementById("map-icons") as HTMLTemplateElement | null;
  const svg = (name: string) => icons?.content.querySelector(`[data-icon="${name}"]`)?.innerHTML ?? "";
  const esc = (s: string) => s.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]!);

  const layerById = new Map(data.layers.map((l) => [l.id, l]));
  const groups = new Map<string, L.LayerGroup>();
  const markerById = new Map<string, L.Marker>();

  function makeIcon(m: MarkerData, layer: Layer): L.DivIcon {
    const name = `<span class="mk-name">${esc(m.name)}</span>`;
    const style = `--c:${layer.colour}`;
    switch (layer.icon) {
      case "start":
        return L.divIcon({ className: "mk mk--start", html: `<span class="mk-body" style="${style}"></span>${name}`, iconSize: [28, 20], iconAnchor: [14, 10] });
      case "exit":
        return L.divIcon({ className: "mk mk--exit", html: `<span class="mk-ring" style="${style}"></span><span class="mk-body" style="${style}">${svg("run")}</span>${name}`, iconSize: [30, 30], iconAnchor: [15, 15] });
      case "scav":
        return L.divIcon({ className: "mk mk--scav", html: `<span class="mk-body" style="${style}"></span><span class="mk-label">${esc(m.label ?? "")}</span>`, iconSize: [22, 22], iconAnchor: [11, 11] });
      case "crate":
        return L.divIcon({ className: "mk mk--crate", html: `<span class="mk-body" style="${style}"></span>`, iconSize: [18, 18], iconAnchor: [9, 9] });
      case "house":
        return L.divIcon({ className: "mk mk--house", html: `<span class="mk-body" style="${style}">${svg("stash")}</span>${name}`, iconSize: [24, 24], iconAnchor: [12, 12] });
      case "note":
        return L.divIcon({ className: "mk mk--note", html: `<span class="mk-hand">${esc(m.name)}</span>`, iconSize: [0, 0], iconAnchor: [0, 0] });
      default:
        return L.divIcon({ className: "mk mk--landmark", html: `<span class="mk-body" style="${style}">${svg("pin")}</span>${name}`, iconSize: [26, 26], iconAnchor: [13, 24] });
    }
  }

  function popupFor(m: MarkerData, layer: Layer): HTMLElement {
    const div = document.createElement("div");
    div.className = "pop";
    div.innerHTML = `
      <p class="pop-layer"><i style="background:${layer.colour}"></i>${esc(layer.name)}</p>
      <h3>${esc(m.name)}</h3>
      <p class="pop-ref"><span>Grid ${m.grid ?? "out of bounds"}</span><span>x ${m.x.toFixed(1)} · z ${m.z.toFixed(1)}</span></p>
      ${m.description ? `<p class="pop-desc">${esc(m.description)}</p>` : ""}
      ${m.image ? `<img src="${esc(m.image)}" alt="" loading="lazy">` : ""}`;
    return div;
  }

  for (const m of data.markers) {
    const layer = layerById.get(m.layer);
    if (!layer) continue;
    if (!groups.has(layer.id)) groups.set(layer.id, L.layerGroup());
    const isNote = layer.icon === "note";
    const marker = L.marker(ll(m.x, m.z), {
      icon: makeIcon(m, layer),
      title: isNote ? undefined : `${m.name}${m.grid ? `, grid ${m.grid}` : ""}`,
      keyboard: !isNote,
      interactive: !isNote,
      riseOnHover: true,
    });
    if (!isNote) {
      marker.bindPopup(() => popupFor(m, layer), { maxWidth: 300, minWidth: 220, autoPanPadding: [40, 40] });
      marker.on("add", () => marker.getElement()?.setAttribute("aria-label", `${m.name}${m.grid ? `, grid ${m.grid}` : ""}. ${layer.name}.`));
      marker.on("popupopen", () => history.replaceState(null, "", `#${m.id}`));
      marker.on("popupclose", () => {
        if (location.hash === `#${m.id}`) history.replaceState(null, "", location.pathname + location.search);
      });
    }
    marker.addTo(groups.get(layer.id)!);
    markerById.set(m.id, marker);
  }

  const visible = new Map<string, boolean>();
  for (const layer of data.layers) {
    const on = saved.layers?.[layer.id] ?? layer.visible;
    visible.set(layer.id, on);
    if (on) groups.get(layer.id)?.addTo(map);
  }

  const setLayer = (id: string, on: boolean) => {
    visible.set(id, on);
    const g = groups.get(id);
    if (g) on ? g.addTo(map) : map.removeLayer(g);
    const box = document.querySelector<HTMLInputElement>(`input[name="layer"][value="${id}"]`);
    if (box) box.checked = on;
    save();
  };

  for (const box of document.querySelectorAll<HTMLInputElement>('input[name="layer"]')) {
    box.checked = visible.get(box.value) ?? box.checked;
    box.addEventListener("change", () => setLayer(box.value, box.checked));
  }

  // Labels appear as you zoom in.
  const setZoomClass = () => {
    el.dataset.zoom = String(Math.floor(map.getZoom()));
  };
  map.on("zoomend", setZoomClass);
  setZoomClass();

  // ---------- Go to a marker (map index, #hash links) ----------
  const goTo = (id: string, focus = false) => {
    const marker = markerById.get(id);
    const m = data.markers.find((d) => d.id === id);
    if (!marker || !m) return;
    if (!visible.get(m.layer)) setLayer(m.layer, true);
    map.setView(marker.getLatLng(), Math.max(map.getZoom(), 2.5), { animate: !matchMedia("(prefers-reduced-motion: reduce)").matches });
    marker.openPopup();
    if (focus) (marker.getElement() as HTMLElement | undefined)?.focus({ preventScroll: true });
  };

  for (const btn of document.querySelectorAll<HTMLButtonElement>("[data-goto]")) {
    btn.addEventListener("click", () => {
      el.parentElement?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      goTo(btn.dataset.goto!, true);
    });
  }

  const fromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id && markerById.has(id)) goTo(id);
  };
  window.addEventListener("hashchange", fromHash);
  fromHash();

  // ---------- Readout ----------
  const refEl = document.querySelector<HTMLElement>("[data-ref]");
  const xzEl = document.querySelector<HTMLElement>("[data-xz]");
  let pointerInside = false;
  const showPos = (p: L.LatLng) => {
    const { x, z } = toWorld(p);
    if (refEl) refEl.textContent = gridRef(grid, x, z) ?? "OOB";
    if (xzEl) xzEl.textContent = `x ${x.toFixed(1)}  z ${z.toFixed(1)}`;
  };
  map.on("mousemove", (e: L.LeafletMouseEvent) => {
    pointerInside = true;
    showPos(e.latlng);
  });
  map.on("mouseout", () => {
    pointerInside = false;
    showPos(map.getCenter());
  });
  map.on("moveend", () => {
    if (!pointerInside) showPos(map.getCenter());
  });
  showPos(map.getCenter());

  // ---------- Tools ----------
  document.querySelector("[data-reset]")?.addEventListener("click", () => map.fitBounds(playBounds, { padding: [24, 24] }));

  const pinBtn = document.querySelector<HTMLButtonElement>("[data-pin]");
  let picking = false;
  let pin: L.Marker | null = null;
  pinBtn?.addEventListener("click", () => {
    picking = !picking;
    pinBtn.setAttribute("aria-pressed", String(picking));
    el.classList.toggle("is-picking", picking);
    if (!picking && pin) {
      map.removeLayer(pin);
      pin = null;
    }
  });

  map.on("click", (e: L.LeafletMouseEvent) => {
    if (!picking) return;
    const { x, z } = toWorld(e.latlng);
    const rx = Math.round(x * 100) / 100;
    const rz = Math.round(z * 100) / 100;
    const ref = gridRef(grid, x, z) ?? "out of bounds";
    const snippet = `{ "id": "new-marker", "layer": "crates", "name": "", "x": ${rx}, "z": ${rz}, "description": "" }`;
    const div = document.createElement("div");
    div.className = "pop pop--pin";
    div.innerHTML = `
      <p class="pop-layer"><i style="background:#d6aa48"></i>Dropped pin</p>
      <h3>Grid ${ref}</h3>
      <p class="pop-ref"><span>x ${rx}</span><span>z ${rz}</span></p>
      <label class="pop-label" for="pin-json">Marker JSON for src/data/map-markers.json</label>
      <textarea id="pin-json" readonly rows="3"></textarea>
      <button type="button" class="pop-copy">Copy</button>`;
    const ta = div.querySelector("textarea")!;
    ta.value = snippet;
    const copy = div.querySelector<HTMLButtonElement>(".pop-copy")!;
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(snippet);
        copy.textContent = "Copied";
      } catch {
        ta.select();
        copy.textContent = "Press Ctrl+C";
      }
    });
    if (pin) pin.setLatLng(e.latlng);
    else pin = L.marker(e.latlng, { icon: L.divIcon({ className: "mk mk--pin", html: `<span class="mk-body">${svg("pin")}</span>`, iconSize: [26, 26], iconAnchor: [13, 24] }) }).addTo(map);
    pin.bindPopup(div, { maxWidth: 320, minWidth: 260 }).openPopup();
  });

  // ---------- Mobile layers panel ----------
  const panel = document.getElementById("map-panel");
  const openBtn = document.querySelector<HTMLButtonElement>(".layers-btn");
  const closeBtn = document.querySelector<HTMLButtonElement>(".panel-close");
  const setPanel = (open: boolean) => {
    panel?.classList.toggle("is-open", open);
    openBtn?.setAttribute("aria-expanded", String(open));
    if (open) (panel?.querySelector("input") as HTMLElement | null)?.focus({ preventScroll: true });
    else openBtn?.focus({ preventScroll: true });
  };
  openBtn?.addEventListener("click", () => setPanel(!panel?.classList.contains("is-open")));
  closeBtn?.addEventListener("click", () => setPanel(false));
  panel?.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("is-open")) setPanel(false);
  });

  updateRulers();

  // ---------- Remember choices (this browser only) ----------
  function load(): { base?: string; grid?: boolean; layers?: Record<string, boolean> } {
    try {
      return JSON.parse(localStorage.getItem(STORE) ?? "{}");
    } catch {
      return {};
    }
  }

  function save() {
    try {
      localStorage.setItem(STORE, JSON.stringify({ base, grid: gridOn, layers: Object.fromEntries(visible) }));
    } catch {
      /* storage unavailable: choices just won't stick */
    }
  }
}
