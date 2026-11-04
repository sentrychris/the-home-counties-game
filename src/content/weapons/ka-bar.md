---
name: Ka-Bar knife
order: 3
class: Knife
calibre: Blade
slots: [Knife]
summary: A leather-handled fighting knife. Silent, never runs out, and only any use at arm's length. Slash for speed, stab when you need it to count.
image: images/weapons/ka-bar.webp
imageAlt: A Ka-Bar knife with a leather-washer handle.

specs:
  - { label: Slash, value: "38 damage, 1.6 m reach" }
  - { label: Stab, value: "62 damage, 1.75 m reach" }
  - { label: Against armour, value: "A plate stops it; soft armour mostly does" }
  - { label: Weight, value: 0.4 kg }
  - { label: Value, value: "£80" }
  - { label: Inventory size, value: 1 x 2 }

stats:
  - { label: Slash damage, value: 38, display: "38" }
  - { label: Stab damage, value: 62, display: "62" }

fireModes:
  - name: Slash
    text: Left mouse. A quick sweep across, ready again in under half a second.
  - name: Stab
    text: Right mouse. Slower to come back, with a little more reach, and it hits much harder.

controls:
  - { key: "4", action: Take out the knife }
  - { key: Left mouse, action: Slash }
  - { key: Right mouse, action: Stab }
  - { key: Alt+I, action: Look it over }
---

US Marine Corps issue. Whole crates of them went missing from the convoy depots. About a third of the scavs carry one, and a scav whose rifle is no use to it will go for its knife if you get right up close. Hit a wall and the blade jars off it.
