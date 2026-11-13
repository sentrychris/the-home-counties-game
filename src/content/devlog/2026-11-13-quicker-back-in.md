---
title: "Quicker back in"
date: 2026-11-13T05:00:00Z
summary: "Every raid after your first in a sitting now loads about eight seconds quicker on the development PC: the street builds in 8.8 seconds where it took 17.7. The first raid takes as long as it did, and this post says why. Two more rare ways the loading screen could freeze for good were found and closed along the way."
version: v0.1.227
tags: [performance, UI]
cover:
  src: images/screenshots/dl-quicker-back-in.webp
  alt: "The raid loading screen over a view of overgrown, ruined Osborne Street under dark cloud: a thin bar along the bottom a fifth full, a turning ring and a tip about crouching in the bottom left, PUTTING UP THE HOUSES, 18% in the bottom right."
screenshots:
  - src: images/screenshots/dl-quicker-back-in.webp
    alt: "The raid loading screen over a view of overgrown, ruined Osborne Street under dark cloud: a thin bar along the bottom a fifth full, a turning ring and a tip about crouching in the bottom left, PUTTING UP THE HOUSES, 18% in the bottom right."
    caption: "Putting up the houses in v0.1.227. From your second raid of a sitting on, this stage takes half as long as it did."
---
## Timing a loading screen, frame by frame

Loading into Duncombe Street took nearly half a minute on the development PC, and most of that was one stage: building the street, 18 seconds. The same build on a test machine with a slower processor and no graphics card took 10. So a new tool timed every frame of a load and wrote down what each one was waiting for.

The answer was kinds of material. Brick, glass, car paint, leaves, a scav's jacket: to the graphics card each is a small program of its own, and so is every different mix of switches on a plain material (see-through or not, with a bump picture or without). A raid on the street draws 122 of them. The first time one is needed, the card has to be handed that program in every form it might be drawn in, which takes about 75 thousandths of a second. For 122 that is nine seconds, spread through the loading screen as stalls.

## Paid again every raid

When a raid ended and the last brick wall was cleared away, the brick program was thrown away with it. So was every other kind. The next raid paid the nine seconds again, and so did the one after.

The game now keeps one of each kind for as long as it runs. From your second raid on they're all there when the loading screen opens. Measured on the development PC over three raids in a row: the street builds in 8.8 seconds where it took 17.7, the pause as the raid appears is 0.6 of a second where it was 1.3, and the whole load is about eight seconds shorter, every time.

## The first raid

The first raid after starting the game takes as long as it did. That wasn't the plan, so here's what happened.

The plan was for a spare processor core to hand the card those 122 programs while the main one got on with building the street. On the PC it turned out the card takes them from one core at a time: while the spare core was handing one over, the main core's next frame waited for it. The nine seconds were moved, not shared.

The game still does it that way, because where the waiting falls is better. It now comes first, with the bar counting through it, then the street builds without the stalls it used to have, and the long pause just before the raid appears is 1.4 seconds where it was 3.1. But the total is the same to within a second or two. The way to make a first raid quicker is to need fewer kinds of material, and that's next.

## Two ways to wait for ever

Timing loads over and over turned up two more ways the loading screen could stop and never start again. Both were rare, both were in earlier versions too, and both have the same shape as the one fixed in v0.1.223: two workers, each waiting for the other.

In the first, the main core asked for something a spare core was already half way through loading, and waited. The spare core, meanwhile, needed the main core to do one small thing before it could finish. Neither moved. Now models, materials and the like are all fetched before the street starts building, and only pictures, which can't get into that knot, are fetched while it builds.

The second was lettering. The first time the game draws a letter in a font, the spare cores make it while the main core waits. If those cores were all busy loading fonts and models at that very moment, nobody was left to make the letter. The loading screen now makes every letter it can show, every tip and every figure of the percentage, before it asks for anything.

While this version was being made, a test that loads the street again and again, watching for a frozen screen, stuck two times in three. With the lettering made first it has passed every time since.

## What it costs

Keeping the kinds costs memory: about 3 GB more is held while you're back in the hideout between raids. A raid itself uses what it always did, and nothing extra sits on the graphics card.
