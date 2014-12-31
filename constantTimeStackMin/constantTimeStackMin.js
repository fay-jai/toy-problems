/**
 * Write a stack using your preferred instantiation pattern. Implement a min function
 * that returns the minimum value of all the elements in the stack in constant time.
 */

/**
  * Stack Class
  */
var Stack = function () {
  var storage  = {};
  var minSoFar = [];
  var top      = 0;

  // add an item to the top of the stack
  this.push = function (value) {
    if ( minSoFar.length === 0 || value <= minSoFar[minSoFar.length - 1] ) {
      minSoFar.push( value );
    }
    storage[top] = value;
    top += 1;
  };

  // remove an item from the top of the stack
  this.pop = function () {
    var popped;
    if ( this.size() > 0) {
      popped = storage[top - 1];
      delete storage[top - 1];
      top -= 1;

      if ( popped === minSoFar[minSoFar.length - 1] ) {
        minSoFar.pop();
      }
      return popped;
    }
  };

  // return the number of items in the stack
  this.size = function () {
    return top;
  };

  this.min = function () {
    return minSoFar[minSoFar.length - 1];
  };

  return this;
};