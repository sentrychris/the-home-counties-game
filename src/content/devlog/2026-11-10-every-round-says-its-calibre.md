---
title: "Every round says its calibre"
date: 2026-11-10T21:30:00Z
summary: "Rounds in your stash and bags are all labelled the same way now: the calibre on top (7.62x39, 5.56x45 or 9x19) and the kind of round under it in bigger letters (FMJ, AP or HP). Until now only the 5.56 and 9 mm rounds said their calibre, and the AK's just said FMJ."
version: v0.1.210
tags: [UI, weapons]
cover:
  src: images/screenshots/dl-ammo-labels-after.webp
  alt: "The Storage tab's stash with an AK-47, an M4A1 and a Hi-Power, their magazines, and a pile of every kind of round: each pile reads its calibre on the top line, 5.56x45, 9x19 or 7.62x39, the kind of round under it in bigger white letters, a small bullets picture in the bottom left corner and the count in the bottom right."
screenshots:
  - src: images/screenshots/dl-ammo-labels-compare.webp
    alt: "Two rows of the same stash, before and now. Before, the rounds read 556 AP, 556 FMJ, 9x19 AP, 9mm FM (cut off), 9mm HP, and for the AK only AP, AP, FMJ and HP, written over the bullets picture. Now every pile reads its calibre over its kind: 5.56x45 AP, 9x19 FMJ, 7.62x39 HP and so on, with the bullets in the corner."
    caption: "Before and now: the AK's rounds had no calibre, and the others were each written their own way."
  - src: images/screenshots/dl-ammo-labels-before.webp
    alt: "The same stash before the change: the AK's rounds read only AP, FMJ or HP, the M4A1's 556 AP and 556 FMJ, the Hi-Power's 9mm FM and 9mm HP, and the letters run over the bullets picture in the middle of each tile."
    caption: "Before: three calibres, three ways of writing them, and one with none."
---
## What was wrong

A round's full name doesn't fit on a one-square tile, so the inventory showed a short one, and the short names didn't match. The M4A1's rounds said "556 FMJ", the Hi-Power's "9mm FMJ" (cut off to "9mm FM"), and the AK's said just "FMJ", "AP" or "HP", with no calibre at all. With three calibres in the game, a pile of AK rounds and a pile of M4 rounds could look alike. The letters also sat right over the bullets picture, which made them harder to read.

## Now

Every pile of rounds is labelled the same way: the calibre on the top line, and under it the kind of round in bigger, brighter letters, so you can tell piles apart at a glance. The bullets picture has moved down into the bottom left corner, out from under the writing, and the count stays in the bottom right. Every line has a dark edge so it stands out from whatever is behind it, and a name too long for its tile is drawn a little smaller instead of being cut off.

| Calibre | Gun | Rounds |
|---|---|---|
| 7.62x39 | AK-47 | FMJ, AP, HP |
| 5.56x45 | M4A1 | FMJ, AP, HP |
| 9x19 | Hi-Power | FMJ, AP, HP |

Magazines and guns follow the same rule: their name, then the calibre, then the kind of round loaded, written as just "FMJ" since the calibre is on the line above. The Hi-Power's magazine is a single square, so its calibre and kind share one line, clear of its "13/13". The **Load with...** and **Load magazine...** menus, the gunsmith and the rounds' full names ("7.62x39 FMJ", "5.56x45 hollow point") all use the same names.

The pictures are cloud screenshots of the Storage tab with one pile of every kind of round.
