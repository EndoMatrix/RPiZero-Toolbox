import time
import os

import Adafruit_GPIO.SPI as SPI
import Adafruit_SSD1306

from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

import subprocess

RST = None # unused

# 128x32 display with hardware I2C:
disp = Adafruit_SSD1306.SSD1306_128_32(rst=RST)

# init
disp.begin()

# clear
disp.clear()
disp.display()

w = disp.width
h = disp.height

image = Image.new('1', (w, h)) # create blank 1-bit image
frame = Image.open(os.path.join(os.path.dirname(__file__), 'images/complete.gif'));

draw = ImageDraw.Draw(image) # create drawing object

draw.rectangle((0, 0, w, h), outline=0, fill=0)

while frame:
    u = time.time()

    image.paste(frame, (0, 0))
    disp.image(image)
    disp.display()
    try:
        v = time.time()
        time.sleep(max((frame.info['duration'] / 1000) - (v - u), 0))
        frame.seek(frame.tell() + 1) # find next frame, if it exists
    except EOFError:
        draw.rectangle((0, 0, w, h), outline=0, fill=0)
        disp.image(image)
        disp.display()
        break


