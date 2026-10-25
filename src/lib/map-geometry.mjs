// Shared by the map page and scripts/make-map-tiles.mjs, so tiles and markers
// always agree. Plain JS so Node can import it without a build step.
//
// World coordinates are the game's: x runs east, z runs south, in metres.
// On the web map 1 unit = 1 metre, and zoom level z shows 2^z pixels per metre.

/** Derived numbers for the tiled base image. */
export function geometry(map) {
  const { crop, pxPerMetre, worldOriginPx } = map.source;
  // Tiles are cut at a whole zoom level, so the image is resampled to the
  // nearest power-of-two pixels per metre (16 px/m = zoom 4 needs no resample).
  const nativeZoom = Math.round(Math.log2(pxPerMetre));
  const resample = 2 ** nativeZoom / pxPerMetre;
  return {
    nativeZoom,
    resample,
    // World position of the image's top-left corner.
    left: -(worldOriginPx[0] - crop.left) / pxPerMetre,
    top: -(worldOriginPx[1] - crop.top) / pxPerMetre,
    widthM: crop.width / pxPerMetre,
    heightM: crop.height / pxPerMetre,
    widthPx: Math.round(crop.width * resample),
    heightPx: Math.round(crop.height * resample),
  };
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** Grid reference such as "E7" for a world position, or null when off the grid. */
export function gridRef(grid, x, z) {
  const col = Math.floor((x - grid.originX) / grid.size);
  const row = Math.floor((z - grid.originZ) / grid.size);
  if (col < 0 || row < 0 || col >= grid.cols || row >= grid.rows) return null;
  return `${LETTERS[col]}${row + 1}`;
}

export function columnLetter(index) {
  return LETTERS[index] ?? "?";
}
