const addToList = document.getElementById('SubitBtn')
const plantList = document.getElementById("plantList");

async function userPlantsPOST(){
    const chosenPlantDataBaseRaw = await fetch('/api/users/mylist', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(chosenPlantDataBaseRaw);
      let chosenPlantDataBaseJson = await chosenPlantDataBaseRaw.json();
      console.log(chosenPlantDataBaseJson);
      let myChosenPlantsArray = chosenPlantDataBaseJson
      let myNewPlantName = document.getElementById("myInput").value
      let myNewPlant = {type:`${myNewPlantName}`, color:""};
      console.log(myNewPlant);
      myNewPlant = JSON.stringify(myNewPlant)
      console.log(myNewPlant);
      myChosenPlantsArray = myChosenPlantsArray.slice(0,-1)
      if(!myChosenPlantsArray) {
        myNewChosenPlantsArray = await myChosenPlantsArray.concat(myNewPlant+"]");
        console.log(myNewChosenPlantsArray);
      const newChosenPlantDataBaseRaw = await fetch('/api/users/mylist',{
          method:'PUT',
          headers: { 'Content-Type': 'application/json' },
          body:myNewChosenPlantsArray,
      }).catch(err => {console.log(err); alert(err.msg)})
      }else{
      myNewChosenPlantsArray = await myChosenPlantsArray.concat(","+myNewPlant+"]");
      console.log(myNewChosenPlantsArray);
    const newChosenPlantDataBaseRaw = await fetch('/api/users/mylist',{
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:myNewChosenPlantsArray,
    }).catch(err => {console.log(err); alert(err.msg)})
};
}



