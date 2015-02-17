/*
 * Write a function that generates every sequence of throws a single
 * player could throw over a three-round game of rock-paper-scissors.
 *
 * Example:
 *   [
 *     [ // one possible three round game outcome
 *       'rock',    // round 1
 *       'paper',   // round 2
 *       'scissors' // round 3
 *     ],
 *     [ // next possible three round game outcome
 *       'rock',    // round 1
 *       'paper',   // round 2
 *       'rock'     // round 3
 *     ],
 *   etc...
 *   ]
 *
 * Extra credit: Make your function return answers for any number of rounds.
 *
 * Example:
 * rockPaperScissors(5); // => [['rock', 'rock', 'rock', 'rock', 'rock'], etc...]
*/

/*
 * Key Concepts: recursion, head recursion, returning a copy of array
*/
var rockPaperScissors = function (num) {
  var previous, possibleThrow;

  // establish base cases
  if (num <=  0) return [];
  if (num === 1) return [ ['rock'], ['paper'], ['scissors'] ];

  // recursive case
  possibleThrow = ['rock', 'paper', 'scissors'];
  previous      = rockPaperScissors(num - 1); // assume num - 1 solution is solved

  /*
   * Go through each array solution in previous and add each possible throw onto
   * that particular solution, and then append the new throw to result.
  */

  return previous.reduce(function (acc, soFar) {
    possibleThrow.forEach(function (hand) {
      acc.push( soFar.concat(hand) );
    });
    return acc;
  }, []);
};

/*
 * Given an array of values, produce all permutations of those values.
*/

/*
 * Key Concepts: recursion, head recursion, returning a copy of array
*/
var permutations = function (array) {
  var len = array.length;
  var first, rest, previous;

  // establish base cases
  if (len === 0) return [];
  if (len === 1) return [ array ];

  // recursive case
  first    = array.slice(0, 1);
  rest     = array.slice(1);
  previous = permutations( rest ); // assume permutations of the original array excluding the first element has been solved

  /*
   * Go through each array in previous, and for each array, concatenate the first
   * array into each index from 0 to end of that array. Append the resultant array
   * into result.
  */
  return previous.reduce(function (acc, soFar) {
    var i, temp;
    for (i = 0; i <= soFar.length; i += 1) {
      temp = Array.prototype.concat( soFar.slice(0, i), first, soFar.slice(i) );
      acc.push( temp );
    }
    return acc;
  }, []);
};

/*
 * Given an array of values, produce an array of all the combinations of those values.
*/

/*
 * Key Concepts: recursion, head recursion, returning a copy of array
*/
var combinations = function (array) {
  var len = array.length;
  var first, rest, previous, result;

  // establish base cases
  if (len === 0) return [];
  if (len === 1) return [ array ];

  // recursive case
  result   = [];
  first    = array.slice(0, 1);
  rest     = array.slice(1);
  previous = combinations( rest );

  /*
   * For each array in previous, append 2 copies: one of the array itself and
   * another of the array with the first value concatenated to it. Also append
   * the first value itself onto result.
  */

  previous.forEach(function (soFar) {
    result.push( soFar );
    result.push( first.concat(soFar) );
  });

  result.push( first );
  return result;
};

/*
 * Given a sorted array, perform binary search
*/

/*
 * Key Concepts: array indices, recursion, O(log n)
*/
var binarySearch = function (sortedArray, value) {
  var len   = sortedArray.length;
  var inner = function (start, end) {
    var mid = Math.floor( (start + end) / 2 );

    // base cases
    if (mid === start || mid === end) return sortedArray[mid] === value ? mid : null;
    if (value === sortedArray[mid])   return mid;

    // recursive case
    if (value < sortedArray[mid]) return inner(start, mid);
    return inner(mid, end);
  };

  return inner(0, len);
};

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

/*
 * Key Concepts: gain efficiency by converting to hash table O(n)
*/
var isSubsetOf = function (base, input) {
  var baseHash  = {};
  var inputHash = {};
  var prop;

  base.forEach(function (i) {
    baseHash[i] = baseHash[i] || 0;
    baseHash[i] += 1;
  });

  input.forEach(function (i) {
    inputHash[i] = inputHash[i] || 0;
    inputHash[i] += 1;
  });

  for (prop in inputHash) {
    // prop doesn't show up in baseHash
    if (!baseHash[prop]) return false;

    // the amount in inputHash > baseHash
    baseHash[prop] = baseHash[prop] - inputHash[prop];
    if (baseHash[prop] < 0) return false;
  }

  return true;
};

