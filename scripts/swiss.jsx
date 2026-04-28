#include "fontData.jsx"
#include "knifeData.jsx"
#include "utils.jsx"

//Script 

var formFactorSelectionWindow = new Window("dialog", "Select Form Factor");
for (var key in knifeData) {
    (function (formFactorKey) {
        formFactorSelectionWindow.add("button", undefined, formFactorKey).onClick = function () {
            var formFactor = knifeData[formFactorKey];
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
                var color = colorGroup.add("dropdownlist", undefined, ["White", "Grey", "Black", "Deep Black"]);
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
    var preset = new DocumentPreset()
    preset.units = RulerUnits.Millimeters // Illustrator still uses points internally
    preset.width = mmToPoints(210)
    preset.height = mmToPoints(148)

    // Create
    var document = app.documents.addDocument("Print", preset)

    // Artboard
    var artboard = document.artboards[0]
    artboard.artboardRect = [0, 0, document.width, -document.height] // Top-Left is (0, 0), Bottom-Right is (width, -height)

    // View
    var view = document.views[0];
    view.zoom = 1.3194352817; // Fit artboard in view (100% zoom)
    view.centerPoint = [document.width / 2, -document.height / 2] // Center the view on the document

    // Colors
    var whiteSpot = createSpotColor("RDG_WHITE", [25, 25, 25, 25])
    var primerSpot = createSpotColor("RDG_PRIMER", [50, 0, 100, 10])
    var guideSpot = createSpotColor("PerfCutContour", [70, 0, 0, 25])
    var grey = createCMYKColor(0, 0, 0, 60)
    var black = createCMYKColor(0, 0, 0, 100)
    var deepBlack = createCMYKColor(74.97, 67.92, 67.05, 90.15)

    const colorMap = {
        "White": whiteSpot,
        "Grey": grey,
        "Black": black,
        "Deep Black": deepBlack,
    }

    // Linear Algebra - TODO replace this with simpler LERP
    var textCoefficients = calculateCoefficients(formFactor, formFactor.coordinates.text)
    var outlineCoefficients = calculateCoefficients(formFactor, formFactor.coordinates.outline)
    if ("crest" in formFactor.coordinates) {
        var crestCoefficients = calculateCoefficients(formFactor, formFactor.coordinates.crest)
    }
    if ("fish" in formFactor.coordinates) {
        var fishCoefficients = calculateCoefficients(formFactor, formFactor.coordinates.fish)
    }

    // Load Crest File
    var crestFile = new File("C:\\Users\\Roland\\Desktop\\Victorinox_Logo.ai")
    var fishFile = new File("C:\\Users\\Roland\\Desktop\\Fisherman_Fish.ai")

    var baseCrest = null
    var baseFish = null

    if (crestFile.exists && "crest" in formFactor.coordinates) {
        baseCrest = document.placedItems.add()
        baseCrest.file = crestFile
    }

    if (fishFile.exists && "fish" in formFactor.coordinates) {
        baseFish = document.placedItems.add()
        baseFish.file = fishFile
    }

    // Text
    for (i = 0; i < textData.length; i++) {
        for (j = 0; j < textData[i].length; j++) {
            if (textData[i][j].text === "") continue;
            var textFrame = document.textFrames.add()

            var fontName = textData[i][j].font
            var font = app.textFonts.getByName(fontData[fontName].fullName)
            textFrame.textRange.characterAttributes.textFont = font


            textFrame.contents = textData[i][j].text
            if (formFactor.inverted === true) textFrame.rotate(180)
            setTextToFontSize(textFrame, fontName)
            constrainTextWidth(textFrame)
            textFrame.position = getPosition(i, j, textCoefficients)
            positionTextCenter(textFrame)
            yNudge(textFrame, fontName)

            textFrame.textRange.characterAttributes.fillColor = colorMap[textData[i][j].color]

            if (textData[i][j].primer === true) {
                var primerText = textFrame.duplicate()
                primerText.textRange.characterAttributes.fillColor = primerSpot
                textFrame.zOrder(ZOrderMethod.BRINGTOFRONT)
            }

            horizontalGuide(getPosition(i, j, textCoefficients), getPosition(i, j, outlineCoefficients), formFactor.length)
            createOutline(getPosition(i, j, outlineCoefficients), formFactor.length, formFactor.leftRadius, formFactor.rightRadius)

            if (baseCrest && crestCoefficients) {
                var crest = baseCrest.duplicate()

                crest.width = crest.width * formFactor.crestScale
                crest.height = crest.height * formFactor.crestScale

                var pos = getPosition(i, j, crestCoefficients)

                crest.position = [
                    pos[0],
                    pos[1] + crest.height / 2
                ]

                crest.embed()
            }
            
            if (baseFish && fishCoefficients) {
                var fish = baseFish.duplicate()
                var pos = getPosition(i, j, fishCoefficients)

                fish.position = [
                    pos[0],
                    pos[1] + fish.height / 2
                ]

                fish.embed()
            }
        }
    }

    if (baseCrest) {
        baseCrest.remove()
    }
    if (baseFish) {
        baseFish.remove()
    }

    app.activeDocument.selection = null
    
    // Functions

    function createSpotColor(name, colorValues) {
        var newSpot = document.spots.add()
        newSpot.name = name
        newSpot.colorType = ColorModel.SPOT

        newSpot.color = new CMYKColor()
        newSpot.color.cyan = colorValues[0]
        newSpot.color.magenta = colorValues[1]
        newSpot.color.yellow = colorValues[2]
        newSpot.color.black = colorValues[3]

        var newSpotColor = new SpotColor()
        newSpotColor.spot = newSpot

        return newSpotColor
    }


    function setTextToFontSize(textFrame, fontName) {
        const aspectRatio = textFrame.width / textFrame.height
        textFrame.height = mmToPoints(formFactor.fontSize) * fontData[fontName].sizeFactor
        textFrame.width = textFrame.height * aspectRatio
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
        const aspectRatio = textFrame.width / textFrame.height

        if (textFrame.width > mmToPoints(formFactor.maxTextWidth)) {
            textFrame.width = mmToPoints(formFactor.maxTextWidth)
            textFrame.height = textFrame.width / aspectRatio
        }
    }

    function horizontalGuide(textPoint, guidePoint, length) {
        const x = guidePoint[0]
        const y = textPoint[1]
        const startPoint = [x, y]
        const endPoint = [startPoint[0] + mmToPoints(length), y]
        const line = document.pathItems.add()
        line.setEntirePath([startPoint, endPoint])

        line.stroked = true
        line.strokeWidth = 0.5
        line.strokeColor = guideSpot

        line.zOrder(ZOrderMethod.SENDTOBACK)
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

