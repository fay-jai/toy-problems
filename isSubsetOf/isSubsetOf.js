/*
 * Make an array method that can return whether or not a context array is a
 * subset of an input array.  To simplify the problem, you can assume that both
 * arrays will contain only strings.
 *
 * See http://en.wikipedia.org/wiki/Subset for more on the definition of a
 * subset.
*/

/*
 * Extra credit: Make the method work for arrays that contain any value,
 * including non-strings.
*/

Array.prototype.isSubsetOf = function (array) {
  var subset    = this;
  var subsetLen = subset.length;
  var supersetLen = array.length;
  var first, found;

  // base case
  if ( subsetLen > supersetLen ) return false;
  if ( subsetLen === 0 && supersetLen >= 0 ) return true;

  // supLen is greater than or equal to subLen and supLen is greater than 0
  first = subset[0];
  found = array.indexOf( first );

  if ( found === -1 ) return false;
  return subset.slice(1).isSubsetOf( Array.prototype.concat( array.slice(0, found), array.slice(found + 1) ) );
};