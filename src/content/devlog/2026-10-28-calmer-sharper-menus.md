---
title: "Calmer menus, sharper letters"
date: 2026-10-28T01:00:00Z
summary: "Crisp text at 1920x1080, a menu size setting, a little life in the buttons, gear sounds as you kit up, and proper VSync choices."
version: v0.1.89
tags: [UI, sound, graphics]
cover:
  src: images/screenshots/dl-menus-glint.webp
  alt: "The Raid tab at Medium menu size, with a light glint sweeping across the START RAID button."
screenshots:
  - src: images/screenshots/dl-menus-glint.webp
    alt: "The Raid tab at Medium menu size, with a glint sweeping across the START RAID button."
    caption: "A glint across the button you point at."
  - src: images/screenshots/dl-menus-sharper.webp
    alt: "A close-up comparison of menu letters before and after, the after noticeably crisper."
    caption: "Letters before and after the sharpness fix."
  - src: images/screenshots/dl-settings-display.webp
    alt: "Settings > Display with window mode, resolution, upscaling, VSync, frame rate limit and Menu size."
    caption: "Settings > Display, with VSync and Menu size."
---
## Sharp at 1080p

The menus are laid out at 1600x900 and drawn larger on a 1080p screen. Every letter was landing between pixels, which made the text slightly soft. The fonts are now drawn a different way that stays crisp at any size, so the menus and HUD are sharp at 1920x1080 without thinning any of the HUD's fine lines.

## Calmer

The menus still felt a bit bunched up, so everything was given more room:

- A **Menu size** setting (Small, Medium or Large) under Settings > Display. Medium, a touch smaller than before, is the default. The in-raid HUD keeps its size whatever you pick.
- A slimmer top bar.
- A soft glint sweeps across a button when you point at it, page tabs get a thin line growing under them, and screens fade in and out.

## Sounds as you kit up

Menus tick quietly as you move about them, and gear makes its own sounds: the AK's bolt when you equip it, a slide, zips and velcro when you put on a rig or pack, and rounds clicking into a magazine as you load it.

## VSync

Settings > Display now has VSync choices (Auto, Off, On, Adaptive and Triple buffered) next to the frame-rate limit. Auto is plain VSync, exactly as the game always ran.
