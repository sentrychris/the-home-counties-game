---
title: "Nothing left behind"
date: 2026-11-12T20:30:00Z
summary: "A night of bug hunting with new tests that play raid after raid and click all over the menus at random. They found a few things left behind after every raid, a rifle that could go off under the loading screen, a squad menu that hid the mouse, and scavs taking live grenades down with them. All fixed, the game a little lighter on the processor, and it looks exactly the same."
version: v0.1.224
tags: [gameplay, co-op, UI, performance]
cover:
  src: images/screenshots/dl-nothing-left-behind.webp
  alt: "The hideout's Raid tab: the Duncombe Street map printed on old map paper and taped down, hand-written notes on it, and down the right a photo of the place, your kit and the START RAID button."
screenshots:
  - src: images/screenshots/dl-nothing-left-behind.webp
    alt: "The hideout's Raid tab: the Duncombe Street map printed on old map paper and taped down, hand-written notes on it, and down the right a photo of the place, your kit and the START RAID button."
    caption: "The Raid tab, which quietly kept two copies of its photo every time you came back to the hideout."
---
## Raid after raid

An evening's play is lots of raids in a row, so there's a new test that does just that: from the hideout through the real loading screen into a raid, a scav shot down, out through the extraction, back to the hideout, again and again, with a graphics setting changed at random every couple of seconds along the way. After each raid it counts everything the game is holding.

It found two things that piled up. The Raid tab made a picture just to borrow its photo, twice every visit, and never threw it away. And the Tab screen's missions box was only put on the screen the first time you opened it, so in any raid where you never pressed Tab it was left behind when the raid ended. Neither was big on its own, but they added up the longer you played. Now nothing builds up from one raid to the next.

## Nothing fires under the loading screen

For its last few seconds, the loading screen sits over a raid that's already running, while the game looks round the street and wakes the scavs. Key presses were already stopped there, but a key or button held down still counted. So a click could fire your rifle without you seeing it, using a round and telling every scav nearby where you were, and the heal key could use a bandage. Now you're held still, the same as when a gear screen is open, until the screen starts to lift.

## The menu over the summary, in a squad

In a squad raid the Esc menu doesn't pause anything, so the raid can end while it's open: you get killed, the time runs out, or the host goes back to the hideout. The menu then stayed over the end-of-raid screen, and pressing Resume hid the mouse, so you couldn't click Return to hideout. Now the menu closes as the raid ends.

## A scav's last grenade

When a scav is dazed halfway through a throw, the grenade falls at its feet with the fuse running. If it was shot dead in that moment instead, the grenade went back into its rig, pin pulled, and never went off. Now it drops live, just as yours does when you die holding one. So if you hear a pin come out, it might be worth getting into cover even after the scav goes down.

## A little lighter on the processor

A profile of a five-minute raid showed where the game's own code spends each frame. For every scav, and for you and your squadmates, the physics made the body's shape all over again every tick, even standing still, because its height was set each time whether it had changed or not. Now it's only set as someone crouches or stands. The scavs' animation settings and the left hand's grip round a foregrip were trimmed too, and the quest check no longer goes through every quest a dozen times, four times a second. With 14 scavs about, a frame takes around 8% less of the processor in the cloud tests. Nothing looks or behaves any differently: it was only work being done twice.

## And smaller things

- The loading screen's list of things to fetch on the spare cores was brought up to date, so the blood, the bullet marks and the newer gear come in with the rest instead of afterwards.
- If a dropped rifle's physics ever went wrong, its safety net laid it in the middle of the map. Now it's laid by the body.
- Another new test clicked over 6,800 times at random all over the hideout and the raid's menus (buttons, sliders, tabs, grids, drags, right clicks and keys) without a single error.
- The long soak raids, the inventory test (12,500 random moves, nothing made or lost) and the four-player squad test, both direct and through Steam, all passed. Two smoke-test checks that used to fail now and then for no real reason were steadied.
