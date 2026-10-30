---
title: "Smoother raids"
date: 2026-10-29T15:20:00Z
summary: "Two rounds of performance work: shorter freezes going into a raid and changing settings, and fewer frame drops in firefights."
version: v0.1.113
tags: [performance]
cover:
  src: images/screenshots/dl-puffs-sun.webp
  alt: "Before and after views of gunfire smoke puffs in the sun, looking the same."
screenshots:
  - src: images/screenshots/dl-puffs-sun.webp
    alt: "Before and after views of gunfire smoke puffs in the sun."
    caption: "Gunfire puffs, before and after: same look, a fraction of the cost."
---
## Stutters

Going into a raid used to end with about seven seconds of frozen screen. It's now about two and a half. Changing a graphics setting used to hitch the game; now it's a blink of 15 to 20 milliseconds. Walking round Duncombe Street on Ultra settles at about 13 ms a frame on the test PC, an RTX 3060 Ti, comfortably inside 60 FPS. None of it came from turning anything down.

## Firefights

Shooting brought the frame rate down: every puff of gunfire smoke was being lit the expensive way, and grenade smoke and flashes added to it. Each puff is now lit once as a whole, which looks the same in sun, in shade and under a tree. Full screen on Ultra, firing from the hip now holds about 64 FPS, aimed about 62, and through the 4x scope 53 to 57 (it was 38). The scope's own picture is most of what's left, and it stays as it is.
