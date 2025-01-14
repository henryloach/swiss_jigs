module knife_shape() {
    import("knife_profile.svg");
}

jig_width = 148.25;
jig_length = 200;
jig_height = 4.5;

mold_width = 20;
mold_length = 84;

mold_depth = 3.2; 
mold_area_width = jig_width / 5;
mold_area_length = jig_length / 2;
    
difference() {
    // Jig
    cube([
        jig_length,
        jig_width,
        jig_height
    ]);

    // Items
    for (j = [0:2]) {
        for (i = [0:4]) {
            // Knife cavity
        
        translate([(j * jig_length)/2 - mold_length - 9, -25.45 + i * jig_width / 5 + 14  , jig_height - mold_depth]) {
            linear_extrude(height = mold_depth) {
                knife_shape();
            }
        }
        
        // Corkscrew
        translate([(j * jig_length)/2 - mold_length - 9 + 41.5 , i * jig_width / 5 + 20.5 / 2 - 8 + 2.5 + 14 , jig_height - mold_depth - 1]) {
            cube([36, 8, 8]);
        }
    }
}
}