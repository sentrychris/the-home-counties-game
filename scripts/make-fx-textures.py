# Makes the site's atmosphere textures in src/assets/fx/: a mist band that tiles sideways (the
# drifting mist on the home page) and soft light rays (the sun through the clouds on the title).
# Only needed to remake them; the site builds without it. Needs Python 3 with numpy and Pillow:
#   pip install numpy pillow
#   python scripts/make-fx-textures.py
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter

OUT = Path(__file__).resolve().parent.parent / "src" / "assets" / "fx"
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(7)

def tile_noise(w, h, scale, octaves=4):
    """Value noise that wraps left-right (and top-bottom), summed over octaves."""
    out = np.zeros((h, w))
    amp, tot = 1.0, 0.0
    for o in range(octaves):
        gw = max(2, int(w / scale * 2 ** o))
        gh = max(2, int(h / scale * 2 ** o))
        g = rng.random((gh, gw))
        g = np.concatenate([g, g[:, :1]], axis=1)
        g = np.concatenate([g, g[:1, :]], axis=0)
        im = Image.fromarray((g * 255).astype(np.uint8)).resize((w + w // gw, h + h // gh), Image.BICUBIC)
        a = np.asarray(im, dtype=float)[:h, :w] / 255
        out += a * amp
        tot += amp
        amp *= 0.5
    return out / tot

# Mist: 1024 x 256, wraps horizontally. Densest at the bottom, thinning upwards.
W, H = 1024, 256
n = tile_noise(W, H, 220, 5)
n = (n - n.min()) / (n.max() - n.min())
y = np.linspace(0, 1, H)[:, None]
fall = np.clip((y - 0.08) / 0.92, 0, 1) ** 1.3
a = np.clip((n - 0.28) * 1.7, 0, 1) * fall
a = a ** 1.15 * 0.85
rgb = np.stack([np.full_like(a, 205), np.full_like(a, 205), np.full_like(a, 200)], -1)
img = Image.fromarray(np.dstack([rgb, a * 255]).astype(np.uint8), "RGBA")
# Soften, keeping the wrap: blur a 3-wide strip and cut the middle.
strip = Image.new("RGBA", (W * 3, H))
for i in range(3):
    strip.paste(img, (i * W, 0))
strip = strip.filter(ImageFilter.GaussianBlur(6))
img = strip.crop((W, 0, 2 * W, H))
# Saved small: it is soft anyway, and a small file keeps it out of the way of the page loading.
img.resize((512, 128), Image.LANCZOS).save(OUT / "mist.webp", "WEBP", quality=50, method=6)

# Rays: 960 x 720, fanning down and left from the top right corner, warm, very soft.
RW, RH = 960, 720
yy, xx = np.mgrid[0:RH, 0:RW].astype(float)
ox, oy = RW * 0.97, -RH * 0.04
dx, dy = xx - ox, yy - oy
ang = np.arctan2(dy, -dx)            # 0 = straight left, pi/2 = straight down
dist = np.hypot(dx, dy) / np.hypot(RW, RH)
beams = np.zeros_like(ang)
for _ in range(14):
    c = rng.uniform(0.35, 1.25)
    wdt = rng.uniform(0.012, 0.05)
    s = rng.uniform(0.35, 1.0)
    beams += s * np.exp(-((ang - c) / wdt) ** 2)
beams = np.clip(beams, 0, 1.4) / 1.4
fade = np.clip(1 - dist * 1.25, 0, 1) ** 1.6 * np.clip(dist * 10, 0, 1)
a = beams * fade
a = a / a.max() * 0.7
rays = np.dstack([np.full_like(a, 255), np.full_like(a, 214), np.full_like(a, 168), a * 255]).astype(np.uint8)
im = Image.fromarray(rays, "RGBA").filter(ImageFilter.GaussianBlur(5))
# Saved small (it's soft anyway) with smooth alpha, for plain blending over the picture.
im.resize((320, 240), Image.LANCZOS).save(OUT / "rays.webp", "WEBP", quality=60, method=6)
print("Wrote", OUT / "mist.webp", "and", OUT / "rays.webp")