/*
 * In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:
 *
 * 1p piece
 * 2p piece
 * 5p piece
 * 10p piece
 * 20p piece
 * 50p piece
 * 1 euro (100p)
 * 2 euro (200p)
 *
 * It is possible to make £2 in the following way:
 *
 * 1 * £1 + 1 * 50p + 2 * 20p + 1 * 5p + 1 * 2p + 3 * 1p
 * How many different ways can £2 be made using any number of coins?
 *
 * Example usage of `makeChange`:
 *
 * There's only one way to make 1p. that's with a single 1p piece
 * makeChange(1) === 1
 *
 * There's only two ways to make 2p. that's with two, 1p pieces or with a single 2p piece
 * makeChange(2) === 2
*/

/*
 * Key Concepts: using reduce for recursion, recursion, tail recursion, creating placeholder functions
*/
var makeChange = function (amt) {
  var inner = function (amt, coins) {
    // establish base cases
    if (amt  <  0) return 0;
    if (amt === 0) return 1;

    // recursive case
    /*
     * For the given amt, find the available coins that can be used.
     * For each of those coins, return the accumulated sum of inner with the
     * amt reduced by the coin used and available coins equal to coin amt.
    */
    return coins.reduce(function (total, eachCoin) {
      return total + inner(amt - eachCoin, availableCoins(eachCoin));
    }, 0);
  };

  return inner(amt, availableCoins(amt));
};

var availableCoins = function (amt) {
  return [200, 100, 50, 20, 10, 5, 2, 1].filter(function (value) {
    return amt >= value;
  });
};

/*
 * Make an eventing system mix-in that adds .trigger() and .on() to any input
 * object.
 *
 * Example usage:
 * var obj = mixEvents({ name: 'Alice', age: 30 });
 * obj.on('ageChange', function(){ // On takes an event name and a callback function
 *    console.log('Age changed');
 * });
 * obj.age++;
 * obj.trigger('ageChange'); // This should call our callback! Should log 'age changed'.
 *
 * Caveats:
 * - mixEvents should return the original object it was passed after extending it.
 * - If we repeatedly call .on with the same event name, it should
 *   continue to call the old function as well. That is to say, we can have multiple
 *   listeners for an event.
 * - If `obj.trigger` is called with additional arguments, pass those to the
 *   listeners.
 * - It is not necessary to write a way to remove listeners.
*/

/*
 * Key Concepts: closure, arguments, caching, lexical scope
*/
var mixEvents = function (obj) {
  var eventCache = {};

  obj.on = function (ev, callback) {
    eventCache[ev] = eventCache[ev] || [];
    eventCache[ev].push( callback );
  };

  obj.trigger = function (ev) {
    var args = Array.prototype.slice.call(arguments, 1);
    eventCache[ev].forEach(function (callback) {
      callback.apply(this, args);
    });
  };

  return obj;
};

/*
 * function bind():
 *
 * example 1:
 *
 * var alice = {
 *   name: 'alice',
 *   shout: function(){
 *     alert(this.name);
 *   }
 * }
 * var boundShout = bind(alice.shout, alice);
 * boundShout(); // alerts 'alice'
 * boundShout = bind(alice.shout, {name: 'bob'});
 * boundShout(); // alerts 'bob'
 *
 * example 2:
 *
 * var func = function(a, b){ return a + b };
 * var boundFunc = bind(func, null, 'foo');
 * var result = boundFunc('bar');
 * result === 'foobar'; // true
 *
*/

/*
 * Key Concepts: arguments (not an Array), returning functions, closures, context
*/
var bind = function (fn, context) {
  var outerArgs = Array.prototype.slice.call(arguments, 2);
  return function () {
    var innerArgs = Array.prototype.slice.call(arguments);
    var allArgs   = Array.prototype.concat(outerArgs, innerArgs);
    return fn.apply(context, allArgs);
  };
};

