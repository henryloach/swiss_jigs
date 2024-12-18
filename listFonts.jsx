var file = new File("~/Desktop/font_log.txt"); // Creates a log file on the desktop
file.open("w");
for (var i = 0; i < app.textFonts.length; i++) {
    file.writeln(app.textFonts[i].name);
}
file.close();
