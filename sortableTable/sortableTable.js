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

  var $tbody = $('tbody');
  var $tr = $('tbody > tr');
  var order = false;

  $('th').each(function (thIdx, thElement) {
    $(thElement).on('click', function () {
      order = !order;

      if (order) {
        $tr.sort(function (a, b) {
          return convert(thIdx, b.children[thIdx].innerHTML) > convert(thIdx, a.children[thIdx].innerHTML);
        });
      } else {
        $tr.sort(function (a, b) {
          return convert(thIdx, b.children[thIdx].innerHTML) < convert(thIdx, a.children[thIdx].innerHTML);
        });
      }

      $.each($tr, function (index, row) {
        $tbody.append(row);
      });
    });
  });
});

