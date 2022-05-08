var gridItems = []
var currentColor = "red"
var inactiveColor = "white"
var mouseDown = null;
var gridSquareSize = '.5rem'

// change to true to show grid coordinates for the squares
var coordinatesOn = false

const gridDimensions = [
    { x: 100, y: 90 },
    { x: 16, y: 9 }
]

// draw the grid
async function handleDrawGrid() {
    //save the grid container to variable
    const gridContainer = $('#gridContainer')
    // empty it if theres anything in there
    gridContainer.html('')

    let row = 0;
    let column = 0;

    // create a grid
    var { x, y } = gridDimensions[0]

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
    handleDrawGrid()
}

// will rename this.  this is triggered when they click setColor button
function handleSetColor(e) {
    e.preventDefault()
    let newColor = $('#inpCurrentColor').val()
    let currentColorDisplay = $('#currentColorDisplay')

    currentColorDisplay.css({ backgroundColor: newColor })
    currentColor = newColor
}

$(document).ready(() => {
    var currentColorDisplay = $('#currentColorDisplay')
    currentColorDisplay.css({ backgroundColor: currentColor })
    let frmColorPalette = $('#frmColorPalette')
    frmColorPalette.on('submit', handleSetColor)
    handleDrawGrid().then(() => console.log('# of gridItems:', gridItems.length))

    document.body.onmousedown = function () {
        ++mouseDown;
    }
    document.body.onmouseup = function () {
        --mouseDown;
    }
})

