var gridItems = []

// class for each new grid item to be saved in gridItems array
class GridItem {
    constructor(column, row) {
        this.column = column
        this.row = row
        this.selected = false
        this.plant = ""
    }

    //dont toggle it. explicitly set it to true or false
    set(value) {
        this.selected = value
        return this
    }

    toggle() {
        // whatever the current value of selected is,
        // set it to the opposite and return the updated object
        this.selected = !this.selected
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

    // create a 64 square grid
    for (let i = 0; i < 64; i++) {
        // check which row we're on by doing i mod 8//
        // if it returns anything other than 0 we're not at
        // the end of the row yet
        if (i > 7 && i % 8 == 0) { row++; column = 0 }

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
        let gi = `<div id="${gridId}" class="grid${currentGi.selected ? ' selected' : ''}" onClick="handleDrawGrid(${i})">${gridId}</div>`
        gridContainer.append(gi)

        if (!index) gridItems.push(currentGi)

        column++
    }
    return
}

function clearGrid() {
    gridItems = gridItems.map(gi => gi.set(false))
    handleDrawGrid()
}

$(document).ready(() => handleDrawGrid().then(() => console.log(gridItems)))