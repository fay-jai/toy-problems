/**
 * Use jQuery to make an HTML table that is sortable by column.
 *
 * Clicking a table header should sort all the table rows
 * by the values in that column. The table should sort
 * words, integers, floats, and dates (in the form YYYY-MM-DD).
 *
 * Use the table provided in index.html.
 **/

$(function () {
  var convert = function (type, value) {
    switch (type) {
      case 0:
        return '' + value;
      case 1:
        return parseInt(value, 10);
      case 2:
        return parseFloat(value);
      case 3:
        return new Date(value);
    }
  };

  var sort = function (array) {
    return Array.prototype.sort.call(array, function (a, b) {
      return b[0] - a[0];
    });
  };

  var $tr = $('tr');

  $('th').each(function (thIdx, thElement) {
    $(thElement).on('click', function () {
      var result = [];
      var order  = [];

      for (var i = 1; i < $tr.length; i += 1) {
        result.push( [ convert(thIdx, $tr[i].children[thIdx].innerHTML), i] );
      }

      sort(result);

      result.forEach(function (array) {
        order.push( array[1] );
      });

      console.log( order );
    });
  });
});

