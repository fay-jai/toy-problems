/**
 * Write a function that, given a string, Finds the longest run of characters
 * and returns an array containing the start and end indices of that run. If
 * there are two runs of equal length, return the first one. For example:
 *
 *   longestRun("abbbcc") // [1, 3]
 *   longestRun("aabbc")  // [0, 1]
 *   longestRun("abcd")   // [0, 0]
 *
 * Try your function with long, random strings to make sure it handles large
 * inputs well.
 */

var longestRun = function (string) {
  var strLen = string.length;
  if (strLen === 0) return [];
  if (strLen === 1) return [0, 0];

  // strings of length 2 or greater
  var currentStart  = 0;
  var currentLength = 1;
  var maxStart  = 0;
  var maxLength = 1;
  var i;

  for (i = 1; i < strLen; i += 1) {
    // check if this character is the same as previous character
    if ( string[i] === string[i - 1] ) {
      currentLength += 1;
    } else {
      if (currentLength > maxLength) {
        maxStart  = currentStart;
        maxLength = currentLength;
      }
      currentStart  = i;
      currentLength = 1;
    }
  }

  return [ maxStart, maxStart + maxLength - 1 ];
};

// If you need a random string generator, use this!
// (you wont need this function for your solution but it may help with testing)
var randomString = function (len) {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for(var i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};
