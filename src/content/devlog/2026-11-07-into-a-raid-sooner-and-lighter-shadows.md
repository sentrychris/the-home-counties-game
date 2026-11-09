---
title: "Into a raid three seconds sooner"
date: 2026-11-07T05:00:00Z
summary: "An overnight speed-up pass with the usual rule: nothing may look any different. The loading screen now fetches everything a raid needs side by side, so on a gaming PC a raid starts about three seconds sooner; the houses' shadow copies are tidier and the street builds quicker."
version: v0.1.200
tags: [performance]
cover:
  src: images/screenshots/dl-shadow-corners-terrace.webp
  alt: "Afternoon sun along a terrace on Duncombe Street: the shadows of the roofs, chimneys and a telegraph pole lie across the rendered fronts, with a burnt-out car and cones further down the road."
screenshots:
  - src: images/screenshots/dl-shadow-corners-terrace.webp
    alt: "Afternoon sun along a terrace on Duncombe Street: the shadows of the roofs, chimneys and a telegraph pole lie across the rendered fronts, with a burnt-out car and cones further down the road."
    caption: "Drawn with the new shadow copies. The old ones drew exactly the same picture, pixel for pixel."
  - src: images/screenshots/dl-shadow-corners-lamp.webp
    alt: "A pair of semi-detached houses in low sun, a fire burning in an oil drum by the front wall, and the shadow of a street lamp bent across the front of the house."
    caption: "Low sun on the semis by the fire drum: the lamp post's shadow lands where it always did."
---
## The rule

Same as every speed-up pass: nothing may look any different. Every change was checked by drawing the same views before and after and comparing them pixel by pixel, and by fingerprinting everything the map builds, mesh by mesh. Nothing changed.

## Into a raid sooner

While the street is built behind the loading screen, the game fetches the models, pictures and sounds the raid will need on your processor's spare cores. Its list of what to fetch hadn't been brought up to date since the end of October, so more than half of what a raid uses now, from the houses' insides to the newer guns and kit, was being read in one file at a time instead. The list is up to date again, and the loading screen now waits for the last of it to arrive while it still has a picture to show you, rather than freezing as you go in.

Timed on a gaming PC (an RTX 3060 Ti, three runs each way), the loading screen is now about three seconds shorter: 31.8 seconds instead of 34.7, with the street itself built 2.5 seconds sooner. On our test machine in the cloud the difference was bigger still: 20 seconds instead of 31.

## Shadows with fewer corners

Every square of the map has a copy of its walls, roofs and fences used only to cast shadows. Those copies kept every corner once for each face that meets there, so a box's corner was three corners, because each face of a wall needs its own lighting. A shadow doesn't need any of that, so now the corners are shared. Across the map that's 2.4 million corners down to 0.87 million that the graphics card has to place for each of the sun's shadow maps, and for each lamp that casts shadows. The triangles themselves are the same, so the shadows come out the same to the pixel.

We timed this on the same gaming PC too, switching between the old copies and the new ones at 20 views round the street, at midday and in the evening sun. The frame time didn't change by a measurable amount either way: on a card like that, placing corners isn't what holds the shadows back. So this one makes the shadows tidier rather than faster.

## A quicker build

The code that lays out the walls, the floors and the goods on the old Sainsbury's shelves now does the same work with less bookkeeping. That takes about a second off building the street on our test machine, and the street it builds is exactly the same.
