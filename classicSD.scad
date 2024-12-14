item_width = 14.25;
item_length = 58.75;
item_depth = 2.6;

jig_width = 148.25;
jig_length = 200;
jig_depth = 4;

mold_area_width = jig_width / 7;
mold_area_length = jig_length / 3;

difference() {
    // Jig
    cube([
        jig_width,
        jig_length,
        jig_depth
    ]);
    
    // Items
    for (j = [0:2]) {
        for (i = [0:6]) {
            translate([
                mold_area_width * i + 1/2 * (mold_area_width - item_width),
                mold_area_length * j + 1/2 * (mold_area_length - item_length),
                jig_depth - item_depth
            ]) {
            cube([
                item_width,
                item_length,
                item_depth
            ]);
            }
        }
    }
}
