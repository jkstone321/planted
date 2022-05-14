// class for each new grid item to be saved in gridItems array
// each instance of GridItem will be responsible for itself
class GridItem {
    constructor(column, row, index, selectedColor) {
        // this.gridId = `${index}-${row}`
        this.column = column
        this.row = row
        this.gridId = `${column}-${row}`
        this.index = index
        this.selected = false
        this.selectedColor = selectedColor ?? currentColor
        this.rgbColor = ""
        this.borderColor = 'gold'
        this.gridSquare = $(`<div id="${this.gridId}" class="grid"><span>${showCoords ? `${this.gridId}` : '&nbsp;'}</span></div>`)
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

    refresh = () => {
        // the idea was to paint the square black for a second and then replace it with the 
        // updated square, but i dont like it

        //$(`#${this.gridId}`).css({ backgroundColor: 'black' })
        // window.setTimeout(() => {
        //     this.gridSquare = $(`<div id="${this.gridId}" class="grid"><span>${showCoords ? `${this.column}-${this.row}` : '&nbsp;'}</span></div>`)
        //     this.gridSquare.css({ backgroundColor: this.selectedColor ? this.selectedColor : inactiveColor, height: `${gridSquareSize}rem`, width: `${gridSquareSize}rem` })
        //     //this.setBorderColor(colorIsLocked(this.selectedColor) ? this.selectedColor : 'gold')
        //     $(`#${this.gridId}`).replaceWith(this.gridSquare)
        // }, 50)
        this.gridSquare = $(`<div id="${this.gridId}" class="grid"><span>${showCoords ? `${this.column}-${this.row}` : '&nbsp;'}</span></div>`)
        this.gridSquare.css({ backgroundColor: this.selectedColor ? this.selectedColor : inactiveColor, height: `${gridSquareSize}rem`, width: `${gridSquareSize}rem` })
        this.gridSquare.on('click', this.toggle)
        this.gridSquare.on('mouseover', this.handleMouseOver)
        //this.setBorderColor(colorIsLocked(this.selectedColor) ? this.selectedColor : 'gold')
        $(`#${this.gridId}`).replaceWith(this.gridSquare)
    }

    updateSquare = (override) => {
        if (this.selected && this.selectedColor !== currentColor) {
            this.selectedColor = currentColor
        }
        if (!this.selected) this.selectedColor = inactiveColor
        //this.gridSquare = $(`<div id="${this.gridId}" class="grid"><span>${showCoords ? `${this.column}-${this.row}` : '&nbsp;'}</span></div>`)
        this.gridSquare.css({ backgroundColor: this.selected ? this.selectedColor : inactiveColor })
        this.setBorderColor(colorIsLocked(this.selectedColor) ? this.selectedColor : 'gold')
        //$(`#${this.gridId}`).replaceWith(this.gridSquare)


        // sometimes this gets called by setSelected() which gets passed override boolean
        // if override is true, we're trying to clear all the squares, not set an individual square on or off
        // in that case, dont save this square as if the user just clicked it.  instead
        // wait until all the squares are finished updating and then save them all at once
        // its WAAAAY faster this way!
        if (!override) handleSave()
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

        this.updateSquare(override)
        return this
    }

    // whatever the current value of selected is,
    // set it to the opposite and return the updated object
    toggle = () => this.setSelected(!this.selected)

}