---
title: "Tighter corners, smoother starts"
date: 2026-10-31T15:35:00Z
summary: "Your rifle pulls in when you're up against a wall instead of poking through it, and scavs do the same. The first seconds of a raid are smooth now, and a stray fence post has gone."
version: v0.1.159
tags: [weapons, animation, performance]
cover:
  src: images/screenshots/dl-mist-gardens.webp
  alt: "A rifle held low in long grass, back fences and terraced houses fading into mist."
screenshots:
  - src: images/screenshots/dl-mist-gardens.webp
    alt: "Long grass behind the back gardens on a misty morning, the rifle held low."
    caption: "Behind the back gardens on a misty morning."
  - src: images/screenshots/dl-mist-rail-north.webp
    alt: "Birch trees and rough grass by the railway, half hidden in mist."
    caption: "By the railway, in the mist."
---
## Up against a wall

Walk up to a wall or a fence with your rifle up, and it used to go straight through. Now it slides back first, then comes down to the carry you use when sprinting, and right up close it swings in across your chest, out of the way. You can't fire or aim while it's pulled right in, and it comes back as soon as there's room. You hear the cloth and a rattle as it moves.

Scavs and squadmates do the same: up against cover they drop their rifles to a low ready and hold their fire until they've stepped clear.

## A smoother start

The first few seconds of a raid could be choppy until you started moving. Three things were behind it: shaders still being prepared as you first looked round, the scavs all planning their first routes at once, and the graphics driver's shader cache, which could end up being rebuilt from scratch. All three now happen under the loading screen: the street is looked round, the scavs' routes are planned and the shaders are ready before you get control.

## And a fence post

A single fence post was standing on its own in the field by the railway, with no fence. It's gone.
