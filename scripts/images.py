"""Web exports of the photos and brand files (`npm run images`).

Reads the originals in _source/ (client photos, Magnific stock, logos) and writes smaller copies
to public/. Run it again after adding or swapping an original; the site only uses public/.
Stock sources and licences: _source/images/stock/SOURCES.md.
"""
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "_source" / "images"
OUT = ROOT / "public"

# Stock photo → web name. Numbers match research/stock-candidates.html.
STOCK = {
    "01-hero-crew-cladding": "hero-cladding",
    "02-waerme-wool-to-cladding": "waerme-wolle-mantel",
    "04-waerme-rohrisolierung": "waerme-rohr",
    "06-detail-end-cap-layers": "detail-endkappe",
    "08-armaturen-valve-boxes": "armaturen",
    "10-behaelter-column": "behaelter-kolonne",
    "11-behaelter-vessel": "behaelter",
    "12-waerme-waermetauscher": "waermetauscher",
    "13-kaelte-insulated-pipes": "kaelte-rohre",
    "16-section-pipe-rack": "rohrbruecke",
    "17-section-cladded-pipes-sky": "rohre-himmel",
    "23-tanks-insulated-tank": "tank",
    "26-kaelte-chiller-pipework": "kaelte-anlage",
    "32-lueftung-duct-insulation-worker": "montage-kanal",
    "33-lueftung-factory-ducts": "lueftung-halle",
    "34-lueftung-silver-ducts": "lueftung-kanaele",
    "35-lueftung-rooftop-duct": "lueftung-dach",
    "41-karriere-worker-cladded-pipes": "team-kontrolle",
    "42-ablauf-inspecting-overhead-pipes": "aufmass",
    "43-karriere-worker-plant": "karriere",
    # Second round, for the Haul-style layout
    "50-hero-silver-pipes": "hero-rohre",
    "51-cta-aerial-refinery": "cta-luftbild",
    "52-partner-team": "partner-team",
    "53-aerial-complex": "anlage-luftbild",
    # The start page hero since 28 Oct 2026
    "70-hero-engineer-portrait": "hero-ingenieur",
    # Blog articles (28 Oct 2026)
    "71-blog-mineral-wool-roll": "blog-mineralwolle",
    "72-blog-insulated-ducts-ceiling": "blog-kanaele-decke",
    "73-blog-clad-pipework-outdoor": "blog-rohrleitungen-aussen",
}

# Avatars beside the Google rating on the start page: a square around the face, as fractions of the
# (square) original: left, top, side. Ordinary people from stock, not IsoPro's reviewers.
AVATARS = {
    "60-avatar-man-outdoors": ("avatar-1", (0.36, 0.01, 0.43)),
    "61-avatar-woman-outdoors": ("avatar-2", (0.27, 0.14, 0.52)),
    "63-avatar-woman-home": ("avatar-3", (0.26, 0.06, 0.50)),
    "62-avatar-man-grey-beard": ("avatar-4", (0.20, 0.08, 0.68)),
}

# The client's own site photos (originals from their Wix site). 04, 12 and 22 are left out:
# they look like stock whose rights are unclear.
CLIENT_SKIP = {"04", "12", "22"}


def save_jpeg(image: Image.Image, path: Path, max_edge: int, quality: int = 82) -> None:
    image = ImageOps.exif_transpose(image).convert("RGB")
    image.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "JPEG", quality=quality, optimize=True, progressive=True)


def photos() -> None:
    for name, web in STOCK.items():
        save_jpeg(Image.open(SRC / "stock" / f"{name}.jpg"), OUT / "img" / f"{web}.jpg", 2400)
    for path in sorted((SRC / "projects").glob("*.jpg")):
        number = path.name[:2]
        if number not in CLIENT_SKIP:
            save_jpeg(Image.open(path), OUT / "img" / "projekte" / f"p{number}.jpg", 1800, 85)


