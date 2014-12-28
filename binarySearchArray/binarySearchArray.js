/*
given a sorted array, find the index of an element 
using a binary search algorithm.

Test for linear vs binary by applying a data set that 
exhibits the desired characteristics.
*/

/**
 * example usage
 * var index = binarySearch([1, 2, 3, 4, 5], 3);
 * console.log(index); // [2]
**/

var binarySearch = function (array, element) {
  var length, mid, midValue, left, right, result;

  // check for allowable conditions
  if ( Array.isArray(array) && typeof element === 'number' ) {
    length   = array.length;
    mid      = Math.floor( length / 2 );
    midValue = array[mid];
    left     = array.slice(0, mid);
    right    = array.slice(mid + 1);
    result   = 0;

    if (length === 0) {
      // base condition
      return null;
      // result = null;
    } else if ( midValue === element ) {
      return mid;
      // result = mid;
    } else if ( midValue > element ) {
      return binarySearch( left, element );
      // result = binarySearch( left, element );
    } else {
      var temp = binarySearch( right, element );
      // result = temp === null ? temp : mid + temp + 1;
      return temp === null ? temp : mid + temp + 1;
    }
    // return result;
  }
};


// Space Complexity O(log n) b/c of recursive stack
var binarySearch = function (array, element) {
  var inner = function (lowerBound, upperBound) {
    var mid      = Math.floor( (lowerBound + upperBound) / 2 );
    var midValue = array[mid];

    /*
     * base condition: if the mid index is either of the bounds,
     * then if neither of the array values at the index doesn't
     * equal the value, then the value can't be found in the array
    */
    if ( mid === lowerBound || mid === upperBound ) {
      return midValue === element ? mid : null;
    } else if (midValue === element) {
      return mid;
    } else if (midValue > element) {
      return inner(lowerBound, mid);
    } else {
      return inner(mid, upperBound);
    }
  };

  // check for allowable conditions
  if ( !Array.isArray(array) ) {
    throw new Error('Need to pass in a valid Array object');
  } else if ( typeof element !== 'number' ) {
    throw new Error('Need to pass in a valid Number to find in Array');
  } else {
    return inner(0, array.length);
  }
};