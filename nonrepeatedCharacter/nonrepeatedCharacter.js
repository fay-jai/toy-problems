/**
 * Given an arbitrary input string, return the first nonrepeated character in
 * the string. For example:
 *
 *   firstNonRepeatedCharacter('ABA'); // => 'B'
 *   firstNonRepeatedCharacter('AACBDB'); // => 'C'
 */

var firstNonRepeatedCharacter = function (string) {
  // solution will have to be at least O(n) because you have to go through all characters
  // in string before you know whether any character is repeated
  if ( typeof string !== 'string' ) throw new Error('Must provide a string');
  if ( string.length <= 0 ) throw new Error('String must be at least a character long');

  var hash = {};
  var len  = string.length;
  var i;



  for (i = 0; i < len; i += 1) {
    if ( hash[ string[i] ] === void 0 ) {
      hash[ string[i] ] = true;
    } else if ( hash[ string[i] ] ) {
      hash[ string[i] ] = false;
    }
  }

  i = 0;
  while ( !hash[ string[i] ] ) {
    i += 1;
  }

  return string[i];
};
