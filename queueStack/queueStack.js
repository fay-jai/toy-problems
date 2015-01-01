/**
 * Write a stack using your preferred instantiation pattern. Once you're done,
 * implement a queue using two stacks.
 */

/**
  * Stack Class
  */

var Stack = function () {
  var storage = {};
  var size    = 0;

  // add an item to the top of the stack
  this.push = function (value) {
    storage[ size ] = value;
    size += 1;
  };

  // remove an item from the top of the stack
  this.pop = function () {
    var popped;
    if ( this.size() > 0 ) {
      popped = storage[ size - 1 ];
      delete storage[ size - 1 ];
      size -= 1;
      return popped;
    }
  };

  // return the number of items in the stack
  this.size = function () {
    return size;
  };
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
    inbox.push( value );
  };

  // called to remove an item from the `queue`
  this.dequeue = function () {
    var temp, popped;

    while ( inbox.size() > 0 ) {
      temp = inbox.pop();
      outbox.push( temp );
    }

    popped = outbox.pop();

    while ( outbox.size() > 0 ) {
      temp = outbox.pop();
      inbox.push( temp );
    }

    return popped;
  };

  // should return the number of items in the queue
  this.size = function () {
    return inbox.size();
  };
};
