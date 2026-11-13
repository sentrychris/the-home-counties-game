---
title: "Sharper where it shows"
date: 2026-11-13T00:30:00Z
summary: "The last update packed 180 pictures that had been left loose in the graphics card's memory. This one asks the opposite question of the 1,600 that were packed already: were any packed too hard? Two groups were, the camouflaged rifles' shading and the relief of the walls and pavements, and both now get the card's high-quality form. A hair's-breadth fault in the rain's gutter puddles is fixed along the way."
version: v0.1.226
tags: [graphics, performance]
cover:
  src: images/screenshots/dl-sharper-where-it-shows.webp
  alt: "The Gunsmith screen with a woodland-camouflaged M4A1 turned on the bench and seen close up, a tube red dot sight on its top rail."
screenshots:
  - src: images/screenshots/dl-sharper-where-it-shows.webp
    alt: "The Gunsmith screen with a woodland-camouflaged M4A1 turned on the bench and seen close up, a tube red dot sight on its top rail."
    caption: "The woodland M4 on Carl's bench in v0.1.226. The picture that says where its paint has worn to bare steel is now kept in the graphics card's high-quality form."
---
## Measuring every picture

Every picture in the game sits in the graphics card's memory packed small, in a form the card can draw straight from. Packing costs a little of the picture each time, and how much depends on what's in it. So every packed picture in the game, all 1,609 of them, was unpacked again and compared with its original, pixel by pixel.

Most came out as they should. A sofa's fabric, a crate's planks and a wheelie bin's plastic score about 36 to 38 on the scale engineers use for this (decibels of signal over noise, where the high thirties and above are hard to tell from the original). Two groups scored far lower, and both are things you look at closely.

## The rifle in your hands

A rifle doesn't have one picture, it has several, and one of them holds three unrelated things at once: where grime gathers in the corners, how rough or polished each spot is, and where the paint has worn through to bare steel. The small packing form works in blocks of four pixels by four and gives each block one short scale of values to share. That's fine for a picture whose three parts rise and fall together. On a camouflaged rifle they don't: a chip of bare metal sits beside matt paint beside a grimy recess, all inside one block, and the block can only keep one of them faithfully.

The camouflaged AK, the M4, their sights and suppressors and the radio backpack scored between 24 and 32. They are now kept in the card's high-quality form, which gives each block far more to work with, and score between 37 and 47. Worn edges catch the light where the paint has actually chipped, not in a soft square round it.

## Walls, kerbs and roofs

Brick walls, pavements, kerbstones, roof tiles and the railway's ballast each carry a depth picture, a grey map of how far every mortar line and hollow sits below the surface. The game uses it to give flat walls real relief as you walk past, to darken the recesses, and in the rain to decide where water gathers first.

A grey picture is the small form's weak spot: it can only pin each block to one of a few dozen shades, so a smooth slope came out as a staircase. The 27 depth pictures the streets use scored 27 to 37 and now score 42 to 58. Mortar lines hold their shape close up and water creeps into the hollows smoothly.

## Puddles back in the gutter

Checking all this turned up a fault nobody had asked about. In the rain, water stands along the foot of the kerbs, placed by a map of the whole neighbourhood drawn at 20 cm a pixel. That map is read as numbers, so it's meant to be kept exactly as drawn. On the development PC the editor had quietly packed it anyway, and because its width isn't a multiple of four pixels, the packing stretched it by a tenth of one percent.

A tenth of a percent of a 374 metre map is 40 cm at its eastern edge. The gutter puddles there sat that far off the kerb line, and about half that in the middle of the map. The map is exact again, and it's now marked so that no editor can repack it.

## What it costs, and what was left alone

The sharper pictures take 39 MB more of the card's memory, against the 320 MB the last update handed back. The same pass found thirteen small pictures (the bumps on manhole covers and road cracks) still unpacked, which gives 9 MB of that back.

Doing every shading picture in the game the same way would have cost about 305 MB, nearly everything the last update saved, to move furniture and props from one score nobody can see to another. So they stay as they are.
