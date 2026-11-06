---
title: "R reaches every magazine"
date: 2026-11-06T01:30:00Z
summary: "Pressing R could do nothing even with full magazines on you, if a half-used one was sitting in your rig. Now it swaps in any magazine you carry with more rounds than the one in the gun."
version: v0.1.184
tags: [weapons, gear]
cover:
  src: images/screenshots/dl-mags-reload.webp
  alt: "First-person view down Duncombe Street mid-reload, the AK held up with the magazine halfway in."
---
## R did nothing

Pressing R sometimes did nothing at all, even with full magazines in your backpack. The game picked one magazine first (the same ammo before any other, your rig and pockets before your backpack, then the fullest) and only then checked that it had more rounds in it than the one in the gun. When that pick was a half-used magazine left in your rig by an earlier reload, or a nearly empty one with the same ammo, it gave up there without looking at the rest. The pistol had the same problem.

## What R does now

R only looks at magazines with more rounds in them than the one in the gun, and picks from those the same way as before: the same ammo first, then your rig and pockets before your backpack (which takes longer), then the fullest. If none of the magazines you carry has more in it, R still does nothing, and empty magazines don't count: loose rounds have to be loaded into a magazine in the gear screen first.
