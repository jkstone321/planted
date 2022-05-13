$(document).ready(async function () {
  let plantNames = [];
  const plantDataBaseRaw = await fetch('/api/plants', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  let plantDataBaseArray = await plantDataBaseRaw.json();
  for (let i = 0; i < plantDataBaseArray.length; i++) {
    plantNames.push(plantDataBaseArray[i].name);
  }
  $('#myInput').autocomplete({
    source: plantNames,
    maxShowItems: 10,
  });
});
