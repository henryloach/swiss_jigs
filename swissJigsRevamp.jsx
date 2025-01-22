// Data

const fontData = {
    "Script": {
        // "fullName" : "MonotypeCorsiva", // work
        "fullName": "Monotype-Corsiva-Regular", // home
        "sizeFactor": 1,
    },
    "Classic Script": {
        "fullName": "DancingScript-Regular",
        "sizeFactor": 1.0625,
    },
    "Italic": {
        "fullName": "GentiumBookPlus-Italic",
        "sizeFactor": 1,
    },
    "Serif": {
        "fullName": "Merriweather-Regular",
        "sizeFactor": 0.8125,
    },
    "Sans Serif": {
        "fullName": "Roboto-Medium",
        "sizeFactor": 0.75,
    },
    "Handwritten": {
        "fullName": "Caveat-Regular",
        "sizeFactor": 1.125
    }
}

const knifeFormFactors = {
    "91 mm - Front": {
        "length": 91.0,
        "leftRadius": 9.0,
        "rightRadius": 10.0,
        "fontSize": 8.0,
        "maxTextWidth": 44,
        "knives": [
            "Huntsman",
            "Fieldmaster",
            "Spartan",
            "Climber",
        ],
        "coefficients": {
            x: {
                column: 97,
                row: 0,
                constant: -31.5,
            },
            y: {
                column: 0,
                row: 29.5,
                constant: -12.5,
            }
        },
        "jigRows": 5,
        "jigColumns": 2,
    },
    "84 mm - Front": {
        "length": 84.0,
        "leftRadius": 8.5,
        "rightRadius": 10.0,
        "fontSize": 8.0,
        "maxTextWidth": 36,
        "knives": [
            "Bantam",
            "Sportsman",
            "Waiter",
            "My First Victorinox",
        ],
        "coefficients": {
            x: {
                column: 100,
                row: -0.13333,
                constant: -38.2333,
            },
            y: {
                column: 0.1,
                row: 29.5667,
                constant: -12.2333,
            }
        },
        "jigRows": 5,
        "jigColumns": 2,
    },
    "64 mm - Front ": {
        "length": 64.15,
        "leftRadius": 8.075,
        "rightRadius": 8.075,
        "fontSize": 6.5,
        "maxTextWidth": 31,
        "knives": [
            "Nail Clip",
        ],
        "coefficients": {
            x: {
                column: 73.4,
                row: -0.12,
                constant: -26.06,
            },
            y: {
                column: 0,
                row: 21.14,
                constant: -8.38,
            }
        },
        "jigRows": 7,
        "jigColumns": 2,
    },
    "58 mm - Front": {
        "length": 58.75,
        "leftRadius": 7.125,
        "rightRadius": 7.125,
        "fontSize": 6.0,
        "maxTextWidth": 26,
        "knives": [
            "Classic SD",
            "Escort",
        ],
        "coefficients": {
            x: {
                column: 66.3,
                row: -0.08,
                constant: -22.94,
            },
            y: {
                column: 0.1,
                row: 21.12,
                constant: -8.54,
            }
        },
        "jigRows": 7,
        "jigColumns": 3,
    }
}

//Script 

var formFactorSelectionWindow = new Window("dialog", "Select Form Factor");
for (var key in knifeFormFactors) {
    (function (formFactorKey) {
        formFactorSelectionWindow.add("button", undefined, formFactorKey).onClick = function () {
            var formFactor = knifeFormFactors[formFactorKey];
            var initData = createInitialData(formFactor.jigRows, formFactor.jigColumns, false);
            var textInputWindow = makeTextInputWindow(initData, formFactor);
            formFactorSelectionWindow.hide();
            textInputWindow.show();
        };
    })(key); // Use IIFE to capture the current key
}
formFactorSelectionWindow.show();

