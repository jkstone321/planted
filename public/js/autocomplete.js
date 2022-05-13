let plantNames = [];

$(document).ready(async function () {
  const plantNamesData = await fetch('/api/plants/name', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  plantNames = await plantNamesData.json();

  jQuery.fn.extend({
    propAttr: $.fn.prop || $.fn.attr,
  });
  $('#myInput').autocomplete({
    source: plantNames,
    maxShowItems: 10,
  });
});
