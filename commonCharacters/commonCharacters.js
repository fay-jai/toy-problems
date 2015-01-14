/**
 * Write a function `f(a, b)` which takes two strings as arguments and returns a
 * string containing only the unique characters found in both strings, in the 
 * order that they appeared in `a`. Remember to skip spaces and characters you
 * have already encountered!
 *
 * Example: commonCharacters('acexivou', 'aegihobu')
 * Returns: 'aeiou'
 *
 * Extra credit: Extend your function to handle more than two input strings.
 */


var commonCharacters = function () {
  var args = Array.prototype.slice.call(arguments);
  if (args.length < 2) throw new Error('Require at least 2 input strings');

  var str    = '';
  var first  = args[0];

  /*
   * Key step here: keep on reducing the unique set until you get the result across
   * all strings
  */
  var result = args.reduce(function (acc, cur) {
    return createUniqueSet(acc, cur);
  });

  for (var i = 0; i < first.length; i += 1) {
    if (result[first[i]]) {
      str += first[i];
      result[first[i]] = false;
    }
  }

  return str;
};

var createUniqueSet = function (a, b) {
  var hashB  = {};
  var result = {};
  var i;

  for (i = 0; i < b.length; i += 1) {
    result[b[i]] = true;
  }

  return result;
};