function makeTextInputWindow(data, formFactor) {
    const textInputWindow = new Window("dialog", "Enter Handle Text");

    var inputPanel = textInputWindow.add("panel", undefined, "Enter Data");

    for (var i = 0; i < data.length; i++) {
        var rowGroup = inputPanel.add("group");
        rowGroup.orientation = "row";
        for (var j = 0; j < data[i].length; j++) {
            (function (i, j) { // Create a new scope for each iteration
                var knifeData = rowGroup.add("panel", undefined, "");
                knifeData.orientation = "row";

                knifeData.add("statictext", undefined, "Text:");
                var text = knifeData.add("edittext", [0, 0, 100, 20], data[i][j].text);
                text.onChange = function () {
                    data[i][j].text = text.text;
                };

                knifeData.add("statictext", undefined, "Font:");
                var font = knifeData.add("dropdownlist", undefined, keys(fontData));
                font.selection = 0;
                font.onChange = function () {
                    data[i][j].font = font.selection.text;
                };

                knifeData.add("statictext", undefined, "Color:");
                var color = knifeData.add("dropdownlist", undefined, ["White", "Grey", "Black"]);
                color.selection = 0;
                color.onChange = function () { // Fixed color handler
                    data[i][j].color = color.selection.text;
                };

                knifeData.add("statictext", undefined, "Primer:");
                var primer = knifeData.add("checkbox", undefined);
                primer.onClick = function () {
                    data[i][j].primer = primer.value;
                };
            })(i, j); // Pass current i and j to the IIFE
        }
    }

    var nav = inputPanel.add("group");
    var generateButton = nav.add("button", undefined, "Generate");
    generateButton.onClick = function () {
        generateDocument(data, formFactor);
        textInputWindow.close();
    };
    var backButton = nav.add("button", undefined, "Back");
    backButton.onClick = function () {
        alert("Back button clicked");
        textInputWindow.hide();
        alert("Returning to form factor selection");
        formFactorSelectionWindow.show();
    };

    return textInputWindow;
}

// Functions
// var testData = [
//     [
//         { text: "Helylo H1y23", font: "Script", color: "White", primer: true },
//         { text: "", font: "Script", color: "White", primer: false },
//     ],
//     [
//         { text: "Chyris H1y23", font: "Handwritten", color: "White", primer: false },
//         { text: "", font: "Script", color: "White", primer: false },
//     ],
//     [
//         { text: "Cyhris H1y23", font: "Classic Script", color: "White", primer: false },
//         { text: "", font: "Script", color: "White", primer: false },
//     ],
//     [
//         { text: "Chryis H1y23", font: "Sans Serif", color: "White", primer: false },
//         { text: "", font: "Script", color: "White", primer: false },
//     ],
//     [
//         { text: "Theyre H1y23", font: "Italic", color: "Black", primer: true },
//         { text: "How Are Yyou? H1y23", font: "Serif", color: "Grey", primer: true },
//     ],
// ]

