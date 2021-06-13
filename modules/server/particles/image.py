from skimage import io, util, exposure
from skimage.color import rgb2gray

def images_from_file(file):
  base = exposure.equalize_adapthist(rgb2gray(io.imread(file)), clip_limit=0.01)
  s = 2
  w, h = base.shape
  print(w, h)
  bw = w // s
  bh = h // s
  print(bw, bh)
  wr = w - (bw * s)
  hr = h - (bh * s)
  print(wr, hr)
  wl = w - wr
  hl = h - hr
  print(wl, hl)
  cropped = base[0:wl,0:hl]
  block_shape = (bw, bh)
  view = util.view_as_blocks(cropped, block_shape)
  result = view.reshape(s * s, bw, bh)
  return result
