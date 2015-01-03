/* Write a function that finds the largest possible product of any three numbers
 * from an array.
 *
 * Extra credit: Make your function handle negative numbers.
 */

var largestProductOfThree = function (array) {
  // Time Complexity: O(n^3)

  var result = [];
  var len    = array.length;
  var first, second, third;
  var i, j, k;

  for (i = 0; i < len; i += 1) {
    first = array[i];
    for (j = i + 1; j < len; j += 1) {
      second = array[j];
      for (k = j + 1; k < len; k += 1) {
        third = array[k];

        result.push( first * second * third );
      }
    }
  }

  return Math.max.apply(null, result);
};