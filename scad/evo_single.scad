module knife_shape() {
    // Import the knife profile SVG
    import("../resources/evo_profile.svg");
}

module mold() {
    mold_width = 90;  // Width of the mold block
    mold_length = 36; // Length of the mold block
    mold_height = 6;  // Height of the mold block
    mold_depth = 5;    // Depth of the knife cavity
    
    difference() {
        union() {
            difference() {
                // Mold block
                cube([mold_width, mold_length, mold_height]);

                // Knife cavity
                rotate([0,0,-1]) {
                    translate([(mold_width - 86.25) / 2 - 0.75, mold_length / 2 + 78 , mold_height - mold_depth]) {

                        linear_extrude(height = mold_depth) {
                            knife_shape();
                        }
                    }
                }
            }
            
            translate([0,0,0]) {
                cube([15, mold_length, mold_height - mold_depth + 0.75]);
            }
            
            translate([mold_width - 15,0,0]) {
                cube([15, mold_length, mold_height - mold_depth + 0.75]);
            }
        }
        
        translate([(mold_width - 111.555) / 2 + 57.25 , mold_length / 2 + 22.5 / 2 - 9 + 2.5 , mold_height - mold_depth - 1]) {
            cube([37, 10, 8]);
        }
               
        translate([16.25, 2, mold_height - mold_depth - 1]) {
            cube([15, 10, 8]);
        } 
    }
}

scale([0.985, 0.98, 1]) {
    mold();
}