plate_size_x = 80.75;
plate_size_y = 16.35;
plate_mold_depth = 1.0;

jig_size_x = 86.5;
jig_size_y = 22.3;
jig_size_z = 2.0;

plate_top_x = (jig_size_x - plate_size_x) / 2;
plate_top_y = (jig_size_y - plate_size_y) / 2;

corner_cut_size = 4;

module single_plate ( x, y, z ) {
    translate ([x,y,z]) {
        cube([
            plate_size_x, 
            plate_size_y, 
            plate_mold_depth
        ]);
    }
    
    for (i = [0:1]) {
        for (j = [0:1]) {
            translate ([
                i * plate_size_x + x - corner_cut_size / 2, 
                j * plate_size_y + y - corner_cut_size / 2, 
                z
            ]) {
                cube([corner_cut_size, corner_cut_size, plate_mold_depth]);
            }
        }
    }
    
    translate ([x + plate_size_x / 2 , y + plate_size_y / 2 ,0]) {
        cylinder(jig_size_z - plate_mold_depth, plate_size_y / 2, plate_size_y / 2);   
    }
}

difference() {
    cube([jig_size_x, jig_size_y, jig_size_z]);
    
    single_plate(plate_top_x, plate_top_y , jig_size_z - plate_mold_depth);
}