//==RIGHTCLICK MENU EVENT LISTENERS==//
//--QUERY SELECTOR ALL DOES NOT BRING BACK ARRAY OF ALL ELEMENTS, BRINGS BACK NODE LIST--//
const myChosenPlant = document.querySelectorAll(".list-group-item");
//--RIGHTCLICKMENU IS THE ACTUAL MENU THAT IS HIDDEN--//
const rightClickMenu = document.getElementById("rightClickMenu");
//--SCOPE IS NEEDED TO BE ABLE TO CLICK OUTSIDE OF THE CONTEXT MENU AND CLOSE IT--//
const scope = document.querySelector("body");


document.body.addEventListener( 'click', function ( event ) {
    if( event.target.id == 'rightClickMenu' ) {
//--FOREACH METHOD AVAILABLE TO NODELISTS, ADDS THE CALLBACK FUNCTION TO EACH ELEMENT--//
myChosenPlant.forEach(plant => {
    //==RIGHTCLICK MENU OPEN==//
    plant.addEventListener('contextmenu', (e) => {
        //--STOPS BUBBLING--//
        event.preventDefault();
        //--OPENS THE MENU BASED ON WHERE THE MOUSE IS INSIDE PLANTLIST--//
        const { clientX: mouseX, clientY: mouseY } = e;
        rightClickMenu.style.top = `${mouseY}px`;
        rightClickMenu.style.left = `${mouseX}px`;
        rightClickMenu.classList.add('visible');
    });
})
    };
  } );


document.body.addEventListener( 'click', function ( event ) {
    if( event.target.id == 'rightClickMenu' ) {
        //==CLICK AWAY MENU CLOSE==//
scope.addEventListener('click', (e) => {
    if (e.target.offsetParent != rightClickMenu) {
        rightClickMenu.classList.remove('visible');
    }
})
    }});