function generateDocument(textData, formFactor) {
    // Create a new DocumentPreset object
    var preset = new DocumentPreset();
    preset.units = RulerUnits.Millimeters; // For reference only; Illustrator still uses points internally
    preset.width = mmToPoints(210); // Convert 210 mm to points
    preset.height = mmToPoints(148); // Convert 148 mm to points

    // Create a new document with the specified preset
    var document = app.documents.addDocument("Print", preset);

    // Adjust the artboard to match the GUI-like top-left origin
    var artboard = document.artboards[0];
    artboard.artboardRect = [0, 0, document.width, -document.height]; // Top-Left is (0, 0), Bottom-Right is (width, -height)

    // View
    var view = document.views[0];
    view.zoom = 1.3194352817; // Fit artboard in view (100% zoom)
    view.centerPoint = [document.width / 2, -document.height / 2]; // Center the view on the document

    // Create necessary spot colors
    var whiteSpot = createSpotColor("RDG_WHITE", [25, 25, 25, 25]); // Light gray for white ink visualization (CMYK: 0% Cyan, 0% Magenta, 0% Yellow, 10% Black)
    var primerSpot = createSpotColor("RDG_PRIMER", [50, 0, 100, 10]); // Greenish primer ink (CMYK: 50% Cyan, 0% Magenta, 100% Yellow, 10% Black)
    var guideSpot = createSpotColor("Guide", [70, 0, 0, 25]);
    var grey = createCMYKColor(0, 0, 0, 60);
    var black = createCMYKColor(0, 0, 0, 100);

    const colorMap = {
        "White": whiteSpot,
        "Grey": grey,
        "Black": black,
    }

    for (i = 0; i < textData.length; i++) {
        for (j = 0; j < textData[i].length; j++) {
            if (textData[i][j].text === "") continue;
            var textFrame = document.textFrames.add();

            var fontName = textData[i][j].font;
            var font = app.textFonts.getByName(fontData[fontName].fullName);
            textFrame.textRange.characterAttributes.textFont = font;

            textFrame.contents = textData[i][j].text;
            setTextToFontSize(textFrame, fontName);
            constrainTextWidth(textFrame);
            textFrame.position = getTextPosition(i, j);
            positionTextCenter(textFrame);

            textFrame.textRange.characterAttributes.fillColor = colorMap[textData[i][j].color];

            if (textData[i][j].primer === true) {
                var primerText = textFrame.duplicate();
                primerText.textRange.characterAttributes.fillColor = primerSpot;
                textFrame.zOrder(ZOrderMethod.BRINGTOFRONT);
            }

            horizontalGuide(getTextPosition(i, j), formFactor.length)
        }
    }

    // Function to create a spot color
    function createSpotColor(name, colorValues) {
        var newSpot = document.spots.add();
        newSpot.name = name;
        newSpot.colorType = ColorModel.SPOT;

        // Assign color values (CMYK in this example)
        newSpot.color = new CMYKColor();
        newSpot.color.cyan = colorValues[0];
        newSpot.color.magenta = colorValues[1];
        newSpot.color.yellow = colorValues[2];
        newSpot.color.black = colorValues[3];

        var newSpotColor = new SpotColor()
        newSpotColor.spot = newSpot;

        return newSpotColor;
    }

    function setTextToFontSize(textFrame, fontName) {
        const aspectRatio = textFrame.width / textFrame.height;
        textFrame.height = mmToPoints(formFactor.fontSize) * fontData[fontName].sizeFactor;
        textFrame.width = textFrame.height * aspectRatio;
    }

    function getTextPosition(i, j) {
        const x = formFactor.coefficients.x.row * (i + 1) + formFactor.coefficients.x.column * (j + 1) + formFactor.coefficients.x.constant
        const y = formFactor.coefficients.y.row * (i + 1) + formFactor.coefficients.y.column * (j + 1) + formFactor.coefficients.y.constant
        return [mmToPoints(x), -mmToPoints(y)]
    }

    function positionTextCenter(textFrame) {
        textFrame.position = [
            textFrame.position[0] - textFrame.width / 2,
            textFrame.position[1] + textFrame.height / 2
        ]
    }

    function constrainTextWidth(textFrame) {
        const aspectRatio = textFrame.width / textFrame.height;

        if (textFrame.width > mmToPoints(formFactor.maxTextWidth)) {
            textFrame.width = mmToPoints(formFactor.maxTextWidth);
            textFrame.height = textFrame.width / aspectRatio;
        }
    }

    function horizontalGuide(point, length) {
        const x = point[0];
        const y = point[1];
        const startPoint = [x - mmToPoints(length) / 2, y];
        const endPoint = [x + mmToPoints(length) / 2, y];
        const line = document.pathItems.add();
        line.setEntirePath([startPoint, endPoint]);

        line.stroked = true;
        line.strokeWidth = 0.5;
        line.strokeColor = guideSpot;
    }
}

function createInitialData(num_rows, num_columns, hasPrimer) {
    var data = []
    for (var i = 0; i < num_rows; i++) {
        var dataRow = [];
        for (var j = 0; j < num_columns; j++) {
            dataRow.push({ text: "init", font: "Script", color: "White", primer: hasPrimer });
        }
        data.push(dataRow);
    }
    return data;
}

function keys(object) {
    const result = [];
    for (var key in object) {
        result.push(key)
    }
    return result
}

function createCMYKColor(cyan, magenta, yellow, key) {
    var newCMYKColor = new CMYKColor();
    newCMYKColor.black = key;
    newCMYKColor.cyan = cyan;
    newCMYKColor.magenta = magenta;
    newCMYKColor.yellow = yellow;

    return newCMYKColor;
}

// Units
function mmToPoints(mm) { return mm * 72 / 25.4; }
function pointsToMm(pts) { return pts * 25.4 / 72; }

