/*jshint expr:true*/

/**
 * Insertion sort is another basic sorting algorithm. Insertion sort
 * iterates over an array, growing a sorted array behind the current location.
 * It takes each element from the input and finds the spot, up to the current point,
 * where that element belongs. It does this until it gets to the end of the array.
 **/

// Example usage:
// insertionSort([2, 1, 3]); // yields [1, 2, 3]

var insertionSort = function (array) {
  var length = array.length;
  var i, j, hole;

  if (length < 2) { return array; }
  for (i = 1; i < length; i += 1) {
    hole = array[i];
    j    = i;
    while (j > 0 && array[j - 1] > hole) {
      array[j] = array[j - 1];
      j -= 1;
    }
    array[j] = hole;
  }

  return array;
};
