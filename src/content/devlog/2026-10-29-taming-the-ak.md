---
title: "Taming the AK"
date: 2026-10-29T01:25:00Z
summary: "The AK's recoil rewritten: each shot kicks less and most of it settles back by itself, so a scoped burst stays on target."
version: v0.1.108
tags: [weapons]
cover:
  src: images/screenshots/dl-scope-firing.webp
  alt: "Firing the scoped AK down a terraced street, the view through the eyepiece still on target."
screenshots:
  - src: images/screenshots/dl-scope-firing.webp
    alt: "Firing the scoped AK down a terraced street."
    caption: "A burst through the 4x scope."
  - src: images/screenshots/dl-devmenu-recoil.webp
    alt: "The developer menu with a Recoil slider under Rifle, set to 75%."
    caption: "A Recoil slider on the developer menu, for testing."
---
## Too much kick

The AK climbed too far, too fast, especially through the 4x scope. Every shot pushed the view up and none of it came back, so a 30-round aimed burst ended nearly eleven degrees above where it started and the target left the eyepiece after about four shots. That's not how a real AK behaves.

## Springs

Recoil now works like springs. Each shot kicks the view up a little less than before, and about 60% of that settles back by itself, so you only have to pull down against the rest, with a slight drift to the right. The rifle still jumps in your hands with each shot, but much less when aimed, which keeps the scope's picture steady. The same aimed burst now climbs about three degrees.

A Recoil slider on the developer menu scales it from none to double, for trying out how it should feel.
