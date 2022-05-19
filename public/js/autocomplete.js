let plantNames = [];

$(document).ready(async function () {
  const plantNamesData = await fetch('/api/plants/name');
  plantNames = await plantNamesData.json();

  // I think the reason it doesnt work sometimes is because we have setTimeout to
  // 100 miliseconds.  it might not be back from db that fast especially on heroku.
  // after await plantNames we can be sure that it wont try to invoke autocomplete
  // until data is back from db
  jQuery.fn.extend({
    propAttr: $.fn.prop || $.fn.attr,
  });
  $('#myInput').autocomplete({
    source: plantNames,
    maxShowItems: 10,
  });
  //console.log(plantNames);
});

