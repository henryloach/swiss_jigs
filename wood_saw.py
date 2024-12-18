import numpy as np
from scipy.interpolate import splprep, splev
import svgwrite

# Knife profile data (length in cm, full width in mm)
knife_data = [
    (0, 0),
    (0.2, 11.6),
    (0.4, 14.7),
    (0.6, 16.3),
    (0.8, 17.0),
    (1.0, 17.6),
    (2.0, 18.4),
    (3.0, 18.9),
    (4.0, 19.4),
    (5.0, 19.8),
    (6.0, 19.9),
    (7.0, 20.2),
    (7.2, 19.9),
    (7.4, 19.5),
    (7.6, 18.6),
    (7.8, 17.8),
    (8.0, 15.6),
    (8.2, 12.4),
    (8.4, 0)
]

# Scale factors
length_scale = 10  # Convert cm to mm
width_scale = 0.5  # Use half-width for symmetry

# Scale the data
scaled_data = [(x * length_scale, y * width_scale) for x, y in knife_data]

# Separate X and Y coordinates
x, y = zip(*scaled_data)

# Fit a B-spline to the data (with smoothing)
tck, u = splprep([x, y], s=2)  # 's' controls the smoothness
smooth_u = np.linspace(0, 1, 500)  # Generate 500 points along the curve
smooth_x, smooth_y = splev(smooth_u, tck)

# Mirror the smooth curve to get the left side
mirrored_smooth_y = [-yi for yi in smooth_y]
left_x = smooth_x[::-1]  # Reverse X for left side
left_y = mirrored_smooth_y[::-1]  # Reverse Y for left side

# Combine right and left sides
full_x = np.concatenate((smooth_x, left_x))
full_y = np.concatenate((smooth_y, left_y))

# Create an SVG file
dwg = svgwrite.Drawing("smooth_knife_profile.svg", profile="tiny", size=("100mm", "100mm"))

# Add the smoothed knife profile as a path
points = list(zip(full_x, full_y))
path_data = "M " + " L ".join([f"{px},{py}" for px, py in points]) + " Z"  # Create a closed path
dwg.add(dwg.path(d=path_data, fill="none", stroke="black", stroke_width=0.5))

# Save the SVG
dwg.save()

print("Smooth knife profile saved as 'smooth_knife_profile.svg'")
