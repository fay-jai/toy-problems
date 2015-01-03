/**
 * Implement a function that finds the longest palindrome in a given string.
 * For example, in the string "My dad is a racecar athlete", the longest
 * palindrome is "a racecar a".  Count whitespaces as valid characters. Other
 * palindromes in the above string include "dad", "ete", " dad " (including
 * whitespace on each side of dad).
 */

var longestPalindrome = function (string) {
  var result = '';
  var len = string.length;
  var i, j, word;

  for (i = 0; i < len; i += 1) {
    for (j = i + 1; j < len + 1; j += 1) {
      word = string.slice(i, j);

      if ( isPalindrome( word ) && word.length > result.length) {
        result = word;
      }
    }
  }

  return result;
};

var isPalindrome = function (string) {
  var len = string.length;

  if ( len < 2 ) return true;
  if ( string[0] !== string[len - 1] ) return false;
  return isPalindrome( string.slice(1, len - 1) );
};