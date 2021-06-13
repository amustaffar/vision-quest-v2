import time
from joblib import Parallel, delayed
from .image import images_from_file
from .segmentation import get_labels_from_image
from .result import get_result_for_image, get_stats

def run_particles(id, file, edges_sigma, min_distance):
  t1 = time.time()
  images = images_from_file(file)

  def task(image):
    labels = get_labels_from_image(image, edges_sigma, min_distance)
    return get_result_for_image(image, labels)

  results = Parallel(n_jobs=-1)(delayed(task)(i) for i in images)
  t2 = time.time()
  return get_stats(id, results, t2 - t1)
