#!/usr/bin/env python
# coding: utf-8

# In[1]:


import numpy as np
import pandas as pd
import os
import seaborn as sns
import matplotlib.pyplot as plt
from scipy import ndimage as ndi
from skimage import io, color, measure
from skimage.exposure import histogram
from skimage.feature import peak_local_max, canny
from skimage.color import rgb2gray
from skimage.segmentation import watershed


# In[2]:


# user defined parameters

pixels_to_microns = 0.286
edges_sigma = 1
min_distance = 10


# In[3]:


# image import, convert to grayscale

image = io.imread(os.path.join(os.getcwd(), 'sample.jpg'))
image = rgb2gray(image)


# In[4]:


# segmentation

edges = canny(image, sigma=edges_sigma)
distance = ndi.distance_transform_edt(~edges)
peak_idx = peak_local_max(distance, min_distance=min_distance)
peak_mask = np.zeros_like(image, dtype=bool)
peak_mask[tuple(peak_idx.T)] = True
markers = measure.label(peak_mask)


# In[5]:


get_ipython().run_cell_magic('time', '', '\nlabels = watershed(-distance, markers)')


# In[6]:


# measure regionprops & save data (csv)

regions = measure.regionprops(labels, intensity_image=image)
prop_list = ['area',
             'equivalent_diameter',
             'feret_diameter_max',
             'perimeter',
             'minor_axis_length',
             'major_axis_length',
             'eccentricity',
             'mean_intensity',
             'orientation']
output_file = open('data.csv', 'w')
output_file.write('Particle #' + ',' + ',' + ','.join(prop_list) + '\n')

particle_num = 1
for region_props in regions:
    output_file.write(str(particle_num) + ',')
    for i, prop in enumerate(prop_list):
        if(prop == 'area'):
            to_print = region_props[prop] * pixels_to_microns ** 2 # convert pixels sq to um sq
        elif(prop == 'orientation'):
            to_print = region_props[prop] * 57.2958 # convert degrees from rad
        elif(prop.find('intensity') < 0):
            to_print = region_props[prop] * pixels_to_microns
        elif(prop == 'equivalent_diameter'):
            to_print = region_props[prop] * pixels_to_microns
        elif(prop == 'feret_diameter_max'):
            to_print = region_props[prop] * pixels_to_microns
        elif(prop == 'perimeter'):
            to_print = region_props[prop] * pixels_to_microns
        elif(prop == 'minor_axis_length'):
            to_print = region_props[prop] * pixels_to_microns
        elif(prop == 'major_axis_length'):
            to_print = region_props[prop] * pixels_to_microns
        else:
            to_print = region_props[prop]
        output_file.write("," + str(to_print))
    output_file.write('\n')
    particle_num += 1
output_file.close()


# In[7]:


# cumulative distribution (based on feret dia. max)

feret = [prop.feret_diameter_max for prop in regions]
feret_array = np.array(feret)
feret_array_factored = feret_array * pixels_to_microns


# In[8]:


# display percentiles & no. of particles

print('No. of particles measured: ', len(regions))
print('10th percentile (d10):', np.percentile(feret_array_factored, 10), 'microns')
print('50th percentile (d50):', np.percentile(feret_array_factored, 50), 'microns')
print('90th percentile (d90):', np.percentile(feret_array_factored, 90), 'microns')


# In[9]:


# display histogram & cumulative distribution plots

sns.set_style('darkgrid')
sns.histplot(data=feret_array_factored)
plt.xlabel('Feret dia. max. (microns)')
plt.savefig(fname='histogram.png', dpi=500)


# In[10]:


sns.ecdfplot(data=feret_array_factored)
plt.xlabel('Feret dia. max. (microns)')
plt.savefig(fname='cum_distribution.png', dpi=500)


# In[11]:


# display grayscaled image

plt.imshow(image, cmap='gray')
plt.savefig(fname='grayscaled_image.png', dpi=500)


# In[12]:


# display watershed labels

plt.imshow(color.label2rgb(labels, bg_label=0, image=image))
plt.savefig(fname='watershed_labels.png', dpi=500)

