var gridItems = []
var currentColor = "red"
var inactiveColor = "white"
var mouseDown = null;

const gridDimensions = [
    { x: 28, y: 8 },
    { x: 16, y: 9 }
]
// class for each new grid item to be saved in gridItems array
class GridItem {
    constructor(column, row) {
        this.column = column
        this.row = row
        this.selected = false
        this.plant = ""
        this.selectedColor = currentColor
    }

    setColor(value) {
        this.selectedColor = value
        return this
    }

    //dont toggle it. explicitly set it to true or false
    setSelected(value) {
        this.selected = value
        return this
    }

    toggle() {
        // whatever the current value of selected is,
        // set it to the opposite and return the updated object
        this.selected = !this.selected
        if (this.selected && this.selectedColor !== currentColor) this.setColor(currentColor)
        return this
    }
}

// draw the grid
async function handleDrawGrid(index) {
    //save the grid container to variable
    const gridContainer = $('#gridContainer')
    // empty it if theres anything in there
    gridContainer.html('')

    let row = 0;
    let column = 0;

    // create a grid
    var { x, y } = gridDimensions[0]

    // set the grid-template-columns to repeat 
    gridContainer.css("grid-template-columns", `1fr repeat(${x - 1}, 2.5rem)`)
    for (let i = 0; i < (x * y); i++) {
        // check which row we're on by doing i mod x
        // if it returns anything other than 0 we're not at
        // the end of the row yet
        if (i >= x && i % x == 0) { row++; column = 0 }

        // make a unique id for each row item
        const gridId = `${i}-${row}`

        // the first time this function is run, we call it with no index specified
        // if there is no index, create a new GridItem.
        // otherwise this function has an index and the array of griditems
        // is already created so just get that item from the array
        let currentGi = index ? gridItems[i] : new GridItem(column, row)

        // if the specified index matchs the loop number we're on,
        // toggle that item
        if (index === i) currentGi = gridItems[i].toggle()

        // create the grid square and add it to gridContainer
        let gi = `<div id="${gridId}" class="grid" style="background-color: ${currentGi.selected ? currentGi.selectedColor : inactiveColor}" onClick="handleDrawGrid(${i})" onmouseover="handleMouseOver(${i})">${gridId}</div>`
        gridContainer.append(gi)

        if (!index) gridItems.push(currentGi)

        column++
    }
    return
}

function clearGrid() {
    gridItems = gridItems.map(gi => gi.setSelected(false))
    handleDrawGrid()
}

function handleColorPalette(e) {
    e.preventDefault()
    let newColor = $('#inpCurrentColor').val()
    let currentColorDisplay = $('#currentColorDisplay')

    currentColorDisplay.css({ backgroundColor: newColor })
    currentColor = newColor
}

function handleMouseOver(index) {
    return
    console.log(index, mouseDown)
    if (mouseDown === 0) handleDrawGrid(index)
}

$(document).ready(() => {
    var currentColorDisplay = $('#currentColorDisplay')
    currentColorDisplay.css({ backgroundColor: currentColor })
    let frmColorPalette = $('#frmColorPalette')
    frmColorPalette.on('submit', handleColorPalette)
    handleDrawGrid().then(() => console.log(gridItems))

    // document.body.onmousedown = function (e) {
    //     mouseDown++;

    // }
    // document.body.onmouseup = function (e) {
    //     mouseDown--
    // }

})