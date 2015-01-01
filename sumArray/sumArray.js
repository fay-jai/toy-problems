/*
 * Given an array of numbers, calculate the greatest contiguous sum of numbers in it.
 * A single array item will count as a contiguous sum.
 *
 * example 1: sumArray([1, 2, 3]); // => 6
 * example 2: sumArray([4, -1, 5]); // => 8
 * example 3: sumArray([10, -11, 11]); // 11
 */

var maxContiguousSum = function (array) {
  if ( !Array.isArray(array) ) throw new Error('Need an Array input');

  var result = [];
  var length = array.length;
  var i, j;

  if (length <= 0) return 0;

  for (i = 0; i < length; i += 1) {
    for (j = i + 1; j < length + 1; j += 1) {
      result.push( sumArray( array.slice(i, j) ) );
    }
  }

  return result.reduce(function (acc, cur) {
    return Math.max(acc, cur);
  });
};

var sumArray = function (array) {
  return array.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
};