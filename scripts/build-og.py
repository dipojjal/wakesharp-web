#!/usr/bin/env python3
"""Compose the OpenGraph / social share card.

    python3 scripts/build-og.py

Deliberately self-contained: the dawn gradient is drawn procedurally from the
app's own `dawnGradient` stops rather than loaded from `Design/Screenshots/_plates/`,
which is gitignored in the app repo and would make this script unrunnable the
moment that folder disappears. The only external inputs are the vendored Nunito
(OFL, `scripts/fonts/`) and the celebrating Lark cutout that `prep-assets.mjs`
already committed to `src/assets/mascot/`.

Composition mirrors `tools/screenshots/extras.py::feature_graphic` in the app
repo, so the share card and the Play feature graphic read as the same artwork.
Type stays inside the middle 80% because every social surface crops differently.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT = ROOT / "scripts" / "fonts" / "Nunito[wght].ttf"
LARK = ROOT / "src" / "assets" / "mascot" / "celebrating.png"
OUT = ROOT / "public" / "og.png"

SIZE = (1200, 630)

# Vertical ramp sampled from Design/Screenshots/_plates/dawn-a.png, which is itself
# the app's WSPalette.dawnGradient rendered as art. Positions are fractions of height.
STOPS = [
    (0.00, (0x13, 0x13, 0x26)),
    (0.26, (0x2D, 0x21, 0x45)),
    (0.55, (0x99, 0x50, 0x71)),
    (0.80, (0xED, 0x98, 0x81)),
    (1.00, (0xFA, 0xB4, 0x62)),
]


def font(size: int, instance: str) -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(str(FONT), size)
    f.set_variation_by_name(instance)
    return f


def lerp(a: int, b: int, t: float) -> int:
    return round(a + (b - a) * t)


def gradient(size: tuple[int, int]) -> Image.Image:
    w, h = size
    img = Image.new("RGB", (1, h))
    px = img.load()
    assert px is not None
    for y in range(h):
        t = y / (h - 1)
        for i in range(len(STOPS) - 1):
            p0, c0 = STOPS[i]
            p1, c1 = STOPS[i + 1]
            if p0 <= t <= p1:
                local = 0.0 if p1 == p0 else (t - p0) / (p1 - p0)
                px[0, y] = tuple(lerp(c0[j], c1[j], local) for j in range(3))
                break
    return img.resize((w, h), Image.BILINEAR)


def main() -> int:
    canvas = gradient(SIZE).convert("RGBA")

    # Warm sun bloom low-right, echoing the app's ring screen.
    bloom = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    ImageDraw.Draw(bloom).ellipse(
        [SIZE[0] * 0.52, SIZE[1] * 0.42, SIZE[0] * 1.18, SIZE[1] * 1.42],
        fill=(0xFA, 0xBF, 0x59, 70),
    )
    canvas = Image.alpha_composite(canvas, bloom.filter(__import__("PIL.ImageFilter", fromlist=["ImageFilter"]).GaussianBlur(90)))

    lark = Image.open(LARK).convert("RGBA")
    lark = lark.crop(lark.getbbox())
    height = round(SIZE[1] * 0.80)
    width = round(lark.width * height / lark.height)
    lark = lark.resize((width, height), Image.LANCZOS)
    canvas.alpha_composite(lark, (round(SIZE[0] * 0.68), SIZE[1] - height - round(SIZE[1] * 0.05)))

    draw = ImageDraw.Draw(canvas)
    left = round(SIZE[0] * 0.075)
    draw.text((left, 196), "WakeSharp", font=font(112, "ExtraBold"), fill=(0xFF, 0xFF, 0xFF, 255))
    draw.text((left, 330), "Wake up sharp.", font=font(42, "SemiBold"), fill=(0xFA, 0xBF, 0x59, 255))
    draw.text((left, 384), "Not just awake.", font=font(42, "SemiBold"), fill=(0xFF, 0xFF, 0xFF, 204))
    draw.text((left, 462), "Alarm missions · brain warm-ups · smart calendar alarms",
              font=font(25, "SemiBold"), fill=(0xFF, 0xFF, 0xFF, 168))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(OUT, optimize=True)
    print(f"  {OUT.relative_to(ROOT)}  {SIZE[0]}x{SIZE[1]}  {OUT.stat().st_size // 1024} KB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
