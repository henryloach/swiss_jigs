// Data

const fontData = {
    "Script": {
        // "fullName" : "MonotypeCorsiva", // work
        "fullName": "Monotype-Corsiva-Regular", // home
        "sizeFactor": 1,
        "y-nudge": 0.25 / 8.0,
    },
    "Classic Script": {
        "fullName": "DancingScript-Regular",
        "sizeFactor": 1.0625,
        "y-nudge": 0.2 / 8.0,
    },
    "Italic": {
        "fullName": "GentiumBookPlus-Italic",
        "sizeFactor": 1,
        "y-nudge": 0.9 / 8.0,
    },
    "Serif": {
        "fullName": "Merriweather-Regular",
        "sizeFactor": 0.8125,
        "y-nudge": 0.45 / 8.0,
    },
    "Sans Serif": {
        "fullName": "Roboto-Medium",
        "sizeFactor": 0.75,
        "y-nudge": 0.4 / 8.0,
    },
    "Handwritten": {
        "fullName": "Caveat-Regular",
        "sizeFactor": 1.125,
        "y-nudge": 0.3 / 8.0,
    }
}

const knifeFormFactors = {
    "91 mm - Front": {
        "inverted": false,
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
        "textOffset": 57.2,
        "jigRows": 5,
        "jigColumns": 2,
        "preset": { text: "", font: "Script", color: "White", primer: false },
    },
    "84 mm - Front": {
        "inverted": false,
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
        "textOffset": 53.9,
        "jigRows": 5,
        "jigColumns": 2,
        "preset": { text: "", font: "Script", color: "White", primer: false },
    },
    "65 mm - Front ": {
        "inverted": false,
        "length": 65,
        "leftRadius": 8.075,
        "rightRadius": 8.075,
        "fontSize": 7,
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
        "textOffset": 41.4,
        "jigRows": 7,
        "jigColumns": 2,
        "preset": { text: "", font: "Script", color: "White", primer: true },
    },
    "58 mm - Front": {
        "inverted": false,
        "length": 58.75,
        "leftRadius": 7.125,
        "rightRadius": 7.125,
        "fontSize": 6.5,
        "maxTextWidth": 26,
        "knives": [
            "Classic SD",
            "Escort",
            "Mini Champ",
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
        "textOffset": 37.9,
        "jigRows": 7,
        "jigColumns": 3,
        "preset": { text: "", font: "Script", color: "White", primer: true },
    },
    "91 mm - Back": {
        "inverted": true,
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
                constant: -43.5,
            },
            y: {
                column: 0,
                row: 29.5,
                constant: -14.0,
            }
        },
        "textOffset": 45.5,
        "jigRows": 5,
        "jigColumns": 2,
        "preset": { text: "", font: "Script", color: "White", primer: false },
    },
}

//Script 

var formFactorSelectionWindow = new Window("dialog", "Select Form Factor");
for (var key in knifeFormFactors) {
    (function (formFactorKey) {
        formFactorSelectionWindow.add("button", undefined, formFactorKey).onClick = function () {
            var formFactor = knifeFormFactors[formFactorKey];
            var textInputWindow = makeTextInputWindow(formFactor);
            formFactorSelectionWindow.hide();
            textInputWindow.show();
        };
    })(key); // EIFE
}
formFactorSelectionWindow.show();

function makeTextInputWindow(formFactor) {
    const textInputWindow = new Window("dialog", "Enter Handle Text");

    var data = createInitialData(formFactor.jigRows, formFactor.jigColumns, formFactor.preset);

    var inputPanel = textInputWindow.add("panel", undefined, "Enter Data");

    for (var i = 0; i < data.length; i++) {
        var rowGroup = inputPanel.add("group");
        rowGroup.orientation = "row";
        for (var j = 0; j < data[i].length; j++) {
            (function (i, j) {
                var knifeData = rowGroup.add("panel", undefined, "");
                knifeData.orientation = "row";

                var textGroup = knifeData.add("group");
                textGroup.orientation = "column";
                textGroup.add("statictext", undefined, "Text:");
                var text = textGroup.add("edittext", [0, 0, 150, 20], data[i][j].text);
                text.onChange = function () {
                    data[i][j].text = text.text;
                };

                var fontGroup = knifeData.add("group");
                fontGroup.orientation = "column";
                fontGroup.add("statictext", undefined, "Font:");
                var font = fontGroup.add("dropdownlist", undefined, keys(fontData));
                font.selection = data[i][j].font;
                font.onChange = function () {
                    data[i][j].font = font.selection.text;
                };

                var colorGroup = knifeData.add("group");
                colorGroup.orientation = "column";
                colorGroup.add("statictext", undefined, "Color:");
                var color = colorGroup.add("dropdownlist", undefined, ["White", "Grey", "Black"]);
                color.selection = data[i][j].color;
                color.onChange = function () {
                    data[i][j].color = color.selection.text;
                };

                var primerGroup = knifeData.add("group");
                primerGroup.orientation = "column";
                primerGroup.add("statictext", undefined, "Primer:");
                var primer = primerGroup.add("checkbox", undefined);
                primer.value = data[i][j].primer;
                primer.onClick = function () {
                    data[i][j].primer = primer.value;
                };

            })(i, j);
        }
    }

    var nav = inputPanel.add("group");
    var generateButton = nav.add("button", undefined, "Generate");
    generateButton.onClick = function () {
        generateDocument(data, formFactor);
        textInputWindow.close();
    };

    return textInputWindow;
}

