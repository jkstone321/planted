const addToList = document.getElementById('SubitBtn')
const plantList = document.getElementById("plantList");

async function userPlantsPOST(){
    const chosenPlantDataBaseRaw = await fetch('/api/users/mylist', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      let chosenPlantDataBaseJson = await chosenPlantDataBaseRaw.json();
      let myChosenPlantsArray = chosenPlantDataBaseJson.chosen_plant
      let myNewPlantName = document.getElementById("myInput").value
      let myNewPlant = {type:`${myNewPlantName}`, color:""};
      console.log(myNewPlant);
      myNewPlant = JSON.stringify(myNewPlant)
      console.log(myChosenPlantsArray.slice(0,-1));
      myChosenPlantsArray = myChosenPlantsArray.slice(0,-1)
      myNewChosenPlantsArray = await myChosenPlantsArray.concat(","+myNewPlant+"]");
      console.log(myNewChosenPlantsArray);
    const newChosenPlantDataBaseRaw = await fetch('/api/users/mylist',{
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:myNewChosenPlantsArray,
    })
}



