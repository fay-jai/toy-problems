/**
 *  
 *  A robot located at the top left corner of a 5x5 grid is trying to reach the 
 *  bottom right corner. The robot can move either up, down, left, or right, 
 *  but cannot visit the same spot twice. How many possible unique paths are 
 *  there to the bottom right corner? 
 *  
 *  make your solution work for a grid of any size.
 *
 */

// A Board class will be useful

var makeBoard = function (n) {
  var board = [];

  for (var i = 0; i < n; i++) {
    board.push([]);
    for (var j = 0; j < n; j++) {
      board[i].push(false);
    }
  }

  board.togglePiece = function (i, j) {
    this[i][j] = !this[i][j];
  };

  board.hasBeenVisited = function (i, j) {
    return !!this[i][j];
  };

  board.withInBoard = function (i, j) {
    return (i >= 0 && i < n && j >= 0 && j < n);
  };

  return board;
};

var robotPaths = function (n) {
  var total = 0;
  var board = makeBoard(n);
  var inner = function (board, x, y) {
    // base case
    if (x === n - 1 && y === n - 1 && !board.hasBeenVisited(x, y)) {
      total += 1;
      return;
    }

    if (board.withInBoard(x, y) && !board.hasBeenVisited(x, y)) {
      board.togglePiece(x, y);

      // check left position
      inner(board, x - 1, y);
      // check right position
      inner(board, x + 1, y);
      // check top position
      inner(board, x, y - 1);
      // check bottom position
      inner(board, x, y + 1);

      // untoggle current position
      board.togglePiece(x, y);
    }
  };

  inner(board, 0, 0);
  return total;
};