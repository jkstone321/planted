// class for each new grid item to be saved in gridItems array
// each instance of GridItem will be responsible for itself
class GridItem {
    constructor(column, row, index) {
        this.gridId = `${index}-${row}`
        this.column = column
        this.row = row
        this.index = index
        this.selected = false
        this.selectedColor = currentColor
        this.gridSquare = $(`<div id="${this.gridId}" class="grid">${coordinatesOn ? gridId : '&nbsp;'}</div>`)
        this.gridSquare.css({ backgroundColor: inactiveColor, height: gridSquareSize, width: gridSquareSize })
        this.gridSquare.on('click', this.toggle)
        this.gridSquare.on('mouseover', this.handleMouseOver)
    }

    // call this method to just return the data
    getGridInfo = () => {
        return { column, row, index, selected, selectedColor } = this
    }

    // this will check if mousekey is held down while the mouse is over this square
    // it will let user paint over multiple squares at once
    handleMouseOver = () => {
        if (mouseDown) this.setSelected(true)
    }

    updateSquare = () => {
        if (this.selected && this.selectedColor !== currentColor) {
            this.selectedColor = currentColor
        }
        this.gridSquare.css({ backgroundColor: this.selected ? this.selectedColor : inactiveColor })
        return this
    }

    setColor = (value) => {
        this.selectedColor = value
        this.updateSquare()
        return this
    }

    //dont toggle it. explicitly set it to true or false
    setSelected = (value) => {
        this.selected = value
        this.updateSquare()
        return this
    }

    // whatever the current value of selected is,
    // set it to the opposite and return the updated object
    toggle = () => this.setSelected(!this.selected)

}