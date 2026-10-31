---
title: "A HUD that stays out of the way"
date: 2026-10-27T01:50:00Z
summary: "A minimal in-raid HUD: a compass, an extract box, a body figure that glows where you're hurt, and ammo only when you check it."
version: v0.1.62
tags: [UI]
cover:
  src: images/screenshots/dl-hud-hurt.webp
  alt: "First-person view by a red smoke flare, with a small body figure bottom left glowing orange on the hurt arm and a thin compass along the top."
screenshots:
  - src: images/screenshots/dl-hud-hurt.webp
    alt: "First-person view by a red smoke flare, with a small body figure bottom left glowing orange on the hurt arm."
    caption: "Hurt: the arm glows and bleeds."
  - src: images/screenshots/dl-hud-body.webp
    alt: "Three body figures side by side: healthy grey, hurt with orange and red parts and blood drops, and badly hurt."
    caption: "The body figure, healthy to badly hurt."
  - src: images/screenshots/dl-hud-extracting.webp
    alt: "The screen washed red by smoke, with an extract box at the top showing a running man in a diamond and EXTRACTING."
    caption: "Standing in the smoke, extracting."
  - src: images/screenshots/dl-hud-ammo.webp
    alt: "The same view with a small ammo readout in the bottom right corner."
    caption: "Alt+T shows what's left in the magazine."
---
## Less on the screen

The old HUD had a lot of text on it. The new one keeps almost nothing in view:

- **A compass** along the top, bearings only. It doesn't mark the exits, so you still need to know the street.
- **The raid timer** small in the top right.
- **A body figure** bottom left, made from a proper human model. Each part glows soft yellow, orange or red as it's hurt, and blood drips over anything that's bleeding. Your gear and any conditions sit beside it.
- **A thin stamina bar** under the figure.
- **An extract box** that appears when you're in an extraction zone, with the place name and a countdown.
- **Ammo** only when you ask: Alt+T shows the rounds in the magazine over what you're carrying of that type for a few seconds, then it fades away.

The list of keys moved off the screen into Settings > Game > Keys, and the frame-rate counter only shows after F3.
