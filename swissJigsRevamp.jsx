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
    "91": {
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
    },
    "84": {
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
    },
    "64": {
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
    },
    "58": {
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
    }
}

// Script 

// testData
// const textData = [
//     ["Hello", "There", "How"],
//     ["Are", "You", "Today"],
//     ["Hello", "There", "How"],
//     ["Are", "You", "Today"],
//     ["Hello", "ThereThereThereThereThereThereThereThereThereThere", "How"],
//     ["Are", "You", "Today"],
//     ["I", "Am", "Well"],
// ]

// const textData = [
//     ["Hello", "There"],
//     ["Are", "You"],
//     ["Hello", "There"],
//     ["Are", "You"],
//     ["Hello", "ThereThereThereThereThereThereThereThereThereThere"],
//     ["Are", "You"],
//     ["I", "Am"],
// ]

const textData = [
    ["Hello", "There"],
    ["Are", "You"],
    ["Hello", "There"],
    ["Are", "You"],
    ["Hello", "ThereThereThereThereThereThereThereThereThereThere"],
]

generateDocument(textData, knifeFormFactors[91]);

// Functions

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

    for (i = 0; i < textData.length; i++) {
        for (j = 0; j < textData[i].length; j++) {
            var textFrame = document.textFrames.add();
            textFrame.contents = textData[i][j];
            constrainTextWidth(textFrame);
            textFrame.position = getTextPosition(i, j);
            positionTextCenter(textFrame);
            textFrame.textRange.characterAttributes.fillColor = primerSpot;
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
}

// Function to draw the custom shape
function drawCustomShape(length, x, y, radius1, radius2) {
    // Convert dimensions to points
    length = mmToPoints(length);
    x = mmToPoints(x);
    y = mmToPoints(y);
    radius1 = mmToPoints(radius1);
    radius2 = mmToPoints(radius2);

    // Calculate the distance between the centers of the circles
    var circleDistance = length - (radius1 + radius2);

    if (circleDistance < 0) {
        throw new Error("The length is too short to fit both circles and the connecting segments.");
    }

    // Center coordinates of the first and second circles
    var circle1Center = { x: x + radius1, y: y };
    var circle2Center = { x: x + radius1 + circleDistance, y: y };

    // Create a group to hold the shapes (optional for organization)
    var group = app.activeDocument.groupItems.add();

    // Draw the first semicircle (left-facing)
    var semicircle1 = group.pathItems.ellipse(
        circle1Center.y + radius1,         // Top
        circle1Center.x - radius1,         // Left
        radius1 * 2,                       // Width
        radius1 * 2,                       // Height
        false,                             // Reversed (false = clockwise)
        true                               // Pie (true = partial arc)
    );
    semicircle1.startAngle = 90;          // Start at the top-right
    semicircle1.endAngle = -90;           // End at the top-left
    semicircle1.stroked = true;
    semicircle1.filled = false;

    // Draw the second semicircle (right-facing)
    var semicircle2 = group.pathItems.ellipse(
        circle2Center.y + radius2,         // Top
        circle2Center.x - radius2,         // Left
        radius2 * 2,                       // Width
        radius2 * 2,                       // Height
        false,                             // Reversed (false = clockwise)
        true                               // Pie (true = partial arc)
    );
    semicircle2.startAngle = -90;         // Start at the top-left
    semicircle2.endAngle = 90;            // End at the top-right
    semicircle2.stroked = true;
    semicircle2.filled = false;

    // Draw the connecting line between the semicircles
    var line1 = group.pathItems.add();
    line1.setEntirePath([
        [circle1Center.x + radius1, circle1Center.y],
        [circle2Center.x - radius2, circle2Center.y]
    ]);
    line1.stroked = true;
    line1.filled = false;
}

// Units
function mmToPoints(mm) { return mm * 72 / 25.4; }
function pointsToMm(pts) { return pts * 25.4 / 72; }