/*
 *  Write a function that takes as its input a string and returns an array of
 *  arrays as shown below sorted in descending order by frequency and then by
 *  ascending order by character.
 *
 *
 *       :: Example ::
 *
 *  characterFrequency('mississippi') ===
 *  [
 *    ['i', 4],
 *    ['s', 4],
 *    ['p', 2],
 *    ['m', 1]
 *  ]
 *
 *       :: Gotcha ::
 *
 *  characterFrequency('miaaiaaippi') ===
 *  [
 *    ['a', 4],
 *    ['i', 4],
 *    ['p', 2],
 *    ['m', 1]
 *  ]
 *
 *
*/

/*
 * Key Concepts: quick sort O(n * log(n)), converting to hash
*/
var characterFrequency = function (string) {
  return arrayOfArray( convertToHash(string) ).sort(function (arr1, arr2) {
    if (arr1[1] > arr2[1]) {
      return -1;
    } else if (arr1[1] < arr2[1]) {
      return 1;
    } else {
      // arr1[1] === arr2[1]
      return arr1[0] < arr2[0] ? -1 : 1;
    }
  });
};

var convertToHash = function (string) {
  var hash = {};
  for (var i = 0; i < string.length; i += 1) {
    hash[ string[i] ] = hash[ string[i] ] || 0;
    hash[ string[i] ] += 1;
  }
  return hash;
};

var arrayOfArray = function (obj) {
  var result = [];
  for (var prop in obj) {
    result.push( [prop, obj[prop]] );
  }
  return result;
};

/*
 * Anagram Detection
 *
 * Write a function that accepts two parameters, a parent and a child string.
 * Determine how many times the child string - or an anagram of the of the child
 * string - appears in the parent string. There is a solution which can be done
 * in near instant time.
 *
 * f('AdnBndAndBdaBn', 'dAn') // 4 ("Adn", "ndA", "dAn", "And")
 * f('AbrAcadAbRa', 'cAda') // 2
*/

/*
 * Key Concepts: functional programming, all numbers of products of prime numbers
*/
var numAnagrams = function (base, child) {
  var childLen = child.length;
  var baseLen  = base.length;
  var count    = 0;
  var slice, start, end;

  for (start = 0; start < baseLen - childLen; start += 1) {
    for (end = start + childLen; end < baseLen; end += 1) {
      slice = base.slice(start, end);
      if (isAnagram(slice, child)) {
        count += 1;
      }
    }
  }
  return count;
};

var isAnagram = function () {
  var args   = Array.prototype.slice.call(arguments);
  var values = args.map(function (arg) {
    return convertToValue(arg);
  });

  return values.reduce(function (a, c) {
    return a && c === values[0];
  }, true);
};

var convertToValue = function (string) {
  return string.split('').reduce(function (a, c) {
    return a * characterToPrime[c];
  }, 1);
};

var characterToPrime = {
  a: 2,
  b: 3,
  c: 5,
  d: 7,
  e: 11,
  f: 13,
  g: 17,
  h: 19,
  i: 23,
  j: 29,
  k: 31,
  l: 37,
  m: 41,
  n: 43,
  o: 47,
  p: 53,
  q: 59,
  r: 61,
  s: 67,
  t: 71,
  u: 73,
  v: 79,
  w: 83,
  x: 89,
  y: 97,
  z: 101,
  A: 103,
  B: 107,
  C: 109,
  D: 113,
  E: 127,
  F: 131,
  G: 137,
  H: 139,
  I: 149,
  J: 151,
  K: 157,
  L: 163,
  M: 167,
  N: 173,
  O: 179,
  P: 181,
  Q: 191,
  R: 193,
  S: 197,
  T: 199,
  U: 211,
  V: 223,
  W: 227,
  X: 229,
  Y: 233,
  Z: 239
};

/*
 * Binary Search Tree Check
 *
 * Given a binary tree, check whether it’s a binary search tree or not.
*/

/*
 * Key Concept: recursion
*/
var isBinarySearchTree = function (node) {
  var inner = function (node, lowerbound, upperbound) {
    // base case
    if (!node) return true;

    var value = node.value;
    return (lowerbound <= value && value < upperbound) ?
      inner(node.left, min, value) && inner(node.right, value, max) :
      false;
  };

  return inner(node, Math.MIN_VALUE, Math.MAX_VALUE);
};

