plate_size_x = 80.75;
plate_size_y = 16.35;
plate_mold_depth = 1.0;
wall_thickness = 5.0;

num_rows = 8;
num_columns = 2;

jig_size_x = (plate_size_x + wall_thickness) * num_columns;
jig_size_y = (plate_size_y + wall_thickness) * num_rows;
jig_size_z = 2.0;

seperation_x = jig_size_x / num_columns;
seperation_y = jig_size_y / num_rows;

offset_x = (seperation_x - plate_size_x) / 2;
offset_y = (seperation_y - plate_size_y) / 2;

corner_cut_size = 3;

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

module crosshair (x, y) {
    line_width = 0.4;
    
        translate([
        x - line_width / 2,
        y - 5,
        plate_mold_depth
    ]) {
        cube([line_width, 10, plate_mold_depth]);
    } 
 
    #translate([
        x - 5,
        y - line_width / 2,
        plate_mold_depth
    ]) {
        cube([10, line_width, plate_mold_depth]);
    }  
}

difference() {
    cube([jig_size_x, jig_size_y, jig_size_z]);
    
    for (j = [0:num_columns - 1]) {
        for (i = [0:num_rows - 1]) {
            single_plate(
                j * seperation_x + offset_x, 
                i * seperation_y + offset_y, 
                jig_size_z - plate_mold_depth
            );
        }
    }
    
    for (i = [0:2]) {
        for (j = [0:2]) {
            crosshair(i * jig_size_x / 2, j * jig_size_y / 2);
        }
    }
}