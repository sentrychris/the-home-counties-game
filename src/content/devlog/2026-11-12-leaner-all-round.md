---
title: "Leaner all round"
date: 2026-11-12T23:30:00Z
summary: "A performance sprint over the whole game. 180 signs, posters, papers and graffiti pictures were sitting in the graphics card's memory unpacked and now take a quarter of the room, the street builds without waiting on the screen, the shop's shelves are stocked from one copy of each product, and scavs nobody can see are posed a third as often. The game looks the same."
version: v0.1.225
tags: [performance]
cover:
  src: images/screenshots/dl-leaner-all-round.webp
  alt: "The Park pub on the corner of Duncombe Street on a sunny afternoon, seen from across the road."
screenshots:
  - src: images/screenshots/dl-leaner-all-round.webp
    alt: "The Park pub on the corner of Duncombe Street on a sunny afternoon, seen from across the road."
    caption: "The Park pub on v0.1.225. It looks just as it did the day before, which was the point."
---
## Pictures nobody had packed

Every picture in the game, from a brick wall to a road sign to a scav's jacket, sits in the graphics card's memory for the whole raid. Nearly all of them are kept there packed small, in a form the card can draw straight from. About 230 weren't. Every street sign, shop sign, poster, story paper, graffiti piece, manhole cover and crack in the road was made by hand for the game, and those were being kept unpacked at four times the size: about 450 MB of an 8 GB card between them.

Now 180 of them are packed too, in the card's highest quality form, which keeps lettering and soft edges. Measured on an RTX 3060 Ti, that's 320 MB of video memory handed back. Each one was checked against its original, pixel by pixel, and the difference is far below anything you could see, even side by side. The rest stay exactly as they were. Most of those, the street name plates among them, have sizes the card can't pack without drawing them a hair smaller.

The same job tidied up something behind the scenes. Around a thousand model pictures were only being packed when the Godot editor happened to notice them, so the game's files said one thing and the PC another. Now the files say what's wanted, and every machine gets the same result.

## A street that doesn't wait for the screen

While the loading screen is up, the game builds the street a slice at a time: 22 thousandths of a second of building, then a moment to move the loading bar. With VSync on, every one of those slices then waited for the screen's next refresh, and because 22 is more than one refresh at 60 Hz, it always waited for the second. A third of the build was spent waiting for the monitor. Now the loading screen doesn't wait: only the bar and the little ring are moving, so there's nothing to tear.

The old Sainsbury's was slow to stock, too. Every tin, bottle and cereal box on its shelves was shaped corner by corner as the map was built, thousands of them. Now each of the 62 products is made once and copied onto the shelves. A check compares the two ways corner for corner (they agree to three thousandths of a millimetre), and the shelves take a third of the time.

## Scavs you can't see

A scav on the far side of the map walks its patrol, listens and fights exactly as it always did. But its body was also being posed every single frame: the spine turned to aim, the hands fitted to the rifle, the fingers wrapped round the grip, all for nobody to see.

Now a scav that's out of sight is posed every third frame instead. Out of sight means off the screen or hidden behind walls, shadow included, and more than 8 metres from you. Its footsteps, its reload and its aim are the same, and the moment any part of it could come into view it's back to every frame. With 14 scavs on the street that takes about a tenth off the processor's work each frame.

## Two things you can't see

Two savings were measured on an RTX 3060 Ti during the last performance push and then set aside. They're in now:

- On Ultra, the haze and the sun's rays through it are worked out in 64 cells each way instead of 96. Compared pixel by pixel, nothing changed beyond the flicker one frame has from the next.
- The light that bounces off walls and roads sends 8 rays a frame from each of its points instead of 16. It was already smoothed over 30 frames, so the difference is faint enough to need two screenshots to find.

Together they save about 0.4 thousandths of a second on every frame. Both have a switch on the F1 menu's Heat page, next to the others, so either can be turned off to compare.

## The numbers

Measured on the test machine in the cloud, which has no graphics card, so these are the processor's side only:

- Loading a raid: 20.2 seconds down to 16.6.
- Stocking the shop's shelves: 2.3 seconds down to 0.8.
- The processor's work each frame with 14 scavs on the street: 2.93 thousandths of a second down to 2.55 on patrol, and about 3.5 down to 3.2 in a fight.

And on the PC the game is made on (RTX 3060 Ti, 1920x1080, VSync on), each measured twice before and twice after:

- From pressing START RAID to standing on the street: 30.8 seconds down to 27.6.
- Building the street, the biggest part of that: 21.7 seconds down to 19.1.
- Video memory held by pictures: 4.02 GB down to 3.70.
- The game's own scripts each frame: 1.99 thousandths of a second down to 1.71.
