const fontSizeFactors = {
    "GentiumBookPlus-Italic": 1.0,
    "Caveat-Regular": 1.125,
    "DancingScript-Regular": 1.0625,
    "Merriweather-Regular": 0.8125,
    "MonotypeCorsiva": 1.0,
    "Roboto-Medium": 0.75
};

const fontInHouseNames = {
    "Script": "MonotypeCorsiva",
    "Classic Script": "DancingScript-Regular",
    "Italic": "GentiumBookPlus-Italic",
    "Serif": "Merriweather-Regular",
    "Sans Serif": "Roboto-Medium",
    "Handwritten": "Caveat-Regular"
};

// Preset Items
const huntsman = {
    itemLength: mmToPts(91),
    itemWidth: mmToPts(20),
    itemRadius: mmToPts(10),
    crestSizeX: mmToPts(11),
    crestOffsetX: mmToPts(19),
    insertX: mmToPts(86),
    jigLength: mmToPts(194),
    jigWidth: mmToPts(147.5),
    jigRows: 5,
    jigColumns: 2,
    jigOffsetX: mmToPts(4.0),
    jigOffsetY: 0.0,
    maxTextWidth: mmToPts(46),
    baseTextHeight: mmToPts(8),
    correctionX: { c: 0.405591, x: 0.00515464, y: -0.00254237 },
    correctionY: { c: 0.390101, x: 0.00103093, y: -0.00338983 },
};

const classicSD = {
    itemLength: mmToPts(58.75),
    itemWidth: mmToPts(14.25),
    itemRadius: mmToPts(7),
    crestSizeX: mmToPts(9),
    crestOffsetX: mmToPts(13.5),
    insertX: mmToPts(54.7),
    jigLength: mmToPts(200),
    jigWidth: mmToPts(148.25),
    jigRows: 7,
    jigColumns: 3,
    jigOffsetX: 0.0,
    jigOffsetY: 0.0,
    maxTextWidth: mmToPts(24),
    baseTextHeight: mmToPts(7),
    correctionX: { c: 0.466468, x: -0.00524997, y: -0.00314782 },
    correctionY: { c: -0.3, x: 0.0, y: 0.0 },
};

const nailClip = {
    itemLength: mmToPts(65.15),
    itemWidth: mmToPts(16.15),
    itemRadius: mmToPts(8),
    crestSizeX: mmToPts(9),
    crestOffsetX: mmToPts(14.9),
    insertX: mmToPts(61.6),
    jigLength: mmToPts(148.25),
    jigWidth: mmToPts(148.25),
    jigRows: 7,
    jigColumns: 2,
    jigOffsetX: 0.0,
    jigOffsetY: 0.0,
    maxTextWidth: mmToPts(31),
    baseTextHeight: mmToPts(6.5),
    correctionX: { c: 0.0, x: 0.0, y: 0.0 },
    correctionY: { c: 0.0, x: 0.0, y: 0.0 },
};

// Utility functions

function mmToPts(mm) { return mm * 72 / 25.4; }
function ptsToMm(pts) { return pts * 25.4 / 72; }

// Global Values

const bedOffsetX = mmToPts(0.5)
const bedOffsetY = mmToPts(2.25)

// GUI Setup
var presetItems = { "Huntsman": huntsman, "Classic SD": classicSD, "Nail Clip": nailClip };
var selectedPreset;

var win = new Window("dialog", "Custom Illustrator Script");
win.alignChildren = "fill";

// ActiveItem Selection Dropdown
var presetGroup = win.add("group");
presetGroup.add("statictext", undefined, "Jig Type:");
var presetDropdown = presetGroup.add("dropdownlist", undefined, ["Huntsman", "Classic SD", "Nail Clip"]);
presetDropdown.selection = 0;

// Dynamic Text and Font Input
var inputPanel = win.add("panel", undefined, "Enter Text and Choose Font");
inputPanel.alignChildren = "fill";
var inputGroup = inputPanel.add("group");

var textFields = [];
var fontDropdowns = [];
addInputField();

function addInputField() {
    var group = inputPanel.add("group");
    var textField = group.add("edittext", [0, 0, 200, 20], "");
    var fontDropdown = group.add("dropdownlist", undefined, ["Script", "Classic Script", "Italic", "Serif", "Sans Serif", "Handwritten"]);
    fontDropdown.selection = 0;

    textFields.push(textField);
    fontDropdowns.push(fontDropdown);

    textField.onChanging = function () {
        if (textFields[textFields.length - 1].text !== "") addInputField();
    };

    win.layout.layout(true);
}

// Confirm Button
var buttonGroup = win.add("group");
buttonGroup.alignment = "right";
var okButton = buttonGroup.add("button", undefined, "OK", { name: "ok" });
okButton.onClick = function () {
    selectedPreset = presetItems[presetDropdown.selection.text];
    win.close();
};

win.show();

// Create a new document
const docWidth = mmToPts(210);
const docHeight = mmToPts(148);
doc = app.documents.add(null, docWidth, docHeight); // 210 mm x 148 mm canvas
doc.rulerUnits = RulerUnits.Millimeters;

var guidePink = createSpotColor("RDG_Pink", 0, 100, 0, 0);

var whiteGrey = createSpotColor("RDG_White", 25, 25, 25, 25);

// Adjust the artboard to match the GUI-like bottom-left origin
var artboard = doc.artboards[0];
artboard.artboardRect = [0, 0, docWidth, -docHeight]; // Top-Left is (0, 0), Bottom-Right is (width, -height)

// Prepare dynamic text list
var testTextList = [];
for (var i = 0; i < textFields.length; i++) {
    var text = textFields[i].text;
    var fontKey = fontDropdowns[i].selection.text;
    if (text !== "") {
        testTextList.push({ text: text, font: fontInHouseNames[fontKey] });
    }
}

