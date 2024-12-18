var doc = app.activeDocument;

// Define the file to save the log
var desktopPath = Folder.desktop.fsName;
var logFile = new File(desktopPath + "/spot_colors_log.txt");

// Open the file for writing
logFile.open("w");
logFile.writeln("Spot Colors in Document:");

// Iterate through all the spots in the document
for (var i = 0; i < doc.spots.length; i++) {
    var spot = doc.spots[i];

    // Get color details
    var spotName = spot.name;
    var color = spot.color;
    var colorType = spot.colorType === ColorModel.SPOT ? "Spot" : "Other";
    var c = color.cyan || 0;
    var m = color.magenta || 0;
    var y = color.yellow || 0;
    var k = color.black || 0;

    // Write details to the log file
    logFile.writeln("Name: " + spotName);
    logFile.writeln("Type: " + colorType);
    logFile.writeln("CMYK: C=" + c + ", M=" + m + ", Y=" + y + ", K=" + k);
    logFile.writeln("----------------------");
}

// Close the file
logFile.close();

// Inform the user
alert("Spot colors logged to: " + logFile.fsName);
