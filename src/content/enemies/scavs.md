---
name: Scavs
order: 1
tagline: The ones who moved in.
summary: Armed scavengers who moved into the area after the evacuation, from gang members to chancers to a few who never left. They know the gardens well.
image:
  src: images/screenshots/2026-10-24-235041.webp
  alt: A scav in a grey hoodie carrying a rifle through long grass and trees.
  caption: A scav cutting through the back gardens.
threat: High in groups

facts:
  - { label: On Duncombe Street, value: "14 per raid, and 2 more for each squadmate" }
  - { label: Armed with, value: "AK-47 (7.62x39), sometimes grenades" }
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
    text: Gunfire, sprinting and footsteps on the railway gravel all carry. Shots bring scavs looking from up to 60 metres away, but at most three come to a fight they only heard; the rest stand guard.
  - title: They notice
    text: Stand still close beside a scav and it catches you out of the corner of its eye. Right behind one, at arm's length, it'll turn round within a couple of seconds.
  - title: They throw grenades
    text: Holding an angle, a scav now and then lobs a frag or flashbang at where it last saw you. Falling back, it often pops smoke first. Scavs run for cover from grenades too.
  - title: They watch
    text: Scavs have the advantage on open ground. The lookout in the car park can see right across it.

loadouts:
  - name: Tracksuit
    frequency: Common
    gear: [AK-47, Spare magazines, 7.62x39 FMJ, Hoodie and joggers]
    text: The most common type. No armour or helmet.
  - name: Kitted
    frequency: Uncommon
    gear: [AK-47, Chest rig, MICH helmet, Bandages]
    text: Better equipped, with a rig and a helmet.
  - name: Heavy
    frequency: Rare
    gear: [AK-47, Plate carrier, K6-3 helmet, First aid kit]
    text: Wears armour and a heavy helmet. Aim for unarmoured areas, or avoid the fight.
  - name: Extras
    frequency: Any of them
    gear: [M67 frag, M84 flashbang, M18 smoke, Red dot, 4x scope, Suppressor]
    text: Any scav might carry a grenade, and some have fitted parts to their rifles. Their bodies keep whatever they had, and you can take it.

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

Most of the scavs came after the government left. Some ran with the gangs Russia paid for before the strikes, and still carry the rifles that came with the money. More are opportunists who followed them in, after whatever the evacuation left behind. A few never got on the train at all.

They treat the street and everything in its houses as theirs, and they'll want whatever you're carrying.

They aren't soldiers, but they're careful. They move in twos and threes, use the gardens for cover, and keep out of the middle of the road. They know the area better than you do.
