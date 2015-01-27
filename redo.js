var permutations = function (array) {
  var len = array.length;
  if (len === 0) { return []; }
  if (len === 1) { return [ array ]; }

  var first  = array.slice(0, 1);
  var rest   = array.slice(1);

  return permutations( rest ).reduce(function (acc, cur) {
    var len = cur.length;

    for (var i = 0; i < len; i += 1) {
      acc.push( Array.prototype.concat.call( cur.slice(0, i), first, cur.slice(i) ) );
    }
    acc.push( Array.prototype.concat.call( cur, first ) );

    return acc;
  }, []);
};


var combinations = function (array) {
  var len    = array.length;
  var result = [];
  var first, rest;

  if (len === 0) { return []; }
  if (len === 1) { return [ array ]; }

  first = array[0];
  rest  = array.slice(1);

  combinations( rest ).forEach(function (arr) {
    result.push( arr.concat(first) );
    result.push( arr );
  });
  result.push( [ first ] );

  return result;
};


var rockPaperScissors = function (num) {
  if (num <=  0) { return []; }
  if (num === 1) { return [ ['rock'], ['paper'], ['scissors'] ]; }

  var result = [];

  rockPaperScissors(num - 1).forEach(function (arr) {
    ['rock', 'paper', 'scissors'].forEach(function (hand) {
      result.push( Array.prototype.concat( arr, hand ) );
    });
  });

  return result;
};


var balancedParens = function (string) {
  var stack = [];
  var character, popped;

  var isOpening = function (character) {
    return character === '(' ||
           character === '[' ||
           character === '{';
  };

  var map = {
    ')' : '(',
    ']' : '[',
    '}' : '{'
  };

  for (var i = 0; i < string.length; i += 1) {
    character = string[i];

    if ( isOpening(character) ) {
      stack.push( character );
    } else if ( map[ character ] ) {
      popped = stack.pop();
      if ( map[character] !== popped ) { return false; }
    }
  }

  return stack.length === 0;
};


var binarySearch = function (arr, num) {
  var inner = function (start, end) {
    var mid = Math.floor( (start + end) / 2 );

    if (start >= end)     { return null; }
    if (num === arr[mid]) { return mid; }
    if (num  <  arr[mid]) { return inner(start, mid); }
    return inner(mid + 1, end);
  };

  return inner(0, arr.length);
};


var characterFrequency = function (string) {
  var createHash = function (string) {
    var hash = {};
    for (var i = 0; i < string.length; i += 1) {
      hash[ string[i] ] = hash[ string[i] ] || 0;
      hash[ string[i] ] += 1;
    }
    return hash;
  };

  var createDataStructure = function (hash) {
    var result = [];
    for (var prop in hash) {
      result.push([ prop, hash[prop] ]);
    }
    return result;
  };

  var dsHash = createDataStructure( createHash(string) );

  dsHash.sort(function (a, b) {
    // a and b are arrays
    if (a[1] > b[1]) {
      return -1;
    } else if (a[1] < b[1]) {
      return 1;
    } else {
      return a[0] >= b[0] ? 1 : -1;
    }
  });

  return dsHash;
};


var makeChange = function (num) {
  var inner = function (num, coins) {
    if (num  <  0) { return 0; }
    if (num === 0) { return 1; }

    var total = 0;
    coins.forEach(function (amt) {
      total += inner(num - amt, availableCoins(amt));
    });

    return total;
  };

  return inner(num, availableCoins(num));
};

var availableCoins = function (num) {
  return [200, 100, 50, 20, 10, 5, 2, 1].filter(function (n) {
    return num >= n;
  });
};


var convertToHash = function (string) {
  var hash = {};
  for (var i = 0; i < string.length; i += 1) {
    hash[string[i]] = true;
  }
  return hash;
};

var combineHash = function (hash1, hash2) {
  var result = {};
  for (var prop in hash1) {
    if (hash2[prop]) {
      result[prop] = true;
    }
  }
  return result;
};

var commonCharacters = function () {
  var args   = Array.prototype.slice.call(arguments);
  var first  = args[0];
  var result = args
    .map(function (string) {
      return convertToHash(string);
    })
    .reduce(function (acc, cur) {
      return combineHash(acc, cur);
    });

  return first.split('')
    .filter(function (character) {
      var temp = result[character];
      delete result[character];
      return temp;
    })
    .join('');
};