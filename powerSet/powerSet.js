/*
 * Return an array with the power set of a given string.
 *
 * Example:
 *
 * powerSet("abc")
 * -> [ '' , 'a', 'b', 'c', 'ab', 'ac', 'bc', 'abc' ]
 *
 * Note: result does need to be sorted or in any particular order, it only needs to contain
 * the correct set of values.
 */

var powerSet = function (str) {
  if (str.length === 0) return [''];
  if (str.length === 1) return [ str ];

  var result = [];
  var first  = str[0];
  var rest   = str.slice(1);
  var recur  = powerSet( rest );

  recur.forEach( function (s) {
    result.push( s );
    result.push( first + s );
  });

  result.push( first );

  return result;
};