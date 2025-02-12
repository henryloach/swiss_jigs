module knife_shape() {
    // Import the knife profile SVG
    import("../resources/work_champ_profile.svg");
}

module mold() {
    mold_width = 115;  // Width of the mold block
    mold_length = 36; // Length of the mold block
    mold_height = 4.6;  // Height of the mold block
    mold_depth = 3.6;    // Depth of the knife cavity

    difference() {
        // Mold block
        cube([mold_width, mold_length, mold_height]);

        // Knife cavity
        rotate([0,0,0.8]) {
        translate([(mold_width - 111.555) / 2, -29 + mold_length / 2  , mold_height - mold_depth]) {
            linear_extrude(height = mold_depth) {
                knife_shape();
            }
        }
        rotate([0, 0, -3.460]) {
        translate([(mold_width - 111.555) / 2 + 60 , mold_length / 2 + 32 / 2 - 9 + 2.5 , mold_height - mold_depth - 1]) {
            cube([36, 9, 9]);
        }
    }
    }
    }
}

mold();