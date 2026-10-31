---
title: "What the scavs are thinking"
date: 2026-10-30T18:30:00Z
summary: "The developer view that shows what each scav is up to, redrawn: labels on leader lines, and their sight and routes painted on the ground."
version: v0.1.142
tags: [AI, tools]
cover:
  src: images/screenshots/dl-scavinfo-street.webp
  alt: "A terraced street with a scav close by and two further off. Each has a dark box on a thin line saying what he's doing; the nearest box also lists his route, health, awareness, facing and ammo."
screenshots:
  - src: images/screenshots/dl-scavinfo-street.webp
    alt: "A scav in the street with a box of details on a leader line beside him, and labels on two scavs further down."
    caption: "Three scavs on patrol, the nearest one in full."
  - src: images/screenshots/dl-scavinfo-above.webp
    alt: "A junction from above with a pale view cone and a dotted route drawn on the tarmac towards a scav."
    caption: "From above: his view cone and the route he's planned."
---
## Behind the scenes

Making scavs behave well means being able to see what they're thinking. The developer menu has a "Show scav info" switch that does that, and it's been redrawn so it's actually readable in the middle of a fight.

Each scav gets a small box on a thin leader line. Far off it just says what he's doing. Close by it opens up: where he's heading, his health, how aware of you he is, which way he's facing and how wide he can see, and how many rounds he has left. What he can see is painted on the ground as a pale cone, and the route he's taking is drawn along the street, so you can watch him decide to come and look round a corner.

It's a tool for building the game rather than something you'll use in a raid, but it's how the scavs' hearing and sight get tuned.
