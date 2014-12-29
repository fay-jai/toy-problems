/*
 *  Write a function that takes as its input a string and returns an array of
 *  arrays as shown below sorted in descending order by frequency and then by
 *  ascending order by character.
 *
 *
 *       :: Example ::
 *
 *  characterFrequency('mississippi') ===
 *  [
 *    ['i', 4],
 *    ['s', 4],
 *    ['p', 2],
 *    ['m', 1]
 *  ]
 *
 *       :: Gotcha ::
 *
 *  characterFrequency('miaaiaaippi') ===
 *  [
 *    ['a', 4],
 *    ['i', 4],
 *    ['p', 2],
 *    ['m', 1]
 *  ]
 *
 *
 */

// O(n*log(n)) + O(n) + O(n) => O(n*log(n))
var characterFrequency = function (string) {
  var freq   = {};
  var result = [];
  var length = string.length;
  var i, prop, temp;

  // O(n)
  for (i = 0; i < length; i += 1) {
    if (freq[string[i]] === void 0) {
      freq[string[i]] = 1;
    } else {
      freq[string[i]] += 1;
    }
  }

  // freq is an object with all the frequencies for each character
  // O(n)
  for (prop in freq) {
    result.push( [prop, freq[prop]] );
  }

  // result is an array of [character, frequency]'s
  // O(n*log(n))
  mergeSort(result);

  return result;
};

// O(n*log(n))
var mergeSort = function (array) {
  var length = array.length;

  if (length < 2) { return array; }

  var mid   = Math.floor( length / 2 );
  var left  = array.slice(0, mid);
  var right = array.slice(mid);

  left  = mergeSort(left);
  right = mergeSort(right);
  merge(array, left, right);

  return array;
};

var merge = function (array, left, right) {
  // each element in any of the arrays is an array of [character, frequency]
  var a    = 0;
  var l    = 0;
  var r    = 0;
  var aLen = array.length;
  var lLen = left.length;
  var rLen = right.length;

  while (l < lLen && r < rLen) {
    if (left[l][1] < right[r][1]) {
      // descending order
      array[a] = right[r];
      a += 1;
      r += 1;
    } else if (left[l][1] > right[r][1]) {
      array[a] = left[l];
      a += 1;
      l += 1;
    } else {
      // when the frequencies are equal
      if ( getCharCode(left[l][0]) < getCharCode(right[r][0]) ) {
        array[a] = left[l];
        a += 1;
        l += 1;
      } else {
        array[a] = right[r];
        a += 1;
        r += 1;
      }
    }
  }

  // by the time the above while loop terminates, either left or right arrays
  // is still not exhausted
  while (l < lLen) {
    array[a] = left[l];
    a += 1;
    l += 1;
  }

  while (r < rLen) {
    array[a] = right[r];
    a += 1;
    r += 1;
  }
};

var getCharCode = function (character) {
  return String.prototype.charCodeAt.call(character);
};