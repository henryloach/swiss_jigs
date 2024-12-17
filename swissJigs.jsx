var doc = app.activeDocument

const guidePink = new CMYKColor()
guidePink.cyan = 0
guidePink.magenta = 100
guidePink.yellow = 0
guidePink.black = 0 

const whiteGrey = new CMYKColor()
whiteGrey.cyan = 0
whiteGrey.magenta = 0
whiteGrey.yellow = 0
whiteGrey.black = 80 

const fontSizeFactors = {
    "GentiumBookPlus-Italic" : 1.0,
    "Caveat-Regular" : 1.125,
    "DancingScript-Regular" : 1.0625,
    "Merriweather-Regular" : 0.8125,
    "Monotype-Corsiva-Regular" : 1.0,
    "Roboto-Medium" : 0.75
}

const testTextList = [
    { text: "Merry Christmas", font: "GentiumBookPlus-Italic" },
    { text: "Happy Birthday", font: "Caveat-Regular" },
    { text: "Test", font: "DancingScript-Regular" },
    { text: "ABC", font: "Merriweather-Regular" },
    { text: "Really Long Message Text", font: "GentiumBookPlus-Italic" },
    { text: "Merry Christmas", font: "Monotype-Corsiva-Regular" },
    { text: "Merry Christmas", font: "Roboto-Medium" },
    { text: "Happy Birthday", font: "Caveat-Regular" },
    { text: "Test", font: "DancingScript-Regular" },
    { text: "ABC", font: "Monotype-Corsiva-Regular" },
    { text: "Really Long Message Text", font: "Monotype-Corsiva-Regular" },
    { text: "Merry Christmas", font: "Caveat-Regular" },
    { text: "ABC", font: "Roboto-Medium" }
]

const huntsman = {
    itemLength : mmToPts(91),
    itemWidth : mmToPts(20),
    itemRadius : mmToPts(10),
    crestSizeX : mmToPts(11),
    crestOffsetX : mmToPts(19),
    insertX : mmToPts(86),
    jigLength : mmToPts(194),
    jigWidth : mmToPts(147.5),
    jigRows : 5,
    jigColumns : 2,
    jigOffsetX : mmToPts(4.0),
    jigOffsetY : 0.0,
    maxTextWidth : mmToPts(46),
    baseTextHeight : mmToPts(8)
}

const classicSD = {
    itemLength : mmToPts(58.75),
    itemWidth : mmToPts(14.25),
    itemRadius : mmToPts(7),
    crestSizeX : mmToPts(9),
    crestOffsetX : mmToPts(13.5),
    insertX : mmToPts(54.7),
    jigLength : mmToPts(200),
    jigWidth : mmToPts(148.25),
    jigRows : 7,
    jigColumns : 3,
    jigOffsetX : 0.0,
    jigOffsetY : 0.0,
    maxTextWidth : mmToPts(24),
    baseTextHeight : mmToPts(6)
}

const nailClip = {
    itemLength : mmToPts(65.15),
    itemWidth : mmToPts(16.15),
    itemRadius : mmToPts(8),
    crestSizeX : mmToPts(9),
    crestOffsetX : mmToPts(14.9),
    insertX : mmToPts(61.6),
    jigLength : mmToPts(148.25),
    jigWidth : mmToPts(148.25),
    jigRows : 7,
    jigColumns : 2,
    jigOffsetX : 0.0,
    jigOffsetY : 0.0,
    maxTextWidth : mmToPts(31),
    baseTextHeight : mmToPts(6.5)
}

function mmToPts(mm) {
    return mm * 72 / 25.4
}

function ptsToMm(pts) {
    return pts * 25.4 / 72
}

const bedOffsetX = mmToPts(0.5)
const bedOffsetY = mmToPts(2.25)

const activeItem = huntsman

// Item details

const itemLength = activeItem.itemLength
const itemWidth = activeItem.itemWidth
const itemRadius = activeItem.itemRadius
const crestSizeX = activeItem.crestSizeX
const insertX = activeItem.insertX
const crestOffsetX = activeItem.crestOffsetX
const jigLength = activeItem.jigLength
const jigWidth = activeItem.jigWidth
const jigRows = activeItem.jigRows
const jigColumns = activeItem.jigColumns
const jigOffsetX = activeItem.jigOffsetX
const jigOffsetY = activeItem.jigOffsetY
const maxTextWidth = activeItem.maxTextWidth
const baseTextHeight = activeItem.baseTextHeight

// Derived values

const crestSizeY = crestSizeX * 7 / 9
const crestOffsetY = (itemWidth - crestSizeY) / 2

const spacingX = jigLength / jigColumns
const spacingY = jigWidth / jigRows

const startX = (spacingX - itemLength) / 2 + bedOffsetX + jigOffsetX
const startY = (spacingY - itemWidth) / 2 + bedOffsetY + jigOffsetY

// Loop

var textIndex = 0

for (j = jigRows - 1; j >= 0; j--) {
    for (i = jigColumns - 1 ; i >= 0; i--) {

        // Outline

        var mold = doc.pathItems.roundedRectangle(-startY - j * spacingY, startX + i * spacingX, itemLength, itemWidth, itemRadius, itemRadius)
        mold.filled = false
        mold.stroked = true
        mold.strokeWidth = 0.75
        mold.strokeColor = guidePink
        
        // Crest

        var crest = doc.pathItems.rectangle(-startY - j * spacingY - crestOffsetY, startX + i * spacingX + crestOffsetX, crestSizeX, crestSizeY)
        crest.filled = false
        crest.stroked = true
        crest.strokeWidth = 0.75
        crest.strokeColor = guidePink

        // Cross

        var crossTop = [startX + i * spacingX + crestOffsetX + crestSizeX / 2, -startY - j * spacingY - itemWidth / 2 + mmToPts(2.5) ]
        var crossBottom = [startX + i * spacingX + crestOffsetX + crestSizeX / 2, -startY - j * spacingY - itemWidth / 2 - mmToPts(2.5) ]
        
        var vertical = doc.pathItems.add()
        vertical.stroked = true
        vertical.filled = false
        vertical.setEntirePath([crossTop, crossBottom]) 
        vertical.strokeColor = guidePink

        var crossLeft = [startX + i * spacingX + crestOffsetX + crestSizeX / 2 - mmToPts(2.5), -startY - j * spacingY - itemWidth / 2 ]
        var crossRight = [startX + i * spacingX + crestOffsetX + crestSizeX / 2 + mmToPts(2.5), -startY - j * spacingY - itemWidth / 2 ]

        var horizontal = doc.pathItems.add()
        horizontal.stroked = true
        horizontal.filled = false
        horizontal.setEntirePath([crossLeft, crossRight]) 
        horizontal.strokeColor = guidePink

        // Text

        if (textIndex < testTextList.length) {

            var textFrame = doc.textFrames.add()
    
            var textPosX = startX + i * spacingX + (crestOffsetX + crestSizeX + insertX) / 2
            var textPosY = -startY - j * spacingY - itemWidth / 2
    
            textFrame.contents = testTextList[textIndex].text
            textFrame.textRange.characterAttributes.textFont = app.textFonts.getByName(testTextList[textIndex].font)



            var aspectRatio = textFrame.width / textFrame.height

            textFrame.height =  baseTextHeight * fontSizeFactors[testTextList[textIndex].font]
            textFrame.width = textFrame.height * aspectRatio 

            if (textFrame.width > maxTextWidth ) textFrame.width = maxTextWidth
            textFrame.height = textFrame.width / aspectRatio
                
            textFrame.position =  [textPosX, textPosY]

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

