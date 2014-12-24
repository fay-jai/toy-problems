/* Implement a tree using prototypal instantiation.
Your tree should have methods named "addChild" and "contains".
*/

// EXAMPLE USAGE:
// var tree = treeMaker();
// tree.addChild(1);
// tree.addChild(2);
// tree.contains(2);   // yields 'true'

var treeMaker = function () {
  //tree code goes here!
  var tree  = Object.create(treeMaker.methods);
  tree.root = null;
  return tree;
};

var makeNode = function (value) {
  return {
    value    : value,
    children : []
  };
};

//methods go here!

treeMaker.methods = {};

treeMaker.methods.addChild = function (value) {
  var newNode = makeNode(value);

  // check if tree has root yet
  if (this.isEmpty()) {
    this.root = newNode;
  } else {
    this.root.children.push(newNode);
  }
};

treeMaker.methods.contains = function (value, node) {
  if (this.isEmpty()) {
    return false;
  }

  var result;
  // initialize node
  if (node === void 0) {
    node = this.root;
  }

  if (node.value === value) {
    result = true;
  } else if (node.children.length === 0) {
    result = false;
  } else {
    // iterate through all children
    for (var i = 0; i < node.children.length; i += 1) {
      if (this.contains(value, node.children[i])) {
        result = true;
        break;
      }
    }
  }

  return result;
};

treeMaker.methods.isEmpty = function () {
  return this.root === null;
};
