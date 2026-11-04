---
name: Browning Hi-Power
order: 2
class: Pistol
calibre: 9x19mm
slots: [Holster]
summary: The British Army's old service pistol, and the sidearm on Duncombe Street. Semi-automatic, 13 rounds, quick to bring up. Fit a rail adapter and it takes a compact weapon light.
image: images/items/pistol.webp
imageAlt: A black Browning Hi-Power pistol.
hero:
  src: images/screenshots/dl-gunsmith-hipower.webp
  alt: The Browning Hi-Power on the gunsmith bench with a compact weapon light under its barrel, its stats down the right.

specs:
  - { label: Calibre, value: 9x19mm }
  - { label: Magazine, value: "13-round Hi-Power magazine" }
  - { label: Fire mode, value: Semi-automatic }
  - { label: Muzzle velocity, value: 350 m/s }
  - { label: Effective range, value: 50 m }
  - { label: Weight, value: 1.0 kg }
  - { label: Value, value: "£450" }
  - { label: Inventory size, value: 2 x 1 }

# The gunsmith's own stats for the Hi-Power as it comes (bars out of 100, longer is better).
stats:
  - { label: Ergonomics, value: 78 }
  - { label: Vertical recoil control, value: 64 }
  - { label: Horizontal recoil control, value: 62 }
  - { label: Accuracy, value: 34 }
  - { label: Effective range, value: 10, display: 50 m }

fireModes:
  - name: Semi-automatic
    text: One shot each time you pull the trigger. Fire as fast as you can click, but each shot flips the muzzle up, so give it a moment between them at range.

recoil:
  text: A sharp flip up with each shot that settles quickly, and it's lighter and quicker to raise than the AK. Each hit does about two thirds of an AK round's damage, and much less of it gets through armour.
  points:
    - Aim with right mouse for anything past a few metres.
    - Go for the unarmoured parts. A 9 mm round won't do much to a plate.
    - Hollow points hit hardest against scavs in street clothes.

reload:
  text: Press R and the empty magazine drops and a fresh one goes in, your fullest of the same ammo from your rig and pockets first. Run it dry and the slide locks back, so the reload ends with the slide racked, which takes a little longer. Load magazines by dragging rounds onto them, or with right-click > Load with...
  points:
    - Hi-Power magazines are one square, so they fit in your pockets.
    - Reload before it runs dry and you skip racking the slide.
    - Alt+T shows what's left in the magazine and what you carry of that type.

ammo:
  - name: 9x19 FMJ
    status: in-game
    text: Plain ball rounds in a British Army cardboard packet. The common round, from Carl and the crates. Under a third of it gets through body armour.
  - name: 9x19 AP
    status: in-game
    text: Steel-cored, from a police armoury. A little less damage than FMJ, but most of it gets through armour.
  - name: 9x19 hollow point
    status: in-game
    text: Expanding rounds. The most damage of the three, but armour stops nearly all of it.

ammoSwitching: Press Y to swap in a magazine loaded with the next kind of round you're carrying. Alt+T shows which kind is loaded.

controls:
  - { key: "3", action: Draw the pistol }
  - { key: Left mouse, action: Shoot (one shot a click) }
  - { key: Right mouse, action: Aim }
  - { key: R, action: Reload (fullest magazine) }
  - { key: Y, action: Next ammo type }
  - { key: T, action: Weapon light on or off }
  - { key: Alt+T, action: Check ammo }
  - { key: Alt+I, action: Inspect }
---

The British Army's pistol for decades, until 2013. Thousands of them sat in stores after that, until someone opened the stores. Carl usually has one in, and about a third of the scavs on Duncombe Street carry one: if a scav runs dry close to you, expect it to draw.
