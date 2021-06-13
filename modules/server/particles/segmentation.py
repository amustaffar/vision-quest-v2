import numpy as np
from scipy import ndimage as ndi
from skimage import measure
from skimage.feature import peak_local_max, canny
from skimage.segmentation import watershed
from skimage.filters import threshold_otsu

def get_labels_from_image(image, edges_sigma, min_distance):
  thresh = threshold_otsu(image)
  mask_thresh = np.zeros_like(image, dtype=bool)
  mask_thresh[image > thresh] = True
  mask = mask_thresh if thresh > 0.3 else None

  edges = canny(image, sigma=edges_sigma)
  distance = ndi.distance_transform_edt(~edges)
  peak_idx = peak_local_max(distance, min_distance=min_distance)
  peak_mask = np.zeros_like(image, dtype=bool)
  peak_mask[tuple(peak_idx.T)] = True
  markers = measure.label(peak_mask)
  result = watershed(-distance, markers, mask=mask)
  return result
