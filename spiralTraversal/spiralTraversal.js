/*
 * Write a function that accepts a 2-dimensional array (that is, an array containing many same-length arrays),
 * and prints out every value found, but in a spiral from the upper left in to the center
 * Please write some form of specs, tests, or assertions for your code, and check as many edge cases as you can think of
 *
 * example:

    spiralTraversal([
      [1,2,3],
      [4,5,6],
      [7,8,9]
    ]);

    returns [1, 2, 3, 6, 9, 8, 7, 4, 5]
 */

// Solved recursively for any 2-dimensional array (even if inner arrays are not the same length)
var spiralTraversal = function (matrix) {
  if (matrix.length === 0) return;

  var result = [];
  var currentRow, currentCol;

  var goRight = function (matrix) {
    var currentRow = 0; // always remove first row
    while ( matrix[currentRow].length > 0 ) {
      result.push ( matrix[currentRow].shift() );
    }
    matrix.shift();
  };

  var goDown = function (matrix) {
    var currentRow = 0; // always start at first row and remove last column in that row
    while ( matrix[currentRow] !== void 0 && matrix[currentRow][ matrix[currentRow].length - 1] !== void 0 ) {
      result.push( matrix[currentRow].pop() );
      currentRow += 1;
    }
  };

  var goLeft = function (matrix) {
    var currentRow = matrix.length - 1; // always remove last row
    while ( matrix[currentRow].length > 0 ) {
      result.push( matrix[currentRow].pop() );
    }
    matrix.pop();
  };

  var goUp = function (matrix) {
    var currentRow = matrix.length - 1; // always start at last row and remove first column in that row
    while ( matrix[currentRow] !== void 0 && matrix[currentRow][0] !== void 0 ) {
      result.push( matrix[currentRow].shift() );
      currentRow -= 1;
    }
  };

  var move = function () {
    goRight(matrix);
    if (matrix.length === 0) return;

    goDown(matrix);
    if (matrix.length === 0) return;

    goLeft(matrix);
    if (matrix.length === 0) return;

    goUp(matrix);
    if (matrix.length === 0) return;

    if ( matrix.length > 0 ) move();
  };

  move();
  return result;
};