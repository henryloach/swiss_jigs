disk_diameter = 36.55;
disk_radius = disk_diameter / 2;

difference() {
    cylinder(5, disk_radius + 2, disk_radius + 2, $fn = 400);
    translate([0, 0, 0.5]) {
        cylinder(4.5, disk_radius, disk_radius, $fn = 400);
    }
}