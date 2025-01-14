item_width = 16.15;
item_length = 65.5;
item_depth = 2.9;

jig_width = 21.1785714286;
jig_length = 74.125;
jig_depth = 4;

mold_area_width = jig_width / 1;
mold_area_length = jig_length / 1;

difference() {
    // Jig
    cube([
        jig_width,
        jig_length,
        jig_depth
    ]);

    // Items
    translate([
        1/2 * (mold_area_width - item_width),
        1/2 * (mold_area_length - item_length),
        jig_depth - item_depth
    ]) {
        cube([
            item_width,
            item_length,
            item_depth
        ]);
    }
}