def avatars() -> None:
    for name, (web, (left, top, side)) in AVATARS.items():
        image = ImageOps.exif_transpose(Image.open(SRC / "stock" / f"{name}.jpg"))
        size = image.width
        box = (round(left * size), round(top * size), round((left + side) * size), round((top + side) * size))
        save_jpeg(image.crop(box), OUT / "img" / "avatars" / f"{web}.jpg", 160, 85)
        print("avatar", web, box)


def recolour(image: Image.Image, dark_to: tuple[int, int, int]) -> Image.Image:
    """The logo with its black lettering in another colour; the coloured dots stay as they are."""
    image = image.convert("RGBA")
    pixels = image.load()
    for y in range(image.height):
        for x in range(image.width):
            r, g, b, a = pixels[x, y]
            if a and max(r, g, b) < 90:
                pixels[x, y] = (*dark_to, a)
    return image


def dots(image: Image.Image) -> list[tuple[float, float, float, str]]:
    """Centre, radius and ring of every dot in the logo's symbol, found as blobs of colour."""
    small = image.convert("RGBA")
    width, height = small.size
    pixels = small.load()
    seen = [[False] * height for _ in range(width)]
    found = []
    for x0 in range(width):
        for y0 in range(height):
            r, g, b, a = pixels[x0, y0]
            if seen[x0][y0] or a < 128 or max(r, g, b) < 90:
                continue
            stack, blob = [(x0, y0)], []
            seen[x0][y0] = True
            while stack:
                x, y = stack.pop()
                blob.append((x, y))
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < width and 0 <= ny < height and not seen[nx][ny]:
                        pr, pg, pb, pa = pixels[nx, ny]
                        if pa >= 128 and max(pr, pg, pb) >= 90:
                            seen[nx][ny] = True
                            stack.append((nx, ny))
            if len(blob) < 20:
                continue
            cx = sum(p[0] for p in blob) / len(blob)
            cy = sum(p[1] for p in blob) / len(blob)
            r, g, b, _ = pixels[int(cx), int(cy)]
            found.append((cx, cy, (len(blob) / 3.14159) ** 0.5, "outer" if g > 200 else "inner"))
    return found


def brand() -> None:
    logo = Image.open(SRC / "logos" / "isopro-logo-wide-transparent.png")
    bbox = logo.getbbox()
    logo = logo.crop(bbox)
    web = logo.copy()
    web.thumbnail((1400, 1400), Image.Resampling.LANCZOS)
    (OUT / "brand").mkdir(parents=True, exist_ok=True)
    web.save(OUT / "brand" / "logo.png", optimize=True)
    recolour(web, (255, 255, 255)).save(OUT / "brand" / "logo-light.png", optimize=True)
    print("logo", web.size)

    # The symbol is the left part of the lockup: measure its dots on a small copy
    symbol = logo.crop((0, 0, int(logo.height * 1.05), logo.height))
    # The browser tab icon: the symbol, square, on transparent (app/icon.png)
    side = max(symbol.size)
    icon = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    icon.paste(symbol, ((side - symbol.width) // 2, (side - symbol.height) // 2))
    icon.resize((512, 512), Image.Resampling.LANCZOS).save(ROOT / "app" / "icon.png", optimize=True)
    symbol.thumbnail((600, 600), Image.Resampling.LANCZOS)
    print("symbol", symbol.size)
    for cx, cy, r, ring in sorted(dots(symbol), key=lambda d: (d[3], d[1])):
        print(f"  {ring} {cx:.1f} {cy:.1f} r={r:.1f}")

    for path in sorted((SRC / "partners").glob("*.png")):
        mark = Image.open(path).convert("RGBA")
        # trim the white square the files come in
        background = Image.new("RGBA", mark.size, (255, 255, 255, 255))
        diff = Image.eval(Image.alpha_composite(background, mark).convert("L"), lambda v: 255 if v < 245 else 0)
        mark = mark.crop(diff.getbbox())
        mark.thumbnail((480, 480), Image.Resampling.LANCZOS)
        (OUT / "brand" / "partners").mkdir(parents=True, exist_ok=True)
        mark.save(OUT / "brand" / "partners" / path.name, optimize=True)
        print("partner", path.name, mark.size)


if __name__ == "__main__":
    photos()
    avatars()
    brand()
