---
title: "Shadow copies back as they were"
date: 2026-11-09T22:30:00Z
summary: "We timed last update's tidier shadow copies on a gaming PC. They made no difference to the frame time and cost up to a second of loading, so they're gone again. Nothing looks any different."
version: v0.1.201
tags: [performance]
cover:
  src: images/screenshots/dl-shadow-corners-terrace.webp
  alt: "Afternoon sun along a terrace on Duncombe Street: the shadows of the roofs, chimneys and a telegraph pole lie across the rendered fronts, with a burnt-out car and cones further down the road."
screenshots:
  - src: images/screenshots/dl-shadow-corners-terrace.webp
    alt: "Afternoon sun along a terrace on Duncombe Street: the shadows of the roofs, chimneys and a telegraph pole lie across the rendered fronts, with a burnt-out car and cones further down the road."
    caption: "The same shadows as ever: v0.1.199, v0.1.200 and v0.1.201 all draw this picture pixel for pixel."
---
## Timed on a real graphics card

Last update gave the houses' shadow-only copies shared corners, 0.87 million of them across the map instead of 2.4 million, on the idea that the graphics card would draw the sun's and the lamps' shadows quicker with fewer corners to place.

On a gaming PC with an RTX 3060 Ti we switched between the old copies and the new ones at 20 views round the street, at midday and in the evening sun, five times each way. The frame time stayed the same at every view, within 0.15 milliseconds either way, and one evening view was even a touch slower with the new copies. On a card like that the corners aren't what holds the shadows back. Making the new copies also took up to a second of the loading screen.

## So they're out

v0.1.201 builds the shadow copies just as they were before. We fingerprinted everything the map builds, mesh by mesh, and it's exactly the street v0.1.199 built, so nothing looks any different.

The rest of the last update stays: the loading screen's up-to-date list of what to fetch, and the leaner code that builds the street, which together take about three seconds off going into a raid.
