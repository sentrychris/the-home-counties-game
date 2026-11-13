---
title: "No more stuck at 3%"
date: 2026-11-12T19:30:00Z
summary: "Once in a while the loading screen stopped at 3%, on Heading out, and never moved again. The cause turned out to be the game's spare processor cores all ending up waiting on each other. That can't happen any more, and loading takes about as long as before."
version: v0.1.223
tags: [performance, UI]
cover:
  src: images/screenshots/dl-loading-unstuck.webp
  alt: "The raid loading screen over the backdrop of a ruined, overgrown Osborne Street: the thin bar along the bottom an eighth of the way along, a turning ring and a tip about Crapper in the bottom left, and PUTTING UP THE HOUSES, 12% in the bottom right."
screenshots:
  - src: images/screenshots/dl-loading-unstuck.webp
    alt: "The raid loading screen over the backdrop of a ruined, overgrown Osborne Street: the thin bar along the bottom an eighth of the way along, a turning ring and a tip about Crapper in the bottom left, and PUTTING UP THE HOUSES, 12% in the bottom right."
    caption: "Past 3% and still going: the same load that used to freeze there every time on a four-core test machine."
---
## Stuck on Heading out

Every so often, going into a raid, the loading screen stopped at 3% with Heading out in the corner, and stayed there. The ring stopped turning, and the only way out was to close the game. It didn't happen often on a gaming PC, which made it hard to pin down, but on a four-core test machine it turned out to happen every single time, so it could be watched as it happened.

## What was going on

While the loading screen is up, the game loads the raid on its spare processor cores, side by side, so the bar keeps moving. At the same moment, a tiny view nobody ever sees draws a box with every graphics effect the raid uses (bounced light, reflections, fog, anti-aliasing) so the graphics card's versions of the street's materials are ready before the raid starts, rather than all at once on its first frame.

Drawing something for the first time, the game has to wait for those spare cores to prepare it for the graphics card. But some of the things loading on them, such as a material or a model, have to wait for the game in turn. With every core caught up in that, everyone was waiting on everyone else, and nothing could ever move again. The more cores a PC has, the rarer that is, which is why it was a once-in-a-while freeze on a gaming PC and an every-time one on a small machine.

## The fix

Pictures are the one kind of thing that never has to wait for the game, so now only pictures load while that hidden view draws anything new. Everything else waits a moment until it has, and the raid only goes in once everything being loaded early has come in. Timed on a test machine, a load takes as long as it did before, and the raid looks exactly the same.

## A tougher long-raid test

The long test raid that hunts for bugs now shoots scavs with your own rifle, so every round's hit, the blood, the glass and the bodies falling all get a workout. It also checks where the bodies end up, and counts once a minute everything the game is holding, so anything that slowly piles up over a long raid shows up.
