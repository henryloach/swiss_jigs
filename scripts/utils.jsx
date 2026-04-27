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

function vectorAdd(v1, v2) {
    return [ 
        v1[0] + v2[0], 
        v1[1] + v2[1] 
    ]
}

function vectorSubtract(v1, v2) {
    return [
        v1[0] - v2[0],
        v1[1] - v2[1]
    ]
}

function vectorScale(v, s) {
    return [
        s * v[0], 
        s * v[1]
    ]
} 

function vectorLerp(v1, v2, t) {
    return [
        v1[0] + t * (v2[0] - v1[0]),
        v1[1] + t * (v2[1] - v1[1])
    ]
}

function calculateBasis(coordinates, nRows, nColumns) {
    const topEdge = vectorSubtract(coordinates.topRight, coordinates.topLeft)
    const leftEdge = vectorSubtract(coordinates.bottomLeft, coordinates.topLeft)

    const columnBasis = vectorScale(topEdge, 1 / ( nColumns - 1 ))
    const rowBasis = vectorScale(leftEdge, 1 / ( nRows - 1 ))

    return [columnBasis, rowBasis]
}

// function getPosition(origin, basis, row, column) {
//     const columnBasis = basis[0]
//     const rowBasis = basis[1]

//     return vectorAdd(
//         origin, 
//         vectorAdd(
//             vectorScale(columnBasis, column),
//             vectorScale(rowBasis, row) 
//         )
//     )
// }