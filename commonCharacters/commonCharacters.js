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

  /*
   * The reason createHash(first) is needed is because in order to maintain a
   * unique set after each reduction, you'll need to pass an initial object with
   * with the characters so far. If an empty object is passed, then of course there
   * are no other characters that will match against the empty object.
  */
  var result = args.reduce(function (acc, cur) {
    return createUniqueSet(acc, cur);
  }, createHash(first));

  for (var i = 0; i < first.length; i += 1) {
    if (result[first[i]]) {
      str += first[i];
      result[first[i]] = false;
    }
  }

  return str;
};

var createHash = function (string) {
  var result = {};
  for (var i = 0; i < string.length; i += 1) {
    result[ string[i] ] = true;
  }
  return result;
};

var createUniqueSet = function (obj, string) {
  var result = {};
  var len    = string.length;
  var i;

  for (i = 0; i < len; i += 1) {
    if (obj[ string[i] ]) {
      result[ string[i] ] = true;
    }
  }

  return result;
};