const itemLength = selectedPreset.itemLength
const itemWidth = selectedPreset.itemWidth
const itemRadius = selectedPreset.itemRadius
const crestSizeX = selectedPreset.crestSizeX
const insertX = selectedPreset.insertX
const crestOffsetX = selectedPreset.crestOffsetX
const jigLength = selectedPreset.jigLength
const jigWidth = selectedPreset.jigWidth
const jigRows = selectedPreset.jigRows
const jigColumns = selectedPreset.jigColumns
const jigOffsetX = selectedPreset.jigOffsetX
const jigOffsetY = selectedPreset.jigOffsetY
const maxTextWidth = selectedPreset.maxTextWidth
const baseTextHeight = selectedPreset.baseTextHeight

const crestSizeY = crestSizeX * 7 / 9
const crestOffsetY = (itemWidth - crestSizeY) / 2

// Derived values

const spacingX = jigLength / jigColumns
const spacingY = jigWidth / jigRows

const startX = (spacingX - itemLength) / 2 + bedOffsetX + jigOffsetX
const startY = (spacingY - itemWidth) / 2 + bedOffsetY + jigOffsetY

// Draw Elements
var textIndex = 0

for (j = jigRows - 1; j >= 0; j--) {
    for (i = jigColumns - 1; i >= 0; i--) {

        // Outline

        var mold = doc.pathItems.roundedRectangle(-startY - j * spacingY, startX + i * spacingX, itemLength, itemWidth, itemRadius, itemRadius)
        mold.filled = false
        mold.stroked = true
        mold.strokeWidth = 0.75
        mold.strokeColor = guidePink.color

        // Crest

        var crest = doc.pathItems.rectangle(-startY - j * spacingY - crestOffsetY, startX + i * spacingX + crestOffsetX, crestSizeX, crestSizeY)
        crest.filled = false
        crest.stroked = true
        crest.strokeWidth = 0.75
        crest.strokeColor = guidePink.color

        // Cross

        var crossTop = [startX + i * spacingX + crestOffsetX + crestSizeX / 2, -startY - j * spacingY - itemWidth / 2 + mmToPts(2.5)]
        var crossBottom = [startX + i * spacingX + crestOffsetX + crestSizeX / 2, -startY - j * spacingY - itemWidth / 2 - mmToPts(2.5)]

        var vertical = doc.pathItems.add()
        vertical.stroked = true
        vertical.filled = false
        vertical.setEntirePath([crossTop, crossBottom])
        vertical.strokeColor = guidePink.color

        var crossLeft = [startX + i * spacingX + crestOffsetX + crestSizeX / 2 - mmToPts(2.5), -startY - j * spacingY - itemWidth / 2]
        var crossRight = [startX + i * spacingX + crestOffsetX + crestSizeX / 2 + mmToPts(2.5), -startY - j * spacingY - itemWidth / 2]

        var horizontal = doc.pathItems.add()
        horizontal.stroked = true
        horizontal.filled = false
        horizontal.setEntirePath([crossLeft, crossRight])
        horizontal.strokeColor = guidePink.color

        // Text

        if (textIndex < testTextList.length) {

            var textFrame = doc.textFrames.add()

            var textPosX = startX + i * spacingX + (crestOffsetX + crestSizeX + insertX) / 2;
            var textPosY = -startY - j * spacingY - itemWidth / 2;
            
            var tempX = textPosX + selectedPreset.correctionX.c + textPosX * selectedPreset.correctionX.x + textPosY * selectedPreset.correctionX.y; 
            var tempY = textPosY - selectedPreset.correctionY.c - textPosY * selectedPreset.correctionY.y - textPosX * selectedPreset.correctionY.x;
            
            textPosX = tempX;
            textPosY = tempY;

            textFrame.contents = testTextList[textIndex].text
            textFrame.textRange.characterAttributes.textFont = app.textFonts.getByName(testTextList[textIndex].font)
            textFrame.textRange.characterAttributes.fillColor = whiteGrey.color;

            var aspectRatio = textFrame.width / textFrame.height

            textFrame.height = baseTextHeight * fontSizeFactors[testTextList[textIndex].font]
            textFrame.width = textFrame.height * aspectRatio

            if (textFrame.width > maxTextWidth) textFrame.width = maxTextWidth
            textFrame.height = textFrame.width / aspectRatio

            textFrame.position = [textPosX, textPosY]

            textFrame.position = [
                textFrame.position[0] - textFrame.width / 2,
                textFrame.position[1] + textFrame.height / 2
            ]

            // alert(ptsToMm(textPosX) + ", " + ptsToMm(textPosY))

            textFrame.position = [textFrame.position[0], textFrame.position[1] - textFrame.height * 0.29 / 4.602]

            textIndex++
        }

    }
}

/// Function to create or retrieve a spot color by name
function createSpotColor(spotName, c, m, y, k) {
    var spot = null;

    // Check if the spots collection exists, if not create one
    if (!doc.spots) {
        doc.spots = [];
    }

    // Check if the spot color already exists
    for (var i = 0; i < doc.spots.length; i++) {
        if (doc.spots[i].name === spotName) {
            spot = doc.spots[i];
            break;
        }
    }

    // If the spot doesn't exist, create it
    if (!spot) {
        spot = doc.spots.add();
        spot.name = spotName;

        var spotColor = new CMYKColor();
        spotColor.cyan = c;
        spotColor.magenta = m;
        spotColor.yellow = y;
        spotColor.black = k;

        spot.color = spotColor;
        spot.colorType = ColorModel.SPOT;
    }

    return spot;
}
