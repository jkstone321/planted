let plantNames = [];

$(document).ready(async function () {
  const plantNamesData = await fetch('/api/plants/name', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  plantNames = await plantNamesData.json();
  //console.log(plantNames);
});

setTimeout(() => {
  //console.log(plantNames);
  jQuery.fn.extend({
    propAttr: $.fn.prop || $.fn.attr,
  });
  $('#myInput').autocomplete({
    source: plantNames,
    maxShowItems: 10,
  });
}, 100);
