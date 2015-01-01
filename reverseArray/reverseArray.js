/**
 * Given an arbitrary input array, write a function that reverses the contents
 * of the array (ie, without modifying the original array.)
 * Don't use the native Array.prototype.reverse() method.
 *
 * Extra Credit: Reverse in-place (don't use an extra array).
 *
 *
 * Here's a sample input to get you going:
 *
 *   reverseArray([1, 8, 39, null, 2, 9, 'bob'])[0] // should equal => 'bob'
 */

var reverseArray = function (array) {
  var length = array.length;
  var start  = 0;
  var end    = length - 1;
  var temp;

  while (start < end) {
    temp         = array[start];
    array[start] = array[end];
    array[end]   = temp;

    start += 1;
    end   -= 1;
  }

  return array;
};
