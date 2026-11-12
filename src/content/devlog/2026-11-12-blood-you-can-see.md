---
title: "Blood you can see, and what the new effects cost"
date: 2026-11-12T12:00:00Z
summary: "Shot through, a scav now leaves a spray on the wall or car behind him that you'll notice from a few metres, blood goes into a car through a missing window, and a pool no longer turns white in the sun. We also timed the last week's additions on a gaming PC (they cost very little) and fixed an FSR 2 error the loading screen logged."
version: v0.1.221
tags: [graphics, performance]
cover:
  src: images/screenshots/dl-blood-render.webp
  alt: "A grey pebbledashed wall in the test yard after a scav standing a metre in front of it was shot through twice: a dense red spatter about a hand and a half across, thinning out to fine drops round it."
screenshots:
  - src: images/screenshots/dl-blood-render.webp
    alt: "A grey pebbledashed wall in the test yard after a scav standing a metre in front of it was shot through twice: a dense red spatter about a hand and a half across, thinning out to fine drops round it."
    caption: "Two rounds through a scav a metre in front of a rendered wall, seen from about 3 m."
  - src: images/screenshots/dl-blood-white.webp
    alt: "A white uPVC panel with one spray of blood on it: a red middle and fine red drops round it."
    caption: "One round's spray on white uPVC: red, not the pale pink it was."
---
## Blood you'll notice

Playing v0.1.220, the blood turned out to be hard to spot: scavs shot against a wall and against a car seemed to leave nothing behind them. They did leave something, but from a few metres it was a red speck about the size of a bullet hole, and on a white car door only a pale pink smudge. v0.1.221 fixes that without making it a cartoon:

- **The spray on a wall or car** is drawn about one and a half times as big, with a denser middle of bigger drops: the thick of it is now about a hand and a half across, with drops thrown out round it to half a metre or so, and it's a proper red on white paint. Several rounds through the same scav build up into a bigger mess.
- **Into a car through a missing window**, the spray used to fly straight through the empty cabin and land nowhere. Now it's on the seats and the inside of the far door.
- **Pools in the sun:** a pool was so glossy that looking towards the sun it caught the light as one white blob. It's now a dark red-brown sheen from that side too.

Some rounds still leave no blood at all, and that's on purpose: a helmet or plate that stops a round stops the blood too (a puff of grey dust instead), and about half of the 5.56 rounds into a plate carrier's chest are stopped. A round into a room through a shot-out window doesn't show from outside either.

## Timed on a real graphics card

On a gaming PC with an RTX 3060 Ti, at 1920 x 1080 on Ultra with FSR 2 upscaling on Quality, we fought the same firefight on Duncombe Street again and again with one of the new things switched off each time. Then we shot eight scavs down and timed the blood they left by hiding and showing it in turn.

- **Blood:** with as much lying about as the game ever keeps (90 stains and 8 pools, all close by), 0.44 milliseconds a frame. In an ordinary firefight it made no difference we could measure.
- **Bullet-hit bits and sparks:** too small to measure.
- **Ragdolls:** nothing on the graphics card. The processor's physics works about 0.1 to 0.2 milliseconds harder while each body comes down, and about half a millisecond with seven coming down at once.
- **Hair:** an afro filling the screen on the **Character** tab costs 0.28 milliseconds, so a head down the street costs far less.
- **The Character tab:** about 3 milliseconds a frame for the whole lit room, most of it in the puddles' reflections, the depth of field and the glow.

The firefight itself took 6.5 to 7 milliseconds on the graphics card, well inside the 16.7 milliseconds a frame that 60 frames a second allows.

## A quieter FSR 2

While a raid loads, a tiny view nobody sees draws a box with every effect, so the graphics card has its versions of the materials ready before you go in. With FSR 2 upscaling on, that view was drawn smaller than FSR 2 can work with (Quality drew it 42 pixels across, and it needs 64), so Godot logged an error for every frame of the loading screen. It never touched the picture you see. v0.1.221 makes that view just big enough, and the errors are gone.
