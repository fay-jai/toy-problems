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

LinkedList.prototype.addToTail = function (value) {
  var newNode = this.makeNode(value);

  if (this.isEmpty()) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail      = newNode;
  }
};

LinkedList.prototype.removeHead = function () {
  var result;
  if (!this.isEmpty()) {
    result = this.head.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }

    return result;
  }
};

LinkedList.prototype.contains = function (value, node) {
  if (this.isEmpty()) {
    return false;
  }

  // initialize node
  if (node === void 0) {
    node = this.head;
  }

  if (node === null) {
    return false;
  } else if (node.value === value) {
    return true;
  } else {
    return this.contains(value, node.next);
  }
};

LinkedList.prototype.isEmpty = function () {
  return this.head === null && this.tail === null;
};

LinkedList.prototype.makeNode = function (value) {
  return {
    value : value,
    next  : null
  };
};