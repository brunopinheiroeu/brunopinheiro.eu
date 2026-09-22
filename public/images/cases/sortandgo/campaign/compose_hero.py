from PIL import Image, ImageDraw, ImageFont
import numpy as np

W, H = 1600, 1000
base = Image.open("sortandgo/campaign/sortandgo_hero_background_1600x1000.png").convert("RGBA")
screen = Image.open("sortandgo/sortandgo_01.png").convert("RGBA")
source = [(0, 0), (screen.width, 0), (screen.width, screen.height), (0, screen.height)]
target = [(855, 310), (1452, 240), (1420, 635), (820, 680)]

def homography(src, dst):
    rows, values = [], []
    for (x, y), (u, v) in zip(src, dst):
        rows += [[x, y, 1, 0, 0, 0, -u*x, -u*y], [0, 0, 0, x, y, 1, -v*x, -v*y]]
        values += [u, v]
    matrix = np.linalg.solve(np.asarray(rows), np.asarray(values))
    return np.append(matrix, 1).reshape(3, 3)

# Pillow perspective coefficients map destination coordinates back into source coordinates.
inverse = np.linalg.inv(homography(source, target))
coefficients = (inverse / inverse[2, 2]).flatten()[:8]
warped = screen.transform((W, H), Image.Transform.PERSPECTIVE, coefficients, Image.Resampling.BICUBIC)
mask = Image.new("L", (W, H), 0)
ImageDraw.Draw(mask).polygon(target, fill=255)
warped.putalpha(mask)
base.alpha_composite(warped)

draw = ImageDraw.Draw(base)
font_path = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
title = ImageFont.truetype(font_path, 72)
subtitle = ImageFont.truetype(font_path, 34)
draw.text((116, 78), "Sort & Go", font=title, fill="#ffffff", stroke_width=0)
draw.text((120, 176), "Sort images. Export ready.", font=subtitle, fill="#ffffff")
base.convert("RGB").save("sortandgo/campaign/sortandgo_hero.png", quality=95)

# Closing frame: same environment and factual UI; only campaign copy changes.
closing = Image.open("sortandgo/campaign/sortandgo_hero_background_1600x1000.png").convert("RGBA")
warped_closing = screen.transform((W, H), Image.Transform.PERSPECTIVE, coefficients, Image.Resampling.BICUBIC)
warped_closing.putalpha(mask)
closing.alpha_composite(warped_closing)
closing_draw = ImageDraw.Draw(closing)
closing_font = ImageFont.truetype(font_path, 51)
prefix = "Processed "
key = "locally"
suffix = " in the browser"
x, y = 116, 94
closing_draw.text((x, y), prefix, font=closing_font, fill="#ffffff")
x += int(closing_draw.textlength(prefix, font=closing_font))
closing_draw.text((x, y), key, font=closing_font, fill="#2f6bff")
x += int(closing_draw.textlength(key, font=closing_font))
closing_draw.text((x, y), suffix, font=closing_font, fill="#ffffff")
closing.convert("RGB").save("sortandgo/campaign/sortandgo_built_shipped.png", quality=95)
