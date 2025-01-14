import svgwrite

# Original list of points (x, y), where y is the half-width
points = [
    (0, 0), 
    (0.5, 6.6), 
    (2, 11.6), 
    (4, 14.7), 
    (6, 16.0), 
    (8, 16.8), 
    (10, 17.1),
    (20, 17.9), 
    (30, 18.4), 
    (40, 18.9), 
    (50, 19.3), 
    (60, 19.45),
    (70, 19.7), 
    (72, 19.4), 
    (74, 19.0), 
    (76, 18.4), 
    (78, 17.4),
    (80, 15.6), 
    (82, 12.4), 
    (83.5, 7.0), 
    (84, 0)
]

# Prepare points for the positive and mirrored sides
positive_points = [(x, y / 2) for x, y in points]  # Halve the y-values
mirrored_points = [(x, -y) for x, y in reversed(positive_points[1:-1])]  # Skip first and last points to avoid overlap
full_path = positive_points + mirrored_points  # Combine paths

# Create SVG
dwg = svgwrite.Drawing('knife_profile.svg', profile='tiny', size=(200, 100))
path_data = "M " + " L ".join(f"{x},{y}" for x, y in full_path) + " Z"  # Close the path with 'Z'
dwg.add(dwg.path(d=path_data, stroke='black', fill='none'))

# Save to file
dwg.save()
print("SVG saved as 'knife_profile.svg'")
