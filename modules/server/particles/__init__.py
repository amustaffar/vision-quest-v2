import time
from joblib import Parallel, delayed
from .image import images_from_file
from .segmentation import get_labels_from_image
from .result import get_result_for_image, get_stats

def run_particles(file, edges_sigma, min_distance):
  start = time.time()
  images = images_from_file(file)
  print("images: " + str(time.time() - start))

  def task(image):
    labels = get_labels_from_image(image, edges_sigma, min_distance)
    return get_result_for_image(image, labels)

  results = Parallel(n_jobs=-1)(delayed(task)(i) for i in images)
  print("results: " + str(time.time() - start))
  return get_stats(results)
