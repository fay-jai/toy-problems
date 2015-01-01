/*
 * Find the first item that occurs an even number of times in an array.
 * Remember to handle multiple even-occurance items and return the first one. 
 * Return null if there are no even-occurance items.
*/

/*
 * example usage:
 * var onlyEven = evenOccurence([1, 7, 2, 4, 5, 6, 8, 9, 6, 4]);
 * console.log(onlyEven); //  4
*/

var evenOccurence = function (arr) {
  // Time Complexity: O(n)
  if ( !Array.isArray(arr) || arr === void 0 ) throw new Error('Need to provide an Array');
  var hash = {};
  var len  = arr.length;
  var i;

  arr.forEach(function (num) {
    hash[num] = (hash[num] ? hash[num] : 0) + 1;
  });

  for (i = 0; i < len; i += 1) {
    if ( hash[ arr[i] ] % 2 === 0 ) {
      return arr[i];
    }
  }

  return null;
};
