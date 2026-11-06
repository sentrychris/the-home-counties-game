---
title: "Looking the rifle over without a knotted sleeve"
date: 2026-11-06T15:30:00Z
summary: "Alt+I turns the AK over in your hands to show both sides. When it swung round to show its left side, the left sleeve twisted round on itself at the wrist like a sweet wrapper. Now the forearm turns smoothly with the hand the whole way through."
version: v0.1.196
tags: [weapons, animation]
cover:
  src: images/screenshots/dl-inspect-sleeve.webp
  alt: "First-person view on a plain test field of the AK turned with its muzzle to the left and its left side rolled up, the left forearm in its camo sleeve coming up smoothly to the hand on the wooden handguard."
screenshots:
  - src: images/screenshots/dl-inspect-sleeve-before.webp
    alt: "The same moment before the fix, on a plain test field: the left sleeve and glove cuff twisted round at the wrist into a sharp knot."
    caption: "Before: with the muzzle to the left, the sleeve knotted at the wrist."
  - src: images/screenshots/dl-inspect-sleeve-after.webp
    alt: "The same moment after the fix, on the same test field: the left forearm turns smoothly into the hand on the handguard."
    caption: "After: the forearm turns with the hand, no knot."
---
## A half turn too far

Your left hand holds the AK's wooden handguard already turned well over, palm up under it. When you look the rifle over and it rolls to show its left side, that hand turns further still. The game worked out how far the forearm should turn with it, but it only counted up to half a turn either way. Your left hand went past that, so the game suddenly turned the forearm the other way round, and the sleeve knotted at the wrist.

Now the forearm follows the hand the short way from wherever it already is, so it never flips. The whole look-over, both sides and back, turns smoothly. The pistol, knife, grenades and healing items move exactly as before.
