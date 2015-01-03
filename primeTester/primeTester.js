/**
 * A prime number is a whole number that has no other divisors other than
 * itself and 1. Write a function that accepts a number and returns true if it's
 * a prime number, false if it's not.
 */

var primeTester = (function () {
  var cache = {};

  return function (n) {
    if ( typeof n !== 'number' ) return false;

    // if number is in cache, return results from cache
    if ( cache[n] ) return cache[n];

    // n is less than 1 or n is not an integer
    if ( n <= 1 || n % 1 !== 0 ) {
      cache[n] = false;
    } else {
      for (var i = 2; i < n; i += 1) {
        if (n % i === 0) {
          cache[n] = false;
          return cache[n];
        }
      }
      cache[n] = true;
    }

    return cache[n];
  };
})();

/* Extra credit: Write a function that generates a list of all prime numbers
 * in a user-specified range (inclusive). If you're not quite sure where to start,
 * check out the Sieve of Eratosthenes on Wikipedia. (And if you're feeling
 * saucy, check out the Sieve of Atkin.)
 */

var primeSieve = function (start, end) {
  // Return a list of all prime numbers >= start and <= end
  var result = [];
  var i;

  for (i = start; i <= end; i += 1) {
    if ( primeTester(i) ) {
      result.push( i );
    }
  }

  return result;
};
