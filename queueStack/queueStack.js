/**
 * Write a stack using your preferred instantiation pattern. Once you're done,
 * implement a queue using two stacks.
 */

/**
  * Stack Class
  */

var Stack = function() {
  
  // add an item to the top of the stack
  this.push = function (value) {
  
  };

  // remove an item from the top of the stack
  this.pop = function () {
  
  };

  // return the number of items in the stack
  this.size = function () {
  
  };

  return this;
};

/**
  * Queue Class
  */
var Queue = function() {
  // Use two `stack` instances to implement your `queue` Class
  var inbox = new Stack();
  var outbox = new Stack();

  // called to add an item to the `queue`
  this.enqueue = function (value) {
  
  };

  // called to remove an item from the `queue`
  this.dequeue = function () {
  
  };

  // should return the number of items in the queue
  this.size = function () {
  
  };
};
