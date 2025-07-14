from PIL import Image, ImageDraw, ImageFont
from datetime import datetime
import os
import math

class FrameDesigner:
    def __init__(self):
        try:
            self.caption_font = ImageFont.truetype("arial.ttf", size=20)
        except:
            self.caption_font = ImageFont.load_default()

    def create_photostrip(self, frames, caption="✨ SnapQueen Strip"):
        if len(frames) != 4:
            raise ValueError("Photostrip requires exactly 4 frames!")

        # Assume all frames are same size
        single_w, single_h = Image.fromarray(frames[0]).size

        gap = 20
        border = 30
        bottom_space = 80

        strip_w = single_w + border * 2
        strip_h = single_h * 4 + gap * 3 + border * 2 + bottom_space

        strip = Image.new("RGB", (strip_w, strip_h), "white")

        y = border
        for frame in frames:
            img = Image.fromarray(frame)
            strip.paste(img, (border, y))
            y += single_h + gap

        draw = ImageDraw.Draw(strip)

        text_width, text_height = draw.textsize(caption, font=self.caption_font)
        text_x = (strip_w - text_width) // 2
        text_y = strip_h - bottom_space + (bottom_space - text_height) // 2

        draw.text((text_x, text_y), caption, fill="black", font=self.caption_font)

        # Rotate whole strip by 30 degrees
        rotated = strip.rotate(30, expand=True, fillcolor="white")

        return rotated

    def save_polaroid(self, polaroid, save_dir="./saved_pics"):
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)
        filename = f"strip_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
        path = os.path.join(save_dir, filename)
        polaroid.save(path)
        return path