function generateDocument(textData, formFactor) {

    // Preset
    var preset = new DocumentPreset();
    preset.units = RulerUnits.Millimeters; // Illustrator still uses points internally
    preset.width = mmToPoints(210);
    preset.height = mmToPoints(148);

    // Create
    var document = app.documents.addDocument("Print", preset);

    // Artboard
    var artboard = document.artboards[0];
    artboard.artboardRect = [0, 0, document.width, -document.height]; // Top-Left is (0, 0), Bottom-Right is (width, -height)

    // View
    var view = document.views[0];
    view.zoom = 1.3194352817; // Fit artboard in view (100% zoom)
    view.centerPoint = [document.width / 2, -document.height / 2]; // Center the view on the document

    // Colors
    var whiteSpot = createSpotColor("RDG_WHITE", [25, 25, 25, 25]);
    var primerSpot = createSpotColor("RDG_PRIMER", [50, 0, 100, 10]);
    var guideSpot = createSpotColor("PerfCutContour", [70, 0, 0, 25]);
    var grey = createCMYKColor(0, 0, 0, 60);
    var black = createCMYKColor(0, 0, 0, 100);

    const colorMap = {
        "White": whiteSpot,
        "Grey": grey,
        "Black": black,
    }

    // Text
    for (i = 0; i < textData.length; i++) {
        for (j = 0; j < textData[i].length; j++) {
            if (textData[i][j].text === "") continue;
            var textFrame = document.textFrames.add();

            var fontName = textData[i][j].font;
            var font = app.textFonts.getByName(fontData[fontName].fullName);
            textFrame.textRange.characterAttributes.textFont = font;

            textFrame.contents = textData[i][j].text;
            if (formFactor.inverted === true) textFrame.rotate(180);
            setTextToFontSize(textFrame, fontName);
            constrainTextWidth(textFrame);
            textFrame.position = getTextPosition(i, j);
            positionTextCenter(textFrame);
            yNudge(textFrame, fontName);

            textFrame.textRange.characterAttributes.fillColor = colorMap[textData[i][j].color];

            if (textData[i][j].primer === true) {
                var primerText = textFrame.duplicate();
                primerText.textRange.characterAttributes.fillColor = primerSpot;
                textFrame.zOrder(ZOrderMethod.BRINGTOFRONT);
            }

            horizontalGuide(getTextPosition(i, j), formFactor.length)
            createOutline(getTextPosition(i, j), formFactor.length, formFactor.leftRadius, formFactor.rightRadius)
        }
    }

    // Functions

    function createSpotColor(name, colorValues) {
        var newSpot = document.spots.add();
        newSpot.name = name;
        newSpot.colorType = ColorModel.SPOT;

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
        const startPoint = [x - mmToPoints(formFactor.textOffset), y];
        const endPoint = [startPoint[0] + mmToPoints(length), y];
        const line = document.pathItems.add();
        line.setEntirePath([startPoint, endPoint]);

        line.stroked = true;
        line.strokeWidth = 0.5;
        line.strokeColor = guideSpot;

        line.zOrder(ZOrderMethod.SENDTOBACK);
    }

    function createOutline(point, length, radiusLeft, radiusRight) {
        posX = point[0];
        posY = point[1];
        posX = posX - mmToPoints(formFactor.textOffset)
        length = mmToPoints(length);
        radiusLeft = mmToPoints(radiusLeft);
        radiusRight = mmToPoints(radiusRight);
    
        const leftCenter = posX + radiusLeft;
        const rightCenter = posX + length - radiusRight;
        const leftArc = createSemiCircle(leftCenter, posY, radiusLeft, "left");
        const rightArc = createSemiCircle(rightCenter, posY, radiusRight, "right");
    
        var outline = activeDocument.pathItems.add();
        outline.stroked = true;
        outline.filled = false;
        outline.strokeWidth = 0.5;
        outline.strokeColor = guideSpot;
    
        outline.setEntirePath(leftArc.concat(rightArc, [[posX + radiusLeft, posY - radiusLeft]]));
       
    }

    function yNudge(textFrame, fontName) {
        const nudgeValue = textFrame.height * (fontData[fontName]["y-nudge"] || 0);
        if (formFactor.inverted === true) {
            textFrame.translate(0, nudgeValue);
        }
        else {
            textFrame.translate(0, -nudgeValue);
        }
    }
}

function deepClone(obj) {
    var clone = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            // If the property is an object itself, clone it recursively
            if (typeof obj[key] === "object" && obj[key] !== null) {
                clone[key] = deepClone(obj[key]);
            } else {
                clone[key] = obj[key];
            }
        }
    }
    return clone;
}

function createInitialData(num_rows, num_columns, preset) {
    var data = []
    for (var i = 0; i < num_rows; i++) {
        var dataRow = [];
        for (var j = 0; j < num_columns; j++) {
            dataRow.push(deepClone(preset));
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

// Shapes
function createSemiCircle(centerX, centerY, radius, direction) {

    var points = [];
    var startAngle = direction === "left" ? 180 : 0;
    var steps = 18; // Number of points to smooth the curve

    for (var i = 0; i <= steps; i++) {
        var angle = startAngle + (i / steps) * 180;
        var radians = angle * Math.PI / 180;
        var x = centerX + Math.sin(radians) * radius;
        var y = centerY + Math.cos(radians) * radius;
        points.push([x, y]);
    }

    return points;
}