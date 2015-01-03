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

var largestProductOfThree = function (array) {
  // Time Complexity: O(n * log(n))

  if ( !Array.isArray(array) ) throw new Error('Must provide an Array of numbers');
  if ( array.length < 3 ) throw new Error('Array must have at least 3 numbers');

  /*
   * Array has at least 3 elements
  */

  var len = array.length;
  var sortedArray, optionA, optionB;

  // sort the array => O(n * log(n))
  sortedArray = array.sort(function (a, b) { return a - b; });

  /*
   * The largest product of three numbers can be either:
   * 1) the two most negative numbers and the most positive number (option A)
   * 2) the three most positive numbers (option B)
  */

  optionA = array[0] * array[1] * array[len - 1];
  optionB = array[len - 3] * array[len - 2] * array[len - 1];

  return Math.max( optionA , optionB );
};