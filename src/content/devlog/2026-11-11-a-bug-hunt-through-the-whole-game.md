---
title: "A bug hunt through the whole game"
date: 2026-11-11T01:00:00Z
summary: "A night spent hunting bugs in every corner of the game. Scavs no longer get stuck for good against knee-high walls or up on rubble heaps, rounds dropped back on the bag they came from stay put, a crash while saving can't cost you your stash any more, and quest items packed in a bag inside your bag count."
version: v0.1.212
tags: [AI, gear, gameplay]
cover:
  src: images/screenshots/dl-patrol-outfits.webp
  alt: "Two scavs walking away up a terraced street, one in a helmet and rig, the other in camouflage trousers."
screenshots:
  - src: images/screenshots/dl-patrol-outfits.webp
    alt: "Two scavs walking away up a terraced street, one in a helmet and rig, the other in camouflage trousers."
    caption: "Two scavs on patrol, and since this update they stay on the move."
---
## How we looked

Two new testing tools did most of the finding. One leaves a raid running for a long time with you unkillable: every so often it puts you near a scav and makes a noise so a fight starts, now and then drops a scav that's fighting so the bodies get checked and looted, and once a second it looks over every scav: where it is, what it's doing, and whether it has been walking on the spot. The other plays with the inventory like a very restless player: thousands of random drags, Shift+clicks, right-click menus and bag windows, in the hideout and in a raid, counting every round and item after each move to make sure nothing appears or disappears.

## Scavs stuck for good

In about every other 15-minute raid, a scav or two ended up walking on the spot for the rest of it. There were two reasons.

- Where scavs can walk is worked out ahead of time with a rule that lets them step up anything under half a metre, but their bodies can only step up about 10 cm. So their routes ran straight over knee-high garden walls, junk and rubble. A scav walked into the wall, gave up on that stop, and the next one went the same way, for ever. Those low walls now count as full height when the walkable area is worked out, so routes go round them. Nothing on the map itself has changed.
- A scav that had climbed a rubble heap was too far above the first point of its route to ever count as having reached it, so it stood there. It now allows for how far above or below the point it is.

The same long raids that caught them before now run clean.

## Rounds that vanished

Dragging a stack of rounds out of your rig or backpack and dropping it back onto that same rig or backpack, on its gear slot or on its tile, made the rounds disappear. Now nothing happens, as it should.

## Safer saves

Your profile, settings, controls and squad address used to be written straight over the old file. A crash, a power cut or a full disk part way through could leave half a file, and a profile the game couldn't read was started afresh, stash and all. Now each save is written to a spare file first and only swapped in once it's all on disk, with the save before it kept as a backup. If the newest can't be read, the game loads the one before. If none of them can, the broken file is copied aside before a new profile starts, so it can still be rescued.

## Smaller fixes

- Quest items in a rig or bag that's packed inside your backpack now count as on you (they didn't, so the quest's progress went back) and are handed over at the end of the raid with the rest.
- If a bag's saved contents didn't all fit back in it, the extras were lost without a word. They now come back to your stash, or to your feet in a raid.
- The spare AK the hideout hands you when you've lost every rifle came with a magazine the game wasn't allowed to change, so loading or emptying it didn't work until you restarted.
- Holding a place for a job that wants 90 seconds no longer tells you "you left before the minute was up".
- Three errors written to the log at every start are gone. None of them showed in play.

## Performance

We also timed the scavs' thinking, saving, the menus and the scavs' searches for cover. Fourteen scavs in a fight take under a millisecond a frame between them, and a save takes about two milliseconds. Earlier rounds have already taken every saving that doesn't change the look, so nothing here runs any differently.
