
/**
  * implement the function `getClosestCommonAncestor` and `getAncestorPath`
  * in the following Tree class
  */

/** example usage:
  * var grandma = new Tree('grandma');
  * var mom = new Tree('mom');
  * grandma.addChild(mom);
  * var me = new Tree('me');
  * mom.addChild(me);
  * grandma.getAncestorPath(me); // => [grandma, mom, me]
*/

var Tree = function (name) {
  this.name = name;
  this.children = [];
};

/**
  * add an immediate child
  */
Tree.prototype.addChild = function (child) {
  if (!this.isDescendant(child)) {
    this.children.push(child);
  }else {
    throw new Error("That child is already a child of this tree");
  }
  return this;
};

/**
  * return the lowest common ancestor of the two child nodes.
  * (assume for these examples that only a women can be the parent of a child)
  * more examples:
  *  1.) between me and my brother -> my mom
  *  2.) between me and my cousin -> my grandma
  *  3.) between my grandma and my grandma -> my grandma
  *  4.) between me and a potato -> null
  */
Tree.prototype.getClosestCommonAncestor = function (node1, node2) {
  if (arguments.length < 2) {
    throw new Error('Need two nodes as input');
  }

  // get ancestor path of both nodes
  var ancestorPath1  = this.getAncestorPath(node1);
  var ancestorPath2  = this.getAncestorPath(node2);

  var result = null;
  var ancestor2Object, ancestor1Len, ancestor2Len, i, j;

  if (ancestorPath1 === null || ancestorPath2 === null) { return null; }

  ancestor2Object = {};
  ancestor1Len    = ancestorPath1.length;
  ancestor2Len    = ancestorPath2.length;

  // convert one of the ancestor path's into an object with key equal to the array value
  // and value equal to true
  for (i = 0; i < ancestor2Len; i += 1) {
    ancestor2Object[ ancestorPath2[i] ] = true;
  }

  // loop through the other ancestor path and if element is in object, return that element
  // else return null
  for (j = 0; j < ancestor1Len; j += 1) {
    if ( ancestor2Object[ ancestorPath1[j] ] ) {
      result = ancestorPath1[j];
    }
  }

  return result;
};

/**
  * should return the ancestral path of a child to this node.
  * more examples:
  * 1.) greatGrandma.getAncestorPath(me) -> [great grandma, grandma, mom, me]
  * 2.) mom.getAncestorPath(me) -> [mom, me]
  * 3.) me.getAncestorPath(me) -> [me]
  * 4.) grandma.getAncestorPath(H R Giger) -> null
  */

Tree.prototype.getAncestorPath = function (node) {
  var inner = function (node, result) {
    var self = this;
    var i, childPath;

    // always push self onto result
    result.push( self.name );

    if ( self === node ) {
      return result; // array
    } else if ( self.children.length === 0 ) {
      return null;
    } else {
      for (i = 0; i < self.children.length; i += 1) {
        // as soon as any child is the node, return the childPath
        childPath = inner.call( self.children[i], node, result.slice() );
        if ( childPath ) {
          return childPath;
        }
      }
      return null;
    }
  };

  return inner.call(this, node, []);
};

/**
  * check to see if the provided tree is already a child of this
  * tree __or any of its sub trees__
  */
Tree.prototype.isDescendant = function (child) {
  if (this.children.indexOf(child) !== -1) {
    // `child` is an immediate child of this tree
    return true;
  }else{
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].isDescendant(child)) {
        // `child` is descendant of this tree
        return true;
      }
    }
    return false;
  }
};

/**
  * remove an immediate child
  */
Tree.prototype.removeChild = function (child) {
  var index = this.children.indexOf(child);
  if(index !== -1){
    // remove the child
    this.children.splice(index,1);
  }else{
    throw new Error("That node is not an immediate child of this tree");
  }
};
