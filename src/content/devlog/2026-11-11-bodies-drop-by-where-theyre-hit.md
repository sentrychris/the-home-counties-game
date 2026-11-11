---
title: "Bodies drop by where they're hit"
date: 2026-11-11T22:00:00Z
summary: "A scav now goes down by where the round hit him: a headshot drops him on the spot, a chest or belly hit doubles him over, a leg hit takes that leg out first, and one shot running pitches forward. The round pushes by its calibre, and no body is left lying with its knees bunched up in the air."
version: v0.1.219
tags: [animation, gameplay]
cover:
  src: images/screenshots/dl-drop-chest.webp
  alt: "Three moments of a scav in a burgundy tracksuit and plate carrier shot in the chest in the test yard: doubled over round the hit with his AK, then folded down on the tarmac as the rifle falls, then lying flat on his back with his legs stretched out."
screenshots:
  - src: images/screenshots/dl-drop-chest.webp
    alt: "Three moments of a scav in a burgundy tracksuit and plate carrier shot in the chest in the test yard: doubled over round the hit with his AK, then folded down on the tarmac as the rifle falls, then lying flat on his back with his legs stretched out."
    caption: "Shot in the chest: he doubles over round the hit, folds down and ends up flat, legs out."
  - src: images/screenshots/dl-drop-head.webp
    alt: "Three moments of a scav in a navy tracksuit top and olive joggers shot in the head: his head snapping back, then crumpling straight down where he stood, then lying flat on his back with his rifle beside his legs."
    caption: "Shot in the head: he drops on the spot with no strength left and lies flat."
  - src: images/screenshots/dl-drop-leg.webp
    alt: "Three moments of a scav in camouflage trousers and a plate carrier shot in the leg: standing with his AK, then his legs buckling as the rifle swings down, then going down on his side with one leg out."
    caption: "Shot in the leg: that leg goes from under him first and he goes down on that side."
---
## Where the round hits

Since v0.1.217 the dead have fallen under physics instead of playing a death animation. Playing it, Chris found some bodies landing on their backs with both knees pulled up and their feet by their hips, which no dead body does, and every scav went down much the same way whatever hit it. Now how a scav drops depends on where the round went and what he was doing:

- **Head:** he drops on the spot, with no strength left in him, and lies as he lands.
- **Chest or belly:** he doubles over round the hit as his knees go, one a moment before the other, so he folds forward or down onto his side instead of sitting back on his heels.
- **Leg:** that leg goes from under him at once, the other a moment later, and he goes down on that side.
- **Running:** his legs stop and the rest of him carries on, so he pitches forward onto his front.
- **Knife:** he doubles right over, and holds on longest.
- **Grenade:** he's thrown, limp.

## The round's push

The round still knocks the part it hits, now by its calibre: a 7.62 from the AK pushes hardest, a 5.56 from the M4 less, a 9 mm from the pistol least. It's about three times a real round's push, since a real one on its own is too small to see (what you see when someone is shot is mostly their own body giving way). That's enough to rock him and turn him as he drops, never to throw him across the street.

## No more knees in the air

- **Hips that move like hips.** A thigh swings well forward, only a little back, further out to the side than across the other leg, and twists a little. Before, it could swing just as far every way, so a knee could come right up to the chest and the legs could cross.
- **Ankles.** The feet are pieces of their own now, with ankles that bend. Without them a body couldn't tip forward over its feet as its knees went, so it sank onto its heels and sat back.
- **Dead legs fall flat.** A body lying down with a knee still up in the air has that leg let down, and one left sitting up, or kneeling with its head on the ground, is tipped over.

Bodies still lie still within two to five seconds and cost nothing once they're down. Your own body and your squadmates' fall the same way, and the F1 menu's **Old death falls** still brings back the death animations.

## How it's done

Each body is now fourteen pieces, the feet added. The hips are a joint with a limit of their own for each way a thigh moves, where before they were a cone round one middle. The "muscles" that hold on for a second after the shot now also bend the body as they let go, by where it was hit: the spine curls forward and the hips and knees buckle, each leg letting go at its own moment. Once the hips are down by the feet, what's left of them goes. In the test bench, 18 scavs killed every way at once, four times over, only one body in 72 was left with a knee up.
