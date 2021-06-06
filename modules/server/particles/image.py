from skimage import io, util
from skimage.color import rgb2gray

def images_from_file(file):
  base = rgb2gray(io.imread(file))
  w, h = base.shape
  print(w, h)
  bw = w // 4
  bh = h // 4
  print(bw, bh)
  wr = w - (bw * 4)
  hr = h - (bh * 4)
  print(wr, hr)
  wl = w - wr
  hl = h - hr
  print(wl, hl)
  cropped = base[0:wl,0:hl]
  block_shape = (bw, bh)
  view = util.view_as_blocks(cropped, block_shape)
  result = view.reshape(16, bw, bh)
  return result
