/*
 * Implement a linked list using the pseudoclassical instantiation pattern.
 *
 * Your linked list should have methods called "addToTail", "removeHead", and "contains."
 *
 */

// EXAMPLE USAGE:
// var list = new LinkedList();
// list.addToTail(4);
// list.contains(4);  //yields 'true';
// list.removeHead();
// list.tail;        //yields 'null';

var LinkedList = function () {
  this.head = null;
  this.tail = null;
};

//write methods here!
