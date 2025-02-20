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
        "coordinates": {
            "text" : {
                "bottomLeft": [65.5, 135],
                "bottomRight": [162.5, 135],
                "topRight": [162.5, 17]
            },
            "outline" : {
                "bottomLeft": [8.3, 135],
                "bottomRight": [105.3, 135],
                "topRight": [105.3, 17]
            }
        },
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
        "coordinates": {
            "text" : {
                "bottomLeft": [61.1, 135.7],
                "bottomRight": [161.1, 135.8],
                "topRight": [161.634, 17.533]
            },
            "outline" : {
                "bottomLeft": [7.2, 135.7],
                "bottomRight": [107.2, 135.8],
                "topRight": [107.734, 17.533]
            }
        },
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
        "coordinates": {
            "text" : {
                "bottomLeft": [46.5, 139.5],
                "bottomRight": [119.6, 139.5],
                "topRight": [120.62, 12.76]
            },
            "outline" : {
                "bottomLeft": [5.1, 139.5],
                "bottomRight": [78.2, 139.5],
                "topRight": [79.22, 12.76]
            }
        },
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
        "coordinates": {
            "text" : {
                "bottomLeft": [42.8, 139.4],
                "bottomRight": [175.4, 139.6],
                "topRight": [175.88, 12.88]
            },
            "outline" : {
                "bottomLeft": [4.9, 139.4],
                "bottomRight": [137.5, 139.6],
                "topRight": [137.98, 12.88]
            },
        },
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
        "maxTextWidth": 64,
        "knives": [
            "Huntsman",
            "Fieldmaster",
            "Spartan",
            "Climber",
        ],
        "coordinates": {
            "text" : {
                "bottomLeft": [53.5, 133.5],
                "bottomRight": [150.5, 133.5],
                "topRight": [150.5, 15.5]
            },
            "outline" : {
                "bottomLeft": [8.3, 135],
                "bottomRight": [105.3, 135],
                "topRight": [105.3, 17]
            }
        },
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

            var textCoefficients = calculateCoefficients(formFactor, formFactor.coordinates.text)
            var outlineCoefficients = calculateCoefficients(formFactor, formFactor.coordinates.outline)

            textFrame.contents = textData[i][j].text;
            if (formFactor.inverted === true) textFrame.rotate(180);
            setTextToFontSize(textFrame, fontName);
            constrainTextWidth(textFrame);
            textFrame.position = getPosition(i, j, textCoefficients);
            positionTextCenter(textFrame);
            yNudge(textFrame, fontName);

            textFrame.textRange.characterAttributes.fillColor = colorMap[textData[i][j].color];

            if (textData[i][j].primer === true) {
                var primerText = textFrame.duplicate();
                primerText.textRange.characterAttributes.fillColor = primerSpot;
                textFrame.zOrder(ZOrderMethod.BRINGTOFRONT);
            }

            horizontalGuide(getPosition(i, j, textCoefficients), getPosition(i, j, outlineCoefficients), formFactor.length)
            createOutline(getPosition(i, j, outlineCoefficients), formFactor.length, formFactor.leftRadius, formFactor.rightRadius)

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

    function getPosition(i, j, coefficients) {
        const x = coefficients.x.row * (i + 1) + coefficients.x.column * (j + 1) + coefficients.x.constant
        const y = coefficients.y.row * (i + 1) + coefficients.y.column * (j + 1) + coefficients.y.constant
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

    function horizontalGuide(textPoint, guidePoint, length) {
        const x = guidePoint[0];
        const y = textPoint[1];
        const startPoint = [x, y];
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

function solveLinearSystem(A, B) {
    function det(a, b, c, d) { return a * d - b * c; }

    var a = A[0][0], b = A[0][1], c = A[0][2];
    var d = A[1][0], e = A[1][1], f = A[1][2];
    var g = A[2][0], h = A[2][1], i = A[2][2];

    var x1 = B[0], x2 = B[1], x3 = B[2];

    var D = a * det(e, f, h, i) - b * det(d, f, g, i) + c * det(d, e, g, h);
    if (D === 0) throw new Error("Matrix inversion failed: determinant is zero");

    var Dx = x1 * det(e, f, h, i) - b * det(x2, f, x3, i) + c * det(x2, e, x3, h);
    var Dy = a * det(x2, f, x3, i) - x1 * det(d, f, g, i) + c * det(d, x2, g, x3);
    var Dz = a * det(e, x2, h, x3) - b * det(d, x2, g, x3) + x1 * det(d, e, g, h);

    return [Dx / D, Dy / D, Dz / D];
}

function calculateCoefficients(formFactor, coordinates) {
    const x1 = coordinates.bottomLeft[0]; // Bottom Left
    const y1 = coordinates.bottomLeft[1]; // Bottom Left
    const x2 = coordinates.bottomRight[0]; // Bottom Right
    const y2 = coordinates.bottomRight[1]; // Bottom Right
    const x3 = coordinates.topRight[0]; // Top Right
    const y3 = coordinates.topRight[1]; // Top Right
    // Define known row/column indices for the given points (growing top to bottom, left to right)
    const row1 = formFactor.jigRows, col1 = 1; // Bottom Left
    const row2 = formFactor.jigRows, col2 = formFactor.jigColumns; // Bottom Right
    const row3 = 1, col3 = formFactor.jigColumns // Top Right 

    // Solve for X coefficients
    var matrixX = [
        [row1, col1, 1],
        [row2, col2, 1],
        [row3, col3, 1]
    ];
    const valuesX = [x1, x2, x3];
    const xCoeffs = solveLinearSystem(matrixX, valuesX);

    // Solve for Y coefficients
    const valuesY = [y1, y2, y3];
    const yCoeffs = solveLinearSystem(matrixX, valuesY);

    return {
        x: { row: xCoeffs[0], column: xCoeffs[1], constant: xCoeffs[2] },
        y: { row: yCoeffs[0], column: yCoeffs[1], constant: yCoeffs[2] }
    };
}