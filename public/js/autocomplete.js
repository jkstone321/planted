$(document).ready(async function () {
  const plantNamesData = await fetch('/api/plants/name', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  let plantNames = await plantNamesData.json();
  $('#myInput').autocomplete({
    source: plantNames,
    maxShowItems: 10,
  });
});
