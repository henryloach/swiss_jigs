var doc = app.activeDocument

guidePink = new CMYKColor()
guidePink.cyan = 0
guidePink.magenta = 100
guidePink.yellow = 0
guidePink.black = 0 

const testTextList = [
    { text: "Merry Christmas", font: "TimesNewRomanPSMT" },
    { text: "Happy Birthday", font: "ArialMT" },
    { text: "Test", font: "MyriadPro-Regular" },
    { text: "ABC", font: "TimesNewRomanPSMT" },
    { text: "Really Long Message Text", font: "MyriadPro-Regular" },
    { text: "Merry Christmas", font: "TimesNewRomanPSMT" }
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
    maxTextWidth : mmToPts(45)
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
    maxTextWidth : mmToPts(40)
}

const nailClip = {
    itemLength : mmToPts(65.15),
    itemWidth : mmToPts(16.15),
    itemRadius : mmToPts(8),
    crestSizeX : mmToPts(9),
    crestOffsetX : mmToPts(15.54),
    insertX : mmToPts(61.84),
    jigLength : mmToPts(148.25),
    jigWidth : mmToPts(148.25),
    jigRows : 7,
    jigColumns : 2,
    jigOffsetX : 0.0,
    jigOffsetY : 0.0,
    maxTextWidth : mmToPts(30)
}

function mmToPts(mm) {
    return mm * 72 / 25.4
}

function ptsToMm(pts) {
    return pts * 25.4 / 72
}

const bedOffsetX = mmToPts(0.5)
const bedOffsetY = mmToPts(2.25)

const activeItem = nailClip

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

// Derived values

const crestSizeY = crestSizeX * 7 / 9
const crestOffsetY = (itemWidth - crestSizeY) / 2

const spacingX = jigLength / jigColumns
const spacingY = jigWidth / jigRows

const startX = (spacingX - itemLength) / 2 + bedOffsetX + jigOffsetX
const startY = (spacingY - itemWidth) / 2 + bedOffsetY + jigOffsetY

// Loop

var textIndex = 0

for (i = 0; i < jigColumns; i++) {
    for (j = 0; j < jigRows; j++) {

        // Outline

        var mold = doc.pathItems.roundedRectangle(-startY - j * spacingY, startX + i * spacingX, itemLength, itemWidth, itemRadius, itemRadius)
        var crest = doc.pathItems.rectangle(-startY - j * spacingY - crestOffsetY, startX + i * spacingX + crestOffsetX, crestSizeX, crestSizeY)

        
        
        mold.filled = false
        mold.stroked = true
        mold.strokeWidth = 0.75
        mold.strokeColor = guidePink
        
        crest.filled = false
        crest.stroked = true
        crest.strokeWidth = 0.75
        crest.strokeColor = guidePink

        // Text

        if (textIndex < testTextList.length) {

            var textFrame = doc.textFrames.add()
    
            var textPosX = startX + i * spacingX + (crestOffsetX + crestSizeX + insertX) / 2
            var textPosY = -startY - j * spacingY - itemWidth / 2
    
            textFrame.contents = testTextList[textIndex].text
            textFrame.textRange.characterAttributes.textFont = app.textFonts.getByName(testTextList[textIndex].font)

            var aspectRatio = textFrame.width / textFrame.height

            if (textFrame.width > maxTextWidth ) textFrame.width = mmToPts(22)

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

