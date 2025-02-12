import svgwrite

points = [
    (0, 0), 
    (1, 1.7), 
    (2, 2.5),
    (4, 3.2), 
    (6, 3.6), 
    (8, 4.0), 
    (10, 4.3), 
    (20, 5.3),
    (30, 5.8), 
    (40, 6.2), 
    (50, 6.3), 
    (60, 6.3),
    (70, 6.2), 
    (80, 6.1), 
    (90, 5.7), 
    (95, 5.3),
    (100, 4.5), 
    (102, 4.0),
    (104, 3.0), 
    (106, 1.5), 
    (108, -1.0), 
    (109, -2.8),
    (110, -5.5),
    (111, -12),
    (110, -19),
    (109, -20.5),
    (108, -21.5),
    (106, -22.25),
    (104, -22.45),
    (102, -22.0),
    (100, -21),
    (98, -20),
    (90, -17.25),
    (80, -16),
    (70, -17),
    (61, -18),
    (50, -16.7),
    (40, -14.25),
    (34, -14),
    (25, -14.75),
    (20, -16),
    (15, -16.4),
    (10, -15.75),
    (8, -14.8),
    (6, -13.75),
    (4, -12.0),
    (2, -9),
    (1, -7)
]

def mmToPoints(mm):
    return mm * 72 / 25.4

x_scale = 1.005
y_scale = 1.015

points = list(map(lambda p: (x_scale * mmToPoints(p[0]), y_scale * -mmToPoints(p[1])), points))
# Create SVG
dwg = svgwrite.Drawing('work_champ_profile.svg', profile='tiny', size=(200, 100))
path_data = "M " + " L ".join(f"{x},{y}" for x, y in points) + " Z"  # Close the path with 'Z'
dwg.add(dwg.path(d=path_data, stroke='black', fill='none'))

# Save to file
dwg.save()
print("SVG saved as 'work_champ_profile.svg'")