/*
 * Array Pair Sum
 *
 * Given an integer array, output all pairs that sum up to a specific value k.
 * Consider the fact that the same number can add up to `k` with its duplicates
 * in the array. For example the array is [1, 1, 2, 3, 4] and the desired sum
 * is 4. Should we output the pair (1, 3) twice or just once? Also do we output
 * the reverse of a pair, meaning both (3, 1) and (1, 3)? Let’s keep the output
 * as short as possible and print each pair only once. So, we will output only
 * one copy of (1, 3). Also note that we shouldn’t output (2, 2) because it’s
 * not a pair of two distinct elements.
 *
 * Example
 * f(10, [3, 4, 5, 6, 7]) // [ [6, 4], [7, 3] ]
 * f(8, [3, 4, 5, 4, 4]) // [ [3, 5], [4, 4], [4, 4], [4, 4] ]
 *
 * Source
 * http://www.ardendertat.com/2011/09/17/programming-interview-questions-1-array-pair-sum/
*/

var arrayPairSum = function (num, array) {
  var hash   = {};
  var result = [];
  var matchPairs = createAllPairs(array).filter(function (arr) {
    return arr.reduce(function (a, c) { return a + c; }, 0) === num;
  });

  matchPairs.forEach(function (pair) {
    hash[ pair ] = hash[ pair ] || hash[ pair.reverse() ] || true;
  });

  for (var prop in hash) {
    var temp = prop.split(',');
    result.push( [ parseInt(temp[0], 10), parseInt(temp[1], 10) ] );
  }
  return result;
};

var createAllPairs = function (array) {
  var len    = array.length;
  var result = [];
  var i, j;

  for (i = 0; i < len - 1; i += 1) {
    for (j = i + 1; j < len; j += 1) {
      result.push( [array[i], array[j]] );
    }
  }
  return result;
};

/*
 * Find Even Occurring Element
 *
 * Given an integer array, one element occurs even number of times and all
 * others have odd occurrences. Find the element with even occurrences.
*/

/*
 * Key Concepts: creating hashes for constant time lookup
*/
var evenOccurences = function (integerArray) {
  var len = integerArray.length;
  var hash = integerHash(integerArray);

  for (var i = 0; i < len; i += 1) {
    if (hash[ integerArray[i] ] % 2 === 0) return integerArray[i];
  }

  throw new Error('There are no even occurrences');
};

var integerHash = function (integerArray) {
  var hash = {};
  for (var i = 0; i < integerArray.length; i += 1) {
    hash[ integerArray[i] ] = hash[ integerArray[i] ] || 0;
    hash[ integerArray[i] ] += 1;
  }
  return hash;
};

/*
 * Flatten Array
 *
 * Write a function that accepts a multi dimensional array and returns a
 * flattened version.
 *
 * flatten([1, 2, [3, [4], 5, 6], 7]) // [1, 2, 3, 4, 5, 6, 7]
*/

/*
 * Key Concepts: recursion, tail recursion, concat producing new array value
*/
var flatten = function (array) {
  var len = array.length;
  var first, rest;

  // establish base case
  if (len === 0) return array;

  // recursive case
  first = array[0];
  rest  = array.slice(1);

  return Array.isArray(first) ?
    flatten(first).concat( flatten(rest) ) :
    Array.prototype.concat( first, flatten(rest) );
};

/*
 * Integer Difference
 *
 * Write a function that accepts an array of random integers and an integer *n*.
 * Determine the number of times where two integers in the array have the
 * difference of *n*.
 *
 * f(4, [1, 1, 5, 6, 9, 16, 27]) // 3 (Due to 2x [1, 5], and [5, 9])
 * f(2, [1, 1, 3, 3]) // 4 (Due to 4x [1, 3])
*/

/*
 * Key Concepts: iterative approach
*/
var integerDifference = function (num, array) {
  var len   = array.length;
  var count = 0;
  var i, j;

  for (i = 0; i < len - 1; i += 1) {
    for (j = i + 1; j < len; j += 1) {
      if (Math.abs( array[i] - array[j] ) === num) {
        count += 1;
      }
    }
  }

  return count;
};

/*
 * Largest Palindrome
 *
 * Write a function that finds the largest palindrome in a string. All
 * characters can be valid for the palindrome, including whitespace. In the
 * string "I am a red racecar driver" - the largest palindrome would be
 * "d racecar d".
*/

