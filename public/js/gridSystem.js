var gridItems = []
var currentColor = ""
var inactiveColor = "white"
var mouseDown = null;
var gridSquareSize = 2
var lockedColors = []
let gridDimensions = { x: 32, y: 18 }; //576 total squares
var plantData = []

const iconButton = $('#iconButton')
const unlockedIcon = $('<i class="fas fa-lock-open"></i>')
const lockedIcon = $('<i class="fas fa-lock"></i>')

// change to true to show grid coordinates for the squares
var showCoords = false

// returns grid dimensions.  right now its hard-coded but we will fix this
async function userGridPOST() {
    try {
        var gridInfoRaw = await fetch('/api/users/mygridinfo');
    }
    catch (err) {
        console.log('userGridPostErr:', err)
        return err
    }
    let gridInfoJson = await gridInfoRaw.json();
    gridDimensions = JSON.parse(gridInfoJson)

    console.log(gridDimensions.length);

    return gridDimensions?.length ? gridDimensions : { x: 32, y: 18 }
};

// saves grid coordinates
async function handleSave() {
    // the getGridInfo method just returns the coordinate data 
    // for each square so we can save to db
    let gis = gridItems.map(gi => gi.getGridInfo())

    await fetch('/api/users/mygridinfo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gis),
    })
        .catch(err => console.log(err))

}

let refreshCount = 0
let delay = 0

const refreshGrid = () => {
    // all this code would make the squares look animated when they refresh 
    // but I dont think I like how it looks.  just refresh them like normal :-(

    // if (refreshCount >= gridItems.length) {
    //     refreshCount = 0
    //     delay = 0
    //     return
    // }
    // gridItems[refreshCount].refresh()

    // //delay = delay - 500
    // refreshCount++
    // console.log(delay, refreshCount)
    // window.setTimeout(() => refreshGrid(), delay)
    gridItems.forEach(gi => gi.refresh())

}

// draw the grid
async function drawGrid(gridInfo) {
    if (gridInfo?.length < 1) gridInfo = null
    let currentGridDimensions = gridDimensions
    //save the grid container to variable
    const gridContainer = $('#gridContainer')
    // empty it if theres anything in there
    gridContainer.html('')

    var row = 0;
    var column = 0;

    // create a grid
    var { x, y } = currentGridDimensions

    // set the grid-template-columns to repeat 
    //also dynamically set the width to be the gridsquare size * the width
    gridContainer.css({
        gridTemplateColumns: `1fr repeat(${x - 1}, ${gridSquareSize}rem)`,
        width: `${gridSquareSize * x}rem`
    })

    for (let i = 0; i < (x * y); i++) {
        // check which row we're on by doing i mod x
        // if it returns anything other than 0 we're not at
        // the end of the row yet
        if (!gridInfo && i >= x && i % x == 0) { row++; column = 0 }
        let gi = gridInfo ? gridInfo[i] : null
        // console.log('gi', gridInfo)
        let currentGi = !gridInfo ? new GridItem(column, row, i) : new GridItem(gi.column, gi.row, gi.index, gi.selectedColor)

        gridContainer.append(currentGi.gridSquare)

        gridItems.push(currentGi)

        column++
    }
    return
}

//loop through each grid item and clear them
function clearGrid() {
    // for setSelected, the first property sets the value to false
    // the second property is setting override to true since setSelected
    // wont clear a square if its color has been locked
    gridItems = gridItems.map(gi => gi.setSelected(false, true))
}

function drawPalette() {
    const colorPalette = $('#colorPalette')
    colors.forEach((color, i) => {
        let paletteItem = $(`<div id="color${i}" style="background-color: ${color}">&nbsp;</div>`)
        paletteItem.on("click", () => { console.log(color); setColor(color) })
        colorPalette.append(paletteItem)
    })
}

// first use array.findIndex to see if color is in list of colors.
// if findIndex doesn;t find it, it returns -1, otherwise it returns
// the index in the array where it found it.

// next, if the index isnt -1, return true because we found it else return false
function colorExists(color) {
    return colors.findIndex(c => c.toLowerCase() === color.toLowerCase()) !== -1 ? true : false
}

