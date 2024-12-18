module knife_shape() {
    left_radius = 0.925 * 10; // Left circle radius
    right_radius = 1.0 * 10;  // Right circle radius
    length = 84.5; // Total length in mm
    
    left_center = [left_radius, 0];
    right_center = [length - right_radius, 0];

    // Draw the knife shape
    union() {
        // Left circle
        translate([left_radius, 0]) {
            circle(left_radius);
        }
        // Right circle
        translate([length - right_radius, 0]) {
            circle(right_radius);
        }

        // Tangent lines
        polygon([
            [left_radius, left_radius],          // Top tangent, left
            [length - right_radius, right_radius], // Top tangent, right
            [length - right_radius, -right_radius], // Bottom tangent, right
            [left_radius, -left_radius]          // Bottom tangent, left
        ]);
    }
}

module mold() {
    mold_width = 90;  // Width of the mold block
    mold_length = 30; // Length of the mold block
    mold_height = 3.7;  // Height of the mold block
    mold_depth = 3.2;    // Depth of the knife cavity

    difference() {
        // Mold block
        cube([mold_width, mold_length, mold_height]);

        // Knife cavity
        translate([(mold_width - 84) / 2, (mold_length) / 2, mold_height - mold_depth]) {
            linear_extrude(height = mold_depth) {
                knife_shape();
            }
        }
    }
}

mold();
