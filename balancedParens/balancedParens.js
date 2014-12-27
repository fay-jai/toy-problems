/*
 * write a function that takes a string of text and returns true if
 * the parentheses are balanced and false otherwise.
 *
 * Example:
 *   balancedParens('(');  // false
 *   balancedParens('()'); // true
 *   balancedParens(')(');  // false
 *   balancedParens('(())');  // true
 *
 * Step 2:
 *   make your solution work for all types of brackets
 *
 * Example:
 *  balancedParens('[](){}'); // true
 *  balancedParens('[({})]');   // true
 *  balancedParens('[(]{)}'); // false
 *
 * Step 3:
 * ignore non-bracket characters
 * balancedParens(' var wow  = { yo: thisIsAwesome() }'); // true
 * balancedParens(' var hubble = function() { telescopes.awesome();'); // false
 *
 *
 */

var balancedParens = function (input) {
  var stack = [];
  var map = {
    ')' : '(',
    ']' : '[',
    '}' : '{'
  };
  var length = input.length;
  var i, currentChar, popped;

  for (i = 0; i < length; i += 1) {
    currentChar = input[i];

    if ( isOpening(currentChar) ) {
      stack.push( currentChar );
    } else if ( isClosing(currentChar) ) {
      popped = stack.pop();
      if ( map[currentChar] !== popped ) {
        return false;
      }
    }
  }

  return stack.length === 0;
};

var isOpening = function (char) {
  return char === '(' || char === '[' || char === '{';
};

var isClosing = function (char) {
  return char === ')' || char === ']' || char === '}';
};