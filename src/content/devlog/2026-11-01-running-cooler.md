---
title: "Running cooler"
date: 2026-11-01T17:00:00Z
summary: "Three savings you can't see: the menus stop drawing the street behind them, brick walls do less work, and small far-off models use their simpler versions sooner."
version: v0.1.164
tags: [performance]
cover:
  src: images/screenshots/dl-terrace-barrel.webp
  alt: "Duncombe Street on a bright day: terraces both sides, a burning barrel and a wrecked car further up the road."
  caption: "Nothing here looks any different, which was the point."
---
## Same look, less heat

The game was making graphics cards work harder than they needed to, and run hot. This build cuts work you can't see, without changing the picture.

- **Menus over a raid.** When you open the gear screen or the pause menu, the street behind it is now a still copy of the last frame, instead of being drawn sixty times a second behind the blur. In those menus the card now draws about a fifth of the power it did.
- **Brick and stone walls** use their deep surface effect only as far as it actually shows on screen.
- **Far-off models** switch to their simpler versions a little sooner when they're only a few pixels across.

Each one can be switched off in the developer menu, to check side by side that nothing changed.
