import numpy as np
from skimage import measure

def get_result_for_image(image, labels):
  regions = measure.regionprops(labels, intensity_image=image, cache=True)
  feret = [prop.feret_diameter_max for prop in regions]
  return np.array(feret)

def get_stats(id, results, time):
  print(list(map(lambda x: x.shape, results)))
  combined = np.concatenate(results)
  values = map(lambda x: float(x), combined)

  return {
    'id': id,
    'values': list(values),
    'd10': np.percentile(combined, 10),
    'd50': np.percentile(combined, 50),
    'd90': np.percentile(combined, 90),
    'time': time
  }
