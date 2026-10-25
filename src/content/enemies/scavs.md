---
name: Scavs
order: 1
tagline: The ones who stayed.
summary: Armed scavengers who have been picking over Duncombe Street since the collapse. They know the gardens well, carry AKs, and work together to get you out of cover.
image:
  src: images/screenshots/2026-10-24-235041.webp
  alt: A scav in a grey hoodie carrying a rifle through long grass and trees.
  caption: A scav cutting through the back gardens.
threat: High in groups

facts:
  - { label: On Duncombe Street, value: 12 per raid }
  - { label: Armed with, value: AK-47 (7.62x39) }
  - { label: Notices you by, value: Sight and sound }
  - { label: Drops, value: Whatever they carried }

behaviours:
  - title: They take cover
    text: When shot at, a scav moves behind a car, a wall or the corner of a house before returning fire.
  - title: They flank
    text: In pairs, one keeps you pinned down while the other moves round the side.
  - title: They search
    text: If they lose you, they search where they last saw or heard you, including inside houses.
  - title: They listen
    text: Gunfire, sprinting and footsteps on the railway gravel all carry. A scav that hears something comes to investigate.
  - title: They watch
    text: Scavs have the advantage on open ground. The lookout in the car park can see right across it.

loadouts:
  - name: Tracksuit
    frequency: Common
    gear: [AK-47, 7.62x39 FMJ, Hoodie and joggers]
    text: The most common type. No armour or helmet.
  - name: Kitted
    frequency: Uncommon
    gear: [AK-47, Chest rig, MICH helmet, Bandages]
    text: Better equipped, with a rig and a helmet.
  - name: Heavy
    frequency: Rare
    gear: [AK-47, Plate carrier, K63 helmet, First aid kit]
    text: Wears armour and a heavy helmet. Aim for unarmoured areas, or avoid the fight.

voiceLines:
  - { line: "Oi! Who's that?", when: Hears something }
  - { line: "There! By the fence!", when: Spots you }
  - { line: "He's in the gardens!", when: Calls out your position }
  - { line: "I'm going round. Keep him busy.", when: Flanking }
  - { line: "Reloading!", when: Reloading }
  - { line: "Gone quiet. Check the houses.", when: Lost you }
  - { line: "Come out, mate. We only want your stuff.", when: Hunting }
  - { line: "I'm hit! I'm hit!", when: Wounded }
---

Nobody is quite sure who the scavs were before. Some of them lived here. Some came up the railway from elsewhere. A few still wear the hi-vis they had on the day the trains stopped.

What they have in common is that they stayed. They treat Duncombe Street and everything in its houses as theirs, and they'll want whatever you're carrying.

They aren't soldiers, but they're careful. They move in twos and threes, use the gardens for cover, and keep out of the middle of the road. They know the area better than you do.