/*
 * Key Concepts: iterative approach
*/
var largestPalindrome = function (string) {
  var len       = string.length;
  var maxLength = 0;
  var result    = '';
  var start, end, slice;

  for (start = 0; start < len - 1; start += 1) {
    for (end = start + 1; end < len; end += 1) {
      // create slices of the string and check if each slice is a palindrome
      // if it is, check if its the largest palindrome so far
      slice = string.slice(start, end);
      if (isPalindrome(slice) && slice.length > maxLength) {
        result = slice;
        maxLength = slice.length;
      }
    }
  }
  return result;
};

var isPalindrome = function (string) {
  return string === string.split('').reverse().join('');
};

/*
 * Longest Words
 *
 * Write a function that returns the longest word(s) from a sentence. The
 * function should not return any duplicate words (case-insensitive).
 *
 * longestWords("You are just an old antidisestablishmentarian")
 *   => ["antidisestablishmentarian"]
 * longestWords("I gave a present to my parents") => ["present", "parents"]
 * longestWords("Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo
 * buffalo") => ["buffalo"] or ["Buffalo"]
*/

/*
 * Key Concepts: functional programming, creating hash tables
*/
var longestWords = function (string) {
  // convert string to array of words
  var words = reduceWords( string.toLowerCase().split(' ') );

  // convert array of words to array of word lengths
  // apply Max on array of word lengths
  var max = Math.max.apply(null, words.map(function (word) {
    return word.length;
  }));

  // return words with length equal to max length
  return words.filter(function (word) {
    return word.length === max;
  });
};

var reduceWords = function (array) {
  var hash = {};
  for (var i = 0; i < array.length; i += 1) {
    hash[ array[i] ] = hash[ array[i] ] || true;
  }
  return Object.keys(hash);
};

/*
 * Once
 *
 * Write a function that accepts a function as it's only argument and returns a
 * new function that can only ever be executed once.
 *
 * Once completed, add a second arguments that allows the function to be
 * executed `x` number of times before it stops working.
*/

/*
 * Key Concepts: closure, lexical scope, returning functions as values, arguments
*/
var once = function (fn, x) {
  x = x || 1;
  var counter = 0;
  return function () {
    var args = Array.prototype.slice.call(arguments);
    if (counter < x) {
      counter += 1;
      return fn.apply(this, args);
    }
  };
};

/*
 * Get Elements by Class Name
 * Implement the `getElementsByClassName(element, className)` function in Javascript
*/

var getElementsByClassName = function (className, element) {
  element        = element || document.body;

  var inner = function (node, result) {
    // check if current node has the class name
    if (node.className.split(' ').indexOf(className) !== -1) {
      // if it does, add the current node to result
      result.push( node );
    }

    // determine whether current node has children
    var children = Array.prototype.slice.call(node.children);
      // if it doesn't then return result
      // if it does:
        // for each child, invoke inner on the child and a new empty array
          // the returned value will be an array which should be concatenated to
          // the current scope's result array

    return children.reduce(function (acc, child) {
      return result.concat( inner(child, []) );
    }, result);
  };

  return inner(element, []);
};

/*
 * Assignment: Write a function that returns true if a linked list contains a cycle, or false if it terminates somewhere
 *
 * Explanation:
 *
 * Generally, we assume that a linked list will terminate in a null next pointer, as follows:
 *
 * A -> B -> C -> D -> E -> null
 *
 * A 'cycle' in a linked list is when traversing the list would result in visiting the same nodes over and over
 * This is caused by pointing a node in the list to another node that already appeared earlier in the list. Example:
 *
 * A -> B -> C
 *      ^    |
 *      |    v
 *      E <- D
 *
 * Example code:
 *
 * var nodeA = Node('A');
 * var nodeB = nodeA.next = Node('B');
 * var nodeC = nodeB.next = Node('C');
 * var nodeD = nodeC.next = Node('D');
 * var nodeE = nodeD.next = Node('E');
 * hasCycle(nodeA); // => false
 * nodeE.next = nodeB;
 * hasCycle(nodeA); // => true
 *
 * Constraint 1: Do this in linear time
 * Constraint 2: Do this in constant space
 * Constraint 3: Do not mutate the original nodes in any way
*/

var hasCycle = function (node) {
  var first  = node;
  var second = node;

  while (first && second) {
    if (first === second) return true;

    first = node.next;
    second = node.next.next;
  }

  return false;
};