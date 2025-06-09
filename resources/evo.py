import svgwrite

points = [
    (0, 0), 
    (1, 5.0), 
    (2, 6.5),
    (4, 8.5), 
    (6, 9.5), 
    (8, 10.0), 
    (10, 10.25), 
    (20, 9.75),
    (30, 9.25), 
    (40, 9.0), 
    (50, 9.25), 
    (60, 9.75),
    (70, 10.5), 
    (74, 11.0), 
    (78, 10.6), 
    (80, 10.0),
    (82, 9.0), 
    (84, 7.0),
    (86, 2.5), 
    (86.5, 0), 
    (86, -4.0), 
    (84, -8.5),
    (82, -10.5),
    (80, -9.5),
    (44, -12.4),
    (40, -12.25),
    (30, -12.0),
    (20, -11.25),
    (10, -10.5),
    (8, -10.0),
    (6, -9.25),
    (4, -8.0),
    (2, -6.0),
    (1, -4.5)
]

def mmToPoints(mm):
    return mm * 72 / 25.4

x_scale = 1.005
y_scale = 1.015

points = list(map(lambda p: (x_scale * mmToPoints(p[0]), y_scale * -mmToPoints(p[1])), points))
# Create SVG
dwg = svgwrite.Drawing('evo_profile.svg', profile='tiny', size=(200, 100))
path_data = "M " + " L ".join(f"{x},{y}" for x, y in points) + " Z"  # Close the path with 'Z'
dwg.add(dwg.path(d=path_data, stroke='black', fill='none'))

# Save to file
dwg.save()
print("SVG saved as 'evo_profile.svg'")