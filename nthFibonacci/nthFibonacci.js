/**
 * A Fibonacci sequence is a list of numbers that begins with 0 and 1, and each
 * subsequent number is the sum of the previous two.
 *
 * For example, the first five Fibonacci numbers are:
 *
 *   0 1 1 2 3
 *
 * If n were 4, your function should return 3; for 5, it should return 5.
 *
 * Write a function that accepts a number, n, and returns the nth Fibonacci
 * number. Use a recursive solution to this problem; if you finish with time
 * left over, implement an iterative solution.
 *
 * example usage:
 * nthFibonacci(2); // => 1
 * nthFibonacci(3); // => 2
 * nthFibonacci(4); // => 3
 * etc...
 *
 */

// Recursive with memoization
var nthFibonacci = (function () {
  var memo = {};

  return function (n) {
    var nMinusOne, nMinusTwo, result;

    if ( n === 0 || n === 1 ) {
      if ( !memo[n] ) { memo[n] = n; }
      return memo[n];
    }

    nMinusOne = memo[n - 1] || nthFibonacci(n - 1);
    nMinusTwo = memo[n - 2] || nthFibonacci(n - 2);
    result    = nMinusOne + nMinusTwo;
    memo[n]   = result;

    return memo[n];
  };
})();

// Iterative
var nthFibonacci = function (n) {
  var previousOne, previousTwo, result;

  if (n === 1 || n === 0) {
    return n;
  }

  previousOne = 1;
  previousTwo = 0;

  for (var i = 2; i <= n; i += 1) {
    result = previousOne + previousTwo;
    previousTwo = previousOne;
    previousOne = result;
  }

  return result;
};