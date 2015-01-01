/**
  * Write a function that, given two objects, returns whether or not the two
  * are deeply equivalent--meaning the structure of the two objects is the
  * same, and so is the structure of each of their corresponding descendants.
  *
  * Examples:
  *
  * deepEquals({a:1, b: {c:3}},{a:1, b: {c:3}}); // true
  * deepEquals({a:1, b: {c:5}},{a:1, b: {c:6}}); // false
  *
  * don't worry about handling cyclical object structures.
  *
  */
var deepEquals = function (apple, orange) {
  var isAppleArray, isOrangeArray;
  var appleLen, orangeLen;
  var appleKeys, orangeKeys;
  var comparison, i, prop;

  if ( apple === orange ) return true;
  if ( isPrimitive(apple) && isPrimitive(orange) ) return apple === orange; // true or false
  if ( isPrimitive(apple) || isPrimitive(orange) ) return false;

  /*
   * At this point:
   * 1) apple and orange are not identical objects
   * 2) neither are primitives
   * 3) both are objects
  */

  isAppleArray  = Array.isArray(apple);
  isOrangeArray = Array.isArray(orange);

  if ( isAppleArray && isOrangeArray ) {
    // apple and orange are both arrays
    appleLen  = apple.length;
    orangeLen = orange.length;

    // break out early if neither arrays are the same length
    if ( appleLen !== orangeLen ) return false;

    for (i = 0; i < appleLen; i += 1) {
      comparison = deepEquals( apple[i], orange[i] );
      if ( !comparison ) return false; // break out early if any comparison is not deeply equal
    }
    // reaching here implies that all items in both arrays are equal
    return true;
  } else if ( isAppleArray || isOrangeArray ) {
    return false;
  } else {
    // apple and orange are both objects

    appleKeys  = Object.keys( apple );
    orangeKeys = Object.keys( orange );
    if ( appleKeys.length !== orangeKeys.length ) return false;

    for (prop in apple) {
      // check if prop is in orangeKeys
      if ( !orange[prop] ) {
        return false;
      } else {
        comparison = deepEquals( apple[prop], orange[prop] );
        if ( !comparison ) return false;
      }
    }
    // reaching here implies that all the items in both objects are equal
    return true;
  }
};

var isPrimitive = function (obj) {
  var type = typeof obj;
  return type === 'string'  ||
         type === 'number'  ||
         type === 'boolean' ||
         obj  === void 0    ||
         obj  === null;
};