// returns true if color is in the list of colors, or in a valid hex format
function colorValid(newColor) {
    if (!newColor) return false
    if (colorExists(newColor.toLowerCase())
        || (newColor.startsWith('#') && newColor.length === 7)
        || newColor.startsWith('#') && newColor.length === 4) { return true } else {
        alert('The color is invalid.')
        $('#inpCurrentColor').val("")
        return false
    }
}

// this is triggered when they click setColor button
function handleSetColor(e) {
    e.preventDefault()
    let newColor = $('#inpCurrentColor').val()
    // before we try to set the color, check if its a valid hex color,
    // or if its in the list of html colors
    if (!colorValid(newColor)) return

    setColor(newColor)
}

// handleSetColor takes the event, this one actually does the work
// if we need to set the color and we dont need to get the value from
// the form, we can use this function directly
function setColor(newColor) {
    if (!colorValid(newColor)) return
    console.log(newColor)
    let currentColorDisplay = $('#currentColorDisplay')
    currentColorDisplay.css({ backgroundColor: newColor })
    currentColor = newColor
    iconButton.html(colorIsLocked(newColor) ? lockedIcon : unlockedIcon)

}

function colorLockedToggle() {
    //if color is locked unlock it and vice/versa
    if (colorIsLocked(currentColor)) {
        setColorLocked(currentColor, false)
    } else {
        setColorLocked(currentColor, true)
    }
}

function setColorLocked(color, locked) {
    if (locked && !lockedColors.includes(color)) {
        lockedColors.push(color)
        iconButton.html(lockedIcon)
        gridItems.map(g => {
            console.log(g.selectedColor)
            //if (gi.selectedColor === color) gi.setBorderColor(color)
        })
    } else {
        lockedColors = lockedColors.filter(c => c !== currentColor)
        gridItems.map(gi => {
            if (gi.selectedColor === color) gi.setBorderColor('gold')
        })
        iconButton.html(unlockedIcon)
    }
}

const colorIsLocked = (color) => lockedColors.includes(color)

// var list = $('#list')
var color_options = [];

function listColors() {
    const pallet = colors;

    for (var i = 0; i < 10; i++) {
        var newColor = pallet[Math.floor(Math.random() * 147)]
        color_options.push(newColor);
        //list.append(`<li style="background-color: ${newColor}" class="dropdown-item"></li>`)
    }
    return console.log(color_options);
}

function handleShowCoords() {
    let showCoordsOn = $('#showCoords')[0]
    if (showCoordsOn.checked !== showCoords) {
        showCoords = showCoordsOn.checked
        localStorage.setItem('showCoords', showCoords)
        refreshGrid()
    }
}

$(document).ready(async () => {
    var currentColorDisplay = $('#currentColorDisplay')
    currentColorDisplay.css({ backgroundColor: currentColor })
    let frmColorPicker = $('#frmColorPicker')
    frmColorPicker.on('submit', handleSetColor)
    $('#showCoords')[0].checked = false
    //gridDimensions = await userGridPOST()
    console.log('dimensions', gridDimensions)

    document.body.onmousedown = () => mouseDown = true;
    document.body.onmouseup = () => mouseDown = false;

    // fixed the bug where mousedown is stuck on by turning it off
    // when mouse leaves the gridContainer
    $('#gridContainer').on("mouseleave", () => mouseDown = false)

    // ok deep breath for this one.  showcoordinates is either true or false
    // the problem is coming from localStorage its a string that says "true"
    // this means that if we tested it to see it its true, even if it says
    // "false" it will return true.  the way around it is we check if the value 
    // === true.  this will actually return a boolean of true or false
    showCoords = (localStorage.getItem('showCoords') === "true")

    // set the toggle switch to whatever was saved in lcoal storage
    $('#showCoords').prop('checked', showCoords)

    // 'grid-save-btn'
    await fetch('/api/users/mylist')
        .then(data => data.json())
        .then(data => {
            plantData = JSON.parse(data)
            console.log(plantData)
            plantData.map(({ type, color }) => addPlantToList(type, color))
        })


    await fetch('/api/users/mygridinfo')
        .then(data => data.json())
        .then(data => {
            console.log('myGridInfo', JSON.parse(data))
            drawGrid(JSON.parse(data))
        })


})


