// class for each new grid item to be saved in gridItems array
// each instance of GridItem will be responsible for itself
class GridItem {
    constructor(column, row, index, selectedColor) {
        this.gridId = `${index}-${row}`
        this.column = column
        this.row = row
        this.index = index
        this.selected = false
        this.selectedColor = selectedColor ?? currentColor
        this.borderColor = 'gold'
        this.gridSquare = $(`<div id="${this.gridId}" class="grid"><span>${coordinatesOn ? `${this.column}-${this.row}` : '&nbsp;'}</span></div>`)
        this.gridSquare.css({ backgroundColor: selectedColor ?? inactiveColor, height: `${gridSquareSize}rem`, width: `${gridSquareSize}rem` })
        this.gridSquare.on('click', this.toggle)
        this.gridSquare.on('mouseover', this.handleMouseOver)
    }

    // call this method to just return the data
    getGridInfo = () => {
        return { column: this.column, row: this.row, index: this.index, selected: this.selected, selectedColor: this.selectedColor }
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
        this.setBorderColor(colorIsLocked(this.selectedColor) ? this.selectedColor : 'gold')
        handleSave()
        return this
    }

    setColor = (value) => {
        this.selectedColor = value
        this.updateSquare()
        return this
    }

    setBorderColor = (value) => {
        this.gridSquare.css({
            borderColor: value
        })
        this.borderColor = value
    }

    //dont toggle it. explicitly set it to true or false
    setSelected = (value, override) => {
        if (colorIsLocked(this.selectedColor) && value === false && !override) return
        if (colorIsLocked(currentColor) && value === true && this.selectedColor !== currentColor) return
        this.selected = value
        this.updateSquare()
        return this
    }

    // whatever the current value of selected is,
    // set it to the opposite and return the updated object
    toggle = () => this.setSelected(!this.selected)

}