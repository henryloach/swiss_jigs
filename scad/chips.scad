jig_x = 200;
jig_y = 148.25;
jig_z = 0.5;

// disk_diameter = 45.55;
// disk_diameter = 36.55;
disk_diameter = 25.45;

mold_depth = 3.5;
wall_thickness = 2;

space_x = jig_x - 2 * wall_thickness;
space_y = jig_y - 2 * wall_thickness;

disk_radius = disk_diameter / 2;

num_columns = floor(space_x / disk_diameter);
num_rows = floor(space_y / disk_diameter);

column_spacing = space_x / num_columns;
row_spacing = space_y / num_rows;

module disk(x, y, z, radius, height) { 
    translate([x, y, z]) {    
        difference() {
            cylinder(height, radius + wall_thickness, radius + wall_thickness, $fn=200);
            cylinder(height, disk_radius, disk_radius, $fn=200);
        }
    }
}

union() {
    difference() {
        cube([jig_x, jig_y, jig_z + mold_depth]);
        
        translate([wall_thickness, wall_thickness, jig_z]) {
            cube([jig_x - 2 * wall_thickness, jig_y - 2 * wall_thickness, mold_depth]);
        }
        
        for (column = [0 : num_columns - 1]) {
            for (row = [0 : num_rows - 1]) {
                translate([
                   column * column_spacing + column_spacing / 2 + wall_thickness, 
                   row * row_spacing + row_spacing / 2 + wall_thickness,
                   jig_z / 2]) {
                   
                   #cylinder(jig_z / 2, 0.5, 0.5, $fn = 50);
                } 
            } 
        }
    }

    union() {
        for (column = [0 : num_columns - 1]) {
            for (row = [0 : num_rows - 1]) {
                disk(
                    column * column_spacing + column_spacing / 2 + wall_thickness, 
                    row * row_spacing + row_spacing / 2 + wall_thickness,
                    jig_z, 
                    disk_radius, 
                    mold_depth);
            }
        }
    }
}