from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1600, 1000
FONT = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

def asset(name):
    return Image.open(f"sortandgo/prints/{name}").convert("RGBA")

def place(canvas, image, box, blur=0):
    image = image.copy()
    image.thumbnail((box[2], box[3]), Image.Resampling.LANCZOS)
    if blur:
        image = image.filter(ImageFilter.GaussianBlur(blur))
    shadow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    shadow.putalpha(image.getchannel("A").filter(ImageFilter.GaussianBlur(14)))
    canvas.alpha_composite(shadow, (box[0] + 12, box[1] + 18))
    canvas.alpha_composite(image, (box[0], box[1]))

def headline(draw, pieces, x=112, y=84, size=50):
    font = ImageFont.truetype(FONT, size)
    for text, color in pieces:
        draw.text((x, y), text, font=font, fill=color)
        x += int(draw.textlength(text, font=font))

# Image 2 — problem to product
problem = Image.open("sortandgo/campaign/sortandgo_problem_background_1600x1000.png").convert("RGBA")
pd = ImageDraw.Draw(problem)
headline(pd, [("From unstructured files to an", "#ffffff")], size=47)
headline(pd, [("export-ready", "#2f6bff"), (" sequence", "#ffffff")], y=143, size=47)
place(problem, asset("empty-state.png"), (810, 326, 650, 270))
label_font = ImageFont.truetype(FONT, 18)
for label, x, y in [("Upload", 270, 720), ("Reorder", 396, 732), ("Rename", 530, 735), ("Export", 670, 725)]:
    pd.text((x, y), label, font=label_font, fill="#ffffff")
problem.convert("RGB").save("sortandgo/campaign/sortandgo_problem_to_product.png", quality=95)

# Image 3 — build loop
build = Image.open("sortandgo/campaign/sortandgo_build_background_1600x1000.png").convert("RGBA")
bd = ImageDraw.Draw(build)
headline(bd, [("From product flow to ", "#ffffff"), ("working interface", "#2f6bff")], size=43)
place(build, asset("lovable initial.png"), (435, 586, 110, 180))
place(build, asset("claude code interaction.png"), (770, 490, 90, 185))
place(build, asset("sortandgo_01.png"), (1028, 380, 410, 280))
build.convert("RGB").save("sortandgo/campaign/sortandgo_build_loop.png", quality=95)

# Image 4 — interaction
interaction = Image.open("sortandgo/campaign/sortandgo_interaction_background_1600x1000.png").convert("RGBA")
idraw = ImageDraw.Draw(interaction)
headline(idraw, [("Set the ", "#ffffff"), ("exact order", "#2f6bff"), (" before export", "#ffffff")], size=46)
place(interaction, asset("sorted.png"), (850, 360, 475, 318), blur=5)
place(interaction, asset("drag-and-drop.png"), (305, 255, 720, 510))
place(interaction, asset("renaming.png"), (805, 675, 182, 252))
place(interaction, asset("sortandgo_01.png"), (1370, 420, 165, 108))
interaction.convert("RGB").save("sortandgo/campaign/sortandgo_core_interaction.png", quality=95)
