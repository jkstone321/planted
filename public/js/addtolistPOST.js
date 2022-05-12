const addToList = document.getElementById('SubitBtn')
const plantList = document.getElementById("plantList");

async function userPlantsPOST() {
    const chosenPlantDataBaseRaw = await fetch('/api/users/mylist', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(chosenPlantDataBaseRaw);
    let chosenPlantDataBaseJson = await chosenPlantDataBaseRaw.json();
    console.log(chosenPlantDataBaseJson);
    let myChosenPlantsArray = JSON.parse(chosenPlantDataBaseJson)
    let myNewPlantName = document.getElementById("myInput").value
    let myNewPlant = { type: `${myNewPlantName}`, color: "" };
    console.log(myNewPlant);
    myNewPlant = JSON.stringify(myNewPlant)
    console.log(myNewPlant);
   
    if (myChosenPlantsArray.length <1 ) {
        myChosenPlantsArray = chosenPlantDataBaseJson
        myChosenPlantsArray = myChosenPlantsArray.slice(0, -1)
        myNewChosenPlantsArray = await myChosenPlantsArray.concat(myNewPlant + "]");
        console.log(myNewChosenPlantsArray);

        const newChosenPlantDataBaseRaw = await fetch('/api/users/mylist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: myNewChosenPlantsArray,
        }).catch(err => { console.log(err); alert(err.msg) })
    } else {
        myChosenPlantsArray = chosenPlantDataBaseJson
        myChosenPlantsArray = myChosenPlantsArray.slice(0, -1)
        myNewChosenPlantsArray = await myChosenPlantsArray.concat("," + myNewPlant + "]");
        console.log(myNewChosenPlantsArray);
        const newChosenPlantDataBaseRaw = await fetch('/api/users/mylist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: myNewChosenPlantsArray,
        }).catch(err => { console.log(err); alert(err.msg) })
    };

    // get error from fetch request

}



