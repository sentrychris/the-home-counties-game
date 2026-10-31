---
title: "Faster, and no different to look at"
date: 2026-10-30T20:30:00Z
summary: "A performance pass with one rule: nothing may look any different. Red smoke costs half what it did up close, the map draws in far fewer calls, and windows no longer show through smoke."
version: v0.1.144
tags: [performance]
cover:
  src: images/screenshots/dl-mist-site-flare.webp
  alt: "Red smoke pouring from a flare on a misty road beside a building site, a concrete barrier and a birch tree in the haze."
screenshots:
  - src: images/screenshots/dl-mist-site-flare.webp
    alt: "A red flare burning on a misty road, smoke drifting over a building site."
    caption: "Red smoke in the mist by the building site."
  - src: images/screenshots/dl-overcast-site-flare.webp
    alt: "Red smoke rising past a half-built block of flats on an overcast day, barriers in the road."
    caption: "The same exit on an overcast afternoon."
  - src: images/screenshots/dl-mist-oliver-flare.webp
    alt: "A flare burning on a misty street between concrete barriers, everything washed red."
    caption: "The top of Oliver Road, in the mist."
  - src: images/screenshots/dl-sunny-flare-pub.webp
    alt: "A sunny street corner with a pub behind trees and red smoke drifting over the rooftops."
    caption: "Red smoke over the pub on a sunny day."
  - src: images/screenshots/dl-evening-smoke.webp
    alt: "Red smoke rising from a car park in the evening, a crane and terraced houses against the clouds."
    caption: "And in the evening."
---
## The rule

This round of speed-ups came with one rule: nothing may look any different. Every change was checked by taking the same pictures before and after and comparing them pixel by pixel. None of them changed.

## Red smoke

Standing in the red smoke at an exit and looking up through it was one of the slowest things in the game. Most of each smoke puff is see-through at the edges, but the graphics card was still doing the full work for every one of those empty pixels. Now it skips them. Looking up through a flare went from around 20 milliseconds a frame to about half that.

## Fewer, bigger batches

The map is split into squares, and every square used to send its walls, roofs and fences to the graphics card in many small pieces just to draw their shadows. Each square now has merged copies used only for shadows, which cuts the number of things drawn each frame by a quarter to a third.

## Smoke and windows

Windows, signs and anything else with see-through parts could show through red smoke, as if the smoke were behind them. They now draw before the smoke, so it hangs in front of them where it should.

## And a kerb

A stray piece of kerb sticking out of the road on Osborne Street has been put back where it belongs.
