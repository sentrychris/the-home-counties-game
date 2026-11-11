---
title: "The dead fall like bodies now"
date: 2026-11-11T17:30:00Z
summary: "Scavs no longer play a death animation. Shot dead, a scav goes limp and drops under real physics: pushed by the round that killed it, buckling at the knees, slumping down walls and folding over low ones, with its rifle falling out of its hands."
version: v0.1.217
tags: [animation, gameplay]
cover:
  src: images/screenshots/dl-ragdoll-chest.webp
  alt: "Three moments of a scav in a burgundy tracksuit and plate carrier being shot in the chest in the test yard: standing with his AK, then buckling at the knees as the rifle falls from his hands, then lying on his side on the tarmac with the rifle by his feet."
screenshots:
  - src: images/screenshots/dl-ragdoll-chest.webp
    alt: "Three moments of a scav in a burgundy tracksuit and plate carrier being shot in the chest in the test yard: standing with his AK, then buckling at the knees as the rifle falls from his hands, then lying on his side on the tarmac with the rifle by his feet."
    caption: "Shot in the chest: the knees go first, then the rest, and the rifle falls with him."
  - src: images/screenshots/dl-ragdoll-wall.webp
    alt: "Three moments of a scav in a grey hoodie shot with his back to a brick wall: standing, then slumping down the wall into a crouch as his rifle drops, then sliding sideways onto the ground."
    caption: "Shot against a wall: he slumps down it and slides to the ground."
  - src: images/screenshots/dl-ragdoll-low-wall.webp
    alt: "A scav in camouflage trousers shot as he ran at a low brick wall, folded over the top of it, his head and arms hanging down the far side and his legs in the air."
    caption: "Shot running at a low wall: he folds over it."
---
## How they fall

Until now a scav killed played one of a few death animations, the same way whatever hit it. Now it goes limp and falls as a body does, worked out by the physics engine every frame:

- **The round pushes it.** The part that was hit is knocked the way the round was going, so a scav shot in the shoulder turns as it drops. One killed running carries on the way it was going and goes down forwards.
- **Not every body drops the same.** A headshot or a grenade drops a scav at once, with no strength left in it. Otherwise it keeps a little for about a second: the legs give first, so a body shot buckles it at the knees and folds it down. A knife kill holds on longest.
- **It falls on what's there.** Against a wall it slumps down it. On stairs or a slope it can tip over and slide down. Running at a low wall, it folds over the top.
- **Its joints bend only as a person's do.** Each part weighs what a person's does, and what it carries is on it: a plate carrier and a full rig are heavy round the chest, a helmet weighs the head down.
- **It lands with a thud**, and a rattle of kit if it wore a rig or a plate carrier.
- **The rifle falls out of its hands.** It tips, clatters and lies where it lands, on the ground beside the body.

Most bodies lie still within two to four seconds. Shooting a body on the ground knocks it, and a grenade nearby throws it again.

## Still searchable

Nothing changes when you loot. Bodies are still walked through, not tripped over, and **F** still searches one, wherever and however it ended up. Your own body falls the same way when you die, and so do squadmates.

In a squad, each player's game lets a body fall by itself from the same shot, so a body can lie a little differently on each screen. What's on it is the same for everyone.

## If you'd rather the old way

The F1 developer menu has an **Old death falls** switch that brings back the death animations.

## How it's done

The game now uses Jolt, a faster and steadier physics engine, for everything. Each scav's body is built from its own skeleton: twelve pieces (the head, chest, belly and hips, and each upper and lower arm and leg, the feet going with the lower legs), joined at the neck, the spine, the shoulders, elbows, hips and knees, each joint with the limits a person's has. For the second or so after it's shot, gentle "muscles" try to hold the pose it was in and give way, legs first. Once the body is still, the physics stops working on it, so a street full of bodies costs nothing. The shape of each rifle for falling is worked out ahead of time, so the first kill with a new gun doesn't stutter.
