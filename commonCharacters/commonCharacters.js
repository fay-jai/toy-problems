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
  if (args.length < 2) {
    throw new Error('Not enough string arguments');
  }

  var result      = '';
  var firstString = args[0];
  var arrayOfSets = [];
  var inter       = {};

  // create an array of sets for all strings in args
  args.forEach(function (string) {
    arrayOfSets.push( createSet( string ) );
  });

  // create master intersect obj
  inter = intersect.apply(null, arrayOfSets);

  // loop through string1 and if element in inter, push to result
  firstString.split('').forEach(function (character) {
    if ( inter[character] ) { result += character; }
  });

  return result;
};

var createSet = function (string) {
  var result = {};
  var arr    = string.split('');

  arr.forEach(function (character) {
    result[character] = true;
  });

  return result;
};

var intersect = function () { // assume each argument is an object
  var args  = Array.prototype.slice.call(arguments);

  var inner = function (first, arr) {
    var result, prop;
    // base case
    if ( arr.length === 0 ) { return first; }

    result = {};
    for ( prop in first ) {
      if ( arr[0][prop] ) {
        result[prop] = true;
      }
    }

    return inner( result, arr.slice(1) );
  };

  return inner( args[0], args.slice(1) );
};