---
title: "Squadmates' torches glare when they point your way"
date: 2026-11-06T20:00:00Z
summary: "The glare you should see looking into a squadmate's weapon light never showed up: a bug in its shader drew it as nothing. Now there's a bright white point at the glass with a soft halo, as bright as the light really is."
version: v0.1.198
tags: [weapons, graphics]
cover:
  src: images/screenshots/dl-squad-torch-glare.webp
  alt: "A plain test street at night between two dark house fronts. Three weapon lights point straight at the camera from 3, 10 and 25 metres: the nearest is a bright white point with a soft halo and a thin flat streak across it, the other two are smaller, fainter points further down the road."
screenshots:
  - src: images/screenshots/dl-squad-torch-glare-before.webp
    alt: "The same test street and the same three lights before the fix: no glare at all, just a faint patch of light on the road."
    caption: "Before: the same three lights pointing at you, and no glare at all."
  - src: images/screenshots/dl-squad-torch-glare-hidden.webp
    alt: "The test street with a box in front of the 10 metre light and a post just beside the 3 metre one. The 10 metre light's glare is gone; the 3 metre one still glares beside the post."
    caption: "A box hides the middle light, so its glare goes. A post beside the near one doesn't, so it still glares."
---
## A glare you can actually see

Weapon lights came with a glare: look down a squadmate's beam and you should see the light itself burning at the end of their gun. It never showed. A bug in how it was drawn meant it came out as nothing at all, so a squadmate pointing their light at you just looked like a dark gun.

Now it works. You see a small white-hot point at the glass, a soft halo round it and a faint flat streak across it, the way a bright torch looks to your eye or a camera.

## As bright as the light really is

The glare is exactly as bright as the light would make a white card held where you're standing. That's the same light it throws on the road, so the glare and the pool of light on the street always match, however dark it is. From the far end of the street it's a small point. A step away it's dazzling, but it stops growing there, so it never fills your screen. By day it's barely there.

It fades as the beam turns away from you and is gone once you're well outside it. It stays the same size on your screen whether you're zoomed in or not. It glares over things in front of the light, as a real lens does, but if something hides the light itself, a wall or a car or a scav, the glare goes.

These pictures are from a plain test street, not the map.
