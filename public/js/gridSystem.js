var gridItems = []
var currentColor = "DarkBlue"
var inactiveColor = "white"
var mouseDown = null;
var gridSquareSize = '1rem'
var lockedColors = []

const iconButton = $('#iconButton')
const unlockedIcon = $('<i class="fas fa-lock-open"></i>')
const lockedIcon = $('<i class="fas fa-lock"></i>')

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
    var list = $('#list')
    var color_options = [];

    function listColors() {
        const pallet = [
            'AliceBlue',
            'AntiqueWhite',
            'Aqua',
            'Aquamarine',
            'Azure',
            'Beige',
            'Bisque',
            'Black',
            'BlanchedAlmond',
            'Blue',
            'BlueViolet',
            'Brown',
            'BurlyWood',
            'CadetBlue',
            'Chartreuse',
            'Chocolate',
            'Coral',
            'CornflowerBlue',
            'Cornsilk',
            'Crimson',
            'Cyan',
            'DarkBlue',
            'DarkCyan',
            'DarkGoldenRod',
            'DarkGray',
            'DarkGrey',
            'DarkGreen',
            'DarkKhaki',
            'DarkMagenta',
            'DarkOliveGreen',
            'DarkOrange',
            'DarkOrchid',
            'DarkRed',
            'DarkSalmon',
            'DarkSeaGreen',
            'DarkSlateBlue',
            'DarkSlateGray',
            'DarkSlateGrey',
            'DarkTurquoise',
            'DarkViolet',
            'DeepPink',
            'DeepSkyBlue',
            'DimGray',
            'DimGrey',
            'DodgerBlue',
            'FireBrick',
            'FloralWhite',
            'ForestGreen',
            'Fuchsia',
            'Gainsboro',
            'GhostWhite',
            'Gold',
            'GoldenRod',
            'Gray',
            'Grey',
            'Green',
            'GreenYellow',
            'HoneyDew',
            'HotPink',
            'IndianRed',
            'Indigo',
            'Ivory',
            'Khaki',
            'Lavender',
            'LavenderBlush',
            'LawnGreen',
            'LemonChiffon',
            'LightBlue',
            'LightCoral',
            'LightCyan',
            'LightGoldenRodYellow',
            'LightGray',
            'LightGrey',
            'LightGreen',
            'LightPink',
            'LightSalmon',
            'LightSeaGreen',
            'LightSkyBlue',
            'LightSlateGray',
            'LightSlateGrey',
            'LightSteelBlue',
            'LightYellow',
            'Lime',
            'LimeGreen',
            'Linen',
            'Magenta',
            'Maroon',
            'MediumAquaMarine',
            'MediumBlue',
            'MediumOrchid',
            'MediumPurple',
            'MediumSeaGreen',
            'MediumSlateBlue',
            'MediumSpringGreen',
            'MediumTurquoise',
            'MediumVioletRed',
            'MidnightBlue',
            'MintCream',
            'MistyRose',
            'Moccasin',
            'NavajoWhite',
            'Navy',
            'OldLace',
            'Olive',
            'OliveDrab',
            'Orange',
            'OrangeRed',
            'Orchid',
            'PaleGoldenRod',
            'PaleGreen',
            'PaleTurquoise',
            'PaleVioletRed',
            'PapayaWhip',
            'PeachPuff',
            'Peru',
            'Pink',
            'Plum',
            'PowderBlue',
            'Purple',
            'RebeccaPurple',
            'Red',
            'RosyBrown',
            'RoyalBlue',
            'SaddleBrown',
            'Salmon',
            'SandyBrown',
            'SeaGreen',
            'SeaShell',
            'Sienna',
            'Silver',
            'SkyBlue',
            'SlateBlue',
            'SlateGray',
            'SlateGrey',
            'Snow',
            'SpringGreen',
            'SteelBlue',
            'Tan',
            'Teal',
            'Thistle',
            'Tomato',
            'Turquoise',
            'Violet',
            'Wheat',
            // "White",
            'WhiteSmoke',
            'Yellow',
            'YellowGreen',
        ];
        //   console.log('pallet', pallet);
        for (var i = 0; i < 10; i++) {
            var newColor = pallet[Math.floor(Math.random() * 147)]
            color_options.push(newColor);
            list.append(`<li style="background-color: ${newColor}" class="dropdown-item"></li>`)
        }
        return console.log(color_options);

    }
})

