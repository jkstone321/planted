var gridItems = []
var currentColor = "red"
var inactiveColor = "white"
var mouseDown = null;
var gridSquareSize = '1rem'

// change to true to show grid coordinates for the squares
var coordinatesOn = false

const gridDimensions = [
    { x: 8, y: 8 },
    { x: 16, y: 9 },
    { x: 32, y: 18 }
]

var currentGridDimensions = gridDimensions[2]


// draw the grid
async function drawGrid() {
    //save the grid container to variable
    const gridContainer = $('#gridContainer')
    // empty it if theres anything in there
    gridContainer.html('')

    let row = 0;
    let column = 0;

    // create a grid
    var { x, y } = currentGridDimensions

    // set the grid-template-columns to repeat 
    gridContainer.css("grid-template-columns", `1fr repeat(${x - 1}, ${gridSquareSize})`)
    for (let i = 0; i < (x * y); i++) {
        // check which row we're on by doing i mod x
        // if it returns anything other than 0 we're not at
        // the end of the row yet
        if (i >= x && i % x == 0) { row++; column = 0 }

        let currentGi = new GridItem(column, row, i)

        gridContainer.append(currentGi.gridSquare)

        gridItems.push(currentGi)

        column++
    }
    return
}

//loop through each grid item and clear them
function clearGrid() {
    gridItems = gridItems.map(gi => gi.setSelected(false))
}

function drawPalette() {
    const colorPalette = $('#colorPalette')
    colors.forEach((color, i) => {
        let paletteItem = $(`<div id="color${i}" style="background-color: ${color}">&nbsp;</div>`)
        paletteItem.on("click", () => { console.log(color); setColor(color) })
        colorPalette.append(paletteItem)
    })
}

function colorExists(color) {
    return colors.findIndex(c => c.toLowerCase() === color.toLowerCase())
}

// this is triggered when they click setColor button
function handleSetColor(e) {
    e.preventDefault()
    let newColor = $('#inpCurrentColor').val()

    // before we try to set the color, check if its a valid hex color,
    // or if its in the list of html colors
    if (colorExists(newColor)
        || (newColor.startsWith('#') && newColor.length === 7)
        || newColor.startsWith('#') && newColor.length === 4) { setColor(newColor) } else {
        alert('The color is invalid.')
    }
}

// handleSetColor takes the event, this one actually does the work
// if we need to set the color and we dont need to get the value from
// the form, we can use this function directly
function setColor(newColor) {
    console.log(newColor)
    let currentColorDisplay = $('#currentColorDisplay')
    currentColorDisplay.css({ backgroundColor: newColor })
    currentColor = newColor
}

$(document).ready(() => {
    var currentColorDisplay = $('#currentColorDisplay')
    currentColorDisplay.css({ backgroundColor: currentColor })
    let frmColorPicker = $('#frmColorPicker')
    frmColorPicker.on('submit', handleSetColor)
    drawGrid().then(() => console.log('# of gridItems:', gridItems.length))
    drawPalette()

    document.body.onmousedown = function () {
        ++mouseDown;
    }
    document.body.onmouseup = function () {
        --mouseDown;
    }

})

