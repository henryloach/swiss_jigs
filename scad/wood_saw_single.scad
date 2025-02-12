module knife_shape() {
    // Import the knife profile SVG
    import("../resources/wood_saw_profile.svg");
}

module mold() {
    mold_width = 90;  // Width of the mold block
    mold_length = 36; // Length of the mold block
    mold_height = 4.5;  // Height of the mold block
    mold_depth = 3.2;    // Depth of the knife cavity

    difference() {
        // Mold block
        cube([mold_width, mold_length, mold_height]);

        // Knife cavity
        translate([(mold_width - 84) / 2, -25.45 + mold_length / 2  , mold_height - mold_depth]) {
            linear_extrude(height = mold_depth) {
                knife_shape();
            }
        }
        
        translate([(mold_width - 84) / 2 + 41.5 , mold_length / 2 + 20.5 / 2 - 8 + 2.5 , mold_height - mold_depth - 1]) {
            cube([36, 8, 8]);
        }
    }
}

mold();
