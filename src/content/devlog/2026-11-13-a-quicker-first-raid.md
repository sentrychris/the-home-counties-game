---
title: "A quicker first raid"
date: 2026-11-13T07:30:00Z
summary: "Your first raid after starting the game spent about nine seconds of its loading screen handing the graphics card its kinds of material. The game now does that at the title and in the hideout, one kind a frame, only while you're standing still. It also needs eleven fewer of them, and eight that were never on its list now are."
version: v0.1.228
tags: [performance, UI]
cover:
  src: images/screenshots/dl-a-quicker-first-raid.webp
  alt: "The game's title screen: THE HOME COUNTIES in worn white letters over a dark, overgrown Osborne Street with a wrecked car in the road, and PRESS ANY KEY below."
screenshots:
  - src: images/screenshots/dl-a-quicker-first-raid.webp
    alt: "The game's title screen: THE HOME COUNTIES in worn white letters over a dark, overgrown Osborne Street with a wrecked car in the road, and PRESS ANY KEY below."
    caption: "The title screen in v0.1.228. While it waits for a key, the game is getting your first raid's materials ready."
---
## Where the last one left off

The last version made every raid after your first load about eight seconds quicker, and left the first one as slow as it was. The reason was kinds of material. Brick, glass, car paint, a scav's jacket: to the graphics card each is a small program of its own, a raid on Duncombe Street draws about 120 of them, and handing the card one takes about 75 thousandths of a second on the development PC. That's nine seconds, and a spare processor core can't take them off the main one's hands, because the card takes them from one core at a time.

That post ended by saying the way to a quicker first raid was fewer kinds. It turned out to be two things, and fewer kinds is the smaller.

## Nothing makes a kind cheaper

First, a look inside the engine for why one kind costs so much. Each is kept in 28 forms, for every way it might be drawn (as a shadow, as depth alone, with bounced light, with motion for anti-aliasing), and every form is read from the disk, unpacked and handed to the card's driver. A game can't ask for fewer forms. So only two things are left to choose: when the kinds are read, and how many there are.

## Read while nobody's waiting

Before your first raid you've looked at the title, and you've stood in the hideout sorting kit. The game now reads a raid's kinds there, one a frame, and only while it's standing still: no key, click, wheel or mouse movement for four tenths of a second, nothing fading or sliding on screen, and not on the Character or Gunsmith tabs, where a figure or a rifle is turning. About nine seconds of stillness does the lot, in whatever pieces they come. Whatever's still unread when you press Start raid is read under the loading screen as before, and the bar allows for how much is left.

It has a price, and it's better said than found. A frame in which a kind is read is about 75 thousandths of a second long, so while the game reads, the things on those screens that move by themselves move in steps: the title's prompt as it breathes, the bars of the music player. And the first key or click after a still moment can be answered that much late, once. The 3 GB the kinds take are now held from the hideout on, where before they were held from the first raid on.

## Eleven fewer

Of a raid's kinds, 56 were mixes of switches on a plain material: see-through or not, a bump picture or none, lit on one side or both. Eleven of those mixes drew exactly what another mix draws. A cut-out sign with no bump picture, for one, comes out the same as a sign with its bumps switched on at a depth of nothing. Those eleven now share the other's program.

"Draws the same" was checked rather than trusted. A new tool photographs every plain material in the game alone, on its own piece of the street, under a fixed light: 845 pictures before the change and 845 after, compared number by number. 822 are the same to the last digit. The other 23 are the story papers and the scavs' beanies, which differ by a single rounding step in a handful of their 110,592 numbers each; on a screen that's one value, one shade off, in all 23 pictures put together.

## Eight that were never on the list

The same count turned up eight kinds the game's list had never had: the muzzle flash, the tracer, the grenade's flash and its dust, the smoke grenade's cloud. They're made ready as a raid starts but aren't on anything yet, so the tool that writes the list didn't see them, and they were read cold in the very frame the raid appears. That was a good half second of the 1.4 second pause just as you go in. They're on the list now and read ahead with the rest.

So a first raid makes 118 kinds where it made 129.

## What to expect

This version hasn't been timed on the development PC yet, so these are sums, not measurements. On the last version a first raid took 22.6 seconds to load there and a later one 11.4. With every kind read before you press Start raid, a first raid should load much as a later one does: 12 or 13 seconds. Stand still for less than nine seconds and it falls somewhere between the two. The pause as the raid appears should drop from 1.4 seconds to under one.
